// ch08 Organic Chemistry: Some Basic Principles and Techniques — two decks.
// Part 1 (t01–t03): tetravalence and hybridisation, structural representations, classification, IUPAC nomenclature, isomerism.
// Part 2 (t04–t05): bond fission, intermediates, electronic displacements, reaction types, purification, qualitative and quantitative analysis.
import { sl, deck, table, flow, svgV, r, dec, sci, near } from './lib.mjs';
import { SHAPES, BONDLINE, C5ISOMERS, STEREO, FISSION, CATIONS, INDUCTIVE, RESONANCE, DISTILL, TLC, NFLOWS } from './svgs.mjs';

const assert = (ok, msg) => {
  if (!ok) throw new Error(`deck check failed: ${msg}`);
};

export const V = {
  shapes: svgV(SHAPES, 'Shapes at carbon: methane drawn with wedge and dash bonds at 109.5 degrees, planar ethene at 120 degrees and linear ethyne at 180 degrees, with bond lengths', 'Wedge-dash drawing of methane; C–C 154 pm, C=C 134 pm, C≡C 120 pm.'),
  bondline: svgV(BONDLINE, 'Bond-line structures of 2-methylbutane, but-2-ene, cyclohexanol and ethanoic acid with their condensed and molecular formulas'),
  c5: svgV(C5ISOMERS, 'Bond-line structures of the three chain isomers of C5H12 with their boiling points of 309, 301 and 283 kelvin', 'Boiling points fall as branching increases.'),
  stereo: svgV(STEREO, 'Cis and trans but-2-ene as geometrical isomers, and the two mirror-image forms of lactic acid as optical isomers drawn with wedge and dash bonds'),
  fission: svgV(FISSION, 'Homolytic fission of chlorine with two fish-hook arrows and heterolytic fission of tert-butyl bromide with one full-headed curved arrow'),
  cations: svgV(CATIONS, 'Bar chart of carbocation stability: zero, three, six and nine alpha hydrogens for methyl, primary, secondary and tertiary carbocations'),
  ind: svgV(INDUCTIVE, 'Inductive effect of chlorine along 1-chlorobutane with arrows that get thinner away from chlorine'),
  res: svgV(RESONANCE, 'Resonance structures and hybrid of the ethanoate ion and of benzene'),
  dist: svgV(DISTILL, 'Simple distillation apparatus with flask, thermometer, Liebig condenser and receiver'),
  tlc: svgV(TLC, 'TLC plate with solvent front and two spots whose Rf values are computed as 0.40 and 0.70', 'Data given for illustration.'),
  nflows: svgV(NFLOWS, 'Flow charts for the Kjeldahl and Dumas methods of estimating nitrogen'),
};

// ---- numbers used in worked examples (computed here, asserted, interpolated)
const Mr = { C: 12, H: 1, O: 16, N: 14, CO2: 44, H2O: 18 };
const bl = { bonds: [1, 3, 2, 1, 1] }; // 2-methylbutane carbons: number of C–C bonds on each carbon
bl.H = bl.bonds.map((b) => 4 - b);
bl.Hsum = bl.H.reduce((a, b) => a + b, 0);
assert(bl.Hsum === 12 && bl.bonds.length === 5, 'bond-line count');
const iso = { alcohols: ['butan-1-ol', 'butan-2-ol', '2-methylpropan-1-ol', '2-methylpropan-2-ol'], ethers: ['methoxypropane', 'ethoxyethane', '2-methoxypropane'] };
assert(iso.alcohols.length + iso.ethers.length === 7, 'C4H10O isomers');
const rf = { front: 8.0, a: 3.2, b: 5.6 };
rf.Ra = rf.a / rf.front;
rf.Rb = rf.b / rf.front;
assert(near(rf.Ra, 0.4, 1e-9) && near(rf.Rb, 0.7, 1e-9), 'Rf');
const lb = { m: 0.3, co2: 0.66, h2o: 0.36 };
lb.C = ((Mr.C / Mr.CO2) * lb.co2 / lb.m) * 100;
lb.H = ((2 / Mr.H2O) * lb.h2o / lb.m) * 100;
lb.O = 100 - lb.C - lb.H;
lb.nC = lb.C / 12;
lb.nH = lb.H / 1;
lb.nO = lb.O / 16;
assert(near(lb.C, 60.0, 1e-4) && near(lb.H, 13.333, 1e-4) && near(lb.O, 26.667, 1e-4), 'Liebig');
assert(near(lb.nC / lb.nO, 3, 0.001) && near(lb.nH / lb.nO, 8, 0.001), 'ratio 3:8:1');
const kj = { m: 0.4, M: 0.1, V: 30.0 };
kj.nAcid = (kj.M * kj.V) / 1000;
kj.nN = 2 * kj.nAcid;
kj.N = ((kj.nN * Mr.N) / kj.m) * 100;
assert(near(kj.N, 21.0, 1e-6) && near(1.4 * (2 * kj.M) * kj.V / kj.m, 21.0, 1e-6), 'Kjeldahl');

