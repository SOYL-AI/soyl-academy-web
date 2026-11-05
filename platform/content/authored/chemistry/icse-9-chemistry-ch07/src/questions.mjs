// ICSE 9 Chemistry ch07 Atomic Structure — question bank in ICSE school-examination style (particle counts, configurations,
// isotopes, conclusions from Rutherford's experiment, 10-mark structured questions in parts).
// AR keys use the ICSE option order: a = A true R false, b = A false R true, c = both true and R explains, d = both true and R does not explain.
import { mk, add, svgV, r } from '../../icse-9-chemistry-ch01/src/lib.mjs';
import { eq, bySym, neutrons, electrons, cfg, config, valence, valency, cap, SCATTER, CL_SAMPLE, ISO } from './calc.mjs';
import { SCATTER_LETTERED, SODIUM_LETTERED } from './svgs.mjs';

const { mcq, ar, tf, fill, num, short, long, match } = mk;
const scatFig = svgV(SCATTER_LETTERED, "Rutherford's gold foil experiment with five parts lettered A to E");
const bohrFig = svgV(SODIUM_LETTERED, 'Bohr model of an atom with five parts lettered A to E');
const term = (o) => short({ marks: 1, wl: null, scheme: [[o.sch ?? 'Correct answer', 1]], ...o });
const ok = (v) => v === true || v;

// ---------------------------------------------------------------- deck-check items (not used in tests)
add('chk-count', mcq({
  stem: 'A potassium atom has atomic number 19 and mass number 39. The number of neutrons in it is',
  right: String(neutrons(bySym('K'))), wrong: ['19', '39', '58'],
  sol: `Neutrons = mass number − atomic number = 39 − 19 = ${neutrons(bySym('K'))}, option (@K).`,
  d: 1, c: 'application', t: [1],
}), () => neutrons(bySym('K')) === 20 || 'k');
add('chk-ruth', mcq({
  stem: "In Rutherford's gold foil experiment, very few alpha particles rebounded. This shows that",
  right: 'the positive charge and mass are packed in a very small nucleus', wrong: ['the foil was too thick for the particles', 'the electrons are heavier than the alpha particles', 'the atom is completely filled with matter'],
  sol: 'Only a head-on approach to a tiny, dense, positive centre turns an alpha particle back, option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('chk-bohr', mcq({
  stem: 'Which idea of Bohr explains why an electron does not spiral into the nucleus?',
  right: 'An electron does not lose energy while it stays in its orbit', wrong: ['Electrons are heavier than protons', 'The nucleus has no charge', 'An electron loses energy in every orbit'],
  sol: 'An electron moving in a fixed orbit radiates no energy, so it keeps its orbit, option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('chk-config', mcq({
  stem: 'An aluminium atom has atomic number 13. Its electronic configuration is',
  right: '2, 8, 3', wrong: ['2, 8, 2', '2, 10, 1', '2, 3, 8'],
  sol: 'Two in the K shell, eight in the L shell and the last three in the M shell, option (@K).',
  d: 1, c: 'application', t: [4],
}), () => cfg(13) === '2, 8, 3' || 'al');
add('chk-active', mcq({
  stem: 'A fluorine atom has the configuration 2, 7. In a chemical reaction it tends to',
  right: 'gain one electron', wrong: ['lose one electron', 'lose seven electrons', 'gain seven electrons'],
  sol: 'One more electron completes its octet, option (@K).',
  d: 2, c: 'application', t: [4],
}), () => valency(9) === 1 && valence(9) === 7 || 'f');
add('chk-iso', mcq({
  stem: 'Atom P has 6 protons and 6 neutrons. Atom Q has 6 protons and 8 neutrons. P and Q are',
  right: 'isotopes of the same element', wrong: ['atoms of different elements', 'ions of the same element', 'atoms with the same mass number'],
  sol: 'Same number of protons but different numbers of neutrons, so they are isotopes, option (@K).',
  d: 2, c: 'application', t: [5],
}));

