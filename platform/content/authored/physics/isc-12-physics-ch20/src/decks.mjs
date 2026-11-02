// ISC 12 Physics ch20 Nuclei and Nuclear Energy — two decks: Part 1 (t01–t02) composition and size of the nucleus, nuclear
// density, isotopes/isobars/isotones, the unified atomic mass unit, E = mc², mass defect and binding energy, pair production
// and annihilation; Part 2 (t03–t05) the binding energy per nucleon curve, fission, the chain reaction, the reactor and the
// bomb, fusion, the Sun and stars, the hydrogen bomb. Radioactivity and the decay law are not in this ISC chapter.
// Constants as stated in the stems: R₀ = 1.2 fm (decks), m_H = 1.007825 u, mₙ = 1.008665 u, 1 u = 931.5 MeV, mₑc² = 0.511 MeV.
// Numbers computed here.
import { sl, deck, table, svgV, plot, r, dec, sci } from '../../isc-12-physics-ch01/src/lib.mjs';
import * as G from './svgs.mjs';

const { NUC, be, dmU, rad, rho, rho0, nu, nk, MH, MN, UMEV, MEC2 } = G;

// ---------------------------------------------------------------- worked-example numbers
const ex1 = { A: 64, Z: 30 };
ex1.R = rad(ex1.A, 1.2);
ex1.rho = rho(ex1.A, 1.2, 1.67e-27);
ex1.V = (4 / 3) * Math.PI * (ex1.R * 1e-15) ** 3;
const ex2 = { m: 1.6605e-27, c: 2.998e8, e: 1.602e-19 };
ex2.J = ex2.m * ex2.c ** 2;
ex2.MeV = ex2.J / ex2.e / 1e6;
const ex3 = { k: 'Ne20' };
ex3.free = NUC.Ne20.Z * MH + (NUC.Ne20.A - NUC.Ne20.Z) * MN;
ex3.dm = dmU('Ne20');
ex3.B = be('Ne20');
ex3.BA = ex3.B / NUC.Ne20.A;
const ex4 = { E: 3.0 };
ex4.excess = ex4.E - 2 * MEC2;
ex4.each = ex4.excess / 2;
ex4.lam = (G.HCMEVFM / (2 * MEC2)) / 1000; // pm
const ex5 = { A: 236, b1: 7.6, b2: 8.5 };
ex5.E = ex5.A * (ex5.b2 - ex5.b1);
const ex6 = { react: [NUC.U235.M, MN], prod: [NUC.Ba141.M, NUC.Kr92.M, 3 * MN] };
ex6.dm = ex6.react.reduce((a, b) => a + b, 0) - ex6.prod.reduce((a, b) => a + b, 0);
ex6.Q = ex6.dm * UMEV;
const ex7 = { T: 1.5e7 };
ex7.U = G.barrierMeV;
ex7.Tneed = (2 * ex7.U * 1e6 * 1.6e-19) / (3 * G.KB);
ex7.thermal = G.thermalEV(ex7.T);
const ex8 = { react: [NUC.H2.M, NUC.He3.M], prod: [NUC.He4.M, MH] };
ex8.dm = ex8.react.reduce((a, b) => a + b, 0) - ex8.prod.reduce((a, b) => a + b, 0);
ex8.Q = ex8.dm * UMEV;
export const EX = { ex1, ex2, ex3, ex4, ex5, ex6, ex7, ex8 };
for (const [ok, msg] of [
  [Math.abs(ex1.R - 4.8) < 1e-9 && Math.abs(ex1.rho / 1e17 - 2.307) < 0.002 && Math.abs(rho0(1.2) - ex1.rho) / ex1.rho < 1e-9, 'ex1'],
  [Math.abs(ex2.MeV - 931.6) < 0.1 && Math.abs(ex2.J - 1.4924e-10) < 2e-14, 'ex2'],
  [Math.abs(ex3.dm - 0.17246) < 1e-9 && Math.abs(ex3.B - 160.65) < 0.01 && Math.abs(ex3.BA - 8.0325) < 0.001, 'ex3'],
  [Math.abs(ex4.excess - 1.978) < 1e-9 && Math.abs(ex4.each - 0.989) < 1e-9 && Math.abs(ex4.lam - 1.2133) < 0.001, 'ex4'],
  [Math.abs(ex5.E - 212.4) < 1e-9, 'ex5'],
  [Math.abs(ex6.dm - 0.186033) < 1e-9 && Math.abs(ex6.Q - 173.29) < 0.01, 'ex6'],
  [Math.abs(ex7.U - 0.6) < 1e-12 && Math.abs(ex7.Tneed / 1e9 - 4.638) < 0.002 && Math.abs(ex7.thermal - 1941) < 1 && Math.round(ex7.U * 1e6 / ex7.thermal) === 309, 'ex7'],
  [Math.abs(ex8.dm - 0.019703) < 1e-9 && Math.abs(ex8.Q - 18.353) < 0.01, 'ex8'],
])
  if (!ok) throw new Error(`deck number check failed: ${msg}`);

export const V = {
  nuclei: svgV(G.NUCLEI, 'Isotopes, isobars and isotones drawn nucleon by nucleon'),
  massdef: svgV(G.MASSDEF, 'Mass defect of neon-20 to scale'),
  pair: svgV(G.PAIRFIG, 'Pair production and annihilation'),
  bea: svgV(G.BEAFIG, 'Binding energy per nucleon against mass number'),
  fission: svgV(G.FISSIONFIG, 'One fission event of uranium-235'),
  chain: svgV(G.CHAINFIG, 'Uncontrolled and controlled chain reactions'),
  reactor: svgV(G.REACTORFIG, 'Schematic of a nuclear reactor'),
  barrier: svgV(G.BARRIERFIG, 'The Coulomb barrier between two protons'),
};