export const deck1 = deck({
  part: 1,
  title: 'Organic Chemistry: Basic Principles — Part 1: Structure, nomenclature and isomerism',
  goals: [
    'Relate the shape and bonding of carbon to sp³, sp² and sp hybridisation',
    'Write and read complete, condensed, bond-line and wedge-dash structures',
    'Classify compounds, identify functional groups and name them by IUPAC rules including priority',
    'Identify chain, position, functional and metamerism isomers, and recognise stereoisomers',
  ],
  slides: [
    sl('title', 'Organic Chemistry: Basic Principles', {
      b: 'Part 1 — carbon forms four bonds and chains, rings and functional groups. We learn to draw, name and distinguish the millions of compounds that result.',
      v: table(['Family', 'Everyday example', 'Key feature'], [['Alkanes', 'Cooking gas', 'Only single bonds'], ['Alcohols', 'Hand sanitiser', 'Hydroxyl group'], ['Carboxylic acids', 'Vinegar', 'Carboxyl group'], ['Amines', 'Fish smell', 'Nitrogen with a lone pair']], 'Table of four families of organic compounds with an everyday example and key feature'),
      n: 'Welcome. Cooking gas, sanitiser, vinegar and the smell of fish are all organic compounds. Carbon atoms join to each other and to a few other elements in countless ways. In this part we study how carbon bonds, how to draw its compounds, how to name them, and how different compounds can share one molecular formula.',
    }),
    sl('concept', 'Tetravalence and hybridisation', {
      b: 'Carbon has four valence electrons and forms **four covalent bonds** by mixing its 2s and 2p orbitals into equivalent hybrid orbitals. The type of hybrid fixes the **shape**, the **angle** and the **bond length**.',
      v: table(['Hybridisation', 's character', 'Shape and angle', 'Example', 'Bonds on carbon'], [['sp³', '25%', 'Tetrahedral, 109.5°', 'Ethane', '4 σ'], ['sp²', '33%', 'Trigonal planar, 120°', 'Ethene', '3 σ + 1 π'], ['sp', '50%', 'Linear, 180°', 'Ethyne', '2 σ + 2 π']], 'Table of sp3, sp2 and sp hybridisation with s character, shape, angle, example and bonds'),
      n: 'Carbon forms four bonds because its valence orbitals mix into four hybrid orbitals. With four single bonds, carbon is s p three hybridised and tetrahedral. With a double bond it is s p two and planar, and with a triple bond it is s p and linear. A higher s character pulls electrons closer, so multiple bonds are shorter.',
    }),
    sl('diagram', 'Shapes at carbon', {
      b: 'In **wedge-dash** drawings a solid wedge points towards you and a dashed wedge points away. Multiple bonds shorten the carbon–carbon distance: **154, 134 and 120 pm**.',
      v: V.shapes,
      n: 'On the left, methane is drawn in three dimensions. Two bonds lie in the plane of the paper, one comes towards you as a solid wedge, and one goes away as a dashed wedge. In the middle, ethene is flat with angles of one hundred and twenty degrees. On the right, ethyne is a straight line. The carbon to carbon distance shrinks from single to double to triple bonds.',
    }),
    sl('concept', 'Four ways to write a structure', {
      b: 'The same compound can be shown at four levels of detail. **Condensed** and **bond-line** formulas save time; **wedge-dash** formulas show 3-D shape.',
      v: table(['Representation', 'What it shows', 'Example for propan-2-ol'], [['Complete', 'Every atom and every bond', 'H–C(H)(H)–C(H)(O–H)–C(H)(H)–H'], ['Condensed', 'Groups written in sequence', r`$\ce{CH3CH(OH)CH3}$`], ['Bond-line', 'Zigzag lines; each end or corner is C; H on C omitted', 'A V shape with OH at the apex'], ['Wedge-dash', 'Spatial arrangement at a carbon', 'Wedge and dash bonds to OH and H']], 'Table of complete, condensed, bond-line and wedge-dash representations with propan-2-ol as the example'),
      n: 'A structure can be written at four levels of detail. The complete formula shows every atom and every bond. The condensed formula writes groups in a line. The bond line formula uses zigzag lines in which each end and corner is a carbon, and hydrogens on carbon are left out. The wedge and dash formula shows the three dimensional shape around a carbon.',
    }),
    sl('diagram', 'Bond-line structures', {
      b: 'To read a bond-line drawing, mark a **carbon at each corner and end**, then add hydrogens until each carbon has four bonds. Heteroatoms such as O are written out, with their H.',
      v: V.bondline,
      n: 'Here are four compounds in bond line form. In two methyl butane, each corner and end is a carbon, giving five carbons, and the hydrogens are filled in to give four bonds on each. But two ene shows a double bond. Cyclohexanol is a six carbon ring with a hydroxyl group, and ethanoic acid has a carbonyl and a hydroxyl on the same carbon.',
    }),
    sl('check', 'Quick check: hybridisation', {
      b: 'Decide the hybridisation of carbon atoms in a compound.',
      n: 'Quick check. Count the sigma bonds and lone pairs, or simply look for double and triple bonds on each carbon.',
      chk: 'hyb-mcq',
    }),
    sl('example', 'Worked example: formula from a bond-line drawing', {
      b: r`**Problem.** Find the molecular formula of 2-methylbutane drawn as a zigzag of four carbons with a methyl branch on the second carbon.

**Step 1.** Count carbons: 4 in the chain + 1 branch = ${bl.bonds.length}.

**Step 2.** Bonds to other carbons: ${bl.bonds.join(', ')}. Hydrogens = 4 minus the bonds on each carbon: ${bl.H.join(' + ')} $= ${bl.Hsum}$.

**Step 3.** Molecular formula $\ce{C5H12}$ (alkane $\text{C}_n\text{H}_{2n+2}$ with $n = 5$).`,
      v: table(['Carbon', 'C–C bonds', 'H atoms'], [['CH₃ (end)', '1', '3'], ['CH (branch point)', '3', '1'], ['CH₂', '2', '2'], ['CH₃ (end)', '1', '3'], ['CH₃ (branch)', '1', '3']], 'Table of the carbon atoms of 2-methylbutane with their carbon-carbon bonds and hydrogen counts'),
      n: 'To read the formula, count the carbons first. There are five. Then for each carbon, subtract the number of bonds to other carbons from four to find its hydrogens. The two end carbons and the branch carbon each carry three, the middle carbon carries two and the branch point carries one. The total is twelve, so the formula is C five H twelve.',
    }),
    sl('concept', 'Classification of organic compounds', {
      b: 'Compounds are first split into **acyclic** (open chain) and **cyclic** (closed ring). Rings are **alicyclic** (behave like open-chain), **aromatic** (benzene-like) or **heterocyclic** (a ring atom other than carbon).',
      v: flow('LR', [['a', 'Organic compounds'], ['b', 'Acyclic (open chain)'], ['c', 'Cyclic (closed ring)'], ['d', 'Alicyclic'], ['e', 'Aromatic'], ['f', 'Heterocyclic']], [['a', 'b'], ['a', 'c'], ['c', 'd'], ['c', 'e'], ['c', 'f']], 'Flow chart of the classification of organic compounds into acyclic and cyclic, with cyclic compounds divided into alicyclic, aromatic and heterocyclic'),
      n: 'Organic compounds are first grouped by the shape of their carbon skeleton. Open chain compounds are acyclic. Ring compounds are cyclic, and the rings may be alicyclic, which behave like the open chain compounds, aromatic, which are benzene like, or heterocyclic, which have atoms such as nitrogen or oxygen in the ring. A homologous series is a family that differs by one CH two unit.',
    }),
    sl('concept', 'Functional groups', {
      b: 'A **functional group** is an atom or group that decides the characteristic reactions of a compound. A **homologous series** has the same group and members differing by $\\ce{CH2}$.',
      v: table(['Group', 'Formula', 'Class', 'Example'], [['Hydroxyl', '–OH', 'Alcohol', r`$\ce{CH3CH2OH}$`], ['Aldehyde', '–CHO', 'Aldehyde', r`$\ce{CH3CHO}$`], ['Carbonyl', '>C=O', 'Ketone', r`$\ce{CH3COCH3}$`], ['Carboxyl', '–COOH', 'Carboxylic acid', r`$\ce{CH3COOH}$`], ['Ester', '–COOR', 'Ester', r`$\ce{CH3COOCH3}$`], ['Amino', '–NH₂', 'Amine', r`$\ce{CH3NH2}$`], ['Halo', '–X', 'Haloalkane', r`$\ce{CH3Cl}$`], ['Nitro', '–NO₂', 'Nitro compound', r`$\ce{CH3NO2}$`]], 'Table of eight functional groups with their formula, class and an example'),
      n: 'The functional group is the part of a molecule that decides how it reacts. A hydroxyl group makes an alcohol, a carbonyl group at the end of a chain makes an aldehyde and inside a chain makes a ketone, and a carboxyl group makes an acid. Amino, halo and nitro groups complete the common list. Members of a family that differ by one CH two form a homologous series.',
    }),
    sl('concept', 'IUPAC naming: the basic rules', {
      b: '**Name = prefix(es) + word root + primary suffix + secondary suffix.** Choose the longest chain containing the functional group, number it from the end giving the **lowest locants**, and list substituents **alphabetically** (di-, tri- are ignored when alphabetising).',
      v: table(['Carbons', 'Root', 'Carbons', 'Root'], [['1', 'meth', '6', 'hex'], ['2', 'eth', '7', 'hept'], ['3', 'prop', '8', 'oct'], ['4', 'but', '9', 'non'], ['5', 'pent', '10', 'dec']], 'Table of the word roots meth to dec for chains of one to ten carbons'),
      n: 'An IUPAC name is built from parts. A word root tells the length of the longest chain: meth, eth, prop, but, pent, hex, hept, oct, non and dec for one to ten carbons. A suffix names the family, and prefixes name the substituents. Number the chain so the functional group, then the multiple bonds, then the substituents get the lowest numbers, and arrange prefixes alphabetically.',
    }),
    sl('example', 'Worked example: naming branched compounds', {
      b: r`**(a)** $\ce{CH3CH(CH3)CH2CH2CH3}$: longest chain 5 C (pentane), methyl on C2: **2-methylpentane**.

**(b)** $\ce{CH3CH(Cl)CH2CH3}$: butane with Cl on C2: **2-chlorobutane**.

**(c)** $\ce{CH3CH2C(CH3)2CH2CH3}$: pentane, two methyls on C3: **3,3-dimethylpentane**.

In each case the chain is numbered from the end that gives the **lowest locants**.`,
      v: table(['Structure (condensed)', 'Parent chain', 'Substituents', 'Name'], [[r`$\ce{CH3CH(CH3)CH2CH2CH3}$`, 'Pentane', '2-methyl', '2-methylpentane'], [r`$\ce{CH3CH(Cl)CH2CH3}$`, 'Butane', '2-chloro', '2-chlorobutane'], [r`$\ce{CH3CH2C(CH3)2CH2CH3}$`, 'Pentane', '3,3-dimethyl', '3,3-dimethylpentane']], 'Table of three branched compounds with parent chain, substituents and IUPAC name'),
      n: 'First find the longest continuous chain, then number it from the end that gives the lowest numbers to the branches. The first compound has a five carbon chain with a methyl group on carbon two. The second is butane with chlorine on carbon two. In the third, two methyl groups sit on the same carbon, carbon three, so we write three comma three dimethyl pentane.',
    }),
    sl('concept', 'Functional group priority', {
      b: 'When a compound has several groups, the **highest-priority group** becomes the suffix and gets the lowest locant; lower groups are named as prefixes. Halo, nitro, alkoxy and alkyl groups are **always prefixes**.',
      v: table(['Priority', 'Group', 'Suffix', 'Prefix (if lower)'], [['1', 'Carboxylic acid', '-oic acid', 'carboxy'], ['2', 'Ester', '-oate', 'alkoxycarbonyl'], ['3', 'Amide', '-amide', 'carbamoyl'], ['4', 'Nitrile', '-nitrile', 'cyano'], ['5', 'Aldehyde', '-al', 'formyl or oxo'], ['6', 'Ketone', '-one', 'oxo'], ['7', 'Alcohol', '-ol', 'hydroxy'], ['8', 'Amine', '-amine', 'amino'], ['9', 'Alkene, alkyne', '-ene, -yne', '—']], 'Table of the order of priority of functional groups with suffixes and prefixes'),
      n: 'When a molecule has more than one functional group, only the highest priority group is named as the suffix. The order starts with carboxylic acids, then esters, amides, nitriles, aldehydes, ketones, alcohols and amines, with double and triple bonds after these. Any group of lower priority is named as a prefix, such as hydroxy or amino. Halogens and nitro groups are always prefixes.',
    }),
    sl('example', 'Worked example: compounds with two groups', {
      b: r`**(a)** $\ce{CH3CH(OH)CH2COOH}$: acid outranks alcohol; chain of 4 with COOH as C1: **3-hydroxybutanoic acid**.

**(b)** $\ce{CH2=CHCH2CH2OH}$: alcohol outranks alkene; OH gets locant 1: **but-3-en-1-ol**.

**(c)** $\ce{CH3COCH2CH(CH3)2}$: ketone chain of 5 with C=O at 2: **4-methylpentan-2-one**.`,
      v: table(['Compound', 'Highest group', 'Numbering starts at', 'Name'], [[r`$\ce{CH3CH(OH)CH2COOH}$`, 'COOH', 'The COOH carbon', '3-hydroxybutanoic acid'], [r`$\ce{CH2=CHCH2CH2OH}$`, 'OH', 'The carbon bearing OH', 'but-3-en-1-ol'], [r`$\ce{CH3COCH2CH(CH3)2}$`, 'C=O', 'The end nearer C=O', '4-methylpentan-2-one']], 'Table of three compounds with two groups, the highest-priority group, numbering and name'),
      n: 'In the first compound, the acid outranks the alcohol, so the name ends in oic acid and the hydroxyl becomes a prefix on carbon three. In the second, the alcohol outranks the double bond, so the chain is numbered from the hydroxyl end and the name is but three ene one ol. In the third, the ketone gets the lowest number, two, and the methyl is on carbon four.',
    }),
    sl('check', 'Quick check: naming', {
      b: 'Choose the correct IUPAC name for a compound.',
      n: 'Quick check. Find the longest chain, then number from the end that gives the lowest numbers.',
      chk: 'name-mcq',
    }),
    sl('concept', 'Rings and aromatic compounds', {
      b: 'Rings take the prefix **cyclo-** (cyclohexane). Substituted benzenes are named as benzene derivatives; two substituents are placed **1,2- (ortho), 1,3- (meta) or 1,4- (para)**. Some common names are retained by IUPAC.',
      v: table(['Compound', 'Formula', 'Name', 'Note'], [['Cyclic alkane', r`$\ce{C6H12}$`, 'Cyclohexane', 'Alicyclic'], ['Methylbenzene', r`$\ce{C6H5CH3}$`, 'Toluene', 'Common name retained'], ['Hydroxybenzene', r`$\ce{C6H5OH}$`, 'Phenol', 'Retained'], ['Aminobenzene', r`$\ce{C6H5NH2}$`, 'Aniline', 'Retained'], ['1,4-dimethylbenzene', r`$\ce{C6H4(CH3)2}$`, 'p-xylene', 'Para isomer'], ['Benzoic acid', r`$\ce{C6H5COOH}$`, 'Benzoic acid', 'Carboxyl on benzene']], 'Table of ring compounds and substituted benzenes with formula, name and note'),
      n: 'Ring compounds take the prefix cyclo, as in cyclohexane. Substituted benzenes are named as derivatives of benzene. When there are two substituents, their positions are shown by numbers one two, one three and one four, or by the prefixes ortho, meta and para. Several common names such as toluene, phenol and aniline are accepted in the IUPAC system.',
    }),
    sl('concept', 'Isomerism: same formula, different compounds', {
      b: '**Isomers** have the same molecular formula but different structures. **Structural isomers** differ in the order of bonded atoms; **stereoisomers** differ only in spatial arrangement.',
      v: table(['Type', 'Difference', 'Example'], [['Chain', 'Skeleton of carbon atoms', 'Butane and 2-methylpropane'], ['Position', 'Place of group or double bond', 'Propan-1-ol and propan-2-ol'], ['Functional group', 'Different groups', 'Ethanol and methoxymethane'], ['Metamerism', 'Different alkyl groups about one functional atom', 'Methoxypropane and ethoxyethane'], ['Stereo', 'Arrangement in space', 'cis and trans but-2-ene']], 'Table of types of isomerism with the difference and an example of each'),
      n: 'Isomers share a molecular formula but differ in structure. In chain isomers the carbon skeleton differs. In position isomers the functional group or double bond sits at a different carbon. Functional group isomers have different groups, such as an alcohol and an ether. Metamers have different alkyl groups on either side of the same functional atom. Stereoisomers differ only in arrangement in space.',
    }),
    sl('diagram', 'Chain isomers of C₅H₁₂', {
      b: 'Pentane has **three** chain isomers. **More branching, lower boiling point**: the molecule is more compact and has less surface contact for van der Waals forces.',
      v: V.c5,
      n: 'Here are the three isomers of C five H twelve. Pentane is a straight chain. Two methyl butane has one branch. Two two dimethyl propane has two branches on one carbon. All have the same formula, but their boiling points fall from three hundred and nine kelvin to two hundred and eighty three as the molecule becomes more compact.',
    }),
    sl('example', 'Worked example: isomers of C₄H₁₀O', {
      b: r`**Problem.** Count and classify the isomers of $\ce{C4H10O}$ that are alcohols or ethers.

**Alcohols (${iso.alcohols.length}):** ${iso.alcohols.join(', ')}.

**Ethers (${iso.ethers.length}):** ${iso.ethers.join(', ')}.

**Total ${iso.alcohols.length + iso.ethers.length}.** Butan-1-ol and butan-2-ol are **position** isomers; butan-1-ol and 2-methylpropan-1-ol are **chain** isomers; butan-1-ol and ethoxyethane are **functional group** isomers; methoxypropane and ethoxyethane are **metamers**.`,
      v: table(['Pair', 'Type of isomerism'], [['Butan-1-ol / butan-2-ol', 'Position'], ['Butan-1-ol / 2-methylpropan-1-ol', 'Chain'], ['Butan-1-ol / ethoxyethane', 'Functional group'], ['Methoxypropane / ethoxyethane', 'Metamerism']], 'Table of four pairs of C4H10O isomers with the type of isomerism'),
      n: 'The formula C four H ten O fits four alcohols and three ethers, seven isomers in all. Comparing pairs shows the types. The two butanols differ in the position of the hydroxyl, so they are position isomers. Butanol and two methyl propanol differ in the chain. An alcohol and an ether are functional group isomers, and the two ethers with different alkyl groups are metamers.',
    }),
    sl('check', 'Quick check: types of isomerism', {
      b: 'Identify the type of isomerism in a pair of compounds.',
      n: 'Quick check. Ask what has changed: the skeleton, the position, the group, or the alkyl groups around one atom.',
      chk: 'isomer-mcq',
    }),
    sl('diagram', 'Stereoisomerism (introduction)', {
      b: '**Geometrical (cis-trans)** isomers arise when each doubly bonded carbon carries two different groups. **Optical** isomers arise at a **chiral carbon** with four different groups; the two forms are non-superimposable mirror images.',
      v: V.stereo,
      n: 'Stereoisomers have the same bonding but a different arrangement in space. In cis but two ene both methyl groups are on the same side of the double bond, and in the trans form they are on opposite sides. Lactic acid has a carbon with four different groups, so it exists as two mirror images that cannot be superimposed. We meet these ideas again in later classes.',
    }),
    sl('summary', 'Summary: Part 1', {
      ul: [
        'Carbon is tetravalent: sp³ (109.5°), sp² (120°) and sp (180°); C–C 154, C=C 134, C≡C 120 pm.',
        'Structures: complete, condensed, bond-line and wedge-dash; compounds are acyclic, alicyclic, aromatic or heterocyclic.',
        'IUPAC name = prefixes + root + suffixes; longest chain, lowest locants, alphabetical order; highest-priority group is the suffix.',
        'Structural isomers: chain, position, functional group, metamerism; stereoisomers: geometrical and optical.',
      ],
      v: table(['Isomer pair', 'Type'], [['Pentane / 2-methylbutane', 'Chain'], ['Propan-1-ol / propan-2-ol', 'Position'], ['Ethanol / methoxymethane', 'Functional group'], ['cis- / trans-but-2-ene', 'Geometrical']], 'Summary table of isomer pairs and types'),
      n: 'Let us sum up. Carbon forms four bonds using s p three, s p two or s p hybrids. Structures can be written in complete, condensed, bond line or wedge and dash form. IUPAC names follow the longest chain, lowest locants and the priority of functional groups. Isomers may differ in chain, position, functional group or metamerism, and stereoisomers differ in space.',
    }),
    sl('exam-tips', 'Exam tips: Part 1', {
      ul: [
        'Mark a carbon at every corner and end, then fill hydrogens to four bonds.',
        'Choose the longest chain that contains the principal functional group, not simply the longest chain.',
        'Number for the principal group first, then multiple bonds, then substituents.',
        'Write substituents alphabetically and use di-, tri- only for counting.',
        'State the type of isomerism with the reason, not just the name.',
      ],
      v: table(['Slip', 'Fix'], [['Longest chain ignores OH or COOH', 'Chain must contain the principal group'], ['Locants not the lowest', 'Try numbering from both ends'], ['Counting hydrogens on heteroatoms', 'O and N take their own H to fill valence'], ['Calling any two isomers "chain"', 'Check skeleton, position, group, alkyl groups']], 'Table of four common slips in structure and naming questions with fixes'),
      n: 'Some exam tips. Choose the longest chain that includes the principal functional group. Number to give the principal group the lowest number, then double bonds, then substituents. List prefixes alphabetically. And when you name a type of isomerism, say what differs between the two structures: the chain, the position, the group or the alkyl groups.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Organic Chemistry: Basic Principles — Part 2: Reactivity, purification and analysis',
  goals: [
    'Describe homolytic and heterolytic fission and the stability of carbocations, carbanions and free radicals',
    'Explain inductive, electromeric, resonance and hyperconjugation effects',
    'Classify organic reactions and choose a purification method',
    'Describe Lassaigne and quantitative tests and calculate percentage composition',
  ],
  slides: [
    sl('title', 'Reactivity, purification and analysis', {
      b: 'Part 2 — how bonds break, why some intermediates are more stable than others, and how chemists purify a compound and find what it contains.',
      v: table(['Question', 'Tool'], [['How does the bond break?', 'Homolytic or heterolytic fission'], ['Which intermediate is favoured?', 'Inductive, resonance and hyperconjugation effects'], ['Is the sample pure?', 'Crystallisation, distillation, chromatography'], ['What is in it?', 'Lassaigne test and percentage analysis']], 'Table of four questions in organic chemistry and the tools used to answer them'),
      n: 'Welcome to part two. When an organic molecule reacts, a bond breaks in one of two ways, and the fragments formed are more or less stable depending on electronic effects. We then turn to the practical side: how to purify an organic compound, how to find which elements it contains, and how to calculate its percentage composition.',
    }),
    sl('concept', 'Fission of a covalent bond', {
      b: 'In **homolytic fission** the shared pair splits evenly, one electron to each atom, giving **free radicals**. In **heterolytic fission** the pair goes to the more electronegative atom, giving a **cation and an anion**.',
      v: table(['Feature', 'Homolytic fission', 'Heterolytic fission'], [['Electrons', 'One to each atom', 'Both to one atom'], ['Species formed', 'Free radicals', 'Carbocation + anion, or carbanion + cation'], ['Conditions', 'Light, heat, non-polar solvent', 'Polar solvent, polar bond'], ['Arrow used', 'Half-headed (fish-hook)', 'Full-headed']], 'Table comparing homolytic and heterolytic fission'),
      n: 'A covalent bond can break in two ways. In homolytic fission the two shared electrons are divided, one to each atom, giving free radicals. This is favoured by light, heat and non polar solvents. In heterolytic fission both electrons go to the more electronegative atom, giving a positive and a negative ion. This is favoured by polar solvents and polar bonds.',
    }),
    sl('diagram', 'Curved arrows show electron movement', {
      b: 'A **half-headed (fish-hook)** arrow moves one electron; a **full-headed** arrow moves a pair. The arrow starts at the bond or lone pair and ends where the electrons go.',
      v: V.fission,
      n: 'In the top row, chlorine splits in light. Two fish hook arrows show one electron going to each chlorine, and we get two chlorine free radicals, each with an unpaired electron. In the bottom row, tertiary butyl bromide splits in a polar solvent. One full arrow shows the pair moving to bromine, leaving a carbocation and a bromide ion.',
    }),
    sl('concept', 'Reaction intermediates', {
      b: 'Bond fission produces short-lived **intermediates**. Their shape follows their hybridisation, and their stability decides which products form.',
      v: table(['Intermediate', 'Charge or electrons', 'Hybridisation and shape', 'Example'], [['Carbocation', 'Positive; six electrons', 'sp², planar', 'CH₃⁺, (CH₃)₃C⁺'], ['Carbanion', 'Negative; lone pair', 'sp³, pyramidal', 'CH₃⁻'], ['Free radical', 'Neutral; one unpaired electron', 'sp², planar (or rapidly inverting)', '•CH₃']], 'Table of carbocation, carbanion and free radical with charge, hybridisation, shape and example'),
      n: 'Bond breaking gives short lived intermediates. A carbocation has a positive carbon with only six electrons and is flat. A carbanion has a lone pair on a negative carbon and is pyramidal. A free radical has a single unpaired electron and is neutral. Which one forms, and how readily, depends on how well the groups around the carbon can stabilise it.',
    }),
    sl('diagram', 'Stability of carbocations', {
      b: 'Stability order: $\\text{CH}_3^+ < 1^\\circ < 2^\\circ < 3^\\circ$. Alkyl groups **donate electrons (+I)** and give **hyperconjugation**; free radicals follow the same order, but **carbanions the reverse**.',
      v: V.cations,
      n: 'The tertiary carbocation is the most stable and the methyl cation the least. Each alkyl group pushes electrons towards the positive carbon, and its carbon hydrogen bonds can overlap with the empty orbital, which is called hyperconjugation. The tertiary cation has nine such hydrogens, the secondary six, and the primary three. Free radicals follow the same order, but carbanions follow the opposite order.',
    }),
    sl('check', 'Quick check: stability', {
      b: 'Compare the stability of two reaction intermediates.',
      n: 'Quick check. Count the alkyl groups on the charged carbon and remember that carbanions go the other way.',
      chk: 'cation-mcq',
    }),
    sl('concept', 'Electrophiles and nucleophiles', {
      b: 'An **electrophile** (electron-loving) is electron-deficient and accepts an electron pair. A **nucleophile** (nucleus-loving) is electron-rich and donates a pair. Most organic reactions are a nucleophile attacking an electrophilic carbon.',
      v: table(['Electrophiles', 'Why', 'Nucleophiles', 'Why'], [[r`$\ce{H+}$, $\ce{NO2+}$, $\ce{Br+}$`, 'Positive; empty orbital', r`$\ce{OH-}$, $\ce{CN-}$, $\ce{Cl-}$`, 'Negative; lone pair'], [r`$\ce{AlCl3}$, $\ce{BF3}$`, 'Incomplete octet', r`$\ce{NH3}$, $\ce{H2O}$`, 'Neutral; lone pair'], ['Carbonyl carbon', 'δ+ from C=O polarity', 'Carbanions, alkene π bond', 'Electron-rich']], 'Table of electrophiles and nucleophiles with the reason for each'),
      n: 'An electrophile is short of electrons and accepts a pair. Examples are positive ions, molecules with an incomplete octet such as boron trifluoride, and carbon atoms made partly positive by a polar bond. A nucleophile has a lone pair or a negative charge and donates it. Hydroxide, cyanide, ammonia and water are common nucleophiles.',
    }),
    sl('diagram', 'Inductive effect', {
      b: 'The **inductive effect** is the permanent shift of σ-bond electrons caused by an atom or group, and it **fades quickly with distance**. Groups that pull electrons (−I) include $\\text{NO}_2$, CN, halogens; alkyl groups push (+I).',
      v: V.ind,
      n: 'Chlorine is more electronegative than carbon, so the electrons in the carbon chlorine bond shift towards chlorine. This makes the carbon next to chlorine slightly positive, and it in turn draws electrons from the next carbon, and so on. The effect weakens quickly along the chain and is almost gone by the third bond. Alkyl groups do the opposite and push electrons away.',
    }),
    sl('diagram', 'Resonance', {
      b: 'When a species cannot be shown by a single Lewis structure, the true structure is a **hybrid** of **resonance structures**, joined by a double-headed arrow. The hybrid is **more stable** than any one structure.',
      v: V.res,
      n: 'The ethanoate ion can be drawn with the double bond on either oxygen. Neither picture is correct alone. The real ion is a hybrid in which both carbon oxygen bonds are equal and the negative charge is shared. In benzene the two Kekulé structures are likewise only a pair of pictures of one molecule with six equal bonds, a hundred and thirty nine picometres long.',
    }),
    sl('concept', 'Resonance: rules and effects', {
      b: 'Resonance structures differ **only in the positions of electrons**, not atoms, have the same number of paired electrons and similar energies. Groups with lone pairs **donate** (+R); groups with multiple bonds to electronegative atoms **withdraw** (−R).',
      v: table(['Effect', 'Groups', 'Example result'], [['+R (donate)', '–OH, –OR, –NH₂, –X', 'Phenol: O lone pair delocalises into the ring'], ['−R (withdraw)', '–NO₂, –CN, –CHO, –COOH', 'Nitrobenzene: ring becomes electron-poor'], ['Stabilisation', 'Delocalisation of electrons', 'Ethanoate ion is more stable than the ethoxide ion'], ['Bond lengths', 'Equalised', 'Benzene: all C–C 139 pm']], 'Table of resonance effects with groups and example results'),
      n: 'In drawing resonance structures only the electrons move, never the atoms, and all structures must have the same number of paired electrons. A group with a lone pair next to a pi system pushes electron density into it, which is the plus R effect. A group with a multiple bond to an electronegative atom pulls density out, which is the minus R effect. Resonance makes a species more stable and equalises bond lengths.',
    }),
    sl('concept', 'Four electronic effects compared', {
      b: '**Hyperconjugation** is delocalisation of σ(C–H) electrons into an adjacent empty p orbital or π bond. **Electromeric effect** is a temporary shift of π electrons, only when a reagent attacks.',
      v: table(['Effect', 'Electrons involved', 'Permanent?', 'Example'], [['Inductive', 'σ bond', 'Yes', 'C–Cl polarity'], ['Electromeric', 'π bond', 'No: only during attack', r`$\ce{C=O}$ shifts to O when CN⁻ attacks`], ['Resonance', 'π and lone pairs', 'Yes', 'Benzene, ethanoate ion'], ['Hyperconjugation', 'σ(C–H) into p or π', 'Yes', 'Ethyl cation, propene']], 'Table comparing inductive, electromeric, resonance and hyperconjugation effects'),
      n: 'Compare the four effects. The inductive effect moves sigma electrons and is permanent. The electromeric effect moves pi electrons, but only at the moment a reagent attacks. Resonance spreads pi electrons and lone pairs and is permanent. Hyperconjugation is the overlap of a carbon hydrogen sigma bond with a neighbouring empty or pi orbital. It is why more alkyl groups make a carbocation or alkene more stable.',
    }),
    sl('check', 'Quick check: electronic effects', {
      b: 'Apply an electronic effect to a compound.',
      n: 'Quick check. Decide whether the group pulls or pushes electrons, and by which effect.',
      chk: 'ind-acid-mcq',
    }),
    sl('concept', 'Types of organic reactions', {
      b: 'Reactions are classified by what happens to the substrate: **substitution**, **addition**, **elimination** and **rearrangement**. Each can proceed by a radical, nucleophilic or electrophilic mechanism.',
      v: table(['Type', 'Example', 'Mechanism'], [['Substitution', r`$\ce{CH4 + Cl2 -> CH3Cl + HCl}$`, 'Free radical (light)'], ['Substitution', r`$\ce{CH3Br + OH- -> CH3OH + Br-}$`, 'Nucleophilic'], ['Substitution', r`$\ce{C6H6 + HNO3 -> C6H5NO2 + H2O}$`, 'Electrophilic (benzene)'], ['Addition', r`$\ce{C2H4 + HBr -> C2H5Br}$`, 'Electrophilic'], ['Addition', r`$\ce{CH3CHO + HCN -> CH3CH(OH)CN}$`, 'Nucleophilic'], ['Elimination', r`$\ce{C2H5Br + KOH -> C2H4 + KBr + H2O}$`, 'Loss of HBr'], ['Rearrangement', r`$\ce{NH4CNO -> (NH2)2CO}$`, 'Atoms reorganise']], 'Table of types of organic reaction with an example and the mechanism of each'),
      n: 'Organic reactions are grouped by what happens to the molecule. In substitution one atom or group replaces another. In addition a molecule adds across a multiple bond. In elimination a small molecule is lost to form a multiple bond. In rearrangement the atoms of the molecule reorganise into an isomer. Each may go by a free radical, nucleophilic or electrophilic mechanism.',
    }),
    sl('concept', 'Purifying organic compounds', {
      b: 'Choose the method from the **difference in a physical property** between the compound and its impurity.',
      v: table(['Method', 'Principle', 'Typical use'], [['Crystallisation', 'Different solubility in a hot and cold solvent', 'Benzoic acid from hot water'], ['Sublimation', 'Solid turns directly to vapour', 'Naphthalene, camphor'], ['Simple distillation', 'Boiling points differ considerably', 'Chloroform (334 K) from aniline (457 K)'], ['Fractional distillation', 'Boiling points differ little', 'Acetone (329 K) from methanol (338 K)'], ['Reduced pressure', 'Boils lower at low pressure; avoids decomposition', 'Glycerol'], ['Steam distillation', 'Steam-volatile and immiscible with water', 'Aniline, essential oils'], ['Differential extraction', 'Different solubility in two immiscible solvents', 'Organic compound from water using ether'], ['Chromatography', 'Different adsorption or partition', 'Dyes, plant pigments']], 'Table of methods of purification with the principle and typical use'),
      n: 'The method is chosen from a difference in a physical property. Crystallisation uses solubility, sublimation suits solids that turn directly into vapour, and distillation separates liquids by boiling point. Fractional distillation is needed when the boiling points are close. Reduced pressure suits liquids that decompose, and steam distillation suits substances volatile in steam but immiscible with water. Chromatography separates by adsorption or partition.',
    }),
    sl('diagram', 'Simple distillation', {
      b: 'The liquid is heated; its vapour passes through a **condenser** cooled by water flowing **upwards**, and the **distillate** collects in the receiver. The thermometer reads the boiling point of the vapour.',
      v: V.dist,
      n: 'In simple distillation, the mixture is heated in a flask with a thermometer in the neck. Vapour of the more volatile liquid travels into a sloping condenser. Cooling water enters at the lower end and leaves at the upper end so that the jacket stays full. The vapour condenses and the pure liquid drips into the receiver.',
    }),
    sl('diagram', 'Chromatography and the Rf value', {
      b: 'In **TLC** a drop of mixture is placed on a start line; the solvent rises and carries components different distances. **Rf = distance moved by the spot ÷ distance moved by the solvent**, always less than 1.',
      v: V.tlc,
      n: 'In thin layer chromatography, spots are applied on a start line and the plate stands in a solvent. The solvent rises, carrying each component a different distance depending on how strongly it sticks to the plate. The Rf value is the distance moved by the spot divided by the distance moved by the solvent front. Matching Rf with pure reference lanes identifies the components.',
    }),
    sl('example', 'Worked example: Rf values', {
      b: r`**Problem.** The solvent front moved ${dec(rf.front, 2)} cm. Spot A moved ${dec(rf.a, 2)} cm and spot B moved ${dec(rf.b, 2)} cm. Find the Rf values and say which is more strongly adsorbed.

**Step 1.** $R_f(\text{A}) = \dfrac{${dec(rf.a, 2)}}{${dec(rf.front, 2)}} = ${dec(rf.Ra, 2)}$.

**Step 2.** $R_f(\text{B}) = \dfrac{${dec(rf.b, 2)}}{${dec(rf.front, 2)}} = ${dec(rf.Rb, 2)}$.

**Step 3.** A has the lower Rf, so it is **more strongly adsorbed** on the plate.`,
      v: table(['Spot', 'Distance moved (cm)', 'Rf'], [['A', dec(rf.a, 2), dec(rf.Ra, 2)], ['B', dec(rf.b, 2), dec(rf.Rb, 2)]], 'Table of the distance moved and Rf value of spots A and B'),
      n: 'Divide each spot distance by the distance moved by the solvent. For spot A, three point two divided by eight point zero gives zero point four zero. For spot B, five point six divided by eight gives zero point seven zero. The smaller Rf means that A travelled less because it sticks more strongly to the stationary phase.',
    }),
    sl('concept', "Lassaigne's test: nitrogen, sulfur and halogens", {
      b: 'Fuse the compound with **sodium metal**, plunge into water and filter: C, N, S and X become $\\text{NaCN}$, $\\text{Na}_2\\text{S}$ and $\\text{NaX}$ in the **Lassaigne extract**. $\\ce{Na + C + N -> NaCN}$, $\\ce{2Na + S -> Na2S}$, $\\ce{Na + X -> NaX}$.',
      v: table(['Element', 'Test on the extract', 'Result'], [['Nitrogen', 'Boil with FeSO₄, cool, acidify with conc. H₂SO₄', 'Prussian blue colour'], ['Sulfur', 'Lead ethanoate in ethanoic acid', 'Black precipitate (PbS)'], ['Sulfur', 'Sodium nitroprusside', 'Violet colour'], ['Nitrogen and sulfur together', 'FeCl₃', 'Blood-red colour (thiocyanate)'], ['Halogen', 'Boil with HNO₃, add AgNO₃', 'White (Cl, dissolves in NH₃), pale yellow (Br), yellow (I)']], 'Table of Lassaigne tests for nitrogen, sulfur and halogens with the observations'),
      n: 'In the Lassaigne test the compound is fused with sodium, which converts the elements into ionic salts that dissolve in water: sodium cyanide, sodium sulfide and sodium halides. Nitrogen gives a Prussian blue colour with iron sulfate and acid. Sulfur gives a black precipitate with lead ethanoate. Halogens are tested with silver nitrate after boiling with nitric acid: white, pale yellow or yellow precipitates show chlorine, bromine or iodine.',
    }),
    sl('check', "Quick check: Lassaigne's test", {
      b: 'Interpret a test on the sodium fusion extract.',
      n: 'Quick check. Recall which element gives which colour or precipitate.',
      chk: 'lass-mcq',
    }),
    sl('concept', 'Quantitative analysis: formulas', {
      b: 'Percentages come from the **mass of a product that contains all of one element**. $m$ is the mass of the compound taken.',
      v: table(['Element', 'Method', 'Percentage'], [['C and H', 'Liebig: CO₂ (KOH) and H₂O (CaCl₂)', r`$\%\text{C} = \dfrac{12}{44}\dfrac{m_{\text{CO}_2}}{m} \times 100$; $\%\text{H} = \dfrac{2}{18}\dfrac{m_{\text{H}_2\text{O}}}{m} \times 100$`], ['N', 'Dumas: N₂ volume at STP', r`$\%\text{N} = \dfrac{28 \times V_{\text{STP}}\,(\text{mL})}{22400 \times m} \times 100$`], ['N', 'Kjeldahl: NH₃ absorbed in acid', r`$\%\text{N} = \dfrac{1.4 \times N \times V}{m}$ ($N$ normality, $V$ mL acid used)`], ['Halogen', 'Carius: AgX', r`$\%\text{X} = \dfrac{\text{atomic mass of X}}{\text{molar mass of AgX}}\dfrac{m_{\text{AgX}}}{m} \times 100$`], ['S', 'Carius: BaSO₄', r`$\%\text{S} = \dfrac{32}{233}\dfrac{m_{\text{BaSO}_4}}{m} \times 100$`], ['P', 'Mg₂P₂O₇', r`$\%\text{P} = \dfrac{62}{222}\dfrac{m_1}{m} \times 100$ ($m_1$ = mass of $\ce{Mg2P2O7}$)`], ['O', 'By difference, or as CO₂', r`$100 - \text{sum of others}$`]], 'Table of quantitative estimation methods and the percentage formula for carbon, hydrogen, nitrogen, halogens, sulfur, phosphorus and oxygen'),
      n: 'Quantitative analysis converts each element into a product that can be weighed or measured. Carbon and hydrogen are found by burning the compound and weighing the carbon dioxide and water. Nitrogen is found by the Dumas method from the volume of nitrogen gas, or by the Kjeldahl method from ammonia. Halogens and sulfur are found by the Carius method as silver halide and barium sulfate, and oxygen is usually found by difference.',
    }),
    sl('diagram', 'Kjeldahl and Dumas methods', {
      b: 'Kjeldahl converts nitrogen to **ammonium sulfate**, then to **ammonia**, measured by titration. Dumas converts nitrogen to **N₂ gas**, measured by volume at STP. Kjeldahl **fails** for nitro, azo and ring-nitrogen compounds.',
      v: V.nflows,
      n: 'In the Kjeldahl method, the compound is digested with concentrated sulfuric acid, which turns its nitrogen into ammonium sulfate. Sodium hydroxide then releases ammonia, which is absorbed in standard acid and the unused acid is titrated. In the Dumas method, the compound is heated with copper oxide and the nitrogen gas is collected over potassium hydroxide and its volume is measured at standard temperature and pressure.',
    }),
    sl('example', 'Worked example: percentage composition', {
      b: r`**(a) Liebig.** $${dec(lb.m, 3)}\ \text{g}$ of a compound of C, H and O gave $${dec(lb.co2, 3)}\ \text{g}$ $\ce{CO2}$ and $${dec(lb.h2o, 3)}\ \text{g}$ $\ce{H2O}$. $\%\text{C} = \dfrac{12}{44} \times \dfrac{${dec(lb.co2, 3)}}{${dec(lb.m, 3)}} \times 100 = ${dec(lb.C, 3)}$; $\%\text{H} = \dfrac{2}{18} \times \dfrac{${dec(lb.h2o, 3)}}{${dec(lb.m, 3)}} \times 100 = ${dec(lb.H, 4)}$; $\%\text{O} = 100 - ${dec(lb.C, 3)} - ${dec(lb.H, 4)} = ${dec(lb.O, 4)}$. Mole ratio C : H : O = ${dec(lb.nC / lb.nO, 2)} : ${dec(lb.nH / lb.nO, 2)} : 1, so the empirical formula is $\ce{C3H8O}$.

**(b) Kjeldahl.** $${dec(kj.m, 2)}\ \text{g}$ compound; the ammonia neutralised $${dec(kj.V, 3)}\ \text{mL}$ of $${dec(kj.M, 3)}\ \text{mol L}^{-1}$ $\ce{H2SO4}$. $n(\text{NH}_3) = 2 \times ${sci(kj.nAcid, 3)} = ${sci(kj.nN, 3)}\ \text{mol}$, so $\%\text{N} = \dfrac{${sci(kj.nN, 3)} \times 14}{${dec(kj.m, 2)}} \times 100 = ${dec(kj.N, 3)}$.`,
      v: table(['Quantity', 'Liebig example', 'Kjeldahl example'], [['Mass of compound', '0.300 g', '0.40 g'], ['Product measured', '0.660 g CO₂, 0.360 g H₂O', '30.0 mL of 0.100 mol L⁻¹ H₂SO₄'], ['Result', '60.0% C, 13.3% H, 26.7% O', '21.0% N']], 'Table of the data and results of a Liebig and a Kjeldahl calculation'),
      n: 'For the combustion analysis, one twelfth over forty four of the carbon dioxide mass, divided by the sample mass, gives sixty percent carbon, and the water gives thirteen point three percent hydrogen. Oxygen is the rest, twenty six point seven percent, and the mole ratio gives the empirical formula C three H eight O. In the Kjeldahl example, twice the moles of acid gives the moles of ammonia, and the nitrogen is twenty one percent.',
    }),
    sl('summary', 'Summary: Part 2', {
      ul: [
        'Homolytic fission gives free radicals; heterolytic fission gives ions. Stability: 3° > 2° > 1° > CH₃ for carbocations and radicals; the reverse for carbanions.',
        'Inductive (σ, permanent, fades with distance), electromeric (π, temporary), resonance (π and lone pairs) and hyperconjugation (σ C–H).',
        'Reactions: substitution, addition, elimination, rearrangement; electrophiles accept, nucleophiles donate pairs.',
        'Purification matches the method to the property; Rf = distance of spot ÷ distance of solvent.',
        'Lassaigne test for N, S, X; Liebig, Dumas, Kjeldahl and Carius for percentages.',
      ],
      v: table(['Technique', 'Use'], [['Crystallisation', 'Solid with different solubility'], ['Fractional distillation', 'Liquids with close boiling points'], ['Steam distillation', 'Steam-volatile, water-immiscible'], ['Chromatography', 'Separation and identification by Rf']], 'Summary table of purification techniques and their uses'),
      n: 'Let us sum up. Bonds break homolytically to give radicals or heterolytically to give ions, and carbocation stability rises with substitution through inductive effect and hyperconjugation. Resonance and the inductive effect explain acidity and stability. Reactions are classified as substitution, addition, elimination and rearrangement. Purification methods are matched to a property, and Lassaigne and quantitative tests reveal composition.',
    }),
    sl('exam-tips', 'Exam tips: Part 2', {
      ul: [
        'Draw curved arrows from the electron source to the destination; half-heads for single electrons.',
        'Explain stability using +I, resonance and the number of α-hydrogens, not just "more stable".',
        'Quote the reagent and colour for each element in Lassaigne tests.',
        'Write the formula for %C, %H, %N, %X before substituting; Rf has no unit and is below 1.',
        'Kjeldahl fails for nitro, azo and ring nitrogen; Dumas works for all.',
      ],
      v: table(['Slip', 'Fix'], [['Carbanion stability in the carbocation order', 'Carbanions are the reverse'], ['Using a full arrow for a single electron', 'Use a fish-hook'], ['Omitting HNO₃ before AgNO₃', 'It removes CN⁻ and S²⁻ that also precipitate'], ['Rf greater than 1', 'The spot cannot outrun the solvent']], 'Table of four common slips in Part 2 questions with fixes'),
      n: 'Some exam tips. In curved arrow diagrams, start at the electrons and end where they go, with half heads for single electrons. Support stability arguments with inductive effect, resonance and the number of hydrogens available for hyperconjugation. Remember the reagent and colour for each element in the Lassaigne test, and check that any Rf value you quote is below one.',
    }),
  ],
});
