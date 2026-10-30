// ch13 Nuclei — question bank. Binding energies are computed from atomic masses (mH = 1.007825 u, mn = 1.008665 u,
// 1 u = 931.5 MeV/c²) and re-checked by `check` functions. AR keys planned: a a a b c d.
import { mk, add, r, sci, dec, near } from '../../cbse-12-physics-ch01/src/lib.mjs';
import { U_MEV, MH, MN, MASS, BE, DM, U_KG, NA } from './decks.mjs';

const { mcq, ar, tf, fill, match, num, short, long, part } = mk;
const MEV = 1.6e-13;
const C2 = 9e16;

// ================================================================ t01 composition, size, nuclear force
add('range-mcq', mcq({
  stem: 'The range of the nuclear force between two nucleons is about',
  right: 'a few femtometres (10⁻¹⁵ m)',
  wrong: ['a few nanometres (10⁻⁹ m)', 'the size of an atom (10⁻¹⁰ m)', 'unlimited, like gravity'],
  sol: 'The nuclear force is strongly attractive near 1 fm and negligible beyond a few fm — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('terms-match', match({
  stem: 'Match each term in Column A with its meaning in Column B.',
  pairs: [['Isotopes', 'Same atomic number, different mass numbers'], ['Isobars', 'Same mass number, different atomic numbers'], ['Isotones', 'Same number of neutrons'], ['Nucleons', 'Protons and neutrons together']],
  order: [2, 0, 3, 1],
  sol: 'Isotopes → same Z (1 → r); isobars → same A (2 → p); isotones → same N (3 → s); nucleons → protons and neutrons (4 → q).',
  d: 1, c: 'recall', t: [1],
}));
add('neutrons-num', num({
  stem: 'How many neutrons are there in the nucleus of ²³⁸₉₂U?',
  value: 146, tol: 0.1, unit: '',
  sol: r`$N = A - Z = 238 - 92 = 146$.`,
  scheme: [['N = A − Z = 146', 1]],
  d: 1, c: 'understanding', t: [1],
}));
const rt = 1.2 * Math.cbrt(125);
add('radius-num', num({
  stem: 'Find the radius of a nucleus of mass number 125, in fm. (R₀ = 1.2 fm.)',
  value: Number(dec(rt, 2)), tol: 0.05, unit: 'fm',
  sol: r`$R = R_0A^{1/3} = 1.2 \times 125^{1/3} = 1.2 \times 5 = ${dec(rt, 2)}$ fm.`,
  scheme: [['R = 1.2 × 5 = 6.0 fm', 1]],
  d: 1, c: 'understanding', t: [1],
}), (q) => near(rt, 6) && near(q.answer.value, 6) || 'rt');
const rr = Math.cbrt(216 / 27);
add('rratio-num', num({
  stem: 'Find the ratio of the radius of a nucleus of mass number 216 to that of a nucleus of mass number 27.',
  value: rr, tol: 0.02, unit: '',
  sol: r`$\dfrac{R_1}{R_2} = \left(\dfrac{A_1}{A_2}\right)^{1/3} = \left(\dfrac{216}{27}\right)^{1/3} = 8^{1/3} = ${dec(rr, 2)}$.`,
  scheme: [['R ∝ A^(1/3)', 1], ['Ratio = 2', 1]],
  marks: 2, d: 2, c: 'application', t: [1],
}), (q) => near(rr, 2) && near(q.answer.value, 2) || 'rr');
add('density-mcq', mcq({
  stem: 'How does the density of nuclear matter depend on the mass number A?',
  right: 'It is practically independent of A',
  wrong: ['It is proportional to A', 'It is proportional to A^(1/3)', 'It is inversely proportional to A'],
  sol: 'Mass ∝ A and volume ∝ R³ ∝ A, so their ratio does not depend on A — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
const dn = U_KG / ((4 / 3) * Math.PI * (1.1e-15) ** 3);
add('density-num', num({
  stem: 'Taking R₀ = 1.1 fm and the mass of a nucleon as 1.66 × 10⁻²⁷ kg, estimate the density of nuclear matter, in units of 10¹⁷ kg m⁻³ (3 significant figures).',
  value: Number(dec(dn / 1e17, 3)), tol: 0.05, unit: '× 10¹⁷ kg m⁻³',
  sol: r`$\rho = \dfrac{A m}{\tfrac{4}{3}\pi R_0^3 A} = \dfrac{1.66 \times 10^{-27}}{\tfrac{4}{3}\pi(1.1 \times 10^{-15})^3} \approx ${sci(dn, 3)}$ kg m$^{-3}$, i.e. $\dfrac{${sci(dn, 3)}}{10^{17}} = ${dec(dn / 1e17, 3)}$.`,
  scheme: [['ρ = m/(4/3 πR₀³), A cancels', 1], ['≈ 2.98 × 10¹⁷ kg m⁻³', 1]],
  marks: 2, d: 3, c: 'application', t: [1],
}), (q) => near(dn / 1e17, q.answer.value, 0.01) || `dn ${dn}`);
add('volume-mcq', mcq({
  stem: 'The ratio of the volumes of two nuclei of mass numbers 8 and 64 is',
  right: '1 : 8',
  wrong: ['1 : 2', '1 : 4', '1 : 512'],
  sol: 'Volume ∝ R³ ∝ A, so the ratio is 8 : 64 = 1 : 8 — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('pp-tf', tf({
  stem: 'The nuclear force between two protons is much weaker than the nuclear force between two neutrons.',
  key: 'f',
  sol: 'False. The nuclear force is charge-independent: p–p, n–n and n–p nuclear forces are nearly equal (protons also repel electrically, but that is a separate force).',
  d: 1, c: 'understanding', t: [1],
}));
add('core-ar', ar({
  a: 'Nuclei do not collapse even though the nuclear force between nucleons is strongly attractive.',
  r: 'The nuclear force becomes repulsive when nucleons come closer than about 0.8 fm.',
  key: 'a',
  sol: 'Both true, and R explains A: the repulsive core keeps nucleons apart, so nuclear matter has a fixed density — option (a).',
  d: 2, c: 'understanding', t: [1],
}));
add('force-short', short({
  marks: 2,
  stem: 'State four properties of the nuclear force.',
  model: 'Any four: it is **much stronger** than the electrostatic force at nuclear distances; it is **short-range** (negligible beyond a few fm); it is **charge-independent** (p–p, n–n, n–p nearly equal); it is **attractive** at about 1 fm but **repulsive** below about 0.8 fm; it **saturates** (acts only between neighbouring nucleons).',
  sol: 'Four properties.',
  scheme: [['Two properties', 1], ['Two more properties', 1]],
  d: 1, c: 'recall', t: [1],
}));
const cf = (9e9 * (1.6e-19) ** 2) / (1.5e-15) ** 2;
add('coulomb-num', num({
  stem: 'Find the electrostatic force of repulsion between two protons 1.5 fm apart in a nucleus, in newtons (3 significant figures). (1/4πε₀ = 9 × 10⁹ N m² C⁻².)',
  value: Number(dec(cf, 3)), tol: 1, unit: 'N',
  sol: r`$F = \dfrac{1}{4\pi\varepsilon_0}\dfrac{e^2}{r^2} = \dfrac{9 \times 10^{9} \times (1.6 \times 10^{-19})^2}{(1.5 \times 10^{-15})^2} \approx ${dec(cf, 3)}$ N: a huge force on such tiny particles, which the nuclear force must overcome.`,
  scheme: [['Coulomb’s law with r = 1.5 × 10⁻¹⁵ m', 1], ['F ≈ 102 N', 1]],
  marks: 2, d: 3, c: 'application', t: [1],
}), (q) => near(cf, q.answer.value) && near(cf, 102.4) || `cf ${cf}`);
add('isobar-mcq', mcq({
  stem: 'Which pair of nuclides are isobars?',
  right: '³₁H and ³₂He',
  wrong: ['¹²₆C and ¹⁴₆C', '²₁H and ³₁H', '¹⁶₈O and ¹⁸₈O'],
  sol: 'Isobars have the same mass number but different atomic numbers: ³H and ³He (A = 3, Z = 1 and 2) — option (@K).',
  d: 1, c: 'understanding', t: [1],
}));
add('density-short3', short({
  marks: 3,
  stem: 'Using R = R₀A^(1/3), show that the density of a nucleus does not depend on its mass number, and estimate its value for R₀ = 1.2 fm. (Mass of a nucleon ≈ 1.66 × 10⁻²⁷ kg.)',
  model: r`Mass $M \approx Am$, volume $V = \tfrac{4}{3}\pi R^3 = \tfrac{4}{3}\pi R_0^3 A$. So $\rho = \dfrac{Am}{\tfrac{4}{3}\pi R_0^3 A} = \dfrac{m}{\tfrac{4}{3}\pi R_0^3}$: **A cancels**, so all nuclei have the same density. Numerically $\rho = \dfrac{1.66 \times 10^{-27}}{\tfrac{4}{3}\pi(1.2 \times 10^{-15})^3} \approx ${sci(U_KG / ((4 / 3) * Math.PI * (1.2e-15) ** 3), 2)}$ kg m$^{-3}$.`,
  sol: 'Mass ∝ A, volume ∝ A.',
  scheme: [['M = Am, V = (4/3)πR₀³A', 1], ['A cancels', 1], ['ρ ≈ 2.3 × 10¹⁷ kg m⁻³', 1]],
  d: 3, c: 'understanding', t: [1], wl: null,
}));
add('neutron-fill', fill({
  stem: 'The number of neutrons in a nucleus equals its mass number A minus its ___ number Z.',
  acc: [['atomic', 'proton']],
  sol: 'Its **atomic** number: N = A − Z.',
  d: 1, c: 'recall', t: [1],
}));

// ================================================================ t02 mass–energy and binding energy
const o16 = { dm: DM(8, 16, MASS.O16) };
o16.B = o16.dm * U_MEV;
o16.perA = o16.B / 16;
add('O16-num', num({
  stem: 'The atomic mass of ¹⁶₈O is 15.994915 u. Find its binding energy per nucleon, in MeV (3 significant figures). (m_H = 1.007825 u, mₙ = 1.008665 u, 1 u = 931.5 MeV.)',
  value: Number(dec(o16.perA, 3)), tol: 0.02, unit: 'MeV',
  sol: r`$\Delta M = 8 \times 1.007825 + 8 \times 1.008665 - 15.994915 = ${dec(o16.dm, 6)}$ u; $E_b = ${dec(o16.dm, 6)} \times 931.5 \approx ${dec(o16.B, 4)}$ MeV; $E_{bn} = \dfrac{${dec(o16.B, 4)}}{16} = ${dec(o16.perA, 3)}$ MeV.`,
  scheme: [['ΔM ≈ 0.137 u', 1], ['E_b ≈ 127.6 MeV, ≈ 7.98 MeV per nucleon', 1]],
  marks: 2, d: 3, c: 'application', t: [2],
}), (q) => near(o16.perA, q.answer.value) && near(o16.perA, 7.98) || `o16 ${o16.perA}`);
add('iron-ar', ar({
  a: 'Iron-56 is one of the most stable nuclei.',
  r: 'Iron-56 has very nearly the largest binding energy per nucleon of all nuclei.',
  key: 'a',
  sol: 'Both true, and R explains A: the larger the binding energy per nucleon, the more energy is needed to pull the nucleus apart — option (a).',
  d: 2, c: 'understanding', t: [2],
}));
const mg = 1e-6 * C2;
add('mc2-num', num({
  stem: 'Find the energy equivalent of a mass of 1.0 mg, in units of 10¹⁰ J. (c = 3.0 × 10⁸ m s⁻¹.)',
  value: mg / 1e10, tol: 0.05, unit: '× 10¹⁰ J',
  sol: r`$E = mc^2 = 1.0 \times 10^{-6} \times (3.0 \times 10^{8})^2 = ${sci(mg, 2)}$ J, i.e. $\dfrac{${sci(mg, 2)}}{10^{10}} = ${dec(mg / 1e10, 2)}$.`,
  scheme: [['E = mc² = 9.0 × 10¹⁰ J', 1]],
  d: 1, c: 'understanding', t: [2],
}), (q) => near(mg / 1e10, q.answer.value) || 'mg');
const li = { dm: DM(3, 7, MASS.Li7) };
li.B = li.dm * U_MEV;
add('Li7dm-num', num({
  stem: 'The atomic mass of ⁷₃Li is 7.016003 u. Find its mass defect, in u (4 significant figures). (m_H = 1.007825 u, mₙ = 1.008665 u.)',
  value: Number(li.dm.toPrecision(4)), tol: 0.0002, unit: 'u',
  sol: r`$\Delta M = 3 \times 1.007825 + 4 \times 1.008665 - 7.016003 = 3.023475 + 4.034660 - 7.016003 = ${dec(li.dm, 4)}$ u.`,
  scheme: [['Sum of nucleon masses 7.058135 u', 1], ['ΔM ≈ 0.04213 u', 1]],
  marks: 2, d: 2, c: 'application', t: [2],
}), (q) => near(li.dm, q.answer.value, 0.002) && near(li.dm, 0.042132, 0.001) || `li ${li.dm}`);
add('Li7B-num', num({
  stem: 'The mass defect of ⁷₃Li is 0.04213 u. Find its binding energy, in MeV (3 significant figures). (1 u = 931.5 MeV.)',
  value: Number(dec(0.04213 * U_MEV, 3)), tol: 0.2, unit: 'MeV',
  sol: r`$E_b = 0.04213 \times 931.5 \approx ${dec(0.04213 * U_MEV, 3)}$ MeV.`,
  scheme: [['E_b = ΔM × 931.5 ≈ 39.2 MeV', 1]],
  d: 1, c: 'understanding', t: [2],
}), (q) => near(0.04213 * U_MEV, q.answer.value) || 'liB');
const c12 = { dm: DM(6, 12, MASS.C12) };
c12.perA = (c12.dm * U_MEV) / 12;
add('C12-num', num({
  stem: 'Find the binding energy per nucleon of ¹²₆C (atomic mass exactly 12.000000 u), in MeV (3 significant figures). (m_H = 1.007825 u, mₙ = 1.008665 u, 1 u = 931.5 MeV.)',
  value: Number(dec(c12.perA, 3)), tol: 0.02, unit: 'MeV',
  sol: r`$\Delta M = 6 \times 1.007825 + 6 \times 1.008665 - 12.000000 = ${dec(c12.dm, 4)}$ u; $E_b = ${dec(c12.dm, 4)} \times 931.5 \approx ${dec(c12.dm * U_MEV, 3)}$ MeV; per nucleon $\dfrac{${dec(c12.dm * U_MEV, 3)}}{12} = ${dec(c12.perA, 3)}$ MeV.`,
  scheme: [['ΔM = 0.09894 u, E_b ≈ 92.2 MeV', 1], ['≈ 7.68 MeV per nucleon', 1]],
  marks: 2, d: 3, c: 'application', t: [2],
}), (q) => near(c12.perA, q.answer.value) && near(c12.perA, 7.68) || `c12 ${c12.perA}`);
const de = { dm: DM(1, 2, MASS.H2) };
de.B = de.dm * U_MEV;
add('deut-num', num({
  stem: 'The atomic mass of deuterium ²₁H is 2.014102 u. Find the binding energy of the deuteron, in MeV (3 significant figures). (m_H = 1.007825 u, mₙ = 1.008665 u, 1 u = 931.5 MeV.)',
  value: Number(dec(de.B, 3)), tol: 0.02, unit: 'MeV',
  sol: r`$\Delta M = 1.007825 + 1.008665 - 2.014102 = ${dec(de.dm, 4)}$ u; $E_b = ${dec(de.dm, 4)} \times 931.5 \approx ${dec(de.B, 3)}$ MeV (only about 1.1 MeV per nucleon: loosely bound).`,
  scheme: [['ΔM = 0.002388 u', 1], ['E_b ≈ 2.22 MeV', 1]],
  marks: 2, d: 2, c: 'application', t: [2],
}), (q) => near(de.B, q.answer.value) && near(de.B, 2.224) || `de ${de.B}`);
add('peak-mcq', mcq({
  stem: 'The binding energy per nucleon is greatest for nuclei with mass number near',
  right: '56',
  wrong: ['4', '120', '238'],
  sol: 'The curve peaks at about 8.8 MeV near A = 56 (iron) — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('heavier-tf', tf({
  stem: 'The mass of a stable nucleus is greater than the total mass of its separate protons and neutrons.',
  key: 'f',
  sol: 'False. It is LESS; the difference (mass defect) times c² is the binding energy released when the nucleus formed.',
  d: 1, c: 'understanding', t: [2],
}));
add('stable-mcq', mcq({
  stem: 'Using the binding energy per nucleon curve, which of these nuclei is the most tightly bound?',
  right: '⁵⁶Fe',
  wrong: ['²³⁸U', '⁴He', '²H'],
  sol: 'E_bn: ⁵⁶Fe ≈ 8.8 MeV, ²³⁸U ≈ 7.6 MeV, ⁴He ≈ 7.1 MeV, ²H ≈ 1.1 MeV — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('defect-short', short({
  marks: 2,
  stem: 'Define mass defect and binding energy of a nucleus. How are they related?',
  model: 'The **mass defect** is the difference between the total mass of the **separate nucleons** and the mass of the **nucleus**. The **binding energy** is the energy needed to **separate** the nucleus into its nucleons (equal to the energy released when it forms). They are related by $E_b = \\Delta M c^2$, i.e. $\\Delta M \\times 931.5$ MeV/u.',
  sol: 'Definitions and E = Δm c².',
  scheme: [['Mass defect defined', 1], ['Binding energy defined and E_b = ΔMc²', 1]],
  d: 1, c: 'recall', t: [2],
}));
add('curve-short3', short({
  marks: 3,
  stem: 'Sketch (describe) the graph of binding energy per nucleon against mass number. State two features of the graph and one conclusion drawn from each.',
  model: 'The curve rises steeply for light nuclei, is roughly **flat at about 8 MeV** for 30 < A < 170, **peaks at about 8.8 MeV near A = 56** and **falls slowly** to about 7.6 MeV for uranium. (1) Flat middle → the nuclear force is **short-range** and saturates. (2) Lower values at both ends → **fusion** of light nuclei and **fission** of heavy nuclei both move towards the peak and **release energy**.',
  sol: 'Shape; flatness → short range; ends → fission and fusion.',
  scheme: [['Correct shape with peak ≈ 8.8 MeV near A = 56', 1], ['Feature and conclusion: short range', 1], ['Feature and conclusion: fission/fusion release energy', 1]],
  d: 2, c: 'understanding', t: [2, 3],
}));
add('flat-short', short({
  marks: 2,
  stem: 'Why is the binding energy per nucleon nearly constant for nuclei with mass numbers between about 30 and 170?',
  model: 'The nuclear force is **short-range**: each nucleon is attracted only by its **nearest neighbours**, not by all the nucleons. Adding more nucleons adds about the **same** binding for each one (**saturation**), so the binding energy per nucleon stays nearly constant instead of growing with A.',
  sol: 'Short range, saturation.',
  scheme: [['Each nucleon bound only to neighbours (short range)', 1], ['So E_b ∝ A, E_bn nearly constant', 1]],
  d: 3, c: 'understanding', t: [2],
}));
add('whichstable-mcq', mcq({
  stem: 'Nucleus X (A = 120) has a total binding energy of 1000 MeV and nucleus Y (A = 236) has a total binding energy of 1800 MeV. Which is more stable, and why?',
  right: 'X, because its binding energy per nucleon (≈ 8.3 MeV) is larger',
  wrong: ['Y, because its total binding energy is larger', 'Y, because it has more nucleons', 'Both equally, because both are heavy nuclei'],
  sol: 'Stability is judged by E_b/A: X has 1000/120 ≈ 8.33 MeV, Y has 1800/236 ≈ 7.63 MeV — option (@K).',
  d: 4, c: 'analysis', t: [2],
}), () => (1000 / 120 > 1800 / 236) || 'xy');
add('helium-ar', ar({
  a: 'The binding energy per nucleon of ⁴He is much larger than that of ⁷Li.',
  r: 'A ⁴He nucleus contains equal numbers of protons and neutrons.',
  key: 'b',
  sol: 'Both true (⁴He ≈ 7.07 MeV, ⁷Li ≈ 5.61 MeV per nucleon), but R does not explain A: many nuclei with N = Z are not specially tightly bound; ⁴He’s compact, closed structure is the reason — option (b).',
  d: 3, c: 'understanding', t: [2],
}), () => (BE(2, 4, MASS.He4) / 4 > BE(3, 7, MASS.Li7) / 7 + 1) || 'heli');
add('Coulomb-ar', ar({
  a: 'The binding energy per nucleon falls gradually for nuclei heavier than iron.',
  r: 'The nuclear force between two nucleons increases with the number of nucleons in the nucleus.',
  key: 'c',
  sol: 'A is true. R is false: the nuclear force between a pair does not grow with A; the fall is due to the long-range Coulomb repulsion among the many protons — option (c).',
  d: 3, c: 'understanding', t: [2],
}));
const heJ = BE(2, 4, MASS.He4) * MEV;
add('heJ-num', num({
  stem: 'The binding energy of ⁴He is 28.3 MeV. Express it in joules, in units of 10⁻¹² J (3 significant figures). (1 MeV = 1.6 × 10⁻¹³ J.)',
  value: Number(dec((28.3 * MEV) / 1e-12, 3)), tol: 0.02, unit: '× 10⁻¹² J',
  sol: r`$28.3 \times 1.6 \times 10^{-13} = ${sci(28.3 * MEV, 3)}$ J, i.e. $\dfrac{${sci(28.3 * MEV, 3)}}{10^{-12}} = ${dec((28.3 * MEV) / 1e-12, 3)}$.`,
  scheme: [['28.3 × 1.6 × 10⁻¹³ ≈ 4.53 × 10⁻¹² J', 1]],
  d: 1, c: 'understanding', t: [2],
}), () => near(heJ, 28.3 * MEV, 0.005) || 'heJ');

// ================================================================ t03 fission and fusion
add('balance-mcq', mcq({
  stem: 'In the fission reaction ¹₀n + ²³⁵₉₂U → ¹⁴⁰₅₄Xe + ⁹⁴₃₈Sr + x ¹₀n, the value of x is',
  right: '2',
  wrong: ['1', '3', '4'],
  sol: 'Nucleons: 1 + 235 = 140 + 94 + x, so x = 2 (charges: 92 = 54 + 38 ✓) — option (@K).',
  d: 2, c: 'application', t: [3],
}), () => (1 + 235 - 140 - 94 === 2 && 54 + 38 === 92) || 'bal');
add('hot-ar', ar({
  a: 'Nuclear fusion takes place only at extremely high temperatures.',
  r: 'The nuclei must have enough kinetic energy to come within the range of the nuclear force against their Coulomb repulsion.',
  key: 'a',
  sol: 'Both true, and R explains A: only at 10⁷–10⁸ K are nuclei fast enough to get within a few fm of each other — option (a).',
  d: 2, c: 'understanding', t: [3],
}));
add('moderator-mcq', mcq({
  stem: 'The function of the moderator (such as heavy water or graphite) in a nuclear reactor is to',
  right: 'slow down the fast neutrons produced in fission',
  wrong: ['absorb all the neutrons', 'speed up the neutrons', 'cool the reactor core'],
  sol: 'Slow (thermal) neutrons are far more likely to cause fission of U-235, so the moderator slows them — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('rods-mcq', mcq({
  stem: 'Control rods in a nuclear reactor are made of materials such as cadmium or boron because these',
  right: 'absorb neutrons strongly',
  wrong: ['slow neutrons without absorbing them', 'release extra neutrons', 'conduct heat well'],
  sol: 'Pushing the rods in absorbs neutrons and slows the chain reaction; pulling them out speeds it up — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
const fq = { A: 240, b1: 7.6, b2: 8.5 };
fq.Q = fq.A * (fq.b2 - fq.b1);
add('fissionQ-num', num({
  stem: 'A nucleus with A = 240 and binding energy per nucleon 7.6 MeV splits into two fragments, each with binding energy per nucleon 8.5 MeV. Estimate the energy released, in MeV.',
  value: fq.Q, tol: 1, unit: 'MeV',
  sol: r`$Q = 240 \times (8.5 - 7.6) = 240 \times 0.9 = ${dec(fq.Q, 3)}$ MeV.`,
  scheme: [['Q = A × increase in E_bn', 1], ['216 MeV', 1]],
  marks: 2, d: 2, c: 'application', t: [3],
}), (q) => near(fq.Q, 216) && near(q.answer.value, 216) || 'fq');
const dd = { dm: 2 * MASS.H2 - MASS.He4 };
dd.Q = dd.dm * U_MEV;
add('DD-num', num({
  stem: 'Find the energy released when two deuterium nuclei fuse to form a helium-4 nucleus, ²H + ²H → ⁴He, in MeV (3 significant figures). (Atomic masses: ²H 2.014102 u, ⁴He 4.002603 u; 1 u = 931.5 MeV.)',
  value: Number(dec(dd.Q, 3)), tol: 0.1, unit: 'MeV',
  sol: r`$\Delta m = 2 \times 2.014102 - 4.002603 = ${dec(dd.dm, 4)}$ u; $Q = ${dec(dd.dm, 4)} \times 931.5 \approx ${dec(dd.Q, 3)}$ MeV.`,
  scheme: [['Δm = 0.025601 u', 1], ['Q ≈ 23.8 MeV', 1]],
  marks: 2, d: 2, c: 'application', t: [3],
}), (q) => near(dd.Q, q.answer.value) && near(dd.Q, 23.85) || `dd ${dd.Q}`);
const kg = { N: (1000 / 235) * NA };
kg.E = kg.N * 200 * MEV;
add('kg-num', num({
  stem: 'Estimate the energy released if all the nuclei in 1.0 kg of U-235 undergo fission, releasing 200 MeV each. Give the answer in units of 10¹³ J (3 significant figures). (N_A = 6.02 × 10²³ mol⁻¹, 1 MeV = 1.6 × 10⁻¹³ J.)',
  value: Number(dec(kg.E / 1e13, 3)), tol: 0.05, unit: '× 10¹³ J',
  sol: r`$N = \dfrac{1000}{235} \times 6.02 \times 10^{23} \approx ${sci(kg.N, 3)}$; $E = ${sci(kg.N, 3)} \times 200 \times 1.6 \times 10^{-13} \approx ${sci(kg.E, 3)}$ J, i.e. $\dfrac{${sci(kg.E, 3)}}{10^{13}} = ${dec(kg.E / 1e13, 3)}$.`,
  scheme: [['N ≈ 2.56 × 10²⁴ nuclei', 1], ['E ≈ 8.20 × 10¹³ J', 1]],
  marks: 2, d: 3, c: 'application', t: [3],
}), (q) => near(kg.E / 1e13, q.answer.value) && near(kg.E, 8.2e13) || `kg ${kg.E}`);
const pw = { P: 5e8 };
pw.rate = pw.P / (200 * MEV);
add('rate-num', num({
  stem: 'A reactor produces 500 MW of thermal power from the fission of U-235, each fission releasing 200 MeV. How many fissions take place per second? Give the answer in units of 10¹⁹ (3 significant figures).',
  value: Number(dec(pw.rate / 1e19, 3)), tol: 0.02, unit: '× 10¹⁹ s⁻¹',
  sol: r`Energy per fission $= 200 \times 1.6 \times 10^{-13} = 3.2 \times 10^{-11}$ J. Rate $= \dfrac{5.0 \times 10^{8}}{3.2 \times 10^{-11}} \approx ${sci(pw.rate, 3)}$ s$^{-1}$, i.e. $\dfrac{${sci(pw.rate, 3)}}{10^{19}} = ${dec(pw.rate / 1e19, 3)}$.`,
  scheme: [['Energy per fission 3.2 × 10⁻¹¹ J', 1], ['≈ 1.56 × 10¹⁹ fissions per second', 1]],
  marks: 2, d: 3, c: 'application', t: [3],
}), (q) => near(pw.rate / 1e19, q.answer.value) || 'pw');
pw.day = ((pw.rate * 86400) / NA) * 235 / 1000;
add('perday-num', num({
  stem: 'A reactor working at 500 MW thermal power, with 200 MeV per fission, uses up U-235. How much U-235, in kg, is consumed in one day (3 significant figures)? (N_A = 6.02 × 10²³ mol⁻¹, 1 MeV = 1.6 × 10⁻¹³ J.)',
  value: Number(dec(pw.day, 3)), tol: 0.005, unit: 'kg',
  sol: r`Fissions per second $= \dfrac{5.0 \times 10^{8}}{3.2 \times 10^{-11}} \approx ${sci(pw.rate, 3)}$; per day $\times 86400 \approx ${sci(pw.rate * 86400, 3)}$ nuclei. Mass $= \dfrac{${sci(pw.rate * 86400, 3)}}{6.02 \times 10^{23}} \times 235$ g $\approx ${dec(pw.day * 1000, 3)}$ g, i.e. $\dfrac{${dec(pw.day * 1000, 3)}}{1000} = ${dec(pw.day, 3)}$ kg.`,
  scheme: [['Fissions per day ≈ 1.35 × 10²⁴', 1], ['Mass ≈ 0.527 kg', 1]],
  marks: 2, d: 5, c: 'analysis', t: [3],
}), (q) => near(pw.day, q.answer.value) && near(pw.day, 0.527) || `day ${pw.day}`);
add('sun-mcq', mcq({
  stem: 'The main source of the energy radiated by the Sun is',
  right: 'fusion of hydrogen into helium in its core',
  wrong: ['fission of uranium in its core', 'burning of hydrogen gas with oxygen', 'radioactive decay of heavy elements'],
  sol: 'At about 1.5 × 10⁷ K, hydrogen nuclei fuse into helium, net 4 ¹H → ⁴He + 26.7 MeV — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('pernucleon-mcq', mcq({
  stem: 'Compared with fission of U-235, fusion of deuterium and tritium releases',
  right: 'less energy per reaction but more energy per nucleon (and per kilogram of fuel)',
  wrong: ['more energy per reaction and more per nucleon', 'more energy per reaction but less per nucleon', 'the same energy per nucleon'],
  sol: 'Fission: ≈ 200 MeV over 236 nucleons ≈ 0.85 MeV each. D–T fusion: 17.6 MeV over 5 nucleons ≈ 3.5 MeV each — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('chain-short', short({
  marks: 2,
  stem: 'What is a chain reaction in nuclear fission? How is it kept under control in a nuclear reactor?',
  model: 'Each fission releases **2–3 neutrons**, which can cause further fissions, so the process can **sustain itself**: a **chain reaction**. In a reactor, **control rods** (cadmium or boron) **absorb** surplus neutrons so that on average **one** neutron from each fission causes another fission, keeping the power steady; a moderator slows neutrons so they cause fission efficiently.',
  sol: 'Neutron multiplication; control rods keep one per fission.',
  scheme: [['Neutrons from fission cause further fissions', 1], ['Control rods absorb extras: one per fission on average', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('fusionhard-short', short({
  marks: 2,
  stem: 'Why is it difficult to build a controlled fusion reactor on Earth?',
  model: 'Fusion needs temperatures of about **10⁸ K** so that nuclei can overcome their **Coulomb repulsion**. No material container can withstand such a hot plasma, so it must be held away from the walls by strong **magnetic fields** (as in a tokamak) and kept **dense** and hot long enough for more energy to come out than is put in.',
  sol: 'Extreme temperature and confinement.',
  scheme: [['Very high temperature needed (Coulomb barrier)', 1], ['Confinement problem: magnetic fields, energy gain', 1]],
  d: 3, c: 'understanding', t: [3],
}));
add('bothrelease-short3', short({
  marks: 3,
  stem: 'Using the binding energy per nucleon curve, explain why energy is released both when a heavy nucleus splits and when two light nuclei fuse.',
  model: 'The binding energy per nucleon is **low** for very light nuclei, **highest** (≈ 8.8 MeV) near A = 56 and **lower** (≈ 7.6 MeV) for heavy nuclei. In **fission**, a heavy nucleus splits into two medium nuclei with **higher** $E_{bn}$; in **fusion**, light nuclei join into a nucleus with **higher** $E_{bn}$. In both, the products are **more tightly bound**, so the total binding energy **increases**; this increase (equal to the mass lost × c²) is **released**.',
  sol: 'Both move towards the peak.',
  scheme: [['Curve: low at both ends, peak near A = 56', 1], ['Fission and fusion both increase E_bn', 1], ['Increase in total BE released (Δm c²)', 1]],
  d: 3, c: 'understanding', t: [3],
}));
add('massloss-tf', tf({
  stem: 'In both nuclear fission and nuclear fusion, the total mass of the products is less than the total mass of the reacting nuclei.',
  key: 't',
  sol: 'True. The lost mass Δm appears as the released energy Q = Δm c².',
  d: 2, c: 'understanding', t: [3],
}));
const sunm = 3.8e26 / C2;
add('sunmass-num', num({
  stem: 'The Sun radiates energy at about 3.8 × 10²⁶ W. How much mass does it convert into energy every second? Give the answer in units of 10⁹ kg (3 significant figures). (c = 3.0 × 10⁸ m s⁻¹.)',
  value: Number(dec(sunm / 1e9, 3)), tol: 0.03, unit: '× 10⁹ kg',
  sol: r`$\dfrac{\Delta m}{\Delta t} = \dfrac{P}{c^2} = \dfrac{3.8 \times 10^{26}}{9.0 \times 10^{16}} \approx ${sci(sunm, 3)}$ kg s$^{-1}$, i.e. $\dfrac{${sci(sunm, 3)}}{10^{9}} = ${dec(sunm / 1e9, 3)}$.`,
  scheme: [['Δm = E/c² per second', 1], ['≈ 4.22 × 10⁹ kg s⁻¹', 1]],
  marks: 2, d: 3, c: 'application', t: [3],
}), (q) => near(sunm / 1e9, q.answer.value) || 'sunm');

// ================================================================ long answers (5 marks)
add('nucleus-long', long({
  stem: '(a) What is a nucleus made of? Define atomic number, mass number, isotopes and isobars. (b) Write the relation between nuclear radius and mass number, and show that nuclear density is the same for all nuclei. (c) Estimate the radius of ¹⁹⁷Au (R₀ = 1.2 fm). (d) State three properties of the nuclear force.',
  model: r`(a) Protons and neutrons (nucleons). Atomic number Z = number of protons; mass number A = number of nucleons. Isotopes: same Z, different A; isobars: same A, different Z.

(b) $R = R_0A^{1/3}$. Mass $\approx Am$, volume $\tfrac{4}{3}\pi R_0^3A$, so $\rho = \dfrac{m}{\tfrac{4}{3}\pi R_0^3}$, independent of A (about $2.3 \times 10^{17}$ kg m$^{-3}$).

(c) $R = 1.2 \times 197^{1/3} \approx 1.2 \times ${dec(Math.cbrt(197), 3)} \approx ${dec(1.2 * Math.cbrt(197), 3)}$ fm.

(d) Any three: very strong, short-range (a few fm), charge-independent, repulsive below about 0.8 fm, saturating.`,
  sol: 'Composition; R = R₀A^(1/3); density; properties.',
  scheme: [['Composition and definitions', 1], ['R = R₀A^(1/3)', 1], ['Density independent of A', 1], ['R(Au) ≈ 6.98 fm', 1], ['Three properties of nuclear force', 1]],
  d: 3, c: 'understanding', t: [1], wl: null,
}), () => near(1.2 * Math.cbrt(197), 6.98) || 'au');
const fe = { dm: DM(26, 56, MASS.Fe56) };
fe.B = fe.dm * U_MEV;
fe.perA = fe.B / 56;
add('be-long', long({
  stem: '(a) Define mass defect and binding energy and write the relation between them. (b) The atomic mass of ⁵⁶₂₆Fe is 55.934936 u. Calculate its mass defect, binding energy and binding energy per nucleon. (m_H = 1.007825 u, mₙ = 1.008665 u, 1 u = 931.5 MeV.) (c) Sketch (describe) the binding energy per nucleon curve and explain what the position of iron on it means.',
  model: r`(a) Mass defect $\Delta M$ = total mass of separate nucleons − mass of the nucleus. Binding energy = energy needed to separate the nucleus into its nucleons; $E_b = \Delta M c^2$.

(b) $26 \times 1.007825 + 30 \times 1.008665 = 26.203450 + 30.259950 = 56.463400$ u; $\Delta M = 56.463400 - 55.934936 = ${dec(fe.dm, 4)}$ u. $E_b = ${dec(fe.dm, 4)} \times 931.5 \approx ${dec(fe.B, 4)}$ MeV; $E_{bn} = \dfrac{${dec(fe.B, 4)}}{56} \approx ${dec(fe.perA, 3)}$ MeV.

(c) The curve rises steeply for light nuclei, is nearly flat around 8 MeV, peaks at about 8.8 MeV near A = 56 and falls to about 7.6 MeV for uranium. Iron sits at the peak: its nucleons are the most tightly bound, so iron can release energy by neither fission nor fusion.`,
  sol: 'Definitions; Fe-56 numbers; curve.',
  scheme: [['Definitions and E_b = ΔMc²', 1], ['ΔM ≈ 0.5285 u', 1], ['E_b ≈ 492 MeV', 1], ['E_bn ≈ 8.79 MeV', 1], ['Curve and meaning of the peak', 1]],
  d: 3, c: 'application', t: [2], wl: null,
}), () => near(fe.perA, 8.79) && near(fe.B, 492.3) || `fe ${fe.perA} ${fe.B}`);
const xs = { Xe: 139.92164, Sr: 93.915361 };
xs.dm = MASS.U235 + MN - (xs.Xe + xs.Sr + 2 * MN);
xs.Q = xs.dm * U_MEV;
add('fission-long', long({
  stem: '(a) What is nuclear fission? Complete and balance: ¹₀n + ²³⁵₉₂U → ¹⁴⁰₅₄Xe + ⁹⁴₃₈Sr + ? (b) Using the atomic masses U-235 235.043928 u, Xe-140 139.921640 u, Sr-94 93.915361 u and mₙ = 1.008665 u, find the energy released. (c) Explain how a chain reaction is sustained and controlled in a nuclear reactor, naming the roles of the moderator, control rods and coolant.',
  model: r`(a) Fission is the splitting of a heavy nucleus into two lighter nuclei of comparable mass, with the release of neutrons and energy. Balancing: $236 = 140 + 94 + x$, so **2 neutrons**: $\text{n} + {}^{235}\text{U} \to {}^{140}\text{Xe} + {}^{94}\text{Sr} + 2\text{n}$ (charge $92 = 54 + 38$).

(b) Before: $235.043928 + 1.008665 = 236.052593$ u. After: $139.921640 + 93.915361 + 2 \times 1.008665 = 235.854331$ u. $\Delta m = ${dec(xs.dm, 4)}$ u; $Q = ${dec(xs.dm, 4)} \times 931.5 \approx ${dec(xs.Q, 3)}$ MeV.

(c) The 2–3 neutrons from each fission can split more nuclei, so the reaction can sustain itself. A **moderator** (heavy water, graphite) slows the neutrons so that they cause fission efficiently; **control rods** (cadmium, boron) absorb neutrons so that on average exactly one neutron per fission causes another (steady power); a **coolant** carries the heat to a boiler that drives turbines.`,
  sol: 'Balance; Q from masses; reactor parts.',
  scheme: [['Definition and x = 2 (A and Z balanced)', 1], ['Masses before and after', 1], ['Q ≈ 185 MeV', 1], ['Chain reaction sustained by neutrons', 1], ['Moderator, control rods, coolant', 1]],
  d: 3, c: 'application', t: [3], wl: null,
}), () => near(xs.Q, 184.7, 0.003) || `xs ${xs.Q}`);
const dt = { dm: MASS.H2 + MASS.H3 - MASS.He4 - MN };
dt.Q = dt.dm * U_MEV;
add('fusion-long', long({
  stem: '(a) What is nuclear fusion? Why does it need temperatures of about 10⁷–10⁸ K? (b) Calculate the energy released in ²H + ³H → ⁴He + n. (Atomic masses: ²H 2.014102 u, ³H 3.016049 u, ⁴He 4.002603 u; mₙ = 1.008665 u; 1 u = 931.5 MeV.) (c) Compare the energy per nucleon with that of U-235 fission (200 MeV per fission). (d) Name the process that powers the Sun.',
  model: r`(a) Fusion is the joining of light nuclei into a heavier nucleus with the release of energy. Both nuclei are positive and repel; they must approach within a few fm for the nuclear force to act, which needs very high kinetic energies, i.e. temperatures of $10^7$–$10^8$ K (thermonuclear fusion).

(b) $\Delta m = (2.014102 + 3.016049) - (4.002603 + 1.008665) = ${dec(dt.dm, 4)}$ u; $Q = ${dec(dt.dm, 4)} \times 931.5 \approx ${dec(dt.Q, 3)}$ MeV.

(c) Fusion: $\dfrac{${dec(dt.Q, 3)}}{5} \approx ${dec(dt.Q / 5, 2)}$ MeV per nucleon. Fission: $\dfrac{200}{236} \approx ${dec(200 / 236, 2)}$ MeV per nucleon. Fusion releases about four times as much per nucleon.

(d) Fusion of hydrogen into helium (net $4\,{}^{1}\text{H} \to {}^{4}\text{He}$), at about $1.5 \times 10^7$ K in the core.`,
  sol: 'Definition; Coulomb barrier; Q; per nucleon; Sun.',
  scheme: [['Definition', 1], ['Why high temperature', 1], ['Q ≈ 17.6 MeV', 1], ['3.5 vs 0.85 MeV per nucleon', 1], ['Sun: hydrogen fusion', 1]],
  d: 3, c: 'application', t: [3], wl: null,
}), () => near(dt.Q, 17.59) || `dt ${dt.Q}`);
const rp = { P: 1.0e9, eff: 1 };
rp.rate = rp.P / (200 * MEV);
rp.kgYear = ((rp.rate * 86400 * 365) / NA) * 0.235;
rp.coal = (rp.P * 86400 * 365) / 3.0e7 / 1000;
add('plant-long', long({
  stem: 'A nuclear power station produces 1000 MW of thermal power by fission of U-235, at 200 MeV per fission. (a) Find the number of fissions per second. (b) Find the mass of U-235 used in one year (365 days). (c) Coal releases about 3.0 × 10⁷ J per kg when burnt. How many tonnes of coal would give the same energy in a year? (d) Use your answers to comment on one advantage and one disadvantage of nuclear power. (N_A = 6.02 × 10²³ mol⁻¹, 1 MeV = 1.6 × 10⁻¹³ J.)',
  model: r`(a) Energy per fission $= 200 \times 1.6 \times 10^{-13} = 3.2 \times 10^{-11}$ J; rate $= \dfrac{1.0 \times 10^{9}}{3.2 \times 10^{-11}} \approx ${sci(rp.rate, 3)}$ s$^{-1}$.

(b) Fissions per year $\approx ${sci(rp.rate * 86400 * 365, 3)}$; moles $\approx ${dec((rp.rate * 86400 * 365) / NA, 3)}$; mass $\approx ${dec((rp.rate * 86400 * 365) / NA, 3)} \times 0.235 \approx ${dec(rp.kgYear, 3)}$ kg.

(c) Energy per year $= 1.0 \times 10^{9} \times 3.15 \times 10^{7} \approx 3.15 \times 10^{16}$ J; coal $= \dfrac{3.15 \times 10^{16}}{3.0 \times 10^{7}} \approx 1.05 \times 10^{9}$ kg $\approx ${dec(rp.coal / 1000, 3)} \times 10^{6}$ tonnes.

(d) Advantage: about 385 kg of fuel replaces about a million tonnes of coal, with no CO₂ from burning. Disadvantage: radioactive waste that must be stored safely for a very long time (and the need to prevent accidents).`,
  sol: 'Rate; moles; coal comparison; evaluation.',
  scheme: [['≈ 3.13 × 10¹⁹ fissions per second', 1], ['≈ 385 kg of U-235 per year', 1], ['≈ 1.05 × 10⁶ tonnes of coal', 1], ['Advantage', 1], ['Disadvantage', 1]],
  d: 4, c: 'analysis', t: [3], wl: null,
}), () => near(rp.rate, 3.125e19) && near(rp.kgYear, 385, 0.01) && near(rp.coal, 1.05e6) || `rp ${rp.kgYear} ${rp.coal}`);

// ================================================================ case-based (4 marks: 1 + 1 + 2)
const rw = { P: 7.0e8 };
rw.rate = rw.P / (200 * MEV);
add('reactor-case', mk.case({
  passage: 'A pressurised heavy-water reactor at Rawatbhata in Rajasthan uses natural uranium fuel. Heavy water surrounds the fuel channels, and rods that can be moved in or out of the core control the reaction. The reactor produces about 700 MW of heat, carried away by pressurised heavy water to a boiler, where it makes steam for the turbines.',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'The main job of the heavy water around the fuel channels is to',
      right: 'slow down neutrons so that they cause fission efficiently',
      wrong: ['absorb all neutrons to stop the reaction', 'increase the speed of neutrons', 'make the uranium radioactive'],
      sol: 'Heavy water is the moderator: it slows fast fission neutrons, which U-235 captures far more readily — option (@K).',
      d: 1, c: 'recall', t: [3],
    })),
    part('b', num({
      stem: 'Taking 200 MeV per fission, find the number of fissions per second at 700 MW, in units of 10¹⁹ (3 significant figures). (1 MeV = 1.6 × 10⁻¹³ J.)',
      value: Number(dec(rw.rate / 1e19, 3)), tol: 0.02, unit: '× 10¹⁹ s⁻¹',
      sol: r`Rate $= \dfrac{7.0 \times 10^{8}}{200 \times 1.6 \times 10^{-13}} \approx ${sci(rw.rate, 3)}$ s$^{-1}$, i.e. $\dfrac{${sci(rw.rate, 3)}}{10^{19}} = ${dec(rw.rate / 1e19, 3)}$.`,
      scheme: [['≈ 2.19 × 10¹⁹ s⁻¹', 1]],
      d: 2, c: 'application', t: [3],
    })),
    part('c', short({
      marks: 2,
      stem: 'Explain how moving the control rods changes the power of the reactor.',
      model: 'Control rods **absorb neutrons**. Pushing them **in** absorbs more neutrons, so fewer fissions follow each fission and the power **falls**; pulling them **out** lets more neutrons cause fission and the power **rises**. Operators adjust them so that on average **one** neutron per fission causes another.',
      sol: 'Neutron absorption controls the multiplication.',
      scheme: [['Rods absorb neutrons', 1], ['In: power falls; out: power rises; keep one per fission', 1]],
      d: 2, c: 'understanding', t: [3],
    }), [
      short({
        marks: 2,
        stem: 'A visitor fears that the reactor could explode like an atom bomb. Evaluate this fear.',
        model: 'The fear is **not justified**. A bomb needs very highly enriched U-235 and a rapidly **growing** chain reaction. This reactor uses **natural** uranium and a **controlled** chain reaction (about one new fission per fission), held by control rods and the moderator. Accidents can release heat and radioactivity, but not a nuclear explosion.',
        sol: 'Fuel and control differ from a bomb.',
        scheme: [['Bomb needs highly enriched fuel and runaway chain', 1], ['Reactor: natural uranium, controlled; no nuclear explosion', 1]],
        d: 3, c: 'evaluation', t: [3],
      }),
    ]),
  ],
}), (q) => near(rw.rate, 2.19e19) && near(q.children[1].answer.value, 2.19) || `rw ${rw.rate}`);

add('tokamak-case', mk.case({
  passage: 'Indian engineers help build parts of ITER, an experimental fusion reactor in France. In it, a mixture of deuterium and tritium is heated to about 150 million kelvin and held away from the walls by strong magnetic fields. Each D–T fusion produces a helium-4 nucleus and a fast neutron.',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'Why must the fuel be heated to such an extreme temperature?',
      right: 'So that the nuclei move fast enough to overcome their electrostatic repulsion',
      wrong: ['So that the neutrons can be slowed down', 'To make the fuel radioactive', 'To split the deuterium nuclei into protons and neutrons'],
      sol: 'Fusion needs the positive nuclei to get within the range of the nuclear force against their Coulomb repulsion — option (@K).',
      d: 2, c: 'understanding', t: [3],
    })),
    part('b', num({
      stem: 'Using atomic masses ²H 2.014102 u, ³H 3.016049 u, ⁴He 4.002603 u and mₙ = 1.008665 u, find the energy released per D–T fusion, in MeV (3 significant figures). (1 u = 931.5 MeV.)',
      value: Number(dec(dt.Q, 3)), tol: 0.1, unit: 'MeV',
      sol: r`$\Delta m = 5.030151 - 5.011268 = ${dec(dt.dm, 4)}$ u; $Q = ${dec(dt.dm, 4)} \times 931.5 \approx ${dec(dt.Q, 3)}$ MeV.`,
      scheme: [['Q ≈ 17.6 MeV', 1]],
      d: 3, c: 'application', t: [3],
    })),
    part('c', short({
      marks: 2,
      stem: 'Explain why 1 kg of D–T fuel can release much more energy than 1 kg of U-235.',
      model: r`Per nucleon, D–T fusion releases about $17.6/5 \approx 3.5$ MeV, while U-235 fission releases about $200/236 \approx 0.85$ MeV. A kilogram of any fuel contains roughly the **same number of nucleons**, so fusion fuel gives about **four times** as much energy per kilogram.`,
      sol: 'Energy per nucleon.',
      scheme: [['3.5 vs 0.85 MeV per nucleon', 1], ['Same nucleons per kg ⇒ about 4× energy', 1]],
      d: 3, c: 'analysis', t: [3], wl: null,
    }), [
      short({
        marks: 2,
        stem: 'A student says the plasma could simply be kept in a strong steel container. Evaluate this idea.',
        model: 'It would **not work**. At 150 million kelvin any **container wall** would be damaged, and contact with the cold wall would **cool** the plasma at once and stop fusion. That is why ITER uses **magnetic fields** to hold the charged plasma away from the walls (magnetic confinement).',
        sol: 'No material can touch the plasma.',
        scheme: [['Walls would be damaged and cool the plasma', 1], ['Magnetic confinement needed', 1]],
        d: 3, c: 'evaluation', t: [3],
      }),
    ]),
  ],
}), (q) => near(q.children[1].answer.value, 17.6) || 'tok');

const ns = { M: 1.4 * 2.0e30, R: 12e3 };
ns.rho = ns.M / ((4 / 3) * Math.PI * ns.R ** 3);
add('neutronstar-case', mk.case({
  passage: 'At a science festival in Bengaluru, an astronomer describes neutron stars: the collapsed cores of massive stars, made almost entirely of neutrons packed together. A typical neutron star has a mass of about 1.4 times the Sun’s mass (Sun: 2.0 × 10³⁰ kg) but a radius of only about 12 km. She says that it is “like one gigantic nucleus”.',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'The density of an ordinary atomic nucleus',
      right: 'is about the same for all nuclei, light or heavy',
      wrong: ['increases in proportion to the mass number', 'is about the same as the density of water', 'is greatest for hydrogen'],
      sol: 'R³ ∝ A, so mass/volume is independent of A — option (@K).',
      d: 1, c: 'understanding', t: [1],
    })),
    part('b', num({
      stem: 'Estimate the mean density of the neutron star, in units of 10¹⁷ kg m⁻³ (3 significant figures).',
      value: Number(dec(ns.rho / 1e17, 3)), tol: 0.05, unit: '× 10¹⁷ kg m⁻³',
      sol: r`$M = 1.4 \times 2.0 \times 10^{30} = 2.8 \times 10^{30}$ kg; $V = \tfrac{4}{3}\pi(1.2 \times 10^{4})^3 \approx ${sci((4 / 3) * Math.PI * ns.R ** 3, 3)}$ m³; $\rho = \dfrac{2.8 \times 10^{30}}{${sci((4 / 3) * Math.PI * ns.R ** 3, 3)}} \approx ${sci(ns.rho, 3)}$ kg m$^{-3}$, i.e. $\dfrac{${sci(ns.rho, 3)}}{10^{17}} = ${dec(ns.rho / 1e17, 3)}$.`,
      scheme: [['ρ ≈ 3.87 × 10¹⁷ kg m⁻³', 1]],
      d: 3, c: 'application', t: [1],
    })),
    part('c', short({
      marks: 2,
      stem: 'Compare this with the density of nuclear matter (about 2.3 × 10¹⁷ kg m⁻³) and comment on the astronomer’s description.',
      model: 'The neutron star’s mean density, about $3.9 \\times 10^{17}$ kg m⁻³, is of the **same order** as nuclear density. So its neutrons are packed about as closely as nucleons in a nucleus, and calling it “one gigantic nucleus” is a **fair picture** (though it is held together by gravity, not by the nuclear force alone).',
      sol: 'Same order as nuclear density.',
      scheme: [['Same order of magnitude as nuclear density', 1], ['Description reasonable; gravity holds it', 1]],
      d: 3, c: 'analysis', t: [1],
    }), [
      short({
        marks: 2,
        stem: 'A listener argues that, since a neutron star is so dense, a uranium nucleus must also be denser than a helium nucleus because it has more nucleons. Evaluate this argument.',
        model: 'The argument is **wrong**. A uranium nucleus has more nucleons but is also **bigger**: $R = R_0A^{1/3}$, so its **volume** grows in proportion to A. Mass and volume rise together, so all nuclei have about the **same density**, about $2.3 \\times 10^{17}$ kg m⁻³.',
        sol: 'Volume ∝ A.',
        scheme: [['Volume ∝ A as well as mass', 1], ['Same density: argument wrong', 1]],
        d: 3, c: 'evaluation', t: [1],
      }),
    ]),
  ],
}), (q) => near(ns.rho, 3.87e17) && near(q.children[1].answer.value, 3.87) || `ns ${ns.rho}`);

