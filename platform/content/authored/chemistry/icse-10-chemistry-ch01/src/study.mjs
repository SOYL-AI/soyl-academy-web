// ICSE 10 Chemistry ch01 Periodic Table, Periodic Properties and Variations of Properties — notes and flashcards.
import { T, table, unit, PROV } from './lib.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Periodic Table, Periodic Properties and Variations of Properties — Notes',
  language: 'en',
  sections: [
    sec(
      '1. The modern periodic law; groups and periods',
      `**Modern periodic law:** the properties of elements are a periodic function of their **atomic numbers**. Atomic number fixes the number of electrons, hence the valence electrons, which decide properties (argon, 39.9, correctly comes before potassium, 39.1).

- **Group** (18 vertical columns): same number of **valence electrons**; similar properties. Numbered 1–18 (IUPAC) or IA–VIIA, 0.
- **Period** (7 horizontal rows): same number of **shells**. Period 1: 2 elements; periods 2 and 3: 8 each; period 4 starts K, Ca.
- From configuration: number of shells = period; valence electrons = group (1, 2) or 10 + valence electrons (groups 13–18).`,
      [kt('Modern periodic law', 'The properties of elements are a periodic function of their atomic numbers.'), kt('Period', 'A horizontal row of the periodic table; its elements have the same number of electron shells.')],
      [],
      table(['Element', 'Configuration', 'Period', 'Group'], [['N (7)', '2, 5', '2', '15'], ['Mg (12)', '2, 8, 2', '3', '2'], ['Ca (20)', '2, 8, 8, 2', '4', '2']], 'Table of three elements with configuration, period and group'),
      [1],
    ),
    sec(
      '2. Nuclear charge and number of shells',
      `- **Across a period:** shells stay the same; nuclear charge increases by one each step → valence electrons pulled in more strongly.
- **Down a group:** a new shell is added each step → valence electrons farther away and shielded by inner shells → weaker pull, despite the larger nuclear charge.

Every trend in this chapter follows from these two statements.`,
      [kt('Nuclear charge', 'The positive charge of the nucleus, equal to the number of protons (atomic number).'), kt('Shielding', 'The screening of outer electrons from the nucleus by electrons in inner shells.')],
      [],
      table(['Direction', 'Pull on valence electrons'], [['Across a period', 'Stronger'], ['Down a group', 'Weaker']], 'Table of the change in nuclear pull across a period and down a group'),
      [2],
    ),
    sec(
      '3. Atomic size',
      `**Atomic radius:** distance from the centre of the nucleus to the outermost shell. **Decreases across a period** (Na 186 pm → Cl 99 pm); **increases down a group** (Li < Na < K). Noble-gas radii are van der Waals radii and are **not compared** with the bonded radii of the other elements in a period.

Cations are smaller than their atoms (Na⁺ < Na); anions are larger (Cl⁻ > Cl).`,
      [kt('Atomic radius', 'The distance from the centre of the nucleus to the outermost shell of an atom.')],
      [],
      table(['Pair', 'Larger', 'Reason'], [['Na, Cl', 'Na', 'Smaller nuclear charge, same shells'], ['Li, K', 'K', 'More shells']], 'Table comparing atomic sizes in two pairs'),
      [3],
    ),
    sec(
      '4. Metallic and non-metallic character',
      `**Metallic character:** tendency to **lose** electrons (form cations). **Non-metallic character:** tendency to **gain** electrons (form anions).

- Across a period: metallic ↓, non-metallic ↑ (period 3: Na, Mg, Al metals; Si metalloid; P, S, Cl non-metals).
- Down a group: metallic ↑, non-metallic ↓.
- Oxides change from basic (Na₂O, MgO) through amphoteric (Al₂O₃) to acidic (SO₂, Cl₂O₇) across period 3.`,
      [kt('Metallic character', 'The tendency of an atom to lose electrons and form a positive ion.')],
      [],
      table(['Element', 'Character', 'Oxide'], [['Na', 'Metal', 'Basic'], ['Al', 'Metal', 'Amphoteric'], ['S', 'Non-metal', 'Acidic']], 'Table of three period 3 elements with character and nature of oxide'),
      [4],
    ),
    sec(
      '5. Ionisation potential, electron affinity and electronegativity',
      `| Property | Definition | Across a period | Down a group |
|---|---|---|---|
| Ionisation potential | Energy needed to remove an electron from the outer shell of an isolated gaseous atom | Increases | Decreases |
| Electron affinity | Energy released when an isolated gaseous atom gains an electron | Increases | Decreases (generally) |
| Electronegativity | Tendency of an atom in a molecule to attract the shared pair to itself | Increases | Decreases |

Noble gases: highest ionisation potential in each period, almost zero electron affinity. Fluorine: most electronegative element. Chlorine’s electron affinity is slightly higher than fluorine’s.`,
      [kt('Ionisation potential', 'The energy required to remove an electron from the outermost shell of an isolated gaseous atom.'), kt('Electron affinity', 'The energy released when an isolated gaseous atom gains an electron to form a negative ion.'), kt('Electronegativity', 'The tendency of an atom in a molecule to attract the shared pair of electrons towards itself.')],
      [],
      table(['Highest in period 3', 'Element'], [['Ionisation potential', 'Ar'], ['Electronegativity', 'Cl'], ['Atomic size (excluding Ar)', 'Na']], 'Table of extreme values in period 3'),
      [5],
    ),
    sec(
      '6. Alkali metals and halogens',
      `**Group 1 (Li, Na, K):** one valence electron; size ↑ and ionisation potential ↓ down the group, so **reactivity increases** (Li < Na < K). With water: 2M + 2H₂O → 2MOH + H₂.

**Group 17 (F, Cl, Br, I):** seven valence electrons; size ↑ down the group, so attraction for an extra electron ↓ and **reactivity decreases** (F > Cl > Br > I). Displacement: Cl₂ + 2KBr → 2KCl + Br₂; Br₂ + 2KI → 2KBr + I₂.`,
      [kt('Displacement (halogens)', 'A more reactive halogen removes a less reactive halogen from a solution of its salt.')],
      [],
      table(['Family', 'Trend down the group'], [['Alkali metals', 'More reactive'], ['Halogens', 'Less reactive']], 'Table of reactivity trends in groups 1 and 17'),
      [6],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Saying atomic size increases across a period.
- Mixing up electron affinity (energy released, isolated atom) and electronegativity (attraction in a molecule).
- Comparing argon’s radius with chlorine’s.
- Saying halogens become more reactive down the group.

**How marks are usually awarded**
- Trend questions (1 mark each): the correct order plus a reason using nuclear charge or shells.
- Definitions (1 mark): include “isolated gaseous atom” where needed.
- Placing an element (2 marks): configuration, then period and group.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Modern periodic law?', 'Properties of elements are a periodic function of their atomic numbers.', 'definition', 1),
    fc(2, 'What is the same for elements in a group?', 'Number of valence electrons.', 'fact', 1),
    fc(3, 'What is the same for elements in a period?', 'Number of shells.', 'fact', 1),
    fc(4, 'How many elements in period 3?', 'Eight (Na to Ar).', 'fact', 1),
    fc(5, 'Group and period of Cl (2, 8, 7)?', 'Group 17, period 3.', 'example', 1),
    fc(6, 'Why atomic number, not mass?', 'It fixes the electron configuration, which decides properties.', 'concept', 1),
    fc(7, 'Nuclear charge across a period?', 'Increases (one more proton each step).', 'fact', 2),
    fc(8, 'Why does the pull weaken down a group?', 'New shells: electrons farther away and shielded.', 'concept', 2),
    fc(9, 'Atomic size across a period?', 'Decreases.', 'fact', 3),
    fc(10, 'Atomic size down a group?', 'Increases.', 'fact', 3),
    fc(11, 'Why are noble-gas radii not compared?', 'They are van der Waals radii, not bonded radii.', 'concept', 3),
    fc(12, 'Is Na⁺ larger or smaller than Na?', 'Smaller (loses the whole third shell).', 'fact', 3),
    fc(13, 'Metallic character?', 'Tendency to lose electrons.', 'definition', 4),
    fc(14, 'Metallic character across a period?', 'Decreases.', 'fact', 4),
    fc(15, 'Metalloid in period 3?', 'Silicon.', 'fact', 4),
    fc(16, 'Nature of Al₂O₃?', 'Amphoteric.', 'fact', 4),
    fc(17, 'Ionisation potential?', 'Energy to remove an outer electron from an isolated gaseous atom.', 'definition', 5),
    fc(18, 'Electron affinity?', 'Energy released when an isolated gaseous atom gains an electron.', 'definition', 5),
    fc(19, 'Electronegativity?', 'Tendency of an atom in a molecule to attract the shared pair.', 'definition', 5),
    fc(20, 'Most electronegative element?', 'Fluorine.', 'fact', 5),
    fc(21, 'Highest ionisation potential in period 2?', 'Neon.', 'fact', 5),
    fc(22, 'Ionisation potential down a group?', 'Decreases.', 'fact', 5),
    fc(23, 'Electron affinity of noble gases?', 'Practically zero.', 'fact', 5),
    fc(24, 'Most reactive of Li, Na, K?', 'Potassium.', 'fact', 6),
    fc(25, 'Why is K more reactive than Na?', 'Larger atom, lower ionisation potential.', 'concept', 6),
    fc(26, 'Most reactive halogen?', 'Fluorine.', 'fact', 6),
    fc(27, 'Why are halogens less reactive down the group?', 'Larger atoms attract an extra electron less strongly.', 'concept', 6),
    fc(28, 'Cl₂ + 2KBr →?', '2KCl + Br₂ (solution turns orange-brown).', 'formula', 6),
    fc(29, 'Does I₂ react with KCl solution?', 'No: iodine is less reactive than chlorine.', 'fact', 6),
    fc(30, 'Exam tip: reasons', 'Across: nuclear charge. Down: number of shells.', 'exam-tip', 2),
  ],
  status: 'draft',
  provenance: PROV,
};
