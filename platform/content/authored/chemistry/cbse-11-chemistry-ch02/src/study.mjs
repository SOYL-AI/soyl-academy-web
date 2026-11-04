// ch02 Structure of Atom — notes and flashcards.
import { T, table, flow, unit, PROV, r } from './lib.mjs';
import { V } from './decks.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const fm = (latex, label) => ({ latex, label });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Structure of Atom — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Subatomic particles and early atomic models',
      r`**Electron** (Thomson, cathode rays; $e/m = 1.76 \times 10^{11}\ \text{C kg}^{-1}$; charge by Millikan), **proton** (canal rays) and **neutron** (Chadwick, 1932). Atomic number $Z$ = protons; mass number $A$ = protons + neutrons. **Isotopes:** same $Z$, different $A$. **Isobars:** same $A$, different $Z$.

**Thomson:** positive sphere with embedded electrons. **Rutherford** ($\alpha$-scattering on gold foil): most particles undeflected (empty space), few deflected (concentrated positive charge), very few rebound (small dense nucleus, about $10^{-15}$ m versus atom $10^{-10}$ m). Limitations: a circling electron should spiral inward; line spectra unexplained.`,
      [kt('Isotopes', 'Atoms with the same atomic number but different mass numbers.'), kt('Isobars', 'Atoms with the same mass number but different atomic numbers.'), kt('Nucleus', 'The tiny, dense, positively charged centre of the atom.')],
      [],
      V.scatter,
      [1],
    ),
    sec(
      '2. Electromagnetic radiation, Planck and the photoelectric effect',
      r`$c = \nu\lambda$ with $c = 3.0 \times 10^{8}\ \text{m s}^{-1}$; wavenumber $\bar{\nu} = 1/\lambda$. Planck: $E = h\nu = hc/\lambda$, $h = 6.626 \times 10^{-34}\ \text{J s}$.

**Photoelectric effect:** no emission below the threshold frequency $\nu_0$, whatever the intensity; above it, $h\nu = h\nu_0 + \text{KE}$. Intensity changes the number of electrons, frequency changes their kinetic energy. This supports the photon (particle) picture.`,
      [kt('Quantum', 'The smallest packet of energy that can be emitted or absorbed, $E = h\\nu$.'), kt('Threshold frequency', 'Minimum frequency of light that can eject electrons from a metal surface.'), kt('Wavenumber', 'The reciprocal of wavelength, $1/\\lambda$.')],
      [fm(r`c = \nu\lambda`, 'Wave relation'), fm(r`E = h\nu = \dfrac{hc}{\lambda}`, 'Photon energy'), fm(r`\text{KE} = h(\nu - \nu_0)`, 'Photoelectron kinetic energy')],
      table(['Region', 'Order of wavelength'], [['Radio', 'above 0.1 m'], ['Visible', '400 to 700 nm'], ['Ultraviolet', '10 to 400 nm'], ['X-rays', '0.01 to 10 nm']], 'Table of regions of the electromagnetic spectrum'),
      [2],
    ),
    sec(
      '3. Hydrogen spectrum and Bohr’s model',
      r`Rydberg: $\bar{\nu} = 1.097 \times 10^{7}\ \text{m}^{-1}\,(1/n_1^2 - 1/n_2^2)$. Series: Lyman ($n_1 = 1$, UV), Balmer (2, visible), Paschen (3, IR), Brackett (4), Pfund (5).

**Bohr:** stationary orbits, $m_\text{e} v r = nh/2\pi$; $E_n = -2.18 \times 10^{-18}\,Z^2/n^2$ J; $r_n = 52.9\,n^2/Z$ pm; emission or absorption of $h\nu = E_2 - E_1$. Works for H, He⁺, Li²⁺; fails for many-electron atoms, line splitting in fields, and ignores wave nature.`,
      [kt('Line spectrum', 'A spectrum with only certain sharp wavelengths, characteristic of an element.'), kt('Stationary orbit', 'An allowed Bohr orbit in which the electron does not radiate energy.')],
      [fm(r`E_n = -\dfrac{2.18 \times 10^{-18}}{n^2}\ \text{J}`, 'Hydrogen energy levels'), fm(r`r_n = 52.9\,n^2\ \text{pm}`, 'Bohr radius')],
      V.energy,
      [2],
    ),
    sec(
      '4. Wave nature of matter and uncertainty',
      r`**de Broglie:** $\lambda = h/mv$; significant for electrons and other microscopic particles, negligible for a cricket ball ($\sim 10^{-34}$ m). **Heisenberg:** $\Delta x\,\Delta p \ge h/4\pi$; for an electron confined to about an atom the uncertainty in speed is of the order $10^{6}\ \text{m s}^{-1}$, so definite orbits cannot exist.

**Orbital:** region of high probability $\psi^2$ of finding the electron; each holds at most two electrons.`,
      [kt('de Broglie wavelength', 'The wavelength $h/mv$ associated with a moving particle.'), kt('Orbital', 'A region of space around the nucleus where the probability of finding an electron is high.')],
      [fm(r`\lambda = \dfrac{h}{mv}`, 'de Broglie relation'), fm(r`\Delta x\,\Delta p \ge \dfrac{h}{4\pi}`, 'Uncertainty principle')],
      table(['Object', 'Wavelength'], [['Electron at $10^6$ m/s', '0.73 nm'], ['Cricket ball', r`$10^{-34}$ m`]], 'Table of the de Broglie wavelength of an electron and a cricket ball'),
      [3],
    ),
    sec(
      '5. Quantum numbers and orbital shapes',
      r`**n** = 1, 2, 3 … (shell); **l** = 0 to $n-1$ (s, p, d, f); **mₗ** = $-l$ to $+l$ ($2l + 1$ orbitals); **mₛ** = ±½. A shell holds $n^2$ orbitals and $2n^2$ electrons.

**Shapes:** s spherical; p dumbbell (3 orbitals); d four-lobed or lobes with ring (5 orbitals). **Nodes:** radial $= n - l - 1$; angular $= l$; total $= n - 1$.`,
      [kt('Azimuthal quantum number', '$l$: fixes the shape of the subshell (0 s, 1 p, 2 d, 3 f).'), kt('Node', 'A region where the probability of finding the electron is zero.')],
      [fm(r`\text{radial nodes} = n - l - 1`, 'Radial nodes'), fm(r`\text{angular nodes} = l`, 'Angular nodes')],
      V.orbitals,
      [4],
    ),
    sec(
      '6. Electronic configuration',
      r`**Aufbau:** fill in order of increasing $n + l$ (lower $n$ first on a tie): 1s 2s 2p 3s 3p 4s 3d 4p 5s 4d 5p 6s … **Pauli:** no two electrons share all four quantum numbers (max two per orbital, opposite spins). **Hund:** fill degenerate orbitals singly with parallel spins first.

**Exceptions:** Cr $[\text{Ar}]\,3d^5 4s^1$ and Cu $[\text{Ar}]\,3d^{10} 4s^1$ (half-filled and filled subshells are extra stable: symmetry and exchange energy). Cations lose the outermost (highest $n$) electrons first: Fe³⁺ is $[\text{Ar}]\,3d^5$.`,
      [kt('Aufbau principle', 'Electrons fill the lowest-energy available orbitals first.'), kt('Pauli exclusion principle', 'No two electrons in an atom have the same set of four quantum numbers.'), kt('Hund’s rule', 'Degenerate orbitals are singly occupied, with parallel spins, before pairing.')],
      [],
      V.boxes,
      [5],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Using nm or MHz directly instead of converting to SI units.
- Forgetting that only frequency (not intensity) decides the kinetic energy of photoelectrons.
- Writing positive energies for bound electron levels.
- Allowing l = n, or mₗ outside −l to +l.
- Writing Cr as 3d⁴ 4s² or Cu as 3d⁹ 4s².
- Removing 3d electrons before 4s electrons when forming ions.

**How marks are usually awarded**
- 1-mark items: a definition, value or single rule.
- Numericals (2–3 marks): formula (1), substitution with SI units (1), answer with unit (1).
- Quantum-number questions: allowed values (1), count of orbitals (1), reasoning (1).
- Configuration answers: correct order (1), reason for exceptions (1).`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Who discovered the neutron and when?', 'Chadwick, 1932, by bombarding beryllium with alpha particles.', 'fact', 1),
    fc(2, 'Thomson’s model in one line?', 'A positive sphere with electrons embedded in it (plum pudding).', 'definition', 1),
    fc(3, 'What did most alpha particles do in Rutherford’s experiment, and what does it show?', 'They passed straight through: the atom is mostly empty space.', 'concept', 1),
    fc(4, 'What did the rebound of very few alpha particles show?', 'A small, dense, positively charged nucleus.', 'concept', 1),
    fc(5, 'Two limitations of Rutherford’s model?', 'It cannot explain the stability of the atom or line spectra.', 'concept', 1),
    fc(6, 'Isotopes versus isobars?', 'Isotopes: same Z, different A. Isobars: same A, different Z.', 'definition', 1),
    fc(7, 'Relation between speed, frequency and wavelength of light?', r`$c = \nu\lambda$`, 'formula', 2),
    fc(8, 'Planck’s relation?', r`$E = h\nu$, with $h = 6.626 \times 10^{-34}$ J s.`, 'formula', 2),
    fc(9, 'What is wavenumber?', r`$\bar{\nu} = 1/\lambda$, in m⁻¹.`, 'definition', 2),
    fc(10, 'Photoelectric equation?', r`$h\nu = h\nu_0 + \tfrac{1}{2}m_\text{e}v^2$`, 'formula', 2),
    fc(11, 'What does increasing the intensity of light do in the photoelectric effect?', 'Increases the number of electrons emitted, not their kinetic energy.', 'concept', 2),
    fc(12, 'Which photon has more energy: red or violet?', 'Violet (shorter wavelength, higher frequency).', 'fact', 2),
    fc(13, 'Bohr energy of hydrogen level n?', r`$E_n = -2.18 \times 10^{-18} / n^2$ J`, 'formula', 2),
    fc(14, 'Bohr radius of hydrogen orbit n?', r`$r_n = 52.9\,n^2$ pm`, 'formula', 2),
    fc(15, 'Which series is visible in hydrogen?', 'Balmer (electron falls to n = 2).', 'fact', 2),
    fc(16, 'Rydberg formula?', r`$\bar{\nu} = 1.097 \times 10^{7}\,(1/n_1^2 - 1/n_2^2)$ m⁻¹`, 'formula', 2),
    fc(17, 'Number of spectral lines when an electron falls from level n?', r`$n(n-1)/2$ if all transitions occur.`, 'concept', 2),
    fc(18, 'Limitations of Bohr’s model?', 'Fails for many-electron atoms, line splitting in fields, ignores wave nature and uncertainty.', 'concept', 2),
    fc(19, 'de Broglie relation?', r`$\lambda = h/mv$`, 'formula', 3),
    fc(20, 'Why can’t we see the wave nature of a cricket ball?', 'Its wavelength (about 10⁻³⁴ m) is far too small to detect.', 'concept', 3),
    fc(21, 'Heisenberg’s uncertainty principle?', r`$\Delta x\,\Delta p \ge h/4\pi$`, 'formula', 3),
    fc(22, 'Orbit versus orbital?', 'Orbit: fixed circular path (Bohr). Orbital: region of high probability of finding the electron.', 'definition', 3),
    fc(23, 'Allowed values of l and mₗ?', 'l = 0 to n − 1; mₗ = −l to +l.', 'fact', 4),
    fc(24, 'How many orbitals and electrons in shell n?', r`$n^2$ orbitals and $2n^2$ electrons.`, 'formula', 4),
    fc(25, 'Radial and angular nodes?', 'Radial nodes = n − l − 1; angular nodes = l.', 'formula', 4),
    fc(26, 'Shapes of s, p and d orbitals?', 'Spherical; dumbbell; four-lobed (or two lobes with a ring).', 'diagram', 4),
    fc(27, 'Aufbau (n + l) order from 4s?', '4s < 3d < 4p < 5s < 4d < 5p < 6s.', 'fact', 5),
    fc(28, 'Pauli exclusion principle?', 'No two electrons in an atom have the same four quantum numbers.', 'definition', 5),
    fc(29, 'Hund’s rule?', 'Fill degenerate orbitals singly with parallel spins before pairing.', 'definition', 5),
    fc(30, 'Configurations of Cr and Cu?', 'Cr: [Ar] 3d⁵ 4s¹. Cu: [Ar] 3d¹⁰ 4s¹.', 'example', 5),
    fc(31, 'Why are half-filled and filled subshells extra stable?', 'Symmetrical distribution and greater exchange energy.', 'concept', 5),
    fc(32, 'Exam tip: which electrons does an atom lose first?', 'Those of the highest n, so 4s before 3d.', 'exam-tip', 5),
  ],
  status: 'draft',
  provenance: PROV,
};
