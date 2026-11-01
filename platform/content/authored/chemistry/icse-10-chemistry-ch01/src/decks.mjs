// ICSE 10 Chemistry ch01 Periodic Table, Periodic Properties and Variations of Properties — two decks: Part 1 (t01–t03)
// modern periodic law, groups and periods up to calcium, nuclear charge and shells, atomic size; Part 2 (t04–t06)
// metallic and non-metallic character, ionisation potential, electron affinity, electronegativity, group 1 and group 17.
import { sl, deck, table, flow, svgV } from './lib.mjs';
import { SHORT_TABLE, TRENDS } from './svgs.mjs';

const V = {
  table: svgV(SHORT_TABLE, 'The first twenty elements in periods 1 to 4 of the modern periodic table, with groups 1, 2 and 13 to 18 and a gap for the transition block'),
  trends: svgV(TRENDS, 'Arrows showing that across a period atomic size and metallic character fall while ionisation potential, electron affinity and electronegativity rise, and the reverse down a group'),
};

export const deck1 = deck({
  part: 1,
  title: 'Periodic Table — Part 1: The modern periodic law and atomic size',
  goals: [
    'State the modern periodic law',
    'Find the group and period of an element (atomic number 1–20) from its electronic configuration',
    'Explain trends using nuclear charge and the number of shells',
    'Compare the atomic sizes of two elements and give a reason',
  ],
  slides: [
    sl('title', 'Why a table?', {
      b: 'Part 1 — 118 elements, but only a few patterns. The periodic table puts elements with similar properties in the same column, so learning one element tells you a lot about its neighbours.',
      v: table(['Family', 'Members (up to calcium)', 'Shared behaviour'], [['Alkali metals (group 1)', 'Li, Na, K', 'Soft, very reactive metals'], ['Alkaline earth metals (group 2)', 'Be, Mg, Ca', 'Reactive metals, form M²⁺ ions'], ['Halogens (group 17)', 'F, Cl', 'Reactive non-metals, form X⁻ ions'], ['Noble gases (group 18)', 'He, Ne, Ar', 'Very unreactive gases']], 'Table of four families of elements with members up to calcium and their shared behaviour'),
      n: 'Namaste! There are more than a hundred elements, but you do not need to learn each one separately. The periodic table places elements that behave alike in the same column. Sodium and potassium, for example, are both soft metals that react fiercely with water. In this part we see why the table works and how the size of atoms changes across it.',
    }),
    sl('concept', 'The modern periodic law', {
      b: '**Modern periodic law:** the properties of elements are a **periodic function of their atomic numbers**. Mendeleev arranged elements by atomic mass, which put some pairs in the wrong order (argon, 39.9, comes before potassium, 39.1). Arranging by **atomic number** (the number of protons) removes these problems, because the atomic number fixes the number of electrons — and the **valence electrons decide chemical properties**.',
      v: table(['Basis', 'Problem or advantage'], [['Atomic mass (Mendeleev)', 'Ar (39.9) would come after K (39.1); isotopes would need separate places'], ['Atomic number (modern)', 'Ar (18) before K (19) naturally; isotopes share one place'], ['Why it works', 'Atomic number → electronic configuration → valence electrons → properties']], 'Table comparing atomic mass and atomic number as the basis of the periodic table'),
      n: 'The modern periodic law says that the properties of elements repeat in a regular way when the elements are arranged by atomic number. Mendeleev used atomic mass, which put argon after potassium even though argon is a noble gas. Atomic number, the number of protons, fixes the number of electrons in an atom, and the outermost electrons decide how an element reacts. That is why atomic number is the correct basis.',
    }),
    sl('check', 'Quick check: the periodic law', {
      b: 'Decide why atomic number, not atomic mass, is the basis of the modern table.',
      n: 'Quick check. Think about what the atomic number fixes in an atom.',
      chk: 'law-mcq',
    }),
    sl('diagram', 'Groups and periods', {
      b: '**Groups** are the 18 vertical columns: elements in a group have the **same number of valence electrons** and similar properties. **Periods** are the 7 horizontal rows: elements in a period have the **same number of electron shells**. Period 1 has 2 elements, periods 2 and 3 have 8 each, and period 4 begins with K and Ca. Groups may be numbered 1–18 (IUPAC) or IA–VIIA and 0 (old).',
      v: V.table,
      n: 'The columns of the table are called groups. All the elements in one group have the same number of electrons in their outer shell, so they behave alike. The rows are called periods, and every element in a period has the same number of shells. Period one has only two elements, periods two and three have eight each, and period four starts with potassium and calcium.',
    }),
    sl('example', 'Worked example: placing an element', {
      b: '**Problem.** Element X has atomic number 15. Find its electronic configuration, period, group and valency, and say whether it is a metal or a non-metal.\n\n**Step 1.** Configuration: 2, 8, 5.\n\n**Step 2.** Three shells → **period 3**.\n\n**Step 3.** Five valence electrons → **group 15** (VA).\n\n**Step 4.** It gains or shares 3 electrons → **valency 3**; a **non-metal** (it is phosphorus).',
      v: table(['Atomic number', 'Configuration', 'Period', 'Group', 'Element'], [['15', '2, 8, 5', '3', '15 (VA)', 'Phosphorus'], ['12', '2, 8, 2', '3', '2 (IIA)', 'Magnesium'], ['19', '2, 8, 8, 1', '4', '1 (IA)', 'Potassium']], 'Table placing three elements by configuration, period and group'),
      n: 'Write the configuration first: fifteen electrons fill shells as two, eight and five. Three shells put the element in period three. Five outer electrons put it in group fifteen. To complete an octet it must gain or share three electrons, so its valency is three, and an element that gains electrons is a non-metal. This element is phosphorus.',
    }),
    sl('check', 'Quick check: group and period', {
      b: 'Place an element from its atomic number.',
      n: 'Quick check. The number of shells gives the period; the outer electrons give the group.',
      chk: 'place-mcq',
    }),
    sl('concept', 'What controls the trends: nuclear charge and shells', {
      b: 'Two factors explain every trend in this chapter. **Across a period**, the number of shells stays the same but the **nuclear charge rises** by one unit each step, so the valence electrons are **pulled in more strongly**. **Down a group**, a **new shell** is added each time, so the valence electrons are **farther from the nucleus** and are also shielded by inner shells — the pull on them is **weaker**, even though the nuclear charge is larger.',
      v: table(['Direction', 'Nuclear charge', 'Number of shells', 'Pull on valence electrons'], [['Across a period (left → right)', 'Increases', 'Same', 'Stronger'], ['Down a group', 'Increases', 'Increases', 'Weaker (distance and shielding win)']], 'Table of how nuclear charge, number of shells and pull on valence electrons change across a period and down a group'),
      n: 'Every trend comes back to one question: how strongly does the nucleus hold the outer electrons? Across a period, protons are added but no new shell, so the pull grows stronger. Down a group, a new shell is added each time. The outer electrons are then farther away and screened by the inner electrons, so the pull becomes weaker, even though the nucleus has more protons.',
    }),
    sl('concept', 'Atomic size', {
      b: '**Atomic size (atomic radius)** is the distance from the centre of the nucleus to the outermost shell. **Across a period it decreases** (stronger nuclear pull on the same number of shells). **Down a group it increases** (a new shell is added each time). Noble-gas radii are measured differently (van der Waals radii, not bonded radii), so they are **not compared** with the other elements of the period.',
      v: table(['Period 3 element', 'Na', 'Mg', 'Al', 'Si', 'P', 'S', 'Cl'], [['Atomic radius / pm', '186', '160', '143', '117', '110', '104', '99']], 'Table of the atomic radii of the period 3 elements from sodium to chlorine, falling from 186 to 99 picometres'),
      n: 'Atomic size is the distance from the nucleus to the outermost shell. Across period three, from sodium to chlorine, the radius falls steadily, because each extra proton pulls the same shells in more tightly. Down a group, each element has one more shell than the one above, so the atoms get bigger. Argon is left out, because the size of a noble gas atom is measured in a different way.',
    }),
    sl('example', 'Worked example: comparing sizes', {
      b: '**Problem.** Give the larger atom in each pair, with a reason: (a) Na or Cl; (b) Li or K; (c) Mg or Ca.\n\n**(a) Na** — same period; Na has the smaller nuclear charge (11 against 17), so its electrons are held less tightly.\n\n**(b) K** — same group; K has four shells, Li only two.\n\n**(c) Ca** — same group; Ca has four shells, Mg three.',
      v: flow('LR', [['a', 'Same period?'], ['b', 'Smaller nuclear charge → larger atom'], ['c', 'Same group?'], ['d', 'More shells → larger atom']], [['a', 'b', 'yes'], ['c', 'd', 'yes']], 'Flow showing how to decide the larger atom in the same period and in the same group'),
      n: 'First ask whether the two elements are in the same period or the same group. In the same period, the element with the smaller nuclear charge is larger, so sodium is larger than chlorine. In the same group, the element with more shells is larger, so potassium beats lithium and calcium beats magnesium.',
    }),
    sl('check', 'Quick check: atomic size', {
      b: 'Pick the largest or smallest atom in a set.',
      n: 'Quick check. Across a period atoms shrink; down a group they grow.',
      chk: 'size-mcq',
    }),
    sl('concept', 'Size of ions (a useful link)', {
      b: 'A **cation is smaller** than its atom: Na (186 pm) → Na⁺ (about 102 pm), because the whole outer shell is lost and the same nuclear charge holds fewer electrons. An **anion is larger** than its atom: Cl (99 pm) → Cl⁻ (about 181 pm), because the extra electron increases repulsion between electrons with no extra nuclear charge.',
      v: table(['Particle', 'Electrons', 'Shells', 'Radius / pm'], [['Na atom', '11', '3', '186'], ['Na⁺ ion', '10', '2', 'about 102'], ['Cl atom', '17', '3', '99'], ['Cl⁻ ion', '18', '3', 'about 181']], 'Table comparing the sizes of sodium and chlorine atoms with their ions'),
      n: 'Atoms change size when they form ions. A sodium atom loses its only outer electron and with it the whole third shell, so the sodium ion is much smaller. A chlorine atom gains an electron; the extra electron repels the others and nothing extra holds it in, so the chloride ion is larger than the chlorine atom.',
    }),
    sl('summary', 'Summary: Part 1', {
      ul: [
        'Modern periodic law: properties are a periodic function of atomic number.',
        'Group = same valence electrons; period = same number of shells.',
        'Across a period: nuclear charge ↑, pull ↑; down a group: shells ↑, pull ↓.',
        'Atomic size decreases across a period and increases down a group; noble gases are not compared.',
        'Cations are smaller and anions larger than their atoms.',
      ],
      v: table(['Trend', 'Across a period', 'Down a group'], [['Nuclear charge', 'Increases', 'Increases'], ['Shells', 'Same', 'Increase'], ['Atomic size', 'Decreases', 'Increases']], 'Summary table of nuclear charge, shells and atomic size across a period and down a group'),
      n: 'Let us sum up Part 1. Properties repeat when elements are arranged by atomic number. Elements in a group share the same number of outer electrons; elements in a period share the same number of shells. Across a period the nucleus pulls harder and atoms get smaller; down a group new shells are added and atoms get bigger.',
    }),
    sl('exam-tips', 'Exam tips: Part 1', {
      ul: [
        'Always write the electronic configuration before naming the group or period.',
        'For “give a reason”, mention nuclear charge (across) or number of shells (down).',
        'Never compare the radius of a noble gas with the other elements of its period.',
        'Group 18 is also called group 0; both numberings are accepted.',
      ],
      v: table(['Slip', 'Fix'], [['Size increases across a period', 'It decreases'], ['K is in period 3', 'K (2, 8, 8, 1) is in period 4'], ['Reason: “more electrons”', 'Reason: larger nuclear charge, same shells']], 'Table of three common slips in Part 1 and their fixes'),
      n: 'Some tips. Write the electronic configuration first, then read off the period and group. When asked for a reason, talk about nuclear charge across a period and the number of shells down a group. And never compare the size of a noble gas atom with the other atoms of its period.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Periodic Table — Part 2: Periodic properties and two families',
  goals: [
    'Relate metallic and non-metallic character to losing and gaining electrons',
    'Define ionisation potential, electron affinity and electronegativity and describe their trends',
    'Compare the reactivity of lithium, sodium and potassium',
    'Explain why the reactivity of halogens decreases down the group',
  ],
  slides: [
    sl('title', 'Patterns you can predict', {
      b: 'Part 2 — the same two factors (nuclear charge and shells) explain how easily atoms lose or gain electrons, and so how reactive they are.',
      v: V.trends,
      n: 'In this part we use the same two ideas, nuclear charge and the number of shells, to predict how easily an atom loses or gains electrons. That one idea explains metallic character, ionisation potential, electron affinity, electronegativity and the reactivity of whole families of elements.',
    }),
    sl('concept', 'Metallic and non-metallic character', {
      b: '**Metallic character** is the tendency of an atom to **lose** electrons and form a positive ion; **non-metallic character** is the tendency to **gain** electrons and form a negative ion. **Across a period**, metallic character **decreases** and non-metallic character **increases** (the nucleus holds electrons more tightly). **Down a group**, metallic character **increases** (outer electrons are held less tightly).',
      v: table(['Period 3', 'Na', 'Mg', 'Al', 'Si', 'P', 'S', 'Cl'], [['Character', 'Metal', 'Metal', 'Metal', 'Metalloid', 'Non-metal', 'Non-metal', 'Non-metal'], ['Oxide', 'Basic', 'Basic', 'Amphoteric', 'Acidic', 'Acidic', 'Acidic', 'Acidic']], 'Table of period 3 elements showing the change from metal to non-metal and from basic to acidic oxides'),
      n: 'A metal tends to lose electrons and a non-metal tends to gain them. Going across period three, sodium, magnesium and aluminium are metals, silicon is in between, and phosphorus, sulfur and chlorine are non-metals. Their oxides change from basic to acidic in the same order. Down a group, atoms lose electrons more easily, so metallic character increases.',
    }),
    sl('check', 'Quick check: metal or non-metal?', {
      b: 'Use position in the table to compare metallic character.',
      n: 'Quick check. Metallic character falls across a period and rises down a group.',
      chk: 'metal-mcq',
    }),
    sl('concept', 'Ionisation potential', {
      b: '**Ionisation potential (ionisation energy)** is the energy needed to remove an electron from the outermost shell of an **isolated gaseous atom**, forming a positive ion: M(g) + energy → M⁺(g) + e⁻. **Across a period it increases** (stronger pull); **down a group it decreases** (electrons farther away and shielded). **Noble gases** have the **highest** values in each period (stable octet or duplet). A **low** ionisation potential means **strong metallic character**.',
      v: table(['Element', 'Li', 'Na', 'K'], [['First ionisation potential / kJ mol⁻¹', '520', '496', '419']], 'Table of the first ionisation potentials of lithium, sodium and potassium, falling down group 1'),
      n: 'Ionisation potential is the energy needed to pull the outermost electron away from a single atom in the gas state. It rises across a period, because the nucleus holds the electrons more tightly, and falls down a group, because the outer electron is farther away. The noble gases have the highest values, since their full outer shells are very stable. Elements with low values, like potassium, are the most metallic.',
    }),
    sl('concept', 'Electron affinity and electronegativity', {
      b: '**Electron affinity** is the energy **released** when an isolated gaseous atom **gains** an electron: X(g) + e⁻ → X⁻(g) + energy. It generally **increases across a period** and **decreases down a group** (chlorine’s value is in fact a little higher than fluorine’s, because the small fluorine atom is crowded). Noble gases have practically **zero** electron affinity. **Electronegativity** is the tendency of an atom **in a molecule** to **attract the shared pair** of electrons towards itself. It **increases across a period** and **decreases down a group**; **fluorine** is the most electronegative element.',
      v: table(['Property', 'Refers to', 'Across a period', 'Down a group'], [['Ionisation potential', 'Isolated atom losing an electron', 'Increases', 'Decreases'], ['Electron affinity', 'Isolated atom gaining an electron', 'Increases', 'Decreases (generally)'], ['Electronegativity', 'Atom in a molecule attracting a shared pair', 'Increases', 'Decreases']], 'Table comparing ionisation potential, electron affinity and electronegativity'),
      n: 'Electron affinity is the energy given out when a single gaseous atom gains an electron. It generally rises across a period and falls down a group, although chlorine actually gives out slightly more energy than fluorine. Electronegativity is different: it describes how strongly an atom already in a molecule pulls a shared pair of electrons towards itself. It rises across a period and falls down a group, and fluorine is the most electronegative element of all.',
    }),
    sl('example', 'Worked example: ordering elements', {
      b: '**Problem.** For the period 3 elements Na, Al, P and Cl, arrange them in increasing order of (a) ionisation potential, (b) atomic size and (c) electronegativity.\n\n**(a)** Na < Al < P < Cl (nuclear charge rises across the period).\n\n**(b)** Cl < P < Al < Na (the reverse: stronger pull, smaller atom).\n\n**(c)** Na < Al < P < Cl (same order as ionisation potential).',
      v: table(['Order asked', 'Answer'], [['Increasing ionisation potential', 'Na < Al < P < Cl'], ['Increasing atomic size', 'Cl < P < Al < Na'], ['Increasing electronegativity', 'Na < Al < P < Cl']], 'Table of the three orders for sodium, aluminium, phosphorus and chlorine'),
      n: 'All four elements are in period three, so only the nuclear charge changes. As it increases from sodium to chlorine, the outer electrons are held more tightly. That makes ionisation potential and electronegativity rise from sodium to chlorine, and atomic size fall in the same direction. Notice that size always runs opposite to the other two.',
    }),
    sl('check', 'Quick check: periodic properties', {
      b: 'Identify the element with the highest or lowest value of a property.',
      n: 'Quick check. Look for the element farthest right and highest up for ionisation potential and electronegativity.',
      chk: 'ip-mcq',
    }),
    sl('concept', 'Group 1: the alkali metals', {
      b: 'Li, Na and K each have **one valence electron** and lose it to form M⁺ ions. Down the group, **atomic size increases** and **ionisation potential decreases**, so the electron is lost more easily: **reactivity increases** (Li < Na < K). All react with water to give an alkali and hydrogen: 2Na + 2H₂O → 2NaOH + H₂. Lithium reacts steadily, sodium vigorously, potassium so violently that the hydrogen catches fire.',
      v: table(['Metal', 'Configuration', 'Reaction with cold water'], [['Lithium', '2, 1', 'Steady fizzing'], ['Sodium', '2, 8, 1', 'Darts about, melts into a ball'], ['Potassium', '2, 8, 8, 1', 'Violent; hydrogen burns with a lilac flame']], 'Table of lithium, sodium and potassium with configurations and their reactions with cold water'),
      n: 'The alkali metals lithium, sodium and potassium all have one electron in their outer shell. Going down the group, the atoms get bigger and the outer electron is held more loosely, so it is lost more easily and the metals become more reactive. In water, lithium fizzes steadily, sodium races around the surface, and potassium reacts so violently that the hydrogen bursts into flame.',
    }),
    sl('concept', 'Group 17: the halogens', {
      b: 'F, Cl, Br and I each have **seven valence electrons** and **gain one** to form X⁻. Down the group, atomic size increases, so the nucleus attracts an incoming electron **less strongly**: electronegativity falls and **reactivity decreases** (F > Cl > Br > I). A more reactive halogen **displaces** a less reactive one from its salt solution: Cl₂ + 2KBr → 2KCl + Br₂ (the colourless solution turns orange-brown).',
      v: table(['Halogen', 'State at room temperature', 'Colour', 'Reactivity'], [['Fluorine', 'Gas', 'Pale yellow', 'Most reactive'], ['Chlorine', 'Gas', 'Greenish-yellow', '↓'], ['Bromine', 'Liquid', 'Red-brown', '↓'], ['Iodine', 'Solid', 'Violet-black', 'Least reactive']], 'Table of the four halogens with their states, colours and reactivity order'),
      n: 'The halogens fluorine, chlorine, bromine and iodine each need one more electron to complete an octet. Down the group the atoms get larger, so the nucleus attracts an extra electron less strongly, and the halogens become less reactive. That is why chlorine water added to potassium bromide solution pushes out bromine, turning the solution orange-brown.',
    }),
    sl('example', 'Worked example: predicting reactions', {
      b: '**Problem.** Predict, with a reason, whether a reaction occurs: (a) chlorine water is added to sodium iodide solution; (b) iodine solution is added to potassium chloride solution. Write the equation where there is a reaction.\n\n**(a) Yes.** Chlorine is more reactive than iodine and displaces it; the solution turns brown: Cl₂ + 2NaI → 2NaCl + I₂.\n\n**(b) No.** Iodine is less reactive than chlorine and cannot displace chloride ions.',
      v: flow('LR', [['a', 'Halogen added'], ['b', 'More reactive than the halide in solution?'], ['c', 'Displacement: new halogen freed'], ['d', 'No reaction']], [['a', 'b'], ['b', 'c', 'yes'], ['b', 'd', 'no']], 'Flow for deciding whether a halogen displaces another from its salt solution'),
      n: 'Compare the two halogens. Chlorine sits above iodine in group seventeen, so it is more reactive and takes the electron from the iodide ion, setting iodine free and turning the solution brown. Iodine is below chlorine, so it cannot take the electron from a chloride ion, and nothing happens.',
    }),
    sl('check', 'Quick check: group trends', {
      b: 'Use reactivity trends in group 1 or group 17.',
      n: 'Quick check. Alkali metals get more reactive down the group; halogens get less reactive.',
      chk: 'halogen-mcq',
    }),
    sl('concept', 'All the trends together', {
      b: 'One rule of thumb: **anything that depends on holding electrons tightly** (ionisation potential, electron affinity, electronegativity, non-metallic character) **rises across a period and falls down a group**. **Anything that depends on losing electrons easily or on size** (atomic size, metallic character, reducing power) does the **opposite**.',
      v: table(['Property', 'Across a period →', 'Down a group ↓'], [['Atomic size', 'Decreases', 'Increases'], ['Metallic character', 'Decreases', 'Increases'], ['Non-metallic character', 'Increases', 'Decreases'], ['Ionisation potential', 'Increases', 'Decreases'], ['Electron affinity', 'Increases', 'Decreases'], ['Electronegativity', 'Increases', 'Decreases']], 'Table of six periodic properties and how each changes across a period and down a group'),
      n: 'Here is a way to remember all the trends. Properties that depend on holding electrons tightly, such as ionisation potential, electron affinity, electronegativity and non-metallic character, increase across a period and decrease down a group. Atomic size and metallic character do exactly the opposite.',
    }),
    sl('summary', 'Summary: Part 2', {
      ul: [
        'Metallic character = ease of losing electrons; non-metallic = ease of gaining them.',
        'Ionisation potential, electron affinity and electronegativity increase across a period and decrease down a group.',
        'Noble gases have the highest ionisation potentials; fluorine is the most electronegative element.',
        'Group 1 reactivity increases down the group (Li < Na < K).',
        'Group 17 reactivity decreases down the group (F > Cl > Br > I); a more reactive halogen displaces a less reactive one.',
      ],
      v: table(['Family', 'Reactivity down the group', 'Reason'], [['Alkali metals', 'Increases', 'Larger atoms lose electrons more easily'], ['Halogens', 'Decreases', 'Larger atoms attract electrons less strongly']], 'Summary table of reactivity trends in group 1 and group 17'),
      n: 'Let us sum up Part 2. Metallic character means losing electrons easily, and non-metallic character means gaining them easily. Ionisation potential, electron affinity and electronegativity rise across a period and fall down a group. Alkali metals get more reactive down their group, while halogens get less reactive, and a more reactive halogen pushes a less reactive one out of its salt.',
    }),
    sl('exam-tips', 'Exam tips: Part 2', {
      ul: [
        'Learn the exact definitions: “isolated gaseous atom” for ionisation potential and electron affinity; “in a molecule” for electronegativity.',
        'Reactivity runs in opposite directions in groups 1 and 17 — explain both with atomic size.',
        'For displacement, compare the positions of the two halogens.',
        'Use the units kJ mol⁻¹ (or eV) for ionisation potential and electron affinity; electronegativity has no unit.',
      ],
      v: table(['Slip', 'Fix'], [['Electronegativity is “energy released”', 'That is electron affinity'], ['Iodine displaces chlorine', 'Only a more reactive halogen displaces'], ['Halogens get more reactive down', 'They get less reactive']], 'Table of three common slips in Part 2 and their fixes'),
      n: 'Final tips. Learn the definitions word for word, especially the phrase isolated gaseous atom, and remember that electronegativity is about an atom in a molecule. Explain the opposite trends in groups one and seventeen using atomic size. And in displacement questions, check which halogen is higher in the group.',
    }),
  ],
});
