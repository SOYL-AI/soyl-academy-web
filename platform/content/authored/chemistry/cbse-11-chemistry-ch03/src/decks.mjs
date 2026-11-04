// ch03 Classification of Elements and Periodicity in Properties — two decks.
// Part 1 (t01, t02): development of the table, modern law, Z > 100 names, blocks, period and group.
// Part 2 (t03): periodic trends, anomalies, diagonal relationships.
import { sl, deck, table, flow, svgV, r } from './lib.mjs';
import { BLOCKS, IE_PLOT, ISO_BARS, EGE_BARS, IE1, EGE } from './svgs.mjs';
import { nomen, locate, shorthand, TRIADS, avgOuter, zFrom } from './data.mjs';

export const V = {
  blocks: svgV(BLOCKS, 'Schematic block layout of the long form of the periodic table: s-block, d-block, p-block and the f-block below, with the number of elements in each', 'Schematic only: each small box is one element.'),
  ie: svgV(IE_PLOT, 'Graph of first ionisation enthalpy against atomic number for the first twenty elements, with peaks at the noble gases and dips at boron, oxygen, aluminium and sulfur'),
  iso: svgV(ISO_BARS, 'Bar chart of the ionic radii of six ten-electron species from nitride to the aluminium ion, falling as atomic number rises'),
  ege: svgV(EGE_BARS, 'Bar chart of electron gain enthalpies of group seventeen and group sixteen elements, with chlorine and sulfur having the largest values'),
};

// ---- computed table rows
const f1 = (x) => x.toFixed(1);
const triadRows = TRIADS.map((t) => [t.els.join(', '), f1(t.m[0]), f1(t.m[1]), f1(t.m[2]), f1(avgOuter(t))]);
const periodRows = [
  [1, '1s', 2],
  [2, '2s 2p', 8],
  [3, '3s 3p', 8],
  [4, '4s 3d 4p', 18],
  [5, '5s 4d 5p', 18],
  [6, '6s 4f 5d 6p', 32],
  [7, '7s 5f 6d 7p', 32],
];
const cap = { s: 2, p: 6, d: 10, f: 14 };
const lenOf = (subs) => subs.split(' ').reduce((a, s) => a + cap[s[1]], 0);
if (periodRows.some(([, subs, n]) => lenOf(subs) !== n) || periodRows.reduce((a, x) => a + x[2], 0) !== 118) throw new Error('period lengths');
const nm = (z) => nomen(z);
const loc = (z) => locate(z);
for (const [p, g] of [[4, 16], [5, 14]]) if (loc(zFrom(p, g)).period !== p || loc(zFrom(p, g)).group !== g) throw new Error('zFrom');

