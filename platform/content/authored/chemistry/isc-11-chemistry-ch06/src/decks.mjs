// ISC 11 Chemistry ch06 Classification of Elements and Periodicity in Properties: two decks. Part 1 (t01-t03) Mendeleev,
// modern periodic law, long form, blocks, IUPAC names above Z = 100, atomic and ionic radii; Part 2 (t04-t05) ionisation
// enthalpy, electron gain enthalpy, electronegativity, metallic character, valence, second-period anomalies, diagonal
// relationship, oxides.
import { sl, deck, table, flow, svgV, r } from './lib.mjs';
import { TABLE, RADII, ZEFF, ATOMION, ISOEL, IE_PERIOD, EGE_BARS, OXIDES, DIAGONAL } from './svgs.mjs';
import { nomen, fromName, locate, shorthand, zFrom, sym, IE1, RADIUS, IONIC, EN, EGE, IE_LI, jumpAfter, valH, valO, OXIDES3 } from './data.mjs';

const f1 = (x) => x.toFixed(1);

export const V = {
  table: svgV(TABLE, 'Long form of the periodic table with symbols, colours for the s, p, d and f blocks and the metalloids outlined', 'Eighteen groups, seven periods, four blocks.'),
  radii: svgV(RADII, 'Bar charts of atomic radius across period 3 and down group 1', 'Radius falls across a period and rises down a group.'),
  zeff: svgV(ZEFF, 'Stacked columns showing nuclear charge, ten shielding inner electrons and the effective nuclear charge across period 3', 'Effective nuclear charge rises across the period.'),
  atomion: svgV(ATOMION, 'Circles to scale for Na and Na+, Mg and Mg2+, Cl and Cl−, S and S2−', 'Cations are smaller and anions larger than their atoms.'),
  isoel: svgV(ISOEL, 'Six ions with ten electrons drawn to scale from N3− to Al3+ with nuclear charges', 'Same electrons, larger Z, smaller ion.'),
  ie: svgV(IE_PERIOD, 'Line graph of first ionisation enthalpy across periods 2 and 3 with the four dips marked', 'Dips: B < Be, O < N, Al < Mg, S < P.'),
  ege: svgV(EGE_BARS, 'Horizontal bars of electron gain enthalpy for groups 17, 16, 1 and the noble gases', 'Chlorine is the most negative; noble gases are positive.'),
  oxides: svgV(OXIDES, 'Seven boxes for the oxides of period 3 from strongly basic Na2O to very strongly acidic Cl2O7', 'Basic to amphoteric to acidic across period 3.'),
  diagonal: svgV(DIAGONAL, 'Li, Be, B, C above Na, Mg, Al, Si with diagonal lines joining Li–Mg, Be–Al and B–Si', 'Diagonal pairs have similar electronegativity.'),
};

// ---- worked-example data
const z114 = nomen(114);
const z120 = nomen(120);
const zSept = fromName('ununseptium');
const loc27 = locate(27);
const loc52 = locate(52);
const bondRows = [['Na–Cl', 'Na', 'Cl'], ['H–Cl', 'H', 'Cl'], ['C–Cl', 'C', 'Cl'], ['Cl–Cl', 'Cl', 'Cl']].map(([b, x, y]) => [b, f1(Math.abs(EN[x] - EN[y]))]);
const ordIon = ['Mg²⁺', 'Na⁺', 'F⁻', 'O²⁻'];
const liRatios = IE_LI.map((v, i) => (i ? f1(v / IE_LI[i - 1]) : '–'));

