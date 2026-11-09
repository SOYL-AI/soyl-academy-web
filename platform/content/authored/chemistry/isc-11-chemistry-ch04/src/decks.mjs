// ISC 11 Chemistry ch04 Bohr's Model, Atomic Spectra and Dual Nature: two decks. Part 1 (t01-t02) emission and absorption,
// line and band spectra, Bohr's postulates and numericals; Part 2 (t03-t04) hydrogen series, Rydberg formula, defects of
// Bohr's model, de Broglie and Heisenberg.
import { sl, deck, table, flow, svgV, r } from './lib.mjs';
import { SPECTRA, ORBITS, LEVELS, WAVES } from './svgs.mjs';

const h = 6.626e-34;
const c = 3.0e8;
const me = 9.11e-31;
const NA = 6.022e23;
const RH = 1.097e7;
const f2 = (x) => x.toFixed(2);
const f1 = (x) => x.toFixed(1);
const lam = (n1, n2) => 1e9 / (RH * (1 / n1 ** 2 - 1 / n2 ** 2));

export const V = {
  spectra: svgV(SPECTRA, 'Continuous, line emission, line absorption and band emission spectra on a wavelength scale, with the same four hydrogen lines in emission and absorption', 'Hydrogen lines at 410, 434, 486 and 656 nm.'),
  orbits: svgV(ORBITS, 'Bohr orbits for n = 1 to 4 drawn to scale for hydrogen and for He+, showing the radius growing as n squared and halving for Z = 2', 'Radius r = 52.9 n² / Z pm.'),
  levels: svgV(LEVELS, 'Energy-level diagram of hydrogen drawn to scale with Lyman, Balmer and Paschen series arrows and the wavelength of the first line of each', 'E = −2.18 × 10⁻¹⁸ J / n².'),
  waves: svgV(WAVES, 'An electron wave with three whole wavelengths round an orbit joins up and is allowed, while a wave with three and a half wavelengths does not join and is not allowed', 'Circumference = a whole number of wavelengths.'),
};

// ---- worked-example data
const heR = (52.9 * 16) / 2;
const heV = (2.18 * 2) / 4;
const heE = (-2.18 * 4) / 16;
const dE14 = 2.18 * (1 - 1 / 16);
const ionJ = 2.18e-18 * NA;
const lam14 = (h * c) / (dE14 * 1e-18) * 1e9;
const lam62 = lam(2, 6);
const wn62 = RH * (1 / 4 - 1 / 36);
const lamE = h / (me * 1.5e6);
const lamCar = h / (1500 * 20);
const dvE = h / (4 * Math.PI * me * 1.0e-9);
const dvMarble = h / (4 * Math.PI * 1.0e-3 * 1.0e-3);

