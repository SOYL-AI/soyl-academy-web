// ch05 Chemical Thermodynamics — two decks: Part 1 (t01–t02) systems, state functions, work, heat, first law, enthalpy, heat capacity;
// Part 2 (t03–t04) calorimetry, enthalpy terms, Hess's law, bond enthalpies, entropy, Gibbs energy and equilibrium.
import { sl, deck, table, flow, svgV, r, dec, near } from './lib.mjs';
import { PV, LEVELS, HESS_SVG, GT, HESS, CACO3 } from './svgs.mjs';

const R = 8.314;
const ln10 = 2.303;
const assert = (ok, msg) => {
  if (!ok) throw new Error(`deck check failed: ${msg}`);
};

export const V = {
  pv: svgV(PV, 'Pressure against volume for one mole of ideal gas expanding from 5 litres to 20 litres at 300 kelvin: the area under the isotherm is the reversible work, the smaller rectangle is the work of a one-step irreversible expansion', 'Reversible work is the maximum work the gas can do.'),
  levels: svgV(LEVELS, 'Enthalpy level diagrams for an exothermic change with negative delta H and an endothermic change with positive delta H'),
  hess: svgV(HESS_SVG, 'Hess cycle: graphite and oxygen go to carbon dioxide directly, or through carbon monoxide, with the same total enthalpy change', 'Enthalpy changes in kJ mol⁻¹ at 298 K.'),
  gt: svgV(GT, 'Gibbs energy change against temperature for the decomposition of calcium carbonate, crossing zero at about 1111 kelvin', 'ΔG = ΔH − TΔS is a straight line of slope −ΔS.'),
};

// ---- numbers used in worked examples (computed here, asserted, interpolated)
const rev = -ln10 * 1 * R * 300 * Math.log10(20 / 5); // J, 1 mol, 300 K, 5 L → 20 L
const irr = -1.25 * (20 - 5) * 100; // J, p_ex = 1.25 bar, 1 L bar = 100 J
assert(near(rev, -3458, 0.002) && irr === -1875, 'work');
const so3 = { dH: -197.8, dn: -1 };
const so3dU = so3.dH - (so3.dn * R * 298) / 1000;
assert(near(so3dU, -195.3, 0.001), 'SO3 dU');
const calQ = 100 * 4.18 * 6.8; // J
const calH = -calQ / 1000 / 0.05; // kJ mol-1
assert(near(calH, -56.8, 0.002), 'neutralisation');
const dfNH3 = -46.1;
const dfNO = 90.3;
const dfH2Og = -241.8;
const oxid = 4 * dfNO + 6 * dfH2Og - 4 * dfNH3;
assert(near(oxid, -905.2, 0.0005), 'NH3 oxidation');
const ethyne = 2 * -393.5 + -285.8 - -1299.6;
assert(near(ethyne, 226.8, 0.001), 'ethyne');
const bondBroken = 4 * 414 + 2 * 498;
const bondFormed = 2 * 799 + 4 * 463;
const bondDH = bondBroken - bondFormed;
assert(bondBroken === 2652 && bondFormed === 3450 && bondDH === -798, 'bond');
const fusS = (6010 / 273.15);
const vapS = (40700 / 373);
assert(near(fusS, 22.0, 0.002) && near(vapS, 109.1, 0.002), 'entropy');
const dG298 = CACO3.dH - (298 * CACO3.dS) / 1000;
assert(near(dG298, 130.5, 0.001) && near(CACO3.Teq, 1111, 0.001), 'CaCO3');
assert(HESS.coToCO2 === -283.0, 'Hess');

