// ICSE 9 Chemistry ch08 notes and flashcards.
import { T, unit, PROV, table, svgV } from '../../icse-9-chemistry-ch01/src/lib.mjs';
import { V } from './decks.mjs';
import { NACL, MGCL2, CAO, COV_SINGLE, COV_MULTI, COV_WATER, COV_METHANE, RADICALS } from './svgs.mjs';
import { MA } from './calc.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas: [], visual, visuals, topic_ids: topics.map(T) });
const mol = (name, f, k) => `| ${name} | ${f} | ${MA[k].valence} | ${MA[k].pairs} | ${MA[k].lone} |`;

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Chemical Bonding — Notes',
  language: 'en',
  sections: [
    sec(
      '1. The electrovalent bond and ion formation',
      `Atoms combine to reach a stable outer shell: a **duplet** (2, as in helium) or an **octet** (8). An atom can **lose**, **gain** or **share** electrons to do so.

- A **cation** is a positive ion, formed when an atom **loses** electrons (metals, with 1 to 3 outer electrons): $\\ce{Na -> Na+ + e-}$, $\\ce{Mg -> Mg^2+ + 2e-}$.
- An **anion** is a negative ion, formed when an atom **gains** electrons (non-metals, with 5 to 7 outer electrons): $\\ce{Cl + e- -> Cl-}$, $\\ce{O + 2e- -> O^2-}$.

The **electrovalent (ionic) bond** is the bond formed by the **complete transfer** of one or more electrons from one atom (usually a metal) to another (usually a non-metal). The oppositely charged ions attract each other: the attraction is **electrostatic**. The compound formed is an electrovalent (ionic) compound.

| Atom | Configuration | Ion | Ion configuration |
|---|---|---|---|
| Sodium | 2, 8, 1 | Na⁺ | 2, 8 |
| Magnesium | 2, 8, 2 | Mg²⁺ | 2, 8 |
| Calcium | 2, 8, 8, 2 | Ca²⁺ | 2, 8, 8 |
| Chlorine | 2, 8, 7 | Cl⁻ | 2, 8, 8 |
| Oxygen | 2, 6 | O²⁻ | 2, 8 |

The ions of sodium, magnesium, oxygen and fluorine have the same arrangement as neon (2, 8); those of potassium, calcium and chlorine the same as argon (2, 8, 8). The total positive charge equals the total negative charge, which fixes the formula.`,
      [kt('Electrovalent bond', 'The bond formed by the transfer of electrons from one atom to another, the resulting ions being held together by electrostatic attraction.'), kt('Cation and anion', 'A cation is a positive ion formed by loss of electrons; an anion is a negative ion formed by gain of electrons.')],
      table(['Atom type', 'Tends to', 'Forms'], [['Metal (1 to 3 outer electrons)', 'Lose electrons', 'Cation'], ['Non-metal (5 to 7 outer electrons)', 'Gain electrons', 'Anion']], 'Table of metals and non-metals and the ions they form'),
      [1],
    ),
    sec(
      '2. Orbit structures of sodium chloride, magnesium chloride and calcium oxide',
      `In an **orbit structure** the electrons are drawn in their shells. Show electrons of one atom as dots and of the other as crosses, draw the ions in square brackets and write the charge at the top right.

**Sodium chloride, NaCl:** sodium (2, 8, 1) gives its **one** outer electron to chlorine (2, 8, 7). Na⁺ is 2, 8 and Cl⁻ is 2, 8, 8. Ratio 1 : 1.

**Magnesium chloride, MgCl₂:** magnesium (2, 8, 2) gives **one electron to each of two** chlorine atoms. Mg²⁺ is 2, 8; each Cl⁻ is 2, 8, 8. Ratio 1 : 2.

**Calcium oxide, CaO:** calcium (2, 8, 8, 2) gives **two** electrons to oxygen (2, 6). Ca²⁺ is 2, 8, 8 and O²⁻ is 2, 8. Ratio 1 : 1.

| Compound | Cation | Anion | Electrons transferred (per formula unit) |
|---|---|---|---|
| NaCl | Na⁺ | Cl⁻ | 1 |
| MgCl₂ | Mg²⁺ | two Cl⁻ | 2 (1 to each chlorine) |
| CaO | Ca²⁺ | O²⁻ | 2 |

The same method gives potassium chloride (K⁺ and Cl⁻, 1 : 1), magnesium oxide (Mg²⁺ and O²⁻, 1 : 1) and sodium oxide (two Na⁺ and one O²⁻).`,
      [kt('Orbit structure', 'A diagram of the electrons of an atom, ion or molecule drawn in their shells.')],
      svgV(NACL, 'Orbit structure diagram for the formation of sodium chloride'),
      [2],
      [svgV(MGCL2, 'Orbit structure diagram for the formation of magnesium chloride'), svgV(CAO, 'Orbit structure diagram for the formation of calcium oxide')],
    ),
    sec(
      '3. The covalent bond',
      `A **covalent bond** is the bond formed by the **sharing of one or more pairs of electrons** between two atoms (usually non-metals), so that each atom completes its duplet or octet.

- **Single bond:** one shared pair (H–H, Cl–Cl, H–Cl).
- **Double bond:** two shared pairs (O=O).
- **Triple bond:** three shared pairs (N≡N).

| Atom | Outer electrons | Needs for duplet or octet | Pairs shared |
|---|---|---|---|
| Hydrogen | 1 | 1 | 1 |
| Chlorine | 7 | 1 | 1 |
| Oxygen | 6 | 2 | 2 |
| Nitrogen | 5 | 3 | 3 |
| Carbon | 4 | 4 | 4 |

Electrons shared by two atoms count for both atoms. Electrons not shared form **lone pairs**.`,
      [kt('Covalent bond', 'The bond formed by the sharing of a pair or pairs of electrons between two atoms.'), kt('Lone pair', 'A pair of outer-shell electrons that is not shared.')],
      V.multi,
      [3],
    ),
    sec(
      '4. Orbit structures of covalent molecules',
      `In an orbit structure of a molecule the outer shells overlap and the shared pairs sit in the overlap, one dot and one cross for each pair. Count lone pairs on each atom.

| Molecule | Outer electrons in all atoms | Shared pairs | Lone pairs |
|---|---|---|---|
${mol('Hydrogen', 'H₂', 'H2')}
${mol('Chlorine', 'Cl₂', 'Cl2')}
${mol('Hydrogen chloride', 'HCl', 'HCl')}
${mol('Oxygen', 'O₂', 'O2')}
${mol('Nitrogen', 'N₂', 'N2')}
${mol('Water', 'H₂O', 'H2O')}
${mol('Ammonia', 'NH₃', 'NH3')}
${mol('Carbon tetrachloride', 'CCl₄', 'CCl4')}
${mol('Methane', 'CH₄', 'CH4')}

- **Hydrogen:** a single bond; each atom has a duplet.
- **Chlorine, hydrogen chloride:** a single bond; chlorine has three lone pairs.
- **Oxygen:** a double bond; two lone pairs on each atom. **Nitrogen:** a triple bond; one lone pair on each atom.
- **Water:** two single bonds; two lone pairs on oxygen. **Ammonia:** three single bonds; one lone pair on nitrogen.
- **Methane:** four single bonds; no lone pair. **Carbon tetrachloride:** four single bonds; three lone pairs on each chlorine.

The outer-shell electron count of every atom in each molecule is the octet (the duplet for hydrogen). The shape of the molecules is not asked at this level.`,
      [kt('Shared pair', 'A pair of electrons, one contributed by each atom, that forms a single covalent bond.')],
      V.water,
      [4],
      [V.single, V.methane],
    ),
    sec(
      '5. Radicals from the breaking of a covalent bond',
      `When a covalent bond breaks so that **each atom keeps one of the two shared electrons**, the pieces are **radicals** (free radicals): atoms or groups with an **unpaired electron**. A radical has **no charge** and is very **reactive**.

- Hydrogen: $\\ce{H2 -> 2H.}$
- Chlorine in light: $\\ce{Cl2 ->[light] 2Cl.}$
- Methane: $\\ce{CH4 -> CH3. + H.}$ (a methyl radical and a hydrogen radical)

Do not confuse these radicals with the **valency radicals** of the first chapter, such as sulphate or ammonium: those are charged groups of atoms that stay together in reactions. A free radical is a neutral species with an unpaired electron. Compare with an ion, which carries a charge and has all its electrons paired (a chloride ion has 8 outer electrons, a chlorine radical has 7).`,
      [kt('Radical', 'An atom or group of atoms with an unpaired electron, formed when a covalent bond breaks and each atom keeps one electron.')],
      V.radicals,
      [5],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Drawing a shared pair for an electrovalent bond, or a transferred electron for a covalent bond.
- Showing both chlorine atoms taking two electrons from magnesium, or one chlorine atom taking two.
- Leaving out the lone pairs, or writing 2 shared pairs for chlorine.
- Forgetting the brackets and the charge on ions.
- Writing a charge on a radical, or on a covalent molecule.
- Mixing up radicals (unpaired electron) with the valency radicals of the first chapter.

**How marks are usually awarded**
- 1 mark: a configuration, an ion with its charge, the number of shared pairs or a definition.
- 2 marks: two differences, or a reason with a configuration.
- 3 marks: three structures, ions or counts.
- 10-mark structured question: a lettered orbit structure with parts of 2 to 4 marks: naming parts, configurations, equations for ion formation, drawing an orbit structure and counting shared and lone pairs.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Why do atoms form bonds?', 'To reach a stable outer shell: a duplet or an octet.', 'concept', 1),
    fc(2, 'What is a cation?', 'A positive ion, formed when an atom loses electrons.', 'definition', 1),
    fc(3, 'What is an anion?', 'A negative ion, formed when an atom gains electrons.', 'definition', 1),
    fc(4, 'What is an electrovalent bond?', 'A bond formed by the transfer of electrons from one atom to another, the ions being held by electrostatic attraction.', 'definition', 1),
    fc(5, 'Which atoms usually form cations and which anions?', 'Metals form cations; non-metals form anions.', 'concept', 1),
    fc(6, 'Equation for the formation of Mg²⁺?', 'Mg → Mg²⁺ + 2e⁻.', 'formula', 1),
    fc(7, 'Equation for the formation of Cl⁻?', 'Cl + e⁻ → Cl⁻.', 'formula', 1),
    fc(8, 'Configuration of the oxide ion?', '2, 8 (oxygen 2, 6 gains 2 electrons).', 'fact', 1),
    fc(9, 'Sodium chloride: electrons transferred and ions formed?', 'Sodium gives 1 electron to chlorine: Na⁺ (2, 8) and Cl⁻ (2, 8, 8).', 'example', 2),
    fc(10, 'Magnesium chloride: how do the electrons move?', 'Magnesium gives 1 electron to each of two chlorine atoms: Mg²⁺ and two Cl⁻.', 'example', 2),
    fc(11, 'Calcium oxide: ions and electrons transferred?', 'Calcium gives 2 electrons to oxygen: Ca²⁺ (2, 8, 8) and O²⁻ (2, 8).', 'example', 2),
    fc(12, 'How are ions drawn in an orbit structure?', 'In square brackets with the charge at the top right.', 'exam-tip', 2),
    fc(13, 'Ratio of ions in NaCl, MgCl₂ and CaO?', '1 : 1, 1 : 2 and 1 : 1.', 'fact', 2),
    fc(14, 'What is a covalent bond?', 'A bond formed by sharing a pair or pairs of electrons between two atoms.', 'definition', 3),
    fc(15, 'Single, double and triple bonds: shared pairs?', '1, 2 and 3 pairs (2, 4 and 6 electrons).', 'fact', 3),
    fc(16, 'Which molecule has a double bond? A triple bond?', 'Oxygen, O=O; nitrogen, N≡N.', 'fact', 3),
    fc(17, 'What is a lone pair?', 'A pair of outer electrons that is not shared.', 'definition', 3),
    fc(18, 'Pairs shared by H, Cl, O, N and C in their compounds?', '1, 1, 2, 3 and 4.', 'fact', 3),
    fc(19, 'Hydrogen molecule: bond and lone pairs?', 'A single bond; no lone pair; each atom has a duplet.', 'fact', 4),
    fc(20, 'Chlorine molecule: bond and lone pairs?', 'A single bond; three lone pairs on each chlorine atom.', 'fact', 4),
    fc(21, 'Oxygen and nitrogen molecules: lone pairs?', 'Two on each oxygen atom; one on each nitrogen atom.', 'fact', 4),
    fc(22, 'Hydrogen chloride: shared and lone pairs?', 'One shared pair; three lone pairs on chlorine.', 'fact', 4),
    fc(23, 'Water: shared and lone pairs?', 'Two shared pairs; two lone pairs on oxygen.', 'fact', 4),
    fc(24, 'Ammonia: shared and lone pairs?', 'Three shared pairs; one lone pair on nitrogen.', 'fact', 4),
    fc(25, 'Methane and carbon tetrachloride: shared pairs?', 'Four each; carbon has no lone pair.', 'fact', 4),
    fc(26, 'Where are shared electrons drawn in an orbit structure?', 'In the overlap of the two outer shells, one dot and one cross for each pair.', 'exam-tip', 4),
    fc(27, 'What is a radical?', 'An atom or group with an unpaired electron, formed when a covalent bond breaks and each atom keeps one electron.', 'definition', 5),
    fc(28, 'Equation for the radicals from chlorine in light?', 'Cl₂ → 2Cl• (two chlorine radicals).', 'formula', 5),
    fc(29, 'Does a radical carry a charge?', 'No: it is neutral, unlike an ion.', 'concept', 5),
    fc(30, 'Exam tip: electrovalent or covalent?', 'Transfer of electrons: electrovalent. Sharing of a pair: covalent.', 'exam-tip', 1),
  ],
  status: 'draft',
  provenance: PROV,
};