// ================================================================ further items (type and key balance)
add('radius-ar', ar({
  a: 'The radius of a nucleus is directly proportional to its mass number.',
  r: 'The volume of a nucleus is directly proportional to its mass number.',
  key: 'd',
  sol: 'R is true (V ∝ A). A is false: since V ∝ R³ ∝ A, the radius is proportional to A^(1/3), not to A — option (d).',
  d: 2, c: 'understanding', t: [1],
}));
add('nfission-mcq', mcq({
  stem: 'On average, how many neutrons are released in each fission of a U-235 nucleus?',
  right: 'About 2.5',
  wrong: ['Exactly 1', 'About 10', 'None'],
  sol: 'Different fissions give 2 or 3 neutrons, about 2.5 on average — enough to sustain a chain reaction — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
const ml = 200 / U_MEV;
add('massloss-num', num({
  stem: 'A fission releases 200 MeV. What mass, in u, disappears in the process (3 significant figures)? (1 u = 931.5 MeV.)',
  value: Number(dec(ml, 3)), tol: 0.002, unit: 'u',
  sol: r`$\Delta m = \dfrac{200}{931.5} = ${dec(ml, 3)}$ u (less than 0.1% of the uranium nucleus’s mass).`,
  scheme: [['Δm = Q/931.5', 1], ['≈ 0.215 u', 1]],
  marks: 2, d: 2, c: 'application', t: [2, 3],
}), (q) => near(ml, q.answer.value) || 'ml');
add('origin-short', short({
  marks: 2,
  stem: 'When a uranium nucleus at rest splits, the two fragments fly apart with large kinetic energies. Where does this energy come from?',
  model: 'The total **mass** of the fragments and neutrons is **less** than the mass of the original nucleus and neutron. The **lost mass** Δm has become energy $\Delta m c^2$, appearing mainly as the **kinetic energy** of the fragments, which are pushed apart by their electrostatic repulsion. Equivalently, the fragments are **more tightly bound**.',
  sol: 'Mass defect → kinetic energy.',
  scheme: [['Products have less mass', 1], ['Δm c² appears as kinetic energy (fragments more tightly bound)', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('compare-short3', short({
  marks: 3,
  stem: 'Give three differences between nuclear fission and nuclear fusion.',
  model: '(1) **Fission** splits a **heavy** nucleus into two medium ones; **fusion** joins **light** nuclei. (2) Fission is triggered by a **slow neutron** at ordinary temperatures; fusion needs **very high temperatures** (10⁷–10⁸ K) to overcome Coulomb repulsion. (3) Fission releases about **0.85 MeV per nucleon** and leaves long-lived **radioactive waste**; fusion releases about **3.5 MeV per nucleon** with little long-lived waste.',
  sol: 'Nuclei involved, conditions, energy/waste.',
  scheme: [['Heavy split vs light join', 1], ['Slow neutron vs high temperature', 1], ['Energy per nucleon or waste', 1]],
  d: 2, c: 'understanding', t: [3],
}));

// ================================================================ further application items (competency balance)
const c3 = { dm: 3 * MASS.He4 - MASS.C12 };
c3.E = c3.dm * U_MEV;
add('threealpha-num', num({
  stem: 'How much energy, in MeV, is needed to split a ¹²C nucleus into three ⁴He nuclei? (Atomic masses: ¹²C 12.000000 u, ⁴He 4.002603 u; 1 u = 931.5 MeV.) Give 3 significant figures.',
  value: Number(dec(c3.E, 3)), tol: 0.05, unit: 'MeV',
  sol: r`Mass after $= 3 \times 4.002603 = 12.007809$ u, more than 12.000000 u, so energy must be supplied: $\Delta m = 12.007809 - 12.000000 = ${dec(c3.dm, 4)}$ u; $E = ${dec(c3.dm, 4)} \times 931.5 \approx ${dec(c3.E, 3)}$ MeV.`,
  scheme: [['Products heavier by 0.007809 u', 1], ['E ≈ 7.27 MeV must be supplied', 1]],
  marks: 2, d: 4, c: 'analysis', t: [2],
}), (q) => near(c3.E, q.answer.value) && near(c3.E, 7.274) || `c3 ${c3.E}`);
add('ironsplit-mcq', mcq({
  stem: 'Which of these nuclear processes could NOT release energy?',
  right: 'Splitting a ⁵⁶Fe nucleus into two ²⁸Al nuclei',
  wrong: ['Splitting a ²³⁶U nucleus into two medium-mass nuclei', 'Fusing two ²H nuclei into ⁴He', 'Fusing ²H and ³H into ⁴He and a neutron'],
  sol: '⁵⁶Fe is at the peak of the BE-per-nucleon curve; splitting it moves the products down the curve, so energy must be supplied — option (@K).',
  d: 3, c: 'application', t: [3],
}));
const ra = { R: 3.6 };
ra.A = (ra.R / 1.2) ** 3;
add('Afind-num', num({
  stem: 'A nucleus has a radius of 3.6 fm. Find its mass number. (R₀ = 1.2 fm.)',
  value: Math.round(ra.A), tol: 0.5, unit: '',
  sol: r`$A = \left(\dfrac{R}{R_0}\right)^3 = \left(\dfrac{3.6}{1.2}\right)^3 = 3^3 = ${Math.round(ra.A)}$.`,
  scheme: [['A = (R/R₀)³', 1], ['A = 27', 1]],
  marks: 2, d: 2, c: 'application', t: [1],
}), (q) => near(ra.A, 27) && q.answer.value === 27 || `ra ${ra.A}`);
const er = (17.6 / 5) / (200 / 236);
add('perkg-num', num({
  stem: 'D–T fusion releases 17.6 MeV per reaction (5 nucleons); U-235 fission releases 200 MeV per fission (236 nucleons, counting the neutron). Find the ratio of energy released per nucleon (and so roughly per kilogram of fuel), fusion : fission (3 significant figures).',
  value: Number(dec(er, 3)), tol: 0.03, unit: '',
  sol: r`Fusion: $\dfrac{17.6}{5} = 3.52$ MeV per nucleon. Fission: $\dfrac{200}{236} \approx 0.847$ MeV per nucleon. Ratio $= \dfrac{3.52}{0.847} \approx ${dec(er, 3)}$.`,
  scheme: [['Energy per nucleon for each', 1], ['Ratio ≈ 4.15', 1]],
  marks: 2, d: 4, c: 'analysis', t: [3],
}), (q) => near(er, q.answer.value) || `er ${er}`);
const cl = { E: 3.0e10, perKg: ((1000 / 235) * NA) * 200 * 1.6e-13 };
cl.g = (cl.E / cl.perKg) * 1000;
add('coal-num', num({
  stem: 'Burning one tonne of coal releases about 3.0 × 10¹⁰ J. What mass of U-235, in grams, would release the same energy by complete fission at 200 MeV per fission (3 significant figures)? (N_A = 6.02 × 10²³ mol⁻¹, 1 MeV = 1.6 × 10⁻¹³ J.)',
  value: Number(dec(cl.g, 3)), tol: 0.005, unit: 'g',
  sol: r`Energy per kg of U-235 $= \dfrac{1000}{235} \times 6.02 \times 10^{23} \times 200 \times 1.6 \times 10^{-13} \approx ${sci(cl.perKg, 3)}$ J. Mass $= \dfrac{3.0 \times 10^{10}}{${sci(cl.perKg, 3)}} \approx ${sci(cl.g / 1000, 3)}$ kg, i.e. $${sci(cl.g / 1000, 3)} \times 10^{3} = ${dec(cl.g, 3)}$ g.`,
  scheme: [['Energy per kg ≈ 8.20 × 10¹³ J', 1], ['≈ 0.366 g', 1]],
  marks: 2, d: 3, c: 'application', t: [3],
}), (q) => near(cl.g, q.answer.value) && near(cl.g, 0.366) || `cl ${cl.g}`);
const pc = { dm: MASS.H2 + MASS.H3 - MASS.He4 - MN, m: MASS.H2 + MASS.H3 };
pc.pct = (pc.dm / pc.m) * 100;
add('percent-num', num({
  stem: 'In the fusion ²H + ³H → ⁴He + n, what percentage of the initial mass (2.014102 u + 3.016049 u) is converted into energy? The mass lost is 0.018883 u. Give 3 significant figures.',
  value: Number(dec(pc.pct, 3)), tol: 0.003, unit: '%',
  sol: r`$\dfrac{0.018883}{2.014102 + 3.016049} \times 100 = \dfrac{0.018883}{5.030151} \times 100 \approx ${dec(pc.pct, 3)}$%.`,
  scheme: [['Δm/m × 100', 1], ['≈ 0.375 %', 1]],
  marks: 2, d: 3, c: 'application', t: [3],
}), (q) => near(pc.pct, q.answer.value) && near(pc.dm, 0.018883, 0.001) || `pc ${pc.pct}`);
