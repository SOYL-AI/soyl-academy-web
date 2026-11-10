// ISC 11 Chemistry ch06 Classification of Elements and Periodicity in Properties: question bank (ISC style). Data are the
// standard textbook values listed in data.mjs (IE1, radii, EGE, EN), aligned with cbse-11-chemistry-ch03. Numerical answers,
// IUPAC names and positions are computed and re-solved. Assertion-reason keys (862 order): a c a b d c.
import { mk, add, r, near } from './lib.mjs';
import { nomen, fromName, locate, shorthand, zFrom, sym, IE1, RADIUS, IONIC, EGE, EN, jumpAfter, IE_CA, valH, valO } from './data.mjs';

const { mcq, ar, tf, fill, match, num, short, long } = mk;
const ok = (c, m) => c || m;
const f1 = (x) => x.toFixed(1);
const nm = (z) => nomen(z);

// ================================================================ t01 Mendeleev, modern periodic law
add('mend-mcq', mcq({
  stem: 'A chemist reading about Mendeleev’s work notes that gallium, discovered in 1875, matched his prediction for “eka-aluminium”, whose atomic mass he had given as about 68. The importance of this discovery was that it:',
  right: 'showed that the periodic law could predict the existence and properties of undiscovered elements',
  wrong: ['proved that elements must be arranged by atomic number and not by atomic mass', 'removed the difficulty of finding a place for the isotopes of an element', 'showed that every group of the table contains the same number of elements'],
  sol: 'The agreement between the predicted and observed properties of gallium gave strong support to the periodic law as a predictive tool — option (@K). It did not show that atomic number is the true basis, which came later with Moseley.',
  d: 2, c: 'understanding', t: [1],
}));
add('defect-mcq', mcq({
  stem: 'Which defect of Mendeleev’s periodic table is removed when the elements are classified by atomic number?',
  right: 'Isotopes of one element, with different atomic masses, need not be given separate places',
  wrong: ['Elements of similar properties could not be placed in the same group', 'No gaps could be left for elements that were not yet discovered', 'The noble gases could not be accommodated in any group'],
  sol: 'Isotopes have the same atomic number, so they share one place in the modern table — option (@K). The other three statements are not defects of Mendeleev’s table.',
  d: 2, c: 'understanding', t: [1],
}));
add('law-mcq', mcq({
  stem: 'According to the modern periodic law, the properties of the elements are a periodic function of their:',
  right: 'atomic numbers',
  wrong: ['atomic masses', 'mass numbers of the commonest isotopes', 'number of neutrons in the nucleus'],
  sol: 'Moseley’s work led to the modern law: properties are a periodic function of atomic number — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('law-ar', ar({
  a: 'In the modern periodic table cobalt (atomic mass 58.9) is placed before nickel (atomic mass 58.7).',
  r: 'In the modern periodic table the elements are arranged in order of increasing atomic number.',
  key: 'a',
  sol: 'Cobalt (Z = 27) has a smaller atomic number than nickel (Z = 28), so it comes first although it has the larger mass. Both statements are true and R explains A — option (a).',
  d: 2, c: 'understanding', t: [1],
}));
add('iso-tf', tf({
  stem: 'Because the modern periodic law uses atomic number, the isotopes of an element share a single position in the periodic table.',
  key: 't',
  sol: 'True. Isotopes have the same atomic number and so occupy one position.',
  d: 1, c: 'understanding', t: [1],
}));
add('dev-num', (() => {
  const pred = 68;
  const found = 69.7;
  const v = ((found - pred) / found) * 100;
  return num({
    stem: r`Mendeleev predicted an atomic mass of $68$ for eka-aluminium. The element found, gallium, has atomic mass $69.7$. By what percentage of the true value is the prediction too low?`,
    value: Number(v.toFixed(1)), tol: 0.1, unit: '%',
    sol: r`$\dfrac{69.7 - 68}{69.7} \times 100 = ${v.toFixed(2)}\% \approx ${v.toFixed(1)}\%$.`,
    scheme: [['Difference 1.7 divided by 69.7', 0.5], ['2.4%', 0.5]],
    marks: 1, d: 2, c: 'application', t: [1],
  });
})(), (q) => ok(near(((69.7 - 68) / 69.7) * 100, 2.44, 0.005) && q.answer.value === 2.4, 'dev'));
add('merit-short2', short({
  marks: 2,
  stem: 'State two merits of Mendeleev’s periodic table and name one element whose discovery supported it.',
  model: 'Mendeleev left gaps for undiscovered elements and predicted their properties correctly, and he corrected doubtful atomic masses. The discovery of gallium (eka-aluminium), germanium (eka-silicon) or scandium (eka-boron) supported the table.',
  sol: 'Gaps and predictions; corrected masses; gallium, germanium or scandium.',
  scheme: [['Two correct merits', 1], ['One element named (Ga, Ge or Sc)', 1]],
  d: 1, c: 'recall', t: [1],
}));
add('defects-short3', short({
  marks: 3,
  stem: 'Give three defects of Mendeleev’s periodic table and say how the modern periodic law removes the one concerning the order of argon (39.9) and potassium (39.1).',
  model: 'Defects: (i) hydrogen has no fixed position; (ii) there was no separate place for isotopes; (iii) some elements, such as argon and potassium, had to be placed out of the order of atomic mass (also: dissimilar elements in the same group). Arranged by atomic number, argon (Z = 18) comes before potassium (Z = 19), so the order is correct although argon is heavier.',
  sol: 'Three defects; atomic number order Ar (18), K (19).',
  scheme: [['Two defects correctly stated', 1], ['Third defect', 0.5], ['Ar (18) before K (19) by atomic number', 0.5], ['Modern law uses atomic number, not atomic mass', 0.5], ['Anomaly removed', 0.5]],
  d: 2, c: 'understanding', t: [1],
}));
add('law-long', long({
  stem: `(a) State Mendeleev's periodic law and the modern periodic law. [2]

(b) Explain how Mendeleev's gaps and his prediction for eka-aluminium supported his law, naming the element that was found. [2]

(c) Give one reason why the modern periodic law is preferred. [1]`,
  model: `(a) Mendeleev: the properties of the elements are a periodic function of their atomic masses. Modern law: the properties of the elements are a periodic function of their atomic numbers.

(b) He left a gap below aluminium and predicted an element, eka-aluminium, with atomic mass about 68 and an oxide of formula Ea₂O₃; gallium, atomic mass 69.7 with oxide Ga₂O₃, was discovered and matched, showing that the law could predict unknown elements.

(c) Atomic number gives the correct order for pairs such as argon and potassium, and isotopes share one position.`,
  sol: 'Both laws; gallium matched eka-aluminium; atomic number removes anomalies.',
  scheme: [['(a) Mendeleev’s law', 1], ['(a) Modern law', 1], ['(b) Gap and predicted mass or oxide', 1], ['(b) Gallium found and matches', 1], ['(c) One valid reason', 1]],
  d: 2, c: 'understanding', t: [1],
}));

