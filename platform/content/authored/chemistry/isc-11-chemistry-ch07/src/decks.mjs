// ISC 11 Chemistry ch07 Ionic Bonding: two decks. Part 1 (t01-t02) valence electrons, Kossel-Lewis, octet rule, electron-dot
// structures of ionic compounds, conditions for formation; Part 2 (t03-t04) cations and anions, variable electrovalency,
// lattice enthalpy, Born-Haber cycle, characteristics of ionic compounds.
import { sl, deck, table, flow, svgV, r } from './lib.mjs';
import { NACL_DOTS, IONIC5, ENSCALE, VARIABLE, BH_NACL, BH_MGCL2, LATTICE } from './svgs.mjs';
import { ionic, BH, bhSteps, bhSum, bhLattice, LATT, RAD } from './data.mjs';

const mn = (x) => String(x).replace('-', '−');

export const V = {
  nacl: svgV(NACL_DOTS, 'Electron transfer from sodium to chlorine forming Na plus and Cl minus ions with eight outer electrons, drawn with electron dots in brackets', 'Na gives one electron to Cl: an ionic bond.'),
  ionic5: svgV(IONIC5, 'Electron-dot structures of Li2O, MgO, CaO, MgF2 and Na2S showing cations as empty shells and anions with eight dots', 'Total positive charge equals total negative charge.'),
  enscale: svgV(ENSCALE, 'Electronegativity scale from potassium and sodium to fluorine, with bars showing the large difference for Na-Cl, Mg-O and Ca-F and the small difference for C-H', 'A large electronegativity difference favours an ionic bond.'),
  variable: svgV(VARIABLE, 'Orbital box diagrams of the outer electrons of Fe, Fe2+, Fe3+ and of Pb, Pb2+, Pb4+ showing the unstable core and the inert pair', 'Fe³⁺ is 3d⁵; Pb²⁺ keeps 6s².'),
  bhNacl: svgV(BH_NACL, 'Born-Haber cycle for sodium chloride as an energy-level diagram with all five steps and the direct enthalpy of formation', 'Sum of the five steps = ΔHf = −412 kJ mol⁻¹.'),
  bhMgcl2: svgV(BH_MGCL2, 'Born-Haber cycle for magnesium chloride as an energy-level diagram with six steps', 'Two ionisation steps and two chlorine atoms.'),
  lattice: svgV(LATTICE, 'Solid sodium chloride with ions fixed in a lattice compared with molten sodium chloride whose ions move to the electrodes', 'Only the melt (or solution) has free ions.'),
};

// ---- worked-example data
const mgn = ionic('Mg', 'N');
const nacl = BH.NaCl;
const kcl = BH.KCl;
const sNa = bhSteps(nacl);
const UNa = bhLattice(nacl);
const mg = BH.MgCl2;
const sMg = bhSteps(mg);
const UMg = bhLattice(mg);
const pairNa = nacl.ie[0] + nacl.ege;
const pairK = kcl.ie[0] + kcl.ege;

