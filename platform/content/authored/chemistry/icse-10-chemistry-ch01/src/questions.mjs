// ICSE 10 Chemistry ch01 Periodic Table, Periodic Properties and Variations of Properties — question bank (ICSE 2027
// specimen style: objective items, 1-mark names/observations/equations, bracket completions, matches and 10-mark
// structured questions). Stems name their own elements and data. MCQ keys are placed by the builder; AR keys planned: a c b d.
import { mk, add } from './lib.mjs';

const { mcq, ar, tf, fill, match, num, short, long } = mk;

// ---------------------------------------------------------------- t01 periodic law, groups and periods
add('law-mcq', mcq({
  stem: 'In the modern periodic table, argon (atomic mass 39.9) is placed before potassium (atomic mass 39.1). This is because elements are arranged in order of their:',
  right: 'atomic numbers',
  wrong: ['atomic masses', 'densities', 'dates of discovery'],
  sol: 'Ar has atomic number 18 and K has 19 — option (@K).',
  d: 1, c: 'understanding', t: [1],
}));
add('place-mcq', mcq({
  stem: 'An element has the electronic configuration 2, 8, 6. In the periodic table it is found in:',
  right: 'period 3, group 16',
  wrong: ['period 2, group 16', 'period 3, group 6', 'period 6, group 3'],
  sol: 'Three shells → period 3; six valence electrons → group 16 (VIA) — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('period4-mcq', mcq({
  stem: 'Which element with atomic number from 1 to 20 is in period 4 and group 2?',
  right: 'Calcium (atomic number 20)',
  wrong: ['Magnesium (atomic number 12)', 'Potassium (atomic number 19)', 'Beryllium (atomic number 4)'],
  sol: 'Ca: 2, 8, 8, 2 — four shells, two valence electrons — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('valency-mcq', mcq({
  stem: 'Element Q is in period 2 and group 15. Its valency and the formula of its hydride are:',
  right: '3 and QH₃',
  wrong: ['5 and QH₅', '2 and QH₂', '3 and Q₃H'],
  sol: 'Q is nitrogen (2, 5): needs three electrons, hydride NH₃ — option (@K).',
  d: 3, c: 'application', t: [1],
}));
add('group-tf', tf({
  stem: 'Elements in the same period of the periodic table have the same number of valence electrons.',
  key: 'f',
  sol: 'False: elements in the same period have the same number of shells; elements in the same group have the same number of valence electrons.',
  d: 1, c: 'recall', t: [1],
}));
add('law-short1', short({
  marks: 1,
  stem: 'State the modern periodic law.',
  model: 'Physical and chemical properties of elements are periodic functions of their atomic numbers: they recur at regular intervals when the elements are arranged by atomic number.',
  sol: 'Definition.',
  scheme: [['Periodic function of atomic number', 1]],
  d: 1, c: 'recall', t: [1],
}));
add('group-short1', short({
  marks: 1,
  stem: 'An element Z has 3 shells and 2 electrons in its outermost shell. Name the group (by number) and the period to which Z belongs.',
  model: 'Group 2 (IIA), period 3 (Z is magnesium).',
  sol: 'Group 2, period 3.',
  scheme: [['Group 2 and period 3', 1]],
  d: 1, c: 'application', t: [1],
}));
add('atomicno-num', num({
  stem: 'What is the atomic number of the element in period 3 and group 17 of the periodic table?',
  value: 17, tol: 0,
  sol: 'Period 3 → three shells; group 17 → seven valence electrons; configuration 2, 8, 7, so atomic number = 2 + 8 + 7 = 17 (chlorine).',
  scheme: [['17', 1]],
  d: 2, c: 'application', t: [1],
}), () => 2 + 8 + 7 === 17 || 'Z');

