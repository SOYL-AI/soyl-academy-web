// ISC 11 Chemistry ch04 Bohr's Model, Atomic Spectra and Dual Nature: question bank (ISC style). Derivations of the Bohr
// expressions are a removed topic, so every Bohr item uses the given formulas r = 52.9 n²/Z pm, E = −2.18 × 10⁻¹⁸ Z²/n² J,
// v = 2.18 × 10⁶ Z/n m s⁻¹. MCQ keys are placed by the builder; assertion-reason keys: a b d c a b.
import { mk, add, r, sci, near } from './lib.mjs';

const { mcq, ar, tf, fill, match, num, short, long } = mk;
const h = 6.626e-34;
const NA = 6.022e23;
const me = 9.11e-31;
const RH = 1.097e7;
const f1 = (x) => x.toFixed(1);
const f2 = (x) => x.toFixed(2);
const f3 = (x) => x.toFixed(3);
const rB = (n, Z) => (52.9 * n * n) / Z; // pm
const EB = (n, Z) => (-2.18 * Z * Z) / (n * n); // x 1e-18 J
const vB = (n, Z) => (2.18 * Z) / n; // x 1e6 m/s
const lam = (n1, n2) => 1e9 / (RH * (1 / n1 ** 2 - 1 / n2 ** 2)); // nm

