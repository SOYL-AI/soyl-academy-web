// ch08 Atoms and Molecules — notes and flashcards.
import { T, table, unit, PROV, r } from './lib.mjs';
import { V } from './decks.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const fm = (latex, label) => ({ latex, label });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Atoms and Molecules — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Law of conservation of mass',
      r`In a chemical reaction mass is neither created nor destroyed: the total mass of the products equals the total mass of the reactants. It is checked in a **closed** vessel. In an open vessel a gas may escape (marble and acid) or be taken in from the air (magnesium burning), so the reading seems to change.

Example: 10.0 g of calcium carbonate and 7.3 g of hydrochloric acid give 11.1 g of calcium chloride, 1.8 g of water and 4.4 g of carbon dioxide; $10.0 + 7.3 = 11.1 + 1.8 + 4.4 = 17.3$ g.`,
      [kt('Law of conservation of mass', 'The total mass of products equals the total mass of reactants in a chemical reaction.'), kt('Closed vessel', 'A vessel from which no gas can enter or escape, used to verify the law.')],
      [],
      V.conservation,
      [1],
    ),
    sec(
      '2. Law of constant proportions',
      r`A pure compound always contains the same elements in the same ratio by mass, whatever its source or method of preparation. Water: H : O = 1 : 8. Carbon dioxide: C : O = 3 : 8. Ammonia: N : H = 14 : 3. Magnesium oxide: Mg : O = 3 : 2.

To verify the law from sample measurements: subtract to find the mass of the second element, then write each sample's ratio in simplest form and compare.`,
      [kt('Law of constant proportions', 'A pure compound always has its elements combined in the same ratio by mass.'), kt('Ratio by mass', 'The masses of the elements in a sample written in the simplest whole-number ratio.')],
      [],
      V.proportion,
      [1],
    ),
    sec(
      "3. Dalton's atomic theory",
      r`Postulates: (1) matter is made of atoms; (2) atoms of one element are identical in mass and properties; (3) atoms of different elements differ; (4) atoms combine in small whole-number ratios to form compounds; (5) atoms cannot be created or destroyed in a chemical reaction, only rearranged.

The theory explains conservation of mass (atoms are only rearranged) and constant proportions (fixed ratio of atoms, fixed atomic masses).

**Limitations:** atoms are divisible (electrons, protons, neutrons); isotopes (same element, different mass); isobars (different elements, same mass); it does not explain why atoms combine; it fails in nuclear reactions.`,
      [kt('Atom', 'The smallest particle of an element that takes part in a chemical reaction.'), kt('Isotopes', 'Atoms of the same element with different masses.'), kt('Isobars', 'Atoms of different elements with the same mass.')],
      [],
      table(['Law', 'Dalton postulate that explains it'], [['Conservation of mass', 'atoms are neither created nor destroyed'], ['Constant proportions', 'atoms combine in fixed ratios and have fixed masses']], 'Table linking each law of chemical combination with the Dalton postulate that explains it'),
      [2],
    ),
    sec(
      '4. Molecules, atomicity and ions',
      r`A **molecule** is two or more atoms bonded together. The **atomicity** of an element is the number of atoms in a molecule: He, Ne, Ar monoatomic; $\ce{H2}$, $\ce{O2}$, $\ce{N2}$, $\ce{Cl2}$ diatomic; $\ce{O3}$ triatomic; $\ce{P4}$ tetratomic; $\ce{S8}$ octa-atomic.

An **ion** is a charged atom or group of atoms: a **cation** is positive, an **anion** negative. Ionic compounds are made of a repeating pattern of ions, so we speak of a **formula unit**. A **polyatomic ion** is a charged group of atoms that stays together.`,
      [kt('Molecule', 'Two or more atoms bonded together that behave as one particle.'), kt('Atomicity', 'The number of atoms in a molecule of an element.'), kt('Ion', 'An atom or group of atoms with an electric charge.'), kt('Polyatomic ion', 'A group of bonded atoms carrying a charge as a whole.'), kt('Formula unit', 'The simplest ratio of ions in an ionic compound.')],
      [],
      V.atomicity,
      [3],
    ),
    sec(
      '5. Writing formulae: the criss-cross method',
      r`| Polyatomic ion | Formula | Charge |
|---|---|---|
| Ammonium | $\ce{NH4+}$ | 1+ |
| Hydroxide | $\ce{OH-}$ | 1− |
| Nitrate | $\ce{NO3-}$ | 1− |
| Hydrogencarbonate | $\ce{HCO3-}$ | 1− |
| Carbonate | $\ce{CO3^2-}$ | 2− |
| Sulphate | $\ce{SO4^2-}$ | 2− |

**Method:** write cation then anion; write valencies; criss-cross (valency of cation becomes subscript of anion and the reverse); divide by a common factor; brackets for a polyatomic ion with subscript more than 1; omit subscript 1. Results: $\ce{NaCl}$, $\ce{MgO}$, $\ce{CaCl2}$, $\ce{K2CO3}$, $\ce{Mg(OH)2}$, $\ce{Al2O3}$, $\ce{Al2(SO4)3}$.`,
      [kt('Valency', 'The size of the charge on an ion; used to combine ions in the right ratio.'), kt('Criss-cross method', 'Writing a formula by making each valency the subscript of the other ion.')],
      [],
      V.crisscross,
      [3],
    ),
    sec(
      '6. Molecular mass and formula unit mass',
      r`**Molecular mass** = sum of the atomic masses of all atoms in one molecule. **Formula unit mass** = the same for one formula unit of an ionic compound. Unit: atomic mass unit (u). Atomic masses: H 1, C 12, N 14, O 16, Na 23, Mg 24, Al 27, S 32, Cl 35.5, K 39, Ca 40.

$\ce{H2SO4}$: $2 + 32 + 64 = 98$ u. $\ce{C6H12O6}$: $72 + 12 + 96 = 180$ u. $\ce{Mg(OH)2}$: $24 + 2 \times 17 = 58$ u. $\ce{Al2(SO4)3}$: $54 + 3 \times 96 = 342$ u. A subscript after a bracket multiplies every atom inside it. (You will meet the mole in Class 11.)`,
      [kt('Molecular mass', 'Sum of the atomic masses of all the atoms in one molecule, in u.'), kt('Formula unit mass', 'Sum of the atomic masses of all the atoms in one formula unit of an ionic compound, in u.'), kt('Atomic mass unit (u)', 'The unit used for the mass of atoms, molecules and formula units.')],
      [fm(r`M = \sum (\text{number of atoms} \times \text{atomic mass})`, 'Molecular or formula unit mass')],
      table(['Compound', 'Working', 'Mass (u)'], [['H2SO4', '2 × 1 + 32 + 4 × 16', '98'], ['C6H12O6', '6 × 12 + 12 × 1 + 6 × 16', '180'], ['K2CO3', '2 × 39 + 12 + 3 × 16', '138'], ['Mg(OH)2', '24 + 2 × (16 + 1)', '58'], ['Al2(SO4)3', '2 × 27 + 3 × (32 + 4 × 16)', '342']], 'Table of five compounds with the working and the molecular or formula unit mass'),
      [4],
    ),
  ],
  exam_tips_md: `- State that conservation of mass is verified in a closed vessel.
- For constant proportions, show the subtraction and the simplest ratio for each sample.
- Name the five postulates and link each law to the postulate that explains it.
- Criss-cross: cation first, valencies, cross, reduce, brackets for a polyatomic ion.
- Write every term of a mass calculation and give the unit u.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'State the law of conservation of mass.', 'In a chemical reaction, the total mass of the products equals the total mass of the reactants.', 'definition', 1),
    fc(2, 'Why is a closed vessel used to verify conservation of mass?', 'So that no gas can escape or enter and change the reading.', 'concept', 1),
    fc(3, 'Why does burnt magnesium ash weigh more than the ribbon?', 'Oxygen from the air has joined the metal.', 'example', 1),
    fc(4, 'State the law of constant proportions.', 'A pure compound always contains the same elements in the same ratio by mass.', 'definition', 1),
    fc(5, 'Ratio of hydrogen to oxygen by mass in water?', '1 : 8', 'fact', 1),
    fc(6, 'Ratio of carbon to oxygen by mass in carbon dioxide?', '3 : 8', 'fact', 1),
    fc(7, 'Ratio of nitrogen to hydrogen by mass in ammonia?', '14 : 3', 'fact', 1),
    fc(8, 'Magnesium oxide has 6.0 g Mg and 4.0 g O. Ratio?', '3 : 2', 'example', 1),
    fc(9, 'Who gave the law of conservation of mass? Constant proportions?', 'Lavoisier; Proust.', 'fact', 1),
    fc(10, "First postulate of Dalton's theory?", 'All matter is made of very small particles called atoms.', 'definition', 2),
    fc(11, 'What did Dalton say about atoms of one element?', 'They are identical in mass and properties.', 'definition', 2),
    fc(12, 'What did Dalton say happens to atoms in a reaction?', 'They are neither created nor destroyed, only rearranged.', 'definition', 2),
    fc(13, 'Which Dalton postulate explains conservation of mass?', 'Atoms cannot be created or destroyed in a reaction.', 'concept', 2),
    fc(14, 'Name two limitations of the theory.', 'Atoms are divisible (subatomic particles); isotopes and isobars exist.', 'concept', 2),
    fc(15, 'What are isotopes?', 'Atoms of the same element with different masses.', 'definition', 2),
    fc(16, 'What are isobars?', 'Atoms of different elements with the same mass.', 'definition', 2),
    fc(17, 'What is a molecule?', 'Two or more atoms bonded together that behave as one particle.', 'definition', 3),
    fc(18, 'What is atomicity?', 'The number of atoms in one molecule of an element.', 'definition', 3),
    fc(19, 'Atomicity of helium, oxygen, ozone, white phosphorus, sulphur?', '1, 2, 3, 4 and 8.', 'fact', 3),
    fc(20, 'What is an ion? Cation? Anion?', 'A charged atom or group of atoms. Cation: positive. Anion: negative.', 'definition', 3),
    fc(21, 'What is a polyatomic ion? Two examples.', r`A group of atoms with an overall charge, such as $\ce{SO4^2-}$ and $\ce{NH4+}$.`, 'definition', 3),
    fc(22, 'Formula and charge of nitrate and hydroxide?', r`$\ce{NO3-}$ and $\ce{OH-}$, each with 1− charge.`, 'fact', 3),
    fc(23, 'Formula and charge of carbonate and sulphate?', r`$\ce{CO3^2-}$ and $\ce{SO4^2-}$, each with 2− charge.`, 'fact', 3),
    fc(24, 'Steps of the criss-cross method?', 'Symbols, valencies, cross over, reduce by a common factor, brackets for polyatomic ions.', 'concept', 3),
    fc(25, 'Formula of aluminium sulphate?', r`$\ce{Al2(SO4)3}$`, 'example', 3),
    fc(26, 'Why does magnesium oxide have the formula MgO and not Mg2O2?', 'The subscripts share a common factor 2, so they are divided by 2.', 'concept', 3),
    fc(27, 'Define molecular mass.', 'The sum of the atomic masses of all the atoms in one molecule, in u.', 'definition', 4),
    fc(28, 'Define formula unit mass.', 'The sum of the atomic masses of all the atoms in one formula unit of an ionic compound, in u.', 'definition', 4),
    fc(29, 'Molecular mass of H2SO4?', '2 × 1 + 32 + 4 × 16 = 98 u', 'example', 4),
    fc(30, 'Formula unit mass of Mg(OH)2?', '24 + 2 × (16 + 1) = 58 u', 'example', 4),
    fc(31, 'What does a subscript after a bracket do?', 'It multiplies every atom inside the bracket.', 'concept', 4),
  ],
  status: 'draft',
  provenance: PROV,
};
