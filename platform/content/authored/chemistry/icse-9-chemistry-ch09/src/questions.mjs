// ICSE 9 Chemistry ch09 The Periodic Table — question bank in ICSE school-examination style (triad calculations, octave counting,
// anomalies, positions from configuration, group properties, 10-mark structured questions in parts).
// AR keys use the ICSE option order: a = A true R false, b = A false R true, c = both true and R explains, d = both true and R does not explain.
import { mk, add, svgV, r } from '../../icse-9-chemistry-ch01/src/lib.mjs';
import { eq, TRIADS, mean, gap, eighth, ANOM, TE_I, PERIODS, place, SYM, cfg, MP, BP, r2, stateAt25, NOBLE } from './calc.mjs';
import { TABLE_LETTERED } from './svgs.mjs';

const { mcq, ar, tf, fill, num, short, long, match } = mk;
const tabFig = svgV(TABLE_LETTERED, 'Outline of the modern periodic table with five regions lettered A to E');
const term = (o) => short({ marks: 1, wl: null, scheme: [[o.sch ?? 'Correct answer', 1]], ...o });
const pl = (s) => place(SYM[s]);
const sumTo = (n) => PERIODS.slice(0, n).reduce((a, b) => a + b, 0);

// ---------------------------------------------------------------- deck-check items (not used in tests)
add('chk-triad', mcq({
  stem: 'Sulphur, selenium and tellurium have similar properties and atomic masses 32, 79 and 128. Which statement supports a Dobereiner triad?',
  right: 'The mean of 32 and 128 is 80, which is close to the mass of selenium', wrong: ['The mean of 32 and 79 is 55.5, which is close to the mass of tellurium', 'The three masses are equal', 'Selenium is 32 heavier than tellurium'],
  sol: `(32 + 128) ÷ 2 = ${mean('SSeTe')}, close to 79, option (@K).`,
  d: 2, c: 'application', t: [1],
}), () => mean('SSeTe') === 80 || 'sse');
add('chk-newlands', mcq({
  stem: 'In the order of increasing atomic mass used by Newlands, the eighth element counting sodium as the first is',
  right: 'potassium', wrong: ['chlorine', 'magnesium', 'calcium'],
  sol: 'Na, Mg, Al, Si, P, S, Cl, K: the eighth is potassium, option (@K).',
  d: 2, c: 'application', t: [1],
}), () => eighth('Na') === 'K' || 'k');
add('chk-mend', mcq({
  stem: 'Mendeleev left some gaps in his periodic table in order to',
  right: 'leave room for elements that were not yet discovered', wrong: ['separate metals from non-metals', 'keep the groups equal in size', 'leave room for isotopes'],
  sol: 'He predicted that elements fitting the gaps would be found, option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('chk-modern', mcq({
  stem: 'In the modern periodic law the elements are arranged in the order of increasing',
  right: 'atomic number', wrong: ['atomic mass', 'number of neutrons', 'number of isotopes'],
  sol: 'Moseley showed that atomic number is the basis, option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('chk-locate', mcq({
  stem: 'An aluminium atom has the configuration 2, 8, 3. It is placed in',
  right: 'period 3 and group 13', wrong: ['period 3 and group 3', 'period 13 and group 3', 'period 2 and group 13'],
  sol: 'Three shells give period 3; three outer electrons give group 10 + 3 = 13, option (@K).',
  d: 2, c: 'application', t: [4],
}), () => pl('Al').period === 3 && pl('Al').group === 13 || 'al');
add('chk-trans', mcq({
  stem: 'The inner transition elements are placed',
  right: 'in two rows set below the main body of the table', wrong: ['in groups 1 and 2', 'in group 18', 'in groups 13 to 17'],
  sol: 'They are set apart below the table, option (@K).',
  d: 1, c: 'recall', t: [4],
}));
add('chk-halogen', mcq({
  stem: 'A chlorine atom has the configuration 2, 8, 7. It tends to form the ion and belongs to the group',
  right: 'Cl⁻, group 17', wrong: ['Cl⁺, group 1', 'Cl⁻, group 7', 'Cl²⁻, group 17'],
  sol: 'It gains one electron to complete an octet, and 10 + 7 = 17, option (@K).',
  d: 2, c: 'application', t: [4, 5],
}), () => pl('Cl').group === 17 || 'cl');

