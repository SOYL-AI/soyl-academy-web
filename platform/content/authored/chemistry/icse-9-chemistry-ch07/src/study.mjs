// ICSE 9 Chemistry ch07 notes and flashcards.
import { T, unit, PROV, table, svgV } from '../../icse-9-chemistry-ch01/src/lib.mjs';
import { V } from './decks.mjs';
import { SODIUM } from './svgs.mjs';
import { EL, cfg, valence, valency, CL_AVG } from './calc.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas: [], visual, visuals, topic_ids: topics.map(T) });
const cap = (s) => s[0].toUpperCase() + s.slice(1);
const cfgTable = EL.map((e) => `| ${e.z} | ${cap(e.name)} | ${e.sym} | ${cfg(e.z)} | ${valence(e.z)} | ${valency(e.z)} |`).join('\n');

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Atomic Structure — Notes',
  language: 'en',
  sections: [
    sec(
      '1. The atom and its constituents',
      `An atom has a small, dense **nucleus** holding **protons** and **neutrons**, with **electrons** moving round it.

| Particle | Symbol | Charge | Relative mass | Location |
|---|---|---|---|---|
| Proton | p | +1 | 1 | Nucleus |
| Neutron | n | 0 | 1 | Nucleus |
| Electron | e⁻ | −1 | about 1/1840 | Outside the nucleus |

- **Atomic number (Z)** = number of protons. It decides the element. In a neutral atom, electrons = protons.
- **Mass number (A)** = protons + neutrons. Neutrons = A − Z.
- Symbol: $\\ce{^{A}_{Z}X}$, for example $\\ce{^{31}_{15}P}$ is phosphorus with 15 protons, 16 neutrons and 15 electrons.
- An **ion** has gained or lost electrons: $\\ce{Ca^2+}$ (Z = 20) has 20 protons, 20 neutrons (A = 40) and **18** electrons. The nucleus is unchanged.

The electron was identified by J. J. Thomson, the proton by Goldstein and the neutron by Chadwick. The mass of an electron is so small (about one eighteen-hundred-and-fortieth of a proton) that the mass of an atom is taken as the mass of its nucleus.`,
      [kt('Atomic number', 'The number of protons in the nucleus of an atom.'), kt('Mass number', 'The total number of protons and neutrons in the nucleus of an atom.')],
      table(['Quantity', 'How to find it'], [['Protons', 'Atomic number'], ['Electrons (neutral atom)', 'Atomic number'], ['Neutrons', 'Mass number − atomic number']], 'Table showing how to find protons, electrons and neutrons'),
      [1],
    ),
    sec(
      "2. Rutherford's gold foil experiment",
      `Rutherford and his co-workers directed fast, positively charged **alpha particles** at a very thin gold foil, with a fluorescent screen round it.

| Observation | Conclusion |
|---|---|
| Most alpha particles went straight through | Most of the atom is empty space |
| A few were deflected through small angles | The centre of the atom is positive |
| Very few (about one in twenty thousand in the usual account) rebounded | The positive charge and nearly all the mass are in a very small, dense **nucleus** |

**Rutherford's model:** an atom has a tiny, positively charged nucleus at the centre, and electrons revolve round it, much as planets go round the sun.

**Merits:** it showed that an atom has a nucleus and that most of it is empty space.

**Limitation (demerit):** a charged electron moving in a circle should lose energy continuously and spiral into the nucleus, so the atom should collapse; but atoms are stable. The model also gave no account of how the electrons are arranged.`,
      [kt('Nucleus', 'The tiny, dense, positively charged centre of an atom, containing the protons and neutrons.'), kt('Alpha particle', 'A fast, positively charged particle used to probe atoms in the gold foil experiment.')],
      V.scatter,
      [2],
    ),
    sec(
      "3. Bohr's model of the atom (simplified)",
      `Bohr removed the limitation of Rutherford's model with these postulates:

1. Electrons revolve round the nucleus only in certain fixed circular paths called **orbits** (shells or energy levels), named **K, L, M, N** outwards from the nucleus.
2. Each orbit has a fixed energy, which increases with distance from the nucleus.
3. An electron does **not** lose energy while it stays in an orbit, so it does not fall into the nucleus and the atom is stable.
4. An electron absorbs energy when it jumps to a higher orbit and gives out energy when it falls to a lower orbit.

Only these ideas are required at this level; Bohr's mathematical expressions are not part of the syllabus.`,
      [kt('Orbit (shell)', 'A fixed circular path of fixed energy in which an electron moves round the nucleus.')],
      svgV(SODIUM, 'Bohr model of a sodium atom with nucleus and three shells'),
      [3],
    ),
    sec(
      '4. Distribution of electrons in orbits',
      `The maximum number of electrons in the shell number **n** is **2n²**: K 2, L 8, M 18, N 32.

Rules for the first 20 elements:
- Fill the K shell first (2), then the L shell (8), then the M shell.
- The outermost shell holds at most **8** electrons (**octet**); the K shell holds at most **2** (**duplet**).
- After 2, 8, 8 the next electrons go into the N shell (potassium 2, 8, 8, 1; calcium 2, 8, 8, 2).

| Z | Element | Symbol | Configuration | Outer electrons | Valency |
|---|---|---|---|---|---|
${cfgTable}

**Chemical activity.** A full outer shell (duplet or octet) is stable, so helium, neon and argon are inert. Atoms with an incomplete outer shell react by **losing**, **gaining** or **sharing** electrons to reach the nearest stable arrangement: sodium (2, 8, 1) loses one electron, chlorine (2, 8, 7) gains one and oxygen (2, 6) gains two. The number of electrons lost, gained or shared is the **valency**.`,
      [kt('Octet rule', 'Atoms tend to have eight electrons in the outermost shell (two in the K shell, a duplet).'), kt('Valency', 'The number of electrons an atom loses, gains or shares to complete its outer shell.')],
      V.shellrow,
      [4],
    ),
    sec(
      '5. Isotopes of hydrogen, carbon and chlorine',
      `**Isotopes** are atoms of the same element with the **same atomic number** but **different mass numbers** (different numbers of neutrons). They have the same chemical properties because they have the same number of electrons.

| Element | Isotope | Protons | Neutrons | Mass number |
|---|---|---|---|---|
| Hydrogen | Protium | 1 | 0 | 1 |
| Hydrogen | Deuterium | 1 | 1 | 2 |
| Hydrogen | Tritium | 1 | 2 | 3 |
| Carbon | Carbon-12 | 6 | 6 | 12 |
| Carbon | Carbon-13 | 6 | 7 | 13 |
| Carbon | Carbon-14 | 6 | 8 | 14 |
| Chlorine | Chlorine-35 | 17 | 18 | 35 |
| Chlorine | Chlorine-37 | 17 | 20 | 37 |

Written as $\\ce{^{1}_{1}H}$, $\\ce{^{2}_{1}H}$, $\\ce{^{3}_{1}H}$; $\\ce{^{12}_{6}C}$, $\\ce{^{13}_{6}C}$, $\\ce{^{14}_{6}C}$; $\\ce{^{35}_{17}Cl}$, $\\ce{^{37}_{17}Cl}$.

Chlorine's mass number in tables is **${CL_AVG}** because natural chlorine is a mixture of chlorine-35 and chlorine-37 in the ratio about 3 : 1: (3 × 35 + 1 × 37) ÷ 4 = ${CL_AVG}. Books give the ratio as 3 : 1 or as about 75 percent and 25 percent; the values are approximate.`,
      [kt('Isotopes', 'Atoms of the same element with the same atomic number but different mass numbers.')],
      V.hydrogen,
      [5],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Giving neutrons as the atomic number or forgetting to subtract.
- Changing the protons when an ion forms; only the electrons change.
- Writing a configuration such as 2, 8, 9 for 19 electrons: the third shell stops at 8 (2, 8, 8, 1).
- Saying that alpha particles are negative, or that most of them rebounded.
- Saying isotopes have different chemical properties.
- Writing Bohr's mathematical expressions: they are not required.

**How marks are usually awarded**
- 1 mark: a number of particles, a configuration, a name or a definition.
- 2 marks: two observations with their conclusions, or two postulates; a reason for reactivity.
- 3 marks: three configurations or isotope data written in a table.
- 10-mark structured question: a data set or a diagram with parts of 2 to 4 marks: particle counts, a configuration, a labelled Bohr diagram, a conclusion from an experiment.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Where are protons, neutrons and electrons found?', 'Protons and neutrons in the nucleus; electrons outside it.', 'fact', 1),
    fc(2, 'Charge and relative mass of a proton?', 'Charge +1; relative mass 1.', 'fact', 1),
    fc(3, 'Charge and relative mass of a neutron?', 'No charge; relative mass 1.', 'fact', 1),
    fc(4, 'Charge and relative mass of an electron?', 'Charge −1; relative mass about 1/1840.', 'fact', 1),
    fc(5, 'What is the atomic number?', 'The number of protons in an atom.', 'definition', 1),
    fc(6, 'What is the mass number?', 'Protons plus neutrons.', 'definition', 1),
    fc(7, 'How do you find the number of neutrons?', 'Mass number minus atomic number.', 'formula', 1),
    fc(8, 'Particles in a sulphur atom, Z = 16, A = 32?', '16 protons, 16 neutrons, 16 electrons.', 'example', 1),
    fc(9, 'Electrons in the ion Ca²⁺ (Z = 20)?', '18: it has lost two electrons.', 'example', 1),
    fc(10, "Describe Rutherford's experiment.", 'Alpha particles fired at a very thin gold foil, with a screen round it.', 'concept', 2),
    fc(11, 'What did the straight passage of most alpha particles show?', 'Most of the atom is empty space.', 'concept', 2),
    fc(12, 'What did the deflection of a few alpha particles show?', 'The centre of the atom is positively charged.', 'concept', 2),
    fc(13, 'What did the rebounding of very few particles show?', 'A very small, dense nucleus holds the positive charge and the mass.', 'concept', 2),
    fc(14, "A limitation of Rutherford's model?", 'A revolving electron should lose energy and spiral into the nucleus.', 'concept', 2),
    fc(15, "Bohr's shells: names and order?", 'K, L, M, N outwards from the nucleus.', 'fact', 3),
    fc(16, 'Does an electron lose energy in its orbit (Bohr)?', 'No: it loses or gains energy only when it jumps between orbits.', 'concept', 3),
    fc(17, 'How does Bohr overcome the limitation of Rutherford?', 'Electrons in fixed orbits do not radiate energy, so they do not fall into the nucleus.', 'concept', 3),
    fc(18, 'What is the 2n² rule?', 'The shell number n holds at most 2n² electrons: 2, 8, 18, 32.', 'formula', 4),
    fc(19, 'Maximum electrons in the outermost shell?', 'Eight (two for the K shell).', 'fact', 4),
    fc(20, 'Configuration of sodium and chlorine?', 'Sodium 2, 8, 1; chlorine 2, 8, 7.', 'fact', 4),
    fc(21, 'Configuration of potassium and calcium?', 'Potassium 2, 8, 8, 1; calcium 2, 8, 8, 2.', 'fact', 4),
    fc(22, 'Configuration of argon and its reactivity?', '2, 8, 8; inert, since it has a full octet.', 'fact', 4),
    fc(23, 'What is a duplet and an octet?', 'A full K shell of 2, and a full outer shell of 8.', 'definition', 4),
    fc(24, 'Why does an atom react?', 'To complete its outer shell by losing, gaining or sharing electrons.', 'concept', 4),
    fc(25, 'What is the valency of oxygen (2, 6)?', 'Two: it gains two electrons.', 'example', 4),
    fc(26, 'What are isotopes?', 'Atoms of an element with the same atomic number but different mass numbers.', 'definition', 5),
    fc(27, 'The three isotopes of hydrogen?', 'Protium (0 neutrons), deuterium (1) and tritium (2).', 'fact', 5),
    fc(28, 'The isotopes of carbon?', 'Carbon-12, carbon-13 and carbon-14, with 6, 7 and 8 neutrons.', 'fact', 5),
    fc(29, 'The isotopes of chlorine, and why 35.5?', 'Chlorine-35 and chlorine-37 in the ratio about 3 : 1 give an average of 35.5.', 'concept', 5),
    fc(30, 'Exam tip: isotopes', 'Same protons and electrons, different neutrons: same chemical properties.', 'exam-tip', 5),
  ],
  status: 'draft',
  provenance: PROV,
};