export const deck1 = deck({
  part: 1,
  title: 'Bohr’s Model, Atomic Spectra and Dual Nature — Part 1: Spectra and the Bohr model',
  goals: [
    'Distinguish emission from absorption spectra and line from band spectra',
    'State the postulates and merits of Bohr’s model',
    'Calculate the radius, speed and energy of the electron in the nth orbit of hydrogen and hydrogen-like ions from the given formulas',
  ],
  slides: [
    sl('title', 'Atomic spectra and the Bohr model', {
      b: 'Part 1: what the colours of light from atoms tell us, and how Bohr explained them with energy levels.',
      v: V.spectra,
      n: 'Welcome. When atoms are heated or excited by electricity they give out light, and the pattern of colours is different for every element. In this part we look at the different kinds of spectrum, then at Niels Bohr’s idea that electrons occupy fixed energy levels, which explained the spectrum of hydrogen so well.',
    }),
    sl('concept', 'Emission and absorption spectra', {
      b: 'An **emission spectrum** is the light given out by excited atoms: **bright lines on a dark background**. An **absorption spectrum** forms when white light passes through a cool gas: **dark lines on a bright continuous background**. For one element the dark lines fall at **the same wavelengths** as its bright lines.',
      v: table(['Property', 'Emission spectrum', 'Absorption spectrum'], [['How obtained', 'Excite atoms by heat or electricity', 'Pass white light through cool gas'], ['Appearance', 'Bright lines on dark background', 'Dark lines on bright background'], ['Line positions', 'Fixed for the element', 'Same wavelengths as emission'], ['Use', 'Identify elements in a sample', 'Find elements in stars and cool gas clouds']], 'Table comparing emission and absorption spectra'),
      n: 'An emission spectrum is what you see when excited atoms give out light: a few bright lines on a dark background. An absorption spectrum is made by passing white light through a cool gas. The gas takes out certain colours and leaves dark lines. The dark lines of an element sit at exactly the same places as its bright lines.',
    }),
    sl('concept', 'Line spectra and band spectra', {
      b: 'A **line spectrum** is made of sharp lines at definite wavelengths, produced by **excited atoms**. A **band spectrum** is made of groups of closely spaced lines that merge into bands, produced by **excited molecules**. A hot solid gives a **continuous spectrum**.',
      v: table(['Spectrum', 'Source', 'Appearance'], [['Continuous', 'White-hot filament; the Sun', 'All colours without a break'], ['Line', 'Atoms: sodium, hydrogen, neon', 'Separate sharp lines'], ['Band', 'Molecules: nitrogen, cyanogen', 'Bands, sharp edge on one side']], 'Table of continuous, line and band spectra with sources'),
      n: 'There are three kinds of spectrum to know. A hot solid, like a bulb filament, gives a continuous spectrum with every colour. Excited atoms give sharp separate lines. Excited molecules give groups of lines so close together that they look like bands. Molecules have many closely spaced energy levels, which is why their lines crowd together.',
    }),
    sl('diagram', 'The four spectra side by side', {
      b: 'Compare the strips. The **hydrogen emission lines** and the **hydrogen absorption lines** are at identical wavelengths (410, 434, 486 and 656 nm). The band spectrum is made of crowded lines.',
      v: V.spectra,
      n: 'Look at the four strips. The top one is continuous. Below it, excited hydrogen gives four bright lines. In the third strip white light has passed through cool hydrogen, and dark lines appear at exactly the same four places. The bottom strip shows bands from molecules. Each band has a sharp edge where the lines pile up.',
    }),
    sl('check', 'Quick check: reading a spectrum', {
      b: 'Link dark lines in starlight to the gas that absorbs them.',
      n: 'Quick check. Remember that an atom absorbs the same wavelengths that it can emit. Compare the dark lines in the starlight with the bright lines from helium in the laboratory, and decide what that match tells you about where the helium is and how it affects the light.',
      chk: 'fingerprint-mcq',
    }),
    sl('concept', 'Why atoms give lines', {
      b: 'The electron in an atom can have only **certain energies (energy levels)**. Light is emitted or absorbed only when the electron changes level, as one **photon** with $\\Delta E = h\\nu$. Only certain gaps exist, so only **certain wavelengths** appear.',
      v: flow('LR', [['a', 'Atom absorbs energy; electron goes to a higher level'], ['b', 'Excited state is short-lived'], ['c', 'Electron falls to a lower level'], ['d', 'One photon leaves: ΔE = hν, giving one spectral line']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Flow chart: an electron is excited, falls back and emits one photon whose energy is the gap between two levels'),
      n: 'Why lines and not a smooth band of colours? Because the electron in an atom is allowed only certain energies. When the atom is excited the electron moves up. When it falls back, the energy difference leaves as a single photon. Since only certain gaps exist, only certain wavelengths are emitted, and each element has its own set of gaps.',
    }),
    sl('concept', 'Bohr’s postulates', {
      b: '**1.** The electron moves in certain circular **stationary orbits** and does **not radiate** in them. **2.** An orbit is allowed only if the angular momentum is $m v r = \\dfrac{nh}{2\\pi}$, $n = 1, 2, 3\\ldots$ **3.** Energy is emitted or absorbed only in a **jump** between orbits, $\\Delta E = E_2 - E_1 = h\\nu$.',
      v: table(['Postulate', 'Statement', 'What it explains'], [['Stationary orbits', 'Fixed energy, no radiation', 'Stability of the atom'], ['Quantised angular momentum', 'm v r = nh/2π', 'Only certain orbit sizes'], ['Energy of a jump', 'ΔE = hν', 'Line spectrum']], 'Table of the three postulates of Bohr’s model and what each explains'),
      n: 'Bohr made three postulates. First, the electron moves only in certain circular orbits, called stationary orbits, and does not radiate energy while in one. Second, the angular momentum in an allowed orbit is a whole number times Planck’s constant divided by two pi. Third, light is emitted or absorbed only when the electron jumps between orbits.',
    }),
    sl('diagram', 'Bohr orbits drawn to scale', {
      b: 'For $n = 1, 2, 3, 4$ the radii are in the ratio $1 : 4 : 9 : 16$ because $r \\propto n^2$. For He⁺ every orbit is **half** the size of the matching hydrogen orbit because the nuclear charge is twice as large.',
      v: V.orbits,
      n: 'Here are the orbits for hydrogen on the left and for the helium plus ion on the right. The radius grows as n squared, so the outer orbits are far apart. In helium plus the nucleus has twice the charge and pulls the electron in, so each orbit has half the radius of the hydrogen orbit with the same n.',
    }),
    sl('concept', 'Radius, speed and energy: numericals only', {
      b: 'For a **hydrogen-like** species (one electron, nuclear charge $Z$) in the $n$th orbit use the given results; **no derivation** is needed. $$r_n = \\frac{52.9\\,n^2}{Z}\\ \\text{pm}, \\quad v_n = 2.18 \\times 10^{6}\\,\\frac{Z}{n}\\ \\text{m s}^{-1}, \\quad E_n = -2.18 \\times 10^{-18}\\,\\frac{Z^2}{n^2}\\ \\text{J}$$ The energy is negative: the bound electron has less energy than a free one (zero at $n = \\infty$).',
      v: table(['Quantity', 'Depends on n as', 'Depends on Z as', 'Hydrogen, n = 1'], [['Radius', 'n²', '1/Z', '52.9 pm'], ['Speed', '1/n', 'Z', r`$2.18 \times 10^{6}$ m s⁻¹`], ['Energy', '−1/n²', 'Z²', r`$-2.18 \times 10^{-18}$ J`]], 'Table showing how radius, speed and energy depend on n and Z'),
      n: 'You do not need to derive these formulas, only to use them. The radius is fifty-two point nine picometres times n squared, divided by the nuclear charge. The speed is two point one eight million metres per second times Z over n. The energy is negative, because the bound electron has less energy than a free electron, which has zero.',
    }),
    sl('example', 'Worked example: orbit of an He⁺ ion', {
      b: r`**Problem.** The electron of an $\ce{He+}$ ion ($Z = 2$) is in the fourth orbit. Find its radius, speed and energy.

**Radius:** $r_4 = \dfrac{52.9 \times 4^2}{2} = ${f1(heR)}$ pm.

**Speed:** $v_4 = 2.18 \times 10^{6} \times \dfrac{2}{4} = ${f2(heV)} \times 10^{6}$ m s⁻¹.

**Energy:** $E_4 = -2.18 \times 10^{-18} \times \dfrac{2^2}{4^2} = ${f2(heE * 10)} \times 10^{-19}$ J.`,
      v: table(['Quantity', 'Value for He⁺, n = 4'], [['Radius', '423.2 pm'], ['Speed', r`$1.09 \times 10^{6}$ m s⁻¹`], ['Energy', r`$-5.45 \times 10^{-19}$ J`]], 'Table of the radius, speed and energy of He plus in the fourth orbit'),
      n: 'Substitute Z equal to two and n equal to four into each formula. The radius is about four hundred twenty-three picometres, eight times the first Bohr radius. The speed is half that of the ground-state electron in hydrogen, about one point zero nine million metres per second. The energy is small and negative, as for any bound level.',
    }),
    sl('check', 'Quick check: radius of an orbit', {
      b: 'Substitute n and Z into the radius formula.',
      n: 'Quick check. Use the radius formula with the numbers given in the question. Be careful to square the value of n, not to cube it or multiply it by itself only once, and remember that the nuclear charge Z goes in the denominator, so a larger charge gives a smaller orbit.',
      chk: 'radius-mcq',
    }),
    sl('concept', 'Energy changes and ionisation', {
      b: 'The energy absorbed in a jump is the **difference** of the two levels; the **ionisation energy** is the energy to lift the electron from $n$ to $n = \\infty$. For hydrogen in its ground state it is $2.18 \\times 10^{-18}$ J per atom, which is **1312 kJ mol⁻¹**. For hydrogen-like ions it is multiplied by $Z^2$.',
      v: table(['Species', 'Ionisation energy per ion', 'Per mole'], [['H', r`$2.18 \times 10^{-18}$ J`, '1313 kJ'], ['He⁺', r`$8.72 \times 10^{-18}$ J`, '5251 kJ'], ['Li²⁺', r`$1.96 \times 10^{-17}$ J`, '11 815 kJ']], 'Table of ionisation energies of H, He plus and Li two plus from the ground state'),
      n: 'The energy absorbed in a jump is the difference between the two levels. The ionisation energy is the energy needed to lift the electron from its level to infinity, where its energy is zero. For ground-state hydrogen this is two point one eight times ten to the minus eighteen joule. For hydrogen-like ions it is multiplied by Z squared.',
    }),
    sl('example', 'Worked example: excitation and ionisation of hydrogen', {
      b: r`**Problem.** (a) Find the energy absorbed when the electron of a hydrogen atom goes from $n = 1$ to $n = 4$, and the wavelength of the photon absorbed. (b) Find the ionisation energy per mole. ($N_\text{A} = 6.022 \times 10^{23}\ \text{mol}^{-1}$)

**(a)** $\Delta E = 2.18 \times 10^{-18}\left(1 - \dfrac{1}{16}\right) = ${f2(dE14)} \times 10^{-18}$ J; $\lambda = \dfrac{hc}{\Delta E} = \dfrac{6.626 \times 10^{-34} \times 3.0 \times 10^{8}}{${f2(dE14)} \times 10^{-18}} = ${f1(lam14)} \times 10^{-9}$ m $= ${f1(lam14)}$ nm.

**(b)** $2.18 \times 10^{-18} \times 6.022 \times 10^{23} = ${f2(ionJ / 1e6)} \times 10^{6}$ J mol⁻¹, i.e. about 1313 kJ mol⁻¹.`,
      v: table(['Step', 'Result'], [['Energy absorbed, 1 → 4', r`$2.04 \times 10^{-18}$ J`], ['Wavelength of the photon', '97.3 nm (ultraviolet)'], ['Ionisation energy per mole', '1313 kJ']], 'Table of the results of the excitation and ionisation example'),
      n: 'Work out the energy difference between the two levels, then divide Planck’s constant times the speed of light by it to find the wavelength of the photon that must be absorbed. It lies in the ultraviolet. For the ionisation energy per mole, multiply the energy for one atom by Avogadro’s number, giving about thirteen hundred kilojoules.',
    }),
    sl('concept', 'Merits of Bohr’s model', {
      b: 'Bohr’s model **explained the stability** of the atom, **explained the line spectrum of hydrogen** (it gives the Rydberg formula), and gave the **radii and energies** of one-electron species such as He⁺, Li²⁺ and Be³⁺. It introduced **quantisation of energy** into atomic structure.',
      v: table(['Success', 'How the model achieves it'], [['Stable atom', 'Stationary orbits: no radiation'], ['Hydrogen spectrum', 'Lines are jumps, ΔE = hν'], ['One-electron ions', 'Same formulas with Z in place'], ['Ionisation energy of H', 'E(∞) − E(1) = 2.18 × 10⁻¹⁸ J']], 'Table of the successes of Bohr’s model'),
      n: 'Here is what Bohr’s model achieved. It explained why the atom is stable, with orbits in which no radiation occurs. It explained the line spectrum of hydrogen as jumps between levels, and gave the right ionisation energy. It also worked for ions with a single electron, such as helium plus, simply by putting in the right nuclear charge.',
    }),
    sl('check', 'Quick check: hydrogen-like ions', {
      b: 'Use the radius formula with the larger nuclear charge.',
      n: 'Quick check. The ion has a single electron, so the formula applies directly. Substitute the nuclear charge and the orbit number, and compare your answer with the hydrogen value of two hundred twelve picometres for the second orbit, since a larger charge should give a smaller orbit.',
      chk: 'li2-mcq',
    }),
    sl('summary', 'Summary: Part 1', {
      ul: [
        'Emission: bright lines on dark; absorption: dark lines at the same wavelengths. Line spectra: atoms; band spectra: molecules; continuous: hot solids.',
        'Bohr: stationary orbits, m v r = nh/2π, ΔE = hν.',
        'r = 52.9 n²/Z pm; v = 2.18 × 10⁶ Z/n m s⁻¹; E = −2.18 × 10⁻¹⁸ Z²/n² J (numericals only; no derivation).',
        'Merits: stability, hydrogen spectrum, one-electron ions.',
      ],
      v: table(['Quantity', 'Formula'], [['Radius', r`$r_n = 52.9\,n^2/Z$ pm`], ['Speed', r`$v_n = 2.18 \times 10^{6}\,Z/n$ m s⁻¹`], ['Energy', r`$E_n = -2.18 \times 10^{-18}\,Z^2/n^2$ J`], ['Photon', r`$\Delta E = h\nu$`]], 'Summary table of the Bohr formulas'),
      n: 'Let us sum up Part 1. Emission spectra have bright lines and absorption spectra have dark lines at the same places. Atoms give lines and molecules give bands. Bohr proposed stationary orbits with quantised angular momentum, and light from jumps between them. His model gives the radius, speed and energy for hydrogen and one-electron ions.',
    }),
    sl('exam-tips', 'Exam tips: Part 1', {
      ul: [
        'Say that dark absorption lines fall at the same wavelengths as bright emission lines.',
        'Energies of bound levels are negative; the energy absorbed or emitted is the positive difference.',
        'Check that the species has only one electron before using the Bohr formulas.',
        'Square n in the radius and energy formulas; Z is squared only in the energy formula.',
        'Do not derive the formulas: the syllabus asks for numericals only.',
      ],
      v: table(['Slip', 'Fix'], [['Writing a positive energy for a bound level', 'E is negative; zero at n = ∞'], ['Using Bohr’s formulas for a two-electron atom', 'Only H, He⁺, Li²⁺ …'], ['Forgetting Z in the radius', 'r = 52.9 n²/Z']], 'Table of common slips in Part 1 and their fixes'),
      n: 'Some exam tips. Always give the energy of a bound level as a negative number, and the energy of a jump as a positive difference. Make sure the species has only one electron before using Bohr’s formulas. Square n correctly, and remember that Z appears in the radius as a divisor. You do not need to derive anything in this topic.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Bohr’s Model, Atomic Spectra and Dual Nature — Part 2: Hydrogen series, defects and matter waves',
  goals: [
    'Name the series of the hydrogen spectrum and use the Rydberg formula for wavelengths',
    'List the defects of Bohr’s model',
    'Calculate the de Broglie wavelength of an electron or a moving ball and use the uncertainty principle Δx·Δp ≥ h/4π',
  ],
  slides: [
    sl('title', 'The hydrogen spectrum and matter waves', {
      b: 'Part 2: the series of lines in hydrogen, the faults in Bohr’s model, and the idea that matter behaves like a wave.',
      v: V.levels,
      n: 'Welcome to Part 2. First we use the energy levels of hydrogen to understand its series of spectral lines and calculate their wavelengths. Then we see where Bohr’s model falls short, which leads us to the dual nature of matter, de Broglie’s wavelength for particles, and Heisenberg’s uncertainty principle.',
    }),
    sl('concept', 'Series of lines in the hydrogen spectrum', {
      b: 'Each series is the set of lines for electrons falling to **one lower level $n_1$** from higher levels. The series are named **Lyman** ($n_1 = 1$), **Balmer** ($n_1 = 2$), **Paschen** (3), **Brackett** (4) and **Pfund** (5).',
      v: table(['Series', 'n₁', 'Region', 'First line (nm)'], [['Lyman', '1', 'Ultraviolet', f1(lam(1, 2))], ['Balmer', '2', 'Visible', f1(lam(2, 3))], ['Paschen', '3', 'Infrared', f1(lam(3, 4))], ['Brackett', '4', 'Infrared', f1(lam(4, 5))], ['Pfund', '5', 'Infrared', f1(lam(5, 6))]], 'Table of the hydrogen series, lower level, region and wavelength of the first line'),
      n: 'The lines of hydrogen fall into series. Each series contains the lines made when an electron falls to the same lower level. The Lyman series ends on the first level and lies in the ultraviolet. The Balmer series ends on the second level and is visible. Paschen, Brackett and Pfund lie in the infrared.',
    }),
    sl('diagram', 'Energy levels and the series', {
      b: 'The longest line of each series comes from the **smallest gap** (to the next level above) and the **series limit** from the gap to $n = \\infty$. Levels **crowd together** as $n$ increases.',
      v: V.levels,
      n: 'This diagram is drawn to scale. Blue arrows ending on the first level make the Lyman series, red arrows ending on the second make the Balmer series, and brown arrows ending on the third make the Paschen series. The levels crowd together at the top, so lines in each series bunch together towards a limit at short wavelength.',
    }),
    sl('concept', 'The Rydberg formula', {
      b: r`The wave number of a line is $$\bar{\nu} = \frac{1}{\lambda} = R_\text{H}\left(\frac{1}{n_1^2} - \frac{1}{n_2^2}\right), \qquad R_\text{H} = 1.097 \times 10^{7}\ \text{m}^{-1},\ n_2 > n_1$$ **Longest wavelength** of a series: $n_2 = n_1 + 1$. **Series limit** (shortest): $n_2 = \infty$.`,
      v: table(['Series', 'Longest line', 'Series limit'], [['Lyman', f1(lam(1, 2)) + ' nm', f1(1e9 / RH) + ' nm'], ['Balmer', f1(lam(2, 3)) + ' nm', f1((4 * 1e9) / RH) + ' nm'], ['Paschen', f1(lam(3, 4)) + ' nm', f1((9 * 1e9) / RH) + ' nm']], 'Table of the longest wavelength and the series limit for the Lyman, Balmer and Paschen series'),
      n: 'Rydberg’s formula gives the reciprocal of the wavelength as a constant times the difference of two terms, one for each level. The constant is one point zero nine seven times ten to the seventh per metre. The longest line in a series has n two equal to n one plus one, and the series limit has n two at infinity.',
    }),
    sl('example', 'Worked example: a Balmer line', {
      b: r`**Problem.** Find the wavelength of the line emitted when the electron falls from $n = 6$ to $n = 2$ in hydrogen. ($R_\text{H} = 1.097 \times 10^{7}\ \text{m}^{-1}$)

$\dfrac{1}{\lambda} = 1.097 \times 10^{7}\left(\dfrac{1}{4} - \dfrac{1}{36}\right) = ${f2(wn62 / 1e6)} \times 10^{6}\ \text{m}^{-1}$.

$\lambda = \dfrac{1}{${f2(wn62 / 1e6)} \times 10^{6}} = ${f2((1 / wn62) * 1e7)} \times 10^{-7}$ m $= ${f1(lam62)}$ nm: violet light of the Balmer series.`,
      v: table(['Step', 'Result'], [['Wave number', r`$2.44 \times 10^{6}\ \text{m}^{-1}$`], ['Wavelength', '410 nm'], ['Region', 'Violet (visible), Balmer series']], 'Table of the results of the Balmer line example'),
      n: 'Put n one equal to two and n two equal to six into the Rydberg formula. The bracket is a quarter minus one thirty-sixth. That gives the wave number, and taking the reciprocal gives the wavelength, about four hundred ten nanometres. This is the violet line of the Balmer series, close to the series limit.',
    }),
    sl('check', 'Quick check: Rydberg calculation', {
      b: 'Evaluate the bracket first, then take the reciprocal.',
      n: 'Quick check. Write the two levels into the Rydberg formula, work out the fractions in the bracket, multiply by the Rydberg constant, and then take the reciprocal. Finally convert metres to nanometres by multiplying by one billion, and check that your answer lies in the visible region for a Balmer line.',
      chk: 'balmer-num',
    }),
    sl('concept', 'Defects of Bohr’s model', {
      b: 'Bohr’s model **fails for atoms with more than one electron**, cannot explain the **splitting of lines in a magnetic field (Zeeman effect) or an electric field (Stark effect)**, and treats the electron as a **particle in a definite orbit**, ignoring its wave nature and conflicting with the **uncertainty principle**.',
      v: table(['Defect', 'Reason'], [['Many-electron atoms', 'Ignores repulsion between electrons'], ['Zeeman and Stark effects', 'One quantum number is not enough'], ['Definite orbit', 'Contradicts Heisenberg; ignores wave nature'], ['Chemical bonding', 'No explanation of molecules']], 'Table of the defects of Bohr’s model with the reason for each'),
      n: 'Bohr’s model has important defects. It works only for atoms with one electron, because it ignores repulsion between electrons. It cannot explain how spectral lines split in magnetic and electric fields. And it pictures the electron as a particle on a path of known radius, which conflicts with the wave nature of matter and with the uncertainty principle.',
    }),
    sl('check', 'Quick check: what Bohr could not explain', {
      b: 'Pick the observation that lies outside Bohr’s model.',
      n: 'Quick check. Three of the four options are explained by the model: the line spectrum of hydrogen, the spectrum of a one-electron ion, and the stability of the atom. Decide which observation would need more than one quantum number, or a more advanced theory, and choose that option.',
      chk: 'defect-mcq',
    }),
    sl('concept', 'Dual nature and de Broglie’s relation', {
      b: 'Light shows both wave and particle behaviour. In 1924 de Broglie suggested that **matter too has wave properties**: a particle of mass $m$ and speed $v$ has the wavelength $$\\lambda = \\frac{h}{mv} = \\frac{h}{p}$$ The wavelength is **measurable for electrons** and **negligible for large objects**.',
      v: table(['Object', 'Mass', 'Speed', 'Wavelength'], [['Electron', r`$9.11 \times 10^{-31}$ kg`, r`$2 \times 10^{6}$ m s⁻¹`, r`$3.6 \times 10^{-10}$ m`], ['Alpha particle', r`$6.64 \times 10^{-27}$ kg`, r`$1.5 \times 10^{7}$ m s⁻¹`, r`$6.7 \times 10^{-15}$ m`], ['Car', '1500 kg', r`$20$ m s⁻¹`, r`$2.2 \times 10^{-38}$ m`]], 'Table of de Broglie wavelengths of an electron, an alpha particle and a car'),
      n: 'De Broglie suggested that if light can act as a particle, matter can act as a wave. A particle of mass m and speed v has a wavelength equal to Planck’s constant divided by its momentum. For an electron this is comparable with the size of an atom. For a car it is so tiny that no experiment could ever detect it.',
    }),
    sl('diagram', 'Standing electron waves in an orbit', {
      b: 'An orbit is allowed if a **whole number of wavelengths** fits its circumference, $2\\pi r = n\\lambda$; otherwise the wave cancels itself. With $\\lambda = h/mv$ this gives **Bohr’s quantum condition** $mvr = nh/2\\pi$.',
      v: V.waves,
      n: 'De Broglie waves give a picture of Bohr’s rule. On the left a wave with exactly three wavelengths round the orbit joins up with itself, so it can persist, and the orbit is allowed. On the right, three and a half wavelengths do not join up and the wave destroys itself, so such an orbit cannot exist.',
    }),
    sl('example', 'Worked example: de Broglie wavelengths', {
      b: r`**Problem.** Find the de Broglie wavelength of (a) an electron moving at $1.5 \times 10^{6}\ \text{m s}^{-1}$ and (b) a car of mass $1500$ kg moving at $20\ \text{m s}^{-1}$. ($h = 6.626 \times 10^{-34}\ \text{J s}$, $m_\text{e} = 9.11 \times 10^{-31}\ \text{kg}$)

**(a)** $\lambda = \dfrac{h}{m_\text{e}v} = \dfrac{6.626 \times 10^{-34}}{9.11 \times 10^{-31} \times 1.5 \times 10^{6}} = ${f2(lamE * 1e10)} \times 10^{-10}$ m $= ${Math.round(lamE * 1e12)}$ pm.

**(b)** $\lambda = \dfrac{6.626 \times 10^{-34}}{1500 \times 20} = ${f2(lamCar / 1e-38)} \times 10^{-38}$ m.`,
      v: table(['Object', 'Wavelength', 'Observable?'], [['Electron at 1.5 × 10⁶ m s⁻¹', '485 pm', 'Yes: comparable with atoms'], ['Car at 20 m s⁻¹', r`$2.2 \times 10^{-38}$ m`, 'No: immeasurably small']], 'Table of the wavelengths for the electron and the car and whether they are observable'),
      n: 'Substitute into lambda equal to h over m v. For the electron the wavelength is about four hundred eighty-five picometres, which is about twice the diameter of an atom, so electron waves can be diffracted by crystals. For the car the wavelength is about ten to the minus thirty-eight metres, far smaller than anything measurable.',
    }),
    sl('check', 'Quick check: a moving ball', {
      b: 'Convert the mass to kilograms before using $\\lambda = h/mv$.',
      n: 'Quick check. Convert the mass of the ball from grams to kilograms first. Then divide Planck’s constant by the product of mass and speed. Expect an extremely small answer, because the mass of an everyday object is enormous compared with the mass of an electron. Give the result in the units asked for.',
      chk: 'ball-num',
    }),
    sl('concept', 'Heisenberg’s uncertainty principle', {
      b: 'It is **impossible to know exactly and at the same time both the position and the momentum** of a microscopic particle. $$\\Delta x \\cdot \\Delta p \\geq \\frac{h}{4\\pi}, \\qquad \\Delta p = m\\,\\Delta v$$ A **smaller $\\Delta x$** means a **larger $\\Delta v$**. The effect is **negligible for large objects**.',
      v: flow('LR', [['a', 'Fix the position of an electron more precisely'], ['b', 'Δx becomes smaller'], ['c', 'Δp must become larger, Δx·Δp ≥ h/4π'], ['d', 'The speed becomes less certain']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Flow chart of the uncertainty principle: a smaller uncertainty in position forces a larger uncertainty in momentum'),
      n: 'Heisenberg showed that nature sets a limit to how well we can know the position and momentum of a tiny particle together. The product of the two uncertainties is at least Planck’s constant divided by four pi. If you pin down the position more tightly, the momentum becomes less certain. For large objects the limit is far too small to matter.',
    }),
    sl('example', 'Worked example: uncertainty in speed', {
      b: r`**Problem.** (a) The position of an electron is known to within $1.0 \times 10^{-9}\ \text{m}$. Find the minimum uncertainty in its speed. (b) Do the same for a marble of mass $1.0$ g whose position is known to within $1.0$ mm. ($h = 6.626 \times 10^{-34}\ \text{J s}$)

**(a)** $\Delta v = \dfrac{h}{4\pi m_\text{e}\Delta x} = \dfrac{6.626 \times 10^{-34}}{4 \times \pi \times 9.11 \times 10^{-31} \times 1.0 \times 10^{-9}} = ${f2(dvE / 1e4)} \times 10^{4}$ m s⁻¹.

**(b)** $\Delta v = \dfrac{6.626 \times 10^{-34}}{4 \times \pi \times 1.0 \times 10^{-3} \times 1.0 \times 10^{-3}} = ${f2(dvMarble / 1e-29)} \times 10^{-29}$ m s⁻¹.`,
      v: table(['Particle', 'Δx', 'Minimum Δv'], [['Electron', r`$1.0 \times 10^{-9}$ m`, r`$5.79 \times 10^{4}$ m s⁻¹ (large)`], ['Marble, 1 g', r`$1.0 \times 10^{-3}$ m`, r`$5.27 \times 10^{-29}$ m s⁻¹ (negligible)`]], 'Table of the minimum uncertainty in speed for an electron and a marble'),
      n: 'Rearrange the principle to give the uncertainty in speed as Planck’s constant divided by four pi times the mass times the uncertainty in position. For the electron the uncertainty in speed is about fifty-eight thousand metres per second, which is huge. For the marble it is about five times ten to the minus twenty-nine metres per second, which is totally negligible.',
    }),
    sl('concept', 'From orbits to orbitals', {
      b: 'Because position and momentum cannot both be known, the **definite orbit** of Bohr must be replaced by a region where the electron is **most probably found**. This leads to the **orbital** of the quantum mechanical model, with a wave function that describes the electron as a matter wave.',
      v: table(['Bohr model', 'Wave-mechanical picture'], [['Electron in a fixed circular orbit', 'Electron described by a wave; probability of being found'], ['Exact radius and speed', 'Cannot be known together'], ['One quantum number, n', 'More quantum numbers are needed'], ['Works for one electron only', 'Applies to every atom']], 'Table comparing Bohr’s orbit picture with the wave mechanical picture'),
      n: 'The uncertainty principle means a definite path for the electron has no meaning. Instead, the electron is described by a wave, and we can only say where it is likely to be found. The Bohr orbit is replaced by a region of high probability called an orbital. This opens the way to the quantum mechanical model of the atom.',
    }),
    sl('summary', 'Summary: Part 2', {
      ul: [
        'Series: Lyman (n₁ = 1, UV), Balmer (2, visible), Paschen (3, IR), Brackett (4), Pfund (5).',
        'Rydberg: 1/λ = R_H(1/n₁² − 1/n₂²), R_H = 1.097 × 10⁷ m⁻¹.',
        'Defects of Bohr’s model: many-electron atoms, Zeeman and Stark effects, particle picture against uncertainty principle.',
        'de Broglie: λ = h/mv. Heisenberg: Δx·Δp ≥ h/4π.',
      ],
      v: table(['Formula', 'Use'], [[r`$\dfrac{1}{\lambda} = R_\text{H}\left(\dfrac{1}{n_1^2} - \dfrac{1}{n_2^2}\right)$`, 'Hydrogen lines'], [r`$\lambda = \dfrac{h}{mv}$`, 'Matter waves'], [r`$\Delta x\,\Delta p \geq \dfrac{h}{4\pi}$`, 'Uncertainty principle']], 'Summary table of the main formulae of Part 2'),
      n: 'Summing up Part 2. Hydrogen lines fall into series named by the lower level, and the Rydberg formula gives their wavelengths. Bohr’s model works for one-electron species but has important defects. De Broglie showed that moving matter has a wavelength equal to Planck’s constant over momentum. Heisenberg showed that position and momentum cannot both be known exactly.',
    }),
    sl('exam-tips', 'Exam tips: Part 2', {
      ul: [
        'Name a series by its lower level: Lyman 1, Balmer 2, Paschen 3.',
        'Longest wavelength: n₂ = n₁ + 1. Shortest wavelength (series limit): n₂ = ∞.',
        'Convert grams to kilograms and nanometres to metres before substituting.',
        'In uncertainty numericals use Δp = mΔv and the form h/4π.',
        'For a large object the wavelength or uncertainty comes out immeasurably small: say so.',
      ],
      v: table(['Slip', 'Fix'], [['Using n₂ = n₁ for the first line', 'First line has n₂ = n₁ + 1'], ['Mass in grams in λ = h/mv', 'Use kilograms'], ['Forgetting the 4π in the uncertainty formula', 'Δx·Δp ≥ h/4π']], 'Table of common slips in Part 2 and their fixes'),
      n: 'Some exam tips. Name each series by the level the electron lands on. The longest wavelength has n two equal to n one plus one, and the shortest has n two at infinity. Convert grams to kilograms and nanometres to metres before substituting. In uncertainty problems remember the four pi, and for large objects state that the effect is negligible.',
    }),
  ],
});