// ---------------------------------------------------------------- t01 Dobereiner and Newlands
add('d-mcq1', mcq({
  stem: 'The atomic masses of lithium and potassium are 7 and 39. The mean of these two masses is',
  right: String(mean('LiNaK')), wrong: ['46', '16', '32'],
  sol: `(7 + 39) ÷ 2 = ${mean('LiNaK')}, option (@K).`,
  d: 1, c: 'application', t: [1],
}), () => mean('LiNaK') === 23 || 'm');
add('d-mcq2', mcq({
  stem: 'A Dobereiner triad consists of',
  right: 'three elements with similar properties, the middle mass being about the mean of the other two', wrong: ['three elements with the same atomic mass', 'three elements with the same atomic number', 'eight elements with similar properties'],
  sol: 'This is the idea of a triad, option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('d-mcq3', mcq({
  stem: 'Carbon, nitrogen and oxygen have masses 12, 14 and 16, and 14 is the mean of 12 and 16. They are still not accepted as a Dobereiner triad because',
  right: 'their properties are not similar', wrong: ['the mean is not equal to the middle mass', 'they are not elements', 'their masses are too small'],
  sol: 'A triad needs similar properties as well as the arithmetic, option (@K).',
  d: 3, c: 'analysis', t: [1],
}), () => mean('CNO') === 14 || 'cno');
add('d-mcq4', mcq({
  stem: "In Newlands' arrangement, counting lithium as the first element, the eighth element is",
  right: 'sodium', wrong: ['beryllium', 'fluorine', 'magnesium'],
  sol: 'Li, Be, B, C, N, O, F, Na: the eighth is sodium, option (@K).',
  d: 2, c: 'application', t: [1],
}), () => eighth('Li') === 'Na' || 'na');
add('d-mcq5', mcq({
  stem: "Newlands' law of octaves was found to hold good only up to",
  right: 'calcium', wrong: ['sodium', 'chlorine', 'argon'],
  sol: 'Beyond calcium, the pattern of every eighth element did not hold, option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('ar-octave', ar({
  a: "Newlands' law of octaves could not be applied to all the known elements.",
  r: 'The law put elements with unlike properties in the same column and the noble gases had no place in it.',
  key: 'c',
  sol: 'The mismatches and the lack of space for new elements explain why the law failed, option (c).',
  d: 3, c: 'analysis', t: [1],
}));
add('d-tf', tf({
  stem: 'In a Dobereiner triad the atomic mass of the middle element is close to the mean of the masses of the other two.',
  key: 't',
  sol: 'True. This is the rule of the triad.',
  d: 1, c: 'recall', t: [1],
}));
add('d-fill', fill({
  stem: 'Newlands arranged the elements in the order of increasing atomic ___.',
  acc: [['mass', 'masses', 'weight']],
  sol: 'Atomic **mass**.',
  d: 1, c: 'recall', t: [1],
}));
add('d-term1', term({
  stem: 'Name the scientist who classified elements in groups of three called triads.',
  model: '**Dobereiner.**', sol: 'Dobereiner.', sch: 'Dobereiner',
  d: 1, c: 'recall', t: [1],
}));
add('d-term2', term({
  stem: "Name the element that falls in the same column as lithium and sodium in Newlands' arrangement of the first seventeen elements.",
  model: '**Potassium.**', sol: 'Potassium.', sch: 'Potassium',
  d: 2, c: 'application', t: [1],
}), () => eighth('Na') === 'K' || 'k');
add('d-num1', num({
  stem: 'The atomic masses of chlorine and iodine are 35.5 and 127. Calculate the mean of these masses, to two decimal places.',
  value: mean('ClBrI'), tol: 0.005, unit: null,
  sol: `(35.5 + 127) ÷ 2 = 162.5 ÷ 2 = ${mean('ClBrI')}.`,
  scheme: [['Adds the two masses', 0.5], [`${mean('ClBrI')}`, 0.5]],
  d: 2, c: 'application', t: [1],
}), () => eq(mean('ClBrI'), 81.25, 'cl-i') === 81.25);
add('d-num2', num({
  stem: 'In the triad of sulphur (32), selenium (79) and tellurium (128), by how much does the mean of the first and third masses differ from the mass of selenium?',
  value: gap('SSeTe'), tol: 0, unit: null,
  sol: `Mean = (32 + 128) ÷ 2 = ${mean('SSeTe')}; difference = ${mean('SSeTe')} − 79 = ${gap('SSeTe')}.`,
  scheme: [['Mean 80', 0.5], ['Difference 1', 0.5]],
  d: 2, c: 'application', t: [1],
}), () => gap('SSeTe') === 1 || 'g');
add('d-num3', num({
  stem: 'Starting from sodium as the first element, the elements of increasing atomic mass are Na, Mg, Al, Si, P, S, Cl, K. How many elements, including both sodium and potassium, are in this list?',
  value: 8, tol: 0, unit: null,
  sol: 'The list has 8 elements: Na, Mg, Al, Si, P, S, Cl, K.',
  scheme: [['Counts the list', 0.5], ['8', 0.5]],
  d: 1, c: 'application', t: [1],
}));
add('d-short2a', short({
  marks: 2,
  stem: "State Dobereiner's law of triads and name one triad.",
  wl: null,
  model: 'When elements with similar properties are arranged in a group of **three** in order of atomic mass, the mass of the **middle element is about the mean** of the other two. One triad is **calcium, strontium and barium** (or lithium, sodium and potassium).',
  sol: 'Middle mass is the mean of the outer two; a named triad.',
  scheme: [['Statement of the law', 1], ['A triad named', 1]],
  d: 1, c: 'recall', t: [1],
}));
add('d-short2b', short({
  marks: 2,
  stem: 'The atomic masses of sulphur, selenium and tellurium are 32, 79 and 128. Show by calculation that they follow the rule of a Dobereiner triad.',
  wl: null,
  model: `The mean of 32 and 128 is (32 + 128) ÷ 2 = **${mean('SSeTe')}**. This is **close to 79**, the mass of selenium (difference ${gap('SSeTe')}), so the rule of the triad is followed.`,
  sol: 'Mean 80, close to 79.',
  scheme: [['Calculates the mean', 1], ['Compares with selenium', 1]],
  d: 2, c: 'application', t: [1],
}), () => mean('SSeTe') === 80 || 'sse');
add('d-short2c', short({
  marks: 2,
  stem: "State Newlands' law of octaves and one limitation of it.",
  wl: null,
  model: 'When elements are placed in order of **increasing atomic mass**, **every eighth element** has properties similar to the first. It held good **only up to calcium**.',
  sol: 'Every eighth element repeats; limited to calcium.',
  scheme: [['Law', 1], ['Limitation', 1]],
  d: 1, c: 'recall', t: [1],
}));
add('d-short3', short({
  marks: 3,
  stem: 'The atomic masses of beryllium, magnesium and calcium are 9, 24 and 40. (a) Calculate the mean of the first and third masses. (b) Compare it with the mass of magnesium. (c) State what else must be true for the three elements to form a Dobereiner triad.',
  wl: null,
  model: `**(a)** (9 + 40) ÷ 2 = **${mean('BeMgCa')}**.\n\n**(b)** It differs from 24 by only **${gap('BeMgCa')}**, so it is close.\n\n**(c)** The three elements must also have **similar chemical properties**.`,
  sol: 'Mean 24.5; close to 24; similar properties needed.',
  scheme: [['(a) mean', 1], ['(b) comparison', 1], ['(c) similar properties', 1]],
  d: 2, c: 'application', t: [1],
}), () => mean('BeMgCa') === 24.5 && gap('BeMgCa') === 0.5 || 'bemgca');