// ================================================================ t02 long form, blocks, IUPAC names
add('block-mcq', (() => {
  const l = locate(49);
  return mcq({
    stem: r`An element has the valence configuration $4d^{10}\,5s^2\,5p^1$ with all inner shells complete. In the long form of the periodic table it belongs to:`,
    right: `the p block, period ${l.period}, group ${l.group}`,
    wrong: ['the d block, period 5, group 12', 'the p block, period 4, group 13', 'the p block, period 5, group 3'],
    sol: r`The last electron enters a $5p$ orbital, so it is a p-block element; the highest shell is 5, so period 5; group $= 12 + 1 = ${l.group}$ — option (@K). It is indium (Z = 49).`,
    d: 2, c: 'application', t: [2],
  });
})(), () => ok(locate(49).block === 'p' && locate(49).period === 5 && locate(49).group === 13, 'block'));
add('group-mcq', mcq({
  stem: 'In the IUPAC numbering of the groups of the periodic table from 1 to 18, the halogens and the noble gases are in groups:',
  right: '17 and 18',
  wrong: ['7 and 8', '16 and 17', '17 and 0'],
  sol: 'Fluorine to astatine are in group 17 (old VIIA) and helium to radon in group 18 (old group 0) — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('iupac-mcq', (() => {
  const a = nm(113);
  const b = nm(123);
  const c = nm(112);
  return mcq({
    stem: 'Before a permanent name was approved, the element of atomic number 113 carried a temporary IUPAC name and symbol. These were:',
    right: `${a.name}, ${a.sym}`,
    wrong: [`${b.name}, ${b.sym}`, `${c.name}, ${c.sym}`, `${a.name}, Unt`],
    sol: `The digits 1, 1, 3 give un, un, tri, so the name is ${a.name} and the symbol is ${a.sym} (first letters U, u, t) — option (@K). Option (@1) is for Z = 123, option (@2) for Z = 112, and in option (@3) the symbol does not follow the order of the roots.`,
    d: 2, c: 'application', t: [2],
  });
})(), () => ok(nm(113).name === 'ununtrium' && nm(113).sym === 'Uut', 'iupac'));
add('period5-mcq', mcq({
  stem: 'In the long form of the periodic table the fifth period begins with an alkali metal and ends with a noble gas. The number of elements in this period and the atomic number of the noble gas are, respectively:',
  right: '18 and 54',
  wrong: ['18 and 36', '32 and 54', '8 and 54'],
  sol: r`The fifth period fills $5s$, $4d$ and $5p$: $2 + 10 + 6 = 18$ elements, from Rb ($Z = 37$) to Xe ($Z = 36 + 18 = 54$) — option (@K).`,
  d: 2, c: 'application', t: [2],
}), () => ok(2 + 10 + 6 === 18 && 36 + 18 === 54 && sym(54) === 'Xe', 'period5'));
add('locate-mcq', (() => {
  const z = zFrom(4, 15);
  return mcq({
    stem: 'A student looks up an element that lies in period 4 and group 15 of the long-form table. Its atomic number is:',
    right: String(z),
    wrong: ['23', '51', '35'],
    sol: r`Before period 4 there are 18 electrons ($[\text{Ar}]$); group 15 means $4s^2\,3d^{10}\,4p^3$, so $Z = 18 + 2 + 10 + 3 = ${z}$ (arsenic) — option (@K).`,
    d: 3, c: 'application', t: [2],
  });
})(), () => ok(zFrom(4, 15) === 33 && locate(33).period === 4 && locate(33).group === 15, 'locate'));
add('rb-ar', ar({
  a: 'Rubidium (Z = 37) is an element of period 5 and group 1.',
  r: 'The valence configuration of rubidium is 5s², with the 5s subshell completely filled.',
  key: 'c',
  sol: 'A is true: the last electron enters 5s, so it is in period 5 and group 1. R is false: rubidium has the configuration [Kr] 5s¹, with a single electron in the 5s subshell — option (c).',
  d: 3, c: 'analysis', t: [2],
}), () => ok(shorthand(37) === '[Kr] 5s¹' && locate(37).group === 1 && locate(37).period === 5, 'rb'));
add('name-fill', (() => {
  const v = nm(118);
  return fill({
    stem: 'The temporary IUPAC systematic name of the element of atomic number 118 is ___.',
    acc: [[v.name, `${v.name}`.replace(/^./, (c) => c.toUpperCase()), 'ununoctium']],
    sol: `The digits 1, 1, 8 give un, un, oct, so the name is ${v.name}.`,
    d: 2, c: 'application', t: [2],
  });
})(), (q) => ok(q.answer.blanks[0].accepted[0] === 'ununoctium' && fromName('ununoctium') === 118, 'name-fill'));
add('iupac-match', (() => {
  const zs = [101, 103, 106, 110];
  return match({
    stem: 'Match each atomic number with the three-letter symbol of the temporary IUPAC name of that element.',
    pairs: zs.map((z) => [`Z = ${z}`, nm(z).sym]),
    order: [3, 1, 0, 2],
    sol: zs.map((z, i) => `${z} → ${'pqrs'[[3, 1, 0, 2][i]]} (${nm(z).sym})`).join('; ') + ', built from the roots of the digits.',
    d: 2, c: 'application', t: [2],
  });
})());
add('ind-short2', (() => {
  const l = locate(25);
  return short({
    marks: 2,
    stem: r`A steel alloy contains an element whose atoms have the outer configuration $3d^5\,4s^2$ outside an argon core. State its block, period and group in the long-form periodic table.`,
    model: `The last electron enters 3d, so the element is in the d block. The highest shell is n = 4, so it is in period 4; group = 5 + 2 = ${l.group}. (The element is manganese.)`,
    sol: 'd block, period 4, group 7.',
    scheme: [['d block with reason', 0.5], ['Period 4', 0.5], ['Group 7 = 5 + 2', 1]],
    d: 2, c: 'application', t: [2],
  });
})(), () => ok(locate(25).group === 7 && locate(25).block === 'd' && locate(25).period === 4, 'mn'));
add('z116-short2', (() => {
  const v = nm(116);
  return short({
    marks: 2,
    stem: 'Write the temporary IUPAC systematic name and the three-letter symbol of the element with atomic number 116, showing the root used for each digit.',
    model: `The digits 1, 1, 6 correspond to un, un, hex, so the name is ${v.name} and the symbol is ${v.sym}.`,
    sol: `${v.name}, ${v.sym}.`,
    scheme: [['Roots un, un, hex', 1], [`${v.name}, ${v.sym}`, 1]],
    d: 1, c: 'application', t: [2],
  });
})(), () => ok(nm(116).name === 'ununhexium' && nm(116).sym === 'Uuh', 'z116'));
add('name-short3', (() => {
  const a = nm(109);
  const b = nm(125);
  const z = fromName('unnilhexium');
  return short({
    marks: 3,
    stem: 'Give the temporary IUPAC names and symbols for the elements with atomic numbers 109 and 125, and find the atomic number of the element whose systematic name is unnilhexium.',
    model: `109: un, nil, enn gives ${a.name}, ${a.sym}. 125: un, bi, pent gives ${b.name}, ${b.sym}. Unnilhexium: un, nil, hex gives the digits 1, 0, 6, so Z = ${z}.`,
    sol: `${a.name} ${a.sym}; ${b.name} ${b.sym}; Z = ${z}.`,
    scheme: [[`109: ${a.name}, ${a.sym}`, 1], [`125: ${b.name}, ${b.sym}`, 1], [`Z = ${z}`, 1]],
    d: 2, c: 'application', t: [2],
  });
})(), () => ok(nm(109).name === 'unnilennium' && nm(125).name === 'unbipentium' && fromName('unnilhexium') === 106, 'name3'));
add('loc-short3', (() => {
  const a = locate(31);
  const b = locate(40);
  return short({
    marks: 3,
    stem: 'Write the electronic configurations of the elements of atomic numbers 31 and 40 and locate each in the long-form periodic table by block, period and group.',
    model: `Z = 31: ${shorthand(31)}; last electron in 4p, so p block, period ${a.period}, group ${a.group}. Z = 40: ${shorthand(40)}; last electron in 4d, so d block, period ${b.period}, group ${b.group} (4 + ... valence electrons of 4d and 5s: 2 + 2 = 4).`,
    sol: `31: ${a.block}, ${a.period}, ${a.group}; 40: ${b.block}, ${b.period}, ${b.group}.`,
    scheme: [['Configuration of Z = 31 and its position', 1.5], ['Configuration of Z = 40 and its position', 1.5]],
    d: 3, c: 'application', t: [2],
  });
})(), () => ok(locate(31).group === 13 && locate(40).group === 4 && locate(40).block === 'd' && locate(40).period === 5, 'loc3'));
add('loc-long', (() => {
  const a = locate(34);
  const b = locate(82);
  const c = nm(111);
  return long({
    stem: `(a) Write the electronic configuration of the element of atomic number 34 and state its block, period and group. [2]

(b) An element has the configuration [Xe] 4f¹⁴ 5d¹⁰ 6s² 6p². Find its block, period and group. [2]

(c) Write the temporary IUPAC name and symbol of the element with Z = 111. [1]`,
    model: `(a) ${shorthand(34)}; last electron in 4p, so the p block, period ${a.period}, group ${a.group} (12 + 4).

(b) The last electron enters 6p, so the p block; the highest shell is 6, so period ${b.period}; group = 12 + 2 = ${b.group}.

(c) 1, 1, 1 gives un, un, un: ${c.name}, symbol ${c.sym}.`,
    sol: 'Z = 34: p, 4, 16; Pb type: p, 6, 14; unununium Uuu.',
    scheme: [['(a) Configuration', 1], ['(a) p block, period 4, group 16', 1], ['(b) p block with reason', 1], ['(b) Period 6, group 14', 1], ['(c) Unununium, Uuu', 1]],
    d: 3, c: 'application', t: [2],
  });
})(), () => ok(locate(34).group === 16 && locate(82).group === 14 && locate(82).period === 6 && nm(111).sym === 'Uuu', 'loc-long'));

