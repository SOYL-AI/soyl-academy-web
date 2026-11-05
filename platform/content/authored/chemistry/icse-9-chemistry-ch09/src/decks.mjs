// ICSE 9 Chemistry ch09 The Periodic Table — Part 1 (t01–t03: Dobereiner, Newlands, Mendeleev, atomic number),
// Part 2 (t04–t05: the modern table, groups 1, 2, 17 and 18).
import { sl, deck, table, flow, svgV, r } from '../../icse-9-chemistry-ch01/src/lib.mjs';
import { TRIAD, NEWLANDS, TABLE, ALKALI } from './svgs.mjs';
import { TRIADS, mean, gap, ANOM, TE_I, PERIODS, place, SYM, cfg } from './calc.mjs';

export const V = {
  triad: svgV(TRIAD, "Dobereiner's triads of lithium, sodium and potassium and of chlorine, bromine and iodine"),
  newlands: svgV(NEWLANDS, "Newlands' arrangement of elements in rows of seven"),
  table: svgV(TABLE, 'The modern periodic table in outline with the first twenty elements'),
  alkali: svgV(ALKALI, 'Bar chart of the melting points of the alkali metals'),
};
const T = (k) => TRIADS[k];

export const deck1 = deck({
  part: 1,
  title: 'The Periodic Table — Part 1: Early classifications and the periodic law',
  goals: [
    "Show that a given set of elements forms a Dobereiner triad and state Newlands' law of octaves with one limitation",
    "State Mendeleev's periodic law with its merits and limitations",
    'Explain how the use of atomic number removed the anomalies of Mendeleev\'s table',
  ],
  slides: [
    sl('title', 'Sorting the elements', {
      b: 'Part 1 — as more elements were found, scientists looked for **patterns** that would sort them into families.',
      v: flow('LR', [['a', 'Dobereiner: triads'], ['b', 'Newlands: octaves'], ['c', 'Mendeleev: periodic law'], ['d', 'Moseley: atomic number']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Flow of four steps in the history of the periodic table'),
      n: 'Chemists found more and more elements and wanted to sort them. We follow four steps: triads, octaves, the periodic law of Mendeleev, and finally the use of atomic number.',
    }),
    sl('concept', "Dobereiner's triads", {
      b: 'A **triad** is a group of **three elements with similar properties**. When they are arranged by atomic mass, the mass of the **middle** element is about the **mean** of the other two.',
      v: table(['Triad', 'First', 'Middle', 'Third', 'Mean of first and third'], [['Lithium, sodium, potassium', '7', '23', '39', `${mean('LiNaK')}`], ['Chlorine, bromine, iodine', '35.5', '80', '127', `${mean('ClBrI')}`]], 'Table of two Dobereiner triads with the mean of the first and third atomic masses'),
      n: 'Dobereiner noticed groups of three elements that behave alike. In each group the middle element has an atomic mass close to the average of the other two. Lithium, sodium and potassium form such a triad, and so do chlorine, bromine and iodine.',
    }),
    sl('diagram', 'Two triads in numbers', {
      v: V.triad,
      n: 'Here are two triads. Add the masses of lithium and potassium and halve the result to get twenty three, exactly the mass of sodium. For chlorine and iodine the mean is about eighty one, close to the eighty of bromine.',
    }),
    sl('example', 'Worked example 1: is it a triad?', {
      b: r`**Problem.** The atomic masses of calcium, strontium and barium are ${T('CaSrBa')[0][2]}, ${T('CaSrBa')[1][2]} and ${T('CaSrBa')[2][2]}. Do they form a Dobereiner triad?

**Step 1.** Mean of the first and third: $(${T('CaSrBa')[0][2]} + ${T('CaSrBa')[2][2]}) \div 2 = ${mean('CaSrBa')}$.

**Step 2.** Compare with the middle element: ${T('CaSrBa')[1][2]}. The difference is only **${gap('CaSrBa')}**.

**Step 3.** The three elements also have similar properties, so they **form a triad**.`,
      v: table(['Quantity', 'Value'], [['Mean of calcium and barium', `${mean('CaSrBa')}`], ['Mass of strontium', `${T('CaSrBa')[1][2]}`], ['Difference', `${gap('CaSrBa')}`]], 'Table comparing the mean mass with the mass of strontium'),
      n: 'Add the masses of calcium and barium and divide by two. The mean is eighty eight and a half, which is very close to strontium at eighty eight. The three metals also behave alike, so they form a triad.',
    }),
    sl('check', 'Quick check: a triad', {
      b: 'Both the numbers and the properties matter.',
      v: table(['Element', 'Atomic mass'], [['Sulphur', '32'], ['Selenium', '79'], ['Tellurium', '128']], 'Atomic masses of sulphur, selenium and tellurium'),
      chk: 'chk-triad',
      n: 'Sulphur, selenium and tellurium have similar properties. Which statement about their atomic masses supports a triad?',
    }),
    sl('concept', "Newlands' law of octaves", {
      b: 'Newlands arranged the elements in the order of **increasing atomic mass**. He found that **every eighth element** had properties like the first, like the notes of a musical scale.',
      v: table(['Start', 'Counting the start as the first', 'Eighth element'], [['Lithium', 'Li, Be, B, C, N, O, F, Na', 'Sodium'], ['Sodium', 'Na, Mg, Al, Si, P, S, Cl, K', 'Potassium'], ['Fluorine', 'F, Na, Mg, Al, Si, P, S, Cl', 'Chlorine']], 'Table showing the eighth element in three counts in the law of octaves'),
      n: 'Newlands listed the elements by atomic mass. Starting at lithium and counting to the eighth element gives sodium, which is like lithium. Starting at sodium gives potassium, and starting at fluorine gives chlorine.',
    }),
    sl('diagram', "Newlands' arrangement", {
      v: V.newlands,
      n: 'Written in rows of seven, lithium, sodium and potassium fall in the same column, and so do fluorine and chlorine. The eighth element repeats the properties of the first.',
    }),
    sl('concept', "Limitations of Newlands' law", {
      b: 'The law worked only up to **calcium**. After that, elements did not repeat every eighth place.',
      v: table(['Limitation', 'Why'], [['Held good only up to calcium', 'Heavier elements did not show the repeating pattern'], ['Unlike elements were put together', 'Some columns had elements with different properties'], ['No room for new elements', 'Noble gases found later did not fit the octaves']], 'Table of three limitations of the law of octaves'),
      n: 'The law of octaves worked only up to calcium. Beyond that, elements with unlike properties were forced into the same column. There was also no room for new elements, such as the noble gases found later.',
    }),
    sl('check', "Quick check: Newlands' count", {
      b: 'Count the elements along the list.',
      v: table(['Start', 'Question'], [['Sodium', 'Which is the eighth element from it?']], 'Counting eight elements from sodium'),
      chk: 'chk-newlands',
      n: 'In the order of increasing atomic mass, which element is the eighth from sodium, counting sodium as the first?',
    }),
    sl('concept', "Mendeleev's periodic law", {
      b: 'The **properties of elements are a periodic function of their atomic masses**. Mendeleev arranged the elements in **groups** (vertical columns) and **periods** (horizontal rows).',
      v: table(['Feature', "Mendeleev's table"], [['Basis of arrangement', 'Increasing atomic mass'], ['Vertical columns', 'Groups I to VIII'], ['Horizontal rows', 'Periods'], ['Gaps', 'Left for elements not yet discovered']], "Table summarising the features of Mendeleev's periodic table"),
      n: 'Mendeleev stated that the properties of elements repeat at intervals when they are arranged by atomic mass. His table had groups going down and periods going across. Where no known element fitted, he left a gap.',
    }),
    sl('concept', 'Merits and limitations', {
      v: table(['Merits', 'Limitations'], [['Gaps predicted new elements: eka-aluminium (found as gallium) and eka-silicon (found as germanium)', 'Hydrogen could not be given a fixed place'], ['Atomic masses of some elements were corrected', 'Some elements were placed out of order of atomic mass'], ['Elements of a group had similar properties', 'No separate place for isotopes of an element'], ['The group number helped to predict the valency of an element', 'Noble gases had no place']], "Table of merits and limitations of Mendeleev's table"),
      n: 'Mendeleev left gaps and predicted the properties of the missing elements. Eka-aluminium was later found as gallium, and eka-silicon as germanium. But hydrogen had no fixed place, isotopes had no place, and some elements were out of order of atomic mass.',
    }),
    sl('example', 'Worked example 2: an element out of order', {
      b: r`**Problem.** Tellurium (atomic mass ${ANOM[0].m1}) is placed before iodine (${ANOM[0].m2}) in Mendeleev's table, although it is heavier. How can this be explained?

**Step 1.** Difference in mass: ${ANOM[0].m1} − ${ANOM[0].m2} = **${TE_I}**; tellurium is heavier.

**Step 2.** Mendeleev placed iodine after tellurium because iodine resembles chlorine and bromine, so the **order of atomic mass was broken**.

**Step 3.** Atomic numbers are ${ANOM[0].z1} and ${ANOM[0].z2}: arranged by atomic number the order is correct.`,
      v: table(['Element', 'Atomic mass', 'Atomic number'], [['Tellurium', `${ANOM[0].m1}`, `${ANOM[0].z1}`], ['Iodine', `${ANOM[0].m2}`, `${ANOM[0].z2}`]], 'Atomic mass and atomic number of tellurium and iodine'),
      n: 'Tellurium is slightly heavier than iodine, yet it comes before iodine in the table. This broke the rule of increasing atomic mass. Atomic numbers are fifty two and fifty three, and in that order the problem disappears.',
    }),
    sl('check', "Quick check: Mendeleev's gaps", {
      b: 'Why did he leave gaps?',
      v: table(['Feature', 'Reason?'], [['Gaps in the table', '?']], 'A feature of the periodic table of Mendeleev'),
      chk: 'chk-mend',
      n: 'Mendeleev left some gaps in his table. What was the reason?',
    }),
    sl('concept', 'Atomic number and the modern periodic law', {
      b: 'Moseley showed that the **atomic number** (number of protons) is the true basis. The **modern periodic law**: properties of elements are a periodic function of their **atomic numbers**.',
      v: table(['Pair', 'By atomic mass', 'By atomic number'], [['Tellurium, iodine', 'Out of order', 'Correct: 52 then 53'], ['Argon, potassium', 'Out of order', 'Correct: 18 then 19'], ['Isotopes of one element', 'Different places needed', 'One place: same atomic number']], 'Table showing how atomic number removes anomalies of the earlier table'),
      n: 'Moseley discovered that atomic number, not atomic mass, is the basis. Arranged by atomic number, tellurium and iodine, and argon and potassium, all fall in the right order. Isotopes have the same atomic number, so they share one place.',
    }),
    sl('check', 'Quick check: the modern law', {
      b: 'What do the elements follow now?',
      v: table(['Law', 'Basis'], [['Modern periodic law', '?']], 'The basis of the modern periodic law'),
      chk: 'chk-modern',
      n: 'On what basis are the elements arranged in the modern periodic law?',
    }),
    sl('summary', 'Summary: Part 1', {
      ul: [
        'Dobereiner: in a triad the middle mass is about the mean of the first and third.',
        'Newlands: every eighth element repeats; it worked only up to calcium.',
        'Mendeleev: properties are periodic functions of atomic masses; gaps predicted elements.',
        'Modern law: properties are periodic functions of atomic numbers; this removed the anomalies.',
      ],
      v: table(['Scientist', 'Basis', 'Key idea'], [['Dobereiner', 'Atomic mass', 'Triads'], ['Newlands', 'Atomic mass', 'Octaves'], ['Mendeleev', 'Atomic mass', 'Periodic law, gaps'], ['Moseley', 'Atomic number', 'Modern periodic law']], 'Summary table of four classifications of elements'),
      n: 'To sum up Part 1. Dobereiner found triads and Newlands found octaves. Mendeleev gave the periodic law and left gaps. Atomic number then replaced atomic mass as the basis, which solved the remaining anomalies.',
    }),
    sl('exam-tips', 'Exam tips: Part 1', {
      ul: [
        'Show the mean as a calculation and compare it with the middle mass.',
        'Say that a triad needs similar properties as well as the mean.',
        'Give two merits and two limitations when asked for them.',
        "Name the pair tellurium and iodine, or argon and potassium, to show an anomaly.",
      ],
      v: table(['Slip', 'Fix'], [['Saying Newlands used atomic numbers', 'He used atomic masses'], ['Saying Mendeleev knew the noble gases', 'They were not known; no place for them'], ['Writing the modern law with atomic mass', 'It is atomic number']], 'Table of three common slips in Part 1 and their fixes'),
      n: 'Exam tips. Work out the mean and compare it with the middle element. Remember that Newlands and Mendeleev used atomic mass, while the modern law uses atomic number. Give two merits and two limitations when asked.',
    }),
  ],
});

const rowOf = (s) => { const p = place(SYM[s]); return [s, cfg(SYM[s]), `${p.period}`, `${p.group}`]; };

export const deck2 = deck({
  part: 2,
  title: 'The Periodic Table — Part 2: The modern table and the groups',
  goals: [
    "Locate an element's group and period from its electronic configuration and identify the positions of transition and inner transition elements",
    'Relate the common properties of groups 1, 2, 17 and 18 to their valence electrons',
  ],
  slides: [
    sl('title', 'The modern table', {
      b: 'Part 2 — **18 groups** across and **7 periods** down. The position of an element tells you its electron arrangement.',
      v: flow('LR', [['a', 'Electronic configuration'], ['b', 'Number of shells: period'], ['c', 'Outer electrons: group'], ['d', 'Properties']], [['a', 'b'], ['a', 'c'], ['b', 'd'], ['c', 'd']], 'Flow from electronic configuration to period and group and then properties'),
      n: 'The modern table has eighteen groups across and seven periods down. If you know the electron arrangement of an atom, you can find its period and group, and then predict its properties.',
    }),
    sl('diagram', 'The table in outline', {
      b: 'The first 20 elements are named. Groups 1 and 2 are on the left, **transition elements** in groups 3 to 12, and groups 13 to 18 on the right.',
      v: V.table,
      n: 'Here is the table in outline. Groups one and two are on the left. The transition elements fill groups three to twelve. Groups thirteen to eighteen are on the right. Two rows of inner transition elements are set apart below the table.',
    }),
    sl('concept', 'Periods and groups', {
      v: table(['Period', 'Number of elements'], PERIODS.map((n, i) => [`${i + 1}`, `${n}`]), 'Table of the number of elements in each of the seven periods'),
      n: 'The periods are of different lengths: two, eight, eight, eighteen, eighteen, thirty two and thirty two elements. In all, they add up to one hundred and eighteen elements.',
    }),
    sl('concept', 'Finding the period and the group', {
      b: 'The **period** equals the **number of shells**. The **group** is the number of outer electrons for groups 1 and 2, and **10 + outer electrons** for 3 to 8 outer electrons (group 18 for a full shell).',
      v: table(['Atom', 'Configuration', 'Period', 'Group'], ['Na', 'Al', 'S', 'Ar', 'K'].map(rowOf), 'Table of period and group for five atoms from their configurations'),
      n: 'Count the shells for the period. For the group, use the outer electrons: one or two give group one or two, and three to eight outer electrons give group thirteen to eighteen. Sodium is in period three, group one. Sulphur is in period three, group sixteen.',
    }),
    sl('example', 'Worked example 1: locating an element', {
      b: r`**Problem.** An atom has atomic number 19. Find its period and group.

**Step 1.** Configuration: **${cfg(19)}**.

**Step 2.** Number of shells = **${place(19).period}**, so period **${place(19).period}**.

**Step 3.** Outer electrons = **${place(19).valence}**, so group **${place(19).group}**: an alkali metal (potassium).`,
      v: table(['Atomic number', 'Configuration', 'Period', 'Group'], [['19', cfg(19), `${place(19).period}`, `${place(19).group}`]], 'Period and group of the element of atomic number nineteen'),
      n: 'Write the configuration, two, eight, eight, one. There are four shells, so the period is four. There is one outer electron, so the group is one. This is potassium, an alkali metal.',
    }),
    sl('check', 'Quick check: period and group', {
      b: 'Shells give the period; outer electrons the group.',
      v: table(['Atom', 'Configuration'], [['Aluminium', '2, 8, 3']], 'Configuration of an aluminium atom'),
      chk: 'chk-locate',
      n: 'An aluminium atom has the configuration two, eight, three. In which period and group is it?',
    }),
    sl('concept', 'Transition and inner transition elements', {
      b: '**Transition elements** are in **groups 3 to 12** (periods 4 to 7). The **inner transition elements**, 14 in each of two rows, are set **below** the main table.',
      v: table(['Region', 'Where', 'Number of groups or elements'], [['Transition elements', 'Groups 3 to 12, periods 4 to 7', '10 groups'], ['Inner transition elements', 'Two rows below the table', '14 elements in each row']], 'Table of the positions of transition and inner transition elements'),
      n: 'Transition elements fill the middle of the table, in groups three to twelve. The inner transition elements are placed in two separate rows below the table, with fourteen elements in each row, to keep the table from becoming too wide.',
    }),
    sl('check', 'Quick check: where are they?', {
      b: 'Look at the outline of the table.',
      v: table(['Elements', 'Position?'], [['Inner transition elements', '?']], 'The position of the inner transition elements'),
      chk: 'chk-trans',
      n: 'Where are the inner transition elements placed in the modern periodic table?',
    }),
    sl('concept', 'Group 1: the alkali metals', {
      b: 'Lithium, sodium, potassium and others have **one valence electron**, which they lose to form **M⁺** ions. They are soft, reactive metals, and **reactivity increases down the group**.',
      v: table(['Property', 'Group 1'], [['Valence electrons', '1'], ['Ion formed', 'M⁺ (loses one electron)'], ['Reaction with water', 'Give hydrogen and an alkaline solution; more vigorous down the group'], ['Storage', 'Under oil, as they react with air and water']], 'Table of the properties of the alkali metals'),
      n: 'The alkali metals have one electron in the outermost shell and lose it easily. They are soft and very reactive, and they are stored under oil. The further down the group, the easier it is to lose the outer electron, so reactivity increases.',
    }),
    sl('diagram', 'A trend in group 1', {
      v: V.alkali,
      n: 'The melting points of the alkali metals fall down the group. Lithium melts at a much higher temperature than potassium, rubidium or caesium. All of them are low for metals.',
    }),
    sl('concept', 'Group 2: the alkaline earth metals', {
      v: table(['Property', 'Group 2'], [['Members', 'Beryllium, magnesium, calcium, strontium, barium'], ['Valence electrons', '2'], ['Ion formed', 'M²⁺ (loses two electrons)'], ['Reactivity', 'Reactive, but less than group 1; increases down the group']], 'Table of the properties of the alkaline earth metals'),
      n: 'Group two metals have two outer electrons. They lose both and form ions with two positive charges. They are reactive, but less so than the group one metal in the same period.',
    }),
    sl('example', 'Worked example 2: from configuration to properties', {
      b: r`**Problem.** Element X has the configuration 2, 8, 8, 2. State its group and period, the ion it forms and its reactivity compared with magnesium.

**Step 1.** 4 shells and 2 outer electrons: **period 4, group 2**.

**Step 2.** It loses 2 electrons: ion **X²⁺**.

**Step 3.** It is below magnesium in group 2, so it is **more reactive** than magnesium. (X is calcium.)`,
      v: table(['Property', 'Element X'], [['Period and group', '4 and 2'], ['Ion', 'X²⁺'], ['Reactivity', 'Greater than magnesium']], 'Table of the position and properties of element X'),
      n: 'Four shells give period four and two outer electrons give group two. The element loses two electrons to form an ion with a charge of two plus. It lies below magnesium, so it is more reactive. It is calcium.',
    }),
    sl('concept', 'Group 17: the halogens', {
      b: 'Fluorine, chlorine, bromine and iodine have **seven valence electrons** and gain one to form **X⁻** ions. They exist as **two-atom molecules** and **reactivity decreases down the group**.',
      v: table(['Halogen', 'State at room temperature', 'Colour'], [['Fluorine', 'Gas', 'Pale yellow'], ['Chlorine', 'Gas', 'Greenish yellow'], ['Bromine', 'Liquid', 'Reddish brown'], ['Iodine', 'Solid', 'Dark grey (violet vapour)']], 'Table of the state and colour of the four halogens at room temperature'),
      n: 'The halogens have seven outer electrons and gain one to form negative ions. Fluorine and chlorine are gases, bromine is a liquid and iodine is a solid. The ability to gain an electron, and so the reactivity, decreases down the group.',
    }),
    sl('concept', 'Group 18: the noble gases', {
      b: 'Helium, neon, argon, krypton, xenon and radon have a **full outer shell**: a duplet for helium and an octet for the rest. They are **inert, single-atom gases**.',
      v: table(['Noble gas', 'Configuration', 'Use'], [['Helium', '2', 'Filling weather balloons'], ['Neon', '2, 8', 'Advertising signs'], ['Argon', '2, 8, 8', 'Filling electric bulbs']], 'Table of three noble gases with their configurations and uses'),
      n: 'Noble gases already have full outer shells, so they do not gain, lose or share electrons. That is why they are inert. They exist as single atoms. Helium fills balloons, neon lights signs and argon fills electric bulbs.',
    }),
    sl('check', 'Quick check: a halogen', {
      b: 'Think about the outer shell of the halogens.',
      v: table(['Element', 'Configuration'], [['Chlorine', '2, 8, 7']], 'Configuration of a chlorine atom'),
      chk: 'chk-halogen',
      n: 'A chlorine atom has seven outer electrons. What ion does it form, and in which group is it?',
    }),
    sl('summary', 'Summary: Part 2', {
      ul: [
        'Period = number of shells; group = from the outer electrons.',
        'Transition elements: groups 3 to 12; inner transition elements: two rows below the table.',
        'Group 1: 1 valence electron, M⁺; group 2: 2, M²⁺; group 17: 7, X⁻; group 18: full shell, inert.',
        'Reactivity increases down groups 1 and 2 and decreases down group 17.',
      ],
      v: table(['Group', 'Valence electrons', 'Ion', 'Reactivity down the group'], [['1 alkali metals', '1', 'M⁺', 'Increases'], ['2 alkaline earth metals', '2', 'M²⁺', 'Increases'], ['17 halogens', '7', 'X⁻', 'Decreases'], ['18 noble gases', '8 (2 for helium)', 'None', 'Inert']], 'Summary table of four groups of the periodic table'),
      n: 'To sum up Part 2. The period is the number of shells and the group comes from the outer electrons. Groups one and two lose electrons, group seventeen gains one, and group eighteen is inert. The valence electrons explain the properties of each group.',
    }),
    sl('exam-tips', 'Exam tips: Part 2', {
      ul: [
        'Write the configuration first, then count shells and outer electrons.',
        'Relate every property of a group to its valence electrons.',
        'Say that helium has two outer electrons while the other noble gases have eight.',
        'Do not place the inner transition elements in a main group.',
      ],
      v: table(['Slip', 'Fix'], [['Giving aluminium as group 3', 'Three outer electrons: group 13'], ['Saying all noble gases have 8 outer electrons', 'Helium has 2'], ['Saying halogens lose an electron', 'They gain one to form X⁻']], 'Table of three common slips in Part 2 and their fixes'),
      n: 'Exam tips. Write the configuration before counting shells and outer electrons. Link every group property to valence electrons. Remember that helium has two outer electrons, and that halogens gain, not lose, one electron.',
    }),
  ],
});
