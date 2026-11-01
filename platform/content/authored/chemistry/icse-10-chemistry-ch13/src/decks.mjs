// ICSE 10 Chemistry ch13 Organic Chemistry: Introduction, Structure, Isomerism and Nomenclature — two decks: Part 1
// (t01–t03) tetravalency, catenation, single/double/triple bonds, straight/branched/cyclic chains, benzene, structural
// formulae up to five carbons; Part 2 (t04–t06) chain and position isomers, homologous series, IUPAC and trivial names.
import { sl, deck, table, flow, svgV } from './lib.mjs';
import { CARBON, BONDS, CHAINS, BENZENE, BUTANE_ISO, PENTANE_ISO, BUTENE_POS } from './svgs.mjs';

const V = {
  carbon: svgV(CARBON, 'Methane with four carbon–hydrogen bonds beside a chain of carbon atoms linked to one another'),
  bonds: svgV(BONDS, 'Displayed formulae of ethane, ethene and ethyne showing single, double and triple carbon–carbon bonds'),
  chains: svgV(CHAINS, 'Carbon skeletons of a straight chain, a branched chain and a six-membered ring'),
  benzene: svgV(BENZENE, 'Benzene drawn with all six carbon and six hydrogen atoms, and as a shorthand hexagon'),
  butane: svgV(BUTANE_ISO, 'Butane and 2-methylpropane, the two chain isomers of formula C4H10'),
  pentane: svgV(PENTANE_ISO, 'Pentane, 2-methylbutane and 2,2-dimethylpropane, the three chain isomers of formula C5H12'),
  butene: svgV(BUTENE_POS, 'But-1-ene and but-2-ene, position isomers that differ in where the double bond sits'),
};

