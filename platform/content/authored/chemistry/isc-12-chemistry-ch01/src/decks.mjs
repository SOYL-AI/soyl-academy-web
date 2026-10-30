// ISC 12 Chemistry ch01 Solutions and Their Concentration — two decks: Part 1 (t01–t03) types of solutions,
// concentration terms incl. normality and ppm, Henry's law; Part 2 (t04–t05) Raoult's law, ideal and non-ideal
// solutions, azeotropes and fractional distillation.
import { sl, deck, table, flow, svgV, plot, r } from './lib.mjs';
import { HENRY } from './svgs.mjs';

export const V = {
  henry: svgV(HENRY, 'Two cylinders of water under a gas: at low pressure few gas particles dissolve; when the piston is pushed down to raise the pressure, many more gas particles dissolve', 'Schematic. Particles are drawn far larger than real molecules.'),
};

// Raoult's law for two volatile liquids (ideal): pA° = 24 kPa, pB° = 64 kPa; x axis = mole fraction of B.
const xs = [0, 0.2, 0.4, 0.6, 0.8, 1];
const pA0 = 24;
const pB0 = 64;
export const raoultPlot = plot(
  {
    x: { min: 0, max: 1, label: 'Mole fraction of B in the liquid' },
    y: { min: 0, max: 80, label: 'Vapour pressure (kPa)' },
    series: [
      { label: 'Partial pressure of A', kind: 'line', points: xs.map((x) => [x, +(pA0 * (1 - x)).toFixed(2)]) },
      { label: 'Partial pressure of B', kind: 'line', points: xs.map((x) => [x, +(pB0 * x).toFixed(2)]) },
      { label: 'Total vapour pressure', kind: 'line', points: xs.map((x) => [x, +(pA0 + (pB0 - pA0) * x).toFixed(2)]) },
    ],
  },
  'Ideal solution of A and B: the partial pressure of A falls in a straight line from 24 kPa to zero, that of B rises in a straight line from zero to 64 kPa, and the total vapour pressure rises in a straight line from 24 to 64 kPa',
  'Illustrative values: pure A 24 kPa, pure B 64 kPa at the same temperature.',
);
const dev = (k) => xs.map((x) => [x, +(pA0 + (pB0 - pA0) * x + k * x * (1 - x)).toFixed(2)]);
export const deviationPlot = plot(
  {
    x: { min: 0, max: 1, label: 'Mole fraction of B in the liquid' },
    y: { min: 0, max: 100, label: 'Total vapour pressure (kPa)' },
    series: [
      { label: 'Ideal (Raoult)', kind: 'line', points: dev(0) },
      { label: 'Positive deviation', kind: 'line', points: dev(90) },
      { label: 'Negative deviation', kind: 'line', points: dev(-70) },
    ],
  },
  'Total vapour pressure against composition: the ideal straight line from 24 to 64 kPa, a curve bulging above it for positive deviation and a curve sagging below it for negative deviation',
  'Illustrative curves. A large enough deviation gives a maximum or a minimum in total pressure: an azeotrope.',
);
// Boiling point against composition for a minimum-boiling azeotrope (illustrative, like ethanol + water).
export const bpPlot = plot(
  {
    x: { min: 0, max: 1, label: 'Mole fraction of B (the more volatile liquid)' },
    y: { min: 345, max: 380, label: 'Boiling temperature (K)' },
    series: [
      { label: 'Liquid (boiling) curve', kind: 'line', points: [[0, 373], [0.2, 360], [0.4, 355], [0.6, 353], [0.8, 351.6], [0.9, 351.3], [1, 352]] },
      { label: 'Vapour (condensing) curve', kind: 'line', points: [[0, 373], [0.2, 368], [0.4, 363], [0.6, 358], [0.8, 353.2], [0.9, 351.3], [1, 352]] },
    ],
    vlines: [{ x: 0.9, label: 'azeotrope', dashed: true }],
  },
  'Boiling temperature against composition for a minimum-boiling azeotrope: the liquid curve and the vapour curve fall from the boiling point of pure A and meet at a minimum near a mole fraction of B of nine tenths, just below the boiling point of pure B',
  'Illustrative curves. At the minimum the liquid and vapour have the same composition.',
);

