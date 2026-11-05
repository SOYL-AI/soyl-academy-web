// ICSE 9 Chemistry ch09 notes and flashcards.
import { T, unit, PROV, table } from '../../icse-9-chemistry-ch01/src/lib.mjs';
import { V } from './decks.mjs';
import { TRIADS, mean, ANOM, PERIODS, place, SYM, NAME, cfg, MP, BP } from './calc.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas: [], visual, visuals, topic_ids: topics.map(T) });
const cap = (s) => s[0].toUpperCase() + s.slice(1);
const locRow = (s) => { const p = place(SYM[s]); return `| ${cap(NAME[s])} (${s}) | ${SYM[s]} | ${cfg(SYM[s])} | ${p.period} | ${p.group} |`; };
const triadRow = (k, label) => `| ${label} | ${TRIADS[k].map((e) => e[2]).join(', ')} | ${mean(k)} |`;

export const notes = {
  unit: unit(),
  version: 1,
  title: 'The Periodic Table — Notes',
  language: 'en',
  sections: [
    sec(
      "1. Early classifications: Dobereiner's triads and Newlands' law of octaves",
      `**Dobereiner's triads.** Dobereiner grouped elements in threes, called **triads**, with similar properties. When the three are arranged by atomic mass, the mass of the **middle** element is approximately the **mean** of the masses of the other two.

| Triad (first, middle, third) | Atomic masses | Mean of the first and third |
|---|---|---|
${triadRow('LiNaK', 'Lithium, sodium, potassium')}
${triadRow('CaSrBa', 'Calcium, strontium, barium')}
${triadRow('ClBrI', 'Chlorine, bromine, iodine')}
${triadRow('SSeTe', 'Sulphur, selenium, tellurium')}

The mean is close to, not always equal to, the middle mass. The numbers alone are not enough: the three elements must also behave alike (carbon, nitrogen and oxygen fit the arithmetic but are unlike). Only a few triads could be found, which limited the idea.

**Newlands' law of octaves.** Newlands arranged the elements in the order of **increasing atomic mass** and found that **every eighth element has properties similar to the first**, like the eighth note of a musical scale. Counting lithium as the first, the eighth is sodium; from sodium it is potassium; from fluorine it is chlorine.

**Limitations:** the law held good only up to **calcium**; elements with unlike properties were put in the same column; there was no place for elements discovered later, such as the noble gases.`,
      [kt("Dobereiner's triad", 'A group of three elements with similar properties in which the atomic mass of the middle element is about the mean of the other two.'), kt("Newlands' law of octaves", 'When elements are arranged in order of increasing atomic mass, every eighth element has properties similar to the first.')],
      V.triad,
      [1],
      [V.newlands],
    ),
    sec(
      "2. Mendeleev's periodic law",
      `**Mendeleev's periodic law:** the **properties of elements are a periodic function of their atomic masses**.

He arranged the elements in **groups** (vertical columns, I to VIII) and **periods** (horizontal rows), left **gaps** for elements not yet discovered and predicted their properties.

**Merits**
- Gaps were left and properties predicted: **eka-aluminium** was discovered as **gallium** and **eka-silicon** as **germanium**, with properties close to those predicted.
- The atomic masses of some elements were corrected to fit.
- Elements of a group have similar properties, and the group number helped to predict valency.

**Limitations**
- **Hydrogen** could not be given a fixed place (it resembles both group 1 and group 17).
- Some elements were placed **out of the order of atomic mass**, for example tellurium (${ANOM[0].m1}) before iodine (${ANOM[0].m2}), cobalt (${ANOM[2].m1}) before nickel (${ANOM[2].m2}); argon (${ANOM[1].m1}) is placed before potassium (${ANOM[1].m2}) in the modern order.
- There was **no separate place for isotopes**, which have different atomic masses but the same properties.
- The noble gases, found later, had no place.

Atomic masses are rounded; books quote slightly different values and some give a different number of predicted elements.`,
      [kt("Mendeleev's periodic law", 'The properties of elements are a periodic function of their atomic masses.')],
      table(['Merit', 'Limitation'], [['Gaps predicted gallium and germanium', 'Hydrogen had no fixed place'], ['Some atomic masses corrected', 'Elements out of order of atomic mass'], ['Similar elements in a group', 'No place for isotopes']], "Table of merits and limitations of Mendeleev's table"),
      [2],
    ),
    sec(
      '3. Atomic number and the modern periodic law',
      `Moseley (1913) showed that the **atomic number**, the number of protons, is the fundamental property of an element.

**Modern periodic law:** the **properties of elements are a periodic function of their atomic numbers**.

Arranging the elements by atomic number removes the anomalies of Mendeleev's table:
- tellurium (${ANOM[0].z1}) comes before iodine (${ANOM[0].z2}), and argon (${ANOM[1].z1}) before potassium (${ANOM[1].z2}), even though the heavier element comes first in mass;
- **isotopes** of an element have the same atomic number, so they occupy the **same position**;
- the order of the elements is no longer affected by errors in atomic mass.`,
      [kt('Modern periodic law', 'The properties of elements are a periodic function of their atomic numbers.')],
      table(['Pair', 'Atomic masses', 'Atomic numbers'], [['Tellurium, iodine', `${ANOM[0].m1}, ${ANOM[0].m2}`, `${ANOM[0].z1}, ${ANOM[0].z2}`], ['Argon, potassium', `${ANOM[1].m1}, ${ANOM[1].m2}`, `${ANOM[1].z1}, ${ANOM[1].z2}`]], 'Table of two pairs of elements out of order of atomic mass but in order of atomic number'),
      [3],
    ),
    sec(
      '4. The modern periodic table',
      `The modern table has **18 groups** (vertical columns) and **7 periods** (horizontal rows).

- **Period** = the number of shells in the atom. The periods have ${PERIODS.join(', ')} elements (118 in all; period 7 is completed by recently made elements).
- **Group**: elements of a group have the same number of **valence (outer) electrons**. Groups 1 and 2: group number = outer electrons. Groups 13 to 18: group number = 10 + outer electrons. Helium (2 outer electrons) is in group 18.

| Element | Atomic number | Configuration | Period | Group |
|---|---|---|---|---|
${['Li', 'Be', 'C', 'Na', 'Al', 'S', 'Ar', 'K', 'Ca'].map(locRow).join('\n')}

- **Transition elements** are in **groups 3 to 12** (periods 4 to 7).
- **Inner transition elements** (the lanthanides and the actinides, 14 elements in each of the two rows) are placed in **two rows below** the main table, to keep it from becoming too wide. Books differ slightly on which elements to count in each row.
- Groups 1 and 2 and groups 13 to 18 are the main-group elements.`,
      [kt('Period', 'A horizontal row of the periodic table; its number is the number of shells in the atoms.'), kt('Group', 'A vertical column of the periodic table; atoms in a group have the same number of valence electrons.')],
      V.table,
      [4],
    ),
    sec(
      '5. Groups 1, 2, 17 and 18',
      `Common properties follow from the number of valence electrons.

| Group | Name | Valence electrons | Ion formed | Trend down the group |
|---|---|---|---|---|
| 1 | Alkali metals (Li, Na, K, Rb, Cs) | 1 | M⁺ | Reactivity increases; melting point falls |
| 2 | Alkaline earth metals (Be, Mg, Ca, Sr, Ba) | 2 | M²⁺ | Reactivity increases |
| 17 | Halogens (F, Cl, Br, I) | 7 | X⁻ | Reactivity decreases; boiling point rises |
| 18 | Noble gases (He, Ne, Ar, Kr, Xe) | 2 for He, 8 for the rest | none | Inert; boiling point rises |

- **Alkali metals** are soft, very reactive and stored under oil; they react with water to give hydrogen and an alkaline solution. Approximate melting points (°C): ${MP.map(([n, t]) => `${n.toLowerCase()} ${t}`).join(', ')}.
- **Alkaline earth metals** are harder and less reactive than the alkali metals of the same period.
- **Halogens** exist as two-atom molecules: fluorine (pale yellow gas), chlorine (greenish-yellow gas), bromine (reddish-brown liquid), iodine (dark grey solid giving violet vapour). Approximate boiling points (°C): ${BP.map(([n, t]) => `${n.toLowerCase()} ${t}`).join(', ')}.
- **Noble gases** have a full outer shell, exist as single atoms and are inert. Uses: helium for balloons, neon for signs, argon for electric bulbs.

The values are approximate and books differ in the last digit.`,
      [kt('Alkali metals', 'The elements of group 1: lithium, sodium, potassium and the others.'), kt('Halogens', 'The elements of group 17: fluorine, chlorine, bromine and iodine.'), kt('Noble gases', 'The elements of group 18, with a full outer shell and very little chemical reactivity.')],
      V.alkali,
      [5],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Saying a triad needs only the mean to work: the properties must also be similar.
- Saying Newlands or Mendeleev used atomic numbers: they used atomic masses.
- Writing the modern periodic law with atomic mass.
- Giving the group of aluminium as 3 instead of 13, or sulphur as 6 instead of 16.
- Forgetting that helium has 2 outer electrons.
- Saying the halogens lose an electron, or that reactivity of the halogens increases down the group.

**How marks are usually awarded**
- 1 mark: a law, a period or group number, or a name.
- 2 marks: a triad calculation with a conclusion, two merits or two limitations, a configuration with the position.
- 3 marks: positions of three elements; properties of a group related to valence electrons.
- 10-mark structured question: a data table or lettered table outline with parts of 2 to 4 marks: calculations of means, laws, positions, group trends.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, "State Dobereiner's law of triads.", 'In a group of three similar elements arranged by atomic mass, the middle mass is about the mean of the other two.', 'definition', 1),
    fc(2, 'Triad: lithium, sodium, potassium?', 'Masses 7, 23, 39; mean of 7 and 39 is 23.', 'example', 1),
    fc(3, 'Triad: chlorine, bromine, iodine?', 'Masses 35.5, 80, 127; mean of the outer two is 81.25, close to 80.', 'example', 1),
    fc(4, 'Why is the mean alone not enough to show a triad?', 'The three elements must also have similar properties.', 'concept', 1),
    fc(5, "State Newlands' law of octaves.", 'When elements are arranged by increasing atomic mass, every eighth element has properties like the first.', 'definition', 1),
    fc(6, "Eighth element from lithium and from sodium (Newlands)?", 'Sodium and potassium.', 'example', 1),
    fc(7, "Limitations of Newlands' law?", 'Held only up to calcium; unlike elements in a column; no place for the noble gases.', 'concept', 1),
    fc(8, "State Mendeleev's periodic law.", 'Properties of elements are a periodic function of their atomic masses.', 'definition', 2),
    fc(9, "Merits of Mendeleev's table?", 'Gaps predicted gallium and germanium; some masses corrected; similar elements grouped.', 'concept', 2),
    fc(10, 'What are eka-aluminium and eka-silicon?', 'Elements predicted by Mendeleev, later found as gallium and germanium.', 'fact', 2),
    fc(11, "Limitations of Mendeleev's table?", 'Hydrogen had no fixed place; elements out of mass order; no place for isotopes or noble gases.', 'concept', 2),
    fc(12, 'Which pair is out of order of atomic mass: Te and I?', 'Te 127.6 comes before I 126.9, yet Te is heavier.', 'example', 2),
    fc(13, 'State the modern periodic law.', 'Properties of elements are a periodic function of their atomic numbers.', 'definition', 3),
    fc(14, 'Who showed the importance of atomic number?', 'Moseley.', 'fact', 3),
    fc(15, 'How did atomic number remove anomalies?', 'Te (52) comes before I (53); isotopes share one place.', 'concept', 3),
    fc(16, 'Groups and periods in the modern table?', '18 groups and 7 periods.', 'fact', 4),
    fc(17, 'Number of elements in periods 1 to 7?', '2, 8, 8, 18, 18, 32, 32.', 'fact', 4),
    fc(18, 'How do you find the period?', 'It equals the number of shells.', 'concept', 4),
    fc(19, 'How do you find the group?', 'Groups 1 and 2: outer electrons. Groups 13 to 18: 10 plus the outer electrons.', 'concept', 4),
    fc(20, 'Position of the element with configuration 2, 8, 3?', 'Period 3, group 13 (aluminium).', 'example', 4),
    fc(21, 'Where are transition elements?', 'Groups 3 to 12.', 'fact', 4),
    fc(22, 'Where are inner transition elements?', 'Two rows set below the main table (14 in each row).', 'fact', 4),
    fc(23, 'Group 1: name, valence electrons, ion?', 'Alkali metals; 1 valence electron; M⁺.', 'fact', 5),
    fc(24, 'Reactivity trend down group 1?', 'Increases; the outer electron is lost more easily.', 'concept', 5),
    fc(25, 'Group 2: name, valence electrons, ion?', 'Alkaline earth metals; 2 valence electrons; M²⁺.', 'fact', 5),
    fc(26, 'Group 17: name, valence electrons, ion?', 'Halogens; 7 valence electrons; X⁻.', 'fact', 5),
    fc(27, 'States of the halogens at room temperature?', 'Fluorine and chlorine gases; bromine liquid; iodine solid.', 'fact', 5),
    fc(28, 'Reactivity trend down group 17?', 'Decreases.', 'concept', 5),
    fc(29, 'Why are noble gases inert?', 'Full outer shell: duplet in helium, octet in the others.', 'concept', 5),
    fc(30, 'Exam tip: group of an atom with 3 outer electrons?', 'Group 13, not group 3.', 'exam-tip', 4),
  ],
  status: 'draft',
  provenance: PROV,
};
