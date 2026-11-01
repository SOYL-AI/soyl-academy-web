// ICSE 10 Chemistry ch06 Stoichiometry: Formulae and Calculations from Equations — notes and flashcards.
import { T, table, unit, PROV, r } from './lib.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });
const fm = (latex, label) => ({ latex, label });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Stoichiometry: Formulae and Calculations from Equations — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Percentage composition',
      `**Percentage composition:** the percentage by mass of each element in a compound.

**Method:** find the molar mass → mass of the element in 1 mol → divide → × 100. All the percentages add up to 100.

A pure compound always has the same percentage composition, whatever its source (law of constant proportions).

Example: ammonium nitrate, NH₄NO₃ (M = 80) contains 28 g of nitrogen per mole, so 35% nitrogen; urea, CO(NH₂)₂ (M = 60), contains 46.67% nitrogen.`,
      [kt('Percentage composition', 'The percentage by mass of each element present in a compound.'), kt('Law of constant proportions', 'A pure compound always contains the same elements combined in the same proportion by mass.')],
      [fm(r`\%\ \text{of element} = \frac{\text{mass of element in 1 mol}}{\text{molar mass}} \times 100`, 'Percentage of an element')],
      table(['Compound', 'Molar mass / g', '% of the named element'], [['NH₄NO₃', '80', 'N: 35%'], ['CaCO₃', '100', 'O: 48%'], ['CH₄', '16', 'C: 75%']], 'Table of three compounds with molar mass and the percentage of one element'),
      [1],
    ),
    sec(
      '2. Water of crystallisation',
      `**Water of crystallisation:** the fixed number of water molecules that are part of the crystal structure of a hydrated salt, written after a dot (CuSO₄·5H₂O).

- Include the water in the molar mass: CuSO₄·5H₂O = 64 + 32 + 64 + 5 × 18 = 250 (Cu = 64).
- % water = (n × 18 ÷ molar mass of the hydrate) × 100; for CuSO₄·5H₂O, 90 ÷ 250 × 100 = 36%.
- Heating drives the water off: mass lost = water; mass left = anhydrous salt. The number of water molecules, x, = moles of water ÷ moles of anhydrous salt.`,
      [kt('Water of crystallisation', 'The fixed number of molecules of water present in one formula unit of a hydrated crystalline salt.'), kt('Anhydrous', 'Without water of crystallisation.')],
      [],
      table(['Hydrated salt', 'Molar mass / g', '% water'], [['CuSO₄·5H₂O', '250', '36%'], ['MgSO₄·7H₂O', '246', '51.2%'], ['CaSO₄·2H₂O', '172', '20.9%']], 'Table of three hydrated salts with molar mass and percentage of water'),
      [1],
    ),
    sec(
      '3. Empirical and molecular formulae',
      `- **Empirical formula:** the simplest whole-number ratio of atoms of the elements in a compound.
- **Molecular formula:** the actual number of atoms of each element in one molecule.
- Molecular formula = n × empirical formula, where n = molar mass ÷ empirical formula mass (a whole number, often 1).
- For a gas or vapour: molar mass = 2 × vapour density.

Examples: glucose C₆H₁₂O₆ → CH₂O (n = 6); ethyne C₂H₂ and benzene C₆H₆ both → CH; water H₂O → H₂O (n = 1).`,
      [kt('Empirical formula', 'The formula showing the simplest whole-number ratio of the atoms of each element in a compound.'), kt('Molecular formula', 'The formula showing the actual number of atoms of each element in one molecule of a compound.')],
      [fm(r`n = \frac{\text{molar mass}}{\text{empirical formula mass}}`, 'Multiplying factor')],
      table(['Molecular formula', 'Empirical formula', 'n'], [['C₆H₁₂O₆', 'CH₂O', '6'], ['H₂O₂', 'HO', '2'], ['N₂O₄', 'NO₂', '2']], 'Table of three molecular formulae with their empirical formulae'),
      [2],
    ),
    sec(
      '4. Empirical formula from percentage composition',
      `| Step | What to do |
|---|---|
| 1 | Write the percentage of each element |
| 2 | Divide each by its atomic mass (relative number of moles of atoms) |
| 3 | Divide every result by the smallest |
| 4 | Make whole numbers: 1.5 → × 2; 1.33 or 1.67 → × 3; 1.25 → × 4 |
| 5 | Write the empirical formula |

Then, if the vapour density or molar mass is given, find n and the molecular formula. Example: 85.7% C and 14.3% H gives CH₂ (formula mass 14); VD 28 → M = 56 → n = 4 → C₄H₈.`,
      [kt('Empirical formula mass', 'The sum of the atomic masses of the atoms in the empirical formula.')],
      [],
      table(['Element', '%', '÷ atomic mass', '÷ smallest'], [['N', '82.35', '5.88', '1'], ['H', '17.65', '17.65', '3']], 'Table of the working for the empirical formula NH3 from percentages'),
      [2],
    ),
    sec(
      '5. Empirical formula from combining masses',
      `When an experiment gives masses (for example, a metal burnt to its oxide, or an oxide reduced to the metal):

- mass of the second element = mass of the compound − mass of the first element;
- divide each mass by its atomic mass, divide by the smallest and make whole numbers, exactly as with percentages.

Example: 8.0 g of an iron oxide contains 5.6 g of iron, so 2.4 g of oxygen; Fe 5.6 ÷ 56 = 0.1, O 2.4 ÷ 16 = 0.15; ratio 1 : 1.5 = 2 : 3 → Fe₂O₃.`,
      [kt('Combining masses', 'The masses of the elements that combine with each other to form a compound.')],
      [],
      table(['Data', 'Element masses', 'Empirical formula'], [['0.24 g Mg gives 0.40 g oxide', 'Mg 0.24 g, O 0.16 g', 'MgO'], ['8.0 g oxide contains 5.6 g Fe', 'Fe 5.6 g, O 2.4 g', 'Fe₂O₃']], 'Table of two combining-mass experiments and the empirical formulae found'),
      [3],
    ),
    sec(
      '6. Calculations from balanced equations',
      `The **coefficients** of a balanced equation give the **mole ratio** (and the volume ratio of gases at the same temperature and pressure). They are **not** a mass ratio.

**Three steps:** (1) given quantity → moles (mass ÷ M, or volume at STP ÷ 22.4); (2) × mole ratio from the equation; (3) moles → wanted quantity (× M for mass, × 22.4 for volume at STP, × Avogadro's number for particles).

| Type | Example |
|---|---|
| Mass–mass | 10 g NaOH → 0.25 mol → 0.25 mol NaCl → 14.6 g |
| Mass–volume | 2.7 g Al → 0.1 mol → 0.15 mol H₂ → 3.36 dm³ |
| Volume–volume | 6.72 dm³ Cl₂ → 13.44 dm³ HCl (ratio 1 : 2) |

Total mass of reactants used = total mass of products (conservation of mass).`,
      [kt('Stoichiometry', 'The calculation of the quantities of reactants and products in a chemical reaction from its balanced equation.'), kt('Mole ratio', 'The ratio of the coefficients of two substances in a balanced equation.')],
      [fm(r`n_\text{B} = n_\text{A} \times \frac{\text{coefficient of B}}{\text{coefficient of A}}`, 'Moles of B from moles of A'), fm(r`\ce{2KClO3 -> 2KCl + 3O2}`, 'Decomposition of potassium chlorate')],
      table(['Given', 'Wanted', 'Last step'], [['Mass of A', 'Mass of B', '× molar mass of B'], ['Mass of A', 'Volume of gas B at STP', '× 22.4 dm³'], ['Volume of gas A', 'Volume of gas B (same conditions)', 'Volume ratio only']], 'Table of the three kinds of equation calculation and their last steps'),
      [4],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Rounding a ratio such as 1.5 or 1.33 instead of multiplying through.
- Leaving out the water of crystallisation from the molar mass of a hydrate.
- Treating the coefficients of an equation as a mass ratio.
- Forgetting the mole ratio (for example 2 : 3 for Al : H₂).
- Using 22.4 dm³ for a gas that is not at STP, or for a solid or liquid.

**How marks are usually awarded**
- Empirical formula (2–3 marks): the division table, the whole-number ratio, the formula.
- Molecular formula (1 mark): molar mass from vapour density and the value of n.
- Equation calculations (3 marks): moles of the given substance, the mole ratio, the final answer with a unit.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Percentage composition?', 'The percentage by mass of each element in a compound.', 'definition', 1),
    fc(2, '% of an element in a compound?', '(Mass of the element in 1 mol ÷ molar mass) × 100.', 'formula', 1),
    fc(3, '% of carbon in CH₄ (C = 12, H = 1)?', '12 ÷ 16 × 100 = 75%.', 'example', 1),
    fc(4, '% of nitrogen in NH₄NO₃?', '35% (28 ÷ 80 × 100).', 'example', 1),
    fc(5, 'Law of constant proportions?', 'A pure compound always has the same elements in the same proportion by mass.', 'definition', 1),
    fc(6, 'Water of crystallisation?', 'Fixed number of water molecules in the crystal structure of a hydrated salt.', 'definition', 1),
    fc(7, 'Molar mass of CuSO₄·5H₂O (Cu = 64)?', '250 g mol⁻¹.', 'example', 1),
    fc(8, '% water in CuSO₄·5H₂O?', '36% (90 ÷ 250 × 100).', 'example', 1),
    fc(9, 'Empirical formula?', 'Simplest whole-number ratio of atoms in a compound.', 'definition', 2),
    fc(10, 'Molecular formula?', 'Actual number of atoms of each element in one molecule.', 'definition', 2),
    fc(11, 'How are they related?', 'Molecular formula = n × empirical formula; n = molar mass ÷ empirical formula mass.', 'formula', 2),
    fc(12, 'Empirical formula of glucose, C₆H₁₂O₆?', 'CH₂O.', 'example', 2),
    fc(13, 'Two compounds with empirical formula CH?', 'Ethyne C₂H₂ and benzene C₆H₆.', 'example', 2),
    fc(14, 'A ratio comes out as 1 : 1.5. What next?', 'Multiply both by 2: 2 : 3.', 'concept', 2),
    fc(15, 'A ratio comes out as 1 : 1.33. What next?', 'Multiply both by 3: 3 : 4.', 'concept', 2),
    fc(16, 'Molar mass from vapour density?', 'Molar mass = 2 × vapour density.', 'formula', 2),
    fc(17, 'Empirical formula CH₂, vapour density 28: molecular formula?', 'M = 56, n = 4, so C₄H₈.', 'example', 2),
    fc(18, 'Can empirical and molecular formula be the same?', 'Yes, for example H₂O, CH₄, CO₂.', 'fact', 2),
    fc(19, 'Burning a metal: how is the oxygen mass found?', 'Mass of oxide − mass of metal.', 'concept', 3),
    fc(20, 'Fe 0.1 mol, O 0.15 mol: empirical formula?', 'Fe₂O₃.', 'example', 3),
    fc(21, 'Divide masses by atomic number or atomic mass?', 'Atomic mass.', 'exam-tip', 3),
    fc(22, 'What do the coefficients of a balanced equation give?', 'The mole ratio (and volume ratio for gases).', 'concept', 4),
    fc(23, 'Are coefficients a mass ratio?', 'No: in 2H₂ + O₂ → 2H₂O, 4 g of H₂ reacts with 32 g of O₂.', 'fact', 4),
    fc(24, 'Three steps of an equation calculation?', 'Given → moles; × mole ratio; moles → wanted.', 'concept', 4),
    fc(25, 'Moles of H₂ from 0.1 mol Al (2Al + 6HCl → 2AlCl₃ + 3H₂)?', '0.15 mol.', 'example', 4),
    fc(26, 'Gas volume at STP from moles?', 'Moles × 22.4 dm³.', 'formula', 4),
    fc(27, 'Volume–volume problems need molar masses?', 'No: gas volumes follow the coefficients (same conditions).', 'concept', 4),
    fc(28, 'Volume of HCl from 1 dm³ of Cl₂ with excess H₂?', '2 dm³.', 'example', 4),
    fc(29, 'Stoichiometry?', 'Calculating quantities of reactants and products from a balanced equation.', 'definition', 4),
    fc(30, 'Exam tip: equation problems', 'Show the mole ratio on its own line; it earns a mark.', 'exam-tip', 4),
  ],
  status: 'draft',
  provenance: PROV,
};