// ---------------------------------------------------------------- plots
const rPts = [4, 16, 64, 208].map((A) => ({ at: [Math.cbrt(A), rad(A, 1.2)], label: `A = ${A}: ${dec(rad(A, 1.2), 3)} fm` }));
export const radiusPlot = plot(
  {
    x: { min: 0, max: 6.5, label: 'A^(1/3)' },
    y: { min: 0, max: 8, label: 'nuclear radius R (fm)' },
    functions: [{ expr: '1.2x', label: 'R = R₀A^(1/3), R₀ = 1.2 fm', domain: [0, 6.3] }],
    points: rPts,
  },
  'Graph of nuclear radius in femtometres against the cube root of the mass number: a straight line through the origin with slope 1.2 femtometres; marked points are A equals 4 with R 1.9 fm, A equals 16 with 3.0 fm, A equals 64 with 4.8 fm and A equals 208 with 7.1 fm',
  'R is proportional to A^(1/3): the volume of a nucleus is proportional to its number of nucleons.',
);
export const densityPlot = plot(
  {
    x: { min: 0, max: 250, label: 'mass number A' },
    y: { min: 0, max: 4, label: 'density (10¹⁷ kg m⁻³)' },
    functions: [{ expr: dec(ex1.rho / 1e17, 3), label: 'nuclear density, the same for every A', domain: [1, 250] }],
    points: [
      { at: [4, ex1.rho / 1e17], label: 'A = 4' },
      { at: [64, ex1.rho / 1e17], label: 'A = 64' },
      { at: [238, ex1.rho / 1e17], label: 'A = 238' },
    ],
  },
  'Graph of nuclear density in units of 10 to the 17 kilograms per cubic metre against mass number from 1 to 250: a horizontal line at 2.31, the same for helium-4, zinc-64 and uranium-238',
  'Nuclear density does not depend on A: about 2.3 × 10¹⁷ kg m⁻³ for every nucleus.',
);

// ---------------------------------------------------------------- tables
const compTable = table(
  ['Quantity', 'Symbol', 'Meaning', `Example: ${nu(23, 11, 'Na')}`],
  [
    ['Atomic number', 'Z', 'Number of protons', '11'],
    ['Neutron number', 'N', 'Number of neutrons, N = A − Z', '12'],
    ['Mass number', 'A', 'Number of nucleons, A = Z + N', '23'],
    ['Nuclide symbol', `${nu(23, 11, 'Na')}`, 'A written above Z, before the element symbol', 'sodium-23'],
  ],
  'Table of atomic number, neutron number and mass number, each with its symbol, meaning and its value for sodium-23',
);
const relTable = table(
  ['Name', 'Same', 'Different', 'Example pair'],
  [
    ['Isotopes', 'Z (protons)', 'N and A', `${nu(35, 17, 'Cl')} and ${nu(37, 17, 'Cl')}`],
    ['Isobars', 'A (nucleons)', 'Z and N', `${nu(40, 18, 'Ar')} and ${nu(40, 20, 'Ca')}`],
    ['Isotones', 'N (neutrons)', 'Z and A', `${nu(3, 1, 'H')} and ${nu(4, 2, 'He')}`],
  ],
  'Table of isotopes, isobars and isotones: what is the same and what differs, with an example pair for each',
);
const uTable = table(
  ['Particle', 'Mass (u)', 'Rest energy (MeV)'],
  [
    ['Proton', '1.007276', '938.3'],
    ['Neutron', '1.008665', '939.6'],
    ['Hydrogen atom', '1.007825', '938.8'],
    ['Electron', '0.000549', '0.511'],
  ],
  'Table of the masses of the proton, neutron, hydrogen atom and electron in unified atomic mass units and their rest energies in megaelectronvolts',
);
const sepTable = table(
  ['Region of the BE/A curve', 'Typical B/A (MeV)', 'Process that raises B/A', 'Energy'],
  [
    ['Light nuclei (A < 20)', 'about 1 to 8', 'Fusion into a heavier nucleus', 'Released'],
    ['Middle-order nuclei (A about 50 to 80)', 'about 8.7 to 8.8, the maximum', 'None: most tightly bound', 'No energy released'],
    ['Heavy nuclei (A > 200)', 'about 7.6 to 7.9', 'Fission into two middle-order nuclei', 'Released'],
  ],
  'Table of the three regions of the binding energy per nucleon curve with typical values, the process that raises the binding energy per nucleon and whether energy is released',
);
const reactorTable = table(
  ['Part', 'Function', 'Typical material'],
  [
    ['Fuel', 'Nuclei that fission and release energy', 'Uranium enriched in U-235'],
    ['Moderator', 'Slows fast neutrons to thermal speeds so they cause fission', 'Heavy water, graphite, ordinary water'],
    ['Control rods', 'Absorb neutrons; moved in or out to hold the rate steady or shut down', 'Cadmium, boron'],
    ['Coolant', 'Carries the heat out of the core to make steam', 'Water, heavy water, liquid sodium, carbon dioxide'],
    ['Shielding', 'Absorbs neutrons and gamma rays to protect people', 'Thick concrete and steel'],
  ],
  'Table of the parts of a nuclear reactor, the function of each and a typical material',
);
const bombTable = table(
  ['', 'Reactor', 'Fission bomb'],
  [
    ['Chain reaction', 'Controlled: one neutron per fission goes on', 'Uncontrolled: neutrons multiply'],
    ['Fuel', 'Slightly enriched uranium', 'Highly enriched uranium or plutonium in a compact mass'],
    ['Energy release', 'Slowly, as heat for hours and years', 'In a tiny fraction of a second'],
    ['Control rods and coolant', 'Present', 'None'],
  ],
  'Table comparing a nuclear reactor with a fission bomb: the chain reaction, the fuel, how the energy is released and the control rods and coolant',
);
const ppTable = table(
  ['Step', 'Reaction', 'Energy'],
  [
    ['1', `${nu(1, 1, 'H')} + ${nu(1, 1, 'H')} → ${nu(2, 1, 'H')} + e⁺ + ν`, '0.42 MeV (1.44 MeV with the positron annihilating)'],
    ['2', `${nu(2, 1, 'H')} + ${nu(1, 1, 'H')} → ${nu(3, 2, 'He')} + γ`, '5.5 MeV'],
    ['3', `${nu(3, 2, 'He')} + ${nu(3, 2, 'He')} → ${nu(4, 2, 'He')} + 2 ${nu(1, 1, 'H')}`, '12.9 MeV'],
    ['Net', `4 ${nu(1, 1, 'H')} → ${nu(4, 2, 'He')} + 2 e⁺ + 2 ν`, `${dec((4 * MH - NUC.He4.M) * UMEV, 3)} MeV in all`],
  ],
  'Table of the proton-proton chain that powers the Sun: three steps and the net result of four hydrogen nuclei becoming one helium nucleus with 26.7 megaelectronvolts released',
);
const fusionTable = table(
  ['', 'Fission', 'Fusion'],
  [
    ['Process', 'A heavy nucleus splits into two middle-order nuclei', 'Two light nuclei join into a heavier nucleus'],
    ['Condition', 'A slow neutron to start it', 'Temperature of millions of kelvin'],
    ['Energy per reaction', 'About 200 MeV', 'A few MeV to about 25 MeV'],
    ['Energy per nucleon', 'About 0.9 MeV', 'About 3 to 7 MeV'],
    ['Where it happens', 'Reactors and fission bombs', 'The Sun, stars and hydrogen bombs'],
  ],
  'Table comparing fission and fusion: the process, the condition needed, the energy per reaction and per nucleon, and where each happens',
);

