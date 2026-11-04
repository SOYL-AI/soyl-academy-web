// ch07 Structure of an Atom — notes and flashcards.
import { T, table, unit, PROV, r } from './lib.mjs';
import { V } from './decks.mjs';
import { dist, valency, outer, bySym, count } from './data.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const fm = (latex, label) => ({ latex, label });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Structure of an Atom — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Subatomic particles and how they were found',
      r`Atoms are divisible. They contain three **subatomic particles**: the **electron** (charge −1, mass about 1/1836 u, outside the nucleus), the **proton** (charge +1, mass 1 u, in the nucleus) and the **neutron** (no charge, mass about 1 u, in the nucleus).

**Electron.** In a discharge tube at low pressure, **cathode rays** leave the cathode. J. J. Thomson (1897) showed that they bend towards the positive plate, so they are negative, and that they are the same for every gas and metal.

**Proton.** Goldstein (1886) found **canal rays**, which pass through holes in the cathode and are positive. With hydrogen the particle is the lightest positive one, the proton.

**Neutron.** James Chadwick (1932) found a neutral particle of about the mass of a proton.`,
      [kt('Subatomic particle', 'A particle smaller than an atom: the electron, proton or neutron.'), kt('Cathode rays', 'A beam of electrons from the negative plate of a low-pressure discharge tube.'), kt('Canal rays', 'Positive rays that pass through holes in the cathode; with hydrogen they are protons.'), kt('Nucleus', 'The tiny, dense, positive centre of the atom, made of protons and neutrons.')],
      [],
      V.tube,
      [1],
    ),
    sec(
      "2. Thomson's and Rutherford's models",
      r`**Thomson (about 1904):** a sphere of positive charge with electrons embedded in it, like plums in a pudding. The atom is neutral because the charges are equal. It could not explain the gold-foil result.

**Rutherford (1911)** fired alpha particles at a thin gold foil. Most passed straight through (the atom is mostly empty space), a few were deflected (the positive charge is concentrated) and very few (roughly one in many thousands; books quote figures such as 1 in 8000 or 1 in 12 000) bounced back (a tiny, dense, positive **nucleus** holds almost all the mass). Electrons revolve around the nucleus.

**Limitation:** a revolving charge should radiate energy and spiral into the nucleus, so the atom should not be stable.`,
      [kt('Alpha particle', 'A fast, positively charged particle (a helium nucleus) used in the gold-foil experiment.'), kt('Plum pudding model', "Thomson's picture of electrons embedded in a positive sphere.")],
      [],
      V.rutherford,
      [1],
      [V.thomson],
    ),
    sec(
      "3. Bohr's model",
      r`Bohr (1913): (1) electrons revolve only in certain fixed paths called **shells** or energy levels, K, L, M, N ($n = 1, 2, 3, 4$); (2) an electron **does not radiate energy** while it stays in a shell; (3) each shell has a fixed energy; (4) an electron **absorbs** energy to jump to a higher shell and **emits** energy when it falls to a lower shell.

This removed the problem of Rutherford's model. **Limitation:** the model works for hydrogen but is too simple for atoms with many electrons.`,
      [kt('Shell (energy level)', 'A fixed path or energy state in which an electron can stay without radiating.'), kt('Stationary orbit', 'A shell in which an electron does not lose energy.')],
      [],
      V.bohr,
      [1],
      [table(['Model', 'Key idea', 'Limitation'], [['Thomson', 'positive sphere, embedded electrons', 'cannot explain the gold-foil result'], ['Rutherford', 'nucleus with revolving electrons', 'atom should collapse'], ['Bohr', 'fixed shells, no radiation in a shell', 'too simple for many-electron atoms']], 'Table comparing three atomic models by key idea and limitation')],
    ),
    sec(
      '4. Electron distribution and valency',
      r`The shell with number $n$ can hold at most $2n^2$ electrons: K 2, L 8, M 18, N 32. Electrons fill the nearest shell first, and the outermost shell holds at most 8 (2 for K). For the first 20 elements: K 2, L 8, M up to 8, then N.

Examples: Na 2,8,1 (valency 1); Mg 2,8,2 (2); Al 2,8,3 (3); Si 2,8,4 (4); P 2,8,5 (3); S 2,8,6 (2); Cl 2,8,7 (1); Ar 2,8,8 (0); K 2,8,8,1 (1); Ca 2,8,8,2 (2).

**Valency:** 1 to 4 outer electrons gives that number; 5 to 7 gives 8 minus it; a full outer shell (2 in K, 8 otherwise) gives 0.`,
      [kt('Electron distribution', 'The number of electrons in each shell, written for example as 2, 8, 7.'), kt('Valency', 'The combining power of an atom, decided by its outer electrons.'), kt('Outer (valence) electrons', 'The electrons in the outermost shell.')],
      [fm(r`\text{maximum electrons in shell } n = 2n^2`, 'Capacity of a shell')],
      V.shellsB,
      [2],
      [V.shellsA],
    ),
    sec(
      '5. Atomic number, mass number and ions',
      r`**Atomic number** $Z$ = number of protons (= electrons in a neutral atom). **Mass number** $A$ = protons + neutrons. **Neutrons** $= A - Z$. An atom is written $^{A}_{Z}\text{X}$.

An **ion** is a charged atom: protons stay the same. A **cation** has lost electrons (electrons $= Z - \text{charge}$); an **anion** has gained electrons (electrons $= Z + \text{charge}$). Example: $^{27}_{13}\text{Al}^{3+}$ has 13 protons, 14 neutrons and 10 electrons.`,
      [kt('Atomic number (Z)', 'The number of protons in the nucleus of an atom.'), kt('Mass number (A)', 'The total number of protons and neutrons in the nucleus.'), kt('Ion', 'An atom that has gained or lost electrons and so has a charge.')],
      [fm(r`n = A - Z`, 'Neutrons'), fm(r`\text{electrons in an ion} = Z - \text{charge}`, 'Electrons in an ion')],
      table(['Species', 'Protons', 'Neutrons', 'Electrons'], [['Sodium-23 atom', '11', '12', '11'], ['Calcium-40 atom', '20', '20', '20'], ['Chloride ion Cl-35 (1−)', '17', '18', '18'], ['Magnesium ion Mg-24 (2+)', '12', '12', '10']], 'Table of protons, neutrons and electrons in two atoms and two ions'),
      [3],
    ),
    sec(
      '6. Isotopes, isobars, uses and average atomic mass',
      r`**Isotopes:** same element (same $Z$), different mass numbers (different neutrons); same chemical properties. Examples: protium, deuterium and tritium; chlorine-35 and chlorine-37. **Isobars:** different elements (different $Z$) with the same mass number, such as argon-40, potassium-40 and calcium-40.

**Uses:** cobalt-60 (treating cancer, sterilising equipment); iodine-131 (thyroid diagnosis and treatment); uranium-235 (nuclear fuel); carbon-14 (dating fossils and old wood).

**Average atomic mass** = sum of (mass number × abundance) divided by 100. Chlorine: $(35 \times 75 + 37 \times 25) / 100 = 35.5$ u.`,
      [kt('Isotopes', 'Atoms of the same element with different mass numbers.'), kt('Isobars', 'Atoms of different elements with the same mass number.'), kt('Radioactive isotope', 'An isotope whose nucleus gives out radiation.'), kt('Average atomic mass', 'The abundance-weighted mean of the masses of the isotopes of an element.')],
      [fm(r`\text{average mass} = \dfrac{\sum (\text{mass number} \times \text{abundance in } \%)}{100}`, 'Average atomic mass')],
      V.isotopes,
      [3],
      [table(['Isotope', 'Use'], [['Cobalt-60', 'cancer treatment, sterilising equipment'], ['Iodine-131', 'thyroid diagnosis and treatment'], ['Uranium-235', 'fuel in nuclear reactors'], ['Carbon-14', 'carbon dating of fossils and wood']], 'Table of four isotopes and one use of each')],
    ),
  ],
  exam_tips_md: `- Name the scientist, year and evidence for each discovery, and pair every Rutherford observation with its conclusion.
- Give one limitation for each of the Thomson, Rutherford and Bohr models.
- Write the electron distribution first, then the valency from the outer electrons.
- For ions, say whether electrons were lost or gained; the protons never change.
- Isotopes have the same Z; isobars have the same A. A small table helps.
- Show every step of an average atomic mass calculation and give the unit u.`,
  status: 'draft',
  provenance: PROV,
};