export const deck1 = deck({
  part: 1,
  title: 'Solutions and Their Concentration — Part 1: Types of solutions, concentration and gas solubility',
  goals: [
    'Classify solutions by the states of solute and solvent, including solid solutions',
    'Calculate mass percentage, ppm, mole fraction, molarity, molality and normality, and convert between them',
    'Explain why molality, unlike molarity, does not change with temperature',
    'Apply Henry’s law and explain its everyday applications',
  ],
  slides: [
    sl('title', 'Solutions and their concentration', {
      b: 'Part 1 — what a solution is, how strong it is, and how much gas a liquid can hold.',
      v: flow('LR', [['a', 'Solute + solvent'], ['b', 'Homogeneous solution'], ['c', 'Concentration terms'], ['d', 'Gas solubility (Henry’s law)']], [['a', 'b'], ['b', 'c'], ['b', 'd']], 'Flow: a solute and a solvent form a homogeneous solution, whose strength is given by concentration terms and whose gas content follows Henry’s law'),
      n: 'Namaste! An injection of saline, a bottle of soda, the coolant in a car and the brass of a door handle are all solutions. A solution is a homogeneous mixture of two or more substances. In this part we learn the different types of solution, the many ways of stating how concentrated a solution is, and how pressure controls the amount of gas that dissolves in a liquid.',
    }),
    sl('concept', 'Types of solutions', {
      b: 'The component present in the larger amount is the **solvent**; the others are **solutes**. The solvent decides the physical state. **Solid solutions** include alloys such as brass and amalgams.',
      v: table(['Solvent', 'Solute', 'Example'], [['Gas', 'Gas', 'Air (oxygen in nitrogen)'], ['Gas', 'Liquid', 'Humid air'], ['Gas', 'Solid', 'Camphor vapour in air'], ['Liquid', 'Gas', 'Soda water (CO₂ in water)'], ['Liquid', 'Liquid', 'Ethanol in water'], ['Liquid', 'Solid', 'Salt solution'], ['Solid', 'Gas', 'Hydrogen in palladium'], ['Solid', 'Liquid', 'Sodium amalgam (mercury in sodium)'], ['Solid', 'Solid', 'Brass, bronze, 22-carat gold']], 'Table of the nine types of solution by the state of the solvent and the solute, with an example of each'),
      n: 'Look at the table. The solvent sets the state of the solution, and the solute can be a gas, a liquid or a solid. Air is a gaseous solution, soda water a liquid solution of a gas, and brass a solid solution of zinc in copper. Solid solutions are common in everyday metals: the gold in jewellery is usually alloyed with copper or silver. In every case the mixture is uniform all through.',
    }),
    sl('concept', 'Percentages and parts per million', {
      b: r`Percentages and **parts per million** suit labels and very dilute solutions.`,
      v: table(['Term', 'Definition', 'Typical use'], [['Mass percentage (w/w)', r`$\dfrac{\text{mass of component}}{\text{mass of solution}} \times 100$`, 'Commercial acids'], ['Volume percentage (v/v)', r`$\dfrac{\text{volume of component}}{\text{volume of solution}} \times 100$`, 'Sanitiser, antifreeze'], ['Mass by volume (w/v)', 'grams of solute per 100 mL of solution', 'Saline, medicines'], ['Parts per million (ppm)', r`$\dfrac{\text{mass of component}}{\text{mass of solution}} \times 10^{6}$`, 'Fluoride in water, pollutants']], 'Table of mass percentage, volume percentage, mass by volume percentage and parts per million with definitions and uses'),
      n: 'Labels often state concentration as a percentage. Mass percentage compares masses, volume percentage compares volumes, and mass by volume percentage gives grams of solute in a hundred millilitres of solution. For traces, such as fluoride in drinking water or lead in soil, we use parts per million: grams of the trace substance in a million grams of the mixture. One ppm is a milligram in a kilogram.',
    }),
    sl('concept', 'Mole fraction, molarity and molality', {
      b: r`Mole-based units count particles. Molality and mole fraction use **masses only**, so they do **not** change with temperature; molarity uses the **volume of solution**, which expands on heating.`,
      v: table(['Term', 'Formula', 'Unit', 'Changes with T?'], [['Mole fraction of B', r`$x_\text{B} = \dfrac{n_\text{B}}{n_\text{A} + n_\text{B}}$`, 'none', 'No'], ['Molarity', r`$M = \dfrac{\text{mol of solute}}{\text{L of solution}}$`, r`$\text{mol L}^{-1}$`, 'Yes'], ['Molality', r`$m = \dfrac{\text{mol of solute}}{\text{kg of solvent}}$`, r`$\text{mol kg}^{-1}$`, 'No']], 'Table giving the formula, unit and temperature dependence of mole fraction, molarity and molality'),
      m: [r`x_\text{A} + x_\text{B} = 1`],
      n: 'Three mole-based units appear in almost every numerical. Mole fraction is the share of all the moles that belong to one component, and the fractions add up to one. Molarity is moles of solute per litre of solution. Molality is moles of solute per kilogram of solvent. Because a liquid expands when warmed, molarity falls slightly on heating, while molality, built only from masses, stays the same.',
    }),
    sl('concept', 'Normality and gram equivalents', {
      b: r`**Normality** $N$ is the number of **gram equivalents** of solute per litre of solution. Equivalent mass $=$ molar mass $\div\ n$, where $n$ is the basicity of an acid, the acidity of a base, or the number of electrons gained or lost per formula unit in a redox reaction. So $N = n \times M$.`,
      m: [r`N = \dfrac{\text{gram equivalents of solute}}{\text{volume of solution in L}}`, r`N_1V_1 = N_2V_2`],
      v: table(['Substance', 'Molar mass', 'n', 'Equivalent mass'], [['HCl', '36.5', '1', '36.5'], ['H₂SO₄', '98', '2', '49'], ['NaOH', '40', '1', '40'], ['Ca(OH)₂', '74', '2', '37'], ['KMnO₄ (acidic, gains 5 e⁻)', '158', '5', '31.6']], 'Table of molar mass, n-factor and equivalent mass for some acids, bases and potassium permanganate'),
      n: 'Normality counts equivalents instead of moles. An equivalent of an acid is the amount that supplies one mole of hydrogen ions; for sulfuric acid, which gives two, the equivalent mass is half the molar mass. So a one molar sulfuric acid solution is two normal. Normality is handy in titrations, because at the end point the equivalents of acid and base are equal, which gives the relation N one V one equals N two V two.',
    }),
    sl('example', 'Worked example: molality, mole fraction and ppm', {
      b: r`**Problem.** $27\ \text{g}$ of glucose ($M = 180$) is dissolved in $250\ \text{g}$ of water. Find (a) the molality and (b) the mole fraction of glucose. (c) A water sample contains $0.6\ \text{mg}$ of fluoride in $500\ \text{g}$. Express this in ppm.

**(a)** Moles of glucose $= 27 \div 180 = 0.15$; molality $= 0.15 \div 0.250 = 0.60\ \text{mol kg}^{-1}$.

**(b)** Moles of water $= 250 \div 18 = 13.89$; $x = 0.15 \div (0.15 + 13.89) = 0.0107$.

**(c)** ppm $= \dfrac{0.6 \times 10^{-3}}{500} \times 10^{6} = 1.2\ \text{ppm}$.`,
      v: table(['Quantity', 'Value'], [['Moles of glucose', '0.15'], ['Moles of water', '13.89'], ['Molality', '0.60 mol/kg'], ['Mole fraction of glucose', '0.0107'], ['Fluoride', '1.2 ppm']], 'Table of the results of the worked example'),
      n: 'Convert masses to moles first. Twenty seven grams of glucose is nought point one five mole, and two hundred and fifty grams of water is nearly fourteen mole. Divide the glucose moles by the mass of water in kilograms to get the molality, nought point six. Divide by the total moles for the mole fraction. For ppm, divide the mass of fluoride by the mass of the sample and multiply by a million.',
    }),
    sl('example', 'Worked example: normality and molarity of an acid', {
      b: r`**Problem.** A sulfuric acid solution is $24.5\%$ by mass with density $1.20\ \text{g mL}^{-1}$ ($M = 98$). Find its molarity and normality, and the volume needed to neutralise $50\ \text{mL}$ of $0.60\ \text{N}$ NaOH.

**Step 1.** In $100\ \text{g}$: $24.5\ \text{g}$ acid $= 24.5 \div 98 = 0.25\ \text{mol}$; volume $= 100 \div 1.20 = 83.3\ \text{mL}$.

**Step 2.** Molarity $= 0.25 \div 0.0833 = 3.0\ \text{M}$; normality $= 2 \times 3.0 = 6.0\ \text{N}$.

**Step 3.** $N_1V_1 = N_2V_2$: $V_1 = 0.60 \times 50 \div 6.0 = 5.0\ \text{mL}$.`,
      v: flow('LR', [['a', 'Assume 100 g of solution'], ['b', 'Mass of acid → moles'], ['c', 'Density → volume'], ['d', 'Molarity'], ['e', 'Normality = n × molarity'], ['f', 'N₁V₁ = N₂V₂']], [['a', 'b'], ['a', 'c'], ['b', 'd'], ['c', 'd'], ['d', 'e'], ['e', 'f']], 'Flow for converting a mass percentage into molarity and normality and then using N1V1 = N2V2'),
      n: 'Imagine exactly one hundred grams of solution. It holds twenty four and a half grams of acid, a quarter of a mole. Density turns a hundred grams into about eighty three millilitres, so the molarity is three. Sulfuric acid is dibasic, so the normality is twice that, six. For the titration, equivalents of acid equal equivalents of base, so only five millilitres of this strong acid are needed.',
    }),
    sl('check', 'Quick check: which unit ignores temperature?', {
      b: 'A solution is made up at 15 °C and used at 35 °C. Which concentration term is unchanged?',
      n: 'Quick check. Ask which terms are built from masses alone and which need the volume of the solution.',
      chk: 'temp-unit-mcq',
    }),
    sl('diagram', 'Gases in liquids: the role of pressure', {
      b: 'Raising the pressure of a gas above a liquid drives more gas particles into the liquid until a new equilibrium is reached, so the solubility of a gas **increases with pressure**. It **decreases** as temperature rises, because dissolving a gas is usually exothermic.',
      v: V.henry,
      n: 'Picture a gas trapped above water in a cylinder. Gas particles keep striking the surface and some dissolve. Push the piston down, and the squeezed gas strikes the surface more often, so more dissolves until escaping and dissolving balance again. Warming does the opposite: dissolving a gas usually gives out heat, so a warm liquid holds less gas, which is why a warm soda goes flat faster.',
    }),
    sl('concept', 'Henry’s law', {
      b: r`**Henry’s law:** at constant temperature, the solubility of a gas in a liquid is proportional to the partial pressure of the gas above it. In the mole-fraction form, $p = K_\text{H}\, x$. A **larger** $K_\text{H}$ means a **less** soluble gas; $K_\text{H}$ rises with temperature.`,
      m: [r`p = K_\text{H}\, x`],
      v: table(['Gas (in water)', r`$K_\text{H}$ / kbar`, 'Temperature'], [['Helium', r`$144.97$`, '293 K'], ['Nitrogen', r`$76.48$`, '293 K'], ['Oxygen', r`$34.86$`, '293 K'], ['Carbon dioxide', r`$1.67$`, '298 K']], 'Table of Henry’s law constants in water for helium, nitrogen, oxygen and carbon dioxide'),
      n: 'Henry’s law says that, at a fixed temperature, the amount of gas that dissolves is proportional to its partial pressure. In symbols, partial pressure equals Henry’s constant times the mole fraction of the gas in solution. A large constant means a large pressure is needed to dissolve even a little gas, so helium, with a huge constant, is far less soluble than carbon dioxide.',
    }),
    sl('example', 'Worked example: oxygen dissolved in a fish tank', {
      b: r`**Problem.** Air contains oxygen at a partial pressure of $0.21\ \text{bar}$. With $K_\text{H}(\ce{O2}) = 34.86\ \text{kbar}$ at $293\ \text{K}$, estimate the mass of oxygen dissolved in $1.0\ \text{kg}$ of aquarium water.

**Step 1.** $x_{\ce{O2}} = p \div K_\text{H} = 0.21 \div 34860 = 6.02 \times 10^{-6}$.

**Step 2.** Moles of water $= 1000 \div 18 = 55.6$; $n_{\ce{O2}} \approx x \times n_\text{water} = 3.35 \times 10^{-4}\ \text{mol}$.

**Step 3.** Mass $= 3.35 \times 10^{-4} \times 32 = 0.0107\ \text{g}$, about $10.7\ \text{mg}$ per kg.`,
      v: flow('LR', [['a', 'Partial pressure p'], ['b', 'x = p ÷ KH'], ['c', 'n(gas) ≈ x × n(water)'], ['d', 'mass = n × M']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Flow for a Henry’s law calculation from partial pressure to mass of dissolved gas'),
      n: 'Put both pressures in bar first: thirty four point eight six kilobar is thirty four thousand eight hundred and sixty bar. Dividing the partial pressure by this constant gives a tiny mole fraction, about six millionths. A kilogram of water is about fifty six mole, so roughly a third of a millimole of oxygen dissolves, about eleven milligrams. That small amount is all the oxygen the fish can breathe.',
    }),
    sl('concept', 'Henry’s law in daily life', {
      b: 'Henry’s law explains several everyday and medical effects.',
      v: table(['Situation', 'What happens', 'Link to Henry’s law'], [['Bottling soft drinks', 'CO₂ is sealed in under high pressure', 'High pressure raises solubility; opening the bottle releases gas'], ['Scuba diving', 'Nitrogen dissolves in blood at depth; rising fast forms bubbles (the bends)', 'Tanks use air diluted with helium, which is less soluble'], ['High altitude', 'Climbers feel weak (anoxia)', 'Low partial pressure of O₂, so less dissolves in blood'], ['Warm ponds', 'Fish gasp at the surface', 'KH rises with temperature, so less O₂ dissolves']], 'Table of four situations explained by Henry’s law'),
      n: 'Henry’s law is all around you. Soft drinks are bottled under high pressure of carbon dioxide and fizz when opened. Divers who rise too quickly suffer the bends, as nitrogen dissolved under pressure forms bubbles in the blood, so their tanks use air diluted with helium. At high altitude less oxygen dissolves in the blood, and on hot afternoons ponds hold too little oxygen for fish.',
    }),
    sl('check', 'Quick check: Henry’s law', {
      b: 'Use Henry’s constants or the effect of pressure and temperature to compare gas solubilities.',
      n: 'Quick check. The larger the Henry’s constant, the larger the pressure needed to dissolve the same amount of gas.',
      chk: 'kh-mcq',
    }),
    sl('check', 'Quick check: normality', {
      b: 'Relate normality to molarity for an acid or a base.',
      n: 'Quick check. Multiply the molarity by the number of replaceable hydrogen ions or hydroxide ions.',
      chk: 'normality-mcq',
    }),
    sl('summary', 'Summary: Part 1', {
      ul: [
        'Nine types of solution by states of solvent and solute; alloys and amalgams are solid solutions.',
        'Mass %, volume %, w/v %, ppm, mole fraction, molarity, molality and normality.',
        'Normality = n × molarity; N₁V₁ = N₂V₂ at the end point of a titration.',
        'Mole fraction, mass % and molality do not change with temperature; molarity and normality do.',
        r`Henry’s law $p = K_\text{H}\,x$: gas solubility rises with pressure and falls with temperature.`,
      ],
      v: table(['Term', 'Built from'], [['Molality, mole fraction, ppm', 'Masses only'], ['Molarity, normality', 'Volume of solution'], ['Henry’s law', 'Partial pressure and mole fraction']], 'Summary table of concentration terms and Henry’s law'),
      n: 'Let us sum up Part 1. Solutions can be gaseous, liquid or solid. Their strength can be stated in many ways, from percentages and parts per million to mole fraction, molarity, molality and normality, and you can convert between them. Mass-based terms do not change with temperature. And Henry’s law tells us that gases dissolve more under higher pressure and less in warmer liquids.',
    }),
    sl('exam-tips', 'Exam tips: Part 1', {
      ul: [
        'Molality uses kg of **solvent**: subtract the solute’s mass first.',
        'When a percentage and a density are given, assume 100 g of solution.',
        'For normality, state the n-factor (basicity, acidity or electrons transferred).',
        r`In Henry’s law, use the same pressure unit for $p$ and $K_\text{H}$ (1 kbar = 1000 bar).`,
      ],
      v: table(['Common slip', 'Fix'], [['Dividing by kg of solution for molality', 'Use kg of solvent'], ['Taking 1 M H₂SO₄ as 1 N', 'It is 2 N'], ['Larger KH means more soluble', 'Larger KH means less soluble']], 'Table of common slips in Part 1 and how to fix them'),
      n: 'Some quick tips. For molality divide by the mass of solvent, not of solution. Imagine one hundred grams whenever a percentage comes with a density. Always state the n-factor when you use normality. And keep pressure units the same in Henry’s law, remembering that a larger constant means a less soluble gas.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Solutions and Their Concentration — Part 2: Raoult’s law, non-ideal solutions and azeotropes',
  goals: [
    'Apply Raoult’s law to a mixture of two volatile liquids and to a solution of a non-volatile solute',
    'Compare ideal and non-ideal solutions in terms of intermolecular forces, enthalpy and volume of mixing',
    'Distinguish minimum-boiling and maximum-boiling azeotropes with examples and graphs',
    'Explain why an azeotrope cannot be separated by fractional distillation',
  ],
  slides: [
    sl('title', 'Vapour pressure of solutions', {
      b: 'Part 2 — how the vapour above a mixture of liquids behaves, and why some mixtures cannot be separated by distillation.',
      v: flow('LR', [['a', 'Raoult’s law'], ['b', 'Ideal solutions'], ['c', 'Deviations'], ['d', 'Azeotropes']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Flow from Raoult’s law to ideal solutions, deviations and azeotropes'),
      n: 'When a liquid evaporates in a closed space, its vapour exerts a pressure called the vapour pressure. In this part we see how the vapour pressure of a mixture depends on its composition, why some mixtures follow a simple law and others do not, and why a distillery cannot get pure ethanol simply by distilling a mixture of ethanol and water.',
    }),
    sl('concept', 'Raoult’s law for two volatile liquids', {
      b: r`In a mixture of volatile liquids A and B, **each partial vapour pressure is proportional to the mole fraction** of that liquid. By Dalton’s law the total pressure is the sum. The vapour is **richer in the more volatile** component.`,
      m: [r`p_\text{A} = p^\circ_\text{A}\, x_\text{A}, \qquad p_\text{B} = p^\circ_\text{B}\, x_\text{B}`, r`p_\text{total} = p^\circ_\text{A} + (p^\circ_\text{B} - p^\circ_\text{A})\, x_\text{B}`, r`y_\text{A} = \dfrac{p_\text{A}}{p_\text{total}}`],
      v: flow('LR', [['a', 'Mole fractions in the liquid'], ['b', 'Partial pressures (Raoult)'], ['c', 'Total pressure (Dalton)'], ['d', 'Vapour composition']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Flow from liquid mole fractions to partial pressures, total pressure and vapour composition'),
      n: 'Raoult’s law says each liquid’s partial vapour pressure equals its pure vapour pressure times its mole fraction in the mixture. Adding the partial pressures gives the total, by Dalton’s law. Dividing one partial pressure by the total gives that component’s share of the vapour. Because the more volatile liquid escapes more readily, the vapour always contains more of it than the liquid does.',
    }),
    sl('diagram', 'Raoult’s law on a graph', {
      b: 'For an ideal solution, both partial pressures and the total pressure are **straight lines** against composition.',
      v: raoultPlot,
      n: 'Here is the picture for an ideal mixture. As the share of B rises, the partial pressure of A falls in a straight line to zero, and that of B rises in a straight line from zero. Their sum, the total vapour pressure, is another straight line from pure A to pure B. Any bending away from these lines means the solution is not ideal.',
    }),
    sl('example', 'Worked example: composition of the vapour', {
      b: r`**Problem.** At $300\ \text{K}$ the vapour pressures of pure benzene and pure toluene are $13.8\ \text{kPa}$ and $4.6\ \text{kPa}$. A liquid contains $2\ \text{mol}$ benzene and $3\ \text{mol}$ toluene. Find the total vapour pressure and the mole fraction of benzene in the vapour (ideal solution).

**Step 1.** $x_\text{B} = 2 \div 5 = 0.40$; $x_\text{T} = 0.60$.

**Step 2.** $p_\text{B} = 13.8 \times 0.40 = 5.52\ \text{kPa}$; $p_\text{T} = 4.6 \times 0.60 = 2.76\ \text{kPa}$; $p_\text{total} = 8.28\ \text{kPa}$.

**Step 3.** $y_\text{B} = 5.52 \div 8.28 = 0.667$.`,
      v: table(['Component', 'In the liquid', 'In the vapour'], [['Benzene', '0.40', '0.667'], ['Toluene', '0.60', '0.333']], 'Table comparing the mole fractions of benzene and toluene in the liquid and the vapour'),
      n: 'Benzene is two fifths of the liquid. Its partial pressure is thirteen point eight times nought point four, about five and a half kilopascal; toluene adds about two point eight. The total is a little over eight. In the vapour, benzene makes up two thirds, far more than its share of the liquid, because it is the more volatile liquid. Condensing this vapour and boiling it again enriches it further: that is fractional distillation.',
    }),
    sl('check', 'Quick check: Raoult’s law', {
      b: 'Predict the vapour pressure or vapour composition of an ideal mixture.',
      n: 'Quick check. Multiply each pure vapour pressure by the mole fraction in the liquid, then add.',
      chk: 'raoult-mcq',
    }),
    sl('concept', 'Non-volatile solutes and the link to Henry’s law', {
      b: r`For a **non-volatile solute** (sugar, urea), only the solvent contributes vapour: $p = p^\circ_1 x_1$, so the vapour pressure is **lowered**. Raoult’s law and Henry’s law have the same form, $p \propto x$; in Raoult’s law the constant is $p^\circ$, in Henry’s law it is $K_\text{H}$.`,
      m: [r`p_\text{solution} = p^\circ_1\, x_1`],
      v: table(['', 'Henry’s law', 'Raoult’s law'], [['Equation', r`$p = K_\text{H}\, x$`, r`$p = p^\circ x$`], ['Applies to', 'A dissolved gas (solute)', 'A volatile component, usually the solvent'], ['Constant', r`$K_\text{H}$`, r`$p^\circ$ of the pure liquid`]], 'Table comparing Henry’s law and Raoult’s law'),
      n: 'If the solute does not evaporate, as with sugar in water, only the solvent contributes vapour, and its vapour pressure is its pure value times its mole fraction. So adding a non-volatile solute always lowers the vapour pressure, an idea we build on in the next chapter. Notice too that Raoult’s law is a special case of Henry’s law, in which the constant is simply the vapour pressure of the pure liquid.',
    }),
    sl('two-column', 'Ideal and non-ideal solutions', {
      b: 'Whether a solution obeys Raoult’s law depends on how the **A–B attractions** compare with the A–A and B–B attractions.',
      cols: [
        r`**Ideal** — obeys Raoult’s law at all compositions; A–B attractions about equal to A–A and B–B; $\Delta_\text{mix}H = 0$, $\Delta_\text{mix}V = 0$. Examples: n-hexane + n-heptane; benzene + toluene; bromoethane + chloroethane.`,
        r`**Positive deviation** — A–B attractions **weaker**; vapour pressure higher; $\Delta_\text{mix}H > 0$, volume increases. Examples: ethanol + water, acetone + carbon disulfide.

**Negative deviation** — A–B attractions **stronger**; vapour pressure lower; $\Delta_\text{mix}H < 0$, volume decreases. Examples: chloroform + acetone, nitric acid + water.`,
      ],
      v: table(['Type', 'A–B attraction', r`$\Delta_\text{mix}H$`, r`$\Delta_\text{mix}V$`], [['Ideal', 'Same as A–A, B–B', '0', '0'], ['Positive deviation', 'Weaker', 'positive (cools)', 'positive'], ['Negative deviation', 'Stronger', 'negative (warms)', 'negative']], 'Table of ideal solutions and solutions with positive and negative deviation'),
      n: 'Why do some mixtures break Raoult’s law? It is about attractions. If A and B attract each other as strongly as they attract themselves, the solution is ideal, with no heat or volume change on mixing. If the new attractions are weaker, molecules escape more easily, giving positive deviation. If they are stronger, as when chloroform forms hydrogen bonds with acetone, molecules are held back, giving negative deviation and warming.',
    }),
    sl('diagram', 'Deviations on a graph', {
      b: 'Positive deviation: total vapour pressure lies **above** the Raoult line. Negative deviation: it lies **below** it.',
      v: deviationPlot,
      n: 'On a graph the difference is easy to see. The straight line is the ideal prediction. A curve that bulges above it shows positive deviation, because molecules escape more easily than expected. A curve that sags below it shows negative deviation. If the bulge or the sag is large enough, the curve passes through a maximum or a minimum.',
    }),
    sl('example', 'Worked example: deciding the deviation from data', {
      b: r`**Problem.** Liquids X ($p^\circ = 30\ \text{kPa}$) and Y ($p^\circ = 70\ \text{kPa}$) are mixed with $x_\text{X} = 0.25$. The measured vapour pressure is $52\ \text{kPa}$. Is the solution ideal? What would you expect for the temperature and volume on mixing?

**Step 1.** Raoult: $p = 30 \times 0.25 + 70 \times 0.75 = 7.5 + 52.5 = 60\ \text{kPa}$.

**Step 2.** Measured $52 < 60$: **negative deviation**.

**Step 3.** X–Y attractions are stronger: the mixture warms ($\Delta_\text{mix}H < 0$) and contracts ($\Delta_\text{mix}V < 0$).`,
      v: table(['', 'Total vapour pressure'], [['Raoult prediction', '60 kPa'], ['Measured', '52 kPa'], ['Conclusion', 'Negative deviation']], 'Table comparing predicted and measured vapour pressure for the worked example'),
      n: 'First work out what Raoult’s law predicts: seven and a half plus fifty two and a half, sixty kilopascal. The measured value is only fifty two, lower than predicted, so molecules are being held back by stronger attractions between X and Y. That is negative deviation, and we would expect the mixture to warm up and to occupy a little less volume than the two liquids separately.',
    }),
    sl('check', 'Quick check: identify the deviation', {
      b: 'Two liquids cool when mixed and the mixture’s volume is slightly greater than the sum of the volumes. What kind of deviation is this?',
      n: 'Quick check. Cooling on mixing means heat is absorbed, so some attractions are being lost.',
      chk: 'deviation-mcq',
    }),
    sl('concept', 'Azeotropes', {
      b: 'An **azeotrope** (constant-boiling mixture) boils at a constant temperature with the **same composition in liquid and vapour**. Large **positive** deviation gives a **minimum-boiling** azeotrope; large **negative** deviation gives a **maximum-boiling** azeotrope.',
      v: table(['Type', 'Arises from', 'Example'], [['Minimum-boiling', 'Large positive deviation', 'Ethanol + water: about 95% ethanol by volume, boils near 351 K'], ['Maximum-boiling', 'Large negative deviation', 'Nitric acid + water: about 68% HNO₃ by mass, boils near 393.5 K'], ['Maximum-boiling', 'Large negative deviation', 'Hydrochloric acid + water: about 20% HCl by mass, boils near 383 K']], 'Table of minimum-boiling and maximum-boiling azeotropes with examples'),
      n: 'Some mixtures boil like a single pure liquid: the vapour has exactly the same composition as the liquid. These are azeotropes. A large positive deviation makes the vapour pressure pass through a maximum, so the boiling point passes through a minimum: ethanol and water is the famous example. A large negative deviation, as with nitric acid and water, gives a maximum-boiling azeotrope.',
    }),
    sl('diagram', 'Boiling point–composition diagram', {
      b: 'For a minimum-boiling azeotrope, the liquid and vapour curves meet at a **minimum**. On fractional distillation, the vapour at the top of the column approaches the **azeotrope**, and the residue approaches the pure component on the other side of it — never both pure components.',
      v: bpPlot,
      n: 'This diagram plots boiling temperature against composition. The lower curve shows where liquid of each composition starts to boil; the upper curve shows the vapour that forms. They meet at a minimum, the azeotrope. Starting from a dilute mixture, each evaporation and condensation in a fractionating column moves the vapour towards the azeotrope, but never past it. So distillation gives the azeotrope at the top, not the pure liquid.',
    }),
    sl('example', 'Worked example: what does distillation give?', {
      b: r`**Problem.** (a) A distiller fractionally distils a 20% (by volume) ethanol–water mixture. What collects at the top of the column? (b) A chemist distils dilute nitric acid (20% by mass). What is left in the flask at the end?

**(a)** The minimum-boiling azeotrope, about 95% ethanol, distils over; it boils lower than either pure liquid, so pure ethanol cannot be obtained this way.

**(b)** Water (lower boiling) distils first; the residue moves towards the maximum-boiling azeotrope, about 68% nitric acid, which then distils unchanged.`,
      v: table(['Mixture', 'Azeotrope type', 'Distillate', 'Residue'], [['Ethanol + water', 'Minimum boiling', 'About 95% ethanol', 'Water'], ['Nitric acid + water (dilute)', 'Maximum boiling', 'Water', 'About 68% HNO₃']], 'Table of distillation outcomes for the two azeotropic mixtures'),
      n: 'Use the type of azeotrope. Ethanol and water form a minimum-boiling azeotrope, so it is the lowest boiling thing present: it distils over, and pure ethanol never appears at the top. Nitric acid and water form a maximum-boiling azeotrope, the highest boiling thing present, so water distils away first and the acid left behind becomes more concentrated until it reaches about sixty eight percent.',
    }),
    sl('check', 'Quick check: azeotropes', {
      b: 'Link the type of deviation to the type of azeotrope, or predict a distillation result.',
      n: 'Quick check. Positive deviation means higher vapour pressure and so a lower boiling point.',
      chk: 'azeotrope-mcq',
    }),
    sl('summary', 'Summary: Part 2', {
      ul: [
        r`Raoult’s law $p_\text{A} = p^\circ_\text{A} x_\text{A}$; Dalton: $p_\text{total} = p_\text{A} + p_\text{B}$; vapour richer in the more volatile liquid.`,
        'Non-volatile solute lowers the vapour pressure of the solvent.',
        'Ideal: equal attractions, ΔmixH = 0, ΔmixV = 0.',
        'Positive deviation: weaker A–B attractions, higher p, ΔmixH > 0; negative deviation: the reverse.',
        'Minimum-boiling azeotropes from positive deviation; maximum-boiling from negative deviation.',
        'Azeotropes cannot be separated by fractional distillation.',
      ],
      v: table(['Deviation', 'Vapour pressure', 'Azeotrope'], [['Positive', 'Higher than Raoult', 'Minimum boiling'], ['Negative', 'Lower than Raoult', 'Maximum boiling']], 'Summary table linking deviation, vapour pressure and azeotrope type'),
      n: 'Let us sum up Part 2. Raoult’s law gives the vapour pressure of ideal mixtures, and the vapour is richer in the more volatile liquid. Real mixtures deviate when the attractions between unlike molecules are weaker or stronger than between like ones. Large deviations produce azeotropes, which boil at constant composition and so cannot be separated by fractional distillation.',
    }),
    sl('exam-tips', 'Exam tips: Part 2', {
      ul: [
        'Compute the Raoult prediction before judging the deviation.',
        'State both the attraction change and the sign of ΔmixH and ΔmixV.',
        'Positive deviation → minimum boiling; negative deviation → maximum boiling.',
        'Draw and label both curves in a boiling point–composition diagram.',
      ],
      v: table(['Common slip', 'Fix'], [['Positive deviation gives a maximum-boiling azeotrope', 'It gives a minimum-boiling one'], ['Using liquid mole fractions for the vapour', 'Use y = p_A ÷ p_total'], ['Calling benzene + toluene non-ideal', 'It is nearly ideal']], 'Table of common slips in Part 2 and fixes'),
      n: 'Final tips. Always calculate what Raoult’s law predicts before deciding on the deviation. Mention the attractions and the signs of the enthalpy and volume of mixing. Match the azeotrope type to the deviation carefully. And in a boiling point diagram, label the liquid curve and the vapour curve.',
    }),
  ],
});
