// ch02 Structure of Atom — two decks: Part 1 (t01–t02) subatomic particles, atomic models, radiation, photoelectric effect, Bohr model;
// Part 2 (t03–t05) de Broglie, Heisenberg, quantum numbers, orbitals, electronic configuration.
import { sl, deck, table, flow, svgV, r } from './lib.mjs';
import { SCATTER, ENERGY, ORBITALS, BOXES } from './svgs.mjs';

export const V = {
  scatter: svgV(SCATTER, 'Rutherford alpha-particle scattering: most particles pass through the gold foil, a few are deflected slightly and very few rebound, showing a small dense positive nucleus', 'Schematic, not to scale.'),
  energy: svgV(ENERGY, 'Energy-level diagram of hydrogen drawn to scale with the Lyman, Balmer and Paschen series of transitions and example wavelengths', 'Levels crowd together as n increases; E = −2.18 × 10⁻¹⁸ J / n².'),
  orbitals: svgV(ORBITALS, 'Shapes of 1s, 2s, 2p and two 3d orbitals with their radial and angular nodes', 'Blue and red lobes have opposite signs of the wave function.'),
  boxes: svgV(BOXES, 'Orbital box diagrams of nitrogen, oxygen, chromium and copper showing Hund rule filling and the half-filled and filled 3d exceptions', 'Up and down arrows show opposite spins.'),
};