export const deck1 = deck({
  part: 1,
  title: 'Classification of Elements and Periodicity in Properties — Part 1: the table, blocks, names and sizes',
  goals: [
    'Explain Mendeleev’s periodic law, its merits and defects, and the modern periodic law',
    'Locate an element in the long form of the table from its configuration and write IUPAC names for Z > 100',
    'Explain the trends in atomic and ionic radii using nuclear charge and shielding',
  ],
  slides: [
    sl('title', 'Organising the elements', {
      b: 'Part 1: why elements are classified, how Mendeleev and Moseley arranged them, the long form of the table and the trends in size.',
      v: V.table,
      n: 'Welcome. More than a hundred elements are known, and learning each one separately would be impossible. In this part we see how classification began with Mendeleev, how the modern table is arranged by atomic number, how new elements are named, and why atoms get smaller across a period and larger down a group.',
    }),
    sl('concept', 'The need for classification; Mendeleev’s law', {
      b: 'Grouping elements with similar properties lets us **study many elements through a few patterns** and **predict** the properties of new ones. **Mendeleev (1869)**: the properties of elements are a **periodic function of their atomic masses**. He placed elements in rows (periods) and columns (groups) so that similar elements fell together.',
      v: table(['Need', 'How classification helps'], [['Too many elements to study singly', 'Learn the pattern of each group instead'], ['Unknown elements', 'Gaps in the table point to them'], ['Predicting behaviour', 'Position gives valency and type of oxide'], ['Remembering facts', 'Related elements share properties']], 'Table of the needs met by classifying elements and how a periodic table helps'),
      n: 'Classifying elements lets us learn patterns rather than facts one at a time, and lets us predict the behaviour of elements we have not yet studied. Mendeleev proposed that the properties of elements repeat periodically when they are arranged by atomic mass. He arranged them in rows and columns so that elements with similar properties came together.',
    }),
    sl('concept', 'Merits of Mendeleev’s table', {
      b: 'Mendeleev **left gaps** rather than force elements into the wrong group, and **predicted** the properties of three missing elements, later found: **gallium** (eka-aluminium), **scandium** (eka-boron) and **germanium** (eka-silicon). He also **corrected doubtful atomic masses**, and the **noble gases** later fitted in as a new group without upsetting the table.',
      v: table(['Predicted as', 'Mass predicted', 'Found as', 'Mass found', 'Oxide predicted and found'], [['Eka-aluminium', '68', 'Gallium', '69.7', 'Ea₂O₃ and Ga₂O₃'], ['Eka-silicon', '72', 'Germanium', '72.6', 'EsO₂ and GeO₂'], ['Eka-boron', '44', 'Scandium', '45.0', 'Eb₂O₃ and Sc₂O₃']], 'Table comparing Mendeleev’s predicted atomic masses and oxide formulae with the elements discovered later'),
      n: 'The great strength of Mendeleev’s table was that it left gaps for elements not yet discovered and described their properties in advance. Gallium, scandium and germanium, found later, matched his predictions closely in atomic mass and in the formulae of their oxides. He also corrected some doubtful atomic masses, and the noble gases fitted in later as a new group.',
    }),
    sl('concept', 'Defects of the table; the modern periodic law', {
      b: 'Defects: **hydrogen** has no fixed place; some elements are out of order of atomic mass (**Ar, K; Co, Ni; Te, I**); **isotopes** have no places of their own; unlike elements share a group; lanthanoids and actinoids have no proper place. **Moseley (1913)**: the **modern periodic law** says properties are a periodic function of **atomic number**.',
      v: table(['Defect of Mendeleev’s table', 'How the modern law removes it'], [['Ar before K, Co before Ni, Te before I by mass', 'Atomic number gives the order Ar, K; Co, Ni; Te, I'], ['No place for isotopes', 'Isotopes share one atomic number, so one place'], ['Position of hydrogen unclear', 'Hydrogen is Z = 1, placed first'], ['Basis was atomic mass', 'Atomic number: periodicity follows electronic configuration']], 'Table of defects of Mendeleev’s table and how the modern periodic law removes each'),
      n: 'Mendeleev’s table had defects. Hydrogen had no fixed place, a few elements were out of order of atomic mass, and isotopes had no places of their own. Moseley showed that the atomic number, not the mass, is the true basis. The modern periodic law says the properties of elements are a periodic function of atomic number, and this removes those defects.',
    }),
    sl('check', 'Quick check: Mendeleev’s predictions', {
      b: 'Decide what the discovery of gallium showed about Mendeleev’s law.',
      n: 'Quick check. Mendeleev gave an atomic mass and an oxide formula for an element that nobody had found. When gallium was discovered it matched. Think about what this agreement proves about the usefulness of a periodic law, and what it does not prove about the basis of the arrangement, then choose the statement that fits best.',
      chk: 'mend-mcq',
    }),
    sl('diagram', 'The long form of the periodic table', {
      b: 'The table has **7 periods** (rows) and **18 groups** (columns). Elements are placed by **atomic number**, so an element’s **period** is its outermost shell and its **group** follows from the valence configuration. The **s, p, d and f blocks** have **14, 36, 40 and 28** elements.',
      v: V.table,
      n: 'This is the long form of the periodic table. It has seven periods and eighteen groups. The colours show the blocks: s in blue, p in green, d in yellow and f in red. The metalloids sit along the staircase between metals and non-metals. The two f-block rows are drawn below the main table so that it does not become too wide.',
    }),
    sl('concept', 'Blocks, groups and IUPAC numbering', {
      b: 'The **block** is the subshell that receives the last electron. **s block**: groups 1, 2 (and He); **p block**: groups 13 to 18, group number $= 12 +$ outer electrons; **d block**: groups 3 to 12, group number $=$ $(n-1)d$ plus $ns$ electrons; **f block**: lanthanoids and actinoids. IUPAC numbers the groups **1 to 18**; the old labels IA–VIIA, VIII and 0 are also accepted.',
      v: table(['Block', 'Valence configuration', 'Groups (IUPAC)', 'Old labels'], [['s', 'ns¹ or ns²', '1, 2', 'IA, IIA'], ['p', 'ns² np¹ to ns² np⁶', '13 to 18', 'IIIA to VIIA, 0'], ['d', '(n−1)d¹⁻¹⁰ ns¹⁻²', '3 to 12', 'IIIB to IIB, VIII'], ['f', '(n−2)f¹⁻¹⁴ …', 'Below the table', 'Inner transition']], 'Table of the four blocks with valence configurations, IUPAC group numbers and older labels'),
      n: 'The block of an element is the type of subshell that receives its last electron. The s block is groups one and two, the p block is groups thirteen to eighteen, the d block is groups three to twelve, and the f block is placed below. IUPAC numbers the groups one to eighteen, and the older labels with Roman numerals are still accepted.',
    }),
    sl('example', 'Worked example: position from the configuration', {
      b: r`**Problem.** Locate (a) the element with configuration $[\text{Ar}]\,3d^7\,4s^2$ and (b) the element of atomic number 52.

**(a)** Last electron in $3d$: **d block**. Period = highest $n$ = 4. Group = $7 + 2 = 9$. Atomic number $= 18 + 9 = ${zFrom(4, 9)}$, ${sym(27)}: block ${loc27.block}, period ${loc27.period}, group ${loc27.group}.

**(b)** $Z = 52$: ${shorthand(52)}. Last electron in $5p$: **p block**; period 5; group $= 12 + 4 = ${loc52.group}$. The element is ${sym(52)}.`,
      v: table(['Element', 'Configuration', 'Block', 'Period', 'Group'], [[sym(27), shorthand(27), loc27.block, String(loc27.period), String(loc27.group)], [sym(52), shorthand(52), loc52.block, String(loc52.period), String(loc52.group)]], 'Table of the configuration, block, period and group of cobalt and tellurium'),
      n: 'For the first element the last electron enters three d, so it is in the d block. The highest shell is the fourth, so it is in period four. Seven plus two valence electrons make group nine, which is cobalt. For atomic number fifty two, the last electron enters five p, so it is in the p block, period five and group sixteen, which is tellurium.',
    }),
    sl('concept', 'IUPAC names for elements with Z above 100', {
      b: 'Until a name is approved, an element gets a **temporary systematic name** built from **numerical roots for each digit** of its atomic number, ending in **-ium**; the symbol is the **first letters** of the roots. Roots: **0 nil, 1 un, 2 bi, 3 tri, 4 quad, 5 pent, 6 hex, 7 sept, 8 oct, 9 enn**.',
      v: table(['Digit', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'], [['Root', 'nil', 'un', 'bi', 'tri', 'quad', 'pent', 'hex', 'sept', 'oct', 'enn'], ['Letter', 'n', 'u', 'b', 't', 'q', 'p', 'h', 's', 'o', 'e']], 'Table of the numerical roots and their symbol letters for the digits zero to nine'),
      n: 'Elements above atomic number one hundred receive a temporary name until a permanent one is approved. Each digit of the atomic number is replaced by a root: nil for zero, un for one, bi for two, tri, quad, pent, hex, sept, oct and enn for the rest. The roots are joined and the ending ium is added. The symbol uses the first letter of each root.',
    }),
    sl('example', 'Worked example: names from atomic numbers', {
      b: r`**Problem.** Write the temporary IUPAC names and symbols for $Z = 114$ and $Z = 120$, and find $Z$ for *ununseptium*.

**114:** 1, 1, 4 → un, un, quad → **${z114.name}**, symbol **${z114.sym}**.

**120:** 1, 2, 0 → un, bi, nil → **${z120.name}**, symbol **${z120.sym}**.

**ununseptium:** un, un, sept → 1, 1, 7 → $Z = ${zSept}$.`,
      v: table(['Z', 'Roots', 'Name', 'Symbol'], [['114', 'un-un-quad', z114.name, z114.sym], ['120', 'un-bi-nil', z120.name, z120.sym], [String(zSept), 'un-un-sept', 'ununseptium', nomen(zSept).sym]], 'Table of three atomic numbers with their roots, temporary names and symbols'),
      n: 'Take one hundred fourteen. The digits one, one and four give the roots un, un and quad, so the name is ununquadium and the symbol is capital U, small u, small q. For one hundred twenty the roots are un, bi and nil, giving unbinilium. Going backwards, ununseptium has roots un, un and sept, which is one, one and seven, so the atomic number is one hundred seventeen.',
    }),
    sl('check', 'Quick check: a systematic name', {
      b: 'Convert each digit of the atomic number into its root, in order.',
      n: 'Quick check. Write the atomic number digit by digit and replace each digit with its root. Join the roots in order without spaces and add the ending ium. Then take the first letter of each root, with a capital for the first, to build the three letter symbol. Be careful with the digit zero, which is nil.',
      chk: 'name-fill',
    }),
    sl('concept', 'Atomic radius and its trends', {
      b: 'Atomic radius is **half the distance between the nuclei of two bonded atoms**: **covalent radius** for non-metals, **metallic radius** for metals. **Across a period** it **decreases**; **down a group** it **increases**.',
      v: V.radii,
      n: 'The atomic radius is half the distance between the nuclei of two bonded atoms. It is called the covalent radius for non-metals and the metallic radius for metals. Across a period the radius falls steadily, from sodium to chlorine. Down a group it rises, because each new period adds an extra shell, as the group one bars show.',
    }),
    sl('concept', 'Nuclear charge, shielding and valence electrons', {
      b: 'Across a period the **nuclear charge rises** while electrons enter the **same shell**, so **shielding hardly changes** and the **effective nuclear charge** grows: the **valence electrons** (their number rises from 1 to 7 across period 3) are pulled in. Down a group the **number of valence electrons stays the same**, but extra shells add **shielding** and distance.',
      v: V.zeff,
      n: 'Two factors control size: nuclear charge and shielding. Across a period each atom has one more proton and one more valence electron in the same shell. The inner electrons shield equally, so the pull on the valence electrons grows and the atom shrinks. Down a group the valence electron number stays the same, but extra shells add shielding and distance.',
    }),
    sl('concept', 'Ionic radii: cations and anions', {
      b: 'A **cation** is **smaller** than its atom: electrons are lost, often a whole shell, and the **same nuclear charge** pulls the rest in. An **anion** is **larger**: the extra electron raises **electron–electron repulsion** while the nuclear charge is unchanged. More positive charge gives a smaller cation (Na⁺ > Mg²⁺ > Al³⁺).',
      v: V.atomion,
      n: 'When an atom loses electrons to form a cation, the remaining electrons feel the same nuclear charge with less repulsion, and often a whole shell is lost, so the cation is smaller. When an atom gains electrons to form an anion, the repulsion rises while the nuclear charge is unchanged, so the anion is larger than the atom.',
    }),
    sl('diagram', 'Isoelectronic species', {
      b: 'Species with the **same number of electrons** are **isoelectronic**. For the ten-electron set the radius **falls as the nuclear charge rises**: **N³⁻ > O²⁻ > F⁻ > Na⁺ > Mg²⁺ > Al³⁺**.',
      v: V.isoel,
      n: 'These six ions all have ten electrons, so they are isoelectronic. What differs is the number of protons. Nitride has seven and is the largest. Aluminium has thirteen and its three plus ion is the smallest. With the same electron cloud, more protons pull it in more strongly, so the radius falls as the atomic number rises.',
    }),
    sl('example', 'Worked example: ordering ionic radii', {
      b: r`**Problem.** Arrange $\ce{Mg^2+}$, $\ce{Na+}$, $\ce{F-}$ and $\ce{O^2-}$ in increasing order of radius and explain.

All four have **10 electrons**. Nuclear charges: Mg 12, Na 11, F 9, O 8. The more protons, the stronger the pull, so the radius **decreases with increasing $Z$**.

Increasing radius: ${ordIon.join(' < ')} (${ordIon.map((i) => IONIC[i]).join(', ')} pm).`,
      v: table(['Ion', 'Nuclear charge', 'Electrons', 'Radius / pm'], ordIon.map((i, j) => [i, String([12, 11, 9, 8][j]), '10', String(IONIC[i])]), 'Table of the nuclear charge, electrons and radius of Mg2+, Na+, F− and O2−'),
      n: 'All four ions have ten electrons, so the only difference is the nuclear charge. Magnesium has twelve protons and holds its electrons most tightly, so its ion is the smallest. Then come sodium, fluoride and oxide, which has the fewest protons and the largest radius. So the order of increasing radius is magnesium, sodium, fluoride, oxide.',
    }),
    sl('check', 'Quick check: why atoms shrink across a period', {
      b: 'Think about nuclear charge, the shell being filled and shielding.',
      n: 'Quick check. Compare two atoms in the same period. Ask which has the larger nuclear charge, and in which shell the new electron goes. Decide whether the new electron shields the other valence electrons much, then pick the explanation that links the rise in effective nuclear charge to the fall in radius.',
      chk: 'radius-mcq',
    }),
    sl('summary', 'Summary: Part 1', {
      ul: [
        'Mendeleev: periodic function of atomic mass; gaps and predictions (Ga, Ge, Sc). Modern law: atomic number.',
        'Long form: 7 periods, 18 groups; s, p, d, f blocks; period = highest n, group from valence electrons.',
        'Z > 100: roots nil, un, bi, tri, quad, pent, hex, sept, oct, enn + ium.',
        'Radius: falls across a period, rises down a group; cation < atom < anion; isoelectronic: radius falls as Z rises.',
      ],
      v: table(['Property', 'Across a period', 'Down a group'], [['Atomic radius', 'Decreases', 'Increases'], ['Valence electrons', 'Increase by one each element', 'Same'], ['Effective nuclear charge', 'Increases', 'Roughly constant']], 'Summary table of three properties across a period and down a group'),
      n: 'Summing up Part One. Mendeleev arranged elements by atomic mass and predicted new ones, but the modern law uses atomic number. The long form has seven periods, eighteen groups and four blocks. Elements above one hundred have systematic names built from roots. Atomic radius falls across a period and rises down a group, cations are small and anions are large.',
    }),
    sl('exam-tips', 'Exam tips: Part 1', {
      ul: [
        'State both laws: atomic mass for Mendeleev, atomic number for the modern law.',
        'Group of a d-block element: (n − 1)d electrons plus ns electrons; group of a p-block element: 12 + outer p electrons.',
        'Write systematic names digit by digit; do not skip nil for zero.',
        'Explain radius with nuclear charge and shielding, naming the shell being filled.',
        'For isoelectronic ions, compare nuclear charges, not the atomic radii of the parent atoms.',
      ],
      v: table(['Slip', 'Fix'], [['Modern law “based on atomic mass”', 'Atomic number'], ['Calling Cl⁻ smaller than Cl', 'Anions are larger than their atoms'], ['Group of Co taken as 2', '3d⁷ 4s²: 7 + 2 = group 9'], ['Skipping nil in the name of 120', 'un-bi-nil: unbinilium']], 'Table of common slips in Part 1 and how to fix them'),
      n: 'Some exam tips. Name the right basis for each law: atomic mass for Mendeleev and atomic number for the modern law. For d block elements add the d and s electrons to get the group. Write systematic names digit by digit, never leaving out nil. Explain size changes with nuclear charge and shielding, and for isoelectronic ions compare nuclear charges.',
    }),
  ],
});

// ---------------- Part 2
const ieRows = [['Be', '2s²', IE1.Be], ['B', '2s² 2p¹', IE1.B], ['N', '2s² 2p³', IE1.N], ['O', '2s² 2p⁴', IE1.O]];
const oxRows = OXIDES3.map(([e, f], i) => {
  const g = [1, 2, 13, 14, 15, 16, 17][i];
  const hyd = ['NaH', 'MgH₂', 'AlH₃', 'SiH₄', 'PH₃', 'H₂S', 'HCl'][i];
  return [e, String(g), hyd, String(valH(g)), f, `+${valO(g)}`];
});

export const deck2 = deck({
  part: 2,
  title: 'Classification of Elements and Periodicity in Properties — Part 2: energies, electronegativity, valence and oxides',
  goals: [
    'Explain the trends and irregularities in ionisation enthalpy, electron gain enthalpy and electronegativity',
    'Predict metallic character and the valence and oxidation states of elements from their position',
    'Explain the anomalous behaviour of second-period elements, the diagonal relationship and the nature of oxides',
  ],
  slides: [
    sl('title', 'Energy changes and chemical character', {
      b: 'Part 2: ionisation enthalpy, electron gain enthalpy and electronegativity, then valence, anomalies, diagonal pairs and oxides.',
      v: V.ie,
      n: 'Welcome to Part Two. Here we move from sizes to energies: how much energy it takes to remove an electron, how much is released when one is added, and how strongly an atom attracts bonding electrons. We then use these ideas to explain valence, the odd behaviour of second period elements, diagonal pairs and the nature of oxides.',
    }),
    sl('concept', 'Ionisation enthalpy and what controls it', {
      b: 'The **first ionisation enthalpy** is the energy needed to remove the most loosely held electron from **one mole of gaseous atoms**: $\\text{X(g)} \\to \\text{X}^+\\text{(g)} + e^-$, in **kJ mol⁻¹**; it is always positive. It **increases** with **nuclear charge**, **decreases** with **atomic size** and **shielding**, and is higher for **filled or half-filled** subshells.',
      v: table(['Factor', 'Effect on ionisation enthalpy'], [['Greater nuclear charge', 'Increases'], ['Larger atomic radius', 'Decreases'], ['More shielding by inner electrons', 'Decreases'], ['Electron in a more penetrating orbital (s > p > d)', 'Higher'], ['Filled or half-filled subshell', 'Higher than expected']], 'Table of five factors affecting ionisation enthalpy and their effects'),
      n: 'Ionisation enthalpy is the energy needed to remove the most loosely held electron from a mole of gaseous atoms. It is always positive. It rises with nuclear charge and falls with larger size and more shielding. An electron in an s orbital is held more strongly than one in a p orbital of the same shell, and filled or half filled subshells add stability.',
    }),
    sl('concept', 'The pattern and its irregularities', {
      b: `In general it **rises across a period** and **falls down a group**. Two **dips** appear in each period. **B < Be** (${IE1.B} < ${IE1.Be}) and **Al < Mg** (${IE1.Al} < ${IE1.Mg}): the outer electron is in a **p orbital**, higher in energy and better shielded than an s electron. **O < N** (${IE1.O} < ${IE1.N}) and **S < P** (${IE1.S} < ${IE1.P}): half-filled p³ is stable, and in p⁴ the **paired electron is removed more easily** because of repulsion.`,
      v: V.ie,
      n: 'The general trend is a rise across a period and a fall down a group, but there are two dips in each period. Boron and aluminium come below beryllium and magnesium because the outer electron is in a p orbital, which is higher in energy than s. Oxygen and sulfur come below nitrogen and phosphorus because the half filled p three arrangement is stable, and in p four the paired electron is removed more easily.',
    }),
    sl('example', 'Worked example: successive ionisation enthalpies', {
      b: r`**Problem.** The first three ionisation enthalpies of an element are ${IE_LI.join(', ')} kJ mol⁻¹ (lithium). Find the number of valence electrons and the group.

Ratios of successive values: ${liRatios.slice(1).join(' and ')}. The **huge jump** (about ${liRatios[1]} times) comes after the **${jumpAfter(IE_LI) + 1}st** removal: the second electron comes from the **stable inner shell** ($1s^2$).

So there is **${jumpAfter(IE_LI) + 1} valence electron**: group **1**.`,
      v: table(['Removal', 'Value / kJ mol⁻¹', 'Ratio to previous'], IE_LI.map((v, i) => [['1st', '2nd', '3rd'][i], String(v), liRatios[i]]), 'Table of the first three ionisation enthalpies of lithium with the ratio of each to the previous value'),
      n: 'Look at the ratios of successive values. The second ionisation enthalpy is about fourteen times the first, a huge jump, while the third is only a little larger than the second. The big jump shows that the second electron must come from a stable inner shell. So the element has just one valence electron and belongs to group one.',
    }),
    sl('check', 'Quick check: a dip in ionisation enthalpy', {
      b: 'Compare the orbitals from which the outer electrons are removed.',
      n: 'Quick check. Write the outer configurations of the two neighbouring elements. Decide whether the electron being removed comes from an s or a p orbital, and whether it comes from a half filled subshell or from a pair. Then choose the explanation that matches the orbital and the shielding.',
      chk: 'ie-mcq',
    }),
    sl('concept', 'Electron gain enthalpy', {
      b: 'The **electron gain enthalpy** is the enthalpy change when **one mole of gaseous atoms each gain an electron**: $\\text{X(g)} + e^- \\to \\text{X}^-\\text{(g)}$. It is **negative** when energy is released (halogens most negative). **Cl is more negative than F**: in the small F atom the added electron feels strong repulsion from the crowded 2p electrons. **Noble gases are positive**; the second electron gain enthalpy is always positive.',
      v: V.ege,
      n: 'Electron gain enthalpy is the enthalpy change when a gaseous atom gains an electron. It is negative when energy is released, and the halogens release the most. Chlorine releases more than fluorine, because the added electron in the small fluorine atom is repelled by the crowded second shell. Noble gases have positive values, since the added electron would go into a new shell.',
    }),
    sl('concept', 'Electronegativity', {
      b: '**Electronegativity** is the **tendency of an atom in a molecule to attract the shared electron pair** towards itself. It has **no unit** (Pauling scale: F = 4.0, the highest). It **increases across a period** and **decreases down a group**. The **difference** in electronegativity decides **bond polarity**: the larger the difference, the more ionic the bond.',
      v: table(['Element', 'H', 'Li', 'Be', 'B', 'C', 'N', 'O', 'F', 'Na', 'Cl', 'K'], [['EN', ...['H', 'Li', 'Be', 'B', 'C', 'N', 'O', 'F', 'Na', 'Cl', 'K'].map((e) => f1(EN[e]))]], 'Table of Pauling electronegativity values for selected elements'),
      n: 'Electronegativity is the tendency of an atom in a molecule to attract the shared electron pair towards itself. It has no unit. On the Pauling scale fluorine is highest at four. It rises across a period and falls down a group. The difference between the values for two bonded atoms tells us how polar the bond is, and a large difference means an ionic bond.',
    }),
    sl('example', 'Worked example: bond polarity from electronegativity', {
      b: r`**Problem.** Using Pauling values Na 0.9, H 2.1, C 2.5 and Cl 3.0, arrange the bonds Na–Cl, H–Cl, C–Cl and Cl–Cl in order of decreasing polarity.

$\Delta\text{EN}$: Na–Cl $= 3.0 - 0.9 = ${bondRows[0][1]}$; H–Cl $= 3.0 - 2.1 = ${bondRows[1][1]}$; C–Cl $= 3.0 - 2.5 = ${bondRows[2][1]}$; Cl–Cl $= ${bondRows[3][1]}$.

Order: Na–Cl (ionic) > H–Cl > C–Cl > Cl–Cl (non-polar).`,
      v: table(['Bond', 'ΔEN', 'Character'], [['Na–Cl', bondRows[0][1], 'Ionic'], ['H–Cl', bondRows[1][1], 'Polar covalent'], ['C–Cl', bondRows[2][1], 'Slightly polar'], ['Cl–Cl', bondRows[3][1], 'Non-polar']], 'Table of electronegativity differences and bond character for four bonds'),
      n: 'Subtract the electronegativities for each bond. Sodium and chlorine differ by two point one, which is so large that the bond is ionic. Hydrogen and chlorine differ by zero point nine and the bond is polar covalent. Carbon and chlorine differ by only zero point five. Two chlorine atoms have no difference, so the bond is non polar.',
    }),
    sl('check', 'Quick check: electron gain enthalpy', {
      b: 'Compare the atoms by size and by crowding of the added electron.',
      n: 'Quick check. Look at the four values and find the most negative one. Then think about why the smallest atom of the group does not give the largest release of energy. Consider the repulsion that a new electron meets when it enters a small, crowded shell, and choose the matching statement.',
      chk: 'ege-mcq',
    }),
    sl('concept', 'Metallic and non-metallic character', {
      b: '**Metallic character** is the tendency to **lose electrons** to form cations; it follows **low ionisation enthalpy and low electronegativity**. It **decreases across a period** and **increases down a group**; non-metallic character does the opposite. **Metalloids** (B, Si, Ge, As, Sb, Te) lie on the dividing staircase.',
      v: table(['Position', 'Ionisation enthalpy', 'Electronegativity', 'Character'], [['Left of a period (Na)', 'Low', 'Low', 'Strongly metallic'], ['Right of a period (Cl)', 'High', 'High', 'Strongly non-metallic'], ['Down group 14 (C → Sn)', 'Falls', 'Falls', 'Non-metal → metalloid → metal'], ['Down group 1 (Li → Cs)', 'Falls', 'Falls', 'Metallic character rises']], 'Table of metallic and non-metallic character by position with ionisation enthalpy and electronegativity'),
      n: 'Metallic character is the tendency to lose electrons and form cations. It goes with a low ionisation enthalpy and a low electronegativity. It falls across a period and rises down a group. In group fourteen, carbon is a non metal, silicon and germanium are metalloids, and tin and lead are metals. Non metallic character follows the opposite trend.',
    }),
    sl('concept', 'Valence and oxidation states', {
      b: 'The **valency** of a main-group element is set by its **valence electrons**: toward **oxygen** it equals the group number (1 to 7); toward **hydrogen** it rises to 4 and then falls ($8 -$ group). The **oxidation state** is the charge an atom would have if all bonds were ionic. **d-block** elements show **several** oxidation states because $ns$ and $(n-1)d$ electrons have similar energies.',
      v: table(['Element', 'Group', 'Hydride', 'Valency to H', 'Highest oxide', 'Oxidation state in oxide'], oxRows, 'Table of the group, hydride, valency toward hydrogen, highest oxide and oxidation state for the elements of period 3'),
      n: 'Valency shows a periodic pattern. Towards oxygen it rises from one to seven across period three, matching the group number. Towards hydrogen it rises to four at silicon and then falls to one at chlorine. Oxidation state is the charge an atom would have if all its bonds were ionic. Transition elements show several oxidation states.',
    }),
    sl('concept', 'Anomalous behaviour of second-period elements', {
      b: 'Li to F differ from the rest of their groups because of **small size**, **high electronegativity and ionisation enthalpy**, and **no d orbitals**, so the **maximum covalence is 4**. Nitrogen forms NCl₃ but not NCl₅ (phosphorus forms both). Only they form strong **pπ–pπ multiple bonds**: C=C, N≡N, O=O.',
      v: table(['Second period', 'Next member', 'Reason'], [['N: NCl₃ only', 'P: PCl₃ and PCl₅', 'No d orbitals in N; covalence limited to 4'], ['B: BF₄⁻ at most four bonds', 'Al: AlF₆³⁻', 'Al has vacant d orbitals'], ['O=O, N≡N', 'S–S, P–P single bonds', 'Small atoms overlap p orbitals sideways'], ['F: lower electron gain enthalpy than Cl', 'Cl: more negative', 'Repulsion in the small 2p shell']], 'Table of four ways in which a second-period element differs from the next member of its group'),
      n: 'The first element of each group in the second period behaves differently from the rest of its group. The reasons are small size, high electronegativity and ionisation enthalpy, and the absence of d orbitals, which limits covalence to four. Nitrogen forms nitrogen trichloride but not the pentachloride, whereas phosphorus forms both. Small atoms also form strong multiple bonds.',
    }),
    sl('concept', 'Diagonal relationship', {
      b: 'Some elements of period 2 resemble the element **diagonally below and to the right** in period 3: **Li–Mg**, **Be–Al**, **B–Si**. The pairs have similar **electronegativity, charge-to-size ratio and polarising power**. Li and Mg both form nitrides directly and have carbonates that decompose on heating; Be and Al both have amphoteric oxides.',
      v: V.diagonal,
      n: 'Going across a period, properties tend to move one way, and going down a group they move the other way, so these effects can cancel along a diagonal. Lithium resembles magnesium, beryllium resembles aluminium and boron resembles silicon. The pairs have similar electronegativity and similar charge to size ratios, so they show similar chemical behaviour.',
    }),
    sl('concept', 'Acidic and basic nature of oxides', {
      b: 'Across period 3 the oxides change from **basic** to **amphoteric** to **acidic**, as the bond to oxygen changes from **ionic** to **covalent**. **Basic** oxides react with acids; **acidic** oxides react with bases and water to give acids; an **amphoteric** oxide (Al₂O₃) reacts with both. Down a group the oxides become **more basic**.',
      v: V.oxides,
      n: 'Across period three the oxides change from strongly basic, through amphoteric aluminium oxide, to strongly acidic. The bond to oxygen changes from ionic to covalent as the electronegativity of the element rises. Basic oxides react with acids, acidic oxides react with bases and water, and an amphoteric oxide reacts with both. Down a group the oxides become more basic.',
    }),
    sl('example', 'Worked example: an amphoteric oxide', {
      b: r`**Problem.** Show with balanced equations that $\ce{Al2O3}$ is amphoteric, and give the equation for the reaction of $\ce{P4O10}$ with water.

As a **base**: $\ce{Al2O3 + 6HCl -> 2AlCl3 + 3H2O}$

As an **acid**: $\ce{Al2O3 + 2NaOH -> 2NaAlO2 + H2O}$

Acidic oxide: $\ce{P4O10 + 6H2O -> 4H3PO4}$`,
      v: table(['Oxide', 'With HCl', 'With NaOH', 'Nature'], [['Na₂O, MgO', 'Reacts', 'No reaction', 'Basic'], ['Al₂O₃', 'Reacts', 'Reacts', 'Amphoteric'], ['SiO₂, P₄O₁₀, SO₃', 'No reaction', 'Reacts', 'Acidic']], 'Table of how basic, amphoteric and acidic oxides react with hydrochloric acid and sodium hydroxide'),
      n: 'Aluminium oxide reacts with hydrochloric acid to give aluminium chloride and water, so it behaves as a base. It also reacts with sodium hydroxide to give sodium aluminate and water, so it behaves as an acid. Reacting with both makes it amphoteric. Phosphorus decaoxide, an acidic oxide, reacts with water to give phosphoric acid.',
    }),
    sl('check', 'Quick check: identifying an oxide', {
      b: 'Link the behaviour of the oxide with acids, bases and water to its type.',
      n: 'Quick check. Note what the oxide does with water, with an acid and with an alkali. A basic oxide reacts with acids, an acidic oxide reacts with alkalis and gives an acid with water, and an amphoteric oxide reacts with both. Use the behaviour described to decide the type, and then the likely element.',
      chk: 'oxide-mcq',
    }),
    sl('summary', 'Summary: Part 2', {
      ul: [
        'Ionisation enthalpy: rises across a period, falls down a group; dips B < Be, Al < Mg, O < N, S < P.',
        'Electron gain enthalpy: Cl more negative than F; noble gases positive. Electronegativity: rises across, falls down.',
        'Metallic character: falls across a period, rises down a group.',
        'Valency to oxygen = group number; second-period anomalies; diagonal pairs Li–Mg, Be–Al, B–Si.',
        'Period 3 oxides: basic → amphoteric (Al₂O₃) → acidic.',
      ],
      v: table(['Property', 'Across a period', 'Down a group'], [['Ionisation enthalpy', 'Increases (with dips)', 'Decreases'], ['Electronegativity', 'Increases', 'Decreases'], ['Metallic character', 'Decreases', 'Increases'], ['Acidity of oxides', 'Increases', 'Decreases']], 'Summary table of four properties across a period and down a group'),
      n: 'Summing up Part Two. Ionisation enthalpy and electronegativity rise across a period and fall down a group, with the dips we explained. Chlorine has the most negative electron gain enthalpy. Metallic character does the opposite. Second period elements are anomalous, diagonal pairs resemble each other, and the oxides of period three change from basic to amphoteric to acidic.',
    }),
    sl('exam-tips', 'Exam tips: Part 2', {
      ul: [
        'Explain N > O and P > S with half-filled p³, and Be > B and Mg > Al with s versus p electrons.',
        'Say “electron gain enthalpy” is negative when energy is released; Cl is more negative than F.',
        'Electronegativity has no unit; use differences to judge bond polarity.',
        'Give the reason for second-period anomalies: small size, high electronegativity, no d orbitals.',
        'Write balanced equations for oxides and name the reagents that show acidic, basic or amphoteric character.',
      ],
      v: table(['Slip', 'Fix'], [['Ionisation enthalpy of O above N', 'N is higher (half-filled 2p³)'], ['F has the most negative gain enthalpy', 'Cl does'], ['Electronegativity in kJ mol⁻¹', 'No unit'], ['Al₂O₃ called basic', 'Amphoteric']], 'Table of common slips in Part 2 and how to fix them'),
      n: 'Some exam tips. Explain the dips in ionisation enthalpy with half filled subshells and with s versus p electrons. Remember that chlorine, not fluorine, has the most negative electron gain enthalpy, and that electronegativity has no unit. Give small size, high electronegativity and no d orbitals as reasons for second period anomalies, and write balanced equations for oxides.',
    }),
  ],
});
void flow;
void RADIUS;
void EGE;
