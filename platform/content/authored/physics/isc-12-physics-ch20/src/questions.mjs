// ISC 12 Physics ch20 Nuclei and Nuclear Energy — question bank (ISC style).
// Constants as stated in the stems: m_H = 1.007825 u, mₙ = 1.008665 u, 1 u = 931.5 MeV, mₑc² = 0.511 MeV, hc = 1240 MeV fm,
// 1 MeV = 1.6 × 10⁻¹³ J, R₀ = 1.2 fm or 1.25 fm (as stated), mass of a nucleon 1.67 × 10⁻²⁷ kg, 1/4πε₀ = 9 × 10⁹ N m² C⁻².
// Numbers computed here and re-solved independently: binding energies by the nuclear-mass route (Z mₚ + N mₙ − (M − Z mₑ));
// radii and densities by direct volume; Q values by summing masses; thresholds from 2 mₑc². Radioactive decay and the decay law
// are not in this ISC chapter and are not used. Details of the chain reaction and quantitative reactor operation are ISC
// removed topics and are not examined.
import { mk, add, r, dec, sci, near } from '../../isc-12-physics-ch01/src/lib.mjs';
import { NUC, MH, MN, MP, MEU, UMEV, MEC2, HCMEVFM, EE, R0, KB, dmU, be, bea, beNuc, rad, rho, rho0, nu, nk, NEUTRON, barrierMeV, thermalEV } from './svgs.mjs';

const { mcq, ar, tf, fill, match, num, short, long } = mk;
const MS = '(m_H = 1.007825 u, mₙ = 1.008665 u, 1 u = 931.5 MeV)';
const MEV = 1.6e-13; // J
const sumM = (a) => a.reduce((s, x) => s + x, 0);

// ================================================================ t01 composition, size and density, isotopes/isobars/isotones, u
add('isotones-mcq', mcq({
  stem: 'Isotones are nuclides with the same number of neutrons. Which of these pairs of nuclides are isotones?',
  right: `${nu(37, 17, 'Cl')} and ${nu(39, 19, 'K')}`,
  wrong: [`${nu(35, 17, 'Cl')} and ${nu(37, 17, 'Cl')}`, `${nu(40, 18, 'Ar')} and ${nu(40, 20, 'Ca')}`, `${nu(12, 6, 'C')} and ${nu(14, 6, 'C')}`],
  sol: `N = A − Z. ${nu(37, 17, 'Cl')} has 37 − 17 = 20 neutrons and ${nu(39, 19, 'K')} has 39 − 19 = 20: isotones. The chlorine pair and the carbon pair share Z (isotopes); the argon–calcium pair shares A (isobars) — option (@K).`,
  d: 2, c: 'application', t: [1],
}), () => 37 - 17 === 39 - 19 && 35 - 17 !== 37 - 17 && 40 - 18 !== 40 - 20 && 12 - 6 !== 14 - 6 || 'iso');
add('halfradius-mcq', mcq({
  stem: `The nucleus of copper-64 (${nu(64, 29, 'Cu')}) has radius R. A nucleus of radius R/2 has a mass number of`,
  right: '8',
  wrong: ['32', '16', '128'],
  sol: r`$R \propto A^{1/3}$, so $\dfrac{A'}{64} = \left(\dfrac{1}{2}\right)^3 = \dfrac{1}{8}$ and $A' = 8$ — option (@K). Halving A (32) or quartering it (16) would only reduce the radius by 2^(1/3) or 4^(1/3).`,
  d: 3, c: 'application', t: [1],
}), () => near(64 * (0.5) ** 3, 8, 1e-9) && near(rad(8) / rad(64), 0.5, 1e-9) || 'half');
add('amu-mcq', mcq({
  stem: 'The unified atomic mass unit (u) is defined as',
  right: 'one twelfth of the mass of a neutral carbon-12 atom',
  wrong: ['the mass of one proton at rest', 'one twelfth of the mass of the nucleus of a carbon-12 atom', 'one sixteenth of the mass of a neutral oxygen-16 atom'],
  sol: 'By definition 1 u is 1/12 of the mass of a neutral ¹²C atom (nucleus plus its six electrons), so the atomic mass of ¹²C is exactly 12 u — option (@K). A proton is 1.007276 u, and the older oxygen-16 scale is no longer used.',
  d: 1, c: 'recall', t: [1],
}));
add('isotone-fill', fill({
  stem: `Carbon-14 (${nu(14, 6, 'C')}) and oxygen-16 (${nu(16, 8, 'O')}) each have 8 neutrons but different numbers of protons. Nuclides related in this way are called ___.`,
  acc: [['isotones']],
  sol: `**Isotones**: N = 14 − 6 = 16 − 8 = 8, with different Z (6 and 8).`,
  d: 1, c: 'understanding', t: [1],
}), () => 14 - 6 === 16 - 8 || 'f');
add('isotoperadius-tf', tf({
  stem: 'Two isotopes of an element have the same nuclear radius, because they have the same number of protons.',
  key: 'f',
  sol: r`False. The radius depends on the mass number: $R = R_0A^{1/3}$. Isotopes have the same Z but different A (different numbers of neutrons), so the heavier isotope has the larger radius.`,
  d: 2, c: 'understanding', t: [1],
}), () => rad(37) > rad(35) || 'tf');
add('density-ar', ar({
  a: `The mass density of the nucleus of uranium-238 (${nu(238, 92, 'U')}) is about the same as that of helium-4 (${nu(4, 2, 'He')}).`,
  r: 'The radius of a nucleus is directly proportional to its mass number.',
  key: 'c',
  sol: r`A is true, R is false. The radius grows only as the cube root of the mass number, $R = R_0A^{1/3}$; that makes the volume, not the radius, proportional to $A$, and since the mass is also proportional to $A$, every nucleus has about the same density (about $2.3 \times 10^{17}$ kg m⁻³) — option (c).`,
  d: 2, c: 'understanding', t: [1],
}), () => near(rho(238, 1.2), rho(4, 1.2), 1e-9) || 'dar');
const sn = { A: 120, R: rad(120, 1.2) };
add('radiussn-num', num({
  stem: `Find the radius of the nucleus of tin-120 (${nu(120, 50, 'Sn')}) in fm, to 3 significant figures. (R₀ = 1.2 fm)`,
  value: Number(dec(sn.R, 3)), tol: 0.02, unit: 'fm',
  sol: r`$R = R_0A^{1/3} = 1.2 \times 120^{1/3} = 1.2 \times ${dec(Math.cbrt(120), 4)} = ${dec(sn.R, 3)}$ fm.`,
  scheme: [['R = 1.2 × 120^(1/3) = 5.92 fm', 1]],
  d: 1, c: 'application', t: [1],
}), (q) => near(Math.cbrt(120 * 1.2 ** 3), q.answer.value, 0.004) || 'sn');
const nc = { R: 5.0, r0: 1.25 };
nc.A = (nc.R / nc.r0) ** 3;
add('nucleons-num', num({
  stem: 'A nucleus has a radius of 5.0 fm. Taking R₀ = 1.25 fm, find its mass number.',
  value: 64, tol: 0.5, unit: null,
  sol: r`$A^{1/3} = \dfrac{R}{R_0} = \dfrac{5.0}{1.25} = 4$, so $A = 4^3 = ${Math.round(nc.A)}$.`,
  scheme: [['A^(1/3) = R/R₀ = 4', 1]],
  d: 2, c: 'application', t: [1],
}), (q) => near(rad(q.answer.value, 1.25), 5.0, 1e-9) || 'nc');
const mb = { r0: 1.25, V: 4.0e-2 * 3.0e-2 * 1.5e-2 };
mb.rho = rho0(mb.r0);
mb.m = mb.rho * mb.V;
add('matchbox-num', num({
  stem: 'A matchbox measures 4.0 cm × 3.0 cm × 1.5 cm. Nuclear matter has the density 3m/(4πR₀³) of a nucleus. Taking R₀ = 1.25 fm and the mass of a nucleon as m = 1.67 × 10⁻²⁷ kg, find the mass of nuclear matter that would fill the box, in units of 10¹² kg (3 significant figures).',
  value: Number(dec(mb.m / 1e12, 3)), tol: 0.02, unit: '10¹² kg',
  sol: r`$\rho = \dfrac{3 \times 1.67 \times 10^{-27}}{4\pi(1.25 \times 10^{-15})^3} = ${sci(mb.rho, 3)}$ kg m⁻³. Volume $= 4.0 \times 3.0 \times 1.5 = 18$ cm³ $= 1.8 \times 10^{-5}$ m³. Mass $= ${sci(mb.rho, 3)} \times 1.8 \times 10^{-5} = ${sci(mb.m, 3)}$ kg $= ${dec(mb.m / 1e12, 3)}$ in units of $10^{12}$ kg (about 3.7 thousand million tonnes).`,
  scheme: [['ρ = 3m/(4πR₀³) = 2.04 × 10¹⁷ kg m⁻³', 1], ['m = ρV = 3.67 × 10¹² kg', 1]],
  marks: 2, d: 3, c: 'application', t: [1],
}), (q) => near((1.67e-27 / ((4 / 3) * Math.PI * (1.25e-15) ** 3)) * 1.8e-5 / 1e12, q.answer.value, 0.003) || 'mb');
const fr = { Rn: rad(64, 1.2) * 1e-15, Ra: 1.40e-10 };
fr.f = (fr.Rn / fr.Ra) ** 3;
add('fraction-num', num({
  stem: `The radius of a zinc atom is 1.40 × 10⁻¹⁰ m. What fraction of the volume of the atom is taken up by its nucleus ${nu(64, 30, 'Zn')}? Give the answer in units of 10⁻¹⁴ (3 significant figures). (R₀ = 1.2 fm)`,
  value: Number(dec(fr.f / 1e-14, 3)), tol: 0.03, unit: '10⁻¹⁴',
  sol: r`Nuclear radius $R = 1.2 \times 64^{1/3} = 4.8$ fm $= 4.8 \times 10^{-15}$ m. Fraction of volume $= \left(\dfrac{R}{R_{\text{atom}}}\right)^3 = \left(\dfrac{4.8 \times 10^{-15}}{1.40 \times 10^{-10}}\right)^3 = (${sci(fr.Rn / fr.Ra, 3)})^3 = ${sci(fr.f, 3)}$; in units of $10^{-14}$ this is $\dfrac{${sci(fr.f, 3)}}{10^{-14}} = ${dec(fr.f / 1e-14, 3)}$: the atom is almost entirely empty space.`,
  scheme: [['R = 4.8 × 10⁻¹⁵ m', 1], ['Volume ratio = (R/R_atom)³ = 4.03 × 10⁻¹⁴', 1]],
  marks: 2, d: 3, c: 'analysis', t: [1],
}), (q) => near(((4 / 3) * Math.PI * (4.8e-15) ** 3) / ((4 / 3) * Math.PI * (1.4e-10) ** 3) / 1e-14, q.answer.value, 0.005) || 'fr');
add('nuclide-match', match({
  stem: 'Match each nuclide in Column A with the number of neutrons in its nucleus in Column B.',
  pairs: [
    [nu(14, 6, 'C'), '8 neutrons'],
    [nu(23, 11, 'Na'), '12 neutrons'],
    [nu(59, 27, 'Co'), '32 neutrons'],
    [nu(207, 82, 'Pb'), '125 neutrons'],
  ],
  order: [1, 3, 0, 2],
  sol: 'N = A − Z: ¹⁴C 14 − 6 = 8 (1 → q); ²³Na 23 − 11 = 12 (2 → s); ⁵⁹Co 59 − 27 = 32 (3 → p); ²⁰⁷Pb 207 − 82 = 125 (4 → r).',
  d: 1, c: 'understanding', t: [1],
}), () => [14 - 6, 23 - 11, 59 - 27, 207 - 82].join() === '8,12,32,125' || 'nm');
add('classify-short2', short({
  marks: 2,
  stem: `Name the relation between the nuclides in each pair, with a reason: (a) ${nu(24, 11, 'Na')} and ${nu(24, 12, 'Mg')}; (b) ${nu(32, 15, 'P')} and ${nu(33, 16, 'S')}.`,
  model: '(a) Isobars: both have mass number 24 (same number of nucleons) but different atomic numbers, 11 and 12. (b) Isotones: phosphorus-32 has 32 − 15 = 17 neutrons and sulphur-33 has 33 − 16 = 17 neutrons, the same number, while their proton numbers differ.',
  sol: 'Same A → isobars; same N → isotones.',
  scheme: [['(a) isobars: same A = 24', 1], ['(b) isotones: N = 17 for both', 1]],
  d: 2, c: 'application', t: [1],
}), () => 24 === 24 && 32 - 15 === 33 - 16 || 'cl');
const dz = { m: 1.67e-27, r0: 1.2 };
dz.rho = rho0(dz.r0, dz.m);
add('density-short3', short({
  marks: 3,
  stem: 'Using the empirical formula for the radius of a nucleus, prove that nuclear matter has the same density whatever the mass number of the nucleus, and evaluate that density. (R₀ = 1.2 fm, mass of a nucleon 1.67 × 10⁻²⁷ kg)',
  model: r`A nucleus of mass number A has mass $\approx Am$ and radius $R = R_0A^{1/3}$, so its volume is $\dfrac{4}{3}\pi R_0^3A$. Then $\rho = \dfrac{Am}{\frac{4}{3}\pi R_0^3A} = \dfrac{3m}{4\pi R_0^3}$: A cancels, so ρ is the same for every nucleus. Numerically $\rho = \dfrac{3 \times 1.67 \times 10^{-27}}{4\pi(1.2 \times 10^{-15})^3} = ${sci(dz.rho, 3)}$ kg m⁻³.`,
  sol: 'Mass ∝ A and volume ∝ A, so ρ = 3m/(4πR₀³).',
  scheme: [['Mass ≈ Am; volume = (4/3)πR₀³A', 1], ['A cancels: ρ = 3m/(4πR₀³), independent of A', 1], ['ρ = 2.31 × 10¹⁷ kg m⁻³', 1]],
  d: 2, c: 'understanding', t: [1], wl: null,
}), () => near(dz.rho, 2.307e17, 0.002) && near(rho(27, 1.2), rho(216, 1.2), 1e-9) && near(rho(27, 1.2), dz.rho, 1e-9) || 'dz');
const uq = { m: 1.66054e-27, c: 2.99792e8, e: 1.60218e-19 };
uq.MeV = (uq.m * uq.c ** 2) / uq.e / 1e6;
add('unit-short3', short({
  marks: 3,
  stem: 'Define the unified atomic mass unit. Using 1 u = 1.66054 × 10⁻²⁷ kg, c = 2.99792 × 10⁸ m s⁻¹ and 1 eV = 1.60218 × 10⁻¹⁹ J, show that the energy equivalent of 1 u is about 931.5 MeV.',
  model: r`One unified atomic mass unit is one twelfth of the mass of a neutral carbon-12 atom. $E = mc^2 = 1.66054 \times 10^{-27} \times (2.99792 \times 10^{8})^2 = ${sci(uq.m * uq.c ** 2, 4)}$ J $= \dfrac{${sci(uq.m * uq.c ** 2, 4)}}{1.60218 \times 10^{-13}}$ MeV $= ${dec(uq.MeV, 4)}$ MeV $\approx 931.5$ MeV.`,
  sol: 'Definition; E = mc²; convert joules to MeV.',
  scheme: [['1 u = 1/12 of the mass of a neutral ¹²C atom', 1], ['E = mc² = 1.4924 × 10⁻¹⁰ J', 1], ['÷ 1.60218 × 10⁻¹³ J per MeV = 931.5 MeV', 1]],
  d: 2, c: 'application', t: [1], wl: null,
}), () => near(uq.MeV, 931.5, 0.0005) || `u ${uq.MeV}`);

