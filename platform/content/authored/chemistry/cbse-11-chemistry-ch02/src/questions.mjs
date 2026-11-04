// ch02 Structure of Atom — question bank. MCQ keys are placed by the builder (balanced); AR keys planned: a b c d a c.
// Every numerical is computed here, interpolated into stem and solution, and re-solved by the check passed to add().
import { mk, add, r, near } from './lib.mjs';

const { mcq, ar, tf, fill, match, num, short, long, part } = mk;
const h = 6.626e-34;
const c = 3.0e8;
const NA = 6.022e23;
const me = 9.11e-31;
const f2 = (x) => Number(x.toPrecision(3));

// ---------------------------------------------------------------- t01 particles and models
add('models-chk', mcq({
  stem: 'In Rutherford’s gold-foil experiment, the rebound of a very few alpha particles showed that:',
  right: 'the positive charge and most of the mass of the atom are concentrated in a tiny nucleus',
  wrong: ['electrons are embedded uniformly in a positive sphere', 'electrons move in fixed circular orbits of definite energy', 'the atom is completely hollow with no positive charge'],
  sol: 'A particle can only be turned back by a very small, dense, positively charged centre — option (@K). A uniform positive sphere (@1) would deflect alpha particles only slightly.',
  d: 2, c: 'understanding', t: [1],
}));
add('neutron-mcq', mcq({
  stem: r`The numbers of electrons, protons and neutrons in $^{35}\text{Cl}^{-}$ (Z = 17) are, respectively:`,
  right: '18, 17, 18',
  wrong: ['17, 17, 18', '18, 17, 35', '17, 18, 17'],
  sol: 'Protons = Z = 17; neutrons = 35 − 17 = 18; the chloride ion has one extra electron, 17 + 1 = 18 — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('isobar-mcq', mcq({
  stem: r`The species $^{40}\text{Ar}$, $^{40}\text{K}$ and $^{40}\text{Ca}$ (atomic numbers 18, 19 and 20) are:`,
  right: 'isobars',
  wrong: ['isotopes', 'isotones', 'isoelectronic atoms'],
  sol: 'They share the same mass number (40) but have different atomic numbers, so they are isobars — option (@K). Isotopes (@1) would share the atomic number.',
  d: 1, c: 'understanding', t: [1],
}));
add('rutherford-ar', ar({
  a: 'Most alpha particles passed through the gold foil without deflection.',
  r: 'Most of the volume of an atom is empty space.',
  key: 'a',
  sol: 'Both are true. Because the nucleus is tiny, most alpha particles never come close to one and go straight through; R explains A — option (a).',
  d: 1, c: 'understanding', t: [1],
}));
add('thomson-tf', tf({
  stem: 'Thomson’s plum-pudding model could explain the large-angle scattering of alpha particles.',
  key: 'f',
  sol: 'False. A uniformly spread positive charge would deflect alpha particles only slightly; the large-angle scattering needed a concentrated nucleus (Rutherford).',
  d: 1, c: 'understanding', t: [1],
}));
add('scientist-match', match({
  stem: 'Match each scientist with the contribution to atomic structure.',
  pairs: [
    ['Thomson', 'Measured the charge-to-mass ratio of the electron'],
    ['Rutherford', 'Proposed a small, dense, positively charged nucleus'],
    ['Bohr', 'Proposed quantised stationary orbits for hydrogen'],
    ['de Broglie', 'Proposed that moving particles have a wavelength'],
  ],
  order: [3, 0, 2, 1],
  sol: 'Thomson: e/m of the electron; Rutherford: the nucleus; Bohr: stationary orbits; de Broglie: matter waves.',
  d: 1, c: 'recall', t: [1, 2, 3],
}));
add('thomson-short', short({
  marks: 2,
  stem: 'State one observation of Rutherford’s experiment that Thomson’s model could not explain, and say what feature of Rutherford’s model accounts for it.',
  model: 'Thomson’s model could not explain why a very few alpha particles were deflected through large angles or rebounded. Rutherford’s model places all the positive charge and nearly all the mass in a tiny nucleus, which can strongly repel a fast alpha particle that passes very close to it.',
  sol: 'Large-angle scattering needs a concentrated positive nucleus.',
  scheme: [['Large-angle deflection or rebound named', 1], ['Explained by a small dense positive nucleus', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('rutherford-short3', short({
  marks: 3,
  stem: 'Describe the observations of the alpha-particle scattering experiment on a thin gold foil and state three conclusions drawn from them.',
  model: 'Most alpha particles passed straight through the foil, a few were deflected through small or large angles, and very few rebounded almost along their original path. Conclusions: the atom is mostly empty space; the positive charge is concentrated in a tiny region; this nucleus is very dense and holds nearly all the mass, with electrons moving around it.',
  sol: 'Three observations paired with three conclusions.',
  scheme: [['Three observations', 1], ['Mostly empty space', 0.5], ['Concentrated positive charge', 1], ['Dense massive nucleus', 0.5]],
  d: 2, c: 'understanding', t: [1],
}));

// ---------------------------------------------------------------- t02 radiation, photoelectric effect, Bohr model
add('photon-chk', mcq({
  stem: 'Which of these photons has the greatest energy?',
  right: 'Violet light of wavelength 410 nm',
  wrong: ['Red light of wavelength 700 nm', 'Green light of wavelength 520 nm', 'Yellow light of wavelength 580 nm'],
  sol: r`$E = hc/\lambda$, so the photon of shortest wavelength has the greatest energy — violet, 410 nm, option (@K).`,
  d: 1, c: 'application', t: [2],
}));
add('bohr-chk', mcq({
  stem: 'When the electron of a hydrogen atom falls from n = 3 to n = 2, the line emitted belongs to the:',
  right: 'Balmer series, in the visible region',
  wrong: ['Lyman series, in the ultraviolet region', 'Paschen series, in the infrared region', 'Balmer series, in the ultraviolet region'],
  sol: 'The series is named by the level the electron lands on: n = 2 is the Balmer series, whose first lines lie in the visible region — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('energy-ratio-mcq', mcq({
  stem: 'The ratio of the energies of photons of wavelength 300 nm and 600 nm is:',
  right: '2 : 1',
  wrong: ['1 : 2', '4 : 1', '1 : 4'],
  sol: r`$E \propto 1/\lambda$, so $E_{300} : E_{600} = 600 : 300 = 2 : 1$ — option (@K).`,
  d: 2, c: 'application', t: [2],
}), () => near(600 / 300, 2, 1e-9) || 'ratio');
add('wavenumber-mcq', mcq({
  stem: 'The wavenumber of light of wavelength 500 nm is:',
  right: r`$2.0 \times 10^{6}\ \text{m}^{-1}$`,
  wrong: [r`$5.0 \times 10^{-7}\ \text{m}^{-1}$`, r`$2.0 \times 10^{9}\ \text{m}^{-1}$`, r`$6.0 \times 10^{14}\ \text{m}^{-1}$`],
  sol: r`$\bar{\nu} = 1/\lambda = 1 / (5.0 \times 10^{-7}) = 2.0 \times 10^{6}$, in m⁻¹ — option (@K). (@1) is the wavelength itself and (@3) is the frequency in Hz.`,
  d: 2, c: 'application', t: [2],
}), () => near(1 / 500e-9, 2.0e6, 1e-9) || 'wavenumber');
add('em-order-mcq', mcq({
  stem: 'Which arrangement lists radiations in order of increasing energy per photon?',
  right: 'radio waves < microwaves < visible light < X-rays',
  wrong: ['X-rays < visible light < microwaves < radio waves', 'microwaves < radio waves < X-rays < visible light', 'visible light < radio waves < X-rays < microwaves'],
  sol: 'Energy rises with frequency: radio waves have the lowest frequency, then microwaves, visible light and X-rays — option (@K).',
  d: 1, c: 'understanding', t: [2],
}));
add('photoel-mcq', mcq({
  stem: 'Light of frequency below the threshold frequency of a metal is made much more intense. As a result:',
  right: 'no photoelectrons are emitted',
  wrong: ['electrons are emitted with greater kinetic energy', 'more electrons are emitted, each with the same kinetic energy as before', 'electrons are emitted after a delay'],
  sol: 'Each photon is too weak to free an electron, and electrons do not pool energy from several photons, so no emission occurs however intense the light — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('bohr-radius-mcq', mcq({
  stem: 'The radius of the second Bohr orbit of hydrogen is (take $r_n = 52.9\\,n^2$ pm):',
  right: '212 pm',
  wrong: ['106 pm', '52.9 pm', '476 pm'],
  sol: r`$r_2 = 52.9 \times 2^2 = 212$ pm — option (@K). (@3) is the radius for n = 3.`,
  d: 1, c: 'application', t: [2],
}), () => near(52.9 * 4, 211.6, 1e-3) || 'radius');
add('bohr-ratio-mcq', mcq({
  stem: 'For the hydrogen atom, the ratio $E_3 : E_2$ of the energies of the third and second Bohr levels is:',
  right: '4 : 9',
  wrong: ['9 : 4', '2 : 3', '3 : 2'],
  sol: r`$E_n \propto 1/n^2$, so $E_3 : E_2 = 1/9 : 1/4 = 4 : 9$ — option (@K).`,
  d: 3, c: 'application', t: [2],
}), () => near((1 / 9) / (1 / 4), 4 / 9, 1e-9) || 'ratio');
add('lines-mcq', mcq({
  stem: 'A sample of excited hydrogen atoms has electrons in n = 4. The maximum number of different spectral lines that can be emitted as they fall to lower levels is:',
  right: '6',
  wrong: ['3', '4', '10'],
  sol: r`Number of lines $= n(n - 1)/2 = 4 \times 3 / 2 = 6$ (4→3, 4→2, 4→1, 3→2, 3→1, 2→1) — option (@K).`,
  d: 3, c: 'application', t: [2],
}), () => (4 * 3) / 2 === 6 || 'lines');
add('quantum-ar', ar({
  a: 'The line spectrum of hydrogen consists of discrete lines rather than a continuous band.',
  r: 'A hydrogen atom contains only one electron.',
  key: 'b',
  sol: 'A is true, and R is true, but R is not the reason: lines are discrete because the electron has only certain allowed (quantised) energies, so photons emitted have only certain energies — option (b).',
  d: 2, c: 'understanding', t: [2],
}));
add('photo-tf', tf({
  stem: 'Doubling the intensity of light whose frequency is above the threshold frequency doubles the maximum kinetic energy of the photoelectrons.',
  key: 'f',
  sol: 'False. Doubling the intensity doubles the number of photons and hence the number of photoelectrons; the maximum kinetic energy depends only on frequency.',
  d: 2, c: 'understanding', t: [2],
}));
add('balmer-fill', fill({
  stem: 'The series of lines in the hydrogen spectrum that lies in the visible region is the ___ series.',
  acc: [['Balmer']],
  sol: 'The **Balmer** series (transitions to n = 2) lies in the visible region.',
  d: 1, c: 'recall', t: [2],
}));
add('fm-num', (() => {
  const nu = 98.4e6;
  const lam = c / nu;
  return num({
    stem: r`An FM radio station broadcasts at a frequency of $98.4\ \text{MHz}$. Calculate the wavelength of the radio waves in metres. ($c = 3.0 \times 10^{8}\ \text{m s}^{-1}$)`,
    value: f2(lam), tol: 0.01, unit: 'm',
    sol: r`$\lambda = \dfrac{c}{\nu} = \dfrac{3.0 \times 10^{8}}{9.84 \times 10^{7}} = ${lam.toFixed(2)}$ m, using $98.4\ \text{MHz} = 9.84 \times 10^{7}$ Hz.`,
    scheme: [['Converts MHz to Hz', 0.5], ['Uses λ = c/ν: 3.05 m', 0.5]],
    marks: 1, d: 1, c: 'application', t: [2],
  });
})(), (q) => near(3.0e8 / 98.4e6, 3.049, 0.002) && q.answer.value === 3.05 || 'fm');
add('photon-mol-num', (() => {
  const lam = 450e-9;
  const E = (h * c) / lam;
  const kJ = (E * NA) / 1000;
  return num({
    stem: r`Calculate the energy, in kJ, carried by one mole of photons of blue light of wavelength $450\ \text{nm}$. ($h = 6.626 \times 10^{-34}\ \text{J s}$, $c = 3.0 \times 10^{8}\ \text{m s}^{-1}$, $N_\text{A} = 6.022 \times 10^{23}\ \text{mol}^{-1}$)`,
    value: Math.round(kJ), tol: 1, unit: 'kJ mol⁻¹',
    sol: r`One photon: $E = \dfrac{hc}{\lambda} = \dfrac{6.626 \times 10^{-34} \times 3.0 \times 10^{8}}{4.50 \times 10^{-7}} = ${(E * 1e19).toFixed(2)} \times 10^{-19}$ J. One mole: $${(E * 1e19).toFixed(2)} \times 10^{-19} \times 6.022 \times 10^{23} = ${(E * NA / 1e5).toFixed(2)} \times 10^{5}$ J, and dividing by 1000: $${(E * NA / 1e5).toFixed(2)} \times 10^{5} / 1000 = ${Math.round(kJ)}$ kJ.`,
    scheme: [['Photon energy hc/λ', 1], ['Multiplies by N_A', 1], ['Converts to kJ: 266 kJ per mole', 1]],
    marks: 3, d: 3, c: 'application', t: [2],
  });
})(), (q) => near((h * c / 450e-9) * NA / 1000, 266, 0.005) && q.answer.value === 266 || 'photon mol');
add('pe-num', (() => {
  const nu0 = 4.8e14, nu = 7.2e14;
  const KE = h * (nu - nu0);
  const s = (KE * 1e19).toFixed(2);
  return num({
    stem: r`Light of frequency $7.2 \times 10^{14}\ \text{Hz}$ falls on a metal surface whose threshold frequency is $4.8 \times 10^{14}\ \text{Hz}$. Calculate the maximum kinetic energy of the ejected electrons, in units of $10^{-19}\ \text{J}$. ($h = 6.626 \times 10^{-34}\ \text{J s}$)`,
    value: Number(s), tol: 0.01, unit: '× 10⁻¹⁹ J',
    sol: r`$\text{KE} = h(\nu - \nu_0) = 6.626 \times 10^{-34} \times (7.2 - 4.8) \times 10^{14} = ${s} \times 10^{-19}$ J, so in units of $10^{-19}$ J: $${s} \times 10^{-19} / 10^{-19} = ${s}$.`,
    scheme: [['Difference of frequencies', 1], ['Multiplies by h: 1.59 × 10⁻¹⁹ J', 1]],
    marks: 2, d: 2, c: 'application', t: [2],
  });
})(), (q) => near(h * 2.4e14 * 1e19, 1.59, 0.002) && q.answer.value === 1.59 || 'pe');
add('bohr-num', (() => {
  const dE = 2.18e-18 * (1 / 4 - 1 / 16);
  const lam = ((h * c) / dE) * 1e9;
  return num({
    stem: r`Calculate the wavelength, in nm, of the line emitted when the electron in a hydrogen atom falls from $n = 4$ to $n = 2$. ($E_n = -2.18 \times 10^{-18}/n^2$ J, $h = 6.626 \times 10^{-34}\ \text{J s}$, $c = 3.0 \times 10^{8}\ \text{m s}^{-1}$)`,
    value: Math.round(lam), tol: 1, unit: 'nm',
    sol: r`$\Delta E = 2.18 \times 10^{-18}\,(1/4 - 1/16) = ${(dE * 1e19).toFixed(3)} \times 10^{-19}$ J. $\lambda = \dfrac{hc}{\Delta E} = \dfrac{6.626 \times 10^{-34} \times 3.0 \times 10^{8}}{${(dE * 1e19).toFixed(3)} \times 10^{-19}} \approx ${lam.toFixed(0)} \times 10^{-9}$ m $= ${lam.toFixed(0)}$ nm (blue-green, Balmer).`,
    scheme: [['Energy difference between the levels', 1], ['λ = hc/ΔE', 1], ['486 nm', 1]],
    marks: 3, d: 3, c: 'application', t: [2],
  });
})(), (q) => near((h * c / (2.18e-18 * 0.1875)) * 1e9, 486.3, 0.002) && q.answer.value === 486 || 'bohr');
add('heplus-num', (() => {
  const Z = 2, n = 2;
  const rad = (52.9 * n * n) / Z;
  return num({
    stem: r`The radius of the $n$th Bohr orbit of a hydrogen-like ion of atomic number $Z$ is $r_n = 52.9\,n^2/Z$ pm. Calculate the radius of the second orbit of $\ce{He+}$, in pm.`,
    value: Math.round(rad), tol: 1, unit: 'pm',
    sol: r`$r_2 = 52.9 \times 2^2 / 2 = ${rad.toFixed(1)}$ pm $\approx ${Math.round(rad)}$ pm, half the radius of the second orbit of hydrogen (212 pm) because the nuclear charge is doubled.`,
    scheme: [['Substitutes n = 2, Z = 2', 1], ['106 pm', 1]],
    marks: 2, d: 2, c: 'application', t: [2],
  });
})(), (q) => near(52.9 * 4 / 2, 105.8, 1e-6) && q.answer.value === 106 || 'He+');
add('laser-num', (() => {
  const P = 3.0e-3, lam = 632.8e-9;
  const E = (h * c) / lam;
  const nphot = P / E;
  const s = (nphot / 1e15).toFixed(2);
  return num({
    stem: r`A helium-neon laser of power $3.0\ \text{mW}$ emits light of wavelength $632.8\ \text{nm}$. Calculate the number of photons emitted per second, in units of $10^{15}$. ($h = 6.626 \times 10^{-34}\ \text{J s}$, $c = 3.0 \times 10^{8}\ \text{m s}^{-1}$; $1\ \text{W} = 1\ \text{J s}^{-1}$)`,
    value: Number(s), tol: 0.05, unit: '× 10¹⁵ photons s⁻¹',
    sol: r`Energy of one photon: $E = \dfrac{hc}{\lambda} = \dfrac{6.626 \times 10^{-34} \times 3.0 \times 10^{8}}{6.328 \times 10^{-7}} = ${(E * 1e19).toFixed(2)} \times 10^{-19}$ J. Power $= 3.0 \times 10^{-3}$ J s⁻¹, so photons per second $= \dfrac{3.0 \times 10^{-3}}{${(E * 1e19).toFixed(2)} \times 10^{-19}} = ${(nphot / 1e15).toFixed(2)} \times 10^{15}$; in units of $10^{15}$: $${(nphot / 1e15).toFixed(2)} \times 10^{15} / 10^{15} = ${s}$.`,
    scheme: [['Photon energy', 1], ['Power ÷ photon energy', 1], ['9.55 × 10¹⁵ per second', 1]],
    marks: 3, d: 3, c: 'application', t: [2],
  });
})(), (q) => near(3.0e-3 / (h * c / 632.8e-9) / 1e15, 9.55, 0.003) && q.answer.value === 9.55 || 'laser');
add('photo-short', short({
  marks: 2,
  stem: 'A metal emits no photoelectrons when exposed to a very intense beam of red light, but emits electrons immediately with a weak beam of ultraviolet light. Explain.',
  model: 'Each electron absorbs a single photon, and a photon of red light has less energy than the work function of the metal, so no electron is freed however many photons arrive. Ultraviolet photons have a higher frequency and carry more than the threshold energy, so each one can eject an electron at once.',
  sol: 'Photon energy depends on frequency; threshold frequency decides emission.',
  scheme: [['Red photons are below the threshold energy', 1], ['Ultraviolet photons exceed it, so emission is immediate', 1]],
  d: 3, c: 'application', t: [2],
}));
add('spectra-short', short({
  marks: 2,
  stem: 'Why does the emission spectrum of atomic hydrogen consist of separate lines instead of a continuous band of colours?',
  model: 'In Bohr’s model the electron can occupy only certain allowed energy levels. When it falls from a higher level to a lower one it emits a photon whose energy equals the difference between the two levels. Only particular energy differences exist, so only particular wavelengths appear as lines.',
  sol: 'Quantised levels give fixed energy differences.',
  scheme: [['Only certain energy levels are allowed', 1], ['Photon energy equals the level difference: discrete wavelengths', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('bohr-limit-short', short({
  marks: 2,
  stem: 'State two limitations of Bohr’s model of the atom.',
  model: 'Bohr’s model cannot explain the spectra of atoms with more than one electron, nor the splitting of spectral lines in a magnetic or electric field. It also treats the electron only as a particle moving in an exact orbit, ignoring its wave nature and violating the uncertainty principle.',
  sol: 'Any two of: many-electron atoms, line splitting, wave nature, uncertainty principle.',
  scheme: [['First limitation', 1], ['Second limitation', 1]],
  d: 2, c: 'recall', t: [2, 3],
}));
add('bohr-long', long({
  stem: '(a) State the postulates of Bohr’s model of the hydrogen atom.\n\n(b) Using $E_n = -2.18 \\times 10^{-18}/n^2$ J, calculate the energy released and the wavelength of the photon when the electron falls from n = 3 to n = 1 ($h = 6.626 \\times 10^{-34}$ J s, $c = 3.0 \\times 10^{8}$ m s⁻¹).\n\n(c) Name the series to which this line belongs and the region of the spectrum.',
  model: r`Bohr’s postulates: the electron moves in fixed circular stationary orbits without radiating; each orbit has a definite energy and angular momentum $m_\text{e}vr = nh/2\pi$; energy is emitted or absorbed only when the electron jumps between orbits, $\Delta E = h\nu$. (b) The energy released is the difference between the two levels: $\Delta E = 2.18 \times 10^{-18}\,(1/1 - 1/9) = 1.94 \times 10^{-18}$ J. The wavelength follows from $\lambda = \dfrac{hc}{\Delta E} = \dfrac{6.626 \times 10^{-34} \times 3.0 \times 10^{8}}{1.94 \times 10^{-18}} \approx 1.02 \times 10^{-7}$ m, that is 102 nm. (c) The electron lands on n = 1, so this is a line of the Lyman series, which lies in the ultraviolet region of the spectrum.`,
  sol: 'Three postulates; ΔE for 3→1; λ = hc/ΔE; Lyman, ultraviolet.',
  scheme: [['(a) Three postulates', 1.5], ['(b) ΔE = 1.94 × 10⁻¹⁸ J and λ = 102 nm', 2.5], ['(c) Lyman series, ultraviolet', 1]],
  d: 3, c: 'application', t: [2],
}), () => near(2.18e-18 * (1 - 1 / 9), 1.938e-18, 0.002) && near(h * c / (2.18e-18 * (8 / 9)) * 1e9, 102.6, 0.003) || 'bohr 3-1');
add('photo-long', long({
  stem: '(a) State the observations of the photoelectric effect that cannot be explained by the wave theory of light.\n\n(b) Write Einstein’s photoelectric equation and explain each term.\n\n(c) The threshold wavelength of a metal is 540 nm. Calculate its threshold frequency and state whether light of wavelength 450 nm will eject electrons from it. ($c = 3.0 \\times 10^{8}$ m s⁻¹)',
  model: r`Observations: no electrons are emitted below a threshold frequency however intense the light; the kinetic energy of the electrons depends on frequency, not on intensity; emission is immediate. Einstein: $h\nu = h\nu_0 + \tfrac{1}{2}m_\text{e}v^2$, where $h\nu$ is the photon energy, $h\nu_0$ the energy needed to free the electron (work function) and $\tfrac{1}{2}m_\text{e}v^2$ the kinetic energy of the ejected electron. (c) $\nu_0 = \dfrac{c}{\lambda_0} = \dfrac{3.0 \times 10^{8}}{5.40 \times 10^{-7}} \approx 5.6 \times 10^{14}$ Hz. For 450 nm, $\nu = \dfrac{3.0 \times 10^{8}}{4.50 \times 10^{-7}} \approx 6.7 \times 10^{14}$ Hz, which is greater than $\nu_0$, so electrons are ejected.`,
  sol: 'Three observations; equation with terms; ν₀ = c/λ₀ and comparison.',
  scheme: [['(a) Observations', 1.5], ['(b) Equation and terms', 1.5], ['(c) Threshold frequency and conclusion', 2]],
  d: 4, c: 'application', t: [2],
}), () => near(3.0e8 / 540e-9, 5.556e14, 0.001) && 3.0e8 / 450e-9 > 3.0e8 / 540e-9 || 'threshold');
add('spectrum-case', mk.case({
  passage: r`The hydrogen discharge tube shows four visible lines. Their wavelengths are measured as follows. ($R_\text{H} = 1.097 \times 10^{7}\ \text{m}^{-1}$)

| Line | Wavelength / nm |
|---|---|
| 1 | 656.3 |
| 2 | 486.1 |
| 3 | 434.0 |
| 4 | 410.2 |

All four lines arise from transitions that end on the same lower level.`,
  d: 3, c: 'analysis',
  children: [
    part('a', mcq({
      stem: 'These four lines belong to the:',
      right: 'Balmer series',
      wrong: ['Lyman series', 'Paschen series', 'Pfund series'],
      sol: 'Lines in the visible region (410 to 656 nm) that end on n = 2 form the Balmer series — option (@K). The Lyman series is ultraviolet and Paschen and Pfund are infrared.',
      d: 2, c: 'application', t: [2],
    })),
    part('b', short({
      marks: 1,
      stem: 'From which level does the electron fall to produce line 2 (486.1 nm)?',
      model: 'The electron falls from n = 4 to n = 2, which fits the Rydberg formula.',
      sol: r`$1/\lambda = 1.097 \times 10^{7}\,(1/4 - 1/16) = 2.057 \times 10^{6}$ m⁻¹, giving $\lambda = 486$ nm: n = 4.`,
      scheme: [['n = 4 to n = 2', 1]],
      d: 3, c: 'application', t: [2],
    })),
    part('c', short({
      marks: 2,
      stem: 'Calculate the shortest wavelength (the series limit) of this series.',
      model: r`The series limit corresponds to an electron falling from $n_2 = \infty$ to n = 2, which gives the shortest wavelength: $\bar{\nu} = R_\text{H}/4 = 1.097 \times 10^{7}/4 = 2.74 \times 10^{6}$ m⁻¹, so $\lambda = 1/\bar{\nu} = 3.65 \times 10^{-7}$ m, that is about 365 nm, which lies in the ultraviolet region.`,
      sol: 'Take n₂ = ∞ in the Rydberg formula.',
      scheme: [['Uses n₂ = ∞ with n₁ = 2', 1], ['λ ≈ 365 nm', 1]],
      d: 4, c: 'application', t: [2],
    }), [
      short({
        marks: 2, wl: null,
        stem: 'Explain why the lines get closer together as the wavelength decreases.',
        model: 'The energy levels of hydrogen crowd closer together as n increases, because the energy varies as one over n squared. The differences between the upper levels and n = 2 therefore change less and less, so successive lines lie closer and converge on the series limit.',
        sol: 'Energy levels converge as n increases.',
        scheme: [['Levels crowd together at high n', 1], ['Lines converge to the series limit', 1]],
        d: 3, c: 'analysis', t: [2],
      }),
    ]),
  ],
}), () => near(1e9 / (1.097e7 * (1 / 4 - 1 / 16)), 486.2, 0.002) && near(4e9 / 1.097e7, 364.6, 0.002) || 'balmer');
add('photocell-case', mk.case({
  passage: r`A photocell uses a metal plate whose threshold wavelength is $600\ \text{nm}$ (illustrative value). The plate is illuminated with violet light of wavelength $400\ \text{nm}$. ($h = 6.626 \times 10^{-34}\ \text{J s}$, $c = 3.0 \times 10^{8}\ \text{m s}^{-1}$)`,
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'What happens when the violet light falls on the plate?',
      right: 'Electrons are emitted, because the photon energy exceeds the threshold energy.',
      wrong: ['No electrons are emitted, because 400 nm is shorter than 600 nm.', 'Electrons are emitted only after the plate warms up.', 'Electrons are emitted only if the light is made more intense.'],
      sol: 'A shorter wavelength means a higher frequency and more energy per photon, above the threshold for 600 nm — option (@K).',
      d: 2, c: 'application', t: [2],
    })),
    part('b', short({
      marks: 1,
      stem: 'Calculate the threshold frequency of the metal.',
      model: r`The threshold frequency is $\nu_0 = \dfrac{c}{\lambda_0} = \dfrac{3.0 \times 10^{8}}{6.00 \times 10^{-7}} = 5.0 \times 10^{14}$ Hz.`,
      sol: 'Threshold frequency from the threshold wavelength.',
      scheme: [['5.0 × 10¹⁴ Hz', 1]],
      d: 2, c: 'application', t: [2],
    })),
    part('c', short({
      marks: 2,
      stem: 'Calculate the maximum kinetic energy of an ejected electron.',
      model: r`The energy of a violet photon is $hc/\lambda = 4.97 \times 10^{-19}$ J and the threshold energy is $hc/\lambda_0 = 3.31 \times 10^{-19}$ J. The maximum kinetic energy of an electron is the difference: $4.97 \times 10^{-19} - 3.31 \times 10^{-19} = 1.66 \times 10^{-19}$ J.`,
      sol: 'Photon energy minus threshold energy.',
      scheme: [['Photon and threshold energies', 1], ['KE = 1.66 × 10⁻¹⁹ J', 1]],
      d: 3, c: 'application', t: [2],
    }), [
      short({
        marks: 2, wl: null,
        stem: 'State what happens to the number and the maximum kinetic energy of the electrons if the intensity of the violet light is doubled, and if red light of 700 nm is used instead.',
        model: 'Doubling the intensity doubles the number of photons and so the number of electrons emitted per second, but the maximum kinetic energy is unchanged. Red light of 700 nm has a wavelength longer than the threshold, so its photons are too weak and no electrons are emitted.',
        sol: 'Intensity changes number; frequency changes kinetic energy.',
        scheme: [['Number doubles, kinetic energy unchanged', 1], ['No emission with 700 nm light', 1]],
        d: 3, c: 'analysis', t: [2],
      }),
    ]),
  ],
}), () => near(h * c * (1 / 400e-9 - 1 / 600e-9) * 1e19, 1.656, 0.002) || 'photocell');

// ---------------------------------------------------------------- t03 de Broglie and Heisenberg
add('dual-chk', mcq({
  stem: 'An electron and a proton move with the same speed. Which statement about their de Broglie wavelengths is correct?',
  right: 'The electron has the longer wavelength because its mass is smaller.',
  wrong: ['The proton has the longer wavelength because its mass is larger.', 'Both have the same wavelength because the speed is the same.', 'Neither has a wavelength because they are particles.'],
  sol: r`$\lambda = h/mv$: for equal speed, the smaller mass gives the larger wavelength; the electron is about 1800 times lighter — option (@K).`,
  d: 2, c: 'application', t: [3],
}));
add('uncertainty-mcq', mcq({
  stem: 'The uncertainty principle can be ignored for a moving cricket ball because:',
  right: 'the minimum uncertainty in its velocity is extremely small compared with its actual velocity',
  wrong: ['a ball has no wave nature at all', 'Planck’s constant is zero for large objects', 'a ball always moves at an exactly known speed'],
  sol: r`$\Delta v \ge h/(4\pi m \Delta x)$ is of the order $10^{-31}$ m s⁻¹ for a ball, utterly negligible — option (@K). (@1) is false: all matter has a wavelength, but it is unobservable for large objects.`,
  d: 3, c: 'analysis', t: [3],
}));
add('debroglie-mcq', mcq({
  stem: 'If the speed of a moving electron is doubled, its de Broglie wavelength:',
  right: 'is halved',
  wrong: ['is doubled', 'becomes four times larger', 'is unchanged'],
  sol: r`$\lambda = h/mv$, so $\lambda \propto 1/v$; doubling the speed halves the wavelength — option (@K).`,
  d: 1, c: 'understanding', t: [3],
}));
add('cricket-ar', ar({
  a: 'The de Broglie wavelength of a moving cricket ball cannot be detected.',
  r: 'A cricket ball has no wave nature.',
  key: 'c',
  sol: 'A is true: the wavelength is about 10⁻³⁴ m. R is false: all moving matter has a wavelength, but it is far too small to observe for a large object — option (c).',
  d: 2, c: 'understanding', t: [3],
}));
add('orbital-fill', fill({
  stem: 'The principle stating that the position and momentum of an electron cannot both be known exactly is the ___ uncertainty principle.',
  acc: [['Heisenberg', 'Heisenberg’s']],
  sol: 'This is the **Heisenberg** uncertainty principle.',
  d: 1, c: 'recall', t: [3],
}));
add('electron-lambda-num', (() => {
  const v = 2.0e6;
  const lam = h / (me * v);
  const pm = lam * 1e12;
  return num({
    stem: r`Calculate the de Broglie wavelength of an electron moving at $2.0 \times 10^{6}\ \text{m s}^{-1}$, in pm. ($m_\text{e} = 9.11 \times 10^{-31}\ \text{kg}$, $h = 6.626 \times 10^{-34}\ \text{J s}$)`,
    value: Math.round(pm), tol: 1, unit: 'pm',
    sol: r`$\lambda = h/(m_\text{e}v) = 6.626 \times 10^{-34} / (9.11 \times 10^{-31} \times 2.0 \times 10^{6}) = ${(lam * 1e10).toFixed(2)} \times 10^{-10}$ m $= ${Math.round(pm)}$ pm.`,
    scheme: [['Uses λ = h/mv with SI units', 1], ['364 pm', 1]],
    marks: 2, d: 2, c: 'application', t: [3],
  });
})(), (q) => near(h / (me * 2.0e6) * 1e12, 363.7, 0.002) && q.answer.value === 364 || 'electron');
add('ball-num', (() => {
  const lam = h / (0.16 * 40);
  const s = (lam * 1e34).toFixed(2);
  return num({
    stem: r`Calculate the de Broglie wavelength of a cricket ball of mass $0.16\ \text{kg}$ moving at $40\ \text{m s}^{-1}$, in units of $10^{-34}\ \text{m}$. ($h = 6.626 \times 10^{-34}\ \text{J s}$)`,
    value: Number(s), tol: 0.01, unit: '× 10⁻³⁴ m',
    sol: r`$\lambda = h/mv = 6.626 \times 10^{-34} / (0.16 \times 40) = ${s} \times 10^{-34}$ m, so in units of $10^{-34}$ m: $${s} \times 10^{-34} / 10^{-34} = ${s}$. This is far smaller than any atom or nucleus, so it cannot be observed.`,
    scheme: [['Uses λ = h/mv', 1], ['1.04 × 10⁻³⁴ m', 1]],
    marks: 2, d: 2, c: 'application', t: [3],
  });
})(), (q) => near(6.626e-34 / 6.4 * 1e34, 1.035, 0.002) && q.answer.value === 1.04 || 'ball');
add('uncertainty-num', (() => {
  const dx = 1.0e-10;
  const dv = h / (4 * Math.PI * me * dx);
  const s = (dv / 1e5).toFixed(2);
  return num({
    stem: r`The position of an electron is known to within $1.0 \times 10^{-10}\ \text{m}$. Calculate the minimum uncertainty in its speed, in units of $10^{5}\ \text{m s}^{-1}$. ($h = 6.626 \times 10^{-34}\ \text{J s}$, $m_\text{e} = 9.11 \times 10^{-31}\ \text{kg}$)`,
    value: Number(s), tol: 0.02, unit: '× 10⁵ m s⁻¹',
    sol: r`$\Delta v = h / (4\pi m \Delta x) = 6.626 \times 10^{-34} / (4 \times 3.142 \times 9.11 \times 10^{-31} \times 1.0 \times 10^{-10}) = ${s} \times 10^{5}$ m s⁻¹, so in units of $10^{5}$ m s⁻¹: $${s} \times 10^{5} / 10^{5} = ${s}$.`,
    scheme: [['Δv = h / 4πmΔx', 1], ['Substitution', 1], ['5.79 × 10⁵ m s⁻¹', 1]],
    marks: 3, d: 4, c: 'application', t: [3],
  });
})(), (q) => near(6.626e-34 / (4 * Math.PI * 9.11e-31 * 1e-10) / 1e5, 5.788, 0.002) && q.answer.value === 5.79 || 'dv');
add('dual-long', long({
  stem: '(a) State de Broglie’s relation and explain why the wave nature of matter is not observed for a cricket ball but is important for an electron.\n\n(b) State Heisenberg’s uncertainty principle and write its mathematical form.\n\n(c) Calculate the de Broglie wavelength of a proton moving at $3.0 \\times 10^{5}$ m s⁻¹ ($m_\\text{p} = 1.673 \\times 10^{-27}$ kg, $h = 6.626 \\times 10^{-34}$ J s).',
  model: r`de Broglie: a moving particle has wavelength $\lambda = h/mv$. For a cricket ball, the mass is large, so $\lambda$ is about $10^{-34}$ m, far too small to detect; for an electron the small mass gives a wavelength of the order of atomic dimensions, so wave behaviour is significant. Heisenberg: it is impossible to know exactly and simultaneously both the position and momentum of a microscopic particle, with $\Delta x\,\Delta p \ge h/4\pi$. (c) $\lambda = 6.626 \times 10^{-34} / (1.673 \times 10^{-27} \times 3.0 \times 10^{5}) = 1.32 \times 10^{-12}$ m, about 1.3 pm.`,
  sol: 'Relation and reasoning; uncertainty principle; λ of the proton.',
  scheme: [['(a) Relation and why ball differs from electron', 2], ['(b) Statement and Δx·Δp ≥ h/4π', 1.5], ['(c) λ = 1.32 × 10⁻¹² m', 1.5]],
  d: 3, c: 'application', t: [3],
}), () => near(6.626e-34 / (1.673e-27 * 3.0e5) * 1e12, 1.320, 0.003) || 'proton');
add('debroglie-short3', short({
  marks: 3,
  stem: 'State de Broglie’s relation. An electron and a proton move at the same speed. Find the ratio of their wavelengths and say which has the shorter wavelength. ($m_\\text{p}/m_\\text{e} \\approx 1836$)',
  model: r`de Broglie’s relation is $\lambda = h/mv$: a moving particle of mass $m$ and speed $v$ behaves as a wave of this wavelength. At equal speed $\lambda \propto 1/m$, so $\lambda_\text{e}/\lambda_\text{p} = m_\text{p}/m_\text{e} \approx 1836$. The electron has a wavelength about 1836 times longer, so the proton, being heavier, has the shorter wavelength.`,
  sol: 'λ inversely proportional to mass at fixed speed.',
  scheme: [['Relation', 1], ['Ratio 1836', 1], ['Proton shorter', 1]],
  d: 3, c: 'application', t: [3],
}), () => near(1836, 1836, 1e-9) || 'ratio');

// ---------------------------------------------------------------- t04 quantum numbers and orbitals
add('nodes-chk', mcq({
  stem: 'The number of radial nodes in a 3p orbital is:',
  right: '1',
  wrong: ['0', '2', '3'],
  sol: r`Radial nodes $= n - l - 1 = 3 - 1 - 1 = 1$ — option (@K). The orbital also has $l = 1$ angular node.`,
  d: 2, c: 'application', t: [4],
}), () => 3 - 1 - 1 === 1 || 'nodes');
add('qn-mcq', mcq({
  stem: 'Which of the following sets of quantum numbers (n, l, mₗ) is **not** allowed?',
  right: 'n = 2, l = 2, mₗ = 0',
  wrong: ['n = 3, l = 2, mₗ = −2', 'n = 4, l = 0, mₗ = 0', 'n = 2, l = 1, mₗ = +1'],
  sol: 'l can take values from 0 to n − 1. For n = 2 the maximum is l = 1, so l = 2 is not allowed — option (@K). The other sets obey l < n and |mₗ| ≤ l.',
  d: 2, c: 'application', t: [4],
}));
add('orbital-count-mcq', mcq({
  stem: 'The total number of orbitals in the shell with n = 3 is:',
  right: '9',
  wrong: ['3', '6', '18'],
  sol: r`Orbitals $= n^2 = 9$ (one 3s, three 3p and five 3d) — option (@K). (@3) is the number of electrons, $2n^2$.`,
  d: 1, c: 'application', t: [4],
}), () => 3 ** 2 === 9 || 'orbitals');
add('nodes-4s-mcq', mcq({
  stem: 'The 4s orbital has:',
  right: '3 radial nodes and no angular node',
  wrong: ['4 radial nodes and no angular node', '2 radial nodes and 1 angular node', 'no radial node and 3 angular nodes'],
  sol: r`For 4s, $l = 0$: radial nodes $= 4 - 0 - 1 = 3$ and angular nodes $= l = 0$ — option (@K).`,
  d: 3, c: 'application', t: [4],
}), () => 4 - 0 - 1 === 3 || 'nodes');
add('node-ar', ar({
  a: 'The 3s orbital has no radial node.',
  r: 'The number of radial nodes in an orbital is n − l − 1.',
  key: 'd',
  sol: 'A is false: for 3s, radial nodes = 3 − 0 − 1 = 2. R is true — option (d).',
  d: 3, c: 'analysis', t: [4],
}));
add('shell-tf', tf({
  stem: 'The three 2p orbitals of an isolated atom have different energies.',
  key: 'f',
  sol: 'False. The three 2p orbitals differ only in orientation, so they are degenerate (equal in energy) in an isolated atom.',
  d: 2, c: 'understanding', t: [4],
}));
add('subshell-fill', fill({
  stem: 'The subshell with azimuthal quantum number l = 2 is called the ___ subshell.',
  acc: [['d']],
  sol: 'l = 2 corresponds to the **d** subshell (s, p, d, f for 0, 1, 2, 3).',
  d: 1, c: 'recall', t: [4],
}));
add('qn-match', match({
  stem: 'Match each quantum number with the property it describes.',
  pairs: [
    ['Principal quantum number n', 'Size and energy of the shell'],
    ['Azimuthal quantum number l', 'Shape of the orbital'],
    ['Magnetic quantum number mₗ', 'Orientation of the orbital in space'],
    ['Spin quantum number mₛ', 'Direction of spin of the electron'],
  ],
  order: [1, 3, 0, 2],
  sol: 'n gives size and energy, l gives shape, mₗ gives orientation and mₛ gives spin.',
  d: 1, c: 'recall', t: [4],
}));
add('orbit-orbital-short', short({
  marks: 2,
  stem: 'Distinguish between an orbit in Bohr’s model and an orbital in the quantum mechanical model.',
  model: 'An orbit is a definite circular path at a fixed distance from the nucleus, along which Bohr pictured the electron moving. An orbital is a region of space around the nucleus where the probability of finding the electron is high; it has no definite path and holds at most two electrons.',
  sol: 'Path versus probability region.',
  scheme: [['Orbit: definite path', 1], ['Orbital: region of high probability', 1]],
  d: 2, c: 'understanding', t: [3, 4],
}));
add('qn-short', short({
  marks: 2,
  stem: 'For n = 4, list the possible values of l and give the number of orbitals in each subshell.',
  model: 'For n = 4, l can be 0, 1, 2 and 3. The subshells 4s, 4p, 4d and 4f therefore contain 1, 3, 5 and 7 orbitals, using 2l + 1 orbitals per subshell, giving 16 orbitals in all, which equals n squared.',
  sol: 'l from 0 to n − 1; 2l + 1 orbitals.',
  scheme: [['l = 0, 1, 2, 3', 1], ['1, 3, 5, 7 orbitals', 1]],
  d: 2, c: 'application', t: [4],
}));
add('qn-long', long({
  stem: '(a) Name the four quantum numbers and state the property of an electron each describes, with the allowed values.\n\n(b) Find the number of orbitals and the maximum number of electrons in the shell n = 3, and list the quantum numbers (n, l, mₗ) of the 3p orbitals.\n\n(c) Draw or describe the shapes of s and p orbitals and state the number of nodes in a 2s orbital.',
  model: r`n = 1, 2, 3 … gives the shell, size and energy; l = 0 to n − 1 gives the subshell and shape (s, p, d, f); mₗ = −l to +l gives the orientation; mₛ = +½ or −½ gives the spin. (b) For n = 3, l = 0, 1, 2 give $1 + 3 + 5 = 9$ orbitals and $2 \times 9 = 18$ electrons. The 3p orbitals have (3, 1, −1), (3, 1, 0) and (3, 1, +1). (c) An s orbital is spherical; a p orbital is a dumbbell with two lobes and a nodal plane through the nucleus. A 2s orbital has $2 - 0 - 1 = 1$ radial node and no angular node.`,
  sol: 'Four numbers with ranges; 9 orbitals, 18 electrons; shapes; one node for 2s.',
  scheme: [['(a) Four numbers with values', 2], ['(b) 9 orbitals, 18 electrons and 3p sets', 1.5], ['(c) Shapes and one node', 1.5]],
  d: 3, c: 'application', t: [4],
}), () => 1 + 3 + 5 === 9 && 2 - 0 - 1 === 1 || 'qn');
add('quantum-case', mk.case({
  passage: r`A student lists four sets of quantum numbers (n, l, mₗ, mₛ) for electrons in an atom.

| Set | n | l | mₗ | mₛ |
|---|---|---|---|---|
| A | 3 | 2 | −1 | +½ |
| B | 2 | 2 | 0 | +½ |
| C | 3 | 1 | 2 | −½ |
| D | 4 | 0 | 0 | 0 |`,
  d: 4, c: 'analysis',
  children: [
    part('a', mcq({
      stem: 'Which set is allowed?',
      right: 'Set A only',
      wrong: ['Set B only', 'Sets A and D', 'Sets B and C'],
      sol: 'Set B has l = n (l must be less than n); set C has mₗ = 2 outside −1 to +1; set D has mₛ = 0 (must be ±½). Only set A obeys all the rules — option (@K).',
      d: 3, c: 'application', t: [4],
    })),
    part('b', short({
      marks: 1,
      stem: 'Name the subshell described by set A.',
      model: 'It describes an electron in the 3d subshell.',
      sol: 'n = 3 and l = 2: 3d.',
      scheme: [['3d', 1]],
      d: 2, c: 'application', t: [4],
    })),
    part('c', short({
      marks: 2,
      stem: 'Give the reason why sets B and C are not permitted.',
      model: 'Set B is not permitted because l must lie between 0 and n − 1, so for n = 2 the value l = 2 cannot occur. Set C is not permitted because mₗ must lie between −l and +l, so for l = 1 the value mₗ = 2 is impossible.',
      sol: 'Violations of l < n and |mₗ| ≤ l.',
      scheme: [['Set B: l must be less than n', 1], ['Set C: mₗ must lie between −l and +l', 1]],
      d: 3, c: 'analysis', t: [4],
    }), [
      short({
        marks: 2, wl: null,
        stem: 'State the number of radial nodes and angular nodes of the orbital in set A.',
        model: 'For the 3d orbital, radial nodes are 3 − 2 − 1 = 0 and angular nodes equal l = 2, so it has no radial node and two angular nodes.',
        sol: 'Radial = n − l − 1; angular = l.',
        scheme: [['Radial nodes 0', 1], ['Angular nodes 2', 1]],
        d: 3, c: 'application', t: [4],
      }),
    ]),
  ],
}), null);

// ---------------------------------------------------------------- t05 electronic configuration
add('config-chk', mcq({
  stem: 'The ground-state electronic configuration of copper (Z = 29) is:',
  right: '[Ar] 3d¹⁰ 4s¹',
  wrong: ['[Ar] 3d⁹ 4s²', '[Ar] 3d¹⁰ 4s²', '[Ar] 3d⁸ 4s² 4p¹'],
  sol: 'Copper is an exception: a completely filled 3d subshell is extra stable, so one 4s electron moves to 3d, giving [Ar] 3d¹⁰ 4s¹ — option (@K). (@1) is the configuration expected from the simple filling order.',
  d: 2, c: 'understanding', t: [5],
}));
add('unpaired-mcq', mcq({
  stem: 'The number of unpaired electrons in the Fe³⁺ ion (Z = 26) is:',
  right: '5',
  wrong: ['4', '3', '0'],
  sol: r`Fe is $[\text{Ar}]\,3d^6 4s^2$. Fe³⁺ loses the two 4s electrons and one 3d electron: $[\text{Ar}]\,3d^5$, with one electron in each of the five 3d orbitals — 5 unpaired, option (@K). (@1) is the number for neutral Fe.`,
  d: 3, c: 'application', t: [5],
}));
add('aufbau-mcq', mcq({
  stem: 'According to the (n + l) rule, the correct order of increasing energy is:',
  right: '4s < 3d < 4p',
  wrong: ['3d < 4s < 4p', '4s < 4p < 3d', '3d < 4p < 4s'],
  sol: r`$(n + l)$: 4s = 4, 3d = 5, 4p = 5. 4s is lowest; 3d and 4p tie at 5, so the one with lower $n$ (3d) is lower — option (@K).`,
  d: 2, c: 'application', t: [5],
}));
add('cr-ar', ar({
  a: 'Chromium has the configuration [Ar] 3d⁵ 4s¹ rather than [Ar] 3d⁴ 4s².',
  r: 'A half-filled subshell has extra stability due to symmetrical distribution and greater exchange energy.',
  key: 'a',
  sol: 'Both are true. Moving one 4s electron to 3d gives a half-filled 3d subshell, which is extra stable for the stated reasons; R explains A — option (a).',
  d: 2, c: 'understanding', t: [5],
}));
add('pauli-ar', ar({
  a: 'Two electrons in the same orbital must have opposite spins.',
  r: 'Hund’s rule states that electrons pair up in an orbital before occupying other orbitals of the same subshell.',
  key: 'c',
  sol: 'A is true (Pauli exclusion principle). R is false: Hund’s rule says electrons occupy degenerate orbitals singly before pairing — option (c).',
  d: 2, c: 'understanding', t: [5],
}));
add('pauli-fill', fill({
  stem: 'The principle that no two electrons in an atom can have the same set of four quantum numbers is the ___ exclusion principle.',
  acc: [['Pauli', 'Pauli’s']],
  sol: 'This is the **Pauli** exclusion principle.',
  d: 1, c: 'recall', t: [5],
}));
add('pauli-short', short({
  marks: 2,
  stem: 'State Pauli’s exclusion principle and use it to show that the shell n = 2 can hold at most 8 electrons.',
  model: 'No two electrons in an atom can have the same four quantum numbers, so an orbital, which has fixed n, l and mₗ, can hold at most two electrons with opposite spins. The shell n = 2 has four orbitals (one 2s and three 2p), so it holds at most 2 × 4 = 8 electrons.',
  sol: 'Two per orbital times four orbitals.',
  scheme: [['Statement of the principle', 1], ['4 orbitals × 2 = 8 electrons', 1]],
  d: 2, c: 'application', t: [5],
}));
add('hund-short3', short({
  marks: 3,
  stem: 'State Hund’s rule. Draw the orbital box diagram for the 2p subshell of nitrogen and of oxygen and give the number of unpaired electrons in each.',
  model: 'Hund’s rule: in a subshell of degenerate orbitals, electrons occupy separate orbitals singly with parallel spins before any pairing occurs. Nitrogen has 2p³: three boxes each with one up arrow, so three unpaired electrons. Oxygen has 2p⁴: the first box holds an up and a down arrow and the other two boxes one up arrow each, so two unpaired electrons.',
  sol: 'Singly first; N has 3 unpaired, O has 2.',
  scheme: [['Rule stated', 1], ['Nitrogen: 3 unpaired', 1], ['Oxygen: 2 unpaired', 1]],
  d: 3, c: 'application', t: [5],
}));
add('chrcu-short3', short({
  marks: 3,
  stem: 'Write the ground-state configurations of chromium (Z = 24) and copper (Z = 29) and explain why they differ from the order predicted by the Aufbau principle.',
  model: r`Chromium is $[\text{Ar}]\,3d^5 4s^1$ and copper is $[\text{Ar}]\,3d^{10} 4s^1$, not $3d^4 4s^2$ and $3d^9 4s^2$. The 3d and 4s energies are close, so moving one 4s electron into 3d gives a half-filled (Cr) or completely filled (Cu) 3d subshell. These arrangements are extra stable because of their symmetry and the larger exchange energy.`,
  sol: 'Two configurations; half-filled and filled subshell stability.',
  scheme: [['Cr configuration', 0.5], ['Cu configuration', 0.5], ['Reason: symmetry and exchange energy', 2]],
  d: 3, c: 'understanding', t: [5],
}));
add('ion-config-short3', short({
  marks: 3,
  stem: 'Write the ground-state configurations of Fe, Fe²⁺ and Fe³⁺ and explain which electrons are lost first when iron forms cations.',
  model: r`Fe (Z = 26) is $[\text{Ar}]\,3d^6 4s^2$; Fe²⁺ is $[\text{Ar}]\,3d^6$ and Fe³⁺ is $[\text{Ar}]\,3d^5$. In forming cations the electrons of the outermost shell, those with the highest $n$, are lost first, so the two 4s electrons leave before any 3d electron. Fe³⁺ then has a half-filled, stable 3d subshell.`,
  sol: 'Highest-n electrons leave first.',
  scheme: [['Fe configuration', 0.5], ['Fe²⁺ and Fe³⁺', 1], ['4s electrons lost first, with reason', 1.5]],
  d: 3, c: 'application', t: [5],
}));
add('config-long', long({
  stem: '(a) State the Aufbau principle, Pauli’s exclusion principle and Hund’s rule.\n\n(b) Write the electronic configuration of sulfur (Z = 16) and of the sulfide ion, and give the number of unpaired electrons in sulfur.\n\n(c) Write the configurations of chromium and copper and explain why they are exceptions.',
  model: r`Aufbau: electrons fill orbitals in order of increasing energy, that is increasing $n + l$. Pauli: no two electrons in an atom have the same four quantum numbers, so an orbital holds at most two electrons of opposite spin. Hund: degenerate orbitals are filled singly with parallel spins before pairing. (b) S is $1s^2 2s^2 2p^6 3s^2 3p^4$; $\ce{S^2-}$ is $1s^2 2s^2 2p^6 3s^2 3p^6$. The 3p⁴ subshell has one pair and two single electrons, so sulfur has 2 unpaired electrons. (c) Cr is $[\text{Ar}]\,3d^5 4s^1$ and Cu is $[\text{Ar}]\,3d^{10} 4s^1$; half-filled and filled 3d subshells are extra stable because of symmetry and exchange energy.`,
  sol: 'Three rules; S and S²⁻; two unpaired; Cr and Cu.',
  scheme: [['(a) Three rules', 2], ['(b) Configurations and 2 unpaired', 1.5], ['(c) Cr, Cu and reason', 1.5]],
  d: 3, c: 'application', t: [5],
}));
add('config-case', mk.case({
  passage: r`A student writes the ground-state configurations of three atoms in a test.

| Atom | Student’s answer |
|---|---|
| Chromium (Z = 24) | [Ar] 3d⁴ 4s² |
| Copper (Z = 29) | [Ar] 3d⁹ 4s² |
| Nitrogen (Z = 7) | 1s² 2s² 2p³ with the 2p electrons drawn as one paired box, one single box and one empty box |`,
  d: 3, c: 'evaluation',
  children: [
    part('a', mcq({
      stem: 'How many of the student’s three answers are correct?',
      right: 'None of them',
      wrong: ['One of them', 'Two of them', 'All three'],
      sol: 'Chromium should be [Ar] 3d⁵ 4s¹, copper [Ar] 3d¹⁰ 4s¹, and the three 2p electrons of nitrogen must occupy three separate boxes (Hund’s rule). All three are wrong — option (@K).',
      d: 3, c: 'evaluation', t: [5],
    })),
    part('b', short({
      marks: 1,
      stem: 'Write the correct configuration of chromium.',
      model: r`The correct configuration of chromium is $[\text{Ar}]\,3d^5 4s^1$, with six unpaired electrons.`,
      sol: 'Half-filled 3d subshell.',
      scheme: [['[Ar] 3d⁵ 4s¹', 1]],
      d: 2, c: 'application', t: [5],
    })),
    part('c', short({
      marks: 2,
      stem: 'Explain why the student’s answer for copper is incorrect.',
      model: 'A completely filled 3d subshell is extra stable because of its symmetrical distribution of charge and large exchange energy. So one electron moves from 4s to 3d, and the true configuration of copper is [Ar] 3d¹⁰ 4s¹, not 3d⁹ 4s².',
      sol: 'Filled-subshell stability.',
      scheme: [['Filled 3d subshell is extra stable', 1], ['Correct configuration 3d¹⁰ 4s¹', 1]],
      d: 3, c: 'analysis', t: [5],
    }), [
      short({
        marks: 2, wl: null,
        stem: 'Write the configuration of the Cu⁺ ion and state its number of unpaired electrons.',
        model: r`Cu⁺ forms by losing the 4s electron, giving $[\text{Ar}]\,3d^{10}$, in which all the 3d electrons are paired, so it has no unpaired electrons.`,
        sol: 'Lose the 4s electron.',
        scheme: [['[Ar] 3d¹⁰', 1], ['0 unpaired electrons', 1]],
        d: 3, c: 'application', t: [5],
      }),
    ]),
  ],
}), null);