export const deck1 = deck({
  part: 1,
  title: 'Nuclei and Nuclear Energy — Part 1: Size, mass and binding energy',
  goals: [
    'Describe the composition of a nucleus, classify isotopes, isobars and isotones, and use R = R₀A^(1/3) to find nuclear size and show that nuclear density is the same for all nuclei',
    'Use the unified atomic mass unit and E = mc² to calculate mass defect and binding energy in MeV',
    'Explain pair production and annihilation and calculate the energies involved',
  ],
  slides: [
    sl('title', 'Nuclei and Nuclear Energy', {
      b: 'Part 1 — what a nucleus is made of, how big and how dense it is, and where its binding energy comes from.',
      v: V.nuclei,
      n: 'Almost all the mass of an atom sits in a nucleus a hundred thousand times smaller across than the atom itself. In this chapter we ask what the nucleus is made of, how large and how dense it is, and why it weighs less than the sum of its parts. The answer to the last question, through Einstein’s relation between mass and energy, is the key to nuclear power.',
    }),
    sl('concept', 'What is inside a nucleus', {
      b: 'A nucleus contains **protons** (charge +e) and **neutrons** (no charge), together called **nucleons**. A nuclide is written $^{A}_{Z}\\text{X}$, with $A = Z + N$.',
      ul: ['Z is the atomic number (protons), N the neutron number, A the mass number (nucleons).', 'The number of electrons in the neutral atom is Z, so Z decides the chemical element.', 'Protons repel one another electrically; the short-range **strong nuclear force** holds the nucleons together.'],
      v: compTable,
      n: 'A nucleus is built of protons and neutrons, which we call nucleons. The number of protons is the atomic number. The number of nucleons is the mass number, and the neutron number is the difference. A neutral atom has as many electrons as protons, so the atomic number decides the element. Protons repel each other, so something stronger must hold the nucleus together: the strong nuclear force.',
    }),
    sl('diagram', 'Isotopes, isobars and isotones', {
      b: 'Nuclides are grouped by what they share:',
      v: relTable,
      ul: ['**Isotopes:** same Z, different A (same element, same chemistry), such as carbon-12 and carbon-13.', '**Isobars:** same A, different Z, such as carbon-13 and nitrogen-13.', '**Isotones:** same N, different Z, such as carbon-12 and nitrogen-13.'],
      n: 'Nuclides that share one number are given a family name. Isotopes have the same number of protons, so they are the same element, but different numbers of neutrons. Isobars have the same mass number but different elements. Isotones have the same number of neutrons. In the picture, carbon twelve and carbon thirteen are isotopes, carbon thirteen and nitrogen thirteen are isobars, and carbon twelve and nitrogen thirteen are isotones.',
    }),
    sl('check', 'Quick check: name the family', {
      b: 'Choose the correct option.',
      v: V.nuclei,
      chk: 'isotones-mcq',
      n: 'Work out the number of protons, neutrons and nucleons for each nuclide, and see which of the three numbers is shared.',
    }),
    sl('concept', 'Size of the nucleus', {
      b: r`Experiments with fast particles show that the radius of a nucleus of mass number A is
$$R = R_0A^{1/3},\qquad R_0 \approx 1.2\ \text{fm} = 1.2 \times 10^{-15}\ \text{m}.$$`,
      ul: ['Radii run from about 1.9 fm (helium-4) to about 7.4 fm (uranium-238): a nucleus is about 10⁵ times smaller across than its atom.', 'R ∝ A^(1/3) means volume ∝ A: each nucleon takes up the same volume, as in a tightly packed drop of liquid.'],
      v: radiusPlot,
      n: 'The radius of a nucleus is found to grow as the cube root of the mass number, with a constant of about one point two femtometres. A femtometre is ten to the minus fifteen metres. So a nucleus of a hundred and twenty five nucleons is only five times wider than a single proton. Because the radius goes as the cube root, the volume is proportional to the number of nucleons.',
    }),
    sl('example', 'Worked example 1: the zinc-64 nucleus', {
      b: `Find the radius and the mass density of the nucleus of ${nu(64, 30, 'Zn')}. (R₀ = 1.2 fm, mass of a nucleon 1.67 × 10⁻²⁷ kg)`,
      ul: [
        r`$R = 1.2 \times 64^{1/3} = 1.2 \times 4 = ${dec(ex1.R, 2)}$ fm.`,
        r`Volume $= \dfrac{4}{3}\pi R^3 = \dfrac{4}{3}\pi(4.8 \times 10^{-15})^3 = ${sci(ex1.V, 3)}$ m³.`,
        r`Mass $= 64 \times 1.67 \times 10^{-27} = ${sci(64 * 1.67e-27, 3)}$ kg, so $\rho = \dfrac{${sci(64 * 1.67e-27, 3)}}{${sci(ex1.V, 3)}} = ${sci(ex1.rho, 3)}$ kg m⁻³.`,
      ],
      v: radiusPlot,
      n: 'The cube root of sixty four is exactly four, so the radius is four point eight femtometres. The volume of that sphere is about four point six times ten to the minus forty three cubic metres. The mass is sixty four nucleons, about one point one times ten to the minus twenty five kilograms. Dividing gives a density of about two point three times ten to the seventeen kilograms per cubic metre.',
    }),
    sl('concept', 'Nuclear density is the same for all nuclei', {
      b: r`Mass of a nucleus $\approx Am$ (m = mass of a nucleon); volume $= \dfrac{4}{3}\pi R^3 = \dfrac{4}{3}\pi R_0^3A$. Hence
$$\rho = \dfrac{Am}{\tfrac{4}{3}\pi R_0^3A} = \dfrac{3m}{4\pi R_0^3}$$`,
      ul: ['A cancels: the density is the same for every nucleus, about 2.3 × 10¹⁷ kg m⁻³.', 'This is about 10¹⁴ times the density of water: a matchbox of nuclear matter would weigh billions of tonnes.', 'It shows that nucleons are packed at a fixed spacing, whatever the size of the nucleus.'],
      v: densityPlot,
      n: 'To compare densities, divide mass by volume. The mass of a nucleus is the mass number times the mass of one nucleon. Its volume is also proportional to the mass number. So the mass number cancels, and the density equals three times the nucleon mass divided by four pi times R naught cubed. It is the same for every nucleus: about two point three times ten to the seventeen kilograms per cubic metre.',
    }),
    sl('check', 'Quick check: a matchbox of nuclear matter', {
      b: 'Calculate the mass.',
      v: densityPlot,
      chk: 'matchbox-num',
      n: 'Use the density of nuclear matter, found from the radius formula, and the volume of the box in cubic metres.',
    }),
    sl('concept', 'The unified atomic mass unit', {
      b: r`The **unified atomic mass unit** (u) is one twelfth of the mass of a neutral carbon-12 atom: $1\ \text{u} = 1.6605 \times 10^{-27}$ kg.`,
      ul: ['By definition the atomic mass of carbon-12 is exactly 12 u.', 'Masses of nuclides are quoted as atomic masses (nucleus plus electrons) in u.', 'A proton and a neutron each have a mass of about 1 u.'],
      v: uTable,
      n: 'Kilograms are far too large for nuclei, so we use the unified atomic mass unit. It is defined as one twelfth of the mass of a neutral carbon twelve atom, which makes the mass of carbon twelve exactly twelve of these units. One unit is about one point six six times ten to the minus twenty seven kilograms. Protons and neutrons weigh about one unit each, and an electron only about one two-thousandth of that.',
    }),
    sl('example', 'Worked example 2: the energy equivalent of one atomic mass unit', {
      b: r`Einstein: a mass m is equivalent to energy $E = mc^2$. Find the energy of 1 u in joules and in MeV. ($c = 2.998 \times 10^{8}$ m s⁻¹, 1 eV $= 1.602 \times 10^{-19}$ J)`,
      ul: [
        r`$E = 1.6605 \times 10^{-27} \times (2.998 \times 10^{8})^2 = ${sci(ex2.J, 4)}$ J.`,
        r`$E = \dfrac{${sci(ex2.J, 4)}}{1.602 \times 10^{-13}} = ${dec(ex2.MeV, 4)}$ MeV $\approx 931.5$ MeV.`,
        'We use 1 u = 931.5 MeV/c² throughout (the accepted value; rounded constants give 931.6).',
      ],
      v: uTable,
      n: 'Einstein’s relation says that any mass m is equivalent to an energy m times c squared. Put in one atomic mass unit and the speed of light, and you get about one point four nine times ten to the minus ten joules. Divide by the joules in one megaelectronvolt and the answer is about nine hundred and thirty one point five megaelectronvolts. That is the conversion factor we use for the rest of the chapter.',
    }),
    sl('concept', 'Mass defect and binding energy', {
      b: r`The mass of a stable nucleus is **less** than the total mass of its separate nucleons. The difference is the **mass defect**:
$$\Delta m = Zm_p + (A - Z)m_n - m_{\text{nucleus}}$$
The energy equivalent is the **binding energy**, $B = \Delta m\,c^2$ = the energy needed to pull the nucleus apart into free nucleons (and the energy released when it forms).`,
      ul: ['With atomic masses use $Z\\,m_H$ instead of $Zm_p$: the electron masses cancel.', 'B (in MeV) = Δm (in u) × 931.5.', 'Binding energy per nucleon = B/A.'],
      v: V.massdef,
      n: 'Weigh a nucleus and it comes out lighter than its protons and neutrons weighed separately. That missing mass is the mass defect. It has not vanished: by Einstein’s relation it is the energy that was given out when the nucleons joined, and it is exactly the energy you must supply to pull the nucleus apart again. That energy is the binding energy. Multiply the mass defect in atomic mass units by nine hundred and thirty one point five to get it in megaelectronvolts.',
    }),
    sl('example', 'Worked example 3: binding energy of neon-20', {
      b: `The atomic mass of ${nk('Ne20')} is 19.992440 u. Find its mass defect, binding energy and binding energy per nucleon. (m_H = 1.007825 u, mₙ = 1.008665 u, 1 u = 931.5 MeV)`,
      ul: [
        r`Separate: $10 \times 1.007825 + 10 \times 1.008665 = ${dec(ex3.free, 8)}$ u.`,
        r`$\Delta m = ${dec(ex3.free, 8)} - 19.992440 = ${dec(ex3.dm, 5)}$ u.`,
        r`$B = ${dec(ex3.dm, 5)} \times 931.5 = ${dec(ex3.B, 4)}$ MeV; $\dfrac{B}{A} = \dfrac{${dec(ex3.B, 4)}}{20} = ${dec(ex3.BA, 3)}$ MeV per nucleon.`,
      ],
      v: V.massdef,
      n: 'Neon twenty has ten protons and ten neutrons. Using hydrogen atoms for the protons, the separate parts weigh twenty point one six four nine zero atomic mass units. The neon atom is lighter by zero point one seven two four six units. Multiplying by nine hundred and thirty one point five gives about one hundred and sixty point six megaelectronvolts, or eight point zero three megaelectronvolts per nucleon.',
    }),
    sl('check', 'Quick check: calcium-40', {
      b: 'Calculate the binding energy.',
      v: V.massdef,
      chk: 'ca40-num',
      n: 'Follow the same three steps: the mass of the separate parts, the mass defect, then multiply by nine hundred and thirty one point five.',
    }),
    sl('concept', 'Pair production', {
      b: r`A gamma-ray photon can turn into an electron and a positron (same mass, charge +e), converting energy into mass:
$$h\nu \ge 2m_ec^2 = 2 \times 0.511 = 1.022\ \text{MeV}$$`,
      ul: ['It happens only near a nucleus, which takes up momentum so that energy and momentum are both conserved; a photon alone in empty space cannot do it.', 'Any energy above 1.022 MeV appears as kinetic energy of the pair.', 'Photon wavelength at the threshold: about 1.21 pm.'],
      v: V.pair,
      n: 'Energy can become mass. A gamma ray passing close to a nucleus can turn into an electron and a positron, a particle of the same mass but positive charge. Each needs its rest energy, zero point five one one megaelectronvolts, so the photon must carry at least one point zero two two. The nucleus is needed to take up momentum. Any extra energy becomes motion of the pair.',
    }),
    sl('concept', 'Annihilation', {
      b: 'When an electron and a positron meet, they **annihilate**: their whole mass becomes radiation.',
      ul: ['At rest, two photons of 0.511 MeV each leave in **opposite directions**: one photon could not conserve momentum.', 'The photon wavelength is $\\lambda = \\dfrac{hc}{E} = \\dfrac{1240\\ \\text{MeV fm}}{0.511\\ \\text{MeV}} = 2.43$ pm.', 'It is the reverse of pair production, and a clean example of mass turning into energy: the basis of PET scanners.'],
      v: V.pair,
      n: 'Annihilation is the reverse. An electron and a positron meet and disappear, leaving two gamma rays. If they were at rest, momentum was zero before, so the photons must go off in opposite directions, and each carries zero point five one one megaelectronvolts. This is the clearest example of all the mass of matter turning into energy, and it is used in medical PET scanners.',
    }),
    sl('example', 'Worked example 4: a three megaelectronvolt photon', {
      b: 'A photon of energy 3.00 MeV produces an electron–positron pair near a nucleus. Find the total kinetic energy of the pair and, if shared equally, the kinetic energy of each. (mₑc² = 0.511 MeV; ignore the nucleus’s recoil)',
      ul: [
        r`Rest energy of the pair: $2 \times 0.511 = 1.022$ MeV.`,
        r`Kinetic energy of the pair $= 3.00 - 1.022 = ${dec(ex4.excess, 4)}$ MeV.`,
        r`Each: $\dfrac{${dec(ex4.excess, 4)}}{2} = ${dec(ex4.each, 3)}$ MeV.`,
      ],
      v: V.pair,
      n: 'The pair needs one point zero two two megaelectronvolts just to exist. Subtract that from the photon’s three megaelectronvolts and one point nine seven eight is left over as kinetic energy. Shared equally, each particle gets about zero point nine eight nine megaelectronvolts. We ignore the tiny recoil of the nucleus, which is so heavy that it takes up momentum but almost no energy.',
    }),
    sl('check', 'Quick check: the threshold', {
      b: 'Choose the correct option.',
      v: V.pair,
      chk: 'pair-ar',
      n: 'Compare the photon’s energy with the rest energy of an electron and a positron together.',
    }),
    sl('summary', 'Summary — Part 1', {
      b: 'Key results:',
      v: table(
        ['Idea', 'Result'],
        [
          ['Composition', 'Z protons, N neutrons, A = Z + N nucleons'],
          ['Size and density', '$R = R_0A^{1/3}$, R₀ = 1.2 fm; density $\\dfrac{3m}{4\\pi R_0^3} \\approx 2.3 \\times 10^{17}$ kg m⁻³ for all nuclei'],
          ['Mass and energy', 'E = mc²; 1 u = 931.5 MeV/c²'],
          ['Binding energy', 'Δm = Zm_H + (A − Z)mₙ − M; B = Δm × 931.5 MeV'],
          ['Pairs', 'Pair production needs ≥ 1.022 MeV; annihilation gives two 0.511 MeV photons'],
        ],
        'Summary table of nuclear composition, size and density, the mass-energy relation, mass defect and binding energy, and pair production and annihilation',
      ),
      n: 'To sum up: a nucleus has protons and neutrons, its radius grows as the cube root of the mass number, and its density is the same for every nucleus. One atomic mass unit is equivalent to nine hundred and thirty one point five megaelectronvolts. The mass defect of a nucleus gives its binding energy. And a photon of at least one point zero two two megaelectronvolts can make an electron and a positron.',
    }),
    sl('exam-tips', 'Exam tips — Part 1', {
      ul: [
        'Use atomic masses with $m_H$, not $m_p$, and say so; the electron masses cancel.',
        'Keep six decimal places in u until the final multiplication by 931.5: the mass defect is a small difference of large numbers.',
        'For the density proof, show that A cancels; do not just quote the value.',
        'Pair production: say that the nucleus is needed for momentum; annihilation: two photons, opposite directions.',
      ],
      v: table(['Asked', 'Key point'], [['Same Z / same A / same N', 'Isotopes / isobars / isotones'], ['Binding energy', 'Δm × 931.5 MeV'], ['Pair production threshold', '2mₑc² = 1.022 MeV']], 'Table of common questions and the key point for each'),
      n: 'When working out a binding energy, use atomic masses with the hydrogen atom mass, not the proton mass, so that the electrons cancel. Keep six decimal places until the last step. To show that nuclear density is constant, show the mass number cancelling. And for pair production remember the nucleus, which takes up momentum, while annihilation at rest always gives two photons in opposite directions.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Nuclei and Nuclear Energy — Part 2: Fission, fusion and nuclear energy',
  goals: [
    'Use the binding energy per nucleon curve to explain why both fission and fusion release energy and to estimate the energy from a heavy nucleus splitting in two',
    'Write balanced fission equations, describe the chain reaction qualitatively, and state the functions of the parts of a reactor',
    'Explain why fusion needs very high temperatures, calculate the energy of a fusion reaction from masses, and describe the energy source of the Sun and stars',
  ],
  slides: [
    sl('title', 'Fission, Fusion and Nuclear Energy', {
      b: 'Part 2 — one curve explains why both splitting heavy nuclei and joining light ones can release energy.',
      v: V.bea,
      n: 'Why can energy be got both by splitting the heaviest nuclei and by joining the lightest ones? The answer is in a single graph, the binding energy per nucleon plotted against mass number. In this part we read that graph, then meet fission in reactors and bombs and fusion in the Sun and the hydrogen bomb.',
    }),
    sl('concept', 'The binding energy per nucleon curve', {
      b: 'Binding energy per nucleon, B/A, measures how tightly each nucleon is held. Plotted against A for real nuclides:',
      ul: ['It rises steeply for light nuclei (about 1.1 MeV for ²H), with a peak at ⁴He (7.07 MeV).', 'It reaches a **maximum of about 8.8 MeV** near A = 56–62 (iron, nickel).', 'It then falls slowly to about 7.6 MeV for uranium.', 'Between A about 30 and 170 it is nearly flat, within about 10% of 8.5 MeV.'],
      v: V.bea,
      n: 'Here is the curve, computed from real atomic masses. Binding energy per nucleon climbs very steeply for the lightest nuclei, has a bump at helium four, and peaks at about eight point eight megaelectronvolts for nuclei near iron and nickel. Beyond that it falls slowly, to about seven point six for uranium. In the middle, between about thirty and a hundred and seventy, it is almost constant.',
    }),
    sl('concept', 'Stability of middle-order nuclei', {
      b: 'The higher B/A, the more tightly bound the nucleus, the more stable. So the **middle-order nuclei** (A about 50 to 80) are the most stable.',
      ul: ['Nearly constant B/A: each nucleon bonds only with its near neighbours (the strong force is short-range and saturates).', 'The fall beyond A about 60: the electrostatic repulsion between protons acts across the whole nucleus and grows faster than the number of nucleons.', 'A nucleus moving **towards** the maximum releases energy.'],
      v: sepTable,
      n: 'Why is the curve flat in the middle? The strong force has a short range, so each nucleon bonds only with its nearest neighbours, and adding more nucleons adds the same binding each. Why does it fall at the end? The electric repulsion between protons acts across the whole nucleus, so it grows faster than the number of nucleons. Moving towards the peak always releases energy.',
    }),
    sl('example', 'Worked example 5: a heavy nucleus splits in two', {
      b: 'A nucleus of mass number 236 with B/A = 7.6 MeV splits into two equal fragments of mass number 118, each with B/A = 8.5 MeV. Estimate the energy released.',
      ul: [
        r`Total binding energy before: $236 \times 7.6 = ${dec(236 * 7.6, 4)}$ MeV.`,
        r`After: $2 \times 118 \times 8.5 = ${dec(2 * 118 * 8.5, 4)}$ MeV.`,
        r`Energy released $= ${dec(2 * 118 * 8.5, 4)} - ${dec(236 * 7.6, 4)} = ${dec(ex5.E, 4)}$ MeV $\approx 212$ MeV, about 200 MeV.`,
      ],
      v: V.bea,
      n: 'Before splitting, the total binding energy is two hundred and thirty six times seven point six, about seventeen hundred and ninety four megaelectronvolts. The two fragments have a hundred and eighteen nucleons each at eight point five, so together two thousand and six. The extra binding energy, about two hundred and twelve megaelectronvolts, is released. It is the right size for fission, around two hundred.',
    }),
    sl('check', 'Quick check: which way releases energy?', {
      b: 'Choose the correct option.',
      v: V.bea,
      chk: 'fusionside-mcq',
      n: 'Look at which side of the peak each type of nucleus lies, and which way it must move to gain binding energy per nucleon.',
    }),
    sl('concept', 'Nuclear fission', {
      b: r`In **fission** a heavy nucleus, after absorbing a slow neutron, splits into two middle-order fragments and releases neutrons and about 200 MeV:
$$ ^{1}_{0}\text{n} + {}^{235}_{92}\text{U} \to {}^{141}_{56}\text{Ba} + {}^{92}_{36}\text{Kr} + 3\,^{1}_{0}\text{n} + Q$$`,
      ul: ['Balance: the nucleon numbers (1 + 235 = 141 + 92 + 3) and the charges (92 = 56 + 36) match on both sides.', 'Fragments differ from event to event; on average 2 to 3 neutrons are released.', 'Almost all the energy appears as kinetic energy of the fragments, then as heat.'],
      v: V.fission,
      n: 'In fission, a uranium two three five nucleus absorbs a slow neutron and splits into two lighter nuclei, here barium and krypton, with two or three neutrons released. We balance the equation by counting nucleons and charges: on the left, two hundred and thirty six nucleons and ninety two protons; on the right, the same. The energy released is about two hundred megaelectronvolts, mostly as motion of the fragments.',
    }),
    sl('example', 'Worked example 6: energy of one fission', {
      b: 'Find the energy released in ¹₀n + ²³⁵₉₂U → ¹⁴¹₅₆Ba + ⁹²₃₆Kr + 3 ¹₀n. (Atomic masses: ²³⁵U 235.043930 u, ¹⁴¹Ba 140.914411 u, ⁹²Kr 91.926156 u; mₙ = 1.008665 u; 1 u = 931.5 MeV)',
      ul: [
        r`Before: $235.043930 + 1.008665 = ${dec(ex6.react.reduce((a, b) => a + b, 0), 9)}$ u.`,
        r`After: $140.914411 + 91.926156 + 3 \times 1.008665 = ${dec(ex6.prod.reduce((a, b) => a + b, 0), 9)}$ u.`,
        r`$\Delta m = ${dec(ex6.dm, 5)}$ u, so $Q = ${dec(ex6.dm, 5)} \times 931.5 = ${dec(ex6.Q, 4)}$ MeV.`,
      ],
      v: V.fission,
      n: 'Add up the masses on each side. Before: uranium plus one neutron, about two hundred and thirty six point zero five three atomic mass units. After: barium, krypton and three neutrons, about two hundred and thirty five point eight six seven. The difference is zero point one eight six zero units. Times nine hundred and thirty one point five gives about one hundred and seventy three megaelectronvolts released.',
    }),
    sl('concept', 'The chain reaction', {
      b: 'The neutrons released can cause further fissions: a **chain reaction**.',
      ul: ['**Uncontrolled:** each fission leads on average to more than one further fission, so the rate grows enormously in a tiny fraction of a second (a bomb).', '**Controlled:** only about one neutron per fission goes on to cause another; the rest escape or are absorbed, so the rate stays steady (a reactor).', 'Details of the chain reaction are not required by the ISC syllabus.'],
      v: V.chain,
      n: 'The neutrons set free by one fission can strike other uranium nuclei and cause more fissions: a chain reaction. If each fission causes more than one further fission, the number grows very quickly, doubling again and again: this is uncontrolled, and it is a bomb. If on average just one neutron from each fission goes on to cause another, the rate stays steady: this is controlled, and it is a reactor.',
    }),
    sl('check', 'Quick check: balance the equation', {
      b: 'Choose the correct option.',
      v: V.fission,
      chk: 'xneutrons-mcq',
      n: 'Balance the nucleon numbers first, then check the charges.',
    }),
    sl('diagram', 'A nuclear reactor', {
      b: 'A reactor holds a controlled chain reaction and turns the heat into steam for a turbine.',
      ul: ['Fuel rods sit in a **moderator**; **control rods** move between them.', 'The **coolant** carries heat from the core to a heat exchanger that makes steam.', '**Shielding** surrounds the whole reactor.'],
      v: V.reactor,
      n: 'This is a schematic reactor. The fuel rods, made of enriched uranium, stand in a moderator. Control rods can slide in and out between them. A coolant is pumped through the core, leaves hot, and passes its heat to a heat exchanger that makes steam for a turbine. Thick concrete and steel shielding surrounds everything, to stop neutrons and gamma rays.',
    }),
    sl('concept', 'Parts of a reactor and their functions', {
      b: 'Each part has one job:',
      v: reactorTable,
      ul: ['Fast neutrons are poor at causing fission in U-235: the moderator slows them by collisions with light nuclei.', 'Pushing the control rods in absorbs more neutrons and lowers the power; pulling them out raises it.'],
      n: 'Each part has one job. The fuel provides nuclei that fission. The moderator slows fast neutrons, because slow neutrons are much better at causing fission in uranium two three five. Control rods of cadmium or boron absorb neutrons, and moving them in or out keeps the rate steady or shuts the reactor down. The coolant takes heat away, and the shielding protects people.',
    }),
    sl('check', 'Quick check: the moderator', {
      b: 'Choose the correct option.',
      v: V.reactor,
      chk: 'poormod-mcq',
      n: 'A moderator works by collisions, so think about what happens to a light ball hitting a very heavy one, and a light ball hitting one of equal mass.',
    }),
    sl('concept', 'The nuclear bomb', {
      b: 'A fission bomb is an **uncontrolled** chain reaction in a compact mass of highly enriched uranium or plutonium: the energy of a very large number of fissions is released in a tiny fraction of a second.',
      ul: ['A reactor has no such explosive chain reaction: its fuel is only slightly enriched and the control rods hold the neutron count steady.', 'The explosion releases heat, blast and dangerous radiation.'],
      v: bombTable,
      n: 'A fission bomb is a chain reaction with no control at all. A compact mass of highly enriched uranium or plutonium is brought together, the neutrons multiply from one generation to the next, and all the energy is released in a tiny fraction of a second. A reactor is quite different: its fuel is only slightly enriched, and control rods hold the number of neutrons steady, so it cannot explode like a bomb.',
    }),
    sl('concept', 'Nuclear fusion', {
      b: 'In **fusion**, two light nuclei join to form a heavier one, and energy is released because the product has a higher binding energy per nucleon. Inside the Sun, the net result of the **proton–proton chain** is four hydrogen nuclei becoming one helium nucleus:',
      v: ppTable,
      ul: ['About 26.7 MeV is released per helium nucleus formed, counting the positrons annihilating with electrons (the neutrinos carry off a little).', 'This **thermonuclear energy** powers the Sun and stars for billions of years.'],
      n: 'In fusion, light nuclei join. In the Sun, four hydrogen nuclei are turned, in three steps, into one helium nucleus, with two positrons and two neutrinos. The helium is lighter than four protons, and the difference, equal to about twenty six point seven megaelectronvolts, is released each time. Energy from fusion at high temperature is called thermonuclear energy, and it keeps the Sun and stars shining for billions of years.',
    }),
    sl('diagram', 'Why fusion needs very high temperatures', {
      b: 'Two nuclei are both positive, so they repel. To fuse they must get within about 10⁻¹⁵ m, where the strong force takes over: they must climb the **Coulomb barrier**.',
      ul: ['Two protons just touching (centres 2.4 fm apart) have U = 1.44/2.4 = 0.60 MeV.', 'Only a gas at millions of kelvin has nuclei moving fast enough; hence **thermonuclear** reactions.'],
      v: V.barrier,
      n: 'Why do nuclei need such high temperatures? Both are positively charged, so they repel, and they only fuse when they get as close as the range of the strong force. Climbing that barrier needs about six tenths of a megaelectronvolt for two protons. The mean thermal energy at fifteen million kelvin is a few hundred times smaller, so only the fastest nuclei get through. Hence the need for such enormous temperatures.',
    }),
    sl('example', 'Worked example 7: how hot is hot enough?', {
      b: 'Two protons just touch when their centres are 2.4 fm apart. Find the electrostatic potential energy, and the temperature at which the mean kinetic energy (3/2)kT equals it. Compare with the mean energy at 1.5 × 10⁷ K. (1/4πε₀ = 9 × 10⁹ N m² C⁻², e = 1.6 × 10⁻¹⁹ C, k = 1.38 × 10⁻²³ J K⁻¹)',
      ul: [
        r`$U = \dfrac{9 \times 10^{9} \times (1.6 \times 10^{-19})^2}{2.4 \times 10^{-15}} = ${sci(ex7.U * 1.6e-13, 3)}$ J $= ${dec(ex7.U, 2)}$ MeV.`,
        r`$\dfrac{3}{2}kT = U \Rightarrow T = \dfrac{2 \times ${sci(ex7.U * 1.6e-13, 3)}}{3 \times 1.38 \times 10^{-23}} = ${sci(ex7.Tneed, 3)}$ K.`,
        r`At $1.5 \times 10^{7}$ K: $\dfrac{3}{2}kT = ${dec(ex7.thermal, 4)}$ eV, about ${Math.round((ex7.U * 1e6) / ex7.thermal)} times smaller than the barrier: only the fastest nuclei in the hot gas can fuse.`,
      ],
      v: V.barrier,
      n: 'The potential energy of two touching protons comes to nine point six times ten to the minus fourteen joules, which is zero point six megaelectronvolts. Setting the mean thermal energy, three halves k T, equal to this gives about four point six times ten to the nine kelvin. The Sun’s core is much cooler, fifteen million kelvin, where the mean energy is only about two kiloelectronvolts, so just the fastest nuclei, a tiny fraction, can fuse.',
    }),
    sl('example', 'Worked example 8: deuterium with helium-3', {
      b: 'Find the energy released in ²₁H + ³₂He → ⁴₂He + ¹₁H. (Atomic masses: ²H 2.014102 u, ³He 3.016029 u, ⁴He 4.002603 u, ¹H 1.007825 u; 1 u = 931.5 MeV)',
      ul: [
        r`Before: $2.014102 + 3.016029 = ${dec(ex8.react.reduce((a, b) => a + b, 0), 7)}$ u.`,
        r`After: $4.002603 + 1.007825 = ${dec(ex8.prod.reduce((a, b) => a + b, 0), 7)}$ u.`,
        r`$\Delta m = ${dec(ex8.dm, 5)}$ u, so $Q = ${dec(ex8.dm, 5)} \times 931.5 = ${dec(ex8.Q, 4)}$ MeV.`,
      ],
      v: table(['Reaction', 'Mass before (u)', 'Mass after (u)', 'Q (MeV)'], [['D + He-3 → He-4 + H', dec(ex8.react.reduce((a, b) => a + b, 0), 7), dec(ex8.prod.reduce((a, b) => a + b, 0), 7), dec(ex8.Q, 4)]], 'Table of the mass before and after and the energy released in the fusion of deuterium with helium-3'),
      n: 'Add the masses. Deuterium plus helium three weighs five point zero three zero one three one atomic mass units. Helium four plus hydrogen weighs five point zero one zero four two eight. The difference is zero point zero one nine seven zero three units, and times nine hundred and thirty one point five that is about eighteen point four megaelectronvolts. Per nucleon this is more than a fission releases.',
    }),
    sl('concept', 'Stars and the hydrogen bomb', {
      b: 'In the Sun and stars, gravity compresses hydrogen until its core is hot enough for fusion; the energy released keeps the core hot and the star shining.',
      ul: ['A **hydrogen bomb** uses a fission bomb to supply the temperature of millions of kelvin needed to fuse isotopes of hydrogen: uncontrolled fusion.', 'Fusion gives more energy per nucleon than fission, but a steady, controlled fusion reactor on Earth has not yet been achieved.'],
      v: fusionTable,
      n: 'Stars hold their gas together by gravity, which compresses and heats the core until hydrogen fuses; the energy released keeps the core hot. A hydrogen bomb copies this: a fission bomb goes off first, and its heat and pressure make hydrogen isotopes fuse in an uncontrolled way. Fusion releases more energy per nucleon than fission, but nobody has yet built a steady fusion power station.',
    }),
    sl('check', 'Quick check: why so hot?', {
      b: 'Choose the correct option.',
      v: V.barrier,
      chk: 'hot-ar',
      n: 'Think about the force between two positively charged nuclei approaching each other.',
    }),
    sl('summary', 'Summary — Part 2', {
      b: 'Key results:',
      v: table(
        ['Idea', 'Result'],
        [
          ['B/A curve', 'Maximum ≈ 8.8 MeV near A = 56–62; fission of heavy and fusion of light nuclei both raise B/A'],
          ['Fission', 'Heavy nucleus + slow neutron → two fragments + 2–3 neutrons + ≈ 200 MeV'],
          ['Reactor', 'Fuel, moderator, control rods, coolant, shielding: controlled chain reaction'],
          ['Fusion', 'Light nuclei join at millions of kelvin; Sun: 4 ¹H → ⁴He + 26.7 MeV'],
          ['Q value', 'Q = (mass of reactants − mass of products) × 931.5 MeV'],
        ],
        'Summary table of the binding energy per nucleon curve, fission, the reactor, fusion and the Q value of a reaction',
      ),
      n: 'To sum up: the binding energy per nucleon curve peaks near iron and nickel, so both splitting heavy nuclei and joining light ones release energy. Fission of uranium gives about two hundred megaelectronvolts, and a reactor controls the chain reaction with moderator and control rods. Fusion needs temperatures of millions of kelvin to beat the repulsion, and powers the Sun. Every Q value comes from the mass lost times nine hundred and thirty one point five.',
    }),
    sl('exam-tips', 'Exam tips — Part 2', {
      ul: [
        'Balance both A and Z in a nuclear equation before anything else.',
        'Q = (mass before − mass after) × 931.5 MeV; check that the atomic masses balance the electrons, as in the examples.',
        'For "why fission and fusion both release energy" mention the peak of the curve and which way the nuclei move.',
        'Reactor parts: give each its function in one line; the removed details of the chain reaction are not examined.',
      ],
      v: table(['Asked', 'Key point'], [['Fusion needs a high temperature', 'Coulomb repulsion of nuclei'], ['Moderator', 'Slows neutrons'], ['Control rods', 'Absorb neutrons']], 'Table of common questions and the key point for each'),
      n: 'Always balance the nucleon number and the charge first. For a Q value, take the mass lost and multiply by nine hundred and thirty one point five. When asked why both fission and fusion release energy, mention the peak of the curve and which way each type of nucleus moves towards it. For the reactor, give each part one clear function, and remember that the chain reaction details are not examined.',
    }),
  ],
});
