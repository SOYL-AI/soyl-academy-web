// ICSE 10 Chemistry ch02 Chemical Bonding — notes and flashcards.
import { T, table, unit, PROV, r } from './lib.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const fm = (latex, label) => ({ latex, label });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Chemical Bonding — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Electrovalent (ionic) bonding',
      `Atoms combine to reach a noble-gas arrangement: an **octet** (or a **duplet** for the first shell). An **electrovalent bond** is formed by **transfer of electrons** from a metal atom (low ionisation potential) to a non-metal atom (high electron affinity); the ions are held by **electrostatic attraction**. Electrovalency = number of electrons lost or gained.

| Compound | Transfer | Ions |
|---|---|---|
| NaCl | Na (2, 8, 1) → 1 e⁻ → Cl (2, 8, 7) | Na⁺ (2, 8), Cl⁻ (2, 8, 8) |
| MgCl₂ | Mg (2, 8, 2) → 1 e⁻ to each of 2 Cl | Mg²⁺, 2Cl⁻ |
| CaO | Ca (2, 8, 8, 2) → 2 e⁻ → O (2, 6) | Ca²⁺, O²⁻ (2, 8) |

In dot diagrams: crosses for the metal’s electrons, dots for the non-metal’s, square brackets and charges on the ions.`,
      [kt('Electrovalent bond', 'A bond formed by the transfer of electrons from one atom to another, the resulting ions being held by electrostatic attraction.'), kt('Electrovalency', 'The number of electrons an atom loses or gains in forming an ionic bond.')],
      [],
      table(['Favours an ionic bond', 'Reason'], [['Low ionisation potential of the metal', 'Loses electrons easily'], ['High electron affinity of the non-metal', 'Gains electrons readily'], ['Large electronegativity difference', 'Complete transfer rather than sharing']], 'Table of the conditions that favour electrovalent bonding'),
      [1],
    ),
    sec(
      '2. Properties of electrovalent compounds',
      `- **Hard crystalline solids**: ions in a lattice held by strong forces.
- **High melting and boiling points** (NaCl melts at 801 °C).
- **Soluble in water**, insoluble in organic solvents (kerosene, petrol).
- **Conduct only when molten or in aqueous solution**: the compound **dissociates** into free ions (NaCl → Na⁺ + Cl⁻), which carry current and are discharged at the electrodes — **electrolysis**. Solid: ions fixed, no conduction.`,
      [kt('Dissociation', 'The separation of an electrovalent compound into its free ions when melted or dissolved.')],
      [fm(r`\ce{MgCl2 -> Mg^2+ + 2Cl-}`, 'Dissociation of molten magnesium chloride')],
      table(['State', 'Conducts?'], [['Solid NaCl', 'No'], ['Molten NaCl', 'Yes'], ['NaCl solution', 'Yes']], 'Table of sodium chloride conductivity in three states'),
      [2],
    ),
    sec(
      '3. Covalent bonding: non-polar molecules',
      `A **covalent bond** is a **shared pair of electrons**, one electron from each atom. Single bond = 1 pair, double = 2 pairs, triple = 3 pairs. **Lone pairs** are unshared valence pairs.

| Molecule | Shared pairs | Lone pairs |
|---|---|---|
| H₂ | 1 (H–H) | 0 |
| Cl₂ | 1 (Cl–Cl) | 3 on each Cl |
| O₂ | 2 (O=O) | 2 on each O |
| N₂ | 3 (N≡N) | 1 on each N |
| CH₄ | 4 C–H | 0 |
| CCl₄ | 4 C–Cl | 3 on each Cl |

Identical atoms share equally (**non-polar**). CH₄ and CCl₄ are symmetrical (tetrahedral), so they are **non-polar molecules**.`,
      [kt('Covalent bond', 'A bond formed by the sharing of a pair of electrons between two atoms, each contributing one electron.'), kt('Lone pair', 'A pair of valence electrons on an atom that is not used in bonding.')],
      [],
      table(['Bond', 'Pairs', 'Example'], [['Single', '1', 'Cl₂'], ['Double', '2', 'O₂'], ['Triple', '3', 'N₂']], 'Table of single, double and triple bonds with examples'),
      [3],
    ),
    sec(
      '4. Polar covalent molecules',
      `When different atoms share a pair, the **more electronegative** atom attracts it more strongly and carries **δ−**; the other carries **δ+**: a **polar covalent bond**.

- **HCl**: H(δ+)–Cl(δ−); one shared pair, three lone pairs on Cl.
- **H₂O**: two O–H bonds, **two lone pairs** on O; bent; polar.
- **NH₃**: three N–H bonds, **one lone pair** on N; pyramidal; polar.`,
      [kt('Polar covalent bond', 'A covalent bond in which the shared pair lies closer to the more electronegative atom, giving partial charges.')],
      [],
      table(['Molecule', 'Bond pairs', 'Lone pairs on central atom'], [['HCl', '1', '3 (on Cl)'], ['H₂O', '2', '2'], ['NH₃', '3', '1']], 'Table of bond pairs and lone pairs in HCl, water and ammonia'),
      [4],
    ),
    sec(
      '5. Electrovalent and covalent compounds compared',
      r`| Property | Electrovalent | Covalent |
|---|---|---|
| Particles | Ions | Molecules |
| State | Hard crystalline solids | Gases, liquids, soft solids |
| Melting / boiling point | High | Low |
| Solubility | Water | Organic solvents |
| Conductivity | Molten or aqueous: yes; solid: no | Non-conductors |

Some polar covalent compounds **ionise in water** and conduct: $\ce{HCl + H2O -> H3O+ + Cl-}$.`,
      [kt('Ionisation (of a polar compound)', 'Formation of ions when a polar covalent compound such as HCl reacts with water.')],
      [fm(r`\ce{HCl + H2O -> H3O+ + Cl-}`, 'HCl ionises in water')],
      table(['Substance', 'Bonding'], [['KCl', 'Electrovalent'], ['CCl₄', 'Covalent (non-polar)'], ['HCl', 'Covalent (polar)']], 'Table classifying three substances by bonding'),
      [5],
    ),
    sec(
      '6. Coordinate bonding',
      r`A **coordinate (dative) bond** is a shared pair in which **both electrons come from one atom** (the donor, which has a **lone pair**); the acceptor (here H⁺) has none.

- $\ce{H2O + H+ -> H3O+}$ (hydronium ion: 2 covalent + 1 coordinate bond)
- $\ce{NH3 + H+ -> NH4+}$ (ammonium ion: 3 covalent + 1 coordinate bond)
- Water self-ionises: $\ce{H2O + H2O <=> H3O+ + OH-}$ — the lone pair on one water molecule takes H⁺ from another.`,
      [kt('Coordinate bond', 'A covalent bond in which both electrons of the shared pair are donated by one atom.')],
      [fm(r`\ce{NH3 + H+ -> NH4+}`, 'Ammonium ion')],
      table(['Ion', 'Donor', 'Acceptor'], [['H₃O⁺', 'O of H₂O', 'H⁺'], ['NH₄⁺', 'N of NH₃', 'H⁺']], 'Table of donor and acceptor in hydronium and ammonium ions'),
      [6],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Drawing inner-shell electrons in dot diagrams, or forgetting brackets and charges on ions.
- Saying solid sodium chloride conducts.
- Drawing O₂ with a single bond or N₂ without lone pairs.
- Calling CCl₄ polar.

**How marks are usually awarded**
- Dot diagram (2 marks): correct electrons on each atom, and correct ions or shared pairs.
- Properties (1 mark each): property with the reason (ions fixed or free; weak forces between molecules).
- Coordinate bond (2 marks): lone pair donated, product ion with charge.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Octet rule?', 'Atoms tend to gain, lose or share electrons to get eight outer electrons.', 'definition', 1),
    fc(2, 'Electrovalent bond?', 'Transfer of electrons; ions held by electrostatic attraction.', 'definition', 1),
    fc(3, 'Ions in CaO?', 'Ca²⁺ and O²⁻.', 'fact', 1),
    fc(4, 'Why does MgCl₂ need two Cl atoms?', 'Mg loses two electrons; each Cl takes only one.', 'concept', 1),
    fc(5, 'Conditions for an ionic bond?', 'Low ionisation potential of one atom, high electron affinity of the other.', 'concept', 1),
    fc(6, 'Electrovalency of Al in Al₂O₃?', '3 (Al³⁺).', 'example', 1),
    fc(7, 'Why are ionic compounds hard with high melting points?', 'Strong electrostatic forces between ions in a lattice.', 'concept', 2),
    fc(8, 'When does NaCl conduct?', 'When molten or dissolved in water.', 'fact', 2),
    fc(9, 'Why does solid NaCl not conduct?', 'Ions are fixed in the lattice.', 'concept', 2),
    fc(10, 'Ionic compounds dissolve in?', 'Water (not organic solvents).', 'fact', 2),
    fc(11, 'Covalent bond?', 'A shared pair of electrons, one from each atom.', 'definition', 3),
    fc(12, 'Bond in N₂?', 'Triple bond (three shared pairs).', 'fact', 3),
    fc(13, 'Bond in O₂?', 'Double bond (two shared pairs).', 'fact', 3),
    fc(14, 'Lone pairs in Cl₂?', 'Three on each Cl atom (six in all).', 'fact', 3),
    fc(15, 'Why is CCl₄ non-polar?', 'Symmetrical tetrahedral shape; bond polarities cancel.', 'concept', 3),
    fc(16, 'Polar covalent bond?', 'Shared pair nearer the more electronegative atom; δ+ and δ−.', 'definition', 4),
    fc(17, 'Lone pairs on O in H₂O?', 'Two.', 'fact', 4),
    fc(18, 'Lone pairs on N in NH₃?', 'One.', 'fact', 4),
    fc(19, 'Which end of HCl is δ−?', 'Chlorine.', 'fact', 4),
    fc(20, 'Shape of NH₃?', 'Pyramidal.', 'fact', 4),
    fc(21, 'Melting points of covalent compounds?', 'Usually low (weak forces between molecules).', 'fact', 5),
    fc(22, 'Covalent compounds dissolve in?', 'Organic solvents.', 'fact', 5),
    fc(23, 'Why does HCl solution conduct?', 'HCl ionises in water: H₃O⁺ and Cl⁻.', 'concept', 5),
    fc(24, 'Coordinate bond?', 'Shared pair donated entirely by one atom.', 'definition', 6),
    fc(25, 'Donor in NH₄⁺?', 'N of ammonia (lone pair).', 'fact', 6),
    fc(26, 'Formation of H₃O⁺?', 'H₂O + H⁺ → H₃O⁺.', 'formula', 6),
    fc(27, 'Bonds in NH₄⁺?', 'Three covalent and one coordinate.', 'fact', 6),
    fc(28, 'Why can H⁺ only accept?', 'It has no electrons at all.', 'concept', 6),
    fc(29, 'Water self-ionisation?', 'H₂O + H₂O ⇌ H₃O⁺ + OH⁻.', 'formula', 6),
    fc(30, 'Exam tip: dot diagrams', 'Outer electrons only; dots and crosses; brackets and charges on ions.', 'exam-tip', 1),
  ],
  status: 'draft',
  provenance: PROV,
};
