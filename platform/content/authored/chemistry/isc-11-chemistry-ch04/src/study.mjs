// ISC 11 Chemistry ch04 Bohr's Model, Atomic Spectra and Dual Nature: notes and flashcards.
import { T, table, unit, PROV, r } from './lib.mjs';
import { V } from './decks.mjs';

const fm = (latex, label) => ({ latex, label });
const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Bohr’s Model, Atomic Spectra and Dual Nature — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Emission and absorption spectra; line and band spectra',
      r`An **emission spectrum** is the radiation given out by excited atoms or molecules; an **absorption spectrum** is obtained when white light passes through a cool gas and certain wavelengths are removed. For one substance the dark absorption lines and the bright emission lines are at the **same wavelengths**.

A **continuous spectrum** (hot solids, the Sun) has all wavelengths without a break. A **line spectrum** has sharp lines at definite wavelengths and is produced by **atoms**; a **band spectrum** has groups of closely spaced lines forming bands and is produced by **molecules**. Because each element has its own set of lines, a line spectrum identifies the element.`,
      [kt('Emission spectrum', 'The spectrum of light given out by atoms or molecules that have been excited.'), kt('Absorption spectrum', 'A continuous spectrum crossed by dark lines at wavelengths absorbed by a cool gas.'), kt('Line spectrum', 'A spectrum of sharp lines at definite wavelengths, produced by atoms.'), kt('Band spectrum', 'A spectrum of groups of closely spaced lines that merge into bands, produced by molecules.')],
      [],
      V.spectra,
      [1],
    ),
    sec(
      '2. Bohr’s postulates and merits',
      r`**Postulates:** (1) The electron moves in certain circular **stationary orbits** and does not radiate in them. (2) The angular momentum in an allowed orbit is a whole-number multiple of $h/2\pi$: $m v r = nh/2\pi$. (3) Energy is emitted or absorbed only when the electron jumps between orbits: $\Delta E = E_2 - E_1 = h\nu$.

**Merits:** explains the stability of the atom; explains the line spectrum of hydrogen (and gives the Rydberg formula); gives radii, speeds and energies for one-electron species H, He⁺, Li²⁺, Be³⁺; introduced the quantisation of energy.`,
      [kt('Stationary orbit', 'An allowed orbit in which the electron has fixed energy and does not radiate.'), kt('Principal quantum number', 'The whole number n that labels the Bohr orbit: n = 1, 2, 3 …')],
      [fm(r`m v r = \frac{nh}{2\pi}`, 'Quantisation of angular momentum'), fm(r`\Delta E = E_2 - E_1 = h\nu`, 'Energy of the photon emitted or absorbed')],
      V.orbits,
      [2],
    ),
    sec(
      '3. Radius, speed and energy of the nth orbit (numericals; no derivation)',
      r`The derivation of these expressions is **not required**. For a species with one electron and nuclear charge $Z$ in the $n$th orbit:

$r_n = 52.9\,n^2/Z$ pm; $v_n = 2.18 \times 10^{6}\,Z/n$ m s⁻¹; $E_n = -2.18 \times 10^{-18}\,Z^2/n^2$ J. The energy is negative (zero when $n = \infty$). The **ionisation energy** from level $n$ is $2.18 \times 10^{-18} Z^2/n^2$ J per ion; for ground-state hydrogen it is 1312 kJ mol⁻¹. The energy of a jump is $\Delta E = 2.18 \times 10^{-18} Z^2 (1/n_1^2 - 1/n_2^2)$ J.`,
      [kt('Hydrogen-like species', 'An atom or ion with a single electron, such as H, He⁺, Li²⁺ or Be³⁺.'), kt('Ionisation energy', 'The energy needed to remove an electron completely from the atom or ion in a given level.')],
      [fm(r`r_n = \frac{52.9\,n^2}{Z}\ \text{pm}`, 'Radius of the nth orbit'), fm(r`v_n = 2.18 \times 10^{6}\,\frac{Z}{n}\ \text{m s}^{-1}`, 'Speed of the electron'), fm(r`E_n = -2.18 \times 10^{-18}\,\frac{Z^2}{n^2}\ \text{J}`, 'Energy of the electron')],
      table(['Species', 'n', 'Radius / pm', 'Speed / 10⁶ m s⁻¹', 'Energy / 10⁻¹⁸ J'], [['H', '1', '52.9', '2.18', '−2.18'], ['H', '2', '211.6', '1.09', '−0.545'], ['He⁺', '1', '26.5', '4.36', '−8.72'], ['He⁺', '2', '105.8', '2.18', '−2.18'], ['Li²⁺', '1', '17.6', '6.54', '−19.6']], 'Table of radius, speed and energy for H, He plus and Li two plus in the first and second orbits'),
      [2],
    ),
    sec(
      '4. Hydrogen spectrum and the Rydberg formula',
      r`Hydrogen lines form **series**, named by the lower level $n_1$: **Lyman** ($n_1 = 1$, ultraviolet), **Balmer** (2, visible), **Paschen** (3, infrared), **Brackett** (4, infrared), **Pfund** (5, infrared). The Rydberg formula is $\dfrac{1}{\lambda} = R_\text{H}\left(\dfrac{1}{n_1^2} - \dfrac{1}{n_2^2}\right)$, $n_2 > n_1$, $R_\text{H} = 1.097 \times 10^{7}\ \text{m}^{-1}$.

The **longest wavelength** of a series has $n_2 = n_1 + 1$; the **series limit** (shortest) has $n_2 = \infty$. From $n$ to the ground state an atom can give $n(n-1)/2$ different lines by all possible routes.`,
      [kt('Series limit', 'The shortest wavelength of a series, produced by a fall from n = ∞.'), kt('Wave number', 'The reciprocal of the wavelength, 1/λ, in m⁻¹.')],
      [fm(r`\frac{1}{\lambda} = R_\text{H}\left(\frac{1}{n_1^2} - \frac{1}{n_2^2}\right)`, 'Rydberg formula'), fm(r`\text{number of lines} = \frac{n(n-1)}{2}`, 'Lines from level n by all routes')],
      V.levels,
      [3],
    ),
    sec(
      '5. Defects of Bohr’s model',
      r`(1) It applies only to **one-electron species**; it ignores electron–electron repulsion and fails for He and other atoms. (2) It cannot explain the **splitting of spectral lines** in a magnetic field (Zeeman effect) or in an electric field (Stark effect). (3) It treats the electron as a **particle in a definite orbit**, ignoring its **wave nature** and contradicting **Heisenberg's uncertainty principle**. (4) It does not explain how atoms form chemical bonds.`,
      [kt('Zeeman effect', 'Splitting of spectral lines when the source is placed in a magnetic field.'), kt('Stark effect', 'Splitting of spectral lines when the source is placed in an electric field.')],
      [],
      table(['Defect', 'Reason'], [['Many-electron atoms', 'Electron–electron repulsion ignored'], ['Zeeman and Stark effects', 'Only one quantum number'], ['Definite orbit', 'Conflicts with uncertainty principle and wave nature'], ['Chemical bonds', 'Not explained']], 'Table of the defects of Bohr’s model and the reason for each'),
      [3],
    ),
    sec(
      '6. Dual nature of matter and de Broglie’s equation',
      r`Radiation shows both wave and particle behaviour. **de Broglie (1924):** every moving particle has an associated wave of wavelength $\lambda = h/mv = h/p$. For an electron $\lambda$ is about $10^{-10}$ m, so electrons are diffracted by crystals; for a ball $\lambda$ is about $10^{-34}$ m and cannot be observed. In a Bohr orbit, a **whole number of wavelengths** fits the circumference, $2\pi r = n\lambda$, which gives $m v r = nh/2\pi$.`,
      [kt('Matter wave', 'The wave associated with a moving particle, of wavelength λ = h/mv.'), kt('Momentum', 'The product of mass and velocity, p = mv.')],
      [fm(r`\lambda = \frac{h}{mv}`, 'de Broglie wavelength'), fm(r`2\pi r = n\lambda`, 'Standing-wave condition for an orbit')],
      V.waves,
      [4],
    ),
    sec(
      '7. Heisenberg’s uncertainty principle',
      r`It is impossible to measure **both the position and the momentum** of a microscopic particle exactly at the same time: $\Delta x \cdot \Delta p \geq h/4\pi$, with $\Delta p = m\,\Delta v$. The more exactly the position is fixed (small $\Delta x$), the less exactly the speed is known (large $\Delta v$). For an electron in an atom this is significant; for a large object it is negligible. The principle shows that a **definite orbit** has no meaning and leads to the idea of an **orbital**, a region of high probability.`,
      [kt('Uncertainty principle', 'The statement that the position and momentum of a microscopic particle cannot both be known exactly: Δx·Δp ≥ h/4π.'), kt('Orbital', 'A region of space around the nucleus where the probability of finding the electron is high.')],
      [fm(r`\Delta x \cdot \Delta p \geq \frac{h}{4\pi}`, 'Heisenberg’s uncertainty principle'), fm(r`\Delta v \geq \frac{h}{4\pi m\,\Delta x}`, 'Minimum uncertainty in speed')],
      table(['Particle', 'Mass', 'Δx', 'Minimum Δv'], [['Electron', r`$9.11 \times 10^{-31}$ kg`, r`$1 \times 10^{-9}$ m`, r`$5.8 \times 10^{4}$ m s⁻¹`], ['Marble', r`$1 \times 10^{-3}$ kg`, r`$1 \times 10^{-3}$ m`, r`$5.3 \times 10^{-29}$ m s⁻¹`]], 'Table comparing the minimum uncertainty in speed of an electron and a marble'),
      [4],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Writing a positive energy for a bound electron; the energy of every Bohr level is negative.
- Using Bohr's formulas for species with more than one electron.
- Forgetting to square n in the radius formula, or to divide by Z.
- Using n₂ = n₁ for the first line of a series (it is n₁ + 1), or confusing the series limit with the first line.
- Forgetting to convert grams to kilograms or nanometres to metres.
- Leaving out the 4π in the uncertainty principle.

**How marks are usually awarded**
- Postulates of Bohr's theory: one mark each.
- Radius, speed and energy numericals: formula, substitution with n and Z, answer with units.
- Rydberg formula numericals: bracket evaluated, reciprocal, conversion to nm, region named.
- de Broglie and uncertainty numericals: formula, SI units, result, and a one-line comment on size.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'What is an emission spectrum?', 'Light given out by excited atoms: bright lines on a dark background.', 'definition', 1),
    fc(2, 'What is an absorption spectrum?', 'A continuous spectrum with dark lines where a cool gas has absorbed light.', 'definition', 1),
    fc(3, 'How are the lines of the emission and absorption spectra of an element related?', 'They occur at the same wavelengths.', 'concept', 1),
    fc(4, 'Line spectrum: source?', 'Excited atoms (sodium, hydrogen, neon).', 'fact', 1),
    fc(5, 'Band spectrum: source?', 'Excited molecules; closely spaced lines form bands.', 'fact', 1),
    fc(6, 'Which sources give a continuous spectrum?', 'Hot solids such as a bulb filament, and the Sun.', 'fact', 1),
    fc(7, 'Why can a line spectrum identify an element?', 'The set of lines is fixed by the element’s own energy levels.', 'concept', 1),
    fc(8, 'Bohr’s first postulate?', 'Electrons move in stationary orbits and do not radiate in them.', 'definition', 2),
    fc(9, 'Bohr’s quantum condition?', 'm v r = nh/2π, n = 1, 2, 3 …', 'formula', 2),
    fc(10, 'Energy of a photon in a jump?', 'ΔE = E₂ − E₁ = hν.', 'formula', 2),
    fc(11, 'Two merits of Bohr’s model?', 'Explains stability and the hydrogen line spectrum (and one-electron ions).', 'fact', 2),
    fc(12, 'Radius of the nth orbit?', r`$r_n = 52.9\,n^2/Z$ pm.`, 'formula', 2),
    fc(13, 'Speed of the electron in the nth orbit?', r`$v_n = 2.18 \times 10^{6}\,Z/n$ m s⁻¹.`, 'formula', 2),
    fc(14, 'Energy of the nth level?', r`$E_n = -2.18 \times 10^{-18}\,Z^2/n^2$ J.`, 'formula', 2),
    fc(15, 'Why is the energy of a Bohr level negative?', 'A bound electron has less energy than a free one, taken as zero at n = ∞.', 'concept', 2),
    fc(16, 'Radius of the second orbit of hydrogen?', r`$52.9 \times 4 = 211.6$ pm.`, 'example', 2),
    fc(17, 'Ionisation energy of ground-state hydrogen?', r`$2.18 \times 10^{-18}$ J per atom, 1312 kJ mol⁻¹.`, 'fact', 2),
    fc(18, 'Series with n₁ = 1, 2, 3?', 'Lyman (ultraviolet), Balmer (visible), Paschen (infrared).', 'fact', 3),
    fc(19, 'Rydberg formula?', r`$1/\lambda = R_\text{H}(1/n_1^2 - 1/n_2^2)$, $R_\text{H} = 1.097 \times 10^{7}\ \text{m}^{-1}$.`, 'formula', 3),
    fc(20, 'Longest-wavelength line of a series?', 'n₂ = n₁ + 1.', 'concept', 3),
    fc(21, 'Series limit?', 'The shortest wavelength of a series, from n₂ = ∞.', 'definition', 3),
    fc(22, 'Number of lines from level n by all routes?', 'n(n − 1)/2; six lines from n = 4.', 'formula', 3),
    fc(23, 'Wavelength of the first Balmer line?', 'About 656 nm (red), from n = 3 to n = 2.', 'fact', 3),
    fc(24, 'Defects of Bohr’s model?', 'Only one-electron species; no Zeeman or Stark splitting; ignores wave nature and uncertainty principle.', 'concept', 3),
    fc(25, 'What are the Zeeman and Stark effects?', 'Splitting of spectral lines in a magnetic field and in an electric field.', 'definition', 3),
    fc(26, 'de Broglie’s relation?', 'λ = h/mv: every moving particle has a wavelength.', 'formula', 4),
    fc(27, 'Why is the wave nature of a ball not seen?', 'Its mass is large so λ is about 10⁻³⁴ m, far too small to detect.', 'concept', 4),
    fc(28, 'Standing-wave condition in a Bohr orbit?', '2πr = nλ: a whole number of wavelengths round the orbit.', 'concept', 4),
    fc(29, 'Heisenberg’s uncertainty principle?', 'Δx · Δp ≥ h/4π: position and momentum cannot both be exact.', 'definition', 4),
    fc(30, 'Effect of reducing Δx on Δv?', 'Δv increases: they are inversely related.', 'concept', 4),
    fc(31, 'What replaces the Bohr orbit after the uncertainty principle?', 'The orbital: a region of high probability of finding the electron.', 'concept', 4),
  ],
  status: 'draft',
  provenance: PROV,
};
