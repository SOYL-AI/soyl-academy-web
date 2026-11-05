// ICSE 9 Chemistry ch02 notes and flashcards.
import { T, unit, PROV, table, r } from '../../icse-9-chemistry-ch01/src/lib.mjs';
import { V } from './decks.mjs';
import { M, P, W } from './calc.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const fm = (latex, label) => ({ latex, label });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Chemical Equations and Relative Masses — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Chemical equations',
      `A **chemical equation** is a shorthand way of showing a chemical change using symbols and formulae. **Reactants** are written before the arrow and **products** after it.

| Kind of reaction | Word equation | Formula equation |
|---|---|---|
| One reactant, several products | Ammonium dichromate → nitrogen + chromium(III) oxide + water | $\\ce{(NH4)2Cr2O7 ->[\\Delta] N2 + Cr2O3 + 4H2O}$ |
| Two reactants, one product | Magnesium + oxygen → magnesium oxide | $\\ce{2Mg + O2 -> 2MgO}$ |
| Two reactants, several products | Copper + nitric acid → copper nitrate + nitrogen dioxide + water | $\\ce{Cu + 4HNO3 -> Cu(NO3)2 + 2NO2 + 2H2O}$ |

**A balanced equation tells us**
- the **substances** that react and form;
- the **number of atoms or molecules** of each (the numbers in front of the formulae);
- the **relative masses**: for 2Mg + O₂ → 2MgO, 48 + 32 → 80, so total mass is the same on both sides;
- the **conditions** (such as heat, written above the arrow) and the **states** (s), (l), (g), (aq) when shown.

An equation does not tell how fast the reaction is, or whether it will happen in practice.`,
      [kt('Chemical equation', 'A shorthand representation of a chemical change using symbols and formulae.'), kt('Reactants and products', 'Reactants are the substances that react; products are the substances formed.')],
      [],
      table(['Information', 'For 2Mg + O₂ → 2MgO'], [['Particles', '2 atoms + 1 molecule → 2 units'], ['Relative masses', '48 + 32 → 80']], 'Table of information in the equation for magnesium burning'),
      [1],
    ),
    sec(
      '2. Balancing by hit and trial',
      `The **law of conservation of mass** requires the same number of atoms of each element on both sides. To balance:

1. Write the correct formulae of all reactants and products.
2. Count atoms of each element on both sides.
3. Put a **number in front of a formula** to make the counts equal. Start with the element in the most complex formula, and leave hydrogen and oxygen for last.
4. **Never change a subscript**: that would change the substance.
5. Recount every element.

| Skeletal equation | Balanced equation |
|---|---|
| Al + O₂ → Al₂O₃ | 4Al + 3O₂ → 2Al₂O₃ |
| Mg + N₂ → Mg₃N₂ | 3Mg + N₂ → Mg₃N₂ |
| Ca(OH)₂ + H₃PO₄ → Ca₃(PO₄)₂ + H₂O | 3Ca(OH)₂ + 2H₃PO₄ → Ca₃(PO₄)₂ + 6H₂O |

A radical that stays unchanged on both sides (such as PO₄ or OH) can be balanced as one unit.`,
      [kt('Hit and trial method', 'Balancing an equation by trying numbers in front of formulae until every element has the same count on both sides.')],
      [],
      table(['Element', 'Left', 'Right'], [['Al', '4', '4'], ['O', '6', '6']], 'Atom count for 4Al + 3O₂ → 2Al₂O₃'),
      [2],
    ),
    sec(
      '3. Relative atomic mass and relative molecular mass',
      `**Relative atomic mass** of an element is the number of times one atom of the element is heavier than **one-twelfth of an atom of carbon-12**. (Earlier the standard was the hydrogen atom, taken as 1; the two scales give nearly the same values.) It is a ratio, so it has no unit.

**Relative molecular mass** of a compound is the number of times one molecule of it is heavier than one-twelfth of a carbon-12 atom. It is the **sum of the relative atomic masses of all the atoms** in the formula.

Atomic masses used: H 1, C 12, N 14, O 16, Na 23, Mg 24, Al 27, S 32, Cl 35.5, K 39, Ca 40, Fe 56, Cu 63.5, Zn 65.

| Compound | Working | RMM |
|---|---|---|
| H₂O | 2 × 1 + 16 | ${M.H2O} |
| CO₂ | 12 + 2 × 16 | ${M.CO2} |
| Ca(OH)₂ | 40 + 2 × (16 + 1) | ${M['Ca(OH)2']} |
| Al₂(SO₄)₃ | 2 × 27 + 3 × 32 + 12 × 16 | ${M['Al2(SO4)3']} |
| ZnSO₄·7H₂O | 161 + 7 × 18 | ${M['ZnSO4.7H2O']} |

For a hydrate, add the **water of crystallisation** (the number of water molecules × 18). Some books write "relative molecular mass in u"; here it has no unit.`,
      [kt('Relative atomic mass', 'The number of times an atom of an element is heavier than one-twelfth of an atom of carbon-12.'), kt('Relative molecular mass', 'The sum of the relative atomic masses of all the atoms in one molecule (or formula unit).')],
      [fm(r`\text{RMM} = \sum (\text{atoms of each element} \times \text{its relative atomic mass})`, 'Relative molecular mass')],
      V.bars,
      [3],
    ),
    sec(
      '4. Percentage composition',
      `The **percentage composition** of a compound gives the mass of each element in 100 parts by mass of the compound.

$$\\text{percentage of an element} = \\frac{\\text{mass of the element in one formula}}{\\text{relative molecular mass of the compound}} \\times 100$$

**Magnesium sulphate, MgSO₄** (RMM ${M.MgSO4}): Mg ${P.MgSO4.Mg}%, S ${P.MgSO4.S}%, O ${P.MgSO4.O}%.

**Water of crystallisation.** Percentage of water in a hydrate = (mass of the water in one formula ÷ RMM of the hydrate) × 100. For FeSO₄·7H₂O: 126 ÷ ${M['FeSO4.7H2O']} × 100 = ${W.Fe}%; for ZnSO₄·7H₂O it is ${W.Zn}%.

**Using a percentage.** A fixed fraction of a sample's mass is the element: in 204 g of Al₂O₃ the aluminium is 54 ÷ 102 × 204 = 108 g.

Percentages are rounded to one decimal place. The percentages of all the elements must add up to 100 (allow 99.9 or 100.1 from rounding).`,
      [kt('Percentage composition', 'The percentage by mass of each element in a compound.')],
      [fm(r`\text{percentage} = \frac{\text{mass of element in the formula}}{\text{RMM}} \times 100`, 'Percentage by mass of an element')],
      V.comp,
      [4],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Changing a subscript (writing MgO₂) to balance an equation instead of changing the number in front.
- Forgetting to multiply every atom inside a bracket by the number outside it.
- Leaving out the water of crystallisation when finding the relative molecular mass of a hydrate.
- Writing a unit such as g with a relative mass.
- Dividing by the mass of the element instead of the mass of the whole compound.
- Giving percentages that do not add up to 100.

**How marks are usually awarded**
- 1 mark: a balanced equation, a relative molecular mass or one percentage.
- 2 marks: a calculation with the atomic masses stated and the working shown.
- 3 marks: working for percentage composition, with the final answer.
- 10-mark structured question: a situation or data with parts of 2 to 4 marks; show each step of every calculation and give units for masses.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'What is a chemical equation?', 'A shorthand way of showing a chemical change using symbols and formulae.', 'definition', 1),
    fc(2, 'Reactants and products?', 'Reactants are before the arrow, products after it.', 'definition', 1),
    fc(3, 'One reactant, three products: an example?', 'Heating ammonium dichromate gives nitrogen, chromium(III) oxide and water.', 'example', 1),
    fc(4, 'Two reactants, one product: an example?', '2Mg + O₂ → 2MgO.', 'example', 1),
    fc(5, 'Two reactants, three products: an example?', 'Cu + 4HNO₃ → Cu(NO₃)₂ + 2NO₂ + 2H₂O.', 'example', 1),
    fc(6, 'Four things a balanced equation tells us?', 'The substances, the number of particles, the relative masses, and the conditions and states.', 'concept', 1),
    fc(7, 'What does the triangle above an arrow mean?', 'Heat is supplied.', 'fact', 1),
    fc(8, 'State symbols (s), (l), (g), (aq) mean?', 'Solid, liquid, gas, and dissolved in water.', 'fact', 1),
    fc(9, 'Why must an equation be balanced?', 'Atoms are neither created nor destroyed, so each element has the same count on both sides.', 'concept', 2),
    fc(10, 'Which numbers may be changed when balancing?', 'The numbers in front of formulae (coefficients), never the subscripts.', 'concept', 2),
    fc(11, 'Balance Al + O₂ → Al₂O₃.', '4Al + 3O₂ → 2Al₂O₃.', 'example', 2),
    fc(12, 'Balance Mg + N₂ → Mg₃N₂.', '3Mg + N₂ → Mg₃N₂.', 'example', 2),
    fc(13, 'Balance H₂S + O₂ → SO₂ + H₂O.', '2H₂S + 3O₂ → 2SO₂ + 2H₂O.', 'example', 2),
    fc(14, 'Balance Fe₂O₃ + CO → Fe + CO₂.', 'Fe₂O₃ + 3CO → 2Fe + 3CO₂.', 'example', 2),
    fc(15, 'Which element is balanced first?', 'The element in the most complex formula; leave hydrogen and oxygen for last.', 'exam-tip', 2),
    fc(16, 'Relative atomic mass?', 'The number of times an atom is heavier than one-twelfth of a carbon-12 atom.', 'definition', 3),
    fc(17, 'Earlier standard for atomic masses?', 'The hydrogen atom, taken as 1.', 'fact', 3),
    fc(18, 'Unit of relative atomic mass?', 'None: it is a ratio.', 'fact', 3),
    fc(19, 'Relative molecular mass?', 'The sum of the relative atomic masses of all the atoms in the formula.', 'definition', 3),
    fc(20, 'RMM of Ca(OH)₂ (Ca 40, O 16, H 1)?', '74.', 'example', 3),
    fc(21, 'RMM of Al₂(SO₄)₃ (Al 27, S 32, O 16)?', '342.', 'example', 3),
    fc(22, 'Mass of 7H₂O in a hydrate?', '7 × 18 = 126.', 'fact', 3),
    fc(23, 'Atomic masses to learn?', 'H 1, C 12, N 14, O 16, Na 23, Mg 24, Al 27, S 32, Cl 35.5, K 39, Ca 40, Fe 56, Cu 63.5, Zn 65.', 'fact', 3),
    fc(24, 'Percentage composition?', 'The mass of each element in 100 parts by mass of the compound.', 'definition', 4),
    fc(25, 'Formula for percentage of an element?', '(Mass of the element in the formula ÷ relative molecular mass) × 100.', 'formula', 4),
    fc(26, 'Percentage of magnesium in MgSO₄?', '20%.', 'example', 4),
    fc(27, 'Percentage of water in FeSO₄·7H₂O?', '45.3%.', 'example', 4),
    fc(28, 'How do you check percentage composition?', 'The percentages of all the elements add up to 100.', 'exam-tip', 4),
    fc(29, 'Mass of aluminium in 204 g of Al₂O₃?', '108 g (54 ÷ 102 × 204).', 'example', 4),
    fc(30, 'Exam tip: state the atomic masses', 'Write the atomic masses you use before the working.', 'exam-tip', 4),
  ],
  status: 'draft',
  provenance: PROV,
};