// ---------------------------------------------------------------- t01 emission and absorption; line and band spectra
add('emission-mcq', mcq({
  stem: 'A student sprinkles a pinch of lithium chloride on a Bunsen flame and views the flame through a hand spectroscope. She sees:',
  right: 'a few bright coloured lines on a dark background',
  wrong: ['a continuous band of all colours from violet to red', 'dark lines crossing a bright continuous background', 'a single dark band in the middle of the field'],
  sol: 'Excited lithium atoms emit light only at certain wavelengths, so the emission spectrum is a few bright lines — option (@K).',
  d: 1, c: 'understanding', t: [1],
}));
add('absorption-mcq', mcq({
  stem: 'White light from a lamp is passed through a tube of cool hydrogen gas and then through a prism. The spectrum observed is:',
  right: 'a continuous spectrum crossed by dark lines at the wavelengths that hydrogen emits',
  wrong: ['a few bright lines on a dark background', 'a continuous spectrum with no gaps in it', 'groups of closely spaced bright lines forming bands'],
  sol: 'The cool gas absorbs exactly the wavelengths it would emit, giving dark lines in the continuous spectrum — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('band-mcq', mcq({
  stem: 'A discharge tube holding nitrogen gas gives groups of closely spaced lines, each group ending sharply on one side. This kind of spectrum is a:',
  right: 'band emission spectrum, produced by excited molecules',
  wrong: ['line emission spectrum, produced by excited atoms', 'continuous spectrum, produced by a hot solid', 'line absorption spectrum, produced by cool atoms'],
  sol: 'Molecules have many closely spaced energy changes, so their lines crowd into bands — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('continuous-mcq', mcq({
  stem: 'Three lamps are viewed through a spectroscope. Lamp X shows an unbroken band of colours, lamp Y shows only a few sharp bright lines, and lamp Z shows groups of closely spaced lines. Which identification is most likely?',
  right: 'X is a tungsten filament bulb, Y is a sodium vapour lamp and Z is a tube of nitrogen gas',
  wrong: ['X is a sodium vapour lamp, Y is a tungsten filament bulb and Z is a tube of nitrogen gas', 'X is a tube of nitrogen gas, Y is a tungsten filament bulb and Z is a sodium vapour lamp', 'X is a tungsten filament bulb, Y is a tube of nitrogen gas and Z is a sodium vapour lamp'],
  sol: 'A hot solid gives a continuous spectrum (X), atoms give a few sharp lines (Y, sodium vapour) and molecules give bands of closely spaced lines (Z, nitrogen) — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('fingerprint-mcq', mcq({
  stem: 'An astronomer finds dark lines in the spectrum of starlight at exactly the wavelengths of the bright lines that helium emits in the laboratory. This shows that:',
  right: 'helium is present in the cooler outer layers of the star, absorbing those wavelengths',
  wrong: ['the star is made of helium only', 'the star is moving towards the Earth at high speed', 'the star emits a band spectrum like a molecule'],
  sol: 'An absorption line appears at the same wavelength as the emission line of the same atom, so helium gas absorbs the starlight on its way out — option (@K).',
  d: 3, c: 'application', t: [1],
}));
add('absorb-tf', tf({
  stem: 'The dark lines in the absorption spectrum of sodium appear at the same wavelengths as the bright lines in its emission spectrum.',
  key: 't',
  sol: 'True. An atom absorbs the same wavelengths that it can emit, because both correspond to jumps between the same energy levels.',
  d: 1, c: 'understanding', t: [1],
}));
add('spectra-ar', ar({
  a: 'Each element has its own characteristic line emission spectrum.',
  r: 'The allowed energy levels of the electrons in an atom are different for different elements.',
  key: 'a',
  sol: 'Both true; line positions depend on the energy gaps between levels, which differ from element to element, so R explains A — option (a).',
  d: 2, c: 'understanding', t: [1],
}));
add('emit-absorb-short', short({
  marks: 2,
  stem: 'How does an emission spectrum differ from an absorption spectrum? Say how the lines of the two spectra of the same element are related.',
  model: 'An emission spectrum is the radiation given out by atoms excited by heat or electricity, and it appears as bright lines on a dark background. An absorption spectrum is obtained when white light passes through a cool gas; the gas removes certain wavelengths, leaving dark lines on a continuous bright background. For a given element the dark lines occur at the same wavelengths as its bright lines.',
  sol: 'Bright lines versus dark lines; same positions.',
  scheme: [['Emission and absorption spectra distinguished', 1], ['Same wavelengths for the same element', 1]],
  d: 1, c: 'understanding', t: [1],
}));
add('band-why-short', short({
  marks: 2,
  stem: 'Why do excited atoms give sharp line spectra while excited molecules such as those of nitrogen usually give band spectra?',
  model: 'In an atom the electron can change only between a few widely separated energy levels, so only a few definite wavelengths are emitted, giving separate lines. A molecule has, in addition, many closely spaced vibrational and rotational energy levels, so a very large number of closely spaced wavelengths are emitted and the lines merge into groups called bands.',
  sol: 'Few levels for atoms; many closely spaced levels for molecules.',
  scheme: [['Atoms: few definite energy changes, lines', 1], ['Molecules: many closely spaced changes, bands', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('line-band-short3', short({
  marks: 3,
  stem: 'Distinguish between a continuous spectrum, a line spectrum and a band spectrum, giving one source of each.',
  model: 'A continuous spectrum contains all wavelengths of a region without a break, e.g. sunlight or the light of a white-hot filament. A line spectrum consists of separate, sharp lines of definite wavelengths, produced by excited atoms such as those in a sodium vapour lamp or hydrogen discharge tube. A band spectrum consists of groups of closely spaced lines that merge into bands, produced by excited molecules such as nitrogen in a discharge tube.',
  sol: 'Three kinds of spectrum with a source of each.',
  scheme: [['Continuous with source', 1], ['Line with source', 1], ['Band with source', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('spectra-long', long({
  stem: `(a) Describe how an emission line spectrum and an absorption line spectrum of hydrogen are obtained. [2]

(b) State how the two spectra of hydrogen are related, and explain what each spectrum shows about the structure of the atom. [2]

(c) Why can the line spectrum of an element be used to identify it? [1]`,
  model: `(a) Emission: hydrogen gas in a discharge tube is excited by a high voltage and its light is analysed with a prism or grating, giving bright lines on a dark background. Absorption: white light is passed through cool hydrogen and then analysed, giving a continuous spectrum with dark lines.

(b) The dark lines occur at the same wavelengths as the bright lines. Both show that the atom has only certain allowed energy levels, and that light is emitted or absorbed only when an electron changes between them.

(c) The set of wavelengths is fixed by the energy levels, which are different for each element, so the pattern is characteristic, like a fingerprint.`,
  sol: 'Two spectra; same positions and quantised levels; fingerprint.',
  scheme: [['(a) Emission spectrum obtained', 1], ['(a) Absorption spectrum obtained', 1], ['(b) Same wavelengths', 1], ['(b) Quantised energy levels', 1], ['(c) Characteristic of the element', 1]],
  d: 2, c: 'understanding', t: [1],
}));

// ---------------------------------------------------------------- t02 Bohr's model: postulates, merits, numericals
add('postulate-mcq', mcq({
  stem: 'Which of the following is a postulate of Bohr’s theory of the hydrogen atom?',
  right: 'The angular momentum of the electron in a stationary orbit is a whole-number multiple of h/2π',
  wrong: ['The electron may possess any energy while circling the nucleus', 'An electron in a stationary orbit radiates energy continuously', 'The energy of an orbit rises as its radius decreases'],
  sol: 'Bohr quantised the angular momentum: m v r = n h/2π, with n = 1, 2, 3 … — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('stationary-mcq', mcq({
  stem: 'An electron in the n = 3 orbit of a hydrogen atom does not radiate energy. According to Bohr this is because:',
  right: 'it is in a stationary state of fixed energy, and energy is exchanged only when it jumps between orbits',
  wrong: ['the electron has no kinetic energy in that orbit', 'the nucleus supplies energy to the electron at the same rate', 'the orbit is the one nearest to the nucleus'],
  sol: 'Bohr postulated that an electron in an allowed orbit has fixed energy and does not radiate; radiation appears only in a transition — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('radius-mcq', (() => {
  const v = rB(3, 1);
  return mcq({
    stem: r`The radius of the $n$th Bohr orbit of a hydrogen-like species is $r_n = 52.9\,n^2/Z$ pm. The radius of the third orbit of a hydrogen atom is:`,
    right: `${Math.round(v)} pm`,
    wrong: [`${Math.round(52.9 * 3)} pm`, '53 pm', `${Math.round(52.9 * 27)} pm`],
    sol: r`$r_3 = 52.9 \times 3^2 / 1 = ${f1(v)}$ pm $\approx ${Math.round(v)}$ pm — option (@K). Options (@1) and (@3) use $n$ and $n^3$ instead of $n^2$.`,
    d: 2, c: 'application', t: [2],
  });
})());
add('li2-mcq', (() => {
  const v = rB(2, 3);
  return mcq({
    stem: r`A beam contains $\ce{Li^2+}$ ions ($Z = 3$) with the electron in the second orbit. Using $r_n = 52.9\,n^2/Z$ pm, the radius of this orbit is:`,
    right: `${f1(v)} pm`,
    wrong: ['106 pm', '212 pm', `${f1((52.9 * 4) / 9)} pm`],
    sol: r`$r_2 = 52.9 \times 2^2 / 3 = ${f1(v)}$ pm — option (@K). The larger nuclear charge pulls the orbit in, so the radius is smaller than the 212 pm of hydrogen.`,
    d: 3, c: 'application', t: [2],
  });
})());
add('energy-ratio-mcq', mcq({
  stem: r`Using $E_n = -2.18 \times 10^{-18}\,Z^2/n^2$ J, the energy of the electron in the $n = 2$ level of $\ce{He+}$ compared with its energy in the $n = 1$ level of hydrogen is in the ratio:`,
  right: '1 : 1',
  wrong: ['2 : 1', '1 : 2', '4 : 1'],
  sol: r`$E(\ce{He+}, n{=}2) = -2.18 \times 10^{-18} \times 4/4 = -2.18 \times 10^{-18}$ J, the same as $E(\text{H}, n{=}1)$, so the ratio is 1 : 1 — option (@K).`,
  d: 3, c: 'analysis', t: [2],
}));
add('ionise-mcq', (() => {
  const E = 2.18e-18 * 4;
  const kJ = (E * NA) / 1000;
  return mcq({
    stem: r`In a plasma experiment, ground-state $\ce{He+}$ ions are ionised completely. Taking $E_n = -2.18 \times 10^{-18}\,Z^2/n^2$ J and $N_\text{A} = 6.022 \times 10^{23}\ \text{mol}^{-1}$, the energy needed per mole of $\ce{He+}$ is closest to:`,
    right: `$${sci(kJ, 3)}\\ \\text{kJ mol}^{-1}$`,
    wrong: [`$${sci((2.18e-18 * NA) / 1000, 3)}\\ \\text{kJ mol}^{-1}$`, `$${sci((2.18e-18 * 2 * NA) / 1000, 3)}\\ \\text{kJ mol}^{-1}$`, `$${sci((2.18e-18 * 16 * NA) / 1000, 3)}\\ \\text{kJ mol}^{-1}$`],
    sol: r`Ionisation energy $= 2.18 \times 10^{-18} \times Z^2 = 2.18 \times 10^{-18} \times 4 = ${f2(E * 1e18)} \times 10^{-18}$ J per ion, and per mole $${f2(E * 1e18)} \times 10^{-18} \times 6.022 \times 10^{23} / 1000 = ${sci(kJ, 3)}$ kJ — option (@K).`,
    d: 3, c: 'application', t: [2],
  });
})());
add('bohr-ar', ar({
  a: 'The radius of the nth Bohr orbit of hydrogen is proportional to n².',
  r: 'The energy of an electron in a hydrogen atom becomes less negative as n increases.',
  key: 'b',
  sol: 'Both statements are true, but the energy trend does not explain the radius law, which follows from quantised angular momentum and the balance of forces — option (b).',
  d: 3, c: 'analysis', t: [2],
}));
add('radius-num', (() => {
  const v = rB(4, 4);
  return num({
    stem: r`A beryllium ion $\ce{Be^3+}$ ($Z = 4$) has its single electron in the fourth orbit. Calculate the radius of this orbit in pm, using $r_n = 52.9\,n^2/Z$ pm.`,
    value: Math.round(v), tol: 1, unit: 'pm',
    sol: r`$r_4 = \dfrac{52.9 \times 4^2}{4} = ${f1(v)}$ pm $\approx ${Math.round(v)}$ pm.`,
    scheme: [['Substitutes n = 4 and Z = 4', 0.5], ['212 pm', 0.5]],
    marks: 1, d: 2, c: 'application', t: [2],
  });
})(), (q) => near(52.9 * 16 / 4, 211.6, 1e-6) && q.answer.value === 212 || 'radius');
add('velocity-num', (() => {
  const v = vB(3, 2);
  const s = f2(v);
  return num({
    stem: r`The electron of a $\ce{He+}$ ion in a hot plasma is in the third orbit. Using $v_n = 2.18 \times 10^{6}\,Z/n$ m s⁻¹, calculate its speed in units of $10^{6}\ \text{m s}^{-1}$.`,
    value: Number(s), tol: 0.01, unit: '× 10⁶ m s⁻¹',
    sol: r`$v_3 = 2.18 \times 10^{6} \times \dfrac{2}{3} = ${s} \times 10^{6}\ \text{m s}^{-1}$; in units of $10^{6}$: $${s} \times 10^{6} / 10^{6} = ${s}$.`,
    scheme: [['Substitutes Z = 2 and n = 3', 0.5], ['1.45 × 10⁶ m s⁻¹', 0.5]],
    marks: 1, d: 2, c: 'application', t: [2],
  });
})(), (q) => near(2.18 * 2 / 3, 1.4533, 0.001) && q.answer.value === 1.45 || 'velocity');
add('bohr-match', match({
  stem: 'Match each quantity of a hydrogen-like species in the nth orbit with its expression.',
  pairs: [['Radius', '52.9 n²/Z pm'], ['Energy', '−2.18 × 10⁻¹⁸ Z²/n² J'], ['Speed', '2.18 × 10⁶ Z/n m s⁻¹'], ['Angular momentum', 'nh/2π']],
  order: [2, 0, 3, 1],
  sol: 'Radius → r (52.9 n²/Z); energy → p (−2.18 × 10⁻¹⁸ Z²/n²); speed → s (2.18 × 10⁶ Z/n); angular momentum → q (nh/2π).',
  d: 2, c: 'recall', t: [2],
}));
add('merits-short', short({
  marks: 2,
  stem: 'State two merits of Bohr’s model of the hydrogen atom.',
  model: 'It explained the stability of the atom by proposing stationary orbits in which the electron does not radiate. It explained the line spectrum of hydrogen, and gave the correct wavelengths of the lines (the Rydberg formula), by treating each line as a jump between two energy levels; it also gave the radii and energies of hydrogen-like ions such as He⁺ and Li²⁺.',
  sol: 'Stability; hydrogen spectrum and hydrogen-like ions.',
  scheme: [['Explains stability / stationary orbits', 1], ['Explains the hydrogen spectrum', 1]],
  d: 1, c: 'recall', t: [2],
}));
add('energy-short2', (() => {
  const E3 = EB(3, 1);
  const dE = 2.18 * (1 - 1 / 9);
  return short({
    marks: 2,
    stem: r`A hydrogen atom in a discharge tube is raised from its ground state to the third level. Using $E_n = -2.18 \times 10^{-18}/n^2$ J, calculate the energy of the electron in the $n = 3$ level and the energy absorbed.`,
    model: r`$E_3 = -\dfrac{2.18 \times 10^{-18}}{9} = ${f2(E3 * 10)} \times 10^{-19}$ J, with $E_1 = -2.18 \times 10^{-18}$ J. Energy absorbed $= E_3 - E_1 = (${f2(E3 * 10)} \times 10^{-19}) - (-2.18 \times 10^{-18}) = ${f2(dE)} \times 10^{-18}$ J.`,
    sol: r`$E_3 = ${f2(E3 * 10)} \times 10^{-19}$ J; absorbed $= ${f2(dE)} \times 10^{-18}$ J.`,
    scheme: [['E₃ = −2.42 × 10⁻¹⁹ J', 1], ['E₃ − E₁ = 1.94 × 10⁻¹⁸ J', 1]],
    d: 2, c: 'application', t: [2],
  });
})(), () => near(-2.18e-18 / 9 * 1e19, -2.422, 0.001) && near(2.18 * 8 / 9, 1.938, 0.001) || 'energy-short2');
add('bohr-post-short3', short({
  marks: 3,
  stem: 'State the three main postulates of Bohr’s theory of the atom.',
  model: 'First, an electron moves round the nucleus only in certain allowed circular orbits (stationary states), in which it does not radiate energy, each orbit having a definite energy. Second, an orbit is allowed only if the angular momentum of the electron in it is a whole-number multiple of h/2π, m v r = nh/2π. Third, energy is emitted or absorbed only when an electron jumps from one orbit to another, as one photon of energy ΔE = hν equal to the difference between the two energies.',
  sol: 'Stationary orbits, quantised angular momentum, ΔE = hν.',
  scheme: [['Stationary orbits, no radiation', 1], ['Quantised angular momentum', 1], ['Jump and ΔE = hν', 1]],
  d: 1, c: 'recall', t: [2],
}));
add('hlike-short3', (() => {
  const rr = rB(2, 4);
  const v = vB(2, 4);
  const E = EB(2, 4);
  return short({
    marks: 3,
    stem: r`The electron of a $\ce{Be^3+}$ ion ($Z = 4$) is in the second orbit. Using $r_n = 52.9\,n^2/Z$ pm, $v_n = 2.18 \times 10^{6}\,Z/n$ m s⁻¹ and $E_n = -2.18 \times 10^{-18}\,Z^2/n^2$ J, calculate the radius, the speed and the energy of the electron.`,
    model: r`$r_2 = \dfrac{52.9 \times 2^2}{4} = ${f1(rr)}$ pm. $v_2 = 2.18 \times 10^{6} \times \dfrac{4}{2} = ${f2(v)} \times 10^{6}$ m s⁻¹. $E_2 = -2.18 \times 10^{-18} \times \dfrac{4^2}{2^2} = ${f2(E)} \times 10^{-18}$ J.`,
    sol: r`$r = ${f1(rr)}$ pm; $v = ${f2(v)} \times 10^{6}$ m s⁻¹; $E = ${f2(E)} \times 10^{-18}$ J.`,
    scheme: [['Radius 52.9 pm', 1], ['Speed 4.36 × 10⁶ m s⁻¹', 1], ['Energy −8.72 × 10⁻¹⁸ J', 1]],
    d: 3, c: 'application', t: [2],
  });
})(), () => near(52.9 * 4 / 4, 52.9, 1e-9) && near(2.18 * 4 / 2, 4.36, 1e-9) && near(-2.18 * 16 / 4, -8.72, 1e-9) || 'hlike');
add('orbit-wave-short3', (() => {
  const rr = rB(2, 1);
  const lamPm = (2 * Math.PI * rr) / 2;
  const vv = vB(2, 1) * 1e6;
  const lamDB = h / (me * vv);
  return short({
    marks: 3,
    stem: r`In the second orbit of hydrogen the radius is $211.6$ pm and the speed of the electron is $1.09 \times 10^{6}\ \text{m s}^{-1}$. If the electron wave fits the orbit as a standing wave, find the wavelength from $2\pi r = n\lambda$, find it again from the de Broglie relation, and compare the two. ($h = 6.626 \times 10^{-34}\ \text{J s}$, $m_\text{e} = 9.11 \times 10^{-31}\ \text{kg}$)`,
    model: r`From $2\pi r = n\lambda$ with $n = 2$: $\lambda = \dfrac{2 \times 3.1416 \times 211.6}{2} = ${f1(lamPm)}$ pm. From de Broglie: $\lambda = \dfrac{h}{m_\text{e}v} = \dfrac{6.626 \times 10^{-34}}{9.11 \times 10^{-31} \times 1.09 \times 10^{6}} = ${f2(lamDB * 1e10)} \times 10^{-10}$ m, i.e. about ${Math.round(lamDB * 1e12)} pm. The two agree within about 0.4%, so the allowed orbit holds a whole number (2) of electron wavelengths, which supports Bohr's quantum condition.`,
    sol: r`$\lambda = ${f1(lamPm)}$ pm (from the orbit) and $${f2(lamDB * 1e10)} \times 10^{-10}$ m (de Broglie): they agree.`,
    scheme: [['λ from 2πr = nλ: 665 pm', 1], ['λ = h/mv: 667 pm', 1], ['Agreement: whole number of wavelengths in the orbit', 1]],
    d: 4, c: 'analysis', t: [2, 4],
  });
})(), () => near((2 * Math.PI * 211.6) / 2, 664.8, 0.001) && near(6.626e-34 / (9.11e-31 * 1.09e6) * 1e12, 667.3, 0.002) || 'orbit-wave');
add('bohr-long', (() => {
  const rr = rB(3, 3);
  const E = EB(3, 3);
  return long({
    stem: r`(a) State any three postulates of Bohr's theory of the atom. [3]

(b) The electron of an $\ce{Li^2+}$ ion ($Z = 3$) is in the third orbit. Calculate the radius of the orbit, and the energy of the electron, using $r_n = 52.9\,n^2/Z$ pm and $E_n = -2.18 \times 10^{-18}\,Z^2/n^2$ J. [2]`,
    model: r`(a) (i) The electron moves only in certain circular stationary orbits, in which it does not radiate; (ii) the angular momentum in an allowed orbit is a whole-number multiple of $h/2\pi$; (iii) energy is absorbed or emitted only when the electron jumps between orbits, as a photon with $\Delta E = h\nu$.

(b) $r_3 = \dfrac{52.9 \times 3^2}{3} = ${f1(rr)}$ pm. $E_3 = -2.18 \times 10^{-18} \times \dfrac{3^2}{3^2} = ${f2(E)} \times 10^{-18}$ J (the same as the ground-state energy of hydrogen).`,
    sol: r`Three postulates; $r = ${f1(rr)}$ pm; $E = ${f2(E)} \times 10^{-18}$ J.`,
    scheme: [['(a) First postulate', 1], ['(a) Second postulate', 1], ['(a) Third postulate', 1], ['(b) r = 158.7 pm', 1], ['(b) E = −2.18 × 10⁻¹⁸ J', 1]],
    d: 3, c: 'application', t: [2],
  });
})(), () => near(52.9 * 9 / 3, 158.7, 1e-6) && near(-2.18 * 9 / 9, -2.18, 1e-9) || 'bohr-long');
add('overview-long', long({
  stem: `(a) Give two merits of Bohr's model of the atom. [2]

(b) Explain why Bohr's model fails (i) for an atom with more than one electron, (ii) to account for the splitting of spectral lines in a magnetic field and (iii) to agree with Heisenberg's principle. [3]`,
  model: `(a) It explained the stability of the atom through stationary orbits in which no radiation occurs, and it explained the line spectrum of hydrogen and hydrogen-like ions, giving the radii, energies and wavelengths correctly.

(b) (i) It ignores the repulsion between electrons, so it gives wrong energies for helium and other many-electron atoms. (ii) It has only one quantum number, n, so it cannot account for the extra lines that appear when the source is placed in a magnetic field (Zeeman effect) or an electric field (Stark effect). (iii) It treats the electron as a particle moving in a path of exactly known radius and speed, which Heisenberg's uncertainty principle shows is impossible, and it ignores the wave nature of the electron.`,
  sol: 'Two merits; three failures.',
  scheme: [['(a) First merit', 1], ['(a) Second merit', 1], ['(b)(i) Many-electron atoms', 1], ['(b)(ii) Splitting of lines in fields', 1], ['(b)(iii) Conflict with uncertainty principle and wave nature', 1]],
  d: 3, c: 'understanding', t: [2, 3],
}));

// ---------------------------------------------------------------- t03 hydrogen spectrum, Rydberg formula, defects
add('series-region-mcq', mcq({
  stem: 'In a hydrogen discharge tube a line of wavelength 1875 nm, in the infrared, is recorded when the electron falls from n = 4. Using the Rydberg formula, the line belongs to the series ending on n = 3, the:',
  right: 'Paschen series',
  wrong: ['Lyman series', 'Balmer series', 'Brackett series'],
  sol: r`$\dfrac{1}{\lambda} = \dfrac{1}{1875 \times 10^{-9}} = 5.33 \times 10^{5}\ \text{m}^{-1}$, and $1.097 \times 10^{7} \left(\dfrac{1}{9} - \dfrac{1}{16}\right) = 5.33 \times 10^{5}\ \text{m}^{-1}$, so $n_1 = 3$, the Paschen series — option (@K).`,
  d: 2, c: 'application', t: [3],
}));
add('lines-count-mcq', (() => {
  const n = 5;
  const k = (n * (n - 1)) / 2;
  return mcq({
    stem: 'A flask of hydrogen atoms is excited so that electrons are raised to n = 5. Counting every possible route back to the ground state, the maximum number of different spectral lines emitted is:',
    right: String(k),
    wrong: ['4', '5', '15'],
    sol: r`Number of lines $= n(n-1)/2 = 5 \times 4/2 = ${k}$ — option (@K).`,
    d: 2, c: 'application', t: [3],
  });
})());
add('longest-mcq', mcq({
  stem: 'The first line of the Balmer series of hydrogen has a wavelength of 656 nm. The wavelength of the Balmer line produced by the transition from n = 4 to n = 2 will be:',
  right: 'shorter than 656 nm, because the energy gap is larger',
  wrong: ['longer than 656 nm, because the energy gap is larger', 'equal to 656 nm, because both end on n = 2', 'shorter than 656 nm, because the gap is smaller'],
  sol: 'The 4 to 2 gap is larger than the 3 to 2 gap, so the photon has more energy and a shorter wavelength (486 nm) — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('shortest-mcq', mcq({
  stem: 'The line of shortest wavelength in the Lyman series of hydrogen, called the series limit, is produced by the transition:',
  right: 'n = ∞ to n = 1',
  wrong: ['n = 2 to n = 1', 'n = ∞ to n = 2', 'n = 3 to n = 1'],
  sol: 'The largest gap in the series, from infinity to n = 1, gives the shortest wavelength — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('defect-mcq', mcq({
  stem: 'Which of the following could Bohr’s model NOT explain?',
  right: 'the splitting of spectral lines when the source is placed in a magnetic field',
  wrong: ['the line spectrum of the hydrogen atom', 'the spectrum of the He⁺ ion', 'the stability of the hydrogen atom'],
  sol: 'Bohr’s single quantum number cannot account for the extra lines produced in a magnetic field (Zeeman effect) — option (@K). The other three are explained by the model.',
  d: 2, c: 'understanding', t: [3],
}));
add('manyelectron-mcq', mcq({
  stem: 'Bohr’s formulas for energy give wrong results for the helium atom (two electrons) mainly because the model:',
  right: 'does not allow for the repulsion between the electrons',
  wrong: ['assumes that the nucleus has no charge', 'allows the electron to radiate energy continuously', 'uses a value of the Planck constant that is too small'],
  sol: 'Bohr’s theory treats a single electron attracted by the nucleus and ignores electron–electron repulsion — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('balmer-num', (() => {
  const L = lam(2, 5);
  const wn = RH * (1 / 4 - 1 / 25);
  return num({
    stem: r`Light is emitted when the electron of a hydrogen atom in a discharge tube falls from $n = 5$ to $n = 2$. Using $R_\text{H} = 1.097 \times 10^{7}\ \text{m}^{-1}$, calculate the wavelength of this Balmer line in nm.`,
    value: Math.round(L), tol: 1, unit: 'nm',
    sol: r`$\dfrac{1}{\lambda} = 1.097 \times 10^{7} \left(\dfrac{1}{4} - \dfrac{1}{25}\right) = ${f2(wn / 1e6)} \times 10^{6}\ \text{m}^{-1}$, so $\lambda = \dfrac{1}{${f2(wn / 1e6)} \times 10^{6}} = ${f2((1 / wn) * 1e7)} \times 10^{-7}$ m; in nm: $${f2((1 / wn) * 1e7)} \times 10^{-7} \times 10^{9} = ${f1(L)}$, about ${Math.round(L)} nm (violet).`,
    scheme: [['Rydberg formula with 1/4 − 1/25', 1], ['Reciprocal and conversion to nm', 1]],
    marks: 2, d: 2, c: 'application', t: [3],
  });
})(), (q) => near(1e9 / (1.097e7 * 0.21), 434.0, 0.003) && q.answer.value === 434 || 'balmer-num');
add('lyman-num', (() => {
  const L = lam(1, 4);
  const wn = RH * (1 - 1 / 16);
  const s = f1(L);
  return num({
    stem: r`In a spectrometer test of a hydrogen lamp, the third line of the Lyman series is recorded (the electron falls from $n = 4$ to $n = 1$). Calculate its wavelength in nm. ($R_\text{H} = 1.097 \times 10^{7}\ \text{m}^{-1}$)`,
    value: Number(s), tol: 0.3, unit: 'nm',
    sol: r`$\dfrac{1}{\lambda} = 1.097 \times 10^{7} \left(1 - \dfrac{1}{16}\right) = ${f3(wn / 1e7)} \times 10^{7}\ \text{m}^{-1}$, so $\lambda = \dfrac{1}{${f3(wn / 1e7)} \times 10^{7}} = ${f2((1 / wn) * 1e8)} \times 10^{-8}$ m; in nm: $${f2((1 / wn) * 1e8)} \times 10^{-8} \times 10^{9} = ${s}$ (ultraviolet).`,
    scheme: [['Rydberg formula with n₁ = 1, n₂ = 4', 1], ['97.2 nm in the ultraviolet', 1]],
    marks: 2, d: 3, c: 'application', t: [3],
  });
})(), (q) => near(1e9 / (1.097e7 * 0.9375), 97.23, 0.002) && q.answer.value === 97.2 || 'lyman-num');
add('balmer-fill', fill({
  stem: 'The Balmer series of lines in the hydrogen spectrum arises when the electron falls to the level n = ___.',
  acc: [['2', 'two']],
  sol: 'Balmer lines end on the level n = 2.',
  d: 1, c: 'recall', t: [3],
}));
add('hlike-tf', tf({
  stem: 'Bohr’s model can be used to calculate the radii and energies of the electron in He⁺ and Li²⁺ ions.',
  key: 't',
  sol: 'True. These ions have only one electron, so r and E follow from the formulas with the appropriate Z.',
  d: 1, c: 'understanding', t: [3],
}));
add('series-match', match({
  stem: 'Match each hydrogen spectral series with the lower level n₁ to which the electron falls.',
  pairs: [['Lyman', 'n = 1'], ['Balmer', 'n = 2'], ['Paschen', 'n = 3'], ['Brackett', 'n = 4']],
  order: [1, 3, 0, 2],
  sol: 'Lyman → q (n = 1); Balmer → s (n = 2); Paschen → p (n = 3); Brackett → r (n = 4).',
  d: 1, c: 'recall', t: [3],
}));
add('series-ar', ar({
  a: 'The Lyman series of hydrogen lies in the visible region of the spectrum.',
  r: 'The lines of the Lyman series are produced when the electron falls to the level n = 2.',
  key: 'd',
  sol: 'Lyman lines lie in the ultraviolet and end on n = 1, so both statements are false — option (d).',
  d: 2, c: 'understanding', t: [3],
}));
add('defect-ar', ar({
  a: 'Bohr’s model gives correct wavelengths for the spectrum of the Li²⁺ ion.',
  r: 'The Li²⁺ ion contains more than one electron.',
  key: 'c',
  sol: 'A is true: Li²⁺ has a single electron, so the model applies. R is false: Li²⁺ has only one electron — option (c).',
  d: 3, c: 'analysis', t: [3],
}));
add('rydberg-short', short({
  marks: 2,
  stem: r`Write the Rydberg formula for the wave number of a line in the hydrogen spectrum, and name the series for which $n_1 = 1$ and for which $n_1 = 2$.`,
  model: r`$\bar{\nu} = \dfrac{1}{\lambda} = R_\text{H}\left(\dfrac{1}{n_1^2} - \dfrac{1}{n_2^2}\right)$, with $R_\text{H} = 1.097 \times 10^{7}\ \text{m}^{-1}$ and $n_2 > n_1$. For $n_1 = 1$ the series is the Lyman series (ultraviolet); for $n_1 = 2$ it is the Balmer series (visible).`,
  sol: 'Rydberg formula; Lyman and Balmer.',
  scheme: [['Rydberg formula with R_H', 1], ['Lyman and Balmer', 1]],
  d: 1, c: 'recall', t: [3],
}));
add('hlines-short2', (() => {
  const n = 6;
  const k = (n * (n - 1)) / 2;
  return short({
    marks: 2,
    stem: 'Electrons in a sample of hydrogen are raised to the sixth level. How many different spectral lines can the sample emit, and how many of them are Lyman lines?',
    model: r`Number of lines $= \dfrac{n(n-1)}{2} = \dfrac{6 \times 5}{2} = ${k}$. Lyman lines end on $n = 1$, and can start from $n = 2, 3, 4, 5$ or $6$, so 5 of the 15 lines belong to the Lyman series.`,
    sol: r`$n(n-1)/2 = 15$ lines; 5 are Lyman lines.`,
    scheme: [['15 lines', 1], ['5 Lyman lines', 1]],
    d: 2, c: 'application', t: [3],
  });
})(), () => (6 * 5) / 2 === 15 || 'lines');
add('photon-emission-short2', short({
  marks: 2,
  stem: 'An electron in a hydrogen atom falls from the fourth level to the second. Name the series to which the line belongs, say in which region of the spectrum it lies, and write the relation between the energy change and the frequency.',
  model: 'The electron lands on n = 2, so the line belongs to the Balmer series, and it lies in the visible region (about 486 nm, blue-green). The energy difference between the two levels is emitted as one photon, ΔE = E₄ − E₂ = hν.',
  sol: 'Balmer, visible; ΔE = hν.',
  scheme: [['Balmer series, visible region', 1], ['ΔE = hν', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('paschen-short3', (() => {
  const wn = RH * (1 / 9 - 1 / 25);
  const L = lam(3, 5);
  return short({
    marks: 3,
    stem: r`The second line of the Paschen series of hydrogen arises when the electron falls from $n = 5$ to $n = 3$. Calculate its wavelength in nm, say in which region of the spectrum it lies and give its wave number. ($R_\text{H} = 1.097 \times 10^{7}\ \text{m}^{-1}$)`,
    model: r`$\dfrac{1}{\lambda} = 1.097 \times 10^{7}\left(\dfrac{1}{9} - \dfrac{1}{25}\right) = ${f2(wn / 1e5)} \times 10^{5}\ \text{m}^{-1}$ (the wave number). $\lambda = \dfrac{1}{${f2(wn / 1e5)} \times 10^{5}} = ${f2((1 / wn) * 1e6)} \times 10^{-6}$ m $\approx ${Math.round(L)}$ nm, which is in the infrared region.`,
    sol: r`$\bar{\nu} = ${f2(wn / 1e5)} \times 10^{5}\ \text{m}^{-1}$; $\lambda \approx ${Math.round(L)}$ nm, infrared.`,
    scheme: [['Wave number from the Rydberg formula', 1], ['λ ≈ 1282 nm', 1], ['Infrared region', 1]],
    d: 3, c: 'application', t: [3],
  });
})(), () => near(1e9 / (1.097e7 * (1 / 9 - 1 / 25)), 1281.8, 0.002) || 'paschen');
add('defects-short3', short({
  marks: 3,
  stem: 'List three defects of Bohr’s model of the atom.',
  model: 'It works only for one-electron species such as H, He⁺ and Li²⁺ and fails for atoms with more electrons. It cannot explain the fine splitting of spectral lines in a magnetic field (Zeeman effect) or in an electric field (Stark effect). It treats the electron as a particle in a definite orbit, ignoring its wave nature and contradicting Heisenberg’s uncertainty principle; it also gives no explanation of how atoms form chemical bonds.',
  sol: 'Many-electron atoms; Zeeman and Stark effects; wave nature and uncertainty.',
  scheme: [['Many-electron atoms', 1], ['Splitting of lines in fields', 1], ['Wave nature and uncertainty principle', 1]],
  d: 2, c: 'recall', t: [3],
}));
add('series-short3', short({
  marks: 3,
  stem: 'Name the first three series of the hydrogen spectrum, give the lower level n₁ of each and the region of the spectrum in which it lies.',
  model: 'Lyman series: n₁ = 1, ultraviolet region. Balmer series: n₁ = 2, visible region (with part in the near ultraviolet). Paschen series: n₁ = 3, infrared region.',
  sol: 'Lyman 1 UV; Balmer 2 visible; Paschen 3 infrared.',
  scheme: [['Lyman: n₁ = 1, ultraviolet', 1], ['Balmer: n₁ = 2, visible', 1], ['Paschen: n₁ = 3, infrared', 1]],
  d: 1, c: 'recall', t: [3],
}));
add('hydrogen-long', (() => {
  const wn1 = RH * (1 / 4 - 1 / 9);
  const wn2 = RH / 4;
  const L1 = lam(2, 3);
  const L2 = 1e9 / wn2;
  return long({
    stem: r`(a) Write the Rydberg formula for hydrogen and name the series, with the region of the spectrum, for $n_1 = 1, 2$ and $3$. [2]

(b) Calculate the longest and the shortest wavelength of the Balmer series. ($R_\text{H} = 1.097 \times 10^{7}\ \text{m}^{-1}$) [3]`,
    model: r`(a) $\dfrac{1}{\lambda} = R_\text{H}\left(\dfrac{1}{n_1^2} - \dfrac{1}{n_2^2}\right)$ with $n_2 > n_1$. $n_1 = 1$: Lyman, ultraviolet; $n_1 = 2$: Balmer, visible; $n_1 = 3$: Paschen, infrared.

(b) Longest wavelength ($n_2 = 3$): $\dfrac{1}{\lambda} = 1.097 \times 10^{7}\left(\dfrac{1}{4} - \dfrac{1}{9}\right) = ${f2(wn1 / 1e6)} \times 10^{6}\ \text{m}^{-1}$, so $\lambda = ${f1(L1)}$ nm. Shortest wavelength (series limit, $n_2 = \infty$): $\dfrac{1}{\lambda} = \dfrac{1.097 \times 10^{7}}{4} = ${f2(wn2 / 1e6)} \times 10^{6}\ \text{m}^{-1}$, so $\lambda = ${f1(L2)}$ nm.`,
    sol: r`Rydberg formula; longest $${f1(L1)}$ nm; shortest $${f1(L2)}$ nm.`,
    scheme: [['(a) Rydberg formula', 1], ['(a) Three series with regions', 1], ['(b) Longest wavelength 656.3 nm', 1.5], ['(b) Shortest wavelength 364.6 nm', 1.5]],
    d: 3, c: 'application', t: [3],
  });
})(), () => near(1e9 / (1.097e7 * (0.25 - 1 / 9)), 656.3, 0.001) && near(4e9 / 1.097e7, 364.6, 0.001) || 'hydrogen-long');

// ---------------------------------------------------------------- t04 de Broglie, Heisenberg
add('speed-dB-mcq', mcq({
  stem: r`An electron beam in a microscope is accelerated so that the speed of its electrons rises from $1.0 \times 10^{6}$ to $4.0 \times 10^{6}\ \text{m s}^{-1}$. Its de Broglie wavelength changes by the factor:`,
  right: 'one-quarter, so the wavelength becomes one-quarter of the original',
  wrong: ['four, so the wavelength becomes four times the original', 'one-half, so the wavelength becomes half the original', 'sixteen, so the wavelength becomes sixteen times the original'],
  sol: r`$\lambda = h/mv$ is inversely proportional to $v$, so a four-fold speed gives one-quarter of the wavelength — option (@K).`,
  d: 2, c: 'application', t: [4],
}));
add('dB-ratio-mcq', mcq({
  stem: 'A proton and an alpha particle (mass about four times that of the proton) move at the same speed. The ratio of the de Broglie wavelength of the proton to that of the alpha particle is about:',
  right: '4 : 1',
  wrong: ['1 : 4', '1 : 1', '16 : 1'],
  sol: r`$\lambda = h/mv$ with equal $v$ gives $\lambda_\text{p}/\lambda_\alpha = m_\alpha/m_\text{p} = 4$, so 4 : 1 — option (@K).`,
  d: 3, c: 'application', t: [4],
}));
add('uncertainty-mcq', mcq({
  stem: r`For an electron, $\Delta x \cdot \Delta p \geq h/4\pi$. If the uncertainty in the position of the electron is reduced to half its value, the minimum uncertainty in its momentum:`,
  right: 'becomes twice as great',
  wrong: ['becomes half as great', 'does not change', 'becomes four times as great'],
  sol: r`$\Delta p \geq h/(4\pi\,\Delta x)$ is inversely proportional to $\Delta x$, so halving $\Delta x$ doubles the minimum $\Delta p$ — option (@K).`,
  d: 2, c: 'application', t: [4],
}));
add('macro-mcq', mcq({
  stem: 'Wave behaviour is observed for a beam of electrons but never for a falling hailstone, because for the hailstone:',
  right: 'the mass is so large that λ = h/mv is far too small to detect',
  wrong: ['a hailstone has no mass', 'a hailstone cannot move at a measurable speed', 'the de Broglie relation applies only to charged particles'],
  sol: 'm is enormous compared with the electron’s, so λ = h/mv is immeasurably small — option (@K). The relation applies to every moving object.',
  d: 2, c: 'understanding', t: [4],
}));
add('electron-orbit-mcq', mcq({
  stem: 'The idea that an electron in an atom travels in a circular path of exactly known radius and speed is rejected by modern theory because:',
  right: 'the position and momentum of an electron cannot both be known exactly, so its path cannot be traced',
  wrong: ['an electron has no mass and so cannot follow a path', 'the nucleus pushes the electron out of any circular path', 'the electron is a wave only when it is outside the atom'],
  sol: 'Heisenberg’s uncertainty principle forbids exact simultaneous values of position and momentum, so a definite orbit has no meaning — option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('ball-num', (() => {
  const m = 0.057;
  const v = 60;
  const L = h / (m * v);
  const s = f2(L / 1e-34);
  return num({
    stem: r`A tennis ball of mass $57\ \text{g}$ is served at $60\ \text{m s}^{-1}$. Calculate its de Broglie wavelength in units of $10^{-34}\ \text{m}$. ($h = 6.626 \times 10^{-34}\ \text{J s}$)`,
    value: Number(s), tol: 0.02, unit: '× 10⁻³⁴ m',
    sol: r`$m = 57\ \text{g} = 0.057$ kg, so $\lambda = \dfrac{h}{mv} = \dfrac{6.626 \times 10^{-34}}{0.057 \times 60} = ${s} \times 10^{-34}$ m; in units of $10^{-34}$ m: $${s} \times 10^{-34} / 10^{-34} = ${s}$.`,
    scheme: [['Converts 57 g to kg', 0.5], ['λ = h/mv', 0.5]],
    marks: 1, d: 2, c: 'application', t: [4],
  });
})(), (q) => near(6.626e-34 / (0.057 * 60) / 1e-34, 1.937, 0.002) && q.answer.value === 1.94 || 'ball');
add('uncertainty-num', (() => {
  const dx = 2.0e-10;
  const dv = h / (4 * Math.PI * me * dx);
  const s = f2(dv / 1e5);
  return num({
    stem: r`In a model of a hydrogen atom the position of the electron is fixed to within $2.0 \times 10^{-10}\ \text{m}$. Calculate the minimum uncertainty in its speed, in units of $10^{5}\ \text{m s}^{-1}$. ($h = 6.626 \times 10^{-34}\ \text{J s}$, $m_\text{e} = 9.11 \times 10^{-31}\ \text{kg}$)`,
    value: Number(s), tol: 0.02, unit: '× 10⁵ m s⁻¹',
    sol: r`$\Delta v = \dfrac{h}{4\pi m_\text{e} \Delta x} = \dfrac{6.626 \times 10^{-34}}{4 \times \pi \times 9.11 \times 10^{-31} \times 2.0 \times 10^{-10}} = ${s} \times 10^{5}\ \text{m s}^{-1}$; in units of $10^{5}$: $${s} \times 10^{5} / 10^{5} = ${s}$.`,
    scheme: [['Δv = h/(4π m Δx)', 1], ['Substitution: 2.89 × 10⁵ m s⁻¹', 1]],
    marks: 2, d: 3, c: 'application', t: [4],
  });
})(), (q) => near(6.626e-34 / (4 * Math.PI * 9.11e-31 * 2.0e-10) / 1e5, 2.894, 0.002) && q.answer.value === 2.89 || 'uncertainty-num');
add('uncertainty-fill', fill({
  stem: 'Heisenberg’s uncertainty principle states that the product of the uncertainty in position and the uncertainty in momentum is at least ___.',
  acc: [['h/4π', 'h/(4π)', 'h / 4π', 'h/4pi']],
  sol: 'Δx · Δp ≥ h/4π.',
  d: 1, c: 'recall', t: [4],
}));
add('debroglie-tf', tf({
  stem: 'A tennis ball served at 60 m s⁻¹ has a de Broglie wavelength so small that its wave nature cannot be detected.',
  key: 't',
  sol: 'True. For a ball, m is large, so λ = h/mv is about 10⁻³⁴ m, far smaller than anything measurable.',
  d: 1, c: 'understanding', t: [4],
}));
add('uncertainty-ar', ar({
  a: 'The uncertainty in the velocity of a dust grain of mass 1 μg is negligible, but for an electron it is large.',
  r: 'The product of mass and the uncertainty in position is far larger for the dust grain than for the electron, while h is the same.',
  key: 'a',
  sol: 'Δv ≥ h/(4π m Δx): the very large mass makes Δv tiny for the grain, and the very small mass makes it large for the electron. R explains A — option (a).',
  d: 3, c: 'analysis', t: [4],
}));
add('debroglie-ar', ar({
  a: 'The de Broglie wavelength of an electron decreases when its speed increases.',
  r: 'Electrons carry a negative charge.',
  key: 'b',
  sol: 'A is true since λ = h/mv. R is also true, but charge is unrelated to the wavelength relation — option (b).',
  d: 2, c: 'understanding', t: [4],
}));
add('debroglie-short', short({
  marks: 2,
  stem: 'Write the de Broglie relation and explain each symbol. Why can we not observe the wave nature of a moving motorcycle?',
  model: r`$\lambda = \dfrac{h}{mv}$, where $\lambda$ is the wavelength of the matter wave, $h$ the Planck constant, $m$ the mass and $v$ the speed of the particle. For a motorcycle $m$ is very large, so $\lambda$ is extremely small (about $10^{-37}$ m) and cannot be detected.`,
  sol: 'λ = h/mv; large mass gives negligible wavelength.',
  scheme: [['Relation with symbols', 1], ['Large mass, undetectably small λ', 1]],
  d: 1, c: 'understanding', t: [4],
}));
add('uncertainty-short', short({
  marks: 2,
  stem: 'State Heisenberg’s uncertainty principle and write its mathematical form, explaining the symbols.',
  model: r`It is impossible to determine simultaneously and exactly both the position and the momentum of a moving microscopic particle such as an electron: $\Delta x \cdot \Delta p \geq \dfrac{h}{4\pi}$, where $\Delta x$ is the uncertainty in position, $\Delta p$ the uncertainty in momentum ($= m\,\Delta v$) and $h$ the Planck constant. The more exactly one is known, the less exactly the other can be.`,
  sol: 'Statement; Δx·Δp ≥ h/4π.',
  scheme: [['Statement', 1], ['Mathematical form with symbols', 1]],
  d: 1, c: 'recall', t: [4],
}));
add('de-electron-short3', (() => {
  const v = 4.0e6;
  const L = h / (me * v);
  return short({
    marks: 3,
    stem: r`An electron in a television tube moves at $4.0 \times 10^{6}\ \text{m s}^{-1}$. Calculate its de Broglie wavelength in pm, and say why its wave nature can be observed in crystals. ($h = 6.626 \times 10^{-34}\ \text{J s}$, $m_\text{e} = 9.11 \times 10^{-31}\ \text{kg}$)`,
    model: r`$\lambda = \dfrac{h}{m_\text{e}v} = \dfrac{6.626 \times 10^{-34}}{9.11 \times 10^{-31} \times 4.0 \times 10^{6}} = ${f2(L * 1e10)} \times 10^{-10}$ m $= ${Math.round(L * 1e12)}$ pm. This is of the order of the spacing between atoms in a crystal (about 100 to 300 pm), so a crystal can diffract the electron beam, as it diffracts X-rays.`,
    sol: r`$\lambda = ${f2(L * 1e10)} \times 10^{-10}$ m $= ${Math.round(L * 1e12)}$ pm; comparable with atomic spacings.`,
    scheme: [['λ = h/mv', 1], ['182 pm', 1], ['Comparable with atomic spacing, so diffraction', 1]],
    d: 3, c: 'application', t: [4],
  });
})(), () => near(6.626e-34 / (9.11e-31 * 4.0e6) * 1e12, 181.8, 0.002) || 'de-electron');
add('dust-short3', (() => {
  const m = 1.0e-9;
  const dv = 1.0e-6;
  const dx = h / (4 * Math.PI * m * dv);
  return short({
    marks: 3,
    stem: r`A dust grain of mass $1.0 \times 10^{-9}\ \text{kg}$ drifts in a still room with its speed known to within $1.0 \times 10^{-6}\ \text{m s}^{-1}$. Calculate the minimum uncertainty in its position and say whether the uncertainty principle has any practical effect on the grain. ($h = 6.626 \times 10^{-34}\ \text{J s}$)`,
    model: r`$\Delta x = \dfrac{h}{4\pi m\,\Delta v} = \dfrac{6.626 \times 10^{-34}}{4 \times \pi \times 1.0 \times 10^{-9} \times 1.0 \times 10^{-6}} = ${f2(dx / 1e-20)} \times 10^{-20}$ m. This is about $10^{-10}$ times the size of an atom, so it is utterly negligible: the principle has no practical effect on a particle of this size.`,
    sol: r`$\Delta x = ${f2(dx / 1e-20)} \times 10^{-20}$ m; negligible.`,
    scheme: [['Δx = h/(4π m Δv)', 1], ['5.27 × 10⁻²⁰ m', 1], ['Negligible for large objects', 1]],
    d: 3, c: 'application', t: [4],
  });
})(), () => near(6.626e-34 / (4 * Math.PI * 1.0e-9 * 1.0e-6) / 1e-20, 5.273, 0.002) || 'dust');
add('debroglie-long', (() => {
  const Le = h / (me * 3.0e6);
  const Lb = h / (2.0e-3 * 400);
  return long({
    stem: r`(a) State de Broglie's relation, naming each quantity, and say what it implies for a moving particle. [2]

(b) Calculate the de Broglie wavelength of (i) an electron moving at $3.0 \times 10^{6}\ \text{m s}^{-1}$ and (ii) a bullet of mass $2.0\ \text{g}$ moving at $400\ \text{m s}^{-1}$, and comment on the two results. ($h = 6.626 \times 10^{-34}\ \text{J s}$, $m_\text{e} = 9.11 \times 10^{-31}\ \text{kg}$) [3]`,
    model: r`(a) $\lambda = h/mv$, where $\lambda$ is the wavelength, $h$ the Planck constant, $m$ the mass and $v$ the speed. Every moving particle has an associated matter wave, and its wavelength is inversely proportional to its momentum.

(b) (i) $\lambda = \dfrac{6.626 \times 10^{-34}}{9.11 \times 10^{-31} \times 3.0 \times 10^{6}} = ${f2(Le * 1e10)} \times 10^{-10}$ m. (ii) $\lambda = \dfrac{6.626 \times 10^{-34}}{2.0 \times 10^{-3} \times 400} = ${f2(Lb / 1e-34)} \times 10^{-34}$ m. The electron's wavelength is comparable with atomic dimensions and is detectable; the bullet's is far too small to detect.`,
    sol: r`Relation; electron $${f2(Le * 1e10)} \times 10^{-10}$ m; bullet $${f2(Lb / 1e-34)} \times 10^{-34}$ m.`,
    scheme: [['(a) Relation and symbols', 1], ['(a) Implication: matter waves', 1], ['(b)(i) Electron wavelength', 1], ['(b)(ii) Bullet wavelength', 1], ['(b) Comment', 1]],
    d: 3, c: 'application', t: [4],
  });
})(), () => near(6.626e-34 / (9.11e-31 * 3.0e6) * 1e10, 2.424, 0.002) && near(6.626e-34 / (2.0e-3 * 400) / 1e-34, 8.28, 0.002) || 'debroglie-long');
add('uncertainty-long', (() => {
  const dv = 1.0e5;
  const dx = h / (4 * Math.PI * me * dv);
  return long({
    stem: r`(a) State Heisenberg's uncertainty principle and write its mathematical form. [2]

(b) The speed of an electron in a beam is known to within $1.0 \times 10^{5}\ \text{m s}^{-1}$. Calculate the minimum uncertainty in its position and comment on its size compared with an atom of diameter about $2 \times 10^{-10}$ m. ($h = 6.626 \times 10^{-34}\ \text{J s}$, $m_\text{e} = 9.11 \times 10^{-31}\ \text{kg}$) [3]`,
    model: r`(a) It is impossible to know exactly and simultaneously both the position and the momentum of a microscopic particle: $\Delta x \cdot \Delta p \geq h/4\pi$.

(b) $\Delta x = \dfrac{h}{4\pi m_\text{e}\,\Delta v} = \dfrac{6.626 \times 10^{-34}}{4 \times \pi \times 9.11 \times 10^{-31} \times 1.0 \times 10^{5}} = ${f2(dx / 1e-10)} \times 10^{-10}$ m. This is about three times the diameter of an atom, so an electron whose speed is known this well cannot be said to be at any definite place inside the atom.`,
    sol: r`Statement and form; $\Delta x = ${f2(dx / 1e-10)} \times 10^{-10}$ m, larger than an atom.`,
    scheme: [['(a) Statement', 1], ['(a) Δx·Δp ≥ h/4π', 1], ['(b) Substitution in Δx = h/(4π m Δv)', 1], ['(b) 5.79 × 10⁻¹⁰ m', 1], ['(b) Comment on atomic size', 1]],
    d: 4, c: 'analysis', t: [4],
  });
})(), () => near(6.626e-34 / (4 * Math.PI * 9.11e-31 * 1.0e5) / 1e-10, 5.787, 0.002) || 'uncertainty-long');