export const deck1 = deck({
  part: 1,
  title: 'Chemical Thermodynamics — Part 1: Systems, work, heat, internal energy and enthalpy',
  goals: [
    'Distinguish types of system and identify state functions',
    'Apply the IUPAC sign convention to work and heat, and calculate expansion work',
    'State and apply the first law, ΔU = q + w',
    'Relate ΔH and ΔU, and use heat capacities with C_p − C_v = R',
  ],
  slides: [
    sl('title', 'Chemical Thermodynamics', {
      b: 'Part 1 — how energy moves as heat and work when matter changes, and how to keep an exact account of it.',
      v: table(['Everyday change', 'Energy question thermodynamics asks'], [['Cooking gas burns', 'How much heat is released per mole?'], ['A cold pack cools your ankle', 'Why does dissolving absorb heat?'], ['A piston in a petrol engine', 'How much work can the gas do?'], ['Ice melts in a warm room', 'Why does it happen by itself?']], 'Table of four everyday changes and the thermodynamic question each raises'),
      n: 'Welcome. Whenever a fuel burns, a cold pack chills your ankle or ice melts on the table, energy changes form and moves around. Thermodynamics is the bookkeeping of that energy. In this part we define the terms carefully, fix the sign convention for heat and work, and meet the first law and the enthalpy, which chemists use every day.',
    }),
    sl('concept', 'System, surroundings and types of system', {
      b: 'The part of the universe we study is the **system**; everything else that can exchange energy with it is the **surroundings**. The system is separated by a **boundary**, real or imaginary.',
      v: table(['Type', 'Matter exchange', 'Energy exchange', 'Example'], [['Open', 'Yes', 'Yes', 'Tea in an uncovered cup'], ['Closed', 'No', 'Yes', 'Sealed boiling tube in a water bath'], ['Isolated', 'No', 'No', 'Tea in a good vacuum flask (approximately)']], 'Table comparing open, closed and isolated systems by exchange of matter and energy, with an example of each'),
      n: 'The system is the part we choose to study, and the surroundings are everything else that can exchange energy with it. An open system exchanges both matter and energy, like tea in an open cup. A closed system exchanges only energy, like a sealed tube in a water bath. An isolated system exchanges neither, and a good vacuum flask comes close.',
    }),
    sl('concept', 'State functions and path functions', {
      b: 'A **state function** depends only on the present state of the system, not on how it got there. Heat and work are **path functions**: their values depend on the route taken.',
      v: table(['State functions', 'Path functions'], [[r`$p,\ V,\ T,\ U,\ H,\ S,\ G$`, r`$q,\ w$`], ['Change depends only on initial and final states', 'Change depends on the path'], ['Round trip gives zero change', 'Round trip need not give zero'], ['Exact differential', 'Inexact differential']], 'Table contrasting state functions such as U, H, S and G with path functions heat and work'),
      n: 'A state function depends only on the present condition of the system. Pressure, volume, temperature, internal energy, enthalpy, entropy and Gibbs energy are state functions, so their change depends only on the start and the end. Heat and work are not. They describe how a change was made, and different routes give different amounts.',
    }),
    sl('concept', 'Extensive and intensive properties', {
      b: '**Extensive** properties depend on the amount of matter (mass, volume, $U$, $H$, $S$, $G$). **Intensive** properties do not ($T$, $p$, density, molar quantities). The ratio of two extensive properties is intensive.',
      v: table(['Property', 'Type', 'Why'], [['Volume', 'Extensive', 'Doubles when the amount doubles'], ['Mass', 'Extensive', 'Adds up'], ['Temperature', 'Intensive', 'Same in each half of a sample'], ['Density', 'Intensive', 'Mass divided by volume'], ['Molar enthalpy', 'Intensive', 'Enthalpy divided by amount']], 'Table of extensive and intensive properties with reasons'),
      n: 'Cut a sample in half. Properties that halve, such as mass, volume and internal energy, are extensive. Properties that stay the same, such as temperature, pressure and density, are intensive. A handy rule: the ratio of two extensive properties, for example mass divided by volume, is always intensive.',
    }),
    sl('check', 'Quick check: type of system', {
      b: 'Classify a system by what crosses its boundary.',
      n: 'Quick check. Ask what can cross the boundary: matter, energy, both or neither.',
      chk: 'system-type-mcq',
    }),
    sl('concept', 'Work and heat: the IUPAC sign convention', {
      b: 'Signs are written **from the point of view of the system**. Energy entering the system is **positive**; energy leaving is **negative**. Work done **on** the system is $w > 0$; heat **absorbed** is $q > 0$.',
      v: table(['Event', 'Sign of q', 'Sign of w'], [['Gas expands against surroundings', '—', 'Negative (system does work)'], ['Gas is compressed', '—', 'Positive (work done on system)'], ['System absorbs heat', 'Positive', '—'], ['System releases heat', 'Negative', '—']], 'Table of the IUPAC sign convention for heat and work from the system point of view'),
      n: 'Always take the point of view of the system, like a bank account. Energy flowing in is a deposit and carries a positive sign; energy flowing out is a withdrawal and carries a negative sign. So when a gas expands and pushes the surroundings, the work is negative, and when the system takes in heat, the heat is positive.',
    }),
    sl('diagram', 'Pressure–volume work as an area', {
      b: 'Expansion work equals the **area under the p–V curve**. Reversible expansion follows the isotherm and does the **maximum** work; a one-step irreversible expansion against a constant $p_\\text{ex}$ gives a smaller rectangle.',
      v: V.pv,
      n: 'In this picture the gas expands from five litres to twenty litres. In the one step expansion the gas pushes against a constant outside pressure, and the work is the green rectangle. If the outside pressure always matches the gas pressure, the gas follows the blue curve, and the work is the whole area beneath it. That area is larger, so reversible work is the maximum.',
    }),
    sl('concept', 'Expansion work formulas', {
      b: 'Work is calculated differently for each way of expanding. For an ideal gas at constant temperature, $\\Delta U = 0$, so $q = -w$.',
      m: [r`w = -p_\text{ex}\,\Delta V \quad (\text{irreversible, constant } p_\text{ex})`, r`w_\text{rev} = -2.303\,nRT \log\dfrac{V_2}{V_1} = -2.303\,nRT \log\dfrac{p_1}{p_2}`],
      v: table(['Process', 'Work of the gas'], [['Free expansion into vacuum ($p_\\text{ex} = 0$)', r`$w = 0$`], ['Constant external pressure', r`$w = -p_\text{ex}(V_2 - V_1)$`], ['Isothermal reversible, ideal gas', r`$w = -2.303\,nRT \log (V_2/V_1)$`], ['Unit conversion', r`$1\ \text{L bar} = 100\ \text{J}$`]], 'Table of formulas for expansion work for free, irreversible and reversible isothermal expansion'),
      n: 'Three cases cover most questions. If the gas expands into a vacuum, the outside pressure is zero and no work is done. If it expands against a constant outside pressure, the work is minus that pressure times the change in volume. For a reversible isothermal expansion of an ideal gas, the work is minus two point three zero three times n R T times the logarithm of the volume ratio.',
    }),
    sl('example', 'Worked example: irreversible and reversible work', {
      b: r`**Problem.** One mole of an ideal gas at 300 K expands from 5.0 L to 20 L. Calculate the work done by the gas (a) against a constant $p_\text{ex} = 1.25$ bar and (b) reversibly and isothermally. ($R = 8.314\ \text{J K}^{-1}\text{mol}^{-1}$; $1\ \text{L bar} = 100\ \text{J}$)

**(a)** $w = -p_\text{ex}\Delta V = -1.25 \times (20 - 5.0) = ${dec(-1.25 * 15, 4)}\ \text{L bar} = ${dec(irr, 4)}\ \text{J}$.

**(b)** $w = -2.303 \times 1 \times 8.314 \times 300 \times \log 4 = ${dec(rev, 4)}\ \text{J}$, about $-3.46\ \text{kJ}$.

The reversible path does more work (3458 J against 1875 J).`,
      v: table(['Path', 'Work w / J', 'Sign meaning'], [['Irreversible, 1.25 bar', dec(irr, 4), 'System does 1875 J of work'], ['Reversible isothermal', dec(rev, 4), 'System does 3458 J of work']], 'Table comparing irreversible and reversible work for the same expansion from 5 litres to 20 litres'),
      n: 'Work through it in two parts. Against the constant pressure, multiply minus one point two five bar by the fifteen litre change, giving minus eighteen point seven five litre bar, which is minus one thousand eight hundred seventy five joules. For the reversible path use the logarithm formula and get about minus three thousand four hundred fifty eight joules. The reversible route extracts more work.',
    }),
    sl('concept', 'Internal energy and the first law', {
      b: 'The **internal energy** $U$ is the total energy of the system (kinetic, potential, bonding); it is a state function. The **first law** is the conservation of energy: $\\Delta U = q + w$.',
      v: table(['Situation', 'q', 'w', 'ΔU'], [['Isolated system', '0', '0', '0'], ['Adiabatic change (q = 0)', '0', 'w', 'w'], ['Isothermal change, ideal gas', 'q', 'w', '0 (so q = −w)'], ['Constant volume (w = 0)', 'q_v', '0', 'q_v']], 'Table of the first law applied to isolated, adiabatic, isothermal and constant volume changes'),
      m: [r`\Delta U = q + w`],
      n: 'Internal energy is the total energy stored in a system, and the first law says it can change only by heat flowing in or work being done on it. Written as delta U equals q plus w. In an adiabatic change no heat flows, so the change equals the work. For an ideal gas at constant temperature the internal energy does not change, so heat absorbed equals work done by the gas.',
    }),
    sl('example', 'Worked example: applying the first law', {
      b: r`**Problem.** A gas in a cylinder absorbs 650 J of heat and expands against a constant 0.80 bar from 3.0 L to 9.0 L. Find $w$ and $\Delta U$.

**Step 1.** $w = -p_\text{ex}\Delta V = -0.80 \times 6.0\ \text{L bar} = -4.8\ \text{L bar} = -480\ \text{J}$.

**Step 2.** $q = +650\ \text{J}$ (heat absorbed).

**Step 3.** $\Delta U = q + w = 650 + (-480) = +170\ \text{J}$.`,
      v: flow('LR', [['a', 'q = +650 J (heat in)'], ['b', 'w = −480 J (work out)'], ['c', 'ΔU = +170 J']], [['a', 'c'], ['b', 'c']], 'Flow showing heat in and work out combining to give a net rise in internal energy of 170 joules'),
      n: 'Take the system as the gas. It takes in six hundred fifty joules of heat, which is positive. It pushes back the surroundings, so the work is negative, minus point eight bar times six litres, which is minus four hundred eighty joules. Adding them, the internal energy rises by one hundred seventy joules.',
    }),
    sl('check', 'Quick check: first law', {
      b: 'Apply ΔU = q + w with the correct signs.',
      n: 'Quick check. Write down the sign of heat and work from the point of view of the system before you add.',
      chk: 'first-law-mcq',
    }),
    sl('concept', 'Enthalpy', {
      b: 'At constant pressure, heat absorbed $q_p = \\Delta U + p\\Delta V$. The state function **enthalpy** $H = U + pV$ gives $q_p = \\Delta H$. At constant volume $q_V = \\Delta U$. For reactions with gases, $\\Delta H = \\Delta U + \\Delta n_g RT$.',
      m: [r`\Delta H = \Delta U + \Delta n_g RT`],
      v: table(['Condition', 'Heat measured', 'Gaseous Δn'], [['Constant volume (bomb)', r`$q_V = \Delta U$`, 'Any'], ['Constant pressure (open vessel)', r`$q_p = \Delta H$`, 'Any'], ['Δn_g = 0', r`$\Delta H = \Delta U$`, 'Equal moles of gas on both sides'], ['Δn_g ≠ 0', r`$\Delta H - \Delta U = \Delta n_g RT$`, 'Moles of gaseous products minus reactants']], 'Table relating enthalpy and internal energy changes at constant pressure and constant volume'),
      n: 'Most reactions in the laboratory happen in open vessels at constant pressure, so chemists use enthalpy. Enthalpy is internal energy plus pressure times volume, and the heat absorbed at constant pressure is exactly the change in enthalpy. The two changes differ only through the gases: delta H minus delta U equals the change in moles of gas times R T.',
    }),
    sl('example', 'Worked example: ΔH and ΔU', {
      b: r`**Problem.** For $\ce{2SO2(g) + O2(g) -> 2SO3(g)}$, $\Delta H^\circ = ${dec(so3.dH, 4)}\ \text{kJ}$ at 298 K. Find $\Delta U^\circ$.

**Step 1.** $\Delta n_g = 2 - 3 = -1$.

**Step 2.** $\Delta n_g RT = (-1)(8.314)(298) = -2478\ \text{J} = -2.478\ \text{kJ}$.

**Step 3.** $\Delta U = \Delta H - \Delta n_g RT = ${dec(so3.dH, 4)} - (-2.478) = ${dec(so3dU, 4)}\ \text{kJ}$.`,
      v: table(['Quantity', 'Value'], [['Gas moles, reactants', '3'], ['Gas moles, products', '2'], [r`$\Delta n_g$`, '−1'], [r`$\Delta H$ / kJ`, dec(so3.dH, 4)], [r`$\Delta U$ / kJ`, dec(so3dU, 4)]], 'Table of the quantities used to convert delta H to delta U for the oxidation of sulfur dioxide'),
      n: 'Count the moles of gas. Three on the left, two on the right, so the change is minus one. Multiply by R and the temperature to get minus two point four seven eight kilojoules. Delta U is delta H minus this number, which gives minus one hundred ninety five point three kilojoules. When the volume shrinks, the surroundings do work on the system and the internal energy change is slightly less negative.',
    }),
    sl('concept', 'Heat capacity and C_p − C_v = R', {
      b: '**Heat capacity** $C = q/\\Delta T$ (extensive); **specific heat** is per gram and **molar heat capacity** per mole. At constant volume $\\Delta U = nC_V\\Delta T$; at constant pressure $\\Delta H = nC_p\\Delta T$. For an ideal gas $C_p - C_V = R$.',
      m: [r`q = nC\,\Delta T`, r`C_p - C_V = R`],
      v: table(['Gas (ideal)', 'C_V / J K⁻¹ mol⁻¹', 'C_p / J K⁻¹ mol⁻¹', 'C_p − C_V'], [['Monatomic, 3R/2 for C_V', '12.47', '20.79', '8.314'], ['Dinitrogen (approx.)', '20.8', '29.1', '8.3']], 'Table of molar heat capacities at constant volume and constant pressure showing a difference of R'),
      n: 'Heat capacity tells us how much heat raises the temperature by one kelvin. For a gas it depends on whether the volume or the pressure is held fixed. At constant pressure the gas also does expansion work, so it needs more heat. For one mole of an ideal gas, the difference between the two molar heat capacities is exactly the gas constant R.',
    }),
    sl('diagram', 'Exothermic and endothermic changes', {
      b: 'In an **exothermic** change $\\Delta H < 0$: products have lower enthalpy than reactants. In an **endothermic** change $\\Delta H > 0$.',
      v: V.levels,
      n: 'The level diagram shows enthalpy as height. In an exothermic change the products sit lower than the reactants and heat is released to the surroundings, so delta H is negative. In an endothermic change the products sit higher, heat is absorbed, and delta H is positive. The sign of delta H is the sign of the heat flow at constant pressure.',
    }),
    sl('check', 'Quick check: ΔH and ΔU', {
      b: 'Decide when ΔH and ΔU are equal.',
      n: 'Quick check. Count the moles of gas on each side of the equation.',
      chk: 'dh-du-mcq',
    }),
    sl('summary', 'Summary: Part 1', {
      ul: [
        'Open, closed and isolated systems differ in exchange of matter and energy.',
        'State functions (p, V, T, U, H, S, G) depend only on the state; q and w are path functions.',
        'IUPAC convention: energy into the system is positive. Expansion work is negative.',
        'w = −p_ex ΔV (irreversible); w = −2.303 nRT log(V₂/V₁) (reversible, isothermal); ΔU = q + w.',
        'ΔH = ΔU + Δn_g RT; q_p = ΔH; q_V = ΔU; C_p − C_V = R.',
      ],
      v: table(['Quantity', 'Relation'], [['First law', r`$\Delta U = q + w$`], ['Enthalpy', r`$H = U + pV$`], ['Gas correction', r`$\Delta H = \Delta U + \Delta n_g RT$`], ['Heat capacities', r`$C_p - C_V = R$`]], 'Summary table of the main relations in Part 1'),
      n: 'Let us sum up Part 1. Systems are open, closed or isolated. State functions depend only on the state, while heat and work depend on the path. Using the system point of view, energy entering is positive. The first law says delta U equals q plus w, enthalpy is U plus pV, and delta H differs from delta U by the change in moles of gas times R T.',
    }),
    sl('exam-tips', 'Exam tips: Part 1', {
      ul: [
        'State the sign convention before you calculate: work done by the gas is negative.',
        'Convert units: 1 L bar = 100 J; R = 8.314 J K⁻¹ mol⁻¹ with ΔH in kJ needs ÷ 1000.',
        'For Δn_g count only gaseous species, and use T in kelvin.',
        'Write "state function" examples and the reason: depends only on initial and final states.',
        'Free expansion into a vacuum: w = 0.',
      ],
      v: table(['Slip', 'Fix'], [['Writing w = +pΔV for expansion', 'Expansion by the system: w = −pΔV'], ['Using Δn from all species', 'Only gases count'], ['Mixing J and kJ', 'Convert before subtracting']], 'Table of three common slips in Part 1 and their fixes'),
      n: 'Some exam tips. Say which sign convention you use, and remember that work done by the gas is negative. Convert litre bar to joules and watch the kilojoules in delta H. When you work out delta n for gases, count only the gaseous species. And do not forget that free expansion against zero pressure does no work.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Chemical Thermodynamics — Part 2: Enthalpy of reaction, Hess’s law, entropy and Gibbs energy',
  goals: [
    'Measure ΔU and ΔH by bomb and constant-pressure calorimetry',
    'Define the standard enthalpies of formation, combustion, atomisation, sublimation, phase transition, ionisation, solution and dilution',
    'Apply Hess’s law and bond enthalpies to find ΔH of reactions',
    'Use ΔS = q_rev/T, ΔG = ΔH − TΔS and ΔG° = −2.303RT log K to judge spontaneity and equilibrium',
  ],
  slides: [
    sl('title', 'Enthalpy, Entropy and Spontaneity', {
      b: 'Part 2 — measuring heats of reaction, combining them by Hess’s law, and predicting which changes happen on their own.',
      v: table(['Question', 'Tool'], [['How much heat does a reaction give out?', 'Calorimeter'], ['Can I get an unmeasurable ΔH from known ones?', 'Hess’s law'], ['Does a reaction go by itself?', 'ΔG = ΔH − TΔS'], ['How far does it go?', 'ΔG° and K']], 'Table of four questions of Part 2 and the tool used to answer each'),
      n: 'In this part we measure the heat of a reaction in a calorimeter, learn the named enthalpy changes, and combine them with Hess’s law. Then we ask a deeper question: why do some changes happen by themselves? Entropy and Gibbs energy give the answer, and link directly to the equilibrium constant.',
    }),
    sl('concept', 'Measuring ΔU and ΔH: calorimetry', {
      b: 'A **bomb calorimeter** is a sealed steel vessel at constant volume: it measures $\\Delta U$. A **coffee-cup (open) calorimeter** is at constant pressure: it measures $\\Delta H$. Heat absorbed by the calorimeter $q = C\\Delta T$ or $mc\\Delta T$.',
      m: [r`q_V = -C_\text{cal}\,\Delta T \quad\Rightarrow\quad \Delta U = \dfrac{q_V}{n}`],
      v: table(['Feature', 'Bomb calorimeter', 'Constant-pressure calorimeter'], [['Condition', 'Constant volume, strong steel vessel', 'Constant pressure, open to the air'], ['Measures', r`$\Delta U$`, r`$\Delta H$`], ['Used for', 'Combustion of fuels and foods', 'Neutralisation, solution, reactions in water'], ['Conversion', r`$\Delta H = \Delta U + \Delta n_g RT$`, 'None needed']], 'Table comparing bomb and constant-pressure calorimeters'),
      n: 'A bomb calorimeter is a strong sealed vessel, so the volume stays constant and no expansion work is done. The heat it records is therefore the change in internal energy. A simple cup calorimeter is open to the air, so the pressure is constant and the heat is the enthalpy change. Heat is found from the heat capacity times the temperature rise.',
    }),
    sl('example', 'Worked example: constant-pressure calorimetry', {
      b: r`**Problem.** 50 mL of 1.0 M HCl is mixed with 50 mL of 1.0 M NaOH in a coffee-cup calorimeter; the temperature rises by 6.8 K (given). Take the 100 g of solution to have $c = 4.18\ \text{J g}^{-1}\text{K}^{-1}$. Find $\Delta H$ per mole of water formed.

**Step 1.** Heat gained by solution $= mc\Delta T = 100 \times 4.18 \times 6.8 = ${dec(calQ, 4)}\ \text{J}$.

**Step 2.** Moles of water formed $= 0.050\ \text{mol}$.

**Step 3.** $\Delta H = -\dfrac{${dec(calQ, 4)}}{0.050} = ${dec(calH * 1000, 4)}\ \text{J mol}^{-1} = ${dec(calH, 3)}\ \text{kJ mol}^{-1}$ (textbook value about −57).`,
      v: table(['Quantity', 'Value'], [['Heat gained, J', dec(calQ, 4)], ['Moles of water', '0.050'], ['ΔH / kJ mol⁻¹', dec(calH, 3)]], 'Table of heat gained, moles of water and the enthalpy of neutralisation calculated from the calorimeter data'),
      n: 'The solution warms up, so the reaction released heat. The heat gained by one hundred grams of solution is mass times specific heat times temperature rise, about two thousand eight hundred forty two joules. This came from point zero five zero mole of water forming, so the enthalpy of neutralisation is about minus fifty seven kilojoules per mole, negative because heat was released.',
    }),
    sl('concept', 'Standard enthalpy changes: formation, combustion, atomisation, sublimation', {
      b: 'The **standard state** is the pure substance at 1 bar (298 K is usual). $\\Delta_f H^\\circ$ is for forming **one mole** from elements in their reference states; $\\Delta_f H^\\circ$ of an element is **zero**.',
      v: table(['Enthalpy change', 'Process (one mole)', 'Example value / kJ mol⁻¹'], [['Formation, Δ_fH°', r`$\ce{H2(g) + 1/2O2(g) -> H2O(l)}$`, '−285.8'], ['Combustion, Δ_cH°', r`$\ce{C(graphite) + O2(g) -> CO2(g)}$`, '−393.5'], ['Atomisation, Δ_aH°', r`$\ce{1/2H2(g) -> H(g)}$`, '+218'], ['Sublimation, Δ_subH°', r`$\ce{I2(s) -> I2(g)}$`, '+62']], 'Table of standard enthalpies of formation, combustion, atomisation and sublimation with an example reaction and value for each'),
      n: 'Standard enthalpy changes refer to one mole under standard conditions. Formation builds one mole of a compound from its elements, and the value for an element itself is zero. Combustion burns one mole completely in oxygen and is always negative. Atomisation produces gaseous atoms, and sublimation turns a solid straight into a gas. Both of these absorb heat.',
    }),
    sl('concept', 'Phase transition, ionisation, solution and dilution', {
      b: '**Phase transitions** (fusion, vaporisation) absorb heat. **Ionisation enthalpy** is for removing an electron from a gaseous atom. **Enthalpy of solution** is for dissolving one mole in a large excess of solvent. **Enthalpy of dilution** is for adding more solvent to a solution.',
      v: table(['Enthalpy change', 'Process', 'Example value / kJ mol⁻¹'], [['Fusion', r`$\ce{H2O(s) -> H2O(l)}$ at 273 K`, '+6.01'], ['Vaporisation', r`$\ce{H2O(l) -> H2O(g)}$ at 373 K`, '+40.7'], ['Ionisation, Δ_iH', r`$\ce{Na(g) -> Na+(g) + e-}$`, '+496'], ['Solution (NaOH)', r`$\ce{NaOH(s) -> Na+(aq) + OH-(aq)}$`, '−44.5'], ['Solution (NH₄NO₃)', r`$\ce{NH4NO3(s) -> NH4+(aq) + NO3-(aq)}$`, '+25.7'], ['Dilution', 'Conc. H₂SO₄ + water', 'Strongly negative (hot)']], 'Table of enthalpy changes of phase transition, ionisation, solution and dilution with examples and values'),
      n: 'Melting and boiling absorb heat, so their enthalpy changes are positive. Removing an electron from a gaseous sodium atom costs four hundred ninety six kilojoules per mole. Dissolving sodium hydroxide releases heat, so the solution warms, while ammonium nitrate absorbs heat and cools, which is how a cold pack works. Diluting concentrated sulfuric acid releases a great deal of heat.',
    }),
    sl('check', 'Quick check: enthalpy terms', {
      b: 'Match a process with its enthalpy term.',
      n: 'Quick check. Decide whether the process makes one mole from elements, burns in oxygen, or breaks into atoms.',
      chk: 'enthalpy-term-mcq',
    }),
    sl('concept', 'Hess’s law of constant heat summation', {
      b: 'The enthalpy change of a reaction is the **same whether it takes place in one step or several**, because $H$ is a state function. We can add equations and add their $\\Delta H$ values; reversing an equation changes the sign; multiplying scales $\\Delta H$.',
      m: [r`\Delta_r H^\circ = \sum \Delta_f H^\circ(\text{products}) - \sum \Delta_f H^\circ(\text{reactants})`],
      v: table(['Operation on equation', 'Effect on ΔH'], [['Reverse the equation', 'Change sign'], ['Multiply by n', 'Multiply ΔH by n'], ['Add two equations', 'Add the ΔH values'], ['Use formation data', 'Σ products − Σ reactants']], 'Table of the effect on delta H of reversing, multiplying and adding thermochemical equations'),
      n: 'Because enthalpy is a state function, the total change between the same start and end does not depend on the route. This lets us calculate enthalpy changes that cannot be measured directly. Add the equations to get the target, adding their enthalpy changes. Reverse an equation and the sign flips; double it and the value doubles.',
    }),
    sl('diagram', 'A Hess cycle: graphite to carbon dioxide', {
      b: 'Burning carbon to $\\ce{CO}$ cannot be measured cleanly, but $\\Delta H$ of the second step follows from the other two by **Hess’s law**.',
      v: V.hess,
      n: 'Here graphite and oxygen reach carbon dioxide by two routes. Direct burning releases three hundred ninety three point five kilojoules per mole. Alternatively, first make carbon monoxide, releasing one hundred ten point five, then burn that to carbon dioxide. The second step must release the difference, two hundred eighty three kilojoules, so both routes add up to the same total.',
    }),
    sl('example', 'Worked example: ΔH from enthalpies of formation', {
      b: r`**Problem.** Find $\Delta_r H^\circ$ for $\ce{4NH3(g) + 5O2(g) -> 4NO(g) + 6H2O(g)}$ using $\Delta_f H^\circ$ (kJ mol⁻¹): $\ce{NH3(g)}$ ${dfNH3}, $\ce{NO(g)}$ +${dfNO}, $\ce{H2O(g)}$ ${dfH2Og}, $\ce{O2(g)}$ 0.

**Step 1.** Products: $4(+90.3) + 6(-241.8) = ${dec(4 * dfNO + 6 * dfH2Og, 5)}$.

**Step 2.** Reactants: $4(-46.1) + 5(0) = ${dec(4 * dfNH3, 4)}$.

**Step 3.** $\Delta_r H^\circ = ${dec(4 * dfNO + 6 * dfH2Og, 5)} - (${dec(4 * dfNH3, 4)}) = ${dec(oxid, 4)}\ \text{kJ}$ for the equation as written.`,
      v: table(['Species', 'Δ_fH° / kJ mol⁻¹', 'Moles', 'Contribution / kJ'], [['NO(g)', '+90.3', '4', '+361.2'], ['H₂O(g)', '−241.8', '6', '−1450.8'], ['NH₃(g)', '−46.1', '4', '−184.4'], ['O₂(g)', '0', '5', '0']], 'Table of formation enthalpies and contributions used to find the enthalpy of ammonia oxidation'),
      n: 'Use products minus reactants, each multiplied by its coefficient. The products give plus three hundred sixty one point two minus one thousand four hundred fifty point eight, which is minus eleven hundred eighty nine point six. The reactants give minus one hundred eighty four point four. Subtracting gives minus nine hundred five point two kilojoules for the equation as written.',
    }),
    sl('example', 'Worked example: ΔH_f from enthalpies of combustion', {
      b: r`**Problem.** $\Delta_c H^\circ$: ethyne $-1299.6$, graphite $-393.5$, hydrogen $-285.8$ kJ mol⁻¹. Find $\Delta_f H^\circ$ of $\ce{C2H2(g)}$.

**Step 1.** Target: $\ce{2C(s) + H2(g) -> C2H2(g)}$.

**Step 2.** Combine: $2\Delta_cH(\text{C}) + \Delta_cH(\text{H}_2) - \Delta_cH(\text{C}_2\text{H}_2)$.

**Step 3.** $= 2(-393.5) + (-285.8) - (-1299.6) = ${dec(ethyne, 4)}\ \text{kJ mol}^{-1}$.`,
      v: flow('LR', [['a', 'Elements 2C + H₂'], ['b', 'Burn to 2CO₂ + H₂O'], ['c', 'Ethyne burns to the same products (reversed)'], ['d', 'ΔH_f = +226.8 kJ mol⁻¹']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Flow showing the elements and ethyne burning to the same products, giving the formation enthalpy of ethyne'),
      n: 'Both the elements and ethyne burn to the same products, carbon dioxide and water. Burning the elements releases seven hundred eighty seven plus two hundred eighty five point eight kilojoules. Ethyne itself releases one thousand two hundred ninety nine point six. Making ethyne from its elements is the first route followed by the second, reversed, so the result is plus two hundred twenty six point eight kilojoules per mole.',
    }),
    sl('concept', 'Bond enthalpies', {
      b: '**Bond enthalpy** is the energy needed to break one mole of a bond in the gas phase; it is always positive. For a gaseous reaction, $\\Delta_r H \\approx \\sum (\\text{bonds broken}) - \\sum (\\text{bonds formed})$, using **average** values.',
      v: table(['Bond', 'kJ mol⁻¹', 'Bond', 'kJ mol⁻¹'], [['H–H', '436', 'C=C', '611'], ['C–H', '414', 'O=O', '498'], ['C–C', '347', 'O–H', '463'], ['Cl–Cl', '242', 'C=O in CO₂', '799'], ['H–Cl', '431', 'N≡N', '946']], 'Table of average bond enthalpies in kilojoules per mole'),
      n: 'Breaking bonds costs energy and making bonds releases it. For a reaction between gases we add up the energy needed to break all the bonds in the reactants and subtract the energy released on forming all the bonds in the products. Because these are average values taken over many compounds, the answer is approximate.',
    }),
    sl('example', 'Worked example: ΔH from bond enthalpies', {
      b: r`**Problem.** Estimate $\Delta H$ for $\ce{CH4(g) + 2O2(g) -> CO2(g) + 2H2O(g)}$ using the table above.

**Step 1.** Broken: $4(\text{C–H}) + 2(\text{O=O}) = 4(414) + 2(498) = ${bondBroken}\ \text{kJ}$.

**Step 2.** Formed: $2(\text{C=O}) + 4(\text{O–H}) = 2(799) + 4(463) = ${bondFormed}\ \text{kJ}$.

**Step 3.** $\Delta H = ${bondBroken} - ${bondFormed} = ${bondDH}\ \text{kJ}$ (the value from formation enthalpies is −802 kJ).`,
      v: table(['Bonds broken', 'kJ', 'Bonds formed', 'kJ'], [['4 C–H', '1656', '2 C=O', '1598'], ['2 O=O', '996', '4 O–H', '1852'], ['Total', String(bondBroken), 'Total', String(bondFormed)]], 'Table of bonds broken and formed in the combustion of methane with energy totals'),
      n: 'Count the bonds. Methane has four carbon hydrogen bonds and each oxygen molecule has one double bond, so breaking them costs two thousand six hundred fifty two kilojoules. The products have two carbon oxygen double bonds and four oxygen hydrogen bonds, releasing three thousand four hundred fifty. The difference is minus seven hundred ninety eight, close to the value from formation data.',
    }),
    sl('check', 'Quick check: Hess’s law', {
      b: 'Combine thermochemical equations.',
      n: 'Quick check. Reverse the equation if needed, and change the sign of its enthalpy change.',
      chk: 'hess-mcq',
    }),
    sl('concept', 'Entropy and the second law', {
      b: '**Entropy** $S$ measures the disorder (number of ways of arranging energy and matter) of a system; it is a state function. For a reversible process $\\Delta S = q_\\text{rev}/T$. **Second law:** the total entropy of the system and surroundings increases in a spontaneous process.',
      m: [r`\Delta S = \dfrac{q_\text{rev}}{T}`, r`\Delta S_\text{total} = \Delta S_\text{system} + \Delta S_\text{surr} > 0`],
      v: table(['Change', 'Entropy of the system'], [['Solid → liquid → gas', 'Increases'], ['Dissolving a solid', 'Usually increases'], ['Reaction with more moles of gas', 'Increases'], ['Cooling a substance', 'Decreases'], ['Gas condensing', 'Decreases']], 'Table of changes that increase or decrease the entropy of a system'),
      n: 'Entropy measures how spread out the energy and matter of a system are. Gases have more entropy than liquids, and liquids more than solids. When a reversible heat change takes place at constant temperature, the entropy change is the heat divided by the temperature. The second law states that the total entropy of system and surroundings rises in any spontaneous process.',
    }),
    sl('example', 'Worked example: entropy of fusion and vaporisation', {
      b: r`**Problem.** $\Delta_\text{fus}H = 6.01\ \text{kJ mol}^{-1}$ at 273.15 K and $\Delta_\text{vap}H = 40.7\ \text{kJ mol}^{-1}$ at 373 K for water. Find $\Delta S$ for each.

**Step 1.** At the transition temperature the process is reversible, so $\Delta S = \Delta H/T$.

**Step 2.** $\Delta_\text{fus}S = \dfrac{6010}{273.15} = ${dec(fusS, 3)}\ \text{J K}^{-1}\text{mol}^{-1}$.

**Step 3.** $\Delta_\text{vap}S = \dfrac{40700}{373} = ${dec(vapS, 4)}\ \text{J K}^{-1}\text{mol}^{-1}$; vaporisation gives the larger increase in disorder.`,
      v: table(['Transition', 'ΔH / kJ mol⁻¹', 'T / K', 'ΔS / J K⁻¹ mol⁻¹'], [['Ice → water', '6.01', '273.15', dec(fusS, 3)], ['Water → steam', '40.7', '373', dec(vapS, 4)]], 'Table of enthalpy, temperature and entropy changes for fusion and vaporisation of water'),
      n: 'At the melting point and the boiling point, the change happens reversibly, so entropy change equals the enthalpy change divided by the temperature. Melting one mole of ice raises the entropy by about twenty two joules per kelvin. Boiling raises it by about one hundred nine. Turning a liquid into a vapour creates far more disorder than turning a solid into a liquid.',
    }),
    sl('concept', 'Gibbs energy and spontaneity', {
      b: 'The **Gibbs energy** combines both tendencies at constant $T$ and $p$: $\\Delta G = \\Delta H - T\\Delta S$. A process is **spontaneous** if $\\Delta G < 0$, at **equilibrium** if $\\Delta G = 0$, and non-spontaneous if $\\Delta G > 0$.',
      m: [r`\Delta G = \Delta H - T\Delta S`],
      v: table(['ΔH', 'ΔS', 'ΔG', 'Spontaneous?'], [['Negative', 'Positive', 'Always negative', 'At all temperatures'], ['Positive', 'Negative', 'Always positive', 'At no temperature'], ['Negative', 'Negative', 'Negative at low T', 'Only at low temperatures'], ['Positive', 'Positive', 'Negative at high T', 'Only at high temperatures']], 'Table of the four sign combinations of delta H and delta S and the resulting spontaneity'),
      n: 'Nature favours lower energy and higher disorder, and Gibbs energy balances the two. Delta G equals delta H minus T delta S. If it is negative the change is spontaneous. If the enthalpy change is negative and the entropy change positive, the process always goes. If both have the same sign, the temperature decides which wins.',
    }),
    sl('diagram', 'ΔG against temperature', {
      b: 'For $\\ce{CaCO3(s) -> CaO(s) + CO2(g)}$, $\\Delta H^\\circ = +178.3$ kJ and $\\Delta S^\\circ = +160.5$ J K⁻¹: $\\Delta G$ falls with $T$ and changes sign at $T = \\Delta H/\\Delta S$.',
      v: V.gt,
      n: 'Both the enthalpy and entropy changes for the decomposition of calcium carbonate are positive. At room temperature the enthalpy term wins and the reaction does not go. The line falls as temperature rises, because the entropy term grows, and it crosses zero at about eleven hundred kelvin. Above that temperature the decomposition is spontaneous, which is why lime kilns run very hot.',
    }),
    sl('example', 'Worked example: temperature of spontaneity', {
      b: r`**Problem.** For $\ce{CaCO3(s) -> CaO(s) + CO2(g)}$, $\Delta H^\circ = +178.3\ \text{kJ mol}^{-1}$ and $\Delta S^\circ = +160.5\ \text{J K}^{-1}\text{mol}^{-1}$ (assume both are independent of $T$). (a) Find $\Delta G^\circ$ at 298 K. (b) Find the minimum temperature for spontaneity.

**(a)** $\Delta G^\circ = 178.3 - 298 \times 0.1605 = ${dec(dG298, 4)}\ \text{kJ mol}^{-1}$; positive, so not spontaneous.

**(b)** $\Delta G^\circ = 0$ at $T = \dfrac{\Delta H}{\Delta S} = \dfrac{178300}{160.5} = ${dec(CACO3.Teq, 4)}\ \text{K}$.`,
      v: table(['T / K', 'ΔG° / kJ mol⁻¹', 'Spontaneous?'], [['298', dec(dG298, 4), 'No'], ['1111', '0', 'Equilibrium'], ['1500', dec(CACO3.dH - (1500 * CACO3.dS) / 1000, 3), 'Yes']], 'Table of Gibbs energy change of calcium carbonate decomposition at three temperatures'),
      n: 'At room temperature the entropy term is small, so delta G is positive, about one hundred thirty point five kilojoules per mole. Setting delta G to zero gives the switching temperature: delta H divided by delta S. Be careful with units, as the enthalpy is in kilojoules and the entropy in joules. The answer is about eleven hundred eleven kelvin.',
    }),
    sl('concept', 'ΔG° and the equilibrium constant', {
      b: 'At equilibrium $\\Delta G = 0$, which leads to $\\Delta G^\\circ = -2.303\\,RT\\log K$. A large negative $\\Delta G^\\circ$ means $K \\gg 1$ (products favoured); a positive $\\Delta G^\\circ$ means $K < 1$.',
      m: [r`\Delta G^\circ = -2.303\,RT \log K`],
      v: table(['ΔG°', 'K', 'Position of equilibrium'], [['Negative', 'K > 1', 'Products favoured'], ['Zero', 'K = 1', 'Comparable amounts'], ['Positive', 'K < 1', 'Reactants favoured']], 'Table linking the sign of standard Gibbs energy change to the equilibrium constant'),
      n: 'Gibbs energy also tells us how far a reaction goes. The standard Gibbs energy change equals minus two point three zero three R T times the logarithm of the equilibrium constant. If delta G naught is negative, the logarithm is positive and K is greater than one, so products are favoured. A positive value means reactants are favoured at equilibrium.',
    }),
    sl('check', 'Quick check: spontaneity', {
      b: 'Use ΔG = ΔH − TΔS to judge spontaneity.',
      n: 'Quick check. Look at the signs of the enthalpy and entropy changes, and think about temperature.',
      chk: 'gibbs-sign-mcq',
    }),
    sl('summary', 'Summary: Part 2', {
      ul: [
        'Bomb calorimeter: ΔU at constant V; coffee-cup: ΔH at constant p.',
        'Δ_fH° of an element is zero; Δ_rH° = Σ Δ_fH°(products) − Σ Δ_fH°(reactants).',
        'Hess’s law: ΔH is path independent; reverse changes sign, multiplication scales.',
        'Bond enthalpy: Δ_rH ≈ Σ broken − Σ formed (gases, average values).',
        'ΔS = q_rev/T; ΔG = ΔH − TΔS < 0 for spontaneous change; ΔG° = −2.303 RT log K.',
      ],
      v: table(['Quantity', 'Relation'], [['Hess', r`$\Delta_rH^\circ = \sum\Delta_fH^\circ(\text{P}) - \sum\Delta_fH^\circ(\text{R})$`], ['Entropy', r`$\Delta S = q_\text{rev}/T$`], ['Gibbs', r`$\Delta G = \Delta H - T\Delta S$`], ['Equilibrium', r`$\Delta G^\circ = -2.303RT\log K$`]], 'Summary table of main relations in Part 2'),
      n: 'Let us sum up Part 2. Calorimeters measure heats of reaction, at constant volume for internal energy and at constant pressure for enthalpy. Hess’s law and tables of formation enthalpies let us calculate unmeasurable values, and bond enthalpies give estimates for gases. Entropy measures disorder, Gibbs energy decides spontaneity, and its standard value fixes the equilibrium constant.',
    }),
    sl('exam-tips', 'Exam tips: Part 2', {
      ul: [
        'Products minus reactants for formation data; broken minus formed for bond enthalpies.',
        'Multiply Δ_fH° by the coefficients; elements in standard states are zero.',
        'In ΔG = ΔH − TΔS convert ΔS from J to kJ, and T to kelvin.',
        'Give the Gibbs-energy sign table with a reason for each case.',
        'Write ΔG° = −2.303 RT log K with R = 8.314 J K⁻¹ mol⁻¹ and ΔG° in joules.',
      ],
      v: table(['Slip', 'Fix'], [['Bond enthalpy: formed minus broken', 'Broken minus formed'], ['ΔH in kJ with ΔS in J', 'Convert ΔS to kJ K⁻¹'], ['Using °C in TΔS', 'Use kelvin'], ['Forgetting coefficients in Hess sums', 'Multiply ΔH by moles']], 'Table of four common slips in Part 2 and their fixes'),
      n: 'Some exam tips. For formation data take products minus reactants, but for bond enthalpies take broken minus formed. Multiply each value by its coefficient. In the Gibbs equation convert entropy from joules to kilojoules and use kelvin. When you quote the sign table of spontaneity, give a reason for each of the four cases.',
    }),
  ],
});
