// ch04 Chemical Bonding and Molecular Structure — two decks.
// Part 1 (t01, t02): Kössel–Lewis, ionic and covalent bonds, formal charge, bond parameters, resonance, dipole moment.
// Part 2 (t03, t04, t05): VSEPR, valence bond theory and hybridisation, MO theory, hydrogen bond.
import { sl, deck, table, flow, svgV, r } from './lib.mjs';
import { SHAPES5, SHAPES_LP_A, SHAPES_LP_B, OVERLAP, MO_N2, MO_O2 } from './svgs.mjs';
import { fc, SPECIES, DIATOMICS, mo, mag, BE, BL, DIPOLE } from './data.mjs';

export const V = {
  shapes5: svgV(SHAPES5, 'The five ideal VSEPR shapes AB2 to AB6 with no lone pairs: linear, trigonal planar, tetrahedral, trigonal bipyramidal and octahedral', 'Schematic; solid lines are in or near the plane of the page, dashed lines point backwards.'),
  lpA: svgV(SHAPES_LP_A, 'Ammonia (trigonal pyramidal), water (bent) and sulfur dioxide (bent) drawn from their parent arrangements with lone pairs shown'),
  lpB: svgV(SHAPES_LP_B, 'Sulfur tetrafluoride (see-saw), chlorine trifluoride (T-shaped), xenon difluoride (linear), bromine pentafluoride (square pyramidal) and xenon tetrafluoride (square planar), with their lone pairs'),
  overlap: svgV(OVERLAP, 'Four types of orbital overlap: s with s, s with p, p with p head on, all forming sigma bonds, and p with p sideways forming a pi bond'),
  moN2: svgV(MO_N2, 'Molecular orbital diagram of nitrogen with ten valence electrons, bond order three, diamagnetic', 'Computed from the electron count; s–p mixing puts π2p below σ2p.'),
  moO2: svgV(MO_O2, 'Molecular orbital diagram of oxygen with twelve valence electrons, bond order two, two unpaired electrons in the pi star orbitals', 'Computed from the electron count; σ2p lies below π2p.'),
};

// ---- computed numbers used in Part 1
const NO3 = { N: fc(5, 0, 8), Od: fc(6, 4, 4), Os: fc(6, 6, 2) };
if (NO3.N !== 1 || NO3.Od !== 0 || NO3.Os !== -1 || NO3.N + NO3.Od + 2 * NO3.Os !== -1) throw new Error('nitrate formal charges');
const O3 = { mid: fc(6, 2, 6), dbl: fc(6, 4, 4), sgl: fc(6, 6, 2) };
if (O3.mid !== 1 || O3.dbl !== 0 || O3.sgl !== -1) throw new Error('ozone formal charges');
const boCO3 = (2 + 1 + 1) / 3;
const boO3 = (2 + 1) / 2;
const e = 1.602e-19;
const D = 3.336e-30;
const q = (DIPOLE.HCl * D) / (BL['H–Cl'] * 1e-12);
const ionicPct = (q / e) * 100;
const f = (x, n = 1) => x.toFixed(n);
const fmt = (x) => (x > 0 ? `+${x}` : x < 0 ? `−${Math.abs(x)}` : '0');

