// ch14 Periodic Classification of Elements — two decks: Part 1 (t01–t02) early attempts and Mendeléev; Part 2 (t03) the modern periodic table and trends.
import { sl, deck, table, flow, svgV, plot, r } from '../../cbse-10-science-ch06/src/lib.mjs';
import { LAYOUT, TABLE20, TRENDS, GROUP1, NACL } from './svgs.mjs';

export const V = {
  layout: svgV(LAYOUT, 'Outline of the modern periodic table with 18 groups and 7 periods, transition elements in groups 3 to 12, lanthanoid and actinoid rows below, and metals, metalloids and non-metals shaded', 'Hydrogen sits in group 1 but is a non-metal; it is a special case.'),
  table20: svgV(TABLE20, 'The first twenty elements, hydrogen to calcium, placed in their periods and groups, shaded as metals, metalloids, non-metals and noble gases'),
  trends: svgV(TRENDS, 'A grid standing for the periodic table with an arrow across the top showing atomic size and metallic character decreasing from left to right, and an arrow down the side showing them increasing down a group'),
  group1: svgV(GROUP1, 'Shell diagrams of lithium, sodium and potassium with two, three and four shells and one outer electron each', 'Measured atomic radii: lithium 152 pm, sodium 186 pm, potassium 231 pm.'),
  nacl: svgV(NACL, 'Shell diagrams of sodium and chlorine: both have three shells, but chlorine, with more protons, is drawn smaller', 'Atomic radius: sodium 186 pm, chlorine 99 pm.'),
};

