// ISC 11 Chemistry ch03 Subatomic Particles and Early Atomic Models: question bank (ISC style). Every stem carries its own
// context so that it stays unique across the bank. MCQ keys are placed by the builder; assertion-reason keys: a b c d b a.
import { mk, add, r, sci, near } from './lib.mjs';

const { mcq, ar, tf, fill, match, num, short, long } = mk;
const h = 6.626e-34;
const c = 3.0e8;
const NA = 6.022e23;
const me = 9.11e-31;
const qe = 1.602e-19;
const f2 = (x) => x.toFixed(2);

// ---------------------------------------------------------------- t01 discovery of the electron, proton and neutron
add('cathode-field-mcq', mcq({
  stem: 'A narrow beam leaves the cathode of a low-pressure discharge tube and passes between two charged metal plates, the upper plate being positive. The beam bends:',
  right: 'upwards, towards the positive plate, showing that it carries negative charge',
  wrong: ['downwards, towards the negative plate, showing that it carries positive charge', 'neither way, since the beam is electrically neutral', 'sideways, out of the plane of the plates, whatever their charge'],
  sol: 'Like charges repel and unlike attract, so a beam bending towards the positive plate is negative — option (@K).',
  d: 1, c: 'understanding', t: [1],
}));
add('gas-indep-mcq', mcq({
  stem: 'Cathode rays were studied in tubes filled in turn with hydrogen, air and neon, using cathodes of iron, copper and aluminium. The charge-to-mass ratio of the particles in the rays was found to be:',
  right: 'the same in every case, so the particles are a common constituent of all matter',
  wrong: ['largest for hydrogen and smallest for neon', 'largest for the lightest cathode metal', 'different for every pair of gas and metal'],
  sol: 'e/m was identical whatever the gas or the cathode, so the particles (electrons) are present in all atoms — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('anode-ratio-mcq', mcq({
  stem: 'Anode rays are obtained from tubes containing hydrogen, helium and argon in turn. Which gas gives positive particles with the largest charge-to-mass ratio?',
  right: 'hydrogen, because its positive ion is the lightest',
  wrong: ['argon, because its atoms are the largest', 'helium, because it is an inert gas', 'all three, because the ratio is the same for any gas'],
  sol: 'The particles are positive ions of the gas. Charge is similar (one unit) but mass is least for H⁺, so e/m is greatest for hydrogen — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('chadwick-mcq', mcq({
  stem: 'In 1932 a penetrating radiation from beryllium bombarded with alpha particles was seen to knock fast protons out of paraffin wax and to pass undeviated through electric and magnetic fields. The radiation consisted of:',
  right: 'neutral particles with a mass close to that of the proton',
  wrong: ['electrons released from the beryllium atoms', 'positively charged helium nuclei', 'very short-wavelength radiation with no mass'],
  sol: 'No deflection in fields means no charge; knocking out protons of comparable mass needs particles of about the same mass — neutrons, option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('rays-props-mcq', mcq({
  stem: 'Which of these is a property of anode rays but NOT of cathode rays?',
  right: 'The charge-to-mass ratio of the particles changes with the gas in the tube',
  wrong: ['They travel in straight lines in the absence of fields', 'They are deflected by electric and magnetic fields', 'They make a zinc sulfide screen glow'],
  sol: 'Cathode-ray particles are the same electrons for every gas. Anode-ray particles are positive ions of the gas, so e/m varies with the gas — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('em-ratio-num', (() => {
  const v = qe / me / 1e11;
  const s = f2(v);
  return num({
    stem: r`Thomson showed that the particles in cathode rays have the same charge-to-mass ratio in every gas. Using $e = 1.602 \times 10^{-19}\ \text{C}$ and $m_\text{e} = 9.11 \times 10^{-31}\ \text{kg}$, calculate $e/m_\text{e}$ in units of $10^{11}\ \text{C kg}^{-1}$.`,
    value: Number(s), tol: 0.01, unit: '× 10¹¹ C kg⁻¹',
    sol: r`$\dfrac{e}{m_\text{e}} = \dfrac{1.602 \times 10^{-19}}{9.11 \times 10^{-31}} = ${s} \times 10^{11}\ \text{C kg}^{-1}$; in units of $10^{11}$: $${s} \times 10^{11} / 10^{11} = ${s}$.`,
    scheme: [['Divides charge by mass', 1]],
    marks: 1, d: 2, c: 'understanding', t: [1],
  });
})(), (q) => near(1.602e-19 / 9.11e-31 / 1e11, 1.7585, 0.001) && q.answer.value === 1.76 || 'e/m');
add('neutron-fill', fill({
  stem: 'Chadwick discovered the neutron in 1932 by bombarding a thin sheet of ___ with alpha particles.',
  acc: [['beryllium', 'Beryllium', 'Be']],
  sol: 'The target was beryllium: alpha particles on beryllium release neutrons.',
  d: 1, c: 'recall', t: [1],
}));
add('discovery-match', match({
  stem: 'Match each experimenter with the finding for which he is credited.',
  pairs: [['Chadwick', 'discovery of the neutron'], ['Thomson', 'the electron, from cathode-ray tubes'], ['Goldstein', 'positive (canal) rays in a perforated-cathode tube'], ['Millikan', 'the charge on the electron, from oil drops']],
  order: [1, 3, 0, 2],
  sol: 'Chadwick → neutron (q); Thomson → electron (s); Goldstein → canal rays (p); Millikan → electron charge from oil drops (r).',
  d: 1, c: 'recall', t: [1],
}));
add('rays-ar', ar({
  a: 'In an electric field, anode rays bend in the direction opposite to cathode rays.',
  r: 'Anode rays carry positive charge, whereas cathode rays carry negative charge.',
  key: 'a',
  sol: 'Both true; opposite charges bend in opposite directions, so R explains A — option (a).',
  d: 2, c: 'understanding', t: [1],
}));
add('xray-ar', ar({
  a: 'When cathode rays strike a heavy metal anode, X-rays are produced.',
  r: 'Cathode rays are deflected by a magnetic field.',
  key: 'b',
  sol: 'Both are true, but deflection in a magnetic field does not account for X-ray emission (caused by sudden stopping of the fast electrons) — option (b).',
  d: 2, c: 'understanding', t: [1],
}));
add('cathode-props-short', short({
  marks: 2,
  stem: 'Write four properties of cathode rays observed in a gas discharge tube at low pressure.',
  model: 'Cathode rays (i) travel in straight lines away from the cathode and cast sharp shadows of objects in their path; (ii) are deflected by electric and magnetic fields in the sense expected for negative charge; (iii) make a fluorescent screen glow and can turn a light paddle wheel, so they are streams of particles with mass and energy; (iv) have the same e/m whatever the gas or the cathode material.',
  sol: 'Four properties, half a mark each.',
  scheme: [['Any two properties', 1], ['Any two further properties', 1]],
  d: 1, c: 'recall', t: [1],
}));
add('anode-prod-short', short({
  marks: 2,
  stem: 'In a discharge tube with a perforated cathode, how are anode rays produced? Why does the charge-to-mass ratio of their particles depend on the gas filling the tube?',
  model: 'Fast cathode-ray electrons knock electrons out of the gas atoms, leaving positive ions. These ions move towards the cathode and those that pass through its holes form a beam behind it, the anode (canal) rays. The particles are ions of the gas itself, so their mass, and hence e/m, depends on which gas is used; hydrogen gives the largest e/m because H⁺ is the lightest.',
  sol: 'Ionisation of gas by electrons; ions mass depends on gas.',
  scheme: [['Production of positive ions and rays through the holes', 1], ['e/m depends on the mass of the ion of the gas', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('compare-short3', short({
  marks: 3,
  stem: 'Compare the electron, the proton and the neutron by writing, in a table, the symbol, the approximate charge in coulomb and the approximate mass in kilogram of each, and name its discoverer.',
  model: r`Electron: symbol $\ce{e-}$, charge $-1.602 \times 10^{-19}$ C, mass $9.11 \times 10^{-31}$ kg, discovered by J. J. Thomson (cathode rays). Proton: symbol $\ce{p+}$ (or $^1_1\text{H}^{+}$), charge $+1.602 \times 10^{-19}$ C, mass $1.673 \times 10^{-27}$ kg, from Goldstein's canal rays and Rutherford's work. Neutron: symbol n, charge 0, mass $1.675 \times 10^{-27}$ kg, discovered by Chadwick in 1932.`,
  sol: 'Electron, proton and neutron data.',
  scheme: [['Electron row correct', 1], ['Proton row correct', 1], ['Neutron row correct', 1]],
  d: 2, c: 'recall', t: [1],
}));
add('chadwick-short3', short({
  marks: 3,
  stem: r`Describe Chadwick's experiment in which beryllium is bombarded with alpha particles. Write the balanced nuclear equation for the change in beryllium-9 and state how Chadwick showed that the radiation was neither charged nor gamma rays.`,
  model: r`Alpha particles from a polonium source struck a beryllium target, which gave out a highly penetrating radiation. The change is $^{9}_{4}\text{Be} + {}^{4}_{2}\text{He} \rightarrow {}^{12}_{6}\text{C} + {}^{1}_{0}\text{n}$ (mass numbers 9 + 4 = 12 + 1; atomic numbers 4 + 2 = 6 + 0). The radiation was not deflected by electric or magnetic fields, so it was uncharged, and it knocked protons out of paraffin wax with energies too large for gamma rays, so it had to consist of particles of nearly the proton's mass: neutrons.`,
  sol: 'Experiment; equation; evidence for neutral particles.',
  scheme: [['Experiment described', 1], ['Balanced nuclear equation', 1], ['No deflection and proton knock-on', 1]],
  d: 3, c: 'application', t: [1],
}));
add('cathode-long', long({
  stem: r`(a) Describe the conditions under which cathode rays are produced in a discharge tube. [2]

(b) State the observation that shows the particles of cathode rays are negatively charged. [1]

(c) The charge-to-mass ratio of the particles is $1.76 \times 10^{11}\ \text{C kg}^{-1}$ and their charge is $1.602 \times 10^{-19}\ \text{C}$. Calculate the mass of one particle. [2]`,
  model: r`(a) A glass tube fitted with two metal electrodes is pumped down to a very low pressure (about 0.01 mm of mercury) and a high voltage of several thousand volts is applied across the electrodes. Rays then stream from the cathode towards the anode and make the glass or a screen at the far end glow.

(b) The rays bend towards the positive plate in an electric field, and bend in the sense expected for negative charge in a magnetic field.

(c) $m = \dfrac{e}{e/m} = \dfrac{1.602 \times 10^{-19}}{1.76 \times 10^{11}} = 9.10 \times 10^{-31}$ kg.`,
  sol: 'Low pressure and high voltage; deflection towards positive plate; m = 9.10 × 10⁻³¹ kg.',
  scheme: [['(a) Low pressure', 1], ['(a) High voltage and rays from the cathode', 1], ['(b) Deflection towards the positive plate', 1], ['(c) Uses m = e ÷ (e/m)', 1], ['(c) 9.10 × 10⁻³¹ kg', 1]],
  d: 3, c: 'application', t: [1],
}), (q) => near(1.602e-19 / 1.76e11, 9.10e-31, 0.002) && /9\.10/.test(q.answer.model_answer_md) || 'cathode-long');

// ---------------------------------------------------------------- t02 atomic number, mass number, isotopes, isobars
add('count-mcq', mcq({
  stem: r`A galvanised nail loses zinc ions into water. The number of protons, neutrons and electrons in one $^{64}_{30}\text{Zn}^{2+}$ ion is, respectively:`,
  right: '30, 34, 28',
  wrong: ['30, 34, 32', '34, 30, 28', '30, 64, 28'],
  sol: r`Protons = Z = 30; neutrons = 64 − 30 = 34; electrons = 30 − 2 = 28 for a 2+ ion — option (@K).`,
  d: 2, c: 'application', t: [2],
}));
add('element-id-mcq', mcq({
  stem: 'A chemist isolates an ion of mass number 37 that contains 20 neutrons and 18 electrons. The ion is:',
  right: r`$^{37}\text{Cl}^{-}$`,
  wrong: [r`$^{37}\text{K}^{+}$`, r`$^{37}\text{S}^{2-}$`, r`$^{37}\text{Ca}^{2+}$`],
  sol: r`Protons = 37 − 20 = 17, so the element is chlorine; 18 electrons give a charge of 17 − 18 = −1, so $^{37}\text{Cl}^{-}$ — option (@K).`,
  d: 3, c: 'analysis', t: [2],
}));
add('isotope-mcq', mcq({
  stem: 'Which pair of species consists of isotopes of the same element?',
  right: r`$^{12}_{6}\text{C}$ and $^{14}_{6}\text{C}$`,
  wrong: [r`$^{14}_{6}\text{C}$ and $^{14}_{7}\text{N}$`, r`$^{24}_{11}\text{Na}$ and $^{24}_{12}\text{Mg}$`, r`$^{16}_{8}\text{O}$ and $^{19}_{9}\text{F}$`],
  sol: 'Isotopes have the same atomic number (6 for both carbon species) but different mass numbers — option (@K). The pairs (@1) and (@2) are isobars.',
  d: 1, c: 'understanding', t: [2],
}));
add('isobar-neutrons-mcq', mcq({
  stem: 'Species X (atomic number 18, with 22 neutrons) and species Y are isobars of each other. If Y has atomic number 20, the number of neutrons in Y is:',
  right: '20',
  wrong: ['22', '18', '40'],
  sol: 'Mass number of X = 18 + 22 = 40. Isobars share the mass number, so Y has 40 − 20 = 20 neutrons — option (@K).',
  d: 3, c: 'application', t: [2],
}));
add('deuterium-mcq', mcq({
  stem: r`A nuclear reactor uses heavy water, $\ce{D2O}$, in which D is deuterium $^{2}_{1}\text{H}$ and oxygen is $^{16}_{8}\text{O}$. One molecule of this heavy water contains how many neutrons?`,
  right: '10',
  wrong: ['8', '2', '18'],
  sol: 'Each D has 2 − 1 = 1 neutron, so two D give 2; $^{16}$O has 16 − 8 = 8; total 2 + 8 = 10 — option (@K).',
  d: 3, c: 'application', t: [2],
}));
add('neutrons-num', (() => {
  const mol = 1.4 / 14;
  const atoms = mol * NA;
  const neut = 8 * atoms;
  const s = f2(neut / 1e23);
  return num({
    stem: r`A sealed capsule for dating studies holds $1.40\ \text{g}$ of the isotope carbon-14, of molar mass $14\ \text{g mol}^{-1}$. Calculate the total number of neutrons in the capsule, in units of $10^{23}$. ($N_\text{A} = 6.022 \times 10^{23}\ \text{mol}^{-1}$)`,
    value: Number(s), tol: 0.02, unit: '× 10²³ neutrons',
    sol: r`Moles of atoms $= \dfrac{1.40}{14} = 0.100$ mol, so atoms $= 0.100 \times 6.022 \times 10^{23} = 6.022 \times 10^{22}$. Neutrons per atom $= 14 - 6 = 8$, so neutrons $= 8 \times 6.022 \times 10^{22} = ${s} \times 10^{23}$; in units of $10^{23}$: $${s} \times 10^{23} / 10^{23} = ${s}$.`,
    scheme: [['Moles and atoms', 0.5], ['8 neutrons per atom', 0.5], ['4.82 × 10²³', 1]],
    marks: 2, d: 3, c: 'application', t: [2],
  });
})(), (q) => near(8 * (1.4 / 14) * NA / 1e23, 4.82, 0.002) && q.answer.value === 4.82 || 'neutrons');
add('isobar-fill', fill({
  stem: 'Atoms of different elements that have the same mass number but different atomic numbers are called ___.',
  acc: [['isobars', 'isobar']],
  sol: 'Same mass number, different atomic number: isobars.',
  d: 1, c: 'recall', t: [2],
}));
add('isotope-tf', tf({
  stem: 'Chlorine-35 and chlorine-37 behave almost identically in chemical reactions because their atoms contain the same number of electrons.',
  key: 't',
  sol: 'True. Chemical behaviour is decided by the electron arrangement, which depends on the number of protons (and so electrons), not on the number of neutrons.',
  d: 2, c: 'understanding', t: [2],
}));
add('isotope-ar', ar({
  a: 'Protium, deuterium and tritium differ in their mass numbers.',
  r: 'The three isotopes of hydrogen contain different numbers of protons in their nuclei.',
  key: 'c',
  sol: 'A is true (1, 2 and 3), but R is false: all three have one proton and differ in neutrons (0, 1, 2) — option (c).',
  d: 2, c: 'understanding', t: [2],
}));
add('isobar-ar', ar({
  a: 'Two isobars always contain the same number of neutrons.',
  r: 'Isobars are atoms of different elements with the same atomic number.',
  key: 'd',
  sol: 'Isobars share the mass number and have different atomic numbers, so their neutron numbers differ. Both statements are false — option (d).',
  d: 3, c: 'analysis', t: [2],
}));
add('ion-count-short', short({
  marks: 2,
  stem: r`A laboratory bottle contains bromide ions $^{79}_{35}\text{Br}^{-}$ and another holds iron(III) ions $^{56}_{26}\text{Fe}^{3+}$. Find the number of protons, neutrons and electrons in each ion.`,
  model: r`$\text{Br}^{-}$: protons 35; neutrons $79 - 35 = 44$; electrons $35 + 1 = 36$. $\text{Fe}^{3+}$: protons 26; neutrons $56 - 26 = 30$; electrons $26 - 3 = 23$.`,
  sol: 'Br⁻: 35, 44, 36; Fe³⁺: 26, 30, 23.',
  scheme: [['Br⁻: 35 p, 44 n, 36 e', 1], ['Fe³⁺: 26 p, 30 n, 23 e', 1]],
  d: 2, c: 'application', t: [2],
}), () => 79 - 35 === 44 && 56 - 26 === 30 && 35 + 1 === 36 && 26 - 3 === 23 || 'ions');
add('isotopes-short', short({
  marks: 2,
  stem: 'Define isotopes and isobars. Give one example of each from the species ¹²C, ¹⁴C, ¹⁴N and ³⁵Cl.',
  model: 'Isotopes are atoms of the same element with the same atomic number but different mass numbers (different numbers of neutrons), e.g. ¹²C and ¹⁴C. Isobars are atoms of different elements with the same mass number but different atomic numbers, e.g. ¹⁴C and ¹⁴N.',
  sol: 'Definitions with an example each.',
  scheme: [['Isotopes defined with example', 1], ['Isobars defined with example', 1]],
  d: 1, c: 'recall', t: [2],
}));
add('h-isotopes-short3', short({
  marks: 3,
  stem: 'Name the three isotopes of hydrogen and, for the neutral atom of each, give the mass number and the numbers of protons, neutrons and electrons.',
  model: 'Protium (¹H): mass number 1, 1 proton, 0 neutrons, 1 electron. Deuterium (²H or D): mass number 2, 1 proton, 1 neutron, 1 electron. Tritium (³H or T): mass number 3, 1 proton, 2 neutrons, 1 electron. They share the atomic number 1 and so behave alike chemically.',
  sol: 'Protium, deuterium, tritium with counts.',
  scheme: [['Protium row', 1], ['Deuterium row', 1], ['Tritium row', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('ion-species-short3', short({
  marks: 3,
  stem: 'A species contains 16 protons, 16 neutrons and 18 electrons. Identify the element, write the symbol of the species with its mass number, atomic number and charge, and say whether it is a cation or an anion.',
  model: r`Z = 16, so the element is sulfur. Mass number $= 16 + 16 = 32$. Charge $= 16 - 18 = -2$. The species is $^{32}_{16}\text{S}^{2-}$, the sulfide ion, an anion because it has gained two electrons.`,
  sol: 'Sulfur; mass number 32; charge −2; anion.',
  scheme: [['Element from Z = 16', 1], ['Mass number 32 and charge −2', 1], ['Symbol and anion', 1]],
  d: 2, c: 'application', t: [2],
}), () => 16 + 16 === 32 && 16 - 18 === -2 || 'sulfide');
add('atom-long', long({
  stem: r`(a) Define atomic number and mass number, and state which of the two decides the identity of an element. [2]

(b) Find the number of protons, neutrons and electrons in each of the following: $^{31}_{15}\text{P}^{3-}$, $^{24}_{12}\text{Mg}^{2+}$ and $^{19}_{9}\text{F}^{-}$. [3]`,
  model: r`(a) The atomic number is the number of protons in the nucleus; the mass number is the total number of protons and neutrons. The atomic number decides the identity of the element.

(b) $\text{P}^{3-}$: 15 protons, $31 - 15 = 16$ neutrons, $15 + 3 = 18$ electrons. $\text{Mg}^{2+}$: 12 protons, $24 - 12 = 12$ neutrons, $12 - 2 = 10$ electrons. $\text{F}^{-}$: 9 protons, $19 - 9 = 10$ neutrons, $9 + 1 = 10$ electrons.`,
  sol: 'Definitions; P³⁻ 15, 16, 18; Mg²⁺ 12, 12, 10; F⁻ 9, 10, 10.',
  scheme: [['(a) Atomic number and mass number', 1], ['(a) Atomic number decides identity', 1], ['(b) P³⁻', 1], ['(b) Mg²⁺', 1], ['(b) F⁻', 1]],
  d: 3, c: 'application', t: [2],
}), () => [31 - 15, 15 + 3, 24 - 12, 12 - 2, 19 - 9, 9 + 1].join() === '16,18,12,10,10,10' || 'atom-long');

// ---------------------------------------------------------------- t03 Thomson, Rutherford
add('thomson-mcq', mcq({
  stem: 'In the model of the atom proposed by J. J. Thomson, the positive charge is:',
  right: 'spread evenly through the whole atom, with the electrons embedded in it',
  wrong: ['concentrated at the centre, with electrons far outside', 'carried by neutral particles sitting in the nucleus', 'confined to the surface of the atom like a shell'],
  sol: 'Thomson pictured a uniformly positive sphere with embedded electrons (plum-pudding model) — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('foil-mcq', mcq({
  stem: 'A newspaper article says that in the gold-foil experiment about one alpha particle in 20 000 bounced almost straight back. This tiny fraction suggests that:',
  right: 'the positive charge and nearly all the mass are packed into a very small nucleus',
  wrong: ['gold atoms contain no electrons at all', 'the positive charge is spread evenly over the whole atom', 'electrons repel alpha particles very strongly'],
  sol: 'Only a head-on approach to a tiny, dense, positive centre can reverse an alpha particle, so such events are rare — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('size-mcq', (() => {
  const ratio = 1e-10 / 1e-15;
  const model = 100 / ratio; // metres
  return mcq({
    stem: r`An atom has a radius of about $10^{-10}\ \text{m}$ and its nucleus a radius of about $10^{-15}\ \text{m}$. If the atom were scaled up to a stadium of radius $100\ \text{m}$, the nucleus would be about the size of:`,
    right: 'a grain of sand, about 1 mm',
    wrong: ['a small coin, about 1 cm', 'a football, about 10 cm', 'a bus, about 10 m'],
    sol: r`Ratio of radii $= 10^{-10}/10^{-15} = 10^{5}$, so the nucleus would have radius $100 / 10^{5} = ${model}$ m $= 1$ mm — option (@K).`,
    d: 3, c: 'application', t: [3],
  });
})());
add('alpha-nature-mcq', mcq({
  stem: 'The particles fired at the gold foil in Rutherford’s experiment were alpha particles. An alpha particle is the same as:',
  right: 'a helium nucleus, He²⁺',
  wrong: ['a hydrogen nucleus, H⁺', 'an electron ejected from a nucleus', 'a neutral helium atom'],
  sol: 'An alpha particle has two protons and two neutrons, a helium nucleus with charge +2 — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('limit-mcq', mcq({
  stem: 'In Rutherford’s model an electron revolves in a circular path round the nucleus. According to classical electromagnetic theory such an electron would:',
  right: 'radiate energy continuously and spiral into the nucleus',
  wrong: ['stay in its path for ever without radiating', 'jump to a higher orbit by absorbing light', 'be pushed out of the atom by the nucleus'],
  sol: 'An accelerated charge radiates, so the electron would lose energy and fall into the nucleus — the instability of the model, option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('deflect-mcq', mcq({
  stem: 'In the scattering experiment on a thin gold foil, the few alpha particles that were deflected through large angles were those that:',
  right: 'passed very close to a nucleus and were strongly repelled by it',
  wrong: ['collided with the electrons of a gold atom', 'were absorbed by the gold atoms and re-emitted', 'passed through the empty space between atoms'],
  sol: 'Strong deflection needs a strong repulsion, which occurs only on a close approach to the small positive nucleus — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('repel-tf', tf({
  stem: 'In the gold-foil experiment, an alpha particle that rebounds has been repelled by the positively charged nucleus of a gold atom.',
  key: 't',
  sol: 'True. Alpha particles and the nucleus are both positive; a close, nearly head-on approach reverses the alpha particle.',
  d: 2, c: 'understanding', t: [3],
}));
add('foil-ar', ar({
  a: 'Almost all alpha particles pass straight through a thin gold foil.',
  r: 'An alpha particle is a helium nucleus carrying a charge of +2.',
  key: 'b',
  sol: 'Both are true, but the identity and charge of the alpha particle do not explain why it passes straight through; the reason is that most of the atom is empty space, with the mass and positive charge concentrated in a tiny nucleus — option (b).',
  d: 3, c: 'analysis', t: [3],
}));
add('model-ar', ar({
  a: 'A Rutherford atom with an electron circling the nucleus would be unstable.',
  r: 'A charged particle that is accelerated emits electromagnetic radiation and loses energy.',
  key: 'a',
  sol: 'Circular motion is accelerated motion, so the electron radiates and spirals inwards; R explains A — option (a).',
  d: 3, c: 'analysis', t: [3],
}));
add('model-match', match({
  stem: 'Match each model or experiment with its main idea.',
  pairs: [['Thomson’s model', 'electrons embedded in a positive sphere'], ['Gold-foil experiment', 'evidence for a small, dense nucleus'], ['Rutherford’s model', 'cannot explain why atoms are stable'], ['Alpha particle', 'a helium nucleus, He²⁺']],
  order: [3, 1, 0, 2],
  sol: 'Thomson’s model → s; gold-foil experiment → q; Rutherford’s model → p; alpha particle → r.',
  d: 2, c: 'understanding', t: [3],
}));
add('repel-obs-short', short({
  marks: 2,
  stem: 'State two observations of the alpha-particle scattering experiment on gold foil and the conclusion drawn from each.',
  model: 'Most alpha particles passed straight through the foil: most of the atom is empty space. A very few were turned back through large angles (about one in twenty thousand): the positive charge and the mass are concentrated in a very small, dense nucleus. (A small number were deflected slightly: the nucleus is positive and repels the alpha particles.)',
  sol: 'Two observations with conclusions.',
  scheme: [['First observation with conclusion', 1], ['Second observation with conclusion', 1]],
  d: 1, c: 'understanding', t: [3],
}));
add('thomson-short', short({
  marks: 2,
  stem: 'Describe the model of the atom given by Thomson. How does it account for the atom being electrically neutral?',
  model: 'Thomson proposed that an atom is a sphere of uniformly distributed positive charge in which the negatively charged electrons are embedded, like seeds in a watermelon. The positive charge on the sphere is exactly equal in magnitude to the total negative charge of the electrons, so the atom is neutral overall.',
  sol: 'Sphere with embedded electrons; charges balance.',
  scheme: [['Positive sphere with embedded electrons', 1], ['Equal positive and negative charge', 1]],
  d: 1, c: 'recall', t: [3],
}));
add('limits-short3', short({
  marks: 3,
  stem: 'Give three limitations of Rutherford’s nuclear model of the atom.',
  model: 'First, it cannot explain the stability of the atom: an electron moving round the nucleus is accelerated and should radiate energy and spiral into the nucleus. Second, it predicts a continuous spectrum as the electron spirals in, whereas atoms emit line spectra of definite wavelengths. Third, it says nothing about how the electrons are arranged or how much energy they have.',
  sol: 'Instability, line spectra, arrangement of electrons.',
  scheme: [['Stability', 1], ['Line spectra', 1], ['Arrangement and energy of electrons', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('scatter-short3', (() => {
  const N = 5.0e5;
  const frac = 1 / 20000;
  const back = N * frac;
  return short({
    marks: 3,
    stem: r`In a gold-foil experiment about $1$ alpha particle in $20\,000$ is turned back through more than $90^\circ$. Calculate how many particles are expected to turn back when $5.0 \times 10^{5}$ alpha particles strike the foil, and explain what this small fraction tells us about the size of the nucleus.`,
    model: r`Number turned back $= \dfrac{5.0 \times 10^{5}}{20\,000} = ${back}$. Only a head-on approach to a nucleus can reverse an alpha particle, so such events are rare. Because only about one particle in twenty thousand meets a nucleus closely, the nucleus must occupy a minute fraction of the atom's volume (its radius is about $10^{-15}$ m against $10^{-10}$ m for the atom).`,
    sol: r`$\dfrac{5.0 \times 10^{5}}{20\,000} = ${back}$ particles; the nucleus is very small.`,
    scheme: [['Substitution', 1], ['25 particles', 1], ['Small, dense nucleus', 1]],
    d: 3, c: 'application', t: [3],
  });
})(), () => 5.0e5 / 20000 === 25 || 'scatter');
add('rutherford-long', long({
  stem: `(a) Describe the alpha-particle scattering experiment of Rutherford. [1]

(b) State the three observations made and the conclusion drawn from each. [3]

(c) State one limitation of the nuclear model. [1]`,
  model: `(a) A narrow beam of alpha particles from a radioactive source was directed at a very thin gold foil surrounded by a zinc sulfide screen, and the flashes on the screen showed where the particles went.

(b) Most particles passed straight through: most of the atom is empty space. A few were deflected through small angles: the centre of the atom is positively charged and repels them. Very few (about one in twenty thousand) rebounded: the positive charge and nearly all the mass lie in a very small, dense nucleus.

(c) An electron circling the nucleus would radiate energy and spiral in, so the model cannot explain the stability of the atom (or line spectra).`,
  sol: 'Experiment; three observations and conclusions; limitation.',
  scheme: [['(a) Beam, thin foil, screen', 1], ['(b) Observation 1 with conclusion', 1], ['(b) Observation 2 with conclusion', 1], ['(b) Observation 3 with conclusion', 1], ['(c) Limitation', 1]],
  d: 3, c: 'understanding', t: [3],
}));
add('models-long', long({
  stem: `(a) Write two differences between Thomson's model and Rutherford's model of the atom. [2]

(b) Explain why the result of the scattering experiment could not be explained by Thomson's model, and state how Rutherford's model accounts for it. [3]`,
  model: `(a) In Thomson's model the positive charge and mass are spread through the whole atom; in Rutherford's they are concentrated in a tiny nucleus. In Thomson's model the electrons are embedded in the sphere; in Rutherford's they move outside the nucleus.

(b) In Thomson's atom the positive charge is spread out, so no part of it can exert a strong enough force to turn an alpha particle back; at most small deflections would occur. The rebound of a few particles requires a concentrated repulsive centre. Rutherford's nucleus provides this, and because it is so small most alpha particles pass through the empty space around it without any deflection.`,
  sol: 'Two differences; failure of Thomson and success of Rutherford.',
  scheme: [['(a) First difference', 1], ['(a) Second difference', 1], ['(b) Spread-out charge cannot cause large deflection', 1.5], ['(b) Concentrated nucleus explains rebound', 1], ['(b) Empty space explains straight passage', 0.5]],
  d: 3, c: 'analysis', t: [3],
}));

// ---------------------------------------------------------------- t04 black body, photoelectric effect, Planck
add('blackbody-mcq', mcq({
  stem: 'A blacksmith heats an iron rod. It first glows dull red, then orange, and finally white-hot as its temperature rises. This happens because, on heating:',
  right: 'the wavelength at which most energy is emitted shifts towards shorter wavelengths',
  wrong: ['the rod starts to emit light for the first time', 'only red light is ever emitted by iron', 'the rod emits equal energy at every wavelength'],
  sol: 'The peak of the black-body emission curve moves to shorter wavelengths as temperature rises, so the colour moves from red towards white — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('photon-energy-mcq', mcq({
  stem: 'A radio station at 91.1 MHz, a green LED at 530 nm, a hospital ultraviolet lamp at 254 nm and a dental X-ray set at 0.05 nm are compared. Photons of the highest energy come from:',
  right: 'the dental X-ray set',
  wrong: ['the radio station', 'the green LED', 'the ultraviolet lamp'],
  sol: 'E = hc/λ, so the shortest wavelength (0.05 nm, the X-ray) gives the largest photon energy — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('intensity-mcq', mcq({
  stem: 'Blue light falls on a metal plate in a photocell but no electrons are emitted. Which change will certainly cause photoelectrons to be emitted?',
  right: 'using ultraviolet light, which has a higher frequency',
  wrong: ['making the blue light much brighter', 'shining the blue light for a longer time', 'using a larger plate of the same metal'],
  sol: 'Emission needs photons with frequency above the threshold; brightness, time and plate size do not change photon energy — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('threshold-mcq', mcq({
  stem: 'A photocell has a metal whose threshold wavelength is 500 nm. Light of 400 nm and light of 600 nm are tried in turn. Photoelectrons are emitted by:',
  right: 'the 400 nm light only',
  wrong: ['the 600 nm light only', 'both lights', 'neither light'],
  sol: 'Emission needs λ shorter than the threshold wavelength (higher frequency than threshold): 400 nm < 500 nm, whereas 600 nm > 500 nm — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('ratio-mcq', (() => {
  const k = 750 / 250;
  return mcq({
    stem: 'The energy of a photon of wavelength 250 nm is compared with that of a photon of wavelength 750 nm. The first photon has ____ times the energy of the second.',
    right: String(k),
    wrong: ['one-third', 'nine', 'one-ninth'],
    sol: r`$E \propto 1/\lambda$, so $E_1/E_2 = \lambda_2/\lambda_1 = 750/250 = ${k}$ — option (@K).`,
    d: 2, c: 'application', t: [4],
  });
})());
add('photon-count-mcq', mcq({
  stem: 'Two lamps each give out light at a power of 1 W, one at 400 nm and the other at 800 nm. In every second:',
  right: 'the 800 nm lamp emits twice as many photons as the 400 nm lamp',
  wrong: ['both lamps emit the same number of photons', 'the 400 nm lamp emits twice as many photons as the 800 nm lamp', 'the 800 nm lamp emits four times as many photons'],
  sol: 'A photon of 800 nm has half the energy of one of 400 nm, so for equal power twice as many photons are needed — option (@K).',
  d: 4, c: 'analysis', t: [4],
}));
add('workfn-mcq', (() => {
  const W = 3.3e-19;
  const nu0 = W / h;
  const opts = { right: `$${sci(nu0, 2)}\\ \\text{Hz}$`, w1: `$${sci(h / W, 2)}\\ \\text{Hz}$`, w2: `$${sci(W * h, 2)}\\ \\text{Hz}$`, w3: `$${sci((W * c) / h, 2)}\\ \\text{Hz}$` };
  return mcq({
    stem: r`The work function of a metal in a vacuum photocell is $3.3 \times 10^{-19}\ \text{J}$ (given). Its threshold frequency is closest to ($h = 6.626 \times 10^{-34}\ \text{J s}$):`,
    right: opts.right,
    wrong: [opts.w1, opts.w2, opts.w3],
    sol: r`$\nu_0 = \dfrac{W}{h} = \dfrac{3.3 \times 10^{-19}}{6.626 \times 10^{-34}} = ${sci(nu0, 2)}$ Hz — option (@K).`,
    d: 3, c: 'application', t: [4],
  });
})());
add('photo-tf', tf({
  stem: 'If the brightness of ultraviolet light falling on a zinc plate is doubled while its frequency stays above the threshold, the number of photoelectrons emitted per second doubles.',
  key: 't',
  sol: 'True. Twice as many photons arrive each second and each can free one electron, so the number of electrons doubles (their energy is unchanged).',
  d: 2, c: 'understanding', t: [4],
}));
add('quantum-fill', fill({
  stem: 'According to Planck, radiant energy is emitted or absorbed by a body in tiny packets, each called a ___.',
  acc: [['quantum', 'photon', 'quanta']],
  sol: 'The packet of energy is a quantum (E = hν).',
  d: 1, c: 'recall', t: [4],
}));
add('sodium-num', (() => {
  const E = (h * c) / 589e-9;
  const s = f2(E * 1e19);
  return num({
    stem: r`A sodium vapour street lamp gives yellow light of wavelength $589\ \text{nm}$. Calculate the energy of one photon of this light, in units of $10^{-19}\ \text{J}$. ($h = 6.626 \times 10^{-34}\ \text{J s}$, $c = 3.0 \times 10^{8}\ \text{m s}^{-1}$)`,
    value: Number(s), tol: 0.02, unit: '× 10⁻¹⁹ J',
    sol: r`$E = \dfrac{hc}{\lambda} = \dfrac{6.626 \times 10^{-34} \times 3.0 \times 10^{8}}{5.89 \times 10^{-7}} = ${s} \times 10^{-19}$ J; in units of $10^{-19}$ J: $${s} \times 10^{-19} / 10^{-19} = ${s}$.`,
    scheme: [['Converts 589 nm to metres', 0.5], ['Uses E = hc/λ', 0.5]],
    marks: 1, d: 2, c: 'understanding', t: [4],
  });
})(), (q) => near((6.626e-34 * 3.0e8 / 589e-9) * 1e19, 3.37, 0.002) && q.answer.value === 3.37 || 'sodium');
add('photons-num', (() => {
  const E = (h * c) / 480e-9;
  const n = 2.0 / E;
  const s = f2(n / 1e18);
  return num({
    stem: r`A torch LED gives out light of wavelength $480\ \text{nm}$ at a power of $2.0\ \text{W}$. Calculate the number of photons it emits each second, in units of $10^{18}$. ($h = 6.626 \times 10^{-34}\ \text{J s}$, $c = 3.0 \times 10^{8}\ \text{m s}^{-1}$)`,
    value: Number(s), tol: 0.03, unit: '× 10¹⁸ photons s⁻¹',
    sol: r`$E_\text{photon} = \dfrac{6.626 \times 10^{-34} \times 3.0 \times 10^{8}}{4.80 \times 10^{-7}} = ${f2(E * 1e19)} \times 10^{-19}$ J. Photons per second $= \dfrac{2.0}{${f2(E * 1e19)} \times 10^{-19}} = ${s} \times 10^{18}$; in units of $10^{18}$: $${s} \times 10^{18} / 10^{18} = ${s}$.`,
    scheme: [['Photon energy', 1], ['Power ÷ photon energy', 1], ['4.83 × 10¹⁸ per second', 1]],
    marks: 3, d: 3, c: 'application', t: [4],
  });
})(), (q) => near(2.0 / (6.626e-34 * 3.0e8 / 480e-9) / 1e18, 4.83, 0.003) && q.answer.value === 4.83 || 'photons');
add('einstein-num', (() => {
  const E = (h * c) / 254e-9;
  const kJ = (E * NA) / 1000;
  return num({
    stem: r`An ultraviolet lamp used to sterilise laboratory benches emits radiation of wavelength $254\ \text{nm}$. Calculate the energy of one mole of its photons, in kJ. ($h = 6.626 \times 10^{-34}\ \text{J s}$, $c = 3.0 \times 10^{8}\ \text{m s}^{-1}$, $N_\text{A} = 6.022 \times 10^{23}\ \text{mol}^{-1}$)`,
    value: Math.round(kJ), tol: 1, unit: 'kJ mol⁻¹',
    sol: r`One photon: $E = \dfrac{6.626 \times 10^{-34} \times 3.0 \times 10^{8}}{2.54 \times 10^{-7}} = ${f2(E * 1e19)} \times 10^{-19}$ J. One mole: $${f2(E * 1e19)} \times 10^{-19} \times 6.022 \times 10^{23} = ${f2((E * NA) / 1e5)} \times 10^{5}$ J, and $${f2((E * NA) / 1e5)} \times 10^{5} / 1000 = ${Math.round(kJ)}$ kJ.`,
    scheme: [['Photon energy hc/λ', 1], ['Multiplies by N_A', 1], ['Converts to kJ: 471', 1]],
    marks: 3, d: 3, c: 'application', t: [4],
  });
})(), (q) => near((6.626e-34 * 3.0e8 / 254e-9) * 6.022e23 / 1000, 471.3, 0.002) && q.answer.value === 471 || 'einstein');
add('ke-num', (() => {
  const KE = h * (8.2e14 - 5.4e14);
  const s = f2(KE * 1e19);
  return num({
    stem: r`A photocell has a cathode of threshold frequency $5.4 \times 10^{14}\ \text{Hz}$ (given). Light of frequency $8.2 \times 10^{14}\ \text{Hz}$ falls on it. Calculate the maximum kinetic energy of the emitted electrons, in units of $10^{-19}\ \text{J}$. ($h = 6.626 \times 10^{-34}\ \text{J s}$)`,
    value: Number(s), tol: 0.02, unit: '× 10⁻¹⁹ J',
    sol: r`$\text{KE} = h(\nu - \nu_0) = 6.626 \times 10^{-34} \times (8.2 - 5.4) \times 10^{14} = ${s} \times 10^{-19}$ J; in units of $10^{-19}$ J: $${s} \times 10^{-19} / 10^{-19} = ${s}$.`,
    scheme: [['Frequency difference 2.8 × 10¹⁴ Hz', 1], ['Multiplies by h: 1.86 × 10⁻¹⁹ J', 1]],
    marks: 2, d: 2, c: 'application', t: [4],
  });
})(), (q) => near(6.626e-34 * 2.8e14 * 1e19, 1.855, 0.002) && q.answer.value === 1.86 || 'ke');
add('blackbody-short', short({
  marks: 2,
  stem: 'What is a black body? State two ideas of Planck’s quantum theory that were used to explain the radiation from a heated black body.',
  model: 'A black body is an ideal object that absorbs all radiation falling on it and, when heated, emits radiation of all wavelengths whose distribution depends only on its temperature. Planck proposed that energy is emitted or absorbed only in discrete packets (quanta), and that the energy of one quantum is proportional to the frequency of the radiation, E = hν.',
  sol: 'Definition; quantisation and E = hν.',
  scheme: [['Black body defined', 1], ['Quanta and E = hν', 1]],
  d: 1, c: 'understanding', t: [4],
}));
add('photoeffect-short', short({
  marks: 2,
  stem: 'Ultraviolet light from a small lamp releases electrons from a zinc plate, but an intense red lamp does not. Explain this using the idea of threshold frequency.',
  model: 'Each electron absorbs one photon at a time. Ultraviolet photons have a frequency above the threshold frequency of zinc, so each carries more than the work function and can eject an electron. Red photons have a frequency below the threshold, so no single photon has enough energy, however many of them arrive.',
  sol: 'One photon per electron; ultraviolet above threshold, red below.',
  scheme: [['One photon ejects one electron if hν exceeds the work function', 1], ['UV above and red below threshold', 1]],
  d: 2, c: 'application', t: [4],
}));
add('photon-short2', (() => {
  const nu = 2450e6;
  const lam = c / nu;
  const E = h * nu;
  return short({
    marks: 2,
    stem: r`A microwave oven in a canteen works at a frequency of $2450\ \text{MHz}$. Calculate the wavelength of its radiation and the energy of one photon. ($c = 3.0 \times 10^{8}\ \text{m s}^{-1}$, $h = 6.626 \times 10^{-34}\ \text{J s}$)`,
    model: r`$\lambda = \dfrac{c}{\nu} = \dfrac{3.0 \times 10^{8}}{2.45 \times 10^{9}} = ${lam.toFixed(3)}$ m. $E = h\nu = 6.626 \times 10^{-34} \times 2.45 \times 10^{9} = ${f2(E * 1e24)} \times 10^{-24}$ J.`,
    sol: r`$\lambda = ${lam.toFixed(3)}$ m; $E = ${f2(E * 1e24)} \times 10^{-24}$ J.`,
    scheme: [['Wavelength 0.122 m', 1], ['Photon energy 1.62 × 10⁻²⁴ J', 1]],
    d: 2, c: 'application', t: [4],
  });
})(), () => near(3.0e8 / 2.45e9, 0.1224, 0.002) && near(6.626e-34 * 2.45e9 * 1e24, 1.623, 0.002) || 'microwave');
add('photoelectric-short3', short({
  marks: 3,
  stem: 'State three observations of the photoelectric effect that cannot be explained by the wave theory of light, and state how the photon picture explains them.',
  model: 'First, no electrons are emitted below a threshold frequency, however intense the light; wave theory expects enough energy to build up from any light, but a photon below the threshold has too little energy to free an electron. Second, the kinetic energy of the electrons depends on the frequency, not the brightness; each electron takes the energy of one photon, hν, minus the work function. Third, emission is instantaneous even for dim light, because one photon gives its energy to one electron at once.',
  sol: 'Threshold, KE depends on frequency, no time lag.',
  scheme: [['Threshold frequency explained', 1], ['KE depends on frequency only', 1], ['No time delay', 1]],
  d: 3, c: 'understanding', t: [4],
}));
add('work-short3', (() => {
  const lam0 = 620e-9;
  const W = (h * c) / lam0;
  const Ep = (h * c) / 400e-9;
  const KE = Ep - W;
  return short({
    marks: 3,
    stem: r`The threshold wavelength of the cathode of a photocell is $620\ \text{nm}$ (given). Calculate (a) the work function in joules and (b) the maximum kinetic energy of electrons emitted when light of wavelength $400\ \text{nm}$ falls on it. ($h = 6.626 \times 10^{-34}\ \text{J s}$, $c = 3.0 \times 10^{8}\ \text{m s}^{-1}$)`,
    model: r`(a) $W = \dfrac{hc}{\lambda_0} = \dfrac{6.626 \times 10^{-34} \times 3.0 \times 10^{8}}{6.20 \times 10^{-7}} = ${f2(W * 1e19)} \times 10^{-19}$ J.

(b) Photon energy $= \dfrac{6.626 \times 10^{-34} \times 3.0 \times 10^{8}}{4.00 \times 10^{-7}} = ${f2(Ep * 1e19)} \times 10^{-19}$ J, so $\text{KE} = ${f2(Ep * 1e19)} \times 10^{-19} - ${f2(W * 1e19)} \times 10^{-19} = ${f2(KE * 1e19)} \times 10^{-19}$ J.`,
    sol: r`$W = ${f2(W * 1e19)} \times 10^{-19}$ J; KE $= ${f2(KE * 1e19)} \times 10^{-19}$ J.`,
    scheme: [['Work function W = hc/λ₀', 1], ['Photon energy at 400 nm', 1], ['KE = 1.76 × 10⁻¹⁹ J', 1]],
    d: 3, c: 'application', t: [4],
  });
})(), () => near(6.626e-34 * 3.0e8 / 620e-9 * 1e19, 3.206, 0.002) && near((6.626e-34 * 3.0e8 / 400e-9 - 6.626e-34 * 3.0e8 / 620e-9) * 1e19, 1.764, 0.003) || 'work');
add('photons-short3', (() => {
  const P = 50e3;
  const nu = 99.5e6;
  const E = h * nu;
  const n = P / E;
  return short({
    marks: 3,
    stem: r`A radio transmitter radiates a power of $50\ \text{kW}$ at a frequency of $99.5\ \text{MHz}$. Calculate the energy of one photon and the number of photons emitted per second, and say why radio waves do not seem to arrive in separate packets. ($h = 6.626 \times 10^{-34}\ \text{J s}$)`,
    model: r`$E = h\nu = 6.626 \times 10^{-34} \times 9.95 \times 10^{7} = ${f2(E * 1e26)} \times 10^{-26}$ J. Number per second $= \dfrac{5.0 \times 10^{4}}{${f2(E * 1e26)} \times 10^{-26}} = ${f2(n / 1e29)} \times 10^{29}$. Each photon carries an almost immeasurably small energy and so many arrive every second that the radiation behaves as a smooth, continuous wave.`,
    sol: r`$E = ${f2(E * 1e26)} \times 10^{-26}$ J; $N = ${f2(n / 1e29)} \times 10^{29}$ photons per second.`,
    scheme: [['Photon energy hν', 1], ['Power ÷ energy', 1], ['Explanation: tiny quanta, huge number', 1]],
    d: 3, c: 'application', t: [4],
  });
})(), () => near(5e4 / (6.626e-34 * 99.5e6) / 1e29, 7.58, 0.003) || 'transmitter');
add('planck-long', (() => {
  const lam = 300e-9;
  const E = (h * c) / lam;
  return long({
    stem: r`(a) Explain what is meant by black-body radiation and why the wave theory failed to account for the intensity of radiation at short wavelengths. [2]

(b) State Planck's quantum theory and write the equation for the energy of a quantum. [1]

(c) Calculate the energy of one photon of ultraviolet light of wavelength $300\ \text{nm}$. ($h = 6.626 \times 10^{-34}\ \text{J s}$, $c = 3.0 \times 10^{8}\ \text{m s}^{-1}$) [2]`,
    model: r`(a) A black body absorbs all radiation falling on it and emits a spectrum that depends only on its temperature. Wave theory predicted that the intensity would rise without limit towards short wavelengths (the "ultraviolet catastrophe"), but measured curves rise to a peak and fall again.

(b) Planck: a body emits or absorbs energy only in discrete packets called quanta; the energy of one quantum is proportional to the frequency, $E = h\nu = hc/\lambda$.

(c) $E = \dfrac{hc}{\lambda} = \dfrac{6.626 \times 10^{-34} \times 3.0 \times 10^{8}}{3.00 \times 10^{-7}} = ${f2(E * 1e19)} \times 10^{-19}$ J.`,
    sol: r`Black body and failure of wave theory; E = hν; $E = ${f2(E * 1e19)} \times 10^{-19}$ J.`,
    scheme: [['(a) Black body defined', 1], ['(a) Failure of wave theory', 1], ['(b) Quanta and E = hν', 1], ['(c) Substitution in hc/λ', 1], ['(c) 6.63 × 10⁻¹⁹ J', 1]],
    d: 3, c: 'application', t: [4],
  });
})(), () => near((6.626e-34 * 3.0e8 / 300e-9) * 1e19, 6.626, 0.0005) || 'planck-long');
add('photo-long', (() => {
  const KE = h * (9.5e14 - 6.0e14);
  const v = Math.sqrt((2 * KE) / me);
  return long({
    stem: r`(a) Write the equation for the maximum kinetic energy of a photoelectron in terms of the frequency of the light and the threshold frequency, and say what the work function is. [2]

(b) The threshold frequency of a certain metal is $6.0 \times 10^{14}\ \text{Hz}$ (given). Light of frequency $9.5 \times 10^{14}\ \text{Hz}$ falls on it. Calculate the maximum kinetic energy of an emitted electron and its speed. ($h = 6.626 \times 10^{-34}\ \text{J s}$, $m_\text{e} = 9.11 \times 10^{-31}\ \text{kg}$) [3]`,
    model: r`(a) $\text{KE} = h\nu - h\nu_0 = h(\nu - \nu_0)$; the work function $W = h\nu_0$ is the minimum energy needed to remove an electron from the surface of the metal.

(b) $\text{KE} = 6.626 \times 10^{-34} \times (9.5 - 6.0) \times 10^{14} = ${f2(KE * 1e19)} \times 10^{-19}$ J. From $\tfrac{1}{2} m_\text{e} v^2 = \text{KE}$: $v = \sqrt{\dfrac{2 \times ${f2(KE * 1e19)} \times 10^{-19}}{9.11 \times 10^{-31}}} = ${f2(v / 1e5)} \times 10^{5}$ m s⁻¹.`,
    sol: r`KE $= ${f2(KE * 1e19)} \times 10^{-19}$ J; $v = ${f2(v / 1e5)} \times 10^{5}$ m s⁻¹.`,
    scheme: [['(a) KE = h(ν − ν₀)', 1], ['(a) Work function', 1], ['(b) KE = 2.32 × 10⁻¹⁹ J', 1], ['(b) Uses ½mv²', 1], ['(b) 7.1 × 10⁵ m s⁻¹', 1]],
    d: 4, c: 'analysis', t: [4],
  });
})(), () => near(6.626e-34 * 3.5e14 * 1e19, 2.319, 0.002) && near(Math.sqrt(2 * 6.626e-34 * 3.5e14 / 9.11e-31) / 1e5, 7.14, 0.004) || 'photo-long');
