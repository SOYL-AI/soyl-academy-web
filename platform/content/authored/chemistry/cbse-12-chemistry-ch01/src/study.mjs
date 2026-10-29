// ch01 Solutions — notes and flashcards.
import { T, table, flow, unit, PROV, r } from './lib.mjs';
import { V, raoultPlot, deviationPlot, boilPlot } from './decks.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const fm = (latex, label) => ({ latex, label });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Solutions — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Types of solutions and ways of expressing concentration',
      r`A **solution** is a homogeneous mixture of two or more components. The component in the larger amount is the **solvent** and decides the physical state; the others are **solutes**. A binary solution has two components. Nine types are possible (gas, liquid or solid solute in a gas, liquid or solid solvent), e.g. air, soda water, sugar syrup, brass, hydrogen in palladium.

**Concentration** can be stated in several ways:
- **Mass percentage** $= \dfrac{\text{mass of component}}{\text{mass of solution}} \times 100$; **volume percentage** similarly with volumes; **mass by volume percentage** = grams of solute per 100 mL of solution.
- **Parts per million (ppm)** for traces: parts of component per $10^{6}$ parts of solution (by mass, volume or mass/volume).
- **Mole fraction** $x_\text{B} = \dfrac{n_\text{B}}{\sum n}$; all mole fractions add up to 1.
- **Molarity** $M$ = moles of solute per litre of **solution** (changes with temperature because volume does).
- **Molality** $m$ = moles of solute per kilogram of **solvent** (independent of temperature, like mass % and mole fraction).

When a percentage and a density are given, assume $100\ \text{g}$ of solution; the volume is mass ÷ density.`,
      [kt('Molarity', r`Moles of solute in one litre of solution; unit $\text{mol L}^{-1}$ (M).`), kt('Molality', r`Moles of solute per kilogram of solvent; unit $\text{mol kg}^{-1}$ (m).`), kt('Mole fraction', 'Moles of one component divided by the total moles of all components.'), kt('ppm', 'Parts of a component per million parts of the solution.')],
      [fm(r`x_\text{A} + x_\text{B} = 1`, 'Mole fractions in a binary solution'), fm(r`M = \dfrac{n_\text{solute}}{V_\text{solution}\,(\text{L})}`, 'Molarity'), fm(r`m = \dfrac{n_\text{solute}}{w_\text{solvent}\,(\text{kg})}`, 'Molality')],
      table(['Unit', 'Based on', 'Temperature dependent?'], [['Mass %, ppm (by mass)', 'Masses', 'No'], ['Mole fraction', 'Moles', 'No'], ['Molality', 'Moles and mass of solvent', 'No'], ['Molarity', 'Moles and volume of solution', 'Yes'], ['Volume %', 'Volumes', 'Yes']], 'Table of concentration units, what each is based on and whether it changes with temperature'),
      [1],
    ),
    sec(
      '2. Solubility of solids and gases; Henry’s law',
      r`**Solubility** is the maximum amount of a substance that dissolves in a specified amount of solvent at a specified temperature. A **saturated** solution is in dynamic equilibrium with undissolved solute.

**Solids in liquids.** Like dissolves like: ionic and polar solutes dissolve in polar solvents (water), non-polar solutes in non-polar solvents (benzene). If dissolving is endothermic, solubility increases with temperature; if exothermic, it decreases (Le Chatelier’s principle). Pressure has no significant effect.

**Gases in liquids.** Solubility increases with pressure and decreases with temperature. **Henry’s law:** at constant temperature, the partial pressure of a gas above a solution is proportional to its mole fraction in the solution, $p = K_\text{H}\,x$. $K_\text{H}$ depends on the gas, the solvent and the temperature; a **higher** $K_\text{H}$ means **lower** solubility, and $K_\text{H}$ rises with temperature.

**Applications:** carbonated drinks are sealed under high $\ce{CO2}$ pressure; divers breathing compressed air risk **the bends** (nitrogen bubbles in blood on rapid ascent), so tanks use air diluted with helium; at high altitude the low partial pressure of oxygen causes **anoxia**; aquatic life suffers in warm water, which holds less oxygen.`,
      [kt('Saturated solution', 'A solution in which no more solute dissolves at that temperature; dissolving and crystallisation occur at equal rates.'), kt('Henry’s law', r`At constant temperature, $p = K_\text{H}\,x$ for a gas dissolved in a liquid.`), kt('Bends', 'A painful condition caused by nitrogen coming out of the blood as bubbles when a diver rises too quickly.')],
      [fm(r`p = K_\text{H}\, x`, 'Henry’s law')],
      V.henry,
      [2],
    ),
    sec(
      '3. Vapour pressure, Raoult’s law, ideal and non-ideal solutions',
      r`**Raoult’s law:** for a solution of volatile liquids, the partial vapour pressure of each component is proportional to its mole fraction in the liquid: $p_1 = p^\circ_1 x_1$, $p_2 = p^\circ_2 x_2$. By Dalton’s law $p_\text{total} = p_1 + p_2 = p^\circ_1 + (p^\circ_2 - p^\circ_1)x_2$, a straight line against composition. The mole fraction in the vapour is $y_1 = p_1 / p_\text{total}$; the vapour is richer in the more volatile component.

For a **non-volatile solute**, only the solvent contributes: $p = p^\circ_1 x_1$. Raoult’s law is a special case of Henry’s law with $K_\text{H} = p^\circ$.

**Ideal solutions** obey Raoult’s law over the whole range; A–B interactions are about the same as A–A and B–B; $\Delta_\text{mix}H = 0$ and $\Delta_\text{mix}V = 0$ (n-hexane + n-heptane, bromoethane + chloroethane, benzene + toluene).

**Non-ideal solutions:**
- **Positive deviation:** A–B attractions weaker; vapour pressure higher than predicted; $\Delta_\text{mix}H > 0$, $\Delta_\text{mix}V > 0$ (ethanol + acetone, carbon disulfide + acetone). Large positive deviation gives a **minimum-boiling azeotrope** (ethanol + water at about 95% ethanol by volume).
- **Negative deviation:** A–B attractions stronger (often hydrogen bonding); vapour pressure lower; $\Delta_\text{mix}H < 0$, $\Delta_\text{mix}V < 0$ (chloroform + acetone, phenol + aniline). Large negative deviation gives a **maximum-boiling azeotrope** (nitric acid + water at about 68% nitric acid by mass).

An **azeotrope** boils at constant temperature with the same composition in liquid and vapour, so fractional distillation cannot separate it.`,
      [kt('Raoult’s law', 'The partial vapour pressure of a volatile component equals its pure vapour pressure times its mole fraction in the solution.'), kt('Ideal solution', r`A solution that obeys Raoult’s law at all compositions, with $\Delta_\text{mix}H = 0$ and $\Delta_\text{mix}V = 0$.`), kt('Azeotrope', 'A liquid mixture that boils at constant temperature with the same composition in the liquid and the vapour.')],
      [fm(r`p_\text{total} = p^\circ_1 + (p^\circ_2 - p^\circ_1)\, x_2`, 'Raoult + Dalton'), fm(r`y_1 = \dfrac{p_1}{p_\text{total}}`, 'Mole fraction in the vapour')],
      raoultPlot,
      [3],
      [deviationPlot],
    ),
    sec(
      '4. Colligative properties: vapour pressure, boiling point and freezing point',
      r`**Colligative properties** depend only on the **number** of solute particles in a given amount of solvent, not on their nature. They are measured for dilute solutions of non-volatile solutes.

**Relative lowering of vapour pressure** equals the mole fraction of the solute: $\dfrac{p^\circ_1 - p_1}{p^\circ_1} = x_2 \approx \dfrac{w_2 M_1}{M_2 w_1}$ for dilute solutions.

**Elevation of boiling point.** A solution’s vapour pressure reaches atmospheric pressure at a higher temperature: $\Delta T_\text{b} = K_\text{b}\, m$. $K_\text{b}$ (ebullioscopic constant) for water is $0.52\ \text{K kg mol}^{-1}$.

**Depression of freezing point.** The solution’s vapour pressure equals that of the solid solvent at a lower temperature: $\Delta T_\text{f} = K_\text{f}\, m$. $K_\text{f}$ (cryoscopic constant) for water is $1.86\ \text{K kg mol}^{-1}$; for benzene $5.12\ \text{K kg mol}^{-1}$.

Molar mass from either: $M_2 = \dfrac{K \times 1000 \times w_2}{\Delta T \times w_1}$ with masses in grams. A temperature **difference** has the same value in K and °C.`,
      [kt('Colligative property', 'A property of a solution that depends only on the number of solute particles, not on their identity.'), kt('Ebullioscopic constant', r`$K_\text{b}$: elevation of boiling point for a solution of molality $1\ \text{mol kg}^{-1}$.`), kt('Cryoscopic constant', r`$K_\text{f}$: depression of freezing point for a solution of molality $1\ \text{mol kg}^{-1}$.`)],
      [fm(r`\dfrac{p^\circ_1 - p_1}{p^\circ_1} = x_2`, 'Relative lowering of vapour pressure'), fm(r`\Delta T_\text{b} = K_\text{b}\, m`, 'Elevation of boiling point'), fm(r`\Delta T_\text{f} = K_\text{f}\, m`, 'Depression of freezing point')],
      V.vplower,
      [4],
      [boilPlot],
    ),
    sec(
      '5. Osmosis and osmotic pressure',
      r`**Osmosis** is the net flow of solvent through a **semipermeable membrane** (one that passes solvent but not solute) from pure solvent or a dilute solution into a more concentrated solution. The **osmotic pressure** $\pi$ is the excess pressure that must be applied to the solution to just stop osmosis.

For dilute solutions $\pi = CRT = \dfrac{n_2 RT}{V}$, so $M_2 = \dfrac{w_2 RT}{\pi V}$. Osmotic pressure is preferred for the molar masses of **proteins and polymers**: it is measured at room temperature and uses molarity, and its values are large enough to measure even for very dilute solutions.

**Isotonic** solutions have the same osmotic pressure (0.9% w/v sodium chloride is isotonic with blood cells). In a **hypertonic** solution cells lose water and shrink; in a **hypotonic** solution they gain water and swell. Applying a pressure greater than $\pi$ reverses the flow: **reverse osmosis**, used to desalinate sea water.`,
      [kt('Semipermeable membrane', 'A membrane that allows solvent molecules but not solute particles to pass.'), kt('Osmotic pressure', 'The excess pressure that must be applied to a solution to prevent the entry of solvent through a semipermeable membrane.'), kt('Isotonic solutions', 'Solutions with the same osmotic pressure at a given temperature.'), kt('Reverse osmosis', 'Flow of solvent out of a solution through a semipermeable membrane when a pressure greater than the osmotic pressure is applied.')],
      [fm(r`\pi = CRT`, 'Osmotic pressure'), fm(r`M_2 = \dfrac{w_2 R T}{\pi V}`, 'Molar mass from osmotic pressure')],
      V.osmosis,
      [4],
      [V.ro],
    ),
    sec(
      '6. Abnormal molar masses and the van’t Hoff factor',
      r`If a solute **dissociates** in solution (electrolytes in water), the number of particles increases and the molar mass calculated from a colligative property is **lower** than the true value. If it **associates** (ethanoic acid dimerising in benzene through hydrogen bonds), the number of particles decreases and the calculated molar mass is **higher**.

The **van’t Hoff factor** $i = \dfrac{\text{normal molar mass}}{\text{abnormal molar mass}} = \dfrac{\text{observed colligative property}}{\text{calculated colligative property}}$. Corrected equations: $\Delta T_\text{b} = iK_\text{b}m$, $\Delta T_\text{f} = iK_\text{f}m$, $\pi = iCRT$, $\dfrac{\Delta p}{p^\circ_1} = i\,\dfrac{n_2}{n_1}$.

- Dissociation into $n$ ions with degree $\alpha$: $i = 1 + (n - 1)\alpha$, so $\alpha = \dfrac{i - 1}{n - 1}$.
- Association of $n$ molecules into one with degree $\alpha$: $i = 1 - \alpha + \dfrac{\alpha}{n}$; for dimers $i = 1 - \dfrac{\alpha}{2}$.
- Non-electrolytes (glucose, urea, sucrose): $i = 1$. Complete dissociation: $\ce{NaCl}$ $i = 2$, $\ce{CaCl2}$ and $\ce{K2SO4}$ $i = 3$.`,
      [kt('Abnormal molar mass', 'A molar mass from a colligative property that differs from the formula value because of dissociation or association.'), kt('van’t Hoff factor', 'The ratio of the observed colligative property to the value calculated assuming no dissociation or association.'), kt('Degree of dissociation', r`The fraction $\alpha$ of the solute formula units that split into ions.`)],
      [fm(r`i = 1 + (n - 1)\alpha`, 'Dissociation'), fm(r`i = 1 - \alpha + \dfrac{\alpha}{n}`, 'Association')],
      table(['Solute', 'Solvent', 'Behaviour', r`$i$`], [['Urea', 'Water', 'No change', r`$1$`], ['Potassium chloride', 'Water', 'Dissociates into 2 ions', r`close to $2$`], ['Potassium sulfate', 'Water', 'Dissociates into 3 ions', r`close to $3$`], ['Ethanoic acid', 'Benzene', 'Forms dimers', r`close to $0.5$`]], 'Table of urea, potassium chloride, potassium sulfate and ethanoic acid with their behaviour in solution and approximate van’t Hoff factors'),
      [5],
      [flow('LR', [['o', 'Observed ΔTf, ΔTb or π'], ['c', 'Calculated value (no change in particles)'], ['i', 'i = observed ÷ calculated'], ['a', 'Degree of dissociation or association']], [['o', 'i'], ['c', 'i'], ['i', 'a']], 'Flow from observed and calculated colligative values to the van’t Hoff factor and then to the degree of dissociation or association')],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Dividing by the mass of the **solution** instead of the solvent when finding molality.
- Using millilitres instead of litres in molarity or in $\\pi = CRT$, or a gas constant whose unit does not match the pressure unit.
- Adding 273 to a temperature difference: $\\Delta T$ is the same in K and °C.
- Saying a gas with a larger $K_\\text{H}$ is more soluble (it is less soluble).
- Mixing up the deviations: positive deviation = weaker A–B attraction, higher vapour pressure, endothermic mixing, minimum-boiling azeotrope.
- Forgetting the van’t Hoff factor for electrolytes, or using the number of atoms instead of the number of ions (for $\\ce{K2SO4}$, $n = 3$).

**How marks are usually awarded**
- 1-mark items: correct option, term or value with unit.
- Numericals (2–3 marks): formula (1/2–1) + substitution with units (1) + answer with correct unit and sensible significant figures (1/2–1).
- Explanations (2–3 marks): the law or principle named (1) + the reason in terms of particles or attractions (1) + an example or consequence (1).
- 5-mark answers: usually a definition, a derivation or graph, and a numerical; label graphs with axes and the pure-component points.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'What is a solution?', 'A homogeneous mixture of two or more components; the component in the larger amount is the solvent.', 'definition', 1),
    fc(2, 'Give an example of a solid solution.', 'Brass (zinc dissolved in copper); hydrogen in palladium is a gas-in-solid solution.', 'example', 1),
    fc(3, 'Define molarity.', r`Moles of solute per litre of solution; unit $\text{mol L}^{-1}$.`, 'definition', 1),
    fc(4, 'Define molality.', r`Moles of solute per kilogram of solvent; unit $\text{mol kg}^{-1}$.`, 'definition', 1),
    fc(5, 'Which concentration units do not change with temperature?', 'Mass percentage, ppm by mass, mole fraction and molality (they use masses, not volumes).', 'concept', 1),
    fc(6, 'Formula for mole fraction of B in a binary solution?', r`$x_\text{B} = \dfrac{n_\text{B}}{n_\text{A} + n_\text{B}}$, and $x_\text{A} + x_\text{B} = 1$.`, 'formula', 1),
    fc(7, 'Mass % and density given — first step?', 'Assume 100 g of solution; find moles of solute and the volume (mass ÷ density).', 'exam-tip', 1),
    fc(8, 'What is a saturated solution?', 'One in which no more solute dissolves at that temperature; dissolving and crystallisation happen at equal rates.', 'definition', 2),
    fc(9, 'Effect of temperature on solubility of a solid?', 'Increases if dissolving is endothermic; decreases if it is exothermic.', 'concept', 2),
    fc(10, 'State Henry’s law.', r`At constant temperature, the partial pressure of a gas above a solution is proportional to its mole fraction in it: $p = K_\text{H}\,x$.`, 'formula', 2),
    fc(11, 'Larger $K_\\text{H}$ means…?', 'Lower solubility of the gas at a given pressure.', 'concept', 2),
    fc(12, 'Why are gases less soluble in warm water?', r`Dissolving a gas is exothermic and $K_\text{H}$ increases with temperature, so less gas dissolves.`, 'concept', 2),
    fc(13, 'What are the bends?', 'Painful nitrogen bubbles in the blood when a diver rises too quickly; tanks use air diluted with helium to reduce it.', 'fact', 2),
    fc(14, 'State Raoult’s law (volatile liquids).', r`Each component’s partial vapour pressure is proportional to its mole fraction in the liquid: $p_1 = p^\circ_1 x_1$.`, 'formula', 3),
    fc(15, 'Which component is richer in the vapour?', 'The more volatile one (higher pure vapour pressure).', 'concept', 3),
    fc(16, 'Conditions for an ideal solution?', r`Obeys Raoult’s law at all compositions; $\Delta_\text{mix}H = 0$, $\Delta_\text{mix}V = 0$.`, 'definition', 3),
    fc(17, 'Positive deviation: attractions and signs?', r`A–B weaker than A–A and B–B; vapour pressure higher; $\Delta_\text{mix}H > 0$, $\Delta_\text{mix}V > 0$. Example: ethanol + acetone.`, 'concept', 3),
    fc(18, 'Negative deviation: attractions and signs?', r`A–B stronger; vapour pressure lower; $\Delta_\text{mix}H < 0$, $\Delta_\text{mix}V < 0$. Example: chloroform + acetone.`, 'concept', 3),
    fc(19, 'What is an azeotrope?', 'A mixture that boils at constant temperature with the same composition in liquid and vapour; it cannot be separated by fractional distillation.', 'definition', 3),
    fc(20, 'Which deviation gives a minimum-boiling azeotrope?', 'Large positive deviation (e.g. ethanol + water, about 95% ethanol by volume).', 'fact', 3),
    fc(21, 'What are colligative properties?', 'Properties that depend only on the number of solute particles, not their nature: lowering of vapour pressure, ΔTb, ΔTf, osmotic pressure.', 'definition', 4),
    fc(22, 'Relative lowering of vapour pressure equals…?', r`The mole fraction of the solute: $\dfrac{p^\circ_1 - p_1}{p^\circ_1} = x_2$.`, 'formula', 4),
    fc(23, 'Why does a solution boil at a higher temperature?', 'Its vapour pressure is lower, so it must be heated more to reach atmospheric pressure.', 'concept', 4),
    fc(24, 'Kb and Kf of water?', r`$K_\text{b} = 0.52$ and $K_\text{f} = 1.86\ \text{K kg mol}^{-1}$.`, 'fact', 4),
    fc(25, 'Osmotic pressure equation?', r`$\pi = CRT$, with $C$ in $\text{mol L}^{-1}$ and $T$ in kelvin.`, 'formula', 4),
    fc(26, 'Why use osmotic pressure for proteins?', 'Measured at room temperature (no damage) and gives large, measurable values for very dilute solutions.', 'concept', 4),
    fc(27, 'What is reverse osmosis?', 'Forcing solvent out of a solution through a semipermeable membrane with a pressure greater than its osmotic pressure; used to desalinate sea water.', 'definition', 4),
    fc(28, 'Hypertonic solution — effect on a red blood cell?', 'The cell loses water by osmosis and shrinks.', 'concept', 4),
    fc(29, 'Define the van’t Hoff factor.', r`$i = \dfrac{\text{observed colligative property}}{\text{calculated colligative property}} = \dfrac{\text{normal molar mass}}{\text{abnormal molar mass}}$.`, 'formula', 5),
    fc(30, 'i for dissociation and for dimerisation?', r`Dissociation into $n$ ions: $i = 1 + (n-1)\alpha$. Dimerisation: $i = 1 - \dfrac{\alpha}{2}$.`, 'formula', 5),
    fc(31, 'Why is the molar mass of ethanoic acid in benzene found to be about 120?', 'It forms hydrogen-bonded dimers, halving the number of particles.', 'example', 5),
    fc(32, 'Exam tip: ΔT in K or °C?', 'A temperature difference has the same value in both; do not add 273 to ΔT.', 'exam-tip', 4),
  ],
  status: 'draft',
  provenance: PROV,
};