add('period-num', num({
  stem: 'What is the atomic number of the element placed in period 2 and group 14?',
  value: 6, tol: 0,
  sol: 'Period 2 → two shells; group 14 → four valence electrons; configuration 2, 4, so atomic number = 2 + 4 = 6 (carbon).',
  scheme: [['6', 1]],
  d: 1, c: 'application', t: [1],
}), () => 2 + 4 === 6 || 'Z');
add('config-match', match({
  stem: 'Match each electronic configuration in Column A with the position of the element in Column B.',
  pairs: [
    ['2, 8, 8, 2', 'Period 4, group 2'],
    ['2, 8, 3', 'Period 3, group 13'],
    ['2, 6', 'Period 2, group 16'],
    ['2, 8, 8', 'Period 3, group 18'],
  ],
  order: [2, 0, 3, 1],
  sol: '2, 8, 8, 2 (Ca) → period 4, group 2; 2, 8, 3 (Al) → period 3, group 13; 2, 6 (O) → period 2, group 16; 2, 8, 8 (Ar) → period 3, group 18.',
  d: 2, c: 'application', t: [1],
}));

// ---------------------------------------------------------------- t02 nuclear charge and shells
add('pull-mcq', mcq({
  stem: 'On moving from lithium to fluorine across period 2, the number of shells stays the same. The force of attraction between the nucleus and the valence electrons:',
  right: 'increases, because the nuclear charge increases',
  wrong: ['decreases, because more electrons repel each other', 'stays the same, because the number of shells is the same', 'decreases, because the atom gets larger'],
  sol: 'Nuclear charge rises from 3 to 9 with no new shell — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('shield-ar', ar({
  a: 'Potassium loses its valence electron more easily than sodium.',
  r: 'The valence electron of potassium is in the fourth shell, farther from the nucleus and shielded by more inner electrons.',
  key: 'c',
  sol: 'Both are true, and R explains A — option (c).',
  d: 2, c: 'understanding', t: [2, 6],
}));
add('nuclear-short1', short({
  marks: 1,
  stem: 'What happens to the nuclear charge of the atoms as you move down group 1 from lithium to potassium?',
  model: 'It increases (from +3 to +19), but the valence electron is held less tightly because new shells are added.',
  sol: 'Increases.',
  scheme: [['Increases', 1]],
  d: 1, c: 'understanding', t: [2],
}));
add('pull-short2', short({
  marks: 2,
  stem: 'Give a reason for each: (a) the nuclear pull on the valence electrons increases from sodium to chlorine; (b) it decreases from fluorine to chlorine.',
  model: '(a) Na to Cl are in the same period: the number of shells stays three while the nuclear charge rises from +11 to +17. (b) Chlorine has one more shell than fluorine, so its valence electrons are farther from the nucleus and more shielded.',
  sol: 'Nuclear charge; extra shell.',
  scheme: [['(a)', 1], ['(b)', 1]],
  d: 2, c: 'understanding', t: [2],
}));

