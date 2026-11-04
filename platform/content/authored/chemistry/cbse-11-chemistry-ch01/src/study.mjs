// ch01 Some Basic Concepts of Chemistry — notes and flashcards.
import { T, table, flow, unit, PROV, r } from './lib.mjs';
import { V } from './decks.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const fm = (latex, label) => ({ latex, label });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Some Basic Concepts of Chemistry — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Measurement, units and significant figures',
      r`A measurement is a number with a unit. The SI base units used in chemistry are metre, kilogram, second, kelvin and mole; $1\ \text{L} = 1\ \text{dm}^3$. Scientific notation writes $N \times 10^{n}$ with $1 \le N < 10$.

**Precision** is the agreement between repeated readings; **accuracy** is the agreement with the true value.

**Significant figures:** non-zero digits and zeros between them count; leading zeros do not; trailing zeros count after a decimal point. In **addition or subtraction** keep the fewest decimal places; in **multiplication or division** keep the fewest significant figures. Exact numbers (counts, definitions) have unlimited significant figures.`,
      [kt('Significant figures', 'The digits in a measured value that are known reliably, plus one estimated digit.'), kt('Precision', 'Closeness of repeated measurements to one another.'), kt('Accuracy', 'Closeness of a measurement to the true value.'), kt('Scientific notation', 'A number written as a digit part between 1 and 10 times a power of ten.')],
      [],
      table(['Rule', 'Example', 'Significant figures'], [['Non-zero digits', '3.47', '3'], ['Zeros between digits', '2.0305', '5'], ['Leading zeros', '0.00450', '3'], ['Trailing zeros after a decimal point', '12.00', '4']], 'Table of rules for counting significant figures'),
      [1],
    ),
    sec(
      '2. Laws of chemical combination and Dalton’s theory',
      r`- **Conservation of mass** (Lavoisier): mass of reactants equals mass of products.
- **Constant proportions** (Proust): a pure compound has a fixed mass ratio of elements.
- **Multiple proportions** (Dalton): for a fixed mass of one element, the masses of another that combine with it in different compounds are in a simple whole-number ratio.
- **Gay-Lussac’s law:** gaseous reactants and products are in simple whole-number volume ratios at the same temperature and pressure.
- **Avogadro’s law:** equal volumes of gases at the same temperature and pressure hold equal numbers of molecules.

**Dalton’s theory:** matter is made of atoms; atoms of an element are alike; compounds form by combination of atoms in simple whole-number ratios; atoms are rearranged, not created or destroyed in reactions.`,
      [kt('Law of multiple proportions', 'Masses of one element combining with a fixed mass of another in different compounds are in a simple whole-number ratio.'), kt('Dalton’s atomic theory', 'Matter consists of indivisible atoms that combine in simple whole-number ratios.')],
      [],
      table(['Law', 'How to test it with data'], [['Conservation of mass', 'Total mass before equals total mass after'], ['Constant proportions', 'Same mass ratio in different samples of one compound'], ['Multiple proportions', 'Fix the mass of one element, compare the other']], 'Table of tests for the laws of chemical combination'),
      [2],
    ),
    sec(
      '3. Atomic mass, molecular mass and the mole',
      r`**1 u** $= \tfrac{1}{12}$ of the mass of a carbon-12 atom $\approx 1.66 \times 10^{-27}$ kg. **Average atomic mass** $= \sum (\text{fractional abundance} \times \text{isotopic mass})$. **Molecular mass** is the sum of atomic masses in the molecule; **formula mass** is used for ionic compounds.

**Mole:** the amount of substance containing $6.022 \times 10^{23}$ elementary entities (the Avogadro constant $N_\text{A}$). **Molar mass** $M$ (g mol⁻¹) is numerically equal to the atomic or molecular mass in u. At 273.15 K and 1 atm one mole of an ideal gas occupies about 22.4 L.`,
      [kt('Atomic mass unit', 'One twelfth of the mass of a carbon-12 atom.'), kt('Mole', 'Amount of substance with $6.022 \\times 10^{23}$ elementary entities.'), kt('Molar mass', 'Mass of one mole of a substance, in g mol⁻¹.'), kt('Isotopes', 'Atoms of the same element with different mass numbers.')],
      [fm(r`n = \dfrac{m}{M} = \dfrac{N}{N_\text{A}}`, 'Amount of substance'), fm(r`\bar{M}_\text{atom} = \sum_i x_i M_i`, 'Average atomic mass')],
      V.moleMap,
      [3],
    ),
    sec(
      '4. Percentage composition and formulae',
      r`**Mass percent of an element** $= \dfrac{\text{mass of the element in one mole}}{\text{molar mass of compound}} \times 100$.

**Empirical formula:** (1) take mass of each element (use percentages as grams in 100 g); (2) divide by atomic mass to get moles; (3) divide by the smallest; (4) multiply by 2, 3 … if any ratio is near a fraction such as 1.5 or 1.33.

**Molecular formula** $= (\text{empirical formula})_n$ with $n = M / M_\text{empirical}$. Several compounds can share an empirical formula (for example ethyne and benzene, both CH).`,
      [kt('Empirical formula', 'The simplest whole-number ratio of atoms of each element in a compound.'), kt('Molecular formula', 'The actual number of atoms of each element in one molecule.')],
      [fm(r`n = \dfrac{M}{M_\text{empirical}}`, 'Multiplier from empirical to molecular formula')],
      flow('TB', [['a', 'Mass percent'], ['b', 'Moles of each element'], ['c', 'Divide by smallest'], ['d', 'Empirical formula'], ['e', 'Molecular formula (× n)']], [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'e']], 'Flow from mass percent to empirical and molecular formula'),
      [4],
    ),
    sec(
      '5. Stoichiometry and the limiting reagent',
      r`A balanced equation gives mole ratios. **Plan:** mass $\to$ moles ($\div M$) $\to$ moles of wanted substance (coefficient ratio) $\to$ mass ($\times M$).

**Limiting reagent:** the reactant consumed first. Divide each amount in moles by its coefficient; the smallest quotient identifies it. The yield is calculated from the limiting reagent only; the other is in excess and the leftover is found by subtraction.

**Percentage yield** $= \dfrac{\text{actual yield}}{\text{theoretical yield}} \times 100$.`,
      [kt('Stoichiometry', 'Quantitative relationship between amounts of reactants and products in a balanced equation.'), kt('Limiting reagent', 'The reactant that is used up first and so limits the amount of product.'), kt('Excess reagent', 'The reactant left over after the limiting reagent is consumed.')],
      [],
      V.limiting,
      [5],
    ),
    sec(
      '6. Concentration of solutions',
      r`**Mass percent** $= \dfrac{m_\text{solute}}{m_\text{solution}} \times 100$; **ppm** $= \dfrac{m_\text{solute}}{m_\text{solution}} \times 10^{6}$; **mole fraction** $x_\text{A} = \dfrac{n_\text{A}}{\sum n}$ (sum of all mole fractions is 1); **molarity** $c = n / V(\text{L})$; **molality** $m = n / m_\text{solvent}(\text{kg})$.

Molarity changes with temperature (volume changes); molality and mole fraction do not. **Dilution:** $c_1 V_1 = c_2 V_2$. From a label: $c = \dfrac{10\, w\, \rho}{M}$ with $w$ in mass percent and $\rho$ in g mL⁻¹.`,
      [kt('Molarity', 'Moles of solute per litre of solution.'), kt('Molality', 'Moles of solute per kilogram of solvent.'), kt('Mole fraction', 'Moles of one component divided by the total moles of all components.'), kt('ppm', 'Parts of solute per million parts of solution by mass.')],
      [fm(r`c_1 V_1 = c_2 V_2`, 'Dilution'), fm(r`x_\text{A} + x_\text{B} = 1`, 'Mole fractions')],
      table(['Term', 'Divide by', 'Temperature dependent?'], [['Mass percent', 'Mass of solution', 'No'], ['Mole fraction', 'Total moles', 'No'], ['Molality', 'Mass of solvent (kg)', 'No'], ['Molarity', 'Volume of solution (L)', 'Yes']], 'Table comparing the denominators and temperature dependence of concentration terms'),
      [5],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Rounding in the middle of a calculation, or quoting too many significant figures.
- Using the atomic number instead of the atomic mass.
- Confusing precision with accuracy.
- Taking the excess reagent to calculate the product.
- Using solution mass (instead of solvent mass) for molality, or solvent volume for molarity.
- Rounding a ratio like 1.5 or 1.33 down instead of multiplying to clear the fraction.

**How marks are usually awarded**
- 1-mark items: definition, a single conversion or the formula.
- Numericals (2–3 marks): formula or equation (½–1), substitution with units (1), correct final answer with unit and significant figures (1).
- Limiting reagent: identification (1) and yield from it (1–2).
- Formula determination: moles (1), ratio (1), empirical and molecular formula (1).`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Precision versus accuracy?', 'Precision: repeated readings agree with each other. Accuracy: readings agree with the true value.', 'definition', 1),
    fc(2, 'Rule for significant figures in addition?', 'Keep the fewest decimal places of any term.', 'concept', 1),
    fc(3, 'Rule for significant figures in multiplication?', 'Keep the fewest significant figures of any factor.', 'concept', 1),
    fc(4, 'How many significant figures in 0.00450?', 'Three (leading zeros do not count).', 'example', 1),
    fc(5, 'SI unit of amount of substance?', 'Mole (mol).', 'fact', 1),
    fc(6, 'Write 0.0000560 in scientific notation.', r`$5.60 \times 10^{-5}$`, 'example', 1),
    fc(7, 'Law of conservation of mass (Lavoisier)?', 'In a chemical change, total mass of reactants equals total mass of products.', 'definition', 2),
    fc(8, 'Law of constant proportions (Proust)?', 'A pure compound always contains the same elements in the same mass ratio.', 'definition', 2),
    fc(9, 'Law of multiple proportions (Dalton)?', 'Masses of one element that combine with a fixed mass of another are in a simple whole-number ratio.', 'definition', 2),
    fc(10, 'Gay-Lussac’s law of gaseous volumes?', 'Gases react in simple whole-number volume ratios at the same temperature and pressure.', 'definition', 2),
    fc(11, 'Avogadro’s law?', 'Equal volumes of gases at the same temperature and pressure contain equal numbers of molecules.', 'definition', 2),
    fc(12, 'Which Dalton postulate explains conservation of mass?', 'Atoms are neither created nor destroyed in reactions; they are only rearranged.', 'concept', 2),
    fc(13, 'Definition of 1 u?', 'One twelfth of the mass of a carbon-12 atom, about $1.66 \\times 10^{-27}$ kg.', 'definition', 3),
    fc(14, 'Why is the atomic mass of chlorine 35.45 u and not a whole number?', 'It is the weighted average of chlorine-35 (75.77 %) and chlorine-37 (24.23 %).', 'concept', 3),
    fc(15, 'Value of the Avogadro constant?', r`$6.022 \times 10^{23}\ \text{mol}^{-1}$`, 'fact', 3),
    fc(16, 'Formula linking moles, mass and molar mass?', r`$n = m / M$`, 'formula', 3),
    fc(17, 'Molar volume of an ideal gas at 273.15 K and 1 atm?', 'About 22.4 L mol⁻¹ (22.7 L mol⁻¹ at 1 bar).', 'fact', 3),
    fc(18, 'Formula mass versus molecular mass?', 'Formula mass is for ionic compounds (no discrete molecules); molecular mass is for molecules.', 'concept', 3),
    fc(19, 'How many atoms of oxygen in 1 mol of $\\ce{H3PO4}$?', r`$4 \times 6.022 \times 10^{23} = 2.41 \times 10^{24}$`, 'example', 3),
    fc(20, 'Formula for mass percent of an element in a compound?', 'Mass of element in one mole ÷ molar mass of compound × 100.', 'formula', 4),
    fc(21, 'Steps to an empirical formula?', 'Percent to grams, grams to moles, divide by the smallest, clear fractions.', 'concept', 4),
    fc(22, 'Ratio comes out as 1 : 1.5. What do you do?', 'Multiply by 2 to get 2 : 3.', 'exam-tip', 4),
    fc(23, 'Relation between molecular and empirical formula?', r`Molecular formula $= n \times$ empirical formula, $n = M / M_\text{empirical}$.`, 'formula', 4),
    fc(24, 'Two compounds with the same empirical formula CH?', 'Ethyne (C₂H₂) and benzene (C₆H₆).', 'example', 4),
    fc(25, 'What does a balanced equation give you?', 'The mole ratio of reactants and products.', 'concept', 5),
    fc(26, 'How do you find the limiting reagent?', 'Divide moles of each reactant by its coefficient; the smallest quotient is limiting.', 'concept', 5),
    fc(27, 'Which reagent decides the yield?', 'The limiting reagent.', 'fact', 5),
    fc(28, 'Define molarity and molality.', 'Molarity: mol of solute per litre of solution. Molality: mol of solute per kg of solvent.', 'definition', 5),
    fc(29, 'Which concentration terms do not change with temperature?', 'Molality, mole fraction and mass percent.', 'fact', 5),
    fc(30, 'Dilution formula?', r`$c_1 V_1 = c_2 V_2$ (moles of solute are unchanged).`, 'formula', 5),
    fc(31, 'Molarity from a label with mass percent $w$ and density $\\rho$?', r`$c = 10\,w\,\rho / M$ ($\rho$ in g mL⁻¹).`, 'formula', 5),
    fc(32, 'Exam tip: when to round?', 'Only once, at the final answer, to the correct significant figures.', 'exam-tip', 1),
  ],
  status: 'draft',
  provenance: PROV,
};
