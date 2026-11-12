// ISC 11 Chemistry ch03 Subatomic Particles and Early Atomic Models: two decks. Part 1 (t01-t03) cathode and anode rays, the
// three particles, atomic number, isotopes and isobars, Thomson and Rutherford; Part 2 (t04) black body, Planck, E = h nu,
// photoelectric effect.
import { sl, deck, table, flow, chem, svgV, r } from './lib.mjs';
import { DISCHARGE, SCATTER, MODELS, BLACKBODY, PHOTO, SPECTRUM } from './svgs.mjs';

const h = 6.626e-34;
const c = 3.0e8;
const f2 = (x) => x.toFixed(2);

export const V = {
  discharge: svgV(DISCHARGE, 'Discharge tube producing cathode rays, which cast a shadow of a metal cross, and a tube with a perforated cathode producing anode rays', 'Schematic; very low pressure and a high voltage are used.'),
  scatter: svgV(SCATTER, 'Alpha-particle scattering: apparatus with a thin gold foil and a zinc sulfide screen, and computed paths of alpha particles passing a nucleus at different distances', 'Part (b) is not to scale; paths follow repulsion by the nucleus.'),
  models: svgV(MODELS, 'Thomson model: electrons embedded in a positive sphere; Rutherford model: a tiny nucleus with electrons outside', 'Schematic, not to scale.'),
  blackbody: svgV(BLACKBODY, 'Intensity of black-body radiation against wavelength at three temperatures, with the wave-theory curve rising without limit at short wavelengths', 'Peaks move to shorter wavelength as temperature rises.'),
  photo: svgV(PHOTO, 'Kinetic energy of photoelectrons against frequency for two metals: zero below threshold, then straight parallel lines with slope h', 'Metal P has the lower threshold frequency.'),
  spectrum: svgV(SPECTRUM, 'Electromagnetic spectrum from radio waves to gamma rays showing wavelength ranges and the direction in which photon energy rises', 'Photon energy rises as wavelength falls.'),
};

// ---- worked-example data
const em = 1.602e-19 / 1.76e11; // kg
const ratioPE = 1.673e-27 / 9.10e-31;
const nuRed = c / 650e-9;
const ERed = h * nuRed;
const Pl = 0.05 * 40; // W of visible light from a 40 W bulb
const Eg = (h * c) / 550e-9;
const NgPerS = Pl / Eg;
const W560 = (h * c) / 560e-9;
const E420 = (h * c) / 420e-9;
const KE420 = E420 - W560;
const photonRow = (name, lam) => [name, `${lam} nm`, r`$${((h * c) / (lam * 1e-9) * 1e19).toFixed(2)} \times 10^{-19}$ J`];