// ---------------------------------------------------------------- t02 Mendeleev
add('m-mcq1', mcq({
  stem: "According to Mendeleev's periodic law, the properties of elements are a periodic function of their",
  right: 'atomic masses', wrong: ['atomic numbers', 'number of neutrons', 'valencies only'],
  sol: 'Mendeleev arranged the elements by atomic mass, option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('m-mcq2', mcq({
  stem: 'Eka-aluminium, whose properties Mendeleev predicted, was later discovered and named',
  right: 'gallium', wrong: ['germanium', 'scandium', 'boron'],
  sol: 'Eka-aluminium is gallium; eka-silicon is germanium, option (@K).',
  d: 2, c: 'recall', t: [2],
}));
add('m-mcq3', mcq({
  stem: "Which of these was a limitation of Mendeleev's periodic table?",
  right: 'Hydrogen could not be given a fixed position', wrong: ['It left gaps for undiscovered elements', 'It corrected the atomic masses of some elements', 'It grouped similar elements together'],
  sol: 'The other options are merits, option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('m-mcq4', mcq({
  stem: `Tellurium (atomic mass ${ANOM[0].m1}) comes before iodine (${ANOM[0].m2}) in the table, though it is heavier. This shows that`,
  right: 'the order of atomic mass was not always followed', wrong: ['tellurium is a noble gas', 'iodine has more protons than neutrons', 'the table had no groups'],
  sol: 'An element was placed out of the order of atomic mass to keep similar elements together, option (@K).',
  d: 3, c: 'analysis', t: [2],
}), () => ANOM[0].m1 > ANOM[0].m2 || 'te');
add('m-mcq5', mcq({
  stem: "In Mendeleev's table the vertical columns are called",
  right: 'groups', wrong: ['periods', 'octaves', 'triads'],
  sol: 'Vertical columns are groups and horizontal rows are periods, option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('ar-gaps', ar({
  a: "Mendeleev's table showed that some elements were still to be discovered.",
  r: "Mendeleev's table had eight groups.",
  key: 'd',
  sol: 'Both are true, but the gaps, not the number of groups, showed that elements were missing, option (d).',
  d: 3, c: 'analysis', t: [2],
}));
add('m-tf', tf({
  stem: 'Mendeleev arranged the elements in order of increasing atomic number.',
  key: 'f',
  sol: 'False. He used atomic mass; the atomic number came later.',
  d: 1, c: 'recall', t: [2],
}));
add('m-fill', fill({
  stem: 'Eka-silicon, predicted by Mendeleev, was later discovered as ___.',
  acc: [['germanium']],
  sol: '**Germanium**.',
  d: 2, c: 'recall', t: [2],
}));
add('m-term1', term({
  stem: "State Mendeleev's periodic law.",
  model: 'The properties of elements are a periodic function of their **atomic masses**.', sol: 'Periodic function of atomic masses.', sch: 'Law stated',
  d: 1, c: 'recall', t: [2],
}));
add('m-num', num({
  stem: `The atomic masses of tellurium and iodine are ${ANOM[0].m1} and ${ANOM[0].m2}. By how much is tellurium heavier than iodine?`,
  value: TE_I, tol: 0.01, unit: null,
  sol: `${ANOM[0].m1} − ${ANOM[0].m2} = ${TE_I}.`,
  scheme: [['Subtraction', 0.5], [`${TE_I}`, 0.5]],
  d: 1, c: 'application', t: [2],
}), () => TE_I === 0.7 || 'te');
add('m-short2', short({
  marks: 2,
  stem: "State two merits of Mendeleev's periodic table.",
  wl: null,
  model: 'He left **gaps** for undiscovered elements and predicted their properties, so that **gallium and germanium** were later found to fit. He also **corrected the atomic masses** of some elements, and placed similar elements in the same group.',
  sol: 'Gaps and predictions; corrected masses.',
  scheme: [['First merit', 1], ['Second merit', 1]],
  d: 1, c: 'recall', t: [2],
}));
add('m-short2b', short({
  marks: 2,
  stem: "State two limitations of Mendeleev's periodic table.",
  wl: null,
  model: '**Hydrogen** had no fixed position in the table. Some elements were placed **out of the order of atomic mass**, and there was **no place for isotopes** or the noble gases.',
  sol: 'Hydrogen without a place; elements out of mass order.',
  scheme: [['First limitation', 1], ['Second limitation', 1]],
  d: 1, c: 'recall', t: [2],
}));
add('m-short3', short({
  marks: 3,
  stem: 'Mendeleev left a gap below aluminium and predicted an element he called eka-aluminium. (a) What does the word "eka" show about its position? (b) Name the element later found in this gap. (c) State what the discovery showed about his table.',
  wl: null,
  model: '**(a)** It is placed **next below aluminium** in the same group, so it should resemble aluminium.\n\n**(b)** **Gallium**.\n\n**(c)** It showed that the periodic law could **predict** undiscovered elements and their properties, which supported the table.',
  sol: 'Below aluminium; gallium; predictions were confirmed.',
  scheme: [['(a)', 1], ['(b) gallium', 1], ['(c)', 1]],
  d: 3, c: 'understanding', t: [2],
}));

