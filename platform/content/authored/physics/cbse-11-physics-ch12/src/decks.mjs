// ch12 Kinetic Theory — two decks: Part 1 (t01–t02) the gas equation, kinetic theory, pressure and temperature;
// Part 2 (t03–t04) degrees of freedom, equipartition, specific heats, mean free path and Avogadro's number.
// Every number and every graph is computed here from stated data.
import { sl, deck, table, svgV, plot, r, dec, sci } from '../../cbse-11-physics-ch01/src/lib.mjs';
import { R, KB, NA, ATM, ZERO_C, w, ws, sciu, idealP, vrmsM, mfp, wallPressure, cvR, cpR } from './phys.mjs';
import * as G from './svgs.mjs';

const R6 = (x) => Math.round(x * 1e6) / 1e6;

// ---------------------------------------------------------------- worked-example numbers (Part 1)
const ex1 = { n: 4.0, V: 0.05, T: 300 };
ex1.P = idealP(ex1.n, ex1.T, ex1.V);
ex1.atm = ex1.P / ATM;
const ex2 = { M: 0.029, P: ATM, T: 300 };
ex2.rho = (ex2.P * ex2.M) / (R * ex2.T);
ex2.Vm = (R * ex2.T) / ex2.P;
const ex3 = { rho: 0.09, v: 1840 };
ex3.P = (ex3.rho * ex3.v ** 2) / 3;
const ex4 = { T: 300, MN: 0.028, MO: 0.032 };
ex4.vN = vrmsM(ex4.T, ex4.MN);
ex4.vO = vrmsM(ex4.T, ex4.MO);
ex4.ratio = ex4.vN / ex4.vO;
ex4.ke = 1.5 * KB * ex4.T;
const ex5 = { t1: 27, k: 1.5 };
ex5.T1 = ex5.t1 + ZERO_C;
ex5.T2 = ex5.T1 * ex5.k ** 2;
ex5.t2 = ex5.T2 - ZERO_C;
const wp = { N: 4000, m: 5.0e-26, v: 400, L: 0.1 };
wp.P = wallPressure(wp.N, wp.m, wp.v, wp.L);
wp.Pformula = (wp.N * wp.m * wp.v ** 2) / (3 * wp.L ** 3);

// ---------------------------------------------------------------- worked-example numbers (Part 2)
const ex6 = { n: 2.0, T: 330, f: 5 };
ex6.Um = (ex6.f / 2) * R * ex6.T;
ex6.U = ex6.n * ex6.Um;
ex6.eps = (ex6.f / 2) * KB * ex6.T;
const ex7 = { n: 3.0, dT: 40, f: 5 };
ex7.Cv = cvR(ex7.f) * R;
ex7.Cp = cpR(ex7.f) * R;
ex7.QV = ex7.n * ex7.Cv * ex7.dT;
ex7.QP = ex7.n * ex7.Cp * ex7.dT;
ex7.W = ex7.QP - ex7.QV;
ex7.gamma = ex7.Cp / ex7.Cv;
const ex8 = { n1: 1.0, f1: 3, n2: 2.0, f2: 5 };
ex8.CvR = ex8.n1 * cvR(ex8.f1) + ex8.n2 * cvR(ex8.f2);
ex8.CpR = ex8.n1 * cpR(ex8.f1) + ex8.n2 * cpR(ex8.f2);
ex8.gamma = ex8.CpR / ex8.CvR;
const ex9 = { P: ATM, T: 300, d: 3.0e-10, vbar: 470 };
ex9.n = ex9.P / (KB * ex9.T);
ex9.lam = mfp(ex9.n, ex9.d);
ex9.freq = ex9.vbar / ex9.lam;
ex9.ratio = ex9.lam / ex9.d;
const ex10 = { P: 1.0e-2, T: 300, d: 3.0e-10, tube: 0.5 };
ex10.n = ex10.P / (KB * ex10.T);
ex10.lam = mfp(ex10.n, ex10.d);
const ex11 = { mass: 2.8, M: 28 };
ex11.n = R6(ex11.mass / ex11.M);
ex11.N = ex11.n * NA;
ex11.m1 = (ex11.M * 1e-3) / NA;
const stp = { T: ZERO_C, P: ATM };
stp.Vm = (R * stp.T) / stp.P;
stp.n = stp.P / (KB * stp.T);

export const EX = { ex1, ex2, ex3, ex4, ex5, wp, ex6, ex7, ex8, ex9, ex10, ex11, stp };

// ---------------------------------------------------------------- visuals
export const V = {
  box: svgV(G.BOX, 'A molecule in a cube hitting the right wall: the perpendicular velocity component reverses, so the wall receives two m v x of momentum', 'One collision: momentum 2 m vx to the wall, then a return trip of 2L.'),
  dof: svgV(G.DOF, 'Degrees of freedom of a monatomic, a rigid diatomic and a bent triatomic molecule', 'Translation, rotation and vibration: count the quadratic terms.'),
  cv: svgV(G.CVBARS, 'Bars of CV and CP in units of R for monatomic, diatomic and polyatomic gases', 'CP exceeds CV by exactly R for every ideal gas.'),
  mfp: svgV(G.MFP, 'A zigzag path of one molecule with ten straight pieces of different lengths and their mean', 'Free paths differ; the mean free path is their average.'),
  speeds: svgV(G.SPEEDS, 'Ten sample speeds with their mean and the larger rms value', 'The rms speed is a little above the mean speed.'),
  vrms: svgV(G.VRMSBARS, 'Rms speeds of hydrogen, helium, nitrogen, oxygen and carbon dioxide at 300 kelvin, to scale', 'Lighter molecules move faster at the same temperature.'),
};

