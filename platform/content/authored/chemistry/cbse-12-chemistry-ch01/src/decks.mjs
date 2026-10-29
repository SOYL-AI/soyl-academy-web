// ch01 Solutions — two decks: Part 1 (t01–t03) concentration, solubility, Henry's and Raoult's laws;
// Part 2 (t04–t05) colligative properties, molar mass and the van't Hoff factor.
import { sl, deck, table, flow, svgV, plot, chem, r } from './lib.mjs';
import { HENRY, VPLOWER, OSMOSIS, RO } from './svgs.mjs';

export const V = {
  henry: svgV(HENRY, 'Two cylinders of water under a gas: at low pressure few gas particles dissolve; when the piston is pushed down to raise the pressure, many more gas particles dissolve', 'Schematic. Particles are drawn far larger than real molecules.'),
  vplower: svgV(VPLOWER, 'Pure solvent with many particles escaping from the surface beside a solution in which solute particles occupy part of the surface and fewer solvent particles escape', 'Schematic: fewer solvent particles at the surface means fewer escape per second.'),
  osmosis: svgV(OSMOSIS, 'U-tube with a semipermeable membrane: water flows from the pure-water arm into the sugar-solution arm until the solution level stands higher by a height h', 'At equilibrium the pressure of the extra column of height h equals the osmotic pressure of the solution.'),
  ro: svgV(RO, 'Reverse osmosis: a piston presses sea water against a membrane with a pressure above its osmotic pressure, forcing pure water through to the other side'),
};

// Raoult's law for two volatile liquids (ideal): pA° = 30 kPa, pB° = 70 kPa; x axis = mole fraction of B.
const xs = [0, 0.2, 0.4, 0.6, 0.8, 1];
const pA0 = 30;
const pB0 = 70;
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
  'Ideal solution of A and B: the partial pressure of A falls in a straight line from 30 kPa to zero, that of B rises in a straight line from zero to 70 kPa, and the total vapour pressure rises in a straight line from 30 to 70 kPa',
  'Illustrative values: pure A 30 kPa, pure B 70 kPa at the same temperature.',
);
const dev = (k) => xs.map((x) => [x, +(pA0 + (pB0 - pA0) * x + k * x * (1 - x)).toFixed(2)]);
export const deviationPlot = plot(
  {
    x: { min: 0, max: 1, label: 'Mole fraction of B in the liquid' },
    y: { min: 0, max: 100, label: 'Total vapour pressure (kPa)' },
    series: [
      { label: 'Ideal (Raoult)', kind: 'line', points: dev(0) },
      { label: 'Positive deviation', kind: 'line', points: dev(80) },
      { label: 'Negative deviation', kind: 'line', points: dev(-80) },
    ],
  },
  'Total vapour pressure against composition: the ideal straight line from 30 to 70 kPa, a curve bulging above it for positive deviation and a curve sagging below it for negative deviation',
  'Illustrative curves. A large enough deviation gives a maximum or a minimum in total pressure: an azeotrope.',
);
// Vapour pressure of water and of a solution near the boiling point (bar), illustrative.
export const boilPlot = plot(
  {
    x: { min: 368, max: 378, label: 'Temperature (K)' },
    y: { min: 0.8, max: 1.2, label: 'Vapour pressure (bar)' },
    series: [
      { label: 'Pure water', kind: 'line', points: [[368, 0.85], [370, 0.91], [372, 0.98], [373.15, 1.013], [374, 1.04], [376, 1.11], [378, 1.19]] },
      { label: 'Solution', kind: 'line', points: [[368, 0.82], [370, 0.88], [372, 0.95], [374, 1.0], [374.5, 1.013], [376, 1.07], [378, 1.15]] },
    ],
    hlines: [{ y: 1.013, label: 'Atmospheric pressure', dashed: true }],
    vlines: [{ x: 373.15, label: 'Tb of water', dashed: true }, { x: 374.5, label: 'Tb of solution', dashed: true }],
  },
  'Vapour pressure against temperature: the solution curve lies below the pure-water curve everywhere, so it reaches atmospheric pressure at a higher temperature; the gap between the two boiling points is the elevation of boiling point',
  'Illustrative curves; the gap is exaggerated so that it can be seen.',
);