export const triadTable = table(
  ['Triad', 'Atomic masses (u)', 'Mean of first and third', 'Middle element'],
  [['Lithium, sodium, potassium', '6.9, 23.0, 39.1', '23.0', 'Sodium 23.0'], ['Calcium, strontium, barium', '40.1, 87.6, 137.3', '88.7', 'Strontium 87.6'], ['Chlorine, bromine, iodine', '35.5, 79.9, 126.9', '81.2', 'Bromine 79.9']],
  'Table of three Döbereiner triads showing that the atomic mass of the middle element is close to the mean of the other two',
  'Atomic masses are modern values, rounded to one decimal place.',
);
export const newlandsTable = table(
  ['sa (do)', 're', 'ga', 'ma', 'pa', 'dha', 'ni'],
  [['H', 'Li', 'Be', 'B', 'C', 'N', 'O'], ['F', 'Na', 'Mg', 'Al', 'Si', 'P', 'S'], ['Cl', 'K', 'Ca', '…', '…', '…', '…']],
  'The lighter elements in Newlands’ order, seven to a row like the notes of a musical scale, so that lithium, sodium and potassium fall in one column and fluorine and chlorine in another',
  'Every eighth element repeats the properties of the first, like the eighth note of a scale.',
);
export const mendeleevTable = table(
  ['Group', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII'],
  [['Oxide', 'R₂O', 'RO', 'R₂O₃', 'RO₂', 'R₂O₅', 'RO₃', 'R₂O₇'], ['Hydride', 'RH', 'RH₂', 'RH₃', 'RH₄', 'RH₃', 'RH₂', 'RH'], ['Example', 'Na', 'Mg', 'Al', 'Si', 'P', 'S', 'Cl']],
  'Part of Mendeléev’s scheme: groups one to seven with the general formulas of their oxides and hydrides, and one example element in each',
  'R stands for any element of the group. Group VIII (iron, cobalt, nickel and others) is left out here.',
);
export const galliumTable = table(
  ['Property', 'Predicted for eka-aluminium (1871)', 'Found for gallium (1875)'],
  [['Atomic mass', 'About 68 u', '69.7 u'], ['Formula of oxide', 'E₂O₃', 'Ga₂O₃'], ['Formula of chloride', 'ECl₃', 'GaCl₃']],
  'Table comparing Mendeléev’s predictions for eka-aluminium with the properties later measured for gallium: atomic mass about 68 against 69.7, and oxide and chloride formulas matching',
);
export const radiusPlot = plot(
  {
    x: { min: 10, max: 18, label: 'Atomic number (period 3: sodium to chlorine)' },
    y: { min: 80, max: 200, label: 'Atomic radius (pm)' },
    series: [{ label: 'Period 3', kind: 'line', points: [[11, 186], [12, 160], [13, 143], [14, 117], [15, 110], [16, 104], [17, 99]] }],
  },
  'Line graph of atomic radius against atomic number for period 3, falling from 186 picometres for sodium through 160, 143, 117, 110 and 104 to 99 picometres for chlorine',
  'One picometre (pm) is a millionth of a millionth of a metre. Values are typical measured radii.',
);
export const configTable = table(
  ['Element', 'Atomic number', 'Shells', 'Valence electrons', 'Period', 'Group'],
  [['Lithium', '3', '2, 1', '1', '2', '1'], ['Sodium', '11', '2, 8, 1', '1', '3', '1'], ['Potassium', '19', '2, 8, 8, 1', '1', '4', '1'], ['Fluorine', '9', '2, 7', '7', '2', '17'], ['Chlorine', '17', '2, 8, 7', '7', '3', '17']],
  'Table of the electronic configurations of lithium, sodium, potassium, fluorine and chlorine with their valence electrons, periods and groups',
);
export const valencyTable = table(
  ['Element', 'Na', 'Mg', 'Al', 'Si', 'P', 'S', 'Cl', 'Ar'],
  [['Valence electrons', '1', '2', '3', '4', '5', '6', '7', '8'], ['Valency', '1', '2', '3', '4', '3', '2', '1', '0']],
  'Table of valence electrons and valency across period 3: valency rises from 1 to 4 and then falls back to 0 at argon',
  'Valency = valence electrons (up to 4), or 8 minus valence electrons (from 5 to 8).',
);

export const deck1 = deck({
  part: 1,
  title: 'Periodic Classification of Elements — Part 1: Early attempts and Mendeléev’s table',
  goals: [
    'Explain why scientists looked for a way to classify elements',
    'Explain Döbereiner’s triads and Newlands’ law of octaves, with their limitations',
    'Describe the basis of Mendeléev’s periodic table',
    'State the achievements and limitations of Mendeléev’s table',
  ],
  slides: [
    sl('title', 'Periodic Classification of Elements', {
      b: 'Part 1 — how chemists turned a growing list of elements into an orderly table, one attempt at a time. (This chapter is assessed through school-based activities and projects, not the board theory paper.)',
      v: flow('LR', [['e', 'Many elements found'], ['p', 'Look for patterns'], ['g', 'Group similar elements'], ['t', 'A table that predicts']], [['e', 'p'], ['p', 'g'], ['g', 't']], 'Flow from many known elements to patterns, groups and finally a table that can predict'),
      n: 'Namaste! Imagine a library where thousands of books are piled in a heap. Finding anything would be hopeless. Chemists in the nineteenth century faced a similar heap: dozens of elements, each with its own properties. In this lesson we follow three clever attempts to sort them, and see how the last one could even predict elements nobody had yet found.',
    }),
    sl('concept', 'Why classify elements?', {
      b: 'By the early 1800s, dozens of elements were known, and new ones kept being discovered. Sorting **similar elements together** makes their properties easier to study, remember and **predict**. Today **118 elements** are known.',
      v: table(['Without an arrangement', 'With an arrangement'], [['Each element studied separately', 'Study one element, learn about its whole family'], ['No way to guess unknown properties', 'Properties can be predicted from position'], ['New discoveries do not fit anywhere', 'New elements slot into a place']], 'Table contrasting studying elements one by one with studying them in an orderly arrangement'),
      n: 'Think of how a grocery shop keeps all the pulses on one shelf and all the spices on another. Once you know where one packet of dal is, you know where to find the rest. Chemists wanted the same thing for elements: put similar elements together, so that learning one tells you about its relatives.',
    }),
    sl('concept', 'Döbereiner’s triads', {
      b: 'In the early 1800s, the German chemist **Johann Döbereiner** noticed groups of **three** elements with similar properties. Arranged by increasing atomic mass, the **middle element’s atomic mass was close to the average** of the other two. He called these groups **triads**.',
      v: triadTable,
      n: 'Döbereiner spotted something neat. Lithium, sodium and potassium are all soft, very reactive metals. Write their atomic masses in order, and the middle one, sodium, is almost exactly halfway between the other two. The same trick worked for calcium, strontium and barium, and for chlorine, bromine and iodine. A triad was a family of three.',
    }),
    sl('example', 'Worked example 1: testing a triad', {
      b: 'Calcium (40.1 u), strontium (87.6 u) and barium (137.3 u) are similar reactive metals. Do they form a Döbereiner triad?',
      ul: [
        r`Step 1 — Mean of the first and third: $\dfrac{40.1 + 137.3}{2} = \dfrac{177.4}{2} = 88.7$ u.`,
        'Step 2 — Atomic mass of the middle element, strontium: 87.6 u.',
        r`Step 3 — Difference: $88.7 - 87.6 = 1.1$ u, which is small compared with the masses.`,
        'Conclusion — the three are similar and the middle mass is close to the mean, so they form a triad.',
      ],
      v: table(['Quantity', 'Value (u)'], [['Calcium', '40.1'], ['Barium', '137.3'], ['Mean of the two', '88.7'], ['Strontium (middle)', '87.6']], 'Worked table: the mean of calcium and barium, 88.7, is close to strontium’s 87.6'),
      n: 'To test a triad, check two things. First, are the three elements alike in their chemistry? Here they are. Second, add the masses of the lightest and the heaviest and halve the total. That gives eighty-eight point seven, very close to strontium’s eighty-seven point six. So this is a triad. Always state both checks in your answer.',
    }),
    sl('concept', 'Where triads fell short', {
      b: 'Döbereiner’s idea was the **first** sign of a pattern linking atomic mass and properties, but it could not classify most elements.',
      v: table(['Achievement', 'Limitation'], [['First link between atomic mass and properties', 'Only a few triads were found'], ['Grouped some clearly similar elements', 'Most known elements did not fit into any triad'], ['Showed that elements form families', 'Some similar groups, such as nitrogen and phosphorus with arsenic, failed the mass rule']], 'Table of the achievements and limitations of Döbereiner’s triads'),
      n: 'Triads were a brilliant first clue, but a clue is not a system. Most elements simply did not belong to any neat set of three. Nitrogen, phosphorus and arsenic, for example, are related, yet the middle mass is far from the average. Chemists needed an arrangement that took in every element, not just a handful.',
    }),
    sl('check', 'Quick check: predict a mass', {
      b: 'Use Döbereiner’s rule to predict the atomic mass of sodium from those of lithium and potassium.',
      n: 'Your turn. Take the mean of the two outer masses in the triad.',
      chk: 'triad-mean-num',
    }),
    sl('concept', 'Newlands’ law of octaves', {
      b: 'In **1866**, the English chemist **John Newlands** listed the known elements in order of **increasing atomic mass**. He found that **every eighth element** had properties similar to the first, just as the eighth note of a musical scale repeats the first. He called this the **law of octaves**.',
      v: newlandsTable,
      n: 'Newlands lined up the elements by mass and noticed a rhythm. Start at lithium and count: lithium is one, beryllium two, and so on until sodium, the eighth, which behaves very like lithium. Musicians know this pattern. In Indian music, sa, re, ga, ma, pa, dha, ni brings you back to sa, one octave higher.',
    }),
    sl('diagram', 'Every eighth element repeats', {
      b: 'In Newlands’ order, **lithium, sodium and potassium** fall in one column, and **fluorine and chlorine** in another. For the **lighter elements**, the octaves group true families together.',
      v: flow('LR', [['li', 'Lithium (1st)'], ['na', 'Sodium (8th from lithium)'], ['k', 'Potassium (8th from sodium)'], ['s', 'Same family: soft, reactive metals']], [['li', 'na', 'seven steps on'], ['na', 'k', 'seven steps on'], ['k', 's']], 'Flow showing lithium, sodium and potassium each eight places apart in Newlands’ list and belonging to one family'),
      n: 'Here is the octave pattern at work. Count eight from lithium, and you land on sodium. Count eight from sodium, and you land on potassium. All three are soft metals that react fiercely with water. For the light elements, Newlands’ rule really did bring families together.',
    }),
    sl('concept', 'Where the octaves broke down', {
      b: 'The law of octaves worked well only **up to calcium**. Among heavier elements, the pattern failed.',
      v: table(['Limitation', 'What went wrong'], [['Worked only up to calcium', 'Beyond calcium, every eighth element did not resemble the first'], ['Assumed no new elements would be found', 'Later discoveries could not be fitted in'], ['Two elements forced into one place', 'Cobalt and nickel were placed together, in the same column as fluorine, chlorine and bromine'], ['Unlike elements grouped together', 'Iron was placed far away from cobalt and nickel, which resemble it']], 'Table of four limitations of Newlands’ law of octaves'),
      n: 'Newlands squeezed the heavier elements into his octaves, and the families fell apart. Cobalt and nickel, two metals, ended up in the same column as reactive non-metals such as chlorine. Iron, so similar to cobalt and nickel, landed somewhere else. And when the noble gases were discovered decades later, they had no place at all.',
    }),
    sl('check', 'Quick check: counting octaves', {
      b: 'In Newlands’ arrangement, which element is the eighth counting from lithium?',
      n: 'Quick check. Count lithium as the first, and keep going.',
      chk: 'newlands-eighth-mcq',
    }),
    sl('concept', 'Mendeléev’s periodic table', {
      b: 'In **1869**, the Russian chemist **Dmitri Mendeléev** arranged the **63 elements** then known in order of **increasing atomic mass**, but he also grouped them by **similar chemical properties**, especially the formulas of their **oxides** and **hydrides**.',
      v: mendeleevTable,
      n: 'Mendeléev wrote each element on a card with its mass and properties, and arranged the cards again and again. His key test was chemistry: how an element combines with oxygen and with hydrogen. Elements whose oxides and hydrides had the same kind of formula went into the same vertical column, called a group. He stated it as a law: properties repeat periodically with atomic mass.',
    }),
    sl('example', 'Worked example 2: predicting formulas', {
      b: r`An element X forms a hydride with formula $\ce{XH3}$, and it is **not** in Mendeléev’s group III. Which group is it in, and what is the formula of its oxide?`,
      ul: [
        r`Step 1 — From the scheme, the hydride $\ce{RH3}$ belongs to group III or group V.`,
        'Step 2 — X is not in group III, so it is in **group V**.',
        r`Step 3 — Group V oxides have the formula $\ce{R2O5}$, so the oxide is $\ce{X2O5}$.`,
        'Check — phosphorus fits: it forms PH₃ and P₂O₅.',
      ],
      v: table(['Hydride formula', 'Possible groups', 'Matching oxide'], [['RH₃', 'III or V', 'R₂O₃ (III) or R₂O₅ (V)'], ['RH₂', 'II or VI', 'RO (II) or RO₃ (VI)'], ['RH₄', 'IV', 'RO₂']], 'Worked table linking hydride formulas to Mendeléev’s groups and the matching oxide formulas'),
      n: 'Mendeléev’s formulas work like a code. Read the hydride, find which groups it fits, then read off the oxide. A hydride with three hydrogens could belong to group three or group five. Since we are told it is not group three, it must be group five, whose oxide has two atoms of the element and five of oxygen. Phosphorus is the real example.',
    }),
    sl('concept', 'Gaps for elements not yet found', {
      b: 'Mendeléev boldly left **gaps** where no known element fitted, and **predicted** the properties of the missing elements. He named them with the Sanskrit prefix **eka** (meaning "one"): eka-boron, eka-aluminium and eka-silicon. They were later discovered as **scandium**, **gallium** and **germanium**.',
      v: galliumTable,
      n: 'This was Mendeléev’s masterstroke. Instead of forcing a wrong element into a place, he left it empty and said: an element belongs here, and this is what it will be like. Notice the word eka, borrowed from Sanskrit, meaning one. Eka-aluminium meant one place below aluminium. When gallium was discovered a few years later, it matched his predictions remarkably well.',
    }),
    sl('concept', 'Noble gases fit in neatly', {
      b: 'The **noble gases** (helium, neon, argon and others) were discovered **later**. Because they are very unreactive, they could be placed in a **new group** of their own **without disturbing** the existing order: another achievement of Mendeléev’s arrangement.',
      v: table(['Achievement of Mendeléev’s table', 'Example'], [['Grouped elements with similar properties', 'Sodium and potassium in one group'], ['Left gaps and predicted new elements', 'Gallium, scandium, germanium'], ['Corrected some atomic masses', 'Values were rechecked to fit the pattern'], ['Accepted a whole new group', 'Noble gases added as a separate group']], 'Table of achievements of Mendeléev’s periodic table with examples'),
      n: 'A good scientific arrangement should survive surprises. When a whole new family of gases turned up, argon, neon, helium and their relatives, Mendeléev’s table did not collapse. The noble gases simply formed a new column at the edge. That flexibility is one reason his table won wide acceptance.',
    }),
    sl('example', 'Worked example 3: properties before mass', {
      b: 'Tellurium (127.6 u) is heavier than iodine (126.9 u). Strict mass order would put iodine first. Where should each go?',
      ul: [
        'Step 1 — Iodine behaves like chlorine and bromine (the halogens); tellurium behaves like sulfur and selenium.',
        'Step 2 — Following mass order would push iodine into the sulfur family and tellurium into the halogen family.',
        'Step 3 — Mendeléev placed **tellurium before iodine**, so each sits with its own family.',
        'Conclusion — he gave **similarity of properties** more importance than strict mass order.',
      ],
      v: table(['Order by', 'Group of sulfur and selenium', 'Group of chlorine and bromine'], [['Atomic mass only', 'Iodine (126.9) — wrong family', 'Tellurium (127.6) — wrong family'], ['Properties (Mendeléev)', 'Tellurium — correct', 'Iodine — correct']], 'Worked table showing that ordering by mass puts tellurium and iodine in the wrong families while ordering by properties puts each in its own family'),
      n: 'Here Mendeléev trusted chemistry over arithmetic. Iodine is clearly a halogen, a cousin of chlorine. Tellurium is a cousin of sulfur. By swapping the strict mass order, he kept both families intact. Later we will see that the modern periodic table explains exactly why this swap was right.',
    }),
    sl('concept', 'Limitations of Mendeléev’s table', {
      b: 'Even Mendeléev’s table had problems that atomic mass could not solve.',
      v: table(['Limitation', 'Why it is a problem'], [['Position of hydrogen', 'Hydrogen resembles both the alkali metals and the halogens'], ['Isotopes', 'Isotopes of one element have different masses but the same properties, so they would need different places'], ['Irregular mass steps', 'Atomic mass does not rise in regular steps, so the number of missing elements between two known ones could not be predicted'], ['Mass order broken', 'Some heavier elements had to be placed before lighter ones']], 'Table of four limitations of Mendeléev’s periodic table with reasons'),
      n: 'Hydrogen is the odd one out. It has one electron like sodium, yet it forms molecules of two atoms like chlorine. Where should it go? Isotopes were an even bigger puzzle. Chlorine thirty-five and chlorine thirty-seven are chemically identical, yet a mass-based table would place them apart. A better basis than mass was needed.',
    }),
    sl('check', 'Quick check: isotopes and mass', {
      b: 'Judge the assertion and the reason about the gaps in Mendeléev’s table.',
      n: 'Quick check. Are both statements true? Does the reason explain the assertion?',
      chk: 'gaps-ar',
    }),
    sl('summary', 'Summary: early attempts and Mendeléev', {
      ul: [
        'Döbereiner’s triads: the middle mass is about the mean of the other two; only a few triads were found.',
        'Newlands’ octaves: every eighth element resembles the first; worked only up to calcium.',
        'Mendeléev: increasing atomic mass plus similar oxide and hydride formulas.',
        'Achievements: gaps with correct predictions (gallium, scandium, germanium); noble gases fitted in.',
        'Limitations: hydrogen’s position, isotopes, irregular mass steps, mass order sometimes broken.',
      ],
      v: table(['Scientist', 'Basis', 'Main limitation'], [['Döbereiner', 'Triads of similar elements by mass', 'Few elements fitted'], ['Newlands', 'Every eighth element by mass', 'Failed beyond calcium'], ['Mendeléev', 'Atomic mass and chemical properties', 'Isotopes and hydrogen could not be placed']], 'Summary table of the three classification attempts with their basis and main limitation'),
      n: 'Let us recap. Döbereiner found families of three. Newlands found a rhythm of eight, which worked only for lighter elements. Mendeléev combined atomic mass with chemical properties, left gaps, and predicted new elements correctly. Yet hydrogen and isotopes showed that atomic mass was not the perfect basis. Part two reveals the better one.',
    }),
    sl('exam-tips', 'Exam tips: early classification', {
      ul: [
        'For a triad, **show the mean** of the first and third masses and compare it with the middle mass.',
        'For Newlands, state that the law worked **only up to calcium**, and give one limitation.',
        'Mendeléev’s basis has **two parts**: atomic mass **and** formulas of oxides and hydrides.',
        'Name the three predicted elements: eka-boron → scandium, eka-aluminium → gallium, eka-silicon → germanium.',
        'Always pair a limitation with **why** it is a problem (for example, isotopes have the same properties but different masses).',
      ],
      v: table(['Common mistake', 'Correct idea'], [['Mendeléev used atomic number', 'He used atomic mass (and properties)'], ['Newlands’ law works for all elements', 'Only up to calcium'], ['Gaps were errors in the table', 'Gaps were deliberate places for undiscovered elements'], ['Triads are any three elements', 'The three must be similar, and the middle mass must be about the mean']], 'Table of common mistakes about early classification with the correct ideas'),
      n: 'To score well, be precise. Mendeléev used atomic mass, not atomic number; that came later. Remember that his gaps were a strength, not a weakness. When you write a limitation, add the reason in the same sentence. And for any triad calculation, show the working: add, halve, compare.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Periodic Classification of Elements — Part 2: The modern periodic table and its trends',
  goals: [
    'State the modern periodic law and explain how it removes the limitations of Mendeléev’s table',
    'Locate an element in the modern table from its atomic number',
    'Predict trends in valency and atomic size across periods and down groups',
    'Predict trends in metallic and non-metallic character',
  ],
  slides: [
    sl('title', 'The modern periodic table', {
      b: 'Part 2 — one number, the atomic number, decides where every element sits and explains the patterns in its properties.',
      v: flow('LR', [['z', 'Atomic number'], ['c', 'Electronic configuration'], ['p', 'Period and group'], ['pr', 'Properties and trends']], [['z', 'c'], ['c', 'p'], ['p', 'pr']], 'Flow from atomic number to electronic configuration to position in the table to properties'),
      n: 'In nineteen thirteen, a young English physicist, Henry Moseley, showed that each element has a fixed number of protons, its atomic number. Arranging elements by this number cleared up every puzzle we met in part one. In this lesson you will learn to read the modern periodic table like a map, and to predict how elements behave from where they sit.',
    }),
    sl('concept', 'The modern periodic law', {
      b: '**Modern periodic law:** the properties of elements are a **periodic function of their atomic numbers**. The atomic number (number of protons) is a more basic property than atomic mass, and it rises by **exactly one** from each element to the next.',
      v: table(['', 'Mendeléev’s table', 'Modern periodic table'], [['Basis', 'Atomic mass', 'Atomic number'], ['Steps between elements', 'Irregular', 'Exactly one proton each time'], ['Number of groups', 'Eight (I to VIII)', 'Eighteen (1 to 18)'], ['Noble gases', 'Added later as a new group', 'Group 18 from the start']], 'Table comparing Mendeléev’s table and the modern periodic table on basis, steps, number of groups and noble gases'),
      n: 'Why is atomic number better than mass? Because it goes up in steps of exactly one: hydrogen one, helium two, lithium three, with no gaps and no surprises. So we know exactly how many elements lie between any two. And, as you will see, the atomic number decides the electron arrangement, which decides the chemistry.',
    }),
    sl('concept', 'Old problems, solved', {
      b: 'Arranging by atomic number removes Mendeléev’s main difficulties.',
      v: table(['Old problem', 'How atomic number solves it'], [['Isotopes have different masses', 'Isotopes have the same atomic number, so they share one place'], ['Tellurium (52) before iodine (53)', 'Atomic numbers are in the right order, so no swap is needed'], ['Cobalt (27) before nickel (28)', 'Again in atomic-number order'], ['Argon (18) before potassium (19)', 'Argon is heavier, but has the smaller atomic number']], 'Table showing how arranging by atomic number solves the isotope problem and the order of tellurium and iodine, cobalt and nickel, and argon and potassium'),
      n: 'Remember the tellurium and iodine swap? Tellurium has fifty-two protons and iodine fifty-three, so in atomic-number order tellurium comes first anyway. Argon and potassium are a similar pair. And isotopes, which differ only in neutrons, have the same atomic number, so they share a single box. Mendeléev’s instinct was right; atomic number explains why.',
    }),
    sl('diagram', 'Layout: groups and periods', {
      b: 'The modern table has **18 vertical columns called groups** and **7 horizontal rows called periods**. Metals are on the **left** and in the **centre**, non-metals on the **upper right**, and **metalloids** lie along a **zig-zag** between them. Two rows (lanthanoids and actinoids) are placed separately below.',
      v: V.layout,
      n: 'Here is the whole map. Columns are groups, numbered one to eighteen. Rows are periods, numbered one to seven. The wide middle block, groups three to twelve, holds the transition metals such as iron and copper. Notice how most of the table is metal. Non-metals crowd into the top right corner, with a staircase of metalloids along the border.',
    }),
    sl('diagram', 'The first twenty elements', {
      b: 'Periods 1 to 3 have no transition elements, so groups **1, 2 and 13 to 18** are shown side by side. Each step to the right adds **one proton** and **one electron**.',
      v: V.table20,
      n: 'Zoom in on the first twenty elements; you will meet these most often. Period one has only hydrogen and helium. Periods two and three each have eight elements, from lithium to neon and from sodium to argon. Potassium and calcium begin period four. Learn this small block well, and the trends will make sense.',
    }),
    sl('concept', 'Same group: same valence electrons', {
      b: 'Elements in the **same group** have the **same number of valence electrons** (electrons in the outermost shell). That is why they show **similar chemical properties**.',
      v: configTable,
      n: 'Look down group one: lithium, sodium and potassium each have one electron in the outer shell. Look down group seventeen: fluorine and chlorine each have seven. Chemical reactions involve outer electrons, so elements with the same outer arrangement behave alike. This is the real reason Döbereiner’s triads and Newlands’ octaves worked for some families.',
    }),
    sl('concept', 'Same period: same number of shells', {
      b: 'Elements in the **same period** have the **same number of occupied shells**. The **period number** equals the number of shells. Across a period, valence electrons increase **from 1 to 8** as the shell fills. The number of elements in a period depends on how many electrons the shells can hold.',
      v: table(['Period', 'Outermost shell', 'Number of elements'], [['1', 'K (1st)', '2'], ['2', 'L (2nd)', '8'], ['3', 'M (3rd)', '8'], ['4', 'N (4th)', '18'], ['5', 'O (5th)', '18'], ['6', 'P (6th)', '32'], ['7', 'Q (7th)', '32']], 'Table of the seven periods with the outermost shell and the number of elements in each: 2, 8, 8, 18, 18, 32 and 32', 'A shell can hold at most 2n² electrons, where n is the shell number (2, 8, 18, 32). From period 4 onward, inner shells also fill, so periods get longer.'),
      n: 'Each period starts a new shell. Period one fills the first shell, which holds only two electrons, so it has just two elements. Periods two and three each have eight. Later periods are longer, eighteen and then thirty-two elements, because deeper shells can hold more electrons. So the shape of the table comes straight from electron arrangement.',
    }),
    sl('example', 'Worked example 1: locating an element', {
      b: 'An element has atomic number 16. Find its period, group and valence electrons. Which element is it?',
      ul: [
        'Step 1 — Fill shells 2, 8, 8: configuration **2, 8, 6**.',
        'Step 2 — Three shells → **period 3**.',
        r`Step 3 — Six valence electrons; for 3 or more, group $= 10 +$ valence electrons $= 16$ → **group 16**.`,
        'Answer — period 3, group 16, six valence electrons: **sulfur**.',
      ],
      v: table(['Step', 'Result'], [['Configuration', '2, 8, 6'], ['Number of shells', '3 → period 3'], ['Valence electrons', '6 → group 16'], ['Element', 'Sulfur']], 'Worked table: atomic number 16 gives configuration 2, 8, 6, period 3 and group 16, which is sulfur'),
      n: 'Two quick rules locate any of the first twenty elements. The number of shells is the period. For the group, one or two valence electrons give group one or two; three or more, add ten. Here, two, eight, six has three shells and six outer electrons, so period three, group sixteen. That is sulfur.',
    }),
    sl('check', 'Quick check: find the group', {
      b: 'An element has the electronic configuration 2, 8, 7. What is its group number?',
      n: 'Your turn. Count the valence electrons and apply the rule for groups thirteen to eighteen.',
      chk: 'group-config-num',
    }),
    sl('concept', 'Trend in valency', {
      b: '**Valency** is the combining capacity of an element. Across a period it **rises from 1 to 4, then falls to 0**. Down a group it stays the **same**, because the valence electrons are the same.',
      v: valencyTable,
      n: 'Sodium gives away one electron, so its valency is one. Magnesium gives two, aluminium three. Silicon shares four. From phosphorus onward, it is easier to gain electrons: phosphorus needs three more, sulfur two, chlorine one. Argon already has eight, so its valency is zero. Down any group, the valency stays the same.',
    }),
    sl('example', 'Worked example 2: predicting a formula', {
      b: 'Element A has atomic number 20 and element B has atomic number 9. Predict the formula of the compound they form.',
      ul: [
        'Step 1 — A: 2, 8, 8, 2 → two valence electrons → valency **2** (A is calcium).',
        'Step 2 — B: 2, 7 → seven valence electrons → valency 8 − 7 = **1** (B is fluorine).',
        'Step 3 — Cross the valencies: one A needs two B.',
        'Answer — **AB₂** (calcium fluoride, CaF₂).',
      ],
      v: table(['Element', 'Configuration', 'Valency'], [['A (atomic number 20)', '2, 8, 8, 2', '2'], ['B (atomic number 9)', '2, 7', '1'], ['Compound', '—', 'AB₂']], 'Worked table: valency 2 for element A and 1 for element B give the formula AB two'),
      n: 'Positions give valencies, and valencies give formulas. Element twenty has two outer electrons, so it can lose two. Element nine has seven, so it needs just one more. One atom of A can therefore satisfy two atoms of B. The formula is A B two, which for real elements is calcium fluoride.',
    }),
    sl('diagram', 'Atomic size down a group', {
      b: '**Atomic size** is measured as the **atomic radius**, the distance from the centre of the nucleus to the outermost shell. Down a group, **a new shell is added** each period, so atomic size **increases**, even though the nuclear charge also increases.',
      v: V.group1,
      n: 'Go down group one, and each atom has one more shell than the one above. Lithium has two shells, sodium three, potassium four. Extra shells push the outer electron farther from the nucleus, so the atoms get bigger: about one hundred and fifty-two, one hundred and eighty-six, and two hundred and thirty-one picometres.',
    }),
    sl('concept', 'Atomic size across a period', {
      b: 'Across period 3, atomic radius **decreases** from sodium (186 pm) to chlorine (99 pm).',
      v: radiusPlot,
      n: 'Now go across period three. The graph falls steadily, from one hundred and eighty-six picometres for sodium to ninety-nine for chlorine. Each atom is smaller than the one before it, even though it has more electrons. That seems strange at first. The next slide explains why.',
    }),
    sl('diagram', 'Why atoms shrink across a period', {
      b: 'Across a period, electrons are added to the **same shell**, while the **nuclear charge** (number of protons) **increases**. The stronger pull draws the electrons **closer** to the nucleus, so the atom becomes **smaller**.',
      v: V.nacl,
      n: 'Sodium and chlorine both have three shells. But chlorine’s nucleus has seventeen protons against sodium’s eleven. More positive charge pulls all the electrons inward more strongly, and no new shell is added to push them out. So the chlorine atom is much smaller. Same shells, stronger pull: that is the rule across a period.',
    }),
    sl('check', 'Quick check: size across a period', {
      b: 'Judge the assertion and the reason about atomic size across a period.',
      n: 'Quick check. Is the trend right? And does the reason explain it?',
      chk: 'size-ar',
    }),
    sl('diagram', 'Metallic and non-metallic character', {
      b: 'Metals tend to **lose** electrons; non-metals tend to **gain** them. Across a period, the growing nuclear pull makes losing electrons harder, so **metallic character decreases** and non-metallic character increases. Down a group, outer electrons are farther away and easier to lose, so **metallic character increases**.',
      v: V.trends,
      n: 'Being metallic is about how easily an atom gives up its outer electrons. On the left, atoms are big and the pull is weak, so electrons leave easily; these are metals. Moving right, the pull strengthens, and atoms would rather grab electrons; these are non-metals. Moving down, atoms grow, the pull weakens, and metallic character rises.',
    }),
    sl('concept', 'Metalloids and the nature of oxides', {
      b: '**Metalloids** (semi-metals) such as **boron, silicon, germanium, arsenic, antimony, tellurium** and **polonium** lie on the zig-zag line and show some properties of both. Oxides follow the same pattern: **metal oxides are basic**, **non-metal oxides are acidic**.',
      v: table(['Element (period 3)', 'Type', 'Oxide', 'Nature of oxide'], [['Sodium', 'Metal', 'Na₂O', 'Basic'], ['Magnesium', 'Metal', 'MgO', 'Basic'], ['Silicon', 'Metalloid', 'SiO₂', 'Weakly acidic'], ['Phosphorus', 'Non-metal', 'P₄O₁₀', 'Acidic'], ['Sulfur', 'Non-metal', 'SO₂', 'Acidic']], 'Table of period 3 elements with their type, an oxide and its nature: sodium and magnesium oxides are basic, oxides of silicon, phosphorus and sulfur are acidic'),
      n: 'Silicon is the classic metalloid: it looks shiny like a metal, but it is brittle and conducts electricity only partly, which is why it is used in computer chips. Oxides tell the same story as the table. Burn magnesium, dissolve the ash in water, and red litmus turns blue. Burn sulfur, dissolve the gas, and blue litmus turns red.',
    }),
    sl('example', 'Worked example 3: comparing by position', {
      b: 'Three elements have atomic numbers 11, 13 and 19. Which is the most metallic, and which has the smallest atom?',
      ul: [
        'Step 1 — 11: 2, 8, 1 (period 3, group 1); 13: 2, 8, 3 (period 3, group 13); 19: 2, 8, 8, 1 (period 4, group 1).',
        'Step 2 — 19 is below 11 in group 1, so it is larger and more metallic than 11.',
        'Step 3 — 13 is to the right of 11 in period 3, so it is smaller and less metallic than 11.',
        'Answer — most metallic: **19** (potassium); smallest atom: **13** (aluminium).',
      ],
      v: table(['Atomic number', 'Period', 'Group', 'Size', 'Metallic character'], [['11 (sodium)', '3', '1', 'Middle', 'Middle'], ['13 (aluminium)', '3', '13', 'Smallest', 'Least'], ['19 (potassium)', '4', '1', 'Largest', 'Most']], 'Worked table comparing elements with atomic numbers 11, 13 and 19 by period, group, size and metallic character'),
      n: 'Place each element on the map first, then apply the two arrows. Down a group, size and metallic character go up. Across a period, both go down. Potassium sits below sodium, so it is the biggest and most metallic. Aluminium sits to the right of sodium, so it is the smallest and least metallic of the three.',
    }),
    sl('check', 'Quick check: the most metallic', {
      b: 'Which of these elements is the most metallic?',
      n: 'Your turn. Find the element farthest to the left and lowest down.',
      chk: 'metallic-mcq',
    }),
    sl('summary', 'Summary: the modern periodic table', {
      ul: [
        'Modern periodic law: properties are a periodic function of atomic number.',
        '18 groups and 7 periods; isotopes share one place; no mass swaps needed.',
        'Period number = number of shells; same group = same valence electrons.',
        'Valency: 1 → 4 → 0 across a period; same down a group.',
        'Atomic size and metallic character: decrease across a period, increase down a group.',
        'Metal oxides are basic; non-metal oxides are acidic; metalloids lie on the zig-zag.',
      ],
      v: table(['Property', 'Across a period (left to right)', 'Down a group'], [['Valence electrons', 'Increase 1 to 8', 'Same'], ['Number of shells', 'Same', 'Increase'], ['Atomic size', 'Decreases', 'Increases'], ['Metallic character', 'Decreases', 'Increases']], 'Summary table of trends across a period and down a group in valence electrons, shells, atomic size and metallic character'),
      n: 'Let us recap. Atomic number is the true basis of the periodic table. The number of shells gives the period, and the number of valence electrons gives the group. Across a period, atoms shrink and become less metallic. Down a group, they grow and become more metallic. With these rules, you can predict an element’s behaviour from its address.',
    }),
    sl('exam-tips', 'Exam tips: modern table and trends', {
      ul: [
        'To locate an element: write the configuration, count the **shells** (period) and the **valence electrons** (group).',
        'For groups 13 to 18 among the first 20 elements, group = 10 + valence electrons.',
        'Always give the **reason** with a trend: "same shell, more protons" or "a new shell is added".',
        'Valency is the number of valence electrons (up to 4) or 8 minus it (from 5 to 8).',
        'Use oxides to show character: metal oxide turns red litmus blue; non-metal oxide turns blue litmus red.',
      ],
      v: table(['Common mistake', 'Correct idea'], [['More electrons always means a bigger atom', 'Across a period atoms shrink as nuclear charge rises'], ['Elements in a period have the same properties', 'Elements in a group have similar properties'], ['Group number = number of shells', 'Period number = number of shells'], ['Metallic character increases across a period', 'It decreases across a period']], 'Table of common mistakes about the modern periodic table with the correct ideas'),
      n: 'Examiners reward reasons. Do not just write that size decreases across a period; say the electrons enter the same shell while the nuclear charge rises. Keep group and period straight: shells give the period, valence electrons give the group. And when you discuss metallic character, link it to how easily an atom loses electrons.',
    }),
  ],
});
