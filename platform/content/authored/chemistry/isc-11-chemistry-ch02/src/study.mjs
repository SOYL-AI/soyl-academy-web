// ISC 11 ch02 — notes and flashcards.
import { T, table, flow, unit, PROV, r } from './lib.mjs';
import { V } from './decks.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const fm = (latex, label) => ({ latex, label });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Mole Concept, Concentration and Stoichiometry — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Atomic and molecular masses, the mole and molar volume',
      r`**1 u** $= \tfrac{1}{12}$ of the mass of a carbon-12 atom $\approx 1.66 \times 10^{-27}$ kg. **Average atomic mass** $= \sum(\text{fractional abundance} \times \text{isotopic mass})$. **Molecular mass** is the sum of atomic masses of the atoms in the molecule.

**Mole:** the amount of substance containing $6.022 \times 10^{23}$ elementary entities, as many as in 12 g of carbon-12 (the Avogadro constant $N_\text{A}$). **Molar mass** (g mol⁻¹) equals the molecular mass in u. At **STP** (273 K, 1 atm) one mole of any gas occupies **22.4 L** (gram molecular volume). Molar mass of a gas $= \text{density at STP} \times 22.4$.`,
      [kt('Atomic mass unit', 'One twelfth of the mass of a carbon-12 atom.'), kt('Mole', r`Amount of substance with $6.022 \times 10^{23}$ elementary entities.`), kt('Molar mass', 'Mass of one mole of a substance in g mol⁻¹.'), kt('Gram molecular volume', 'Volume of one mole of a gas at STP, 22.4 L.')],
      [fm(r`n = \dfrac{m}{M} = \dfrac{N}{N_\text{A}} = \dfrac{V_\text{STP}}{22.4\ \text{L}}`, 'Amount of substance')],
      V.moleHub,
      [1],
    ),
    sec(
      '2. Percentage composition, empirical and molecular formulae',
      r`**Mass percent of an element** $= \dfrac{\text{mass of the element in one mole}}{\text{molar mass}} \times 100$.

**Empirical formula:** take the percentages as grams in 100 g; divide each by the atomic mass to get moles; divide by the smallest; multiply all by 2, 3 … if a ratio is near 1.5 or 1.33. **Molecular formula** $= (\text{empirical formula})_n$ with $n = M / M_\text{empirical}$. For a hydrate $\ce{MX.xH2O}$, $x = n(\ce{H2O}) / n(\text{anhydrous salt})$. Vapour density $= M / 2$.`,
      [kt('Empirical formula', 'The simplest whole-number ratio of atoms of each element in a compound.'), kt('Molecular formula', 'The actual number of atoms of each element in one molecule.'), kt('Vapour density', 'Density of a gas relative to hydrogen; M = 2 × vapour density.')],
      [fm(r`n = \dfrac{M}{M_\text{empirical}}`, 'Multiplier from empirical to molecular formula')],
      flow('TB', [['a', 'Percentage composition'], ['b', 'Moles of each element'], ['c', 'Divide by the smallest'], ['d', 'Clear fractions'], ['e', 'Empirical formula, then × n']], [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'e']], 'Flow from percentage composition to empirical and molecular formulae'),
      [2],
    ),
    sec(
      '3. Chemical equivalents and equivalent weight',
      r`The **equivalent weight** $E$ of a substance is the number of parts by mass that combine with or displace 1 part of hydrogen (8 parts of oxygen, 35.5 parts of chlorine); expressed in grams it is the **gram equivalent weight**. In general $E = M / n$, where the **n-factor** is:

- element: valency, $E = \text{atomic mass}/\text{valency}$;
- acid: basicity (number of H⁺ replaced), $E = M/\text{basicity}$;
- base: acidity (number of OH⁻ replaced), $E = M/\text{acidity}$;
- salt: total positive (or negative) charge, $E = M/\text{total charge}$;
- oxidising or reducing agent: electrons gained or lost per formula unit, $E = M/n_{e}$.`,
      [kt('Equivalent weight', 'Mass of a substance that combines with or displaces 1 part of hydrogen; E = M / n-factor.'), kt('n-factor', 'Basicity, acidity, charge or electron change that fixes the equivalent weight in a reaction.'), kt('Gram equivalent', 'The equivalent weight expressed in grams.')],
      [fm(r`E = \dfrac{M}{n}`, 'Equivalent weight'), fm(r`\text{gram equivalents} = \dfrac{m}{E}`, 'Number of gram equivalents')],
      V.eqBars,
      [3],
    ),
    sec(
      '4. Variable equivalent weight and gram equivalents',
      r`The n-factor depends on the reaction, so some substances have **variable equivalent weight**:

- $\ce{H3PO4}$ ($M = 98$): $E = 98.0, 49.0, 32.7$ g eq⁻¹ when one, two or three H⁺ are replaced.
- $\ce{KMnO4}$ ($M = 158$): $E = 31.6$ (acidic, $\ce{Mn^2+}$, $n = 5$), $52.7$ (neutral, $\ce{MnO2}$, $n = 3$), $158$ (alkaline, manganate, $n = 1$).
- Iron: $E = 56/2 = 28$ in iron(II) salts and $56/3 = 18.7$ in iron(III) salts.

**Number of gram equivalents** $= m / E$. For an element, valency $= \text{atomic mass}/E$. Equal gram equivalents of substances react with each other. *Experimental determination of equivalent weights is not required.*`,
      [kt('Variable equivalent weight', 'Different equivalent weights of one substance in different reactions or media.'), kt('Valency', 'Combining power of an element; atomic mass divided by equivalent weight.')],
      [fm(r`\text{valency} = \dfrac{\text{atomic mass}}{E}`, 'Valency from equivalent weight')],
      table(['Medium', 'Product of MnO₄⁻', 'n', 'E / g eq⁻¹'], [['Acidic', 'Mn²⁺', '5', '31.6'], ['Neutral', 'MnO₂', '3', '52.7'], ['Alkaline', 'MnO₄²⁻', '1', '158']], 'Table of equivalent weights of potassium permanganate in three media'),
      [3],
    ),
    sec(
      '5. Concentration terms and the volumetric equations',
      r`**Percent w/w** $= \dfrac{\text{g solute}}{\text{g solution}} \times 100$; **percent w/v** $= \dfrac{\text{g solute}}{\text{mL solution}} \times 100$; **molarity** $M = n/V(\text{L})$; **molality** $m = n/\text{kg solvent}$; **normality** $N = \text{gram equivalents}/V(\text{L}) = M \times n\text{-factor}$; **mole fraction** $x_\text{A} = n_\text{A}/\sum n$ (the sum of all mole fractions is 1).

Molarity and normality depend on temperature (volume); molality and mole fraction do not. **From a label:** $M = \dfrac{10 \times (\%\ \text{w/w}) \times \rho}{M_\text{solute}}$ with $\rho$ in g mL⁻¹. **Neutralisation:** $N_1V_1 = N_2V_2$. **Dilution:** $M_1V_1 = M_2V_2$. **Mixing:** $M = \dfrac{M_1V_1 + M_2V_2}{V_1 + V_2}$.`,
      [kt('Molarity', 'Moles of solute per litre of solution.'), kt('Molality', 'Moles of solute per kilogram of solvent.'), kt('Normality', 'Gram equivalents of solute per litre of solution.'), kt('Mole fraction', 'Moles of one component divided by total moles.')],
      [fm(r`N = M \times n`, 'Normality'), fm(r`N_1V_1 = N_2V_2`, 'Neutralisation'), fm(r`M_1V_1 = M_2V_2`, 'Dilution')],
      V.concDenom,
      [4],
      [V.titration],
    ),
    sec(
      '6. Stoichiometry and the limiting reagent',
      r`A balanced equation gives **mole ratios** (and volume ratios for gases at the same temperature and pressure). **Plan:** mass $\to$ moles ($\div M$), or gas volume at STP $\to$ moles ($\div 22.4$ L); then the coefficient ratio; then moles $\to$ mass ($\times M$) or volume ($\times 22.4$ L).

**Limiting reagent:** divide each amount in moles by its coefficient; the smallest quotient identifies the reagent that is used up first. Product is calculated from the limiting reagent only; the excess reagent left $= $ initial moles $-$ moles used.`,
      [kt('Stoichiometry', 'The quantitative relationship between reactants and products in a balanced equation.'), kt('Limiting reagent', 'The reactant used up first, which limits the amount of product.'), kt('Excess reagent', 'The reactant left over when the limiting reagent is exhausted.')],
      [],
      V.limBars,
      [5],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Counting molecules instead of atoms, or forgetting the atoms per molecule.
- Rounding a ratio such as 1.5 or 1.33 instead of multiplying to clear it.
- Taking the equivalent weight of every acid as M/2, or ignoring that it depends on the reaction or medium.
- Using mL instead of L when calculating molarity or normality.
- Using the mass of solution (instead of solvent) for molality.
- Calculating the yield from the excess reagent instead of the limiting reagent.

**How marks are usually awarded**
- 1-mark items: a definition, a molar mass or a single conversion.
- Formula determination: moles (1), ratio (1), empirical and molecular formula (1).
- Equivalent weight: the n-factor stated (½), E = M/n with the answer (1).
- Titration or concentration numericals: formula (1), substitution with units (1), answer with unit (1).
- Limiting reagent: identification with the moles ÷ coefficient comparison (1–2), product and excess (1–2).`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Definition of the atomic mass unit?', 'One twelfth of the mass of a carbon-12 atom (about 1.66 × 10⁻²⁷ kg).', 'definition', 1),
    fc(2, 'Why is the atomic mass of chlorine 35.5 u?', 'It is the abundance-weighted average of chlorine-35 and chlorine-37.', 'concept', 1),
    fc(3, 'Avogadro constant?', r`$6.022 \times 10^{23}\ \text{mol}^{-1}$`, 'fact', 1),
    fc(4, 'One mole of a gas at STP occupies?', '22.4 L (273 K, 1 atm).', 'fact', 1),
    fc(5, 'How do you find the molar mass of a gas from its density at STP?', 'M = density (g L⁻¹) × 22.4 L mol⁻¹.', 'formula', 1),
    fc(6, 'Number of atoms in n moles of a molecule with a atoms each?', r`$n \times a \times 6.022 \times 10^{23}$`, 'formula', 1),
    fc(7, 'Relation of vapour density to molar mass?', 'Molar mass = 2 × vapour density.', 'formula', 1),
    fc(8, 'Mass percent of an element in a compound?', 'Mass of the element in one mole ÷ molar mass × 100.', 'formula', 2),
    fc(9, 'Steps to find an empirical formula?', 'Percent → grams in 100 g → moles → divide by the smallest → clear fractions.', 'concept', 2),
    fc(10, 'A mole ratio of 1 : 1.5 means multiply by?', '2 (giving 2 : 3).', 'concept', 2),
    fc(11, 'A mole ratio of 1 : 1.33 means multiply by?', '3 (giving 3 : 4).', 'concept', 2),
    fc(12, 'Relation between molecular and empirical formulae?', 'Molecular formula = (empirical formula)ₙ with n = M ÷ empirical formula mass.', 'formula', 2),
    fc(13, 'Empirical formula of ethene and propene?', 'CH₂ for both.', 'example', 2),
    fc(14, 'How to find x in CuSO₄·xH₂O from heating data?', 'x = moles of water lost ÷ moles of anhydrous salt left.', 'concept', 2),
    fc(15, 'Definition of equivalent weight?', 'Mass that combines with or displaces 1 part of hydrogen (8 of oxygen, 35.5 of chlorine).', 'definition', 3),
    fc(16, 'General formula for equivalent weight?', 'E = molar mass ÷ n-factor.', 'formula', 3),
    fc(17, 'n-factor of an acid and of a base?', 'Basicity (H⁺ replaced) for an acid; acidity (OH⁻ replaced) for a base.', 'concept', 3),
    fc(18, 'Equivalent weight of a salt?', 'Molar mass ÷ total positive (or negative) charge, e.g. Al₂(SO₄)₃: 342 ÷ 6 = 57.', 'concept', 3),
    fc(19, 'Equivalent weight of an oxidising or reducing agent?', 'Molar mass ÷ electrons gained or lost per formula unit.', 'concept', 3),
    fc(20, 'Equivalent weight of H₂SO₄?', '98 ÷ 2 = 49 g eq⁻¹.', 'example', 3),
    fc(21, 'Equivalent weights of H₃PO₄ in the three neutralisations?', '98.0, 49.0 and 32.7 g eq⁻¹ (one, two, three H⁺ replaced).', 'example', 3),
    fc(22, 'Equivalent weights of KMnO₄ in acidic, neutral, alkaline media?', '31.6, 52.7 and 158 g eq⁻¹ (n = 5, 3, 1).', 'example', 3),
    fc(23, 'Valency from equivalent weight?', 'Valency = atomic mass ÷ equivalent weight.', 'formula', 3),
    fc(24, 'Number of gram equivalents?', 'Mass ÷ equivalent weight.', 'formula', 3),
    fc(25, 'Molarity versus molality?', 'Molarity: mol per litre of solution. Molality: mol per kg of solvent.', 'definition', 4),
    fc(26, 'Relation between normality and molarity?', 'N = M × n-factor.', 'formula', 4),
    fc(27, 'Which concentration terms are independent of temperature?', 'Molality and mole fraction (percent w/w too); molarity and normality are not.', 'concept', 4),
    fc(28, 'Normality and molarity equations?', 'N₁V₁ = N₂V₂ (neutralisation); M₁V₁ = M₂V₂ (dilution).', 'formula', 4),
    fc(29, 'Molarity from a label?', 'M = 10 × percent w/w × density (g mL⁻¹) ÷ molar mass.', 'formula', 4),
    fc(30, 'Mole fraction of A?', 'nA ÷ (nA + nB); all mole fractions add up to 1.', 'definition', 4),
    fc(31, 'Plan for any stoichiometry problem?', 'Convert to moles, use the coefficient ratio, convert to the wanted unit.', 'concept', 5),
    fc(32, 'How to find the limiting reagent?', 'Moles ÷ coefficient for each reactant; the smallest identifies it.', 'concept', 5),
  ],
};
