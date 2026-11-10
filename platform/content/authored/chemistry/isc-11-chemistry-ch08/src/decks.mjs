// ISC 11 Chemistry ch08 Covalent Bonding, VSEPR and Hybridisation: two decks. Part 1 (t01-t03) covalent bond, sigma and pi,
// Lewis structures, bond parameters, polarity and dipole moment, ionic against covalent, variable covalency, formal charge and
// octet deviations; Part 2 (t04-t06) Fajan's rules, VSEPR shapes, hybridisation.
import { sl, deck, table, flow, svgV, r } from './lib.mjs';
import { LEWIS_A, LEWIS_B, LEWIS_C, SIGMA_PI, BONDCURVE, DIPOLE, OCTET, FAJAN, VSEPR_IDEAL, VSEPR_LP1, VSEPR_LP2, HYB_BOXES, HYB_LOBES } from './svgs.mjs';
import { BOND, HX, muIonic, pctIonic, countSigmaPi, ACRYLO, RAD, ionicPotential, E_CHARGE } from './data.mjs';

const f1 = (x) => x.toFixed(1);
const f2 = (x) => x.toFixed(2);
const f3 = (x) => x.toFixed(3);

export const V = {
  lewisA: svgV(LEWIS_A, 'Electron-dot structures of CH4, NH3, H2O and CO2 with shared pairs in green and lone pairs in black', 'Every atom has an octet (H: a duplet).'),
  lewisB: svgV(LEWIS_B, 'Electron-dot structures of ethane, ethene and ethyne with one, two and three shared pairs between the carbon atoms', 'C–C shared pairs: 1, 2, 3.'),
  lewisC: svgV(LEWIS_C, 'Electron-dot structures of H2, O2 and N2 showing single, double and triple bonds', 'Bond orders 1, 2, 3.'),
  sigmapi: svgV(SIGMA_PI, 'Overlap of orbitals in H2 (one sigma bond), O2 (one sigma and one pi) and N2 (one sigma and two pi)', 'σ: head-on; π: sideways.'),
  bondcurve: svgV(BONDCURVE, 'Potential energy of two hydrogen atoms against internuclear distance with the minimum at 74 pm and depth 436 kJ per mole', 'Bond length 74 pm; bond enthalpy 436 kJ mol⁻¹.'),
  dipole: svgV(DIPOLE, 'Bond dipoles in CO2 (cancel), H2O (add to 1.85 D) and BF3 (cancel)', 'Shape decides whether polar bonds give a polar molecule.'),
  octet: svgV(OCTET, 'Lewis structures of BeCl2, BF3, PCl5 and SF6 showing incomplete and expanded octets', 'Be 4, B 6, P 10, S 12 electrons.'),
  fajan: svgV(FAJAN, 'Distortion of the chloride ion cloud by Li+, Na+ and Al3+ drawn to scale', 'Higher z/r gives more covalent character.'),
  vseprIdeal: svgV(VSEPR_IDEAL, 'Ideal VSEPR shapes AB2 linear, AB3 trigonal planar, AB4 tetrahedral, AB5 trigonal bipyramidal and AB6 octahedral', 'Bond pairs only; no lone pairs.'),
  vseprLp1: svgV(VSEPR_LP1, 'Shapes of NH3, H2O and SO2 derived from tetrahedral and trigonal planar arrangements with lone pairs', 'Lone pairs compress the angles.'),
  vseprLp2: svgV(VSEPR_LP2, 'Shapes of SF4, ClF3, XeF2, BrF5 and XeF4 derived from the trigonal bipyramid and octahedron', 'Lone pairs take equatorial positions in the trigonal bipyramid.'),
  hybBoxes: svgV(HYB_BOXES, 'Box diagrams showing promotion and hybridisation for Be, B, C, P and S', 'Each hybrid orbital holds one electron.'),
  hybLobes: svgV(HYB_LOBES, 'Lobes of sp, sp2, sp3, sp3d and sp3d2 hybrid orbitals', 'Directions give the geometry.'),
};

// ---- worked-example data
const acr = countSigmaPi(ACRYLO);
const hcl = HX.HCl;
const hclIonic = muIonic(hcl.d);
const hclPct = pctIonic(hcl.mu, hcl.d);
const zr = (z, rr) => ((z / rr) * 1000).toFixed(1);

