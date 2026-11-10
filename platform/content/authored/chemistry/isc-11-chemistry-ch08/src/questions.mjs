// ISC 11 Chemistry ch08 Covalent Bonding, VSEPR and Hybridisation: question bank (ISC style). Constants: e = 1.602 × 10⁻¹⁹ C,
// 1 D = 3.336 × 10⁻³⁰ C m. Bond enthalpies C–H 414, C–C 347, C=C 611, C≡C 837 kJ mol⁻¹. Every numerical is computed in JS and
// re-solved by a check. Assertion-reason keys: a b c d a b.
import { mk, add, r, near } from './lib.mjs';
import { BOND, HX, muIonic, pctIonic, resultant, fc, EN, RAD, ionicPotential, countSigmaPi, PROPENE, ACRYLO, E_CHARGE, DEBYE } from './data.mjs';

const { mcq, ar, tf, fill, match, num, short, long } = mk;
const f1 = (x) => x.toFixed(1);
const f2 = (x) => x.toFixed(2);
const f3 = (x) => x.toFixed(3);

// ---------------------------------------------------------------- t01 covalent bond, sigma and pi, Lewis structures
add('cov-cond-mcq', mcq({
  stem: 'A chemist wants to predict which pair of elements will join by sharing electrons rather than by transferring them. The best choice is:',
  right: 'nitrogen and hydrogen, two non-metals that each need electrons to complete their outer shells',
  wrong: ['sodium and fluorine, a metal with low ionisation enthalpy and a non-metal', 'potassium and chlorine, which differ greatly in electronegativity', 'neon and argon, whose outer shells are already full'],
  sol: 'A covalent bond forms between atoms that both need electrons and are close in electronegativity, such as N and H. The metal–non-metal pairs transfer electrons, and the noble gases form no bonds — option (@K).',
  d: 1, c: 'understanding', t: [1],
}));
add('lewis-co2-mcq', mcq({
  stem: 'A fire-extinguisher cylinder is filled with carbon dioxide. In the Lewis structure of the molecule, the numbers of shared pairs and of lone pairs are respectively:',
  right: '4 shared pairs and 4 lone pairs',
  wrong: ['2 shared pairs and 6 lone pairs', '4 shared pairs and 2 lone pairs', '3 shared pairs and 5 lone pairs'],
  sol: 'O=C=O: each C=O is a double bond (2 shared pairs), giving 4 shared pairs; each oxygen keeps 2 lone pairs, giving 4 lone pairs. Total electrons: 2 × 4 + 2 × 4 = 16 = 4 + 6 + 6 — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('sigmapi-mcq', (() => {
  const c = countSigmaPi(PROPENE);
  return mcq({
    stem: 'A polymer chemist studies propene, CH₃–CH=CH₂, the monomer of polypropylene. The numbers of sigma and pi bonds in one molecule are respectively:',
    right: `${c.sigma} sigma and ${c.pi} pi`,
    wrong: [`${c.sigma - 1} sigma and ${c.pi + 1} pi`, `${c.sigma + 1} sigma and 0 pi`, `${c.sigma - 2} sigma and ${c.pi + 2} pi`],
    sol: `Single bonds are σ: 6 C–H and 1 C–C = 7; the C=C double bond has 1 σ and 1 π. Total ${c.sigma} σ and ${c.pi} π — option (@K).`,
    d: 2, c: 'application', t: [1],
  });
})(), () => { const c = countSigmaPi(PROPENE); return (c.sigma === 8 && c.pi === 1) || 'propene'; });
add('n2-bond-mcq', mcq({
  stem: 'Nitrogen gas is used to keep food fresh in sealed packets. The bonding in its molecule is best described as:',
  right: 'one sigma bond and two pi bonds between the atoms, a bond order of 3',
  wrong: ['three sigma bonds between the atoms, a bond order of 3', 'one sigma bond and one pi bond between the atoms, a bond order of 2', 'two sigma bonds and one pi bond between the atoms, a bond order of 3'],
  sol: 'Two N atoms (5 valence electrons each) share three pairs; the first pair overlaps head-on (σ) and the other two sideways (two π bonds at right angles) — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('ethene-pairs-mcq', (() => {
  const k = (2 * 4 + 4) / 2;
  return mcq({
    stem: 'Ethene, C₂H₄, is the gas that ripens fruit in storage rooms. The number of electron pairs shared in one molecule is:',
    right: String(k),
    wrong: ['5', '4', '7'],
    sol: `Valence electrons: 2 × 4 + 4 × 1 = 12, all shared in the structure H₂C=CH₂: 4 C–H pairs + 2 pairs in C=C = ${k} shared pairs — option (@K).`,
    d: 2, c: 'application', t: [1],
  });
})(), () => (2 * 4 + 4) / 2 === 6 || 'ethene-pairs');
add('pi-tf', tf({
  stem: 'A pi bond is formed by head-on overlap of orbitals along the line joining the two nuclei.',
  key: 'f',
  sol: 'False. Head-on overlap along the internuclear axis gives a sigma bond; a pi bond is formed by sideways overlap of parallel p orbitals, above and below the axis.',
  d: 1, c: 'recall', t: [1],
}));
add('bondorder-fill', fill({
  stem: 'The bond order of the nitrogen molecule, N≡N, is ___.',
  acc: [['3', 'three']],
  sol: 'Three shared pairs join the nitrogen atoms, so the bond order is 3.',
  d: 1, c: 'recall', t: [1],
}));
add('cov-ar', ar({
  a: 'The H–H bond in a hydrogen molecule is a single covalent bond.',
  r: 'The two hydrogen atoms share one pair of electrons, and each atom then has the duplet of helium.',
  key: 'a',
  sol: 'Both statements are true. One shared pair makes the bond single and gives each H two electrons, so R explains A — option (a).',
  d: 1, c: 'understanding', t: [1],
}));
add('sigmapi-match', match({
  stem: 'Match each molecule with the numbers of sigma and pi bonds that it contains.',
  pairs: [['H₂', 'one σ bond only'], ['O₂', 'one σ bond and one π bond'], ['N₂', 'one σ bond and two π bonds'], ['C₂H₂', 'three σ bonds and two π bonds']],
  order: [2, 0, 3, 1],
  sol: 'H₂ → r (one σ); O₂ → p (one σ and one π); N₂ → s (one σ and two π); C₂H₂ → q (three σ and two π).',
  d: 2, c: 'understanding', t: [1],
}));
add('sigmapi-short2', short({
  marks: 2,
  stem: 'Explain how a sigma bond differs from a pi bond in the kind of orbital overlap and in strength, taking the nitrogen molecule as your example.',
  model: 'A sigma bond is formed by head-on (end-to-end) overlap of orbitals along the line joining the nuclei, and it is stronger because the overlap is greater. A pi bond is formed by sideways overlap of parallel p orbitals above and below the axis, so the overlap is smaller and the bond weaker. In N₂ (N≡N) one of the three bonds is a σ bond and the other two are π bonds at right angles.',
  sol: 'σ: head-on and stronger; π: sideways and weaker; N₂ has 1 σ and 2 π.',
  scheme: [['σ: head-on overlap, stronger', 1], ['π: sideways overlap, weaker; N₂ has 1 σ and 2 π', 1]],
  d: 1, c: 'understanding', t: [1],
}));
add('acrylo-short3', (() => {
  const c = countSigmaPi(ACRYLO);
  return short({
    marks: 3,
    stem: 'Acrylonitrile, CH₂=CH–C≡N, is the starting material for acrylic fibres. Draw its structure showing every bond, and count the sigma and pi bonds in one molecule.',
    model: `Structure: H₂C=CH–C≡N, with 2 C–H bonds on the first carbon, 1 C–H on the second, and a lone pair on nitrogen. σ bonds: 3 C–H + 1 C–C + 1 (in C=C) + 1 (in C≡N) = ${c.sigma}. π bonds: 1 (in C=C) + 2 (in C≡N) = ${c.pi}. Check: single bonds give 1 σ each, a double bond 1 σ + 1 π, a triple bond 1 σ + 2 π.`,
    sol: `${c.sigma} σ bonds and ${c.pi} π bonds.`,
    scheme: [['Correct structure with the double and the triple bond', 1], [`${c.sigma} σ bonds`, 1], [`${c.pi} π bonds`, 1]],
    d: 3, c: 'application', t: [1],
  });
})(), () => { const c = countSigmaPi(ACRYLO); return (c.sigma === 6 && c.pi === 3) || 'acrylo'; });
add('lewis-short3', short({
  marks: 3,
  stem: 'Write the electron-dot structures of ethane, ethene and ethyne, stating for each how many electron pairs are shared between the two carbon atoms and the total number of shared pairs.',
  model: 'Ethane H₃C–CH₃: the carbons share 1 pair; total shared pairs 7 (6 C–H + 1 C–C). Ethene H₂C=CH₂: the carbons share 2 pairs; total 6 (4 C–H + 2). Ethyne HC≡CH: the carbons share 3 pairs; total 5 (2 C–H + 3). In each structure every carbon has 8 electrons and every hydrogen 2.',
  sol: 'C–C pairs: 1, 2, 3; total shared pairs 7, 6, 5.',
  scheme: [['Ethane: 1 pair, total 7', 1], ['Ethene: 2 pairs, total 6', 1], ['Ethyne: 3 pairs, total 5', 1]],
  d: 2, c: 'application', t: [1],
}));
add('lewis-long', long({
  stem: `(a) Draw the electron-dot structures of carbon dioxide and of ethyne, showing all shared pairs and lone pairs. [3]

(b) State the number of sigma bonds and pi bonds in each of the two molecules. [2]`,
  model: `(a) CO₂: O::C::O, each oxygen with two lone pairs (two shared pairs between C and each O, 4 shared pairs and 4 lone pairs in all). C₂H₂: H:C:::C:H, three shared pairs between the carbons and one pair in each C–H bond, with no lone pairs.

(b) CO₂: two σ bonds and two π bonds (each C=O has 1 σ and 1 π). C₂H₂: three σ bonds (2 C–H and 1 C–C) and two π bonds (in C≡C).`,
  sol: 'Dot structures; CO₂ 2σ + 2π; C₂H₂ 3σ + 2π.',
  scheme: [['(a) CO₂ structure', 1.5], ['(a) C₂H₂ structure', 1.5], ['(b) CO₂: 2 σ and 2 π', 1], ['(b) C₂H₂: 3 σ and 2 π', 1]],
  d: 2, c: 'application', t: [1],
}));