const ax = (label, min, max) => ({ label, min, max });
const isoT = [250, 300, 400];
export const plotIsotherms = plot(
  {
    x: ax('volume V (litre)', 10, 60),
    y: ax('pressure P (kPa)', 0, 340),
    functions: isoT.map((T) => ({ expr: `${R}*${T}/x`, label: `T = ${T} K`, domain: [10, 60] })),
  },
  'Pressure-volume curves of one mole of an ideal gas at 250, 300 and 400 kelvin: three hyperbolas, the higher temperature lying farther from the axes; at each volume the pressure is proportional to the temperature',
  'Isotherms: P V = n R T is constant on each curve; hotter curves lie higher.',
);
export const plotIsobars = plot(
  {
    x: ax('temperature T (K)', 0, 400),
    y: ax('volume V (litre) of 1 mol', 0, 36),
    functions: [100, 200].map((P) => ({ expr: `${R}*x/${P}`, label: `P = ${P} kPa`, domain: [0, 400] })),
  },
  'Volume-temperature lines of one mole of an ideal gas at 100 and 200 kilopascals: straight lines through the origin on the kelvin scale, the lower pressure having the steeper line',
  'Isobars: V is proportional to T (in kelvin); the lines meet at V = 0 when T = 0 K.',
);
const MN = 0.028;
const MH = 0.002;
export const plotVrms = plot(
  {
    x: ax('temperature T (K)', 0, 1000),
    y: ax('rms speed (m/s)', 0, 3600),
    functions: [
      { expr: `sqrt(${R6((3 * R) / MH)}*x)`, label: 'hydrogen', domain: [0, 1000] },
      { expr: `sqrt(${R6((3 * R) / MN)}*x)`, label: 'nitrogen', domain: [0, 1000] },
    ],
  },
  'Root-mean-square speed against temperature for hydrogen and nitrogen: both rise like the square root of the kelvin temperature, hydrogen about 3.7 times higher than nitrogen',
  'v_rms is proportional to √T, and hydrogen is √14 times faster than nitrogen.',
);
const lamC = ((KB * ex9.T) / (Math.SQRT2 * Math.PI * ex9.d ** 2)) * 1e6; // nm per kPa: lam(nm) = C / P(kPa)
export const plotMfp = plot(
  {
    x: ax('pressure P (kPa)', 10, 120),
    y: ax('mean free path (nm)', 0, 1100),
    functions: [{ expr: `${R6(lamC)}/x`, label: 'λ = k_B T / (√2 π d² P), nitrogen-like gas at 300 K', domain: [10, 120] }],
  },
  'Mean free path against pressure at 300 kelvin for molecules of diameter 0.3 nanometre: a hyperbola, falling from about 1000 nanometres at 10 kilopascals to about 100 nanometres at 100 kilopascals',
  'At fixed temperature, λ is inversely proportional to the pressure.',
);

// ---------------------------------------------------------------- tables
const TCONST = table(
  ['Symbol', 'Meaning', 'Value used here'],
  [
    ['n', 'amount of gas', 'moles (mol)'],
    ['N', 'number of molecules', 'N = n N_A'],
    ['R', 'universal gas constant', '8.314 J mol⁻¹ K⁻¹'],
    ['k_B', 'Boltzmann constant', '1.38 × 10⁻²³ J K⁻¹'],
    ['N_A', 'Avogadro constant', '6.02 × 10²³ mol⁻¹'],
    ['link', 'R = N_A k_B', `${dec(NA * KB, 4)} J mol⁻¹ K⁻¹ (agrees to 0.1%)`],
  ],
  'Table of the symbols in the ideal gas equation with their meanings and the values used in this chapter',
);
const TLAWS = table(
  ['Law', 'Held fixed', 'Result from P V = n R T'],
  [
    ['Boyle', 'n and T', 'P V = constant (P ∝ 1/V)'],
    ['Charles', 'n and P', 'V / T = constant (V ∝ T, kelvin)'],
    ['Gay-Lussac', 'n and V', 'P / T = constant (P ∝ T, kelvin)'],
    ['Avogadro', 'P and T', 'V ∝ n: equal volumes hold equal numbers of molecules'],
  ],
  'Table showing Boyle, Charles, Gay-Lussac and Avogadro laws as special cases of the ideal gas equation',
);
const TREAL = table(
  ['Condition', 'Behaviour of a real gas'],
  [
    ['Low pressure, high temperature', 'molecules far apart, forces negligible: close to ideal'],
    ['High pressure', 'molecules crowded, their own size matters: departs from ideal'],
    ['Low temperature', 'attractions matter, the gas liquefies: departs from ideal'],
  ],
  'Table of when a real gas behaves like an ideal gas',
);
const TASSUME = table(
  ['Assumption of the kinetic model', 'What it allows'],
  [
    ['Many identical molecules in random motion', 'use averages over all molecules'],
    ['Molecules are point-like: size ≪ separation', 'negligible volume of the molecules themselves'],
    ['No forces except in collisions', 'straight-line motion between collisions'],
    ['Collisions with walls and with each other are elastic', 'kinetic energy is conserved'],
    ['No preferred direction; gravity ignored', 'v̄x² = v̄y² = v̄z² = v̄²/3'],
  ],
  'Table of the assumptions of the kinetic theory of an ideal gas and what each allows',
);
const TDERIV = table(
  ['Step', 'Result'],
  [
    ['One collision with the wall', 'momentum change 2 m vx'],
    ['Time between hits on that wall', '2L / vx'],
    ['Force from one molecule', 'm vx² / L'],
    ['Pressure = force ÷ L², sum over N molecules', 'P = (m / L³) Σ vx²'],
    ['Average over directions: v̄x² = v̄²/3', 'P = (1/3)(N/V) m v̄² = (1/3) ρ v̄²'],
  ],
  'Table of the steps in deriving the pressure of an ideal gas from molecular collisions',
);
const TTEMP = table(
  ['Result', 'Expression'],
  [
    ['Pressure and energy', 'P V = (2/3) E, with E the total translational kinetic energy'],
    ['Compare with P V = N k_B T', 'E = (3/2) N k_B T'],
    ['Mean kinetic energy per molecule', '(1/2) m v̄² = (3/2) k_B T'],
    ['Root-mean-square speed', 'v_rms = √(3 k_B T / m) = √(3 R T / M)'],
    ['Same T, different gases', 'same mean energy, but v_rms ∝ 1/√M'],
  ],
  'Table linking pressure, temperature, mean kinetic energy and rms speed',
);
const TDALTON = table(
  ['Gas in the mixture', 'Moles', 'Partial pressure'],
  [
    ['Gas 1', 'n₁', 'P₁ = n₁ R T / V'],
    ['Gas 2', 'n₂', 'P₂ = n₂ R T / V'],
    ['Mixture', 'n₁ + n₂', 'P = P₁ + P₂ (Dalton)'],
  ],
  'Table of partial pressures of two gases in a mixture and the total pressure by Dalton law',
);
const TEQ = table(
  ['Type of quadratic term', 'Energy per molecule (mean)'],
  [
    ['Each translational term (1/2) m vx²', '(1/2) k_B T'],
    ['Each rotational term (1/2) I ω²', '(1/2) k_B T'],
    ['Each vibrational mode (kinetic + potential)', '2 × (1/2) k_B T = k_B T'],
    ['f quadratic terms in all', '(f/2) k_B T per molecule, (f/2) R T per mole'],
  ],
  'Table of the energy per molecule for each kind of quadratic energy term by the law of equipartition',
);
const fmtG = (x) => (Number.isInteger(x) ? String(x) : dec(x, 4));
const TFS = table(
  ['Gas model', 'f', 'C_V / R', 'C_P / R', 'γ = C_P / C_V'],
  [
    ['monatomic', 3], ['diatomic, rigid', 5], ['diatomic, vibrating', 7], ['polyatomic (non-linear), rigid', 6],
  ].map(([name, f]) => [name, String(f), fmtG(cvR(f)), fmtG(cpR(f)), dec(cpR(f) / cvR(f), 4)]),
  'Table of the number of quadratic terms and molar heat capacities in units of R and the ratio gamma for gas models',
);
const TMFPDEP = table(
  ['Change', 'Effect on λ = 1 / (√2 π d² n)'],
  [
    ['n doubled (more crowded)', 'λ halves'],
    ['d doubled (fatter molecules)', 'λ becomes one quarter'],
    ['Pressure lowered at fixed T (n falls)', 'λ rises: λ ∝ 1/P'],
    ['Temperature raised at fixed P', 'n falls, so λ rises: λ ∝ T'],
    ['Temperature raised in a sealed vessel', 'n unchanged, so λ unchanged'],
  ],
  'Table of how the mean free path changes with number density, molecular diameter, pressure and temperature',
);
const TAVOG = table(
  ['Quantity', 'Value (0 °C, 1 atm)'],
  [
    ['Molar volume V = R T / P', `${dec(stp.Vm * 1000, 3)} litre`],
    ['Molecules per m³, n = P / (k_B T)', sciu(stp.n, 3)],
    ['Molecules in one mole', '6.02 × 10²³'],
    ['Mass of one molecule', 'm = M / N_A'],
  ],
  'Table of the molar volume and the number of molecules per cubic metre at zero degrees Celsius and one atmosphere',
);
const TEX1 = table(
  ['Quantity', 'Value'],
  [
    ['Amount of helium n', `${ex1.n} mol`],
    ['Volume V', `${ex1.V} m³`],
    ['Temperature T = 27 + 273', `${ex1.T} K`],
    ['Pressure P = n R T / V', `${dec(ex1.P, 6)} Pa ≈ ${dec(ex1.atm, 3)} atm`],
  ],
  'Table of the data and result for the pressure of helium in a cylinder',
);
const TEX3 = table(
  ['Quantity', 'Value'],
  [
    ['Density ρ of hydrogen at 0 °C', `${ex3.rho} kg m⁻³`],
    ['Root-mean-square speed', `${ex3.v} m s⁻¹`],
    ['Mean square speed v̄²', `${ex3.v ** 2} m² s⁻²`],
    ['Pressure P = (1/3) ρ v̄²', `${dec(ex3.P, 6)} Pa ≈ ${dec(ex3.P / ATM, 3)} atm`],
  ],
  'Table of the data and result for the pressure of hydrogen found from its density and rms speed',
);
const TEX6 = table(
  ['Quantity', 'Value'],
  [
    ['Temperature T', `${ex6.T} K`],
    ['Mean energy per molecule (5/2) k_B T', `${sciu(ex6.eps, 3)} J`],
    ['Internal energy per mole (5/2) R T', `${dec(ex6.Um, 5)} J`],
    [`Internal energy of ${ex6.n} mol`, `${dec(ex6.U, 5)} J`],
  ],
  'Table of the energy per molecule and the internal energy of oxygen at 330 kelvin',
);
const TEX7 = table(
  ['Process', 'Heat for 3.0 mol, ΔT = 40 K'],
  [
    ['Constant volume, Q = n C_V ΔT', `${dec(ex7.QV, 5)} J`],
    ['Constant pressure, Q = n C_P ΔT', `${dec(ex7.QP, 5)} J`],
    ['Difference = n R ΔT (work done by the gas)', `${dec(ex7.W, 5)} J`],
    ['γ = C_P / C_V', dec(ex7.gamma, 3)],
  ],
  'Table of the heat needed for nitrogen at constant volume and at constant pressure',
);
const TEX9 = table(
  ['Quantity', 'Value'],
  [
    ['Number density n = P / (k_B T)', `${sciu(ex9.n, 3)} m⁻³`],
    ['Mean free path λ', `${sciu(ex9.lam, 3)} m`],
    ['λ / d', dec(ex9.ratio, 3)],
    ['Collision rate = mean speed / λ', `${sciu(ex9.freq, 2)} s⁻¹`],
  ],
  'Table of the number density, mean free path and collision rate of nitrogen at one atmosphere and 300 kelvin',
);
const TEX11 = table(
  ['Quantity', 'Value'],
  [
    ['Amount n = 2.8 g ÷ 28 g/mol', `${ex11.n} mol`],
    ['Molecules N = n N_A', `${sciu(ex11.N, 3)}`],
    ['Mass of one molecule M / N_A', `${sciu(ex11.m1, 3)} kg`],
  ],
  'Table of the number of molecules in 2.8 grams of nitrogen and the mass of one molecule',
);