// ---------------------------------------------------------------- t03 atomic size
add('size-mcq', mcq({
  stem: 'Which atom in the set Mg, Al, Si, S has the largest atomic radius?',
  right: 'Mg',
  wrong: ['Al', 'Si', 'S'],
  sol: 'All are in period 3; size decreases across the period, so Mg (furthest left) is largest — option (@K).',
  d: 1, c: 'application', t: [3],
}));
add('ion-mcq', mcq({
  stem: 'Which of the following has the smallest radius?',
  right: 'Mg²⁺',
  wrong: ['Mg', 'Na', 'Cl⁻'],
  sol: 'Mg²⁺ has lost its third shell and has 12 protons holding 10 electrons — option (@K).',
  d: 3, c: 'analysis', t: [3],
}));
add('noble-ar', ar({
  a: 'The atomic radius of argon is not compared with that of chlorine to show the trend across period 3.',
  r: 'Argon has more protons than chlorine.',
  key: 'd',
  sol: 'Both statements are true, but the reason is that argon’s radius is a van der Waals radius, measured differently — option (d).',
  d: 3, c: 'understanding', t: [3],
}));
add('size-tf', tf({
  stem: 'The chloride ion, Cl⁻, is larger than the chlorine atom.',
  key: 't',
  sol: 'True: the extra electron increases electron repulsion with no increase in nuclear charge.',
  d: 2, c: 'understanding', t: [3],
}));
add('size-short1', short({
  marks: 1,
  stem: 'Name the element of period 3 (other than argon) that has the smallest atomic size.',
  model: 'Chlorine.',
  sol: 'Cl.',
  scheme: [['Chlorine', 1]],
  d: 1, c: 'recall', t: [3],
}));
add('size2-short1', short({
  marks: 1,
  stem: 'Arrange B, Be, Li and C in order of increasing atomic size.',
  model: 'C < B < Be < Li.',
  sol: 'Size falls across period 2.',
  scheme: [['Correct order', 1]],
  d: 2, c: 'application', t: [3],
}));
add('size-short2', short({
  marks: 2,
  stem: 'Explain why (a) the atomic size of potassium is greater than that of sodium and (b) a sodium ion is smaller than a sodium atom.',
  model: '(a) K (2, 8, 8, 1) has four shells and Na (2, 8, 1) three; the extra shell outweighs the larger nuclear charge. (b) Na⁺ has lost its only outer electron and with it the whole third shell; 11 protons now hold 10 electrons in two shells.',
  sol: 'Extra shell; loss of the outer shell.',
  scheme: [['(a)', 1], ['(b)', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('size-short3', short({
  marks: 3,
  stem: 'Elements P, Q and R have atomic numbers 9, 17 and 19. (a) Write their electronic configurations. (b) Which two are in the same group? (c) Arrange them in increasing order of atomic size, with a reason.',
  model: '(a) P: 2, 7; Q: 2, 8, 7; R: 2, 8, 8, 1. (b) P and Q (both seven valence electrons, group 17). (c) P < Q < R: P has two shells, Q three; R has four shells.',
  sol: 'Configurations; group 17; shells.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 3, c: 'application', t: [1, 3],
}));

// ---------------------------------------------------------------- t04 metallic and non-metallic character
add('metal-mcq', mcq({
  stem: 'Which element has the most metallic character?',
  right: 'Potassium',
  wrong: ['Sodium', 'Magnesium', 'Aluminium'],
  sol: 'Metallic character increases down a group and decreases across a period; K is lowest and furthest left — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('oxide-mcq', mcq({
  stem: 'Across period 3, the oxides of the elements change from basic to acidic. The oxide that is amphoteric is:',
  right: 'aluminium oxide, Al₂O₃',
  wrong: ['magnesium oxide, MgO', 'sulphur dioxide, SO₂', 'sodium oxide, Na₂O'],
  sol: 'Al₂O₃ reacts with both acids and alkalis — option (@K).',
  d: 2, c: 'recall', t: [4],
}));
add('metalloid-mcq', mcq({
  stem: 'Silicon has some properties of metals and some of non-metals. Such an element is called a:',
  right: 'metalloid',
  wrong: ['noble gas', 'transition element', 'halogen'],
  sol: 'Option (@K).',
  d: 1, c: 'recall', t: [4],
}));
add('metal-short1', short({
  marks: 1,
  stem: 'Arrange Al, Mg, Na and Si in order of increasing metallic character.',
  model: 'Si < Al < Mg < Na.',
  sol: 'Metallic character falls across period 3.',
  scheme: [['Correct order', 1]],
  d: 2, c: 'application', t: [4],
}));
add('metal-short2', short({
  marks: 2,
  stem: 'Define metallic character. Explain why metallic character increases from magnesium to calcium.',
  model: 'Metallic character is the tendency of an atom to lose electrons and form a positive ion. Calcium has one more shell than magnesium, so its valence electrons are farther from the nucleus, held less tightly and lost more easily.',
  sol: 'Definition; extra shell.',
  scheme: [['Definition', 1], ['Reason', 1]],
  d: 2, c: 'understanding', t: [4],
}));

// ---------------------------------------------------------------- t05 IP, EA, EN
add('ip-mcq', mcq({
  stem: 'Which element of period 2 has the highest ionisation potential?',
  right: 'Neon',
  wrong: ['Fluorine', 'Lithium', 'Oxygen'],
  sol: 'The noble gas has a stable octet — option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('ipgroup-mcq', mcq({
  stem: 'The first ionisation potentials of Li, Na and K are 520, 496 and 419 kJ mol⁻¹. The fall in value down the group is mainly due to:',
  right: 'the increase in atomic size and shielding by inner shells',
  wrong: ['the decrease in nuclear charge', 'the increase in the number of valence electrons', 'the decrease in the number of shells'],
  sol: 'Outer electron farther away and more shielded — option (@K).',
  d: 2, c: 'understanding', t: [5],
}));
add('en-mcq', mcq({
  stem: 'In a molecule of hydrogen chloride, the shared pair of electrons lies closer to chlorine. The property of chlorine responsible for this is its:',
  right: 'higher electronegativity',
  wrong: ['larger atomic size', 'lower ionisation potential', 'higher metallic character'],
  sol: 'Electronegativity describes attraction for a shared pair — option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('ea-mcq', mcq({
  stem: 'The energy released when an isolated gaseous chlorine atom gains an electron to form Cl⁻ is called its:',
  right: 'electron affinity',
  wrong: ['ionisation potential', 'electronegativity', 'atomic radius'],
  sol: 'Option (@K).',
  d: 1, c: 'recall', t: [5],
}));
add('eaorder-mcq', mcq({
  stem: 'Which shows the elements N, O and F in increasing order of electronegativity?',
  right: 'N < O < F',
  wrong: ['F < O < N', 'O < N < F', 'N < F < O'],
  sol: 'Electronegativity rises across period 2 — option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('eacl-mcq', mcq({
  stem: 'The electron affinity of chlorine is slightly greater than that of fluorine, although fluorine is higher in group 17. The best explanation is that:',
  right: 'the fluorine atom is so small that an incoming electron is repelled by the crowded electrons already present',
  wrong: ['chlorine has fewer shells than fluorine', 'fluorine has a smaller nuclear charge than chlorine', 'chlorine is more electronegative than fluorine'],
  sol: 'Electron–electron repulsion in the small 2nd shell of F reduces the energy released — option (@K).',
  d: 4, c: 'analysis', t: [5],
}));
add('ea-ar', ar({
  a: 'Noble gases have practically zero electron affinity.',
  r: 'Noble gases have the lowest ionisation potentials in their periods.',
  key: 'a',
  sol: 'A is true (a stable octet or duplet does not accept an electron); R is false: they have the highest ionisation potentials — option (a).',
  d: 2, c: 'understanding', t: [5],
}));
add('ip-ar', ar({
  a: 'Sodium has a higher ionisation potential than magnesium.',
  r: 'Ionisation potential generally increases across a period from left to right.',
  key: 'b',
  sol: 'A is false (magnesium, further right, has the higher value); R is true — option (b).',
  d: 2, c: 'application', t: [5],
}));
add('en-tf', tf({
  stem: 'Electronegativity is the energy released when an isolated gaseous atom gains an electron.',
  key: 'f',
  sol: 'False: that is electron affinity. Electronegativity is the tendency of an atom in a molecule to attract the shared pair.',
  d: 2, c: 'understanding', t: [5],
}));
add('trend-fill', fill({
  stem: 'Complete each sentence by choosing the correct word from the bracket.\n\n(a) Across a period from left to right, ionisation potential ___ (increases / decreases).\n\n(b) Down a group, electronegativity ___ (increases / decreases).\n\n(c) The element with the highest electronegativity is ___ (chlorine / fluorine).',
  acc: [['increases'], ['decreases'], ['fluorine']],
  sol: '(a) **increases**; (b) **decreases**; (c) **fluorine**.',
  d: 1, c: 'recall', t: [5],
}));
add('ip-fill', fill({
  stem: 'The energy required to remove an electron from the outermost shell of an isolated gaseous atom is called ___ potential.',
  acc: [['ionisation', 'ionization']],
  sol: '**Ionisation** potential.',
  d: 1, c: 'recall', t: [5],
}));
add('ip-short1', short({
  marks: 1,
  stem: 'Name the element in period 3 with the highest electronegativity.',
  model: 'Chlorine.',
  sol: 'Cl.',
  scheme: [['Chlorine', 1]],
  d: 1, c: 'recall', t: [5],
}));
add('ipdef-short1', short({
  marks: 1,
  stem: 'Write the equation that represents the first ionisation of a gaseous sodium atom.',
  model: 'Na(g) + energy → Na⁺(g) + e⁻.',
  sol: 'Equation.',
  scheme: [['Equation with (g) and electron', 1]],
  d: 2, c: 'application', t: [5],
}));
add('ipea-short1', short({
  marks: 1,
  stem: 'Which has the higher ionisation potential: nitrogen or phosphorus?',
  model: 'Nitrogen (fewer shells; valence electrons closer to the nucleus).',
  sol: 'N.',
  scheme: [['Nitrogen', 1]],
  d: 1, c: 'application', t: [5],
}));
add('prop-short2', short({
  marks: 2,
  stem: 'Distinguish between electron affinity and electronegativity, giving one similarity in their trends.',
  model: 'Electron affinity is the energy released when an isolated gaseous atom gains an electron; electronegativity is the tendency of an atom in a molecule to attract a shared pair of electrons. Both (generally) increase across a period and decrease down a group.',
  sol: 'Definitions; same trend.',
  scheme: [['Difference', 1], ['Similarity', 1]],
  d: 2, c: 'analysis', t: [5],
}));
add('prop-match', match({
  stem: 'Match each property in Column A with the correct description in Column B.',
  pairs: [
    ['Ionisation potential', 'Energy needed to remove an electron from an isolated gaseous atom'],
    ['Electron affinity', 'Energy released when an isolated gaseous atom gains an electron'],
    ['Electronegativity', 'Pull of an atom in a molecule on a shared pair'],
    ['Atomic radius', 'Distance from the nucleus to the outermost shell'],
    ['Metallic character', 'Tendency to lose electrons and form cations'],
  ],
  order: [3, 0, 4, 1, 2],
  sol: 'Ionisation potential → removal energy; electron affinity → energy released on gain; electronegativity → pull on shared pair; atomic radius → nucleus-to-outer-shell distance; metallic character → tendency to lose electrons.',
  d: 2, c: 'recall', t: [3, 4, 5],
}));
add('ip-short3', short({
  marks: 3,
  stem: 'The elements of period 2 are Li, Be, B, C, N, O, F and Ne. (a) Which has the lowest ionisation potential? (b) Which is the most electronegative? (c) Explain why ionisation potential generally increases from Li to Ne.',
  model: '(a) Lithium. (b) Fluorine. (c) All have two shells, but the nuclear charge rises from +3 to +10, so the valence electrons are held more tightly and more energy is needed to remove one.',
  sol: 'Li; F; nuclear charge.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 2, c: 'application', t: [5],
}));

// ---------------------------------------------------------------- t06 alkali metals and halogens
add('halogen-mcq', mcq({
  stem: 'Chlorine water is added to colourless potassium iodide solution. The observation and the reason are:',
  right: 'the solution turns brown, because chlorine is more reactive than iodine and displaces it',
  wrong: ['no change, because iodine is more reactive than chlorine', 'a white precipitate forms, because potassium chloride is insoluble', 'the solution turns green, because chlorine dissolves'],
  sol: 'Cl₂ + 2KI → 2KCl + I₂ — option (@K).',
  d: 2, c: 'application', t: [6],
}));
add('alkali-mcq', mcq({
  stem: 'Small pieces of lithium, sodium and potassium are dropped into separate troughs of water. The metal that reacts most vigorously, with the hydrogen catching fire, is:',
  right: 'potassium, because it loses its valence electron most easily',
  wrong: ['lithium, because it is the smallest atom', 'sodium, because it is in the middle of the group', 'lithium, because it has the highest nuclear charge'],
  sol: 'Reactivity of group 1 increases down the group — option (@K).',
  d: 2, c: 'application', t: [6],
}));
add('brom-mcq', mcq({
  stem: 'Bromine water is added separately to sodium chloride solution and to sodium iodide solution. A reaction occurs:',
  right: 'only with sodium iodide',
  wrong: ['only with sodium chloride', 'with both solutions', 'with neither solution'],
  sol: 'Bromine is more reactive than iodine but less reactive than chlorine — option (@K).',
  d: 3, c: 'analysis', t: [6],
}));
add('halogen-ar', ar({
  a: 'Fluorine is the most reactive halogen.',
  r: 'Fluorine has the smallest atom in group 17, so its nucleus strongly attracts an incoming electron.',
  key: 'c',
  sol: 'Both are true, and R explains A — option (c).',
  d: 2, c: 'understanding', t: [6],
}));
add('alkali-tf', tf({
  stem: 'The reactivity of the halogens increases down group 17 from fluorine to iodine.',
  key: 'f',
  sol: 'False: it decreases, because larger atoms attract an extra electron less strongly.',
  d: 1, c: 'recall', t: [6],
}));
add('react-fill', fill({
  stem: 'The most reactive metal among lithium, sodium and potassium is ___.',
  acc: [['potassium', 'K']],
  sol: '**Potassium**.',
  d: 1, c: 'recall', t: [6],
}));
add('water-short1', short({
  marks: 1,
  stem: 'Write a balanced equation for the reaction of sodium with cold water.',
  model: '2Na + 2H₂O → 2NaOH + H₂.',
  sol: 'Equation.',
  scheme: [['Balanced equation', 1]],
  d: 1, c: 'application', t: [6],
}));
add('displace-short1', short({
  marks: 1,
  stem: 'Write a balanced equation for the reaction of chlorine with potassium bromide solution.',
  model: 'Cl₂ + 2KBr → 2KCl + Br₂.',
  sol: 'Equation.',
  scheme: [['Balanced equation', 1]],
  d: 1, c: 'application', t: [6],
}));
add('obs-short1', short({
  marks: 1,
  stem: 'State what you would observe when bromine water is added to potassium iodide solution.',
  model: 'The solution turns brown as iodine is set free.',
  sol: 'Brown colour.',
  scheme: [['Brown colour (iodine)', 1]],
  d: 2, c: 'application', t: [6],
}));
add('alkali-short2', short({
  marks: 2,
  stem: 'Lithium reacts gently with water, but potassium reacts violently. Explain this difference in terms of atomic size and ionisation potential.',
  model: 'Potassium (2, 8, 8, 1) is a much larger atom than lithium (2, 1); its valence electron is farther from the nucleus and more shielded, so its ionisation potential is lower. It loses the electron much more easily and so reacts much faster.',
  sol: 'Larger atom; lower ionisation potential.',
  scheme: [['Atomic size', 1], ['Ionisation potential and reactivity', 1]],
  d: 2, c: 'analysis', t: [6],
}));
add('halogen-short3', short({
  marks: 3,
  stem: 'A student adds chlorine water to a solution of sodium bromide, and iodine solution to a solution of sodium chloride. (a) State the observation in each case. (b) Write the balanced equation for the reaction that occurs. (c) Explain the difference.',
  model: '(a) Sodium bromide: the colourless solution turns orange-brown. Sodium chloride with iodine: no change (no reaction). (b) Cl₂ + 2NaBr → 2NaCl + Br₂. (c) Chlorine is above bromine in group 17 and is more reactive, so it displaces bromide; iodine is below chlorine and less reactive, so it cannot displace chloride.',
  sol: 'Orange-brown / no change; equation; reactivity order.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 3, c: 'analysis', t: [6],
}));

// ---------------------------------------------------------------- 10-mark structured questions
add('law-long', long({
  stem: '(a) State the modern periodic law, and explain why atomic number is a better basis for classification than atomic mass. [2]\n\n(b) Element A has atomic number 13 and element B has atomic number 20. Write their electronic configurations and state the period and group of each. [2]\n\n(c) Arrange Na, Mg, Al and Cl in order of decreasing atomic size and give a reason. [3]\n\n(d) Explain why (i) atomic size increases down a group and (ii) the size of argon is not compared with the other elements of period 3. [3]',
  model: '(a) Properties of elements are a periodic function of their atomic numbers. Atomic number fixes the number of electrons and so the valence electrons, which decide properties; ordering by mass would wrongly put Ar (39.9) after K (39.1).\n\n(b) A: 2, 8, 3 — period 3, group 13 (aluminium). B: 2, 8, 8, 2 — period 4, group 2 (calcium).\n\n(c) Na > Mg > Al > Cl. Same period (three shells); nuclear charge increases from +11 to +17, pulling the shells in more.\n\n(d) (i) A new shell is added at each step down a group, so the outermost electrons are farther from the nucleus. (ii) Argon’s radius is a van der Waals (non-bonded) radius, measured differently from the bonded radii of the others.',
  sol: 'Law; configurations; order; reasons.',
  scheme: [['(a) law', 1], ['(a) reason', 1], ['(b) A', 1], ['(b) B', 1], ['(c) order', 1], ['(c) reason', 2], ['(d)(i)', 1.5], ['(d)(ii)', 1.5]],
  d: 3, c: 'application', t: [1, 2, 3],
}));
add('trend-long', long({
  stem: '(a) Define (i) ionisation potential and (ii) electronegativity. [2]\n\n(b) Explain why the ionisation potential of potassium is lower than that of sodium. [2]\n\n(c) The elements of period 3 are Na, Mg, Al, Si, P, S, Cl and Ar. Name: (i) the most metallic element, (ii) the element with an amphoteric oxide, (iii) the element with the highest ionisation potential. [3]\n\n(d) Give one reason each why (i) electronegativity increases across a period, (ii) noble gases have very high ionisation potentials, and (iii) chlorine is more non-metallic than sulphur. [3]',
  model: '(a) (i) The energy needed to remove an electron from the outermost shell of an isolated gaseous atom. (ii) The tendency of an atom in a molecule to attract the shared pair of electrons towards itself.\n\n(b) K has four shells and Na three, so the valence electron of K is farther from the nucleus and more shielded; less energy is needed to remove it.\n\n(c) (i) Sodium. (ii) Aluminium. (iii) Argon.\n\n(d) (i) Nuclear charge rises with the same number of shells, so the attraction for the shared pair increases. (ii) They have stable complete outer shells (octet or duplet). (iii) Chlorine has a larger nuclear charge and smaller size than sulphur, so it gains an electron more readily.',
  sol: 'Definitions; shells; three names; three reasons.',
  scheme: [['(a)(i)', 1], ['(a)(ii)', 1], ['(b)', 2], ['(c)(i)', 1], ['(c)(ii)', 1], ['(c)(iii)', 1], ['(d)(i)', 1], ['(d)(ii)', 1], ['(d)(iii)', 1]],
  d: 3, c: 'understanding', t: [4, 5],
}));
add('family-long', long({
  stem: '(a) Write the electronic configurations of lithium, sodium and potassium, and state what they have in common. [2]\n\n(b) Arrange the three metals in order of increasing reactivity and explain the order. [2]\n\n(c) Chlorine gas is bubbled into potassium bromide solution. (i) State the observation. (ii) Write the balanced equation. (iii) Name the type of reaction. [3]\n\n(d) Explain why the reactivity of the halogens decreases from fluorine to iodine, and predict whether bromine will react with potassium chloride solution. [3]',
  model: '(a) Li 2, 1; Na 2, 8, 1; K 2, 8, 8, 1. Each has one valence electron (group 1).\n\n(b) Li < Na < K. Down the group atomic size increases and ionisation potential decreases, so the valence electron is lost more easily.\n\n(c) (i) The colourless solution turns orange-brown. (ii) Cl₂ + 2KBr → 2KCl + Br₂. (iii) Displacement (redox) reaction.\n\n(d) Down the group atoms become larger, so the nucleus attracts an incoming electron less strongly; the tendency to gain an electron falls. Bromine will not react with potassium chloride, because bromine is less reactive than chlorine.',
  sol: 'Configurations; order; displacement; reasons and prediction.',
  scheme: [['(a)', 2], ['(b) order', 1], ['(b) reason', 1], ['(c)(i)', 1], ['(c)(ii)', 1], ['(c)(iii)', 1], ['(d) reason', 2], ['(d) prediction', 1]],
  d: 3, c: 'application', t: [6],
}));
add('xyz-long', long({
  stem: 'Three elements X, Y and Z have atomic numbers 11, 16 and 19.\n\n(a) Write their electronic configurations and state which two are in the same group. [2]\n\n(b) Which of X and Z has the larger atom, and which has the higher ionisation potential? [2]\n\n(c) (i) Which of the three is a non-metal? (ii) Write the formula of the compound formed between X and Y. (iii) Is that compound formed by gain or loss of electrons by Y? [3]\n\n(d) Arrange X, Y and Z in increasing order of (i) metallic character and (ii) electronegativity, and give a reason for the position of Y in (ii). [3]',
  model: '(a) X 2, 8, 1; Y 2, 8, 6; Z 2, 8, 8, 1. X and Z are in group 1.\n\n(b) Z has the larger atom (four shells); X has the higher ionisation potential (electron closer to the nucleus).\n\n(c) (i) Y (sulphur). (ii) X₂Y (Na₂S). (iii) Y gains two electrons (forming Y²⁻).\n\n(d) (i) Y < X < Z. (ii) Z < X < Y. Y has a large nuclear charge (+16) with three shells and six valence electrons, so it attracts a shared pair most strongly.',
  sol: 'Configurations; size and IP; non-metal and formula; orders.',
  scheme: [['(a)', 2], ['(b) size', 1], ['(b) IP', 1], ['(c)(i)', 1], ['(c)(ii)', 1], ['(c)(iii)', 1], ['(d)(i)', 1], ['(d)(ii)', 1], ['(d) reason', 1]],
  d: 4, c: 'analysis', t: [1, 3, 4, 5],
}));
add('period3-long', long({
  stem: '(a) What is common to all the elements of period 3? What changes from one element to the next? [2]\n\n(b) Classify Na, Si and S as metal, metalloid or non-metal. [2]\n\n(c) The oxides of period 3 change from basic to acidic. (i) Name one basic oxide and one acidic oxide. (ii) Explain this change in terms of metallic character. [3]\n\n(d) Explain why (i) chlorine has a higher electron affinity than sulphur, (ii) magnesium is more metallic than aluminium, and (iii) the atomic radius falls from Na to Cl. [3]',
  model: '(a) All have three shells. The nuclear charge (and number of valence electrons) increases by one from each element to the next.\n\n(b) Na: metal; Si: metalloid; S: non-metal.\n\n(c) (i) Basic: Na₂O or MgO; acidic: SO₂ (or SO₃, P₂O₅). (ii) Across the period metallic character decreases and non-metallic character increases; metal oxides are basic, non-metal oxides acidic.\n\n(d) (i) Chlorine has a larger nuclear charge and smaller size, so an incoming electron is attracted more strongly and more energy is released. (ii) Magnesium has a smaller nuclear charge (+12) than aluminium (+13) and is larger, so it loses electrons more easily. (iii) Nuclear charge rises with no new shell, pulling the electrons closer.',
  sol: 'Shells; classification; oxides; reasons.',
  scheme: [['(a)', 2], ['(b)', 2], ['(c)(i)', 1], ['(c)(ii)', 2], ['(d)(i)', 1], ['(d)(ii)', 1], ['(d)(iii)', 1]],
  d: 3, c: 'understanding', t: [2, 4, 5],
}));