export const deck1 = deck({
  part: 1,
  title: 'Covalent Bonding, VSEPR and Hybridisation — Part 1: Covalent bonds, polarity and formal charge',
  goals: [
    'Draw Lewis structures of simple covalent molecules and count sigma and pi bonds',
    'Use bond parameters, bond polarity and dipole moment to compare molecules, and compare covalent with ionic compounds',
    'Explain variable covalency, calculate formal charge and recognise incomplete and expanded octets',
  ],
  slides: [
    sl('title', 'Sharing electrons: covalent bonds', {
      b: 'Part 1: how non-metal atoms **share electron pairs** to complete their outer shells, and what the bond parameters tell us.',
      v: V.lewisA,
      n: 'Welcome. In Part One we look at atoms that do not give electrons away but share them. We draw electron dot structures of methane, ammonia, water and carbon dioxide, then use bond lengths, energies and dipole moments to compare molecules, and finish with formal charge and the exceptions to the octet rule.',
    }),
    sl('concept', 'The covalent bond: single, double and triple', {
      b: 'A **covalent bond** forms when two atoms **share one or more electron pairs**, so that each attains a noble gas arrangement. It needs atoms that **each need electrons** and are close in electronegativity. One shared pair is a **single** bond, two a **double** bond and three a **triple** bond.',
      v: V.lewisC,
      n: 'A covalent bond is formed by sharing electron pairs. It happens between atoms that both need electrons, for example two nonmetals. In hydrogen one pair is shared, giving a single bond. In oxygen two pairs are shared, a double bond, and in nitrogen three pairs are shared, a triple bond.',
    }),
    sl('diagram', 'Lewis structures of ethane, ethene and ethyne', {
      b: 'In **ethane** the carbons share **1 pair**, in **ethene 2 pairs** and in **ethyne 3 pairs**. The total numbers of shared pairs are **7, 6 and 5**, and every carbon has an octet.',
      v: V.lewisB,
      n: 'Here are three hydrocarbons. In ethane the two carbon atoms share one pair, in ethene they share two pairs, and in ethyne they share three pairs. Each carbon is joined to hydrogen atoms by single shared pairs, and every carbon atom ends up with eight electrons around it.',
    }),
    sl('concept', 'Sigma and pi bonds', {
      b: 'A **sigma (σ) bond** forms by **head-on overlap** of orbitals along the bond axis; it is the first bond between two atoms. A **pi (π) bond** forms by **sideways overlap** of parallel p orbitals above and below the axis, and is **weaker**. Single bond: 1 σ; double: 1 σ + 1 π; triple: 1 σ + 2 π.',
      v: V.sigmapi,
      n: 'A sigma bond is formed by head on overlap along the line joining the nuclei, and it is the strongest kind of overlap. A pi bond is formed by sideways overlap of parallel p orbitals, above and below the axis. A single bond is one sigma bond, a double bond is one sigma and one pi, and a triple bond is one sigma and two pi bonds.',
    }),
    sl('check', 'Quick check: counting sigma and pi bonds', {
      b: 'Count every bond, then add one pi for each extra line of a double or triple bond.',
      n: 'Quick check. Draw out every bond in the molecule. Each single bond is a sigma bond. A double bond contributes one sigma and one pi, so it adds one pi bond. Count the carbon hydrogen bonds carefully, because they are all sigma bonds.',
      chk: 'sigmapi-mcq',
    }),
    sl('example', 'Worked example: bonds in acrylonitrile', {
      b: r`**Problem.** Count the σ and π bonds in acrylonitrile, $\ce{CH2=CH-C#N}$.

Bonds: 3 C–H (3 σ); C–C single (1 σ); C=C double (1 σ + 1 π); C≡N triple (1 σ + 2 π).

σ bonds $= 3 + 1 + 1 + 1 = ${acr.sigma}$; π bonds $= 1 + 2 = ${acr.pi}$. Check: 9 bonds counted as lines (3 + 1 + 2 + 3 = 9) $= ${acr.sigma} + ${acr.pi}$.`,
      v: table(['Bond', 'Number', 'σ bonds', 'π bonds'], [['C–H', '3', '3', '0'], ['C–C', '1', '1', '0'], ['C=C', '1', '1', '1'], ['C≡N', '1', '1', '2'], ['Total', '6 bonds', String(acr.sigma), String(acr.pi)]], 'Table counting the sigma and pi bonds in acrylonitrile'),
      n: 'List the bonds one type at a time. There are three carbon hydrogen single bonds, one carbon carbon single bond, one carbon carbon double bond and one carbon nitrogen triple bond. Each contributes one sigma bond, so there are six sigma bonds. The double bond adds one pi bond and the triple bond adds two, giving three pi bonds.',
    }),
    sl('concept', 'Bond parameters: length, enthalpy and order', {
      b: '**Bond length** is the equilibrium distance between the nuclei. **Bond enthalpy** is the energy to break one mole of the bond in the gas phase. **Bond order** is the number of shared pairs. A higher bond order gives a **shorter and stronger** bond. **Bond angle** is the angle between two bonds at one atom.',
      v: table(['Bond', 'Order', 'Length (pm)', 'Enthalpy (kJ mol⁻¹)'], [['C–C', '1', String(BOND['C–C'].len), String(BOND['C–C'].enth)], ['C=C', '2', String(BOND['C=C'].len), String(BOND['C=C'].enth)], ['C≡C', '3', String(BOND['C≡C'].len), String(BOND['C≡C'].enth)], ['H–H', '1', String(BOND['H–H'].len), String(BOND['H–H'].enth)], ['N≡N', '3', String(BOND['N≡N'].len), String(BOND['N≡N'].enth)]], 'Table of bond order, length and enthalpy for selected bonds'),
      n: 'Bond length is the distance between the two nuclei, and bond enthalpy is the energy needed to break one mole of the bond. As the bond order increases from one to three, the bond gets shorter and stronger. Carbon carbon bonds show this clearly, with the triple bond only one hundred twenty picometres long but very strong.',
    }),
    sl('diagram', 'Why a bond has a definite length', {
      b: 'As two hydrogen atoms approach, **attraction** lowers the energy until, at **74 pm**, **repulsion** between the nuclei and electrons balances it. The depth of the well, **436 kJ mol⁻¹**, is the bond enthalpy.',
      v: V.bondcurve,
      n: 'This curve shows the energy of two hydrogen atoms as they approach. Far apart the energy is zero. As they come closer the energy falls because of attraction, until it reaches a minimum at seventy four picometres. Closer than that, repulsion makes the energy rise steeply. The depth of the minimum is the bond enthalpy.',
    }),
    sl('concept', 'Polar bonds and dipole moment', {
      b: 'When two atoms differ in electronegativity, the shared pair is pulled towards the more electronegative atom: a **polar covalent bond**, with partial charges δ⁺ and δ⁻. The **dipole moment** is $\\mu = q \\times d$, in **debye** (1 D = 3.336 × 10⁻³⁰ C m). It is a **vector**, so a molecule with polar bonds may still have μ = 0.',
      v: table(['Molecule', 'μ (D)', 'Bond length (pm)', 'If fully ionic (D)'], [['HF', String(HX.HF.mu), String(HX.HF.d), f2(muIonic(HX.HF.d))], ['HCl', String(HX.HCl.mu), String(HX.HCl.d), f2(muIonic(HX.HCl.d))], ['HBr', String(HX.HBr.mu), String(HX.HBr.d), f2(muIonic(HX.HBr.d))], ['HI', String(HX.HI.mu), String(HX.HI.d), f2(muIonic(HX.HI.d))]], 'Table of dipole moment, bond length and the dipole moment for a fully ionic bond for the hydrogen halides'),
      n: 'When two bonded atoms differ in electronegativity, the shared pair is drawn towards one of them, and the bond is polar. The dipole moment is the charge times the distance, measured in debye. It is a vector, which means that the direction matters, and a molecule with polar bonds can still have no overall dipole moment.',
    }),
    sl('diagram', 'Shape decides whether the molecule is polar', {
      b: 'In **CO₂** the two C=O dipoles point opposite ways and cancel (μ = 0). In **BF₃** three dipoles at 120° cancel. In **H₂O** the dipoles at 104.5° add to **1.85 D**: polar.',
      v: V.dipole,
      n: 'Carbon dioxide is linear, so its two equal bond dipoles point in opposite directions and cancel. Boron trifluoride is trigonal planar, and its three dipoles also cancel. Water is bent, so its two bond dipoles add up to a resultant of about one point eight five debye. Shape decides whether polar bonds give a polar molecule.',
    }),
    sl('example', 'Worked example: percentage ionic character of HCl', {
      b: r`**Problem.** HCl has $\mu = ${hcl.mu}$ D and bond length ${hcl.d} pm. Find the percentage ionic character. ($e = 1.602 \times 10^{-19}$ C; 1 D $= 3.336 \times 10^{-30}$ C m)

If completely ionic: $\mu = e \times d = 1.602 \times 10^{-19} \times ${hcl.d} \times 10^{-12} = ${f3((E_CHARGE * hcl.d * 1e-12) / 1e-30)} \times 10^{-30}$ C m $= ${f2(hclIonic)}$ D.

Ionic character $= \dfrac{${hcl.mu}}{${f2(hclIonic)}} \times 100 = ${f1(hclPct)}\ \%$.`,
      v: table(['Quantity', 'Value'], [['Observed μ', `${hcl.mu} D`], ['μ if H⁺ Cl⁻ were fully ionic', `${f2(hclIonic)} D`], ['Percentage ionic character', `${f1(hclPct)} %`], ['Percentage covalent character', `${f1(100 - hclPct)} %`]], 'Table of the dipole-moment calculation for HCl'),
      n: 'First find the dipole moment the molecule would have if it were completely ionic. Multiply the electron charge by the bond length, and convert to debye. For hydrogen chloride this is about six point one debye. The measured value is only one point zero three, so the bond is about seventeen percent ionic and the rest covalent.',
    }),
    sl('check', 'Quick check: the most polar bond', {
      b: 'The larger the electronegativity difference, the more polar the bond.',
      n: 'Quick check. Use the electronegativity values given in the question. Subtract the value for hydrogen from the value for the other atom in each bond, then pick the bond with the largest difference, since a larger difference pulls the shared pair further towards one atom.',
      chk: 'polar-mcq',
    }),
    sl('concept', 'Covalent compared with ionic compounds', {
      b: 'Covalent compounds consist of **molecules** held together by **weak forces**, so they are usually gases, liquids or low-melting solids, **non-conductors**, soluble in non-polar solvents. Ionic compounds are **lattices of ions**, so they are hard, brittle, high-melting, and conduct when molten or dissolved.',
      v: table(['Property', 'Covalent compounds', 'Ionic compounds'], [['Particles', 'Molecules', 'Ions in a lattice'], ['Melting and boiling points', 'Low', 'High'], ['Conduction', 'Poor (no ions)', 'Good when molten or dissolved'], ['Solubility', 'Non-polar solvents; some in water', 'Water and polar solvents'], ['Reactions', 'Slow, molecular', 'Fast, ionic']], 'Table comparing covalent and ionic compounds'),
      n: 'Covalent compounds are made of molecules, and the forces between molecules are weak, so they melt and boil easily and do not conduct electricity. Ionic compounds are lattices of ions held by strong electrostatic forces, so they have high melting points, and conduct when molten or dissolved. Their reactions in solution are fast.',
    }),
    sl('concept', 'Variable covalency: P, S and Cl', {
      b: '**Covalency** is the number of bonds an atom forms. Atoms of the third period have vacant **3d orbitals**, so electrons can be **promoted** to give more unpaired electrons: P shows **3 and 5**, S shows **2, 4 and 6**, Cl shows **1, 3, 5 and 7**. Second-period atoms (N, O, F) cannot.',
      v: table(['Atom', 'Ground state', 'Excited states', 'Covalencies'], [['P', '3s² 3p³', '3s¹ 3p³ 3d¹', '3, 5'], ['S', '3s² 3p⁴', '3s² 3p³ 3d¹; 3s¹ 3p³ 3d²', '2, 4, 6'], ['Cl', '3s² 3p⁵', '3s² 3p⁴ 3d¹; 3s² 3p³ 3d²; 3s¹ 3p³ 3d³', '1, 3, 5, 7']], 'Table of ground and excited state configurations and covalencies of P, S and Cl'),
      n: 'Covalency is the number of bonds an atom forms. Atoms of the third period have empty d orbitals, so one electron can be promoted to give more unpaired electrons. Phosphorus shows covalencies of three and five, sulfur shows two, four and six, and chlorine shows one, three, five and seven. Nitrogen cannot, as it has no d orbitals.',
    }),
    sl('concept', 'Formal charge', {
      b: '**Formal charge = V − L − B/2**, where V is the number of valence electrons of the free atom, L the non-bonding electrons and B the bonding electrons. The formal charges add up to the charge on the species, and the best Lewis structure has charges as small as possible, with any negative charge on the more electronegative atom.',
      v: table(['Species', 'Atom', 'V', 'L', 'B', 'Formal charge'], [['NH₄⁺', 'N', '5', '0', '8', '+1'], ['H₃O⁺', 'O', '6', '2', '6', '+1'], ['CO', 'C', '4', '2', '6', '−1'], ['CO', 'O', '6', '2', '6', '+1'], ['O₃ (single-bonded end)', 'O', '6', '6', '2', '−1']], 'Table of formal charge calculations for NH4 plus, H3O plus, CO and O3'),
      n: 'Formal charge is the number of valence electrons of the free atom, minus the nonbonding electrons, minus half of the bonding electrons. The formal charges in a structure must add up to the overall charge of the species. The best structure has the smallest formal charges, with any negative charge on the more electronegative atom.',
    }),
    sl('diagram', 'Deviations from the octet rule', {
      b: '**Incomplete octets:** BeCl₂ (4 electrons round Be), BF₃ (6 round B). **Expanded octets:** PCl₅ (10 round P), SF₆ (12 round S); these use vacant 3d orbitals and are possible only from the third period on.',
      v: V.octet,
      n: 'Not every molecule obeys the octet rule. In beryllium chloride the beryllium atom has only four electrons, and in boron trifluoride the boron atom has six. These are incomplete octets. In phosphorus pentachloride the phosphorus atom has ten electrons, and in sulfur hexafluoride the sulfur atom has twelve. These are expanded octets.',
    }),
    sl('check', 'Quick check: formal charge', {
      b: 'Apply V minus L minus B over two to nitrogen.',
      n: 'Quick check. Count the valence electrons of the free nitrogen atom, the nonbonding electrons on nitrogen in the ion, and the electrons in its bonds. Then apply the formula for formal charge, remembering to halve the bonding electrons.',
      chk: 'fc-mcq',
    }),
    sl('summary', 'Summary: Part 1', {
      ul: [
        'Covalent bond: shared electron pairs; single, double, triple bonds = 1, 2, 3 pairs = 1 σ; 1 σ + 1 π; 1 σ + 2 π.',
        'Higher bond order: shorter and stronger bond (C–C 154 pm, 347; C≡C 120 pm, 837 kJ mol⁻¹).',
        'Dipole moment μ = q × d (debye); a symmetrical shape can cancel polar bonds (CO₂, BF₃).',
        'Covalent compounds: low melting points, non-conductors; ionic: high melting points, conduct when molten or dissolved.',
        'Variable covalency from 3d promotion (P: 3, 5; S: 2, 4, 6; Cl: 1, 3, 5, 7); formal charge = V − L − B/2; incomplete (BF₃) and expanded (PCl₅, SF₆) octets.',
      ],
      v: table(['Idea', 'Key fact'], [['σ and π', 'σ head-on and stronger; π sideways'], ['Polar molecule', 'μ is the vector sum of bond dipoles'], ['Formal charge', 'V − L − B/2'], ['Expanded octet', 'Only third period and below']], 'Summary table of the key ideas of Part 1'),
      n: 'Let us sum up Part One. Covalent bonds are shared electron pairs, and they can be single, double or triple, made of sigma and pi bonds. A higher bond order means a shorter and stronger bond. The dipole moment is a vector, so shape decides whether a molecule is polar. Third period atoms can have variable covalency and expanded octets, and formal charge helps to choose the best structure.',
    }),
    sl('exam-tips', 'Exam tips: Part 1', {
      ul: [
        'Count σ bonds as the number of lines (bonds) and π bonds as the extra lines of double and triple bonds.',
        'Say "the dipoles cancel because the molecule is linear (or symmetrical)", not "the bonds are non-polar".',
        'Convert bond length to metres and the dipole moment from C m to debye; give the percentage with its unit.',
        'Formal charge: halve the bonding electrons, and check that the charges add up to the charge on the species.',
        'Give the electron count (4, 6, 10 or 12) when naming an octet deviation.',
      ],
      v: table(['Slip', 'Fix'], [['Using the bonding electrons in full in formal charge', 'Halve them: B/2'], ['Calling CO₂ non-polar because C=O is non-polar', 'The bond is polar; the dipoles cancel by symmetry'], ['Counting a triple bond as three σ bonds', '1 σ + 2 π']], 'Table of common slips in Part 1 and their fixes'),
      n: 'Some exam tips. Count sigma bonds as the number of bonds, and add one pi bond for each extra line of a double or triple bond. Say that dipoles cancel because of symmetry, not that the bonds are nonpolar. In formal charge, halve the bonding electrons. And always give the number of electrons round the central atom when you name an octet deviation.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Covalent Bonding, VSEPR and Hybridisation — Part 2: Fajan’s rules, shapes of molecules and hybridisation',
  goals: [
    'Use Fajan’s rules to compare the covalent character of ionic compounds',
    'Predict the shapes and bond angles of molecules, including those with lone pairs, using VSEPR theory',
    'Identify the hybridisation of the central atom and relate it to the geometry',
  ],
  slides: [
    sl('title', 'From ionic towards covalent, and the shapes of molecules', {
      b: 'Part 2: how a small, highly charged cation turns an ionic bond **partly covalent**, then how electron-pair repulsion and hybridisation fix **molecular shape**.',
      v: V.fajan,
      n: 'Welcome to Part Two. We begin with Fajan rules, which explain why a bond between a metal and a nonmetal can have covalent character. Then we use electron pair repulsion to predict molecular shapes, and finish with hybridisation, which links the orbitals used to the geometry we observe.',
    }),
    sl('concept', 'Fajan’s rules', {
      b: 'An ionic bond has **covalent character** when the cation **polarises** (distorts) the electron cloud of the anion. This is greater when **(1)** the cation is **small** with a **high charge**, **(2)** the anion is **large** with a **high charge**, and **(3)** the cation has a **non-noble-gas** outer shell (such as Ag⁺).',
      v: table(['Factor', 'Greater covalent character when', 'Example'], [['Size of cation', 'smaller', 'LiCl > NaCl > KCl'], ['Charge of cation', 'higher', 'AlCl₃ > MgCl₂ > NaCl'], ['Size of anion', 'larger', 'LiI > LiF'], ['Charge of anion', 'higher', 'Li₃N more than LiF'], ['Cation type', '18-electron (Ag⁺) rather than noble gas type', 'AgCl less ionic than NaCl']], 'Table of Fajan rules with examples'),
      n: 'Fajan rules say that an ionic bond becomes more covalent when the cation polarises the anion strongly. This happens when the cation is small and highly charged, and when the anion is large and highly charged. A cation without a noble gas outer shell, such as silver, also polarises strongly.',
    }),
    sl('example', 'Worked example: ordering chlorides by covalent character', {
      b: r`**Problem.** Arrange NaCl, MgCl₂ and AlCl₃ in order of increasing covalent character using the charge-to-radius ratio $z/r$ of the cation (Na⁺ ${RAD['Na+']} pm, Mg²⁺ ${RAD['Mg2+']} pm, Al³⁺ ${RAD['Al3+']} pm).

$z/r$ for Na⁺ $= 1/${RAD['Na+']} = ${zr(1, RAD['Na+'])} \times 10^{-3}$; Mg²⁺ $= 2/${RAD['Mg2+']} = ${zr(2, RAD['Mg2+'])} \times 10^{-3}$; Al³⁺ $= 3/${RAD['Al3+']} = ${zr(3, RAD['Al3+'])} \times 10^{-3}$ pm⁻¹.

Order: **NaCl < MgCl₂ < AlCl₃**.`,
      v: table(['Compound', 'Cation', 'z/r (× 10⁻³ pm⁻¹)', 'Character'], [['NaCl', 'Na⁺', zr(1, RAD['Na+']), 'ionic'], ['MgCl₂', 'Mg²⁺', zr(2, RAD['Mg2+']), 'mainly ionic, some covalent'], ['AlCl₃', 'Al³⁺', zr(3, RAD['Al3+']), 'largely covalent: sublimes easily']], 'Table of charge to radius ratio and character for NaCl, MgCl2 and AlCl3'),
      n: 'Divide the charge of each cation by its radius. Sodium gives about ten, magnesium about twenty eight, and aluminium about fifty six, in units of ten to the minus three per picometre. The larger the ratio, the more the cation polarises the chloride ion, so the order is sodium chloride, then magnesium chloride, then aluminium chloride.',
    }),
    sl('check', 'Quick check: LiCl and its relatives', {
      b: 'Equal charges, so compare the cation sizes.',
      n: 'Quick check. All four cations carry the same single charge, and the anion is the same, so only the size of the cation matters. Decide whether the smallest or the largest cation is the better at distorting the chloride ion.',
      chk: 'fajan-mcq',
    }),
    sl('concept', 'VSEPR theory: electron pairs repel', {
      b: 'In the **valence shell electron pair repulsion** theory the electron pairs round a central atom (**bond pairs** and **lone pairs**) arrange themselves as far apart as possible. Repulsion order: **lone pair–lone pair > lone pair–bond pair > bond pair–bond pair**. A multiple bond counts as **one** domain.',
      v: flow('TB', [['a', 'Count the valence electrons round the central atom'], ['b', 'Find the number of bond pairs and lone pairs'], ['c', 'Arrange the pairs as far apart as possible'], ['d', 'Name the shape from the positions of the atoms only'], ['e', 'Adjust the angles: lone pairs compress them']], [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'e']], 'Flow chart of the steps for predicting molecular shape by VSEPR theory'),
      n: 'In the electron pair repulsion theory the pairs of electrons around the central atom spread out as far apart as possible. Lone pairs repel more strongly than bond pairs, so the order of repulsion is lone pair with lone pair, then lone pair with bond pair, then bond pair with bond pair. A double or triple bond counts as a single region of electrons.',
    }),
    sl('diagram', 'Ideal shapes with no lone pairs', {
      b: '**2 pairs:** linear, 180°. **3:** trigonal planar, 120°. **4:** tetrahedral, 109.5°. **5:** trigonal bipyramidal, 90° and 120°. **6:** octahedral, 90°. Examples: BeCl₂, BF₃, CH₄, PCl₅, SF₆.',
      v: V.vseprIdeal,
      n: 'With only bond pairs, the shapes are simple. Two pairs give a linear molecule. Three pairs give a trigonal planar molecule. Four pairs give a tetrahedron. Five pairs give a trigonal bipyramid, with two kinds of position. Six pairs give an octahedron. Beryllium chloride, boron trifluoride, methane, phosphorus pentachloride and sulfur hexafluoride are examples.',
    }),
    sl('concept', 'Lone pairs change the shape', {
      b: 'The **electron-pair geometry** is set by all the pairs; the **shape** is named from the atoms only. **Lone pairs** take more room, so they **compress** bond angles and, in the trigonal bipyramid, sit in the **equatorial** positions.',
      v: table(['Pairs (bond + lone)', 'Electron-pair geometry', 'Shape', 'Example', 'Angle'], [['3 + 1', 'tetrahedral', 'trigonal pyramidal', 'NH₃', '107°'], ['2 + 2', 'tetrahedral', 'bent', 'H₂O', '104.5°'], ['4 + 1', 'trigonal bipyramidal', 'see-saw', 'SF₄', '102°, 173°'], ['3 + 2', 'trigonal bipyramidal', 'T-shaped', 'ClF₃', 'about 87.5°'], ['2 + 3', 'trigonal bipyramidal', 'linear', 'XeF₂', '180°'], ['5 + 1', 'octahedral', 'square pyramidal', 'BrF₅', 'about 90°'], ['4 + 2', 'octahedral', 'square planar', 'XeF₄', '90°']], 'Table of electron-pair geometry, shape, example and bond angle for molecules with lone pairs'),
      n: 'The geometry of all the electron pairs decides the arrangement, but the name of the shape comes from the atoms alone. Lone pairs take up more room, so they squeeze the bond angles. In a trigonal bipyramid they sit in the equatorial positions, where there is more space. Ammonia is pyramidal, water is bent, and sulfur tetrafluoride is see saw shaped.',
    }),
    sl('diagram', 'NH₃, H₂O and SO₂', {
      b: '**NH₃:** 3 bond pairs + 1 lone pair, trigonal pyramidal, 107°. **H₂O:** 2 + 2, bent, 104.5°. **SO₂:** 2 bond domains + 1 lone pair, bent, about 119°.',
      v: V.vseprLp1,
      n: 'In ammonia there are three bond pairs and one lone pair on nitrogen, so the molecule is pyramidal. In water there are two bond pairs and two lone pairs, so it is bent. In sulfur dioxide the sulfur atom has two bonding regions and one lone pair on a trigonal planar arrangement, so the molecule is bent, with an angle of about one hundred nineteen degrees.',
    }),
    sl('diagram', 'Shapes derived from the trigonal bipyramid and octahedron', {
      b: '**SF₄** see-saw (1 lone pair), **ClF₃** T-shaped (2), **XeF₂** linear (3): the lone pairs are **equatorial**. **BrF₅** square pyramidal (1) and **XeF₄** square planar (2, opposite each other).',
      v: V.vseprLp2,
      n: 'Here are five more shapes. Start from a trigonal bipyramid and put lone pairs in the equatorial positions: one lone pair gives a see saw, two give a T shape, and three give a linear molecule. Start from an octahedron: one lone pair gives a square pyramid, and two lone pairs opposite each other give a square planar molecule.',
    }),
    sl('example', 'Worked example: shapes of SF₄ and XeF₂', {
      b: r`**Problem.** Predict the shapes of $\ce{SF4}$ and $\ce{XeF2}$.

**SF₄:** S has 6 valence electrons; 4 F add 4 → 10 electrons = **5 pairs**: 4 bond pairs + 1 lone pair. Trigonal bipyramidal pairs, lone pair equatorial → **see-saw**.

**XeF₂:** Xe has 8; 2 F add 2 → 10 = **5 pairs**: 2 bond pairs + 3 lone pairs. Lone pairs equatorial → F atoms axial → **linear, 180°**.`,
      v: table(['Molecule', 'Electrons round centre', 'Pairs', 'Bond + lone', 'Shape'], [['SF₄', '6 + 4 = 10', '5', '4 + 1', 'see-saw'], ['XeF₂', '8 + 2 = 10', '5', '2 + 3', 'linear']], 'Table of the VSEPR analysis of SF4 and XeF2'),
      n: 'For sulfur tetrafluoride, sulfur has six valence electrons and the four fluorine atoms add four more, making ten electrons or five pairs. Four are bond pairs and one is a lone pair, so the shape is see saw. For xenon difluoride, xenon has eight electrons and two more are added, again five pairs, with two bond pairs and three lone pairs, so the molecule is linear.',
    }),
    sl('check', 'Quick check: shape of xenon difluoride', {
      b: 'Where do the three lone pairs go in a trigonal bipyramid?',
      n: 'Quick check. Count the pairs round xenon and decide how many are lone pairs. Remember that lone pairs prefer the equatorial positions of a trigonal bipyramid, then look at where the two fluorine atoms are left.',
      chk: 'xef2-mcq',
    }),
    sl('concept', 'Hybridisation: why equal bonds from unequal orbitals', {
      b: 'Carbon has 2s² 2p² but forms **four equal bonds** in methane. In **hybridisation** atomic orbitals of the same atom with slightly different energies **mix** to form the **same number of equivalent hybrid orbitals**, directed in space to give the molecule its shape. An electron is first **promoted** if needed.',
      v: flow('LR', [['a', 'Promote an electron to a vacant orbital of nearby energy'], ['b', 'Mix the s, p (and d) orbitals'], ['c', 'Form equivalent hybrid orbitals, one electron each'], ['d', 'Each overlaps head-on with another atom: a σ bond']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Flow chart of promotion, mixing, hybrid orbitals and sigma bond formation'),
      n: 'Carbon has two paired s electrons and two unpaired p electrons, yet it forms four equal bonds in methane. Hybridisation explains this. An electron is promoted, then the s and p orbitals mix to give the same number of equivalent hybrid orbitals, each holding one electron. Each hybrid orbital then overlaps head on with an orbital of another atom to form a sigma bond.',
    }),
    sl('diagram', 'Promotion and hybridisation of Be, B, C, P and S', {
      b: 'Be: **sp** (2 orbitals). B: **sp²** (3). C: **sp³** (4). P: **sp³d** (5, with a 3d orbital). S: **sp³d²** (6, with two 3d orbitals). The number of hybrid orbitals equals the number of orbitals mixed.',
      v: V.hybBoxes,
      n: 'In these boxes, beryllium promotes one s electron to p and mixes the two orbitals into two s p hybrids. Boron gives three s p two hybrids, and carbon gives four s p three hybrids. Phosphorus uses one d orbital to give five s p three d hybrids, and sulfur uses two d orbitals to give six s p three d two hybrids.',
    }),
    sl('diagram', 'The lobes and the geometry', {
      b: '**sp:** linear, 180° (BeCl₂). **sp²:** trigonal planar, 120° (BF₃). **sp³:** tetrahedral, 109.5° (CH₄). **sp³d:** trigonal bipyramidal (PCl₅). **sp³d²:** octahedral, 90° (SF₆).',
      v: V.hybLobes,
      n: 'The hybrid orbitals point in definite directions. Two s p hybrids are in a straight line. Three s p two hybrids lie in a plane at one hundred twenty degrees. Four s p three hybrids point to the corners of a tetrahedron. Five s p three d hybrids form a trigonal bipyramid, and six s p three d two hybrids point along the axes of an octahedron.',
    }),
    sl('concept', 'Hybridisation and shape together', {
      b: 'Count the **electron pairs** round the central atom (bond pairs + lone pairs; a multiple bond counts once): **2 → sp**, **3 → sp²**, **4 → sp³**, **5 → sp³d**, **6 → sp³d²**. The shape then follows from the number of lone pairs.',
      v: table(['Pairs', 'Hybridisation', 'Geometry', 'Examples'], [['2', 'sp', 'linear', 'BeCl₂, CO₂, C₂H₂'], ['3', 'sp²', 'trigonal planar (or bent)', 'BF₃, C₂H₄, SO₂'], ['4', 'sp³', 'tetrahedral (or pyramidal, bent)', 'CH₄, NH₃, H₂O'], ['5', 'sp³d', 'trigonal bipyramidal (or see-saw, T, linear)', 'PCl₅, SF₄, ClF₃, XeF₂'], ['6', 'sp³d²', 'octahedral (or square pyramidal, planar)', 'SF₆, BrF₅, XeF₄']], 'Table linking the number of electron pairs, hybridisation, geometry and examples'),
      n: 'Here is the shortcut. Count the electron pairs round the central atom, counting a double or triple bond once. Two pairs mean s p. Three mean s p two. Four mean s p three. Five mean s p three d, and six mean s p three d two. The shape then depends on how many of those pairs are lone pairs.',
    }),
    sl('example', 'Worked example: hybridisation by counting pairs', {
      b: r`**Problem.** Find the hybridisation of the central atom in $\ce{NH3}$, $\ce{H2O}$, $\ce{PCl5}$ and ethene.

**NH₃:** 3 bond pairs + 1 lone pair = 4 → **sp³**. **H₂O:** 2 + 2 = 4 → **sp³**. **PCl₅:** 5 bond pairs = 5 → **sp³d**. **Ethene:** each C has 3 σ bonds, the π bond adds no domain → 3 → **sp²**.`,
      v: table(['Species', 'Pairs (or σ bonds) round the central atom', 'Hybridisation', 'Shape'], [['NH₃', '3 + 1 = 4', 'sp³', 'trigonal pyramidal'], ['H₂O', '2 + 2 = 4', 'sp³', 'bent'], ['PCl₅', '5 + 0 = 5', 'sp³d', 'trigonal bipyramidal'], ['C₂H₄ (each C)', '3 σ bonds', 'sp²', 'trigonal planar']], 'Table of hybridisation of NH3, H2O, PCl5 and ethene by counting electron pairs'),
      n: 'Count the regions of electrons round each central atom. In ammonia there are three bond pairs and one lone pair, four in all, so the atom is s p three hybridised. Water also has four, so it is s p three. Phosphorus pentachloride has five, so s p three d. In ethene each carbon has three sigma bonds, and the pi bond adds no new region, so it is s p two.',
    }),
    sl('concept', 'Hybridisation in ethane, ethene and ethyne', {
      b: '**Ethane:** each C is **sp³** (4 σ). **Ethene:** each C is **sp²** (3 σ + 1 π; the unhybridised p orbitals overlap sideways). **Ethyne:** each C is **sp** (2 σ + 2 π; two unhybridised p orbitals). More s character gives a **shorter, stronger** bond.',
      v: table(['Molecule', 'C hybridisation', 'C–C bond', 'σ and π in C–C', 'Length (pm)'], [['Ethane', 'sp³', 'single', '1 σ', String(BOND['C–C'].len)], ['Ethene', 'sp²', 'double', '1 σ + 1 π', String(BOND['C=C'].len)], ['Ethyne', 'sp', 'triple', '1 σ + 2 π', String(BOND['C≡C'].len)]], 'Table of the hybridisation of carbon, bond type and length in ethane, ethene and ethyne'),
      n: 'In ethane each carbon is s p three hybridised, with four sigma bonds. In ethene each carbon is s p two, and the leftover p orbitals overlap sideways to form a pi bond. In ethyne each carbon is s p, with two leftover p orbitals that form two pi bonds. The carbon carbon bond becomes shorter as the s character increases.',
    }),
    sl('check', 'Quick check: hybridisation in ethene', {
      b: 'Count the sigma bonds round one carbon; the pi bond uses an unhybridised p orbital.',
      n: 'Quick check. Count how many sigma bonds each carbon forms. The pi bond is made from an unhybridised p orbital and does not need a hybrid orbital, so use the number of sigma bonds to choose the hybridisation.',
      chk: 'hyb-ethene-mcq',
    }),
    sl('summary', 'Summary: Part 2', {
      ul: [
        'Fajan: covalent character rises with a small, highly charged cation and a large, highly charged anion (LiCl > NaCl; AlCl₃ > MgCl₂ > NaCl).',
        'VSEPR: pairs repel; lone pair–lone pair > lone pair–bond pair > bond pair–bond pair; shapes NH₃ pyramidal, H₂O bent, SF₄ see-saw, XeF₂ linear.',
        'Hybridisation: pairs 2, 3, 4, 5, 6 → sp, sp², sp³, sp³d, sp³d².',
        'Ethane sp³, ethene sp², ethyne sp; σ bonds from hybrid orbitals, π bonds from unhybridised p orbitals.',
      ],
      v: table(['Species', 'Pairs', 'Hybridisation', 'Shape'], [['BeCl₂', '2', 'sp', 'linear'], ['BF₃', '3', 'sp²', 'trigonal planar'], ['CH₄', '4', 'sp³', 'tetrahedral'], ['PCl₅', '5', 'sp³d', 'trigonal bipyramidal'], ['SF₆', '6', 'sp³d²', 'octahedral']], 'Summary table of pairs, hybridisation and shape'),
      n: 'Let us sum up Part Two. Fajan rules say that a small, highly charged cation and a large anion give more covalent character. VSEPR theory predicts shapes from the repulsion of electron pairs, with lone pairs compressing the angles. Hybridisation links the number of electron pairs to the type of orbitals used, from s p for two pairs to s p three d two for six pairs.',
    }),
    sl('exam-tips', 'Exam tips: Part 2', {
      ul: [
        'In Fajan’s rules always mention both charge and size of the cation, and size of the anion.',
        'Count lone pairs from the valence electrons: central atom electrons + one for each single-bonded atom, divided by two.',
        'Name the shape from the atoms only (NH₃ is pyramidal, not tetrahedral) but the hybridisation from all the pairs (sp³).',
        'State the lone pair position (equatorial) in SF₄, ClF₃ and XeF₂.',
        'A π bond uses an unhybridised p orbital; it does not change the hybridisation.',
      ],
      v: table(['Slip', 'Fix'], [['Naming NH₃ "tetrahedral"', 'The shape is pyramidal; the electron pairs are tetrahedral'], ['Counting a double bond as two domains', 'A multiple bond counts as one'], ['Putting lone pairs of SF₄ axial', 'Equatorial positions have more room']], 'Table of common slips in Part 2 and their fixes'),
      n: 'Some exam tips. In Fajan rules, mention the charge and the size of the cation, and the size of the anion. Count lone pairs from the valence electrons. Name the shape from the atoms only but the hybridisation from all the pairs, so ammonia is pyramidal but sp three. Put lone pairs in the equatorial positions, and remember that a pi bond does not change the hybridisation.',
    }),
  ],
});