export const TABLES = { TCONST, TLAWS, TREAL, TASSUME, TDERIV, TTEMP, TDALTON, TEQ, TFS, TMFPDEP, TAVOG };

// ================================================================ DECK 1
export const deck1 = deck({
  part: 1,
  title: 'Kinetic Theory — Part 1: The gas equation, pressure and temperature',
  goals: [
    'Apply the ideal gas equation P V = n R T = N k_B T and recover the gas laws from it',
    'Derive the pressure of an ideal gas from molecular collisions, P = (1/3) ρ v̄², and state the assumptions',
    'Interpret temperature as mean translational kinetic energy and calculate rms speeds',
  ],
  slides: [
    sl('title', 'Kinetic Theory', {
      b: 'Part 1 — a gas as a crowd of fast molecules, and what their collisions tell us about pressure and temperature.',
      v: V.box,
      n: 'A gas fills its container and pushes on every wall, yet we cannot see its molecules. In this part we start from the equation that links pressure, volume and temperature, then picture the gas as a huge number of tiny molecules colliding with the walls, and show that their motion explains both the pressure and the temperature we measure.',
    }),
    sl('concept', 'The equation of state of an ideal gas', {
      b: 'For an ideal gas the pressure, volume and temperature of a sample are tied together by one relation:',
      m: [r`P V = n R T = N k_B T`],
      ul: [
        r`$n$ is the amount in moles, $N = n N_A$ the number of molecules; $T$ is the **absolute (kelvin) temperature**, $T = t_\text{C} + 273$.`,
        r`$R = 8.314$ J mol$^{-1}$ K$^{-1}$ and $k_B = 1.38 \times 10^{-23}$ J K$^{-1}$ are related by $R = N_A k_B$.`,
        'P in pascal and V in cubic metre give PV in joule; 1 atm = 1.013 × 10⁵ Pa.',
        'An ideal gas obeys this relation at all pressures and temperatures; real gases come close at low pressure and high temperature.',
      ],
      v: TCONST,
      n: `The ideal gas equation says that pressure times volume equals the number of moles times the gas constant times the temperature. Equivalently it equals the number of molecules times the Boltzmann constant times the temperature. The temperature must be the absolute temperature in kelvin, which is the Celsius value plus two hundred and seventy three. The gas constant equals Avogadro's number times the Boltzmann constant.`,
    }),
    sl('concept', 'The gas laws as special cases', {
      b: 'Hold two of the quantities fixed and the equation reduces to a classical gas law:',
      ul: [
        r`**Boyle:** fixed $n, T$ gives $P V = $ constant: the P–V curves are hyperbolas (isotherms).`,
        r`**Charles:** fixed $n, P$ gives $V/T = $ constant: a straight line through the origin on the kelvin scale.`,
        r`**Gay-Lussac:** fixed $n, V$ gives $P/T = $ constant.`,
        r`**Avogadro:** fixed $P, T$ gives $V \propto n$: equal volumes of any gases hold equal numbers of molecules.`,
        r`Combined: $\dfrac{P_1 V_1}{T_1} = \dfrac{P_2 V_2}{T_2}$ for a fixed amount of gas.`,
      ],
      v: plotIsotherms,
      n: 'Fix the amount of gas and the temperature, and the product of pressure and volume stays constant: that is Boyle\'s law, and the curves on this graph are hyperbolas called isotherms. Fix the pressure and the volume grows in proportion to the kelvin temperature, which is Charles\' law. Fix the volume and the pressure is proportional to the kelvin temperature. And at the same pressure and temperature, equal volumes hold equal numbers of molecules.',
    }),
    sl('example', 'Worked example 1: helium in a cylinder', {
      b: r`A cylinder of volume $${ex1.V}$ m$^3$ holds $${ex1.n}$ mol of helium at $27\,^\circ$C. Find the pressure, taking $R = 8.314$ J mol$^{-1}$ K$^{-1}$.`,
      ul: [
        r`$T = 27 + 273 = ${ex1.T}$ K.`,
        r`$P = \dfrac{n R T}{V} = \dfrac{${ex1.n} \times 8.314 \times ${ex1.T}}{${ex1.V}} = ${dec(ex1.P, 6)}$ Pa.`,
        r`In round figures $P \approx ${sci(ex1.P, 3)}$ Pa, about $${dec(ex1.atm, 3)}$ atm.`,
      ],
      v: TEX1,
      n: `Convert to kelvin first: twenty seven plus two hundred and seventy three is three hundred kelvin. Then the pressure is the number of moles times the gas constant times the temperature, divided by the volume. Four times eight point three one four times three hundred, over zero point zero five, gives about two hundred thousand pascals, which is nearly two atmospheres.`,
    }),
    sl('check', 'Quick check: reading isotherms', {
      b: 'Choose the correct option.',
      v: plotIsotherms,
      chk: 'isotherm-mcq',
      n: 'Compare the pressure of the curves at one fixed volume.',
    }),
    sl('example', 'Worked example 2: density of air', {
      b: r`Treat dry air (average molar mass $${ex2.M * 1000}$ g mol$^{-1}$) as an ideal gas at $1.013 \times 10^5$ Pa and $300$ K. Find its density and the volume of one mole.`,
      ul: [
        r`From $P V = n R T$ with $n = m/M$: $\rho = \dfrac{m}{V} = \dfrac{P M}{R T}$.`,
        r`$\rho = \dfrac{1.013 \times 10^5 \times ${ex2.M}}{8.314 \times ${ex2.T}} = ${dec(ex2.rho, 3)}$ kg m$^{-3}$.`,
        r`Molar volume $V_m = \dfrac{R T}{P} = \dfrac{8.314 \times ${ex2.T}}{1.013 \times 10^5} = ${dec(ex2.Vm, 3)}$ m$^3$ $= ${dec(ex2.Vm * 1000, 3)}$ litre.`,
      ],
      v: plotIsobars,
      n: `Write the number of moles as mass over molar mass, and the gas equation gives density equal to pressure times molar mass over the gas constant times temperature. For air at one atmosphere and three hundred kelvin that is about one point one eight kilograms per cubic metre. One mole of such a gas occupies about twenty four point six litres.`,
    }),
    sl('concept', 'Real gases and the ideal gas', {
      b: 'The ideal gas is a model; every real gas departs from it somewhere.',
      ul: [
        'Real molecules have a size and attract one another; the ideal model ignores both.',
        'At low pressure and high temperature the molecules are far apart and the model works well.',
        'At high pressure the molecules\' own volume matters; at low temperature attractions matter and the gas liquefies.',
        'The kinetic theory below explains the ideal gas, and tells us what to ignore.',
      ],
      v: TREAL,
      n: 'Real molecules have a size and they attract each other. When the gas is thin and hot, the molecules are far apart and move so fast that these effects hardly matter, so the ideal gas equation works well. Squeeze the gas or cool it, and the departures grow, until the gas finally turns into a liquid.',
    }),
    sl('concept', 'The kinetic model of an ideal gas', {
      b: 'The pressure is explained by a simple model of the molecules:',
      ul: [
        'A gas consists of a very large number of identical molecules in constant random motion.',
        'The molecules are so small, compared with their separation, that their own volume is negligible.',
        'There are no forces between molecules except during collisions; between collisions each moves in a straight line.',
        'Collisions, with each other and with the walls, are **elastic**; the gas has no preferred direction.',
      ],
      v: TASSUME,
      n: 'The kinetic model makes five simple assumptions. There are a great many identical molecules moving at random. They are tiny compared with the distances between them. They exert no forces except when they collide. The collisions are elastic, so no kinetic energy is lost. And no direction is special, so on average a third of the squared speed lies along each axis.',
    }),
    sl('diagram', 'Pressure from one collision', {
      b: 'Follow one molecule of mass $m$ in a cube of side $L$.',
      ul: [
        r`It hits the right wall with $+v_x$ and leaves with $-v_x$: momentum change of the molecule $-2 m v_x$, so the wall gets $2 m v_x$.`,
        r`It crosses the cube and returns in $\dfrac{2L}{v_x}$, so it strikes this wall $\dfrac{v_x}{2L}$ times a second.`,
        r`Average force from this molecule $= \dfrac{2 m v_x}{2L/v_x} = \dfrac{m v_x^2}{L}$.`,
        'Collisions with the other walls and with other molecules do not change this result for the x-direction.',
      ],
      v: V.box,
      n: 'Look at the molecule striking the right hand wall. Its velocity component perpendicular to the wall reverses, so the wall receives twice mass times that component as momentum. The molecule then travels across the cube and back, a distance of two L, before it hits the same wall again. So it delivers a force on average of mass times the component squared, divided by L.',
    }),
    sl('concept', 'Summing over molecules: P = (1/3) ρ v̄²', {
      b: r`The pressure is the total force on the wall of area $L^2$:`,
      m: [r`P = \dfrac{m}{L^3}\left(v_{x1}^2 + v_{x2}^2 + \cdots + v_{xN}^2\right) = \dfrac{N m \,\overline{v_x^2}}{V}`, r`\overline{v_x^2} = \dfrac{\overline{v^2}}{3} \;\Rightarrow\; P = \dfrac{1}{3}\,\dfrac{N}{V}\, m\, \overline{v^2} = \dfrac{1}{3}\,\rho\,\overline{v^2}`],
      ul: [
        r`Because there is no preferred direction, $\overline{v_x^2} = \overline{v_y^2} = \overline{v_z^2}$ and $v^2 = v_x^2 + v_y^2 + v_z^2$.`,
        r`$\rho = N m / V$ is the mass density; $\overline{v^2}$ is the **mean of the squares** of the speeds.`,
        'The pressure is large because N is enormous; it is steady because the collisions are countless.',
      ],
      v: TDERIV,
      n: 'Add up the contribution of all the molecules and divide by the area of the wall. The pressure is the number of molecules times the mass times the average of the squared x component, divided by the volume. With no preferred direction, the average of the squared x component is one third of the average squared speed. So the pressure equals one third of the density times the mean square speed.',
    }),
    sl('example', 'Worked example 3: pressure of hydrogen from its speed', {
      b: r`Hydrogen at $0\,^\circ$C has density $${ex3.rho}$ kg m$^{-3}$ and a mean square speed whose root is $${ex3.v}$ m s$^{-1}$. Find its pressure.`,
      ul: [
        r`$P = \dfrac{1}{3}\rho\,\overline{v^2} = \dfrac{1}{3} \times ${ex3.rho} \times ${ex3.v}^2$.`,
        r`$P = \dfrac{1}{3} \times ${ex3.rho} \times ${ex3.v ** 2} = ${dec(ex3.P, 6)}$ Pa $\approx ${sci(ex3.P, 3)}$ Pa.`,
        'This is about one atmosphere, as it should be for hydrogen at 0 °C and ordinary density.',
      ],
      v: TEX3,
      n: `The pressure is one third of the density times the mean square speed. With a density of point zero nine and a root mean square speed of eighteen hundred and forty metres per second, the squared speed is over three million, and the pressure comes out near one hundred and two thousand pascals, about one atmosphere.`,
    }),
    sl('check', 'Quick check: pressure and speed', {
      b: 'Choose the correct option.',
      v: TDERIV,
      chk: 'vsq-mcq',
      n: 'The pressure depends on the square of the speed.',
    }),
    sl('concept', 'Temperature: mean kinetic energy of translation', {
      b: r`Compare $P V = \tfrac{1}{3} N m \overline{v^2}$ with $P V = N k_B T$:`,
      m: [r`\tfrac{1}{2} m \overline{v^2} = \tfrac{3}{2} k_B T`, r`v_\text{rms} = \sqrt{\overline{v^2}} = \sqrt{\dfrac{3 k_B T}{m}} = \sqrt{\dfrac{3 R T}{M}}`],
      ul: [
        'The kelvin temperature is a measure of the **mean translational kinetic energy** per molecule; it does not depend on the kind of gas.',
        r`$v_\text{rms} \propto \sqrt{T}$ and, at one temperature, $v_\text{rms} \propto 1/\sqrt{M}$: light molecules are fast.`,
        'Total translational kinetic energy of n moles: (3/2) n R T.',
        'At T = 0 K the translational motion would cease (in this classical picture).',
      ],
      v: TTEMP,
      n: 'Compare the kinetic result with the gas equation. The average translational kinetic energy of a molecule equals three halves of the Boltzmann constant times the kelvin temperature. So temperature measures the mean kinetic energy, whatever the gas. The root mean square speed is the square root of three k T over the molecular mass, so it grows with the square root of the temperature and falls for heavier molecules.',
    }),
    sl('example', 'Worked example 4: speeds of nitrogen and oxygen', {
      b: r`Find the rms speed of nitrogen ($M = 28$ g mol$^{-1}$) and of oxygen ($M = 32$ g mol$^{-1}$) at $300$ K, and the mean translational energy of one molecule.`,
      ul: [
        r`$v_\text{rms}(\text{N}_2) = \sqrt{\dfrac{3 \times 8.314 \times ${ex4.T}}{${ex4.MN}}} = ${dec(ex4.vN, 3)}$ m s$^{-1}$.`,
        r`$v_\text{rms}(\text{O}_2) = \sqrt{\dfrac{3 \times 8.314 \times ${ex4.T}}{${ex4.MO}}} = ${dec(ex4.vO, 3)}$ m s$^{-1}$, a ratio of $${dec(ex4.ratio, 3)}$, equal to $\sqrt{32/28}$.`,
        r`Mean energy of either molecule $= \tfrac{3}{2} k_B T = 1.5 \times 1.38 \times 10^{-23} \times ${ex4.T} = ${sci(ex4.ke, 3)}$ J.`,
      ],
      v: V.vrms,
      n: `At three hundred kelvin the root mean square speed of nitrogen is about five hundred and seventeen metres per second, and oxygen, which is a little heavier, is about four hundred and eighty three. Their ratio is the square root of thirty two over twenty eight. But the mean kinetic energy per molecule is the same for both, about six point two times ten to the minus twenty one joule.`,
    }),
    sl('concept', 'Mean speed and rms speed', {
      b: 'There are several averages of the molecular speeds; the kinetic theory uses the root of the mean of the squares.',
      ul: [
        r`Mean speed $\bar v = (v_1 + v_2 + \cdots + v_N)/N$; rms speed $v_\text{rms} = \sqrt{(v_1^2 + \cdots + v_N^2)/N}$.`,
        r`The rms speed is never smaller than the mean speed; they are equal only if all speeds are equal.`,
        'The average velocity of the molecules is zero (they move in all directions), but the rms speed is not zero.',
        'Dalton: in a mixture each gas exerts the pressure it would exert alone; the total is the sum of the partial pressures.',
      ],
      v: V.speeds,
      n: 'The picture shows ten molecules with different speeds. Their mean speed is four hundred metres per second. Squaring each speed, averaging, and taking the root gives about four hundred and thirty six, which is a little more, because squaring gives extra weight to the fast molecules. The average velocity of all the molecules is zero, since they go in every direction, but the rms speed is not.',
    }),
    sl('example', 'Worked example 5: heating a gas', {
      b: r`A gas at $${ex5.t1}\,^\circ$C is heated until its rms speed is ${ex5.k} times as large. What is the new temperature in $^\circ$C?`,
      ul: [
        r`$v_\text{rms} \propto \sqrt{T}$, so $T_2/T_1 = ${ex5.k}^2 = ${ex5.k ** 2}$.`,
        r`$T_1 = ${ex5.t1} + 273 = ${ex5.T1}$ K, so $T_2 = ${ex5.k ** 2} \times ${ex5.T1} = ${ex5.T2}$ K.`,
        r`$t_2 = ${ex5.T2} - 273 = ${ex5.t2}\,^\circ$C: not 27 × ${ex5.k}, because the scale must be kelvin.`,
      ],
      v: plotVrms,
      n: `The root mean square speed goes as the square root of the kelvin temperature. A speed one and a half times larger therefore needs a temperature two point two five times larger. Starting from three hundred kelvin, that is six hundred and seventy five kelvin, or four hundred and two degrees Celsius. Using the Celsius scale directly would give a wrong answer.`,
    }),
    sl('check', 'Quick check: same temperature, different gases', {
      b: 'Judge the assertion and the reason.',
      v: V.vrms,
      chk: 'samet-ar',
      n: 'Decide which quantity depends on the molecular mass at a fixed temperature.',
    }),
    sl('summary', 'Summary — Part 1', {
      b: 'Key results:',
      v: table(
        ['Idea', 'Result'],
        [
          ['Equation of state', 'P V = n R T = N k_B T (T in kelvin)'],
          ['Gas laws', 'Boyle, Charles, Gay-Lussac and Avogadro follow'],
          ['Kinetic model', 'many tiny, elastic, non-interacting molecules, no preferred direction'],
          ['Pressure', 'P = (1/3) ρ v̄² = (1/3)(N/V) m v̄²'],
          ['Temperature', 'mean translational energy (1/2) m v̄² = (3/2) k_B T'],
          ['Speed', 'v_rms = √(3 R T / M) ∝ √T / √M'],
        ],
        'Summary table of the ideal gas equation, kinetic model, pressure, temperature and rms speed',
      ),
      n: 'To sum up. An ideal gas obeys pressure times volume equals n R T, in kelvin. The classical gas laws are special cases. The kinetic model, with many tiny, elastic, independent molecules, gives the pressure as one third of the density times the mean square speed. Comparing the two results shows that the kelvin temperature measures the mean translational kinetic energy, and fixes the root mean square speed.',
    }),
    sl('exam-tips', 'Exam tips — Part 1', {
      ul: [
        'Always convert Celsius to kelvin before using P V = n R T; keep P in pascal and V in m³ when R = 8.314.',
        'In derivations state the assumptions: elastic collisions, point molecules, no preferred direction.',
        'v_rms is the root of the mean of the squares; v_rms ≥ mean speed.',
        'Compare gases at one temperature by mean energy (equal) and by speed (not equal).',
      ],
      v: TDALTON,
      n: 'Convert Celsius to kelvin before using the gas equation, and keep pressure in pascals and volume in cubic metres when you use the gas constant eight point three one four. In a derivation, state the assumptions. Remember that the root mean square speed is at least as large as the mean speed. And at one temperature, different gases have the same mean energy but different speeds.',
    }),
  ],
});

