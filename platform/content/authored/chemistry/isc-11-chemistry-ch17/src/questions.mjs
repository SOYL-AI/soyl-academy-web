// ch17 Introduction, Classification and IUPAC Nomenclature of Organic Compounds — question bank (ISC style).
// Every naming stem has its own context (where the compound is met). AR keys planned: a b c d c b. MCQ keys are placed by the builder.
import { mk, add, r, near } from './lib.mjs';

const { mcq, ar, tf, fill, match, num, short, long } = mk;

// ---------------------------------------------------------------- t01 vital force, importance, why so many compounds
add('wohler-mcq', mcq({
  stem: 'A history-of-science class in Nagpur discusses the experiment that finally convinced chemists that organic compounds need no living organism. The experiment was:',
  right: 'heating ammonium cyanate, an inorganic salt, to obtain urea',
  wrong: ['burning sugar to obtain carbon dioxide and water', 'distilling alcohol from fermented grape juice', 'extracting indigo dye from plant leaves'],
  sol: 'Wöhler (1828) made urea, a product of animal bodies, from the inorganic salt ammonium cyanate in a flask — option (@K). The others only transform or isolate substances that already came from living things (@1, @2, @3).',
  d: 1, c: 'recall', t: [1],
}));
add('cat-mcq', mcq({
  stem: 'A student lists four properties of carbon: (i) tetravalency, (ii) catenation, (iii) a very high electronegativity, (iv) the ability to form double and triple bonds. Which of these explain why carbon forms such a very large number of compounds?',
  right: '(i), (ii) and (iv) only',
  wrong: ['(i), (ii), (iii) and (iv)', '(ii) and (iii) only', '(i) and (iii) only'],
  sol: 'Tetravalency, catenation and multiple bonding (with isomerism) account for the huge number of compounds. Carbon’s electronegativity is only moderate (2.5) and is not a reason — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('count-mcq', mcq({
  stem: 'A chemistry club in Mysuru draws every possible carbon skeleton for the formula C₆H₁₄ using only single bonds and no rings. The number of distinct skeletons they should find is:',
  right: '5',
  wrong: ['3', '4', '6'],
  sol: 'Hexane, 2-methylpentane, 3-methylpentane, 2,2-dimethylbutane and 2,3-dimethylbutane make five chain isomers — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('inorg-mcq', mcq({
  stem: 'Marble, used in the floors of the Taj Mahal, contains carbon. Which of the following carbon-containing substances is still treated as an inorganic compound?',
  right: 'calcium carbonate, CaCO₃',
  wrong: ['urea, CO(NH₂)₂', 'ethanol, C₂H₅OH', 'methane, CH₄'],
  sol: 'Carbonates, carbon oxides and similar simple compounds are classed as inorganic even though they contain carbon — option (@K). Urea, ethanol and methane are organic (@1, @2, @3).',
  d: 2, c: 'understanding', t: [1],
}));
add('wohler-ar', ar({
  a: 'The synthesis of urea from ammonium cyanate in 1828 weakened the vital force theory.',
  r: 'Urea was obtained in a flask from an inorganic salt without the help of any living organism.',
  key: 'a',
  sol: 'Both are true and R explains A: a compound of animal origin was prepared from an inorganic salt, so no vital force was needed — option (a).',
  d: 1, c: 'understanding', t: [1],
}));
add('catenation-ar', ar({
  a: 'Carbon shows a marked tendency for catenation.',
  r: 'Ethanol mixes with water in all proportions.',
  key: 'b',
  sol: 'Both statements are true: the strong C–C bond lets carbon form chains and rings, and ethanol is fully miscible with water. R has no connection with catenation — option (b).',
  d: 2, c: 'understanding', t: [1],
}));
add('urea-tf', tf({
  stem: 'Heating ammonium cyanate gives urea, which is an isomer of ammonium cyanate.',
  key: 't',
  sol: 'True. Both have the molecular formula CH₄N₂O but different structures, so the change is an isomerisation.',
  d: 1, c: 'recall', t: [1],
}));
add('cat-fill', fill({
  stem: 'The tendency of carbon atoms to join one another to form long chains and rings is called ___.',
  acc: [['catenation']],
  sol: '**Catenation.**',
  d: 1, c: 'recall', t: [1],
}));
add('urea-num', num({
  stem: 'In a school demonstration, a student heats 4.80 g of ammonium cyanate (molar mass 60 g mol⁻¹; the molar mass of urea is also 60 g mol⁻¹). If 85% of the salt changes to urea, what mass of urea, in g, is obtained?',
  value: 4.08, tol: 0.01, unit: 'g',
  sol: r`Moles of $\ce{NH4CNO}$ $= 4.80 \div 60 = 0.0800\ \text{mol}$. Urea formed $= 0.0800 \times 0.85 = 0.0680\ \text{mol}$ (the change is 1 : 1). Mass $= 0.0680 \times 60 = 4.08\ \text{g}$.`,
  scheme: [['Moles of salt 0.0800 mol and 85% converted (0.0680 mol)', 0.5], ['Mass of urea = 4.08 g', 0.5]],
  marks: 1,
  d: 2, c: 'application', t: [1],
}), () => near(((4.8 / 60) * 0.85) * 60, 4.08, 0.001) || 'urea mass');
add('importance-short', short({
  marks: 2,
  stem: 'Name two fields in which organic chemistry is important, giving one organic compound or product from each field.',
  model: 'Medicine: paracetamol (analgesic) or penicillin (antibiotic). Fuels: petrol or LPG. Materials: polythene, nylon or rubber. Agriculture: urea or insecticides. Any two fields, each with a correct example.',
  sol: 'Two fields with examples.',
  scheme: [['First field with example', 1], ['Second field with example', 1]],
  d: 1, c: 'recall', t: [1],
}));
add('vital-short', short({
  marks: 2,
  stem: 'State the vital force theory. Write the equation for the reaction that disproved it.',
  model: r`The vital force theory held that organic compounds can be produced only by living organisms, through the influence of a vital force. It was disproved by Wöhler (1828), who heated the inorganic salt ammonium cyanate and obtained urea: $\ce{NH4CNO -> NH2CONH2}$.`,
  sol: 'Theory; Wöhler equation.',
  scheme: [['Statement of the theory', 1], ['NH₄CNO → NH₂CONH₂ (Wöhler)', 1]],
  d: 1, c: 'recall', t: [1],
}));
add('catenation-short', short({
  marks: 2,
  stem: 'Nitrogen and oxygen also form bonds with their own atoms, yet carbon shows far more extensive catenation. Give two reasons for carbon’s behaviour.',
  model: 'Carbon is tetravalent and its C–C bond is very strong and stable, so long chains and rings do not break easily. Bonds between nitrogen atoms (N–N) and between oxygen atoms (O–O) are weak, because of lone pair repulsion, and such chains are unstable. Carbon can also form stable multiple bonds and bonds to many other elements.',
  sol: 'Strong C–C bond; weak N–N and O–O bonds.',
  scheme: [['Strong, stable C–C bond with four valencies', 1], ['N–N and O–O bonds are weak (lone pair repulsion)', 1]],
  d: 3, c: 'understanding', t: [1],
}));
add('why-short', short({
  marks: 3,
  stem: 'More than ten million carbon compounds are known, many more than for all the other elements put together. Explain this with three reasons and one example for each.',
  model: 'Catenation: carbon atoms link into chains, branched chains and rings, as in pentane and cyclopentane. Tetravalency with isomerism: each carbon forms four bonds, so one formula can have many structures, e.g. C₄H₁₀ has two isomers, butane and 2-methylpropane. Multiple bonding: carbon forms double and triple bonds, as in ethene and ethyne. (Strong bonds to H, O, N, S and halogens also add to the variety.)',
  sol: 'Catenation, isomerism, multiple bonding.',
  scheme: [['Catenation with example', 1], ['Tetravalency / isomerism with example', 1], ['Multiple bonding with example', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('wohler-short', short({
  marks: 3,
  stem: 'A newspaper article says that "Wöhler proved that chemists can make anything that nature makes". Explain, with the reaction involved, what Wöhler actually showed, and say why ammonium cyanate and urea are called isomers.',
  model: r`Wöhler showed that urea, a compound until then known only from animal sources, can be made in the laboratory from an inorganic substance, ammonium cyanate, so a vital force is not necessary: $\ce{NH4CNO -> NH2CONH2}$ on heating. This one case removed the belief that organic and inorganic compounds belong to separate worlds. The two compounds have the same molecular formula, $\ce{CH4N2O}$, but a different arrangement of atoms (an ionic salt and a covalent amide), so they are isomers.`,
  sol: 'Showed laboratory synthesis; equation; isomers.',
  scheme: [['What Wöhler showed (synthesis from an inorganic compound)', 1], ['Reaction NH₄CNO → NH₂CONH₂', 1], ['Same molecular formula, different structure: isomers', 1]],
  d: 3, c: 'analysis', t: [1],
}));

// ---------------------------------------------------------------- t02 classification, homologous series, functional groups
add('homolog-mcq', mcq({
  stem: 'A forensic chemist in Pune analyses two alcohols from a sample. The first is propan-1-ol, C₃H₇OH. A second alcohol that is the very next member of the same homologous series has the formula:',
  right: 'C₄H₉OH',
  wrong: ['C₃H₇CH₃', 'C₂H₅OH', 'C₄H₉CHO'],
  sol: 'The next homologue adds one CH₂ group to C₃H₇OH, giving C₄H₉OH — option (@K). C₂H₅OH (@2) is the previous member; the others do not keep the –OH group (@1, @3).',
  d: 1, c: 'understanding', t: [2],
}));
add('class-mcq', mcq({
  stem: 'Thiophene, C₄H₄S, has a five-membered ring of four carbon atoms and one sulphur atom, with alternating double bonds, and it resembles benzene in its chemical behaviour. It is best classified as:',
  right: 'an aromatic heterocyclic compound',
  wrong: ['an alicyclic homocyclic compound', 'an aromatic homocyclic compound', 'an open chain unsaturated compound'],
  sol: 'The ring contains sulphur, so it is heterocyclic; it behaves like benzene, so it is aromatic — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('series-mcq', mcq({
  stem: 'A student sorts a shelf of laboratory reagents. Which pair of compounds belongs to the same homologous series?',
  right: 'CH₃CH₂OH and CH₃CH₂CH₂OH',
  wrong: ['CH₃CH₂OH and CH₃OCH₃', 'CH₃CHO and CH₃COCH₃', 'C₂H₆ and C₂H₄'],
  sol: 'Both alcohols have the –OH group and differ by one CH₂ — option (@K). Ethanol and methoxymethane have different groups (@1); ethanal and propanone are an aldehyde and a ketone (@2); ethane and ethene differ in saturation (@3).',
  d: 2, c: 'understanding', t: [2],
}));
add('formula-mcq', mcq({
  stem: 'Natural gas drilled off the Krishna–Godavari basin contains alkanes, and a nearby laboratory also stores an alkyne with nine carbon atoms per molecule. The molecular formula of this alkyne is:',
  right: 'C₉H₁₆',
  wrong: ['C₉H₂₀', 'C₉H₁₈', 'C₉H₁₄'],
  sol: r`The alkyne series is $\ce{C_nH_{2n-2}}$; for $n = 9$ this gives $\ce{C9H16}$ — option (@K). $\ce{C9H20}$ is the alkane (@1) and $\ce{C9H18}$ the alkene (@2).`,
  d: 1, c: 'understanding', t: [2],
}));
add('aspirin-mcq', mcq({
  stem: 'Aspirin, taken for fever, has a benzene ring carrying a –COOH group and, on the neighbouring carbon, an –OCOCH₃ group. Its two oxygen-containing functional groups are:',
  right: 'carboxylic acid and ester',
  wrong: ['carboxylic acid and ether', 'ketone and alcohol', 'aldehyde and ester'],
  sol: '–COOH is a carboxylic acid; –OCOCH₃ (an acyl group joined to ring oxygen) is an ester — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('ald-mcq', mcq({
  stem: 'Propanal and propanone have the same molecular formula, C₃H₆O. What group is present in propanal but not in propanone?',
  right: 'the aldehyde group, –CHO, at the end of the chain',
  wrong: ['the carbonyl group, >C=O', 'the hydroxyl group, –OH', 'the carboxyl group, –COOH'],
  sol: 'Both contain a carbonyl C=O. In propanal it is part of –CHO at the chain end; in propanone it lies between two carbons — option (@K).',
  d: 1, c: 'understanding', t: [2],
}));
add('hetero-ar', ar({
  a: 'Pyridine is classified as an aromatic heterocyclic compound.',
  r: 'The ring of pyridine contains only carbon atoms.',
  key: 'c',
  sol: 'A is true (a benzene-like ring with one nitrogen atom), but R is false: the ring has five carbons and one nitrogen — option (c).',
  d: 2, c: 'understanding', t: [2],
}));
add('hs-ar', ar({
  a: 'Ethanol and ethoxyethane belong to the same homologous series.',
  r: 'Their molecular formulas differ by one CH₂ group.',
  key: 'd',
  sol: 'A is false: ethanol (–OH) is an alcohol and ethoxyethane (–O–) is an ether, so they have different groups. R is false: C₂H₆O and C₄H₁₀O differ by C₂H₄ — option (d).',
  d: 3, c: 'analysis', t: [2],
}));
add('hs-tf', tf({
  stem: 'Successive members of a homologous series have identical physical properties because they contain the same functional group.',
  key: 'f',
  sol: 'False. They have similar chemical properties, but their physical properties (such as boiling point) change gradually with molar mass.',
  d: 1, c: 'understanding', t: [2],
}));
add('hetero-fill', fill({
  stem: 'A ring that contains one or more atoms of nitrogen, oxygen or sulphur in addition to carbon is called a ___ ring.',
  acc: [['heterocyclic', 'hetero cyclic']],
  sol: '**Heterocyclic.**',
  d: 1, c: 'recall', t: [2],
}));
add('series-match', match({
  stem: 'Match each general formula (n = number of carbon atoms) with the homologous series it represents.',
  pairs: [
    [r`$\ce{C_nH_{2n+2}}$`, 'Alkanes'],
    [r`$\ce{C_nH_{2n}}$`, 'Alkenes'],
    [r`$\ce{C_nH_{2n-2}}$`, 'Alkynes'],
    [r`$\ce{C_nH_{2n+1}OH}$`, 'Alcohols'],
  ],
  order: [3, 0, 2, 1],
  sol: 'Alkanes CₙH₂ₙ₊₂, alkenes CₙH₂ₙ, alkynes CₙH₂ₙ₋₂, alcohols CₙH₂ₙ₊₁OH (one –OH replacing one H of an alkane).',
  d: 1, c: 'recall', t: [2],
}));
add('alkane-num', num({
  stem: 'A gas chromatography sample from a petroleum refinery shows an alkane of molar mass 114 g mol⁻¹ (C = 12, H = 1). How many carbon atoms does one molecule contain?',
  value: 8, tol: 0, unit: null,
  sol: r`For $\ce{C_nH_{2n+2}}$, $M = 12n + 2n + 2 = 14n + 2$. So $14n + 2 = 114$, giving $n = 8$.`,
  scheme: [['Uses M = 14n + 2', 0.5], ['n = 8', 0.5]],
  d: 2, c: 'application', t: [2],
}), () => (114 - 2) / 14 === 8 || 'n');
add('alcohol-num', num({
  stem: r`A perfumery in Kannauj stores a straight-chain alcohol of the series $\ce{C_nH_{2n+1}OH}$ with a molar mass of $130\ \text{g mol}^{-1}$ (C = 12, H = 1, O = 16). Find $n$.`,
  value: 8, tol: 0, unit: null,
  sol: r`$M = 12n + (2n+1) + 16 + 1 = 14n + 18$. So $14n + 18 = 130$ and $n = 8$.`,
  scheme: [['M = 14n + 18', 0.5], ['n = 8', 0.5]],
  d: 2, c: 'application', t: [2],
}), () => (130 - 18) / 14 === 8 || 'n');
add('hs-short', short({
  marks: 2,
  stem: 'State two characteristics of a homologous series, and write the molecular formula of the alkene that is next to C₅H₁₀ in its series.',
  model: 'Members have the same functional group and the same general formula, and each differs from the next by a CH₂ group (14 u); their physical properties vary gradually and their chemical properties are similar. The next alkene is C₆H₁₂.',
  sol: 'Two characteristics; C₆H₁₂.',
  scheme: [['Two characteristics (0.5 each)', 1], ['C₆H₁₂', 1]],
  d: 1, c: 'understanding', t: [2],
}));
add('fg-short', short({
  marks: 2,
  stem: 'A technician tags four reagent bottles with the formulas below. Write the functional group and the class of compound for each: CH₃CH₂CHO, CH₃COOCH₃, CH₃CH₂NH₂ and CH₃CH₂CN.',
  model: 'CH₃CH₂CHO: –CHO, aldehyde. CH₃COOCH₃: –COOR (–COO–), ester. CH₃CH₂NH₂: –NH₂, amine. CH₃CH₂CN: –CN, nitrile.',
  sol: 'Four groups and classes.',
  scheme: [['Aldehyde and ester (0.5 each)', 1], ['Amine and nitrile (0.5 each)', 1]],
  d: 1, c: 'recall', t: [2],
}));
add('class-short', short({
  marks: 2,
  stem: 'In a quiz on ring systems, a team must classify four compounds: cyclohexane, benzene, pyridine and but-1-ene. For each, write whether it is open chain or closed chain, and, if closed, which further class applies.',
  model: 'Cyclohexane: closed chain, homocyclic, alicyclic. Benzene: closed chain, homocyclic, aromatic. Pyridine: closed chain, heterocyclic (nitrogen in the ring), aromatic. But-1-ene: open chain (acyclic), unsaturated.',
  sol: 'Four classifications.',
  scheme: [['Cyclohexane and benzene', 1], ['Pyridine and but-1-ene', 1]],
  d: 2, c: 'application', t: [2],
}));
add('series-short', short({
  marks: 3,
  stem: 'The boiling points of the first four alkanes (approximate, in K) are methane 112, ethane 185, propane 231 and butane 273. Use these data to describe the trend in a homologous series, give the molar mass difference between neighbours, and explain why the chemical behaviour of the four is similar.',
  model: 'Boiling point rises steadily as the chain lengthens (a gradual change in physical property, with larger van der Waals forces between larger molecules). Each member differs from the next by CH₂, a molar mass difference of 14 u (16, 30, 44, 58). The chemical behaviour is similar because all four are alkanes with the same functional group (C–C and C–H single bonds only).',
  sol: 'Trend; 14 u; same group.',
  scheme: [['Boiling point rises gradually along the series', 1], ['Difference of CH₂ = 14 u', 1], ['Same functional group, so similar chemical properties', 1]],
  d: 3, c: 'analysis', t: [2],
}));
add('acid-ester-short', short({
  marks: 3,
  stem: 'Propanoic acid and methyl ethanoate are both C₃H₆O₂ and are found in the same laboratory cupboard. Identify the functional group of each, state the class of compound, and say why one formula can represent two different classes.',
  model: 'Propanoic acid, CH₃CH₂COOH, contains the carboxyl group –COOH (carboxylic acid). Methyl ethanoate, CH₃COOCH₃, contains the ester group –COOR (ester). The same atoms can be joined in different ways (isomerism), giving different functional groups with different properties.',
  sol: 'Acid group; ester group; same formula, different arrangement.',
  scheme: [['Propanoic acid: –COOH, carboxylic acid', 1], ['Methyl ethanoate: –COO– (ester)', 1], ['Same formula, different arrangement: isomerism', 1]],
  d: 3, c: 'analysis', t: [2],
}));
add('classify-short', short({
  marks: 3,
  stem: 'Classify each of these as open chain, alicyclic, aromatic or heterocyclic, giving the reason: (i) CH₃CH₂CH=CH₂ in a gas cylinder, (ii) cyclopentane in a solvent bottle, (iii) a ring of five carbons and one oxygen in tetrahydropyran, an ether used in synthesis.',
  model: '(i) But-1-ene is open chain (no ring), unsaturated. (ii) Cyclopentane is alicyclic (a homocyclic ring of carbon atoms that behaves like an aliphatic compound). (iii) Tetrahydropyran is heterocyclic (oxygen in the ring) and alicyclic (saturated ring, no benzene-type character).',
  sol: 'Three classifications with reasons.',
  scheme: [['(i) open chain with reason', 1], ['(ii) alicyclic with reason', 1], ['(iii) heterocyclic (oxygen in ring) and alicyclic', 1]],
  d: 2, c: 'application', t: [2],
}));
add('hs-long', long({
  stem: '(a) Define a homologous series and give two of its characteristics. [2]\n\n(b) A student places the following six compounds in groups by functional group and ring type: CH₃CH₂OH, CH₃CH₂CH₂OH, benzene, cyclohexane, CH₃CHO and CH₃CH₂CHO. Form three pairs, say which two compounds in each pair are in the same class, and state, for each of the two ring compounds, whether it is alicyclic or aromatic. [3]',
  model: '(a) A homologous series is a family of compounds with the same functional group and general formula, in which each member differs from the next by a CH₂ group. Characteristics: gradual change in physical properties; similar chemical properties; preparation by similar methods. (b) Pair 1: ethanol and propan-1-ol, both alcohols (homologues, –OH). Pair 2: ethanal and propanal, both aldehydes (–CHO). Pair 3: benzene and cyclohexane, both homocyclic rings, but cyclohexane is alicyclic and benzene is aromatic.',
  sol: 'Definition and characteristics; pairs and ring types.',
  scheme: [['(a) definition', 1], ['(a) two characteristics', 1], ['(b) alcohol pair and aldehyde pair', 1], ['(b) benzene and cyclohexane as ring pair', 1], ['(b) alicyclic and aromatic labels', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('paracetamol-long', long({
  stem: 'Paracetamol, a common fever tablet, has a benzene ring carrying an –OH group and an –NHCOCH₃ group on opposite (1,4) carbons; its molecular formula is C₈H₉NO₂.\n\n(a) Name the two functional groups present. [2]\n\n(b) Classify the compound by its carbon skeleton (open or closed chain, and the further class), giving the reason. [1]\n\n(c) A related compound, ethanamide, has the formula CH₃CONH₂. By how many CH₂ units, if any, do ethanamide and propanamide differ, and are they in the same homologous series? [2]',
  model: '(a) Phenolic –OH (a hydroxyl group on the ring) and the amide group (–NHCO–, a substituted amide). (b) Closed chain, homocyclic and aromatic, because it has a benzene ring. (c) Propanamide, CH₃CH₂CONH₂, has one more CH₂ than ethanamide. Both contain the amide group –CONH₂ and differ by one CH₂, so they are in the same homologous series (amides).',
  sol: 'Groups; class; homologues.',
  scheme: [['(a) phenol –OH', 1], ['(a) amide group', 1], ['(b) aromatic homocyclic with reason', 1], ['(c) one CH₂ difference', 1], ['(c) same series (amides)', 1]],
  d: 3, c: 'application', t: [2],
}));
add('vital-long', long({
  stem: '(a) Describe the vital force theory and state how Wöhler’s experiment of 1828 led to its rejection. [2]\n\n(b) Carbon compounds outnumber the compounds of all the other elements. State and explain three reasons, using a different example for each. [3]',
  model: r`(a) The theory held that organic compounds are formed only in living organisms under the influence of a vital force. Wöhler heated ammonium cyanate, an inorganic salt, and got urea, $\ce{NH4CNO -> NH2CONH2}$, so a compound of animal origin was made without any living system. (b) Catenation: carbon atoms bond to each other in long chains and rings (octane, cyclohexane). Multiple bonding: carbon forms double and triple bonds (ethene, ethyne). Isomerism: one formula fits many structures (C₅H₁₂: pentane, 2-methylbutane, 2,2-dimethylpropane). Tetravalency lets each carbon bond to four atoms, which makes all this possible.`,
  sol: 'Theory and its rejection; three reasons.',
  scheme: [['(a) theory stated', 1], ['(a) Wöhler reaction and conclusion', 1], ['(b) catenation with example', 1], ['(b) multiple bonding with example', 1], ['(b) isomerism with example', 1]],
  d: 2, c: 'understanding', t: [1],
}));

// ---------------------------------------------------------------- t03 IUPAC nomenclature
add('longest-mcq', mcq({
  stem: 'A hydrocarbon blended into a lubricant has the structure CH₃CH₂CH(CH₃)CH₂CH₂CH₃. Its IUPAC name is:',
  right: '3-methylhexane',
  wrong: ['4-methylhexane', '2-ethylpentane', '3-ethylpentane'],
  sol: 'The longest chain has six carbons (hexane). The methyl group is on C-3 when numbered from the left and C-4 from the right, so the lower locant is 3 — option (@K). Wrong numbering gives (@1); a shorter parent chain gives (@2) and (@3).',
  d: 2, c: 'application', t: [3],
}));
add('priority-mcq', mcq({
  stem: 'A flavour chemist studies a compound that has both a –CHO group and an –OH group on a four-carbon chain: CH₃CH(OH)CH₂CHO. In its IUPAC name the suffix and the prefix are, respectively:',
  right: '–al and hydroxy',
  wrong: ['–ol and formyl', '–one and hydroxy', '–al and oxo'],
  sol: 'The aldehyde group has a higher priority than the alcohol, so it gives the suffix –al; –OH becomes the prefix hydroxy: 3-hydroxybutanal — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('arom-mcq', mcq({
  stem: 'A dye intermediate in a Surat factory is a benzene ring with a –CH₃ group and a –NO₂ group on adjacent carbons. Its IUPAC name is:',
  right: '1-methyl-2-nitrobenzene',
  wrong: ['1-methyl-3-nitrobenzene', '1-methyl-4-nitrobenzene', '2-methyl-1-nitrobenzene'],
  sol: 'Adjacent carbons are ortho (1,2). Methyl comes before nitro alphabetically, so it takes locant 1: 1-methyl-2-nitrobenzene — option (@K). (@1) is meta and (@2) is para; (@3) numbers the wrong group as 1.',
  d: 2, c: 'application', t: [3],
}));
add('alk2-mcq', mcq({
  stem: 'A student working on a petrol additive writes the structure (CH₃)₂CHCH₂CH(CH₃)CH₂CH₃. The correct IUPAC name is:',
  right: '2,4-dimethylhexane',
  wrong: ['3,5-dimethylhexane', '2-ethyl-4-methylpentane', '2,4-methylhexane'],
  sol: 'The longest chain has six carbons. Numbering from the end nearest the first methyl gives 2,4; the other end gives 3,5, which is higher. Two methyl groups need "di" — option (@K).',
  d: 3, c: 'application', t: [3],
}));
add('alkene-mcq', mcq({
  stem: 'An unsaturated hydrocarbon in a plastics laboratory has the structure CH₃CH=CHCH(CH₃)CH₃. Its IUPAC name is:',
  right: '4-methylpent-2-ene',
  wrong: ['2-methylpent-3-ene', '4-methylpent-3-ene', '1,1-dimethylbut-2-ene'],
  sol: 'The five-carbon chain contains the double bond. Numbering from the left puts the double bond on C-2 (from the right it would be C-3), and the methyl group is then on C-4 — option (@K).',
  d: 3, c: 'application', t: [3],
}));
add('alkyne-mcq', mcq({
  stem: 'A research student isolates a compound of structure CH₃C≡CCH(CH₃)CH₂CH₃. Its IUPAC name is:',
  right: '4-methylhex-2-yne',
  wrong: ['3-methylhex-4-yne', '4-methylhex-3-yne', '2-ethylpent-3-yne'],
  sol: 'The six-carbon chain includes the triple bond; numbering from the left gives the triple bond the locant 2 (from the right it would be 4), so the methyl group is on C-4 — option (@K).',
  d: 3, c: 'application', t: [3],
}));
add('prio2-mcq', mcq({
  stem: 'A fragrance intermediate has the structure CH₃COCH₂CH₂OH, with a ketone and an alcohol group on a four-carbon chain. The correct IUPAC name is:',
  right: '4-hydroxybutan-2-one',
  wrong: ['3-oxobutan-1-ol', '1-hydroxybutan-3-one', '4-oxobutan-2-ol'],
  sol: 'A ketone ranks above an alcohol, so the ketone gives the suffix and gets the lowest locant (2); –OH is the prefix hydroxy on C-4 — option (@K). (@1) uses the alcohol as the principal group.',
  d: 4, c: 'analysis', t: [3],
}));
add('acid-mcq', mcq({
  stem: 'A student chlorinates butanoic acid in a project and obtains CH₃CH₂CH(Cl)COOH. Its IUPAC name is:',
  right: '2-chlorobutanoic acid',
  wrong: ['3-chlorobutanoic acid', '1-chlorobutanoic acid', '2-chlorobutan-1-oic acid'],
  sol: 'The carboxyl carbon is C-1, so the carbon bearing chlorine is C-2: 2-chlorobutanoic acid — option (@K). Locant 1 is already the acid carbon, and "1-oic" is never written.',
  d: 2, c: 'application', t: [3],
}));
add('ether-mcq', mcq({
  stem: 'Ethers are used as solvents in organic laboratories. The IUPAC name of CH₃OCH₂CH₂CH₃ is:',
  right: '1-methoxypropane',
  wrong: ['2-methoxypropane', 'propoxymethane', '3-methoxypropane'],
  sol: 'Ethers are named as alkoxyalkanes: the longer alkyl chain is the parent (propane) and the shorter one with oxygen is the alkoxy prefix (methoxy), attached at C-1 — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('ring-mcq', mcq({
  stem: 'A six-membered ring has a double bond and an –OH group; the –OH is on the carbon next to a double-bonded carbon. The correct IUPAC name is:',
  right: 'cyclohex-2-en-1-ol',
  wrong: ['3-hydroxycyclohexene', 'cyclohex-1-en-6-ol', 'cyclohex-3-en-1-ol'],
  sol: 'The alcohol is the principal group, so C-1 carries –OH and the ring is numbered towards the double bond, which then lies between C-2 and C-3 — option (@K).',
  d: 3, c: 'application', t: [3],
}));
add('phenolacid-mcq', mcq({
  stem: 'A food-preservative chemist works with a benzene ring that carries a –COOH group and, on the carbon opposite to it, an –OH group. The IUPAC name is:',
  right: '4-hydroxybenzoic acid',
  wrong: ['4-carboxyphenol', '3-hydroxybenzoic acid', '1-hydroxy-4-benzoic acid'],
  sol: 'The carboxylic acid outranks the phenol, so benzoic acid is the parent (C-1 carries –COOH) and –OH is the prefix hydroxy on the para carbon (C-4) — option (@K).',
  d: 3, c: 'application', t: [3],
}));
add('prefix-ar', ar({
  a: 'HOCH₂CH₂COOH is named 3-hydroxypropanoic acid.',
  r: 'In IUPAC nomenclature an alcohol group has a higher priority than a carboxylic acid group.',
  key: 'c',
  sol: 'A is true: the acid group is the principal group (C-1) and –OH is the 3-hydroxy prefix. R is false: the carboxylic acid ranks above the alcohol — option (c).',
  d: 3, c: 'analysis', t: [3],
}));
add('benz-ar', ar({
  a: '1-Chloro-3-nitrobenzene has the chloro group written before the nitro group.',
  r: 'Benzene was first isolated by Michael Faraday in 1825.',
  key: 'b',
  sol: 'Both statements are true (prefixes follow alphabetical order, chloro before nitro; Faraday isolated benzene in 1825), but R has nothing to do with the order of prefixes — option (b).',
  d: 2, c: 'understanding', t: [3],
}));
add('name-tf', tf({
  stem: 'The IUPAC name of CH₃CH(CH₃)CH₂CH₃, a component of a camping-stove fuel, is 3-methylbutane.',
  key: 'f',
  sol: 'False. Numbered from the end nearer the branch, the methyl group is on C-2: the name is 2-methylbutane.',
  d: 2, c: 'application', t: [3],
}));
add('meta-fill', fill({
  stem: 'Two substituents on carbons 1 and 3 of a benzene ring are said to be in the ___ position.',
  acc: [['meta', 'm']],
  sol: '**Meta** (ortho is 1,2 and para is 1,4).',
  d: 1, c: 'recall', t: [3],
}));
add('suffix-match', match({
  stem: 'Match each IUPAC ending in a compound name with the class of compound it shows.',
  pairs: [
    ['–oic acid', 'Carboxylic acid'],
    ['–one', 'Ketone'],
    ['–nitrile', 'Cyanide (nitrile)'],
    ['–amide', 'Acid amide'],
  ],
  order: [0, 3, 1, 2],
  sol: '–oic acid is a carboxylic acid; –one a ketone; –nitrile a nitrile (–CN); –amide an acid amide (–CONH₂).',
  d: 1, c: 'recall', t: [3],
}));
add('prefix-short', short({
  marks: 2,
  stem: 'A student names the fuel component (CH₃)₂CHCH₂CH₃ as "3-methylbutane". State the error and write the correct IUPAC name.',
  model: 'The chain was numbered from the wrong end. The longest chain has four carbons, and the methyl group must get the lowest locant, 2 and not 3. The correct name is 2-methylbutane.',
  sol: 'Wrong end; 2-methylbutane.',
  scheme: [['Numbered from the wrong end (lowest locant rule)', 1], ['2-methylbutane', 1]],
  d: 2, c: 'application', t: [3],
}));
add('alkane-short', short({
  marks: 2,
  stem: 'Two components of a petrol sample have the structures (i) CH₃CH₂CH(CH₃)CH₂CH₃ and (ii) CH₃C(CH₃)₂CH₂CH₃. Write their IUPAC names.',
  model: '(i) 3-methylpentane (longest chain five carbons, methyl on the middle carbon). (ii) 2,2-dimethylbutane (longest chain four carbons, two methyl groups on C-2).',
  sol: 'Names of the two alkanes.',
  scheme: [['3-methylpentane', 1], ['2,2-dimethylbutane', 1]],
  d: 2, c: 'application', t: [3],
}));
add('draw-short', short({
  marks: 2,
  stem: 'A student is asked to write the condensed structural formulae of (i) 2,3-dimethylbutane and (ii) pent-1-yne.',
  model: '(i) CH₃CH(CH₃)CH(CH₃)CH₃ (a four-carbon chain with methyl groups on C-2 and C-3). (ii) CH≡CCH₂CH₂CH₃ (five-carbon chain with the triple bond between C-1 and C-2).',
  sol: 'Two condensed formulae.',
  scheme: [['2,3-dimethylbutane', 1], ['pent-1-yne', 1]],
  d: 2, c: 'application', t: [3],
}));
add('names3-short', short({
  marks: 3,
  stem: 'Write the IUPAC names of (i) CH₃CH(OH)CH₂CHO, (ii) CH₃CH₂CH(NH₂)CH₃ and (iii) ClCH₂CH₂COOH, which a student found in three old lab notes.',
  model: '(i) 3-hydroxybutanal (aldehyde is the principal group, C-1; –OH is a hydroxy prefix on C-3). (ii) Butan-2-amine (amine group on C-2 of a four-carbon chain). (iii) 3-chloropropanoic acid (acid carbon is C-1; chlorine on C-3).',
  sol: 'Three names.',
  scheme: [['3-hydroxybutanal', 1], ['butan-2-amine', 1], ['3-chloropropanoic acid', 1]],
  d: 3, c: 'application', t: [3],
}));
add('rules-short', short({
  marks: 3,
  stem: 'A student writes "2-ethyl-3-methylhexane" for CH₃CH(C₂H₅)CH(CH₃)CH₂CH₂CH₃. Count the carbons in the longest chain of this structure, give the correct name, and say which IUPAC rule the student broke.',
  model: 'The longest chain runs through the ethyl group and has seven carbons: CH₃–CH₂–CH(CH₃)–CH(CH₃)–CH₂–CH₂–CH₃. Numbering from the end nearer the branches gives methyl groups on C-3 and C-4: 3,4-dimethylheptane (the lowest locants 3,4 against 4,5 from the other end). The student broke the rule that the parent chain is the longest continuous chain (they chose a six-carbon chain).',
  sol: '7 carbons; 3,4-dimethylheptane; longest-chain rule.',
  scheme: [['Longest chain has 7 carbons', 1], ['3,4-dimethylheptane', 1], ['Parent chain not the longest continuous chain', 1]],
  d: 4, c: 'analysis', t: [3],
}));
add('alicyc-short', short({
  marks: 3,
  stem: 'Write the IUPAC name of each ring compound used as a solvent or an intermediate: (i) a cyclopentane ring with –Cl and –CH₃ on neighbouring carbons, (ii) a cyclohexene ring with a –CH₃ group on the carbon next to the double bond, (iii) cyclohexane carrying a single –CH₂CH₃ group.',
  model: '(i) 1-chloro-2-methylcyclopentane (chloro comes first alphabetically, so it takes locant 1). (ii) 3-methylcyclohexene (the double bond is C-1=C-2, so the methyl group is on C-3). (iii) Ethylcyclohexane (a single substituent needs no locant).',
  sol: 'Three ring names.',
  scheme: [['1-chloro-2-methylcyclopentane', 1], ['3-methylcyclohexene', 1], ['ethylcyclohexane', 1]],
  d: 3, c: 'application', t: [3],
}));
add('benz-short', short({
  marks: 3,
  stem: 'Write the IUPAC (or retained) name of each benzene derivative made in a dyestuff workshop: (i) –CH₃ and –CH₃ on carbons 1 and 4, (ii) –OH and –CH₃ on neighbouring carbons, (iii) –NH₂ and –Cl on carbons 1 and 3 of the ring.',
  model: '(i) 1,4-dimethylbenzene (p-xylene). (ii) 2-methylphenol (o-cresol), with phenol as the parent so –OH is C-1. (iii) 3-chloroaniline, with aniline as the parent so –NH₂ is C-1.',
  sol: 'Three benzene derivatives.',
  scheme: [['1,4-dimethylbenzene', 1], ['2-methylphenol', 1], ['3-chloroaniline', 1]],
  d: 3, c: 'application', t: [3],
}));
add('calc-short', short({
  marks: 3,
  stem: 'A hydrocarbon from the alkane series in a lighter fuel has a vapour density of 36 (relative to hydrogen = 1; C = 12, H = 1). Find its molecular formula, and write the IUPAC names of two of its chain isomers.',
  model: r`$M = 2 \times 36 = 72$ g mol⁻¹. For $\ce{C_nH_{2n+2}}$, $14n + 2 = 72$ so $n = 5$ and the formula is $\ce{C5H12}$. Two chain isomers: 2-methylbutane, CH₃CH(CH₃)CH₂CH₃, and 2,2-dimethylpropane, C(CH₃)₄ (the third is straight-chain pentane).`,
  sol: 'C₅H₁₂ = 72; isomers.',
  scheme: [['M = 72', 0.5], ['n = 5, C₅H₁₂', 1], ['Two isomers named correctly', 1.5]],
  d: 3, c: 'application', t: [2, 3],
}), () => 2 * 36 === 72 && (72 - 2) / 14 === 5 || 'vd');
add('alkane-long', long({
  stem: '(a) State any four rules used to name an open chain alkane by the IUPAC system. [2]\n\n(b) Write the IUPAC names of (i) CH₃CH₂C(CH₃)₂CH₂CH₂CH₃, (ii) CH₂=C(CH₃)CH₂CH₃ and (iii) CH₃CH(Cl)CH₂CHO. [3]',
  model: '(a) (1) Select the longest continuous chain as the parent. (2) Number it from the end that gives the lowest locants to the substituents (first point of difference). (3) Use di, tri, tetra for repeated groups, with a locant for each. (4) Arrange the prefixes alphabetically, ignoring di, tri, tetra. (5) Use commas between numbers and hyphens between numbers and words. (b) (i) 3,3-dimethylhexane. (ii) 2-methylbut-1-ene (chain must contain the double bond, at C-1). (iii) 3-chlorobutanal (aldehyde is C-1; chloro prefix on C-3).',
  sol: 'Rules; three names.',
  scheme: [['(a) any four rules (0.5 each)', 2], ['(b)(i) 3,3-dimethylhexane', 1], ['(b)(ii) 2-methylbut-1-ene', 1], ['(b)(iii) 3-chlorobutanal', 1]],
  d: 3, c: 'application', t: [3],
}));
add('priority-long', long({
  stem: '(a) Arrange the following groups in decreasing order of priority for choosing the principal functional group: –OH, –CHO, –COOH, –NH₂, >C=O. [2]\n\n(b) Write the IUPAC names of (i) CH₃CH(OH)CH₂COOH, (ii) NCCH₂CH₂COOH and (iii) CH₃COCH₂CH₂CHO. [3]',
  model: '(a) –COOH > –CHO > >C=O > –OH > –NH₂. (b) (i) 3-hydroxybutanoic acid (acid is the suffix; –OH is hydroxy). (ii) 3-cyanopropanoic acid (the acid outranks the nitrile, which becomes the cyano prefix). (iii) 4-oxopentanal (aldehyde outranks ketone; C-1 is the –CHO carbon; the ketone is the oxo prefix on C-4).',
  sol: 'Order; three polyfunctional names.',
  scheme: [['(a) –COOH first, –NH₂ last', 1], ['(a) –CHO > >C=O > –OH in the middle', 1], ['(b)(i) 3-hydroxybutanoic acid', 1], ['(b)(ii) 3-cyanopropanoic acid', 1], ['(b)(iii) 4-oxopentanal', 1]],
  d: 3, c: 'analysis', t: [3],
}));
add('benz-long', long({
  stem: '(a) Name each benzene derivative: (i) –COOH and –NO₂ on carbons 1 and 3, (ii) –OH and –CH₃ on carbons 1 and 2, (iii) –Br and –CH₃ on carbons 1 and 4. [3]\n\n(b) Describe how to write the structure of 1-ethyl-2-methylcyclopentane, and say why the ethyl group takes locant 1 in the name. [2]',
  model: '(a) (i) 3-nitrobenzoic acid (benzoic acid is the parent, –COOH is C-1). (ii) 2-methylphenol (o-cresol). (iii) 1-bromo-4-methylbenzene (p-bromotoluene; bromo before methyl alphabetically). (b) Draw a five-membered carbon ring, attach –CH₂CH₃ to one ring carbon (C-1) and –CH₃ to the neighbouring ring carbon (C-2), and fill hydrogens. Ethyl takes locant 1 because the locant sets {1,2} are equal either way, and ethyl comes before methyl alphabetically.',
  sol: 'Three names; ring structure and alphabetical rule.',
  scheme: [['(a)(i) 3-nitrobenzoic acid', 1], ['(a)(ii) 2-methylphenol', 1], ['(a)(iii) 1-bromo-4-methylbenzene', 1], ['(b) ring with ethyl at C-1 and methyl at C-2', 1], ['(b) alphabetical tie-break', 1]],
  d: 3, c: 'application', t: [3],
}));
add('ethergrp-mcq', mcq({
  stem: 'Diethyl ether, once used as an anaesthetic in hospital theatres, has the formula C₂H₅OC₂H₅. The functional group in its molecule is:',
  right: '–O– (ether linkage)',
  wrong: ['–OH (hydroxyl)', '>C=O (carbonyl)', '–COOR (ester)'],
  sol: 'An oxygen atom bonded to two alkyl groups is the ether group, –O– — option (@K). There is no H on oxygen (@1) and no C=O (@2, @3).',
  d: 1, c: 'recall', t: [2],
}));
add('ring2-mcq', mcq({
  stem: 'A solvent blend contains a cyclohexane ring carrying two methyl groups on carbons that are separated by one ring carbon (a 1,3 relationship). Its IUPAC name is:',
  right: '1,3-dimethylcyclohexane',
  wrong: ['1,5-dimethylcyclohexane', '2,4-dimethylcyclohexane', '1,3-methylcyclohexane'],
  sol: 'Two identical substituents get the lowest locants, 1 and 3 (the other direction gives 1,5), and "di" is needed — option (@K).',
  d: 2, c: 'application', t: [3],
}));
