// ISC 11 Chemistry ch11 Thermochemistry: two decks. Part 1 (t01-t02) heats of reaction (formation, combustion, solution, dilution,
// neutralisation), calorimetry, calorific value, constancy of the heat of neutralisation; Part 2 (t03-t04) bond dissociation,
// atomisation, sublimation, phase-transition and ionisation enthalpies, bond-enthalpy estimates, Hess's law and its applications.
import { sl, deck, table, flow, svgV, r } from './lib.mjs';
import { LEVELS_CH4, CALORIMETER, NEUT_BARS, FUEL_BARS, HEATING_CURVE, ATOM_CYCLE, HESS_NOX } from './svgs.mjs';
import { DF, DC, FUELS, FUEL, NEUT, C_WATER, BE, sumB, dHbond, dHrxn, SUB, IE, WATER, ETHENE, NOX, f0, f1, f2, f3, sg, tx } from './data.mjs';

export const V = {
  levels: svgV(LEVELS_CH4, 'Energy levels linking the enthalpy of formation and the enthalpy of combustion of methane', 'ΔfH(CH₄) + ΔcH(CH₄) = ΔfH(CO₂) + 2ΔfH(H₂O).'),
  calorimeter: svgV(CALORIMETER, 'A simple solution calorimeter with thermometer, stirrer, lid and insulating cup', 'q = m c ΔT; ΔH = −q / n.'),
  neut: svgV(NEUT_BARS, 'Bar chart of the heat of neutralisation for strong and weak acids with sodium hydroxide', 'Strong acid with strong base: 57.1 kJ per mole of water.'),
  fuels: svgV(FUEL_BARS, 'Bar chart of the calorific values of seven fuels in kJ per gram', 'Hydrogen: 142.9 kJ g⁻¹.'),
  heating: svgV(HEATING_CURVE, 'Heating curve of one mole of water from minus 10 to 120 degrees Celsius', 'Fusion 6.01 and vaporisation 40.7 kJ mol⁻¹.'),
  atom: svgV(ATOM_CYCLE, 'Hess cycle for the atomisation of ethene', 'ΔatomH(C₂H₄) = 2305.4 − 52.3 = 2253.1 kJ.'),
  hess: svgV(HESS_NOX, 'Energy levels showing that two steps and the direct route give the same enthalpy change for nitrogen and oxygen forming nitrogen dioxide', 'ΔH₃ = ΔH₁ + ΔH₂.'),
};

// ---- worked-example data
const prop = FUEL.C3H8;
const dcProp = DC.C3H8;
const heatProp = 14200 * prop.cv;
const nEx = 0.1; // 50 cm3 of 2.0 M each
const qEx = nEx * 57.1 * 1000;
const dTEx = qEx / (100 * C_WATER);
const vinyl = dHbond([[1, 'C≡C'], [1, 'H–Cl']], [[1, 'C=C'], [1, 'C–H'], [1, 'C–Cl']]);
const kIon = 89.0 + IE.K;
const dehyd = dHrxn([[1, 'C2H6']], [[1, 'C2H4'], [1, 'H2']]);
const ethF = 2 * -393.5 + 2 * -285.8 - -1410.9;

