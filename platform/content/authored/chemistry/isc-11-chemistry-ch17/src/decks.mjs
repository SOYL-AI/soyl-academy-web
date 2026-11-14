// ch17 Introduction, Classification and IUPAC Nomenclature of Organic Compounds — two decks.
// Part 1 (t01–t02): vital force and its fall, importance, why carbon forms so many compounds, classification, homologous series,
// functional groups. Part 2 (t03): IUPAC rules for aliphatic, alicyclic and aromatic compounds.
import { sl, deck, table, flow, chem, svgV, r } from './lib.mjs';
import { VERSATILE, RINGS, TREE, FGS, VANILLIN, ANATOMY, NAMED8, ALICYC, BENZ, DISUB, REVERSE, EX1, EX2 } from './svgs.mjs';

export const V = {
  versatile: svgV(VERSATILE, 'Five carbon skeletons made from five carbon atoms: pentane, 2-methylbutane, cyclopentane, pent-1-ene and pent-1-yne', 'Every carbon has four bonds; chains, branches, rings and multiple bonds all occur.'),
  rings: svgV(RINGS, 'Cyclohexane, benzene, pyridine and tetrahydrofuran classified as alicyclic or aromatic and as homocyclic or heterocyclic'),
  tree: svgV(TREE, 'Classification tree: open chain and closed chain compounds, closed chain divided into homocyclic (alicyclic, aromatic) and heterocyclic'),
  fgs: svgV(FGS, 'Ethanol, ethanal, propanone, ethanoic acid, ethanamide and chloroethane, each drawn with its functional group named'),
  vanillin: svgV(VANILLIN, 'Vanillin drawn as a benzene ring bearing an aldehyde group, an ether group and a phenolic hydroxyl group'),
  anatomy: svgV(ANATOMY, 'Skeleton of 4-ethyl-2-methylheptane with the seven chain carbons numbered and the parts of the name explained'),
  named8: svgV(NAMED8, 'Eight bond-line structures of compounds with different functional groups, each with its IUPAC name'),
  ex1: svgV(EX1, 'Skeleton of 2,3,5-trimethylhexane with the six chain carbons numbered from the left'),
  ex2: svgV(EX2, 'Structures of 4-hydroxypentanoic acid and but-3-en-1-ol with the chain carbons numbered'),
  alicyc: svgV(ALICYC, 'Four alicyclic compounds with ring numbering: 1-ethyl-2-methylcyclopentane, 3-methylcyclohexene, 2-methylcyclohexan-1-ol and ethylcyclobutane'),
  benz: svgV(BENZ, 'Six monosubstituted benzenes with their common and systematic names'),
  disub: svgV(DISUB, 'Ortho, meta and para disubstituted benzenes with locants: 1,2-dimethylbenzene, 1-chloro-3-nitrobenzene and 4-nitrophenol'),
  reverse: svgV(REVERSE, 'Three steps to draw 5-methylhex-2-ene from its name: six carbon chain, double bond at carbon 2, methyl at carbon 5'),
};

// alkane series: CnH2n+2, M = 14n + 2 (C = 12, H = 1)
const alkRows = [1, 2, 3, 4, 5].map((n) => {
  const names = ['methane', 'ethane', 'propane', 'butane', 'pentane'];
  const sub = (k) => String(k).split('').map((d) => '₀₁₂₃₄₅₆₇₈₉'[Number(d)]).join('');
  return [names[n - 1], `C${n === 1 ? '' : sub(n)}H${sub(2 * n + 2)}`, String(12 * n + 2 * n + 2), n === 1 ? '—' : '+14'];
});