export const deck1 = deck({
  part: 1,
  title: 'Organic Chemistry — Part 1: Carbon, bonds and carbon chains',
  goals: [
    'Explain tetravalency and catenation and why they give carbon so many compounds',
    'Draw single, double and triple carbon–carbon bonds',
    'Classify a carbon chain as straight, branched or cyclic and draw benzene',
    'Write structural formulae of alkanes, alkenes and alkynes with up to five carbon atoms',
  ],
  slides: [
    sl('title', 'Why a whole branch for one element?', {
      b: 'Part 1 — Organic chemistry is the chemistry of **carbon compounds** (except a few simple ones such as CO₂ and carbonates). More than ten million are known: fuels, plastics, medicines, foods and the molecules of living cells. Two properties of the carbon atom explain this huge number.',
      v: V.carbon,
      n: 'Namaste! Organic chemistry is the study of carbon compounds. Millions of them are known, from the gas in a kitchen cylinder to the proteins in your body. No other element comes close. In this part we find out why carbon is so special, how carbon atoms join to one another, and how to draw the structures of simple hydrocarbons.',
    }),
    sl('concept', 'Tetravalency', {
      b: 'Carbon (atomic number 6) has the configuration **2, 4**. To reach an octet it would have to lose or gain four electrons, which needs too much energy, so it **shares** its four valence electrons. Carbon therefore forms **four covalent bonds**: it is **tetravalent**. In methane, CH₄, the four bonds point to the corners of a regular **tetrahedron**.',
      v: table(['Atom', 'Configuration', 'Electrons shared to complete the shell', 'Bonds formed'], [['Carbon', '2, 4', '4', '4'], ['Nitrogen', '2, 5', '3', '3'], ['Oxygen', '2, 6', '2', '2'], ['Hydrogen', '1', '1 (duplet)', '1']], 'Table of carbon, nitrogen, oxygen and hydrogen with their configurations and the number of covalent bonds each forms'),
      n: 'Carbon has six electrons, arranged two and four. Losing or gaining four electrons would take far too much energy, so carbon shares its four outer electrons instead. That is why it always forms four covalent bonds, a property called tetravalency. Compare nitrogen, which forms three bonds, oxygen, which forms two, and hydrogen, which forms just one.',
    }),
    sl('concept', 'Catenation', {
      b: '**Catenation** is the ability of atoms of an element to **link with one another** by covalent bonds to form **long chains, branched chains and rings**. Carbon shows it far more than any other element, because carbon atoms are **small** and the **C–C bond is strong**. With four bonds per atom, every carbon in a chain still has bonds left over for hydrogen or other atoms.',
      v: table(['Compound', 'Carbon atoms linked', 'Where you meet it'], [['Methane', '1', 'Biogas, CNG'], ['Propane and butane', '3 and 4', 'LPG cylinders'], ['Octane', '8', 'Petrol'], ['Paraffin wax', 'about 20 to 30', 'Candles']], 'Table of carbon compounds with chains of increasing length and where they are found'),
      n: 'Catenation means atoms of the same element joining to one another in chains and rings. Carbon atoms are small and the bond between two carbon atoms is strong, so carbon can build chains of almost any length. Methane has one carbon atom, the gases in a cooking cylinder have three or four, petrol contains chains of about eight, and candle wax has chains of twenty or more.',
    }),
    sl('check', 'Quick check: tetravalency', {
      b: 'Explain why carbon forms four covalent bonds.',
      n: 'Quick check. Think about how many electrons carbon has in its outer shell, and whether it loses, gains or shares them. Then ask yourself how much energy it would take to move four whole electrons, and choose your answer.',
      chk: 'tetra-mcq',
    }),
    sl('concept', 'Single, double and triple bonds', {
      b: 'Two carbon atoms can share **one, two or three pairs** of electrons:\n\n- **single bond** C–C (one pair), as in ethane, C₂H₆;\n- **double bond** C=C (two pairs), as in ethene, C₂H₄;\n- **triple bond** C≡C (three pairs), as in ethyne, C₂H₂.\n\nIn every case each carbon still makes **four bonds in total**: a double bond counts as two and a triple bond as three.',
      v: V.bonds,
      n: 'Two carbon atoms may share one, two or three pairs of electrons. One shared pair is a single bond, as in ethane. Two pairs make a double bond, as in ethene, and three pairs make a triple bond, as in ethyne. Count the bonds around any carbon atom in these molecules and you always get four, because a double bond counts as two and a triple bond as three.',
    }),
    sl('example', 'Worked example: counting bonds in propyne', {
      b: '**Problem.** Propyne has the structure H–C≡C–CH₃. Find (a) the number of C–H bonds, (b) the number of shared pairs between carbon atoms and (c) the total number of shared pairs. Check that each carbon has four bonds.\n\n**Step 1.** C–H bonds: 1 on the first carbon + 3 on the last = **4**.\n\n**Step 2.** C≡C has 3 pairs and C–C has 1 pair: **4 pairs** between carbons.\n\n**Step 3.** Total shared pairs: $4 + 4 = 8$.\n\n**Check.** First C: 1 + 3 = 4; middle C: 3 + 1 = 4; last C: 1 + 3 = 4.',
      v: table(['Carbon atom', 'Bonds to H', 'Bonds to C', 'Total'], [['C1 (H–C≡)', '1', '3', '4'], ['C2 (≡C–)', '0', '3 + 1', '4'], ['C3 (–CH₃)', '3', '1', '4']], 'Table counting the bonds on each of the three carbon atoms of propyne, each totalling four'),
      n: 'Start with the bonds to hydrogen: the first carbon has one and the methyl group at the end has three, making four. Between the carbon atoms there is a triple bond, which is three shared pairs, and a single bond, which is one more. So there are eight shared pairs in all. Finally check each carbon: every one of them has exactly four bonds.',
    }),
    sl('concept', 'Saturated and unsaturated hydrocarbons', {
      b: '**Hydrocarbons** contain only carbon and hydrogen. **Saturated** hydrocarbons (alkanes) have **only single bonds** between carbon atoms. **Unsaturated** hydrocarbons have at least one **double** (alkenes) or **triple** (alkynes) bond. Each family has its own **general formula** ($n$ = number of carbon atoms):',
      v: table(['Family', 'Bond present', 'General formula', 'First member'], [['Alkanes', 'C–C only', 'CₙH₂ₙ₊₂', 'Methane, CH₄'], ['Alkenes', 'one C=C', 'CₙH₂ₙ', 'Ethene, C₂H₄'], ['Alkynes', 'one C≡C', 'CₙH₂ₙ₋₂', 'Ethyne, C₂H₂']], 'Table of alkanes, alkenes and alkynes with the bond present, general formula and first member'),
      n: 'Hydrocarbons are compounds of carbon and hydrogen only. If every carbon to carbon bond is single, the hydrocarbon is saturated and belongs to the alkanes. If there is a double bond it is an alkene, and if there is a triple bond it is an alkyne; both are unsaturated. Each family has a general formula, so you can write any member once you know its number of carbon atoms.',
    }),
    sl('concept', 'Straight, branched and closed chains', {
      b: 'Carbon atoms can be arranged in three ways:\n\n- **Straight chain** (open chain, unbranched): every carbon is joined to at most two others in a row — pentane, CH₃CH₂CH₂CH₂CH₃.\n- **Branched chain**: a side chain is attached to the main chain — 2-methylbutane, CH₃CH(CH₃)CH₂CH₃.\n- **Closed chain (cyclic)**: the carbon atoms form a **ring** — benzene, C₆H₆.',
      v: V.chains,
      n: 'Carbon atoms can line up in a single row, which we call a straight chain. A chain can also carry a side branch, giving a branched chain. Or the ends of a chain can join to make a ring, which is a closed or cyclic chain. In this course the only ring compound you need is benzene, with six carbon atoms in its ring.',
    }),
    sl('check', 'Quick check: types of chain', {
      b: 'Classify a carbon chain from its condensed formula.',
      n: 'Quick check. Look along the chain for a carbon atom joined to three other carbon atoms. If you find one, the chain has a side branch. If every carbon has at most two carbon neighbours, the chain is straight.',
      chk: 'branch-mcq',
    }),
    sl('concept', 'The structure of benzene', {
      b: '**Benzene**, C₆H₆, is a **cyclic** hydrocarbon. Its six carbon atoms form a flat **hexagonal ring** joined by **alternate single and double bonds**, and each carbon carries **one hydrogen atom**. Each carbon makes four bonds: one to H, one single bond and one double bond to its two carbon neighbours. Books often draw just the hexagon; every corner is a CH group.',
      v: V.benzene,
      n: 'Benzene has six carbon atoms arranged in a flat ring shaped like a hexagon. Single and double bonds alternate around the ring, and every carbon atom carries one hydrogen atom. Check any carbon and you will find four bonds: one to hydrogen, a single bond to one neighbour and a double bond to the other. The shorthand hexagon means exactly the same thing.',
    }),
    sl('concept', 'Structural formulae up to five carbons', {
      b: 'A **molecular formula** gives only the number of atoms (C₄H₁₀). A **structural formula** shows how they are joined. The **condensed** form writes each carbon with its hydrogens: CH₃–CH₂–CH₂–CH₃. Write the carbon chain first, put in the multiple bond, then add hydrogens so that **every carbon has four bonds**.',
      v: table(['Carbon atoms', 'Alkane', 'Alkene (double bond at C1)', 'Alkyne (triple bond at C1)'], [['2', 'CH₃–CH₃', 'CH₂=CH₂', 'CH≡CH'], ['3', 'CH₃–CH₂–CH₃', 'CH₂=CH–CH₃', 'CH≡C–CH₃'], ['4', 'CH₃–(CH₂)₂–CH₃', 'CH₂=CH–CH₂–CH₃', 'CH≡C–CH₂–CH₃'], ['5', 'CH₃–(CH₂)₃–CH₃', 'CH₂=CH–(CH₂)₂–CH₃', 'CH≡C–(CH₂)₂–CH₃']], 'Table of condensed structural formulae of straight-chain alkanes, alkenes and alkynes with two to five carbon atoms'),
      n: 'A molecular formula only counts the atoms. A structural formula shows how they are linked. To write one, draw the carbon chain first, put in the double or triple bond where it belongs, and then add hydrogen atoms until every carbon has four bonds. The table shows straight chains of two to five carbon atoms for each family.',
    }),
    sl('example', 'Worked example: five carbons, three families', {
      b: '**Problem.** Write the condensed structural formula and the molecular formula of a straight chain of five carbon atoms with (a) only single bonds, (b) a double bond between C1 and C2, (c) a triple bond between C2 and C3.\n\n**(a)** CH₃–CH₂–CH₂–CH₂–CH₃, **C₅H₁₂** (pentane).\n\n**(b)** CH₂=CH–CH₂–CH₂–CH₃, **C₅H₁₀** (pent-1-ene).\n\n**(c)** CH₃–C≡C–CH₂–CH₃, **C₅H₈** (pent-2-yne).\n\nEach multiple bond removes **two** hydrogen atoms.',
      v: table(['Part', 'Hydrogen count', 'Formula', 'Matches'], [['(a)', '3 + 2 + 2 + 2 + 3 = 12', 'C₅H₁₂', 'CₙH₂ₙ₊₂'], ['(b)', '2 + 1 + 2 + 2 + 3 = 10', 'C₅H₁₀', 'CₙH₂ₙ'], ['(c)', '3 + 0 + 0 + 2 + 3 = 8', 'C₅H₈', 'CₙH₂ₙ₋₂']], 'Table counting the hydrogen atoms for the three five-carbon structures and matching each to its general formula'),
      n: 'Draw five carbon atoms in a row each time. With only single bonds, each end carbon takes three hydrogens and each middle carbon two, giving twelve. A double bond at the start leaves the first two carbons with fewer hydrogens, giving ten. A triple bond in the second position takes away two more, giving eight. Each formula fits its family general formula.',
    }),
    sl('check', 'Quick check: molecular formulae', {
      b: 'Work out the molecular formula of a hydrocarbon from its description.',
      n: 'Quick check. First decide which family the hydrocarbon belongs to from the kind of bond it contains. Then use the general formula of that family, or count the hydrogen atoms carbon by carbon, to find the answer.',
      chk: 'formula-mcq',
    }),
    sl('summary', 'Summary: Part 1', {
      ul: [
        'Carbon (2, 4) shares four electrons: it is tetravalent.',
        'Catenation: carbon atoms link into chains, branches and rings.',
        'Single (one pair), double (two pairs) and triple (three pairs) C–C bonds; every carbon makes four bonds.',
        'Chains are straight, branched or closed (cyclic); benzene is a ring of six CH groups with alternate double bonds.',
        'Alkanes CₙH₂ₙ₊₂, alkenes CₙH₂ₙ, alkynes CₙH₂ₙ₋₂.',
      ],
      v: table(['Idea', 'Key point'], [['Tetravalency', 'Four covalent bonds per carbon'], ['Catenation', 'Self-linking into chains and rings'], ['Saturated', 'Only C–C single bonds'], ['Unsaturated', 'At least one C=C or C≡C']], 'Summary table of tetravalency, catenation, saturated and unsaturated'),
      n: 'Let us sum up Part 1. Carbon shares its four outer electrons and so forms four bonds. Its atoms link to one another in chains, branches and rings. Carbon atoms can share one, two or three pairs of electrons, giving single, double and triple bonds. Alkanes, alkenes and alkynes each follow their own general formula, and benzene is a ring of six carbon atoms.',
    }),
    sl('exam-tips', 'Exam tips: Part 1', {
      ul: [
        'In a structural formula, count four bonds round every carbon before you move on.',
        'A double bond counts as two bonds and a triple bond as three.',
        'Draw benzene with six C and six H and alternate double bonds.',
        'Carbon forms covalent bonds because losing or gaining four electrons needs too much energy.',
      ],
      v: table(['Slip', 'Fix'], [['CH₂=CH₂–CH₃ (five bonds on C2)', 'CH₂=CH–CH₃'], ['Benzene with C₆H₁₂', 'Benzene is C₆H₆'], ['Catenation = four bonds', 'Catenation = self-linking; four bonds = tetravalency']], 'Table of three common slips in Part 1 and their fixes'),
      n: 'Some tips. After drawing any structure, count the bonds around each carbon and make sure there are exactly four. Remember that a double bond counts as two and a triple bond as three. Draw benzene with six carbons, six hydrogens and alternate double bonds. And keep the two words apart: tetravalency is four bonds, catenation is self-linking.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Organic Chemistry — Part 2: Isomers, homologous series and names',
  goals: [
    'Draw the chain isomers of butane and pentane and the position isomers of butene',
    'Decide whether two structures are chain isomers, position isomers or the same compound',
    'List the characteristics of a homologous series and predict the next member',
    'Name compounds with one functional group by the IUPAC rules and draw a structure from its name',
  ],
  slides: [
    sl('title', 'Same atoms, different molecules', {
      b: 'Part 2 — Butane and 2-methylpropane are both C₄H₁₀, yet they boil at different temperatures. Compounds with the **same molecular formula** but **different structures** are called **isomers**. We also meet families of compounds and the rules for naming them.',
      v: V.butane,
      n: 'Here are two gases with exactly the same formula, four carbon atoms and ten hydrogen atoms. One is a straight chain and the other is branched, and they have different boiling points. Such compounds are called isomers. In this part we learn to spot isomers, to group compounds into families, and to give every compound a clear name.',
    }),
    sl('concept', 'Structural isomerism: chain isomers', {
      b: '**Structural isomerism**: compounds with the **same molecular formula** but **different structural formulae**. In **chain isomerism**, the isomers differ in the **carbon skeleton** (straight or branched). C₄H₁₀ has **two** chain isomers; C₅H₁₂ has **three**: pentane, 2-methylbutane and 2,2-dimethylpropane. Isomers have the same molecular mass but different physical properties; more branching gives a lower boiling point.',
      v: V.pentane,
      n: 'Structural isomers share a molecular formula but have different structures. When the difference lies in the carbon skeleton, they are chain isomers. With four carbon atoms there are two possible skeletons. With five carbon atoms there are three: a straight chain, a chain with one branch, and a central carbon carrying four methyl groups. The more branched the molecule, the lower its boiling point.',
    }),
    sl('check', 'Quick check: chain isomers', {
      b: 'Identify the kind of isomerism shown by two alkanes.',
      n: 'Quick check. Both compounds have the same molecular formula, so they are isomers. Now compare the carbon skeletons. Is the difference in the chain itself, or only in the position of a group on the same chain?',
      chk: 'chain-mcq',
    }),
    sl('concept', 'Position isomers', {
      b: 'In **position isomerism**, the carbon chain is the **same**, but the **double or triple bond** or the **functional group** sits at a **different position**:\n\n- but-1-ene CH₂=CH–CH₂–CH₃ and but-2-ene CH₃–CH=CH–CH₃ (C₄H₈);\n- but-1-yne and but-2-yne (C₄H₆);\n- propan-1-ol and propan-2-ol (C₃H₈O).\n\nPropene and propyne have **no** position isomers: moving the bond to the other end gives the same molecule.',
      v: V.butene,
      n: 'Position isomers keep the same carbon chain but move the double bond, the triple bond or the functional group to a different carbon. With four carbon atoms in a row, the double bond can start at carbon one or carbon two, giving but one ene and but two ene. Propene has no position isomer, because a double bond at either end of a three carbon chain is the same molecule turned round.',
    }),
    sl('example', 'Worked example: isomers or the same compound?', {
      b: '**Problem.** Say whether each pair are chain isomers, position isomers or the same compound.\n\n**(a)** CH₃–CH(CH₃)–CH₂–CH₃ and CH₃–CH₂–CH(CH₃)–CH₃\n\n**(b)** CH₃–CH₂–CH₂–CH₂–CH₃ and CH₃–C(CH₃)₂–CH₃\n\n**(c)** CH₃–CH₂–CH₂–Cl and CH₃–CHCl–CH₃\n\n**Answer.** (a) **Same compound** (2-methylbutane, numbered from opposite ends). (b) **Chain isomers** (both C₅H₁₂). (c) **Position isomers** (1-chloropropane and 2-chloropropane).',
      v: table(['Pair', 'Same formula?', 'Same chain?', 'Verdict'], [['(a)', 'Yes, C₅H₁₂', 'Yes, branch on C2 either way', 'Same compound'], ['(b)', 'Yes, C₅H₁₂', 'No', 'Chain isomers'], ['(c)', 'Yes, C₃H₇Cl', 'Yes, Cl moved', 'Position isomers']], 'Decision table for three pairs of structures: same compound, chain isomers and position isomers'),
      n: 'First check the molecular formula; if it differs, they are not isomers at all. In the first pair, the branch is on the second carbon whichever end you count from, so it is one compound written two ways. In the second pair the skeletons differ, so they are chain isomers. In the third, the chain is the same but the chlorine has moved, so they are position isomers.',
    }),
    sl('concept', 'Homologous series', {
      b: 'A **homologous series** is a family of organic compounds with the **same functional group** and the **same general formula**, in which successive members differ by a **CH₂** group (**14 u**). Members have **similar chemical properties** and show a **gradual change (gradation) in physical properties**: melting point, boiling point and density rise with molecular mass. They can be prepared by **similar methods**.',
      v: table(['Alkane', 'Formula', 'Molecular mass / u', 'Boiling point / °C', 'State at 25 °C'], [['Methane', 'CH₄', '16', '−162', 'Gas'], ['Ethane', 'C₂H₆', '30', '−89', 'Gas'], ['Propane', 'C₃H₈', '44', '−42', 'Gas'], ['Butane', 'C₄H₁₀', '58', '−1', 'Gas'], ['Pentane', 'C₅H₁₂', '72', '36', 'Liquid']], 'Table of the first five alkanes with formula, molecular mass, boiling point and state, showing masses rising by fourteen and boiling points rising'),
      n: 'A homologous series is a family of compounds with the same functional group and the same general formula. Each member has one more carbon and two more hydrogen atoms than the one before, so the molecular mass goes up by fourteen each time. Their chemical reactions are alike, while boiling points rise steadily. Notice how the first four alkanes are gases but pentane is a liquid.',
    }),
    sl('check', 'Quick check: the next member', {
      b: 'Predict the next member of a homologous series.',
      n: 'Quick check. Each member of a homologous series has one more carbon atom and two more hydrogen atoms than the member before it. Add these to the formula you are given, and check the result against the general formula.',
      chk: 'homolog-mcq',
    }),
    sl('concept', 'Functional groups', {
      b: 'A **functional group** is an atom or group of atoms that decides the **characteristic chemical properties** of a compound. Each has its own ending (suffix) or beginning (prefix) in the IUPAC name.',
      v: table(['Class', 'Functional group', 'Name ending or prefix', 'Example'], [['Alkyl halide', '–X (Cl, Br, I)', 'chloro-, bromo-, iodo-', 'CH₃Cl chloromethane'], ['Alkene', 'C=C', '-ene', 'CH₂=CH–CH₃ propene'], ['Alkyne', 'C≡C', '-yne', 'CH≡CH ethyne'], ['Alcohol', '–OH', '-ol', 'CH₃OH methanol'], ['Aldehyde', '–CHO', '-al', 'CH₃CHO ethanal'], ['Ketone', '>C=O', '-one', 'CH₃COCH₃ propanone'], ['Carboxylic acid', '–COOH', '-oic acid', 'HCOOH methanoic acid'], ['Ether', '–O–', 'alkoxy- + alkane', 'CH₃OCH₃ methoxymethane'], ['Ester', '–COO–', 'alkyl alkanoate', 'CH₃COOCH₃ methyl ethanoate']], 'Table of nine classes of organic compounds with functional group, naming ending or prefix and an example'),
      n: 'A functional group is the part of a molecule that decides how it reacts. The hydroxyl group makes an alcohol, the aldehyde group an aldehyde, the carbonyl group inside a chain a ketone, and the carboxyl group a carboxylic acid. Halogens, ethers and esters have groups of their own. Every group has its own ending or prefix in the systematic name, so the name tells you the family.',
    }),
    sl('concept', 'IUPAC naming: the four steps', {
      b: '1. **Word root** from the longest chain containing the functional group: meth (1), eth (2), prop (3), but (4), pent (5).\n2. **Number** the chain from the end **nearer the functional group** (or multiple bond, or branch) so it gets the **lowest number**.\n3. **Primary suffix**: -ane, -ene or -yne for the bonds in the chain.\n4. **Secondary suffix** or **prefix** for the group, with its number: butan-2-ol, 2-chloropropane, 2-methylbutane.',
      v: flow('TB', [['a', 'Longest chain with the group → word root'], ['b', 'Number from the end nearer the group'], ['c', 'Add -ane, -ene or -yne'], ['d', 'Add the group ending or prefix with its number']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Flow of the four steps of IUPAC naming: word root, numbering, primary suffix, then group ending or prefix'),
      n: 'Naming follows four steps. Find the longest carbon chain that contains the functional group; its length gives the word root, from meth for one carbon to pent for five. Number the chain from the end nearer the group so that it gets the lowest number. Add the ending for the bonds in the chain. Finally add the ending or prefix for the group, with its number.',
    }),
    sl('example', 'Worked example: naming from a structure', {
      b: '**Problem.** Name (a) CH₃–CH₂–CH(OH)–CH₃, (b) CH₂=CH–CH₂–CH₂–CH₃, (c) CH₃–CH₂–CO–CH₃, (d) CH₃–CH₂–CH₂–COOH.\n\n**(a)** 4 carbons; number from the right so OH is on C2: **butan-2-ol**.\n\n**(b)** 5 carbons, C=C from C1: **pent-1-ene**.\n\n**(c)** 4 carbons, C=O on C2: **butan-2-one** (butanone).\n\n**(d)** 4 carbons, the –COOH carbon is C1: **butanoic acid**.',
      v: table(['Structure', 'Root', 'Group and number', 'Name'], [['CH₃CH₂CH(OH)CH₃', 'but', '–OH on C2', 'Butan-2-ol'], ['CH₂=CHCH₂CH₂CH₃', 'pent', 'C=C at C1', 'Pent-1-ene'], ['CH₃CH₂COCH₃', 'but', 'C=O at C2', 'Butan-2-one'], ['CH₃CH₂CH₂COOH', 'but', '–COOH carbon is C1', 'Butanoic acid']], 'Table naming four compounds by root, group position and full IUPAC name'),
      n: 'In the first compound the chain has four carbons and the hydroxyl group is on the second carbon from the right, so it is butan two ol. The second has five carbons with the double bond starting at carbon one: pent one ene. The third is a four carbon ketone: butan two one. In the acid, the carbon of the carboxyl group is always carbon one, so no number is needed.',
    }),
    sl('example', 'Worked example: from name to structure', {
      b: '**Problem.** Draw condensed structures for (a) 2-bromopropane, (b) pentan-3-one, (c) methoxyethane, (d) ethyl methanoate.\n\n**(a)** CH₃–CHBr–CH₃\n\n**(b)** CH₃–CH₂–CO–CH₂–CH₃\n\n**(c)** CH₃–O–CH₂–CH₃\n\n**(d)** HCOO–CH₂–CH₃\n\n**Method.** Write the chain from the root, number it, place the group at the stated carbon, then fill in hydrogens to give each carbon four bonds.',
      v: table(['Name', 'Read it as', 'Structure'], [['2-bromopropane', '3 carbons, Br on C2', 'CH₃–CHBr–CH₃'], ['Pentan-3-one', '5 carbons, C=O on C3', 'CH₃CH₂COCH₂CH₃'], ['Methoxyethane', 'CH₃O– on an ethane chain', 'CH₃–O–CH₂CH₃'], ['Ethyl methanoate', 'ethyl group + methanoate (HCOO–)', 'HCOOCH₂CH₃']], 'Table turning four IUPAC names into condensed structures'),
      n: 'Read each name from the back. Propane means three carbons, and two bromo puts a bromine atom on the middle one. Pentan three one is a five carbon chain with the carbonyl group on the third carbon. Methoxyethane is a methoxy group joined through oxygen to an ethane chain. In ethyl methanoate, the acid part has one carbon and the ethyl group sits on the oxygen.',
    }),
    sl('concept', 'Trivial and IUPAC names', {
      b: 'Many compounds were named long before the IUPAC system. These **trivial (common) names** are still used, so learn both.',
      v: table(['Formula', 'Trivial name', 'IUPAC name'], [['CH₃OH', 'Methyl alcohol', 'Methanol'], ['C₂H₅OH', 'Ethyl alcohol', 'Ethanol'], ['HCHO', 'Formaldehyde', 'Methanal'], ['CH₃CHO', 'Acetaldehyde', 'Ethanal'], ['CH₃COCH₃', 'Acetone (dimethyl ketone)', 'Propanone'], ['HCOOH', 'Formic acid', 'Methanoic acid'], ['CH₃COOH', 'Acetic acid', 'Ethanoic acid'], ['C₂H₄ and C₂H₂', 'Ethylene and acetylene', 'Ethene and ethyne'], ['CH₃COOC₂H₅', 'Ethyl acetate', 'Ethyl ethanoate']], 'Table of nine common organic compounds with formula, trivial name and IUPAC name'),
      n: 'Many organic compounds had everyday names long before the modern rules. Ethyl alcohol is ethanol, acetic acid is ethanoic acid, formaldehyde is methanal and acetone is propanone. Ethylene and acetylene are the old names of ethene and ethyne. Exam questions use both kinds of name, so learn them in pairs.',
    }),
    sl('check', 'Quick check: IUPAC names', {
      b: 'Name a compound from its condensed formula.',
      n: 'Quick check. Count all the carbon atoms in the chain, including the carbon of the functional group itself. That gives the word root. Then identify the functional group and pick the ending that belongs to it.',
      chk: 'name1-mcq',
    }),
    sl('summary', 'Summary: Part 2', {
      ul: [
        'Isomers: same molecular formula, different structures.',
        'Chain isomers differ in the carbon skeleton (C₄H₁₀: 2; C₅H₁₂: 3); position isomers differ in where the bond or group sits.',
        'Homologous series: same functional group and general formula, differ by CH₂ (14 u), similar chemistry, graded physical properties.',
        'IUPAC name = position + prefix + word root + primary suffix + secondary suffix.',
        'Know the trivial names: ethyl alcohol, acetic acid, formaldehyde, acetone, ethylene, acetylene.',
      ],
      v: table(['Pair', 'Relationship'], [['Butane, 2-methylpropane', 'Chain isomers'], ['But-1-ene, but-2-ene', 'Position isomers'], ['Ethanol, propan-1-ol', 'Homologues']], 'Summary table of chain isomers, position isomers and homologues'),
      n: 'Let us sum up Part 2. Isomers have the same formula but different structures. Chain isomers differ in their skeleton, and position isomers differ in where the bond or group is placed. A homologous series is a family that differs by one carbon and two hydrogens at a time. IUPAC names are built from a root, endings and numbers, and you should know the common names too.',
    }),
    sl('exam-tips', 'Exam tips: Part 2', {
      ul: [
        'Before calling two structures isomers, check they are not the same molecule drawn from the other end.',
        'Number the chain to give the functional group, then the multiple bond, then the branch, the lowest number.',
        'Aldehyde and acid carbons are always C1, so butanal and butanoic acid need no number.',
        'Older books write 1-butene or 2-propanol; the current style is but-1-ene and propan-2-ol.',
      ],
      v: table(['Slip', 'Fix'], [['3-methylbutane', '2-methylbutane (lowest number)'], ['Propan-2-al', 'Not possible: an aldehyde is always at C1'], ['Ethoxymethane for CH₃OCH₂CH₃', 'Methoxyethane (larger group is the parent chain)']], 'Table of three common naming slips and their fixes'),
      n: 'Final tips. Two structures that look different may be the same molecule turned round, so always number both ways before you decide. Give the lowest number to the functional group first. Aldehyde and carboxylic acid groups are always on carbon one, so they need no number. You may see older names like one butene; the modern form puts the number just before the ending.',
    }),
  ],
});