// ---------------------------------------------------------------- t02 bond parameters, polarity, dipole moment
add('bondlen-mcq', mcq({
  stem: `A student tabulates length and enthalpy for three carbon–carbon bonds: C–C ${BOND['C–C'].len} pm, ${BOND['C–C'].enth} kJ mol⁻¹; C=C ${BOND['C=C'].len} pm, ${BOND['C=C'].enth} kJ mol⁻¹; C≡C ${BOND['C≡C'].len} pm, ${BOND['C≡C'].enth} kJ mol⁻¹. The correct conclusion is that, as the bond order rises:`,
  right: 'the bond becomes shorter and its bond enthalpy becomes larger',
  wrong: ['the bond becomes longer and its bond enthalpy becomes larger', 'the bond becomes shorter and its bond enthalpy becomes smaller', 'the bond length and the bond enthalpy both stay nearly constant'],
  sol: 'From C–C to C≡C the length falls (154 → 120 pm) and the enthalpy rises (347 → 837 kJ mol⁻¹), because more shared pairs pull the nuclei closer and hold them more strongly — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('polar-mcq', (() => {
  const pairs = [['C', 'H'], ['N', 'H'], ['O', 'H'], ['F', 'H']];
  const d = pairs.map(([a, b]) => Math.round((EN[a] - EN[b]) * 10) / 10);
  return mcq({
    stem: `Pauling electronegativities (given) are H ${EN.H}, C ${EN.C}, N ${EN.N}, O ${EN.O} and F ${EN.F}. Which of these bonds is the most polar?`,
    right: `H–F (difference ${f1(d[3])})`,
    wrong: [`H–C (difference ${f1(d[0])})`, `H–N (difference ${f1(d[1])})`, `H–O (difference ${f1(d[2])})`],
    sol: `The differences are ${d.map(f1).join(', ')}; the largest belongs to the H–F bond, so it is the most polar — option (@K).`,
    d: 2, c: 'application', t: [2],
  });
})(), () => EN.F - EN.H > EN.O - EN.H && EN.O - EN.H > EN.N - EN.H || 'polar');
add('co2-dipole-mcq', mcq({
  stem: 'Each C=O bond in carbon dioxide is polar, yet the gas has a zero dipole moment. The reason is that:',
  right: 'the molecule is linear, so the two equal bond dipoles point in opposite directions and cancel',
  wrong: ['carbon and oxygen have the same electronegativity', 'the C=O bonds are non-polar covalent bonds', 'the lone pairs on oxygen cancel the polarity of the bonds'],
  sol: 'O is more electronegative than C, so each C=O bond is polar; but in a linear molecule the two bond dipoles are equal and opposite and their resultant is zero — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('nonpolar-mcq', mcq({
  stem: 'A student lists four gases from a laboratory cylinder store: NH₃, H₂O, BF₃ and SO₂. Which has a zero dipole moment?',
  right: 'BF₃, because its three polar B–F bonds lie symmetrically in a plane at 120°',
  wrong: ['NH₃, because its three N–H bonds are identical', 'H₂O, because it contains only one kind of bond', 'SO₂, because the two S=O bonds are identical'],
  sol: 'Only BF₃ is symmetrical (trigonal planar), so its three bond dipoles cancel. NH₃ is pyramidal, H₂O and SO₂ are bent, and all three have non-zero resultants — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('ioncov-mcq', mcq({
  stem: 'A liquid boils at 77 °C, does not conduct electricity even when pure, mixes freely with benzene and does not dissolve in water. It is most likely:',
  right: 'a covalent compound made of non-polar molecules',
  wrong: ['an ionic compound with a lattice of ions', 'a metal in the liquid state', 'a polar covalent compound that ionises in water'],
  sol: 'Low boiling point, no conduction, solubility in a non-polar solvent and insolubility in water are all typical of non-polar covalent molecules — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('ccl4-tf', tf({
  stem: 'Carbon tetrachloride dissolves readily in water because its four C–Cl bonds are polar.',
  key: 'f',
  sol: 'False. The C–Cl bonds are polar, but the molecule is tetrahedral and symmetrical, so the bond dipoles cancel; the molecule is non-polar and does not dissolve in water.',
  d: 2, c: 'understanding', t: [2],
}));
add('debye-fill', fill({
  stem: 'The SI unit of dipole moment is the ___ metre (C m).',
  acc: [['coulomb', 'Coulomb']],
  sol: 'Dipole moment = charge × distance, so its SI unit is the coulomb metre (1 D = 3.336 × 10⁻³⁰ C m).',
  d: 1, c: 'recall', t: [2],
}));
add('pct-num', (() => {
  const h = HX.HBr;
  const mi = muIonic(h.d);
  const p = pctIonic(h.mu, h.d);
  return num({
    stem: `Hydrogen bromide has a measured dipole moment of ${h.mu} D and a bond length of ${h.d} pm. Taking e = 1.602 × 10⁻¹⁹ C and 1 D = 3.336 × 10⁻³⁰ C m, calculate the percentage ionic character of the H–Br bond.`,
    value: Number(f1(p)), tol: 0.2, unit: '%',
    sol: r`For a pure ionic bond $\mu = e \times d = 1.602 \times 10^{-19} \times ${h.d} \times 10^{-12} = ${f3(E_CHARGE * h.d * 1e-12 / 1e-30)} \times 10^{-30}$ C m $= ${f2(mi)}$ D. Percentage ionic character $= \dfrac{${h.mu}}{${f2(mi)}} \times 100 = ${f1(p)}\ \%$.`,
    scheme: [['Ionic dipole moment e × d = 6.79 D', 1], ['Ratio × 100 = 11.6 %', 1]],
    marks: 2, d: 3, c: 'application', t: [2],
  });
})(), (q) => near(pctIonic(0.79, 141.4), 11.63, 0.002) && q.answer.value === 11.6 || 'pct');
add('dipole-num', (() => {
  const qc = 0.35 * E_CHARGE;
  const d = 108e-12;
  const mu = (qc * d) / DEBYE;
  const s = f2(mu);
  return num({
    stem: `In a model of a polar bond in a gas-phase molecule, partial charges of +0.35e and −0.35e are separated by 108 pm. Calculate the dipole moment in debye. (e = 1.602 × 10⁻¹⁹ C; 1 D = 3.336 × 10⁻³⁰ C m)`,
    value: Number(s), tol: 0.02, unit: 'D',
    sol: r`$q = 0.35 \times 1.602 \times 10^{-19} = ${f3(qc / 1e-19)} \times 10^{-19}$ C; $\mu = q \times d = ${f3(qc / 1e-19)} \times 10^{-19} \times 108 \times 10^{-12} = ${f3((qc * d) / 1e-30)} \times 10^{-30}$ C m; in debye: $\dfrac{${f3((qc * d) / 1e-30)} \times 10^{-30}}{3.336 \times 10^{-30}} = ${f3(mu)} \approx ${s}$.`,
    scheme: [['Charge in coulomb: 5.61 × 10⁻²⁰ C', 0.5], ['μ = q d in C m', 0.5], ['1.82 D', 1]],
    marks: 2, d: 3, c: 'application', t: [2],
  });
})(), (q) => near((0.35 * 1.602e-19 * 108e-12) / 3.336e-30, 1.815, 0.003) && q.answer.value === 1.82 || 'dipole-num');
add('resultant-num', (() => {
  const mu = resultant(1.8, 106);
  const s = f2(mu);
  return num({
    stem: `A bent triatomic molecule AB₂ has two identical A–B bonds, each with a bond moment of 1.8 D, and the B–A–B angle is 106°. Using μ = 2 m cos(θ/2), calculate the dipole moment of the molecule in D.`,
    value: Number(s), tol: 0.02, unit: 'D',
    sol: r`$\mu = 2 \times 1.8 \times \cos(106°/2) = 3.6 \times \cos 53° = 3.6 \times ${f3(Math.cos((53 * Math.PI) / 180))} = ${s}$ D.`,
    scheme: [['Substitution in 2 m cos(θ/2)', 1], ['2.17 D', 1]],
    marks: 2, d: 3, c: 'application', t: [2],
  });
})(), (q) => near(2 * 1.8 * Math.cos((53 * Math.PI) / 180), 2.1665, 0.002) && q.answer.value === 2.17 || 'resultant');
add('bondenergy-num', (() => {
  const E = 6 * BOND['C–H'].enth + BOND['C–C'].enth;
  return num({
    stem: `A fuel chemist estimates the energy needed to break all the bonds in one mole of gaseous ethane, C₂H₆, into free atoms, using the bond enthalpies C–H ${BOND['C–H'].enth} and C–C ${BOND['C–C'].enth} kJ mol⁻¹. What is the estimate in kJ mol⁻¹?`,
    value: E, tol: 1, unit: 'kJ mol⁻¹',
    sol: r`Ethane has 6 C–H bonds and 1 C–C bond: $6 \times ${BOND['C–H'].enth} + ${BOND['C–C'].enth} = ${6 * BOND['C–H'].enth} + ${BOND['C–C'].enth} = ${E}$ kJ mol⁻¹.`,
    scheme: [['Counts 6 C–H and 1 C–C', 0.5], ['2831 kJ mol⁻¹', 0.5]],
    marks: 1, d: 2, c: 'application', t: [2],
  });
})(), (q) => q.answer.value === 6 * 414 + 347 && q.answer.value === 2831 || 'bondenergy');
add('dipole-ar', ar({
  a: 'Carbon dioxide has a zero dipole moment.',
  r: 'Oxygen is more electronegative than carbon.',
  key: 'b',
  sol: 'Both statements are true. But the zero moment is explained by the linear shape, which makes the two equal C=O dipoles cancel, not by the difference in electronegativity — option (b).',
  d: 2, c: 'analysis', t: [2],
}));
add('bondparam-short2', short({
  marks: 2,
  stem: 'Define bond length and bond enthalpy. How does each change when the bond order between two carbon atoms goes from 1 to 3?',
  model: 'Bond length is the equilibrium distance between the nuclei of two bonded atoms. Bond enthalpy is the energy needed to break one mole of the bond in the gaseous state (the energy released when it forms). From C–C to C≡C the bond length decreases (154 → 120 pm) and the bond enthalpy increases (347 → 837 kJ mol⁻¹).',
  sol: 'Definitions; length falls and enthalpy rises with bond order.',
  scheme: [['Both definitions', 1], ['Trend with bond order', 1]],
  d: 1, c: 'understanding', t: [2],
}));
add('dipole-short2', short({
  marks: 2,
  stem: 'Define dipole moment. Why is the dipole moment of carbon dioxide zero while that of water is not?',
  model: 'The dipole moment is the product of the magnitude of the charge and the distance between the charges, μ = q × d, in debye (a vector quantity). CO₂ is linear, so the two C=O bond dipoles are equal and opposite and cancel. H₂O is bent (104.5°), so the two O–H bond dipoles do not cancel and give a resultant of about 1.85 D.',
  sol: 'μ = q × d; CO₂ linear (cancels), H₂O bent (adds).',
  scheme: [['Definition μ = q × d', 1], ['Shapes: linear cancels, bent does not', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('ioncov-short2', short({
  marks: 2,
  stem: 'Give two differences between ionic compounds and covalent compounds, one in physical state or melting point and one in electrical conduction.',
  model: 'Ionic compounds are hard crystalline solids with high melting and boiling points, since strong electrostatic forces hold the ions in a lattice; covalent compounds are usually gases, liquids or soft low-melting solids, since only weak forces act between molecules. Ionic compounds conduct electricity when molten or dissolved because ions are free to move; covalent compounds are generally non-conductors, because they contain no ions.',
  sol: 'High against low melting point; conduct when molten or dissolved against non-conductors.',
  scheme: [['Melting point or state compared with reason', 1], ['Conduction compared with reason', 1]],
  d: 1, c: 'understanding', t: [2],
}));
add('bondlen-short3', short({
  marks: 3,
  stem: `The carbon–carbon bonds have lengths ${BOND['C–C'].len}, ${BOND['C=C'].len} and ${BOND['C≡C'].len} pm and enthalpies ${BOND['C–C'].enth}, ${BOND['C=C'].enth} and ${BOND['C≡C'].enth} kJ mol⁻¹ in ethane, ethene and ethyne. Explain the trend and use the data to decide whether ethyne's triple bond is three times as strong as a single bond.`,
  model: `As more electron pairs are shared the nuclei are drawn closer, so the bond length decreases, and more energy is needed to break the bond, so the bond enthalpy increases. The triple bond (837 kJ mol⁻¹) is only about ${f1(837 / 347)} times the single bond (347 kJ mol⁻¹), not three times, because the π bonds are weaker than the σ bond (the extra π bonds add about 264 and 226 kJ mol⁻¹, while σ alone is about 347).`,
  sol: `Higher order, shorter and stronger; 837/347 = ${f1(837 / 347)}, so not three times.`,
  scheme: [['Shorter with higher bond order', 1], ['Stronger with higher bond order', 1], [`Ratio ${f1(837 / 347)} and π bonds weaker than σ`, 1]],
  d: 3, c: 'analysis', t: [2],
}));
add('hf-short3', (() => {
  const h = HX.HF;
  const mi = muIonic(h.d);
  const p = pctIonic(h.mu, h.d);
  return short({
    marks: 3,
    stem: `The measured dipole moment of hydrogen fluoride is ${h.mu} D and its bond length is ${h.d} pm. Calculate the dipole moment the molecule would have if it were completely ionic (H⁺F⁻), and hence the percentage ionic character of the bond. (e = 1.602 × 10⁻¹⁹ C; 1 D = 3.336 × 10⁻³⁰ C m)`,
    model: r`Ionic $\mu = e \times d = 1.602 \times 10^{-19} \times ${h.d} \times 10^{-12} = ${f3((E_CHARGE * h.d * 1e-12) / 1e-30)} \times 10^{-30}$ C m $= ${f2(mi)}$ D. Percentage ionic character $= \dfrac{${h.mu}}{${f2(mi)}} \times 100 = ${f1(p)}\ \%$, so the bond is about 43 % ionic and 57 % covalent.`,
    sol: r`Ionic $\mu = ${f2(mi)}$ D; ionic character $= ${f1(p)}\ \%$.`,
    scheme: [['Ionic μ = e d in C m', 1], ['4.40 D', 1], ['43.4 %', 1]],
    d: 3, c: 'application', t: [2],
  });
})(), () => near(muIonic(91.7), 4.404, 0.002) && near(pctIonic(1.91, 91.7), 43.37, 0.002) || 'hf');
add('dipole-long', long({
  stem: `(a) Explain, using the shapes of the molecules, why carbon dioxide is non-polar but water is polar. [3]

(b) The S–H bond moment in H₂S is 0.70 D (given) and the H–S–H angle is 92°. Calculate the dipole moment of H₂S using μ = 2 m cos(θ/2). [2]`,
  model: r`(a) The C=O and O–H bonds are both polar because O is more electronegative than C or H. CO₂ is linear, O=C=O, so the two equal bond dipoles point in opposite directions and cancel: μ = 0, non-polar. H₂O is bent (104.5°) because of the two lone pairs on oxygen, so the two O–H dipoles add to a resultant of about 1.85 D: polar.

(b) $\mu = 2 \times 0.70 \times \cos(92°/2) = 1.40 \times \cos 46° = 1.40 \times ${f3(Math.cos((46 * Math.PI) / 180))} = ${f2(resultant(0.7, 92))}$ D.`,
  sol: r`Linear cancels, bent adds; $\mu = ${f2(resultant(0.7, 92))}$ D.`,
  scheme: [['(a) Both bonds polar', 1], ['(a) CO₂ linear, dipoles cancel', 1], ['(a) H₂O bent, dipoles add', 1], ['(b) Substitution in 2 m cos(θ/2)', 1], [`(b) ${f2(resultant(0.7, 92))} D`, 1]],
  d: 3, c: 'application', t: [2],
}), () => near(resultant(0.7, 92), 0.9725, 0.002) || 'dipole-long');

// ---------------------------------------------------------------- t03 variable covalency, formal charge, octet deviations
add('fc-mcq', (() => {
  const v = fc(5, 0, 8);
  return mcq({
    stem: 'The ammonium ion in a lawn fertiliser has four N–H single bonds and no lone pair on nitrogen. The formal charge on the nitrogen atom is:',
    right: '+1',
    wrong: ['0', '−1', '+4'],
    sol: `Formal charge = valence electrons − non-bonding electrons − ½ bonding electrons = 5 − 0 − ½(8) = ${v > 0 ? '+' : ''}${v} — option (@K).`,
    d: 2, c: 'application', t: [3],
  });
})(), () => fc(5, 0, 8) === 1 || 'fc-nh4');
add('octet-dev-mcq', mcq({
  stem: 'In a study of electron-deficient compounds, which of the following molecules has a central atom with an incomplete octet?',
  right: 'BF₃, with six electrons round boron',
  wrong: ['CH₄, with eight electrons round carbon', 'NH₃, with eight electrons round nitrogen', 'H₂O, with eight electrons round oxygen'],
  sol: 'Boron has three valence electrons and forms three B–F bonds, so it has only 6 electrons round it. In CH₄, NH₃ and H₂O the central atoms have octets — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('covalency-mcq', mcq({
  stem: 'Phosphorus forms both PCl₃ and PCl₅, but nitrogen forms NCl₃ and no NCl₅. This is because, in the excited state:',
  right: 'phosphorus can promote a 3s electron into a vacant 3d orbital, but nitrogen has no 2d orbitals',
  wrong: ['nitrogen is more electronegative than chlorine', 'phosphorus has seven valence electrons while nitrogen has five', 'nitrogen atoms are too large to bond with five chlorine atoms'],
  sol: 'P (3s² 3p³) can reach 3s¹ 3p³ 3d¹ with five unpaired electrons (covalency 5). N has only the n = 2 shell with no d orbitals, so its covalency is limited to 3 (or 4 with a lone pair) — option (@K).',
  d: 3, c: 'application', t: [3],
}));
add('sulfur-cov-mcq', mcq({
  stem: 'In the compounds SCl₂, SF₄ and SF₆, sulfur shows the covalencies of respectively:',
  right: '2, 4 and 6',
  wrong: ['2, 3 and 4', '1, 2 and 3', '2, 6 and 4'],
  sol: 'Sulfur has 2 unpaired electrons in the ground state (covalency 2), 4 after promotion of one 3p electron to 3d, and 6 after promotion of a 3s electron as well — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('fc-num', (() => {
  const v = fc(7, 0, 8);
  return num({
    stem: 'A student draws the perchlorate ion with chlorine joined to four oxygen atoms by single bonds only, with no lone pair on chlorine. Calculate the formal charge on the chlorine atom in this structure.',
    value: v, tol: 0, unit: null,
    sol: r`Formal charge $= 7 - 0 - \tfrac12(8) = +${v}$.`,
    scheme: [['Valence electrons 7, non-bonding 0, bonding 8', 0.5], ['+3', 0.5]],
    marks: 1, d: 2, c: 'application', t: [3],
  });
})(), (q) => q.answer.value === 3 || 'fc-num');
add('n-tf', tf({
  stem: 'Nitrogen can form a pentafluoride, NF₅, by promoting one 2s electron to a vacant 2d orbital.',
  key: 'f',
  sol: 'False. The second shell (n = 2) has no d orbitals, so nitrogen cannot expand its octet or have a covalency of 5.',
  d: 2, c: 'understanding', t: [3],
}));
add('fc-ar', ar({
  a: 'The formal charge on nitrogen in the ammonium ion is +1.',
  r: 'The nitrogen atom in the ammonium ion carries a lone pair of electrons.',
  key: 'c',
  sol: 'A is true: 5 − 0 − ½(8) = +1. R is false: all four pairs round nitrogen are bond pairs, so there is no lone pair — option (c).',
  d: 3, c: 'analysis', t: [3],
}));
add('expanded-ar', ar({
  a: 'Nitrogen forms NF₅ in the same way that phosphorus forms PF₅.',
  r: 'The second shell of nitrogen contains vacant 2d orbitals.',
  key: 'd',
  sol: 'A is false: NF₅ does not exist. R is false: there are no d orbitals in the n = 2 shell — option (d).',
  d: 2, c: 'analysis', t: [3],
}));
add('fc-short2', (() => {
  const mid = fc(6, 2, 6);
  const single = fc(6, 6, 2);
  const dbl = fc(6, 4, 4);
  return short({
    marks: 2,
    stem: 'A Lewis structure of ozone is O=O–O. The central oxygen has one lone pair and three bonds, the oxygen joined by the single bond has three lone pairs, and the one joined by the double bond has two lone pairs. Calculate the formal charge on each of the three oxygen atoms.',
    model: `Formal charge = V − L − B/2. Central O: 6 − 2 − ½(6) = ${mid > 0 ? '+' : ''}${mid}. Oxygen with the single bond: 6 − 6 − ½(2) = ${single}. Oxygen with the double bond: 6 − 4 − ½(4) = ${dbl}. The sum is ${mid + single + dbl}, the charge on the ozone molecule.`,
    sol: `+1 on the central O; −1 on the single-bonded O; 0 on the double-bonded O.`,
    scheme: [['Central O: +1', 1], ['Terminal oxygens: −1 and 0', 1]],
    d: 3, c: 'application', t: [3],
  });
})(), () => fc(6, 2, 6) === 1 && fc(6, 6, 2) === -1 && fc(6, 4, 4) === 0 || 'fc-o3');
add('covalency-short2', short({
  marks: 2,
  stem: 'Using electronic configurations, explain why phosphorus shows covalencies of 3 and 5, whereas nitrogen shows only 3.',
  model: 'Phosphorus is 3s² 3p³: three unpaired 3p electrons give covalency 3 (PCl₃). With a vacant 3d subshell, one 3s electron can be promoted to 3d, giving 3s¹ 3p³ 3d¹ with five unpaired electrons and covalency 5 (PCl₅). Nitrogen (2s² 2p³) has no 2d orbitals, so it cannot be promoted and its covalency is 3 only.',
  sol: 'P: 3s¹ 3p³ 3d¹ gives 5; N has no d orbitals.',
  scheme: [['P: ground state covalency 3 and promotion to 3d gives 5', 1], ['N: no d orbitals in n = 2', 1]],
  d: 3, c: 'application', t: [3],
}));
add('octet-short3', short({
  marks: 3,
  stem: 'Give one example each of a molecule with an incomplete octet and a molecule with an expanded octet. State the number of electrons round the central atom in each, and say why the second type is possible for phosphorus but not for nitrogen.',
  model: 'Incomplete octet: BF₃, in which boron has only 6 electrons (or BeCl₂, with 4). Expanded octet: PCl₅, in which phosphorus has 10 electrons (or SF₆, with 12). Phosphorus is in the third period and has vacant 3d orbitals that can hold the extra electrons after promotion; nitrogen, in the second period, has no d orbitals, so it cannot exceed an octet.',
  sol: 'BF₃ (6) and PCl₅ (10); phosphorus has 3d orbitals, nitrogen does not.',
  scheme: [['Incomplete octet example with 6 (or 4)', 1], ['Expanded octet example with 10 (or 12)', 1], ['3d orbitals for P, none for N', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('sulfur-short3', short({
  marks: 3,
  stem: 'Sulfur forms SCl₂, SF₄ and SF₆. Write the outer electronic configuration of the sulfur atom in the state that gives each covalency, and name the covalency in each compound.',
  model: 'SCl₂, covalency 2: ground state 3s² 3p⁴ (two unpaired 3p electrons). SF₄, covalency 4: first excited state 3s² 3p³ 3d¹ (four unpaired electrons, one 3p electron promoted to 3d). SF₆, covalency 6: second excited state 3s¹ 3p³ 3d² (six unpaired electrons, one 3s and one 3p electron promoted).',
  sol: 'Covalencies 2, 4, 6 from 3s² 3p⁴; 3s² 3p³ 3d¹; 3s¹ 3p³ 3d².',
  scheme: [['SCl₂: 3s² 3p⁴, covalency 2', 1], ['SF₄: 3s² 3p³ 3d¹, covalency 4', 1], ['SF₆: 3s¹ 3p³ 3d², covalency 6', 1]],
  d: 3, c: 'application', t: [3],
}));
add('fc-long', (() => {
  const N = fc(5, 0, 8);
  const O1 = fc(6, 4, 4);
  const O2 = fc(6, 6, 2);
  return long({
    stem: `(a) Write the expression used to calculate the formal charge on an atom in a Lewis structure. [1]

(b) In one Lewis structure of the nitrate ion, nitrogen has one N=O double bond and two N–O single bonds and no lone pair. The doubly bonded oxygen has two lone pairs and each singly bonded oxygen has three lone pairs. Calculate the formal charge on nitrogen and on each kind of oxygen, and show that the charges add up to the charge on the ion. [4]`,
    model: `(a) Formal charge = (valence electrons of the free atom) − (non-bonding electrons) − ½ (bonding electrons).

(b) N: 5 − 0 − ½(8) = +1. Doubly bonded O: 6 − 4 − ½(4) = ${O1}. Each singly bonded O: 6 − 6 − ½(2) = ${O2}. Sum: +1 + 0 + 2(−1) = ${N + O1 + 2 * O2}, which is the charge on the ion, NO₃⁻.`,
    sol: `Formal charges +1 on N, 0 and −1 on the oxygens; sum −1.`,
    scheme: [['(a) Expression for formal charge', 1], ['(b) N: +1', 1], ['(b) Double-bonded O: 0', 1], ['(b) Single-bonded O: −1 (each)', 1], ['(b) Sum = −1 = charge on the ion', 1]],
    d: 3, c: 'application', t: [3],
  });
})(), () => fc(5, 0, 8) === 1 && fc(6, 4, 4) === 0 && fc(6, 6, 2) === -1 && 1 + 0 - 2 === -1 || 'fc-long');

// ---------------------------------------------------------------- t04 Fajan's rules
add('fajan-mcq', mcq({
  stem: 'A student arranges the chlorides of the Group 1 metals LiCl, NaCl, KCl and RbCl in a chart. Which one has the most covalent character?',
  right: 'LiCl, because Li⁺ is the smallest cation and polarises the chloride ion most',
  wrong: ['RbCl, because Rb⁺ is the largest cation', 'NaCl, because Na⁺ has the highest charge', 'all four are equally covalent as the anion is the same'],
  sol: 'Among cations of equal charge, the smallest has the greatest polarising power (highest charge density), so LiCl has the most covalent character — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('fajan-al-mcq', mcq({
  stem: 'Anhydrous aluminium chloride sublimes easily and dissolves in organic solvents, while sodium chloride does not. By Fajan’s rules the better explanation is:',
  right: 'the small, highly charged Al³⁺ ion strongly polarises the chloride ion, giving much covalent character',
  wrong: ['the Al³⁺ ion is larger than Na⁺ and so shares electrons more easily', 'the chloride ion in AlCl₃ is smaller than in NaCl', 'aluminium is less electronegative than sodium'],
  sol: 'Al³⁺ (53.5 pm, charge 3+) has a far greater charge density than Na⁺ (102 pm, charge 1+), so it distorts the Cl⁻ cloud strongly and the bond has considerable covalent character — option (@K).',
  d: 3, c: 'application', t: [4],
}));
add('anion-pol-mcq', mcq({
  stem: 'For a given cation, which of the anions F⁻, Cl⁻, Br⁻ and I⁻ is the most easily polarised?',
  right: 'I⁻, because its large size means the outer electrons are held loosely',
  wrong: ['F⁻, because it is the most electronegative', 'Cl⁻, because it has the highest charge density', 'all are equally polarised as each has a single negative charge'],
  sol: 'A large anion has its outer electrons far from the nucleus and weakly held, so it is distorted most easily: I⁻ (220 pm) is the most polarisable — option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('fajan-tf', tf({
  stem: 'According to Fajan’s rules, a small cation of high charge polarises an anion more strongly than a large cation of low charge.',
  key: 't',
  sol: 'True. The greater the charge density of the cation, the more the anion cloud is distorted, and the greater the covalent character of the bond.',
  d: 1, c: 'recall', t: [4],
}));
add('fajan-ar', ar({
  a: 'Lithium iodide has more covalent character than lithium fluoride.',
  r: 'The iodide ion is larger and more easily polarised than the fluoride ion.',
  key: 'a',
  sol: 'Both are true. The large I⁻ ion is distorted far more readily by Li⁺ than the small F⁻ ion, so R explains A — option (a).',
  d: 3, c: 'analysis', t: [4],
}));
add('fajan-short2', short({
  marks: 2,
  stem: 'State two factors, one about the cation and one about the anion, that increase the covalent character of an ionic bond according to Fajan’s rules.',
  model: 'The covalent character increases when the cation is small and has a high charge (high polarising power), and when the anion is large and has a high charge (easily polarised), because the cation then distorts the electron cloud of the anion and some electron density is shared between the ions.',
  sol: 'Small, highly charged cation; large, highly charged anion.',
  scheme: [['Small, highly charged cation', 1], ['Large, highly charged anion', 1]],
  d: 1, c: 'recall', t: [4],
}));
add('fajan-short3', (() => {
  const a = ionicPotential(1, RAD['Li+']) * 1000;
  const b = ionicPotential(1, RAD['Na+']) * 1000;
  return short({
    marks: 3,
    stem: `Lithium chloride dissolves in ethanol while sodium chloride does not. Using the ionic radii Li⁺ ${RAD['Li+']} pm and Na⁺ ${RAD['Na+']} pm and the charge-to-radius ratio z/r, explain which compound is the more covalent and why this leads to the observed solubility.`,
    model: `z/r for Li⁺ = 1/${RAD['Li+']} = ${f1(a)} × 10⁻³ pm⁻¹; for Na⁺ = 1/${RAD['Na+']} = ${f1(b)} × 10⁻³ pm⁻¹. Li⁺ is smaller, has the greater charge density (${f2(a / b)} times that of Na⁺) and polarises the chloride ion more, so LiCl has more covalent character than NaCl. A compound with more covalent character is less strongly ionic, and dissolves in less polar organic solvents such as ethanol.`,
    sol: `z/r: Li⁺ ${f1(a)}, Na⁺ ${f1(b)} (× 10⁻³ pm⁻¹); LiCl more covalent and soluble in ethanol.`,
    scheme: [['z/r for both ions', 1], ['LiCl more covalent', 1], ['Link to solubility in ethanol', 1]],
    d: 3, c: 'application', t: [4],
  });
})(), () => near(1000 / 76, 13.16, 0.002) && near(1000 / 102, 9.80, 0.002) || 'fajan-short3');
add('fajan-long', (() => {
  const z = [['NaCl', 'Na⁺', 1, RAD['Na+']], ['MgCl₂', 'Mg²⁺', 2, RAD['Mg2+']], ['AlCl₃', 'Al³⁺', 3, RAD['Al3+']]].map(([n, i, zz, rr]) => [n, i, zz, rr, (zz / rr) * 1000]);
  return long({
    stem: `(a) State Fajan's rules for the polarisation of an anion by a cation. [3]

(b) Arrange NaCl, MgCl₂ and AlCl₃ in the order of increasing covalent character, using the z/r values of Na⁺ (${RAD['Na+']} pm), Mg²⁺ (${RAD['Mg2+']} pm) and Al³⁺ (${RAD['Al3+']} pm) and giving your reason. [2]`,
    model: `(a) The covalent character of an ionic bond increases with (i) a small size of the cation, (ii) a large charge on the cation, (iii) a large size of the anion, and (iv) a large charge on the anion; cations without a noble gas configuration (such as Ag⁺ and Cu⁺, with 18 outer electrons) also polarise more than noble-gas-type cations of the same size.

(b) z/r: Na⁺ = ${f1(z[0][4])}, Mg²⁺ = ${f1(z[1][4])}, Al³⁺ = ${f1(z[2][4])} (× 10⁻³ pm⁻¹). The order of increasing covalent character is NaCl < MgCl₂ < AlCl₃, since the polarising power of the cation (charge density) increases in this order.`,
    sol: `Fajan's rules; NaCl < MgCl₂ < AlCl₃ (z/r ${f1(z[0][4])} < ${f1(z[1][4])} < ${f1(z[2][4])}).`,
    scheme: [['(a) Cation: small size and large charge', 1], ['(a) Anion: large size and large charge', 1], ['(a) Cation with non-noble-gas configuration', 1], ['(b) Order NaCl < MgCl₂ < AlCl₃', 1], ['(b) Reason with z/r values', 1]],
    d: 3, c: 'application', t: [4],
  });
})(), () => ionicPotential(1, 102) < ionicPotential(2, 72) && ionicPotential(2, 72) < ionicPotential(3, 53.5) || 'fajan-long');

// ---------------------------------------------------------------- t05 VSEPR
add('nh3-mcq', mcq({
  stem: 'Ammonia is the working fluid of a large cold-storage plant. By VSEPR theory its molecule has the shape and approximate H–N–H angle:',
  right: 'trigonal pyramidal, about 107°',
  wrong: ['trigonal planar, 120°', 'tetrahedral, 109.5°', 'bent, 104.5°'],
  sol: 'N has 4 electron pairs (3 bond pairs and 1 lone pair), arranged tetrahedrally; the lone pair pushes the bond pairs together, so the molecule is pyramidal with an angle of about 107° — option (@K).',
  d: 1, c: 'understanding', t: [5],
}));
add('h2o-angle-mcq', mcq({
  stem: 'The H–O–H angle in a water molecule, 104.5°, is smaller than the tetrahedral angle 109.5° because:',
  right: 'the two lone pairs repel the bond pairs more strongly than the bond pairs repel one another',
  wrong: ['oxygen is larger than hydrogen', 'the bond pairs repel one another more strongly than the lone pairs do', 'oxygen forms double bonds with hydrogen'],
  sol: 'Lone pairs occupy more space, so the repulsion order is lone pair–lone pair > lone pair–bond pair > bond pair–bond pair, and the bond pairs are squeezed closer — option (@K).',
  d: 2, c: 'understanding', t: [5],
}));
add('sf4-mcq', mcq({
  stem: 'In SF₄ the sulfur atom has four bond pairs and one lone pair. The lone pair takes an equatorial position of the trigonal bipyramid, so the shape of the molecule is:',
  right: 'see-saw',
  wrong: ['square planar', 'tetrahedral', 'trigonal bipyramidal'],
  sol: 'S has 6 + 4 = 10 electrons round it (5 pairs). With the lone pair equatorial, four atoms remain: two axial and two equatorial, giving a see-saw shape — option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('xef2-mcq', mcq({
  stem: 'Xenon difluoride has the shape:',
  right: 'linear, because the three lone pairs lie in the equatorial plane and the two F atoms are axial',
  wrong: ['bent, because the two lone pairs repel the bond pairs', 'T-shaped, because there are two lone pairs on xenon', 'linear, because xenon has no lone pairs'],
  sol: 'Xe has 8 + 2 = 10 electrons (5 pairs): 2 bond pairs and 3 lone pairs. The three lone pairs occupy the equatorial positions, leaving the two F atoms axial, 180° apart — option (@K).',
  d: 3, c: 'application', t: [5],
}));
add('lp-tf', tf({
  stem: 'In VSEPR theory the repulsion between two lone pairs is weaker than the repulsion between two bond pairs.',
  key: 'f',
  sol: 'False. A lone pair is attracted by only one nucleus and spreads out more, so lone pair–lone pair repulsion is the strongest of the three kinds.',
  d: 1, c: 'recall', t: [5],
}));
add('lp-fill', fill({
  stem: 'The number of lone pairs on the central xenon atom in XeF₄ is ___.',
  acc: [['2', 'two']],
  sol: 'Xe has 8 + 4 = 12 electrons round it (6 pairs): 4 bond pairs and 2 lone pairs, giving a square planar molecule.',
  d: 2, c: 'application', t: [5],
}));
add('sf4-ar', ar({
  a: 'The SF₄ molecule has a see-saw shape.',
  r: 'Sulfur tetrafluoride is a gas at room temperature.',
  key: 'b',
  sol: 'Both statements are true (SF₄ boils at about −38 °C). But the physical state says nothing about shape: the see-saw shape follows from the five electron pairs round S (four bond pairs, one lone pair, the lone pair in an equatorial position) — option (b).',
  d: 3, c: 'analysis', t: [5],
}));
add('vsepr-short2', short({
  marks: 2,
  stem: 'The H–N–H angle in ammonia is 107°, while the H–C–H angle in methane is 109.5° and the H–O–H angle in water is 104.5°. Explain the three values using VSEPR theory.',
  model: 'All three central atoms have four electron pairs arranged tetrahedrally. CH₄ has four bond pairs, all equal, so the angle is the ideal 109.5°. NH₃ has one lone pair, which repels the bond pairs more strongly, so the angle falls to 107°. H₂O has two lone pairs, so the repulsion on the bond pairs is greater still and the angle is 104.5°.',
  sol: 'Zero, one and two lone pairs: 109.5°, 107°, 104.5°.',
  scheme: [['Four electron pairs in each; CH₄ ideal', 1], ['Lone pairs compress the angle: 107° and 104.5°', 1]],
  d: 2, c: 'analysis', t: [5],
}));
add('vsepr-short3', short({
  marks: 3,
  stem: 'Using VSEPR theory, predict the shapes of SF₄ and XeF₂. For each, give the number of bond pairs and lone pairs on the central atom and the positions of the lone pairs.',
  model: 'SF₄: S has 6 + 4 = 10 electrons, so 5 pairs: 4 bond pairs and 1 lone pair. The lone pair is equatorial (to reduce repulsion), so the shape is see-saw. XeF₂: Xe has 8 + 2 = 10 electrons, 5 pairs: 2 bond pairs and 3 lone pairs. The three lone pairs are equatorial, so the two F atoms are axial and the molecule is linear (180°).',
  sol: 'SF₄ see-saw (4 bp, 1 lp); XeF₂ linear (2 bp, 3 lp, all equatorial).',
  scheme: [['SF₄: 4 bp, 1 lp, see-saw', 1.5], ['XeF₂: 2 bp, 3 lp, linear', 1.5]],
  d: 3, c: 'application', t: [5],
}));
add('vsepr-hyb-long', long({
  stem: `(a) Predict the shapes of SF₆, ClF₃ and BrF₅ using VSEPR theory, giving the numbers of bond pairs and lone pairs on the central atom of each. [3]

(b) State the hybridisation of the central atom in each of the three molecules. [2]`,
  model: `(a) SF₆: 6 bond pairs, 0 lone pairs, octahedral (90°). ClF₃: Cl has 7 + 3 = 10 electrons, 3 bond pairs and 2 lone pairs, both lone pairs equatorial, so T-shaped. BrF₅: Br has 7 + 5 = 12 electrons, 5 bond pairs and 1 lone pair, square pyramidal.

(b) SF₆: sp³d² (six pairs). ClF₃: sp³d (five pairs, trigonal bipyramidal arrangement). BrF₅: sp³d² (six pairs, octahedral arrangement).`,
  sol: 'SF₆ octahedral; ClF₃ T-shaped; BrF₅ square pyramidal; sp³d², sp³d, sp³d².',
  scheme: [['(a) SF₆ octahedral, 6 bp', 1], ['(a) ClF₃ T-shaped, 3 bp + 2 lp', 1], ['(a) BrF₅ square pyramidal, 5 bp + 1 lp', 1], ['(b) SF₆ and BrF₅: sp³d²', 1], ['(b) ClF₃: sp³d', 1]],
  d: 4, c: 'analysis', t: [5, 6],
}));

// ---------------------------------------------------------------- t06 hybridisation
add('hyb-ethene-mcq', mcq({
  stem: 'Each carbon atom in ethene, the monomer of polythene, has three sigma bonds and one pi bond. Its hybridisation is:',
  right: 'sp², with trigonal planar bonds at about 120°',
  wrong: ['sp³, with tetrahedral bonds at 109.5°', 'sp, with linear bonds at 180°', 'sp³d, with trigonal bipyramidal bonds'],
  sol: 'Three σ bonds use three sp² hybrid orbitals (120° apart, in a plane); the remaining unhybridised p orbital forms the π bond — option (@K).',
  d: 2, c: 'application', t: [6],
}));
add('hyb-pcl5-mcq', mcq({
  stem: 'Phosphorus pentachloride, used in a chlorination reaction, has five P–Cl sigma bonds. The hybridisation of phosphorus and the shape of the molecule are:',
  right: 'sp³d, trigonal bipyramidal',
  wrong: ['sp³d², octahedral', 'sp³, tetrahedral', 'sp², trigonal planar'],
  sol: 'One 3s, three 3p and one 3d orbital mix to give five sp³d orbitals directed to the corners of a trigonal bipyramid — option (@K).',
  d: 2, c: 'understanding', t: [6],
}));
add('hyb-nh3-mcq', mcq({
  stem: 'The nitrogen atom in ammonia is sp³ hybridised, yet the molecule is not tetrahedral. The reason is that:',
  right: 'one of the four sp³ orbitals holds a lone pair, so only three bonds point to atoms and the shape is pyramidal',
  wrong: ['the nitrogen atom uses three p orbitals and no s orbital', 'two of the sp³ orbitals hold lone pairs', 'ammonia is sp² hybridised in its excited state'],
  sol: 'Four sp³ orbitals point to the corners of a tetrahedron; one holds the lone pair and three form N–H bonds, giving a trigonal pyramidal molecule — option (@K).',
  d: 3, c: 'analysis', t: [6],
}));
add('hyb-sf6-mcq', mcq({
  stem: 'In sulfur hexafluoride the six S–F bonds are all equal and directed along the three axes of an octahedron. The hybridisation of sulfur is:',
  right: 'sp³d²',
  wrong: ['sp³d', 'sp³', 'sp²d'],
  sol: 'One 3s, three 3p and two 3d orbitals mix to form six equivalent sp³d² orbitals pointing to the corners of an octahedron — option (@K).',
  d: 2, c: 'understanding', t: [6],
}));
add('hyb-match', match({
  stem: 'Match each molecule with the hybridisation of its central atom.',
  pairs: [['BeCl₂', 'sp'], ['BF₃', 'sp²'], ['CH₄', 'sp³'], ['PCl₅', 'sp³d']],
  order: [3, 0, 2, 1],
  sol: 'BeCl₂ → s (sp); BF₃ → p (sp²); CH₄ → r (sp³); PCl₅ → q (sp³d).',
  d: 1, c: 'recall', t: [6],
}));
add('hyb-short2', short({
  marks: 2,
  stem: 'What is hybridisation? State two features of hybrid orbitals.',
  model: 'Hybridisation is the mixing of atomic orbitals of slightly different energies in the same atom to form the same number of new, equivalent orbitals, called hybrid orbitals. The hybrid orbitals have the same energy and shape, and are directed in space at fixed angles that give the geometry of the molecule (for example four sp³ orbitals at 109.5°). Their number equals the number of atomic orbitals mixed.',
  sol: 'Mixing of orbitals into equivalent orbitals; same energy and shape, fixed directions.',
  scheme: [['Definition', 1], ['Two features', 1]],
  d: 1, c: 'recall', t: [6],
}));
add('hyb-short3', short({
  marks: 3,
  stem: 'Boron trifluoride is planar while ammonia is pyramidal. State the hybridisation of the central atom in each and explain how it accounts for the shape.',
  model: 'In BF₃ boron promotes a 2s electron to 2p (2s¹ 2p²) and the one s and two p orbitals give three sp² orbitals at 120° in a plane; each forms a σ bond with a fluorine atom, so BF₃ is trigonal planar. In NH₃ nitrogen uses one 2s and three 2p orbitals to give four sp³ orbitals directed to the corners of a tetrahedron: three form N–H σ bonds and the fourth holds the lone pair, so the molecule is trigonal pyramidal (H–N–H about 107°).',
  sol: 'BF₃ sp², planar; NH₃ sp³ with one lone pair, pyramidal.',
  scheme: [['BF₃: sp², planar at 120°', 1], ['NH₃: sp³ with a lone pair', 1], ['Shape linked to the orbitals used for bonding', 1]],
  d: 3, c: 'application', t: [6],
}));
add('ethene-hyb-short3', short({
  marks: 3,
  stem: 'Describe the bonding in ethene in terms of hybridisation: name the hybridisation of each carbon, the orbitals that overlap to form the C–C and C–H bonds, and the number of sigma and pi bonds in the molecule.',
  model: 'Each carbon is sp² hybridised: three sp² orbitals in a plane at 120° and one unhybridised 2p orbital perpendicular to the plane. Two sp² orbitals of each carbon overlap with the 1s orbitals of hydrogen to form four C–H σ bonds; the remaining sp² orbitals overlap head-on to form the C–C σ bond. The two parallel 2p orbitals overlap sideways to form the C–C π bond. In all there are 5 σ bonds and 1 π bond.',
  sol: 'sp² carbons; C–H σ (sp²–s), C–C σ (sp²–sp²) and π (p–p); 5 σ and 1 π.',
  scheme: [['sp² hybridisation of each carbon', 1], ['σ bonds from sp² overlap (C–H and C–C)', 1], ['π bond from sideways p overlap; 5 σ and 1 π', 1]],
  d: 3, c: 'understanding', t: [6, 1],
}));