export const deck1 = deck({
  part: 1,
  title: 'Structure of Atom — Part 1: Atomic models, radiation and the Bohr model',
  goals: [
    'Describe the subatomic particles and the Thomson and Rutherford models with their limitations',
    'Use c = νλ and E = hν for electromagnetic radiation and the photoelectric effect',
    'Interpret the hydrogen line spectrum and apply Bohr’s model to energies, radii and transitions',
  ],
  slides: [
    sl('title', 'Structure of Atom', {
      b: 'Part 1 — from the electron and the nucleus to the first quantum model of the atom.',
      v: table(['Particle', 'Charge / C', 'Mass / kg', 'Mass / u'], [['Electron', r`$-1.602 \times 10^{-19}$`, r`$9.109 \times 10^{-31}$`, '0.000549'], ['Proton', r`$+1.602 \times 10^{-19}$`, r`$1.673 \times 10^{-27}$`, '1.0073'], ['Neutron', '0', r`$1.675 \times 10^{-27}$`, '1.0087']], 'Table of charge and mass of the electron, proton and neutron'),
      n: 'Welcome. Everything around us is built from atoms, and atoms from three particles: the electron, the proton and the neutron. In this part we follow how scientists discovered them, why the early models failed, how light carries energy in packets, and how Niels Bohr used that idea to explain the colours emitted by hydrogen.',
    }),
    sl('concept', 'Discovery of subatomic particles', {
      b: 'Cathode rays showed that atoms contain **electrons**; canal rays revealed **protons**; Chadwick found the **neutron** in 1932. Thomson measured the charge-to-mass ratio of the electron, $e/m_\\text{e} = 1.76 \\times 10^{11}\\ \\text{C kg}^{-1}$, and Millikan’s oil-drop experiment gave its charge.',
      v: table(['Particle', 'Discovered by', 'Evidence'], [['Electron', 'J. J. Thomson (1897)', 'Cathode rays deflected by electric and magnetic fields'], ['Proton', 'Goldstein, Rutherford', 'Canal rays; hydrogen nucleus'], ['Neutron', 'Chadwick (1932)', 'Beryllium bombarded with alpha particles'], ['Charge on electron', 'Millikan', 'Oil-drop experiment']], 'Table of who discovered each subatomic particle and the evidence'),
      n: 'Cathode rays in a discharge tube bent towards a positive plate, so they carry negative charge. Thomson measured how much they bend and found the charge to mass ratio of the electron. Millikan then measured the charge itself with tiny oil drops. Protons came from canal rays, and Chadwick discovered the neutron in nineteen thirty-two by bombarding beryllium with alpha particles.',
    }),
    sl('concept', 'Thomson’s model', {
      b: 'Thomson pictured the atom as a positive sphere with electrons embedded like seeds in a watermelon or raisins in a pudding: **electrically neutral**, with charge spread uniformly. It could not explain what Rutherford observed.',
      v: table(['Feature', 'Thomson (1904)', 'Rutherford (1911)'], [['Positive charge', 'Spread through the whole sphere', 'Concentrated in a tiny nucleus'], ['Electrons', 'Embedded in the sphere', 'Outside the nucleus'], ['Mass', 'Spread out', 'Almost all in the nucleus'], ['Explains alpha scattering?', 'No', 'Yes']], 'Table comparing Thomson’s model with Rutherford’s nuclear model'),
      n: 'Thomson’s first model of the atom had positive charge spread through the whole sphere, with electrons embedded in it like raisins in a pudding. The atom is neutral overall. This picture was simple, but it predicted that fast alpha particles should pass through with only tiny deflections. The experiment that tested this prediction overturned it.',
    }),
    sl('diagram', 'Rutherford’s alpha-scattering experiment', {
      b: 'A narrow beam of $\\alpha$-particles was fired at thin gold foil. Most passed straight through, a few were deflected through small angles, and **very few rebounded**.',
      v: V.scatter,
      n: 'Look at the picture. Alpha particles from the source strike a very thin gold foil. Nearly all go straight through, a few are bent slightly, and very few bounce almost straight back. Rutherford said it was like firing a shell at tissue paper and seeing it come back. The only explanation was a tiny, heavy, positive centre in every atom.',
    }),
    sl('concept', 'Rutherford’s conclusions and limitations', {
      b: 'The atom is mostly **empty space**; the positive charge and almost all the mass are in a tiny **nucleus** (about $10^{-15}$ m across, compared with an atom of about $10^{-10}$ m); electrons move around it. But classical physics says such an electron should radiate energy and spiral into the nucleus, and the model could not explain **line spectra**.',
      v: table(['Observation', 'Inference'], [['Most alpha particles pass undeflected', 'Atom is mostly empty space'], ['A few deflected through large angles', 'Positive charge is concentrated'], ['Very few rebound', 'Small, dense, massive nucleus'], ['Atom is stable and gives line spectra', 'Not explained: needed a new model']], 'Table linking Rutherford’s observations to inferences and an unresolved problem'),
      n: 'Each observation leads to an inference. No deflection means empty space, large deflection means concentrated positive charge, and a rebound means a small, heavy nucleus. The nucleus is about one hundred thousand times smaller than the atom. But there were two problems: a circling electron should lose energy and fall into the nucleus, and the model gave no explanation for sharp spectral lines.',
    }),
    sl('concept', 'Atomic number, mass number and isotopes', {
      b: '**Atomic number** $Z$ = number of protons; **mass number** $A = Z +$ number of neutrons. **Isotopes** have the same $Z$ but different $A$; **isobars** have the same $A$ but different $Z$.',
      v: table(['Species', 'Z', 'Neutrons', 'Relationship'], [['Protium, ¹H', '1', '0', 'Isotopes of hydrogen'], ['Deuterium, ²H', '1', '1', 'Isotopes of hydrogen'], ['Tritium, ³H', '1', '2', 'Isotopes of hydrogen'], ['⁴⁰Ar and ⁴⁰Ca', '18 and 20', '22 and 20', 'Isobars']], 'Table of isotopes of hydrogen and a pair of isobars'),
      n: 'The atomic number counts protons and identifies the element. The mass number counts protons plus neutrons. Atoms with the same number of protons but different numbers of neutrons are isotopes; hydrogen has three, protium, deuterium and tritium. Atoms with the same mass number but different atomic numbers, such as argon forty and calcium forty, are called isobars.',
    }),
    sl('check', 'Quick check: atomic models', {
      b: 'Link an observation to what it shows about the atom.',
      n: 'Quick check. Think about what each result of the foil experiment says about empty space and about the positive charge.',
      chk: 'models-chk',
    }),
    sl('concept', 'Electromagnetic radiation', {
      b: 'Light is a wave of oscillating electric and magnetic fields travelling at $c = 3.0 \\times 10^{8}\\ \\text{m s}^{-1}$ in vacuum. Frequency $\\nu$ and wavelength $\\lambda$ are linked by $c = \\nu\\lambda$; **wavenumber** $\\bar{\\nu} = 1/\\lambda$.',
      v: table(['Region', 'Wavelength', 'Frequency / Hz'], [['Radio waves', 'above 0.1 m', r`below $3 \times 10^{9}$`], ['Microwaves', '1 mm to 0.1 m', r`$3 \times 10^{9}$ to $3 \times 10^{11}$`], ['Visible', '400 to 700 nm', r`$7.5 \times 10^{14}$ to $4.3 \times 10^{14}$`], ['Ultraviolet', '10 to 400 nm', r`$7.5 \times 10^{14}$ to $3 \times 10^{16}$`], ['X-rays', '0.01 to 10 nm', r`$3 \times 10^{16}$ to $3 \times 10^{19}$`]], 'Table of regions of the electromagnetic spectrum with wavelength and frequency ranges'),
      n: 'Light is an electromagnetic wave. In vacuum every wave travels at the same speed, so frequency and wavelength are inversely related: the shorter the wavelength, the higher the frequency. The table runs from radio waves of low frequency through visible light to X-rays of very high frequency. Wavenumber is simply the reciprocal of wavelength.',
    }),
    sl('example', 'Worked example: frequency, wavelength and wavenumber', {
      b: r`**Problem.** (a) A mobile network uses radiation of frequency $1800\ \text{MHz}$. Find its wavelength. (b) Find the frequency of orange light of wavelength $600\ \text{nm}$. (c) Find the wavenumber of the orange light in m⁻¹. ($c = 3.0 \times 10^{8}\ \text{m s}^{-1}$)

**(a)** $\lambda = \dfrac{c}{\nu} = \dfrac{3.0 \times 10^{8}}{1.8 \times 10^{9}} \approx 0.167$ m.

**(b)** $\nu = \dfrac{c}{\lambda} = \dfrac{3.0 \times 10^{8}}{6.00 \times 10^{-7}} = 5.0 \times 10^{14}$ Hz.

**(c)** $\bar{\nu} = \dfrac{1}{\lambda} = \dfrac{1}{6.00 \times 10^{-7}} \approx 1.67 \times 10^{6}$ m⁻¹.`,
      v: flow('LR', [['a', 'Convert to SI: MHz to Hz, nm to m'], ['b', 'Apply c = νλ'], ['c', 'Wavenumber is 1 / λ']], [['a', 'b'], ['b', 'c']], 'Flow for frequency, wavelength and wavenumber calculations: convert to SI units, apply c equals nu lambda'),
      n: 'Always convert to SI units first: megahertz to hertz and nanometres to metres. Then divide the speed of light by the frequency to get wavelength, or by the wavelength to get frequency. Orange light of six hundred nanometres has a frequency of five times ten to the fourteen hertz. Wavenumber is one divided by the wavelength in metres.',
    }),
    sl('concept', 'Planck’s quantum theory and the photoelectric effect', {
      b: 'Energy is emitted or absorbed in packets, **quanta**: $E = h\\nu = hc/\\lambda$, $h = 6.626 \\times 10^{-34}\\ \\text{J s}$. In the **photoelectric effect** light above a **threshold frequency** $\\nu_0$ ejects electrons: $h\\nu = h\\nu_0 + \\tfrac{1}{2}m_\\text{e}v^2$.',
      v: table(['Observation', 'Why a wave model fails', 'Photon explanation'], [['No electrons below $\\nu_0$, however intense the light', 'Intensity should supply enough energy', 'One photon gives its whole energy to one electron; $h\\nu < h\\nu_0$ is too little'], ['Kinetic energy rises with frequency, not intensity', 'Energy should depend on intensity', 'KE $= h\\nu - h\\nu_0$'], ['Emission is instantaneous', 'Should need time to build up energy', 'Energy is delivered at once']], 'Table of photoelectric observations that a wave theory cannot explain and the photon explanation'),
      n: 'Max Planck proposed that energy comes in packets called quanta, with energy equal to Planck’s constant times frequency. Einstein used this to explain the photoelectric effect. Light below a threshold frequency ejects no electrons however bright it is, because a single photon is too weak. Above it, extra energy becomes kinetic energy. Brighter light of the same frequency just ejects more electrons.',
    }),
    sl('example', 'Worked example: photon energy and photoelectron energy', {
      b: r`**Problem.** Ultraviolet light of wavelength $300\ \text{nm}$ falls on a metal whose threshold wavelength is $500\ \text{nm}$. Find (a) the energy of one photon, (b) the threshold energy and (c) the kinetic energy of an ejected electron. ($h = 6.626 \times 10^{-34}\ \text{J s}$, $c = 3.0 \times 10^{8}\ \text{m s}^{-1}$)

**(a)** $E = hc/\lambda = 6.626 \times 10^{-34} \times 3.0 \times 10^{8} / 3.00 \times 10^{-7} = 6.63 \times 10^{-19}$ J.

**(b)** $E_0 = hc/\lambda_0 = 6.626 \times 10^{-34} \times 3.0 \times 10^{8} / 5.00 \times 10^{-7} = 3.98 \times 10^{-19}$ J.

**(c)** $\text{KE} = E - E_0 = 6.63 \times 10^{-19} - 3.98 \times 10^{-19} = 2.65 \times 10^{-19}$ J.`,
      v: table(['Quantity', 'Value / J'], [['Photon energy (300 nm)', r`$6.63 \times 10^{-19}$`], ['Threshold energy (500 nm)', r`$3.98 \times 10^{-19}$`], ['Kinetic energy of electron', r`$2.65 \times 10^{-19}$`]], 'Table of photon energy, threshold energy and photoelectron kinetic energy'),
      n: 'The photon carries Planck’s constant times the speed of light divided by the wavelength. Shorter wavelength means more energy. The metal holds on to its electrons with a threshold energy, found the same way from the threshold wavelength. The difference between the two energies is what is left over as kinetic energy of the ejected electron.',
    }),
    sl('check', 'Quick check: photons', {
      b: 'Compare the photon energies of different colours.',
      n: 'Quick check. Remember that energy is inversely proportional to wavelength.',
      chk: 'photon-chk',
    }),
    sl('concept', 'The hydrogen line spectrum', {
      b: 'Excited hydrogen emits only certain wavelengths, a **line spectrum**. They fit $\\bar{\\nu} = 1.097 \\times 10^{7}\\ \\text{m}^{-1}\\left(\\dfrac{1}{n_1^{2}} - \\dfrac{1}{n_2^{2}}\\right)$ with $n_2 > n_1$. Each value of $n_1$ gives a **series**.',
      v: table(['Series', 'n₁', 'n₂', 'Region'], [['Lyman', '1', '2, 3, …', 'Ultraviolet'], ['Balmer', '2', '3, 4, …', 'Visible'], ['Paschen', '3', '4, 5, …', 'Infrared'], ['Brackett', '4', '5, 6, …', 'Infrared'], ['Pfund', '5', '6, 7, …', 'Far infrared']], 'Table of hydrogen spectral series with lower level, upper levels and spectral region'),
      n: 'A glowing hydrogen tube does not give a rainbow but a few sharp coloured lines. Their wavelengths fit a simple formula, the Rydberg equation, with two whole numbers. Fixing the lower number gives a whole series: Lyman in the ultraviolet, Balmer in the visible, then Paschen, Brackett and Pfund in the infrared. A good model of the atom had to explain this pattern.',
    }),
    sl('concept', 'Bohr’s model of the hydrogen atom', {
      b: '(1) Electrons move in fixed **stationary orbits** without radiating. (2) Orbits have angular momentum $m_\\text{e}vr = nh/2\\pi$. (3) Light is emitted or absorbed only when an electron jumps between orbits: $\\Delta E = E_2 - E_1 = h\\nu$.',
      m: [r`E_n = -\dfrac{2.18 \times 10^{-18}\ \text{J}}{n^{2}}`, r`r_n = 52.9\ \text{pm} \times n^{2}`],
      v: table(['Level', 'Energy / 10⁻¹⁸ J', 'Radius / pm'], [['n = 1', '−2.18', '52.9'], ['n = 2', '−0.545', '212'], ['n = 3', '−0.242', '476'], ['n = ∞', '0', '∞']], 'Table of Bohr energies and radii of the first three levels of hydrogen'),
      n: 'Bohr made three bold postulates. Electrons travel only in certain allowed orbits and do not radiate while in them. Each orbit has a fixed energy, negative because the electron is bound, and equal to minus two point one eight times ten to the minus eighteen joule divided by n squared. Light is emitted or absorbed only when the electron jumps, with energy equal to the difference between two levels.',
    }),
    sl('diagram', 'Energy levels and spectral series', {
      b: 'Transitions **down** to $n = 1$, 2 or 3 give the Lyman, Balmer and Paschen series; the lines come from the **differences** between levels, which is why the spectrum is discrete.',
      v: V.energy,
      n: 'This diagram is drawn to scale. The levels crowd together as n gets larger, and at the top the electron is free. Each arrow is a transition that emits one photon. All arrows ending on the lowest level form the Lyman series, in the ultraviolet; those ending on the second level form the Balmer series, in the visible; and so on. The energy gap fixes the wavelength of each line.',
    }),
    sl('example', 'Worked example: a Bohr transition', {
      b: r`**Problem.** For hydrogen find (a) the energy of the $n = 2$ level, (b) the wavelength of the line produced when an electron falls from $n = 3$ to $n = 2$, and (c) the energy needed to ionise one mole of hydrogen atoms in the ground state. ($h = 6.626 \times 10^{-34}\ \text{J s}$, $c = 3.0 \times 10^{8}\ \text{m s}^{-1}$, $N_\text{A} = 6.022 \times 10^{23}\ \text{mol}^{-1}$)

**(a)** $E_2 = -2.18 \times 10^{-18} / 4 = -5.45 \times 10^{-19}$ J.

**(b)** $\Delta E = 2.18 \times 10^{-18}\,(1/4 - 1/9) = 3.03 \times 10^{-19}$ J, so $\lambda = \dfrac{hc}{\Delta E} = \dfrac{6.626 \times 10^{-34} \times 3.0 \times 10^{8}}{3.03 \times 10^{-19}} \approx 6.56 \times 10^{-7}$ m $= 656$ nm (red).

**(c)** Ionisation: $n = 1 \to \infty$ needs $2.18 \times 10^{-18}$ J per atom, that is $2.18 \times 10^{-18} \times 6.022 \times 10^{23} = 1.31 \times 10^{6}$ J mol⁻¹ $= 1.31 \times 10^{3}$ kJ mol⁻¹.`,
      v: table(['Step', 'Result'], [['Energy of n = 2', r`$-5.45 \times 10^{-19}$ J`], ['3 → 2 photon', '656 nm, red (Balmer)'], ['Ionisation, per mole', r`$1.31 \times 10^{3}$ kJ`]], 'Table of the results of the Bohr worked example'),
      n: 'Divide the ground-state energy by n squared for any level. A transition emits a photon whose energy is the difference between the two levels, and dividing Planck’s constant times the speed of light by that energy gives the wavelength, here red light of six hundred fifty-six nanometres. To ionise hydrogen, lift the electron from the first level to infinity, then scale by Avogadro’s number to get kilojoules per mole.',
    }),
    sl('check', 'Quick check: Bohr model', {
      b: 'Identify a spectral series from a transition.',
      n: 'Quick check. The series is named by the level the electron lands on.',
      chk: 'bohr-chk',
    }),
    sl('summary', 'Summary: Part 1', {
      ul: [
        'Electron, proton and neutron; Thomson’s plum-pudding model gave way to Rutherford’s nuclear model.',
        'Alpha scattering: empty space, tiny dense positive nucleus; limits: stability and line spectra not explained.',
        '$c = \\nu\\lambda$; $E = h\\nu$; photoelectric effect: KE $= h(\\nu - \\nu_0)$.',
        'Hydrogen line spectrum: series Lyman, Balmer, Paschen, Brackett, Pfund.',
        'Bohr: $E_n = -2.18 \\times 10^{-18}/n^2$ J, $r_n = 52.9\\,n^2$ pm; lines from $\\Delta E = h\\nu$.',
      ],
      v: table(['Formula', 'Use'], [[r`$c = \nu\lambda$`, 'Frequency and wavelength'], [r`$E = h\nu = hc/\lambda$`, 'Photon energy'], [r`$E_n = -2.18 \times 10^{-18}/n^2$ J`, 'Hydrogen levels'], [r`$r_n = 52.9\,n^2$ pm`, 'Bohr radii']], 'Summary table of the main formulae of Part 1'),
      n: 'Let us sum up Part 1. Rutherford replaced Thomson’s model with a nuclear atom. Light travels as waves with speed equal to frequency times wavelength, and as photons with energy equal to Planck’s constant times frequency. The photoelectric effect needs photons above a threshold. Bohr’s quantised orbits explain the lines of hydrogen, but his model works only for one-electron atoms.',
    }),
    sl('exam-tips', 'Exam tips: Part 1', {
      ul: [
        'Convert wavelengths in nm and frequencies in MHz to SI units before calculating.',
        'In the photoelectric effect, compare the photon’s frequency with the threshold frequency first.',
        'Energy of a level is negative; the energy emitted is the positive difference.',
        'Name the series by the lower level: Lyman 1, Balmer 2, Paschen 3.',
        'State the limitations of Rutherford’s and Bohr’s models when asked.',
      ],
      v: table(['Slip', 'Fix'], [['Using nm directly in c = νλ', 'Convert to metres'], ['Increasing intensity should raise KE', 'KE depends on frequency only'], ['Positive energy for bound electron', 'E is negative; zero at n = ∞']], 'Table of common slips in Part 1 and their fixes'),
      n: 'Some exam tips. Convert units before you start. In a photoelectric question first check whether the frequency is above the threshold. Remember that bound electrons have negative energy. And when asked about the Balmer series, say that the electron lands on the second level. If asked about limitations, mention stability for Rutherford and many-electron atoms for Bohr.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Structure of Atom — Part 2: Quantum mechanical model and electronic configuration',
  goals: [
    'Use de Broglie’s relation and Heisenberg’s uncertainty principle',
    'Assign quantum numbers and describe the shapes and nodes of s, p and d orbitals',
    'Write electronic configurations using Aufbau, Pauli and Hund’s rules, including Cr and Cu',
  ],
  slides: [
    sl('title', 'The quantum mechanical atom', {
      b: 'Part 2 — electrons as waves, orbitals instead of orbits, and how electrons fill them.',
      v: flow('LR', [['a', 'Bohr model limits'], ['b', 'Matter waves and uncertainty'], ['c', 'Orbitals and quantum numbers'], ['d', 'Electronic configuration']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Flow of the topics in Part 2: limits of Bohr model, matter waves and uncertainty, orbitals and quantum numbers, configuration'),
      n: 'Bohr’s model could not explain atoms with more than one electron, and it treated the electron only as a particle. In this part we see that matter also behaves like a wave, that we cannot know exactly where an electron is, and that this leads to orbitals described by four quantum numbers. Finally we use these ideas to write the electronic configuration of any atom.',
    }),
    sl('concept', 'Limitations of the Bohr model', {
      b: 'Bohr’s model works for H, He⁺, Li²⁺ but fails elsewhere.',
      v: table(['Limitation', 'Explanation'], [['Many-electron atoms', 'Cannot account for their spectra'], ['Fine structure', 'Cannot explain splitting of lines in a magnetic or electric field (Zeeman and Stark effects)'], ['Wave nature of the electron', 'Treats it only as a particle in a fixed orbit'], ['Uncertainty principle', 'Gives exact position and speed, which cannot be known together']], 'Table of the limitations of Bohr’s model of the atom'),
      n: 'Bohr’s model works well for hydrogen and one-electron ions such as helium plus. It fails for atoms with more electrons, cannot explain why spectral lines split in magnetic or electric fields, treats the electron only as a particle, and gives exact orbits that violate the uncertainty principle. A new theory based on the wave nature of matter was needed.',
    }),
    sl('concept', 'Dual nature of matter: de Broglie’s relation', {
      b: 'de Broglie proposed that a moving particle has a wavelength: $\\lambda = \\dfrac{h}{mv} = \\dfrac{h}{p}$. It is significant only for **microscopic** particles; for large objects $\\lambda$ is far too small to detect.',
      v: table(['Object', 'Mass / kg', 'Speed / m s⁻¹', 'Wavelength / m'], [['Electron', r`$9.11 \times 10^{-31}$`, r`$1.0 \times 10^{6}$`, r`$7.3 \times 10^{-10}$`], ['Cricket ball', '0.16', '40', r`$1.0 \times 10^{-34}$`], ['Bullet', '0.050', '300', r`$4.4 \times 10^{-35}$`]], 'Table of de Broglie wavelengths of an electron, a cricket ball and a bullet'),
      n: 'Louis de Broglie suggested that if light can behave as a particle, matter can behave as a wave, with wavelength equal to Planck’s constant divided by momentum. For an electron the wavelength is comparable with the size of an atom, so it matters. For a cricket ball or a bullet it is smaller than anything we can measure, so everyday objects appear to have no wave nature.',
    }),
    sl('example', 'Worked example: de Broglie wavelength', {
      b: r`**Problem.** Find the de Broglie wavelength of (a) a neutron moving at $2200\ \text{m s}^{-1}$ ($m = 1.675 \times 10^{-27}$ kg) and (b) a $50\ \text{g}$ bullet moving at $300\ \text{m s}^{-1}$. ($h = 6.626 \times 10^{-34}\ \text{J s}$)

**(a)** $\lambda = h/mv = 6.626 \times 10^{-34} / (1.675 \times 10^{-27} \times 2200) = 1.80 \times 10^{-10}$ m $= 180$ pm.

**(b)** $m = 0.050$ kg, so $\lambda = 6.626 \times 10^{-34} / (0.050 \times 300) = 4.4 \times 10^{-35}$ m.`,
      v: table(['Particle', 'Wavelength', 'Detectable?'], [['Neutron, 2200 m s⁻¹', '180 pm (atomic scale)', 'Yes, diffracted by crystals'], ['Bullet, 300 m s⁻¹', r`$4.4 \times 10^{-35}$ m`, 'No']], 'Table comparing the wavelengths of a neutron and a bullet and whether they are detectable'),
      n: 'Divide Planck’s constant by the momentum, mass times speed, taking care to use kilograms. The slow neutron has a wavelength about the spacing between atoms in a crystal, so crystals can diffract it. The bullet’s wavelength is about thirty orders of magnitude smaller than the nucleus, so its wave nature is completely unobservable.',
    }),
    sl('concept', 'Heisenberg’s uncertainty principle', {
      b: 'It is impossible to know simultaneously and exactly both the **position** and the **momentum** of a microscopic particle: $\\Delta x \\cdot \\Delta p \\ge \\dfrac{h}{4\\pi}$, or $\\Delta x \\cdot \\Delta v \\ge \\dfrac{h}{4\\pi m}$. This rules out the idea of definite orbits.',
      v: table(['Particle', 'Δx fixed', 'Minimum Δv'], [['Electron', r`$1 \times 10^{-10}$ m`, r`about $6 \times 10^{5}$ m s⁻¹`], ['Cricket ball (0.16 kg)', r`$1 \times 10^{-3}$ m`, r`about $3 \times 10^{-31}$ m s⁻¹`]], 'Table of minimum velocity uncertainty for an electron and a cricket ball'),
      n: 'Heisenberg showed that the more precisely we fix an electron’s position, the less precisely we can know its momentum, and the product of the two uncertainties cannot fall below Planck’s constant divided by four pi. For an electron the unavoidable uncertainty in speed is enormous, so a definite orbit makes no sense. For a ball it is far too small to notice.',
    }),
    sl('example', 'Worked example: uncertainty in speed', {
      b: r`**Problem.** The position of an electron in an atom is known to within $5.0 \times 10^{-11}\ \text{m}$. Find the minimum uncertainty in its speed. ($m_\text{e} = 9.11 \times 10^{-31}\ \text{kg}$)

**Step 1.** $\Delta v \ge h / (4\pi m \Delta x)$.

**Step 2.** $4\pi m \Delta x = 4 \times 3.142 \times 9.11 \times 10^{-31} \times 5.0 \times 10^{-11} = 5.72 \times 10^{-40}$.

**Step 3.** $\Delta v = \dfrac{6.626 \times 10^{-34}}{5.72 \times 10^{-40}} \approx 1.16 \times 10^{6}$ m s⁻¹.`,
      v: flow('LR', [['a', 'Write Δv ≥ h / (4π m Δx)'], ['b', 'Compute the denominator'], ['c', 'Divide h by it']], [['a', 'b'], ['b', 'c']], 'Flow for calculating the minimum uncertainty in velocity from the uncertainty in position'),
      n: 'Rearrange the uncertainty relation to give the uncertainty in speed. Multiply four pi by the mass and the uncertainty in position, then divide Planck’s constant by that number. The result, more than a million metres per second, is comparable with the speed of the electron itself, which shows that we cannot talk about a precise path for an electron inside an atom.',
    }),
    sl('check', 'Quick check: matter waves', {
      b: 'Compare the wave nature of two particles.',
      n: 'Quick check. Wavelength is inversely proportional to momentum, so compare the masses or speeds.',
      chk: 'dual-chk',
    }),
    sl('concept', 'Orbitals: the quantum mechanical model', {
      b: 'Schrödinger’s equation gives wave functions $\\psi$ whose squares $\\psi^2$ give the **probability density** of finding an electron. An **orbital** is a region with a high probability of finding the electron; it is **not** a path.',
      v: table(['Feature', 'Bohr orbit', 'Orbital'], [['Nature', 'Definite circular path', 'Region of high probability'], ['Electron treated as', 'Particle', 'Particle and wave'], ['Maximum electrons', 'Not defined simply', 'Two (opposite spins)'], ['Valid for', 'One-electron species', 'All atoms']], 'Table comparing a Bohr orbit with a quantum mechanical orbital'),
      n: 'In the quantum mechanical model we solve Schrödinger’s equation for the electron’s wave function. The square of the wave function tells us how likely we are to find the electron at each point. An orbital is the region where that probability is high. It is not a path, and each orbital can hold at most two electrons. The model works for all atoms.',
    }),
    sl('concept', 'The four quantum numbers', {
      b: 'Each electron in an atom is described by four numbers: **n** (shell: size and energy), **l** (subshell: shape), **mₗ** (orientation) and **mₛ** (spin).',
      v: table(['Quantum number', 'Allowed values', 'Tells us'], [['Principal, n', '1, 2, 3, …', 'Shell, size and energy'], ['Azimuthal, l', '0 to n − 1 (s, p, d, f for 0, 1, 2, 3)', 'Subshell and shape'], ['Magnetic, mₗ', '−l to +l (2l + 1 values)', 'Orientation of the orbital'], ['Spin, mₛ', '+½ or −½', 'Direction of electron spin']], 'Table of the four quantum numbers with allowed values and meaning'),
      n: 'Four quantum numbers fix the state of an electron. The principal quantum number n sets the shell and the size. The azimuthal number l runs from zero to n minus one and sets the shape: s, p, d and f for zero to three. The magnetic number gives the orientation, with two l plus one values. The spin number is plus or minus one half.',
    }),
    sl('example', 'Worked example: counting orbitals and electrons', {
      b: r`**Problem.** For the shell $n = 3$: (a) list the subshells, (b) count the orbitals, (c) find the maximum number of electrons. (d) Is the set $n = 3, l = 3, m_l = 0$ allowed?

**(a)** $l = 0, 1, 2$: 3s, 3p, 3d.

**(b)** $(2l + 1)$: $1 + 3 + 5 = 9$ orbitals $= n^{2}$.

**(c)** Two electrons per orbital: $2 \times 9 = 18 = 2n^{2}$.

**(d)** No: $l$ cannot exceed $n - 1 = 2$.`,
      v: table(['Subshell', 'l', 'Orbitals (2l + 1)', 'Electrons'], [['3s', '0', '1', '2'], ['3p', '1', '3', '6'], ['3d', '2', '5', '10'], ['Total', '', '9', '18']], 'Table of subshells of the third shell with orbitals and electrons'),
      n: 'For the third shell, l can be zero, one or two, so there are three subshells. They hold one, three and five orbitals, nine in all, which is n squared. With two electrons per orbital, the shell holds eighteen electrons, which is two n squared. A value of l equal to three is not allowed for n equal to three, because l must be less than n.',
    }),
    sl('concept', 'Shapes of orbitals and nodes', {
      b: '**s** orbitals are spherical; **p** orbitals are dumbbells along $x$, $y$, $z$ (three per subshell); **d** orbitals have four lobes (or two lobes and a ring), five per subshell. A **node** is where $\\psi^2 = 0$: radial nodes $= n - l - 1$, angular nodes $= l$, total nodes $= n - 1$.',
      v: table(['Orbital', 'Radial nodes', 'Angular nodes', 'Total nodes'], [['1s', '0', '0', '0'], ['2s', '1', '0', '1'], ['2p', '0', '1', '1'], ['3s', '2', '0', '2'], ['3p', '1', '1', '2'], ['3d', '0', '2', '2']], 'Table of radial, angular and total nodes for six orbitals'),
      n: 'An s orbital is a sphere, a p orbital is a dumbbell with a nodal plane through the nucleus, and a d orbital has two angular nodes. A node is a place where the electron is never found. The number of angular nodes equals l, the number of radial nodes equals n minus l minus one, and the total number of nodes is n minus one.',
    }),
    sl('diagram', 'Pictures of s, p and d orbitals', {
      b: 'The lobes of different sign are shown in different colours; the **nodal planes** and **spherical nodes** are where the wave function changes sign.',
      v: V.orbitals,
      n: 'Look at the shapes. The one s orbital is a sphere with no node, and two s has a spherical shell where the probability falls to zero. The two p orbital is a dumbbell, with a nodal plane between the lobes. The d orbitals have four lobes, or two lobes and a ring, so two angular nodes. The size grows with n.',
    }),
    sl('check', 'Quick check: nodes', {
      b: 'Count the nodes of an orbital.',
      n: 'Quick check. Use the relations: angular nodes equal l, radial nodes equal n minus l minus one.',
      chk: 'nodes-chk',
    }),
    sl('concept', 'Energy of orbitals and the Aufbau principle', {
      b: 'In a many-electron atom energy depends on $n$ **and** $l$. Orbitals fill in order of increasing $(n + l)$; if equal, the lower $n$ fills first. **Aufbau principle:** electrons occupy the lowest-energy orbitals available.',
      v: table(['Orbital', 'n + l', 'Order of filling'], [['1s', '1', '1st'], ['2s, 2p', '2, 3', '2nd, 3rd'], ['3s, 3p', '3, 4', '4th, 5th'], ['4s', '4', '6th'], ['3d', '5', '7th'], ['4p', '5', '8th'], ['5s', '5', '9th (4d with n + l of 6 follows)']], 'Table of n plus l values and the order of filling of orbitals up to 4p'),
      n: 'In an atom with many electrons, an orbital’s energy depends on both n and l. We fill the lowest first, using the rule n plus l. Four s has n plus l equal to four, lower than three d at five, so four s fills before three d. When two orbitals tie, the one with the smaller n fills first. The order is one s, two s, two p, three s, three p, four s, three d, four p.',
    }),
    sl('concept', 'Pauli exclusion principle and Hund’s rule', {
      b: '**Pauli:** no two electrons in an atom can have the same four quantum numbers, so an orbital holds at most **two** electrons with opposite spins. **Hund:** degenerate orbitals of a subshell are filled **singly** with parallel spins before any pairing.',
      v: table(['Rule', 'Statement', 'Consequence'], [['Aufbau', 'Fill lowest energy first', 'Order 1s, 2s, 2p, 3s …'], ['Pauli', 'No two electrons share all four quantum numbers', 'Maximum two per orbital'], ['Hund', 'Singly occupy degenerate orbitals first', 'Maximum number of unpaired electrons']], 'Table of the Aufbau, Pauli and Hund rules with consequences'),
      n: 'Two more rules complete the filling. Pauli’s exclusion principle says no two electrons in an atom can have the same four quantum numbers, so an orbital holds at most two electrons and they must spin in opposite directions. Hund’s rule says that in a subshell like p, each orbital gets one electron before any gets a second, and the single electrons spin in the same direction.',
    }),
    sl('diagram', 'Box diagrams and the exceptional cases', {
      b: 'Nitrogen: three unpaired 2p electrons (Hund). Oxygen: one pair and two unpaired. **Chromium** and **copper** deviate from the simple order to reach half-filled or completely filled 3d.',
      v: V.boxes,
      n: 'In the box diagram, each box is an orbital and each arrow an electron. Nitrogen puts one electron in each of the three p boxes. Oxygen must pair one. The bottom two rows show the exceptions: chromium takes one electron from four s to make a half-filled three d, and copper takes one to make a completely filled three d.',
    }),
    sl('example', 'Worked example: writing configurations', {
      b: r`**Problem.** Write the ground-state configurations and the number of unpaired electrons: (a) $\ce{Cl-}$ (Z = 17), (b) Fe (Z = 26), (c) $\ce{Fe^3+}$.

**(a)** Cl: $1s^2 2s^2 2p^6 3s^2 3p^5$; adding one electron gives $\ce{Cl-}$: $[\text{Ne}]\,3s^2 3p^6$, with **0** unpaired electrons.

**(b)** Fe: $[\text{Ar}]\,3d^6 4s^2$; the six 3d electrons occupy five boxes, so **4** are unpaired.

**(c)** $\ce{Fe^3+}$: the two 4s electrons leave first, then one 3d: $[\text{Ar}]\,3d^5$, **5** unpaired electrons (half-filled).`,
      v: table(['Species', 'Configuration', 'Unpaired electrons'], [['Cl⁻', '[Ne] 3s² 3p⁶', '0'], ['Fe', '[Ar] 3d⁶ 4s²', '4'], ['Fe³⁺', '[Ar] 3d⁵', '5']], 'Table of configurations and unpaired electrons for chloride, iron and iron three plus'),
      n: 'Start with the atom’s configuration, then add or remove electrons for ions. Chloride gains one electron and has a full outer shell, so none are unpaired. Iron has six electrons in three d, so four are unpaired. When iron forms positive ions, the four s electrons leave first, then three d, so iron three plus has five unpaired electrons in a half-filled three d subshell.',
    }),
    sl('concept', 'Exceptional configurations: chromium and copper', {
      b: 'Cr is $[\\text{Ar}]\\,3d^5 4s^1$, not $3d^4 4s^2$; Cu is $[\\text{Ar}]\\,3d^{10} 4s^1$, not $3d^9 4s^2$. **Half-filled** and **completely filled** subshells are extra stable because of symmetrical distribution and greater **exchange energy**.',
      v: table(['Atom', 'Expected', 'Observed', 'Reason'], [['Cr (24)', '[Ar] 3d⁴ 4s²', '[Ar] 3d⁵ 4s¹', 'Half-filled 3d, six unpaired electrons'], ['Cu (29)', '[Ar] 3d⁹ 4s²', '[Ar] 3d¹⁰ 4s¹', 'Filled 3d subshell']], 'Table of expected and observed configurations of chromium and copper with the reason'),
      n: 'Two famous exceptions. Chromium would be expected to have four electrons in three d and two in four s, but one electron moves so that three d is exactly half-filled. Copper moves one electron to make three d completely filled. Half-filled and filled subshells are especially stable, because the electrons are symmetrically distributed and there is greater exchange energy.',
    }),
    sl('check', 'Quick check: configurations', {
      b: 'Choose the correct ground-state configuration.',
      n: 'Quick check. Remember the two exceptions in the first transition series.',
      chk: 'config-chk',
    }),
    sl('summary', 'Summary: Part 2', {
      ul: [
        'de Broglie: $\\lambda = h/mv$; Heisenberg: $\\Delta x\\,\\Delta p \\ge h/4\\pi$.',
        'Orbital: region of high probability; four quantum numbers n, l, mₗ, mₛ.',
        'Radial nodes $= n - l - 1$; angular nodes $= l$; total $= n - 1$; orbitals in shell $= n^2$.',
        'Filling: Aufbau ($n + l$), Pauli (two per orbital), Hund (singly first).',
        'Cr is $3d^5 4s^1$ and Cu is $3d^{10} 4s^1$ because half-filled and filled subshells are extra stable.',
      ],
      v: table(['Quantity', 'Value'], [['Orbitals in a shell', r`$n^2$`], ['Electrons in a shell', r`$2n^2$`], ['Orbitals in a subshell', r`$2l + 1$`], ['Total nodes', r`$n - 1$`]], 'Summary table of counting formulae for shells, subshells and nodes'),
      n: 'To sum up Part 2. Matter has a wavelength given by Planck’s constant over momentum, and the uncertainty principle forbids exact orbits. The electron in an atom is described by an orbital and four quantum numbers. Electrons fill orbitals by the Aufbau principle, Pauli’s exclusion principle and Hund’s rule, with chromium and copper as the standard exceptions.',
    }),
    sl('exam-tips', 'Exam tips: Part 2', {
      ul: [
        'Check allowed quantum numbers: l from 0 to n − 1, mₗ from −l to +l.',
        'Count nodes with radial nodes $= n - l - 1$ and angular nodes $= l$.',
        'For ions, remove electrons from the highest n first (4s before 3d).',
        'Show orbital box diagrams to argue Hund’s rule.',
        'Mention exchange energy and symmetry when explaining Cr and Cu.',
      ],
      v: table(['Slip', 'Fix'], [['Writing Cr as 3d⁴ 4s²', 'Cr is 3d⁵ 4s¹'], ['Removing 3d electrons first from Fe', 'Remove 4s first'], ['Calling an orbital a path', 'It is a region of probability']], 'Table of common slips in Part 2 and their fixes'),
      n: 'Exam tips for Part 2. Check each quantum number against its allowed range. Use the node formulae. For ions, remove electrons from the outermost shell first, so four s electrons leave before three d. Draw the box diagram when a question asks about unpaired electrons, and explain chromium and copper with half-filled and filled subshells.',
    }),
  ],
});
