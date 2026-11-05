// ICSE 9 Chemistry ch07 Atomic Structure — Part 1 (t01–t03: particles, Rutherford, Bohr), Part 2 (t04–t05: shells, activity, isotopes).
import { sl, deck, table, flow, svgV, r } from '../../icse-9-chemistry-ch01/src/lib.mjs';
import { SCATTER, SODIUM, SHELLROW, HYDROGEN } from './svgs.mjs';
import { EL, cfg, valence, ISO, CL_AVG, byZ } from './calc.mjs';

export const V = {
  scatter: svgV(SCATTER, "Rutherford's gold foil experiment: alpha particles pass through a thin foil, a few are deflected and very few rebound"),
  sodium: svgV(SODIUM, 'Bohr model of a sodium atom with nucleus and three shells'),
  shellrow: svgV(SHELLROW, 'Bohr shell diagrams of lithium, oxygen, neon, magnesium and potassium'),
  hydrogen: svgV(HYDROGEN, 'The three isotopes of hydrogen: protium, deuterium and tritium'),
};
const row = (z) => [`${z}`, byZ(z).name[0].toUpperCase() + byZ(z).name.slice(1), cfg(z), `${valence(z)}`];

export const deck1 = deck({
  part: 1,
  title: "Atomic Structure — Part 1: Particles, Rutherford's experiment and Bohr's model",
  goals: [
    'Compare protons, neutrons and electrons and find their numbers from the atomic number and mass number',
    "Describe Rutherford's gold foil experiment, its conclusions and a limitation of the model",
    "State the main postulates of Bohr's model and how it overcomes the limitation",
  ],
  slides: [
    sl('title', 'Inside the atom', {
      b: 'Part 1 — every atom has a tiny **nucleus** with **protons** and **neutrons**, and **electrons** outside it. How did scientists find this out?',
      v: flow('LR', [['a', 'Thomson: electrons'], ['b', 'Rutherford: nucleus'], ['c', 'Bohr: shells']], [['a', 'b'], ['b', 'c']], 'Flow of three steps in the story of the atom: electrons, the nucleus, and shells'),
      n: 'Atoms are far too small to see, yet we know what is inside them. In this part we meet the particles in an atom, then follow two famous ideas: the nuclear atom of Rutherford and the shell model of Bohr.',
    }),
    sl('concept', 'The three particles', {
      b: 'Protons and neutrons sit together in the **nucleus**. Electrons move round the nucleus.',
      v: table(['Particle', 'Charge', 'Relative mass', 'Where found'], [['Proton', 'Positive, plus one', 'One', 'In the nucleus'], ['Neutron', 'None', 'One', 'In the nucleus'], ['Electron', 'Negative, minus one', 'About one eighteen hundred and fortieth', 'Outside the nucleus']], 'Table comparing the charge, relative mass and location of the proton, neutron and electron'),
      n: 'A proton carries a positive charge and a neutron carries no charge. Both are heavy and both are in the nucleus. An electron carries a negative charge, is very light, and moves outside the nucleus.',
    }),
    sl('concept', 'Atomic number and mass number', {
      b: 'The **atomic number** is the number of protons. The **mass number** is the number of protons plus neutrons. A neutral atom has as many electrons as protons.',
      v: table(['Quantity', 'Meaning', 'How to find it'], [['Atomic number, Z', 'Protons in the nucleus', 'Given, or the same as the electrons in a neutral atom'], ['Mass number, A', 'Protons plus neutrons', 'Given in the symbol'], ['Neutrons', 'Particles with no charge', 'Mass number minus atomic number']], 'Table defining atomic number, mass number and the number of neutrons'),
      n: 'The atomic number tells you how many protons there are, and it identifies the element. The mass number counts protons and neutrons together. To find neutrons, subtract the atomic number from the mass number. A neutral atom has equal protons and electrons.',
    }),
    sl('example', 'Worked example 1: a phosphorus atom', {
      b: r`**Problem.** Phosphorus has atomic number 15 and mass number 31. Find the numbers of protons, neutrons and electrons in one atom.

**Step 1.** Protons = atomic number = **15**.

**Step 2.** Neutrons = mass number − atomic number = 31 − 15 = **16**.

**Step 3.** The atom is neutral, so electrons = protons = **15**.`,
      v: table(['Protons', 'Neutrons', 'Electrons'], [['15', '16', '15']], 'Particles in a phosphorus atom'),
      n: 'Phosphorus has atomic number fifteen, so there are fifteen protons. Subtract fifteen from the mass number thirty one to get sixteen neutrons. The atom is neutral, so it has fifteen electrons as well.',
    }),
    sl('check', 'Quick check: counting particles', {
      b: 'Subtract, then think about the charge.',
      v: table(['Atom', 'Atomic number', 'Mass number'], [['Potassium', '19', '39']], 'Atomic number and mass number of a potassium atom'),
      chk: 'chk-count',
      n: 'A potassium atom has atomic number nineteen and mass number thirty nine. How many neutrons does it have?',
    }),
    sl('example', 'Worked example 2: counting in an ion', {
      b: r`**Problem.** A calcium atom has atomic number 20 and mass number 40. Find the particles in the calcium ion, $\ce{Ca^2+}$.

**Step 1.** Protons stay at **20**; neutrons = 40 − 20 = **20**.

**Step 2.** The atom has 20 electrons. The ion has lost **2** electrons, so it has 20 − 2 = **18** electrons.`,
      v: table(['Species', 'Protons', 'Neutrons', 'Electrons'], [['Calcium atom', '20', '20', '20'], ['Calcium ion, 2+', '20', '20', '18']], 'Particles in a calcium atom and its ion'),
      n: 'An ion forms when an atom loses or gains electrons. The nucleus does not change. A calcium ion with a charge of two plus has lost two electrons, so it has eighteen electrons, while protons and neutrons stay at twenty each.',
    }),
    sl('diagram', "Rutherford's gold foil experiment", {
      b: 'Fast, positively charged **alpha particles** were fired at a very thin gold foil. A screen round the foil showed where they went.',
      v: V.scatter,
      n: 'Rutherford directed a narrow beam of alpha particles at a very thin gold foil. A screen coated to glow where it was hit showed the paths. Nearly all the particles went straight through. A few were turned aside, and very few bounced back.',
    }),
    sl('concept', 'What he saw and what it showed', {
      v: table(['Observation', 'Conclusion'], [['Most alpha particles passed straight through', 'Most of the atom is empty space'], ['A few were deflected through small angles', 'The centre of the atom is positively charged'], ['Very few rebounded', 'The positive charge and mass are in a tiny, dense nucleus'], ['The nucleus is very small compared with the atom', 'Electrons revolve round the nucleus']], "Table linking each observation in Rutherford's experiment to its conclusion"),
      n: 'Each observation led to a conclusion. Most particles went straight, so the atom is mostly empty space. A few were deflected, so the centre is positive. Very few bounced back, so that positive centre is tiny and dense: the nucleus.',
    }),
    sl('check', 'Quick check: the gold foil', {
      b: 'Link what happened to what it means.',
      v: table(['Observation', 'Means?'], [['Very few particles rebounded', '?']], 'The rebounding particles and what they show'),
      chk: 'chk-ruth',
      n: 'In the gold foil experiment, only a very few alpha particles rebounded. What does this show?',
    }),
    sl('concept', "A limitation of Rutherford's model", {
      b: 'A charged electron moving in a circle should **lose energy**. Then it would spiral into the nucleus and the atom would collapse. Atoms do not collapse.',
      v: flow('LR', [['a', 'Electron revolves round nucleus'], ['b', 'Should radiate energy'], ['c', 'Would spiral into nucleus'], ['d', 'But atoms are stable']], [['a', 'b'], ['b', 'c'], ['c', 'd']], "Flow showing why Rutherford's model cannot explain the stability of the atom"),
      n: 'Rutherford gave us the nucleus, but his model has a problem. A revolving charged particle should lose energy and fall into the nucleus. In reality atoms are stable. His model also did not say how the electrons are arranged.',
    }),
    sl('diagram', "Bohr's model of the atom", {
      b: 'Electrons move in fixed circular paths, called **orbits** or **shells**, named **K, L, M, N** from the nucleus outwards. An electron does not lose energy while it stays in its orbit.',
      v: V.sodium,
      n: 'Bohr suggested that electrons travel in fixed orbits, or shells, and each shell has a fixed energy. The shells are named K, L, M and N, outwards from the nucleus. An electron in its orbit does not radiate energy, so the atom stays stable.',
    }),
    sl('concept', 'Postulates of the simplified Bohr model', {
      v: table(['Postulate', 'Meaning'], [['Fixed orbits', 'Electrons revolve only in certain shells, K, L, M, N'], ['Fixed energy', 'Each shell has a fixed energy that rises with its distance from the nucleus'], ['No loss of energy', 'An electron in a shell does not radiate energy, so it does not fall into the nucleus'], ['Jumps', 'Energy is absorbed or given out only when an electron moves from one shell to another']], 'Table of the four postulates of the simplified Bohr model'),
      n: 'These are the main ideas of Bohr. Electrons move in fixed shells. Each shell has a fixed energy. An electron in a shell does not lose energy. Energy is absorbed or given out only when an electron jumps between shells. This removes the limitation of the earlier model.',
    }),
    sl('check', "Quick check: Bohr's idea", {
      b: 'Why does the electron not fall into the nucleus?',
      v: table(['Statement', 'True?'], [['An electron in a shell radiates energy continuously', '?']], 'A statement about an electron in a shell'),
      chk: 'chk-bohr',
      n: 'Which idea of Bohr explains why an electron does not spiral into the nucleus?',
    }),
    sl('summary', 'Summary: Part 1', {
      ul: [
        'Protons (positive) and neutrons (no charge) are in the nucleus; electrons (negative) are outside it.',
        'Atomic number is the number of protons; mass number is protons plus neutrons.',
        'Rutherford: the atom is mostly empty space with a small, dense, positive nucleus.',
        'Bohr: electrons move in fixed shells without losing energy.',
      ],
      v: table(['Idea', 'Key point'], [['Rutherford', 'Nucleus at the centre; limitation: atom should collapse'], ['Bohr', 'Fixed shells; no energy lost in a shell']], 'Summary table of the models of Rutherford and Bohr'),
      n: 'To sum up Part 1. Protons and neutrons are in the nucleus and electrons are outside. Rutherford found the nucleus. Bohr placed the electrons in fixed shells, which solved the stability problem.',
    }),
    sl('exam-tips', 'Exam tips: Part 1', {
      ul: [
        'Neutrons = mass number − atomic number; do not subtract the electrons.',
        'For an ion, change the electrons only: protons and neutrons stay the same.',
        'Link every observation of the gold foil experiment with its conclusion.',
        'Do not write equations or formulae for the Bohr model: they are not required.',
      ],
      v: table(['Slip', 'Fix'], [['Giving the number of neutrons as the atomic number', 'Neutrons are mass number minus atomic number'], ['Saying alpha particles are negative', 'They are positively charged'], ['Calling the electron heavy', 'It is about one eighteen hundred and fortieth of a proton']], 'Table of three common slips in Part 1 and their fixes'),
      n: 'Exam tips. Always subtract to find neutrons. For an ion, change only the electrons. In Rutherford questions, join each observation to its conclusion. And remember that alpha particles are positively charged.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Atomic Structure — Part 2: Electron shells, chemical activity and isotopes',
  goals: [
    'Write the electronic configuration of the first 20 elements using the 2n squared rule',
    'Explain chemical reactivity in terms of completing a duplet or an octet',
    'Define isotopes and represent the isotopes of hydrogen, carbon and chlorine',
  ],
  slides: [
    sl('title', 'Filling the shells', {
      b: 'Part 2 — how are electrons shared out among the **shells**, and why does the outer shell decide how an atom behaves?',
      v: flow('LR', [['a', 'Atomic number'], ['b', 'Fill K, L, M, N'], ['c', 'Outer shell'], ['d', 'Chemical behaviour']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Flow from atomic number to filling shells to the outer shell and chemical behaviour'),
      n: 'Once you know the atomic number, you know how many electrons a neutral atom has. We now place them in shells, and then see how the outermost shell decides what an atom does in a reaction.',
    }),
    sl('concept', 'The two n squared rule', {
      b: 'The maximum number of electrons in the shell with number **n** is **2n²**. The outermost shell never holds more than **8** electrons (2 for the K shell).',
      v: table(['Shell', 'n', 'Maximum electrons'], [['K', '1', '2'], ['L', '2', '8'], ['M', '3', '18'], ['N', '4', '32']], 'Table of the maximum number of electrons in the K, L, M and N shells'),
      n: 'The number two times n squared gives the most electrons a shell can hold. So the K shell holds two, the L shell holds eight, the M shell eighteen and the N shell thirty two. In the outermost shell, though, there are never more than eight.',
    }),
    sl('concept', 'Elements 1 to 10', {
      b: 'Fill the shells in order: the K shell first, then the L shell. Hydrogen and helium have only the K shell.',
      v: table(['Z', 'Element', 'Configuration', 'Outer electrons'], EL.slice(0, 10).map((e) => row(e.z)), 'Table of the electronic configurations of the first ten elements'),
      n: 'Hydrogen has one electron and helium has two, filling the K shell. From lithium onwards the electrons go into the L shell, which is full with eight electrons at neon.',
    }),
    sl('concept', 'Elements 11 to 20', {
      b: 'After neon the third shell fills to **8**. For potassium and calcium the next electrons go to the fourth shell.',
      v: table(['Z', 'Element', 'Configuration', 'Outer electrons'], EL.slice(10).map((e) => row(e.z)), 'Table of the electronic configurations of elements eleven to twenty'),
      n: 'Sodium to argon fill the M shell up to eight. Then potassium has one electron in the N shell and calcium has two. Count along the row and you can check any configuration.',
    }),
    sl('diagram', 'Shell diagrams', {
      v: V.shellrow,
      n: 'Here are Bohr diagrams of five atoms. Lithium has two and one. Oxygen has two and six. Neon has two and eight, a full outer shell. Magnesium has two, eight and two. Potassium has four shells, ending with one electron.',
    }),
    sl('example', 'Worked example 1: a sulphur atom', {
      b: r`**Problem.** Write the electronic configuration of sulphur (atomic number 16) and say how many electrons are in its outermost shell.

**Step 1.** Sulphur has **16** electrons.

**Step 2.** K shell takes **2**; L shell takes **8**; **6** remain for the M shell.

**Step 3.** Configuration **2, 8, 6**; outermost shell (M) has **6** electrons.`,
      v: table(['Shell', 'Electrons', 'Left to place'], [['K', '2', '14'], ['L', '8', '6'], ['M', '6', '0']], 'Placing sixteen electrons of sulphur in shells'),
      n: 'Sulphur has sixteen electrons. Put two in the K shell, which leaves fourteen. Put eight in the L shell, which leaves six. The last six go in the M shell. The configuration is two, eight, six.',
    }),
    sl('check', 'Quick check: configuration', {
      b: 'Fill K, then L, then M.',
      v: table(['Atom', 'Atomic number'], [['Aluminium', '13']], 'Aluminium and its atomic number'),
      chk: 'chk-config',
      n: 'Aluminium has atomic number thirteen. What is its electronic configuration?',
    }),
    sl('concept', 'Duplet, octet and chemical activity', {
      b: 'A full outer shell, a **duplet** (2) or an **octet** (8), is very stable. Atoms with an incomplete outer shell **lose, gain or share** electrons to reach it, and this is why they react.',
      v: table(['Atom', 'Configuration', 'What it tends to do'], [['Helium', '2', 'Stable duplet: inert'], ['Neon', '2, 8', 'Stable octet: inert'], ['Sodium', '2, 8, 1', 'Loses one electron to get 2, 8'], ['Chlorine', '2, 8, 7', 'Gains one electron to get 2, 8, 8']], 'Table of atoms with full and incomplete outer shells and what each tends to do'),
      n: 'Helium has a full duplet and neon has a full octet, so neither reacts. Sodium has just one electron in its outer shell and easily loses it. Chlorine needs just one more electron, so it gains one. Atoms react to complete a duplet or an octet.',
    }),
    sl('example', 'Worked example 2: reactive or inert?', {
      b: r`**Problem.** Atoms X, Y and Z have configurations 2, 8, 2 (X), 2, 8, 8 (Y) and 2, 6 (Z). Which is inert, and what do the others tend to do?

**Step 1.** Y has a full octet, so Y is **inert**.

**Step 2.** X has 2 outer electrons, so it tends to **lose 2**. Z has 6, so it tends to **gain 2** to reach an octet.`,
      v: table(['Atom', 'Outer electrons', 'Tendency'], [['X (2, 8, 2)', '2', 'Loses 2'], ['Y (2, 8, 8)', '8', 'None: inert'], ['Z (2, 6)', '6', 'Gains 2']], 'Table of three atoms and what each tends to do'),
      n: 'Look at the outer shell. Y has eight and is already stable, so it is inert. X has two outer electrons, which it can lose. Z has six, so gaining two completes the octet.',
    }),
    sl('check', 'Quick check: reactivity', {
      b: 'Look at the outermost shell.',
      v: table(['Atom', 'Configuration'], [['Fluorine', '2, 7']], 'Configuration of a fluorine atom'),
      chk: 'chk-active',
      n: 'A fluorine atom has the configuration two, seven. What does it tend to do in a reaction?',
    }),
    sl('diagram', 'Isotopes of hydrogen', {
      b: '**Isotopes** are atoms of the same element with the **same atomic number** but **different mass numbers**, because they have different numbers of neutrons.',
      v: V.hydrogen,
      n: 'Isotopes are atoms of one element that differ in the number of neutrons. Hydrogen has three: protium with no neutron, deuterium with one neutron, and tritium with two. Each has one proton and one electron, so their chemistry is alike.',
    }),
    sl('concept', 'Isotopes of carbon and chlorine', {
      b: r`The mass number is written at the top left of the symbol and the atomic number at the bottom left, for example $\ce{^{35}_{17}Cl}$ and $\ce{^{14}_{6}C}$.`,
      v: table(['Element', 'Isotope', 'Protons', 'Neutrons'], [...ISO.C.map((i) => ['Carbon', i.name, `${i.p}`, `${i.n}`]), ...ISO.Cl.map((i) => ['Chlorine', i.name, `${i.p}`, `${i.n}`])], 'Table of the isotopes of carbon and chlorine with protons and neutrons'),
      n: 'Carbon has isotopes of mass number twelve, thirteen and fourteen, each with six protons. Chlorine has two common isotopes, of mass number thirty five and thirty seven, each with seventeen protons. Only the number of neutrons changes.',
    }),
    sl('example', 'Worked example 3: why chlorine is 35.5', {
      b: `**Problem.** Chlorine is a mixture of chlorine-35 and chlorine-37 atoms in the ratio 3 : 1. Find the average mass number.\n\n**Step 1.** In every 4 atoms, 3 have mass 35 and 1 has mass 37.\n\n**Step 2.** Average = (3 × 35 + 1 × 37) ÷ 4 = 142 ÷ 4 = **${CL_AVG}**.`,
      v: table(['Isotope', 'Share', 'Contribution'], [['Chlorine-35', '3 of 4', '3 × 35 = 105'], ['Chlorine-37', '1 of 4', '1 × 37 = 37'], ['Average', '4 atoms', `142 ÷ 4 = ${CL_AVG}`]], 'Table showing how the average mass of chlorine is worked out'),
      n: 'Chlorine has two isotopes in the ratio three to one. Out of four atoms, three weigh thirty five and one weighs thirty seven. Add one hundred and five to thirty seven and divide by four. The average is thirty five point five, the value seen in tables.',
    }),
    sl('check', 'Quick check: isotopes', {
      b: 'Compare protons and neutrons.',
      v: table(['Atom', 'Protons', 'Neutrons'], [['Atom P', '6', '6'], ['Atom Q', '6', '8']], 'Protons and neutrons in two atoms P and Q'),
      chk: 'chk-iso',
      n: 'Atom P has six protons and six neutrons. Atom Q has six protons and eight neutrons. What are P and Q?',
    }),
    sl('summary', 'Summary: Part 2', {
      ul: [
        'Shells hold at most 2n² electrons; the outermost shell holds at most 8.',
        'Configurations of the first 20 elements run from 1 for hydrogen to 2, 8, 8, 2 for calcium.',
        'Atoms react to complete a duplet or an octet: noble gases already have one and are inert.',
        'Isotopes have the same atomic number but different mass numbers.',
      ],
      v: table(['Idea', 'Example'], [['Octet', 'Argon, 2, 8, 8: inert'], ['Loses electrons', 'Sodium, 2, 8, 1'], ['Gains electrons', 'Chlorine, 2, 8, 7'], ['Isotopes', 'Protium, deuterium, tritium']], 'Summary table of four ideas from Part 2 with examples'),
      n: 'To sum up Part 2. Shells hold two, eight, eighteen and thirty two electrons at most. Atoms with incomplete outer shells react to complete a duplet or an octet. Isotopes differ only in the number of neutrons.',
    }),
    sl('exam-tips', 'Exam tips: Part 2', {
      ul: [
        'Write a configuration as numbers separated by commas, for example 2, 8, 6.',
        'The last number is the number of outer-shell electrons.',
        'Name the particle that differs when you answer a question on isotopes: neutrons.',
        'Do not say isotopes have different chemical properties: their electrons are the same.',
      ],
      v: table(['Slip', 'Fix'], [['Writing 2, 8, 9 for an atom with 19 electrons', 'The third shell stops at 8: 2, 8, 8, 1'], ['Saying isotopes have different atomic numbers', 'They have the same atomic number'], ['Drawing 9 electrons in an outer shell', 'The outermost shell holds at most 8']], 'Table of three common slips in Part 2 and their fixes'),
      n: 'Exam tips. Write configurations as numbers with commas. The last number is the outer shell. In isotope questions, say that only the neutrons differ. And never put more than eight electrons in the outermost shell.',
    }),
  ],
});