export const deck1 = deck({
  part: 1,
  title: 'Thermochemistry — Part 1: Heats of reaction, calorific value and neutralisation',
  goals: [
    'Define the standard enthalpies of formation, combustion, solution, dilution and neutralisation and write thermochemical equations',
    'Calculate the calorific value of a fuel and use a simple calorimeter to find an enthalpy change',
    'Explain why the heat of neutralisation of a strong acid by a strong base is constant and why it is lower for weak acids and bases',
  ],
  slides: [
    sl('title', 'Heat changes that we can measure and tabulate', {
      b: 'Part 1: the **heats of reaction** — formation, combustion, solution, dilution and neutralisation — and how a calorimeter and the **calorific value** turn them into numbers.',
      v: flow('LR', [['a', 'Heat of reaction ΔH'], ['b', 'Formation and combustion'], ['c', 'Solution and dilution'], ['d', 'Neutralisation'], ['e', 'Calorific value of a fuel']], [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'e']], 'Flow chart of the topics of Part 1'),
      n: 'Welcome to Part One of thermochemistry. Every chemical change takes in or gives out heat, and the heat of reaction is the enthalpy change measured at constant pressure. We meet the special names for these heats: formation, combustion, solution, dilution and neutralisation, and then measure them with a calorimeter.',
    }),
    sl('concept', 'The enthalpy change of a reaction', {
      b: 'The **enthalpy of reaction** ΔH is the heat exchanged at constant pressure when the reaction occurs in the **molar amounts shown by the equation**. **ΔH < 0**: exothermic, heat given out. **ΔH > 0**: endothermic. A **thermochemical equation** states the physical states and the value of ΔH. **Standard** values refer to 1 bar and the stated temperature (298 K).',
      v: table(['Type of heat of reaction', 'Change for one mole of …', 'Example (kJ mol⁻¹)'], [['Formation, ΔfH°', 'compound made from its elements', 'C(graphite) + O₂ → CO₂: −393.5'], ['Combustion, ΔcH°', 'substance burnt completely in oxygen', 'H₂ + ½O₂ → H₂O(l): −285.8'], ['Solution', 'solute dissolved in a large amount of solvent', 'NaOH(s) in water: −44.5'], ['Dilution', 'solution made more dilute with solvent', 'concentrated H₂SO₄ + water: negative'], ['Neutralisation', 'water formed from acid and base', 'strong acid + strong base: −57.1']], 'Table of the types of heat of reaction with examples'),
      n: 'The enthalpy of reaction is the heat exchanged at constant pressure for the amounts shown in the equation. A negative value means heat is given out, and a positive value means heat is taken in. A thermochemical equation states the physical states and the value, and standard values refer to one bar pressure and two hundred ninety eight kelvin.',
    }),
    sl('concept', 'Standard enthalpy of formation and of combustion', {
      b: r`**Formation, ΔfH°:** one mole of a compound is formed from its **elements in their standard states**; by convention ΔfH° of an element in its standard state is **zero**. Example: $\ce{2C(graphite) + 3H2(g) + 1/2O2(g) -> C2H5OH(l)}$, −277.7 kJ mol⁻¹.

**Combustion, ΔcH°:** one mole of a substance **burns completely in excess oxygen**; always **negative**. Example: $\ce{CH4(g) + 2O2(g) -> CO2(g) + 2H2O(l)}$, −890.3 kJ mol⁻¹.`,
      v: table(['Substance', 'ΔfH° (kJ mol⁻¹)', 'Substance', 'ΔfH° (kJ mol⁻¹)'], [['CO₂(g)', sg(DF.CO2), 'CH₄(g)', sg(DF.CH4)], ['H₂O(l)', sg(DF.H2Ol), 'C₂H₆(g)', sg(DF.C2H6)], ['H₂O(g)', sg(DF.H2Og), 'C₂H₄(g)', sg(DF.C2H4)], ['CO(g)', sg(DF.CO), 'NH₃(g)', sg(DF.NH3)]], 'Table of standard enthalpies of formation used in this chapter'),
      n: 'The standard enthalpy of formation is the heat change when one mole of a compound is made from its elements in their standard states. For an element in its standard state it is zero by convention. The enthalpy of combustion is the heat change when one mole of a substance burns completely in oxygen, and it is always negative.',
    }),
    sl('diagram', 'Formation and combustion are linked', {
      b: 'For methane: **ΔfH(CH₄) + ΔcH(CH₄) = ΔfH(CO₂) + 2ΔfH(H₂O)**, so $\\Delta_cH = [-393.5 + 2(-285.8)] - (-74.8) = -890.3$ kJ mol⁻¹. The energy-level diagram shows both routes from the elements to the products.',
      v: V.levels,
      n: 'This energy level diagram is drawn to scale. The elements sit at zero. Forming methane lowers the energy a little, and burning methane lowers it much further. The direct route from the elements to carbon dioxide and water is the sum of the two steps, so the combustion enthalpy equals the formation enthalpies of the products minus that of methane.',
    }),
    sl('example', 'Worked example: enthalpy of combustion of propane', {
      b: r`**Problem.** Find ΔcH of propane from ΔfH (C₃H₈ ${sg(DF.C3H8)}, CO₂ ${sg(DF.CO2)}, H₂O(l) ${sg(DF.H2Ol)} kJ mol⁻¹).

$\ce{C3H8(g) + 5O2(g) -> 3CO2(g) + 4H2O(l)}$

$\Delta_cH = [3(${tx(DF.CO2)}) + 4(${tx(DF.H2Ol)})] - (${tx(DF.C3H8)}) = -1180.5 - 1143.2 + 103.8 = ${tx(dcProp)}$ kJ mol⁻¹.`,
      v: table(['Quantity', 'Working', 'kJ mol⁻¹'], [['Products', '3(−393.5) + 4(−285.8)', '−2323.7'], ['Reactants', '−103.8 + 5(0)', sg(DF.C3H8)], ['ΔcH = products − reactants', '−2323.7 − (−103.8)', sg(dcProp)]], 'Table of the calculation of the enthalpy of combustion of propane from enthalpies of formation'),
      n: 'Write the balanced combustion equation. Add up the formation enthalpies of the products, three carbon dioxide and four liquid water, and subtract the formation enthalpy of propane. Oxygen is an element, so it contributes zero. The result is about minus two thousand two hundred twenty kilojoules for each mole of propane.',
    }),
    sl('check', 'Quick check: one equation, two names', {
      b: 'Which definitions does the equation H₂ + ½O₂ → H₂O(l) satisfy at the same time?',
      n: 'Quick check. Look at the equation for burning hydrogen to liquid water. Ask yourself what it describes if you start from the elements in their standard states, and whether the product is one mole of a compound. Then choose the enthalpy that has the same numerical value.',
      chk: 'comb-h2-mcq',
    }),
    sl('concept', 'Enthalpy of solution and of dilution', {
      b: 'The **enthalpy of solution** is the enthalpy change when **one mole of solute dissolves** in a specified, large amount of solvent. It is the balance of the energy to separate the particles (**absorbed**) and the energy of **hydration** (**released**): exothermic for NaOH, endothermic for NH₄NO₃. The **enthalpy of dilution** is the heat change when more solvent is added to a solution.',
      v: table(['Process', 'ΔH (kJ mol⁻¹)', 'Effect on the water'], [['NaOH(s) dissolving', '−44.5', 'warms'], ['NH₄NO₃(s) dissolving', '+25.7', 'cools'], ['CuSO₄(s) dissolving', '−66.5', 'warms'], ['CuSO₄·5H₂O(s) dissolving', '+11.7', 'cools slightly'], ['Concentrated H₂SO₄ + water', 'negative', 'warms strongly']], 'Table of enthalpies of solution and their effect on the temperature'),
      n: 'The enthalpy of solution is the heat change when one mole of solute dissolves in a large amount of solvent. It balances the energy needed to separate the particles against the energy released when they are hydrated. Sodium hydroxide warms the water, while ammonium nitrate cools it. Dilution of a solution also changes the heat content.',
    }),
    sl('diagram', 'Measuring a heat change: the calorimeter', {
      b: 'In a **solution calorimeter** (insulated cup, lid, thermometer, stirrer) the heat absorbed by the solution is **q = m c ΔT**, with c = 4.18 J g⁻¹ K⁻¹ and density 1 g cm⁻³. The heat of reaction is the same size and opposite in sign: **ΔH = −q / n**, where n is the number of moles of the limiting reagent.',
      v: V.calorimeter,
      n: 'A simple calorimeter is an insulated cup with a lid, a thermometer and a stirrer. The heat taken up by the solution is the mass times the specific heat times the temperature rise. The enthalpy change of the reaction has the opposite sign, and it is divided by the number of moles of the limiting reagent to give the value per mole.',
    }),
    sl('concept', 'Calorific value of a fuel', {
      b: r`The **calorific value** is the heat released when **unit mass** of a fuel burns completely, in **kJ g⁻¹** (or kJ kg⁻¹). **Calorific value = −ΔcH / M.** Hydrogen has the highest value among common fuels, so rockets use it.`,
      v: V.fuels,
      n: 'The calorific value of a fuel is the heat released when one gram burns completely. It equals minus the enthalpy of combustion divided by the molar mass. Hydrogen is far ahead of the other fuels, with about one hundred forty three kilojoules per gram. The hydrocarbons are close to fifty, while ethanol and glucose give much less.',
    }),
    sl('example', 'Worked example: a propane cylinder', {
      b: r`**Problem.** A cylinder holds 14.2 kg of propane (M = 44 g mol⁻¹, ΔcH = ${tx(dcProp)} kJ mol⁻¹). Find the calorific value and the heat from one cylinder.

Calorific value $= \dfrac{2219.9}{44} = ${f2(prop.cv)}$ kJ g⁻¹ (taking ${f1(prop.cv)} kJ g⁻¹).

Heat $= 14\,200 \times ${f2(dcProp / -44)} \approx 7.16 \times 10^{5}$ kJ.`,
      v: table(['Step', 'Working', 'Result'], [['Moles of propane', '14 200 g / 44 g mol⁻¹', '322.7 mol'], ['Calorific value', '2219.9 / 44', `${f2(prop.cv)} kJ g⁻¹`], ['Heat from the cylinder', '322.7 × 2219.9', `${f0(heatProp)} kJ`]], 'Table of the calorific value and heat from a propane cylinder'),
      n: 'Divide the enthalpy of combustion by the molar mass to get the heat per gram, about fifty point five kilojoules. The cylinder holds fourteen thousand two hundred grams of propane, so multiply, and the heat is about seven hundred sixteen thousand kilojoules. Check by finding the moles of propane and multiplying by the heat per mole.',
    }),
    sl('check', 'Quick check: heat from a trekking burner', {
      b: 'Convert the mass to moles, then multiply by the heat per mole.',
      n: 'Quick check. Divide the mass of the propane by its molar mass to find the moles. Then multiply by the magnitude of the enthalpy of combustion. Remember that the heat released is a positive quantity in this question, which asks for the heat given out.',
      chk: 'stove-num',
    }),
    sl('concept', 'Heat of neutralisation of strong acids and bases', {
      b: r`The **enthalpy of neutralisation** is the heat released when an acid and a base react to form **one mole of water**. For any **strong acid + strong base** in dilute solution it is nearly constant, **−57.1 kJ mol⁻¹**: both are completely ionised, so the spectator ions do not change and the net reaction is always $\ce{H+(aq) + OH-(aq) -> H2O(l)}$. For H₂SO₄ the value is quoted per mole of water (−114.2 kJ per mole of acid).`,
      v: V.neut,
      n: 'When a strong acid reacts with a strong base in dilute solution, both are completely ionised. The other ions are only spectators, so the net change is hydrogen ions combining with hydroxide ions to form water. That is why every such pair gives the same heat, about fifty seven kilojoules per mole of water.',
    }),
    sl('concept', 'Why weak acids and bases give less heat', {
      b: 'A **weak acid** is only partly ionised. As the base removes H⁺, more molecules must ionise, and **ionisation absorbs energy**. So the heat released is **less** than 57.1 kJ mol⁻¹; the shortfall is roughly the **enthalpy of ionisation**. The weaker the acid, the larger the shortfall.',
      v: table(['Acid + NaOH', 'ΔH neutralisation (kJ mol⁻¹)', 'Shortfall from −57.1 (kJ mol⁻¹)', 'Strength'], [['HCl', sg(NEUT.strong), '0', 'strong'], ['CH₃COOH', sg(NEUT.ethanoic), f1(57.1 + NEUT.ethanoic), 'weak'], ['HCN', sg(NEUT.hcn), f1(57.1 + NEUT.hcn), 'very weak']], 'Table of the heat of neutralisation and the energy of ionisation of weak acids'),
      n: 'A weak acid is only partly ionised. During neutralisation more molecules have to ionise, and ionisation absorbs energy. This reduces the heat released. The weaker the acid, the larger the shortfall from fifty seven kilojoules. Ethanoic acid falls short by about two, while hydrogen cyanide falls short by about forty five.',
    }),
    sl('example', 'Worked example: temperature rise on neutralisation', {
      b: r`**Problem.** 50 cm³ of 2.0 M HCl is mixed with 50 cm³ of 2.0 M NaOH. Find the temperature rise (ΔH = −57.1 kJ mol⁻¹; c = 4.18 J g⁻¹ K⁻¹; density 1 g cm⁻³).

Moles of water $= 0.050 \times 2.0 = ${f2(nEx)}$ mol. $q = ${f2(nEx)} \times 57\,100 = ${f0(qEx)}$ J. Mass $= 100$ g.

$\Delta T = \dfrac{q}{mc} = \dfrac{${f0(qEx)}}{100 \times 4.18} = ${f1(dTEx)}$ K.`,
      v: table(['Step', 'Working', 'Result'], [['Moles of water', '0.050 L × 2.0 M', `${f2(nEx)} mol`], ['Heat released', '0.10 × 57 100 J', `${f0(qEx)} J`], ['Temperature rise', '5710 / (100 × 4.18)', `${f1(dTEx)} K`]], 'Table of the temperature-rise calculation for an acid-base mixture'),
      n: 'First find the moles of water formed from the volume and the molarity. Multiply by the molar heat of neutralisation to get the heat in joules. Then divide by the mass of the solution times its specific heat. The temperature rises by about thirteen point seven kelvin for these concentrated solutions.',
    }),
    sl('check', 'Quick check: the limiting reagent', {
      b: 'Compare the moles of H⁺ and OH⁻; the smaller one fixes the water formed.',
      n: 'Quick check. Work out the moles of hydrogen ions from the acid and the moles of hydroxide ions from the base. The reagent present in the smaller amount limits how much water forms. Use that amount to find the heat, and then the total mass of solution.',
      chk: 'neut-temp-mcq',
    }),
    sl('summary', 'Summary: Part 1', {
      ul: [
        'ΔfH°: one mole of compound from its elements in standard states (zero for an element); ΔcH°: one mole burnt completely, always negative.',
        'ΔcH = Σ ΔfH(products) − Σ ΔfH(reactants); the enthalpies of solution and dilution depend on hydration against separation of the particles.',
        'Calorimeter: q = m c ΔT; ΔH = −q / n. Calorific value = −ΔcH / M in kJ g⁻¹.',
        'Strong acid + strong base: H⁺ + OH⁻ → H₂O, ΔH = −57.1 kJ mol⁻¹ of water.',
        'Weak acids and bases release less because ionisation absorbs energy (CH₃COOH −55.2, HCN −12.1 kJ mol⁻¹).',
      ],
      v: table(['Idea', 'Key fact'], [['Formation of an element', 'zero in its standard state'], ['Calorific value', '−ΔcH / M, kJ g⁻¹'], ['Strong acid and base', '−57.1 kJ per mole of water'], ['Weak acid', 'less heat: ionisation absorbs energy']], 'Summary table of the key ideas of Part 1'),
      n: 'Let us sum up Part One. Formation and combustion enthalpies are linked, and combustion is always negative. A calorimeter gives the heat from the temperature rise. Calorific value is the heat per gram of fuel. Strong acids and bases always release about fifty seven kilojoules per mole of water, and weak ones release less because ionisation takes in energy.',
    }),
    sl('exam-tips', 'Exam tips: Part 1', {
      ul: [
        'Write the physical states in every thermochemical equation, and give ΔH with its sign and unit (kJ mol⁻¹).',
        'In calorimetry convert volume and concentration to moles of the limiting reagent before using ΔH = −q / n.',
        'Calorific value is per gram (or kilogram), not per mole: divide ΔcH by the molar mass.',
        'For H₂SO₄ quote the heat per mole of water formed (−57.1), not per mole of acid.',
        'Explain weak acids by ionisation absorbing energy, not by saying "they are less reactive".',
      ],
      v: table(['Slip', 'Fix'], [['Writing ΔfH of O₂(g) as −ve or +ve', 'It is zero for an element in its standard state'], ['Using the total volume as moles', 'Moles = volume in dm³ × molarity'], ['Giving calorific value in kJ mol⁻¹', 'Divide by M to get kJ g⁻¹']], 'Table of common slips in Part 1 and their fixes'),
      n: 'Some exam tips. Write the physical states in every thermochemical equation and give the sign and unit of the enthalpy change. In calorimetry work out the moles of the limiting reagent first. Calorific value is per gram, so divide by the molar mass. For weak acids, explain the lower heat by the energy needed for ionisation.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Thermochemistry — Part 2: Bond, atomisation, phase and ionisation enthalpies; Hess’s law',
  goals: [
    'Define bond dissociation, atomisation, sublimation, phase-transition and ionisation enthalpies and estimate a reaction enthalpy from bond enthalpies',
    'State Hess’s law and explain why it holds',
    'Use Hess’s law with enthalpy cycles, combustion data and formation data to find enthalpies that cannot be measured directly',
  ],
  slides: [
    sl('title', 'Enthalpies of breaking and changing', {
      b: 'Part 2: enthalpies of **bond dissociation, atomisation, sublimation, phase change and ionisation**, then **Hess’s law**, which lets us add them up.',
      v: table(['Enthalpy', 'Change', 'Sign'], [['Bond dissociation', 'X–Y(g) → X(g) + Y(g)', 'positive'], ['Atomisation', 'element or compound → gaseous atoms', 'positive'], ['Sublimation', 'solid → vapour', 'positive'], ['Fusion, vaporisation', 'solid → liquid → vapour', 'positive'], ['Ionisation', 'X(g) → X⁺(g) + e⁻', 'positive']], 'Table of the enthalpies of Part 2'),
      n: 'Welcome to Part Two. Here we meet the enthalpies that tell us how much energy it takes to break bonds, to make atoms, to change a solid into a vapour and to remove electrons. All of them are positive. Then Hess law shows how to add enthalpy changes to find values that cannot be measured directly.',
    }),
    sl('concept', 'Bond dissociation and mean bond enthalpy', {
      b: 'The **bond dissociation enthalpy** is the energy needed to break one mole of a particular bond in a **gaseous** molecule. In a polyatomic molecule the values for one kind of bond differ a little, so a **mean bond enthalpy** is tabulated. **ΔH(reaction) = Σ (bonds broken) − Σ (bonds formed)**: breaking costs energy, forming releases it.',
      v: table(['Bond', 'Enthalpy (kJ mol⁻¹)', 'Bond', 'Enthalpy (kJ mol⁻¹)'], [['H–H', String(BE['H–H']), 'C=C', String(BE['C=C'])], ['C–H', String(BE['C–H']), 'C≡C', String(BE['C≡C'])], ['C–C', String(BE['C–C']), 'C–Cl', String(BE['C–Cl'])], ['O=O', String(BE['O=O']), 'H–Cl', String(BE['H–Cl'])], ['Cl–Cl', String(BE['Cl–Cl']), 'O–H', String(BE['O–H'])]], 'Table of mean bond enthalpies'),
      n: 'The bond dissociation enthalpy is the energy needed to break one mole of a bond in a gaseous molecule. Because the value differs slightly between molecules, tables give mean values. The enthalpy of a reaction is the sum of the energies of the bonds broken minus the sum of the energies of the bonds formed.',
    }),
    sl('concept', 'Enthalpy of atomisation', {
      b: r`The **enthalpy of atomisation** is the enthalpy change when **one mole of gaseous atoms** is formed from the element (or compound) in its standard state. For a metal it equals the **enthalpy of sublimation**; for a diatomic gas it is **half the bond dissociation enthalpy**: $\ce{1/2Cl2(g) -> Cl(g)}$, ${BE['Cl–Cl'] / 2} kJ mol⁻¹. For a compound, such as $\ce{CH4(g) -> C(g) + 4H(g)}$, it is the sum of the bond enthalpies broken.`,
      v: table(['Species', 'Atomisation equation', 'ΔatomH (kJ mol⁻¹)'], [['C (graphite)', 'C(graphite) → C(g)', String(SUB.C)], ['H', '½H₂(g) → H(g)', String(BE['H–H'] / 2)], ['Cl', '½Cl₂(g) → Cl(g)', String(BE['Cl–Cl'] / 2)], ['Na', 'Na(s) → Na(g)', String(SUB.Na)]], 'Table of enthalpies of atomisation of some elements'),
      n: 'The enthalpy of atomisation is the heat needed to form one mole of gaseous atoms. For a solid element such as carbon or sodium it equals the enthalpy of sublimation. For a diatomic gas such as chlorine it is half of the bond dissociation enthalpy, because one mole of molecules gives two moles of atoms.',
    }),
    sl('diagram', 'A Hess cycle for the atomisation of ethene', {
      b: r`Atomising the **elements** costs $2(${SUB.C}) + 2(${BE['H–H']}) = 2305.4$ kJ. Ethene lies **+52.3 kJ above** the elements, so $\Delta_{atom}H(\ce{C2H4}) = 2305.4 - 52.3 = ${f1(ETHENE.atomisation)}$ kJ mol⁻¹. The sum of the bond enthalpies, $4(414) + 611 = ${ETHENE.fromBonds}$ kJ, is close to this.`,
      v: V.atom,
      n: 'Here is a cycle for ethene. Going directly from the elements to gaseous atoms costs the sublimation of two carbons and the breaking of two hydrogen molecules. The other route forms ethene first and then atomises it. By the cycle, the atomisation enthalpy of ethene is the direct total minus the formation enthalpy, about two thousand two hundred fifty three kilojoules.',
    }),
    sl('example', 'Worked example: ΔH from bond enthalpies', {
      b: r`**Problem.** Estimate ΔH for $\ce{HC#CH(g) + HCl(g) -> H2C=CHCl(g)}$ (C≡C 837, H–Cl 431, C=C 611, C–H 414, C–Cl 326 kJ mol⁻¹).

Broken: C≡C + H–Cl $= 837 + 431 = 1268$ kJ. Formed: C=C + C–H + C–Cl $= 611 + 414 + 326 = 1351$ kJ.

$\Delta H = 1268 - 1351 = ${tx(vinyl, 0)}$ kJ mol⁻¹: exothermic.`,
      v: table(['', 'Bonds', 'Energy (kJ)'], [['Broken (absorbed)', 'C≡C, H–Cl', '1268'], ['Formed (released)', 'C=C, C–H, C–Cl', '1351'], ['ΔH = broken − formed', '', sg(vinyl, 0)]], 'Table of the bonds broken and formed in the addition of hydrogen chloride to ethyne'),
      n: 'List the bonds broken: one carbon carbon triple bond and one hydrogen chlorine bond, which cost one thousand two hundred sixty eight kilojoules. List the bonds formed: a double bond, a carbon hydrogen bond and a carbon chlorine bond, which release one thousand three hundred fifty one. The difference is minus eighty three, so the reaction is exothermic.',
    }),
    sl('check', 'Quick check: which equation is sublimation?', {
      b: 'Sublimation goes straight from solid to vapour, with the same molecules.',
      n: 'Quick check. Sublimation is the change from solid to vapour without passing through the liquid state, and the particles stay as the same molecules. Compare each equation with this and discard those that break bonds into atoms or start from the liquid.',
      chk: 'sub-mcq',
    }),
    sl('concept', 'Phase-transition enthalpies', {
      b: 'The **enthalpy of fusion** (solid → liquid) and **vaporisation** (liquid → gas) are positive; during the change the **temperature stays constant** because the heat goes into the phase change. For water: ΔfusH = 6.01, ΔvapH = 40.7 kJ mol⁻¹. At one temperature, **ΔsubH = ΔfusH + ΔvapH**.',
      v: V.heating,
      n: 'This heating curve is for one mole of water. The temperature rises as ice absorbs heat, then stays constant at zero degrees while the ice melts. It rises again as the liquid warms, stays constant at one hundred degrees during boiling, and rises again in steam. The long flat part shows that vaporisation takes much more energy than fusion.',
    }),
    sl('concept', 'Ionisation enthalpy', {
      b: r`The **ionisation enthalpy** is the energy needed to remove an electron from a **gaseous** atom or ion: $\ce{Na(g) -> Na+(g) + e-}$, +496 kJ mol⁻¹. It is **always positive**, and each successive electron costs more: Mg 738 then 1451 kJ mol⁻¹. To reach a gaseous ion from the **solid metal** we add the sublimation enthalpy first.`,
      v: table(['Step', 'Equation', 'ΔH (kJ mol⁻¹)'], [['Sublimation of Na', 'Na(s) → Na(g)', String(SUB.Na)], ['First ionisation of Na', 'Na(g) → Na⁺(g) + e⁻', String(IE.Na)], ['Sublimation of Mg', 'Mg(s) → Mg(g)', String(SUB.Mg)], ['First, second ionisation of Mg', 'Mg(g) → Mg⁺(g); Mg⁺ → Mg²⁺', `${IE.Mg1}; ${IE.Mg2}`]], 'Table of sublimation and ionisation enthalpies of sodium and magnesium'),
      n: 'The ionisation enthalpy is the energy needed to remove an electron from a gaseous atom. It is always positive, and the second electron costs more than the first because it is removed from a positive ion. For a solid metal we first sublime the metal to gaseous atoms, and then add the ionisation enthalpy.',
    }),
    sl('example', 'Worked example: potassium solid to gaseous ions', {
      b: r`**Problem.** Find ΔH for $\ce{K(s) -> K+(g) + e-}$ given ΔsubH(K) = 89.0 and the ionisation enthalpy of K = ${IE.K} kJ mol⁻¹.

Step 1: $\ce{K(s) -> K(g)}$, +89.0. Step 2: $\ce{K(g) -> K+(g) + e-}$, +${IE.K}.

$\Delta H = 89.0 + ${IE.K} = ${f1(kIon)}$ kJ mol⁻¹.`,
      v: table(['Step', 'Process', 'ΔH (kJ mol⁻¹)'], [['1', 'K(s) → K(g), sublimation', '+89.0'], ['2', 'K(g) → K⁺(g) + e⁻, ionisation', `+${IE.K}`], ['Total', 'K(s) → K⁺(g) + e⁻', `+${f1(kIon)}`]], 'Table of the sublimation and ionisation steps for potassium'),
      n: 'Break the change into two steps. First the solid potassium becomes gaseous atoms, which takes eighty nine kilojoules. Then each gaseous atom loses an electron, which takes four hundred nineteen kilojoules. Add the two steps, and the total is five hundred eight kilojoules for each mole of potassium.',
    }),
    sl('diagram', 'Hess’s law of constant heat summation', {
      b: 'The **total enthalpy change** of a reaction is the **same whether it takes place in one step or several**, because **H is a state function**. Here **ΔH₃ = ΔH₁ + ΔH₂**: N₂ + 2O₂ → 2NO₂ directly (+66.4 kJ) or via 2NO (+180.6, then −114.2).',
      v: V.hess,
      n: 'Hess law states that the total enthalpy change for a reaction is the same whether it happens in one step or in several steps. This is because enthalpy is a state function. In the diagram, going directly from nitrogen and oxygen to nitrogen dioxide gives the same change as going by way of nitric oxide, so the two steps add up to the direct value.',
    }),
    sl('concept', 'Using Hess’s law', {
      b: '**1.** Add equations (reverse an equation: change the sign of ΔH; multiply an equation: multiply ΔH). **2.** From **formation data**, ΔH = Σ ΔfH(products) − Σ ΔfH(reactants). **3.** From **combustion data**, ΔH = Σ ΔcH(reactants) − Σ ΔcH(products). **4.** From **bond enthalpies:** broken − formed.',
      v: table(['Data given', 'Formula for ΔH(reaction)'], [['Enthalpies of formation', 'Σ ΔfH(products) − Σ ΔfH(reactants)'], ['Enthalpies of combustion', 'Σ ΔcH(reactants) − Σ ΔcH(products)'], ['Bond enthalpies (gases)', 'Σ broken − Σ formed'], ['Equations with known ΔH', 'add, reverse (change sign), multiply']], 'Table of the ways of using Hess law'),
      n: 'There are four ways to use Hess law. Add the given equations, reversing one changes the sign of the enthalpy change, and multiplying one multiplies it. With formation data, subtract the reactant sum from the product sum. With combustion data, do the opposite. With bond enthalpies, subtract the bonds formed from the bonds broken.',
    }),
    sl('example', 'Worked example: formation of ethene from combustion data', {
      b: r`**Problem.** Find ΔfH of ethene from ΔcH: C(graphite) −393.5, H₂ −285.8, C₂H₄ −1410.9 kJ mol⁻¹ (given).

Target: $\ce{2C(graphite) + 2H2(g) -> C2H4(g)}$.

$\Delta_fH = 2(-393.5) + 2(-285.8) - (-1410.9) = -787.0 - 571.6 + 1410.9 = +${f1(ethF)}$ kJ mol⁻¹.`,
      v: table(['Equation used', 'ΔH (kJ)'], [['2C + 2O₂ → 2CO₂', '−787.0'], ['2H₂ + O₂ → 2H₂O(l)', '−571.6'], ['2CO₂ + 2H₂O(l) → C₂H₄ + 3O₂ (reversed combustion)', '+1410.9'], ['Sum: 2C + 2H₂ → C₂H₄', sg(ethF)]], 'Table of the Hess calculation of the enthalpy of formation of ethene'),
      n: 'The target is two carbon and two hydrogen forming ethene. Burn the carbon, which gives minus seven hundred eighty seven. Burn the hydrogen, which gives minus five hundred seventy one point six. Then reverse the combustion of ethene, which gives plus fourteen hundred ten point nine. The sum is plus fifty two point three kilojoules.',
    }),
    sl('check', 'Quick check: an enthalpy cycle for hydration', {
      b: 'Both the anhydrous salt and its hydrate lead to the same solution.',
      n: 'Quick check. Draw a cycle in which both the anhydrous salt with water and the hydrate dissolve to give the same solution. The hydration step plus the solution of the hydrate equals the solution of the anhydrous salt. Rearrange this to find the hydration enthalpy, and watch the signs.',
      chk: 'hess-cuso4-mcq',
    }),
    sl('example', 'Worked example: dehydrogenation of ethane', {
      b: r`**Problem.** Find ΔH for $\ce{C2H6(g) -> C2H4(g) + H2(g)}$ from ΔfH (C₂H₆ ${sg(DF.C2H6)}, C₂H₄ ${sg(DF.C2H4)} kJ mol⁻¹).

$\Delta H = [\Delta_fH(\ce{C2H4}) + \Delta_fH(\ce{H2})] - \Delta_fH(\ce{C2H6}) = [+52.3 + 0] - (-84.7) = +${f1(dehyd)}$ kJ mol⁻¹: endothermic.`,
      v: table(['', 'Species', 'ΔfH (kJ mol⁻¹)'], [['Products', 'C₂H₄ + H₂', '+52.3 + 0'], ['Reactant', 'C₂H₆', sg(DF.C2H6)], ['ΔH = products − reactant', '', sg(dehyd)]], 'Table of the dehydrogenation of ethane from enthalpies of formation'),
      n: 'Use the formation enthalpies. The products are ethene, with plus fifty two point three, and hydrogen, which is an element and has zero. The reactant is ethane with minus eighty four point seven. Product sum minus reactant sum gives plus one hundred thirty seven kilojoules, so the reaction is endothermic and needs heating.',
    }),
    sl('check', 'Quick check: formation of nitrogen dioxide', {
      b: 'Add the two equations first; then divide by the number of moles of NO₂.',
      n: 'Quick check. Add the two given equations so that the nitric oxide cancels. This gives the enthalpy change for forming two moles of nitrogen dioxide from the elements. The enthalpy of formation is defined per mole, so divide the total by two before giving your answer.',
      chk: 'hess-nox-num',
    }),
    sl('summary', 'Summary: Part 2', {
      ul: [
        'Bond dissociation, atomisation, sublimation, fusion, vaporisation and ionisation enthalpies are all positive; ΔatomH of a diatomic gas is half its bond enthalpy.',
        'ΔH(reaction) from bond enthalpies = Σ broken − Σ formed (an estimate, as mean values are used).',
        'ΔsubH = ΔfusH + ΔvapH at one temperature; ionisation enthalpies rise with each electron removed.',
        'Hess’s law: ΔH is the same by any route because H is a state function.',
        'Reverse an equation: change sign of ΔH; multiply an equation: multiply ΔH.',
      ],
      v: table(['Method', 'Result'], [['Bond enthalpies', 'ΔH = Σ broken − Σ formed'], ['Formation data', 'Σ ΔfH(products) − Σ ΔfH(reactants)'], ['Combustion data', 'Σ ΔcH(reactants) − Σ ΔcH(products)'], ['Cycle or equations', 'add the steps']], 'Summary table of the methods of Part 2'),
      n: 'Let us sum up Part Two. The enthalpies of bond dissociation, atomisation, sublimation, phase change and ionisation are all positive. Bond enthalpies give an estimate of a reaction enthalpy, bonds broken minus bonds formed. Hess law lets us add or subtract steps, and the same total results by any route, because enthalpy is a state function.',
    }),
    sl('exam-tips', 'Exam tips: Part 2', {
      ul: [
        'Bonds broken minus bonds formed; do not reverse this order, and count every bond (a molecule has several C–H bonds).',
        'State that bond-enthalpy answers are estimates because the values are means for gaseous molecules.',
        'Atomisation is per mole of atoms: halve the bond enthalpy for a diatomic gas.',
        'In a Hess cycle show the arrows, the target equation and every sign change you make.',
        'Check that a formation enthalpy refers to one mole: divide by the stoichiometric number if needed.',
      ],
      v: table(['Slip', 'Fix'], [['Using formed − broken', 'ΔH = broken − formed'], ['Using 242 for Cl atomisation', 'Half of 242 = 121 per mole of Cl atoms'], ['Not changing the sign on reversing', 'Reverse the equation, reverse the sign']], 'Table of common slips in Part 2 and their fixes'),
      n: 'Some exam tips. Subtract the bonds formed from the bonds broken, and count every bond in the molecule. Say that bond enthalpy answers are only estimates. Atomisation is per mole of atoms, so halve the bond enthalpy of a diatomic gas. In a Hess cycle show every arrow and every change of sign.',
    }),
  ],
});