// ================================================================ t02 E = mc², mass defect, binding energy, pairs
add('defect-mcq', mcq({
  stem: r`For a nucleus of mass number $A$ and atomic number $Z$ and mass $M$, with proton mass $m_p$ and neutron mass $m_n$, the mass defect is`,
  right: r`$Zm_p + (A - Z)m_n - M$`,
  wrong: [r`$M - Zm_p - (A - Z)m_n$`, r`$(A - Z)m_p + Zm_n - M$`, r`$A(m_p + m_n) - M$`],
  sol: r`The mass defect is the mass of the separate nucleons ($Z$ protons and $A - Z$ neutrons) minus the mass of the nucleus — option (@K). The reverse order would be negative; the other two use the wrong number of each nucleon.`,
  d: 1, c: 'recall', t: [2],
}));
add('bind-mcq', mcq({
  stem: 'The binding energy of a nucleus is',
  right: 'the energy needed to separate the nucleus completely into its free protons and neutrons',
  wrong: ['the energy needed to remove the electrons from the atom', 'the kinetic energy with which the nucleons move about inside the nucleus', 'the total energy released when the nucleus emits one gamma ray'],
  sol: 'Binding energy = (mass defect) × c²: the work needed to pull all the nucleons apart, equal to the energy released when they come together to form the nucleus — option (@K). Removing electrons is ionisation, which involves eV, not MeV.',
  d: 1, c: 'recall', t: [2],
}));
const th = { lam: HCMEVFM / (2 * MEC2) };
add('threshold-mcq', mcq({
  stem: 'Pair production needs a photon of at least 1.022 MeV. Taking hc = 1240 MeV fm, the longest wavelength of a photon that can produce an electron–positron pair is about',
  right: '1.21 pm',
  wrong: ['2.43 pm', '0.61 pm', '4.86 pm'],
  sol: r`$\lambda_{\max} = \dfrac{hc}{E_{\min}} = \dfrac{1240\ \text{MeV fm}}{1.022\ \text{MeV}} = ${dec(th.lam, 4)}$ fm $= ${dec(th.lam / 1000, 3)}$ pm — option (@K). 2.43 pm is the wavelength of one annihilation photon (0.511 MeV); 0.61 pm would need 2.04 MeV.`,
  d: 3, c: 'application', t: [2],
}), () => near(th.lam / 1000, 1.21, 0.005) && near(HCMEVFM / MEC2 / 1000, 2.43, 0.003) || 'th');
add('pair-ar', ar({
  a: 'A photon of energy 0.80 MeV cannot produce an electron–positron pair, however close it passes to a nucleus.',
  r: 'The rest energy of an electron and a positron together is 1.022 MeV, more than the photon’s energy.',
  key: 'a',
  sol: 'Both are true, and R explains A: the photon cannot supply the 2 × 0.511 = 1.022 MeV needed just to create the two particles at rest, and the nucleus can only take up momentum, not provide energy — option (a).',
  d: 2, c: 'understanding', t: [2],
}), () => 0.80 < 2 * MEC2 || 'par');
add('spring-tf', tf({
  stem: 'A tightly compressed spring has very slightly more mass than the same spring when it is relaxed.',
  key: 't',
  sol: 'True. The extra elastic energy stored in the spring has an equivalent mass E/c² (about 10⁻¹⁷ kg or less for ordinary springs: far too small to weigh), by E = mc².',
  d: 2, c: 'understanding', t: [2],
}));
const ca = { k: 'Ca40', free: 20 * MH + 20 * MN };
ca.dm = dmU('Ca40');
ca.B = be('Ca40');
add('ca40-num', num({
  stem: `The atomic mass of calcium-40 (${nk('Ca40')}) is 39.962591 u. Find its binding energy in MeV, to 3 significant figures. ${MS}`,
  value: Number(dec(ca.B, 3)), tol: 0.6, unit: 'MeV',
  sol: r`Separate parts: $20 \times 1.007825 + 20 \times 1.008665 = ${dec(ca.free, 8)}$ u. $\Delta m = ${dec(ca.free, 8)} - 39.962591 = ${dec(ca.dm, 6)}$ u. $B = ${dec(ca.dm, 6)} \times 931.5 = ${dec(ca.B, 4)}$ MeV.`,
  scheme: [['Δm = 20 m_H + 20 mₙ − M = 0.367209 u', 1], ['B = 0.367209 × 931.5 = 342 MeV', 1]],
  marks: 2, d: 2, c: 'application', t: [2],
}), (q) => near(beNuc('Ca40'), q.answer.value, 0.002) || 'ca');
const mg = { dm: dmU('Mg24') };
add('mgdefect-num', num({
  stem: `The atomic mass of magnesium-24 (${nk('Mg24')}) is 23.985042 u. Find its mass defect in u, to 4 significant figures. (m_H = 1.007825 u, mₙ = 1.008665 u)`,
  value: Number(dec(mg.dm, 4)), tol: 0.0003, unit: 'u',
  sol: r`$\Delta m = 12 \times 1.007825 + 12 \times 1.008665 - 23.985042 = 24.197880 - 23.985042 = ${dec(mg.dm, 6)}$ u $\approx ${dec(mg.dm, 4)}$ u.`,
  scheme: [['Δm = 24.197880 − 23.985042 = 0.2128 u', 1]],
  d: 1, c: 'application', t: [2],
}), (q) => near(beNuc('Mg24') / UMEV, q.answer.value, 0.002) || 'mg');
const ns = { dm: NUC.Ca39.M + MN - NUC.Ca40.M };
ns.E = ns.dm * UMEV;
add('neutronsep-num', num({
  stem: `Calcium-40 (${nk('Ca40')}, atomic mass 39.962591 u) is split into calcium-39 (${nk('Ca39')}, 38.970710 u) and a neutron. What energy must be supplied to remove the neutron, in MeV (3 significant figures)? (mₙ = 1.008665 u, 1 u = 931.5 MeV)`,
  value: Number(dec(ns.E, 3)), tol: 0.2, unit: 'MeV',
  sol: r`Mass after $= 38.970710 + 1.008665 = ${dec(NUC.Ca39.M + MN, 8)}$ u; the extra mass is $\Delta m = ${dec(NUC.Ca39.M + MN, 8)} - 39.962591 = ${dec(ns.dm, 6)}$ u. Energy needed $= ${dec(ns.dm, 6)} \times 931.5 = ${dec(ns.E, 4)}$ MeV. (The nucleus must be given this much energy: it is the binding energy of the last neutron.)`,
  scheme: [['Δm = (M₃₉ + mₙ) − M₄₀ = 0.016784 u', 1], ['E = 0.016784 × 931.5 = 15.6 MeV', 1]],
  marks: 2, d: 4, c: 'analysis', t: [2],
}), (q) => near((beNuc('Ca40') - beNuc('Ca39')), q.answer.value, 0.01) || `ns ${beNuc('Ca40') - beNuc('Ca39')}`);
const mi = { dm: (NUC.H3.Z * MH + 2 * MN - NUC.H3.M) - (2 * MH + MN - NUC.He3.M) };
mi.E = mi.dm * UMEV;
add('mirror-num', num({
  stem: `The atomic masses of tritium (${nk('H3')}) and helium-3 (${nk('He3')}) are 3.016049 u and 3.016029 u. Find how much larger the binding energy of tritium is than that of helium-3, in MeV (3 significant figures). ${MS}`,
  value: Number(dec(mi.E, 3)), tol: 0.02, unit: 'MeV',
  sol: r`Tritium: $\Delta m = 1.007825 + 2 \times 1.008665 - 3.016049 = ${dec(1 * MH + 2 * MN - NUC.H3.M, 6)}$ u. Helium-3: $\Delta m = 2 \times 1.007825 + 1.008665 - 3.016029 = ${dec(2 * MH + MN - NUC.He3.M, 6)}$ u. Difference $= ${dec(mi.dm, 6)}$ u $\times 931.5 = ${dec(mi.E, 3)}$ MeV. Helium-3, with two protons repelling each other, is slightly less tightly bound.`,
  scheme: [['Δm(³H) = 0.009106 u and Δm(³He) = 0.008286 u', 1], ['Difference 0.000820 u × 931.5 = 0.764 MeV', 1]],
  marks: 2, d: 4, c: 'analysis', t: [2],
}), (q) => near(beNuc('H3') - beNuc('He3'), q.answer.value, 0.02) || `mi ${beNuc('H3') - beNuc('He3')}`);
const pm = { E: 1.0 * MEV, c: 3.0e8 };
pm.m = pm.E / pm.c ** 2;
add('photonmass-num', num({
  stem: 'Find the mass equivalent of the energy of 1.0 MeV, in units of 10⁻³⁰ kg (3 significant figures). (1 MeV = 1.6 × 10⁻¹³ J, c = 3.0 × 10⁸ m s⁻¹)',
  value: Number(dec(pm.m / 1e-30, 3)), tol: 0.02, unit: '10⁻³⁰ kg',
  sol: r`$m = \dfrac{E}{c^2} = \dfrac{1.6 \times 10^{-13}}{(3.0 \times 10^{8})^2} = ${sci(pm.m, 3)}$ kg $= ${dec(pm.m / 1e-30, 3)}$ in units of $10^{-30}$ kg (about twice the mass of an electron, 9.1 × 10⁻³¹ kg).`,
  scheme: [['m = E/c² = 1.78 × 10⁻³⁰ kg', 1]],
  d: 2, c: 'application', t: [2],
}), (q) => near(1.6e-13 / 9e16 / 1e-30, q.answer.value, 0.002) || 'pm');
const bu = { P: 100, t: 3.15e7, c: 3.0e8 };
bu.E = bu.P * bu.t;
bu.m = bu.E / bu.c ** 2;
add('bulb-num', num({
  stem: 'A 100 W lamp burns for one year (3.15 × 10⁷ s). What mass would have to be converted completely into energy to supply this, in micrograms (3 significant figures)? (c = 3.0 × 10⁸ m s⁻¹)',
  value: Number(dec(bu.m / 1e-9, 3)), tol: 0.3, unit: 'μg',
  sol: r`$E = Pt = 100 \times 3.15 \times 10^{7} = ${sci(bu.E, 3)}$ J. $m = \dfrac{E}{c^2} = \dfrac{${sci(bu.E, 3)}}{(3.0 \times 10^{8})^2} = ${sci(bu.m, 3)}$ kg $= ${dec(bu.m / 1e-9, 3)}$ μg (1 μg = 10⁻⁹ kg): a speck of dust.`,
  scheme: [['E = Pt = 3.15 × 10⁹ J', 1], ['m = E/c² = 3.50 × 10⁻⁸ kg = 35.0 μg', 1]],
  marks: 2, d: 2, c: 'application', t: [2],
}), (q) => near(100 * 3.15e7 / 9e16 / 1e-9, q.answer.value, 0.003) || 'bu');
const pp = { E: 4.20 };
pp.K = pp.E - 2 * MEC2;
add('pair-num', num({
  stem: 'A photon of energy 4.20 MeV produces an electron–positron pair in the field of a nucleus. Find the total kinetic energy of the pair, in MeV (3 significant figures). (mₑc² = 0.511 MeV; ignore the recoil of the nucleus)',
  value: Number(dec(pp.K, 3)), tol: 0.01, unit: 'MeV',
  sol: r`Energy to create the pair at rest: $2 \times 0.511 = 1.022$ MeV. Kinetic energy of the pair $= 4.20 - 1.022 = ${dec(pp.K, 4)}$ MeV $\approx ${dec(pp.K, 3)}$ MeV.`,
  scheme: [['2mₑc² = 1.022 MeV', 1], ['K = 4.20 − 1.022 = 3.18 MeV', 1]],
  marks: 2, d: 2, c: 'application', t: [2],
}), (q) => near(4.20 - 0.511 - 0.511, q.answer.value, 0.003) || 'pp');
const an = { lam: HCMEVFM / MEC2 };
add('annih-num', num({
  stem: 'An electron and a positron at rest annihilate and produce two photons. Find the wavelength of each photon, in pm (1 pm = 10³ fm), to 3 significant figures. (hc = 1240 MeV fm, mₑc² = 0.511 MeV)',
  value: Number(dec(an.lam / 1000, 3)), tol: 0.01, unit: 'pm',
  sol: r`Each photon takes the rest energy of one particle, 0.511 MeV. $\lambda = \dfrac{hc}{E} = \dfrac{1240}{0.511} = ${dec(an.lam, 4)}$ fm $= ${dec(an.lam / 1000, 3)}$ pm.`,
  scheme: [['E = 0.511 MeV for each photon', 1], ['λ = hc/E = 2.43 pm', 1]],
  marks: 2, d: 2, c: 'application', t: [2],
}), (q) => near(1240 / 0.511 / 1000, q.answer.value, 0.003) || 'an');
add('massdefect-short2', short({
  marks: 2,
  stem: 'Explain, using E = mc², why the mass of a helium-4 nucleus is less than the sum of the masses of its two protons and two neutrons, and what the missing mass represents.',
  model: 'When nucleons bind, energy is released, and by E = mc² the system loses mass equal to that energy divided by c². So the nucleus weighs less than its separate parts. The missing mass, the mass defect, equals the binding energy divided by c²: the energy needed to pull the nucleus apart again.',
  sol: 'Energy released on formation carries away mass Δm = B/c².',
  scheme: [['Energy released when nucleons bind, so the mass falls by E/c²', 1], ['Mass defect ↔ binding energy: needed to separate the nucleons', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('annih-short2', short({
  marks: 2,
  stem: 'Why does the annihilation of an electron and a positron at rest give two photons, not one? State the energy of each photon.',
  model: 'Before annihilation the total momentum is zero. A single photon always carries momentum, so one photon could not conserve it. Two photons moving in opposite directions have momenta that cancel, so momentum is conserved. The rest energy 2 × 0.511 MeV is shared equally: each photon has 0.511 MeV.',
  sol: 'Momentum conservation requires two photons in opposite directions, 0.511 MeV each.',
  scheme: [['Initial momentum zero; one photon would have momentum; two opposite photons cancel', 1], ['Each photon 0.511 MeV', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('pair-short3', short({
  marks: 3,
  stem: 'What is pair production? State the minimum photon energy needed, and explain why the process happens only in the electric field of a nucleus.',
  model: 'In pair production a gamma-ray photon changes into an electron and a positron, so energy becomes mass. The photon must supply at least the rest energy of the two particles, 2mₑc² = 2 × 0.511 = 1.022 MeV; any extra becomes their kinetic energy. A photon alone cannot do it, since energy and momentum could not both be conserved. A nearby nucleus takes up the extra momentum, with almost no energy.',
  sol: 'γ → e⁻ + e⁺ near a nucleus; threshold 1.022 MeV; nucleus for momentum.',
  scheme: [['Photon becomes an electron–positron pair', 1], ['Minimum energy 2mₑc² = 1.022 MeV', 1], ['Nucleus needed to take up momentum', 1]],
  d: 2, c: 'understanding', t: [2],
}));
const he = { dm: 2 * MH + 2 * MN - NUC.He4.M };
he.B = he.dm * UMEV;
add('he4-short3', short({
  marks: 3,
  stem: `The atomic mass of helium-4 is 4.002603 u. Calculate (a) its mass defect and (b) its binding energy, and (c) say what the binding energy means. ${MS}`,
  model: r`(a) $\Delta m = 2 \times 1.007825 + 2 \times 1.008665 - 4.002603 = 4.032980 - 4.002603 = ${dec(he.dm, 6)}$ u. (b) $B = ${dec(he.dm, 6)} \times 931.5 = ${dec(he.B, 4)}$ MeV. (c) It is the energy that must be supplied to separate the nucleus into two protons and two neutrons (and the energy released when they join).`,
  sol: 'Δm = 2m_H + 2mₙ − M; B = Δm × 931.5.',
  scheme: [['Δm = 0.030377 u', 1], ['B = 28.3 MeV', 1], ['Energy needed to separate (released on formation)', 1]],
  d: 2, c: 'application', t: [2], wl: null,
}), () => near(he.B, beNuc('He4'), 0.001) && near(he.B, 28.3, 0.005) || 'he');
const si = { dm: dmU('Si28'), free: 14 * MH + 14 * MN };
si.B = si.dm * UMEV;
si.BA = si.B / 28;
add('si28-long', long({
  stem: `(a) Define mass defect and binding energy of a nucleus, and state how they are related. [2] (b) The atomic mass of silicon-28 (${nk('Si28')}) is 27.976927 u. Find its mass defect and its binding energy. [2] (c) Find the binding energy per nucleon, and state whether silicon-28 is more tightly bound per nucleon than neon-20, for which it is 8.03 MeV. [1] ${MS}`,
  model: r`(a) Mass defect: the total mass of the separate nucleons minus the mass of the nucleus. Binding energy: the energy needed to separate the nucleus into its nucleons; $B = \Delta m\,c^2$.

(b) $\Delta m = 14 \times 1.007825 + 14 \times 1.008665 - 27.976927 = ${dec(si.free, 8)} - 27.976927 = ${dec(si.dm, 6)}$ u. $B = ${dec(si.dm, 6)} \times 931.5 = ${dec(si.B, 4)}$ MeV.

(c) $\dfrac{B}{A} = \dfrac{${dec(si.B, 4)}}{28} = ${dec(si.BA, 3)}$ MeV per nucleon, which is greater than 8.03 MeV, so silicon-28 is more tightly bound per nucleon.`,
  sol: 'Definitions; Δm and B; B/A.',
  scheme: [['Definition of mass defect and of binding energy', 1], ['B = Δm c² (relation)', 1], ['Δm = 0.253933 u', 1], ['B = 236.5 MeV', 1], ['B/A = 8.45 MeV > 8.03 MeV: more tightly bound', 1]],
  d: 3, c: 'application', t: [2], wl: null,
}), () => near(si.B, beNuc('Si28'), 0.001) && si.BA > 8.03 && near(si.BA, 8.448, 0.001) || 'si');
const pl = { E: 2.30 };
pl.K = pl.E - 2 * MEC2;
pl.lam = HCMEVFM / MEC2;
add('pair-long', long({
  stem: '(a) Describe pair production, saying what is needed for it to happen and what the minimum photon energy is. [2] (b) A photon of energy 2.30 MeV produces a pair near a nucleus. Find the total kinetic energy of the electron and the positron. [1] (c) The positron later meets an electron and both annihilate at rest. State the number and the energy of the photons produced, and find their wavelength. [2] (mₑc² = 0.511 MeV, hc = 1240 MeV fm)',
  model: r`(a) A gamma-ray photon passing close to a nucleus changes into an electron and a positron; the nucleus takes up momentum, so that energy and momentum are both conserved. The photon must have at least 2mₑc² = 1.022 MeV.

(b) Kinetic energy of the pair $= 2.30 - 1.022 = ${dec(pl.K, 4)}$ MeV.

(c) Two photons, in opposite directions, each of energy 0.511 MeV. $\lambda = \dfrac{hc}{E} = \dfrac{1240}{0.511} = ${dec(pl.lam, 4)}$ fm $= ${dec(pl.lam / 1000, 3)}$ pm.`,
  sol: 'Threshold 1.022 MeV; K = E − 1.022; two 0.511 MeV photons.',
  scheme: [['Photon → e⁻ + e⁺ near a nucleus (momentum)', 1], ['Minimum energy 1.022 MeV', 1], ['K = 2.30 − 1.022 = 1.278 MeV', 1], ['Two photons of 0.511 MeV in opposite directions', 1], ['λ = 2.43 pm', 1]],
  d: 3, c: 'application', t: [2], wl: null,
}), () => near(pl.K, 1.278, 1e-6) && near(pl.lam / 1000, 2.43, 0.003) || 'pl');

// ================================================================ t03 binding energy per nucleon, stability, why fission and fusion release energy
add('fusionside-mcq', mcq({
  stem: 'On the graph of binding energy per nucleon against mass number, nucleus P lies far to the left of the maximum and nucleus Q far to the right of it. Energy can be released if',
  right: 'P fuses with another light nucleus, or Q splits into two middle-order nuclei',
  wrong: ['P splits into two smaller nuclei, or Q fuses with a heavier nucleus', 'only P can release energy, by fusion; Q cannot release energy by any nuclear process', 'only Q can release energy, by fission; P cannot release energy by any nuclear process'],
  sol: 'Energy is released when nuclei move towards the maximum of the curve (higher B/A). P, on the rising part, gains B/A by fusing into a heavier nucleus; Q, on the falling part, gains B/A by splitting into middle-order fragments. Both are possible — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('ironend-mcq', mcq({
  stem: 'In a massive star, the release of energy by fusion stops when the core has become mostly iron-group nuclei. This is because',
  right: 'iron-group nuclei have the maximum binding energy per nucleon, so fusing them would take in energy instead of releasing it',
  wrong: ['iron nuclei are radioactive and break up as fast as they form', 'iron nuclei have too few protons to repel one another and fuse', 'the temperature of the core always falls below 10⁷ K once iron forms'],
  sol: 'Fusion releases energy only while the product has a higher binding energy per nucleon than the reactants. The curve peaks at iron and nickel (A about 56–62), so fusing them moves nuclei down the curve: energy would have to be supplied — option (@K).',
  d: 3, c: 'analysis', t: [3],
}));
add('fall-mcq', mcq({
  stem: 'For mass numbers above about 60, the binding energy per nucleon falls as A increases, mainly because',
  right: 'the electrostatic repulsion between protons, which acts across the whole nucleus, grows faster than the number of nucleons',
  wrong: ['the strong nuclear force becomes repulsive between nucleons in large nuclei', 'neutrons in large nuclei are heavier than neutrons in small nuclei', 'the strong force has a longer range in heavier nuclei and the nucleons crowd together'],
  sol: 'The strong force is short-range and acts only between near neighbours, so it adds the same binding per nucleon; the electrostatic repulsion acts between every pair of protons, so its total grows faster than A and lowers B/A — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('ratio-ar', ar({
  a: 'Per nucleon, the fusion of light nuclei releases more energy than the fission of heavy nuclei.',
  r: 'On the graph of binding energy per nucleon, the curve rises much more steeply at small mass numbers than it falls at large mass numbers.',
  key: 'a',
  sol: 'Both are true, and R explains A: fusing hydrogen isotopes into helium raises B/A by several MeV per nucleon (1.1 → 7.07 MeV), but fission of uranium raises it by only about 0.9 MeV (7.6 → 8.5) — option (a).',
  d: 3, c: 'analysis', t: [3],
}), () => bea('He4') - bea('H2') > 5 && 8.5 - bea('U235') < 1 || 'rat');
add('nickel-tf', tf({
  stem: 'Two nuclei of nickel-62, the nuclide with the greatest binding energy per nucleon, fusing to form a single nucleus of mass number 124 would release energy.',
  key: 'f',
  sol: 'False. A nucleus with A = 124 lies to the right of the maximum, so its binding energy per nucleon is lower than that of nickel-62; the total binding energy would fall, so energy would have to be supplied.',
  d: 3, c: 'analysis', t: [3],
}), () => bea('Sn120') < bea('Ni62') || 'nk');
const sp = { A: 224, b1: 7.62, b2: 8.46 };
sp.E = sp.A * (sp.b2 - sp.b1);
add('split-num', num({
  stem: 'A heavy nucleus of mass number 224 has a binding energy per nucleon of 7.62 MeV. It splits into two equal fragments, each with a binding energy per nucleon of 8.46 MeV. Estimate the energy released, in MeV (3 significant figures).',
  value: Number(dec(sp.E, 3)), tol: 0.5, unit: 'MeV',
  sol: r`Each fragment has A = 112. Binding energy before: $224 \times 7.62 = ${dec(224 * 7.62, 6)}$ MeV; after: $2 \times 112 \times 8.46 = ${dec(2 * 112 * 8.46, 6)}$ MeV. Energy released $= ${dec(2 * 112 * 8.46, 6)} - ${dec(224 * 7.62, 6)} = ${dec(sp.E, 3)}$ MeV.`,
  scheme: [['Before: 224 × 7.62 = 1706.9 MeV; after: 224 × 8.46 = 1895.0 MeV', 1], ['Energy released = 188 MeV', 1]],
  marks: 2, d: 2, c: 'application', t: [3],
}), (q) => near(2 * 112 * 8.46 - 224 * 7.62, q.answer.value, 0.003) || 'sp');
const fb = { b1: 8.45, b2: 8.64 };
fb.E = 56 * fb.b2 - 2 * 28 * fb.b1;
add('fusionbea-num', num({
  stem: 'In the very hot core of a massive star, two silicon-28 nuclei (binding energy per nucleon 8.45 MeV) can fuse to form one nucleus of nickel-56 (binding energy per nucleon 8.64 MeV). Estimate the energy released in one such fusion, in MeV (3 significant figures).',
  value: Number(dec(fb.E, 3)), tol: 0.1, unit: 'MeV',
  sol: r`Before: $2 \times 28 \times 8.45 = ${dec(2 * 28 * 8.45, 5)}$ MeV. After: $56 \times 8.64 = ${dec(56 * 8.64, 5)}$ MeV. Energy released $= ${dec(56 * 8.64, 5)} - ${dec(2 * 28 * 8.45, 5)} = ${dec(fb.E, 3)}$ MeV (equivalently $56 \times 0.19$).`,
  scheme: [['Before 473.2 MeV, after 483.8 MeV', 1], ['Energy released = 10.6 MeV', 1]],
  marks: 2, d: 3, c: 'application', t: [3],
}), (q) => near(56 * (8.64 - 8.45), q.answer.value, 0.006) || 'fb');
const un = { E: 95 * 8.70 + 140 * 8.40 - 235 * 7.59 };
add('unequal-num', num({
  stem: 'A nucleus of mass number 235 (binding energy per nucleon 7.59 MeV) splits into two unequal fragments, of mass numbers 95 (8.70 MeV per nucleon) and 140 (8.40 MeV per nucleon). Find the energy released, in MeV (3 significant figures).',
  value: Number(dec(un.E, 3)), tol: 0.6, unit: 'MeV',
  sol: r`After: $95 \times 8.70 + 140 \times 8.40 = ${dec(95 * 8.7, 5)} + ${dec(140 * 8.4, 5)} = ${dec(95 * 8.7 + 140 * 8.4, 6)}$ MeV. Before: $235 \times 7.59 = ${dec(235 * 7.59, 6)}$ MeV. Energy released $= ${dec(95 * 8.7 + 140 * 8.4, 6)} - ${dec(235 * 7.59, 6)} = ${dec(un.E, 3)}$ MeV.`,
  scheme: [['After 2002.5 MeV; before 1783.65 MeV', 1], ['Energy released = 219 MeV', 1]],
  marks: 2, d: 3, c: 'application', t: [3],
}), (q) => near(95 * 8.7 + 140 * 8.4 - 235 * 7.59, q.answer.value, 0.003) && 95 + 140 === 235 || 'un');
add('ironstar-short2', short({
  marks: 2,
  stem: 'Explain why a star cannot obtain energy by fusing iron nuclei, although it can obtain it by fusing hydrogen or helium nuclei.',
  model: 'Fusion releases energy only if the binding energy per nucleon increases. For hydrogen and helium the curve rises steeply, so the products are more tightly bound per nucleon. Iron is at the maximum of the curve, so fusing iron nuclei gives a heavier nucleus with lower binding energy per nucleon, and energy would have to be supplied instead.',
  sol: 'B/A rises for light nuclei, peaks at iron.',
  scheme: [['Fusion releases energy only when B/A increases; true for light nuclei', 1], ['Iron is at the maximum: fusing it lowers B/A, absorbing energy', 1]],
  d: 3, c: 'analysis', t: [3],
}));
add('student-short3', short({
  marks: 3,
  stem: 'A student argues: “Fission of uranium releases energy because the nucleus splits. Fusion joins nuclei together, the opposite process, so it must absorb energy.” Evaluate this argument using the binding energy per nucleon curve.',
  model: 'The argument is wrong. What matters is not splitting or joining but the binding energy per nucleon. Uranium lies to the right of the maximum, so splitting moves its fragments up the curve towards iron and releases energy. Hydrogen and other light nuclei lie to the left of the maximum, so joining them also moves the product up the curve, to a higher binding energy per nucleon, and releases energy as well.',
  sol: 'Energy is released when nuclei move towards the maximum of the B/A curve, from either side.',
  scheme: [['What matters is the change in binding energy per nucleon, not splitting or joining', 1], ['Heavy nuclei on the right: fission moves them up the curve', 1], ['Light nuclei on the left: fusion also moves them up, so energy is released', 1]],
  d: 3, c: 'evaluation', t: [3],
}));
const bl = { A: 232, b1: 7.60, b2: 8.40 };
bl.E = bl.A * (bl.b2 - bl.b1);
add('bea-long', long({
  stem: '(a) Draw (describe in words) the graph of binding energy per nucleon against mass number, marking the maximum and the regions of light and heavy nuclei, and state which nuclei are the most stable. [2] (b) Use the graph to explain why energy is released both when a very heavy nucleus splits and when two very light nuclei join. [1] (c) A nucleus of mass number 232 with a binding energy per nucleon of 7.60 MeV splits into two equal fragments, each with 8.40 MeV per nucleon. Estimate the energy released. [2]',
  model: r`(a) B/A (vertical axis, in MeV) rises steeply from about 1 MeV for hydrogen-2 through a bump at helium-4 (7.07 MeV) to a maximum of about 8.8 MeV at A about 56–62 (iron, nickel), then falls slowly to about 7.6 MeV for uranium. The middle-order nuclei near the maximum are the most stable.

(b) Both processes move nuclei towards the maximum: a heavy nucleus splits into middle-order fragments with higher B/A, and light nuclei fuse into a heavier nucleus with higher B/A. The total binding energy increases, and the difference is released.

(c) Before: $232 \times 7.60 = ${dec(232 * 7.6, 6)}$ MeV. After: $232 \times 8.40 = ${dec(232 * 8.4, 6)}$ MeV. Energy released $= ${dec(bl.E, 4)}$ MeV $\approx 186$ MeV.`,
  sol: 'Peak near A = 56–62; both move towards the peak; E = A(b₂ − b₁).',
  scheme: [['Graph: steep rise, maximum about 8.8 MeV near A = 56–62, slow fall', 1], ['Most stable: the middle-order nuclei at the maximum', 1], ['Both fission and fusion move nuclei towards the maximum, raising total binding energy', 1], ['Before 1763.2 MeV, after 1948.8 MeV', 1], ['Energy released ≈ 186 MeV', 1]],
  d: 3, c: 'application', t: [3], wl: null,
}), () => near(232 * 8.4 - 232 * 7.6, bl.E, 1e-9) && near(bl.E, 185.6, 1e-3) || 'bl');

// ================================================================ t04 fission, chain reaction, reactor, bomb
const xn = { A: 1 + 235 - 144 - 89, Z: 92 - 56 - 36 };
add('xneutrons-mcq', mcq({
  stem: `In the fission reaction ${NEUTRON} + ${nu(235, 92, 'U')} → ${nu(144, 56, 'Ba')} + ${nu(89, 36, 'Kr')} + x ${NEUTRON}, the value of x is`,
  right: '3',
  wrong: ['2', '4', '1'],
  sol: `Nucleon number: 1 + 235 = 144 + 89 + x, so x = 236 − 233 = ${xn.A}. Charge: 92 = 56 + 36 balances with no charge carried by the neutrons — option (@K).`,
  d: 1, c: 'application', t: [4],
}), () => xn.A === 3 && xn.Z === 0 || 'xn');
add('poormod-mcq', mcq({
  stem: 'A moderator slows neutrons down by collisions. Which of these materials would be the poorest moderator?',
  right: 'lead, whose nuclei are very much heavier than a neutron',
  wrong: ['graphite, whose carbon nuclei are about 12 times as heavy as a neutron', 'heavy water, whose deuterium nuclei are about twice as heavy as a neutron', 'ordinary water, whose hydrogen nuclei have almost the same mass as a neutron'],
  sol: 'A neutron loses a large share of its energy only in collisions with nuclei of comparable mass (like a ball hitting a ball of equal mass). Off a very heavy lead nucleus it bounces back with almost all its energy, so lead is the poorest moderator — option (@K).',
  d: 3, c: 'analysis', t: [4],
}));
add('nomod-mcq', mcq({
  stem: 'In a reactor that burns natural-type uranium fuel, the moderator is accidentally drained away while the fuel stays in place. The chain reaction will',
  right: 'die away, because the fast neutrons are no longer slowed enough to cause fission in uranium-235',
  wrong: ['speed up, because there is nothing left to absorb the fission neutrons', 'speed up, because fast neutrons are more likely than slow ones to cause fission in uranium-235', 'be unaffected, because the control rods alone decide how many neutrons are produced'],
  sol: 'Slow (thermal) neutrons are far more likely than fast ones to cause fission in U-235. Without the moderator the neutrons stay fast, fewer fissions follow, and the chain reaction fades — option (@K). The control rods only absorb neutrons; they do not slow them.',
  d: 3, c: 'analysis', t: [4],
}));
add('shield-mcq', mcq({
  stem: 'The thick concrete and steel walls built around a nuclear reactor core mainly serve to',
  right: 'absorb the neutrons and gamma rays that would otherwise reach people outside',
  wrong: ['slow the neutrons so that they cause more fissions inside the core', 'carry the heat from the core to the turbine', 'remove the excess neutrons so that the chain reaction stays controlled'],
  sol: 'This is the shielding. Slowing neutrons is the moderator, carrying heat away is the coolant, and removing neutrons to control the rate is the job of the control rods — option (@K).',
  d: 1, c: 'recall', t: [4],
}));
add('chain-ar', ar({
  a: 'In a nuclear reactor operating at a steady power, every neutron released in a fission goes on to cause another fission.',
  r: 'For a steady chain reaction, on average only one neutron from each fission must go on to cause another fission.',
  key: 'd',
  sol: 'A is false, R is true. Each fission releases two or three neutrons; if all of them caused further fissions the rate would multiply from one generation to the next. At steady power only one per fission does so on average, and the surplus is absorbed by the control rods and other materials or escapes — option (d).',
  d: 2, c: 'understanding', t: [4],
}));
add('rods-fill', fill({
  stem: 'The power of a reactor is regulated by pushing rods of cadmium or boron, which absorb neutrons strongly, further into the core. These are called ___ rods.',
  acc: [['control', 'control rod', 'control rods']],
  sol: '**Control rods**: pushed in, they absorb more neutrons and lower the rate of fission; pulled out, they let it rise.',
  d: 1, c: 'recall', t: [4],
}));
add('fastn-tf', tf({
  stem: 'Fast neutrons are more likely than slow neutrons to cause the fission of a uranium-235 nucleus.',
  key: 'f',
  sol: 'False. Slow (thermal) neutrons are much more likely to be captured by a U-235 nucleus and cause fission; that is why a moderator is used to slow the fast neutrons released in fission.',
  d: 2, c: 'understanding', t: [4],
}));
const fq = { react: [NUC.U235.M, MN], prod: [139.917283, 92.922039, 3 * MN] };
fq.dm = sumM(fq.react) - sumM(fq.prod);
fq.Q = fq.dm * UMEV;
add('fissionq-num', num({
  stem: `Find the energy released, in MeV (3 significant figures), when a uranium-235 nucleus absorbs a neutron and splits as ${NEUTRON} + ${nu(235, 92, 'U')} → ${nu(140, 55, 'Cs')} + ${nu(93, 37, 'Rb')} + 3 ${NEUTRON}. (Atomic masses: ²³⁵U 235.043930 u, ¹⁴⁰Cs 139.917283 u, ⁹³Rb 92.922039 u; mₙ = 1.008665 u; 1 u = 931.5 MeV)`,
  value: Number(dec(fq.Q, 3)), tol: 0.5, unit: 'MeV',
  sol: r`Before: $235.043930 + 1.008665 = ${dec(sumM(fq.react), 9)}$ u. After: $139.917283 + 92.922039 + 3 \times 1.008665 = ${dec(sumM(fq.prod), 9)}$ u. $\Delta m = ${dec(fq.dm, 6)}$ u, so $Q = ${dec(fq.dm, 6)} \times 931.5 = ${dec(fq.Q, 4)}$ MeV. (Check: A: 1 + 235 = 140 + 93 + 3; Z: 92 = 55 + 37.)`,
  scheme: [['Masses before 236.052595 u and after 235.865317 u', 1], ['Δm = 0.187278 u; Q = 174 MeV', 1]],
  marks: 2, d: 3, c: 'application', t: [4],
}), (q) => near(fq.Q, q.answer.value, 0.003) && 1 + 235 === 140 + 93 + 3 && 55 + 37 === 92 || 'fq');
const fk = { K: 165, mBa: 141, mKr: 92 };
fk.Kr = fk.K * fk.mBa / (fk.mBa + fk.mKr);
fk.Ba = fk.K - fk.Kr;
add('fragmentke-num', num({
  stem: `A uranium nucleus at rest splits into a barium fragment (mass number 141) and a krypton fragment (mass number 92) that fly apart with a total kinetic energy of 165 MeV. Taking the mass of each fragment as proportional to its mass number, find the kinetic energy of the krypton fragment, in MeV (3 significant figures).`,
  value: Number(dec(fk.Kr, 3)), tol: 0.3, unit: 'MeV',
  sol: r`Momentum is conserved and the nucleus started at rest, so the fragments have equal and opposite momenta p. Then $K = \dfrac{p^2}{2m} \propto \dfrac{1}{m}$: $\dfrac{K_{Kr}}{K_{Ba}} = \dfrac{141}{92}$. With $K_{Kr} + K_{Ba} = 165$ MeV: $K_{Kr} = 165 \times \dfrac{141}{141 + 92} = ${dec(fk.Kr, 3)}$ MeV (and $K_{Ba} = ${dec(fk.Ba, 3)}$ MeV).`,
  scheme: [['Equal momenta, so K ∝ 1/m: K_Kr : K_Ba = 141 : 92', 1], ['K_Kr = 165 × 141/233 = 99.9 MeV', 1]],
  marks: 2, d: 4, c: 'analysis', t: [4],
}), (q) => near(fk.Kr + fk.Ba, 165, 1e-9) && near(Math.sqrt(2 * 92 * fk.Kr), Math.sqrt(2 * 141 * fk.Ba), 1e-9) && near(fk.Kr, q.answer.value, 0.002) || 'fk');
add('chainctl-short2', short({
  marks: 2,
  stem: 'Distinguish between an uncontrolled and a controlled chain reaction in terms of what happens to the neutrons released in each fission. Give one use of each.',
  model: 'In an uncontrolled chain reaction more than one neutron per fission causes another fission, so the fissions multiply and the energy is released almost at once: a nuclear bomb. In a controlled one, on average only one neutron per fission causes another; the rest escape or are absorbed by control rods, so the power stays steady: a reactor.',
  sol: 'More than one neutron continues (bomb); exactly one continues (reactor).',
  scheme: [['Uncontrolled: more than one neutron per fission goes on, rapid multiplication; bomb', 1], ['Controlled: one neutron per fission goes on, rest absorbed; steady power; reactor', 1]],
  d: 2, c: 'understanding', t: [4],
}));
const bq = { A: 1 + 235 - 139 - 2, Z: 92 - 55 };
add('balance-short2', short({
  marks: 2,
  stem: `Complete and balance the fission reaction ${NEUTRON} + ${nu(235, 92, 'U')} → ${nu(139, 55, 'Cs')} + X + 2 ${NEUTRON}, giving the mass number and the atomic number of X and naming the element (atomic number 37 is rubidium).`,
  model: r`Nucleon number: $1 + 235 = 139 + A + 2 \times 1$, so $A = ${bq.A}$. Charge: $92 = 55 + Z + 0$, so $Z = ${bq.Z}$. X has 37 protons, so it is rubidium-95, ${nu(95, 37, 'Rb')}. The balanced reaction is ${NEUTRON} + ${nu(235, 92, 'U')} → ${nu(139, 55, 'Cs')} + ${nu(95, 37, 'Rb')} + 2 ${NEUTRON}.`,
  sol: 'Balance A and Z.',
  scheme: [['A = 95 from 1 + 235 = 139 + A + 2', 1], ['Z = 37, rubidium: ⁹⁵₃₇Rb', 1]],
  d: 2, c: 'application', t: [4],
}), () => bq.A === 95 && bq.Z === 37 || 'bq');
add('reactor-short3', short({
  marks: 3,
  stem: 'In a nuclear reactor, name the part that (i) slows the fast neutrons, (ii) absorbs neutrons to regulate the rate of the chain reaction, and (iii) takes the heat out of the core. Give one material used for each.',
  model: '(i) The moderator slows the fast neutrons by collisions, so that they can cause fission of uranium-235; heavy water or graphite is used. (ii) The control rods absorb neutrons; pushing them in lowers the rate of fission and pulling them out raises it; they are made of cadmium or boron. (iii) The coolant carries the heat from the core to the steam generator; water, liquid sodium or carbon dioxide may be used.',
  sol: 'Moderator, control rods, coolant, each with a material.',
  scheme: [['Moderator slows neutrons; heavy water or graphite', 1], ['Control rods absorb neutrons; cadmium or boron', 1], ['Coolant removes heat; water, liquid sodium or CO₂', 1]],
  d: 1, c: 'recall', t: [4],
}));
add('moderator-short3', short({
  marks: 3,
  stem: 'Why must the fast neutrons released in fission be slowed down in a reactor that uses uranium-235? What property should a good moderator have, and why is water or graphite suitable?',
  model: 'Slow neutrons are much more likely than fast ones to be captured by uranium-235 and cause fission, so the fast neutrons from one fission must be slowed before they can cause the next. A good moderator has light nuclei, because a neutron loses most energy colliding with a nucleus of similar mass, and absorbs few neutrons. Water, heavy water and graphite have light nuclei and absorb few neutrons.',
  sol: 'Slow neutrons cause fission; light nuclei slow neutrons.',
  scheme: [['Slow neutrons are far more likely to cause fission in U-235', 1], ['Moderator: light nuclei (comparable mass to a neutron) and low neutron absorption', 1], ['Water, heavy water or graphite fit', 1]],
  d: 3, c: 'analysis', t: [4],
}));
const fl = { A: 1 + 235 - 140 - 93 };
add('fission-long', long({
  stem: `(a) What is nuclear fission? [1] (b) Find the energy released in the fission ${NEUTRON} + ${nu(235, 92, 'U')} → ${nu(140, 55, 'Cs')} + ${nu(93, 37, 'Rb')} + x ${NEUTRON}, after finding x. (Atomic masses: ²³⁵U 235.043930 u, ¹⁴⁰Cs 139.917283 u, ⁹³Rb 92.922039 u; mₙ = 1.008665 u; 1 u = 931.5 MeV) [2] (c) Explain how the chain reaction is kept controlled in a reactor. [2]`,
  model: r`(a) The splitting of a heavy nucleus, after it absorbs a slow neutron, into two middle-order nuclei, with the release of neutrons and a large amount of energy.

(b) Nucleon number: $1 + 235 = 140 + 93 + x$, so $x = ${fl.A}$. Mass before $= ${dec(sumM(fq.react), 9)}$ u; after $= ${dec(sumM(fq.prod), 9)}$ u; $\Delta m = ${dec(fq.dm, 6)}$ u; $Q = ${dec(fq.dm, 6)} \times 931.5 = ${dec(fq.Q, 4)}$ MeV.

(c) Each fission releases two or three neutrons, but only one on average must cause a further fission. Control rods of cadmium or boron absorb the surplus neutrons; pushing them in lowers the rate and pulling them out raises it. The moderator slows the neutrons so that they can cause fission, and the rods are moved to keep exactly one neutron per fission carrying on.`,
  sol: 'x = 3; Q = Δm × 931.5; control rods absorb the surplus neutrons.',
  scheme: [['Fission: heavy nucleus splits into two middle-order nuclei, releasing neutrons and energy', 1], ['x = 3; Δm = 0.187278 u', 1], ['Q = 174 MeV', 1], ['Only one neutron per fission must cause another', 1], ['Control rods absorb the surplus; moved in or out to adjust', 1]],
  d: 3, c: 'application', t: [4], wl: null,
}), () => fl.A === 3 && near(fq.Q, 174.4, 0.002) || 'fl');
add('reactor-long', long({
  stem: '(a) Describe, with a labelled diagram (described in words), the main parts of a nuclear reactor and give the function of the fuel, moderator, control rods, coolant and shielding. [3] (b) What would happen to the rate of fission if the control rods were pushed fully into the core, and why? [1] (c) Why can a reactor not explode like a nuclear bomb? [1]',
  model: '(a) Fuel rods of uranium enriched in U-235 stand in the core, surrounded by the moderator (heavy water or graphite) that slows the fast neutrons so they can cause fission. Control rods of cadmium or boron slide in and out between the fuel rods to absorb neutrons and regulate the rate. A coolant (water or liquid sodium) is pumped through the core and carries the heat to a heat exchanger, where steam is made for a turbine. Thick concrete and steel shielding surrounds the reactor and absorbs neutrons and gamma rays.\n\n(b) The fission rate would fall and the reactor would shut down, because the rods absorb so many neutrons that fewer than one neutron per fission causes another fission.\n\n(c) The fuel is only slightly enriched in U-235 and the control rods keep the number of neutrons steady, so the chain reaction cannot multiply as it does in a bomb, which uses highly enriched fuel in a compact mass with nothing to absorb the neutrons.',
  sol: 'Parts and functions; rods in: rate falls; controlled, slightly enriched fuel.',
  scheme: [['Fuel and moderator described with functions', 1], ['Control rods and coolant described with functions', 1], ['Shielding and labelled arrangement', 1], ['Rods fully in: rate falls, neutrons absorbed', 1], ['Controlled chain reaction, slightly enriched fuel', 1]],
  d: 2, c: 'understanding', t: [4], wl: null,
}));
add('reactor-match', match({
  stem: 'Match each part of a nuclear reactor in Column A with its function in Column B.',
  pairs: [
    ['Moderator', 'Slows the fast neutrons so that they cause fission'],
    ['Control rods', 'Absorb neutrons to regulate the rate of the chain reaction'],
    ['Coolant', 'Carries the heat away from the core'],
    ['Shielding', 'Absorbs neutrons and gamma rays to protect people'],
  ],
  order: [2, 0, 3, 1],
  sol: 'Moderator slows neutrons (1 → r); control rods absorb neutrons (2 → p); coolant carries heat (3 → s); shielding absorbs radiation (4 → q).',
  d: 1, c: 'understanding', t: [4],
}));

// ================================================================ t05 fusion, the Sun and stars, hydrogen bomb
add('ppchain-mcq', mcq({
  stem: 'The net result of the proton–proton chain that supplies the Sun’s energy is that',
  right: 'four hydrogen nuclei are converted into one helium nucleus, with two positrons, two neutrinos and energy released',
  wrong: ['one helium nucleus splits into four hydrogen nuclei, absorbing energy', 'two helium nuclei fuse into one carbon nucleus, releasing neutrons', 'a uranium nucleus splits into two nuclei of mass number about 118, releasing neutrons'],
  sol: 'In the Sun’s core, four protons are turned in stages into one helium-4 nucleus: 4 ¹H → ⁴He + 2 e⁺ + 2 ν, with about 26.7 MeV released — option (@K). The other options describe the reverse process, helium burning at later stages, and fission.',
  d: 1, c: 'recall', t: [5],
}));
add('hbomb-mcq', mcq({
  stem: 'In a hydrogen bomb, the very high temperature needed for the fusion of hydrogen isotopes is obtained from',
  right: 'the explosion of a fission bomb',
  wrong: ['burning chemical explosives such as TNT', 'compressing the hydrogen with a piston', 'the radioactive decay of the hydrogen isotopes themselves'],
  sol: 'Only a fission explosion produces temperatures of millions of kelvin, so the hydrogen bomb has a fission bomb as its trigger — option (@K). Chemical explosives and pistons cannot reach such temperatures.',
  d: 1, c: 'recall', t: [5],
}));
add('coretemp-mcq', mcq({
  stem: 'At the temperature of the Sun’s core (about 1.5 × 10⁷ K) the mean thermal energy of a proton is only about 2 keV, far below the roughly 0.6 MeV needed to bring two protons together. Fusion still goes on in the core mainly because',
  right: 'a tiny fraction of the protons have energies far above the mean, and there are enormous numbers of protons in the core',
  wrong: ['the protons in the core have no electric charge', 'gravity switches off the repulsion between the protons', 'the thermal energy of every proton in the core is actually above 0.6 MeV'],
  sol: 'The protons have a spread of energies; the tiny fraction in the high-energy tail, in a core with an enormous number of protons, is enough to keep fusion going at a steady rate — option (@K). The protons are charged and repel; the mean energy really is only about 2 keV.',
  d: 3, c: 'analysis', t: [5],
}));
add('hot-ar', ar({
  a: 'Nuclear fusion needs temperatures of millions of kelvin.',
  r: 'When two light nuclei fuse, the binding energy per nucleon of the product is greater than that of the nuclei that fused.',
  key: 'b',
  sol: 'Both are true, but R does not explain A. R explains why fusion releases energy. The high temperature is needed because the positive nuclei must approach within about 10⁻¹⁵ m against their electrostatic repulsion, and only very fast nuclei can climb that Coulomb barrier — option (b).',
  d: 2, c: 'understanding', t: [5],
}));
add('thermonuclear-fill', fill({
  stem: 'Fusion reactions in the cores of stars proceed only because of the very high temperature of the gas, so the energy they release is called ___ energy.',
  acc: [['thermonuclear']],
  sol: '**Thermonuclear** energy: fusion energy that depends on the very high temperature of the reacting gas.',
  d: 1, c: 'recall', t: [5],
}));
const hp = { react: [2 * NUC.He3.M], prod: [NUC.He4.M, 2 * MH] };
hp.dm = sumM(hp.react) - sumM(hp.prod);
hp.Q = hp.dm * UMEV;
add('hepp-num', num({
  stem: `Find the energy released, in MeV (3 significant figures), when two helium-3 nuclei fuse: ${nu(3, 2, 'He')} + ${nu(3, 2, 'He')} → ${nu(4, 2, 'He')} + 2 ${nu(1, 1, 'H')}. (Atomic masses: ³He 3.016029 u, ⁴He 4.002603 u, ¹H 1.007825 u; 1 u = 931.5 MeV)`,
  value: Number(dec(hp.Q, 3)), tol: 0.1, unit: 'MeV',
  sol: r`Before: $2 \times 3.016029 = ${dec(sumM(hp.react), 8)}$ u. After: $4.002603 + 2 \times 1.007825 = ${dec(sumM(hp.prod), 8)}$ u. $\Delta m = ${dec(hp.dm, 6)}$ u, $Q = ${dec(hp.dm, 6)} \times 931.5 = ${dec(hp.Q, 4)}$ MeV.`,
  scheme: [['Masses before 6.032058 u and after 6.018253 u: Δm = 0.013805 u', 1], ['Q = 12.9 MeV', 1]],
  marks: 2, d: 2, c: 'application', t: [5],
}), (q) => near(be('He4') - 2 * be('He3'), q.answer.value, 0.02) && 3 + 3 === 4 + 2 * 1 && 2 + 2 === 2 + 2 * 1 || `hepp ${be('He4') - 2 * be('He3')}`);
const db = { R: rad(2, 1.2), };
db.d = 2 * db.R;
db.U = EE / db.d;
add('ddbarrier-num', num({
  stem: 'Two deuterium nuclei (each of mass number 2, charge +e) are brought together until they just touch. Taking each nuclear radius as R₀A^(1/3) with R₀ = 1.2 fm, find the electrostatic potential energy of the pair at that moment, in MeV (3 significant figures). (1/4πε₀ = 9 × 10⁹ N m² C⁻², e = 1.6 × 10⁻¹⁹ C, 1 MeV = 1.6 × 10⁻¹³ J)',
  value: Number(dec(db.U, 3)), tol: 0.005, unit: 'MeV',
  sol: r`Radius of each nucleus $= 1.2 \times 2^{1/3} = ${dec(db.R, 4)}$ fm, so the centres are $2R = ${dec(db.d, 4)}$ fm $= ${sci(db.d * 1e-15, 4)}$ m apart. $U = \dfrac{9 \times 10^{9} \times (1.6 \times 10^{-19})^2}{${sci(db.d * 1e-15, 4)}} = ${sci(db.U * MEV, 3)}$ J $= \dfrac{${sci(db.U * MEV, 3)}}{1.6 \times 10^{-13}} = ${dec(db.U, 3)}$ MeV.`,
  scheme: [['R = 1.2 × 2^(1/3) = 1.512 fm; separation 3.024 fm', 1], ['U = k e²/(2R) = 0.476 MeV', 1]],
  marks: 2, d: 3, c: 'application', t: [5, 1],
}), (q) => near(((9e9 * (1.6e-19) ** 2) / (2 * 1.2e-15 * Math.cbrt(2))) / MEV, q.answer.value, 0.004) || 'db');
const dt = { U: db.U };
dt.T = (2 * dt.U * MEV) / (3 * KB);
add('ddtemp-num', num({
  stem: 'Find the temperature at which the mean kinetic energy of a gas particle, (3/2)kT, equals 0.476 MeV, the potential energy of two touching deuterium nuclei. Give the answer in units of 10⁹ K (3 significant figures). (k = 1.38 × 10⁻²³ J K⁻¹, 1 MeV = 1.6 × 10⁻¹³ J)',
  value: Number(dec(dt.T / 1e9, 3)), tol: 0.05, unit: '10⁹ K',
  sol: r`$0.476$ MeV $= 0.476 \times 1.6 \times 10^{-13} = 7.62 \times 10^{-14}$ J. $\dfrac{3}{2}kT = 7.62 \times 10^{-14}$ gives $T = \dfrac{2 \times 7.62 \times 10^{-14}}{3 \times 1.38 \times 10^{-23}} = ${dec(dt.T / 1e9, 3)} \times 10^{9}$ K, so $T/10^{9} = ${dec(dt.T / 1e9, 3)}$ in units of $10^{9}$ K. Real fusion starts at a far lower temperature (about 10⁷–10⁸ K) because the fastest nuclei in the gas carry much more than the mean.`,
  scheme: [['0.476 MeV = 7.62 × 10⁻¹⁴ J', 1], ['T = 2E/(3k) = 3.68 × 10⁹ K', 1]],
  marks: 2, d: 3, c: 'application', t: [5],
}), (q) => near((2 * 0.476 * 1.6e-13) / (3 * 1.38e-23) / 1e9, q.answer.value, 0.006) || 'dt');
const pq = { dm: 4 * MH - NUC.He4.M };
pq.Q = pq.dm * UMEV;
add('ppq-num', num({
  stem: `Four hydrogen atoms (¹H, 1.007825 u each) are converted into one helium atom (⁴He, 4.002603 u) in the proton–proton chain. Find the energy released per helium atom formed, in MeV (3 significant figures), ignoring the energy carried off by neutrinos. (The two positrons annihilate with two electrons, which is already accounted for by using atomic masses; 1 u = 931.5 MeV.)`,
  value: Number(dec(pq.Q, 3)), tol: 0.1, unit: 'MeV',
  sol: r`Before: $4 \times 1.007825 = ${dec(4 * MH, 7)}$ u. After: $4.002603$ u. $\Delta m = ${dec(pq.dm, 5)}$ u, so $Q = ${dec(pq.dm, 5)} \times 931.5 = ${dec(pq.Q, 4)}$ MeV $\approx 26.7$ MeV.`,
  scheme: [['Δm = 4.031300 − 4.002603 = 0.028697 u', 1], ['Q = 26.7 MeV', 1]],
  marks: 2, d: 2, c: 'application', t: [5],
}), (q) => near((4 * (MP + MEU) - NUC.He4.M) * UMEV, q.answer.value, 0.003) || 'pq');
const sh = { P: 3.8e26, E: 26.7 };
sh.n = sh.P / (sh.E * MEV);
add('sunhe-num', num({
  stem: 'The Sun radiates energy at about 3.8 × 10²⁶ W. Taking 26.7 MeV as the energy released each time four hydrogen nuclei fuse into a helium nucleus, find the number of helium nuclei formed per second, in units of 10³⁷ (3 significant figures). (1 MeV = 1.6 × 10⁻¹³ J)',
  value: Number(dec(sh.n / 1e37, 3)), tol: 0.05, unit: '10³⁷',
  sol: r`Energy per helium nucleus $= 26.7 \times 1.6 \times 10^{-13} = ${sci(sh.E * MEV, 3)}$ J. Number per second $= \dfrac{3.8 \times 10^{26}}{${sci(sh.E * MEV, 3)}} = ${sci(sh.n, 3)}$; in units of $10^{37}$ this is $\dfrac{${sci(sh.n, 3)}}{10^{37}} = ${dec(sh.n / 1e37, 3)}$.`,
  scheme: [['E = 26.7 MeV = 4.27 × 10⁻¹² J', 1], ['N = P/E = 8.89 × 10³⁷ per second', 1]],
  marks: 2, d: 3, c: 'application', t: [5],
}), (q) => near(3.8e26 / (26.7 * 1.6e-13) / 1e37, q.answer.value, 0.003) || 'sh');
add('roomtemp-short2', short({
  marks: 2,
  stem: 'The hydrogen nuclei in a cylinder of gas at room temperature collide millions of times a second, yet no fusion takes place. Explain why.',
  model: 'Hydrogen nuclei are positively charged and repel each other. To fuse they must come within about 10⁻¹⁵ m, which needs kinetic energy of the order of 0.1 MeV or more. At room temperature the mean thermal energy is only about 0.04 eV, so the nuclei turn back far before they get close enough for the strong force to act.',
  sol: 'Coulomb repulsion; thermal energy far too small.',
  scheme: [['Nuclei repel; must come within about 10⁻¹⁵ m, needs an energy of order 0.1 MeV or more', 1], ['Thermal energy at room temperature (about 0.04 eV) is far too small', 1]],
  d: 2, c: 'understanding', t: [5],
}));
add('hbomb-short2', short({
  marks: 2,
  stem: 'Explain how a hydrogen bomb is set off, and why it needs a fission bomb in it.',
  model: 'A hydrogen bomb works by uncontrolled fusion of hydrogen isotopes, which needs a temperature of millions of kelvin. No chemical explosive can produce that, so a fission bomb is exploded first; its enormous temperature and pressure make the hydrogen isotopes fuse, releasing a far greater amount of energy.',
  sol: 'Fission trigger gives the temperature for fusion.',
  scheme: [['Fusion of hydrogen isotopes needs millions of kelvin', 1], ['A fission explosion supplies that temperature, triggering uncontrolled fusion', 1]],
  d: 2, c: 'understanding', t: [5],
}));
add('sun-short3', short({
  marks: 3,
  stem: 'Describe the source of the energy radiated by the Sun. Write the net nuclear reaction, say where the energy comes from, and say why the Sun can keep shining for billions of years.',
  model: 'The energy comes from fusion in the Sun’s core. Four hydrogen nuclei fuse, in the proton–proton chain, into one helium nucleus with two positrons and two neutrinos: 4 ¹H → ⁴He + 2 e⁺ + 2 ν. The helium nucleus has less mass than four protons; the lost mass, equal to about 26.7 MeV in energy, is released. The Sun’s mass is mostly hydrogen, and each fusion yields a lot of energy, so the supply lasts billions of years.',
  sol: 'p–p chain; mass lost ↔ 26.7 MeV; vast hydrogen supply.',
  scheme: [['Fusion in the core: 4 ¹H → ⁴He + 2 e⁺ + 2 ν', 1], ['Energy from the mass lost (about 26.7 MeV per helium)', 1], ['Huge hydrogen supply gives billions of years', 1]],
  d: 2, c: 'understanding', t: [5],
}));
const fn = { U: EE / (2 * R0), T: (2 * (EE / (2 * R0)) * MEV) / (3 * KB), thermal: thermalEV(1.5e7) };
add('fusionneed-short3', short({
  marks: 3,
  stem: 'Two protons just touch when their centres are 2.4 fm apart. Calculate the electrostatic potential energy of the pair in MeV, and use it to explain why fusion needs a very high temperature. (1/4πε₀ = 9 × 10⁹ N m² C⁻², e = 1.6 × 10⁻¹⁹ C, 1 MeV = 1.6 × 10⁻¹³ J)',
  model: r`$U = \dfrac{9 \times 10^{9} \times (1.6 \times 10^{-19})^2}{2.4 \times 10^{-15}} = 9.6 \times 10^{-14}$ J $= 0.60$ MeV. Two nuclei must reach this separation, where the strong force takes over, so each pair must have about this much energy to overcome the repulsion. Such energies per particle correspond to enormous temperatures, so the gas must be made extremely hot for any appreciable number of nuclei to fuse.`,
  sol: 'U = ke²/r = 0.60 MeV; high thermal energies need high T.',
  scheme: [['U = ke²/r = 9.6 × 10⁻¹⁴ J', 1], ['= 0.60 MeV', 1], ['Nuclei need this energy to overcome repulsion: very high temperature', 1]],
  d: 3, c: 'application', t: [5],
}), () => near(fn.U, 0.6, 1e-9) && near((9e9 * (1.6e-19) ** 2 / 2.4e-15) / MEV, 0.6, 1e-9) || 'fn');
const dd = { react: [2 * NUC.H2.M], prod: [NUC.He3.M, MN] };
dd.dm = sumM(dd.react) - sumM(dd.prod);
dd.Q = dd.dm * UMEV;
add('fusion-long', long({
  stem: `(a) What is nuclear fusion? Explain why it takes place only at very high temperatures. [2] (b) Calculate the energy released in the fusion ${nu(2, 1, 'H')} + ${nu(2, 1, 'H')} → ${nu(3, 2, 'He')} + ${NEUTRON}. (Atomic masses: ²H 2.014102 u, ³He 3.016029 u; mₙ = 1.008665 u; 1 u = 931.5 MeV) [2] (c) Why does a hydrogen bomb need a fission bomb to set it off? [1]`,
  model: r`(a) Fusion is the joining of two light nuclei into a heavier nucleus, with the release of energy because the product has a higher binding energy per nucleon. The nuclei repel each other electrically, and must come within about $10^{-15}$ m, where the strong nuclear force acts; only nuclei moving at the very high speeds of a gas at millions of kelvin can overcome the repulsion.

(b) Before: $2 \times 2.014102 = ${dec(sumM(dd.react), 8)}$ u. After: $3.016029 + 1.008665 = ${dec(sumM(dd.prod), 8)}$ u. $\Delta m = ${dec(dd.dm, 6)}$ u, so $Q = ${dec(dd.dm, 6)} \times 931.5 = ${dec(dd.Q, 4)}$ MeV.

(c) The fusion of hydrogen isotopes needs a temperature of millions of kelvin, which only a fission explosion can supply.`,
  sol: 'Fusion needs high T to beat repulsion; Q = Δm × 931.5; fission gives the temperature.',
  scheme: [['Fusion: light nuclei join, B/A rises, energy released', 1], ['High T to overcome the electrostatic repulsion', 1], ['Δm = 0.003510 u', 1], ['Q = 3.27 MeV', 1], ['Fission explosion supplies millions of kelvin', 1]],
  d: 3, c: 'application', t: [5], wl: null,
}), () => near(dd.Q, 3.27, 0.005) && near(be('He3') - 2 * be('H2'), dd.Q, 0.02) || `dd ${dd.Q} ${be('He3') - 2 * be('H2')}`);