export const deck1 = deck({
  part: 1,
  title: 'Solutions — Part 1: Concentration, solubility and vapour pressure',
  goals: [
    'Express the concentration of a solution as mass percentage, ppm, mole fraction, molarity and molality, and convert between them',
    'Explain the factors that affect the solubility of solids and gases and apply Henry’s law',
    'Apply Raoult’s law to mixtures of volatile liquids and to solutions of non-volatile solutes',
    'Distinguish ideal and non-ideal solutions, explain positive and negative deviations and describe azeotropes',
  ],
  slides: [
    sl('title', 'Solutions', {
      b: 'Part 1 — how much solute is in a solution, how much can dissolve, and how a solution’s vapour behaves.',
      v: flow('LR', [['a', 'Solute + solvent'], ['b', 'Homogeneous solution'], ['c', 'Concentration (how much solute)'], ['d', 'Properties: solubility, vapour pressure']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Flow: a solute and a solvent form a homogeneous solution; its concentration decides its properties such as solubility and vapour pressure'),
      n: 'Namaste! Saline drips in hospitals, soda in a bottle, the coolant in a car radiator and the brass of a door handle are all solutions. A solution is a homogeneous mixture of two or more substances. In this part we learn to state exactly how much solute a solution holds, why some things dissolve more than others, and how dissolving changes the vapour above a liquid.',
    }),
    sl('concept', 'Types of solutions', {
      b: 'The component present in the larger amount is the **solvent**; the others are **solutes**. The solvent decides the physical state, so there are nine combinations. Most of this chapter is about **liquid solutions**.',
      v: table(['Solvent', 'Solute', 'Example'], [['Gas', 'Gas', 'Air (oxygen in nitrogen)'], ['Gas', 'Liquid', 'Humid air (water vapour in air)'], ['Gas', 'Solid', 'Naphthalene vapour in a wardrobe’s air'], ['Liquid', 'Gas', 'Soda water (carbon dioxide in water)'], ['Liquid', 'Liquid', 'Ethanol in water'], ['Liquid', 'Solid', 'Sugar syrup'], ['Solid', 'Gas', 'Hydrogen absorbed in palladium'], ['Solid', 'Liquid', 'Amalgam of mercury with sodium'], ['Solid', 'Solid', 'Brass (zinc in copper)']], 'Table of the nine types of solution by the state of the solvent and the solute, with an example of each'),
      n: 'Look at the table. The solvent sets the state of the solution, and the solute can be a gas, a liquid or a solid. So air is a gaseous solution, soda water is a liquid solution with a gas dissolved in it, and brass is a solid solution of zinc in copper. Remember that in every case the mixture is uniform all through: that is what makes it a solution.',
    }),
    sl('concept', 'Concentration by mass and by volume', {
      b: r`Concentration tells us **how much solute** is present in a given amount of solution or solvent. Percentages and parts per million suit everyday and very dilute solutions.`,
      v: table(['Term', 'Definition', 'Typical use'], [['Mass percentage (w/w)', r`$\dfrac{\text{mass of component}}{\text{total mass of solution}} \times 100$`, 'Commercial acids, fertiliser solutions'], ['Volume percentage (v/v)', r`$\dfrac{\text{volume of component}}{\text{total volume of solution}} \times 100$`, 'Hand sanitiser, antifreeze'], ['Mass by volume percentage (w/v)', 'grams of solute per 100 mL of solution', 'Medicines, saline'], ['Parts per million (ppm)', r`$\dfrac{\text{parts of component}}{\text{total parts}} \times 10^{6}$`, 'Fluoride in drinking water, pollutants']], 'Table of mass percentage, volume percentage, mass by volume percentage and parts per million with their definitions and uses'),
      n: 'Some ways of stating concentration are easy to read on a label. Mass percentage compares masses, volume percentage compares volumes, and mass by volume percentage gives grams of solute in one hundred millilitres of solution, as on a saline bottle. For traces, such as fluoride in drinking water or a pollutant in air, we use parts per million, which is one part in a million parts of the mixture.',
    }),
    sl('concept', 'Mole fraction, molarity and molality', {
      b: r`Chemists count particles, so they prefer mole-based units. Molality and mole fraction use **masses only**, so they do not change with temperature; molarity uses **volume**, which expands on heating.`,
      v: table(['Term', 'Formula', 'Unit', 'Changes with temperature?'], [['Mole fraction of B', r`$x_\text{B} = \dfrac{n_\text{B}}{n_\text{A} + n_\text{B}}$`, 'none', 'No'], ['Molarity', r`$M = \dfrac{\text{moles of solute}}{\text{volume of solution in L}}$`, r`$\text{mol L}^{-1}$`, 'Yes'], ['Molality', r`$m = \dfrac{\text{moles of solute}}{\text{mass of solvent in kg}}$`, r`$\text{mol kg}^{-1}$`, 'No']], 'Table giving the formula, unit and temperature dependence of mole fraction, molarity and molality'),
      m: [r`x_\text{A} + x_\text{B} = 1`],
      n: 'Three mole-based units appear in almost every numerical. Mole fraction is the share of all the moles that belong to one component; the mole fractions of all components add up to one. Molarity is moles of solute per litre of solution. Molality is moles of solute per kilogram of solvent. Notice the trap: molarity uses the volume of the whole solution, but molality uses the mass of the solvent only.',
    }),
    sl('example', 'Worked example: molality and mole fraction', {
      b: r`**Problem.** $36\ \text{g}$ of glucose ($\ce{C6H12O6}$, $M = 180\ \text{g mol}^{-1}$) is dissolved in $400\ \text{g}$ of water. Find the molality and the mole fraction of glucose.

**Step 1.** Moles of glucose $= \dfrac{36}{180} = 0.2\ \text{mol}$; moles of water $= \dfrac{400}{18} \approx 22.22\ \text{mol}$.

**Step 2.** Molality $= \dfrac{0.2}{0.400} = 0.5\ \text{mol kg}^{-1}$.

**Step 3.** $x_\text{glucose} = \dfrac{0.2}{0.2 + 22.22} \approx 0.0089$.`,
      v: table(['Quantity', 'Glucose', 'Water'], [['Mass', r`$36\ \text{g}$`, r`$400\ \text{g}$`], ['Molar mass', r`$180\ \text{g mol}^{-1}$`, r`$18\ \text{g mol}^{-1}$`], ['Moles', r`$0.2$`, r`$22.22$`]], 'Table of mass, molar mass and moles of glucose and water in the worked example'),
      n: 'Let us work through it. First convert both masses to moles: thirty six grams of glucose is zero point two mole, and four hundred grams of water is about twenty two point two mole. For molality, divide the moles of glucose by the mass of water in kilograms, zero point four, giving zero point five mole per kilogram. For the mole fraction, divide the glucose moles by the total moles.',
    }),
    sl('example', 'Worked example: from mass percentage to molarity', {
      b: r`**Problem.** A sodium hydroxide solution is $20\%$ by mass and has density $1.2\ \text{g mL}^{-1}$. Find its molarity and molality. ($M_{\ce{NaOH}} = 40\ \text{g mol}^{-1}$)

**Step 1.** Take $100\ \text{g}$ of solution: $20\ \text{g}$ NaOH $= \dfrac{20}{40} = 0.5\ \text{mol}$, and $80\ \text{g}$ water.

**Step 2.** Volume of solution $= \dfrac{100}{1.2} \approx 83.33\ \text{mL} = 0.08333\ \text{L}$, so molarity $= \dfrac{0.5}{0.08333} \approx 6.0\ \text{mol L}^{-1}$.

**Step 3.** Molality $= \dfrac{0.5}{0.080} = 6.25\ \text{mol kg}^{-1}$.`,
      v: flow('LR', [['a', 'Assume 100 g of solution'], ['b', 'Mass of solute → moles'], ['c', 'Density → volume of solution'], ['d', 'Molarity = moles ÷ litres'], ['e', 'Molality = moles ÷ kg of solvent']], [['a', 'b'], ['a', 'c'], ['b', 'd'], ['c', 'd'], ['b', 'e']], 'Flow for converting a mass percentage into molarity and molality: assume 100 g of solution, find moles of solute, use density for the volume, then divide'),
      n: 'Whenever a percentage is given, imagine exactly one hundred grams of solution. Here that holds twenty grams of sodium hydroxide, which is half a mole, and eighty grams of water. Density turns the hundred grams into a volume of about eighty three millilitres. Half a mole in that volume is a molarity of six. Half a mole per eighty grams of water is a molality of six point two five.',
    }),
    sl('check', 'Quick check: which unit ignores temperature?', {
      b: 'A solution is prepared at 20 °C and later used at 40 °C. Which way of stating its concentration stays the same?',
      n: 'Quick check. Ask yourself which units are built from masses alone and which one needs the volume of the solution. Volumes change as a liquid warms; masses do not.',
      chk: 'temp-indep-mcq',
    }),
    sl('concept', 'Solubility of a solid in a liquid', {
      b: '**Solubility** is the maximum amount of a substance that dissolves in a given amount of solvent at a given temperature. Polar and ionic solutes dissolve in polar solvents, and non-polar solutes in non-polar solvents: **like dissolves like**. In a **saturated** solution, dissolving and crystallisation go on at equal rates (dynamic equilibrium).',
      v: table(['Factor', 'Effect on solubility of a solid'], [['Nature of solute and solvent', 'Like dissolves like: salt in water, naphthalene in benzene'], ['Temperature, dissolving absorbs heat', 'Solubility increases as temperature rises'], ['Temperature, dissolving releases heat', 'Solubility decreases as temperature rises'], ['Pressure', 'Almost no effect (solids and liquids are nearly incompressible)']], 'Table of the factors that affect the solubility of a solid in a liquid: nature of the substances, temperature for endothermic and exothermic dissolving, and pressure'),
      n: 'Salt dissolves in water but not in kerosene, while wax does the opposite. That is the rule of like dissolves like. When no more solute dissolves, the solution is saturated: solute particles still leave and rejoin the solid, at equal rates. Temperature shifts this balance. If dissolving absorbs heat, warming helps; if it releases heat, warming reduces solubility. Pressure hardly matters for solids.',
    }),
    sl('diagram', 'Gases in liquids: the role of pressure', {
      b: 'Raising the pressure of a gas above a liquid pushes more gas particles into the liquid until a new equilibrium is reached. Solubility of a gas therefore **increases with pressure**.',
      v: V.henry,
      n: 'Picture a gas trapped above water in a cylinder. Gas particles keep hitting the surface, and some dissolve. Now push the piston down. The same gas is squeezed into a smaller space, so particles strike the surface more often and more of them dissolve. The amount dissolved rises until dissolving and escaping balance again. This is the idea behind Henry’s law.',
    }),
    sl('concept', 'Henry’s law', {
      b: r`**Henry’s law:** at a constant temperature, the partial pressure of a gas in the vapour phase is proportional to its mole fraction in the solution. A **larger** $K_\text{H}$ means a **less** soluble gas.`,
      m: [r`p = K_\text{H}\, x`],
      v: table(['Gas (in water)', r`$K_\text{H}$ / kbar`, 'Temperature'], [['Helium', r`$144.97$`, '293 K'], ['Nitrogen', r`$76.48$`, '293 K'], ['Oxygen', r`$34.86$`, '293 K'], ['Carbon dioxide', r`$1.67$`, '298 K']], 'Table of Henry’s law constants in water: helium about 145, nitrogen about 76, oxygen about 35 and carbon dioxide about 1.7 kilobar'),
      n: 'Henry’s law says the partial pressure of a gas above a solution equals a constant times its mole fraction in the solution. Look at the constants. Carbon dioxide has a small constant, so it is quite soluble; helium has a huge one, so very little dissolves. Henry’s constant also rises with temperature, which is why gases are less soluble in warm water.',
    }),
    sl('example', 'Worked example: carbon dioxide in a soda bottle', {
      b: r`**Problem.** A soda is bottled under carbon dioxide at a partial pressure of $2.5\ \text{bar}$ at $298\ \text{K}$. $K_\text{H}(\ce{CO2}) = 1.67\ \text{kbar}$. Estimate the mass of $\ce{CO2}$ dissolved in $500\ \text{mL}$ of the drink (treat it as water, $500\ \text{g}$).

**Step 1.** $x_{\ce{CO2}} = \dfrac{p}{K_\text{H}} = \dfrac{2.5}{1670} \approx 1.50 \times 10^{-3}$.

**Step 2.** Moles of water $= \dfrac{500}{18} \approx 27.8\ \text{mol}$; for a very dilute solution $n_{\ce{CO2}} \approx x \times n_\text{water} \approx 0.0416\ \text{mol}$.

**Step 3.** Mass $\approx 0.0416 \times 44 \approx 1.83\ \text{g}$.`,
      v: flow('LR', [['a', 'Partial pressure p'], ['b', 'x = p ÷ KH'], ['c', 'n(gas) ≈ x × n(water)'], ['d', 'mass = n × M']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Flow for a Henry’s law calculation: partial pressure, then mole fraction from p divided by the constant, then moles of gas, then mass'),
      n: 'Put the units on the same footing first: two point five bar and one point six seven kilobar, which is one thousand six hundred and seventy bar. Dividing gives a mole fraction of about one point five thousandths. Half a litre of water is nearly twenty eight mole, so the gas is about four hundredths of a mole, or close to two grams. Opening the bottle lowers the pressure and this gas fizzes out.',
    }),
    sl('concept', 'Henry’s law in daily life', {
      b: 'Henry’s law explains several everyday and medical effects.',
      v: table(['Situation', 'What happens', 'Link to Henry’s law'], [['Opening a cold drink', 'Bubbles stream out', 'Pressure falls, so dissolved carbon dioxide comes out'], ['Deep-sea diving', 'Nitrogen dissolves in blood; rising fast forms bubbles (the bends)', 'High pressure underwater raises solubility; tanks use air diluted with helium'], ['High mountains', 'Weakness and confused thinking (anoxia)', 'Low partial pressure of oxygen, so less dissolves in blood'], ['Fish in warm ponds', 'Fish gasp at the surface on hot afternoons', 'Henry’s constant rises with temperature, so less oxygen dissolves']], 'Table of four situations explained by Henry’s law: opening a cold drink, the bends in divers, anoxia at high altitude, and low oxygen in warm ponds'),
      n: 'Henry’s law is all around you. A cold drink fizzes when opened because the pressure drops. Divers who rise too fast get the painful bends, as nitrogen dissolved under high pressure forms bubbles in the blood; so their tanks use air diluted with helium. Climbers feel weak high up because less oxygen dissolves in their blood. And on hot days, warm ponds hold less oxygen for fish.',
    }),
    sl('check', 'Quick check: which gas dissolves least?', {
      b: 'Use the values of Henry’s law constant to decide which gas is least soluble in water.',
      n: 'Quick check. Remember which way Henry’s constant works: the larger the constant, the larger the pressure needed to dissolve the same amount of gas.',
      chk: 'kh-order-mcq',
    }),
    sl('concept', 'Raoult’s law for two volatile liquids', {
      b: r`In a mixture of two volatile liquids A and B, **each component’s partial vapour pressure is proportional to its mole fraction** in the liquid. By Dalton’s law, the total pressure is the sum.`,
      m: [r`p_\text{A} = p^\circ_\text{A}\, x_\text{A}, \qquad p_\text{B} = p^\circ_\text{B}\, x_\text{B}`, r`p_\text{total} = p^\circ_\text{A} + (p^\circ_\text{B} - p^\circ_\text{A})\, x_\text{B}`],
      v: flow('LR', [['a', 'Mole fractions in the liquid'], ['b', 'Partial pressures (Raoult)'], ['c', 'Total pressure (Dalton)'], ['d', 'Vapour composition yA = pA ÷ ptotal']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Flow: liquid mole fractions give partial pressures by Raoult’s law, which add to the total pressure, which gives the vapour composition'),
      n: 'Now mix two liquids that both evaporate, such as two hydrocarbons. Raoult’s law says each liquid’s partial vapour pressure equals its pure vapour pressure times its mole fraction in the liquid. Add the two partial pressures and you get the total. Divide one partial pressure by the total and you find that component’s share in the vapour.',
    }),
    sl('diagram', 'Raoult’s law on a graph', {
      b: 'For an ideal solution, both partial pressures and the total pressure are **straight lines** against composition. The total line runs between the vapour pressures of the two pure liquids.',
      v: raoultPlot,
      n: 'Here is the picture for an ideal mixture. As the share of B rises, the partial pressure of A falls in a straight line to zero, and that of B rises in a straight line from zero. Their sum, the total vapour pressure, is also a straight line, running from pure A on the left to pure B on the right. Any curve away from these lines means the solution is not ideal.',
    }),
    sl('example', 'Worked example: vapour is richer in the more volatile liquid', {
      b: r`**Problem.** At $298\ \text{K}$, $p^\circ$ of hexane is $20.2\ \text{kPa}$ and of heptane $6.1\ \text{kPa}$. A mixture contains $1\ \text{mol}$ hexane and $3\ \text{mol}$ heptane. Find the total vapour pressure and the mole fraction of hexane in the vapour (assume ideal).

**Step 1.** $x_\text{hex} = \dfrac{1}{4} = 0.25$, $x_\text{hep} = 0.75$.

**Step 2.** $p_\text{hex} = 20.2 \times 0.25 = 5.05\ \text{kPa}$; $p_\text{hep} = 6.1 \times 0.75 = 4.575\ \text{kPa}$; $p_\text{total} = 9.625\ \text{kPa}$.

**Step 3.** $y_\text{hex} = \dfrac{5.05}{9.625} \approx 0.525$.`,
      v: table(['Component', 'In the liquid', 'In the vapour'], [['Hexane', r`$0.25$`, r`$0.525$`], ['Heptane', r`$0.75$`, r`$0.475$`]], 'Table comparing the mole fractions of hexane and heptane in the liquid and in the vapour'),
      n: 'Hexane is a quarter of the liquid. Its partial pressure is twenty point two times a quarter, about five kilopascal, and heptane contributes about four point six. The total is about nine point six. Now look at the vapour: hexane makes up more than half of it, although it was only a quarter of the liquid. The more volatile liquid always enriches the vapour. This is the basis of fractional distillation.',
    }),
    sl('concept', 'Raoult’s law and Henry’s law are relatives', {
      b: r`For a **non-volatile solute** (sugar, salt), only the solvent contributes vapour: $p_\text{solution} = p^\circ_1\, x_1$. Both laws say a partial pressure is proportional to a mole fraction; in Raoult’s law the constant is $p^\circ$, in Henry’s law it is $K_\text{H}$.`,
      v: table(['', 'Henry’s law', 'Raoult’s law'], [['Equation', r`$p = K_\text{H}\, x$`, r`$p = p^\circ x$`], ['Applies to', 'A dissolved gas (solute)', 'A volatile component, usually the solvent'], ['Constant', r`$K_\text{H}$, depends on gas, solvent and temperature`, r`$p^\circ$, vapour pressure of the pure liquid`]], 'Table comparing Henry’s law and Raoult’s law: equations, what they apply to and the meaning of the constant'),
      n: 'Notice that Henry’s law and Raoult’s law have the same form: partial pressure equals a constant times mole fraction. Raoult’s law is the special case in which the constant is simply the vapour pressure of the pure liquid. When the solute is non-volatile, like sugar, only the solvent evaporates, and the vapour pressure of the solution is the solvent’s pure vapour pressure times its mole fraction.',
    }),
    sl('two-column', 'Ideal and non-ideal solutions', {
      b: 'Whether a solution obeys Raoult’s law depends on how the **A–B attractions** compare with the A–A and B–B attractions.',
      cols: [
        r`**Ideal** — obeys Raoult’s law at all compositions; A–B attractions about equal to A–A and B–B; $\Delta_\text{mix}H = 0$, $\Delta_\text{mix}V = 0$. Examples: n-hexane + n-heptane; bromoethane + chloroethane; benzene + toluene.`,
        r`**Non-ideal, positive deviation** — A–B attractions **weaker**; vapour pressure higher than predicted; $\Delta_\text{mix}H > 0$, volume increases. Example: ethanol + acetone.

**Non-ideal, negative deviation** — A–B attractions **stronger**; vapour pressure lower; $\Delta_\text{mix}H < 0$, volume decreases. Example: chloroform + acetone (hydrogen bonding).`,
      ],
      v: table(['Type', 'A–B attraction', r`$\Delta_\text{mix}H$`, r`$\Delta_\text{mix}V$`], [['Ideal', 'Same as A–A, B–B', r`$0$`, r`$0$`], ['Positive deviation', 'Weaker', 'positive (cools)', 'positive'], ['Negative deviation', 'Stronger', 'negative (warms)', 'negative']], 'Table of ideal solutions and solutions with positive and negative deviation: strength of A–B attraction and signs of enthalpy and volume of mixing'),
      n: 'Why do some mixtures break Raoult’s law? It is about attractions. If A and B attract each other as strongly as they attract themselves, the solution is ideal. If the new attractions are weaker, molecules escape more easily, giving positive deviation. If they are stronger, as when chloroform forms hydrogen bonds with acetone, molecules are held back, giving negative deviation and some warming on mixing.',
    }),
    sl('diagram', 'Positive and negative deviation on a graph', {
      b: 'Positive deviation: total vapour pressure lies **above** the Raoult line. Negative deviation: it lies **below** it.',
      v: deviationPlot,
      n: 'On a graph the difference is easy to see. The straight line is the ideal prediction. A curve that bulges above it shows positive deviation, because molecules escape more easily than expected. A curve that sags below it shows negative deviation, because the mixture holds its molecules more tightly. If the bulge or the sag is large enough, the curve reaches a maximum or a minimum.',
    }),
    sl('concept', 'Azeotropes: mixtures that boil like one liquid', {
      b: 'An **azeotrope** is a mixture that boils at a constant temperature with the **same composition in liquid and vapour**, so it cannot be separated by fractional distillation.',
      v: table(['Type', 'Arises from', 'Example'], [['Minimum-boiling azeotrope', 'Large positive deviation', 'Ethanol + water, about 95% ethanol by volume, boils near 351 K'], ['Maximum-boiling azeotrope', 'Large negative deviation', 'Nitric acid + water, about 68% nitric acid by mass, boils near 393.5 K']], 'Table of minimum-boiling and maximum-boiling azeotropes, the kind of deviation that causes each, and an example'),
      n: 'If you try to purify ethanol by distillation, you get stuck at about ninety five percent ethanol. At that composition the vapour has the same make-up as the liquid, so distillation stops separating them. Such a mixture is called an azeotrope. Large positive deviation gives a minimum-boiling azeotrope; large negative deviation, as in nitric acid and water, gives a maximum-boiling one.',
    }),
    sl('check', 'Quick check: identify the deviation', {
      b: 'Two liquids warm up when mixed, and the volume of the mixture is a little less than the sum of the volumes. What does this tell you?',
      n: 'Quick check. Link the warming to stronger attractions forming between the two kinds of molecule, and then decide how the vapour pressure must change.',
      chk: 'deviation-sign-mcq',
    }),
    sl('example', 'Worked example: reading deviation from data', {
      b: r`**Problem.** Liquids P ($p^\circ = 40\ \text{kPa}$) and Q ($p^\circ = 60\ \text{kPa}$) are mixed in equal moles. The measured total vapour pressure is $58\ \text{kPa}$. Is the solution ideal?

**Step 1.** Raoult’s prediction: $p = 40 \times 0.5 + 60 \times 0.5 = 50\ \text{kPa}$.

**Step 2.** Measured $58\ \text{kPa}$ is higher than $50\ \text{kPa}$: **positive deviation**.

**Step 3.** So P–Q attractions are weaker than P–P and Q–Q; mixing absorbs heat and the volume increases.`,
      v: table(['', 'Total vapour pressure'], [['Raoult prediction', r`$50\ \text{kPa}$`], ['Measured', r`$58\ \text{kPa}$`], ['Conclusion', 'Positive deviation']], 'Table comparing the predicted vapour pressure of 50 kPa with the measured 58 kPa, giving positive deviation'),
      n: 'To judge a solution from data, first work out what Raoult’s law predicts. Equal moles means each mole fraction is one half, so the prediction is twenty plus thirty, fifty kilopascal. The measured value is fifty eight, which is higher. Molecules are escaping more easily than expected, so the deviation is positive and the attractions between the two different molecules are weaker.',
    }),
    sl('summary', 'Summary: Part 1', {
      ul: [
        'Concentration: mass %, volume %, w/v %, ppm, mole fraction, molarity (mol per litre of solution) and molality (mol per kg of solvent).',
        'Mole fraction, mass % and molality do not change with temperature; molarity does.',
        'Solid solubility: like dissolves like; temperature effect depends on the heat of dissolving; pressure has little effect.',
        r`Henry’s law $p = K_\text{H}\,x$: gas solubility rises with pressure and falls with temperature; larger $K_\text{H}$ means lower solubility.`,
        r`Raoult’s law $p_\text{A} = p^\circ_\text{A} x_\text{A}$; the vapour is richer in the more volatile component.`,
        'Positive deviation: weaker A–B forces, higher vapour pressure, minimum-boiling azeotrope. Negative deviation: stronger A–B forces, lower vapour pressure, maximum-boiling azeotrope.',
      ],
      v: table(['Law', 'Equation'], [['Henry', r`$p = K_\text{H}\, x$`], ['Raoult', r`$p_\text{A} = p^\circ_\text{A}\, x_\text{A}$`], ['Dalton', r`$p_\text{total} = p_\text{A} + p_\text{B}$`]], 'Summary table of Henry’s, Raoult’s and Dalton’s laws'),
      n: 'Let us sum up Part 1. You can now express concentration in several ways and know which ones are unaffected by temperature. You know what controls the solubility of solids and gases, and you can use Henry’s law. You can apply Raoult’s law to mixtures of liquids, tell an ideal solution from a non-ideal one, and explain why azeotropes cannot be separated by distillation.',
    }),
    sl('exam-tips', 'Exam tips: Part 1', {
      ul: [
        'Molality uses kg of **solvent**, not of solution: subtract the solute’s mass first.',
        'When a percentage and a density are given, assume 100 g of solution.',
        r`In Henry’s law, put $p$ and $K_\text{H}$ in the **same** pressure unit (1 kbar = 1000 bar).`,
        'State both parts of a deviation answer: the attraction (weaker or stronger) and the sign of the enthalpy or volume change.',
        'Name the azeotrope type by the deviation: positive → minimum boiling, negative → maximum boiling.',
      ],
      v: table(['Common slip', 'Fix'], [['Dividing by kg of solution for molality', 'Use kg of solvent'], [r`Mixing bar and kbar in $p = K_\text{H} x$`, 'Convert to one unit first'], ['Saying “more soluble” for larger KH', 'Larger KH means less soluble']], 'Table of common slips in Part 1 and how to fix them'),
      n: 'Some quick exam tips. For molality, divide by the mass of solvent, not of solution. When you see a percentage with a density, imagine one hundred grams. Keep pressure units the same in Henry’s law. In deviation questions, mention both the change in attractions and the sign of the heat or volume change. And match the azeotrope type to the deviation carefully.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Solutions — Part 2: Colligative properties and the van’t Hoff factor',
  goals: [
    'Explain the relative lowering of vapour pressure and use it to find molar mass',
    'Calculate the elevation of boiling point and the depression of freezing point',
    'Explain osmosis, osmotic pressure, isotonic solutions and reverse osmosis, and use osmotic pressure to find molar mass',
    'Use the van’t Hoff factor to correct for dissociation and association and to find the degree of dissociation or association',
  ],
  slides: [
    sl('title', 'Colligative properties', {
      b: 'Part 2 — four properties that depend only on **how many** solute particles are present, not on what they are.',
      v: flow('TB', [['s', 'Non-volatile solute added'], ['a', 'Relative lowering of vapour pressure'], ['b', 'Elevation of boiling point'], ['c', 'Depression of freezing point'], ['d', 'Osmotic pressure']], [['s', 'a'], ['s', 'b'], ['s', 'c'], ['s', 'd']], 'Flow: adding a non-volatile solute causes four colligative effects: lowering of vapour pressure, elevation of boiling point, depression of freezing point and osmotic pressure'),
      n: 'Why do cooks add salt before boiling pasta, why do cold countries spread salt on icy roads, and why do doctors use saline of a fixed strength in a drip? All three depend on colligative properties. These are properties of a solution that depend only on the number of solute particles, not on their identity. There are four of them, and each can be used to find a molar mass.',
    }),
    sl('concept', 'What “colligative” means', {
      b: 'Colligative means “tied together”: the four effects all come from the **number of solute particles per amount of solvent**. One mole of glucose and one mole of urea in the same mass of water give the same effects.',
      v: table(['Solution in 1 kg of water', 'Particles of solute', 'Size of effect'], [['1 mol glucose', '1 mol of molecules', '1 unit'], ['1 mol urea', '1 mol of molecules', '1 unit'], ['1 mol sodium chloride (fully split)', '2 mol of ions', 'about 2 units'], ['1 mol calcium chloride (fully split)', '3 mol of ions', 'about 3 units']], 'Table showing that a mole of glucose or urea gives one unit of effect, while a fully dissociated mole of sodium chloride gives about two and calcium chloride about three'),
      n: 'The word colligative means bound together. All four effects are tied to one quantity: how many solute particles are dissolved in a given amount of solvent. So a mole of glucose and a mole of urea act exactly alike. But a mole of common salt splits into two moles of ions and gives about twice the effect. Keep this particle-counting idea in mind for the whole of Part 2.',
    }),
    sl('diagram', 'Lowering of vapour pressure', {
      b: 'Solute particles take up part of the surface, so **fewer solvent molecules escape** per second. The vapour pressure of a solution of a non-volatile solute is lower than that of the pure solvent.',
      v: V.vplower,
      n: 'Here is why a solution has a lower vapour pressure. At the surface of pure water, every spot is a water molecule that could escape. In a solution, some surface spots are taken by solute particles that cannot evaporate. So fewer solvent molecules escape each second, and the pressure of the vapour above the liquid is lower. More solute particles means a bigger lowering.',
    }),
    sl('concept', 'Relative lowering of vapour pressure', {
      b: r`From Raoult’s law, the **relative lowering** of vapour pressure equals the **mole fraction of the solute**. For a dilute solution $n_2 \ll n_1$, which gives a route to the solute’s molar mass $M_2$.`,
      m: [r`\dfrac{p^\circ_1 - p_1}{p^\circ_1} = x_2 = \dfrac{n_2}{n_1 + n_2} \approx \dfrac{w_2 M_1}{M_2 w_1}`],
      v: table(['Symbol', 'Meaning'], [[r`$p^\circ_1$`, 'Vapour pressure of pure solvent'], [r`$p_1$`, 'Vapour pressure of the solution'], [r`$w_1, M_1$`, 'Mass and molar mass of solvent'], [r`$w_2, M_2$`, 'Mass and molar mass of solute']], 'Table of the symbols in the relative lowering of vapour pressure equation'),
      n: 'Raoult’s law gives a neat result. The lowering of vapour pressure, divided by the vapour pressure of the pure solvent, equals the mole fraction of the solute. This fraction is called the relative lowering. In a dilute solution the solute moles are tiny compared with the solvent moles, so we can write the mole fraction in terms of masses and molar masses, and solve for the unknown molar mass.',
    }),
    sl('example', 'Worked example: relative lowering', {
      b: r`**Problem.** $6\ \text{g}$ of urea ($M = 60\ \text{g mol}^{-1}$) is dissolved in $90\ \text{g}$ of water at $298\ \text{K}$, where $p^\circ_\text{water} = 3.17\ \text{kPa}$. Find the vapour pressure of the solution.

**Step 1.** $n_\text{urea} = \dfrac{6}{60} = 0.1\ \text{mol}$; $n_\text{water} = \dfrac{90}{18} = 5\ \text{mol}$.

**Step 2.** $x_\text{urea} = \dfrac{0.1}{5.1} \approx 0.0196$.

**Step 3.** $p = 3.17 \times (1 - 0.0196) \approx 3.11\ \text{kPa}$, a lowering of about $0.062\ \text{kPa}$.`,
      v: table(['Quantity', 'Value'], [['Moles of urea', r`$0.1$`], ['Moles of water', r`$5$`], ['Relative lowering', r`$\approx 0.0196$`], ['Vapour pressure of solution', r`$\approx 3.11\ \text{kPa}$`]], 'Table of the steps in the urea example: moles of urea and water, relative lowering and vapour pressure of the solution'),
      n: 'Six grams of urea is a tenth of a mole, and ninety grams of water is five mole. The mole fraction of urea is a tenth divided by five point one, about two hundredths. That is the relative lowering. So the solution keeps about ninety eight percent of the pure water’s vapour pressure: about three point one one kilopascal, a drop of roughly six hundredths of a kilopascal.',
    }),
    sl('diagram', 'Why a solution boils at a higher temperature', {
      b: 'A liquid boils when its vapour pressure equals the atmospheric pressure. The solution’s vapour pressure curve lies **below** the solvent’s, so it must be heated **more** to reach that pressure.',
      v: boilPlot,
      n: 'A liquid boils when its vapour pressure reaches the pressure of the atmosphere. On this graph, the solution’s curve always sits below the pure water curve, because the solute lowers the vapour pressure. So the solution crosses the atmospheric-pressure line at a higher temperature. The gap between the two boiling points is called the elevation of boiling point.',
    }),
    sl('concept', 'Elevation of boiling point', {
      b: r`For dilute solutions the elevation is proportional to the **molality**. $K_\text{b}$, the **ebullioscopic constant**, is the elevation for a $1\ \text{mol kg}^{-1}$ solution; unit $\text{K kg mol}^{-1}$.`,
      m: [r`\Delta T_\text{b} = K_\text{b}\, m = \dfrac{K_\text{b} \times 1000 \times w_2}{M_2 \times w_1}`],
      v: table(['Solvent', r`$K_\text{b}$ / K kg mol$^{-1}$`, r`$K_\text{f}$ / K kg mol$^{-1}$`], [['Water', r`$0.52$`, r`$1.86$`], ['Benzene', r`$2.53$`, r`$5.12$`]], 'Table of boiling point and freezing point constants: water 0.52 and 1.86, benzene 2.53 and 5.12 kelvin kilogram per mole'),
      n: 'The rise in boiling point is proportional to the molality of the solute. The constant is called the ebullioscopic constant, or the molal elevation constant. For water it is about half a kelvin for every mole of solute per kilogram. In the second form of the equation, the masses are in grams, which is why the factor of one thousand appears.',
    }),
    sl('example', 'Worked example: boiling point of a glucose solution', {
      b: r`**Problem.** $45\ \text{g}$ of glucose ($M = 180\ \text{g mol}^{-1}$) is dissolved in $500\ \text{g}$ of water. At what temperature does the solution boil at 1 atm? ($K_\text{b} = 0.52\ \text{K kg mol}^{-1}$, water boils at $373.15\ \text{K}$)

**Step 1.** $m = \dfrac{45/180}{0.500} = 0.5\ \text{mol kg}^{-1}$.

**Step 2.** $\Delta T_\text{b} = 0.52 \times 0.5 = 0.26\ \text{K}$.

**Step 3.** $T_\text{b} = 373.15 + 0.26 = 373.41\ \text{K}$.`,
      v: flow('LR', [['a', 'Mass of solute → moles'], ['b', 'Moles ÷ kg solvent = m'], ['c', 'ΔTb = Kb × m'], ['d', 'Tb = Tb of solvent + ΔTb']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Flow for a boiling point elevation calculation: moles, molality, elevation, new boiling point'),
      n: 'Forty five grams of glucose is a quarter of a mole. In half a kilogram of water that gives a molality of zero point five. Multiply by the constant zero point five two to get an elevation of zero point two six kelvin. Add it to the normal boiling point. Notice how small the rise is: colligative effects are small unless the solution is fairly concentrated.',
    }),
    sl('concept', 'Depression of freezing point', {
      b: r`At the freezing point, the solid and liquid solvent have the **same vapour pressure**. A solute lowers the liquid’s vapour pressure, so the two become equal only at a **lower temperature**. $K_\text{f}$ is the **cryoscopic constant**.`,
      m: [r`\Delta T_\text{f} = K_\text{f}\, m = \dfrac{K_\text{f} \times 1000 \times w_2}{M_2 \times w_1}`],
      v: table(['Use', 'How the freezing point is lowered'], [['Salt on icy roads', 'Brine forms, freezing below 0 °C, so ice melts'], ['Antifreeze in car radiators', 'Ethylene glycol keeps the coolant liquid in winter'], ['Ice cream making', 'Ice with salt gets cold enough to freeze the cream mix']], 'Table of uses of freezing point depression: salt on roads, antifreeze in radiators and ice cream making'),
      n: 'Freezing happens when the solid solvent and the liquid have the same vapour pressure. Dissolving a solute lowers the liquid’s vapour pressure, so they match only at a lower temperature. The drop is again proportional to molality, with the cryoscopic constant. That is why salted roads stay clear of ice, and why car radiators in cold places contain ethylene glycol.',
    }),
    sl('example', 'Worked example: how much antifreeze?', {
      b: r`**Problem.** What mass of ethylene glycol ($\ce{C2H6O2}$, $M = 62\ \text{g mol}^{-1}$) must be added to $4\ \text{kg}$ of water so that it does not freeze until $-6\ ^\circ\text{C}$? ($K_\text{f} = 1.86\ \text{K kg mol}^{-1}$)

**Step 1.** $\Delta T_\text{f} = 6\ \text{K}$, so $m = \dfrac{6}{1.86} \approx 3.226\ \text{mol kg}^{-1}$.

**Step 2.** Moles needed $= 3.226 \times 4 \approx 12.90\ \text{mol}$.

**Step 3.** Mass $= 12.90 \times 62 \approx 800\ \text{g}$.`,
      v: table(['Step', 'Result'], [['Required depression', r`$6\ \text{K}$`], ['Molality', r`$\approx 3.23\ \text{mol kg}^{-1}$`], ['Moles in 4 kg water', r`$\approx 12.9\ \text{mol}$`], ['Mass of ethylene glycol', r`$\approx 800\ \text{g}$`]], 'Table of the antifreeze calculation: depression 6 K, molality about 3.23, about 12.9 mol, about 800 g'),
      n: 'Work backwards from the target. A freezing point of minus six degrees Celsius means a depression of six kelvin. Divide by the cryoscopic constant of water to get the molality, about three point two three. For four kilograms of water we need about twelve point nine mole. At sixty two grams per mole, that is about eight hundred grams of ethylene glycol.',
    }),
    sl('check', 'Quick check: which freezes lowest?', {
      b: 'Equal molal solutions of different solutes are compared. Count the particles to decide which freezes at the lowest temperature.',
      n: 'Quick check. Count the particles each solute gives in water. More particles per kilogram of water means a bigger depression of the freezing point.',
      chk: 'lowest-fp-mcq',
    }),
    sl('diagram', 'Osmosis and osmotic pressure', {
      b: '**Osmosis** is the net flow of solvent through a **semipermeable membrane** from the pure solvent (or a dilute solution) into a more concentrated solution. The **osmotic pressure** $\\pi$ is the extra pressure that must be applied to the solution to just stop this flow.',
      v: V.osmosis,
      n: 'Now the fourth property. A semipermeable membrane lets solvent molecules through but blocks solute particles. If pure water and a sugar solution are separated by such a membrane, water moves into the solution, and its level rises. The extra pressure needed on the solution to just stop this flow is called its osmotic pressure. In the U-tube it shows up as a column of height h.',
    }),
    sl('concept', 'Osmotic pressure and molar mass', {
      b: r`For dilute solutions, osmotic pressure is proportional to **molarity** and to temperature. Osmotic pressure is the method of choice for **proteins and polymers**: it is measured at room temperature and gives large, measurable values even for tiny molar concentrations.`,
      m: [r`\pi = CRT = \dfrac{n_2}{V} RT \quad\Rightarrow\quad M_2 = \dfrac{w_2 R T}{\pi V}`],
      v: table(['Reason', 'Why it matters for big molecules'], [['Measured near room temperature', 'Proteins and polymers are not damaged by heat'], ['Molarity, not molality', 'Uses the volume of solution, easy to measure'], ['Large values', r`Even $10^{-4}\ \text{mol L}^{-1}$ gives a few millibar, while $\Delta T_\text{f}$ would be far too small to read`]], 'Table of reasons osmotic pressure is preferred for finding the molar mass of proteins and polymers'),
      n: 'Osmotic pressure follows an equation just like the ideal gas law: pressure equals concentration times the gas constant times temperature. Because it can be measured at room temperature, and because it gives readable values even for very dilute solutions, it is the best way to find the molar mass of large molecules such as proteins and polymers, which would be damaged by heating.',
    }),
    sl('example', 'Worked example: molar mass of a protein', {
      b: r`**Problem.** $2.0\ \text{g}$ of a protein is dissolved to make $250\ \text{mL}$ of solution at $300\ \text{K}$. Its osmotic pressure is $4.98 \times 10^{-3}\ \text{bar}$. Find the molar mass. ($R = 0.083\ \text{L bar K}^{-1}\ \text{mol}^{-1}$)

**Step 1.** $M_2 = \dfrac{w_2 R T}{\pi V}$.

**Step 2.** $M_2 = \dfrac{2.0 \times 0.083 \times 300}{4.98 \times 10^{-3} \times 0.250}$.

**Step 3.** $M_2 = \dfrac{49.8}{1.245 \times 10^{-3}} = 40000\ \text{g mol}^{-1}$.`,
      v: table(['Quantity', 'Value'], [['Mass of protein', r`$2.0\ \text{g}$`], ['Volume', r`$0.250\ \text{L}$`], ['Osmotic pressure', r`$4.98 \times 10^{-3}\ \text{bar}$`], ['Molar mass', r`$4.0 \times 10^{4}\ \text{g mol}^{-1}$`]], 'Table of data and the result for the protein molar mass example'),
      n: 'Rearrange the osmotic pressure equation to make molar mass the subject. Keep the volume in litres, so two hundred and fifty millilitres becomes zero point two five. The top of the fraction is forty nine point eight, and the bottom is about one point two five thousandths. The molar mass comes out at forty thousand grams per mole, a typical value for a protein.',
    }),
    sl('concept', 'Isotonic solutions and reverse osmosis', {
      b: 'Solutions with the **same osmotic pressure** are **isotonic**. A cell placed in a **hypertonic** solution loses water and shrinks; in a **hypotonic** solution it takes in water and swells. Applying a pressure **larger** than the osmotic pressure forces solvent the other way: **reverse osmosis**, used to purify sea water.',
      v: V.ro,
      n: 'Our red blood cells have the same osmotic pressure as saline of about zero point nine percent salt, so the two are isotonic, and drips use this strength. In a stronger, hypertonic solution the cells lose water and shrink; in pure water they swell. If we push on a solution with more than its osmotic pressure, water is forced out through the membrane. This reverse osmosis is used to make drinking water from sea water.',
    }),
    sl('check', 'Quick check: a cell in salty water', {
      b: 'Predict what happens to a raw grape or a red blood cell placed in a concentrated salt solution.',
      n: 'Quick check. Decide which side of the cell membrane has more water molecules free to move, and remember that water flows towards the side with more solute.',
      chk: 'hypertonic-mcq',
    }),
    sl('concept', 'Abnormal molar masses', {
      b: 'Colligative properties count particles. If a solute **dissociates** into ions, there are more particles and the molar mass calculated from the effect comes out **too low**. If it **associates** (two molecules pair up), there are fewer particles and the molar mass comes out **too high**.',
      v: table(['Solute and solvent', 'What happens', 'Particles', 'Calculated molar mass'], [['Potassium chloride in water', r`$\ce{KCl -> K+ + Cl-}$`, 'More', 'Lower than 74.5'], ['Ethanoic acid in benzene', r`$\ce{2CH3COOH <=> (CH3COOH)2}$`, 'Fewer', 'Higher than 60']], 'Table: potassium chloride dissociates in water giving more particles and a low calculated molar mass, while ethanoic acid dimerises in benzene giving fewer particles and a high calculated molar mass'),
      n: 'Sometimes the molar mass found from a colligative property does not match the formula. Potassium chloride in water splits into potassium and chloride ions, so there are nearly twice as many particles, and the molar mass appears to be about half. Ethanoic acid in benzene pairs up into dimers through hydrogen bonds, so there are fewer particles, and the molar mass appears larger. These are abnormal molar masses.',
    }),
    sl('concept', 'The van’t Hoff factor', {
      b: r`The **van’t Hoff factor** $i$ corrects the colligative equations for dissociation or association. $i > 1$ for dissociation, $i < 1$ for association, $i = 1$ for non-electrolytes like glucose and urea.`,
      m: [r`i = \dfrac{\text{normal molar mass}}{\text{abnormal molar mass}} = \dfrac{\text{observed colligative property}}{\text{calculated colligative property}}`, r`\Delta T_\text{f} = i K_\text{f} m, \qquad \Delta T_\text{b} = i K_\text{b} m, \qquad \pi = i C R T`],
      v: table(['Process', 'Degree', r`Factor $i$`], [['Dissociation into n ions', r`$\alpha$`, r`$1 + (n-1)\alpha$`], ['Association of n molecules into one', r`$\alpha$`, r`$1 - \alpha + \dfrac{\alpha}{n}$`]], 'Table of the van’t Hoff factor for dissociation into n ions and for association of n molecules, in terms of the degree alpha'),
      n: 'Van’t Hoff introduced a simple correction factor, i. It is the ratio of the observed colligative effect to the effect expected with no dissociation or association. For salts that split into ions, i is greater than one; for molecules that pair up, it is less than one. We just multiply the right side of each colligative equation by i. From i we can also work out the degree of dissociation or association.',
    }),
    sl('example', 'Worked example: degree of dissociation', {
      b: r`**Problem.** A $0.05\ \text{mol kg}^{-1}$ aqueous solution of magnesium chloride freezes at $-0.251\ ^\circ\text{C}$. Find $i$ and the degree of dissociation. ($K_\text{f} = 1.86\ \text{K kg mol}^{-1}$)

**Step 1.** Expected $\Delta T_\text{f} = 1.86 \times 0.05 = 0.093\ \text{K}$; observed $0.251\ \text{K}$.

**Step 2.** $i = \dfrac{0.251}{0.093} \approx 2.70$.

**Step 3.** $\ce{MgCl2 -> Mg^2+ + 2Cl-}$ gives $n = 3$: $\alpha = \dfrac{i - 1}{n - 1} = \dfrac{2.70 - 1}{2} = 0.85$, so about $85\%$ dissociated.`,
      v: table(['Quantity', 'Value'], [['Expected depression (no dissociation)', r`$0.093\ \text{K}$`], ['Observed depression', r`$0.251\ \text{K}$`], [r`$i$`, r`$\approx 2.70$`], [r`$\alpha$`, r`$\approx 0.85$`]], 'Table of the expected and observed depression, van’t Hoff factor about 2.7 and degree of dissociation about 0.85'),
      n: 'If magnesium chloride did not split at all, the freezing point would fall by only about nine hundredths of a kelvin. The observed fall is about a quarter of a kelvin, so the van’t Hoff factor is about two point seven. Each formula unit can give three ions. Using i equals one plus two times alpha, the degree of dissociation is about zero point eight five.',
    }),
    sl('example', 'Worked example: association of ethanoic acid', {
      b: r`**Problem.** $1.2\ \text{g}$ of ethanoic acid ($M = 60\ \text{g mol}^{-1}$) in $50\ \text{g}$ of benzene lowers its freezing point by $1.126\ \text{K}$. Find $i$ and the percentage of acid that dimerises. ($K_\text{f}$ of benzene $= 5.12\ \text{K kg mol}^{-1}$)

**Step 1.** Normal molality $= \dfrac{1.2/60}{0.050} = 0.4\ \text{mol kg}^{-1}$; expected $\Delta T_\text{f} = 5.12 \times 0.4 = 2.048\ \text{K}$.

**Step 2.** $i = \dfrac{1.126}{2.048} \approx 0.55$.

**Step 3.** For dimers, $i = 1 - \dfrac{\alpha}{2}$, so $\alpha = 2(1 - 0.55) = 0.9$: $90\%$ of the acid dimerises.`,
      v: chem('2CH3COOH <=> (CH3COOH)2', 'Two ethanoic acid molecules in equilibrium with one hydrogen-bonded dimer', 'In benzene, ethanoic acid pairs up through two hydrogen bonds.'),
      n: 'In benzene, ethanoic acid molecules pair up. Without pairing, the freezing point would drop by about two point zero five kelvin, but we see only about one point one three. So i is about zero point five five, less than one, as expected for association. For pairing, i equals one minus half of alpha, which gives alpha of zero point nine. Ninety percent of the acid exists as dimers.',
    }),
    sl('check', 'Quick check: van’t Hoff factor', {
      b: 'Decide whether the van’t Hoff factor is above, below or equal to 1 for a given solute.',
      n: 'Quick check. Decide whether the solute splits up, pairs up or stays as single molecules in the solvent, and then relate that to the van’t Hoff factor.',
      chk: 'vant-hoff-ar',
    }),
    sl('summary', 'Summary: Part 2', {
      ul: [
        r`Relative lowering of vapour pressure $= x_2$ (mole fraction of solute).`,
        r`$\Delta T_\text{b} = K_\text{b} m$ and $\Delta T_\text{f} = K_\text{f} m$ (molality); $\pi = CRT$ (molarity).`,
        'Osmotic pressure is best for the molar mass of proteins and polymers.',
        'Isotonic solutions have equal osmotic pressure; pressure above π drives reverse osmosis.',
        r`Dissociation: $i > 1$, molar mass appears low. Association: $i < 1$, molar mass appears high.`,
        r`$\alpha = \dfrac{i - 1}{n - 1}$ for dissociation; $i = 1 - \alpha + \dfrac{\alpha}{n}$ for association.`,
      ],
      v: table(['Property', 'Equation', 'Concentration used'], [['Lowering of vapour pressure', r`$\dfrac{\Delta p}{p^\circ_1} = x_2$`, 'Mole fraction'], ['Boiling point elevation', r`$\Delta T_\text{b} = i K_\text{b} m$`, 'Molality'], ['Freezing point depression', r`$\Delta T_\text{f} = i K_\text{f} m$`, 'Molality'], ['Osmotic pressure', r`$\pi = i C R T$`, 'Molarity']], 'Summary table of the four colligative properties, their equations and the concentration unit each uses'),
      n: 'Let us sum up Part 2. All four colligative properties depend on the number of solute particles. Vapour pressure lowering uses mole fraction, boiling and freezing point changes use molality, and osmotic pressure uses molarity. Each can give a molar mass. When a solute dissociates or associates, the van’t Hoff factor corrects the equations and tells us how much the solute has split or paired.',
    }),
    sl('exam-tips', 'Exam tips: Part 2', {
      ul: [
        r`$\Delta T$ in kelvin equals $\Delta T$ in degrees Celsius: no 273 needed for a difference.`,
        r`In $\pi = CRT$, use $V$ in litres and $T$ in kelvin, and match the unit of $R$ to the pressure unit.`,
        'Counting particles (if fully dissociated): glucose 1, sodium chloride 2, calcium chloride or potassium sulfate 3, aluminium chloride 4.',
        'A low calculated molar mass hints at dissociation; a high one hints at association.',
        'Always say why osmotic pressure suits proteins: room temperature, large measurable values.',
      ],
      v: table(['Trap', 'Fix'], [['Using solution mass for molality', 'Use kg of solvent'], ['Forgetting i for salts', 'Multiply by the number of ions'], ['mL in π = CRT', 'Convert to litres']], 'Table of common traps in colligative property numericals and how to avoid them'),
      n: 'Some final tips. A temperature difference is the same in kelvin and in degrees Celsius, so do not add two hundred and seventy three to it. In osmotic pressure problems, use litres, kelvin and a gas constant that matches your pressure unit. Count ions carefully for salts. And when asked why osmotic pressure is used for proteins, give both reasons: room temperature and large, measurable values.',
    }),
  ],
});