export const deck1 = deck({
  part: 1,
  title: 'Chemical Bonding and Molecular Structure — Part 1: Lewis structures, bond parameters and polarity',
  goals: [
    'Explain the octet rule, ionic bonding and lattice enthalpy qualitatively',
    'Draw Lewis structures and calculate formal charges, including resonance and octet exceptions',
    'Use bond length, bond angle, bond enthalpy and bond order to compare bonds',
    'Explain bond polarity and dipole moment, including NH₃ and NF₃, H₂O and CO₂, and BF₃',
  ],
  slides: [
    sl('title', 'Chemical Bonding and Molecular Structure', {
      b: 'Part 1 — why atoms join, how to draw their bonding electrons, and what the measurable properties of a bond tell us.',
      v: table(['Type of bond', 'How it forms', 'Examples'], [['Ionic', 'Transfer of electrons', 'NaCl, MgO'], ['Covalent', 'Sharing of electron pairs', 'H₂, O₂, N₂, CH₄'], ['Polar covalent', 'Unequal sharing of a pair', 'HCl, H₂O']], 'Table of three kinds of chemical bond with how each forms and examples'),
      n: 'Almost nothing around us is a free atom. Atoms combine, and the way they combine decides whether a substance is a salt, a gas or a liquid. In this part we meet the Kössel and Lewis idea of the octet, draw Lewis structures, calculate formal charges, and use bond length, bond enthalpy and dipole moment to compare bonds.',
    }),
    sl('concept', 'The Kössel–Lewis approach and the octet rule', {
      b: 'Atoms combine to reach the **stable configuration of a noble gas**: eight electrons in the outer shell (the **octet**), or two for hydrogen (the **duplet**). A **Lewis symbol** shows the valence electrons as dots around the atomic symbol.',
      v: table(['Group', '1', '2', '13', '14', '15', '16', '17', '18'], [['Valence electrons', '1', '2', '3', '4', '5', '6', '7', '8 (He: 2)'], ['Example', 'Na', 'Mg', 'Al', 'C', 'N', 'O', 'Cl', 'Ne']], 'Table of the number of valence electrons in each main group with an example element'),
      n: 'Kössel and Lewis explained bonding by the unusual stability of the noble gases. An atom tends to gain, lose or share electrons until it has eight in its outer shell, an octet. Hydrogen needs only two. A Lewis symbol is just the atom’s symbol with dots for its valence electrons, and the number of dots equals the group number, or the group number minus ten for the p block.',
    }),
    sl('concept', 'Ionic bonds and lattice enthalpy', {
      b: 'An ionic bond forms when a metal **loses** and a non-metal **gains** electrons, and the ions attract. It is favoured by a **low ionisation enthalpy** of the metal, a **negative electron gain enthalpy** of the non-metal and a **high lattice enthalpy**. Lattice enthalpy rises with **higher ionic charge** and **smaller ionic size**.',
      v: table(['Compound', 'Ions', 'Lattice enthalpy / kJ mol⁻¹ (approx.)'], [['KCl', 'K⁺, Cl⁻', '717'], ['NaCl', 'Na⁺, Cl⁻', '788'], ['NaF', 'Na⁺, F⁻', '923'], ['MgO', 'Mg²⁺, O²⁻', '3850']], 'Table of approximate lattice enthalpies of four ionic compounds rising with smaller ions and higher charge'),
      n: 'Lattice enthalpy is the energy released when separated gaseous ions come together to make the crystal. It is the main source of the stability of an ionic solid. It is larger when the ions are small, because they get closer, and when the charges are high. That is why magnesium oxide, with doubly charged ions, has a lattice enthalpy several times that of sodium chloride.',
    }),
    sl('concept', 'Covalent bonds and Lewis structures', {
      b: 'In a **covalent bond** atoms **share** electron pairs: one pair for a single bond, two for a double bond, three for a triple bond. To draw a Lewis structure, count the valence electrons (add one per negative charge), arrange the atoms, give each an octet and check the formal charges.',
      v: flow('LR', [['a', 'Total valence electrons'], ['b', 'Skeleton: least electronegative atom in the centre'], ['c', 'Single bonds, then complete octets'], ['d', 'Multiple bonds if electrons are short'], ['e', 'Check formal charges']], [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'e']], 'Flow of five steps for drawing a Lewis structure'),
      n: 'Here is a method that works for most molecules and ions. Count all the valence electrons, adding one for each negative charge and removing one for each positive charge. Put the least electronegative atom in the centre, join atoms with single bonds, and place the remaining electrons as lone pairs to complete octets. If electrons are short, use double or triple bonds. Finally check formal charges.',
    }),
    sl('example', 'Worked example: the nitrate ion', {
      b: r`**Problem.** Draw the Lewis structure of $\ce{NO3-}$ and find the formal charge on each atom.

**Step 1.** Valence electrons: $5 + 3 \times 6 + 1 = 24$.

**Step 2.** N in the centre with three O atoms; one N=O double bond and two N–O⁻ single bonds so that every atom has an octet.

**Step 3.** Formal charge $=$ V − L − B/2: N $= 5 - 0 - 4 = ${fmt(NO3.N)}$; double-bonded O $= 6 - 4 - 2 = ${NO3.Od}$; each single-bonded O $= 6 - 6 - 1 = ${fmt(NO3.Os)}$.

**Check.** $+1 + 0 + 2(-1) = -1$, the charge on the ion.`,
      v: table(['Atom', 'V', 'L', 'B / 2', 'Formal charge'], [['N', '5', '0', '4', fmt(NO3.N)], ['O (double bond)', '6', '4', '2', String(NO3.Od)], ['O (single bond), two of them', '6', '6', '1', fmt(NO3.Os)]], 'Table of the valence electrons, lone-pair electrons, half the bonding electrons and formal charge of each atom in the nitrate ion'),
      n: 'Nitrate has twenty four valence electrons: five from nitrogen, eighteen from three oxygens, and one for the negative charge. Put nitrogen in the middle with one double bond and two single bonds. Nitrogen then has formal charge plus one, the double bonded oxygen zero, and each single bonded oxygen minus one. The total is minus one, matching the ion.',
    }),
    sl('concept', 'Formal charge', {
      b: '**Formal charge = V − L − B/2**, where V is the valence electrons of the free atom, L the non-bonding electrons and B the bonding electrons. The best Lewis structure has **the smallest formal charges**, with any negative charge on the **more electronegative** atom.',
      v: table(['Atom in ozone (O=O⁺–O⁻)', 'V', 'L', 'B / 2', 'Formal charge'], [['Central O', '6', '2', '3', fmt(O3.mid)], ['Terminal O, double bond', '6', '4', '2', String(O3.dbl)], ['Terminal O, single bond', '6', '6', '1', fmt(O3.sgl)]], 'Table of formal charges on the three oxygen atoms of an ozone Lewis structure'),
      n: 'Formal charge is a bookkeeping device. Pretend every bond is shared equally and ask how many electrons each atom owns compared with its free state. In ozone the central oxygen has a lone pair and three bonds, so plus one. One end oxygen is minus one and the other is zero. When there are several possible structures, choose the one with charges as small as possible.',
    }),
    sl('check', 'Quick check: formal charge', {
      b: 'Calculate a formal charge from V, L and B.',
      n: 'Quick check. Write down the valence electrons, the lone pair electrons and the bonding electrons, then use the formula.',
      chk: 'fc-mcq',
    }),
    sl('concept', 'Exceptions to the octet rule', {
      b: '**Incomplete octet:** fewer than eight around the central atom (BeCl₂ 4, BF₃ 6, AlCl₃ 6). **Odd-electron molecules:** NO and NO₂ have one unpaired electron. **Expanded octet:** period 3 and later atoms can hold more than eight using d orbitals (PCl₅ 10, SF₆ 12).',
      m: [r`\ce{BF3 + F- -> BF4-}`, r`\ce{PCl3 + Cl2 -> PCl5}`, r`\ce{2NO2 -> N2O4}`],
      v: table(['Type', 'Example', 'Electrons around the central atom'], [['Incomplete octet', 'BeCl₂', '4'], ['Incomplete octet', 'BF₃', '6'], ['Odd-electron', 'NO₂', '7'], ['Expanded octet', 'PCl₅', '10'], ['Expanded octet', 'SF₆', '12']], 'Table of five molecules that break the octet rule, with the electrons around the central atom'),
      n: 'The octet rule has exceptions. Beryllium and boron compounds have fewer than eight electrons and look for partners, as boron trifluoride does when it takes a fluoride. Nitric oxide and nitrogen dioxide have an odd number of electrons. And phosphorus pentachloride and sulfur hexafluoride have ten and twelve electrons, which is possible only because period three atoms have d orbitals.',
    }),
    sl('concept', 'Bond parameters', {
      b: '**Bond length** is the distance between nuclei; **bond angle** is the angle between bonds at an atom; **bond enthalpy** is the energy to break one mole of bonds in the gas phase; **bond order** is the number of bonds between two atoms. For the same atoms, a **higher bond order gives a shorter, stronger bond**.',
      v: table(['Bond', 'Order', 'Length / pm', 'Enthalpy / kJ mol⁻¹'], [['C–C', '1', String(BL['C–C']), String(BE['C–C'])], ['C=C', '2', String(BL['C=C']), String(BE['C=C'])], ['C≡C', '3', String(BL['C≡C']), String(BE['C≡C'])], ['O=O', '2', String(BL['O=O']), String(BE['O=O'])], ['N≡N', '3', String(BL['N≡N']), String(BE['N≡N'])]], 'Table of bond order, bond length and bond enthalpy for five covalent bonds showing shorter and stronger bonds at higher bond order'),
      n: 'Four quantities describe a bond. Length is the distance between the two nuclei, and the angle describes the geometry. Bond enthalpy is the energy needed to break the bond, and bond order is the number of shared pairs. As the order goes up from carbon carbon single to triple, the bond becomes shorter and much stronger, as the table shows.',
    }),
    sl('concept', 'Resonance', {
      b: 'When one Lewis structure cannot describe a molecule, several **resonance structures** differing only in the position of electrons are drawn. The real molecule is a **resonance hybrid**, more stable than any one structure, with bonds of **equal length** and a **fractional bond order**.',
      v: table(['Species', 'Resonance structures', 'Bond order of each bond', 'Real bond lengths'], [['O₃', '2', f(boO3, 1), 'Both O–O equal (128 pm)'], ['CO₃²⁻', '3', f(boCO3, 2), 'All three C–O equal'], ['NO₃⁻', '3', f(boCO3, 2), 'All three N–O equal']], 'Table of ozone, carbonate and nitrate with the number of resonance structures, the fractional bond order and the equal bond lengths'),
      n: 'Experiment shows that both oxygen oxygen bonds in ozone are the same length, which one Lewis structure cannot explain, because it would show one single and one double bond. So we draw two structures and say the real molecule is a hybrid of both. In carbonate and nitrate, the double bond is shared among three positions, so each bond has order four thirds.',
    }),
    sl('example', 'Worked example: comparing bond orders and lengths', {
      b: r`**Problem.** Find the bond order of the C–O bonds in $\ce{CO3^2-}$ and arrange O–O bonds in $\ce{O2}$, $\ce{O3}$ and $\ce{H2O2}$ by length.

**(a)** Carbonate: one C=O and two C–O⁻ shared over three equivalent bonds, so bond order $= \dfrac{2 + 1 + 1}{3} = ${f(boCO3, 2)}$.

**(b)** O–O bond orders: $\ce{O2}$ 2, $\ce{O3}$ ${boO3}, $\ce{H2O2}$ 1. A higher bond order means a shorter bond: $\ce{O2}$ (121 pm) < $\ce{O3}$ (128 pm) < $\ce{H2O2}$ (148 pm).`,
      v: table(['Species', 'O–O bond order', 'Bond length / pm'], [['O₂', '2', '121'], ['O₃', f(boO3, 1), '128'], ['H₂O₂', '1', '148']], 'Table of the O–O bond order and length in oxygen, ozone and hydrogen peroxide'),
      n: 'For carbonate, add up the bonds, two plus one plus one, which is four, and share them over three positions to give four thirds. For the oxygen oxygen bonds, ranking by bond order is enough. Oxygen has order two, ozone one and a half, hydrogen peroxide one. The higher the order, the shorter the bond.',
    }),
    sl('check', 'Quick check: resonance', {
      b: 'Find the bond order or the number of equal bonds in a resonance hybrid.',
      n: 'Quick check. Count the total bonding pairs in one structure and divide by the number of equivalent bonds.',
      chk: 'resonance-mcq',
    }),
    sl('concept', 'Bond polarity and dipole moment', {
      b: 'A bond between atoms of different **electronegativity** is polar. The **dipole moment** is $\\mu = q \\times d$, the charge times the distance, measured in debye (1 D = 3.336 × 10⁻³⁰ C m). It is a **vector**, drawn from positive to negative.',
      v: table(['Molecule', 'HF', 'HCl', 'HBr', 'HI'], [['Dipole moment / D', String(DIPOLE.HF), String(DIPOLE.HCl), String(DIPOLE.HBr), String(DIPOLE.HI)], ['Electronegativity of the halogen', '4.0', '3.0', '2.8', '2.5']], 'Table of dipole moments of the hydrogen halides falling from hydrogen fluoride to hydrogen iodide as the halogen becomes less electronegative'),
      n: 'A polar bond has a positive end and a negative end. The size of the effect is the dipole moment, equal to the charge times the distance between the charges. The hydrogen halides show the trend: as the halogen gets less electronegative from fluorine to iodine, the dipole moment falls steadily. The dipole moment is a vector with direction.',
    }),
    sl('concept', 'Dipole moments of molecules', {
      b: 'The molecular dipole moment is the **vector sum** of bond dipoles (and lone-pair dipoles). Symmetric molecules such as **CO₂, BF₃, CH₄** have **zero** moment. **H₂O** is bent, so its bond dipoles add. In **NH₃** the lone pair dipole **adds** to the N–H dipoles; in **NF₃** it **opposes** the N–F dipoles, so NF₃ has a much smaller moment.',
      v: table(['Molecule', 'Shape', 'μ / D', 'Reason'], [['H₂O', 'Bent', String(DIPOLE.H2O), 'Bond dipoles do not cancel'], ['CO₂', 'Linear', '0', 'Two equal dipoles in opposite directions'], ['BF₃', 'Trigonal planar', '0', 'Three dipoles at 120° cancel'], ['NH₃', 'Pyramidal', String(DIPOLE.NH3), 'Lone pair and N–H dipoles point the same way'], ['NF₃', 'Pyramidal', String(DIPOLE.NF3), 'Lone pair dipole opposes the N–F dipoles']], 'Table of molecules with their shape, dipole moment and the reason for the value'),
      n: 'Polar bonds do not always make a polar molecule, because dipoles are vectors. In carbon dioxide and boron trifluoride they cancel exactly. Water is bent, so they add. Ammonia and nitrogen trifluoride have the same shape, but in ammonia the lone pair points the same way as the bond dipoles, while in nitrogen trifluoride it opposes them, so its dipole moment is much smaller.',
    }),
    sl('example', 'Worked example: percentage ionic character of HCl', {
      b: r`**Problem.** The dipole moment of HCl is ${DIPOLE.HCl} D and the bond length is 127 pm. Find the percentage ionic character. (1 D = 3.336 × 10⁻³⁰ C m, e = 1.602 × 10⁻¹⁹ C)

**Step 1.** $\mu = q \times d$, so $q = \dfrac{${DIPOLE.HCl} \times 3.336 \times 10^{-30}}{127 \times 10^{-12}} = ${(q * 1e20).toFixed(2)} \times 10^{-20}\ \text{C}$.

**Step 2.** Fraction of a full charge: $\dfrac{${(q * 1e20).toFixed(2)} \times 10^{-20}}{1.602 \times 10^{-19}} = ${(q / e).toFixed(3)}$.

**Step 3.** Percentage ionic character $= ${f(ionicPct, 1)}\%$.`,
      v: table(['Quantity', 'Value'], [['Observed dipole moment', `${DIPOLE.HCl} D`], ['Charge separated, q', `${(q * 1e20).toFixed(2)} × 10⁻²⁰ C`], ['q / e', f(q / e, 3)], ['Ionic character', `${f(ionicPct, 1)} %`]], 'Table of the steps for finding the percentage ionic character of hydrogen chloride'),
      n: 'Divide the dipole moment by the bond length to find the charge that is effectively separated. Then compare it with the charge of one electron. For hydrogen chloride, the separated charge is about one sixth of a full electron charge, so the bond is about seventeen and a half per cent ionic and mostly covalent.',
    }),
    sl('check', 'Quick check: dipole moment', {
      b: 'Explain why two molecules of the same shape have different dipole moments.',
      n: 'Quick check. Think about the direction of the lone pair dipole compared with the bond dipoles.',
      chk: 'dipole-mcq',
    }),
    sl('summary', 'Summary: Part 1', {
      ul: [
        'Octet rule (duplet for H); ionic bond: electron transfer, stability from lattice enthalpy (higher for small, highly charged ions).',
        'Lewis structure steps; formal charge = V − L − B/2; the best structure has the smallest charges.',
        'Exceptions: incomplete octet (BF₃), odd electron (NO), expanded octet (SF₆).',
        'Bond order up means length down and enthalpy up; resonance gives fractional orders (O₃ 1.5; CO₃²⁻ and NO₃⁻ 1.33).',
        'Dipole moment μ = q × d, a vector; CO₂, BF₃, CH₄ non-polar; NH₃ polar, NF₃ much less so.',
      ],
      v: table(['Concept', 'Key point'], [['Formal charge', 'V − L − B/2'], ['Bond order', 'Higher order: shorter and stronger'], ['Resonance', 'Hybrid with equal bonds'], ['Dipole moment', 'Vector sum of bond dipoles']], 'Summary table of four key concepts of Part 1'),
      n: 'To sum up Part 1. Atoms bond to reach an octet, by transferring electrons in ionic bonds or sharing them in covalent ones. We draw Lewis structures and use formal charge to choose the best. Some molecules break the octet rule. Bond order links length and strength, resonance gives fractional bond orders, and dipole moments are vectors that depend on shape as well as on bond polarity.',
    }),
    sl('exam-tips', 'Exam tips: Part 1', {
      ul: [
        'Show the formal-charge calculation with V, L and B/2, not just the answer.',
        'For resonance, draw all the structures and state that the hybrid has equal bond lengths.',
        'Say “vector sum” when explaining zero dipole moments of CO₂, BF₃ and CCl₄.',
        'For NH₃ and NF₃, mention the direction of the lone-pair dipole.',
        'Do not apply the octet rule to central atoms of period 3 or later without checking for expanded octets.',
      ],
      v: table(['Slip', 'Fix'], [['Bond order of carbonate is 2', 'Four thirds, shared over three bonds'], ['CO₂ is polar because C=O is polar', 'The two dipoles cancel; μ = 0'], ['Lattice enthalpy is the energy to form ions', 'It is the energy released when gaseous ions form the crystal']], 'Table of three common slips in Part 1 and their fixes'),
      n: 'Some tips. Always show the formal charge arithmetic. For resonance, draw every structure and say the hybrid has equal bonds. When explaining zero dipole moment, use the words vector sum. For ammonia versus nitrogen trifluoride, mention the direction of the lone pair dipole. And watch for expanded octets in period three.',
    }),
  ],
});