// ---------------------------------------------------------------- t01 constituents, atomic number, mass number
add('p-mcq1', mcq({
  stem: 'Which particle has no charge and is found in the nucleus of an atom?',
  right: 'Neutron', wrong: ['Proton', 'Electron', 'Alpha particle'],
  sol: 'The neutron is neutral and sits in the nucleus with the protons, option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('p-mcq2', mcq({
  stem: 'An atom has 13 protons and 14 neutrons. Its mass number and the number of electrons in the atom are',
  right: '27 and 13', wrong: ['13 and 27', '27 and 14', '14 and 13'],
  sol: `Mass number = 13 + 14 = ${13 + 14}; a neutral atom has as many electrons as protons, 13, option (@K).`,
  d: 2, c: 'application', t: [1],
}), () => 13 + 14 === 27 || 'a');
add('p-mcq3', mcq({
  stem: 'A magnesium ion has atomic number 12, mass number 24 and a charge of 2+. The numbers of protons, neutrons and electrons in it are',
  right: '12, 12 and 10', wrong: ['12, 12 and 14', '12, 14 and 10', '10, 12 and 12'],
  sol: 'Protons 12; neutrons 24 − 12 = 12; the ion has lost two electrons, so 12 − 2 = 10, option (@K).',
  d: 2, c: 'application', t: [1],
}), () => { const m = bySym('Mg'); return [m.z, neutrons(m), electrons(m, 2)].join() === '12,12,10' || 'mg'; });
add('p-mcq4', mcq({
  stem: 'Which of these species has more electrons than protons?',
  right: 'Sulphide ion, S²⁻', wrong: ['Sodium ion, Na⁺', 'Magnesium ion, Mg²⁺', 'Neon atom'],
  sol: 'A negative ion has gained electrons: S²⁻ has 18 electrons and 16 protons; the cations have fewer electrons than protons and the neon atom has equal numbers, option (@K).',
  d: 3, c: 'analysis', t: [1],
}), () => electrons(bySym('S'), -2) > bySym('S').z || 's');
add('p-mcq5', mcq({
  stem: 'Almost all the mass of an atom is concentrated in',
  right: 'its nucleus', wrong: ['its electrons', 'the space between the shells', 'the outermost shell'],
  sol: 'Protons and neutrons are heavy and sit in the nucleus; electrons are very light, option (@K).',
  d: 1, c: 'understanding', t: [1],
}));
add('ar-mass', ar({
  a: 'Atoms of two different elements can have the same mass number.',
  r: 'The mass number of an atom is equal to the number of protons in it.',
  key: 'a',
  sol: 'Argon and calcium both have mass number 40, so (A) is true; the mass number counts protons and neutrons, so (R) is false, option (a).',
  d: 3, c: 'analysis', t: [1],
}));
add('p-tf', tf({
  stem: 'The number of neutrons in an atom is equal to its atomic number.',
  key: 'f',
  sol: 'False. The number of protons equals the atomic number; neutrons = mass number − atomic number.',
  d: 1, c: 'understanding', t: [1],
}));
add('p-fill', fill({
  stem: 'The count of protons held by one atom of an element is given by its ___ number.',
  acc: [['atomic']],
  sol: 'The **atomic** number.',
  d: 1, c: 'recall', t: [1],
}));
add('p-term1', term({
  stem: 'Name the particle in an atom that has a negligible mass.',
  model: '**Electron.**', sol: 'Electron.', sch: 'Electron',
  d: 1, c: 'recall', t: [1],
}));
add('p-num1', num({
  stem: 'An atom has 11 protons and 12 neutrons. What is its mass number?',
  value: 23, tol: 0, unit: null,
  sol: 'Mass number = protons + neutrons = 11 + 12 = 23.',
  scheme: [['Adds protons and neutrons', 0.5], ['23', 0.5]],
  d: 1, c: 'application', t: [1],
}), () => eq(11 + 12, 23, 'a') === 23);
add('p-num2', num({
  stem: 'A silicon atom has atomic number 14 and mass number 28. How many neutrons are in the nucleus?',
  value: neutrons(bySym('Si')), tol: 0, unit: null,
  sol: `Neutrons = 28 − 14 = ${neutrons(bySym('Si'))}.`,
  scheme: [['Subtracts atomic number from mass number', 0.5], [`${neutrons(bySym('Si'))}`, 0.5]],
  d: 1, c: 'application', t: [1],
}), () => neutrons(bySym('Si')) === 14 || 'si');
add('p-num3', num({
  stem: 'A sulphide ion, S²⁻, is formed from a sulphur atom of atomic number 16. How many electrons does the ion have?',
  value: electrons(bySym('S'), -2), tol: 0, unit: null,
  sol: 'The atom has 16 electrons and the ion has gained 2 more: 16 + 2 = 18.',
  scheme: [['Atom has 16 electrons', 0.5], ['18', 0.5]],
  d: 2, c: 'application', t: [1],
}), () => electrons(bySym('S'), -2) === 18 || 's2');
add('p-num4', num({
  stem: 'An aluminium ion, Al³⁺, is formed from an atom of atomic number 13. How many electrons does the ion have?',
  value: electrons(bySym('Al'), 3), tol: 0, unit: null,
  sol: 'The atom has 13 electrons; the ion has lost 3: 13 − 3 = 10.',
  scheme: [['Atom has 13 electrons', 0.5], ['10', 0.5]],
  d: 2, c: 'application', t: [1],
}), () => electrons(bySym('Al'), 3) === 10 || 'al3');
add('p-short2a', short({
  marks: 2,
  stem: 'State two differences between a proton and an electron.',
  wl: null,
  model: 'A proton is **positively charged** whereas an electron is **negatively charged**. A proton is **very much heavier** (about 1840 times) and is found **in the nucleus**, while an electron moves **outside** it.',
  sol: 'Opposite charges; proton heavy and in the nucleus, electron light and outside.',
  scheme: [['Difference in charge', 1], ['Difference in mass or location', 1]],
  d: 1, c: 'recall', t: [1],
}));
add('p-short2b', short({
  marks: 2,
  stem: 'Explain why the atomic number, not the mass number, identifies an element.',
  wl: null,
  model: 'The **atomic number** is the number of protons, which is **fixed for each element**. Atoms of one element can have **different mass numbers** (isotopes), so the mass number cannot name the element.',
  sol: 'Protons fixed per element; mass numbers can vary.',
  scheme: [['Atomic number is the number of protons, fixed', 1], ['Mass number can vary within one element', 1]],
  d: 3, c: 'analysis', t: [1, 5],
}));
add('p-short3', short({
  marks: 3,
  stem: 'Find the numbers of protons, neutrons and electrons in (a) a fluorine atom (atomic number 9, mass number 19), (b) an oxide ion (atomic number 8, mass number 16, charge 2−) and (c) a lithium ion (atomic number 3, mass number 7, charge 1+). Give your answers as three numbers in that order.',
  wl: null,
  model: `**(a)** ${bySym('F').z}, ${neutrons(bySym('F'))} and ${electrons(bySym('F'))}.\n\n**(b)** ${bySym('O').z}, ${neutrons(bySym('O'))} and ${electrons(bySym('O'), -2)}.\n\n**(c)** ${bySym('Li').z}, ${neutrons(bySym('Li'))} and ${electrons(bySym('Li'), 1)}.`,
  sol: 'F: 9, 10, 9; O²⁻: 8, 8, 10; Li⁺: 3, 4, 2.',
  scheme: [['(a) three numbers', 1], ['(b) three numbers', 1], ['(c) three numbers', 1]],
  d: 3, c: 'application', t: [1],
}), () => [neutrons(bySym('F')), electrons(bySym('O'), -2), neutrons(bySym('Li')), electrons(bySym('Li'), 1)].join() === '10,10,4,2' || 'tab');