export const deck1 = deck({
  part: 1,
  title: 'Ionic Bonding — Part 1: Valence electrons, the octet rule and the ionic bond',
  goals: [
    'State the Kossel–Lewis approach and the octet rule, and write Lewis symbols using valence electrons',
    'Draw electron-dot structures of NaCl, Li₂O, MgO, CaO, MgF₂ and Na₂S and predict the formula of an ionic compound',
    'Explain the conditions that favour an ionic bond: ionisation enthalpy, electron gain enthalpy, lattice enthalpy and electronegativity difference',
  ],
  slides: [
    sl('title', 'How atoms bond by giving and taking electrons', {
      b: 'Part 1: why atoms combine, and how a metal and a non-metal form an **ionic bond** by transferring electrons.',
      v: V.nacl,
      n: 'Welcome. In this part we ask why atoms form bonds at all, and we meet the simplest answer, given by Kossel and Lewis. Then we follow a sodium atom giving one electron to a chlorine atom, and see how that single transfer creates two ions which attract each other strongly.',
    }),
    sl('concept', 'Valence electrons and the Kossel–Lewis approach', {
      b: '**Valence electrons** are the electrons of the outermost shell; they alone take part in bonding. Kossel and Lewis explained bonding by the **stability of the noble gases**: their outer shells are full, and other atoms reach the same arrangement by **gaining, losing or sharing** electrons.',
      v: table(['Group', '1', '2', '13', '14', '15', '16', '17', '18'], [['Valence electrons', '1', '2', '3', '4', '5', '6', '7', '8 (He: 2)'], ['Lewis symbol shows', '1 dot', '2 dots', '3 dots', '4 dots', '5 dots', '6 dots', '7 dots', '8 dots']], 'Table of the number of valence electrons for the main groups'),
      n: 'Valence electrons are the electrons of the outermost shell, and only these take part in bonding. The number equals the group number for the first two groups, and the group number minus ten for the groups thirteen to eighteen. Kossel and Lewis said that atoms combine so as to reach the full outer shell of a noble gas.',
    }),
    sl('concept', 'The octet rule', {
      b: 'Atoms tend to combine until each has **eight electrons** in its outermost shell (the **octet rule**); hydrogen, lithium and beryllium aim for **two**, like helium. An atom can reach an octet by **transfer** (electrovalent or ionic bond) or by **sharing** (covalent bond).',
      v: flow('LR', [['a', 'Atom has an incomplete outer shell'], ['b', 'Metal loses electrons to a non-metal: ionic bond'], ['c', 'Two non-metals share electron pairs: covalent bond'], ['d', 'Each atom reaches 8 outer electrons (2 for H)']], [['a', 'b'], ['a', 'c'], ['b', 'd'], ['c', 'd']], 'Flow chart showing that an atom reaches an octet either by electron transfer to give an ionic bond or by sharing to give a covalent bond'),
      n: 'The octet rule says that atoms combine until each has eight electrons in the outer shell. Hydrogen, lithium and beryllium instead aim for two, like helium. There are two ways to get there. A metal can hand electrons over to a non-metal, giving an ionic bond, or two non-metals can share electrons, giving a covalent bond.',
    }),
    sl('diagram', 'Sodium chloride by electron transfer', {
      b: 'Sodium (2, 8, 1) gives its **one valence electron** to chlorine (2, 8, 7). Na⁺ has the neon arrangement (2, 8) and Cl⁻ has the argon arrangement (2, 8, 8). The **electrostatic attraction** between these opposite charges is the **ionic bond**.',
      v: V.nacl,
      n: 'Look at the dots. Sodium has one valence electron and chlorine has seven. Sodium gives its electron to chlorine, shown by the green arrow. Both atoms now have a full outer shell of eight electrons. The sodium ion is positive, the chloride ion is negative, and the attraction between them is the ionic bond.',
    }),
    sl('check', 'Quick check: octet or duplet?', {
      b: 'Count the electrons in the outermost occupied shell of each ion.',
      n: 'Quick check. For each ion, work out how many electrons it has left by taking the charge away from the atomic number, then write the arrangement in shells. Decide which ion ends with a duplet like helium rather than an octet like neon or argon.',
      chk: 'duplet-mcq',
    }),
    sl('concept', 'Writing the electron-dot structure of an ionic compound', {
      b: '**1.** Draw the Lewis symbol of each atom. **2.** Move electrons from the metal to the non-metal until the non-metal has eight. **3.** Show each ion in **brackets with its charge**; the cation shows no outer electrons, the anion shows eight dots. **4.** Check that the **total charge is zero**.',
      v: flow('TB', [['a', 'Count valence electrons of each atom'], ['b', 'Metal gives up all its valence electrons'], ['c', 'Non-metal takes 8 minus its valence electrons'], ['d', 'Balance the numbers of ions so that charges cancel'], ['e', 'Write brackets, charges and eight dots on the anion']], [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'e']], 'Flow chart of the steps for writing an electron-dot structure of an ionic compound'),
      n: 'Here are the steps. Count the valence electrons of each atom. The metal gives up all of its valence electrons. The non-metal takes as many as it needs to reach eight. Adjust the numbers of ions until the total charge is zero. Finally draw each ion in square brackets with its charge, and show eight dots on the anion.',
    }),
    sl('diagram', 'Electron-dot structures of five ionic compounds', {
      b: 'In **Li₂O** two Li atoms give one electron each to O. In **MgO** and **CaO** two electrons pass to O. In **MgF₂** the Mg atom gives one electron to each of two F atoms. In **Na₂S** each of two Na atoms gives one electron to S.',
      v: V.ionic5,
      n: 'Here are five more compounds. In lithium oxide, two lithium atoms each give one electron to oxygen. In magnesium oxide and calcium oxide, a metal atom gives two electrons to oxygen. In magnesium fluoride, one magnesium atom supplies one electron to each of two fluorine atoms. In sodium sulfide, two sodium atoms supply sulfur.',
    }),
    sl('example', 'Worked example: formula of magnesium nitride', {
      b: r`**Problem.** Magnesium (2 valence electrons) burns in nitrogen (5 valence electrons). Predict the formula and the number of electrons transferred.

Mg loses 2 electrons: $\ce{Mg -> Mg^2+ + 2e-}$. N needs $8 - 5 = 3$: $\ce{N + 3e- -> N^3-}$. The least common multiple of 2 and 3 is 6, so **${mgn.nc} Mg** lose ${mgn.nc} × 2 = ${mgn.lost} electrons and **${mgn.na} N** gain ${mgn.na} × 3 = ${mgn.gained}. Charge: $3(+2) + 2(-3) = 0$. Formula: $\ce{Mg3N2}$, with **${mgn.lost}** electrons transferred.`,
      v: table(['Quantity', 'Mg', 'N'], [['Valence electrons', '2', '5'], ['Electrons lost or gained per atom', 'lose 2', 'gain 3'], ['Atoms in the formula', '3', '2'], ['Electrons transferred in all', '6', '6'], ['Ion formed', 'Mg²⁺', 'N³⁻']], 'Table of the electron balance for magnesium nitride'),
      n: 'Magnesium has two valence electrons, so it loses two. Nitrogen has five, so it needs three. The lowest common multiple of two and three is six. So three magnesium atoms give away six electrons, and two nitrogen atoms take six. The charges cancel, and the formula is magnesium nitride with three magnesium and two nitrogen.',
    }),
    sl('check', 'Quick check: predicting a formula', {
      b: 'Balance electrons lost and gained to find the formula.',
      n: 'Quick check. Write how many electrons each atom must lose or gain to reach an octet. Then find the smallest numbers of atoms for which the electrons lost equal the electrons gained, and write the formula from those numbers.',
      chk: 'formula-mcq',
    }),
    sl('concept', 'Conditions for forming an ionic bond', {
      b: 'An ionic bond forms easily when **(1)** the metal has a **low ionisation enthalpy**, **(2)** the non-metal has a **large negative electron gain enthalpy**, **(3)** the **lattice enthalpy** released on packing the ions is high (high charges, small ions), and **(4)** the **electronegativity difference** is large (above about 1.7).',
      v: table(['Condition', 'Favourable value', 'Example'], [['Ionisation enthalpy of the metal', 'low', 'Na 496 kJ mol⁻¹'], ['Electron gain enthalpy of the non-metal', 'large and negative', 'Cl −349 kJ mol⁻¹'], ['Lattice enthalpy', 'large and negative', 'NaCl −788 kJ mol⁻¹'], ['Electronegativity difference', 'above about 1.7', 'Na–Cl 2.1']], 'Table of the four conditions that favour an ionic bond'),
      n: 'Four things favour an ionic bond. The metal should lose electrons easily, so its ionisation enthalpy is low. The non-metal should gain electrons readily, so its electron gain enthalpy is large and negative. The lattice enthalpy should be high, and the difference in electronegativity should be large, above about one point seven.',
    }),
    sl('diagram', 'Electronegativity difference', {
      b: 'A bond between atoms with a **large difference in electronegativity** (Na–Cl 2.1, Mg–O 2.3, Ca–F 3.0) is ionic, since the more electronegative atom pulls the electron away completely. C–H (0.4) is covalent.',
      v: V.enscale,
      n: 'Here is the electronegativity scale. Metals such as potassium, sodium and calcium sit at the low end, and fluorine, oxygen and chlorine at the high end. The red bars show large differences: these bonds are ionic. The green bar, between carbon and hydrogen, is small, so that bond is covalent.',
    }),
    sl('example', 'Worked example: energy to make an ion pair', {
      b: r`**Problem.** Compare the energy needed to form gaseous ion pairs from atoms: $\ce{Na(g) + Cl(g) -> Na+(g) + Cl-(g)}$ and $\ce{K(g) + Cl(g) -> K+(g) + Cl-(g)}$. Ionisation enthalpies (kJ mol⁻¹): Na ${nacl.ie[0]}, K ${kcl.ie[0]}; electron gain enthalpy of Cl ${mn(nacl.ege)}.

**Na–Cl:** ${nacl.ie[0]} + (${mn(nacl.ege)}) = **+${pairNa}** kJ mol⁻¹. **K–Cl:** ${kcl.ie[0]} + (${mn(kcl.ege)}) = **+${pairK}** kJ mol⁻¹. Both are positive, but the lattice enthalpy pays for them: ${pairNa} + (${LATT.NaCl}) = ${pairNa + LATT.NaCl} and ${pairK} + (${LATT.KCl}) = ${pairK + LATT.KCl} kJ mol⁻¹.`,
      v: table(['Compound', 'IE + EGE', 'Lattice enthalpy', 'Sum'], [['NaCl', `+${pairNa}`, mn(LATT.NaCl), mn(pairNa + LATT.NaCl)], ['KCl', `+${pairK}`, mn(LATT.KCl), mn(pairK + LATT.KCl)]], 'Table of the energy of ion-pair formation, lattice enthalpy and the sum for NaCl and KCl'),
      n: 'Add the ionisation enthalpy of the metal to the electron gain enthalpy of chlorine. The result is positive in both cases, so forming gaseous ions from atoms costs energy. The compound still forms because the lattice enthalpy is a large negative number. The sum of the two is negative, so each solid is more stable than its separate atoms.',
    }),
    sl('check', 'Quick check: which bond is ionic?', {
      b: 'Subtract the electronegativities of the two atoms in each pair.',
      n: 'Quick check. Work out the difference in electronegativity for each pair from the values in the question. An ionic bond needs a large difference, so look for a very electropositive metal paired with a very electronegative non-metal.',
      chk: 'en-mcq',
    }),
    sl('summary', 'Summary: Part 1', {
      ul: [
        'Valence electrons = outer-shell electrons; Kossel–Lewis: atoms reach a noble gas arrangement by transfer or sharing.',
        'Octet rule: 8 outer electrons (2 for H, Li, Be).',
        'Ionic bond = electrostatic attraction between ions formed by electron transfer; metal gives, non-metal takes.',
        'Dot structures: cation in brackets with no dots, anion with 8 dots, total charge zero.',
        'Favoured by low IE, large negative EGE, high lattice enthalpy and a large electronegativity difference (about 1.7 or more).',
      ],
      v: table(['Compound', 'Ions', 'Electrons moved'], [['NaCl', 'Na⁺, Cl⁻', '1'], ['Li₂O', '2 Li⁺, O²⁻', '2 (1 each)'], ['MgO, CaO', 'M²⁺, O²⁻', '2'], ['MgF₂', 'Mg²⁺, 2 F⁻', '2 (1 each)'], ['Na₂S', '2 Na⁺, S²⁻', '2 (1 each)']], 'Summary table of the ions and electrons moved for the compounds of Part 1'),
      n: 'Let us sum up Part 1. Valence electrons are those of the outer shell. Atoms combine to reach eight electrons, or two for the smallest atoms. In an ionic bond a metal gives electrons to a non-metal, and the oppositely charged ions attract. Low ionisation enthalpy, large negative electron gain enthalpy, high lattice enthalpy and a large electronegativity difference all favour it.',
    }),
    sl('exam-tips', 'Exam tips: Part 1', {
      ul: [
        'Draw cations as empty brackets with the charge; anions with eight dots in brackets with the charge.',
        'Check that electrons lost equal electrons gained, and that the total charge is zero.',
        'Write the octet as the target for most atoms, but a duplet for H, Li, Be and for Li⁺.',
        'Do not call the transfer of electrons "sharing": say "transfer" for ionic and "sharing" for covalent.',
        'Quote a number with units when asked for a factor: ionisation enthalpy in kJ mol⁻¹.',
      ],
      v: table(['Slip', 'Fix'], [['Dots left inside the cation bracket', 'Cation has lost its outer shell: show none'], ['Charges that do not cancel', 'Change the numbers of ions'], ['Writing Mg⁺ or O⁻', 'Mg²⁺ and O²⁻: octet needs 2 electrons']], 'Table of common slips in Part 1 and their fixes'),
      n: 'Some exam tips. Draw cations as empty brackets with a charge, and anions with eight dots. Always check that the electrons lost equal the electrons gained. Remember that hydrogen, lithium and beryllium aim for a duplet. Use the word transfer for ionic bonds and the word sharing for covalent bonds.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Ionic Bonding — Part 2: Variable electrovalency, lattice enthalpy and the Born–Haber cycle',
  goals: [
    'Explain how cations and anions form and why some elements show variable electrovalency (inert pair effect, unstable core)',
    'Define lattice enthalpy and use a Born–Haber cycle to calculate it for NaCl and MgCl₂',
    'Relate the properties of ionic compounds to their structure',
  ],
  slides: [
    sl('title', 'Ions with more than one charge', {
      b: 'Part 2: why iron forms Fe²⁺ and Fe³⁺, why lead forms Pb²⁺ and Pb⁴⁺, and how the **Born–Haber cycle** finds the lattice enthalpy.',
      v: V.variable,
      n: 'Welcome to Part 2. Some metals form a single ion, but iron, tin and lead can form two. We shall find the reasons in their electron configurations. Then we meet lattice enthalpy, the energy that holds an ionic crystal together, and learn to calculate it from a Born-Haber cycle.',
    }),
    sl('concept', 'Formation of cations and anions', {
      b: 'A **cation** forms when an atom loses electrons; it is **smaller** than the atom, because the outer shell goes and the same nuclear charge holds fewer electrons. An **anion** forms when an atom gains electrons; it is **larger**, because repulsion rises while the nuclear charge is unchanged.',
      v: table(['Atom', 'Change', 'Ion', 'Arrangement', 'Radius, atom → ion (pm)'], [['Na', 'loses 1 e⁻', 'Na⁺', '2, 8', '186 → 102'], ['Mg', 'loses 2 e⁻', 'Mg²⁺', '2, 8', '160 → 72'], ['Cl', 'gains 1 e⁻', 'Cl⁻', '2, 8, 8', '99 → 181'], ['O', 'gains 2 e⁻', 'O²⁻', '2, 8', '66 → 140']], 'Table of ion formation with the change in radius'),
      n: 'A cation forms when an atom loses electrons. It is smaller than the atom, because the outer shell has gone and the same nuclear charge holds fewer electrons. An anion forms when an atom gains electrons. It is larger than the atom, because the extra electron repels the others while the nuclear charge stays the same.',
    }),
    sl('concept', 'Variable electrovalency: two causes', {
      b: 'Some elements form **more than one cation**. In the **d-block** (Fe²⁺, Fe³⁺) the core left after the s electrons go is **not a stable noble gas core**, so d electrons can be lost too (**unstable core**). In heavy **p-block** elements (Tl⁺, Sn²⁺, Pb²⁺) the **ns² pair resists loss** (**inert pair effect**).',
      v: table(['Cause', 'Example', 'Ions', 'Reason'], [['Unstable core', 'Fe', 'Fe²⁺ and Fe³⁺', 'Incomplete 3d core; Fe³⁺ is half-filled 3d⁵'], ['Inert pair effect', 'Pb', 'Pb²⁺ and Pb⁴⁺', '6s² pair held tightly; +2 more stable'], ['Inert pair effect', 'Tl', 'Tl⁺ and Tl³⁺', '6s² stays; +1 more stable']], 'Table of the two causes of variable electrovalency'),
      n: 'Variable electrovalency has two common causes. In the d block, the core that remains after the s electrons are lost is not a stable noble gas core, so d electrons may be lost as well. In heavy p block elements, the pair of s electrons is held so tightly that it often stays, which makes the lower oxidation state more stable.',
    }),
    sl('diagram', 'Iron and lead in orbital boxes', {
      b: '**Iron:** [Ar] 3d⁶ 4s². Loss of 4s² gives **Fe²⁺** (3d⁶); loss of one 3d electron gives **Fe³⁺** (3d⁵, half-filled). **Lead:** 6s² 6p². Loss of 6p² gives **Pb²⁺**; if the **6s² pair** is lost too, **Pb⁴⁺** results.',
      v: V.variable,
      n: 'In the boxes on the left, iron first loses its two four s electrons to give iron two plus. A further three d electron is lost to leave a half filled three d subshell, which is iron three plus. On the right, lead loses two six p electrons to give lead two plus, and the six s pair stays unless more energy is supplied.',
    }),
    sl('check', 'Quick check: electrons in tin ions', {
      b: 'Take the charge away from the atomic number.',
      n: 'Quick check. An ion has the atomic number minus its charge in electrons. Work this out for tin with a two plus charge and with a four plus charge, and decide which electrons have been lost in each case, the p electrons or also the s pair.',
      chk: 'sn-mcq',
    }),
    sl('concept', 'The inert pair effect down a group', {
      b: 'Going down Groups 13, 14 and 15, the two ns electrons are **less and less involved in bonding** because they are poorly shielded and held close to the nucleus. The state **two less than the group valence** becomes **more stable**: +1 for Tl, +2 for Pb, +3 for Bi. Pb(IV) compounds are **oxidising**; Pb(II) compounds are stable.',
      v: table(['Element', 'Outer arrangement', 'Common states', 'More stable state'], [['Tl (Group 13)', '6s² 6p¹', '+1, +3', '+1'], ['Sn (Group 14)', '5s² 5p²', '+2, +4', 'both known'], ['Pb (Group 14)', '6s² 6p²', '+2, +4', '+2'], ['Bi (Group 15)', '6s² 6p³', '+3, +5', '+3']], 'Table of the inert pair effect for Tl, Sn, Pb and Bi'),
      n: 'Down the p block the pair of s electrons becomes more and more reluctant to take part in bonding. So thallium prefers plus one, lead prefers plus two, and bismuth prefers plus three. Lead four compounds are oxidising agents, because lead would rather go back to the plus two state.',
    }),
    sl('concept', 'Lattice enthalpy', {
      b: 'The **lattice enthalpy** is the enthalpy change when **one mole of an ionic solid is formed from its gaseous ions**, e.g. $\\ce{Na+(g) + Cl-(g) -> NaCl(s)}$, $-788$ kJ mol⁻¹. It is larger for ions of **higher charge** and **smaller radius**.',
      v: table(['Solid', 'Lattice enthalpy (kJ mol⁻¹)', 'Ions'], [['NaF', mn(LATT.NaF), `Na⁺ ${RAD['Na+']} pm, F⁻ ${RAD['F-']} pm`], ['NaCl', mn(LATT.NaCl), `Na⁺ ${RAD['Na+']} pm, Cl⁻ ${RAD['Cl-']} pm`], ['NaI', mn(LATT.NaI), `Na⁺ ${RAD['Na+']} pm, I⁻ ${RAD['I-']} pm`], ['MgO', mn(LATT.MgO), `Mg²⁺ ${RAD['Mg2+']} pm, O²⁻ ${RAD['O2-']} pm`]], 'Table of lattice enthalpies with the ions concerned'),
      n: 'Lattice enthalpy is the energy change when one mole of an ionic solid forms from its gaseous ions. It is a large negative number. It is greater for ions with higher charges and smaller radii. Compare sodium fluoride with sodium iodide: the smaller fluoride ion gives the larger lattice enthalpy.',
    }),
    sl('diagram', 'The Born–Haber cycle for sodium chloride', {
      b: 'By **Hess’s law**, the enthalpy of formation equals the sum of the steps: **sublimation** of Na, **dissociation** of ½Cl₂, **ionisation** of Na, **electron gain** by Cl, and **lattice formation**. Red steps absorb energy, blue steps release it.',
      v: V.bhNacl,
      n: 'This is the Born-Haber cycle. The direct route, shown by the green arrow, is the enthalpy of formation of sodium chloride. The other route goes step by step: sublimation, splitting chlorine into atoms, ionisation of sodium, electron gain by chlorine, and finally the formation of the lattice. By Hess law the two routes give the same total.',
    }),
    sl('check', 'Quick check: trend in lattice enthalpy', {
      b: 'Larger anion, longer distance between ion centres, weaker attraction.',
      n: 'Quick check. The cation is the same in all four salts, so compare the anions. Decide how the size of the halide ion changes down the group and how that affects the distance between the ions and so the strength of the attraction and the lattice enthalpy.',
      chk: 'latt-order-mcq',
    }),
    sl('example', 'Worked example: lattice enthalpy of NaCl', {
      b: r`**Problem.** Find the lattice enthalpy of NaCl from: $\Delta H_\text{f} = ${nacl.hf}$; sublimation of Na ${nacl.sub}; Cl–Cl dissociation ${nacl.bde} (per mole of Cl₂); ionisation of Na ${nacl.ie[0]}; electron gain of Cl ${nacl.ege} (all kJ mol⁻¹).

$\Delta H_\text{f} = \Delta H_\text{sub} + \tfrac12 D + \text{IE} + \text{EGE} + U$

$${nacl.hf} = ${sNa.sub} + ${sNa.diss} + ${sNa.ie} + (${sNa.ege}) + U$, so $U = ${nacl.hf} - ${bhSum(nacl)} = ${UNa}$ kJ mol⁻¹.`,
      v: table(['Step', 'Enthalpy change (kJ mol⁻¹)', 'Running total'], [['Sublimation of Na', `+${sNa.sub}`, `+${sNa.sub}`], ['½ Cl–Cl dissociation', `+${sNa.diss}`, `+${sNa.sub + sNa.diss}`], ['Ionisation of Na', `+${sNa.ie}`, `+${sNa.sub + sNa.diss + sNa.ie}`], ['Electron gain of Cl', mn(sNa.ege), `+${bhSum(nacl)}`], ['Lattice formation, U', mn(UNa), mn(nacl.hf)]], 'Table of the Born-Haber steps for NaCl with running totals'),
      n: 'Write the enthalpy of formation as the sum of all the steps. The first four steps add up to plus three hundred seventy six kilojoules. The enthalpy of formation is minus four hundred twelve, so the lattice enthalpy must be the difference, minus seven hundred eighty eight kilojoules per mole. Remember to use half of the chlorine dissociation enthalpy.',
    }),
    sl('diagram', 'A second cycle: magnesium chloride', {
      b: 'For **MgCl₂** the cycle has **two ionisation steps** (738 and 1451) and uses **two chlorine atoms**: dissociation of one mole of Cl₂ (242) and **2 × (−349)** for electron gain. The big second ionisation enthalpy is repaid by a very large lattice enthalpy.',
      v: V.bhMgcl2,
      n: 'Here is the cycle for magnesium chloride. Magnesium has two ionisation steps, and there are two chlorine atoms, so the chlorine steps are doubled. The second ionisation enthalpy is very large, but the lattice enthalpy of the doubly charged magnesium ion is so large that the solid is still very stable.',
    }),
    sl('example', 'Worked example: lattice enthalpy of MgCl₂', {
      b: r`**Problem.** For $\ce{MgCl2}$: $\Delta H_\text{f} = ${mg.hf}$; sublimation of Mg ${mg.sub}; Cl₂ dissociation ${mg.bde}; IE₁ ${mg.ie[0]}; IE₂ ${mg.ie[1]}; electron gain of Cl ${mg.ege} (kJ mol⁻¹). Find $U$.

Steps: $${sMg.sub} + ${sMg.diss} + ${mg.ie[0]} + ${mg.ie[1]} + 2(${mg.ege}) = ${bhSum(mg)}$ kJ mol⁻¹. $U = ${mg.hf} - ${bhSum(mg)} = ${UMg}$ kJ mol⁻¹ (tabulated Born–Haber values lie near −2526 because of the rounding of the data).`,
      v: table(['Step', 'Enthalpy change (kJ mol⁻¹)'], [['Sublimation of Mg', `+${sMg.sub}`], ['Dissociation of Cl₂', `+${sMg.diss}`], ['IE₁ + IE₂ of Mg', `+${sMg.ie}`], ['2 × EGE of Cl', mn(sMg.ege)], ['Sum of the steps', `+${bhSum(mg)}`], ['U = ΔHf − sum', mn(UMg)]], 'Table of the Born-Haber steps for MgCl2'),
      n: 'Add the sublimation, the dissociation of one mole of chlorine, both ionisation enthalpies and twice the electron gain enthalpy. The total is plus one thousand eight hundred eighty one kilojoules. Subtract it from the enthalpy of formation, minus six hundred forty one, to get a lattice enthalpy of about minus two thousand five hundred twenty two kilojoules per mole.',
    }),
    sl('check', 'Quick check: enthalpy of formation', {
      b: 'Add all five terms of the cycle, with the correct signs and half the dissociation enthalpy.',
      n: 'Quick check. Write all five steps of the cycle with their signs. Use half of the fluorine dissociation enthalpy because only one mole of fluorine atoms is needed, then add the lattice enthalpy. The result is the enthalpy of formation of the solid.',
      chk: 'naf-hf-num',
    }),
    sl('concept', 'Characteristics of ionic compounds', {
      b: 'Ionic solids are **hard, brittle crystals with high melting and boiling points**. They are **soluble in polar solvents** such as water, **insoluble in non-polar** solvents, and **conduct only when molten or dissolved**. All follow from a lattice of ions held by strong electrostatic forces.',
      v: table(['Property', 'Observation', 'Reason'], [['Melting point', 'high (NaCl 801 °C)', 'strong attraction between ions'], ['Hardness and brittleness', 'hard, shatter on a blow', 'like ions meet when layers slip'], ['Solubility', 'dissolve in water', 'hydration energy offsets lattice enthalpy'], ['Conductivity', 'only in melt or solution', 'ions free to move there']], 'Table of the characteristics of ionic compounds with reasons'),
      n: 'Ionic compounds are hard, brittle crystals with high melting points. They dissolve in water, because water molecules surround the ions, but not in non-polar solvents. They conduct electricity when melted or dissolved, but not as solids. All of this follows from a rigid lattice of ions held by strong electrostatic attraction.',
    }),
    sl('diagram', 'Why the melt conducts but the solid does not', {
      b: 'In the **solid** the ions sit in fixed positions, so no charge can flow. In the **melt** (and in solution) the ions are **free**: cations move to the negative electrode and anions to the positive electrode, carrying the current.',
      v: V.lattice,
      n: 'On the left is solid sodium chloride. Every ion is locked in place, so no charge can flow. On the right the salt is molten between two electrodes. Now the ions are free. Sodium ions drift to the negative electrode and chloride ions to the positive one, and this movement of ions is the current.',
    }),
    sl('summary', 'Summary: Part 2', {
      ul: [
        'Cation: smaller than its atom; anion: larger than its atom.',
        'Variable electrovalency: unstable core (Fe²⁺, Fe³⁺ with half-filled 3d⁵) and inert pair effect (Tl⁺, Sn²⁺, Pb²⁺, Bi³⁺).',
        'Lattice enthalpy: gaseous ions to one mole of solid; larger for high charge and small ions.',
        'Born–Haber cycle (Hess’s law): ΔHf = ΔHsub + ½D + IE + EGE + U.',
        'Ionic solids: high melting point, brittle, soluble in water, conduct only when molten or dissolved.',
      ],
      v: table(['Compound', 'Sum of steps before lattice', 'ΔHf', 'U'], [['NaCl', `+${bhSum(nacl)}`, mn(nacl.hf), mn(UNa)], ['KCl', `+${bhSum(kcl)}`, mn(kcl.hf), mn(bhLattice(kcl))], ['MgCl₂', `+${bhSum(mg)}`, mn(mg.hf), mn(UMg)]], 'Summary table of Born-Haber results for NaCl, KCl and MgCl2'),
      n: 'Let us sum up Part 2. Cations are smaller and anions larger than their atoms. Iron shows variable valency because of its unstable core, and tin and lead because of the inert pair effect. Lattice enthalpy is the energy released when gaseous ions form one mole of solid, and the Born-Haber cycle uses Hess law to calculate it. Ionic solids have high melting points and conduct only when molten or dissolved.',
    }),
    sl('exam-tips', 'Exam tips: Part 2', {
      ul: [
        'Use half the Cl–Cl dissociation enthalpy for one mole of Cl atoms; double the electron gain for two.',
        'Give the lattice enthalpy a negative sign when it is defined as the formation of the solid from gaseous ions.',
        'For Fe³⁺ write [Ar] 3d⁵ and say "half-filled"; for Pb²⁺ say "6s² inert pair".',
        'Explain conduction by free ions, not free electrons.',
        'Compare lattice enthalpies using charge first, then size of ions.',
      ],
      v: table(['Slip', 'Fix'], [['Using the full Cl–Cl enthalpy for NaCl', 'Take half: only one Cl atom per formula unit'], ['Saying molten NaCl conducts by electrons', 'Ions carry the current'], ['Giving a positive lattice enthalpy without comment', 'State the sign convention']], 'Table of common slips in Part 2 and their fixes'),
      n: 'Some exam tips. Use half the chlorine dissociation enthalpy when one chlorine atom is needed, and double the electron gain enthalpy when two are needed. State the sign convention for lattice enthalpy. Explain conduction by free ions, not electrons. When comparing lattice enthalpies, look at the charges first and then at the sizes of the ions.',
    }),
  ],
});