export const deck1 = deck({
  part: 1,
  title: 'Introduction, Classification and IUPAC Nomenclature of Organic Compounds — Part 1: Why so many carbon compounds, and how to classify them',
  goals: [
    'Describe the vital force theory and how Wöhler’s synthesis of urea overthrew it',
    'Explain why carbon forms a very large number of compounds',
    'Classify organic compounds as open chain, alicyclic, aromatic or heterocyclic',
    'State the characteristics of a homologous series and identify functional groups',
  ],
  slides: [
    sl('title', 'Organic chemistry: the chemistry of carbon compounds', {
      b: 'Part 1 — where the subject came from, why it is so large, and how its compounds are grouped.',
      v: table(['Where you meet it', 'Organic compounds involved'], [['Kitchen', 'Sugar, starch, edible oils, vinegar'], ['Medicine chest', 'Paracetamol, aspirin, antibiotics'], ['Vehicle', 'Petrol, diesel, LPG, synthetic rubber'], ['Wardrobe', 'Cotton, nylon, polyester, dyes'], ['Bathroom', 'Soaps, detergents, perfumes']], 'Table of everyday places and the organic compounds found there'),
      n: 'Namaste! Organic chemistry began as the study of compounds that came from living things, such as sugar, vinegar and oils. Today it means the chemistry of carbon compounds, and it reaches your kitchen, your medicine chest, your vehicle and your clothes. In this part we ask why carbon forms so many compounds and learn to sort them into families.',
    }),
    sl('concept', 'The vital force theory and its fall', {
      b: 'Early chemists such as Berzelius believed that organic compounds could be formed only inside living organisms, under the guidance of a mysterious **vital force**. Laboratory chemistry, they said, could make only inorganic compounds. In **1828** Friedrich Wöhler prepared **urea**, a compound of animal origin, from an inorganic salt in a flask. The theory then collapsed.',
      v: flow('LR', [['a', 'Vital force theory: organic compounds need living organisms'], ['b', 'Wöhler 1828: heats ammonium cyanate, an inorganic salt'], ['c', 'Urea, a product of animal bodies, forms in the flask'], ['d', 'Vital force theory abandoned']], [['a', 'b', 'tested by'], ['b', 'c', 'gives'], ['c', 'd', 'so']], 'Flow from the vital force theory through Wöhler’s experiment to the end of the theory'),
      n: 'Berzelius and others believed that only living organisms could make organic compounds, guided by a vital force. In eighteen twenty eight, Friedrich Wöhler heated ammonium cyanate, an inorganic salt, and obtained urea, which until then was known only from animal bodies. One experiment was enough to show that no vital force was needed.',
    }),
    sl('diagram', 'Wöhler’s synthesis of urea', {
      b: r`Ammonium cyanate and urea have the **same molecular formula**, $\ce{CH4N2O}$, but different structures: they are **isomers**. Heating rearranges the atoms. Later syntheses, such as Kolbe's ethanoic acid (1845), confirmed that laboratory chemistry can make organic compounds.`,
      v: chem(r`\ce{NH4CNO -> NH2CONH2}`, 'Ammonium cyanate rearranging into urea on heating', 'Heat converts the inorganic salt NH₄CNO into urea.'),
      n: 'Ammonium cyanate is an ionic salt of inorganic origin. On gentle heating its atoms rearrange to the covalent molecule urea. Both have the same molecular formula, so they are isomers. A few years later other chemists made ethanoic acid and more organic compounds from elements, and the old belief was finished.',
    }),
    sl('concept', 'Why organic chemistry matters', {
      b: 'More compounds contain carbon than all other elements combined. The subject underlies **medicine** (analgesics, antibiotics), **agriculture** (pesticides, fertilisers such as urea), **energy** (petroleum, natural gas), **materials** (plastics, fibres, rubber), **food** (carbohydrates, proteins, fats, vitamins) and the **chemistry of life** itself (DNA, enzymes).',
      v: table(['Field', 'Examples'], [['Health', 'Paracetamol, penicillin, vitamins'], ['Fuels', 'Petrol, LPG, biogas, ethanol blends'], ['Materials', 'Polythene, PVC, nylon, rubber'], ['Agriculture', 'Urea, insecticides, herbicides'], ['Daily life', 'Soaps, detergents, dyes, cosmetics']], 'Table of fields where organic chemistry is important'),
      n: 'Organic chemistry is important because carbon compounds are everywhere. Medicines such as paracetamol and penicillin, fuels such as petrol and cooking gas, plastics, fibres and rubber, urea for crops, soaps and dyes, and every food we eat are organic. Life itself, including DNA and enzymes, is carbon chemistry.',
    }),
    sl('concept', 'Why carbon forms so many compounds', {
      b: '**Tetravalency:** carbon forms four covalent bonds. **Catenation:** carbon atoms join to each other in long chains, branched chains and rings, because the C–C bond is strong. **Multiple bonding:** carbon forms double and triple bonds with itself, oxygen and nitrogen. **Isomerism:** one molecular formula can fit many different structures. Add bonds to H, O, N, S and halogens, and the number of possible compounds is huge.',
      v: V.versatile,
      n: 'Carbon is special in four ways. It is tetravalent, forming four bonds. It shows catenation, joining to other carbon atoms in chains, branches and rings. It forms double and triple bonds. And the same atoms can be arranged in different ways, which is isomerism. This picture shows five different shapes made from just five carbon atoms.',
    }),
    sl('diagram', 'Catenation and isomerism multiply the possibilities', {
      b: r`Every extra carbon atom in an alkane $\ce{C_nH_{2n+2}}$ increases the number of **chain isomers**. These are structural isomers that differ only in the carbon skeleton.`,
      v: table(['Carbon atoms', 'Formula', 'Chain isomers'], [['4', 'C₄H₁₀', '2'], ['5', 'C₅H₁₂', '3'], ['6', 'C₆H₁₄', '5'], ['7', 'C₇H₁₆', '9'], ['8', 'C₈H₁₈', '18'], ['10', 'C₁₀H₂₂', '75']], 'Table of the number of chain isomers of alkanes with 4 to 10 carbon atoms'),
      n: 'Look at how fast the number of isomers grows. Butane has two chain isomers, pentane three, hexane five, and an alkane with ten carbon atoms has seventy five. These are the possibilities for hydrocarbons alone. Add rings, double bonds and other elements, and it is easy to see why millions of organic compounds are known.',
    }),
    sl('check', 'Quick check: carbon and its compounds', {
      b: 'Link the overthrow of the vital force theory to the experiment that did it.',
      n: 'Quick check. Think about what Wöhler started from and what he obtained.',
      chk: 'wohler-mcq',
    }),
    sl('concept', 'Classification of organic compounds', {
      b: 'On the basis of the carbon skeleton, compounds are **open chain (acyclic or aliphatic)** or **closed chain (cyclic)**. Cyclic compounds are **homocyclic** (carbocyclic: ring of carbon atoms only) or **heterocyclic** (at least one ring atom is N, O or S). Homocyclic compounds are **alicyclic** (resembling aliphatic compounds) or **aromatic** (benzene and its derivatives).',
      v: V.tree,
      n: 'Compounds are first divided into open chain and closed chain. An open chain compound has no ring. A cyclic compound has a ring and is homocyclic if the ring has only carbon atoms, or heterocyclic if some ring atom is nitrogen, oxygen or sulphur. Homocyclic compounds are further split into alicyclic compounds and aromatic compounds such as benzene.',
    }),
    sl('diagram', 'Ring compounds: alicyclic, aromatic, heterocyclic', {
      b: '**Alicyclic** rings behave like aliphatic compounds. **Aromatic** compounds contain a benzene-type ring with alternating double bonds and special stability. A ring with N, O or S is **heterocyclic**, and it can be alicyclic (tetrahydrofuran) or aromatic (pyridine).',
      v: V.rings,
      n: 'Here are four rings. Cyclohexane is an alicyclic ring of carbon atoms only. Benzene is aromatic. Pyridine is aromatic too, but one ring atom is nitrogen, so it is also heterocyclic. Tetrahydrofuran has an oxygen atom in a saturated ring, so it is heterocyclic and alicyclic. A compound can fit more than one label.',
    }),
    sl('concept', 'Homologous series', {
      b: r`A **homologous series** is a family of compounds with the **same functional group**, a **general formula**, and successive members that differ by a **$\ce{-CH2-}$ group** (14 u). Members show a gradual change in physical properties and similar chemical properties. Alkanes: $\ce{C_nH_{2n+2}}$; alkenes: $\ce{C_nH_{2n}}$; alkynes: $\ce{C_nH_{2n-2}}$; alcohols: $\ce{C_nH_{2n+1}OH}$.`,
      v: table(['Member', 'Formula', 'Molar mass / g mol⁻¹', 'Difference'], alkRows, 'Table of the first five alkanes with molar masses that rise by 14 each time'),
      n: 'Members of a homologous series have the same functional group and the same general formula, and each differs from the next by one carbon and two hydrogens, a CH two unit with a mass of fourteen. Methane, ethane, propane, butane and pentane show this clearly: sixteen, thirty, forty four, fifty eight and seventy two. Their properties change gradually.',
    }),
    sl('example', 'Worked example: using the general formula', {
      b: r`**Problem.** An alkene in a homologous series has a molar mass of $98\ \text{g mol}^{-1}$ (C = 12, H = 1). Find its formula and the formula of the next member.

**Step 1.** General formula $\ce{C_nH_{2n}}$ gives $M = 12n + 2n = 14n$.

**Step 2.** $14n = 98$, so $n = 7$: the alkene is $\ce{C7H14}$ (heptene).

**Step 3.** The next member adds $\ce{CH2}$: $\ce{C8H16}$, $M = 112$.`,
      v: table(['n', 'Alkene', 'Molar mass'], [['6', 'C₆H₁₂', '84'], ['7', 'C₇H₁₄', '98'], ['8', 'C₈H₁₆', '112']], 'Table of three consecutive alkenes and their molar masses'),
      n: 'For an alkene the molar mass is fourteen times the number of carbon atoms. A molar mass of ninety eight gives seven carbon atoms, so the alkene is heptene with fourteen hydrogens. The next member adds one carbon and two hydrogens, giving a formula with eight carbons and sixteen hydrogens and a molar mass of one hundred and twelve.',
    }),
    sl('check', 'Quick check: homologous series', {
      b: 'Use the general formula and the CH₂ difference to place a compound in a series.',
      n: 'Quick check. Subtract fourteen to move one member down a series, and add fourteen to move one member up.',
      chk: 'homolog-mcq',
    }),
    sl('concept', 'Functional groups', {
      b: 'A **functional group** is an atom or group of atoms that determines the characteristic chemical properties of a compound. Compounds with the same group form a family and react in the same way, whatever the length of the carbon chain.',
      v: V.fgs,
      n: 'A functional group is the part of a molecule that decides how it reacts. Ethanol has the hydroxyl group, ethanal the aldehyde group, propanone the ketone group, ethanoic acid the carboxyl group, ethanamide the amide group and chloroethane a halogen atom. Whatever the chain length, the group brings its own chemistry.',
    }),
    sl('concept', 'Common functional groups', {
      b: 'Learn the group, the class and one example. A double or triple bond between carbon atoms is also treated as a functional group.',
      v: table(['Group', 'Class', 'Example'], [['–OH', 'Alcohol / phenol', 'CH₃CH₂OH'], ['–O–', 'Ether', 'CH₃OCH₃'], ['–CHO', 'Aldehyde', 'CH₃CHO'], ['>C=O', 'Ketone', 'CH₃COCH₃'], ['–COOH', 'Carboxylic acid', 'CH₃COOH'], ['–COOR', 'Ester', 'CH₃COOC₂H₅'], ['–COCl', 'Acid chloride', 'CH₃COCl'], ['–CONH₂', 'Amide', 'CH₃CONH₂'], ['–NH₂', 'Amine', 'CH₃NH₂'], ['–CN', 'Nitrile', 'CH₃CN'], ['–NO₂', 'Nitro compound', 'C₆H₅NO₂'], ['–X (F, Cl, Br, I)', 'Haloalkane', 'CH₃CH₂Br'], ['C=C, C≡C', 'Alkene, alkyne', 'CH₂=CH₂, HC≡CH']], 'Table of functional groups with the class of compound and an example'),
      n: 'Here is the list to know. Hydroxyl gives alcohols and phenols. The oxygen bridge gives ethers. The aldehyde group sits at the end of a chain, while the ketone group sits inside it. Carboxylic acids, esters, acid chlorides and amides all contain a carbonyl group. Then come amines, nitriles, nitro compounds and halogen compounds, and finally the carbon to carbon double and triple bonds.',
    }),
    sl('example', 'Worked example: functional groups in vanillin', {
      b: r`**Problem.** Vanillin, the flavour of vanilla, has the structure shown. Identify its functional groups and classify the compound.

**Answer.** The ring carries three groups: –CHO (aldehyde), –OCH₃ (ether, methoxy) and –OH attached to the ring (phenol). The compound has a benzene ring, so it is **aromatic** and **homocyclic**; the formula is $\ce{C8H8O3}$.`,
      v: V.vanillin,
      n: 'Vanillin has a benzene ring, so it is a homocyclic aromatic compound. Looking at the three groups on the ring, the one at the top is an aldehyde group. Next to it is a methoxy group, which is an ether. Beside that is a hydroxyl group attached directly to the ring, which makes it a phenol.',
    }),
    sl('check', 'Quick check: classifying a structure', {
      b: 'Decide whether a ring compound is alicyclic, aromatic or heterocyclic.',
      n: 'Quick check. Look at what atoms are in the ring, and whether the ring is a benzene type ring.',
      chk: 'class-mcq',
    }),
    sl('summary', 'Summary: Part 1', {
      ul: [
        'The vital force theory fell when Wöhler made urea from ammonium cyanate in 1828.',
        'Tetravalency, catenation, multiple bonding and isomerism explain the huge number of carbon compounds.',
        'Open chain and closed chain; closed chain is homocyclic (alicyclic, aromatic) or heterocyclic.',
        r`Homologous series: same functional group and general formula, successive members differ by $\ce{CH2}$ (14 u).`,
        'A functional group fixes the chemical behaviour of a family of compounds.',
      ],
      v: table(['Term', 'Meaning'], [['Catenation', 'Self-linking of carbon atoms'], ['Heterocyclic', 'Ring contains N, O or S'], ['Aromatic', 'Benzene-type ring'], ['Functional group', 'Group that sets the reactions']], 'Summary table of four key terms from Part 1'),
      n: 'Let us sum up Part 1. Wöhler’s urea ended the vital force theory. Carbon makes so many compounds because of tetravalency, catenation, multiple bonding and isomerism. Compounds are open chain or closed chain, and closed chain compounds are homocyclic or heterocyclic. A homologous series shares a functional group and differs by a CH two unit. Functional groups decide chemical behaviour.',
    }),
    sl('exam-tips', 'Exam tips: Part 1', {
      ul: [
        'When asked why carbon forms many compounds, give all four reasons, not only catenation.',
        'Write Wöhler’s reaction as NH₄CNO → NH₂CONH₂ and name the change as isomerisation.',
        'A heterocyclic ring can be aromatic (pyridine) or alicyclic (tetrahydrofuran).',
        'A functional group definition must mention its effect on chemical properties.',
      ],
      v: table(['Slip', 'Better answer'], [['Benzene is alicyclic', 'Benzene is aromatic'], ['Ketone group at the end of a chain', 'Aldehyde ends a chain; ketone is inside'], ['Homologues differ by CH₃', 'They differ by CH₂']], 'Table of three common slips and corrections'),
      n: 'A few tips. When explaining why carbon forms so many compounds, give all four reasons. Write Wöhler’s reaction correctly and call it an isomerisation. Remember that heterocyclic rings can be aromatic or alicyclic. And in any definition of a functional group, say that it decides the chemical properties.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Introduction, Classification and IUPAC Nomenclature of Organic Compounds — Part 2: Naming aliphatic, alicyclic and aromatic compounds',
  goals: [
    'Apply the IUPAC rules to name open chain compounds with branches, multiple bonds and functional groups',
    'Name alicyclic compounds and number their rings correctly',
    'Name common benzene derivatives, including ortho, meta and para isomers',
    'Write the structure of a compound from its IUPAC name',
  ],
  slides: [
    sl('title', 'Why we need a systematic naming system', {
      b: 'Part 2 — the **IUPAC** (International Union of Pure and Applied Chemistry) system gives every compound one name that shows its structure.',
      v: table(['Common name', 'IUPAC name'], [['Acetone', 'Propanone'], ['Formic acid', 'Methanoic acid'], ['Acetic acid', 'Ethanoic acid'], ['Isopropyl alcohol', 'Propan-2-ol'], ['Toluene', 'Methylbenzene']], 'Table of five common names and their IUPAC names'),
      n: 'Trivial names such as acetone or acetic acid tell us nothing about structure and differ from place to place. The IUPAC system, framed by the International Union of Pure and Applied Chemistry, gives each compound one name from which the structure can be drawn, and each structure one name. That is the skill we practise in this part.',
    }),
    sl('concept', 'Word root, suffix and prefix', {
      b: 'An IUPAC name has a **word root** (carbons in the main chain), a **primary suffix** (ane, ene or yne for the bonds in the chain), a **secondary suffix** (the principal functional group) and **prefixes** (substituents, alphabetical, each with locants).',
      v: table(['Carbons', 'Root', 'Carbons', 'Root'], [['1', 'meth', '6', 'hex'], ['2', 'eth', '7', 'hept'], ['3', 'prop', '8', 'oct'], ['4', 'but', '9', 'non'], ['5', 'pent', '10', 'dec']], 'Table of word roots for chains of one to ten carbons'),
      n: 'A name is built from parts. The word root says how many carbon atoms are in the main chain: meth, eth, prop, but, pent, hex, hept, oct, non and dec. Then comes the primary suffix, ane for single bonds, ene for a double bond and yne for a triple bond. A secondary suffix names the functional group, and prefixes name the branches.',
    }),
    sl('diagram', 'Reading an IUPAC name', {
      b: '**4-ethyl-2-methylheptane**: the longest chain has seven carbons (hept), all single bonds (ane), with a methyl group on C-2 and an ethyl group on C-4. Prefixes follow **alphabetical order** (e before m); locants are separated from words by hyphens.',
      v: V.anatomy,
      n: 'This name tells the whole story. Hept says seven carbon atoms in the longest chain, ane says single bonds only, and the prefixes name a methyl group on carbon two and an ethyl group on carbon four. Notice that ethyl is written before methyl because the prefixes follow alphabetical order, not the order of the numbers.',
    }),
    sl('concept', 'Rules for naming alkanes', {
      b: '**1.** Choose the **longest continuous chain** as parent. **2.** Number it from the end that gives the **lowest locants** to the substituents (first point of difference). **3.** Name each substituent, using di, tri, tetra for repeats. **4.** Write prefixes in **alphabetical order**, ignoring di, tri and tetra. **5.** Join locants with commas and words with hyphens.',
      v: flow('LR', [['a', 'Find the longest chain'], ['b', 'Number for lowest locants'], ['c', 'Name each branch'], ['d', 'Arrange alphabetically and write the name']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Flow chart of four steps for naming an alkane'),
      n: 'Naming an alkane takes four steps. First find the longest continuous chain, which gives the parent name. Second, number it from the end that gives the lowest locants to the branches. Third, name each branch, using di or tri for repeats. Fourth, arrange the branch names alphabetically, ignoring di and tri, and write the name with commas between numbers and hyphens between numbers and words.',
    }),
    sl('concept', 'Alkyl groups as substituents', {
      b: 'An **alkyl group** is an alkane minus one hydrogen. Branched groups have common names that are still accepted, and IUPAC names that number the group from the point of attachment.',
      v: table(['Carbons', 'Group', 'Common name', 'IUPAC name'], [['1', '–CH₃', 'methyl', 'methyl'], ['2', '–CH₂CH₃', 'ethyl', 'ethyl'], ['3', '–CH₂CH₂CH₃', 'n-propyl', 'propyl'], ['3', '–CH(CH₃)₂', 'isopropyl', '1-methylethyl'], ['4', '–C(CH₃)₃', 'tert-butyl', '1,1-dimethylethyl']], 'Table of alkyl groups with common and IUPAC names'),
      n: 'An alkyl group is an alkane that has lost one hydrogen atom. Methyl and ethyl are simple. With three carbon atoms there are two groups: propyl, attached at the end, and isopropyl, attached through the middle carbon, whose systematic name is one methylethyl. The tertiary butyl group has three methyl groups on the attached carbon.',
    }),
    sl('example', 'Worked example: naming a branched alkane', {
      b: r`**Problem.** Name the alkane in the figure ($\ce{C9H20}$).

**Step 1.** Longest chain: six carbons, **hexane**.

**Step 2.** Methyl groups lie on three chain carbons. Numbering from the left gives locants 2, 3, 5; from the right 2, 4, 5. At the first point of difference 3 is lower than 4, so number from the left.

**Step 3.** Three identical groups: **trimethyl**.

**Name: 2,3,5-trimethylhexane.**`,
      v: V.ex1,
      n: 'First pick the longest chain, six carbons, so the parent is hexane. Then compare the two ways of numbering. From the left the methyl groups are on carbons two, three and five. From the right they are on two, four and five. The first point of difference favours three over four, so we number from the left. Three identical groups give trimethyl, so the name is two, three, five trimethylhexane.',
    }),
    sl('check', 'Quick check: naming an alkane', {
      b: 'Choose the longest chain and the lowest locants.',
      n: 'Quick check. Find the longest chain first, then number from the end that gives the lowest locants to the branches.',
      chk: 'longest-mcq',
    }),
    sl('concept', 'Alkenes and alkynes', {
      b: 'The parent chain **must contain the double or triple bond**, even if a longer chain exists without it. Number from the end that gives the multiple bond the **lowest locant**. Use **ene** or **yne** and give the locant of the first carbon of the bond. If both double and triple bonds occur, the name ends in **en-yne** and the lowest set of locants decides; if there is still a tie, the double bond gets the lower number.',
      v: table(['Structure', 'Name', 'Reason'], [['CH₃CH=CHCH₂CH₃', 'pent-2-ene', 'Double bond at C-2, not C-3'], ['CH₃C≡CCH₂CH₃', 'pent-2-yne', 'Triple bond at C-2'], ['CH₂=CHCH₂C≡CCH₃', 'hex-1-en-4-yne', 'Locants 1,4 beat 2,5'], ['CH₂=CHCH(CH₃)₂', '3-methylbut-1-ene', 'Chain must hold C=C']], 'Table of alkenes and alkynes with names and reasons'),
      n: 'For alkenes and alkynes, the parent chain must contain the multiple bond. Number from the end that gives the double or triple bond the lowest number, and give the number of the first carbon of the bond. When both a double and a triple bond are present, the name ends in en yne, and the lowest set of numbers decides the direction of numbering.',
    }),
    sl('concept', 'Principal functional group and suffixes', {
      b: 'When a compound has several groups, the one of **highest priority** is the principal group: it becomes the **suffix** and takes the lowest locant. Every other group is a **prefix**. Halogen, nitro, alkoxy and alkyl groups are **always prefixes**.',
      v: table(['Priority', 'Group', 'Suffix', 'Prefix (when not principal)'], [['1', '–COOH', 'oic acid', 'carboxy'], ['2', '–SO₃H', 'sulphonic acid', 'sulpho'], ['3', '–COOR', 'alkyl oate', 'alkoxycarbonyl'], ['4', '–COCl', 'oyl chloride', 'chlorocarbonyl'], ['5', '–CONH₂', 'amide', 'carbamoyl'], ['6', '–CN', 'nitrile', 'cyano'], ['7', '–CHO', 'al', 'formyl or oxo'], ['8', '>C=O', 'one', 'oxo'], ['9', '–OH', 'ol', 'hydroxy'], ['10', '–NH₂', 'amine', 'amino']], 'Table of functional group priority with suffix and prefix forms'),
      n: 'When a molecule carries more than one group, the group of highest priority becomes the suffix and gets the lowest number. The order runs from carboxylic acid, through sulphonic acid, ester, acid chloride, amide, nitrile, aldehyde and ketone, to alcohol and amine. All other groups are named as prefixes. Halogens, nitro groups and alkoxy groups are always prefixes.',
    }),
    sl('diagram', 'Eight compounds, eight names', {
      b: 'Notice how the suffix changes with the group, and how the **chain is numbered from the end nearest the principal group**. In an aldehyde, acid, amide or nitrile the group carbon is C-1 and needs no locant.',
      v: V.named8,
      n: 'Here are eight compounds. In butan two ol the group is on the second carbon. In an aldehyde, an acid, an amide or a nitrile, the group carbon is always carbon one, so no locant is needed. Chloro and methoxy are prefixes. And in a ketone such as butan two one, the carbonyl carbon gets the lowest number possible.',
    }),
    sl('example', 'Worked example: a compound with two groups', {
      b: r`**Problem.** Name (i) $\ce{CH3CH(OH)CH2CH2COOH}$ and (ii) $\ce{CH2=CHCH2CH2OH}$.

**(i)** The acid group outranks the alcohol. Main chain: five carbons from the carboxyl carbon (C-1). The –OH sits on C-4, as a **hydroxy** prefix: **4-hydroxypentanoic acid**.

**(ii)** The alcohol outranks the double bond. Number so that C-1 carries –OH; the double bond is then on C-3: **but-3-en-1-ol**.`,
      v: V.ex2,
      n: 'In the first compound the carboxylic acid group is the principal group, so the chain is numbered from the carboxyl carbon. The hydroxyl group is on carbon four and is named as a hydroxy prefix, giving four hydroxypentanoic acid. In the second, the alcohol outranks the double bond, so carbon one carries the hydroxyl group and the double bond lies at position three: but three en one ol.',
    }),
    sl('check', 'Quick check: priority of groups', {
      b: 'Decide which group becomes the suffix.',
      n: 'Quick check. Rank the groups in the priority table and name the highest as the suffix.',
      chk: 'priority-mcq',
    }),
    sl('concept', 'Alicyclic compounds', {
      b: 'Add **cyclo** before the name of the alkane with the same number of carbons in the ring. Number the ring so that the **principal group** (or a double bond) gets locant 1 or lowest, then the substituents get the lowest locants; ties are broken **alphabetically**. A single substituent on a ring needs no locant. When the ring has more carbons than the side chain it is the parent.',
      v: V.alicyc,
      n: 'For a ring compound, put cyclo before the alkane name. If there is a principal group such as hydroxyl, it takes position one. A double bond takes positions one and two. Substituents then get the lowest numbers possible, and when there is a tie the group that comes first alphabetically takes number one. A single substituent needs no number.',
    }),
    sl('concept', 'Aromatic compounds: benzene derivatives', {
      b: 'Monosubstituted benzenes are named as **substituent + benzene** (nitrobenzene, chlorobenzene). Several retained common names serve as parents: **toluene, phenol, aniline, benzaldehyde, benzoic acid**. The IUPAC names methylbenzene, benzenamine and so on are also accepted.',
      v: V.benz,
      n: 'A benzene ring with one substituent is named by adding the substituent to benzene, as in nitrobenzene or chlorobenzene. Six common names are kept as parent names: toluene, phenol, aniline, benzaldehyde and benzoic acid, along with nitrobenzene itself. For a second substituent, the ring is numbered from the carbon carrying the principal group.',
    }),
    sl('example', 'Worked example: disubstituted benzenes', {
      b: r`**Positions:** 1,2 = **ortho** (o), 1,3 = **meta** (m), 1,4 = **para** (p). **Numbering:** if one group gives a special parent (phenol, benzoic acid, toluene, aniline), it is C-1. With two ordinary substituents, the one first in alphabetical order gets locant 1, and the other the lowest possible number.

For the three structures: **1,2-dimethylbenzene** (ortho); **1-chloro-3-nitrobenzene** (chloro before nitro); **4-nitrophenol** (OH fixes C-1).`,
      v: V.disub,
      n: 'Ortho means neighbouring carbons, one and two. Meta means one and three. Para means one and four, opposite each other. If a group gives a special parent, such as the hydroxyl in phenol, that carbon is number one. Otherwise the substituent that comes first alphabetically gets number one, so chlorine comes before nitro in one chloro three nitrobenzene.',
    }),
    sl('example', 'Writing a structure from a name', {
      b: '**Problem.** Draw 5-methylhex-2-ene. **Strategy:** (1) the root *hex* gives six carbons; number them; (2) *2-ene* puts a double bond between C-2 and C-3; (3) *5-methyl* attaches CH₃ to C-5; (4) fill hydrogens to make four bonds on each carbon. Finally check that the longest chain containing the double bond is the six carbon chain.',
      v: V.reverse,
      n: 'To go from a name to a structure, work in order. Hex means six carbons in a chain, so draw and number them. Two ene puts the double bond between carbons two and three. Five methyl puts a methyl group on carbon five. Then add hydrogens until every carbon has four bonds, and check that the name you would give the structure is the one you started with.',
    }),
    sl('check', 'Quick check: aromatic names', {
      b: 'Name a benzene derivative and fix its ring numbering.',
      n: 'Quick check. Decide whether a substituent gives a special parent name, and if not, use alphabetical order for locant one.',
      chk: 'arom-mcq',
    }),
    sl('summary', 'Summary: Part 2', {
      ul: [
        'Name = prefixes (alphabetical, with locants) + word root + primary suffix + secondary suffix.',
        'Parent chain: longest chain; for multiple bonds, the chain that contains them; lowest locants at the first point of difference.',
        'The highest-priority group becomes the suffix; halogen, nitro, alkoxy and alkyl groups are prefixes only.',
        'Rings take cyclo; the principal group or double bond is numbered first; ties go alphabetical.',
        'Benzene derivatives: ortho, meta, para or 1,2- 1,3- 1,4-; special parents phenol, aniline, benzoic acid, toluene.',
      ],
      v: table(['Step', 'Question to ask'], [['1', 'Which is the principal group?'], ['2', 'Which is the parent chain or ring?'], ['3', 'Which numbering gives lowest locants?'], ['4', 'Are prefixes in alphabetical order?']], 'Summary table of four questions for naming any organic compound'),
      n: 'To sum up Part 2: every name is built from prefixes, a word root and suffixes. Ask four questions. Which group is the principal group? Which chain or ring is the parent? Which numbering gives the lowest locants? Are the prefixes in alphabetical order? Rings take the cyclo prefix, and benzene derivatives use ortho, meta and para or locants.',
    }),
    sl('exam-tips', 'Exam tips: Part 2', {
      ul: [
        'Draw the full chain and number both ways before you decide the direction.',
        'Write di, tri and tetra in the name but ignore them when ordering prefixes alphabetically.',
        'The principal group, not the longest chain, can decide the parent chain.',
        'Check a finished name by redrawing the structure from it.',
      ],
      v: table(['Slip', 'Fix'], [['2-ethylbutane', 'Longest chain is 5: 3-methylpentane'], ['Methyl before ethyl', 'Alphabetical: ethyl first'], ['Butan-4-ol', 'Number from the –OH end: butan-1-ol']], 'Table of three naming slips and corrections'),
      n: 'Last tips. Number the chain from both ends before deciding. Ignore di and tri when arranging prefixes alphabetically. Let the principal group guide the parent chain. And check your answer by redrawing the structure from the name; if it does not match the original, find the slip.',
    }),
  ],
});
