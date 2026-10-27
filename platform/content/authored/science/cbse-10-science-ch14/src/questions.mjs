// ch14 Periodic Classification of Elements — question bank (formative-only chapter: weighted to understanding,
// activities and practical work). AR keys planned: d a b a c c d.
import { mk, add, r } from '../../cbse-10-science-ch06/src/lib.mjs';
import { shellsOf, positionOf, valencyOf } from './svgs.mjs';

const { mcq, ar, tf, fill, match, num, short, long, part } = mk;
const near = (a, b, tol = 1e-9) => Math.abs(a - b) <= tol;
const mean = (a, b) => (a + b) / 2;
const cfg = (z) => shellsOf(z).join(', ');
// Independent formula engine: cross the valencies and cancel the common factor.
const gcd = (a, b) => (b ? gcd(b, a % b) : a);
const formula = (va, vb) => [vb / gcd(va, vb), va / gcd(va, vb)];

// ---------------------------------------------------------------- t01 Döbereiner and Newlands
add('triad-def-mcq', mcq({
  stem: 'In each of Döbereiner’s triads, written in order of increasing atomic mass, the atomic mass of the middle element is:',
  right: 'roughly the average of the atomic masses of the other two',
  wrong: ['exactly double the atomic mass of the first element', 'the sum of the atomic masses of the other two', 'always the largest of the three'],
  sol: 'Döbereiner noticed that the middle mass is close to the mean of the first and third — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('triad-set-mcq', mcq({
  stem: 'Four sets of three chemically similar elements are listed with their atomic masses (u). Which set obeys Döbereiner’s rule most closely?',
  right: '35.5, 79.9, 126.9',
  wrong: ['14.0, 31.0, 74.9', '12.0, 28.1, 72.6', '16.0, 32.1, 79.0'],
  sol: r`Step 1 — Mean of the outer masses for each set: $\dfrac{35.5 + 126.9}{2} = 81.2$; $\dfrac{14.0 + 74.9}{2} \approx 44.5$; $\dfrac{12.0 + 72.6}{2} = 42.3$; $\dfrac{16.0 + 79.0}{2} = 47.5$.

Step 2 — Only in the set 35.5, 79.9, 126.9 (chlorine, bromine, iodine) is the middle mass close to the mean (79.9 against 81.2). In the others the middle mass is far below the mean — option (@K).`,
  d: 3, c: 'application', t: [1],
}), () => {
  const off = (a, b, c) => Math.abs(mean(a, c) - b);
  return (off(35.5, 79.9, 126.9) < 2 && off(14.0, 31.0, 74.9) > 10 && off(12.0, 28.1, 72.6) > 10 && off(16.0, 32.1, 79.0) > 10) || 'triad sets';
});
add('newlands-eighth-mcq', mcq({
  stem: 'Newlands listed the elements in the order H, Li, Be, B, C, N, O, F, Na, Mg, Al, … . Counting lithium as the first, which element is the eighth, and so resembles lithium?',
  right: 'Sodium',
  wrong: ['Fluorine', 'Magnesium', 'Oxygen'],
  sol: 'Li (1), Be (2), B (3), C (4), N (5), O (6), F (7), Na (8). The eighth is sodium, a soft reactive metal like lithium — option (@K).',
  d: 2, c: 'understanding', t: [1],
}), () => {
  const order = ['H', 'Li', 'Be', 'B', 'C', 'N', 'O', 'F', 'Na', 'Mg', 'Al'];
  return order[order.indexOf('Li') + 7] === 'Na' || 'eighth';
});
add('newlands-neon-mcq', mcq({
  stem: 'Suppose neon had already been discovered when Newlands made his list. Placed by atomic mass, it would fall between fluorine and sodium. What would happen to his octave of lithium and sodium?',
  right: 'Sodium would become the ninth element from lithium, so the rule of eight would no longer hold for this family.',
  wrong: ['Sodium would still be the eighth element, because neon would be ignored as a gas.', 'Lithium would move to the same column as neon.', 'Nothing, because the law of octaves worked for all elements.'],
  sol: 'Step 1 — With neon added, the list from lithium reads Li, Be, B, C, N, O, F, Ne, Na.\n\nStep 2 — Sodium is now ninth, not eighth, so lithium and sodium no longer fall in one column: the octave pattern breaks — option (@K). This is why the noble gases had no place in Newlands’ scheme.',
  d: 4, c: 'analysis', t: [1],
}), () => {
  const order = ['Li', 'Be', 'B', 'C', 'N', 'O', 'F', 'Ne', 'Na'];
  return order.indexOf('Na') + 1 === 9 || 'ninth';
});
add('triad-mean-num', num({
  stem: 'Lithium (atomic mass 6.9 u), sodium and potassium (atomic mass 39.1 u) form a Döbereiner triad. Use the triad rule to predict the atomic mass of sodium (in u).',
  value: 23.0, tol: 0.05, unit: 'u',
  sol: r`Mean of the outer masses: $\dfrac{6.9 + 39.1}{2} = \dfrac{46.0}{2} = 23.0$ u (the measured value is 23.0 u).`,
  scheme: [['Mean of 6.9 and 39.1 = 23.0 u', 1]],
  d: 2, c: 'application', t: [1],
}), (q) => near(mean(6.9, 39.1), q.answer.value, 1e-9) || 'mean');
add('newlands-ar', ar({
  a: 'Newlands’ law of octaves applied to all the elements known in his time.',
  r: 'For the lighter elements, every eighth element in order of atomic mass had properties similar to the first.',
  key: 'd',
  sol: 'A is false: the law worked only up to calcium and failed for heavier elements. R is true for the lighter elements — option (d).',
  d: 2, c: 'understanding', t: [1],
}));
add('octave-tf', tf({
  stem: 'Newlands compared the repetition of properties after every seven elements with the notes of a musical scale.',
  key: 't',
  sol: 'True. Just as the eighth note of a scale repeats the first, the eighth element repeated the properties of the first.',
  d: 1, c: 'recall', t: [1],
}));
add('triad-fill', fill({
  stem: 'Groups of three chemically similar elements in which the middle atomic mass is about the mean of the other two are called Döbereiner’s ___.',
  acc: [['triads', 'triad']],
  sol: 'They are **triads**.',
  d: 1, c: 'recall', t: [1],
}));
add('triad-limit-short', short({
  marks: 2,
  stem: 'Give one achievement and one limitation of Döbereiner’s triads.',
  model: '**Achievement:** triads were the first attempt to link the **atomic masses** of elements with their **properties**, showing that elements form families.\n\n**Limitation:** only **a few triads** could be found; most known elements could not be placed in any triad, so the idea could not classify all elements.',
  sol: 'Give one strength (first link between mass and properties) and one weakness (few triads).',
  scheme: [['Achievement: first link between mass and properties', 1], ['Limitation: only a few triads; most elements left out', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('newlands-short', short({
  marks: 3,
  stem: 'Class activity: Priya writes the elements in the order H, Li, Be, B, C, N, O, F, Na, Mg, Al, Si, P, S, Cl, K, Ca in rows of seven, as Newlands did.\n\n(a) Which elements fall in the same column as lithium?\n\n(b) Which element falls in the same column as fluorine?\n\n(c) Why did this pattern fail when Newlands added heavier elements?',
  model: '(a) **Sodium** and **potassium** (Li, Na, K are each seven places apart).\n\n(b) **Chlorine** (and hydrogen above fluorine at the start of the column).\n\n(c) Beyond **calcium**, every eighth element no longer resembled the first. To keep the rhythm, Newlands had to put **unlike elements together** (cobalt and nickel with the halogens) and two elements in one place, so the families broke up.',
  sol: 'Count in sevens for (a) and (b); for (c) give the "only up to calcium" limitation with an example.',
  scheme: [['(a) Sodium and potassium', 1], ['(b) Chlorine', 1], ['(c) Fails after calcium; unlike elements forced together', 1]],
  d: 3, c: 'application', t: [1],
  wl: null,
}), () => {
  const order = ['H', 'Li', 'Be', 'B', 'C', 'N', 'O', 'F', 'Na', 'Mg', 'Al', 'Si', 'P', 'S', 'Cl', 'K', 'Ca'];
  const col = (s) => order.indexOf(s) % 7;
  return (col('Li') === col('Na') && col('Na') === col('K') && col('F') === col('Cl') && col('H') === col('F')) || 'columns';
});

// ---------------------------------------------------------------- t02 Mendeléev
add('mendeleev-basis-mcq', mcq({
  stem: 'Mendeléev arranged the elements in his periodic table mainly on the basis of:',
  right: 'increasing atomic mass and similarity in the formulas of their oxides and hydrides',
  wrong: ['increasing atomic number only', 'the number of valence electrons in their atoms', 'whether they were solids, liquids or gases'],
  sol: 'Mendeléev used atomic mass together with chemical properties, especially oxide and hydride formulas — option (@K). Atomic number (@1) was the later, modern basis.',
  d: 1, c: 'recall', t: [2],
}));
add('oxide-chloride-mcq', mcq({
  stem: 'In Mendeléev’s scheme, element E is in the same group as aluminium, whose oxide has the general formula R₂O₃. Which formula is expected for the chloride of E?',
  right: 'ECl₃',
  wrong: ['ECl', 'ECl₂', 'ECl₄'],
  sol: 'Step 1 — In R₂O₃, two atoms of R combine with three oxygen atoms (valency 2 each): total 6, so R has valency 3.\n\nStep 2 — Chlorine has valency 1, so the chloride is ECl₃ — option (@K).',
  d: 3, c: 'application', t: [2],
}), () => {
  const v = (3 * 2) / 2; // R₂O₃: 3 O × valency 2 shared by 2 R
  return formula(v, 1).join(',') === '1,3' || 'ECl3';
});
add('hydride-oxide-mcq', mcq({
  stem: 'In Mendeléev’s scheme, an element forms an oxide with the formula E₂O₅. What is the expected formula of its hydride?',
  right: 'EH₃',
  wrong: ['EH₅', 'EH', 'EH₂'],
  sol: 'Step 1 — E₂O₅ is the oxide of group V.\n\nStep 2 — Group V hydrides have the formula RH₃ (for example PH₃ and P₂O₅ for phosphorus), so the hydride is EH₃ — option (@K). EH₅ (@1) wrongly uses the oxide valency of 5 with hydrogen.',
  d: 3, c: 'application', t: [2],
}));
add('gaps-mcq', mcq({
  stem: 'Why did Mendeléev leave some places empty in his periodic table?',
  right: 'He believed elements belonging there were yet to be discovered, and he predicted their properties.',
  wrong: ['He could not decide the atomic masses of the elements already known.', 'Those places were meant for the noble gases, which he had already discovered.', 'He ran out of elements with similar properties to complete the rows.'],
  sol: 'The gaps were deliberate places for undiscovered elements such as eka-aluminium (gallium), whose properties he predicted — option (@K). The noble gases were discovered later (@2).',
  d: 2, c: 'understanding', t: [2],
}));
add('te-i-mcq', mcq({
  stem: 'Tellurium (atomic mass 127.6 u) was placed before iodine (atomic mass 126.9 u) in Mendeléev’s table. What does this show?',
  right: 'Mendeléev gave more importance to similarity of properties than to strict order of atomic mass.',
  wrong: ['Mendeléev made an error in arranging elements by atomic mass.', 'Tellurium and iodine have exactly the same properties.', 'Mendeléev arranged elements by atomic number.'],
  sol: 'Step 1 — In strict mass order, iodine would come first and fall among the sulfur family.\n\nStep 2 — Iodine clearly resembles chlorine and bromine, so Mendeléev reversed the order to keep each element with its family — option (@K). It was a deliberate choice, not a mistake (@1); atomic number was not yet known (@3).',
  d: 4, c: 'analysis', t: [2],
}));
add('isotopes-mcq', mcq({
  stem: 'Chlorine has two isotopes, of masses 35 u and 37 u. Why were isotopes a problem for Mendeléev’s periodic table?',
  right: 'Arranged by mass, the two isotopes would need different places, although they have the same chemical properties.',
  wrong: ['Isotopes have different chemical properties, so they belong to different groups.', 'Isotopes have different atomic numbers, so they cannot share a place.', 'Mendeléev’s table had no place for chlorine.'],
  sol: 'Isotopes differ only in mass; their chemistry is the same. A mass-based table would separate them, though they should sit together — option (@K). Isotopes share the same atomic number (@2).',
  d: 2, c: 'understanding', t: [2],
}));
add('noble-mendeleev-mcq', mcq({
  stem: 'Helium, neon and argon were discovered after Mendeléev made his table. How were they fitted in?',
  right: 'As a separate new group, without disturbing the order of the other elements',
  wrong: ['Into the gaps that Mendeléev had left for eka-elements', 'Into the same group as the halogens', 'They could not be fitted in, so his table was abandoned'],
  sol: 'Being very unreactive, the noble gases formed a new group of their own; the rest of the table was unchanged — option (@K). The gaps (@1) were filled by gallium, scandium and germanium.',
  d: 2, c: 'understanding', t: [2],
}));
add('ga-valency-num', num({
  stem: 'Gallium forms an oxide with the formula Ga₂O₃, just as Mendeléev predicted for eka-aluminium. Taking the valency of oxygen as 2, what is the valency of gallium?',
  value: 3, tol: 0, unit: null,
  sol: r`Three oxygen atoms supply $3 \times 2 = 6$ units of combining capacity, shared by two gallium atoms: $\dfrac{6}{2} = 3$.`,
  scheme: [['Valency 3', 1]],
  d: 2, c: 'application', t: [2],
}), (q) => near((3 * 2) / 2, q.answer.value) || 'Ga');
add('gaps-ar', ar({
  a: 'Mendeléev’s periodic table helped in the discovery of new elements.',
  r: 'Mendeléev left gaps in his table and predicted the properties of the elements that would fill them.',
  key: 'a',
  sol: 'Both are true. Because he predicted the properties of the missing elements, chemists knew what to look for, and gallium, scandium and germanium were found — option (a).',
  d: 2, c: 'understanding', t: [2],
}));
add('te-i-ar', ar({
  a: 'In Mendeléev’s table, tellurium is placed before iodine.',
  r: 'Tellurium has a greater atomic mass than iodine.',
  key: 'b',
  sol: 'Both are true, but the greater mass of tellurium is not why it comes first; in fact it goes against the mass order. Tellurium was placed first so that iodine could sit with the halogens — option (b).',
  d: 3, c: 'analysis', t: [2],
}));
add('hydrogen-tf', tf({
  stem: 'Mendeléev’s table gave hydrogen a fixed position that settled whether it belongs with the alkali metals or the halogens.',
  key: 'f',
  sol: 'False. Hydrogen resembles both alkali metals and halogens, and Mendeléev could not fix its position; this is one of the limitations of his table.',
  d: 2, c: 'understanding', t: [2],
}));
add('eka-fill', fill({
  stem: 'Mendeléev named undiscovered elements using the Sanskrit prefix ___, meaning "one", as in the name he gave to gallium before it was found.',
  acc: [['eka']],
  sol: 'The prefix is **eka**: gallium was eka-aluminium.',
  d: 1, c: 'recall', t: [2],
}));
add('formula-match', match({
  stem: 'Match each group of Mendeléev’s table in Column A with the general formula of its oxide in Column B.',
  pairs: [['Group I', 'R₂O'], ['Group II', 'RO'], ['Group IV', 'RO₂'], ['Group VII', 'R₂O₇']],
  order: [2, 0, 3, 1],
  sol: 'Group I → R₂O (1 → r); group II → RO (2 → p); group IV → RO₂ (3 → s); group VII → R₂O₇ (4 → q). In each, twice the oxygen count divided by the R count equals the group number.',
  d: 2, c: 'understanding', t: [2],
}), () => {
  const v = (nR, nO) => (2 * nO) / nR;
  return (v(2, 1) === 1 && v(1, 1) === 2 && v(1, 2) === 4 && v(2, 7) === 7) || 'oxides';
});
add('achievements-short', short({
  marks: 2,
  stem: 'State two achievements of Mendeléev’s periodic table, with an example of each.',
  model: '(1) He left **gaps** for undiscovered elements and **predicted** their properties; for example, eka-aluminium was later found as **gallium** with matching properties.\n\n(2) The **noble gases**, discovered later, could be placed as a **new group** without disturbing the existing order.',
  sol: 'Name two strengths and give a matching example for each.',
  scheme: [['Gaps and correct predictions, with example', 1], ['Second achievement (noble gases fitted in, or families kept together), with example', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('isotopes-short', short({
  marks: 2,
  stem: 'Why were isotopes a problem for Mendeléev’s periodic table? How does the modern periodic table remove this problem?',
  model: 'Isotopes of an element have **different atomic masses** but the **same chemical properties**. In a table based on atomic mass they would need separate places. In the modern table, elements are arranged by **atomic number**, and isotopes have the **same atomic number**, so they share one place.',
  sol: 'State the problem (mass differs, properties same) and the solution (same atomic number).',
  scheme: [['Problem: different masses, same properties', 1], ['Solution: same atomic number, one place', 1]],
  d: 2, c: 'understanding', t: [2, 3],
}));
add('te-i-short', short({
  marks: 3,
  stem: 'Tellurium has atomic mass 127.6 u and atomic number 52; iodine has atomic mass 126.9 u and atomic number 53. Iodine resembles chlorine and bromine.\n\n(a) Where would strict mass order place these two elements?\n\n(b) What did Mendeléev do, and why?\n\n(c) How does the modern periodic law show that he was right?',
  model: '(a) Iodine, being lighter, would come **before** tellurium, and would land in the family of sulfur and selenium, while tellurium would go with the halogens.\n\n(b) Mendeléev placed **tellurium first**, breaking the mass order, so that **iodine** stays with **chlorine and bromine**, whose properties it shares.\n\n(c) In order of **atomic number**, tellurium (52) comes before iodine (53) anyway, so both sit in the right families without any swap.',
  sol: 'Compare mass order with atomic-number order and link each to the families.',
  scheme: [['(a) Mass order puts iodine first, in the wrong family', 1], ['(b) Swapped to keep iodine with the halogens', 1], ['(c) Atomic numbers 52 < 53 give the right order', 1]],
  d: 4, c: 'analysis', t: [2, 3],
  wl: null,
}), () => (126.9 < 127.6 && 52 < 53) || 'order');
add('mendeleev-long', long({
  stem: '(a) On what basis did Mendeléev arrange the elements?\n\n(b) Describe two achievements of his periodic table.\n\n(c) Explain three of its limitations.',
  model: '(a) He arranged the elements in order of **increasing atomic mass**, and placed elements with **similar properties**, judged mainly by the formulas of their **oxides and hydrides**, in the same group.\n\n(b) He left **gaps** for undiscovered elements and predicted their properties; eka-aluminium and eka-silicon were later found as **gallium** and **germanium** with matching properties. The **noble gases**, found later, fitted in as a new group without disturbing the table.\n\n(c) **Hydrogen** resembles both alkali metals and halogens, so it had no fixed place. **Isotopes** have different masses but the same properties, so a mass-based table would place them apart. Atomic masses do not rise in **regular steps**, so the number of missing elements between two known ones could not be predicted.',
  sol: 'Step 1 — Basis: mass plus oxide and hydride formulas.\n\nStep 2 — Two achievements with examples.\n\nStep 3 — Three limitations, each with its reason.',
  scheme: [['(a) Basis: atomic mass and similar properties', 1], ['(b) Two achievements with examples', 2], ['(c) Three limitations with reasons', 2]],
  d: 3, c: 'understanding', t: [2],
}));

// ---------------------------------------------------------------- t03 modern periodic table and trends
add('modern-law-mcq', mcq({
  stem: 'According to the modern periodic law, the properties of elements are a periodic function of their:',
  right: 'atomic numbers',
  wrong: ['atomic masses', 'densities', 'numbers of neutrons'],
  sol: 'The modern law, based on Moseley’s work, uses the atomic number — option (@K). Atomic mass (@1) was Mendeléev’s basis.',
  d: 1, c: 'recall', t: [3],
}));
add('config-group-mcq', mcq({
  stem: 'An element has the electronic configuration 2, 8, 2. Where is it in the modern periodic table?',
  right: 'Period 3, group 2',
  wrong: ['Period 2, group 3', 'Period 3, group 12', 'Period 2, group 12'],
  sol: 'Three shells → period 3. Two valence electrons → group 2 — option (@K). It is magnesium.',
  d: 2, c: 'application', t: [3],
}), () => {
  const p = positionOf(12);
  return (cfg(12) === '2, 8, 2' && p.period === 3 && p.group === 2) || 'Mg';
});
add('same-group-mcq', mcq({
  stem: 'Which atomic number belongs to an element in the same group as the element with atomic number 9?',
  right: '17',
  wrong: ['10', '18', '8'],
  sol: 'Step 1 — 9 → 2, 7: seven valence electrons, group 17.\n\nStep 2 — 17 → 2, 8, 7: also seven valence electrons, group 17 — option (@K). 10 and 18 are noble gases; 8 is in group 16.',
  d: 3, c: 'application', t: [3],
}), () => (positionOf(9).group === positionOf(17).group && positionOf(10).group !== 17 && positionOf(18).group !== 17 && positionOf(8).group !== 17) || 'group 17');
add('group-valence-mcq', mcq({
  stem: 'Lithium, sodium and potassium show similar chemical properties because their atoms have the same:',
  right: 'number of valence electrons',
  wrong: ['number of shells', 'atomic mass', 'atomic size'],
  sol: 'All three have one electron in the outermost shell, and chemical properties depend on the valence electrons — option (@K). They have different numbers of shells (@1).',
  d: 2, c: 'understanding', t: [3],
}), () => (positionOf(3).valence === 1 && positionOf(11).valence === 1 && positionOf(19).valence === 1) || 'valence');
add('size-period-mcq', mcq({
  stem: 'On going from sodium to chlorine across period 3, the atomic radius:',
  right: 'decreases, because the nuclear charge increases while electrons are added to the same shell',
  wrong: ['increases, because more electrons are added', 'stays the same, because the number of shells stays the same', 'increases, because a new shell is added at each step'],
  sol: 'Across a period no new shell is added, but each step adds a proton, so the outer electrons are pulled closer: the radius decreases — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('size-group-mcq', mcq({
  stem: 'Which of these atoms is the largest: lithium (3), sodium (11), magnesium (12) or potassium (19)?',
  right: 'Potassium',
  wrong: ['Lithium', 'Sodium', 'Magnesium'],
  sol: 'Potassium has four shells (2, 8, 8, 1); the others have two or three. A new shell outweighs the extra nuclear charge, so potassium is largest — option (@K).',
  d: 3, c: 'application', t: [3],
}), () => (shellsOf(19).length === 4 && [3, 11, 12].every((z) => shellsOf(z).length < 4)) || 'K');
add('metallic-mcq', mcq({
  stem: 'Which of these elements is the most metallic?',
  right: 'Potassium (atomic number 19)',
  wrong: ['Sodium (atomic number 11)', 'Magnesium (atomic number 12)', 'Aluminium (atomic number 13)'],
  sol: 'Metallic character increases down a group and decreases across a period. Potassium is below sodium in group 1 and to the left of magnesium and aluminium, so it is the most metallic — option (@K).',
  d: 3, c: 'application', t: [3],
}), () => {
  const p = (z) => positionOf(z);
  return (p(19).group === 1 && p(19).period > p(11).period && p(12).group > 1 && p(13).group > 1) || 'K most metallic';
});
add('metalloid-mcq', mcq({
  stem: 'Which of these elements is a metalloid?',
  right: 'Silicon',
  wrong: ['Sodium', 'Sulfur', 'Chlorine'],
  sol: 'Silicon lies on the zig-zag line and shows some properties of metals and some of non-metals — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('valency-mcq', mcq({
  stem: 'What is the valency of the element with atomic number 8?',
  right: '2',
  wrong: ['6', '8', '1'],
  sol: 'Configuration 2, 6: six valence electrons. It needs 8 − 6 = 2 more electrons, so its valency is 2 — option (@K). 6 (@1) is the number of valence electrons, not the valency.',
  d: 2, c: 'application', t: [3],
}), () => valencyOf(8) === 2 || 'O');
add('oxide-litmus-mcq', mcq({
  stem: 'In a lab, a student burns a strip of the element with atomic number 12 and shakes the white ash with water. The solution turns red litmus blue. What does this show?',
  right: 'The element is a metal, and its oxide is basic.',
  wrong: ['The element is a non-metal, and its oxide is acidic.', 'The element is a metalloid, and its oxide is neutral.', 'The ash is unburnt metal, which turns litmus blue.'],
  sol: 'Step 1 — 12 → 2, 8, 2: magnesium, a metal in group 2.\n\nStep 2 — Magnesium oxide dissolves slightly in water to form a base, which turns red litmus blue: metal oxides are basic — option (@K).',
  d: 3, c: 'application', t: [3],
}), () => positionOf(12).group === 2 || 'Mg');
add('formula-mcq', mcq({
  stem: 'Element A has atomic number 20 and element B has atomic number 9. What is the formula of the compound formed between them?',
  right: 'AB₂',
  wrong: ['AB', 'A₂B', 'AB₇'],
  sol: 'A: 2, 8, 8, 2 → valency 2. B: 2, 7 → valency 8 − 7 = 1. One A combines with two B: AB₂ (calcium fluoride) — option (@K).',
  d: 3, c: 'application', t: [3],
}), () => formula(valencyOf(20), valencyOf(9)).join(',') === '1,2' || 'AB2');
add('size-ar', ar({
  a: 'Atomic size decreases on going from left to right across a period.',
  r: 'Across a period, the nuclear charge increases while electrons are added to the same shell.',
  key: 'a',
  sol: 'Both are true. The greater nuclear charge pulls the electrons of the same shell closer, so atoms shrink across a period — option (a).',
  d: 2, c: 'understanding', t: [3],
}));
add('metallic-ar', ar({
  a: 'Metallic character increases on going down a group.',
  r: 'Atomic size decreases on going down a group.',
  key: 'c',
  sol: 'A is true. R is false: atomic size increases down a group, which is why outer electrons are lost more easily — option (c).',
  d: 2, c: 'understanding', t: [3],
}));
add('isotopes-ar', ar({
  a: 'The two isotopes of chlorine occupy the same position in the modern periodic table.',
  r: 'Isotopes of an element have different numbers of protons.',
  key: 'c',
  sol: 'A is true. R is false: isotopes have the same number of protons (atomic number) and differ in neutrons — option (c).',
  d: 2, c: 'understanding', t: [2, 3],
}));
add('group1-ar', ar({
  a: 'Elements of group 1 have a valency of 2.',
  r: 'Atoms of group 1 elements have one electron in their outermost shell.',
  key: 'd',
  sol: 'A is false: one valence electron gives a valency of 1. R is true — option (d).',
  d: 2, c: 'understanding', t: [3],
}), () => (valencyOf(3) === 1 && valencyOf(11) === 1 && valencyOf(19) === 1) || 'group 1');
add('metals-tf', tf({
  stem: 'In the modern periodic table, metals are found on the left-hand side and in the middle.',
  key: 't',
  sol: 'True. Non-metals are on the upper right, and metalloids lie along the zig-zag between them.',
  d: 1, c: 'recall', t: [3],
}));
add('size-tf', tf({
  stem: 'An atom of potassium is smaller than an atom of sodium.',
  key: 'f',
  sol: 'False. Potassium is below sodium in group 1 and has one more shell, so its atom is larger.',
  d: 2, c: 'understanding', t: [3],
}));
add('z-fill', fill({
  stem: 'In the modern periodic table, elements are arranged in order of increasing ___.',
  acc: [['atomic number', 'atomic numbers']],
  sol: 'They are arranged by **atomic number**.',
  d: 1, c: 'recall', t: [3],
}));
add('metalloid-fill', fill({
  stem: 'Boron, silicon and germanium, which show some properties of metals and some of non-metals, are called ___.',
  acc: [['metalloids', 'semi-metals', 'semimetals']],
  sol: 'They are **metalloids** (semi-metals).',
  d: 1, c: 'recall', t: [3],
}));
add('trend-match', match({
  stem: 'Match each property in Column A with how it changes from left to right across a period (Column B).',
  pairs: [['Atomic size', 'Decreases'], ['Number of valence electrons', 'Increases from 1 to 8'], ['Number of shells', 'Stays the same'], ['Non-metallic character', 'Increases']],
  order: [1, 3, 0, 2],
  sol: 'Atomic size → decreases (1 → q); valence electrons → increase from 1 to 8 (2 → s); number of shells → stays the same (3 → p); non-metallic character → increases (4 → r).',
  d: 2, c: 'understanding', t: [3],
}));
add('group-config-num', num({
  stem: 'An element has the electronic configuration 2, 8, 7. What is its group number in the modern periodic table?',
  value: 17, tol: 0, unit: null,
  sol: 'Seven valence electrons; for 3 to 8 valence electrons, group = 10 + valence electrons = 10 + 7 = 17.',
  scheme: [['Group 17', 1]],
  d: 2, c: 'application', t: [3],
}), (q) => positionOf(17).group === q.answer.value || 'group');
add('z-position-num', num({
  stem: 'An element is in period 3 and group 14 of the modern periodic table. What is its atomic number?',
  value: 14, tol: 0, unit: null,
  sol: 'Period 3 → three shells; group 14 → 14 − 10 = 4 valence electrons. Configuration 2, 8, 4, so the atomic number is 2 + 8 + 4 = 14 (silicon).',
  scheme: [['Atomic number 14', 1]],
  d: 3, c: 'application', t: [3],
}), (q) => {
  const z = q.answer.value;
  return (positionOf(z).period === 3 && positionOf(z).group === 14) || 'Si';
});
add('locate-short', short({
  marks: 2,
  wl: null,
  stem: 'Elements X and Y have atomic numbers 3 and 11. Write their electronic configurations. Are they in the same group or the same period? Give a reason.',
  model: 'X: **2, 1**; Y: **2, 8, 1**.\n\nThey are in the **same group** (group 1), because each has **one valence electron**. They are not in the same period: X has two shells (period 2) and Y has three (period 3).',
  sol: 'Write the configurations, then compare valence electrons (group) and shells (period).',
  scheme: [['Both configurations', 1], ['Same group, because of one valence electron each', 1]],
  d: 2, c: 'application', t: [3],
}), () => (cfg(3) === '2, 1' && cfg(11) === '2, 8, 1' && positionOf(3).group === positionOf(11).group && positionOf(3).period !== positionOf(11).period) || 'Li Na');
add('size-short', short({
  marks: 2,
  stem: 'Explain why atomic size increases on going down a group, although the number of protons also increases.',
  model: 'Down a group, each element has **one more shell** than the one above it. The outermost electrons are therefore **farther from the nucleus**, and the inner shells partly **shield** them from its pull. This effect is larger than the extra nuclear charge, so atomic size increases.',
  sol: 'Link the new shell (greater distance) to size, and say it outweighs the extra charge.',
  scheme: [['A new shell is added each period', 1], ['Outer electrons farther away; outweighs extra nuclear charge', 1]],
  d: 3, c: 'understanding', t: [3],
}));
add('modern-advantage-short', short({
  marks: 2,
  stem: 'Explain how the modern periodic table removes two limitations of Mendeléev’s table.',
  model: '(1) **Isotopes** have the same atomic number, so in a table arranged by atomic number they share **one place**.\n\n(2) Pairs such as **tellurium (52) and iodine (53)** or **cobalt (27) and nickel (28)** fall in the right order by atomic number, so no element has to be placed **against the order** of the arrangement.',
  sol: 'Name two limitations and link each to arranging by atomic number.',
  scheme: [['Isotopes share one place (same atomic number)', 1], ['Mass-order anomalies disappear with atomic number', 1]],
  d: 3, c: 'understanding', t: [2, 3],
}));
add('period3-short', short({
  marks: 3,
  stem: 'The elements of period 3 are sodium, magnesium, aluminium, silicon, phosphorus, sulfur, chlorine and argon.\n\n(a) Which is the most metallic?\n\n(b) Name a metalloid among them.\n\n(c) Which has a valency of zero, and why?',
  model: '(a) **Sodium**: it is at the left end of the period, with the largest atom, so it loses its outer electron most easily.\n\n(b) **Silicon** shows properties of both metals and non-metals.\n\n(c) **Argon** has a valency of zero, because its outermost shell is **full** (2, 8, 8), so it does not need to lose, gain or share electrons.',
  sol: 'Use the trend in metallic character, the zig-zag line, and the full outer shell of a noble gas.',
  scheme: [['(a) Sodium with reason', 1], ['(b) Silicon', 1], ['(c) Argon, full outer shell', 1]],
  d: 3, c: 'application', t: [3],
}), () => (valencyOf(18) === 0 && positionOf(11).group === 1) || 'period 3');
add('oxides-short', short({
  marks: 3,
  stem: 'Describe a simple activity to show that the oxide of magnesium is basic and the oxide of sulfur is acidic. How are these results linked to the positions of magnesium and sulfur in the periodic table?',
  model: 'Burn a magnesium ribbon (with tongs) and shake the white ash with a little water: the solution turns **red litmus blue**, so magnesium oxide is **basic**. Under supervision, burn a little sulfur in a deflagrating spoon inside a gas jar with some water; shake: the solution turns **blue litmus red**, so sulfur dioxide is **acidic**. Magnesium is a **metal** on the left of period 3; sulfur is a **non-metal** on the right, and metal oxides are basic while non-metal oxides are acidic.',
  sol: 'Describe both tests with litmus, then link basic and acidic oxides to metals on the left and non-metals on the right.',
  scheme: [['Test for magnesium oxide: red litmus turns blue', 1], ['Test for sulfur dioxide: blue litmus turns red', 1], ['Link to metal (left) and non-metal (right)', 1]],
  d: 3, c: 'application', t: [3],
}));
add('valency-formula-short', short({
  marks: 3,
  wl: null,
  stem: 'Element P has atomic number 12 and element Q has atomic number 17.\n\n(a) Write their electronic configurations and valencies.\n\n(b) Predict the formula of the compound formed between P and Q.\n\n(c) Which of the two has the larger atom? Why?',
  model: '(a) P: **2, 8, 2**, valency **2**; Q: **2, 8, 7**, valency 8 − 7 = **1**.\n\n(b) One P combines with two Q: **PQ₂** (magnesium chloride, MgCl₂).\n\n(c) **P** is larger. Both are in period 3 with three shells, but Q has more protons (17 against 12), which pull its electrons closer.',
  sol: 'Configurations → valencies → cross over; compare size across period 3.',
  scheme: [['(a) Configurations and valencies', 1], ['(b) PQ₂', 1], ['(c) P larger, with reason', 1]],
  d: 3, c: 'application', t: [3],
}), () => (cfg(12) === '2, 8, 2' && cfg(17) === '2, 8, 7' && formula(valencyOf(12), valencyOf(17)).join(',') === '1,2' && positionOf(12).period === positionOf(17).period) || 'MgCl2');
add('modern-long', long({
  stem: '(a) State the modern periodic law.\n\n(b) Explain how the period and group of an element are found from its electronic configuration, using the element with atomic number 19 as an example.\n\n(c) How do atomic size and metallic character change across a period and down a group? Give reasons.',
  model: '(a) The properties of elements are a **periodic function of their atomic numbers**.\n\n(b) The number of occupied **shells** gives the **period**, and the number of **valence electrons** gives the **group**. Atomic number 19 → **2, 8, 8, 1**: four shells, so **period 4**; one valence electron, so **group 1** (potassium).\n\n(c) **Across a period**, electrons enter the same shell while the nuclear charge rises, so they are pulled closer: atomic size **decreases**, and electrons are lost less easily, so metallic character **decreases**. **Down a group**, a new shell is added each time, so atomic size **increases**; the outer electrons are farther from the nucleus and easier to lose, so metallic character **increases**.',
  sol: 'Step 1 — State the law.\n\nStep 2 — Shells give the period, valence electrons the group; apply to 19.\n\nStep 3 — Give both trends with reasons.',
  scheme: [['(a) Modern periodic law', 1], ['(b) Rule and example (period 4, group 1)', 2], ['(c) Both trends with reasons', 2]],
  d: 3, c: 'understanding', t: [3],
}), () => (cfg(19) === '2, 8, 8, 1' && positionOf(19).period === 4 && positionOf(19).group === 1) || 'K');
add('compare-long', long({
  stem: 'Compare Mendeléev’s periodic table with the modern periodic table under these headings: (a) basis of arrangement, (b) number of groups and the place of the noble gases, (c) position of isotopes, (d) order of elements such as tellurium and iodine, (e) one problem that remains in both.',
  model: '(a) Mendeléev: **increasing atomic mass** and similar properties. Modern: **increasing atomic number**.\n\n(b) Mendeléev: **eight** groups (I to VIII), with the noble gases added later as a new group. Modern: **18** groups, with the noble gases in **group 18**.\n\n(c) Mendeléev: isotopes, having different masses, would need **different places**. Modern: isotopes have the same atomic number, so they share **one place**.\n\n(d) Mendeléev had to place tellurium (heavier) **before** iodine against the mass order. Modern: tellurium (52) comes before iodine (53) **naturally**.\n\n(e) The position of **hydrogen**, which resembles both alkali metals and halogens, is still a special case.',
  sol: 'Compare the two tables point by point under each heading.',
  scheme: [['(a) Basis', 1], ['(b) Groups and noble gases', 1], ['(c) Isotopes', 1], ['(d) Tellurium and iodine', 1], ['(e) Hydrogen', 1]],
  d: 3, c: 'analysis', t: [2, 3],
  wl: null,
}));
add('trends-long', long({
  stem: 'Five elements A, B, C, D and E have atomic numbers 3, 9, 11, 17 and 19.\n\n(a) Write their electronic configurations.\n\n(b) Which elements belong to the same group? Name the groups.\n\n(c) Which element has the largest atom, and which the smallest?\n\n(d) Which is the most metallic?\n\n(e) Give the formula of the compound formed between C and D.',
  model: '(a) A **2, 1**; B **2, 7**; C **2, 8, 1**; D **2, 8, 7**; E **2, 8, 8, 1**.\n\n(b) A, C and E are in **group 1** (one valence electron); B and D are in **group 17** (seven valence electrons).\n\n(c) Largest: **E** (four shells, at the bottom of group 1). Smallest: **B** (two shells, at the right of period 2).\n\n(d) **E**, because it is lowest in group 1 and loses its outer electron most easily.\n\n(e) C has valency 1 and D has valency 1, so the formula is **CD** (sodium chloride, NaCl).',
  sol: 'Step 1 — Configurations.\n\nStep 2 — Group by valence electrons.\n\nStep 3 — Size: more shells → larger; further right → smaller.\n\nStep 4 — Metallic character greatest at the bottom left.\n\nStep 5 — Cross the valencies.',
  scheme: [['(a) Five configurations', 1], ['(b) Two groups correctly identified', 1], ['(c) Largest and smallest', 1], ['(d) Most metallic', 1], ['(e) Formula CD', 1]],
  d: 4, c: 'analysis', t: [3],
  wl: null,
}), () => {
  const zs = [3, 9, 11, 17, 19];
  const ok = [cfg(3) === '2, 1', cfg(9) === '2, 7', cfg(11) === '2, 8, 1', cfg(17) === '2, 8, 7', cfg(19) === '2, 8, 8, 1'];
  const g1 = zs.filter((z) => positionOf(z).group === 1).join(',');
  const g17 = zs.filter((z) => positionOf(z).group === 17).join(',');
  return (ok.every(Boolean) && g1 === '3,11,19' && g17 === '9,17' && formula(valencyOf(11), valencyOf(17)).join(',') === '1,1') || 'five elements';
});
add('early-long', long({
  stem: 'Describe how the classification of elements developed through the work of (a) Döbereiner, (b) Newlands and (c) Mendeléev. For each, give the main idea and one limitation.',
  model: '(a) **Döbereiner** grouped similar elements in **triads**; in each, the middle atomic mass was about the mean of the other two (lithium, sodium, potassium). **Limitation:** only a few triads could be found.\n\n(b) **Newlands** arranged elements by increasing atomic mass and found that **every eighth element** resembled the first (law of octaves). **Limitation:** it worked only up to **calcium**.\n\n(c) **Mendeléev** arranged elements by increasing atomic mass and **similar properties** (oxide and hydride formulas), left **gaps** and predicted new elements. **Limitation:** he could not place **isotopes** or fix the position of **hydrogen**.',
  sol: 'Give each scientist’s idea with an example and one limitation, in order of time.',
  scheme: [['(a) Triads and a limitation', 1.5], ['(b) Octaves and a limitation', 1.5], ['(c) Mendeléev’s basis, gaps and a limitation', 2]],
  d: 2, c: 'understanding', t: [1, 2],
}));

// ---------------------------------------------------------------- case-based
add('triad-case', mk.case({
  passage: 'For a project on the history of the periodic table, a group of Class 10 students in Pune looked up the atomic masses of three sets of similar elements and tested Döbereiner’s rule.\n\n| Set | Elements | Atomic masses (u) |\n|---|---|---|\n| P | Calcium, strontium, barium | 40.1, 87.6, 137.3 |\n| Q | Chlorine, bromine, iodine | 35.5, 79.9, 126.9 |\n| R | Nitrogen, phosphorus, arsenic | 14.0, 31.0, 74.9 |\n\nThey called a set a triad if the middle mass was within 2 u of the mean of the other two.',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'Which sets are triads by the students’ rule?',
      right: 'P and Q only',
      wrong: ['P, Q and R', 'R only', 'Q and R only'],
      sol: 'P: mean 88.7, middle 87.6 (difference 1.1). Q: mean 81.2, middle 79.9 (difference 1.3). R: mean 44.45, middle 31.0 (difference about 13.5). Only P and Q — option (@K).',
      d: 2, c: 'application', t: [1],
    })),
    part('b', num({
      stem: 'Calculate the mean of the atomic masses of chlorine and iodine (in u), to one decimal place.',
      value: 81.2, tol: 0.05, unit: 'u',
      sol: r`$\dfrac{35.5 + 126.9}{2} = \dfrac{162.4}{2} = 81.2$ u.`,
      scheme: [['81.2 u', 1]],
      d: 2, c: 'application', t: [1],
    })),
    part('c', short({
      marks: 2,
      stem: 'Nitrogen, phosphorus and arsenic have similar chemical properties but do not form a triad. What does this tell you about Döbereiner’s method?',
      model: 'Similar elements do **not always** fit the mass rule, so triads miss real families. Döbereiner’s method could group only **a few** elements and could not classify all known elements; a more general arrangement was needed.',
      sol: 'Note that a real family fails the rule, so the method is limited.',
      scheme: [['Similar elements can fail the mass rule', 1], ['So the method cannot classify all elements', 1]],
      d: 3, c: 'analysis', t: [1],
    }), [
      short({
        marks: 2,
        stem: 'One student says, "Set P proves that Döbereiner had found the law that applies to all elements." Evaluate this claim.',
        model: 'The claim is **wrong**. Set P fits the rule, but set R, a real family of similar elements, does not, and most elements fit no triad at all. A pattern that works for a few sets is a clue, not a general law; later, Mendeléev’s table and the modern table were needed.',
        sol: 'Use set R as a counter-example and judge the claim.',
        scheme: [['Uses R (or other elements) as a counter-example', 1], ['Concludes that triads are not a general law', 1]],
        d: 3, c: 'evaluation', t: [1],
      }),
    ]),
  ],
}), (q) => {
  const d = (a, b, c) => Math.abs(mean(a, c) - b);
  return (d(40.1, 87.6, 137.3) <= 2 && d(35.5, 79.9, 126.9) <= 2 && d(14.0, 31.0, 74.9) > 2 && near(Math.round(mean(35.5, 126.9) * 10) / 10, q.children[1].answer.value)) || 'triad case';
});
add('gallium-case', mk.case({
  passage: 'In 1871, Mendeléev left a gap below aluminium in his table and described the missing element, which he called eka-aluminium. In 1875 a French chemist discovered gallium in a zinc ore. The table compares the prediction with what was found.\n\n| Property | Eka-aluminium (predicted) | Gallium (found) |\n|---|---|---|\n| Atomic mass | about 68 u | 69.7 u |\n| Formula of oxide | E₂O₃ | Ga₂O₃ |\n| Formula of chloride | ECl₃ | GaCl₃ |\n\nGallium also has such a low melting point that it melts on a warm day.',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'In which group of Mendeléev’s table did eka-aluminium belong?',
      right: 'The group of aluminium, with oxide formula R₂O₃',
      wrong: ['The group of sodium, with oxide formula R₂O', 'The group of carbon, with oxide formula RO₂', 'A new group of its own'],
      sol: 'Eka-aluminium means one place below aluminium, in the R₂O₃ group, and gallium does form Ga₂O₃ — option (@K).',
      d: 2, c: 'understanding', t: [2],
    })),
    part('b', num({
      stem: 'By how many atomic mass units did the measured atomic mass of gallium differ from Mendeléev’s prediction?',
      value: 1.7, tol: 0.05, unit: 'u',
      sol: r`$69.7 - 68 = 1.7$ u, only about 2.5% of the predicted value.`,
      scheme: [['1.7 u', 1]],
      d: 2, c: 'application', t: [2],
    })),
    part('c', short({
      marks: 2,
      stem: 'Why did the discovery of gallium make chemists trust Mendeléev’s periodic table?',
      model: 'Mendeléev had predicted the existence of the element and its **properties in advance**, from its **position** in the table. When gallium was found, its atomic mass and the formulas of its oxide and chloride **matched** his predictions closely. A table that can make correct predictions must reflect a real pattern in nature.',
      sol: 'Stress prediction before discovery and the close match.',
      scheme: [['Properties predicted before discovery, from position', 1], ['Close match showed the table reflects a real pattern', 1]],
      d: 3, c: 'understanding', t: [2],
    }), [
      short({
        marks: 2,
        stem: 'Gallium’s atomic number is 31. Using the modern periodic table, explain why gallium has the same oxide formula as aluminium (atomic number 13).',
        model: 'Aluminium is 2, 8, 3, with **three valence electrons**, in **group 13**. Gallium is directly below aluminium in group 13, so it also has **three valence electrons** and a **valency of 3**. With oxygen (valency 2), both form oxides of the type **R₂O₃**.',
        sol: 'Same group → same valence electrons → same valency → same formula type.',
        scheme: [['Both in group 13 with three valence electrons', 1], ['Valency 3 with oxygen gives R₂O₃', 1]],
        d: 4, c: 'analysis', t: [2, 3],
      }),
    ]),
  ],
}), (q) => (near(69.7 - 68, q.children[1].answer.value, 1e-9) && positionOf(13).valence === 3 && formula(3, 2).join(',') === '2,3') || 'gallium');
add('cards-case', mk.case({
  passage: 'In a classroom activity at a school in Guwahati, each student received a card with an element’s name, atomic number and electronic configuration. The class had to stand in rows and columns to form the first three periods of the modern periodic table, leaving out groups 3 to 12.\n\nMeena held the card "atomic number 13, configuration 2, 8, 3". Arjun held "atomic number 4". Kabir held "atomic number 10" and stood at the end of a row.',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'In which row (period) and column (group) should Meena stand?',
      right: 'Period 3, group 13',
      wrong: ['Period 2, group 13', 'Period 3, group 3', 'Period 13, group 3'],
      sol: 'Three shells → period 3; three valence electrons → group 10 + 3 = 13 — option (@K).',
      d: 2, c: 'application', t: [3],
    })),
    part('b', num({
      stem: 'Arjun’s element has atomic number 4. How many valence electrons does it have?',
      value: 2, tol: 0, unit: null,
      sol: 'Atomic number 4 → configuration 2, 2: it has 2 valence electrons (beryllium, group 2).',
      scheme: [['2', 1]],
      d: 2, c: 'application', t: [3],
    })),
    part('c', short({
      marks: 2,
      stem: 'Explain why Kabir’s element belongs at the end of its row, and why the students in his column do not react easily.',
      model: 'Atomic number 10 → **2, 8**: the outer shell is **completely filled**, so it is a noble gas (neon) in **group 18**, the last column of period 2. Elements in this column have full outer shells, so they do not need to lose, gain or share electrons, and they are **very unreactive**.',
      sol: 'Use the full outer shell to explain both the position and the low reactivity.',
      scheme: [['Configuration 2, 8: full outer shell, group 18', 1], ['Full shell → very unreactive', 1]],
      d: 3, c: 'understanding', t: [3],
    }), [
      short({
        marks: 2,
        stem: 'A student holding "atomic number 19" asks to stand in period 3 because "that row has space". Evaluate this request.',
        model: 'The request is **wrong**. Atomic number 19 has the configuration **2, 8, 8, 1**: it has **four shells**, so it belongs in **period 4**, group 1, below sodium. Position is decided by the electronic configuration, not by where there is room.',
        sol: 'Work out the configuration and number of shells, then judge.',
        scheme: [['Configuration 2, 8, 8, 1: four shells', 1], ['Belongs in period 4, group 1, so the request is wrong', 1]],
        d: 3, c: 'evaluation', t: [3],
      }),
    ]),
  ],
}), (q) => (positionOf(13).period === 3 && positionOf(13).group === 13 && positionOf(4).valence === q.children[1].answer.value && cfg(10) === '2, 8' && positionOf(19).period === 4) || 'cards');
add('radius-case', mk.case({
  passage: 'A student collected typical values of atomic radius for two sets of elements from a data book.\n\n| Period 3 element | Na | Mg | Al | Si | P | S | Cl |\n|---|---|---|---|---|---|---|---|\n| Atomic radius (pm) | 186 | 160 | 143 | 117 | 110 | 104 | 99 |\n\n| Group 1 element | Li | Na | K | Rb | Cs |\n|---|---|---|---|---|---|\n| Atomic radius (pm) | 152 | 186 | 231 | 244 | 262 |',
  d: 3, c: 'analysis',
  children: [
    part('a', mcq({
      stem: 'What pattern do the two tables show?',
      right: 'Atomic radius decreases across period 3 and increases down group 1.',
      wrong: ['Atomic radius increases across period 3 and decreases down group 1.', 'Atomic radius increases in both directions.', 'Atomic radius stays the same across a period.'],
      sol: 'Period 3: 186 falls to 99 pm. Group 1: 152 rises to 262 pm — option (@K).',
      d: 2, c: 'application', t: [3],
    })),
    part('b', num({
      stem: 'By how many picometres does the atomic radius fall from sodium to chlorine?',
      value: 87, tol: 0, unit: 'pm',
      sol: r`$186 - 99 = 87$ pm.`,
      scheme: [['87 pm', 1]],
      d: 2, c: 'application', t: [3],
    })),
    part('c', short({
      marks: 2,
      stem: 'Explain why sodium has a larger atom than chlorine, although chlorine has more electrons.',
      model: 'Both have **three shells**. Chlorine has **17 protons** and sodium only **11**, so chlorine’s nucleus pulls the electrons of the same shells **more strongly** and holds them closer. No extra shell is added, so the chlorine atom is smaller.',
      sol: 'Same shells, greater nuclear charge → smaller atom.',
      scheme: [['Same number of shells', 1], ['Greater nuclear charge pulls electrons closer', 1]],
      d: 3, c: 'understanding', t: [3],
    }), [
      short({
        marks: 2,
        stem: 'Francium lies below caesium in group 1. Predict whether its atomic radius is more or less than 262 pm, and whether it is more or less metallic than caesium. Give reasons.',
        model: 'Francium has **one more shell** than caesium, so its radius should be **more than 262 pm**. Its outer electron is farther from the nucleus and lost even more easily, so it should be **more metallic** than caesium, continuing the trend down group 1.',
        sol: 'Extend both trends down the group with reasons.',
        scheme: [['Radius greater than 262 pm, with reason', 1], ['More metallic, with reason', 1]],
        d: 4, c: 'analysis', t: [3],
      }),
    ]),
  ],
}), (q) => {
  const p3 = [186, 160, 143, 117, 110, 104, 99];
  const g1 = [152, 186, 231, 244, 262];
  const dec = p3.every((v, i) => i === 0 || v < p3[i - 1]);
  const inc = g1.every((v, i) => i === 0 || v > g1[i - 1]);
  return (dec && inc && near(186 - 99, q.children[1].answer.value)) || 'radii';
});
add('oxide-case', mk.case({
  passage: 'In a practical class in Jaipur, a teacher burnt small samples of three elements, X, Y and Z, from period 3, and shook each product with water. The students tested each solution with litmus paper.\n\n| Element | Atomic number | Red litmus | Blue litmus |\n|---|---|---|---|\n| X | 11 | Turns blue | No change |\n| Y | 12 | Turns blue | No change |\n| Z | 16 | No change | Turns red |\n\nSodium was burnt only in a tiny amount, behind a safety screen.',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'What can be concluded about the oxides of X and Z?',
      right: 'The oxide of X is basic and the oxide of Z is acidic.',
      wrong: ['The oxide of X is acidic and the oxide of Z is basic.', 'Both oxides are basic.', 'Both oxides are neutral.'],
      sol: 'Turning red litmus blue shows a base (X); turning blue litmus red shows an acid (Z) — option (@K).',
      d: 2, c: 'application', t: [3],
    })),
    part('b', short({
      marks: 1,
      stem: 'Name the group of element Z and state whether it is a metal or a non-metal.',
      model: 'Z (2, 8, 6) is in **group 16**; it is a **non-metal** (sulfur).',
      sol: 'Six valence electrons give group 16; acidic oxide shows a non-metal.',
      scheme: [['Group 16, non-metal', 1]],
      d: 2, c: 'application', t: [3],
      wl: null,
    })),
    part('c', short({
      marks: 2,
      stem: 'Use the positions of X, Y and Z in period 3 to explain the change in the nature of their oxides.',
      model: 'X (sodium) and Y (magnesium) are on the **left** of period 3: they are **metals** that lose electrons easily, and metal oxides are **basic**. Z (sulfur) is on the **right**: it is a **non-metal**, and non-metal oxides are **acidic**. Moving across the period, metallic character decreases, so oxides change from basic to acidic.',
      sol: 'Link left/right position to metal/non-metal and to basic/acidic oxides.',
      scheme: [['X and Y: metals on the left, basic oxides', 1], ['Z: non-metal on the right, acidic oxide; trend across the period', 1]],
      d: 3, c: 'analysis', t: [3],
    }), [
      short({
        marks: 2,
        stem: 'Predict the effect on litmus of the oxide of the period 3 element with atomic number 15, and justify your prediction.',
        model: 'Atomic number 15 is **phosphorus** (2, 8, 5), a **non-metal** to the right of the zig-zag line, between silicon and sulfur. Its oxide should be **acidic**, so its solution should turn **blue litmus red** and leave red litmus unchanged.',
        sol: 'Locate the element, decide metal or non-metal, then predict.',
        scheme: [['Identifies a non-metal in group 15', 1], ['Predicts an acidic oxide: blue litmus turns red', 1]],
        d: 3, c: 'application', t: [3],
      }),
    ]),
  ],
}), () => (positionOf(11).group === 1 && positionOf(12).group === 2 && positionOf(16).group === 16 && positionOf(15).group === 15) || 'oxides');
