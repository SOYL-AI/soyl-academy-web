// ISC 11 Chemistry ch03 Subatomic Particles and Early Atomic Models: notes and flashcards.
import { T, table, unit, PROV, r } from './lib.mjs';
import { V } from './decks.mjs';

const fm = (latex, label) => ({ latex, label });
const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Subatomic Particles and Early Atomic Models — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Cathode rays and anode rays',
      r`In a discharge tube at very low pressure (about 0.01 mm of mercury) with a high voltage of several kilovolts, **cathode rays** stream from the cathode. They travel in straight lines, cast sharp shadows, make a zinc sulfide screen glow, turn a light paddle wheel, are deflected by electric and magnetic fields as negative particles, give X-rays on hitting a heavy metal, and have the **same e/m** for every gas and cathode: they are **electrons** ($e/m_\text{e} = 1.76 \times 10^{11}\ \text{C kg}^{-1}$).

With a **perforated cathode**, fast electrons knock electrons out of gas atoms; the **positive ions** drift to the cathode and some pass through the holes as **anode (canal) rays**. They bend the opposite way to cathode rays and their e/m **depends on the gas**: hydrogen gives the largest e/m, because H⁺ (the **proton**) is the lightest.`,
      [kt('Cathode rays', 'Streams of electrons from the cathode of a discharge tube at low pressure.'), kt('Anode rays', 'Streams of positive ions of the gas passing through a perforated cathode; also called canal rays.'), kt('Charge-to-mass ratio', 'The charge of a particle divided by its mass, e/m; the same for all electrons.')],
      [fm(r`\frac{e}{m_\text{e}} = 1.76 \times 10^{11}\ \text{C kg}^{-1}`, 'Charge-to-mass ratio of the electron')],
      V.discharge,
      [1],
    ),
    sec(
      '2. The neutron and the three particles',
      r`Chadwick (1932) bombarded beryllium with alpha particles. The penetrating radiation was **unaffected by electric and magnetic fields** and knocked protons out of paraffin wax: it consisted of **neutrons**, neutral particles of about the proton's mass. The change is $^{9}_{4}\text{Be} + {}^{4}_{2}\text{He} \rightarrow {}^{12}_{6}\text{C} + {}^{1}_{0}\text{n}$.

The electron was found by Thomson, its charge measured by Millikan (oil drops), the proton came from Goldstein's canal rays and Rutherford's work, and the neutron from Chadwick. Almost all the mass of an atom is in the protons and neutrons: a proton weighs about 1837 electrons.`,
      [kt('Neutron', 'An uncharged particle in the nucleus with mass slightly greater than that of the proton.'), kt('Nucleon', 'A proton or a neutron.')],
      [],
      table(['Particle', 'Symbol', 'Charge / C', 'Mass / kg', 'Mass / u', 'Discoverer'], [['Electron', r`$\ce{e-}$`, r`$-1.602 \times 10^{-19}$`, r`$9.11 \times 10^{-31}$`, '0.000549', 'Thomson (1897)'], ['Proton', r`$\ce{p+}$`, r`$+1.602 \times 10^{-19}$`, r`$1.673 \times 10^{-27}$`, '1.0073', 'Goldstein; Rutherford'], ['Neutron', 'n', '0', r`$1.675 \times 10^{-27}$`, '1.0087', 'Chadwick (1932)']], 'Table of symbol, charge, mass and discoverer of the electron, proton and neutron'),
      [1],
    ),
    sec(
      '3. Atomic number, mass number, isotopes and isobars',
      r`**Atomic number** $Z$ = number of protons (fixes the element); **mass number** $A$ = protons + neutrons; neutrons $= A - Z$. A neutral atom has $Z$ electrons. A cation has $Z$ minus its charge in electrons, an anion has $Z$ plus its charge.

**Isotopes** have the same $Z$ and different $A$; they have the same electron arrangement and so the same chemical behaviour (¹H, ²H, ³H; ³⁵Cl, ³⁷Cl; ¹²C, ¹⁴C). **Isobars** have the same $A$ and different $Z$ (¹⁴C and ¹⁴N; ²⁴Na and ²⁴Mg).`,
      [kt('Atomic number', 'The number of protons in the nucleus of an atom.'), kt('Mass number', 'The total number of protons and neutrons in the nucleus.'), kt('Isotopes', 'Atoms of the same element with different mass numbers.'), kt('Isobars', 'Atoms of different elements with the same mass number.')],
      [fm(r`\text{neutrons} = A - Z`, 'Number of neutrons'), fm(r`\text{electrons} = Z - \text{charge}`, 'Number of electrons in an ion')],
      table(['Species', 'Protons', 'Neutrons', 'Electrons'], [[r`$^{59}_{27}\text{Co}^{3+}$`, '27', '32', '24'], [r`$^{127}_{53}\text{I}^{-}$`, '53', '74', '54'], [r`$^{27}_{13}\text{Al}^{3+}$`, '13', '14', '10'], [r`$^{16}_{8}\text{O}^{2-}$`, '8', '8', '10']], 'Table of counts of protons, neutrons and electrons in four ions'),
      [2],
    ),
    sec(
      '4. Thomson’s model, Rutherford’s experiment and nuclear model',
      r`**Thomson (1904):** a sphere of uniformly spread positive charge with electrons embedded in it (plum-pudding or watermelon model); neutral overall.

**Rutherford (1911):** alpha particles ($\ce{He^2+}$) on a very thin gold foil; a zinc sulfide screen recorded the flashes. **Most passed straight through** (mostly empty space), **a few were deflected** (positive centre repels them) and **very few (about 1 in 20 000) rebounded** (charge and mass concentrated in a tiny nucleus). Nuclear radius about $10^{-15}$ m, atomic radius about $10^{-10}$ m. Electrons move outside the nucleus.

**Limitations:** an accelerating electron should radiate energy and spiral into the nucleus, so the atom would be unstable; the model gives no explanation of line spectra or of how the electrons are arranged.`,
      [kt('Nucleus', 'The tiny, dense, positively charged centre of an atom containing protons and neutrons.'), kt('Alpha particle', 'A helium nucleus, He²⁺, emitted by some radioactive substances.')],
      [],
      V.models,
      [3],
      [V.scatter],
    ),
    sec(
      '5. Black-body radiation and Planck’s quantum theory',
      r`A **black body** absorbs all radiation falling on it and emits radiation whose distribution over wavelength depends only on its temperature. As the temperature rises, the **peak moves to shorter wavelength** (red to orange to white). Wave theory predicted intensity rising without limit at short wavelengths, which is wrong.

**Planck (1900):** energy is emitted or absorbed in **quanta**; one quantum has energy $E = h\nu = hc/\lambda$, with $h = 6.626 \times 10^{-34}\ \text{J s}$. Photon energy rises with frequency. Number of photons per second $=$ power $\div$ energy of one photon. Energy of one mole of photons $= E N_\text{A}$.`,
      [kt('Black body', 'An ideal body that absorbs all the radiation falling on it and emits radiation depending only on its temperature.'), kt('Quantum', 'The smallest packet of energy that can be emitted or absorbed, $E = h\\nu$.'), kt('Planck constant', 'The constant $h = 6.626 \\times 10^{-34}\\ \\text{J s}$ linking the energy of a quantum to its frequency.')],
      [fm(r`E = h\nu = \frac{hc}{\lambda}`, 'Energy of a photon'), fm(r`c = \nu\lambda`, 'Wave equation for light'), fm(r`N = \frac{P}{E_\text{photon}}`, 'Photons emitted per second')],
      V.blackbody,
      [4],
      [V.spectrum],
    ),
    sec(
      '6. The photoelectric effect',
      r`When light of frequency above a **threshold frequency** $\nu_0$ falls on a metal, electrons are emitted **instantly**; below $\nu_0$ none is emitted however bright the light. The kinetic energy of the electrons depends on the **frequency** only, while the **number** of electrons is proportional to the **brightness**.

Einstein: one photon gives all its energy to one electron, $h\nu = W_0 + \text{KE}$, with **work function** $W_0 = h\nu_0$. A plot of KE against $\nu$ is a straight line of slope $h$. The effect shows the **particle nature of light**.`,
      [kt('Work function', 'The minimum energy needed to remove an electron from the surface of a metal, $W_0 = h\\nu_0$.'), kt('Threshold frequency', 'The lowest frequency of light that can eject electrons from a given metal.'), kt('Photoelectron', 'An electron emitted from a metal surface by light.')],
      [fm(r`\text{KE} = h\nu - h\nu_0 = h(\nu - \nu_0)`, 'Kinetic energy of a photoelectron'), fm(r`W_0 = h\nu_0 = \frac{hc}{\lambda_0}`, 'Work function')],
      V.photo,
      [4],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Changing the number of neutrons when an ion forms; only the electrons change.
- Mixing up isotopes (same atomic number) and isobars (same mass number).
- Giving an observation of the foil experiment without its conclusion.
- Writing only "unstable" as the limitation of Rutherford's model without saying why (an accelerating electron radiates energy).
- Using wavelengths in nm or frequencies in MHz without converting to SI units.
- Saying that brighter light gives photoelectrons of greater energy.

**How marks are usually awarded**
- Properties of cathode rays and anode rays: one mark for each correct property, with the evidence.
- Counting particles in ions: one mark for each species.
- Photon numericals: formula, substitution in SI units, answer with units.
- Photoelectric numericals: compare with threshold, find the photon energy, then the difference.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Under what conditions are cathode rays produced?', 'In a discharge tube at very low pressure with a high voltage across the electrodes.', 'concept', 1),
    fc(2, 'What evidence shows cathode rays are negatively charged?', 'They bend towards the positive plate in an electric field.', 'concept', 1),
    fc(3, 'Why do cathode rays prove that electrons are in every atom?', 'Their e/m is the same for every gas and every cathode metal.', 'concept', 1),
    fc(4, 'What does a paddle wheel turned by cathode rays show?', 'The rays are particles with mass and momentum.', 'concept', 1),
    fc(5, 'Value of e/m for the electron?', r`$1.76 \times 10^{11}\ \text{C kg}^{-1}$.`, 'formula', 1),
    fc(6, 'How are anode rays produced?', 'Electrons ionise the gas; positive ions pass through the holes of a perforated cathode.', 'concept', 1),
    fc(7, 'Which gas gives anode rays of the largest e/m?', 'Hydrogen: H⁺, the proton, is the lightest positive ion.', 'fact', 1),
    fc(8, 'Anode rays versus cathode rays in an electric field?', 'They bend the opposite way: anode rays are positive.', 'concept', 1),
    fc(9, 'Who discovered the neutron, and how?', 'Chadwick (1932), by bombarding beryllium with alpha particles.', 'fact', 1),
    fc(10, 'Why did Chadwick decide the radiation was neutral?', 'Electric and magnetic fields could not deflect it.', 'concept', 1),
    fc(11, 'Mass of a proton compared with an electron?', 'About 1837 times as great.', 'fact', 1),
    fc(12, 'Atomic number: definition?', 'Number of protons in the nucleus; it decides the element.', 'definition', 2),
    fc(13, 'Mass number: definition?', 'Number of protons plus neutrons.', 'definition', 2),
    fc(14, 'Number of neutrons in an atom?', 'A − Z (mass number minus atomic number).', 'formula', 2),
    fc(15, 'Electrons in the ion Al³⁺ (Z = 13)?', '10: three fewer than the 13 of the atom.', 'example', 2),
    fc(16, 'Isotopes: definition and an example?', 'Same atomic number, different mass number; ³⁵Cl and ³⁷Cl.', 'definition', 2),
    fc(17, 'Isobars: definition and an example?', 'Same mass number, different atomic number; ¹⁴C and ¹⁴N.', 'definition', 2),
    fc(18, 'Why do isotopes have the same chemistry?', 'They have the same number of electrons.', 'concept', 2),
    fc(19, 'The three isotopes of hydrogen?', 'Protium (0 neutrons), deuterium (1), tritium (2).', 'fact', 2),
    fc(20, 'Thomson’s model in one line?', 'A positive sphere with electrons embedded like seeds in a watermelon.', 'definition', 3),
    fc(21, 'What did most alpha particles do in the foil experiment?', 'Passed straight through: the atom is mostly empty space.', 'fact', 3),
    fc(22, 'What did the rebound of a few alpha particles show?', 'A tiny, dense, positive nucleus holds the charge and nearly all the mass.', 'concept', 3),
    fc(23, 'Size of the nucleus compared with the atom?', r`About $10^{-15}$ m against $10^{-10}$ m: 100 000 times smaller.`, 'fact', 3),
    fc(24, 'Main limitation of Rutherford’s model?', 'An accelerated electron should radiate and spiral into the nucleus; no stability.', 'concept', 3),
    fc(25, 'What is a black body?', 'A body that absorbs all radiation falling on it; its emission depends only on temperature.', 'definition', 4),
    fc(26, 'How does the black-body peak change on heating?', 'It moves to shorter wavelength.', 'concept', 4),
    fc(27, 'Planck’s quantum theory?', 'Energy is emitted or absorbed in quanta of energy E = hν.', 'definition', 4),
    fc(28, 'Photon energy from wavelength?', r`$E = hc/\lambda$, with $h = 6.626 \times 10^{-34}\ \text{J s}$ and $c = 3.0 \times 10^{8}\ \text{m s}^{-1}$.`, 'formula', 4),
    fc(29, 'Photons emitted per second?', 'Power in watts divided by the energy of one photon in joules.', 'formula', 4),
    fc(30, 'Einstein’s equation for photoelectrons?', 'KE = hν − hν₀ = h(ν − ν₀).', 'formula', 4),
    fc(31, 'What do brightness and frequency each control?', 'Brightness: number of electrons. Frequency: whether they come out and their KE.', 'concept', 4),
    fc(32, 'What is the work function?', 'Minimum energy to remove an electron from the metal surface, W₀ = hν₀.', 'definition', 4),
  ],
  status: 'draft',
  provenance: PROV,
};