// ---------------------------------------------------------------- t03 atomic number
add('a-mcq1', mcq({
  stem: 'The scientist who showed that the atomic number is the basis of the arrangement of elements was',
  right: 'Moseley', wrong: ['Newlands', 'Dobereiner', 'Mendeleev'],
  sol: 'Moseley (1913) linked the properties to the atomic number, option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('a-mcq2', mcq({
  stem: 'The atomic numbers of tellurium and iodine are 52 and 53. When the elements are arranged by atomic number',
  right: 'tellurium comes before iodine, which is the correct order', wrong: ['iodine comes before tellurium', 'both take the same position', 'tellurium is dropped from the table'],
  sol: 'The anomaly of the atomic masses disappears, option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('a-mcq3', mcq({
  stem: 'Two isotopes of the same element are placed in the same position of the modern table because they have the same',
  right: 'atomic number', wrong: ['mass number', 'number of neutrons', 'physical properties'],
  sol: 'Isotopes differ in mass number but have the same atomic number, option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('ar-modern', ar({
  a: 'The modern periodic law is based on the atomic mass of the elements.',
  r: 'Arranging elements by atomic number removed the anomalies in the order of atomic masses.',
  key: 'b',
  sol: 'The modern law is based on atomic number, so (A) is false; (R) is true, option (b).',
  d: 2, c: 'analysis', t: [3],
}));
add('a-tf', tf({
  stem: 'Argon has a smaller atomic number than potassium, although it has the larger atomic mass.',
  key: 't',
  sol: 'True. Argon is 18 and potassium is 19.',
  d: 2, c: 'application', t: [3],
}));
add('a-fill', fill({
  stem: 'The modern periodic law says that the properties of elements are periodic functions of their ___ numbers.',
  acc: [['atomic']],
  sol: '**Atomic** numbers.',
  d: 1, c: 'recall', t: [3],
}));
add('a-short2', short({
  marks: 2,
  stem: 'State the modern periodic law and say how it removed one anomaly of the order of atomic masses.',
  wl: null,
  model: 'The properties of elements are a **periodic function of their atomic numbers**. For example, tellurium (52) now comes **before** iodine (53), although it has the **larger atomic mass**.',
  sol: 'Law with atomic numbers; an out-of-order pair now in order.',
  scheme: [['Law', 1], ['An anomaly removed', 1]],
  d: 2, c: 'understanding', t: [3],
}));

