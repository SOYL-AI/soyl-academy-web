// ch14 notes and flashcards.
import { T, unit, table, PROV } from '../../cbse-10-science-ch06/src/lib.mjs';
import { V, triadTable, newlandsTable, mendeleevTable, galliumTable, radiusPlot, configTable, valencyTable } from './decks.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas: [], visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Periodic Classification of Elements — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Why classify? Döbereiner’s triads',
      `*This chapter is assessed through internal (school-based) assessment, not the board theory paper.*

As more elements were discovered, chemists looked for a way to group **similar elements** so that their properties could be studied and **predicted** together.

**Döbereiner’s triads (early 1800s):** groups of **three** elements with similar properties. When the three are written in order of increasing atomic mass, the atomic mass of the **middle** element is roughly the **average** of the other two.

- Example: lithium (6.9), sodium (23.0), potassium (39.1): mean of 6.9 and 39.1 = 23.0.
- **Achievement:** the first hint that properties are linked to atomic mass.
- **Limitation:** only a few such triads could be found; most elements did not fit.`,
      [kt('Triad', 'A group of three chemically similar elements in which the middle atomic mass is about the mean of the other two.')],
      triadTable,
      [1],
    ),
    sec(
      '2. Newlands’ law of octaves',
      `**Newlands (1866)** arranged the known elements in order of **increasing atomic mass** and found that **every eighth element** had properties like the first, like the eighth note of a musical scale (sa, re, ga, ma, pa, dha, ni, sa).

- Lithium, sodium and potassium fall in one column; fluorine and chlorine in another.

**Limitations**
- Worked well only **up to calcium**; for heavier elements the pattern broke down.
- Assumed only the elements known then existed, so later discoveries did not fit (for example, the noble gases).
- To keep the pattern, **two elements were put in one place** (cobalt and nickel), even in the same column as very different elements (fluorine, chlorine, bromine), while iron was placed away from cobalt and nickel.`,
      [kt('Law of octaves', 'In order of increasing atomic mass, every eighth element has properties similar to the first.')],
      newlandsTable,
      [1],
    ),
    sec(
      '3. Mendeléev’s periodic table',
      `**Mendeléev (1869)** arranged the **63** elements then known by **increasing atomic mass**, and placed elements with **similar properties** in the same vertical column (group). His main test of similarity was the formulas of **oxides** and **hydrides**.

**Mendeléev’s periodic law:** the properties of elements are a periodic function of their atomic masses.

**Achievements**
- Left **gaps** for undiscovered elements and **predicted** their properties: eka-boron (**scandium**), eka-aluminium (**gallium**), eka-silicon (**germanium**). ("Eka" is Sanskrit for "one".)
- Placed elements by properties even when this broke the mass order (tellurium before iodine), so families stayed together.
- The **noble gases**, found later, fitted in as a **new group** without disturbing the table.`,
      [kt('Group', 'A vertical column of elements with similar properties.'), kt('Eka', 'Sanskrit for "one"; Mendeléev’s prefix for an undiscovered element one place below a known one.')],
      mendeleevTable,
      [2],
      [galliumTable],
    ),
    sec(
      '4. Limitations of Mendeléev’s table',
      `- **Hydrogen:** resembles both alkali metals (one electron, forms positive ions) and halogens (forms molecules of two atoms), so it had no fixed place.
- **Isotopes:** isotopes of an element have **different masses** but the **same chemical properties**. A table based on mass would have to place them apart.
- **Irregular steps:** atomic mass does not increase in regular steps, so it was impossible to say how many elements might be missing between two known ones.
- **Mass order broken:** some heavier elements had to come before lighter ones to keep families together.`,
      [kt('Isotopes', 'Atoms of the same element with the same atomic number but different atomic masses.')],
      table(
        ['Hydrogen is like…', 'Because…'],
        [['Alkali metals (group 1)', 'It has one valence electron and can form a positive ion; it combines with chlorine and oxygen like sodium does'], ['Halogens (group 17)', 'It needs one more electron for a full shell, forms molecules of two atoms (H₂, like Cl₂) and forms compounds with metals']],
        'Table showing why hydrogen resembles both the alkali metals and the halogens',
      ),
      [2],
    ),
    sec(
      '5. The modern periodic law and table',
      `In **1913**, **Henry Moseley** showed that the **atomic number** (number of protons) is a more fundamental property than atomic mass.

**Modern periodic law:** the properties of elements are a **periodic function of their atomic numbers**.

- **18 groups** (vertical columns, numbered 1 to 18) and **7 periods** (horizontal rows).
- **Isotopes** have the same atomic number, so they share **one place**.
- Atomic-number order automatically puts tellurium (52) before iodine (53), cobalt (27) before nickel (28) and argon (18) before potassium (19).
- **Metals** are on the left and in the middle; **non-metals** on the upper right; **metalloids** (boron, silicon, germanium, arsenic, antimony, tellurium, polonium) on a zig-zag line between them.
- Groups 3 to 12 are the **transition elements**; the lanthanoids and actinoids are shown in two rows below.`,
      [kt('Atomic number', 'The number of protons in the nucleus of an atom.'), kt('Period', 'A horizontal row of the periodic table.'), kt('Metalloid', 'An element with some properties of metals and some of non-metals.')],
      V.layout,
      [3],
    ),
    sec(
      '6. Position and electronic configuration',
      `The position of an element follows from its **electronic configuration**.

- **Same group → same number of valence electrons** → similar properties.
- **Period number = number of occupied shells.**
- Among the first 20 elements: 1 or 2 valence electrons → group 1 or 2; 3 to 8 valence electrons → group = **10 + valence electrons** (helium, with 2, is in group 18).
- Number of elements per period: **2, 8, 8, 18, 18, 32, 32**. A shell can hold at most **2n²** electrons.

**Example:** atomic number 13 → 2, 8, 3 → period 3, group 13 (aluminium).`,
      [kt('Valence electrons', 'Electrons in the outermost shell of an atom.'), kt('Electronic configuration', 'The arrangement of electrons in the shells of an atom, e.g. 2, 8, 1.')],
      V.table20,
      [3],
      [configTable],
    ),
    sec(
      '7. Trends in the modern periodic table',
      `**Valency:** across a period it rises from 1 to 4 and falls to 0; down a group it stays the same. Valency = valence electrons (1 to 4) or 8 − valence electrons (5 to 8).

**Atomic size (atomic radius):**
- **Across a period: decreases.** Electrons go into the same shell while the nuclear charge increases, so they are pulled closer.
- **Down a group: increases.** A new shell is added each time, so the outer electrons are farther from the nucleus.

**Metallic and non-metallic character:**
- Metals tend to **lose** electrons; non-metals tend to **gain** them.
- **Across a period:** metallic character **decreases**, non-metallic character **increases**.
- **Down a group:** metallic character **increases**, non-metallic character **decreases**.
- **Oxides:** metal oxides are **basic**; non-metal oxides are **acidic**.`,
      [kt('Atomic radius', 'The distance from the centre of the nucleus to the outermost shell of an isolated atom.'), kt('Metallic character', 'The tendency of an atom to lose electrons.')],
      V.trends,
      [3],
      [valencyTable, radiusPlot, V.group1],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Saying Mendeléev arranged elements by atomic number (he used atomic mass and properties).
- Forgetting that Newlands’ law worked only up to calcium.
- Mixing up group and period: shells give the period; valence electrons give the group.
- Saying atoms get bigger across a period because they have more electrons.
- Saying metallic character increases across a period.

**How marks are usually awarded**
- 1-mark items: correct option, term, group or formula.
- 2–3-mark answers: correct statement (1) + reason or example (1) + extra point or comparison (1).
- 5-mark answers: law or basis (1) + achievements or method with an example (2) + limitations or trends with reasons (2).
- Locating an element: configuration (1) + period and group (1).`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Why classify elements?', 'To group similar elements so that their properties can be studied together and predicted.', 'concept', 1),
    fc(2, 'Döbereiner’s triad?', 'Three similar elements whose middle atomic mass is about the mean of the other two.', 'definition', 1),
    fc(3, 'One example of a triad?', 'Lithium, sodium, potassium (or calcium, strontium, barium; or chlorine, bromine, iodine).', 'example', 1),
    fc(4, 'Limitation of triads?', 'Only a few triads were found; most elements did not fit.', 'concept', 1),
    fc(5, 'Newlands’ law of octaves?', 'In order of increasing atomic mass, every eighth element resembles the first.', 'definition', 1),
    fc(6, 'Up to which element did the law of octaves work?', 'Calcium.', 'fact', 1),
    fc(7, 'Two limitations of Newlands’ octaves?', 'Failed beyond calcium; no room for new elements; cobalt and nickel forced into one place with unlike elements.', 'concept', 1),
    fc(8, 'Basis of Mendeléev’s table?', 'Increasing atomic mass, plus similar formulas of oxides and hydrides.', 'concept', 2),
    fc(9, 'Mendeléev’s periodic law?', 'Properties of elements are a periodic function of their atomic masses.', 'definition', 2),
    fc(10, 'Oxide and hydride formulas of Mendeléev’s group I?', 'R₂O and RH.', 'formula', 2),
    fc(11, 'Oxide formula for Mendeléev’s group IV?', 'RO₂ (hydride RH₄).', 'formula', 2),
    fc(12, 'Eka-aluminium, eka-silicon, eka-boron?', 'Gallium, germanium, scandium.', 'fact', 2),
    fc(13, 'Why did Mendeléev leave gaps?', 'For elements not yet discovered; he predicted their properties.', 'concept', 2),
    fc(14, 'How were noble gases placed in Mendeléev’s table?', 'As a new group, without disturbing the existing order.', 'fact', 2),
    fc(15, 'Why is hydrogen hard to place?', 'It resembles both alkali metals and halogens.', 'concept', 2),
    fc(16, 'Why were isotopes a problem for Mendeléev?', 'Different masses but the same properties: a mass-based table would place them apart.', 'concept', 2),
    fc(17, 'Why tellurium before iodine?', 'To keep iodine with the halogens and tellurium with sulfur, despite tellurium’s greater mass.', 'example', 2),
    fc(18, 'Modern periodic law?', 'Properties of elements are a periodic function of their atomic numbers.', 'definition', 3),
    fc(19, 'Who showed atomic number is fundamental, and when?', 'Henry Moseley, 1913.', 'fact', 3),
    fc(20, 'Groups and periods in the modern table?', '18 groups and 7 periods.', 'fact', 3),
    fc(21, 'What is the same for elements in one group?', 'The number of valence electrons (so properties are similar).', 'concept', 3),
    fc(22, 'What does the period number tell you?', 'The number of occupied shells.', 'concept', 3),
    fc(23, 'Group of an element with configuration 2, 8, 5?', 'Group 15 (period 3).', 'example', 3),
    fc(24, 'Elements in periods 1 to 7?', '2, 8, 8, 18, 18, 32, 32.', 'fact', 3),
    fc(25, 'Atomic size across a period?', 'Decreases: same shell, more nuclear charge.', 'concept', 3),
    fc(26, 'Atomic size down a group?', 'Increases: a new shell is added.', 'concept', 3),
    fc(27, 'Metallic character across a period and down a group?', 'Decreases across; increases down.', 'concept', 3),
    fc(28, 'Name four metalloids.', 'Any four: boron, silicon, germanium, arsenic, antimony, tellurium, polonium.', 'example', 3),
    fc(29, 'Nature of metal and non-metal oxides?', 'Metal oxides are basic; non-metal oxides are acidic.', 'fact', 3),
    fc(30, 'Exam tip: locating an element?', 'Write the configuration; shells → period; valence electrons → group (10 + v for 3 to 8).', 'exam-tip', 3),
    fc(31, 'Exam tip: explaining a trend?', 'Always add the reason: "same shell, more protons" or "a new shell is added".', 'exam-tip', 3),
  ],
  status: 'draft',
  provenance: PROV,
};