void dist; void valency; void outer; void bySym; void count;

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Name the three subatomic particles and their charges.', 'Electron (negative), proton (positive), neutron (no charge).', 'definition', 1),
    fc(2, 'Where are the protons and neutrons found?', 'Together in the nucleus at the centre of the atom.', 'fact', 1),
    fc(3, 'What is the mass of an electron compared with a proton?', 'About 1/1836 of a proton, so almost zero.', 'fact', 1),
    fc(4, 'What are cathode rays?', 'A beam of electrons from the cathode of a low-pressure discharge tube.', 'definition', 1),
    fc(5, 'How did Thomson show that cathode rays are negative?', 'The beam bends towards a positive plate.', 'concept', 1),
    fc(6, 'What are canal rays and who found them?', 'Positive rays that pass through holes in the cathode; found by Goldstein.', 'definition', 1),
    fc(7, 'Who discovered the neutron and when?', 'James Chadwick, in 1932.', 'fact', 1),
    fc(8, 'Describe the Thomson model of the atom.', 'A sphere of positive charge with electrons embedded in it, like plums in a pudding.', 'definition', 1),
    fc(9, 'What did Rutherford fire at the gold foil?', 'Fast, positively charged alpha particles.', 'fact', 1),
    fc(10, 'Why did most alpha particles go straight through the foil?', 'Most of the atom is empty space.', 'concept', 1),
    fc(11, 'What did the rebounding alpha particles show?', 'A tiny, dense, positive nucleus holds almost all the mass.', 'concept', 1),
    fc(12, 'About what fraction of alpha particles bounced back?', 'A tiny fraction: roughly one in many thousands.', 'fact', 1),
    fc(13, 'State the limitation of the Rutherford model.', 'A revolving electron should lose energy and spiral into the nucleus, so the atom would collapse.', 'concept', 1),
    fc(14, 'What does Bohr say about an electron staying in a shell?', 'It does not radiate energy while it stays in that shell.', 'definition', 1),
    fc(15, 'What happens when an electron jumps to a higher shell?', 'It absorbs energy.', 'concept', 1),
    fc(16, 'What is the limitation of the Bohr model?', 'It works well for hydrogen but is too simple for atoms with many electrons.', 'concept', 1),
    fc(17, 'What is the maximum number of electrons in shell n?', r`$2n^2$: K 2, L 8, M 18, N 32.`, 'fact', 2),
    fc(18, 'How many electrons can the outermost shell hold at most?', '8 (2 for the K shell).', 'fact', 2),
    fc(19, 'Electron distribution of sodium (Z = 11)?', `${dist(11)}`, 'example', 2),
    fc(20, 'Electron distribution of chlorine (Z = 17)?', `${dist(17)}`, 'example', 2),
    fc(21, 'Electron distribution of potassium (Z = 19)?', `${dist(19)}`, 'example', 2),
    fc(22, 'How do you find valency from outer electrons?', 'With 1 to 4 outer electrons, valency equals that number; with 5 to 7, it is 8 minus that number; a full outer shell gives 0.', 'concept', 2),
    fc(23, 'Valency of oxygen? Of argon?', `Oxygen ${valency(8)} (2,6); argon ${valency(18)} (2,8,8).`, 'example', 2),
    fc(24, 'Define atomic number.', 'The number of protons in the nucleus of an atom.', 'definition', 3),
    fc(25, 'Define mass number.', 'The number of protons plus neutrons in the nucleus.', 'definition', 3),
    fc(26, 'How do you find the number of neutrons?', 'Mass number minus atomic number, A − Z.', 'concept', 3),
    fc(27, 'How many electrons has a cation of charge 2+?', 'Z − 2, because the atom lost two electrons.', 'concept', 3),
    fc(28, 'What are isotopes? Give an example.', 'Atoms of the same element with different mass numbers, such as chlorine-35 and chlorine-37.', 'definition', 3),
    fc(29, 'What are isobars? Give an example.', 'Atoms of different elements with the same mass number, such as argon-40 and calcium-40.', 'definition', 3),
    fc(30, 'Why do isotopes have the same chemical properties?', 'They have the same number of electrons and the same outer electrons.', 'concept', 3),
    fc(31, 'Name one use each of cobalt-60, iodine-131, uranium-235 and carbon-14.', 'Cancer treatment; thyroid disorders; nuclear fuel; dating fossils and old wood.', 'fact', 3),
    fc(32, 'How do you find the average atomic mass of an element?', 'Multiply each isotope mass by its percentage, add, and divide by 100.', 'concept', 3),
  ],
  status: 'draft',
  provenance: PROV,
};