export const deck1 = deck({
  part: 1,
  title: 'Classification of Elements and Periodicity — Part 1: Development of the table, blocks and positions',
  goals: [
    'Trace the development of the periodic table from triads to the modern periodic law',
    'Name and write symbols for elements with atomic number above 100',
    'Classify elements into s, p, d and f blocks and find period and group from the configuration',
    'Distinguish metals, non-metals, metalloids, representative, transition and inner transition elements',
  ],
  slides: [
    sl('title', 'Classification of Elements and Periodicity in Properties', {
      b: 'Part 1 — how a hundred and eighteen elements came to be arranged in one table, and how to read an element’s position from its electrons.',
      v: table(['Stage', 'Idea', 'Basis'], [['Döbereiner', 'Triads', 'Atomic mass'], ['Newlands', 'Octaves', 'Atomic mass'], ['Mendeleev', 'Periodic law', 'Atomic mass'], ['Moseley, modern law', 'Periodic table', 'Atomic number']], 'Table of four stages in the development of the periodic table and the basis used in each'),
      n: 'Why do we need a periodic table at all? Because over a hundred elements are far too many to study one by one. Chemists spent about a century finding the right way to sort them. In this part we follow that story, learn how new elements are named, and then learn to read an element’s block, period and group from its electron arrangement.',
    }),
    sl('concept', 'Döbereiner’s triads', {
      b: 'In 1817 Döbereiner noticed groups of **three elements** with similar properties in which the **atomic mass of the middle element is close to the average** of the other two.',
      v: table(['Triad', 'Mass 1', 'Mass 2 (middle)', 'Mass 3', 'Average of 1 and 3'], triadRows, 'Table of three Döbereiner triads with the atomic masses and the average of the outer two'),
      n: 'Döbereiner found families of three. In the lithium, sodium, potassium family, the average of the outer two masses is exactly the mass of sodium. For calcium, strontium and barium, and for chlorine, bromine and iodine, the average is close to the middle element. The idea was sound but only a handful of triads could be found.',
    }),
    sl('concept', 'Newlands’ law of octaves', {
      b: 'In 1866 Newlands arranged elements by increasing atomic mass and found that **every eighth element resembled the first**, like notes in a musical octave. It worked only up to **calcium**; the noble gases were still unknown.',
      v: table(['Row', '1', '2', '3', '4', '5', '6', '7'], [['First octave', 'Li', 'Be', 'B', 'C', 'N', 'O', 'F'], ['Second octave', 'Na', 'Mg', 'Al', 'Si', 'P', 'S', 'Cl']], 'Table of the first two Newlands octaves showing that sodium resembles lithium and chlorine resembles fluorine'),
      n: 'Newlands listed the elements by mass and noticed that sodium behaves like lithium, magnesium like beryllium, and chlorine like fluorine: every eighth element repeated the pattern. This was the first clear statement of periodicity. But it broke down after calcium, and it left no room for elements still to be discovered, so chemists did not accept it.',
    }),
    sl('concept', 'Mendeleev’s periodic law', {
      b: '**Law (1869):** the properties of elements are a periodic function of their **atomic masses**. Mendeleev arranged elements in rows and columns so that similar ones fell in the same group, and he **left gaps** for elements not yet discovered.',
      v: table(['Feature', 'Mendeleev’s decision'], [['Order', 'Increasing atomic mass, with exceptions'], ['Gaps', 'Left for undiscovered elements'], ['Tellurium and iodine', 'Iodine placed after tellurium by properties, although lighter'], ['Formulae', 'Used hydride and oxide formulae to place elements']], 'Table of four features of Mendeleev’s periodic table'),
      n: 'Mendeleev went further than Newlands. He was prepared to break the order of mass when properties demanded it, as with tellurium and iodine, and he boldly left gaps for elements that had not yet been found. He also checked the formulae of the hydrides and oxides of each element, so that members of a group formed similar compounds.',
    }),
    sl('concept', 'Mendeleev’s predictions and limitations', {
      b: 'He named the missing elements **eka-boron**, **eka-aluminium** and **eka-silicon** and predicted their properties. The later discoveries matched closely, which won acceptance for the table. Limitations: **hydrogen** has no clear place, **isotopes** have no place, and some pairs are in the wrong mass order.',
      v: table(['Predicted', 'Mass predicted', 'Element found', 'Mass found'], [['Eka-boron', '44', 'Scandium', '45.0'], ['Eka-aluminium', '68', 'Gallium', '69.7'], ['Eka-silicon', '72', 'Germanium', '72.6']], 'Table comparing the atomic masses Mendeleev predicted for three missing elements with the elements later found'),
      n: 'The great success of the table was prediction. Mendeleev described eka-aluminium and eka-silicon in detail, and when gallium and germanium were found, their masses and properties matched. The weaknesses were also clear: hydrogen fitted nowhere well, isotopes of one element would need different places, and a few pairs were in the wrong order of mass.',
    }),
    sl('example', 'Worked example: using the triad rule', {
      b: r`**Problem.** Döbereiner’s rule says the middle mass is the average of the outer two. Use it for sulfur (32.1), selenium and tellurium (127.6), given that selenium has mass 79.0 by experiment. How close is the rule?

**Step 1.** Average of the outer two: $\dfrac{32.1 + 127.6}{2} = ${((32.1 + 127.6) / 2).toFixed(2)}$.

**Step 2.** Difference from the observed value: $${((32.1 + 127.6) / 2).toFixed(2)} - 79.0 = ${((32.1 + 127.6) / 2 - 79.0).toFixed(2)}$.

**Conclusion.** The rule works to within about one unit, so S, Se, Te form a good triad.`,
      v: flow('LR', [['a', 'Take the outer two masses'], ['b', 'Find their average'], ['c', 'Compare with the middle element'], ['d', 'A small difference means a triad']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Flow for testing a triad: average the outer masses and compare with the middle element'),
      n: 'To test a triad, add the masses of the outer two elements and halve the result. For sulfur and tellurium the average comes out just under eighty, against an experimental value of seventy nine for selenium. A difference of less than one unit is small, so the three elements do form a triad in the sense of Döbereiner.',
    }),
    sl('concept', 'The modern periodic law', {
      b: 'In 1913 **Moseley** showed from X-ray spectra that the **nuclear charge (atomic number)**, not mass, is the true basis. **Modern law:** the properties of elements are a periodic function of their **atomic numbers**. This removes Mendeleev’s mass-order anomalies.',
      v: table(['Pair', 'Heavier first by mass', 'Order by atomic number'], [['Argon, potassium', 'Ar (39.9), K (39.1)', 'Ar (18), K (19)'], ['Cobalt, nickel', 'Co (58.9), Ni (58.7)', 'Co (27), Ni (28)'], ['Tellurium, iodine', 'Te (127.6), I (126.9)', 'Te (52), I (53)']], 'Table of three element pairs whose order by atomic mass is reversed but whose order by atomic number is correct'),
      n: 'Moseley measured X-ray frequencies and found that they depend on the nuclear charge, that is, the atomic number. When elements are ordered by atomic number, argon comes before potassium, cobalt before nickel, and tellurium before iodine, exactly as their chemistry demands. So the modern law uses atomic number, and the old anomalies disappear.',
    }),
    sl('concept', 'The long form: periods and groups', {
      b: 'The long form has **18 groups** (columns) and **7 periods** (rows). Each period begins when a new shell starts filling, so **period length = electrons that fill that stretch of subshells**.',
      v: table(['Period', 'Subshells filled', 'Elements'], periodRows.map(([p, s, n]) => [String(p), s, String(n)]), 'Table of the seven periods with the subshells that fill in each and the number of elements; the total is one hundred and eighteen'),
      n: 'The first period has only two elements, because only the first s subshell fills. The second and third periods fill s and p, giving eight each. The fourth and fifth add the ten d electrons, giving eighteen. The sixth and seventh also add fourteen f electrons, giving thirty two. All together that makes one hundred and eighteen elements.',
    }),
    sl('concept', 'Naming elements with Z greater than 100', {
      b: 'Until an element is confirmed, IUPAC gives a **temporary systematic name** built from numerical roots, one per digit of the atomic number, ending in **-ium**. The **symbol** is the first letters of the roots, three letters in all.',
      v: table(['Digit', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'], [['Root', 'nil', 'un', 'bi', 'tri', 'quad', 'pent', 'hex', 'sept', 'oct', 'enn']], 'Table of the numerical roots for digits zero to nine used in systematic element names'),
      n: 'For a new element, IUPAC writes the atomic number digit by digit as roots: nil for zero, un for one, bi for two, tri for three, and so on up to enn for nine. Join the roots and add the ending ium. The symbol takes the first letter of each root, with a capital for the first. Elements up to one hundred and eighteen now have permanent names.',
    }),
    sl('example', 'Worked example: systematic names', {
      b: r`**Problem.** Write the systematic name and symbol of the element with (a) $Z = 119$, (b) $Z = 123$, and the atomic number of (c) unquadnilium.

**(a)** 1 → un, 1 → un, 9 → enn: **${nm(119).name}**, symbol **${nm(119).sym}**.

**(b)** 1 → un, 2 → bi, 3 → tri: **${nm(123).name}** (the final i of tri is not doubled), symbol **${nm(123).sym}**.

**(c)** un = 1, quad = 4, nil = 0: $Z = 140$.`,
      v: table(['Z', 'Roots', 'Name', 'Symbol'], [['119', 'un-un-enn', nm(119).name, nm(119).sym], ['123', 'un-bi-tri', nm(123).name, nm(123).sym], ['140', 'un-quad-nil', nm(140).name, nm(140).sym]], 'Table of three atomic numbers above one hundred with their roots, systematic names and symbols'),
      n: 'Take each digit in turn. For atomic number one hundred and nineteen the digits are one, one and nine, which give un, un and enn, so the name is ununennium. For one hundred and twenty three we get un, bi, tri and add ium. Going backwards, unquadnilium has the digits one, four and zero, so its atomic number is one hundred and forty.',
    }),
    sl('check', 'Quick check: systematic names', {
      b: 'Write a systematic name from an atomic number.',
      n: 'Quick check. Convert each digit of the atomic number to its root, then join the roots and add the ending.',
      chk: 'nomen-mcq',
    }),
    sl('diagram', 'Classifying by the last subshell: s, p, d and f blocks', {
      b: 'The **block** is the subshell that receives the **last electron** (Aufbau order): **s** (groups 1–2 and He), **p** (groups 13–18), **d** (groups 3–12) and **f** (lanthanoids and actinoids, placed below).',
      v: V.blocks,
      n: 'Look at the picture, which is only a schematic of the table. The first two groups form the s block, along with helium. On the right, six groups make the p block. In the middle, ten groups form the d block, which starts in the fourth period. Below the table sit the f block elements, fourteen lanthanoids and fourteen actinoids.',
    }),
    sl('concept', 'Finding period and group from the configuration', {
      b: '**Period** = principal quantum number of the **outermost shell**. **Group:** s-block = number of valence electrons; p-block = 12 + number of p electrons; d-block = (n−1)d electrons + ns electrons (groups 3–12).',
      v: table(['Block', 'General valence configuration', 'Group'], [['s', 'ns¹ to ns²', '1 and 2'], ['p', 'ns² np¹ to ns² np⁶', '13 to 18'], ['d', '(n−1)d¹ to ¹⁰ ns¹ or ns²', '3 to 12'], ['f', '(n−2)f¹ to ¹⁴ (n−1)d⁰ or ¹ ns²', 'Placed below the table']], 'Table of the general valence configuration and group number range for the s, p, d and f blocks'),
      n: 'The period is simply the highest shell number that holds electrons. For the group, count differently in each block. In the s block, the group is the number of valence electrons. In the p block, add twelve to the number of p electrons. In the d block, add the d electrons and the s electrons, which gives groups three to twelve.',
    }),
    sl('example', 'Worked example: locating elements', {
      b: r`**Problem.** Find the block, period and group of the elements with $Z = 33$, $Z = 48$ and $Z = 56$.

**Z = 33:** ${shorthand(33)} → last electron in 4p (3 electrons): **p-block, period ${loc(33).period}, group ${loc(33).group}**.

**Z = 48:** ${shorthand(48)} → last electron in 4d: **d-block, period ${loc(48).period}, group ${loc(48).group}** (10 + 2).

**Z = 56:** ${shorthand(56)} → **s-block, period ${loc(56).period}, group ${loc(56).group}**.`,
      v: table(['Z', 'Configuration', 'Block', 'Period', 'Group'], [33, 48, 56].map((z) => [String(z), shorthand(z), loc(z).block, String(loc(z).period), String(loc(z).group)]), 'Table of the configuration, block, period and group of the elements with atomic numbers thirty three, forty eight and fifty six'),
      n: 'Write the configuration, then read off the answer. Atomic number thirty three ends in three p electrons in the fourth shell, so it is a p block element in period four and group fifteen. Forty eight ends with a full d subshell and two s electrons, giving the d block, period five, group twelve. Fifty six ends in six s two: s block, period six, group two.',
    }),
    sl('check', 'Quick check: block and group', {
      b: 'Locate an element from its valence configuration.',
      n: 'Quick check. Find the last subshell to fill, and count electrons as the rule for that block says.',
      chk: 'block-mcq',
    }),
    sl('concept', 'Metals, non-metals and metalloids', {
      b: 'About **four-fifths** of the elements are **metals**: lustrous, malleable, good conductors, usually forming cations. **Non-metals** (at the top right) form anions or share electrons. **Metalloids** along the staircase line are in between: **B, Si, Ge, As, Sb, Te**.',
      v: table(['Class', 'Examples', 'Typical behaviour'], [['Metals', 'Na, Fe, Cu', 'Lose electrons; basic oxides'], ['Non-metals', 'C, N, O, Cl', 'Gain or share electrons; acidic oxides'], ['Metalloids', 'B, Si, Ge, As, Sb, Te', 'Intermediate; semiconductors']], 'Table comparing metals, non-metals and metalloids with examples and behaviour'),
      n: 'Most elements are metals. They conduct heat and electricity, can be hammered into sheets, and tend to lose electrons to form positive ions. Non-metals are found at the top right of the table and gain or share electrons. Between them, along a staircase line, sit the metalloids, such as silicon and germanium, which are semiconductors.',
    }),
    sl('concept', 'Representative, transition and inner transition elements', {
      b: 'The **s- and p-block** elements (except group 18) are **representative** or main group elements. The **d-block** are **transition elements**; the **f-block** are **inner transition elements**. **Noble gases** (group 18) have filled shells: ns² np⁶ (He: 1s²).',
      v: table(['Category', 'Block', 'Feature'], [['Representative', 's and p (groups 1, 2, 13–17)', 'Outer shell filling'], ['Transition', 'd (groups 3–12)', 'Inner d subshell filling'], ['Inner transition', 'f', 'Antepenultimate 4f or 5f filling'], ['Noble gases', 'p (group 18) and He', 'Complete outer shell']], 'Table of representative, transition, inner transition and noble gas categories with their blocks and defining feature'),
      n: 'Another way to sort elements is by what is filling. In representative elements the outer shell is filling. In transition elements an inner d subshell fills. In inner transition elements an f subshell two shells in fills. And noble gases have complete outer shells, which explains why they are so unreactive.',
    }),
    sl('check', 'Quick check: types of element', {
      b: 'Identify the metalloid or the category from a property or position.',
      n: 'Quick check. Recall the staircase line, and which blocks are called transition and inner transition.',
      chk: 'metalloid-mcq',
    }),
    sl('summary', 'Summary: Part 1', {
      ul: [
        'Döbereiner (triads), Newlands (octaves), Mendeleev (periodic law by mass, gaps, predictions) led to Moseley’s modern law: properties are periodic functions of atomic number.',
        'Long form: 18 groups, 7 periods; period lengths 2, 8, 8, 18, 18, 32, 32 (118 elements).',
        'Z > 100: digit roots nil, un, bi, tri, quad, pent, hex, sept, oct, enn + ium; symbol = first letters.',
        'Block = subshell of the last electron; period = outer shell number; group rules differ by block.',
        'Metals, non-metals, metalloids; representative, transition, inner transition; noble gases.',
      ],
      v: table(['Block', 'Last electron in', 'Groups'], [['s', 'ns', '1, 2 (and He)'], ['p', 'np', '13–18'], ['d', '(n−1)d', '3–12'], ['f', '(n−2)f', 'Below the table']], 'Summary table of the four blocks, the subshell receiving the last electron and the groups'),
      n: 'Let us sum up. Classification moved from triads and octaves to Mendeleev’s law, and then to the modern law based on atomic number. The long form table has eighteen groups and seven periods. New elements get systematic names from digit roots. An element’s block comes from its last electron, and its period and group follow from the outer shells.',
    }),
    sl('exam-tips', 'Exam tips: Part 1', {
      ul: [
        'State the modern law with the words “atomic number”, not “atomic mass”.',
        'Give two reasons when asked why Mendeleev’s table was accepted: predictions and gaps.',
        'For Z > 100 names, write roots digit by digit, then add “ium”.',
        'Write the full configuration before deciding block, period and group.',
        'Remember helium is s-block but sits in group 18.',
      ],
      v: table(['Slip', 'Fix'], [['Modern law uses atomic mass', 'Atomic number'], ['Group of Fe taken as 2 (from 4s²)', 'd-block: 6 + 2 = group 8'], ['Name for Z = 119 starting “unun-ennium” wrongly', 'ununennium (un, un, enn)']], 'Table of three common slips and their fixes'),
      n: 'Some tips. In the modern periodic law, always say atomic number. When describing Mendeleev, mention gaps and successful predictions. For element names, work digit by digit. For group numbers of d block elements, add the d and s electrons together. And do not forget that helium is an s block element placed with the noble gases.',
    }),
  ],
});

// ---------------------------------------------------------------- Part 2
const radiusRows = [['2 (Li to F)', '152', '111', '88', '77', '74', '66', '64'], ['3 (Na to Cl)', '186', '160', '143', '117', '110', '104', '99']];

export const deck2 = deck({
  part: 2,
  title: 'Classification of Elements and Periodicity — Part 2: Periodic trends',
  goals: [
    'Explain trends in atomic and ionic radii, including isoelectronic species',
    'Explain ionisation enthalpy trends and the anomalies at Be/B and N/O',
    'Explain why electron gain enthalpy of chlorine is more negative than that of fluorine',
    'Relate electronegativity, valency, anomalous second-period behaviour and diagonal relationships to atomic structure',
  ],
  slides: [
    sl('title', 'Periodic trends', {
      b: 'Part 2 — why atomic size, ionisation enthalpy, electron gain enthalpy and electronegativity change in regular ways across periods and down groups.',
      v: table(['Property', 'Across a period', 'Down a group'], [['Atomic radius', 'Decreases', 'Increases'], ['Ionisation enthalpy', 'Generally increases', 'Decreases'], ['Electron gain enthalpy', 'Becomes more negative', 'Generally less negative'], ['Electronegativity', 'Increases', 'Decreases']], 'Table of the general trends of four properties across a period and down a group'),
      n: 'Because electron arrangements repeat, properties repeat too. Moving across a period, nuclear charge rises while the shell number stays the same, so atoms shrink and hold their electrons more tightly. Moving down a group, new shells are added, so atoms grow and let go of electrons more easily. This part explains each property and its exceptions.',
    }),
    sl('concept', 'Atomic radius', {
      b: '**Covalent radius** is half the distance between two bonded atoms of one element; **metallic radius** is half the distance between neighbouring metal ions; **van der Waals radius** is for non-bonded atoms and is always larger. Across a period, **nuclear charge rises** with no new shell, so the radius **falls**; down a group, a **new shell** is added, so it **rises**.',
      v: table(['Period (radius / pm)', 'Group 1', 'Group 2', 'Group 13', 'Group 14', 'Group 15', 'Group 16', 'Group 17'], radiusRows, 'Table of atomic radii in picometres (metallic radii for the metals, covalent radii for the non-metals) of the elements of the second and third periods, decreasing from left to right'),
      n: 'The size of an atom cannot be measured directly, so we use half the bond length. In a period, each element has one more proton but electrons enter the same shell, so the pull increases and the atom shrinks. In a group, each step down adds a whole shell and the atom grows. Van der Waals radii are always larger than covalent radii.',
    }),
    sl('concept', 'Ionic radius', {
      b: 'A **cation** is smaller than its atom (electrons lost, or a whole shell lost, and the same nuclear charge holds fewer electrons). An **anion** is larger (more electrons repel each other against the same nuclear charge). More positive charge means smaller: $\\ce{Fe^3+}$ < $\\ce{Fe^2+}$.',
      v: table(['Species', 'Atom radius / pm', 'Ion radius / pm'], [['Na', '186', 'Na⁺ 102'], ['Mg', '160', 'Mg²⁺ 72'], ['Cl', '99', 'Cl⁻ 181'], ['S', '104', 'S²⁻ 184']], 'Table comparing atom and ion radii showing that cations are smaller and anions larger than their atoms'),
      n: 'Compare each atom with its ion. Sodium loses its outer shell, so the sodium ion is much smaller. Chlorine gains an electron without a new proton, so repulsion between electrons swells the ion and the chloride ion is far larger than the atom. The more positive charge an ion carries, the harder the nucleus pulls on the remaining electrons, so the smaller it is.',
    }),
    sl('diagram', 'Isoelectronic species', {
      b: '**Isoelectronic** species have the **same number of electrons**. The one with the **higher nuclear charge** is smaller. Here every ion has ten electrons, so the radius falls from N³⁻ to Al³⁺.',
      v: V.iso,
      n: 'These six ions all have ten electrons, like neon, but different numbers of protons. Nitride has only seven protons holding ten electrons, so it is the biggest. Aluminium has thirteen protons for the same ten electrons, so it is the smallest. Same electrons, rising nuclear charge, shrinking size.',
    }),
    sl('example', 'Worked example: arranging by radius', {
      b: r`**Problem.** Arrange in increasing order of radius: (a) $\ce{K+}$, $\ce{Ca^2+}$, $\ce{Cl-}$, $\ce{S^2-}$; (b) Fe, $\ce{Fe^2+}$, $\ce{Fe^3+}$.

**(a)** All have 18 electrons (isoelectronic with Ar). Nuclear charges: Ca 20 > K 19 > Cl 17 > S 16. Higher charge, smaller size: $\ce{Ca^2+}$ < $\ce{K+}$ < $\ce{Cl-}$ < $\ce{S^2-}$ (100, 138, 181 and 184 pm).

**(b)** Same nucleus; fewer electrons gives a smaller ion: $\ce{Fe^3+}$ < $\ce{Fe^2+}$ < Fe.`,
      v: table(['Species', 'Electrons', 'Nuclear charge', 'Radius / pm'], [['Ca²⁺', '18', '20', '100'], ['K⁺', '18', '19', '138'], ['Cl⁻', '18', '17', '181'], ['S²⁻', '18', '16', '184']], 'Table of four ions with eighteen electrons, their nuclear charges and radii in picometres'),
      n: 'First check that the species are isoelectronic. Calcium, potassium, chloride and sulfide ions all have eighteen electrons, so the order follows nuclear charge: calcium ion smallest and sulfide largest. For the iron series the nucleus is the same, so the more electrons removed, the more the rest are pulled in: the iron three plus ion is the smallest.',
    }),
    sl('check', 'Quick check: isoelectronic radii', {
      b: 'Order isoelectronic ions by size.',
      n: 'Quick check. Count electrons first. Then compare nuclear charges.',
      chk: 'iso-radius-mcq',
    }),
    sl('concept', 'Ionisation enthalpy', {
      b: 'The **ionisation enthalpy** is the energy needed to remove an electron from an isolated gaseous atom. It rises with **nuclear charge** and falls with **larger size** and **screening** by inner electrons. For a given shell, penetration makes it **s > p > d > f**.',
      m: [r`\ce{Na(g) -> Na+(g) + e-}`],
      v: table(['Factor', 'Effect on ionisation enthalpy'], [['Greater nuclear charge', 'Increases'], ['Larger atomic size', 'Decreases'], ['More shielding by inner shells', 'Decreases'], ['Penetration of the orbital (s > p > d > f)', 'Higher for more penetrating orbitals'], ['Stable filled or half-filled subshell', 'Higher']], 'Table of five factors and their effect on ionisation enthalpy'),
      n: 'Ionisation enthalpy is the price of taking one electron from a gaseous atom. It is higher when the nucleus pulls harder, so more nuclear charge raises it. It is lower when the electron is far away or shielded by inner electrons. And an electron in an orbital that penetrates close to the nucleus, such as an s orbital, is held more tightly than one in a p orbital.',
    }),
    sl('diagram', 'Trend in first ionisation enthalpy', {
      b: 'Across each period the value **generally rises** to a peak at the noble gas, then falls sharply at the alkali metal of the next period. Down a group it **falls**.',
      v: V.ie,
      n: 'Here is the graph for the first twenty elements. Each period climbs from the alkali metal to the noble gas, and then drops sharply to the next alkali metal, which has a new shell. Notice that the climb is not smooth: there are small dips at boron, oxygen, aluminium and sulfur. Those are the anomalies we explain next.',
    }),
    sl('concept', 'Anomalies in ionisation enthalpy', {
      b: '**Be > B:** the 2s electron of Be is more penetrating than the 2p electron of B. **N > O:** N has a stable half-filled 2p³; in O two electrons share an orbital and repel, so one is easier to remove. The same applies to **Mg > Al** and **P > S**.',
      v: table(['Pair', 'Configurations', 'First ionisation enthalpy / kJ mol⁻¹'], [['Be, B', '2s² and 2s² 2p¹', `${IE1.Be}, ${IE1.B}`], ['N, O', '2p³ and 2p⁴', `${IE1.N}, ${IE1.O}`], ['Mg, Al', '3s² and 3s² 3p¹', `${IE1.Mg}, ${IE1.Al}`], ['P, S', '3p³ and 3p⁴', `${IE1.P}, ${IE1.S}`]], 'Table of four pairs of neighbouring elements with the first ionisation enthalpies showing the anomalies'),
      n: 'Why does boron have lower ionisation enthalpy than beryllium, even though it has more protons? Its outermost electron is in a p orbital, which is shielded by the filled s subshell, so it is easier to remove. And why is nitrogen higher than oxygen? Nitrogen has a stable half filled p subshell, while in oxygen paired electrons repel each other, so one leaves more easily.',
    }),
    sl('concept', 'Successive ionisation enthalpies', {
      b: 'Each removal is harder than the last because the **same nuclear charge** holds **fewer electrons**. A very large **jump** appears when electrons are removed from an inner, filled shell: this shows the number of **valence electrons**.',
      v: table(['Element', 'First', 'Second', 'Third', 'Fourth'], [['Na', '496', '4562', '', ''], ['Mg', '737', '1451', '7733', ''], ['Al', '577', '1817', '2745', '11577']], 'Table of successive ionisation enthalpies in kilojoules per mole of sodium, magnesium and aluminium with a large jump after the valence electrons are removed'),
      n: 'Look at the jumps. For sodium, the second value is almost ten times the first, because the second electron must come from a filled inner shell. For magnesium, the big jump comes after two electrons, and for aluminium after three. So the position of the jump tells us how many valence electrons an element has, and hence its group.',
    }),
    sl('example', 'Worked example: group from successive data', {
      b: r`**Problem.** An element X has successive ionisation enthalpies (kJ mol⁻¹): 786, 1577, 3232, 4356, 16091. Find its group and the formula of its chloride.

**Step 1.** Ratios of successive values: ${[786, 1577, 3232, 4356, 16091].slice(1).map((v, i) => (v / [786, 1577, 3232, 4356, 16091][i]).toFixed(1)).join(', ')}.

**Step 2.** The largest jump (3.7×) follows the **fourth** value, so X has **4 valence electrons**: group 14 (p-block).

**Step 3.** Valency 4, so the chloride is $\ce{XCl4}$.`,
      v: table(['Removal', 'Value / kJ mol⁻¹', 'Ratio to previous'], [['1st', '786', '–'], ['2nd', '1577', '2.0'], ['3rd', '3232', '2.0'], ['4th', '4356', '1.3'], ['5th', '16091', '3.7']], 'Table of the five successive ionisation enthalpies with ratios showing the largest jump after the fourth'),
      n: 'Work out the ratio of each value to the one before it. The ratios are two, two, one point three, and then three point seven. The big jump comes when the fifth electron is removed, which means the first four were valence electrons. Four valence electrons put the element in group fourteen, and a chloride with formula X C l four.',
    }),
    sl('check', 'Quick check: ionisation enthalpy', {
      b: 'Explain an anomaly in ionisation enthalpy.',
      n: 'Quick check. Think about subshell energies and electron pairing.',
      chk: 'ie-anomaly-mcq',
    }),
    sl('concept', 'Electron gain enthalpy', {
      b: 'The **electron gain enthalpy** is the enthalpy change when an isolated gaseous atom gains an electron. A **negative** value means energy is released. It is **most negative for halogens**; noble gases have **positive** values (the electron must enter a new shell). Adding a second electron (O⁻ → O²⁻) is always **endothermic** because of repulsion.',
      m: [r`\ce{Cl(g) + e- -> Cl-(g)}`],
      v: table(['Element', 'F', 'Cl', 'Br', 'I', 'O', 'S'], [['kJ mol⁻¹', String(EGE.F), String(EGE.Cl), String(EGE.Br), String(EGE.I), String(EGE.O), String(EGE.S)]], 'Table of electron gain enthalpies of fluorine, chlorine, bromine, iodine, oxygen and sulfur'),
      n: 'Electron gain enthalpy tells how willing an atom is to accept an electron. The more negative the value, the more energy is released. Halogens release the most, because one extra electron completes their outer shell. Noble gases have positive values, because the new electron would have to start a new shell. The second electron added to an ion is always resisted.',
    }),
    sl('diagram', 'Why chlorine releases more energy than fluorine', {
      b: 'Fluorine is so small that its 2p subshell is **crowded**: the incoming electron is repelled by the electrons already there. Chlorine’s larger 3p subshell has more room, so chlorine has the **more negative** value. The same pattern appears for O and S.',
      v: V.ege,
      n: 'You might expect fluorine to be best at gaining electrons, but the data say chlorine is better. Fluorine’s atom is so small that its second shell is crowded, so the incoming electron feels strong repulsion. Chlorine has more space. Oxygen and sulfur show the same effect, which is why sulfur has the larger bar.',
    }),
    sl('concept', 'Electronegativity', {
      b: '**Electronegativity** is the tendency of an atom to attract the shared pair of electrons in a bond. On the **Pauling scale** F = 4.0 is highest. It **increases across a period** and **decreases down a group**; it is greater for elements that readily form anions.',
      v: table(['Period', 'Group 1', 'Group 2', 'Group 13', 'Group 14', 'Group 15', 'Group 16', 'Group 17'], [['2 (Li to F)', '1.0', '1.5', '2.0', '2.5', '3.0', '3.5', '4.0'], ['3 (Na to Cl)', '0.9', '1.2', '1.5', '1.8', '2.1', '2.5', '3.0']], 'Table of Pauling electronegativity values of the second-period and third-period elements'),
      n: 'Electronegativity describes an atom inside a bond, not an isolated atom. Fluorine is the most electronegative element, and the value rises across a period as atoms get smaller. It falls down a group. A large difference in electronegativity between two atoms means a polar or even ionic bond. Notice that lithium and magnesium, or beryllium and aluminium, have nearly equal values.',
    }),
    sl('concept', 'Valency and chemical character across a period', {
      b: '**Valency** is the number of H or Cl atoms (or twice the number of O atoms) an atom combines with: 1, 2, 3, 4, 3, 2, 1 across period 3 for the hydrides; for oxides it rises from 1 to 7. Oxides change from **basic** (Na₂O, MgO) to **amphoteric** (Al₂O₃) to **acidic** (SiO₂ to Cl₂O₇).',
      v: table(['Element', 'Na', 'Mg', 'Al', 'Si', 'P', 'S', 'Cl'], [['Oxide', 'Na₂O', 'MgO', 'Al₂O₃', 'SiO₂', 'P₄O₁₀', 'SO₃', 'Cl₂O₇'], ['Nature', 'Basic', 'Basic', 'Amphoteric', 'Acidic', 'Acidic', 'Acidic', 'Strongly acidic'], ['Hydride', 'NaH', 'MgH₂', 'AlH₃', 'SiH₄', 'PH₃', 'H₂S', 'HCl']], 'Table of the oxides, their acid-base nature and the hydrides of the third-period elements'),
      n: 'Valency can be read from formulae. Across period three the hydride valency goes one, two, three, four, then back down to three, two, one, because non-metals combine with hydrogen to complete an octet. Oxides change character in an equally orderly way: sodium and magnesium oxides are basic, aluminium oxide is amphoteric, and the rest are acidic.',
    }),
    sl('example', 'Worked example: an amphoteric oxide', {
      b: r`**Problem.** Show that aluminium oxide is amphoteric.

It reacts with an **acid** as a base: $\ce{Al2O3 + 6HCl -> 2AlCl3 + 3H2O}$.

It reacts with a **base** as an acid: $\ce{Al2O3 + 2NaOH + 3H2O -> 2NaAl(OH)4}$.

Because it reacts with both, it is **amphoteric**. Its position between basic MgO and acidic SiO₂ across the period is no accident.`,
      v: table(['Oxide', 'With acid', 'With base', 'Type'], [['Na₂O, MgO', 'Reacts', 'No reaction', 'Basic'], ['Al₂O₃', 'Reacts', 'Reacts', 'Amphoteric'], ['SiO₂, P₄O₁₀, SO₃', 'No reaction', 'Reacts', 'Acidic']], 'Table of how basic, amphoteric and acidic oxides react with acids and bases'),
      n: 'An amphoteric oxide reacts with both acids and bases. Aluminium oxide dissolves in hydrochloric acid, acting as a base, and also in sodium hydroxide, acting as an acid. Oxides on its left only react with acids; oxides on its right only react with bases. Aluminium sits exactly at the changeover.',
    }),
    sl('concept', 'Anomalous behaviour of second-period elements', {
      b: 'Li, Be, B, C, N, O, F differ from the rest of their groups because of **small size**, **high electronegativity** and ionisation enthalpy, and **no d orbitals**, so the maximum covalence is **4**. They also form pπ–pπ multiple bonds (C=C, N≡N, O=O).',
      v: table(['Second period', 'Third period', 'Difference'], [['N: NCl₃ only', 'P: PCl₃ and PCl₅', 'No d orbitals, covalence limited to 4'], ['B: BF₄⁻ (max 4)', 'Al: AlF₆³⁻', 'Al can use d orbitals'], ['C=C, N≡N, O=O', 'Si–Si, P–P, S–S single bonds', 'pπ–pπ bonding in small atoms']], 'Table of three differences between second-period elements and the next member of the group'),
      n: 'The first element of each group is unusual. Its atom is small, strongly electronegative, and has no d orbitals, so it cannot have more than four bonds. Nitrogen forms only the trichloride, while phosphorus forms a pentachloride too. Small atoms also form strong double and triple bonds with themselves, as in nitrogen gas and oxygen gas, which their heavier relatives do not.',
    }),
    sl('concept', 'Diagonal relationships', {
      b: 'Elements in a period and the next one in the **next group diagonally** resemble each other: **Li–Mg**, **Be–Al**, **B–Si**. The reason is a similar **charge-to-size ratio** and electronegativity.',
      v: table(['Pair', 'Similarity'], [['Li and Mg', 'Both form nitrides directly; both carbonates decompose on heating; both form covalent chlorides soluble in ethanol'], ['Be and Al', 'Both oxides are amphoteric; both have the same electronegativity (1.5); both chlorides are covalent'], ['B and Si', 'Both are metalloids; both oxides are acidic; both form volatile hydrides']], 'Table of three diagonal pairs with the properties they share'),
      n: 'Moving one step to the right makes the charge higher, and moving one step down makes the size larger. These two changes cancel, so the diagonal neighbour has a similar charge to size ratio. That is why lithium resembles magnesium, beryllium resembles aluminium, and boron resembles silicon, both in physical properties and in the behaviour of their compounds.',
    }),
    sl('check', 'Quick check: diagonal relationship', {
      b: 'Match a property to the diagonal pair.',
      n: 'Quick check. Think about which pair shares an amphoteric oxide.',
      chk: 'diag-mcq',
    }),
    sl('summary', 'Summary: Part 2', {
      ul: [
        'Atomic radius: decreases across a period, increases down a group; cations smaller, anions larger; among isoelectronic ions, higher nuclear charge means smaller.',
        'Ionisation enthalpy: rises across a period (exceptions Be/B, N/O, Mg/Al, P/S), falls down a group; successive values jump after valence electrons.',
        'Electron gain enthalpy: Cl more negative than F (and S than O) due to crowding; noble gases positive.',
        'Electronegativity rises across a period, falls down a group; oxides go basic → amphoteric → acidic.',
        'Second-period elements are anomalous (small size, no d orbitals); diagonal pairs: Li–Mg, Be–Al, B–Si.',
      ],
      v: table(['Property', 'Period', 'Group'], [['Radius', '↓', '↑'], ['Ionisation enthalpy', '↑', '↓'], ['Electronegativity', '↑', '↓']], 'Summary table of three trends across a period and down a group'),
      n: 'To sum up Part 2. Size falls across a period and rises down a group. Ionisation enthalpy and electronegativity do the opposite. The exceptions, like boron and oxygen, come from subshell structure. Electron gain enthalpy is most negative for chlorine, not fluorine. First elements of groups behave anomalously, and diagonal neighbours resemble each other.',
    }),
    sl('exam-tips', 'Exam tips: Part 2', {
      ul: [
        'For any trend, give the cause: nuclear charge, shells added, or shielding.',
        'For Be/B and N/O, quote subshell structure, not just “stability”.',
        'For isoelectronic ions, state the electron count, then compare nuclear charge.',
        'When explaining Cl > F, mention the small, crowded 2p subshell of fluorine.',
        'Give a pair and two shared properties for a diagonal relationship.',
      ],
      v: table(['Slip', 'Fix'], [['Ionisation enthalpy of O is higher than N', 'N has the half-filled 2p³; N > O'], ['Fluorine has the most negative electron gain enthalpy', 'Chlorine does'], ['Anions are smaller than their atoms', 'Anions are larger']], 'Table of three common slips in Part 2 and their fixes'),
      n: 'Final tips. Always state the reason behind a trend, whether it is nuclear charge, extra shells, or shielding. Name the subshell structure behind anomalies in ionisation enthalpy. Count electrons before comparing isoelectronic ions. For chlorine versus fluorine, mention the crowded second shell. And for diagonal relationships, name the pair and two properties they share.',
    }),
  ],
});
