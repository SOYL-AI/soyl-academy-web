// ch04 Chemical Bonding and Molecular Structure — question bank.
// MCQ keys are placed by the builder (balanced); AR keys planned: a b c d a c. Numericals are computed in JS and re-solved.
import { mk, add, r } from './lib.mjs';
import { fc, SPECIES, mo, mo1s, mag, BE, BL, DIPOLE, near } from './data.mjs';

const { mcq, ar, tf, fill, match, num, short, long, part } = mk;

// ================================================================ t01 Lewis, ionic, formal charge, octet exceptions
add('fc-mcq', mcq({
  stem: 'In the ammonium ion, NH₄⁺, nitrogen has four single bonds and no lone pair. The formal charge on nitrogen is:',
  right: '+1',
  wrong: ['0', '−1', '+4'],
  sol: `Formal charge = V − L − B/2 = 5 − 0 − 8/2 = ${fc(5, 0, 8) > 0 ? '+' : ''}${fc(5, 0, 8)} — option (@K). Without the lone pair, nitrogen owns four electrons against five in the free atom.`,
  d: 2, c: 'application', t: [1],
}));
add('octet-exc-mcq', mcq({
  stem: 'In which molecule does the central atom have an incomplete octet?',
  right: 'BF₃',
  wrong: ['NH₃', 'CCl₄', 'H₂O'],
  sol: 'Boron in BF₃ has only six electrons around it — option (@K). N, C and O in the others each have eight.',
  d: 1, c: 'understanding', t: [1],
}));
add('lattice-mcq', mcq({
  stem: 'Which of these ionic solids has the highest lattice enthalpy?',
  right: 'MgO',
  wrong: ['NaCl', 'KCl', 'NaF'],
  sol: 'Lattice enthalpy rises with ionic charge and falls with ionic size. Mg²⁺ and O²⁻ carry double charges and are small, so MgO is highest — option (@K). NaF (@3) is next because of its small ions, but with single charges.',
  d: 2, c: 'application', t: [1],
}));
{
  const total = 6 + 4 * 6 + 2;
  add('valence-e-mcq', mcq({
    stem: 'How many valence electrons must be shown in the Lewis structure of the sulfate ion, SO₄²⁻?',
    right: String(total),
    wrong: ['30', '34', '28'],
    sol: `Sulfur gives 6, each of four oxygens gives 6, and the two negative charges add 2: 6 + 24 + 2 = ${total} — option (@K).`,
    d: 2, c: 'application', t: [1],
  }));
}
add('expanded-mcq', mcq({
  stem: 'Which species can have more than eight electrons around its central atom?',
  right: 'SF₆',
  wrong: ['CF₄', 'NF₃', 'BF₃'],
  sol: 'Sulfur is in period 3 and can use 3d orbitals, holding twelve electrons in SF₆ — option (@K). Carbon and nitrogen (@1, @2) are in period 2 and have no d orbitals; boron (@3) has an incomplete octet.',
  d: 2, c: 'understanding', t: [1],
}));
add('octet-ar', ar({
  a: 'Phosphorus forms PCl₅ but nitrogen does not form NCl₅.',
  r: 'Nitrogen has vacant 3d orbitals that it uses to form three bonds only.',
  key: 'c',
  sol: 'A is true. R is false: nitrogen is in period 2 and has no d orbitals at all; this is why it cannot expand its octet — option (c).',
  d: 2, c: 'understanding', t: [1],
}));
add('bf3-tf', tf({
  stem: 'BF₃ has a non-zero dipole moment because each B–F bond is polar.',
  key: 'f',
  sol: 'False. Each B–F bond is polar, but the molecule is trigonal planar, so the three bond dipoles cancel and the dipole moment is zero.',
  d: 2, c: 'understanding', t: [2],
}));
add('hbond-tf', tf({
  stem: 'Intramolecular hydrogen bonding raises the boiling point of a compound by linking its molecules together.',
  key: 'f',
  sol: 'False. Intramolecular hydrogen bonds form within one molecule and do not link molecules, so they make the compound more volatile; intermolecular bonds raise boiling points.',
  d: 2, c: 'understanding', t: [5],
}));
add('xef4-fill', fill({
  stem: 'The number of lone pairs on the xenon atom in XeF₄ is ___.',
  acc: [['2', 'two']],
  sol: `Xenon has 8 valence electrons and four are used in bonds, leaving ${SPECIES.XeF4.lp} lone pairs (**2**).`,
  d: 1, c: 'application', t: [3],
}));
{
  const v = 5 + 4 * 6 + 3;
  add('valence-num', num({
    stem: 'How many valence electrons are available for the Lewis structure of the phosphate ion, PO₄³⁻?',
    value: v, tol: 0, unit: null,
    sol: r`Phosphorus 5, four oxygens $4 \times 6$, and three for the charge: $5 + 4 \times 6 + 3 = ${v}$.`,
    scheme: [['5 + 24 + 3 = 32', 1]],
    d: 1, c: 'application', t: [1],
  }), () => (5 + 24 + 3 === 32) || 'valence');
}
{
  const f1 = fc(6, 2, 6);
  add('fc-num', num({
    stem: 'In the Lewis structure of ozone, O=O⁺–O⁻, the central oxygen has one lone pair and three bonds (six bonding electrons). What is its formal charge?',
    value: f1, tol: 0, unit: null,
    sol: r`Formal charge $= V - L - B/2$, so $6 - 2 - 3 = ${f1}$, that is +1.`,
    scheme: [['6 − 2 − 3 = +1', 1]],
    d: 2, c: 'application', t: [1],
  }), () => (fc(6, 2, 6) === 1) || 'fc');
}
add('fc-short', short({
  marks: 2,
  stem: 'Two Lewis structures are possible for CO₂: O=C=O and :O≡C–Ö:. Calculate the formal charges in each and say which is preferred.',
  model: `In O=C=O every atom has formal charge zero. In the second structure carbon is 0, the triply bonded oxygen is ${fc(6, 2, 6) > 0 ? '+' : ''}${fc(6, 2, 6)} and the singly bonded oxygen is ${fc(6, 6, 2)}. O=C=O is preferred, having the smallest formal charges.`,
  sol: 'Compute V − L − B/2 for every atom in both structures.',
  scheme: [['Formal charges in both structures', 1], ['O=C=O preferred (smallest charges)', 1]],
  d: 3, c: 'application', t: [1],
}));
add('lattice-short', short({
  marks: 2,
  stem: 'Explain why magnesium oxide has a much higher melting point than sodium chloride.',
  model: 'Magnesium oxide contains doubly charged ions, Mg²⁺ and O²⁻, which are also small, so the electrostatic attraction in the crystal is much stronger. Its lattice enthalpy is several times that of sodium chloride, whose ions carry single charges and are larger, so far more energy is needed to break the lattice.',
  sol: 'Higher charge and smaller ions give higher lattice enthalpy.',
  scheme: [['Higher charges and smaller ions', 1], ['Greater lattice enthalpy needs more energy to melt', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('octet-short3', short({
  marks: 3,
  stem: 'Name three types of exception to the octet rule and give one example of each, with the number of electrons around the central atom.',
  model: 'In an incomplete octet the central atom has fewer than eight electrons, as boron in BF₃ with six. In an odd-electron molecule, such as NO₂, the central atom has an unpaired electron, so it cannot have an octet. In an expanded octet, a period 3 or later atom such as sulfur in SF₆ holds twelve electrons by using vacant d orbitals.',
  sol: 'Incomplete, odd-electron and expanded octets with examples.',
  scheme: [['Incomplete octet with example', 1], ['Odd-electron molecule with example', 1], ['Expanded octet with example and reason', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('lewis-long', long({
  stem: '(a) Write the steps for drawing the Lewis structure of a polyatomic ion.\n\n(b) Draw the Lewis structure of the carbonate ion and calculate the formal charge on each atom.\n\n(c) Why is the carbonate ion described by resonance structures, and what is the C–O bond order?',
  model: `Count the valence electrons and add one for each negative charge, place the least electronegative atom in the centre, join atoms with single bonds, give octets, use multiple bonds if electrons are short, and check formal charges. Carbonate has 4 + 18 + 2 = 24 electrons; carbon forms one C=O and two C–O⁻ bonds. Formal charges are carbon 0, double-bonded oxygen 0 and each single-bonded oxygen ${fc(6, 6, 2)}, so the total is −2. The double bond can be placed on any of the three oxygens, giving three equivalent structures. The real ion is a hybrid with three equal C–O bonds of order 4/3, about 1.33.`,
  sol: 'Method; 24 electrons and formal charges; three equivalent structures and bond order 4/3.',
  scheme: [['(a) Steps', 1.5], ['(b) Structure and formal charges', 2], ['(c) Resonance and bond order', 1.5]],
  d: 3, c: 'application', t: [1, 2],
}));

// ================================================================ t02 bond parameters, resonance, polarity
add('resonance-mcq', mcq({
  stem: 'The bond order of each N–O bond in the nitrate ion, NO₃⁻, is:',
  right: '1.33',
  wrong: ['1', '2', '1.5'],
  sol: 'One double and two single bonds are spread over three equivalent N–O bonds: (2 + 1 + 1)/3 = 1.33 — option (@K). Ozone has bond order 1.5 (@3).',
  d: 2, c: 'application', t: [2],
}));
add('dipole-mcq', mcq({
  stem: 'Ammonia (1.47 D) and nitrogen trifluoride (0.23 D) are both pyramidal with a lone pair on nitrogen. The much smaller moment of NF₃ is because:',
  right: 'the lone-pair dipole opposes the resultant of the N–F bond dipoles',
  wrong: ['the N–F bonds are non-polar', 'nitrogen has no lone pair in NF₃', 'NF₃ is a planar molecule'],
  sol: 'In NF₃ fluorine is the negative end of each bond dipole, which points away from nitrogen, against the lone-pair dipole; in NH₃ both act in the same direction — option (@K).',
  d: 3, c: 'analysis', t: [2],
}));
add('bondlength-mcq', mcq({
  stem: 'Arrange the C–C bond in ethane, ethene and ethyne in order of decreasing bond length.',
  right: 'ethane > ethene > ethyne',
  wrong: ['ethyne > ethene > ethane', 'ethene > ethane > ethyne', 'ethane > ethyne > ethene'],
  sol: `Higher bond order gives a shorter bond: ${BL['C–C']} pm (single), ${BL['C=C']} pm (double), ${BL['C≡C']} pm (triple) — option (@K).`,
  d: 1, c: 'understanding', t: [2],
}));
add('bondenthalpy-mcq', mcq({
  stem: 'Which bond has the highest bond enthalpy?',
  right: 'N≡N',
  wrong: ['O=O', 'F–F', 'Cl–Cl'],
  sol: `The triple bond of N₂ (${BE['N≡N']} kJ mol⁻¹) is far stronger than O=O (${BE['O=O']}), Cl–Cl (${BE['Cl–Cl']}) or F–F (${BE['F–F']}) — option (@K).`,
  d: 1, c: 'recall', t: [2],
}));
add('zero-dipole-mcq', mcq({
  stem: 'Which of these molecules has zero dipole moment?',
  right: 'BF₃',
  wrong: ['NH₃', 'H₂O', 'CHCl₃'],
  sol: 'BF₃ is trigonal planar and symmetrical, so its three bond dipoles cancel — option (@K). The others are pyramidal, bent or have unequal bonds to carbon.',
  d: 1, c: 'understanding', t: [2],
}));
add('angle-mcq', mcq({
  stem: 'The H–X–H bond angles in CH₄, NH₃ and H₂O are 109.5°, 107° and 104.5°. The decrease is because:',
  right: 'lone pairs repel bond pairs more strongly than bond pairs repel each other',
  wrong: ['the central atoms become larger', 'the bonds become longer', 'the molecules become less polar'],
  sol: 'NH₃ has one lone pair and H₂O has two; the lone pair–bond pair repulsion squeezes the bond angle — option (@K).',
  d: 2, c: 'understanding', t: [2, 3],
}));
add('ozone-ar', ar({
  a: 'The two O–O bonds in ozone are equal in length.',
  r: 'The ozone molecule is bent.',
  key: 'b',
  sol: 'Both are true, but the bent shape does not explain the equal bonds; resonance (a hybrid of two structures) does — option (b).',
  d: 2, c: 'understanding', t: [2],
}));
add('dipole-ar', ar({
  a: 'The dipole moment of NF₃ is much smaller than that of NH₃.',
  r: 'In NF₃ the lone-pair dipole opposes the N–F bond dipoles.',
  key: 'a',
  sol: 'Both are true and R explains A: the opposing directions partly cancel in NF₃ — option (a).',
  d: 3, c: 'understanding', t: [2],
}));
add('n2-tf', tf({
  stem: 'In a resonance hybrid the molecule switches rapidly from one contributing structure to another.',
  key: 'f',
  sol: 'False. The molecule has a single real structure, the hybrid, which is more stable than any contributing structure; the structures are only a way of describing it.',
  d: 2, c: 'understanding', t: [2],
}));
{
  const bo = (2 + 1 + 1) / 3;
  add('bo-num', num({
    stem: 'Calculate the bond order of each C–O bond in the carbonate ion, CO₃²⁻.',
    value: Number(bo.toFixed(2)), tol: 0.01, unit: null,
    sol: r`One C=O and two C–O⁻ bonds are shared by three equivalent positions: $\dfrac{2 + 1 + 1}{3} = ${bo.toFixed(2)}$.`,
    scheme: [['(2 + 1 + 1)/3 = 1.33', 1]],
    d: 2, c: 'application', t: [2],
  }), () => near((2 + 1 + 1) / 3, 1.33, 0.01) || 'bo');
}
{
  const bl = 92;
  const q = (DIPOLE.HF * 3.336e-30) / (bl * 1e-12);
  const pct = (q / 1.602e-19) * 100;
  const q20 = q * 1e20;
  add('ionic-num', num({
    stem: `The dipole moment of HF is ${DIPOLE.HF} D and the H–F bond length is ${bl} pm. Calculate the percentage ionic character of the bond. (1 D = 3.336 × 10⁻³⁰ C m; e = 1.602 × 10⁻¹⁹ C)`,
    value: Number(pct.toFixed(1)), tol: 0.5, unit: '%',
    sol: r`Charge separated: $q = \dfrac{\mu}{d} = \dfrac{${DIPOLE.HF} \times 3.336 \times 10^{-30}}{${bl} \times 10^{-12}} = ${q20.toFixed(2)} \times 10^{-20}$ C. Percentage ionic character: $\dfrac{${q20.toFixed(2)} \times 10^{-20}}{1.602 \times 10^{-19}} \times 100 = ${pct.toFixed(1)}$, so about ${pct.toFixed(1)} per cent.`,
    scheme: [['q = μ/d', 1], ['q/e × 100 = 40.3 %', 1]],
    marks: 2,
    d: 3, c: 'application', t: [2],
  }), () => near(pct, 40.3, 0.01) || 'ionic');
}
{
  const dh = 946 + 3 * 436 - 6 * 391;
  add('dh-num', num({
    stem: 'Use bond enthalpies (N≡N 946, H–H 436, N–H 391 kJ mol⁻¹) to estimate the enthalpy change, in kJ, for N₂(g) + 3H₂(g) → 2NH₃(g).',
    value: dh, tol: 1, unit: 'kJ',
    sol: r`Bonds broken: 1 N≡N and 3 H–H; bonds formed: 6 N–H. $\Delta H = 946 + 3 \times 436 - 6 \times 391 = ${dh}$, so $${dh}\ \text{kJ}$ for the reaction as written.`,
    scheme: [['Bonds broken minus bonds formed', 1], ['−92 kJ', 1]],
    marks: 2,
    d: 3, c: 'application', t: [2],
  }), () => (946 + 3 * 436 - 6 * 391 === -92) || 'dh');
}
add('nh3nf3-short', short({
  marks: 2,
  stem: 'NH₃ has a dipole moment of 1.47 D while NF₃ has only 0.23 D, though N–F is more polar than N–H. Explain.',
  model: 'In NH₃ nitrogen is the negative end of each N–H bond dipole, so the bond dipoles point towards nitrogen and add to the lone-pair dipole. In NF₃ fluorine is more electronegative than nitrogen, so the bond dipoles point away from nitrogen and oppose the lone-pair dipole, giving a small resultant.',
  sol: 'Direction of the bond dipoles relative to the lone-pair dipole.',
  scheme: [['NH₃: dipoles in the same direction', 1], ['NF₃: bond dipoles oppose the lone pair', 1]],
  d: 3, c: 'analysis', t: [2],
}));
add('resonance-short3', short({
  marks: 3,
  stem: 'Explain resonance using ozone. What are the bond order and bond lengths of the two O–O bonds?',
  model: 'Ozone cannot be written with one Lewis structure that shows two equal O–O bonds. Two structures are drawn, O=O⁺–O⁻ and O⁻–O⁺=O, differing only in the position of electrons. The real molecule is a hybrid of both. Each O–O bond has bond order (2 + 1)/2 = 1.5, and both bonds are equal in length (128 pm), between a single and a double bond.',
  sol: 'Two structures, hybrid, bond order 1.5 and equal lengths.',
  scheme: [['Two contributing structures', 1], ['Hybrid is the real molecule', 1], ['Bond order 1.5, equal lengths', 1]],
  d: 2, c: 'application', t: [2],
}));
add('bondparam-short3', short({
  marks: 3,
  stem: 'Define bond length and bond enthalpy. Compare C–C, C=C and C≡C in both respects, with values.',
  model: `Bond length is the distance between the nuclei of two bonded atoms, and bond enthalpy is the energy needed to break one mole of the bond in the gas phase. As the bond order rises from single to triple the length falls (${BL['C–C']}, ${BL['C=C']} and ${BL['C≡C']} pm) and the bond enthalpy rises (${BE['C–C']}, ${BE['C=C']} and ${BE['C≡C']} kJ mol⁻¹), because more shared pairs hold the nuclei closer and more tightly.`,
  sol: 'Two definitions, lengths and enthalpies of the three bonds.',
  scheme: [['Both definitions', 1], ['Trend in length with values', 1], ['Trend in enthalpy with values', 1]],
  d: 2, c: 'understanding', t: [2],
}));


// ================================================================ t03 VSEPR
add('vsepr-check-mcq', mcq({
  stem: 'Sulfur tetrafluoride, SF₄, has four bond pairs and one lone pair on sulfur. Its shape is:',
  right: 'see-saw',
  wrong: ['tetrahedral', 'square planar', 'T-shaped'],
  sol: `Five pairs give a trigonal bipyramid; the lone pair takes an equatorial position, leaving a see-saw shape — option (@K). Tetrahedral (@1) would need no lone pair on a four-pair centre.`,
  d: 2, c: 'application', t: [3],
}));
add('vsepr-xef4-mcq', mcq({
  stem: 'Xenon tetrafluoride has the following number of lone pairs on xenon and shape:',
  right: '2 lone pairs, square planar',
  wrong: ['1 lone pair, square pyramidal', '0 lone pairs, tetrahedral', '2 lone pairs, tetrahedral'],
  sol: `Xe has 8 electrons, 4 used in bonds, so ${SPECIES.XeF4.lp} lone pairs; six pairs form an octahedron and the lone pairs sit opposite each other, giving a square plane — option (@K).`,
  d: 3, c: 'application', t: [3],
}));
add('lp-pos-mcq', mcq({
  stem: 'In ClF₃ the two lone pairs on chlorine occupy:',
  right: 'equatorial positions of a trigonal bipyramid',
  wrong: ['both axial positions', 'one axial and one equatorial position', 'two adjacent corners of an octahedron'],
  sol: 'Equatorial positions have fewer 90° repulsions, so lone pairs go there first; the remaining three atoms form a T — option (@K).',
  d: 3, c: 'understanding', t: [3],
}));
add('sf4-ar', ar({
  a: 'The shape of SF₄ is see-saw.',
  r: 'There is no lone pair on the sulfur atom in SF₄.',
  key: 'c',
  sol: `A is true. R is false: sulfur has ${SPECIES.SF4.lp} lone pair, and that lone pair is why the shape is see-saw rather than trigonal bipyramidal — option (c).`,
  d: 2, c: 'understanding', t: [3],
}));
{
  const total = SPECIES.XeF2.lp + 2 * 3;
  add('lp-num', num({
    stem: 'How many lone pairs are present in total (on all atoms) in one XeF₂ molecule?',
    value: total, tol: 0, unit: null,
    sol: r`Xenon has ${SPECIES.XeF2.lp} lone pairs and each fluorine has 3: $${SPECIES.XeF2.lp} + 2 \times 3 = ${total}$.`,
    scheme: [['3 + 2 × 3 = 9', 1]],
    d: 3, c: 'analysis', t: [3],
  }), () => (SPECIES.XeF2.lp + 6 === 9) || 'lp');
}
add('vsepr-short3', short({
  marks: 3,
  stem: 'Explain the decrease in H–X–H angle from CH₄ (109.5°) to NH₃ (107°) to H₂O (104.5°) using VSEPR theory.',
  model: 'In all three molecules the central atom has four electron pairs in a tetrahedral arrangement. Methane has four bond pairs and the ideal angle. Ammonia has three bond pairs and one lone pair; the lone pair repels the bond pairs more than they repel each other, closing the angle to 107°. Water has two lone pairs, so the repulsion is greater still, giving 104.5°.',
  sol: 'Same arrangement; increasing lone-pair repulsion.',
  scheme: [['Four pairs in each, tetrahedral arrangement', 1], ['Lone pair repels more than bond pair', 1], ['More lone pairs give smaller angles', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('vsepr-long', long({
  stem: '(a) State the postulates of VSEPR theory.\n\n(b) Predict the shapes of SF₄, ClF₃ and XeF₂, stating the lone pairs and where they are placed.\n\n(c) Predict the shapes of BrF₅ and XeF₄.',
  model: `Electron pairs around a central atom repel and arrange themselves as far apart as possible; repulsion follows lone pair–lone pair > lone pair–bond pair > bond pair–bond pair, and a multiple bond counts as one region. SF₄ has ${SPECIES.SF4.lp} lone pair, ClF₃ has ${SPECIES.ClF3.lp} and XeF₂ has ${SPECIES.XeF2.lp}, all in equatorial positions of a trigonal bipyramid, giving see-saw, T-shaped and linear shapes. BrF₅ has ${SPECIES.BrF5.lp} lone pair on an octahedral arrangement, so it is square pyramidal, and XeF₄ has ${SPECIES.XeF4.lp} lone pairs opposite each other, so it is square planar.`,
  sol: 'Postulates; lone pairs equatorial; octahedral derivatives.',
  scheme: [['(a) Postulates and repulsion order', 1.5], ['(b) Three shapes with lone-pair positions', 2], ['(c) Two shapes', 1.5]],
  d: 3, c: 'application', t: [3],
}));
add('vsepr-short2', short({
  marks: 2,
  stem: 'Why is the shape of H₂O called bent although the four electron pairs on oxygen are arranged tetrahedrally?',
  model: 'The arrangement counts all four electron pairs, two bond pairs and two lone pairs, which point to the corners of a tetrahedron. The shape describes only the positions of the atoms, and since two corners are occupied by lone pairs, the three atoms H–O–H form a bent (V-shaped) molecule.',
  sol: 'Arrangement counts lone pairs; shape names atoms only.',
  scheme: [['Arrangement includes lone pairs: tetrahedral', 1], ['Shape names atoms only: bent', 1]],
  d: 2, c: 'understanding', t: [3],
}));

// ================================================================ t04 valence bond theory and hybridisation
add('hybrid-check-mcq', mcq({
  stem: 'In which of these species is the central atom sp³d² hybridised?',
  right: 'XeF₄',
  wrong: ['XeF₂', 'SF₄', 'PCl₅'],
  sol: `XeF₄ has six electron pairs on xenon (steric number ${SPECIES.XeF4.sn}): sp³d² — option (@K). XeF₂ (@1), SF₄ (@2) and PCl₅ (@3) have five, so they are sp³d.`,
  d: 3, c: 'application', t: [4],
}));
add('pcl5-mcq', mcq({
  stem: 'In the trigonal bipyramidal molecule PCl₅, the two axial P–Cl bonds are:',
  right: 'longer than the three equatorial P–Cl bonds',
  wrong: ['shorter than the equatorial bonds', 'equal in length to the equatorial bonds', 'double bonds'],
  sol: 'Each axial bond has three 90° repulsions from equatorial pairs, while an equatorial bond has only two, so the axial bonds are longer — option (@K).',
  d: 2, c: 'understanding', t: [3, 4],
}));
add('sigma-pi-mcq', mcq({
  stem: 'The numbers of σ and π bonds in acrylonitrile, CH₂=CH–C≡N, are respectively:',
  right: '6 and 3',
  wrong: ['5 and 4', '7 and 2', '6 and 4'],
  sol: 'σ bonds: three C–H, one C–C, one C=C, one C≡N = 6. π bonds: one in C=C and two in C≡N = 3 — option (@K).',
  d: 3, c: 'application', t: [4],
}));

add('sg-fill', fill({
  stem: 'The hybridisation of sulfur in SF₆ is ___.',
  acc: [['sp3d2', 'sp³d²', 'sp3d²', 'sp^3d^2']],
  sol: `Six bond pairs and no lone pair give steric number ${SPECIES.SF6.sn}: **sp³d²** (sp3d2).`,
  d: 1, c: 'recall', t: [4],
}));
add('shape-match', match({
  stem: 'Match each molecule with its shape.',
  pairs: [['SF₄', 'See-saw'], ['ClF₃', 'T-shaped'], ['XeF₂', 'Linear'], ['XeF₄', 'Square planar']],
  order: [1, 3, 0, 2],
  sol: 'SF₄ is see-saw, ClF₃ is T-shaped, XeF₂ is linear and XeF₄ is square planar.',
  d: 2, c: 'understanding', t: [3],
}));
add('hybrid-match', match({
  stem: 'Match each species with the hybridisation of its central atom.',
  pairs: [['BeCl₂', 'sp'], ['BF₃', 'sp²'], ['CH₄', 'sp³'], ['PCl₅', 'sp³d']],
  order: [2, 0, 3, 1],
  sol: 'BeCl₂ is sp, BF₃ is sp², CH₄ is sp³ and PCl₅ is sp³d.',
  d: 1, c: 'recall', t: [4],
}));
{
  const sigma = 4 + 3;
  add('sigma-num', num({
    stem: 'How many σ bonds are there in one molecule of CH₂=CH–C≡CH?',
    value: sigma, tol: 0, unit: null,
    sol: r`C–H bonds: 2 + 1 + 1 = 4; C–C σ bonds: 3 (one each from the double, single and triple links). Total $4 + 3 = ${sigma}$ (the molecule also has 3 π bonds).`,
    scheme: [['4 + 3 = 7', 1]],
    d: 3, c: 'application', t: [4],
  }), () => (4 + 3 === 7) || 'sigma');
}
add('hybrid-short', short({
  marks: 2,
  stem: 'Give the hybridisation of carbon in CH₄, C₂H₄ and C₂H₂ and state the number of σ and π bonds in C₂H₂.',
  model: 'Carbon is sp³ in methane (four bonds), sp² in ethene (three regions per carbon) and sp in ethyne (two regions per carbon). Ethyne, H–C≡C–H, has three σ bonds, two C–H and one C–C, and two π bonds in the triple bond.',
  sol: 'Steric numbers 4, 3 and 2; ethyne has 3σ and 2π.',
  scheme: [['Three hybridisations', 1], ['3σ and 2π in ethyne', 1]],
  d: 2, c: 'application', t: [4],
}));
add('sigma-short', short({
  marks: 2,
  stem: 'Distinguish between a σ bond and a π bond with respect to the type of overlap and relative strength.',
  model: 'A σ bond is formed by head-on overlap of orbitals along the line joining the nuclei, so the overlap is large and the bond is strong. A π bond is formed by sideways overlap of two parallel p orbitals above and below the axis, so the overlap is smaller and the bond is weaker.',
  sol: 'Head-on against sideways overlap.',
  scheme: [['σ: head-on overlap, stronger', 1], ['π: sideways overlap, weaker', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('hybrid-short3', short({
  marks: 3,
  stem: 'Explain, using steric numbers, why the central atoms of SF₄ and XeF₄ have different hybridisation although both have four bonded fluorine atoms.',
  model: `Sulfur in SF₄ has four bond pairs and one lone pair, steric number ${SPECIES.SF4.sn}, so it is sp³d and the shape is see-saw. Xenon in XeF₄ has four bond pairs and two lone pairs, steric number ${SPECIES.XeF4.sn}, so it is sp³d² and the shape is square planar. The lone pairs count as regions of electron density, so the number of hybrid orbitals differs although the bonded atoms are the same.`,
  sol: 'Add lone pairs to bond pairs to get the steric number.',
  scheme: [['SF₄: 5 regions, sp³d', 1], ['XeF₄: 6 regions, sp³d²', 1], ['Lone pairs count as regions', 1]],
  d: 3, c: 'analysis', t: [3, 4],
}));
add('hybrid-long', long({
  stem: '(a) What is hybridisation? State two conditions for it.\n\n(b) Describe the formation of the bonds in methane and ethene, giving the hybridisation and the σ and π bonds.\n\n(c) Why is the H–N–H angle in ammonia 107° rather than 109.5°?',
  model: 'Hybridisation is the mixing of atomic orbitals of similar energy on one atom to give equivalent hybrid orbitals; the orbitals must have similar energies, and the number of hybrid orbitals equals the number mixed. In methane carbon is sp³; four hybrid orbitals overlap with 1s of hydrogen to form four σ bonds at 109.5°. In ethene each carbon is sp², giving three σ bonds in a plane, with the unhybridised p orbitals overlapping sideways to form one π bond. In ammonia nitrogen is sp³ but one hybrid holds a lone pair, which repels the bond pairs more, closing the angle to 107°.',
  sol: 'Definition and conditions; methane and ethene bonding; lone-pair repulsion in ammonia.',
  scheme: [['(a) Definition and conditions', 1.5], ['(b) Methane and ethene', 2.5], ['(c) Ammonia angle', 1]],
  d: 3, c: 'understanding', t: [4],
}));
add('hybrid-case', mk.case({
  passage: r`The central atoms of three species are described by their electron pairs.

| Species | Bond pairs | Lone pairs on the central atom |
|---|---|---|
| BF₃ | 3 | 0 |
| NH₃ | 3 | 1 |
| XeF₄ | 4 | 2 |`,
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'The hybridisation of the central atom in XeF₄ is:',
      right: 'sp³d²',
      wrong: ['sp³d', 'sp³', 'sp²'],
      sol: 'Four bond pairs plus two lone pairs make six regions, so the hybridisation is sp³d² — option (@K).',
      d: 2, c: 'application', t: [4],
    })),
    part('b', short({
      marks: 1,
      stem: 'Name the shape of NH₃ and give its hybridisation.',
      model: 'NH₃ is trigonal pyramidal, and nitrogen is sp³ hybridised.',
      sol: 'Four regions (3 bonds + 1 lone pair).',
      scheme: [['Trigonal pyramidal, sp³', 1]],
      d: 2, c: 'application', t: [3, 4],
    })),
    part('c', short({
      marks: 2,
      stem: 'Explain why the H–N–H angle in NH₃ (107°) is less than the F–B–F angle in BF₃ (120°).',
      model: 'Boron in BF₃ is sp² with three bond pairs and no lone pair, so the angle is the ideal 120°. Nitrogen in NH₃ is sp³ with a lone pair, and the lone pair repels the three bond pairs more strongly, so the angle is reduced from 109.5° to 107°.',
      sol: 'Different arrangements, and lone-pair repulsion in NH₃.',
      scheme: [['BF₃: sp², no lone pair, 120°', 1], ['NH₃: lone pair compresses the angle', 1]],
      d: 3, c: 'analysis', t: [3, 4],
    }), [
      short({
        marks: 2,
        stem: 'XeF₄ has four polar Xe–F bonds but a zero dipole moment. Explain.',
        model: 'XeF₄ is square planar, with the four Xe–F bonds in one plane at 90° to each other and the two lone pairs above and below the plane. The bond dipoles are equal and opposite in pairs, so they cancel, and the lone-pair dipoles also cancel, giving zero resultant.',
        sol: 'Square planar symmetry cancels the dipoles.',
        scheme: [['Square planar shape', 1], ['Dipoles cancel by symmetry', 1]],
        d: 3, c: 'analysis', t: [2, 3],
      }),
    ]),
  ],
}));

// ================================================================ t05 MO theory and hydrogen bonding
const M = (n, mix) => mo(n, mix);
add('mo-order-mcq', mcq({
  stem: 'In which molecule does the π2p molecular orbital lie below the σ2p orbital?',
  right: 'N₂',
  wrong: ['O₂', 'F₂', 'Ne₂'],
  sol: 'Mixing of 2s and 2p orbitals, important up to N₂, lowers π2p below σ2p. From O₂ onwards the 2s–2p gap is larger and σ2p is lower — option (@K).',
  d: 2, c: 'understanding', t: [5],
}));
{
  const m = M(13, false);
  add('bo-mcq', mcq({
    stem: 'The bond order of the superoxide ion, O₂⁻, is:',
    right: String(m.bo),
    wrong: ['1', '2', '2.5'],
    sol: `O₂⁻ has 13 valence electrons: ${m.bonding} bonding and ${m.anti} antibonding, so bond order (${m.bonding} − ${m.anti})/2 = ${m.bo} — option (@K).`,
    d: 2, c: 'application', t: [5],
  }));
}
{
  const ok = [M(6, true), M(8, true), M(10, true), M(14, false)];
  if (!(ok[0].unpaired === 2 && ok.slice(1).every((x) => x.unpaired === 0))) throw new Error('para');
  add('magnetic-mcq', mcq({
    stem: 'Which of the following diatomic molecules is paramagnetic?',
    right: 'B₂',
    wrong: ['C₂', 'N₂', 'F₂'],
    sol: 'In B₂ the last two electrons occupy the two degenerate π2p orbitals singly, so it has two unpaired electrons — option (@K). C₂, N₂ and F₂ have all electrons paired.',
    d: 3, c: 'application', t: [5],
  }));
}
add('hbond-check-mcq', mcq({
  stem: 'o-Nitrophenol is steam volatile but p-nitrophenol is not, because:',
  right: 'o-nitrophenol has intramolecular hydrogen bonds, while p-nitrophenol has intermolecular ones',
  wrong: ['p-nitrophenol has no –OH group', 'o-nitrophenol has a higher molar mass', 'o-nitrophenol forms an ionic lattice'],
  sol: 'Intramolecular hydrogen bonding in the ortho isomer keeps molecules separate, so it is more volatile; intermolecular bonds link molecules of the para isomer — option (@K).',
  d: 3, c: 'application', t: [5],
}));
add('hbond-bp-mcq', mcq({
  stem: 'Which of these hydrides has the highest boiling point?',
  right: 'H₂O',
  wrong: ['H₂S', 'H₂Se', 'H₂Te'],
  sol: 'Water forms strong intermolecular hydrogen bonds, which outweigh the increase in van der Waals forces down the group — option (@K).',
  d: 1, c: 'understanding', t: [5],
}));
add('o2mag-ar', ar({
  a: 'The oxygen molecule is diamagnetic.',
  r: 'Oxygen has two unpaired electrons in its π*2p orbitals.',
  key: 'd',
  sol: 'A is false: oxygen is paramagnetic. R is true, and is the reason for its paramagnetism — option (d).',
  d: 2, c: 'understanding', t: [5],
}));
add('hbond-ar', ar({
  a: 'o-Nitrophenol is steam volatile, but p-nitrophenol is not.',
  r: 'o-Nitrophenol has intramolecular hydrogen bonding.',
  key: 'a',
  sol: 'Both are true; intramolecular hydrogen bonds stop the molecules associating, so o-nitrophenol is volatile; R explains A — option (a).',
  d: 3, c: 'understanding', t: [5],
}));
add('mo-fill', fill({
  stem: 'The bond order of the helium molecule, He₂, is ___.',
  acc: [['0', 'zero']],
  sol: `He₂ has 2 bonding and 2 antibonding electrons, so (2 − 2)/2 = **${mo1s(4).bo}**; the molecule does not exist.`,
  d: 1, c: 'application', t: [5],
}));
{
  const m = M(9, true);
  add('mo-num', num({
    stem: 'Calculate the bond order of N₂⁺, which has 9 valence electrons.',
    value: m.bo, tol: 0, unit: null,
    sol: r`With mixing the filling is σ2s², σ*2s², π2p⁴, σ2p¹: $N_b = ${m.bonding}$, $N_a = ${m.anti}$. Bond order $= \dfrac{${m.bonding} - ${m.anti}}{2} = ${m.bo}$.`,
    scheme: [['(7 − 2)/2 = 2.5', 1]],
    d: 3, c: 'application', t: [5],
  }), () => (M(9, true).bo === 2.5) || 'n2+');
}
{
  const m = M(6, true);
  add('unpaired-num', num({
    stem: 'How many unpaired electrons are there in the B₂ molecule (6 valence electrons)?',
    value: m.unpaired, tol: 0, unit: null,
    sol: r`Filling: σ2s², σ*2s², then π2p with 2 electrons, one in each of the two degenerate orbitals (Hund). Unpaired electrons $= ${m.unpaired}$.`,
    scheme: [['Two unpaired electrons', 1]],
    d: 3, c: 'application', t: [5],
  }), () => (M(6, true).unpaired === 2) || 'b2');
}
add('mo-short', short({
  marks: 2,
  stem: 'Why does the molecule He₂ not exist, whereas H₂ does? Use bond order.',
  model: 'In H₂ two electrons fill the σ1s bonding orbital, so the bond order is (2 − 0)/2 = 1. In He₂ four electrons fill both σ1s and σ*1s, so the bond order is (2 − 2)/2 = 0. With no net bonding, He₂ is no more stable than two separate atoms and does not exist.',
  sol: 'Bond order of one for H₂ and zero for He₂.',
  scheme: [['H₂ bond order 1', 1], ['He₂ bond order 0, not stable', 1]],
  d: 2, c: 'application', t: [5],
}));
add('hbond-short', short({
  marks: 2,
  stem: 'Explain why ice floats on water.',
  model: 'In ice each water molecule forms four hydrogen bonds in an open, cage-like structure with empty spaces. When ice melts, some bonds break and molecules move into the gaps, so liquid water is more compact. Ice therefore has a lower density than water and floats.',
  sol: 'Open hydrogen-bonded structure of ice.',
  scheme: [['Open hydrogen-bonded structure of ice', 1], ['Lower density than liquid water', 1]],
  d: 2, c: 'understanding', t: [5],
}));
add('mo-long', long({
  stem: '(a) State the rules for filling molecular orbitals and define bond order.\n\n(b) Write the valence molecular orbital configuration of N₂ and O₂, giving bond order and magnetic behaviour.\n\n(c) Arrange O₂⁺, O₂, O₂⁻ and O₂²⁻ in increasing order of bond length.',
  model: `Electrons fill molecular orbitals in order of increasing energy, at most two per orbital with opposite spins, and singly in degenerate orbitals first. Bond order is (bonding electrons − antibonding electrons)/2. N₂ is σ2s² σ*2s² π2p⁴ σ2p², bond order 3, no unpaired electrons, diamagnetic. O₂ is σ2s² σ*2s² σ2p² π2p⁴ π*2p², bond order 2, with two unpaired electrons, so paramagnetic. Bond orders are O₂⁺ ${mo(11, false).bo}, O₂ 2, O₂⁻ ${mo(13, false).bo} and O₂²⁻ ${mo(14, false).bo}, and bond length increases as bond order falls: O₂⁺ < O₂ < O₂⁻ < O₂²⁻.`,
  sol: 'Filling rules; two configurations with bond order and magnetism; bond-order sequence.',
  scheme: [['(a) Rules and bond order', 1.5], ['(b) Two configurations, orders and magnetism', 2], ['(c) Sequence by bond order', 1.5]],
  d: 4, c: 'analysis', t: [5],
}));
add('hbond-long', long({
  stem: '(a) What is a hydrogen bond? What conditions favour it?\n\n(b) Distinguish between intermolecular and intramolecular hydrogen bonding with one example each.\n\n(c) Explain the effect of hydrogen bonding on the boiling points of H₂O, H₂S and HF, HCl.',
  model: 'A hydrogen bond is the attraction between a hydrogen atom bonded to a small, highly electronegative atom (F, O or N) and a lone pair on another such atom. In intermolecular bonding the hydrogen bond joins different molecules, as in water or HF; in intramolecular bonding it forms within a molecule, as in o-nitrophenol. Association through intermolecular hydrogen bonds raises boiling points, so water (373 K) boils far above H₂S (213 K), and HF (293 K) above HCl (188 K). Intramolecular bonding keeps molecules separate and makes them more volatile.',
  sol: 'Definition; two types with examples; boiling-point comparison.',
  scheme: [['(a) Definition and conditions', 1.5], ['(b) Two types with examples', 1.5], ['(c) Boiling-point comparison', 2]],
  d: 3, c: 'understanding', t: [5],
}));
add('mo-case', mk.case({
  passage: r`A student compares two diatomic molecules.

| Property | N₂ | O₂ |
|---|---|---|
| Bond enthalpy / kJ mol⁻¹ | 946 | 498 |
| Bond length / pm | 109 | 121 |
| Liquid in a strong magnetic field | Not attracted | Attracted |`,
  d: 4, c: 'analysis',
  children: [
    part('a', mcq({
      stem: 'The attraction of liquid oxygen to a magnet is explained by:',
      right: 'two unpaired electrons in the π*2p orbitals',
      wrong: ['a bond order of three', 'complete pairing of all electrons', 'a lone pair on each atom only'],
      sol: 'Hund’s rule places the last two electrons singly in the two π*2p orbitals, so oxygen is paramagnetic — option (@K).',
      d: 2, c: 'application', t: [5],
    })),
    part('b', short({
      marks: 1,
      stem: 'Which molecule has the higher bond order, and by how much?',
      model: 'N₂ has bond order 3 and O₂ has 2, so nitrogen’s is higher by one.',
      sol: 'Bond order 3 against 2.',
      scheme: [['N₂ is higher by 1', 1]],
      d: 2, c: 'application', t: [5],
    })),
    part('c', short({
      marks: 2,
      stem: 'Use MO theory to explain the bond enthalpy and bond length differences between N₂ and O₂.',
      model: 'N₂ has no electrons in antibonding π* orbitals and bond order 3, while O₂ has two π*2p electrons, lowering its bond order to 2. The higher bond order in N₂ gives a shorter, much stronger bond: 110 pm and 946 kJ mol⁻¹ against 121 pm and 498 kJ mol⁻¹.',
      sol: 'Higher bond order gives a shorter, stronger bond.',
      scheme: [['Bond order 3 against 2 from π* electrons', 1], ['Shorter and stronger bond in N₂', 1]],
      d: 3, c: 'analysis', t: [5],
    }), [
      short({
        marks: 2,
        stem: 'Predict whether O₂⁺ has a shorter or longer bond than O₂ and whether it is paramagnetic. Give reasons.',
        model: 'O₂⁺ loses one π*2p electron, so its bond order rises to 2.5 and the bond is shorter than in O₂. One unpaired electron remains in a π*2p orbital, so O₂⁺ is paramagnetic.',
        sol: 'Electron removed from an antibonding orbital.',
        scheme: [['Bond order 2.5, shorter bond', 1], ['One unpaired electron, paramagnetic', 1]],
        d: 4, c: 'evaluation', t: [5],
      }),
    ]),
  ],
}));
add('dipole-case', mk.case({
  passage: r`Dipole moments (in debye) of some molecules are given.

| Molecule | H₂O | CO₂ | NH₃ | NF₃ | BF₃ |
|---|---|---|---|---|---|
| Dipole moment | ${DIPOLE.H2O} | 0 | ${DIPOLE.NH3} | ${DIPOLE.NF3} | 0 |`,
  d: 3, c: 'analysis',
  children: [
    part('a', mcq({
      stem: 'Which conclusion about shape is supported by the data?',
      right: 'H₂O is bent, whereas CO₂ is linear.',
      wrong: ['H₂O and CO₂ are both linear.', 'CO₂ is bent but its bonds are non-polar.', 'NF₃ is a planar molecule.'],
      sol: 'A non-zero moment for H₂O needs a bent shape, while zero for CO₂ requires linear symmetry — option (@K). A planar NF₃ (@3) would have zero moment.',
      d: 3, c: 'analysis', t: [2],
    })),
    part('b', num({
      stem: 'How many times larger is the dipole moment of NH₃ than that of NF₃? (Answer to one decimal place.)',
      value: Number((DIPOLE.NH3 / DIPOLE.NF3).toFixed(1)), tol: 0.1, unit: null,
      sol: r`Ratio $= \dfrac{${DIPOLE.NH3}}{${DIPOLE.NF3}} = ${(DIPOLE.NH3 / DIPOLE.NF3).toFixed(1)}$.`,
      scheme: [['1.47/0.23 = 6.4', 1]],
      d: 2, c: 'application', t: [2],
    })),
    part('c', short({
      marks: 2,
      stem: 'Explain why BF₃ and CO₂ have zero dipole moment but H₂O does not.',
      model: 'BF₃ is trigonal planar and CO₂ is linear, so their equal bond dipoles cancel by symmetry. Water is bent, so its two O–H bond dipoles do not cancel and have a resultant along the bisector of the angle.',
      sol: 'Symmetric shapes cancel dipoles; bent water does not.',
      scheme: [['BF₃ and CO₂ symmetric, dipoles cancel', 1], ['Bent water has a resultant', 1]],
      d: 3, c: 'analysis', t: [2],
    }), [
      short({
        marks: 2,
        stem: 'Predict, with reasons, whether CCl₄ is polar.',
        model: 'CCl₄ is tetrahedral and symmetrical, so the four equal C–Cl bond dipoles cancel and the dipole moment is zero, even though each bond is polar. It is therefore non-polar.',
        sol: 'Tetrahedral symmetry cancels the dipoles.',
        scheme: [['Tetrahedral and symmetrical', 1], ['Dipoles cancel, non-polar', 1]],
        d: 3, c: 'application', t: [2],
      }),
    ]),
  ],
}), () => near(1.47 / 0.23, 6.4, 0.01) || 'ratio');
add('hbond-case', mk.case({
  passage: r`Boiling points (K) of some hydrides: H₂O 373, H₂S 213, HF 293, HCl 188. The melting points of o-nitrophenol and p-nitrophenol are 318 K and 387 K.`,
  d: 3, c: 'analysis',
  children: [
    part('a', mcq({
      stem: 'The high boiling point of water compared with H₂S is due to:',
      right: 'intermolecular hydrogen bonding in water',
      wrong: ['the lower molar mass of water', 'ionic bonds between water molecules', 'the higher bond angle of water'],
      sol: 'Hydrogen bonds link water molecules into associated groups that need extra energy to separate — option (@K).',
      d: 2, c: 'understanding', t: [5],
    })),
    part('b', num({
      stem: 'By how many kelvin does the boiling point of H₂O exceed that of H₂S?',
      value: 373 - 213, tol: 0, unit: 'K',
      sol: r`$373 - 213 = ${373 - 213}$, so $${373 - 213}\ \text{K}$.`,
      scheme: [['373 − 213 = 160 K', 1]],
      d: 1, c: 'application', t: [5],
    })),
    part('c', short({
      marks: 2,
      stem: 'Why does p-nitrophenol melt at a higher temperature than o-nitrophenol?',
      model: 'p-Nitrophenol forms intermolecular hydrogen bonds, which hold molecules together in a lattice and need more energy to break. In o-nitrophenol the hydrogen bond is intramolecular, so molecules are not linked together and it melts lower.',
      sol: 'Intermolecular against intramolecular hydrogen bonding.',
      scheme: [['p: intermolecular bonds raise the melting point', 1], ['o: intramolecular, molecules not linked', 1]],
      d: 3, c: 'analysis', t: [5],
    }), [
      short({
        marks: 2,
        stem: 'Explain why HF has a higher boiling point than HCl although HCl is heavier.',
        model: 'Fluorine is small and highly electronegative, so HF molecules form strong hydrogen bonds with one another. Chlorine is larger and cannot form comparable hydrogen bonds, so the association in HF raises its boiling point (293 K) above that of HCl (188 K).',
        sol: 'Hydrogen bonding in HF only.',
        scheme: [['HF forms strong hydrogen bonds', 1], ['HCl cannot, so lower boiling point', 1]],
        d: 3, c: 'evaluation', t: [5],
      }),
    ]),
  ],
}));
void mag;