// ================================================================ t03 radii, shielding, valence electrons
add('radius-mcq', mcq({
  stem: 'Going from lithium (radius 152 pm) to fluorine (radius 64 pm) in the second period, the atomic radius falls because:',
  right: 'the nuclear charge rises while the electrons enter the same shell, so shielding changes little and the valence electrons are pulled in more strongly',
  wrong: ['the number of shells increases, which draws the valence electrons closer to the nucleus', 'the nuclear charge falls as electrons are added, so the electrons repel one another less', 'inner electrons shield the valence electrons more and more effectively'],
  sol: 'Across a period one proton and one valence electron are added in the same shell; electrons of the same shell shield one another poorly, so the effective nuclear charge rises and the radius falls — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('grp-radius-mcq', mcq({
  stem: 'The atomic radius of potassium (231 pm) is larger than that of sodium (186 pm) mainly because potassium:',
  right: 'has one more occupied shell, so the valence electron is farther from the nucleus and better shielded',
  wrong: ['has a smaller nuclear charge than sodium', 'has fewer valence electrons than sodium', 'has a smaller effective nuclear charge only because it has more neutrons'],
  sol: 'Down a group each period adds a shell: the valence electron is in a higher shell, farther away and more shielded, in spite of the larger nuclear charge — option (@K). Both atoms have one valence electron, and neutrons play no part.',
  d: 2, c: 'understanding', t: [3],
}));
add('isoel-mcq', (() => {
  const ions = ['O²⁻', 'F⁻', 'Na⁺', 'Mg²⁺'];
  const big = ions.reduce((a, b) => (IONIC[a] > IONIC[b] ? a : b));
  return mcq({
    stem: 'Among the species O²⁻, F⁻, Na⁺ and Mg²⁺, which has the largest radius?',
    right: big,
    wrong: ['F⁻', 'Na⁺', 'Mg²⁺'],
    sol: `All four have 10 electrons, so the radius falls as the nuclear charge rises (8, 9, 11, 12). O²⁻ has the smallest nuclear charge and the largest radius (${IONIC['O²⁻']} pm against ${IONIC['F⁻']}, ${IONIC['Na⁺']} and ${IONIC['Mg²⁺']} pm) — option (@K).`,
    d: 2, c: 'application', t: [3],
  });
})(), () => ok(IONIC['O²⁻'] > IONIC['F⁻'] && IONIC['F⁻'] > IONIC['Na⁺'] && IONIC['Na⁺'] > IONIC['Mg²⁺'], 'isoel'));
add('zeff-mcq', (() => {
  const v = 15 - 10;
  return mcq({
    stem: r`Using the simple estimate that the effective nuclear charge $\approx Z -$ (number of inner-shell electrons), the effective nuclear charge felt by a valence electron of a phosphorus atom ($Z = 15$) is about:`,
    right: String(v),
    wrong: ['15', '3', '8'],
    sol: r`Phosphorus has 10 inner electrons (1s, 2s, 2p), so $Z_\text{eff} \approx 15 - 10 = ${v}$ — option (@K). 15 ignores shielding; 3 is the group-based valency; 8 is the sum of shell electrons.`,
    d: 2, c: 'application', t: [3],
  });
})(), () => ok(15 - 10 === 5, 'zeff'));
add('val-mcq', mcq({
  stem: r`How many valence electrons does an atom with the configuration $[\text{Ar}]\,3d^{10}\,4s^2\,4p^3$ have?`,
  right: '5',
  wrong: ['15', '3', '13'],
  sol: 'The valence shell is n = 4: 4s² 4p³ gives 2 + 3 = 5 electrons; the completed 3d subshell is part of the inner core for this p-block element — option (@K). It is arsenic, in group 15.',
  d: 2, c: 'application', t: [3],
}));
add('ion-ar', ar({
  a: 'The chloride ion (181 pm) is larger than the chlorine atom (99 pm).',
  r: 'The anion has one more electron than the atom, so electron–electron repulsion increases while the nuclear charge is unchanged.',
  key: 'a',
  sol: 'Both are true, and the greater repulsion among 18 electrons held by the same nuclear charge (+17) expands the electron cloud, so R explains A — option (a).',
  d: 2, c: 'understanding', t: [3],
}));
add('mg-tf', tf({
  stem: 'The Mg²⁺ ion (72 pm) is smaller than the Na⁺ ion (102 pm) because Mg²⁺ has more electrons than Na⁺.',
  key: 'f',
  sol: 'False. Both ions have 10 electrons; Mg²⁺ is smaller because its nuclear charge (+12) is greater than that of Na⁺ (+11).',
  d: 2, c: 'understanding', t: [3],
}));
add('incr-fill', fill({
  stem: 'On going down a group of the periodic table the atomic radius generally ___.',
  acc: [['increases', 'increase', 'rises']],
  sol: 'Each period adds a shell, so the radius increases down a group.',
  d: 1, c: 'recall', t: [3],
}));
add('cov-num', (() => {
  const d = 266;
  const v = d / 2;
  return num({
    stem: r`In a crystal of iodine the distance between the nuclei of two bonded iodine atoms of a molecule is $266$ pm. Find the covalent radius of iodine in pm.`,
    value: v, tol: 1, unit: 'pm',
    sol: r`Covalent radius $= \dfrac{266}{2} = ${v}$ pm.`,
    scheme: [['Halves the bond length', 0.5], ['133 pm', 0.5]],
    marks: 1, d: 1, c: 'understanding', t: [3],
  });
})(), (q) => ok(q.answer.value === 133 && RADIUS.I === 133, 'cov'));
add('shield-short2', short({
  marks: 2,
  stem: 'What is meant by the shielding (screening) effect? How does it change down a group, and what is its effect on the atomic radius?',
  model: 'Shielding is the reduction of the attraction of the nucleus for an outer electron by the electrons in the inner shells. Down a group the number of inner shells increases, so the shielding increases, and together with the extra shell this makes the atomic radius larger.',
  sol: 'Shielding by inner electrons; increases down the group; radius increases.',
  scheme: [['Definition of shielding', 1], ['Increases down a group, so radius rises', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('cation-short2', short({
  marks: 2,
  stem: 'Explain why the sodium ion (102 pm) is much smaller than the sodium atom (186 pm).',
  model: 'In forming Na⁺ the atom loses its single 3s electron, so the outermost shell (n = 3) disappears and the ion has one shell fewer; the same nuclear charge (+11) now holds only 10 electrons, so each is pulled in more strongly and the repulsion is less.',
  sol: 'Loss of the outer shell; greater pull per electron.',
  scheme: [['Outer shell lost', 1], ['Nuclear charge unchanged holds fewer electrons, less repulsion', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('order-short3', (() => {
  const ions = ['K⁺', 'Ca²⁺', 'Cl⁻', 'S²⁻'];
  const sorted = [...ions].sort((a, b) => ({ 'K⁺': IONIC['K⁺'], 'Ca²⁺': IONIC['Ca²⁺'], 'Cl⁻': IONIC['Cl⁻'], 'S²⁻': IONIC['S²⁻'] }[a] - { 'K⁺': IONIC['K⁺'], 'Ca²⁺': IONIC['Ca²⁺'], 'Cl⁻': IONIC['Cl⁻'], 'S²⁻': IONIC['S²⁻'] }[b]));
  return short({
    marks: 3,
    stem: 'The ions K⁺, Ca²⁺, Cl⁻ and S²⁻ (atomic numbers 19, 20, 17 and 16) are present in a mineral water sample. Arrange them in order of increasing radius and explain the order using their electrons and nuclear charges.',
    model: `All four ions have 18 electrons (isoelectronic), so the radius depends only on the nuclear charge: the larger the charge, the stronger the pull on the same electron cloud. Nuclear charges are Ca 20, K 19, Cl 17, S 16, so the order of increasing radius is ${sorted.join(' < ')} (${sorted.map((i) => IONIC[i]).join(', ')} pm).`,
    sol: `${sorted.join(' < ')}`,
    scheme: [['Isoelectronic: 18 electrons each', 1], ['Larger nuclear charge gives a smaller ion', 1], ['Order Ca²⁺ < K⁺ < Cl⁻ < S²⁻', 1]],
    d: 4, c: 'analysis', t: [3],
  });
})(), () => ok(IONIC['Ca²⁺'] < IONIC['K⁺'] && IONIC['K⁺'] < IONIC['Cl⁻'] && IONIC['Cl⁻'] < IONIC['S²⁻'], 'order3'));
add('rad-short3', short({
  marks: 3,
  stem: 'Atomic radii in pm are Na 186, K 231, F 64 and Cl 99. Account for the difference between sodium and potassium and for the difference between fluorine and chlorine, and state the general trend they show.',
  model: 'Potassium (231 pm) is larger than sodium (186 pm), and chlorine (99 pm) is larger than fluorine (64 pm): in each pair the lower element has one more occupied shell, so the valence electrons are farther from the nucleus and more shielded by the inner electrons. The general trend is that the atomic radius increases down a group.',
  sol: 'Extra shell and more shielding; radius increases down a group.',
  scheme: [['Na/K reason: extra shell, more shielding', 1], ['F/Cl reason: extra shell, more shielding', 1], ['General trend down a group stated', 1]],
  d: 2, c: 'application', t: [3],
}));
add('rad-long', (() => {
  return long({
    stem: `(a) Explain in terms of nuclear charge, shells and shielding why the atomic radius falls from lithium (152 pm) to fluorine (64 pm) across the second period. [3]

(b) The radius of the potassium atom is 231 pm and that of the K⁺ ion is 138 pm; the radius of the bromine atom is 114 pm and that of the Br⁻ ion is 195 pm. Explain both changes. [2]`,
    model: `(a) From Li to F each atom has one more proton and one more electron, and the new electron enters the same shell (n = 2). Electrons in the same shell shield one another very little, so the shielding by the inner 1s electrons stays about the same while the nuclear charge increases from +3 to +9; the effective nuclear charge rises, the valence electrons are pulled closer and the radius decreases.

(b) K⁺ is smaller than K because the atom loses its 4s electron, so the outermost shell is gone and the nuclear charge (+19) now holds 18 electrons. Br⁻ is larger than Br because the added electron increases electron–electron repulsion while the nuclear charge (+35) is unchanged.`,
    sol: 'Rising Z, same shell, little extra shielding; cation loses a shell; anion has more repulsion.',
    scheme: [['(a) Nuclear charge increases across the period', 1], ['(a) Electrons enter the same shell, shielding about constant', 1], ['(a) Effective nuclear charge rises so radius falls', 1], ['(b) K⁺: outer shell lost, same charge holds fewer electrons', 1], ['(b) Br⁻: extra electron, more repulsion', 1]],
    d: 3, c: 'application', t: [3],
  });
})(), () => ok(RADIUS.K === 231 && IONIC['K⁺'] === 138 && RADIUS.Br === 114, 'rad-long'));

// ================================================================ t04 ionisation enthalpy, electron gain enthalpy, electronegativity
add('ie-mcq', mcq({
  stem: 'The first ionisation enthalpy of aluminium, 577 kJ mol⁻¹, is lower than that of magnesium, 737 kJ mol⁻¹, even though aluminium has the larger nuclear charge. The best explanation is that the outermost electron of aluminium:',
  right: 'is in a 3p orbital, which is higher in energy and better shielded by the 3s electrons than the 3s electron of magnesium',
  wrong: ['is in a 3s orbital that is shielded by the 3p electrons', 'is held by a smaller nuclear charge than the outer electron of magnesium', 'comes from a half-filled subshell that is unusually stable'],
  sol: 'Mg ([Ne] 3s²) loses a 3s electron; Al ([Ne] 3s² 3p¹) loses a 3p electron, which is farther out, higher in energy and shielded by the 3s electrons, so it is removed more easily — option (@K).',
  d: 4, c: 'analysis', t: [4],
}));
add('no-mcq', mcq({
  stem: 'A student explains that the first ionisation enthalpy of oxygen (1314 kJ mol⁻¹) is lower than that of nitrogen (1402 kJ mol⁻¹). The explanation is correct if she says that:',
  right: 'in oxygen the fourth 2p electron shares an orbital and is repelled by its partner, whereas nitrogen has a stable half-filled 2p³ subshell',
  wrong: ['oxygen has a larger atomic radius than nitrogen by a large margin', 'oxygen has a smaller nuclear charge than nitrogen', 'the 2p electrons of oxygen are shielded by a third shell'],
  sol: 'Nitrogen’s 2p³ is half filled and stable; in oxygen (2p⁴) one p orbital holds two electrons, whose repulsion makes one of them easier to remove — option (@K). Oxygen’s radius is slightly smaller, its nuclear charge larger, and it has no third shell.',
  d: 3, c: 'analysis', t: [4],
}));
add('grp1-ie-mcq', mcq({
  stem: 'The first ionisation enthalpies of lithium, sodium, potassium, rubidium and caesium are 520, 496, 419, 403 and 376 kJ mol⁻¹. The decrease down the group is mainly due to:',
  right: 'the increasing size and shielding, which make the valence electron easier to remove',
  wrong: ['the decreasing nuclear charge down the group', 'the increasing number of valence electrons', 'the increasing electronegativity of the atoms'],
  sol: 'Each element has one valence electron; down the group it lies in a higher shell, farther from the nucleus and shielded by more inner shells, so less energy is needed to remove it — option (@K). The nuclear charge actually increases.',
  d: 2, c: 'understanding', t: [4],
}));
add('ege-mcq', mcq({
  stem: 'The electron gain enthalpies of F, Cl, Br and I are −328, −349, −325 and −295 kJ mol⁻¹. The largest amount of energy is released by the atom of:',
  right: 'chlorine, because the added electron meets less repulsion in its larger 3p shell than in the compact 2p shell of fluorine',
  wrong: ['fluorine, because it is the most electronegative and smallest atom', 'iodine, because it is the largest atom', 'bromine, because it has the greatest nuclear charge'],
  sol: 'Cl has the most negative value (−349). The F atom is so small that the added electron is strongly repelled by the electrons already in the 2p shell, so less energy is released than for Cl — option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('en-mcq', (() => {
  const bonds = [['Na–Cl', 'Na', 'Cl'], ['Mg–O', 'Mg', 'O'], ['Na–O', 'Na', 'O'], ['Mg–Cl', 'Mg', 'Cl']];
  const EN2 = { ...EN, Mg: 1.2 };
  const d = bonds.map(([, a, b]) => Math.abs(EN2[a] - EN2[b]));
  const best = bonds[d.indexOf(Math.max(...d))][0];
  return mcq({
    stem: 'Using the Pauling electronegativities Na 0.9, Mg 1.2, Cl 3.0 and O 3.5, which of the bonds Na–Cl, Mg–O, Na–O and Mg–Cl has the greatest ionic character?',
    right: best,
    wrong: ['Na–Cl', 'Mg–O', 'Mg–Cl'],
    sol: `Differences in electronegativity: Na–Cl ${d[0].toFixed(1)}, Mg–O ${d[1].toFixed(1)}, Na–O ${d[2].toFixed(1)}, Mg–Cl ${d[3].toFixed(1)}. The largest difference, ${d[2].toFixed(1)}, is for Na–O — option (@K).`,
    d: 2, c: 'application', t: [4],
  });
})(), () => ok(Math.abs(0.9 - 3.5) > Math.abs(1.2 - 3.5) && Math.abs(0.9 - 3.5) > Math.abs(0.9 - 3.0), 'en'));
add('metal-mcq', mcq({
  stem: 'Which statement describes correctly the change in character of the group 14 elements C, Si, Ge, Sn and Pb down the group?',
  right: 'Metallic character increases: carbon is a non-metal, silicon and germanium are metalloids, and tin and lead are metals',
  wrong: ['Metallic character decreases: lead is a non-metal and carbon is a metal', 'All five elements are non-metals with identical properties', 'Metallic character increases from carbon to silicon and then decreases to lead'],
  sol: 'Ionisation enthalpy and electronegativity fall down a group, so metallic character rises: C non-metal, Si and Ge metalloids, Sn and Pb metals — option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('ege-ar', ar({
  a: 'Sulfur has a more negative electron gain enthalpy than oxygen.',
  r: 'Elemental oxygen consists of diatomic molecules, whereas elemental sulfur consists of S₈ rings.',
  key: 'b',
  sol: 'Both are true (S −200, O −141 kJ mol⁻¹; O₂ molecules and S₈ rings), but R is not the explanation: electron gain enthalpy is a property of isolated gaseous atoms, not of how the element is bonded. The real reason is the strong repulsion an added electron meets in the small, compact 2p subshell of oxygen — option (b).',
  d: 3, c: 'analysis', t: [4],
}));
add('ne-ar', ar({
  a: 'Neon has a large negative electron gain enthalpy.',
  r: 'The outer shell of neon is incomplete and readily accepts an additional electron.',
  key: 'd',
  sol: 'Both are false. Neon has a positive electron gain enthalpy (+116 kJ mol⁻¹) because its outer shell is complete and an added electron would have to enter the next shell — option (d).',
  d: 2, c: 'understanding', t: [4],
}));
add('f-fill', fill({
  stem: 'On the Pauling scale the most electronegative element, with a value of 4.0, is ___.',
  acc: [['fluorine', 'F']],
  sol: 'Fluorine is the most electronegative element (4.0).',
  d: 1, c: 'recall', t: [4],
}));
add('mg-num', (() => {
  const mol = 2.4 / 24;
  const v = mol * IE1.Mg;
  return num({
    stem: r`A tube holds $2.4$ g of magnesium vapour (Mg $= 24$). Using the first ionisation enthalpy $737\ \text{kJ mol}^{-1}$, calculate the energy needed to convert all the atoms into $\ce{Mg+}$ ions, in kJ.`,
    value: Number(v.toFixed(1)), tol: 0.1, unit: 'kJ',
    sol: r`Moles $= 2.4/24 = ${mol.toFixed(2)}$; energy $= ${mol.toFixed(2)} \times 737 = ${v.toFixed(1)}$ kJ.`,
    scheme: [['0.10 mol of atoms', 0.5], ['73.7 kJ', 0.5]],
    marks: 1, d: 2, c: 'application', t: [4],
  });
})(), (q) => ok(near(2.4 / 24 * 737, 73.7, 0.001) && q.answer.value === 73.7, 'mg'));
add('ca-val-num', (() => {
  const idx = jumpAfter(IE_CA);
  return num({
    stem: 'The first three ionisation enthalpies of an element are 590, 1145 and 4912 kJ mol⁻¹ (calcium). How many valence electrons does it have?',
    value: idx + 1, tol: 0, unit: 'electrons',
    sol: r`Ratios: $1145/590 = ${(1145 / 590).toFixed(2)}$ and $4912/1145 = ${(4912 / 1145).toFixed(2)}$. The big jump comes after the 2nd removal, so the number of valence electrons $= ${idx + 1}$ (group 2).`,
    scheme: [['Compares successive values', 0.5], ['2', 0.5]],
    marks: 1, d: 2, c: 'application', t: [4],
  });
})(), (q) => ok(q.answer.value === 2, 'ca'));
add('en-short2', short({
  marks: 2,
  stem: 'Define electronegativity. How does it change from sodium to chlorine across the third period, and why?',
  model: 'Electronegativity is the tendency of an atom in a molecule to attract the shared pair of electrons towards itself. It increases from sodium (0.9) to chlorine (3.0) because the nuclear charge increases and the atomic radius decreases, so the attraction for the bonding electrons becomes stronger.',
  sol: 'Definition; increases across, nuclear charge up and size down.',
  scheme: [['Definition', 1], ['Increases with reason (higher nuclear charge, smaller radius)', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('ege-short2', short({
  marks: 2,
  stem: 'Define electron gain enthalpy and state why the noble gases have positive values.',
  model: 'The electron gain enthalpy is the enthalpy change when a gaseous atom gains an electron to form a gaseous anion. The noble gases have positive values because their outer shells are complete, so the added electron must go into a new, higher shell and energy has to be supplied.',
  sol: 'Definition; complete shell, so the electron enters a higher shell.',
  scheme: [['Definition', 1], ['Reason for positive values', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('ie-short3', short({
  marks: 3,
  stem: 'Give the reason for each of the two reversals in the first ionisation enthalpies (kJ mol⁻¹) of period 3: Mg 737 and Al 577; P 1012 and S 999.',
  model: 'Mg to Al: the outer electron of Al is in a 3p orbital, which is higher in energy and shielded by the 3s electrons, so it is removed more easily than the 3s electron of Mg although the nuclear charge is larger. P to S: phosphorus has a stable half-filled 3p³ subshell; in sulfur (3p⁴) two electrons share one orbital, and their repulsion makes one of them easier to remove, so S is lower than P.',
  sol: 'Al: 3p above 3s; S: repulsion in the paired 3p orbital against half-filled P.',
  scheme: [['Mg and Al: 3p versus 3s electron', 1], ['P and S: half-filled 3p³ is stable', 1], ['S: paired electrons repel and are easier to remove', 1]],
  d: 4, c: 'analysis', t: [4],
}));
add('ef-short3', short({
  marks: 3,
  stem: 'The electron gain enthalpy of fluorine is −328 kJ mol⁻¹ and that of chlorine is −349 kJ mol⁻¹, although fluorine is the more electronegative. Explain this, and say whether the same happens for oxygen (−141) and sulfur (−200).',
  model: 'The fluorine atom is very small, and the electron it gains enters the compact 2p shell, which is already crowded with electrons, so the extra repulsion reduces the energy released. In chlorine the added electron enters the larger 3p subshell with less repulsion, so more energy is released. The same happens in group 16: sulfur (−200) is more negative than oxygen (−141).',
  sol: 'Repulsion in the small 2p shell of F; Cl more negative; S more negative than O too.',
  scheme: [['Compact 2p shell of fluorine, strong repulsion', 1], ['Chlorine’s larger 3p shell, less repulsion', 1], ['Same for O and S', 1]],
  d: 3, c: 'analysis', t: [4],
}));
add('no-long', (() => {
  return long({
    stem: `(a) Define the first ionisation enthalpy of an element and name two factors on which it depends. [2]

(b) The first ionisation enthalpies (kJ mol⁻¹) are Be 899, B 801, N 1402, O 1314. Explain why B is lower than Be and O is lower than N. [3]`,
    model: `(a) The first ionisation enthalpy is the energy needed to remove the most loosely held electron from one mole of isolated gaseous atoms: X(g) → X⁺(g) + e⁻. It depends on the nuclear charge, the atomic radius, the shielding by inner electrons, the type of orbital (penetration) and the stability of filled or half-filled subshells (any two).

(b) Be is 2s² and B is 2s² 2p¹: the 2p electron of boron is higher in energy and shielded by the 2s electrons, so it is removed more easily although the nuclear charge is larger. N is 2p³ (half filled and stable) and O is 2p⁴: in oxygen two electrons share one 2p orbital, and their repulsion makes one of them easier to remove, so O is lower than N.`,
    sol: 'Definition with two factors; p versus s electron; half-filled p³ versus paired p⁴.',
    scheme: [['(a) Definition (gaseous atoms, outermost electron, per mole)', 1], ['(a) Two factors', 1], ['(b) B < Be: 2p higher in energy and shielded', 1], ['(b) N has stable half-filled 2p³', 1], ['(b) O: paired electrons repel, easier to remove', 1]],
    d: 3, c: 'analysis', t: [4],
  });
})(), () => ok(IE1.B < IE1.Be && IE1.O < IE1.N, 'no-long'));

// ================================================================ t05 valence, anomalies, diagonal, oxides
add('oxide-mcq', mcq({
  stem: 'The oxide of a period 3 element is a white solid that dissolves in water to give an acidic solution and reacts with sodium hydroxide solution to form a salt. The element is most likely:',
  right: 'phosphorus, forming P₄O₁₀',
  wrong: ['sodium, forming Na₂O', 'magnesium, forming MgO', 'aluminium, forming Al₂O₃'],
  sol: r`P₄O₁₀ is an acidic oxide: it reacts with water to give phosphoric acid, $\ce{P4O10 + 6H2O -> 4H3PO4}$, and with alkalis to form phosphates — option (@K). Na₂O and MgO are basic, and Al₂O₃ is amphoteric and insoluble in water.`,
  d: 2, c: 'application', t: [5],
}));
add('state-mcq', (() => {
  const sP2O5 = 5;
  const sPH3 = -3;
  return mcq({
    stem: 'The oxidation states of phosphorus in its common oxide P₄O₁₀ and in its hydride PH₃ are, respectively:',
    right: `+${sP2O5} and −${-sPH3}`,
    wrong: ['+3 and −5', '+10 and −3', '+5 and +3'],
    sol: `In P₄O₁₀ each O is −2: 4x + 10(−2) = 0 gives x = +5. In PH₃ each H is +1: x + 3 = 0 gives x = −3 — option (@K).`,
    d: 2, c: 'application', t: [5],
  });
})(), () => ok(4 * 5 + 10 * -2 === 0 && -3 + 3 * 1 === 0 && valO(15) === 5 && valH(15) === 3, 'state'));
add('anom-mcq', mcq({
  stem: 'Which of the following is a reason why lithium, beryllium and boron behave differently from the other members of their groups?',
  right: 'Their atoms are small, with a high charge-to-size ratio and no d orbitals in the valence shell',
  wrong: ['Their atoms have a larger radius than the elements below them', 'Their atoms have vacant d orbitals that allow expansion of the octet', 'Their atoms have the same electronegativity as the other group members'],
  sol: 'The second-period elements have small size, a high charge-to-size ratio and no d orbitals, so their covalence is limited to four and their polarising power is high — option (@K).',
  d: 2, c: 'understanding', t: [5],
}));
add('diag-mcq', mcq({
  stem: 'Lithium resembles magnesium more closely than it resembles sodium. This is shown by lithium:',
  right: 'forming a nitride when it burns in nitrogen, as magnesium does',
  wrong: ['forming a superoxide when it burns in air', 'having a carbonate that is stable to heat', 'forming a stable solid hydrogencarbonate'],
  sol: r`Li and Mg both react directly with nitrogen: $\ce{6Li + N2 -> 2Li3N}$ and $\ce{3Mg + N2 -> Mg3N2}$ — option (@K). Sodium does not form a nitride; Li₂CO₃ decomposes on heating, as MgCO₃ does.`,
  d: 2, c: 'understanding', t: [5],
}));
add('amph-mcq', mcq({
  stem: 'Which pair of oxides shows amphoteric behaviour, reacting with both acids and strong bases?',
  right: 'BeO and Al₂O₃',
  wrong: ['MgO and Na₂O', 'SiO₂ and SO₃', 'CO₂ and P₄O₁₀'],
  sol: r`BeO and Al₂O₃ dissolve in acid and in alkali: $\ce{BeO + 2HCl -> BeCl2 + H2O}$ and $\ce{BeO + 2NaOH -> Na2BeO2 + H2O}$ — option (@K). MgO and Na₂O are basic; SiO₂, SO₃, CO₂ and P₄O₁₀ are acidic.`,
  d: 2, c: 'understanding', t: [5],
}));
add('diag-ar', ar({
  a: 'Lithium and magnesium show a diagonal relationship.',
  r: 'Lithium and magnesium belong to the same period of the periodic table.',
  key: 'c',
  sol: 'A is true: Li and Mg resemble each other in several properties. R is false: Li is in period 2 and Mg in period 3; the pair lies on a diagonal, not in one period — option (c).',
  d: 2, c: 'analysis', t: [5],
}));
add('nit-tf', tf({
  stem: 'Nitrogen can form five covalent bonds, as in NCl₅, in the same way that phosphorus forms PCl₅.',
  key: 'f',
  sol: 'False. Nitrogen has no d orbitals in its valence shell, so its covalence cannot exceed four and NCl₅ does not exist; phosphorus can use its 3d orbitals.',
  d: 2, c: 'understanding', t: [5],
}));
add('oxide-match', (() => {
  const pairs = [['Na', 'Na₂O'], ['Mg', 'MgO'], ['Al', 'Al₂O₃'], ['P', 'P₄O₁₀']];
  return match({
    stem: 'Match each period 3 element with the formula of its highest oxide.',
    pairs,
    order: [2, 0, 3, 1],
    sol: 'Na → r (Na₂O); Mg → p (MgO); Al → s (Al₂O₃); P → q (P₄O₁₀).',
    d: 2, c: 'recall', t: [5],
  });
})());
add('cl-num', (() => {
  const v = 14 / 2;
  return num({
    stem: r`In the oxide $\ce{Cl2O7}$ oxygen has oxidation state $-2$. Calculate the oxidation state of chlorine.`,
    value: v, tol: 0, unit: null,
    sol: r`$2x + 7(-2) = 0$, so $x = +14/2 = +${v}$.`,
    scheme: [['2x + 7(−2) = 0', 0.5], ['+7', 0.5]],
    marks: 1, d: 1, c: 'understanding', t: [5],
  });
})(), (q) => ok(q.answer.value === 7 && valO(17) === 7, 'cl'));
add('anom-short2', short({
  marks: 2,
  stem: 'State two reasons why the first element of a group in the p-block, such as nitrogen, differs from the other members of its group.',
  model: 'Its atoms are small, with a high electronegativity and ionisation enthalpy (high charge-to-size ratio), and the valence shell has no d orbitals, so the maximum covalence is four. As a result N forms NCl₃ but not NCl₅, and it forms strong pπ–pπ multiple bonds such as N≡N.',
  sol: 'Small size and high electronegativity; no d orbitals.',
  scheme: [['Small size, high electronegativity or ionisation enthalpy', 1], ['No d orbitals, covalence limited to four', 1]],
  d: 2, c: 'understanding', t: [5],
}));
add('li-short2', short({
  marks: 2,
  stem: 'State two properties in which lithium resembles magnesium but differs from sodium, and name this type of relationship.',
  model: 'Lithium and magnesium both form nitrides directly with nitrogen, and their carbonates decompose on heating to give the oxide and carbon dioxide (their hydroxides are also weakly basic). This is a diagonal relationship.',
  sol: 'Nitrides; carbonates decompose; diagonal relationship.',
  scheme: [['Two correct similarities', 1], ['Diagonal relationship named', 1]],
  d: 1, c: 'recall', t: [5],
}));
add('oxide-short3', short({
  marks: 3,
  stem: r`Write balanced equations for (i) the reaction of $\ce{Na2O}$ with water, (ii) the reaction of $\ce{SO3}$ with water, and (iii) the reaction of $\ce{Al2O3}$ with sodium hydroxide, and state whether each oxide is basic, acidic or amphoteric.`,
  model: r`(i) $\ce{Na2O + H2O -> 2NaOH}$: basic oxide. (ii) $\ce{SO3 + H2O -> H2SO4}$: acidic oxide. (iii) $\ce{Al2O3 + 2NaOH -> 2NaAlO2 + H2O}$: Al₂O₃ reacts with a base, and also with acids, so it is amphoteric.`,
  sol: 'Three balanced equations; basic, acidic, amphoteric.',
  scheme: [['(i) equation and basic', 1], ['(ii) equation and acidic', 1], ['(iii) equation and amphoteric', 1]],
  d: 3, c: 'application', t: [5],
}));
add('ncl-short3', short({
  marks: 3,
  stem: 'Nitrogen forms NCl₃ only, whereas phosphorus forms both PCl₃ and PCl₅. Explain this difference using the valence shells of the two atoms.',
  model: 'Both atoms have five valence electrons and can form three bonds to give NCl₃ and PCl₃. A nitrogen atom has only the 2s and 2p orbitals in its valence shell, no d orbitals, so it cannot hold more than four pairs and cannot form five bonds; NCl₅ does not exist. A phosphorus atom has vacant 3d orbitals, so it can promote an electron and expand its octet to form five bonds in PCl₅.',
  sol: 'Both form MCl₃; N has no d orbitals; P has vacant 3d orbitals.',
  scheme: [['Both form three bonds, five valence electrons', 1], ['N: no d orbitals, covalence at most four', 1], ['P: vacant 3d orbitals, expanded octet', 1]],
  d: 3, c: 'analysis', t: [5],
}));
add('diag-short3', short({
  marks: 3,
  stem: r`Explain what is meant by a diagonal relationship. Give two similarities between lithium and magnesium, with the equation for one of the reactions.`,
  model: r`A diagonal relationship is the similarity between an element of the second period and the element diagonally below and to the right of it in the third period, such as Li and Mg; the pairs have similar electronegativity and charge-to-size ratio. Li and Mg both form nitrides directly, $\ce{6Li + N2 -> 2Li3N}$ and $\ce{3Mg + N2 -> Mg3N2}$, and their carbonates decompose on heating.`,
  sol: 'Definition; nitride formation with an equation; carbonate decomposition.',
  scheme: [['Definition of diagonal relationship', 1], ['Two similarities', 1], ['One balanced equation', 1]],
  d: 2, c: 'understanding', t: [5],
}));
add('diag-long', (() => {
  return long({
    stem: `(a) What is a diagonal relationship? Give the reason why diagonal pairs resemble one another. [2]

(b) Give two similarities between beryllium and aluminium, and write balanced equations to show that beryllium oxide is amphoteric. [3]`,
    model: r`(a) It is the similarity in properties between an element of period 2 and the element one place to the right in the next period, such as Li–Mg, Be–Al and B–Si. Moving across a period the size decreases and electronegativity rises, and moving down a group the opposite happens, so the charge-to-size ratio and electronegativity of the diagonal pair are nearly equal (Be and Al are both 1.5).

(b) Both Be and Al have amphoteric oxides, and both form covalent chlorides (BeCl₂ and AlCl₃) that are soluble in organic solvents. BeO reacts with an acid, showing basic behaviour: $\ce{BeO + 2HCl -> BeCl2 + H2O}$; it also reacts with an alkali, showing acidic behaviour: $\ce{BeO + 2NaOH -> Na2BeO2 + H2O}$.`,
    sol: 'Definition and reason; two similarities; two equations.',
    scheme: [['(a) Definition', 1], ['(a) Reason: similar charge-to-size ratio and electronegativity', 1], ['(b) Two similarities', 1], ['(b) Basic-behaviour equation', 1], ['(b) Acidic-behaviour equation', 1]],
    d: 3, c: 'application', t: [5],
  });
})(), () => ok(EN.Be === EN.Al, 'diag-long'));
add('oxide-long', (() => {
  return long({
    stem: `(a) Describe how the nature of the oxides changes across period 3 from Na₂O to Cl₂O₇, giving the nature of each of Na₂O, Al₂O₃, SiO₂ and SO₃. [3]

(b) Write balanced equations to show that Al₂O₃ is amphoteric. [2]`,
    model: r`(a) The oxides change from strongly basic through amphoteric to strongly acidic, as the electronegativity of the element rises and the bond to oxygen changes from ionic to covalent. Na₂O is strongly basic, Al₂O₃ is amphoteric, SiO₂ is weakly acidic and SO₃ is strongly acidic (Cl₂O₇ is very strongly acidic).

(b) With acid: $\ce{Al2O3 + 6HCl -> 2AlCl3 + 3H2O}$; with alkali: $\ce{Al2O3 + 2NaOH -> 2NaAlO2 + H2O}$.`,
    sol: 'Basic to amphoteric to acidic; two balanced equations for Al₂O₃.',
    scheme: [['(a) General change with reason', 1], ['(a) Four oxides correctly classified', 2], ['(b) Equation with acid', 1], ['(b) Equation with alkali', 1]],
    d: 2, c: 'understanding', t: [5],
  });
})());
void EGE;
void IE_CA;