// ---------------------------------------------------------------- t02 Rutherford
add('r-mcq1', mcq({
  stem: "In Rutherford's experiment nearly all the alpha particles passed through the gold foil without changing direction. This shows that",
  right: 'most of the atom is empty space', wrong: ['the nucleus is large and negative', 'the electrons are heavy', 'gold atoms have no nucleus'],
  sol: 'Particles pass freely only if there is little matter in their path, option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('r-mcq2', mcq({
  stem: 'The deflection of a small number of alpha particles in the gold foil experiment led Rutherford to conclude that the centre of the atom is',
  right: 'positively charged', wrong: ['negatively charged', 'neutral', 'hollow'],
  sol: 'A positive particle is turned aside by a positive centre, option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('r-mcq3', mcq({
  stem: 'Which of these could the gold foil experiment NOT explain about the atom?',
  right: 'Why electrons do not lose energy and fall into the nucleus', wrong: ['Why most of the atom is empty', 'Why the nucleus is positively charged', 'Why the nucleus is very small'],
  sol: 'The model has the limitation that a revolving electron should radiate energy and spiral inwards, option (@K).',
  d: 3, c: 'analysis', t: [2],
}));
add('r-mcq4', mcq({
  stem: 'Rutherford used alpha particles in his experiment because they are',
  right: 'fast-moving positively charged particles', wrong: ['slow-moving neutral particles', 'negatively charged particles', 'particles lighter than electrons'],
  sol: 'Fast, positively charged particles would be turned aside by a positive nucleus, option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('ar-ruth', ar({
  a: 'Rutherford concluded that the centre of the atom is positively charged.',
  r: 'A few alpha particles were deflected as they passed through the gold foil.',
  key: 'c',
  sol: 'Positive particles turn aside only if they are repelled by a positive centre, so (R) explains (A), option (c).',
  d: 3, c: 'analysis', t: [2],
}));
add('r-tf', tf({
  stem: 'In the gold foil experiment, most of the alpha particles rebounded from the foil.',
  key: 'f',
  sol: 'False. Most passed straight through; only a very few rebounded.',
  d: 1, c: 'recall', t: [2],
}));
add('r-term1', term({
  stem: "Name the particles that were fired at the gold foil in Rutherford's experiment.",
  model: '**Alpha particles.**', sol: 'Alpha particles.', sch: 'Alpha particles',
  d: 1, c: 'recall', t: [2],
}));
add('r-num', num({
  stem: `In an imagined run of the gold foil experiment, ${SCATTER.total} alpha particles are fired. ${SCATTER.straight} pass straight through, ${SCATTER.deflected} are deflected and the rest rebound. What percentage of the particles passes straight through?`,
  value: 99.9, tol: 0.05, unit: '%',
  sol: `(${SCATTER.straight} ÷ ${SCATTER.total}) × 100 = 99.9 %.`,
  scheme: [['Divides by the total', 0.5], ['99.9 %', 0.5]],
  d: 2, c: 'application', t: [2],
}), () => eq(Math.round((SCATTER.straight / SCATTER.total) * 1000) / 10, 99.9, 'pct') === 99.9);
add('r-short2a', short({
  marks: 2,
  stem: "State two conclusions that Rutherford drew from the results of the gold foil experiment.",
  wl: null,
  model: 'Most of the atom is **empty space**, because most particles went straight on. The **positive charge and the mass** are held in a **tiny nucleus**, because very few particles rebounded.',
  sol: 'Empty space; tiny, dense, positive nucleus.',
  scheme: [['Empty space with its evidence', 1], ['Small dense positive nucleus with its evidence', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('r-short2b', short({
  marks: 2,
  stem: "State one limitation of Rutherford's model of the atom and say how Bohr's model removed it.",
  wl: null,
  model: 'In Rutherford\'s model a revolving electron should **radiate energy** and fall into the nucleus, so the atom would not be stable. Bohr said electrons move in **fixed orbits** and **do not radiate** energy while in them.',
  sol: 'Electron should spiral into the nucleus; fixed orbits without loss of energy.',
  scheme: [['Limitation: instability of the electron', 1], ["Bohr's fixed orbits, no energy lost", 1]],
  d: 2, c: 'understanding', t: [2, 3],
}));
add('r-short3', short({
  marks: 3,
  stem: 'A student summarises the gold foil experiment. Give the conclusion that goes with each observation: (a) most alpha particles passed straight through, (b) a few were deflected by small angles, (c) very few rebounded.',
  wl: null,
  model: '**(a)** Most of the atom is empty space.\n\n**(b)** The centre of the atom carries a positive charge.\n\n**(c)** The positive charge and the mass are concentrated in a very small, dense nucleus.',
  sol: 'Empty space; positive centre; small dense nucleus.',
  scheme: [['(a) conclusion', 1], ['(b) conclusion', 1], ['(c) conclusion', 1]],
  d: 2, c: 'understanding', t: [2],
}));

// ---------------------------------------------------------------- t03 Bohr
add('b-mcq1', mcq({
  stem: "According to Bohr's model, an electron moving in a fixed orbit",
  right: 'has a fixed energy and does not radiate it', wrong: ['loses energy and moves closer to the nucleus', 'gains mass as it moves', 'has no energy at all'],
  sol: 'Each orbit has fixed energy and an electron in it does not radiate, option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('b-mcq2', mcq({
  stem: 'The shell of an atom that is closest to the nucleus is called the',
  right: 'K shell', wrong: ['L shell', 'M shell', 'N shell'],
  sol: 'Shells are named K, L, M, N outwards from the nucleus, option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('b-mcq3', mcq({
  stem: 'An electron in an atom jumps from the L shell to the K shell. During this change, energy is',
  right: 'given out', wrong: ['absorbed', 'neither given out nor absorbed', 'converted into mass of the nucleus'],
  sol: 'Moving to a lower-energy orbit releases energy, option (@K).',
  d: 3, c: 'application', t: [3],
}));
add('ar-bohr', ar({
  a: 'An electron in an orbit of the Bohr model radiates energy continuously.',
  r: 'Each orbit has a fixed energy.',
  key: 'b',
  sol: 'An electron in a fixed orbit does not radiate energy, so (A) is false; (R) is a postulate and is true, option (b).',
  d: 2, c: 'analysis', t: [3],
}));
add('b-fill', fill({
  stem: 'In the Bohr model the shells are named K, L, M and ___ outwards from the nucleus.',
  acc: [['N']],
  sol: 'The fourth shell is the **N** shell.',
  d: 1, c: 'recall', t: [3],
}));
add('b-short2', short({
  marks: 2,
  stem: "State two postulates of the simplified Bohr model of the atom.",
  wl: null,
  model: 'Electrons move round the nucleus only in **fixed circular orbits (shells)**, each of **fixed energy**. An electron **does not lose energy** while in its orbit; energy is gained or lost only when it **jumps** between orbits.',
  sol: 'Fixed orbits of fixed energy; no loss of energy within an orbit; jumps change energy.',
  scheme: [['First postulate', 1], ['Second postulate', 1]],
  d: 1, c: 'recall', t: [3],
}));

// ---------------------------------------------------------------- t04 electron distribution, octet, chemical activity
add('c-mcq1', mcq({
  stem: 'The element whose atom has the configuration 2, 8, 4 is',
  right: 'silicon', wrong: ['carbon', 'magnesium', 'sulphur'],
  sol: 'An element with 14 electrons (2 + 8 + 4) has atomic number 14, silicon, option (@K).',
  d: 2, c: 'application', t: [4],
}), () => bySym('Si').z === 14 && cfg(14) === '2, 8, 4' || 'si');
add('c-mcq2', mcq({
  stem: 'The maximum number of electrons that the third (M) shell can hold is',
  right: String(cap(3)), wrong: ['8', '2', '32'],
  sol: `By the 2n² rule, 2 × 3² = ${cap(3)}, option (@K).`,
  d: 2, c: 'application', t: [4],
}), () => cap(3) === 18 || 'cap');
add('c-mcq3', mcq({
  stem: 'An atom has 3 shells and 6 electrons in its outermost shell. Its atomic number is',
  right: '16', wrong: ['6', '14', '18'],
  sol: 'Configuration 2, 8, 6 gives 2 + 8 + 6 = 16 electrons, option (@K).',
  d: 2, c: 'application', t: [4],
}), () => config(16).join() === '2,8,6' || 'z16');
add('c-mcq4', mcq({
  stem: 'Which atom has a complete octet in its outermost shell?',
  right: 'Argon (atomic number 18)', wrong: ['Chlorine (atomic number 17)', 'Calcium (atomic number 20)', 'Oxygen (atomic number 8)'],
  sol: 'Argon, 2, 8, 8, has eight electrons in its outermost shell; the other atoms have 7, 2 and 6, option (@K).',
  d: 2, c: 'application', t: [4],
}), () => valence(18) === 8 && valence(17) === 7 && valence(20) === 2 && valence(8) === 6 || 'ar');
add('c-mcq5', mcq({
  stem: 'The atoms of an element have 4 shells, and the outermost shell holds 2 electrons. The element is',
  right: 'calcium', wrong: ['magnesium', 'beryllium', 'zinc'],
  sol: 'Configuration 2, 8, 8, 2 has 20 electrons, calcium, option (@K).',
  d: 3, c: 'analysis', t: [4],
}), () => cfg(20) === '2, 8, 8, 2' || 'ca');
add('c-mcq6', mcq({
  stem: 'Helium is chemically inert because its atom has',
  right: 'a complete duplet in the K shell', wrong: ['an octet in the L shell', 'one electron in the K shell', 'eight electrons in the outermost shell'],
  sol: 'Its two electrons fill the K shell, which is stable, option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('c-mcq7', mcq({
  stem: 'A neutral atom X has the configuration 2, 8, 6. Which statement about X is correct?',
  right: 'It tends to gain two electrons to complete its octet', wrong: ['It tends to lose six electrons', 'It is inert like neon', 'It tends to lose two electrons'],
  sol: 'Six outer electrons are two short of an octet, so it gains two, option (@K).',
  d: 3, c: 'application', t: [4],
}), () => valency(16) === 2 && valence(16) === 6 || 'x');
add('ar-inert', ar({
  a: 'Argon does not take part in chemical reactions under ordinary conditions.',
  r: 'Its atom has a complete octet in the outermost shell.',
  key: 'c',
  sol: 'A full outermost shell is stable, which explains the inertness of argon, option (c).',
  d: 2, c: 'understanding', t: [4],
}));
add('c-tf', tf({
  stem: 'The outermost shell of any atom of the first 20 elements can hold 18 electrons.',
  key: 'f',
  sol: 'False. The outermost shell holds at most 8 electrons (2 for the K shell).',
  d: 2, c: 'understanding', t: [4],
}));
add('c-fill', fill({
  stem: 'An outermost shell holding eight electrons is called an ___.',
  acc: [['octet']],
  sol: 'An **octet**.',
  d: 1, c: 'recall', t: [4],
}));
add('c-term1', term({
  stem: 'Write the electronic configuration of a potassium atom (atomic number 19).',
  model: '**2, 8, 8, 1**', sol: 'Two, eight, eight, one.', sch: '2, 8, 8, 1',
  d: 2, c: 'application', t: [4],
}), () => cfg(19) === '2, 8, 8, 1' || 'k');
add('c-term2', term({
  stem: 'Name the element whose atom has the configuration 2, 8, 8, 2.',
  model: '**Calcium.**', sol: 'Calcium.', sch: 'Calcium',
  d: 2, c: 'application', t: [4],
}));
add('c-num', num({
  stem: 'What is the maximum number of electrons that can be accommodated in the N shell?',
  value: cap(4), tol: 0, unit: null,
  sol: `2n² with n = 4: 2 × 16 = ${cap(4)}.`,
  scheme: [['Uses 2n²', 0.5], [`${cap(4)}`, 0.5]],
  d: 2, c: 'application', t: [4],
}), () => cap(4) === 32 || 'n');
add('c-num2', num({
  stem: 'An atom has the electronic configuration 2, 8, 6. How many protons does its nucleus contain?',
  value: 16, tol: 0, unit: null,
  sol: 'A neutral atom has equal protons and electrons: 2 + 8 + 6 = 16.',
  scheme: [['Adds the electrons', 0.5], ['16', 0.5]],
  d: 1, c: 'application', t: [4],
}));
add('c-short2a', short({
  marks: 2,
  stem: 'Explain why argon does not react with other elements, but sodium reacts readily.',
  wl: null,
  model: 'Argon already has a **full outer octet**, so it has no tendency to lose, gain or share electrons. Sodium has **one outer electron**, which it can lose to reach the stable 2, 8 arrangement.',
  sol: 'Argon: full octet. Sodium: one outer electron lost.',
  scheme: [['Argon has a complete octet', 1], ['Sodium loses its one outer electron', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('c-short2b', short({
  marks: 2,
  stem: 'State the 2n² rule and use it to give the maximum number of electrons in the K shell and in the L shell.',
  wl: null,
  model: 'The shell with number **n** holds at most **2n²** electrons. So the K shell (n = 1) holds **2** and the L shell (n = 2) holds **8**.',
  sol: '2n²; 2 and 8.',
  scheme: [['Rule', 1], ['Values 2 and 8', 1]],
  d: 1, c: 'recall', t: [4],
}));
add('c-short2c', short({
  marks: 2,
  stem: 'Write the electronic configurations of an oxygen atom (atomic number 8) and of a magnesium atom (atomic number 12).',
  wl: null,
  model: '**Oxygen:** 2, 6. **Magnesium:** 2, 8, 2.',
  sol: 'O: 2, 6; Mg: 2, 8, 2.',
  scheme: [['Oxygen', 1], ['Magnesium', 1]],
  d: 1, c: 'application', t: [4],
}), () => cfg(8) === '2, 6' && cfg(12) === '2, 8, 2' || 'og');
add('c-short3a', short({
  marks: 3,
  stem: 'Write the electronic configuration and the number of electrons in the outermost shell of (a) a nitrogen atom (atomic number 7), (b) a silicon atom (atomic number 14) and (c) a calcium atom (atomic number 20).',
  wl: null,
  model: `**(a)** ${cfg(7)}; ${valence(7)} outer electrons.\n\n**(b)** ${cfg(14)}; ${valence(14)} outer electrons.\n\n**(c)** ${cfg(20)}; ${valence(20)} outer electrons.`,
  sol: 'N: 2, 5 (5); Si: 2, 8, 4 (4); Ca: 2, 8, 8, 2 (2).',
  scheme: [['(a) correct', 1], ['(b) correct', 1], ['(c) correct', 1]],
  d: 2, c: 'application', t: [4],
}), () => [cfg(7), cfg(14), cfg(20), valence(7), valence(14), valence(20)].join('|') === '2, 5|2, 8, 4|2, 8, 8, 2|5|4|2' || 'n');
add('c-short3b', short({
  marks: 3,
  stem: 'For each of sodium (2, 8, 1), oxygen (2, 6) and neon (2, 8) state whether the atom tends to lose electrons, gain electrons or do neither, and give the number involved.',
  wl: null,
  model: '**Sodium:** loses **1** electron. **Oxygen:** gains **2** electrons. **Neon:** does **neither**, since its octet is already complete.',
  sol: 'Na loses 1; O gains 2; Ne neither.',
  scheme: [['Sodium', 1], ['Oxygen', 1], ['Neon', 1]],
  d: 2, c: 'application', t: [4],
}), () => valency(11) === 1 && valence(11) === 1 && valency(8) === 2 && valency(10) === 0 || 'tend');
add('c-short3c', short({
  marks: 3,
  stem: 'An atom of an element X has atomic number 17. (a) Write its electronic configuration. (b) State whether it tends to lose or gain electrons, and how many. (c) Give the configuration of the ion it forms.',
  wl: null,
  model: `**(a)** ${cfg(17)}.\n\n**(b)** It **gains 1** electron to complete the octet.\n\n**(c)** The ion has 18 electrons: **2, 8, 8**.`,
  sol: '2, 8, 7; gains one electron; 2, 8, 8.',
  scheme: [['(a) configuration', 1], ['(b) gains one electron', 1], ['(c) 2, 8, 8', 1]],
  d: 3, c: 'application', t: [4],
}), () => cfg(17) === '2, 8, 7' && 17 + 1 === 18 || 'x17');

// ---------------------------------------------------------------- t05 isotopes
add('i-mcq1', mcq({
  stem: 'Isotopes of an element have the same',
  right: 'atomic number but different mass numbers', wrong: ['mass number but different atomic numbers', 'number of neutrons but different numbers of protons', 'atomic number and the same mass number'],
  sol: 'They differ only in the number of neutrons, option (@K).',
  d: 1, c: 'recall', t: [5],
}));
add('i-mcq2', mcq({
  stem: 'Tritium has one proton. The number of neutrons in a tritium atom is',
  right: String(ISO.H[2].n), wrong: ['0', '1', '3'],
  sol: `Its mass number is 3, so neutrons = 3 − 1 = ${ISO.H[2].n}, option (@K).`,
  d: 2, c: 'application', t: [5],
}), () => ISO.H[2].a - ISO.H[2].p === 2 || 'h3');
add('i-mcq3', mcq({
  stem: 'The isotope of carbon with mass number 14 has',
  right: '6 protons and 8 neutrons', wrong: ['8 protons and 6 neutrons', '6 protons and 14 neutrons', '14 protons and 6 neutrons'],
  sol: 'Carbon has 6 protons; neutrons = 14 − 6 = 8, option (@K).',
  d: 2, c: 'application', t: [5],
}), () => ISO.C[2].n === 8 || 'c14');
add('i-mcq4', mcq({
  stem: 'Natural chlorine is a mixture of two isotopes. Which statement about them is correct?',
  right: 'They differ by two neutrons per atom', wrong: ['They differ by two protons per atom', 'They differ by two electrons per atom', 'They have different atomic numbers'],
  sol: 'Chlorine-35 has 18 neutrons and chlorine-37 has 20, a difference of two, option (@K).',
  d: 3, c: 'analysis', t: [5],
}), () => ISO.Cl[1].n - ISO.Cl[0].n === 2 || 'cl');
add('i-mcq5', mcq({
  stem: 'The relative atomic mass of chlorine is not a whole number because',
  right: 'it is a mixture of isotopes of different masses', wrong: ['its atoms contain fractions of protons', 'its electrons have a large mass', 'its neutrons are not all alike in charge'],
  sol: 'The value is an average over atoms with mass numbers 35 and 37, option (@K).',
  d: 3, c: 'understanding', t: [5],
}));
add('ar-iso', ar({
  a: 'Isotopes of an element show the same chemical properties.',
  r: 'Isotopes of an element have different numbers of neutrons.',
  key: 'd',
  sol: 'Both statements are true, but the chemistry depends on the electrons, not on the neutrons, so (R) does not explain (A), option (d).',
  d: 3, c: 'analysis', t: [5],
}));
add('i-tf', tf({
  stem: 'A protium atom has no neutron.',
  key: 't',
  sol: 'True. Its nucleus is a single proton.',
  d: 1, c: 'recall', t: [5],
}));
add('i-fill', fill({
  stem: 'Atoms of the same element with different mass numbers are called ___.',
  acc: [['isotopes']],
  sol: '**Isotopes**.',
  d: 1, c: 'recall', t: [5],
}));
add('i-term1', term({
  stem: 'Name the isotope of hydrogen whose atom has two neutrons.',
  model: '**Tritium.**', sol: 'Tritium.', sch: 'Tritium',
  d: 1, c: 'recall', t: [5],
}));
add('i-term2', term({
  stem: 'Write the symbol of the isotope of carbon with 8 neutrons, showing its mass number and atomic number.',
  model: r`$\ce{^{14}_{6}C}$`, sol: 'Mass number 14 at the top, atomic number 6 at the bottom.', sch: 'Correct symbol',
  d: 2, c: 'application', t: [5],
}));
add('i-num', num({
  stem: `A sample contains ${CL_SAMPLE} atoms of chlorine, with chlorine-35 and chlorine-37 atoms in the ratio 3 : 1. How many chlorine-37 atoms are present?`,
  value: CL_SAMPLE / 4, tol: 0, unit: null,
  sol: `One part in four: ${CL_SAMPLE} ÷ 4 = ${CL_SAMPLE / 4}.`,
  scheme: [['One part in four', 0.5], [`${CL_SAMPLE / 4}`, 0.5]],
  d: 2, c: 'application', t: [5],
}), () => eq(CL_SAMPLE / 4, 100, 'cl37') === 100);
add('i-num2', num({
  stem: 'How many neutrons are present in an atom of carbon-13 (atomic number 6)?',
  value: ISO.C[1].n, tol: 0, unit: null,
  sol: `Neutrons = 13 − 6 = ${ISO.C[1].n}.`,
  scheme: [['Subtraction', 0.5], [`${ISO.C[1].n}`, 0.5]],
  d: 1, c: 'application', t: [5],
}));
add('i-short2a', short({
  marks: 2,
  stem: 'Define isotopes and give one pair of examples.',
  wl: null,
  model: 'Isotopes are **atoms of one element** with the **same atomic number but different mass numbers**. For example, carbon-12 and carbon-14.',
  sol: 'Same atomic number, different mass numbers; example.',
  scheme: [['Definition', 1], ['Example', 1]],
  d: 1, c: 'recall', t: [5],
}));
add('i-short2b', short({
  marks: 2,
  stem: 'Why do the isotopes of an element show the same chemical behaviour?',
  wl: null,
  model: 'Chemical behaviour depends on the **electrons**, especially those in the outer shell. Isotopes have the **same number of electrons** (and protons), even though the neutrons differ.',
  sol: 'Same electrons, same outer shell.',
  scheme: [['Behaviour depends on electrons', 1], ['Isotopes have the same electrons', 1]],
  d: 2, c: 'understanding', t: [5],
}));
add('i-short3a', short({
  marks: 3,
  stem: 'Give the number of protons, neutrons and electrons in each isotope of hydrogen, in the order protium, deuterium and tritium.',
  wl: null,
  model: '**Protium:** 1, 0 and 1.\n\n**Deuterium:** 1, 1 and 1.\n\n**Tritium:** 1, 2 and 1.',
  sol: 'Protium 1, 0, 1; deuterium 1, 1, 1; tritium 1, 2, 1.',
  scheme: [['Protium', 1], ['Deuterium', 1], ['Tritium', 1]],
  d: 2, c: 'application', t: [5],
}));
add('i-short3b', short({
  marks: 3,
  stem: 'Chlorine-35 and chlorine-37 are isotopes. (a) State one thing they have in common. (b) State how they differ. (c) Explain why the relative atomic mass of chlorine is taken as 35.5.',
  wl: null,
  model: '**(a)** Both have **17 protons** (and 17 electrons).\n\n**(b)** They have **different numbers of neutrons**, 18 and 20.\n\n**(c)** Natural chlorine contains the two isotopes in the ratio about **3 : 1**, so the **average** mass is 35.5.',
  sol: 'Same protons; different neutrons; average of 3 : 1 mixture.',
  scheme: [['Common feature', 1], ['Difference', 1], ['Average explained', 1]],
  d: 3, c: 'application', t: [5],
}));
add('iso-match', match({
  marks: 5,
  stem: 'Match each atom in Column A with its number of neutrons in Column B.',
  pairs: [
    ['Protium', '0'],
    ['Deuterium', '1'],
    ['Tritium', '2'],
    ['Carbon-13', '7'],
    ['Chlorine-35', '18'],
  ],
  order: [2, 4, 0, 3, 1],
  sol: 'Protium 0, deuterium 1, tritium 2, carbon-13 7, chlorine-35 18.',
  d: 2, c: 'application', t: [5],
}));

// ---------------------------------------------------------------- 10-mark structured questions
add('particle-table-long', long({
  marks: 10, wl: null,
  stem: 'A student prepares a table of three particles: A, a neutral fluorine atom (atomic number 9, mass number 19); B, a magnesium ion Mg²⁺ (atomic number 12, mass number 24); and C, an oxide ion O²⁻ (atomic number 8, mass number 16).\n\n(a) State the numbers of protons, neutrons and electrons in A. [3]\n\n(b) State the numbers of protons, neutrons and electrons in B. [3]\n\n(c) State the numbers of protons, neutrons and electrons in C. [2]\n\n(d) Which two of the three particles have the same number of electrons? Write their common electronic configuration. [2]',
  model: `**(a)** ${bySym('F').z} protons, ${neutrons(bySym('F'))} neutrons and ${electrons(bySym('F'))} electrons.\n\n**(b)** ${bySym('Mg').z} protons, ${neutrons(bySym('Mg'))} neutrons and ${electrons(bySym('Mg'), 2)} electrons (two lost).\n\n**(c)** ${bySym('O').z} protons, ${neutrons(bySym('O'))} neutrons and ${electrons(bySym('O'), -2)} electrons (two gained).\n\n**(d)** **B and C** each have 10 electrons; the configuration is **2, 8**.`,
  sol: 'F: 9, 10, 9; Mg²⁺: 12, 12, 10; O²⁻: 8, 8, 10; B and C with 2, 8.',
  scheme: [['A protons and electrons', 1.5], ['A neutrons', 1.5], ['B protons and neutrons', 1.5], ['B electrons', 1.5], ['C protons and neutrons', 1], ['C electrons', 1], ['B and C identified', 1], ['2, 8', 1]],
  d: 3, c: 'application', t: [1, 4],
}), () => [bySym('F').z, neutrons(bySym('F')), electrons(bySym('F')), neutrons(bySym('Mg')), electrons(bySym('Mg'), 2), neutrons(bySym('O')), electrons(bySym('O'), -2)].join() === '9,10,9,12,10,8,10' || 'tab');
add('gold-foil-long', long({
  marks: 10, wl: null,
  stem: "The diagram shows the arrangement for Rutherford's gold foil experiment, with parts lettered A to E.\n\n(a) Name the parts A and B. [2]\n\n(b) What does the path of the particles at C show about the structure of the atom? [2]\n\n(c) What does path D show about the charge on the centre of the atom? Give a reason. [2]\n\n(d) What does path E show about the size and density of the nucleus? [2]\n\n(e) State one limitation of the model of the atom that Rutherford proposed. [2]",
  model: '**(a)** **A** is the **source of alpha particles**; **B** is the **thin gold foil**.\n\n**(b)** Most particles go **straight through**, so most of the atom is **empty space**.\n\n**(c)** The particle is **turned aside**, so the centre is **positively charged**: it repels the positively charged alpha particle.\n\n**(d)** The particle is **thrown back**, so the nucleus is **very small and dense**, with the mass concentrated in it.\n\n**(e)** A revolving electron should **radiate energy** and spiral into the nucleus, but atoms are stable.',
  sol: 'Source and foil; empty space; positive centre; small dense nucleus; instability of the electron.',
  scheme: [['A source of alpha particles', 1], ['B gold foil', 1], ['Passes straight', 1], ['Empty space', 1], ['Deflected, so positive', 1], ['Reason: like charges repel', 1], ['Rebound, so small and dense', 1], ['Mass concentrated in the nucleus', 1], ['Electron should lose energy', 1], ['Atom would collapse', 1]],
  d: 3, c: 'analysis', t: [2],
  assets: [scatFig],
}));
add('bohr-long', long({
  marks: 10, wl: null,
  stem: 'The diagram shows a Bohr model of a neutral atom with 11 protons and 12 neutrons. Its parts are lettered A to E.\n\n(a) Name parts A and E. [2]\n\n(b) Name the shells B, C and D. [3]\n\n(c) Write the electronic configuration of the atom and state its mass number. [2]\n\n(d) Which postulate of Bohr explains why the electrons do not fall into the nucleus? [1]\n\n(e) Say whether the atom tends to lose or gain an electron, and why. [2]',
  model: '**(a)** **A** is the **nucleus**; **E** is an **electron** (the one in the outermost shell).\n\n**(b)** **B** is the **K shell**, **C** the **L shell** and **D** the **M shell**.\n\n**(c)** The configuration is **2, 8, 1**; the mass number is 11 + 12 = **23**.\n\n**(d)** An electron in an orbit has a fixed energy and **does not radiate** energy.\n\n**(e)** It tends to **lose** one electron, because that leaves the stable arrangement 2, 8.',
  sol: 'Nucleus and electron; K, L and M shells; 2, 8, 1 and 23; no radiation in an orbit; loses one electron.',
  scheme: [['A nucleus', 1], ['E electron', 1], ['B K shell', 1], ['C L shell', 1], ['D M shell', 1], ['Configuration 2, 8, 1', 1], ['Mass number 23', 1], ['No energy lost in an orbit', 1], ['Loses one electron', 1], ['Gets 2, 8 octet', 1]],
  d: 3, c: 'application', t: [3, 4],
  assets: [bohrFig],
}), () => cfg(11) === '2, 8, 1' && 11 + 12 === 23 || 'na');
add('config-long', long({
  marks: 10, wl: null,
  stem: 'Four atoms have the atomic numbers P = 7, Q = 12, R = 18 and T = 17.\n\n(a) Write the electronic configuration of each atom. [4]\n\n(b) Which atom is chemically inert? Give a reason. [2]\n\n(c) Which atom tends to lose electrons? State how many it loses and the configuration of its ion. [2]\n\n(d) Which atoms tend to gain electrons? State how many each gains. [2]',
  model: `**(a)** **P:** ${cfg(7)}; **Q:** ${cfg(12)}; **R:** ${cfg(18)}; **T:** ${cfg(17)}.\n\n**(b)** **R**, because it has a complete **octet** in its outermost shell.\n\n**(c)** **Q** loses **2** electrons; its ion has the configuration **2, 8**.\n\n**(d)** **P** gains **3** electrons and **T** gains **1** electron.`,
  sol: 'P 2, 5; Q 2, 8, 2; R 2, 8, 8; T 2, 8, 7; R inert; Q loses 2; P gains 3, T gains 1.',
  scheme: [['P', 1], ['Q', 1], ['R', 1], ['T', 1], ['R inert', 1], ['Complete octet', 1], ['Q loses 2 electrons', 1], ['Ion 2, 8', 1], ['P gains 3', 1], ['T gains 1', 1]],
  d: 3, c: 'application', t: [4],
}), () => [cfg(7), cfg(12), cfg(18), cfg(17)].join('|') === '2, 5|2, 8, 2|2, 8, 8|2, 8, 7' && valency(7) === 3 && valency(17) === 1 && valency(12) === 2 || 'cfg');
add('isotope-long', long({
  marks: 10, wl: null,
  stem: 'Four atoms W, X, Y and Z have these numbers of protons and neutrons: W has 1 proton and 2 neutrons; X has 6 protons and 8 neutrons; Y has 17 protons and 20 neutrons; Z has 6 protons and 6 neutrons.\n\n(a) Name the element that each of W, X and Y belongs to. [3]\n\n(b) Give the mass number of each of W, X, Y and Z. [2]\n\n(c) Which two atoms are isotopes of each other? Give a reason. [2]\n\n(d) Write the symbol of Y, showing its mass number and atomic number. [1]\n\n(e) A sample of chlorine contains chlorine-35 and chlorine-37 atoms in equal numbers. Calculate the average mass number. [2]',
  model: r`**(a)** **W:** hydrogen (the isotope tritium); **X:** carbon; **Y:** chlorine.` + '\n\n**(b)** **W** 3; **X** 14; **Y** 37; **Z** 12.\n\n**(c)** **X and Z**, because both have **6 protons** (the same atomic number) but **different numbers of neutrons**.\n\n' + r`**(d)** $\ce{^{37}_{17}Cl}$` + '\n\n**(e)** (35 + 37) ÷ 2 = **36**.',
  sol: 'H (tritium), C, Cl; 3, 14, 37, 12; X and Z; Cl-37 symbol; 36.',
  scheme: [['W hydrogen', 1], ['X carbon', 1], ['Y chlorine', 1], ['Mass numbers W and X', 1], ['Mass numbers Y and Z', 1], ['X and Z', 1], ['Reason', 1], ['Symbol of Y', 1], ['Sum 35 + 37', 1], ['Average 36', 1]],
  d: 4, c: 'analysis', t: [5],
}), () => 1 + 2 === 3 && 6 + 8 === 14 && 17 + 20 === 37 && 6 + 6 === 12 && (35 + 37) / 2 === 36 || 'iso');
add('li-o-long', long({
  marks: 10, wl: null,
  stem: 'A student studies lithium (atomic number 3, mass number 7), oxygen (atomic number 8) and neon (atomic number 10).\n\n(a) Draw the Bohr (orbit) diagram of a lithium atom, showing the nucleus with its protons and neutrons and the electrons in their shells. [3]\n\n(b) The lithium atom loses one electron to form an ion. Write the configuration of the ion and say which noble gas arrangement it matches. [2]\n\n(c) Write the configuration of an oxygen atom and state how many electrons it tends to gain. [2]\n\n(d) Explain why neon is inert while lithium and oxygen are reactive. [3]',
  model: `**(a)** A nucleus labelled **3 protons, 4 neutrons**; two circles round it, with **2 electrons** on the inner circle (K) and **1 electron** on the outer circle (L).\n\n**(b)** The ion has **${cfg(2)}**, the same as **helium**.\n\n**(c)** Oxygen is **${cfg(8)}**; it tends to gain **2** electrons.\n\n**(d)** **Neon** has a complete octet (2, 8), so it needs no change. **Lithium** (2, 1) can lose one electron and **oxygen** (2, 6) can gain two to reach a stable outer shell, so they react.`,
  sol: 'Bohr diagram of Li; Li⁺ is 2 like helium; O is 2, 6 and gains 2; neon has a complete octet.',
  scheme: [['Nucleus with protons and neutrons', 1], ['K shell with 2 electrons', 1], ['L shell with 1 electron', 1], ['Li⁺ is 2', 1], ['Helium arrangement', 1], ['Oxygen 2, 6', 1], ['Gains 2', 1], ['Neon has an octet', 1], ['Lithium loses one electron', 1], ['Oxygen gains two electrons', 1]],
  d: 3, c: 'application', t: [3, 4],
}), () => cfg(3) === '2, 1' && cfg(8) === '2, 6' && cfg(10) === '2, 8' || 'cfg3');