// ---------------------------------------------------------------- Part 2
const S_ = SPECIES;
const row = (sp) => [sp.name, String(sp.bp), String(sp.lp), sp.shape, sp.hyb];
const mol = Object.fromEntries(DIATOMICS.map(([n, m]) => [n, m]));
const O2p = mo(11, false);
const O2m = mo(13, false);
const O2pp = mo(14, false);
if (!(O2p.bo === 2.5 && O2m.bo === 1.5 && O2pp.bo === 1 && O2p.unpaired === 1 && O2m.unpaired === 1 && O2pp.unpaired === 0)) throw new Error('oxygen ions');

export const deck2 = deck({
  part: 2,
  title: 'Chemical Bonding and Molecular Structure — Part 2: Shapes, hybridisation, MO theory and hydrogen bonding',
  goals: [
    'Predict shapes of AB₂ to AB₆ molecules with and without lone pairs using VSEPR theory',
    'Explain valence bond theory, σ and π bonds, and sp, sp², sp³, sp³d and sp³d² hybridisation',
    'Build MO diagrams for H₂ to Ne₂ and deduce bond order and magnetic behaviour',
    'Describe intermolecular and intramolecular hydrogen bonding and its effects',
  ],
  slides: [
    sl('title', 'Shapes of molecules and theories of bonding', {
      b: 'Part 2 — three models of molecules: VSEPR for shape, valence bond theory with hybridisation for bonding, and molecular orbital theory for magnetism and bond order.',
      v: table(['Electron pairs', 'Arrangement', 'Hybridisation'], [['2', 'Linear', 'sp'], ['3', 'Trigonal planar', 'sp²'], ['4', 'Tetrahedral', 'sp³'], ['5', 'Trigonal bipyramidal', 'sp³d'], ['6', 'Octahedral', 'sp³d²']], 'Table linking the number of electron pairs to the arrangement and hybridisation'),
      n: 'Lewis structures tell us which atoms are joined, but not the shape of a molecule. In this part we first predict shapes by counting electron pairs, with the VSEPR theory. Then we explain how bonds form by overlap of orbitals, using hybridisation, and finally we use molecular orbital theory to explain why oxygen is magnetic. We end with hydrogen bonding.',
    }),
    sl('concept', 'VSEPR theory', {
      b: 'Electron pairs around the central atom repel and take positions of **minimum repulsion**. Order of repulsion: **lone pair–lone pair > lone pair–bond pair > bond pair–bond pair**. A multiple bond counts as **one region** of electron density. The shape names only the **atoms**.',
      v: table(['Repulsion', 'Strength', 'Effect on angles'], [['Lone pair–lone pair', 'Greatest', 'Squeezes the other angles'], ['Lone pair–bond pair', 'Intermediate', 'Reduces bond angles'], ['Bond pair–bond pair', 'Smallest', 'Gives the ideal angle']], 'Table of the three kinds of electron-pair repulsion in decreasing order of strength'),
      n: 'The idea is simple. Electron pairs repel one another, so they spread as far apart as possible. A lone pair is held by only one nucleus, so it spreads out and repels more strongly than a bonding pair. That is why lone pairs squeeze bond angles. A double or triple bond counts as a single region, and the shape names only the positions of atoms, not the lone pairs.',
    }),
    sl('diagram', 'Shapes with no lone pairs: AB₂ to AB₆', {
      b: 'With no lone pairs the shape matches the arrangement: **linear** (BeCl₂), **trigonal planar** (BF₃), **tetrahedral** (CH₄), **trigonal bipyramidal** (PCl₅; axial bonds are longer than equatorial) and **octahedral** (SF₆).',
      v: V.shapes5,
      n: 'Here are the five basic arrangements. Two pairs sit at one hundred and eighty degrees, three at one hundred and twenty, and four point to the corners of a tetrahedron at about one hundred and nine degrees. Five pairs form a trigonal bipyramid with two different kinds of position, axial and equatorial. Six pairs form an octahedron with all angles ninety degrees.',
    }),
    sl('concept', 'Effect of lone pairs on bond angles', {
      b: 'Methane, ammonia and water all have **four electron pairs** and a tetrahedral arrangement. Each lone pair **reduces the bond angle** because lone-pair repulsion is stronger than bond-pair repulsion.',
      v: table(['Molecule', 'Bond pairs', 'Lone pairs', 'Shape', 'H–X–H angle'], [['CH₄', '4', '0', 'Tetrahedral', '109.5°'], ['NH₃', '3', '1', 'Trigonal pyramidal', '107°'], ['H₂O', '2', '2', 'Bent', '104.5°']], 'Table of methane, ammonia and water with bond pairs, lone pairs, shape and bond angle decreasing with each lone pair'),
      n: 'Compare three molecules that all have four electron pairs. Methane has none that are lone, and the angle is the ideal one hundred and nine and a half degrees. Ammonia has one lone pair, and the angle closes to one hundred and seven. Water has two, and the angle is only one hundred and four and a half degrees.',
    }),
    sl('diagram', 'Shapes with lone pairs: ammonia, water and sulfur dioxide', {
      b: 'Take the **arrangement** from the total number of electron pairs, then name the **shape** from the atoms only. NH₃: tetrahedral arrangement, **trigonal pyramidal** shape. H₂O: tetrahedral arrangement, **bent**. SO₂: trigonal planar arrangement, **bent**.',
      v: V.lpA,
      n: 'Look at how the shapes are derived. Ammonia has four pairs in a tetrahedral arrangement, but one is a lone pair, so the atoms form a pyramid. Water has two lone pairs and is bent. Sulfur dioxide has three regions in a trigonal planar arrangement, one of them a lone pair, so it is bent too, with an angle slightly under one hundred and twenty.',
    }),
    sl('concept', 'Lone pairs on five and six pairs', {
      b: 'In a **trigonal bipyramid** lone pairs occupy **equatorial** positions (fewer 90° repulsions). In an **octahedron** the second lone pair goes **opposite** (trans to) the first.',
      v: table(['Species', 'Bond pairs', 'Lone pairs', 'Shape', 'Hybridisation'], [S_.SF4, S_.ClF3, S_.XeF2, S_.BrF5, S_.XeF4].map(row), 'Table of five species with their bond pairs, lone pairs, shape and hybridisation computed from the electron count'),
      n: 'With five electron pairs, lone pairs go to the equatorial positions, where each has fewer close neighbours. One lone pair gives the see-saw shape of sulfur tetrafluoride, two give the T shape of chlorine trifluoride, and three give the straight line of xenon difluoride. With six pairs, one lone pair gives a square pyramid, and two opposite each other give a square plane.',
    }),
    sl('diagram', 'Shapes derived from five and six pairs', {
      b: 'The five shapes SF₄, ClF₃, XeF₂ (from the trigonal bipyramid) and BrF₅, XeF₄ (from the octahedron).',
      v: V.lpB,
      n: 'Check each shape against the picture. In sulfur tetrafluoride, the lone pair in the equatorial plane pushes the four atoms into a see-saw. In chlorine trifluoride two lone pairs leave a T. Xenon difluoride has three equatorial lone pairs and the atoms are on a line. Bromine pentafluoride is a square pyramid, and xenon tetrafluoride is a flat square.',
    }),
    sl('example', 'Worked example: predicting shapes', {
      b: r`**Problem.** Predict the shape of $\ce{ICl2-}$, $\ce{H3O+}$ and $\ce{NH2-}$.

**Method.** Lone pairs on the central atom $= \dfrac{\text{valence electrons} - \text{bonds} - \text{charge}}{2}$.

**ICl₂⁻:** $(7 - 2 + 1)/2 = ${S_.ICl2.lp}$ lone pairs, 2 bond pairs: ${S_.ICl2.shape}, ${S_.ICl2.hyb}.

**H₃O⁺:** $(6 - 3 - 1)/2 = ${S_.H3O.lp}$: ${S_.H3O.shape}, ${S_.H3O.hyb}.

**NH₂⁻:** $(5 - 2 + 1)/2 = ${S_.NH2.lp}$: ${S_.NH2.shape}, ${S_.NH2.hyb}.`,
      v: table(['Species', 'Bond pairs', 'Lone pairs', 'Shape', 'Hybridisation'], [S_.ICl2, S_.H3O, S_.NH2].map(row), 'Table of the shapes of the dichloroiodate ion, the hydronium ion and the amide ion with lone pairs and hybridisation'),
      n: 'Count the lone pairs on the central atom from its valence electrons, the number of bonds and the charge. The iodine ion has three lone pairs and two bonds, so it is linear. The hydronium ion has one lone pair and three bonds, so it is pyramidal like ammonia. The amide ion has two lone pairs and two bonds, so it is bent.',
    }),
    sl('check', 'Quick check: shape from electron pairs', {
      b: 'Predict a shape with lone pairs.',
      n: 'Quick check. Count bond pairs and lone pairs on the central atom, then name the shape from the atoms only.',
      chk: 'vsepr-check-mcq',
    }),
    sl('diagram', 'Valence bond theory: sigma and pi bonds', {
      b: 'A covalent bond forms by **overlap of half-filled orbitals**; the greater the overlap, the stronger the bond. **σ bonds** form by head-on overlap along the axis; **π bonds** by sideways overlap of parallel p orbitals. A double bond is one σ and one π; a triple bond is one σ and two π.',
      v: V.overlap,
      n: 'Valence bond theory says a bond is formed when two half filled orbitals overlap. If the overlap is along the line joining the nuclei, we get a sigma bond. If two parallel p orbitals overlap sideways, above and below the axis, we get a pi bond. A single bond is a sigma bond, a double bond adds one pi, and a triple bond adds two.',
    }),
    sl('concept', 'Hybridisation: sp, sp² and sp³', {
      b: '**Hybridisation** mixes atomic orbitals of one atom to give **equivalent hybrid orbitals** with directional properties. Number of hybrid orbitals $=$ number of electron pairs (steric number).',
      v: table(['Type', 'Orbitals mixed', 'Geometry', 'Angle', 'Examples'], [['sp', 's + p', 'Linear', '180°', 'BeCl₂, C₂H₂'], ['sp²', 's + 2p', 'Trigonal planar', '120°', 'BF₃, C₂H₄, SO₂'], ['sp³', 's + 3p', 'Tetrahedral', '109.5°', 'CH₄, NH₃, H₂O']], 'Table of sp, sp2 and sp3 hybridisation with orbitals mixed, geometry, angle and examples'),
      n: 'Hybridisation explains why methane has four equal bonds. The carbon s orbital mixes with three p orbitals to give four equivalent sp three hybrids pointing to the corners of a tetrahedron. Mixing one s with two p gives three sp two hybrids in a plane, and one s with one p gives two sp hybrids on a line. The number of hybrids equals the number of electron pairs.',
    }),
    sl('concept', 'Hybridisation involving d orbitals', {
      b: '**sp³d** (trigonal bipyramidal: PCl₅) and **sp³d²** (octahedral: SF₆) use **vacant d orbitals** of period 3 and later atoms. Lone pairs occupy hybrid orbitals too: SF₄ and ClF₃ are sp³d, BrF₅ and XeF₄ are sp³d².',
      v: table(['Species', 'Steric number', 'Hybridisation', 'Shape'], [S_.PCl5, S_.SF4, S_.ClF3, S_.SF6, S_.BrF5, S_.XeF4].map((sp) => [sp.name, String(sp.sn), sp.hyb, sp.shape]), 'Table of species with five or six electron pairs, their steric number, hybridisation and shape'),
      n: 'Atoms in the third period and below have vacant d orbitals, so they can use them in hybridisation. Five pairs call for sp three d, with a trigonal bipyramid as the arrangement. Six pairs call for sp three d two, an octahedron. Remember to count lone pairs as well as bonds, so sulfur tetrafluoride is sp three d, and xenon tetrafluoride is sp three d two.',
    }),
    sl('example', 'Worked example: hybridisation, sigma and pi bonds', {
      b: r`**Problem.** For ethene $\ce{C2H4}$, ethyne $\ce{C2H2}$ and $\ce{NH3}$, give the hybridisation of each central atom and count σ and π bonds.

**Ethene:** each C has 3 regions, so sp². Bonds: 4 C–H and 1 C–C σ, plus one π: **5σ + 1π**.

**Ethyne:** each C has 2 regions, so sp. Bonds: 2 C–H and 1 C–C σ, plus two π: **3σ + 2π**.

**Ammonia:** N has 3 bonds and 1 lone pair: 4 regions, sp³: **3σ**, no π.`,
      v: table(['Molecule', 'Hybridisation', 'σ bonds', 'π bonds'], [['C₂H₄', 'sp²', '5', '1'], ['C₂H₂', 'sp', '3', '2'], ['NH₃', 'sp³', '3', '0']], 'Table of hybridisation and the number of sigma and pi bonds in ethene, ethyne and ammonia'),
      n: 'Count the regions of electron density around each central atom: bonds, plus lone pairs, with a double or triple bond counted once. Ethene carbons have three regions and are sp two. Ethyne carbons have two and are sp. Ammonia nitrogen has four, counting its lone pair, so it is sp three. Then count sigma bonds first and add pi bonds for each extra bond.',
    }),
    sl('check', 'Quick check: hybridisation', {
      b: 'Assign hybridisation from the steric number.',
      n: 'Quick check. Add the lone pairs to the bonded atoms and use the total.',
      chk: 'hybrid-check-mcq',
    }),
    sl('concept', 'Molecular orbital theory', {
      b: 'Atomic orbitals combine (**LCAO**) to form **molecular orbitals** over the whole molecule: **bonding** (lower energy, constructive) and **antibonding** (higher energy, destructive, marked *). Fill by **Aufbau**, **Pauli** and **Hund**. **Bond order = (Nb − Na)/2**. Unpaired electrons mean **paramagnetic**; none means **diamagnetic**.',
      v: table(['Orbital', 'Type', 'Effect on the bond'], [['σ2s, σ2p, π2p', 'Bonding', 'Adds to the bond order'], ['σ*2s, σ*2p, π*2p', 'Antibonding', 'Reduces the bond order'], ['Bond order > 0', 'Molecule exists', 'Higher: shorter and stronger'], ['Unpaired electrons', 'Paramagnetic', 'Attracted by a magnet']], 'Table of bonding and antibonding molecular orbitals and their effects'),
      n: 'Molecular orbital theory treats electrons as belonging to the whole molecule. Two atomic orbitals combine to give a lower energy bonding orbital and a higher energy antibonding orbital. We fill the orbitals in order of energy, with Hund rule for equal ones. The bond order is the number of bonding electrons minus antibonding electrons, divided by two, and unpaired electrons mean the molecule is paramagnetic.',
    }),
    sl('diagram', 'MO diagram of N₂: s–p mixing', {
      b: 'For **B₂, C₂ and N₂** the 2s and 2p orbitals are close in energy and **mix**, so **π2p lies below σ2p**. N₂ has 10 valence electrons: bond order **3**, no unpaired electrons, **diamagnetic**.',
      v: V.moN2,
      n: 'This is the diagram for nitrogen. Because the two s and p levels are close, they mix, and the pi orbitals end up lower than the sigma two p orbital. Ten valence electrons fill everything up to the sigma two p. Bonding electrons number eight and antibonding two, so the bond order is three, and since all electrons are paired, nitrogen is diamagnetic.',
    }),
    sl('diagram', 'MO diagram of O₂: paramagnetism', {
      b: 'From **O₂ onwards** the order is σ2p below π2p. O₂ has 12 valence electrons; the last two occupy the **two π*2p orbitals singly** (Hund’s rule): bond order **2**, **2 unpaired electrons**, so O₂ is **paramagnetic**.',
      v: V.moO2,
      n: 'Oxygen has twelve valence electrons. Ten fill the same orbitals as in nitrogen, and the last two must go into the two degenerate antibonding pi orbitals. By Hund rule they go in one each, with parallel spins. So oxygen has two unpaired electrons and is attracted into a magnetic field, something Lewis structures could never explain.',
    }),
    sl('concept', 'Bond order and magnetism from H₂ to Ne₂', {
      b: 'Counting valence electrons (1s for H₂ and He₂) gives a bond order and magnetic behaviour for each homonuclear diatomic. **He₂, Be₂ and Ne₂** have bond order **0**: they do not exist as stable molecules.',
      v: table(['Molecule', 'Electrons', 'Bond order', 'Unpaired', 'Magnetic behaviour'], DIATOMICS.map(([n, m], i) => [n, String(m.bonding + m.anti), String(m.bo), String(m.unpaired), `${mag(m)}${m.bo === 0 ? ' (not formed)' : ''}`]), 'Table of electrons, bond order, unpaired electrons and magnetic behaviour of the homonuclear diatomic molecules from hydrogen to neon'),
      n: 'Apply the same filling to every molecule. Hydrogen has bond order one, helium zero, so the helium molecule does not exist. Boron has two unpaired electrons, because its last two electrons are in separate pi orbitals. Carbon has bond order two and no unpaired electrons. Nitrogen has three, oxygen two with unpaired electrons, fluorine one, and neon none.',
    }),
    sl('example', 'Worked example: oxygen species', {
      b: r`**Problem.** Compare $\ce{O2+}$, $\ce{O2}$, $\ce{O2-}$ and $\ce{O2^2-}$ in bond order and magnetism.

Valence electrons: 11, 12, 13, 14. Fill σ2s, σ*2s, σ2p, π2p, π*2p:

- $\ce{O2+}$: (Nb − Na)/2 = ${O2p.bo}, ${O2p.unpaired} unpaired.
- $\ce{O2}$: bond order ${mol['O₂'].bo}, ${mol['O₂'].unpaired} unpaired.
- $\ce{O2-}$: bond order ${O2m.bo}, ${O2m.unpaired} unpaired.
- $\ce{O2^2-}$: bond order ${O2pp.bo}, ${O2pp.unpaired} unpaired (diamagnetic).

**Bond length** increases as the order falls: O₂⁺ < O₂ < O₂⁻ < O₂²⁻.`,
      v: table(['Species', 'Valence electrons', 'Bond order', 'Unpaired electrons'], [['O₂⁺', '11', String(O2p.bo), String(O2p.unpaired)], ['O₂', '12', String(mol['O₂'].bo), String(mol['O₂'].unpaired)], ['O₂⁻', '13', String(O2m.bo), String(O2m.unpaired)], ['O₂²⁻', '14', String(O2pp.bo), String(O2pp.unpaired)]], 'Table of the valence electrons, bond order and unpaired electrons of four oxygen species'),
      n: 'Each extra electron goes into an antibonding pi orbital, so the bond order falls from two and a half in the positive ion, to two in oxygen, one and a half in superoxide, and one in peroxide. The bond gets longer along the series. Peroxide has all its electrons paired, so it is diamagnetic, while the others each have at least one unpaired electron.',
    }),
    sl('concept', 'Hydrogen bonding', {
      b: 'A **hydrogen bond** is the attraction between a hydrogen atom bonded to **F, O or N** and a lone pair on another F, O or N atom. **Intermolecular** (between molecules): H₂O, HF, NH₃. **Intramolecular** (within one molecule): o-nitrophenol. It raises boiling points and makes ice **less dense** than water.',
      v: table(['Hydride', 'Boiling point / K', 'Hydride', 'Boiling point / K'], [['H₂O', '373', 'H₂S', '213'], ['HF', '293', 'HCl', '188'], ['NH₃', '240', 'PH₃', '185']], 'Table comparing the boiling points of water, hydrogen fluoride and ammonia with those of the hydrides of the next period'),
      n: 'A hydrogen bond forms when hydrogen is attached to a very electronegative atom, fluorine, oxygen or nitrogen, and is attracted to a lone pair on a neighbour. Water, hydrogen fluoride and ammonia boil far higher than their heavier relatives because of this. In o-nitrophenol the bond is inside the molecule, so it does not link molecules together and the compound is more volatile than the para isomer.',
    }),
    sl('check', 'Quick check: hydrogen bonding', {
      b: 'Explain a physical property from hydrogen bonding.',
      n: 'Quick check. Decide whether the hydrogen bonds link different molecules or stay inside one molecule.',
      chk: 'hbond-check-mcq',
    }),
    sl('summary', 'Summary: Part 2', {
      ul: [
        'VSEPR: lp–lp > lp–bp > bp–bp; shape from atoms; SF₄ see-saw, ClF₃ T-shaped, XeF₂ linear, BrF₅ square pyramidal, XeF₄ square planar.',
        'Valence bond theory: σ (head-on) and π (sideways) overlap; hybridisation sp, sp², sp³, sp³d, sp³d² from the steric number.',
        'MO theory: bond order = (Nb − Na)/2; N₂ 3 (diamagnetic); O₂ 2 with two unpaired electrons (paramagnetic); π2p below σ2p only up to N₂.',
        'Hydrogen bonds: intermolecular raise boiling points; intramolecular (o-nitrophenol) lower them.',
      ],
      v: table(['Model', 'Explains'], [['VSEPR', 'Shape and bond angle'], ['Hybridisation', 'Directional equivalent bonds'], ['MO theory', 'Bond order and magnetism'], ['Hydrogen bond', 'Boiling points, structure of ice']], 'Summary table of four models and what each explains'),
      n: 'Let us sum up Part 2. VSEPR gives shapes from electron pair repulsion, with lone pairs squeezing angles. Hybridisation and orbital overlap explain how bonds form in those shapes. Molecular orbital theory gives bond order and shows why oxygen is paramagnetic. And hydrogen bonds explain the unusually high boiling points of water, hydrogen fluoride and ammonia.',
    }),
    sl('exam-tips', 'Exam tips: Part 2', {
      ul: [
        'Show the count: bond pairs, lone pairs, then arrangement, then shape, then hybridisation.',
        'Name the arrangement and the shape separately: NH₃ is tetrahedral in arrangement, pyramidal in shape.',
        'For MO questions, write the electron configuration, then bond order and magnetic nature.',
        'For N₂ and below (Z ≤ 7) use π2p before σ2p; for O₂ and F₂ use σ2p before π2p.',
        'State whether a hydrogen bond is intermolecular or intramolecular, and its effect on boiling point or solubility.',
      ],
      v: table(['Slip', 'Fix'], [['Water is tetrahedral', 'Bent; the arrangement is tetrahedral'], ['XeF₄ is sp³d', 'Six pairs: sp³d²'], ['O₂ has no unpaired electrons', 'Two, in the π* orbitals']], 'Table of three common slips in Part 2 and their fixes'),
      n: 'Final tips. Count bond pairs and lone pairs before naming a shape, and keep arrangement and shape apart. For molecular orbital questions, write the configuration, then bond order, then magnetic nature, using the right order of orbitals. And for hydrogen bonding, say whether it is within a molecule or between molecules, and what that does to boiling point.',
    }),
  ],
});