// ---------------------------------------------------------------- t04 the modern table
add('g-mcq1', mcq({
  stem: 'The modern periodic table has',
  right: '18 groups and 7 periods', wrong: ['7 groups and 18 periods', '8 groups and 7 periods', '18 groups and 8 periods'],
  sol: 'Eighteen vertical columns and seven horizontal rows, option (@K).',
  d: 1, c: 'recall', t: [4],
}));
add('g-mcq2', mcq({
  stem: 'An atom has the configuration 2, 8, 6. It is placed in',
  right: 'period 3 and group 16', wrong: ['period 6 and group 3', 'period 3 and group 6', 'period 16 and group 3'],
  sol: 'Three shells give period 3; 10 + 6 = 16 gives the group, option (@K).',
  d: 2, c: 'application', t: [4],
}), () => pl('S').period === 3 && pl('S').group === 16 || 's');
add('g-mcq3', mcq({
  stem: 'The element with atomic number 19 is in',
  right: 'period 4 and group 1', wrong: ['period 3 and group 1', 'period 4 and group 2', 'period 1 and group 4'],
  sol: 'Configuration 2, 8, 8, 1: four shells and one outer electron, option (@K).',
  d: 2, c: 'application', t: [4],
}), () => pl('K').period === 4 && pl('K').group === 1 || 'k');
add('g-mcq4', mcq({
  stem: 'The transition elements are placed in',
  right: 'groups 3 to 12', wrong: ['groups 1 and 2', 'groups 13 to 17', 'group 18'],
  sol: 'The ten middle groups hold the transition elements, option (@K).',
  d: 1, c: 'recall', t: [4],
}));
add('g-mcq5', mcq({
  stem: 'Elements in the same group of the modern table have the same',
  right: 'number of valence electrons', wrong: ['number of shells', 'atomic number', 'mass number'],
  sol: 'This is why elements of a group behave alike, option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('g-mcq6', mcq({
  stem: 'The number of elements in the fourth period is',
  right: String(PERIODS[3]), wrong: ['8', '32', '2'],
  sol: `The periods have ${PERIODS.join(', ')} elements, so the fourth has ${PERIODS[3]}, option (@K).`,
  d: 2, c: 'recall', t: [4],
}), () => PERIODS[3] === 18 || 'p4');
add('g-mcq7', mcq({
  stem: 'Which element has three shells and four electrons in its outermost shell?',
  right: 'Silicon', wrong: ['Carbon', 'Magnesium', 'Sulphur'],
  sol: 'Configuration 2, 8, 4 has 14 electrons: silicon, in period 3 and group 14, option (@K).',
  d: 2, c: 'application', t: [4],
}), () => cfg(14) === '2, 8, 4' && pl('Si').group === 14 || 'si');
add('g-tf', tf({
  stem: 'Aluminium, with three outer electrons, belongs to group 3.',
  key: 'f',
  sol: 'False. Three outer electrons give group 13.',
  d: 2, c: 'application', t: [4],
}));
add('g-fill', fill({
  stem: 'The number of shells in an atom is equal to the ___ number of its element.',
  acc: [['period']],
  sol: 'The **period** number.',
  d: 1, c: 'understanding', t: [4],
}));
add('g-term1', term({
  stem: 'Write the group and the period of the element whose atoms have the configuration 2, 8, 5.',
  model: '**Period 3, group 15.**', sol: 'Period 3, group 15.', sch: 'Period 3, group 15',
  d: 2, c: 'application', t: [4],
}), () => pl('P').period === 3 && pl('P').group === 15 || 'p');
add('g-term2', term({
  stem: 'Name the element that is in period 2 and group 18.',
  model: '**Neon.**', sol: 'Neon.', sch: 'Neon',
  d: 2, c: 'application', t: [4],
}), () => pl('Ne').period === 2 && pl('Ne').group === 18 || 'ne');
add('g-num1', num({
  stem: 'How many elements are there in the first three periods of the modern periodic table taken together?',
  value: sumTo(3), tol: 0, unit: null,
  sol: `2 + 8 + 8 = ${sumTo(3)}.`,
  scheme: [['Lengths of the periods', 0.5], [`${sumTo(3)}`, 0.5]],
  d: 2, c: 'application', t: [4],
}), () => sumTo(3) === 18 || 'sum3');
add('g-num2', num({
  stem: 'How many elements are there in the first four periods of the modern periodic table taken together?',
  value: sumTo(4), tol: 0, unit: null,
  sol: `2 + 8 + 8 + 18 = ${sumTo(4)}.`,
  scheme: [['Lengths of the periods', 0.5], [`${sumTo(4)}`, 0.5]],
  d: 2, c: 'application', t: [4],
}), () => sumTo(4) === 36 || 'sum4');
add('g-short2a', short({
  marks: 2,
  stem: 'Find the period and the group of (a) phosphorus (atomic number 15) and (b) calcium (atomic number 20).',
  wl: null,
  model: `**(a)** Configuration ${cfg(15)}: period **${pl('P').period}**, group **${pl('P').group}**.\n\n**(b)** Configuration ${cfg(20)}: period **${pl('Ca').period}**, group **${pl('Ca').group}**.`,
  sol: 'P: period 3, group 15; Ca: period 4, group 2.',
  scheme: [['(a)', 1], ['(b)', 1]],
  d: 2, c: 'application', t: [4],
}), () => pl('P').group === 15 && pl('Ca').period === 4 && pl('Ca').group === 2 || 'pca');
add('g-short2b', short({
  marks: 2,
  stem: 'State where the transition elements and the inner transition elements are placed in the modern periodic table.',
  wl: null,
  model: 'The **transition elements** are in **groups 3 to 12** (periods 4 to 7). The **inner transition elements** are in **two separate rows** below the main table.',
  sol: 'Groups 3 to 12; two rows below the table.',
  scheme: [['Transition elements', 1], ['Inner transition elements', 1]],
  d: 1, c: 'recall', t: [4],
}));
add('g-short2c', short({
  marks: 2,
  stem: 'Explain how the number of shells and the number of valence electrons of an atom decide its period and its group.',
  wl: null,
  model: 'The **period** is the **number of shells** occupied by electrons. The **group** follows from the **number of valence electrons**: the same number for groups 1 and 2, and 10 more than that number for groups 13 to 18.',
  sol: 'Shells give the period; outer electrons give the group.',
  scheme: [['Period from shells', 1], ['Group from valence electrons', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('g-short3', short({
  marks: 3,
  stem: 'Write the electronic configuration, and give the period and group, of the elements with atomic numbers (a) 3, (b) 10 and (c) 17.',
  wl: null,
  model: `**(a)** ${cfg(3)}; period **${pl('Li').period}**, group **${pl('Li').group}**.\n\n**(b)** ${cfg(10)}; period **${pl('Ne').period}**, group **${pl('Ne').group}**.\n\n**(c)** ${cfg(17)}; period **${pl('Cl').period}**, group **${pl('Cl').group}**.`,
  sol: 'Li: 2, 1, period 2, group 1; Ne: 2, 8, period 2, group 18; Cl: 2, 8, 7, period 3, group 17.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 2, c: 'application', t: [4],
}), () => pl('Li').group === 1 && pl('Ne').group === 18 && pl('Cl').period === 3 || 'lnc');

// ---------------------------------------------------------------- t05 groups 1, 2, 17, 18
add('f-mcq1', mcq({
  stem: 'The alkali metals have one electron in their outermost shell, so they tend to',
  right: 'lose it and form positive ions with a charge of 1+', wrong: ['gain one electron', 'share three electrons', 'lose two electrons'],
  sol: 'Loss of the single outer electron leaves a stable shell, option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('f-mcq2', mcq({
  stem: 'Which group of the periodic table contains elements with seven valence electrons?',
  right: 'Group 17', wrong: ['Group 7', 'Group 1', 'Group 18'],
  sol: 'Group 17, the halogens, option (@K).',
  d: 1, c: 'recall', t: [5],
}));
add('f-mcq3', mcq({
  stem: 'Among lithium, sodium and potassium the most reactive metal is',
  right: 'potassium', wrong: ['lithium', 'sodium', 'all three react equally'],
  sol: 'Reactivity increases down group 1, option (@K).',
  d: 1, c: 'application', t: [5],
}));
add('f-mcq4', mcq({
  stem: 'Which halogen is a liquid at room temperature?',
  right: 'Bromine', wrong: ['Chlorine', 'Iodine', 'Fluorine'],
  sol: 'Chlorine and fluorine are gases and iodine is a solid, option (@K).',
  d: 1, c: 'recall', t: [5],
}), () => stateAt25('Bromine') === 'liquid' || 'br');
add('f-mcq5', mcq({
  stem: 'The ion formed by an atom of group 2 is',
  right: 'M²⁺', wrong: ['M⁺', 'M²⁻', 'M⁶⁺'],
  sol: 'The two outer electrons are lost, option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('f-mcq6', mcq({
  stem: 'On going down group 17 from chlorine to iodine the reactivity',
  right: 'decreases', wrong: ['increases', 'stays the same', 'first increases and then decreases'],
  sol: 'The tendency to gain an electron falls down the group, option (@K).',
  d: 2, c: 'understanding', t: [5],
}));
add('f-mcq7', mcq({
  stem: 'Noble gases are chemically unreactive because',
  right: 'their outermost shells are already full', wrong: ['their atoms have only one electron', 'they are very heavy', 'they have no electrons'],
  sol: 'A full duplet or octet leaves no tendency to react, option (@K).',
  d: 1, c: 'understanding', t: [5],
}));
add('f-mcq8', mcq({
  stem: 'An element X has the configuration 2, 8, 8, 2. Which statement about X is correct?',
  right: 'It forms X²⁺ and is more reactive than magnesium', wrong: ['It forms X⁻ and is a halogen', 'It is inert like argon', 'It forms X⁺ and is an alkali metal'],
  sol: 'Group 2 and period 4: it loses two electrons and lies below magnesium, option (@K).',
  d: 3, c: 'analysis', t: [4, 5],
}));
add('ar-noble', ar({
  a: 'The noble gases are chemically inert.',
  r: 'Every noble gas atom has eight electrons in its outermost shell.',
  key: 'a',
  sol: 'Helium has only two outer electrons, so (R) is false; (A) is true, option (a).',
  d: 3, c: 'analysis', t: [5],
}));
add('f-tf', tf({
  stem: 'All the noble gases have eight electrons in the outermost shell.',
  key: 'f',
  sol: 'False. Helium has two.',
  d: 2, c: 'understanding', t: [5],
}));
add('f-fill', fill({
  stem: 'The elements of group 17 are called the ___.',
  acc: [['halogens']],
  sol: 'The **halogens**.',
  d: 1, c: 'recall', t: [5],
}));
add('f-term1', term({
  stem: 'Name the family of elements to which magnesium and calcium belong.',
  model: '**Alkaline earth metals** (group 2).', sol: 'Alkaline earth metals.', sch: 'Alkaline earth metals',
  d: 1, c: 'recall', t: [5],
}));
add('f-term2', term({
  stem: 'State the number of valence electrons in the atoms of the alkali metals.',
  model: '**One.**', sol: 'One.', sch: 'One',
  d: 1, c: 'recall', t: [5],
}));
add('f-num', num({
  stem: `The approximate melting points of sodium and potassium are ${MP[1][1]} °C and ${MP[2][1]} °C. By how many degrees is the melting point of sodium higher?`,
  value: MP[1][1] - MP[2][1], tol: 0, unit: '°C',
  sol: `${MP[1][1]} − ${MP[2][1]} = ${MP[1][1] - MP[2][1]} °C.`,
  scheme: [['Subtraction', 0.5], [`${MP[1][1] - MP[2][1]} °C`, 0.5]],
  d: 1, c: 'application', t: [5],
}), () => MP[1][1] - MP[2][1] === 35 || 'mp');
add('f-num2', num({
  stem: `The approximate boiling points of chlorine and bromine are ${BP[1][1]} °C and ${BP[2][1]} °C. By how many degrees is the boiling point of bromine higher?`,
  value: BP[2][1] - BP[1][1], tol: 0, unit: '°C',
  sol: `${BP[2][1]} − (${BP[1][1]}) = ${BP[2][1] - BP[1][1]} °C.`,
  scheme: [['Subtraction with signs', 0.5], [`${BP[2][1] - BP[1][1]} °C`, 0.5]],
  d: 2, c: 'application', t: [5],
}), () => BP[2][1] - BP[1][1] === 93 || 'bp');
add('f-short2a', short({
  marks: 2,
  stem: 'Why are sodium and potassium stored under oil?',
  wl: null,
  model: 'They are **very reactive metals** that react quickly with the **oxygen and moisture of the air**. Oil keeps these out.',
  sol: 'Very reactive with air and moisture.',
  scheme: [['Very reactive', 1], ['Reacts with air and moisture, oil protects', 1]],
  d: 2, c: 'understanding', t: [5],
}));
add('f-short2b', short({
  marks: 2,
  stem: 'Explain why the noble gases do not form ions or share electrons.',
  wl: null,
  model: 'Their atoms already have a **full outermost shell**: a duplet in helium and an octet in the others. They have **no tendency to lose, gain or share** electrons.',
  sol: 'Full outer shell; no tendency to lose, gain or share.',
  scheme: [['Full outer shell', 1], ['No tendency to lose, gain or share', 1]],
  d: 2, c: 'understanding', t: [5],
}));
add('f-short2c', short({
  marks: 2,
  stem: 'State two properties common to the alkali metals and explain them from their electronic arrangement.',
  wl: null,
  model: 'All are **soft, reactive metals** that form **M⁺ ions**. These follow from the **single valence electron** in each atom, which is lost easily.',
  sol: 'Soft and reactive, form M⁺; one valence electron.',
  scheme: [['Two properties', 1], ['Explained from one valence electron', 1]],
  d: 2, c: 'understanding', t: [5],
}));
add('f-short3', short({
  marks: 3,
  stem: 'State the number of valence electrons and the ion formed by the atoms of (a) group 1, (b) group 2 and (c) group 17.',
  wl: null,
  model: '**(a)** **1** valence electron; **M⁺**.\n\n**(b)** **2** valence electrons; **M²⁺**.\n\n**(c)** **7** valence electrons; **X⁻**.',
  sol: 'Group 1: 1, M⁺; group 2: 2, M²⁺; group 17: 7, X⁻.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 2, c: 'application', t: [5],
}));
add('f-short3b', short({
  marks: 3,
  stem: 'Give the state at room temperature of (a) fluorine, (b) bromine and (c) iodine, and state the trend in reactivity down group 17.',
  wl: null,
  model: `**(a)** Fluorine is a **${stateAt25('Fluorine')}**; **(b)** bromine is a **${stateAt25('Bromine')}**; **(c)** iodine is a **${stateAt25('Iodine')}**. The reactivity **decreases** down the group.`,
  sol: 'Gas, liquid, solid; reactivity decreases.',
  scheme: [['Fluorine and bromine states', 1], ['Iodine state', 1], ['Trend', 1]],
  d: 2, c: 'recall', t: [5],
}), () => stateAt25('Fluorine') === 'gas' && stateAt25('Iodine') === 'solid' || 'hal');
add('group-match', match({
  marks: 5,
  stem: 'Match each family of elements in Column A with its position in Column B.',
  pairs: [
    ['Alkali metals', 'Group 1'],
    ['Alkaline earth metals', 'Group 2'],
    ['Halogens', 'Group 17'],
    ['Noble gases', 'Group 18'],
    ['Transition elements', 'Groups 3 to 12'],
  ],
  order: [2, 4, 0, 3, 1],
  sol: 'Alkali metals group 1; alkaline earth metals group 2; halogens group 17; noble gases group 18; transition elements groups 3 to 12.',
  d: 1, c: 'recall', t: [4, 5],
}));

// ---------------------------------------------------------------- 10-mark structured questions
add('triad-long', long({
  marks: 10, wl: null,
  stem: 'A student studies two sets of elements with similar properties. Set P: chlorine (35.5), bromine (80) and iodine (127). Set Q: sulphur (32), selenium (79) and tellurium (128). The numbers in brackets are atomic masses.\n\n(a) Calculate the mean of the first and the third mass in each set. [4]\n\n(b) State whether each set agrees with the rule of Dobereiner\'s triads, giving a reason. [2]\n\n(c) State Dobereiner\'s law of triads. [2]\n\n(d) Why could the idea of triads not be used to classify all the known elements? [2]',
  model: `**(a)** Set P: (35.5 + 127) ÷ 2 = **${mean('ClBrI')}**. Set Q: (32 + 128) ÷ 2 = **${mean('SSeTe')}**.\n\n**(b)** **Both** agree: each mean is **close to the middle mass** (80 and 79) and the elements in each set have similar properties.\n\n**(c)** Elements with similar properties, grouped in threes by atomic mass, have a **middle member whose mass is about the mean** of the other two.\n\n**(d)** Only a **very few triads** could be found, so most elements could not be placed in this way.`,
  sol: 'Means 81.25 and 80; both agree; the law of triads; too few triads.',
  scheme: [['Mean for set P', 2], ['Mean for set Q', 2], ['Both sets agree', 1], ['Reason: close to the middle and similar properties', 1], ['Law: groups of three, similar properties', 1], ['Middle mass is the mean', 1], ['Very few triads', 1], ['Most elements not classified', 1]],
  d: 3, c: 'application', t: [1],
}), () => mean('ClBrI') === 81.25 && mean('SSeTe') === 80 || 'triads');
add('newlands-long', long({
  marks: 10, wl: null,
  stem: "Newlands arranged the first elements in rows of seven in the order of increasing atomic mass: Row 1: Li, Be, B, C, N, O, F. Row 2: Na, Mg, Al, Si, P, S, Cl. Row 3: K, Ca.\n\n(a) State Newlands' law of octaves. [2]\n\n(b) Name the elements that resemble lithium and the elements that resemble fluorine. [2]\n\n(c) Name the eighth element counting beryllium as the first. [1]\n\n(d) State two limitations of the law. [3]\n\n(e) Why did the noble gases not fit into the arrangement? [2]",
  model: `**(a)** When elements are arranged in order of **increasing atomic mass**, the **eighth element** from any one has properties **similar to the first**.\n\n**(b)** Lithium: **sodium and potassium**. Fluorine: **chlorine**.\n\n**(c)** **${eighth('Be') === 'Mg' ? 'Magnesium' : ''}**.\n\n**(d)** It held good **only up to calcium**; **unlike elements** were placed in the same column; there was **no place for new elements** (any two).\n\n**(e)** The noble gases were **not yet known**, and a new column would break the rule of eight.`,
  sol: 'Every eighth element repeats; Na, K and Cl; magnesium; two limitations; noble gases were unknown.',
  scheme: [['Order of atomic mass', 1], ['Eighth element repeats', 1], ['Na and K with Li', 1], ['Cl with F', 1], ['Magnesium', 1], ['First limitation', 1.5], ['Second limitation', 1.5], ['Noble gases not known', 1], ['Rule would be broken', 1]],
  d: 3, c: 'application', t: [1],
}), () => eighth('Be') === 'Mg' && eighth('Li') === 'Na' && eighth('Na') === 'K' && eighth('F') === 'Cl' || 'oct');
add('mendeleev-long', long({
  marks: 10, wl: null,
  stem: `Mendeleev's table left a gap between zinc and arsenic for an element he called eka-silicon. In the same table tellurium (${ANOM[0].m1}) is placed before iodine (${ANOM[0].m2}).\n\n(a) State Mendeleev's periodic law. [2]\n\n(b) Name the element later found in the gap named eka-silicon and state what this discovery showed. [2]\n\n(c) State two merits of Mendeleev's table. [2]\n\n(d) Tellurium is heavier than iodine, yet it is placed before it. Explain why this was done. [2]\n\n(e) Show how the modern periodic law, using the atomic numbers 52 for tellurium and 53 for iodine, removes this anomaly. [2]`,
  model: `**(a)** The properties of elements are a periodic function of their **atomic masses**.\n\n**(b)** **Germanium**; it showed that the table could **predict** undiscovered elements and their properties.\n\n**(c)** Gaps left and properties predicted; atomic masses of some elements corrected; similar elements grouped (any two).\n\n**(d)** Iodine **resembles chlorine and bromine** and had to be in their group, so the **order of atomic mass was broken**.\n\n**(e)** In the modern law the elements are arranged by **atomic number**: 52 comes before 53, so tellurium precedes iodine **without any exception**.`,
  sol: 'Law with atomic masses; germanium and predictions; two merits; iodine kept with halogens; atomic number order 52 then 53.',
  scheme: [['Law with atomic mass', 1], ['Periodic function', 1], ['Germanium', 1], ['Predicted elements', 1], ['First merit', 1], ['Second merit', 1], ['Iodine resembles chlorine and bromine', 1], ['Order of mass broken', 1], ['Arranged by atomic number', 1], ['52 before 53', 1]],
  d: 4, c: 'analysis', t: [2, 3],
}), () => ANOM[0].m1 > ANOM[0].m2 && ANOM[0].z1 === 52 && ANOM[0].z2 === 53 || 'te');
add('table-long', long({
  marks: 10, wl: null,
  stem: 'The diagram shows the outline of the modern periodic table with five regions lettered A to E.\n\n(a) Name the families of elements in A, B and C. [3]\n\n(b) State the number of valence electrons in the atoms of A and of B. [2]\n\n(c) Name the block of elements D and state the groups it covers. [2]\n\n(d) Name the elements shown in E and say why they are placed below the table. [2]\n\n(e) How many elements are in the third period? [1]',
  model: `**(a)** **A** is the **alkali metals** (group 1), **B** the **halogens** (group 17) and **C** the **noble gases** (group 18).\n\n**(b)** **A:** 1; **B:** 7.\n\n**(c)** **D** is the **transition elements**, in **groups 3 to 12**.\n\n**(d)** **E** shows the **inner transition elements** (lanthanides and actinides); they are set apart so that the table is not too wide.\n\n**(e)** **${PERIODS[2]}**.`,
  sol: 'Alkali metals, halogens, noble gases; 1 and 7; transition elements, groups 3 to 12; inner transition elements; 8.',
  scheme: [['A alkali metals', 1], ['B halogens', 1], ['C noble gases', 1], ['A has 1', 1], ['B has 7', 1], ['D transition elements', 1], ['Groups 3 to 12', 1], ['E inner transition elements', 1], ['Reason for the separate rows', 1], ['8 elements', 1]],
  d: 2, c: 'application', t: [4, 5],
  assets: [tabFig],
}), () => PERIODS[2] === 8 || 'p3');
add('position-long', long({
  marks: 10, wl: null,
  stem: 'Four atoms W, X, Y and Z have atomic numbers 3, 11, 16 and 18.\n\n(a) Write the electronic configuration of each atom. [4]\n\n(b) State the period and the group of each. [4]\n\n(c) Which two of the atoms are in the same group? Give a reason for their similar properties. [2]',
  model: `**(a)** **W:** ${cfg(3)}; **X:** ${cfg(11)}; **Y:** ${cfg(16)}; **Z:** ${cfg(18)}.\n\n**(b)** **W:** period ${pl('Li').period}, group ${pl('Li').group}; **X:** period ${pl('Na').period}, group ${pl('Na').group}; **Y:** period ${pl('S').period}, group ${pl('S').group}; **Z:** period ${pl('Ar').period}, group ${pl('Ar').group}.\n\n**(c)** **W and X**, because both have **one valence electron**.`,
  sol: 'W 2, 1; X 2, 8, 1; Y 2, 8, 6; Z 2, 8, 8; positions; W and X share one valence electron.',
  scheme: [['W', 1], ['X', 1], ['Y', 1], ['Z', 1], ['W position', 1], ['X position', 1], ['Y position', 1], ['Z position', 1], ['W and X', 1], ['One valence electron', 1]],
  d: 3, c: 'application', t: [4],
}), () => [pl('Li'), pl('Na'), pl('S'), pl('Ar')].map((p) => `${p.period}-${p.group}`).join() === '2-1,3-1,3-16,3-18' || 'pos');
add('groups-long', long({
  marks: 10, wl: null,
  stem: `A student collects data about three groups. The approximate melting points of the alkali metals are lithium ${MP[0][1]} °C, sodium ${MP[1][1]} °C and potassium ${MP[2][1]} °C. At room temperature chlorine is a gas, bromine a liquid and iodine a solid.\n\n(a) State the trend in the melting points of the alkali metals down the group. [1]\n\n(b) Why are the alkali metals similar in their chemical properties? [2]\n\n(c) State the trend in reactivity of the alkali metals and give a reason. [2]\n\n(d) Name the family that contains chlorine, bromine and iodine, state its valence electrons and the ion formed. [3]\n\n(e) Explain why argon, neon and helium are unreactive. [2]`,
  model: `**(a)** The melting point **falls** down the group (${MP[0][1]}, ${MP[1][1]}, ${MP[2][1]} °C).\n\n**(b)** Each has **one valence electron**, which is lost in reactions.\n\n**(c)** Reactivity **increases** down the group, because the outer electron is **lost more easily** in the larger atoms.\n\n**(d)** The **halogens**, with **7** valence electrons, forming **X⁻** ions.\n\n**(e)** They have **full outer shells** (a duplet in helium, an octet in the others), so they do not react.`,
  sol: 'Melting point falls; one valence electron; reactivity increases; halogens, 7, X⁻; full outer shells.',
  scheme: [['Falls down the group', 1], ['One valence electron', 1], ['Lost in reactions', 1], ['Reactivity increases', 1], ['Reason: outer electron lost more easily', 1], ['Halogens', 1], ['7 valence electrons', 1], ['X⁻ ion', 1], ['Full outer shells', 1], ['No tendency to lose, gain or share', 1]],
  d: 3, c: 'application', t: [5],
}), () => MP[0][1] > MP[1][1] && MP[1][1] > MP[2][1] || 'mp');