export const deck1 = deck({
  part: 1,
  title: 'Subatomic Particles and Early Atomic Models — Part 1: Particles, atomic number and models',
  goals: [
    'Describe how cathode rays and anode rays are produced and list their properties',
    'Compare the charge and mass of the electron, proton and neutron and recall how each was discovered',
    'Find the numbers of protons, neutrons and electrons in atoms and ions; distinguish isotopes from isobars',
    'Explain the alpha-scattering experiment, the nuclear model and why it could not explain the stability of the atom',
  ],
  slides: [
    sl('title', 'Subatomic particles and early atomic models', {
      b: 'Part 1: how the electron, proton and neutron were found, and how the first models of the atom were tested.',
      v: table(['Particle', 'Symbol', 'Charge / C', 'Mass / kg', 'Relative mass'], [['Electron', r`$\ce{e-}$`, r`$-1.602 \times 10^{-19}$`, r`$9.11 \times 10^{-31}$`, '1 / 1837'], ['Proton', r`$\ce{p+}$`, r`$+1.602 \times 10^{-19}$`, r`$1.673 \times 10^{-27}$`, '1'], ['Neutron', 'n', '0', r`$1.675 \times 10^{-27}$`, 'about 1']], 'Table of symbol, charge and mass of the electron, proton and neutron'),
      n: 'Welcome. All the matter around you is built from just three kinds of particles: electrons, protons and neutrons. In this part we see how experiments with glowing gas tubes revealed them, how to count them in any atom or ion, and how an experiment with gold foil overturned the first picture of the atom.',
    }),
    sl('diagram', 'The discharge tube', {
      b: 'A glass tube at **very low pressure** carries a **high voltage** between two electrodes. **Cathode rays** leave the cathode; with a perforated cathode, **anode rays** pass through the holes behind it.',
      v: V.discharge,
      n: 'Look at the two tubes. The gas inside is at very low pressure and a high voltage joins the electrodes. In the top tube, rays stream out of the cathode and make the screen glow, and a metal cross in their path casts a sharp shadow. In the lower tube the cathode has holes, and a different beam of positive particles passes through them.',
    }),
    sl('concept', 'Properties of cathode rays', {
      b: 'Cathode rays are streams of **electrons**. They are the same whatever the gas or the cathode metal, so the electron is a **universal constituent of matter**. Thomson measured the ratio $e/m_\\text{e} = 1.76 \\times 10^{11}\\ \\text{C kg}^{-1}$.',
      v: table(['Observation', 'What it shows'], [['Sharp shadow of an object', 'Rays travel in straight lines from the cathode'], ['Bend towards a positive plate; bend in a magnetic field', 'Particles carry negative charge'], ['Turn a light paddle wheel', 'Particles have mass and momentum'], ['Same e/m for every gas and metal', 'Electrons are present in all atoms'], ['Produce X-rays on striking a heavy metal', 'Fast electrons give out X-rays on stopping']], 'Table of observations on cathode rays and what each shows'),
      n: 'Cathode rays move in straight lines, which is why objects cast sharp shadows. They bend towards a positive plate, so they carry negative charge. They can turn a tiny paddle wheel, so they have mass. Most important, the ratio of charge to mass is the same for every gas and every cathode metal. That means every atom contains these electrons.',
    }),
    sl('concept', 'Anode rays', {
      b: 'Fast electrons knock electrons out of gas atoms. The **positive ions** formed move towards the cathode, and those passing through its holes form **anode rays** (canal rays). Their $e/m$ depends on the gas; hydrogen gives the largest value because **H⁺ is the lightest**, and it is the **proton**.',
      v: table(['Feature', 'Cathode rays', 'Anode rays'], [['Particles', 'Electrons', 'Positive ions of the gas'], ['Charge', 'Negative', 'Positive'], ['Bend in an electric field', 'Towards positive plate', 'Towards negative plate'], ['e/m', 'Same for every gas', 'Depends on the gas'], ['Lightest case', 'Electron', 'H⁺ (proton)']], 'Table comparing cathode rays and anode rays'),
      n: 'Anode rays are made differently. Electrons in the tube knock electrons out of gas atoms and leave positive ions behind. Those ions drift towards the cathode, and some pass through its holes. Because the particles are ions of the gas, their charge to mass ratio changes with the gas. Hydrogen gives the largest value, and its ion is the proton.',
    }),
    sl('concept', 'Chadwick and the neutron', {
      b: 'In 1932 Chadwick bombarded **beryllium** with alpha particles. The radiation was **not deflected** by electric or magnetic fields and knocked protons out of paraffin wax, so it was made of **neutral particles of mass close to the proton**.',
      v: chem(r`^9_4Be + ^4_2He -> ^12_6C + ^1_0n`, 'Nuclear equation: beryllium-9 and an alpha particle form carbon-12 and a neutron', 'Mass numbers 9 + 4 = 12 + 1; atomic numbers 4 + 2 = 6 + 0.'),
      n: 'Chadwick fired alpha particles at beryllium and found a very penetrating radiation. Electric and magnetic fields could not bend it, so it was uncharged. It knocked protons out of paraffin wax with large energy, which needs particles about as heavy as a proton. He had found the neutron. In the equation, mass numbers and atomic numbers balance on both sides.',
    }),
    sl('example', 'Worked example: mass of the electron', {
      b: r`**Problem.** The particles of cathode rays have $e/m = 1.76 \times 10^{11}\ \text{C kg}^{-1}$ and charge $1.602 \times 10^{-19}\ \text{C}$. (a) Find the mass of one particle. (b) How many such particles weigh as much as one proton, mass $1.673 \times 10^{-27}$ kg?

**(a)** $m = \dfrac{e}{e/m} = \dfrac{1.602 \times 10^{-19}}{1.76 \times 10^{11}} = ${(em * 1e31).toFixed(2)} \times 10^{-31}$ kg.

**(b)** $\dfrac{1.673 \times 10^{-27}}{9.10 \times 10^{-31}} = ${Math.round(ratioPE)}$, so about 1840 electrons.`,
      v: table(['Step', 'Result'], [['Mass of the particle', r`$9.10 \times 10^{-31}$ kg`], ['Proton mass ÷ electron mass', 'about 1840'], ['Conclusion', 'Electron mass is negligible compared with a nucleon']], 'Table of results of the electron mass example'),
      n: 'Divide the charge by the charge to mass ratio and you get the mass of the particle, about nine times ten to the power of minus thirty-one kilograms. Dividing the proton mass by this value shows that a proton weighs about eighteen hundred and forty electrons. So almost all the mass of an atom comes from protons and neutrons.',
    }),
    sl('check', 'Quick check: the neutron', {
      b: 'Decide what a radiation that no field can bend must be made of.',
      n: 'Quick check. Read the question carefully before choosing. The radiation passed through electric and magnetic fields without bending, which tells you about its charge. It also knocked protons out of paraffin wax, which tells you about its mass. Combine the two clues and pick the particle that fits both.',
      chk: 'chadwick-mcq',
    }),
    sl('concept', 'Atomic number and mass number', {
      b: 'The **atomic number** $Z$ is the number of protons; it fixes the element. The **mass number** $A$ is protons plus neutrons. In the symbol $^{A}_{Z}\\text{X}$: neutrons $= A - Z$. A neutral atom has $Z$ electrons; a cation has fewer, an anion has more.',
      v: table(['Species', 'Protons', 'Neutrons', 'Electrons'], [[r`$^{27}_{13}\text{Al}$`, '13', '14', '13'], [r`$^{27}_{13}\text{Al}^{3+}$`, '13', '14', '10'], [r`$^{16}_{8}\text{O}^{2-}$`, '8', '8', '10']], 'Table of counts of particles in an aluminium atom, an aluminium ion and an oxide ion'),
      n: 'The atomic number tells you the number of protons and so fixes which element you have. The mass number is the sum of protons and neutrons, so neutrons are the mass number minus the atomic number. An atom has as many electrons as protons. When it becomes an ion, only the electrons change, never the protons or neutrons.',
    }),
    sl('concept', 'Isotopes and isobars', {
      b: '**Isotopes**: same $Z$, different $A$ (different neutrons); they behave alike chemically because they have the same electrons. **Isobars**: same $A$, different $Z$; they are different elements.',
      v: table(['Pair', 'Same', 'Different', 'Type'], [[r`$^{35}\text{Cl}$ and $^{37}\text{Cl}$`, 'Z = 17', 'A = 35, 37', 'Isotopes'], [r`protium, deuterium, tritium`, 'Z = 1', 'A = 1, 2, 3', 'Isotopes of hydrogen'], [r`$^{14}\text{C}$ and $^{14}\text{N}$`, 'A = 14', 'Z = 6, 7', 'Isobars'], [r`$^{24}\text{Na}$ and $^{24}\text{Mg}$`, 'A = 24', 'Z = 11, 12', 'Isobars']], 'Table of isotope and isobar pairs'),
      n: 'Isotopes are atoms of one element with different numbers of neutrons. Chlorine thirty-five and chlorine thirty-seven are an example, and the three forms of hydrogen are another. Their chemistry is the same because the electrons are the same. Isobars are different elements that happen to have the same mass number, such as carbon fourteen and nitrogen fourteen.',
    }),
    sl('example', 'Worked example: counting particles in ions', {
      b: r`**Problem.** Find the numbers of protons, neutrons and electrons in $^{59}_{27}\text{Co}^{3+}$, $^{127}_{53}\text{I}^{-}$ and $^{27}_{13}\text{Al}^{3+}$.

**Co³⁺:** protons 27; neutrons $59 - 27 = 32$; electrons $27 - 3 = 24$.

**I⁻:** protons 53; neutrons $127 - 53 = 74$; electrons $53 + 1 = 54$.

**Al³⁺:** protons 13; neutrons $27 - 13 = 14$; electrons $13 - 3 = 10$.`,
      v: table(['Ion', 'p', 'n', 'e'], [['Co³⁺', '27', '32', '24'], ['I⁻', '53', '74', '54'], ['Al³⁺', '13', '14', '10']], 'Table of protons, neutrons and electrons in three ions'),
      n: 'For each ion, read the protons from the atomic number, subtract that from the mass number for the neutrons, and then adjust the electrons for the charge. A positive charge means electrons were lost, so there are fewer. A negative charge means electrons were gained, so there are more. Always check that protons minus electrons equals the charge.',
    }),
    sl('check', 'Quick check: ions', {
      b: 'Count protons, neutrons and electrons in an ion.',
      n: 'Quick check. Work in three steps. The atomic number gives the number of protons. The mass number minus the atomic number gives the neutrons. Then compare the charge on the ion with the number of protons to find how many electrons it has gained or lost. Check your three numbers against the options.',
      chk: 'count-mcq',
    }),
    sl('concept', 'Thomson’s model', {
      b: 'Thomson (1904) imagined a **sphere of positive charge** with electrons **embedded** in it like seeds in a watermelon. The positive and negative charges cancel, so the atom is neutral. The charge is spread everywhere, so no part of the atom is very dense.',
      v: V.models,
      n: 'The first model of the atom was proposed by Thomson. Picture a sphere of positive charge with electrons scattered through it like seeds in a watermelon. The total positive charge equals the total negative charge, so the atom is neutral. On the right is the model that replaced it, in which the positive charge sits in a tiny nucleus.',
    }),
    sl('diagram', 'Rutherford’s alpha-scattering experiment', {
      b: 'Alpha particles ($\\ce{He^2+}$) were fired at a **very thin gold foil**; flashes on a zinc sulfide screen showed their paths. The computed paths show **bigger deflection for a closer approach** to the positive nucleus.',
      v: V.scatter,
      n: 'In the experiment, alpha particles from a source pass through slits and hit a very thin gold foil. A circular screen coated with zinc sulfide flashes where they land. On the right you can see what happens near one nucleus. Particles far from it hardly bend, those closer bend more, and one aimed almost head on is turned back.',
    }),
    sl('concept', 'Observations and conclusions', {
      b: 'Rutherford (1911) concluded that the atom has a **small, dense, positively charged nucleus** with electrons outside. The nucleus has a radius of about $10^{-15}$ m against about $10^{-10}$ m for the atom, so the atom is **mostly empty space**.',
      v: table(['Observation', 'Conclusion'], [['Most alpha particles pass straight through', 'Most of the atom is empty space'], ['A few are deflected through small angles', 'The centre is positively charged and repels alpha particles'], ['Very few (about 1 in 20 000) rebound', 'Charge and nearly all the mass are concentrated in a tiny nucleus']], 'Table of observations of the scattering experiment and the conclusions'),
      n: 'Each observation gives a conclusion. Most particles went straight through, so most of the atom is empty space. A few bent slightly, so the centre is positive and repels them. Very few bounced back, so the positive charge and nearly all the mass sit in a tiny nucleus, about one hundred thousand times smaller across than the atom.',
    }),
    sl('concept', 'Limitations of the nuclear model', {
      b: 'An electron circling the nucleus is **accelerated**, so classical theory says it should **radiate energy and spiral into the nucleus**. The model cannot explain the **stability** of the atom or the **line spectra** of atoms, and says nothing about the arrangement of electrons.',
      v: flow('LR', [['a', 'Electron circles the nucleus'], ['b', 'Accelerated charge radiates energy'], ['c', 'Electron loses energy and spirals in'], ['d', 'Atom would collapse; spectrum would be continuous']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Flow chart: an orbiting electron radiates energy, spirals inwards and the atom would collapse'),
      n: 'Here is the weakness of the nuclear model. An electron moving in a circle is constantly accelerating, and an accelerated charge should give out radiation. It would lose energy and spiral into the nucleus, and the atom would collapse in a fraction of a second. Real atoms are stable and give line spectra, so a better model was needed.',
    }),
    sl('check', 'Quick check: reading the experiment', {
      b: 'Link the rebound of a few alpha particles to the structure of the atom.',
      n: 'Quick check. Ask yourself what kind of centre could turn back a fast, heavy, positive alpha particle. Then think about the tiny fraction of particles that were reversed, and what that fraction says about the size of that centre compared with the whole atom. Choose the option that matches both ideas.',
      chk: 'foil-mcq',
    }),
    sl('summary', 'Summary: Part 1', {
      ul: [
        'Cathode rays: electrons, same e/m for every gas. Anode rays: positive ions of the gas; H⁺ is the proton. Chadwick found the neutron (1932).',
        'Atomic number Z = protons; mass number A = protons + neutrons; neutrons = A − Z.',
        'Isotopes: same Z, different A. Isobars: same A, different Z.',
        'Thomson: positive sphere with embedded electrons. Rutherford: small, dense, positive nucleus; atom mostly empty space.',
        'Rutherford’s model cannot explain the stability of the atom or line spectra.',
      ],
      v: table(['Particle', 'Charge', 'Mass', 'Found by'], [['Electron', '−1', 'about 1/1837', 'Thomson'], ['Proton', '+1', '1', 'Goldstein, Rutherford'], ['Neutron', '0', 'about 1', 'Chadwick']], 'Summary table of the three subatomic particles'),
      n: 'Let us sum up. Cathode rays are electrons and anode rays are positive ions. Chadwick discovered the neutron. The atomic number counts protons and the mass number counts protons plus neutrons. Thomson placed electrons inside a positive sphere, and Rutherford replaced this with a tiny nucleus. His model could not explain why atoms are stable.',
    }),
    sl('exam-tips', 'Exam tips: Part 1', {
      ul: [
        'For ions, change only the electrons: protons and neutrons stay the same.',
        'Write each observation of the foil experiment with its own conclusion.',
        'Give the limitation of Rutherford’s model as stability plus line spectra.',
        'For anode rays, remember that e/m depends on the gas; for cathode rays it does not.',
        'Write nuclear equations with equal mass numbers and equal atomic numbers on both sides.',
      ],
      v: table(['Slip', 'Fix'], [['Changing neutrons when an ion forms', 'Only electrons change'], ['Calling isobars isotopes', 'Isotopes share Z; isobars share A'], ['Writing only one limitation', 'State stability and line spectra']], 'Table of common slips in Part 1 and their fixes'),
      n: 'Some exam tips. When an ion forms, only the electrons change. Do not mix up isotopes and isobars: isotopes share the atomic number, isobars share the mass number. When asked about the foil experiment, pair each observation with its conclusion. And remember that anode rays change with the gas, while cathode rays do not.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Subatomic Particles and Early Atomic Models — Part 2: Black body, quanta and the photoelectric effect',
  goals: [
    'Explain why wave theory failed for black-body radiation and the photoelectric effect',
    'State Planck’s quantum theory and use E = hν = hc/λ for photon energy, number of photons and energy per mole',
    'Use the threshold frequency and KE = h(ν − ν₀) to solve photoelectric problems',
  ],
  slides: [
    sl('title', 'Light as waves and as quanta', {
      b: 'Part 2: by 1900 wave theory could not explain two experiments. The answer was that energy comes in packets.',
      v: V.spectrum,
      n: 'Welcome to Part 2. For a long time light was treated as a wave, described by its wavelength and frequency. But two experiments, the glow of hot bodies and the release of electrons by light, could not be explained that way. The explanation came from the idea that radiant energy comes in small packets called quanta.',
    }),
    sl('concept', 'What the wave theory could not explain', {
      b: 'Wave theory explains interference, diffraction and $c = \\nu\\lambda$, with $c = 3.0 \\times 10^{8}\\ \\text{m s}^{-1}$. It **fails** for (i) the distribution of energy in the radiation from a **black body** and (ii) the **photoelectric effect**.',
      v: table(['Phenomenon', 'Wave theory explains?'], [['Interference and diffraction of light', 'Yes'], ['Reflection and refraction', 'Yes'], ['Colour of a heated body (black body)', 'No: predicts unlimited intensity at short wavelengths'], ['Photoelectric effect', 'No: predicts no threshold and a time lag']], 'Table of phenomena the wave theory explains and those it cannot'),
      n: 'The wave theory of light works well for interference, diffraction, reflection and refraction. Wavelength and frequency are linked by the speed of light. But it fails in two places. It cannot explain how a heated body shares its energy among wavelengths, and it cannot explain what happens when light falls on a metal and releases electrons.',
    }),
    sl('diagram', 'Black-body radiation', {
      b: 'A **black body** absorbs all radiation falling on it and emits a spectrum that depends only on temperature. As $T$ rises, the **peak moves to shorter wavelength**, and the total energy rises. Wave theory predicted an intensity that **rises without limit** at short wavelengths.',
      v: V.blackbody,
      n: 'Here are the measured curves for three temperatures. Each rises to a peak and falls again at short wavelengths. As the temperature goes up the peak moves to shorter wavelength, which is why a hot rod goes from red to white. The dashed line is what wave theory predicted, and it does not match the experiment at all.',
    }),
    sl('concept', 'Planck’s quantum theory', {
      b: 'Planck (1900): a body emits or absorbs energy **only in discrete packets, quanta**; the energy of one quantum is proportional to the frequency. $$E = h\\nu = \\frac{hc}{\\lambda}, \\qquad h = 6.626 \\times 10^{-34}\\ \\text{J s}$$ The total energy is a whole-number multiple of $h\\nu$, so it is **quantised**.',
      v: table(['Quantity', 'Symbol and unit', 'Relation'], [['Energy of a quantum', 'E, joule', r`$E = h\nu$`], ['Frequency', 'ν, hertz', r`$\nu = c/\lambda$`], ['Wavelength', 'λ, metre', r`$\lambda = c/\nu$`], ['Planck constant', r`$h = 6.626 \times 10^{-34}$ J s`, 'A constant of nature']], 'Table of the quantities in Planck’s equation'),
      n: 'Planck proposed that energy is not given out smoothly. A body emits or absorbs it in packets called quanta, and the energy of one quantum is Planck’s constant times the frequency. Since frequency is the speed of light divided by wavelength, short wavelength means large quanta. With this idea the black body curves were explained exactly.',
    }),
    sl('concept', 'Energy of photons of different colours', {
      b: 'Because $E = hc/\\lambda$, **shorter wavelength means more energy per photon**: violet photons carry more energy than red, and ultraviolet more than visible. Radio photons carry very little energy.',
      v: table(['Light', 'Wavelength', 'Energy of one photon'], [photonRow('Red', 700), photonRow('Yellow', 589), photonRow('Green', 530), photonRow('Violet', 400), photonRow('Ultraviolet', 254)], 'Table of photon energies for red, yellow, green, violet and ultraviolet light'),
      n: 'The table shows photon energies worked out from the wavelength. Red photons carry the least energy of these and ultraviolet photons the most. This is why ultraviolet light can damage skin and start chemical changes that visible light cannot. The energy of a photon depends only on its frequency, never on how bright the light is.',
    }),
    sl('example', 'Worked example: frequency and energy of a photon', {
      b: r`**Problem.** A red laser pointer emits light of wavelength $650\ \text{nm}$. Find the frequency and the energy of one photon. ($c = 3.0 \times 10^{8}\ \text{m s}^{-1}$, $h = 6.626 \times 10^{-34}\ \text{J s}$)

$\nu = \dfrac{c}{\lambda} = \dfrac{3.0 \times 10^{8}}{6.50 \times 10^{-7}} = ${f2(nuRed / 1e14)} \times 10^{14}$ Hz.

$E = h\nu = 6.626 \times 10^{-34} \times ${f2(nuRed / 1e14)} \times 10^{14} = ${f2(ERed * 1e19)} \times 10^{-19}$ J.`,
      v: table(['Step', 'Result'], [['Wavelength in metres', r`$6.50 \times 10^{-7}$ m`], ['Frequency', r`$4.62 \times 10^{14}$ Hz`], ['Energy of one photon', r`$3.06 \times 10^{-19}$ J`]], 'Table of the results for the red laser pointer'),
      n: 'First convert the wavelength to metres. Divide the speed of light by it to get the frequency, about four point six times ten to the fourteen hertz. Multiply the frequency by Planck’s constant to get the energy of one photon, about three times ten to the minus nineteen joule. A single photon carries a tiny amount of energy.',
    }),
    sl('check', 'Quick check: one photon', {
      b: 'Convert the wavelength to metres and use $E = hc/\\lambda$.',
      n: 'Quick check. Convert the wavelength from nanometres to metres before you start. Then multiply Planck’s constant by the speed of light and divide by the wavelength. Remember that energy is inversely proportional to wavelength, so a yellow photon should carry a little less energy than a green one. Give your answer in the units asked.',
      chk: 'sodium-num',
    }),
    sl('example', 'Worked example: number of photons', {
      b: r`**Problem.** A 40 W filament bulb turns 5% of its power into visible light of wavelength $550\ \text{nm}$. How many photons does it emit each second?

Light power $= 0.05 \times 40 = ${Pl.toFixed(1)}$ W $= ${Pl.toFixed(1)}$ J s⁻¹.

$E = \dfrac{hc}{\lambda} = \dfrac{6.626 \times 10^{-34} \times 3.0 \times 10^{8}}{5.50 \times 10^{-7}} = ${f2(Eg * 1e19)} \times 10^{-19}$ J.

Photons per second $= \dfrac{${Pl.toFixed(1)}}{${f2(Eg * 1e19)} \times 10^{-19}} = ${f2(NgPerS / 1e18)} \times 10^{18}$.`,
      v: table(['Quantity', 'Value'], [['Power as light', '2.0 W'], ['Energy of one photon', r`$3.61 \times 10^{-19}$ J`], ['Photons per second', r`$5.53 \times 10^{18}$`]], 'Table of the quantities in the photon-number example'),
      n: 'Only a small part of the bulb’s power leaves as visible light, here two watts. Divide that power by the energy of one photon to count how many photons leave every second. The answer is about five and a half billion billion. So many photons arrive that light seems smooth, even though it is made of separate packets.',
    }),
    sl('diagram', 'The photoelectric effect', {
      b: 'When light of **high enough frequency** falls on a metal surface, **electrons are emitted**. Each electron takes its energy from **one photon**.',
      v: flow('LR', [['a', 'Light of frequency ν falls on a metal plate'], ['b', 'One photon gives its energy hν to one electron'], ['c', 'If hν exceeds the work function, the electron leaves'], ['d', 'Extra energy appears as kinetic energy']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Flow chart of the photoelectric effect: a photon gives its energy to one electron, which leaves if the energy exceeds the work function'),
      n: 'Here is the photoelectric effect in steps. Light of a certain frequency falls on a metal plate. One photon passes all its energy to one electron. If that energy is larger than the energy that binds the electron to the metal, the electron escapes. Whatever energy is left over becomes the kinetic energy of the escaping electron.',
    }),
    sl('concept', 'Observations that wave theory cannot explain', {
      b: 'Einstein (1905) explained the effect with photons. The **work function** $W_0 = h\\nu_0$ is the minimum energy to remove an electron. Then $$h\\nu = h\\nu_0 + \\text{KE} \\quad\\Rightarrow\\quad \\text{KE} = h(\\nu - \\nu_0)$$ This supports the **particle nature of light**.',
      v: table(['Observation', 'Photon explanation'], [['No emission below the threshold frequency, whatever the brightness', 'A photon below ν₀ has too little energy for any electron'], ['KE depends on frequency, not on brightness', 'Each electron receives one photon’s energy, hν'], ['More brightness gives more electrons', 'More photons arrive each second'], ['Emission is instantaneous', 'One photon gives its energy to one electron at once']], 'Table of observations of the photoelectric effect with the photon explanation'),
      n: 'Einstein explained everything by treating light as photons. Below the threshold frequency no single photon can free an electron, however many arrive. Above it, the kinetic energy is the photon energy minus the work function, so it depends on frequency only. Brighter light brings more photons, so more electrons, and each acts at once.',
    }),
    sl('diagram', 'Kinetic energy against frequency', {
      b: 'A graph of $\\text{KE}$ against $\\nu$ is a **straight line of slope $h$** for every metal; the intercept on the frequency axis is the **threshold frequency** $\\nu_0$. Metals differ only in $\\nu_0$.',
      v: V.photo,
      n: 'This graph shows kinetic energy against frequency for two metals. Below the threshold there are no electrons, so the energy is zero. Above it the graph is a straight line. Both lines have the same slope, which is Planck’s constant, and they differ only in where they start. The metal with the lower threshold needs less energetic photons.',
    }),
    sl('example', 'Worked example: threshold wavelength and kinetic energy', {
      b: r`**Problem.** The threshold wavelength of a cathode is $560\ \text{nm}$ (given). Find the work function and the maximum kinetic energy of electrons when light of wavelength $420\ \text{nm}$ falls on it.

$W_0 = \dfrac{hc}{\lambda_0} = \dfrac{6.626 \times 10^{-34} \times 3.0 \times 10^{8}}{5.60 \times 10^{-7}} = ${f2(W560 * 1e19)} \times 10^{-19}$ J.

$E = \dfrac{6.626 \times 10^{-34} \times 3.0 \times 10^{8}}{4.20 \times 10^{-7}} = ${f2(E420 * 1e19)} \times 10^{-19}$ J, so $\text{KE} = ${f2(E420 * 1e19)} \times 10^{-19} - ${f2(W560 * 1e19)} \times 10^{-19} = ${f2(KE420 * 1e19)} \times 10^{-19}$ J.`,
      v: table(['Quantity', 'Value'], [['Work function', r`$3.55 \times 10^{-19}$ J`], ['Photon energy at 420 nm', r`$4.73 \times 10^{-19}$ J`], ['Maximum kinetic energy', r`$1.18 \times 10^{-19}$ J`]], 'Table of the work function, photon energy and kinetic energy in the example'),
      n: 'Find the work function from the threshold wavelength, using Planck’s constant times the speed of light divided by the wavelength. Then find the energy of the incident photon in the same way. The kinetic energy of the fastest electron is the photon energy minus the work function. Here the photon is the more energetic, so electrons come out.',
    }),
    sl('check', 'Quick check: threshold wavelength', {
      b: 'Compare each wavelength with the threshold wavelength.',
      n: 'Quick check. Compare each wavelength with the threshold wavelength, one at a time. Emission happens only when the light has a wavelength shorter than the threshold, which is the same as a frequency higher than the threshold frequency. Decide for each light whether its photons carry enough energy, then pick the option that matches.',
      chk: 'threshold-mcq',
    }),
    sl('concept', 'Brightness or frequency?', {
      b: 'Frequency decides **whether** electrons are emitted and **how much kinetic energy** they have. Brightness (intensity) decides only **how many** are emitted each second, provided $\\nu > \\nu_0$.',
      v: table(['Change in the light', 'Effect on emission'], [['Frequency raised above ν₀', 'Emission starts; KE rises'], ['Brightness doubled (ν above ν₀)', 'Twice as many electrons; same KE'], ['Brightness raised (ν below ν₀)', 'Still no electrons'], ['Frequency raised further', 'KE rises linearly with ν']], 'Table of the effects of changing frequency and brightness'),
      n: 'Remember the roles. Frequency decides whether electrons come out at all and how much energy they carry. Brightness decides only how many come out each second, and only when the frequency is above the threshold. Making dim red light brighter will never release electrons from a metal that needs ultraviolet.',
    }),
    sl('check', 'Quick check: brightness', {
      b: 'Decide what doubling the brightness changes.',
      n: 'Quick check. Think about what brightness really changes. A brighter beam delivers more photons every second, but each photon still has the same energy, because that depends only on frequency. Now decide how the number of electrons leaving the zinc plate each second, and their energy, would be affected by doubling the brightness.',
      chk: 'photo-tf',
    }),
    sl('summary', 'Summary: Part 2', {
      ul: [
        'Wave theory failed for black-body radiation and for the photoelectric effect.',
        'Planck: energy is emitted or absorbed in quanta, E = hν = hc/λ, h = 6.626 × 10⁻³⁴ J s.',
        'Photon energy rises as wavelength falls; photons per second = power ÷ energy of one photon.',
        'Photoelectric effect: threshold frequency ν₀; KE = h(ν − ν₀); brightness changes only the number of electrons.',
      ],
      v: table(['Formula', 'Use'], [[r`$c = \nu\lambda$`, 'Frequency and wavelength'], [r`$E = h\nu = hc/\lambda$`, 'Energy of a photon'], [r`$W_0 = h\nu_0$`, 'Work function'], [r`$\text{KE} = h(\nu - \nu_0)$`, 'Photoelectron energy']], 'Summary table of the main formulae of Part 2'),
      n: 'Summing up Part 2. Wave theory could not explain black body radiation or the photoelectric effect. Planck’s idea that energy comes in quanta equal to Planck’s constant times frequency solved both. Photon energy rises as wavelength falls. In the photoelectric effect, frequency above the threshold decides emission and kinetic energy, and brightness decides only the number of electrons.',
    }),
    sl('exam-tips', 'Exam tips: Part 2', {
      ul: [
        'Convert nm to metres (× 10⁻⁹) and MHz to hertz (× 10⁶) before substituting.',
        'In a photoelectric problem, first compare the frequency or wavelength with the threshold.',
        'For photons per second, divide the power in watts by the energy of one photon in joules.',
        'For energy per mole of photons, multiply by 6.022 × 10²³ and convert joules to kilojoules.',
        'Say clearly that brightness changes the number of electrons and frequency changes their kinetic energy.',
      ],
      v: table(['Slip', 'Fix'], [['Using nm directly in c = νλ', 'Convert to metres'], ['Saying brighter light gives faster electrons', 'KE depends on frequency only'], ['Using the wavelength where frequency is needed', 'Use ν = c/λ first']], 'Table of common slips in Part 2 and their fixes'),
      n: 'Some exam tips. Convert units before substituting. In a photoelectric question, compare with the threshold first, because if the frequency is too low the answer is simply no emission. For photons per second, divide power by the energy of one photon. And say clearly that brightness changes the number of electrons while frequency changes their energy.',
    }),
  ],
});