// ================================================================ DECK 2
export const deck2 = deck({
  part: 2,
  title: 'Kinetic Theory — Part 2: Equipartition, specific heats, mean free path and Avogadro\'s number',
  goals: [
    'Count the degrees of freedom of monatomic, diatomic and polyatomic molecules and state the law of equipartition of energy',
    'Obtain molar specific heats and the ratio gamma of gases from the degrees of freedom',
    'Explain mean free path qualitatively, use its formula, and use Avogadro\'s number and law',
  ],
  slides: [
    sl('title', 'Energy of molecules and how far they travel', {
      b: 'Part 2 — how a gas stores energy, why its specific heats take the values they do, and how far a molecule goes between collisions.',
      v: V.dof,
      n: 'Molecules do more than fly in straight lines: a two atom molecule can also spin, and may even vibrate. In this part we count the ways a molecule can store energy, share the energy equally among them, and use that to explain the specific heats of gases. We finish with the distance a molecule travels between collisions, and with Avogadro\'s number.',
    }),
    sl('concept', 'Degrees of freedom', {
      b: 'The **degrees of freedom** of a molecule are the independent ways in which it can possess energy: translation, rotation, vibration.',
      ul: [
        '**Monatomic** (He, Ar): 3 translational; no rotation of a point atom about its centre.',
        '**Diatomic** (O₂, N₂): 3 translational + 2 rotational = 5; the spin about the bond axis does not count.',
        'Non-linear **polyatomic** (H₂O, CH₄): 3 translational + 3 rotational = 6.',
        'A vibrational mode stores both kinetic and potential energy, so it adds 2 quadratic terms; vibrations are active only at high temperatures.',
      ],
      v: V.dof,
      n: 'A single atom can only move through space, so it has three degrees of freedom. A two atom molecule can also rotate about two axes perpendicular to the bond, giving five. A bent three atom molecule can rotate about three axes, giving six. Each vibration adds two more, one for its kinetic energy and one for its potential energy, but at ordinary temperatures vibrations are not excited.',
    }),
    sl('concept', 'The law of equipartition of energy', {
      b: 'In thermal equilibrium at temperature $T$ the total energy is shared equally among all the quadratic terms:',
      m: [r`\text{energy per quadratic term} = \tfrac{1}{2} k_B T \text{ per molecule}`],
      ul: [
        r`A molecule with $f$ quadratic terms has mean energy $\tfrac{f}{2} k_B T$; one mole has internal energy $U = \tfrac{f}{2} R T$.`,
        r`For a monatomic gas the three translational terms give $\tfrac{3}{2} k_B T$, as found from kinetic theory.`,
        'Each vibrational mode counts twice, once for kinetic and once for potential energy.',
        'For an ideal gas the internal energy depends only on the temperature.',
      ],
      v: TEQ,
      n: 'The law of equipartition says that in equilibrium every quadratic term in the energy of a molecule gets, on average, one half of k T. If a molecule has f such terms, its mean energy is f over two times k T, and one mole of gas has internal energy f over two times R T. A vibration counts twice, because it has both a kinetic and a potential term.',
    }),
    sl('example', 'Worked example 6: energy stored in oxygen', {
      b: r`Oxygen at $${ex6.T}$ K (take $f = 5$) is in a closed cylinder. Find the mean energy of one molecule, the internal energy of one mole and of $${ex6.n}$ mol.`,
      ul: [
        r`Per molecule: $\dfrac{f}{2} k_B T = 2.5 \times 1.38 \times 10^{-23} \times ${ex6.T} = ${sci(ex6.eps, 3)}$ J.`,
        r`Per mole: $\dfrac{f}{2} R T = 2.5 \times 8.314 \times ${ex6.T} = ${dec(ex6.Um, 5)}$ J.`,
        r`For ${ex6.n} mol: $U = ${ex6.n} \times ${dec(ex6.Um, 5)} = ${dec(ex6.U, 5)}$ J $\approx ${dec(ex6.U / 1000, 3)}$ kJ.`,
      ],
      v: TEX6,
      n: `For oxygen treated as a rigid two atom molecule, there are five quadratic terms. The mean energy per molecule is five halves of k T, about one point one four times ten to the minus twenty joule. For one mole the internal energy is five halves of R T, near sixty nine hundred joules, so two moles hold about thirteen point seven kilojoules.`,
    }),
    sl('check', 'Quick check: counting degrees of freedom', {
      b: 'Fill in the blank.',
      v: V.dof,
      chk: 'dof-fill',
      n: 'Count translations and rotations for a rigid two atom molecule.',
    }),
    sl('concept', 'Molar specific heats from equipartition', {
      b: r`At constant volume all the heat goes into internal energy $U = \tfrac{f}{2} n R T$:`,
      m: [r`C_V = \dfrac{1}{n}\dfrac{dU}{dT} = \dfrac{f}{2} R, \qquad C_P = C_V + R = \left(\dfrac{f}{2} + 1\right) R, \qquad \gamma = \dfrac{C_P}{C_V} = 1 + \dfrac{2}{f}`],
      ul: [
        r`The relation $C_P - C_V = R$ for an ideal gas comes from the first law, as in the chapter on thermodynamics.`,
        r`$C_P$ is greater than $C_V$: at constant pressure the gas also does work in expanding.`,
        r`Monatomic: $C_V = \tfrac{3}{2}R$, $C_P = \tfrac{5}{2}R$, $\gamma = 5/3$. Rigid diatomic: $C_V = \tfrac{5}{2}R$, $C_P = \tfrac{7}{2}R$, $\gamma = 7/5$.`,
        'The heat capacity of a gas does not depend on temperature in this model (while f does not change).',
      ],
      v: V.cv,
      n: 'At constant volume, the heat added just raises the internal energy, so the molar specific heat is f over two times R. At constant pressure the gas also does work, which adds one more R, so the specific heat at constant pressure is f over two plus one, times R. Their ratio gamma is one plus two over f. A monatomic gas has gamma five thirds, and a rigid diatomic gas has seven fifths.',
    }),
    sl('example', 'Worked example 7: heating nitrogen', {
      b: r`Nitrogen, a rigid diatomic gas ($f = 5$), $${ex7.n}$ mol, is heated through $${ex7.dT}$ K. Find the heat needed at constant volume and at constant pressure, and the work done in the second case.`,
      ul: [
        r`$C_V = \tfrac{5}{2} R = ${dec(ex7.Cv, 4)}$ J mol$^{-1}$ K$^{-1}$ and $C_P = \tfrac{7}{2} R = ${dec(ex7.Cp, 4)}$ J mol$^{-1}$ K$^{-1}$.`,
        r`$Q_V = n C_V \Delta T = ${ex7.n} \times ${dec(ex7.Cv, 4)} \times ${ex7.dT} = ${dec(ex7.QV, 5)}$ J.`,
        r`$Q_P = n C_P \Delta T = ${ex7.n} \times ${dec(ex7.Cp, 4)} \times ${ex7.dT} = ${dec(ex7.QP, 5)}$ J.`,
        r`Work $= Q_P - Q_V = n R \Delta T = ${dec(ex7.W, 5)}$ J, and $\gamma = ${dec(ex7.gamma, 3)}$.`,
      ],
      v: TEX7,
      n: `For a rigid diatomic gas the molar specific heat at constant volume is five halves of R and at constant pressure seven halves of R. For three moles heated through forty kelvin, the constant volume heat is about twenty four hundred and ninety four joules, and the constant pressure heat is about thirty four hundred and ninety two joules. The difference, nine hundred and ninety eight joules, is the work done by the gas as it expands.`,
    }),
    sl('concept', 'Specific heats of different gases', {
      b: 'Table of the predictions of the model; the number f depends on which modes are active.',
      ul: [
        r`Monatomic gases: $C_V = \tfrac{3}{2}R$, $\gamma = 5/3 \approx 1.667$.`,
        'Diatomic gases at ordinary temperatures behave as rigid (vibrations not excited): f = 5, γ = 7/5 = 1.4. At high temperature vibrations add 2 and γ falls to 9/7.',
        r`Non-linear polyatomic gases, rigid: $f = 6$, $C_V = 3R$, $C_P = 4R$, $\gamma = 4/3$. Each active vibrational mode adds $R$ to $C_V$.`,
        r`For a mixture of gases, add the heat capacities of the parts, $C_V = \sum n_i C_{V,i}$ and $C_P = \sum n_i C_{P,i}$, then $\gamma = C_P/C_V$.`,
      ],
      v: TFS,
      n: 'This table collects the predictions. A monatomic gas has five thirds, a rigid diatomic gas seven fifths, and a rigid bent molecule four thirds. If the vibrations of a diatomic gas are switched on at high temperature, f becomes seven and the ratio falls to nine sevenths. For a mixture, add up the heat capacities of the parts before dividing.',
    }),
    sl('example', 'Worked example 8: a mixture of two gases', {
      b: r`A closed vessel holds $${ex8.n1}$ mol of argon ($f = 3$) and $${ex8.n2}$ mol of oxygen ($f = 5$, rigid). Find $\gamma$ for the mixture.`,
      ul: [
        r`$C_V = (${ex8.n1} \times \tfrac{3}{2} + ${ex8.n2} \times \tfrac{5}{2}) R = ${ex8.CvR} R$ (for the whole sample).`,
        r`$C_P = (${ex8.n1} \times \tfrac{5}{2} + ${ex8.n2} \times \tfrac{7}{2}) R = ${ex8.CpR} R$.`,
        r`$\gamma = \dfrac{${ex8.CpR}}{${ex8.CvR}} = ${dec(ex8.gamma, 3)}$, between 5/3 and 7/5.`,
      ],
      v: TFS,
      n: `Add up the heat capacities. At constant volume one mole of argon contributes one and a half R and two moles of oxygen contribute five R, a total of six and a half R. At constant pressure the contributions are two and a half R and seven R, a total of nine and a half R. The ratio is about one point four six, between the values for the two gases.`,
    }),
    sl('check', 'Quick check: a polyatomic gas', {
      b: 'Compute the value.',
      v: V.cv,
      chk: 'cppoly-num',
      n: 'Use the number of degrees of freedom of the rigid non-linear molecule.',
    }),
    sl('concept', 'Mean free path', {
      b: r`Molecules collide with each other. The average distance a molecule travels between two successive collisions is the **mean free path** $\lambda$.`,
      ul: [
        'The path of a molecule is a zigzag; the straight pieces have different lengths, and λ is their average.',
        r`For molecules of diameter $d$ and number density $n$: $\lambda = \dfrac{1}{\sqrt{2}\,\pi d^2 n}$.`,
        r`With $n = P/(k_B T)$: $\lambda = \dfrac{k_B T}{\sqrt{2}\,\pi d^2 P}$.`,
        r`The collision frequency is about (average speed) $/\lambda$.`,
      ],
      v: V.mfp,
      n: 'A molecule in a gas bumps into other molecules again and again, so its path is a zigzag of straight pieces of different lengths. The average length of these pieces is the mean free path. The bigger the molecules, or the more crowded they are, the shorter this distance. The number of collisions per second is the average speed divided by the mean free path.',
    }),
    sl('concept', 'What the mean free path depends on', {
      b: r`From $\lambda = 1/(\sqrt{2}\,\pi d^2 n)$ we can predict how it changes:`,
      ul: [
        'More molecules per unit volume (larger n) means more collisions, so a shorter λ.',
        'Larger molecules (larger d) give a larger target, so a shorter λ; λ depends on d².',
        'At fixed temperature λ ∝ 1/P: halving the pressure doubles λ.',
        'Heating a gas in a sealed vessel does not change n and so does not change λ.',
      ],
      v: plotMfp,
      n: 'The mean free path falls when the gas is more crowded and when the molecules are larger, as the square of the diameter. At a fixed temperature it is inversely proportional to the pressure, so halving the pressure doubles it. But if you heat a gas in a sealed vessel, the number of molecules per unit volume does not change, and neither does the mean free path.',
    }),
    sl('example', 'Worked example 9: nitrogen at one atmosphere', {
      b: r`Take nitrogen as molecules of diameter $${R6(ex9.d * 1e10)}\times 10^{-10}$ m at $1.013 \times 10^5$ Pa and $300$ K, with mean speed about $${ex9.vbar}$ m s$^{-1}$. Find the mean free path and the collision frequency.`,
      ul: [
        r`$n = \dfrac{P}{k_B T} = \dfrac{1.013 \times 10^5}{1.38 \times 10^{-23} \times ${ex9.T}} = ${sci(ex9.n, 3)}$ m$^{-3}$.`,
        r`$\lambda = \dfrac{1}{\sqrt{2}\,\pi d^2 n} = ${sci(ex9.lam, 3)}$ m, about $${Math.round(ex9.ratio)}$ times the molecular diameter.`,
        r`Collisions per second $\approx \dfrac{${ex9.vbar}}{${sci(ex9.lam, 3)}} = ${sci(ex9.freq, 2)}$ s$^{-1}$.`,
      ],
      v: TEX9,
      n: `At one atmosphere and three hundred kelvin there are about two point four times ten to the twenty five molecules in every cubic metre. The mean free path then comes out near one hundred nanometres, which is about three hundred and forty molecular diameters. A molecule moving at about four hundred and seventy metres per second therefore suffers several billion collisions every second.`,
    }),
    sl('example', 'Worked example 10: a low-pressure chamber', {
      b: r`The same gas is held at $${ex10.P}$ Pa and $300$ K in a vacuum tube of length $${ex10.tube}$ m. Compare the mean free path with the tube.`,
      ul: [
        r`$n = \dfrac{P}{k_B T} = \dfrac{${ex10.P}}{1.38 \times 10^{-23} \times ${ex10.T}} = ${sci(ex10.n, 3)}$ m$^{-3}$.`,
        r`$\lambda = \dfrac{1}{\sqrt{2}\,\pi d^2 n} = ${dec(ex10.lam, 3)}$ m, which is larger than the tube.`,
        'A molecule then usually crosses the tube without hitting another molecule; collisions are mostly with the walls.',
      ],
      v: plotMfp,
      n: `Now lower the pressure to one hundredth of a pascal. There are only about two point four times ten to the eighteen molecules per cubic metre, and the mean free path is about one point zero four metres, longer than a half metre tube. A molecule usually crosses from end to end without meeting another molecule, so it collides mainly with the walls.`,
    }),
    sl('check', 'Quick check: halving the pressure', {
      b: 'Choose the correct option.',
      v: plotMfp,
      chk: 'mfpdbl-mcq',
      n: 'At a fixed temperature, think about what happens to the number of molecules per unit volume.',
    }),
    sl('concept', 'Avogadro\'s number and Avogadro\'s law', {
      b: r`One mole of any substance contains $N_A = 6.02 \times 10^{23}$ elementary units.`,
      ul: [
        r`From $P V = N k_B T$: at the same $P$ and $T$, equal volumes of different gases contain the same number $N$ of molecules (**Avogadro\'s law**).`,
        r`One mole of an ideal gas at 0 °C and 1 atm occupies $V_m = RT/P \approx 22.4$ litre; the number density is about $2.7 \times 10^{25}$ m$^{-3}$.`,
        r`The mass of one molecule is $m = M/N_A$; the number of molecules in a sample of mass $m_s$ is $N = (m_s/M) N_A$.`,
        r`The link $R = N_A k_B$ connects the molar and the per-molecule descriptions.`,
      ],
      v: TAVOG,
      n: 'One mole of anything contains Avogadro\'s number of units, six point oh two times ten to the twenty three. From the gas equation, at the same pressure and temperature, equal volumes of different gases hold the same number of molecules. That is Avogadro\'s law. At zero degrees Celsius and one atmosphere, one mole of an ideal gas occupies about twenty two point four litres.',
    }),
    sl('example', 'Worked example 11: counting molecules', {
      b: r`How many molecules are there in $${ex11.mass}$ g of nitrogen ($M = ${ex11.M}$ g mol$^{-1}$), and what is the mass of one molecule? Use $N_A = 6.02 \times 10^{23}$ mol$^{-1}$.`,
      ul: [
        r`$n = \dfrac{${ex11.mass}}{${ex11.M}} = ${ex11.n}$ mol.`,
        r`$N = n N_A = ${ex11.n} \times 6.02 \times 10^{23} = ${sci(ex11.N, 3)}$.`,
        r`$m = \dfrac{M}{N_A} = \dfrac{${ex11.M} \times 10^{-3}}{6.02 \times 10^{23}} = ${sci(ex11.m1, 3)}$ kg.`,
      ],
      v: TEX11,
      n: `Two point eight grams of nitrogen is a tenth of a mole, so it contains a tenth of Avogadro's number of molecules, about six point oh two times ten to the twenty two. The mass of one molecule is the molar mass in kilograms divided by Avogadro's number, about four point six five times ten to the minus twenty six kilograms.`,
    }),
    sl('check', 'Quick check: equal volumes', {
      b: 'Judge the assertion and the reason.',
      v: TAVOG,
      chk: 'avog-ar',
      n: 'Use the gas equation written with the number of molecules.',
    }),
    sl('summary', 'Summary — Part 2', {
      b: 'Key results:',
      v: table(
        ['Idea', 'Result'],
        [
          ['Degrees of freedom', 'monatomic 3; diatomic 5 (7 hot); non-linear polyatomic 6 + vibrations'],
          ['Equipartition', '(1/2) k_B T per quadratic term; U = (f/2) n R T'],
          ['Specific heats', 'C_V = (f/2) R, C_P = C_V + R, γ = 1 + 2/f'],
          ['Mean free path', 'λ = 1 / (√2 π d² n) = k_B T / (√2 π d² P)'],
          ['Avogadro', 'N_A = 6.02 × 10²³ mol⁻¹; equal volumes, equal N at same P, T'],
        ],
        'Summary table of degrees of freedom, equipartition, specific heats, mean free path and Avogadro number',
      ),
      n: 'To sum up. Count the quadratic energy terms of a molecule, and each stores half k T on average. That gives the molar specific heats, f over two R at constant volume and one R more at constant pressure, and the ratio gamma equals one plus two over f. The mean free path is one over root two pi d squared n, and it grows as the pressure falls. Finally, Avogadro\'s number connects moles with molecules.',
    }),
    sl('exam-tips', 'Exam tips — Part 2', {
      ul: [
        'State f for the gas first (3 monatomic, 5 diatomic, 6 polyatomic) and say whether vibrations are active.',
        r`$C_P - C_V = R$ always; $\gamma = 1 + 2/f$.`,
        'For a mixture, add n C_V and n C_P over the components before taking the ratio.',
        r`Mean free path: in a sealed vessel $\lambda$ is unchanged; at fixed $T$, $\lambda \propto 1/P$; also $\lambda \propto 1/d^2$.`,
      ],
      v: TMFPDEP,
      n: 'Begin with the number of degrees of freedom and say whether the vibrations are active. Remember that C P minus C V equals R, and that gamma is one plus two over f. For a mixture, add the heat capacities of the parts first. And for the mean free path, check which quantity is held fixed: a sealed vessel keeps it unchanged, and at a fixed temperature it varies inversely with the pressure.',
    }),
  ],
});
