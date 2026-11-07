// ICSE 10 Chemistry ch13 Organic Chemistry: Introduction, Structure, Isomerism and Nomenclature — question bank (ICSE
// 2027 specimen style: objective items, 1-mark names/structures, bracket completions, matches and 10-mark structured
// questions). Stems name their own compounds and data. MCQ keys are placed by the builder; AR keys planned: d a c b a.
import { mk, add, r } from './lib.mjs';

const { mcq, ar, tf, fill, match, num, short, long } = mk;

// ---------------------------------------------------------------- t01 unique nature of carbon
add('tetra-mcq', mcq({
  stem: 'Carbon (atomic number 6) forms four covalent bonds in methane, CH₄. This is because a carbon atom:',
  right: 'has four valence electrons and shares all four of them to complete its octet',
  wrong: ['loses four electrons to form a C⁴⁺ ion', 'gains four electrons to form a C⁴⁻ ion', 'has four shells of electrons'],
  sol: 'Configuration 2, 4: losing or gaining four electrons needs too much energy, so carbon shares its four valence electrons — option (@K).',
  d: 1, c: 'understanding', t: [1],
}));
add('catenation-mcq', mcq({
  stem: 'In pentane, CH₃–CH₂–CH₂–CH₂–CH₃, five carbon atoms are bonded directly to one another in a chain. This ability of carbon atoms to link with each other is called:',
  right: 'catenation',
  wrong: ['tetravalency', 'isomerism', 'allotropy'],
  sol: 'Self-linking of carbon atoms into chains and rings is catenation — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('triple-mcq', mcq({
  stem: 'How many electrons in total are shared between the two carbon atoms of ethyne, H–C≡C–H?',
  right: 'Six',
  wrong: ['Two', 'Three', 'Four'],
  sol: 'A triple bond is three shared pairs, that is six electrons — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('tetra-ar', ar({
  a: 'Carbon readily forms C⁴⁻ ions in its compounds.',
  r: 'A carbon atom has four electrons in its outermost shell.',
  key: 'b',
  sol: 'A is false: a nucleus with six protons cannot easily hold ten electrons, so carbon shares electrons instead. R is true (configuration 2, 4) — option (b).',
  d: 2, c: 'understanding', t: [1],
}));
add('ionic-tf', tf({
  stem: 'Methane, CH₄, conducts electricity when liquefied, because the bonds in it are ionic.',
  key: 'f',
  sol: 'False: the C–H bonds in methane are covalent; liquid methane contains molecules, not ions, so it does not conduct.',
  d: 1, c: 'understanding', t: [1],
}));
add('tetra-fill', fill({
  stem: 'The property of carbon by which each of its atoms forms four covalent bonds is called ___.',
  acc: [['tetravalency', 'tetravalence']],
  sol: '**Tetravalency**: carbon (2, 4) shares its four valence electrons.',
  d: 1, c: 'recall', t: [1],
}));
add('config-short1', short({
  marks: 1,
  stem: 'Write the electronic configuration of carbon (atomic number 6) and state the number of covalent bonds that one carbon atom forms.',
  model: 'Carbon: 2, 4. It forms four covalent bonds (it is tetravalent).',
  sol: '2, 4; four bonds.',
  scheme: [['Configuration and four bonds', 1]],
  d: 1, c: 'recall', t: [1],
}));
add('catenation-short1', short({
  marks: 1,
  stem: 'Define catenation.',
  model: 'Catenation is the property of atoms of an element (especially carbon) of linking with one another by covalent bonds to form long chains, branched chains or rings.',
  sol: 'Definition.',
  scheme: [['Self-linking into chains or rings', 1]],
  d: 1, c: 'recall', t: [1],
}));
add('unique-short2', short({
  marks: 2,
  stem: 'A carbon atom forms neither a C⁴⁺ ion nor a C⁴⁻ ion. Give a reason why it does not (a) lose four electrons; (b) gain four electrons.',
  model: '(a) Removing four electrons would need a very large amount of energy, and a C⁴⁺ ion (six protons holding only two electrons) would be very unstable. (b) A nucleus of six protons cannot hold ten electrons firmly; adding four electrons needs a lot of energy because of strong repulsion between them. So carbon shares its electrons instead.',
  sol: 'Energy needed in both cases; sharing instead.',
  scheme: [['(a)', 1], ['(b)', 1]],
  d: 2, c: 'understanding', t: [1],
}));

// ---------------------------------------------------------------- t02 straight, branched and cyclic chains
add('branch-mcq', mcq({
  stem: 'The carbon chain in CH₃–CH(CH₃)–CH₂–CH₃ is:',
  right: 'a branched chain',
  wrong: ['a straight chain', 'a closed chain (ring)', 'a chain containing a double bond'],
  sol: 'The second carbon is joined to three other carbon atoms, so a side chain is present — option (@K).',
  d: 1, c: 'application', t: [2],
}));
add('benzene-mcq', mcq({
  stem: 'In the Kekulé structure of benzene, C₆H₆, each carbon atom is joined to:',
  right: 'two carbon atoms and one hydrogen atom, with single and double bonds alternating round the ring',
  wrong: ['three carbon atoms and no hydrogen atom', 'two carbon atoms and two hydrogen atoms, with single bonds only', 'one carbon atom and three hydrogen atoms'],
  sol: 'Six carbon atoms form a hexagon of alternate single and double bonds; each carries one hydrogen, giving C₆H₆ — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('cyclic-tf', tf({
  stem: 'Every carbon atom in benzene, C₆H₆, is bonded to exactly one hydrogen atom.',
  key: 't',
  sol: 'True: six carbon atoms and six hydrogen atoms; each ring carbon carries one hydrogen and uses its other three bonds in the ring (one single and one double bond).',
  d: 1, c: 'recall', t: [2],
}));
add('benzene-short1', short({
  marks: 1,
  stem: 'Draw the structural formula of benzene.',
  model: 'A flat hexagonal ring of six carbon atoms joined by alternate single and double bonds (C=C, C–C, C=C, C–C, C=C, C–C), with one hydrogen atom bonded to each carbon atom.',
  sol: 'Hexagon with alternate double bonds; six H.',
  scheme: [['Ring with alternate double bonds and six H', 1]],
  d: 1, c: 'recall', t: [2],
}));
add('classify-short1', short({
  marks: 1,
  stem: 'State whether the carbon chain in (CH₃)₂CH–CH₂–CH₃ is straight, branched or cyclic. Give a reason.',
  model: 'Branched: the second carbon atom (the CH) is bonded to three other carbon atoms. (The compound is 2-methylbutane.)',
  sol: 'Branched.',
  scheme: [['Branched, with the reason', 1]],
  d: 2, c: 'application', t: [2],
}));

// ---------------------------------------------------------------- t03 hydrocarbons and structural formulae
add('formula-mcq', mcq({
  stem: 'A straight-chain hydrocarbon has four carbon atoms and one carbon–carbon triple bond. Its molecular formula is:',
  right: 'C₄H₆',
  wrong: ['C₄H₈', 'C₄H₁₀', 'C₄H₄'],
  sol: 'Alkyne CₙH₂ₙ₋₂ with n = 4 gives C₄H₆ (but-1-yne or but-2-yne) — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('saturated-mcq', mcq({
  stem: 'Pent-2-ene, CH₃–CH=CH–CH₂–CH₃, is described as an unsaturated hydrocarbon because it:',
  right: 'contains a carbon–carbon double bond',
  wrong: ['contains five carbon atoms', 'contains only carbon and hydrogen', 'has a branched chain'],
  sol: 'Unsaturated means at least one C=C or C≡C bond — option (@K).',
  d: 1, c: 'understanding', t: [3],
}));
add('condensed-mcq', mcq({
  stem: 'The hydrocarbon with the condensed formula CH₃–C≡C–CH₃ is:',
  right: 'but-2-yne',
  wrong: ['but-1-yne', 'but-2-ene', 'butane'],
  sol: 'Four carbons (but-), a triple bond (-yne) starting at C2 from either end — option (@K).',
  d: 2, c: 'application', t: [3, 6],
}));
add('carbonpct-num', num({
  stem: 'Calculate the percentage by mass of carbon in propyne, C₃H₄. (C = 12, H = 1)',
  value: 90, tol: 0.5, unit: '%',
  sol: r`Molecular mass of propyne $= 3 \times 12 + 4 \times 1 = 40$. Mass of carbon $= 3 \times 12 = 36$. Percentage of carbon $= \frac{36}{40} \times 100 = 90$, so carbon is 90 per cent of the mass.`,
  scheme: [['Molecular mass 40', 0.5], ['90 per cent', 0.5]],
  d: 2, c: 'application', t: [3],
}), () => Math.abs((3 * 12 / (3 * 12 + 4)) * 100 - 90) < 1e-9 || 'percentage');
add('pentyne-short1', short({
  marks: 1,
  stem: 'Draw the structural formula of pent-1-yne.',
  model: 'CH≡C–CH₂–CH₂–CH₃: a chain of five carbon atoms with a triple bond between C1 and C2; C1 carries one H, C3 and C4 two H each, and C5 three H (C₅H₈).',
  sol: 'Triple bond at C1.',
  scheme: [['Correct structure', 1]],
  d: 2, c: 'application', t: [3, 6],
}));
add('ethene-short1', short({
  marks: 1,
  stem: 'Draw the structural formula of propene, showing every bond.',
  model: 'CH₂=CH–CH₃ drawn in full: C1 has two H atoms and a double bond to C2; C2 has one H atom and a single bond to C3; C3 has three H atoms (C₃H₆).',
  sol: 'Displayed formula of propene.',
  scheme: [['All bonds and six H shown', 1]],
  d: 1, c: 'application', t: [3],
}));
add('series-fill', fill({
  stem: 'Complete each sentence by choosing the correct word from the bracket.\n\n(a) The general formula of the alkenes is ___ (CₙH₂ₙ / CₙH₂ₙ₋₂).\n\n(b) A hydrocarbon in which every carbon–carbon bond is a single bond is ___ (saturated / unsaturated).\n\n(c) Ethyne contains a ___ (double / triple) bond between its two carbon atoms.',
  acc: [['CₙH₂ₙ', 'CnH2n'], ['saturated'], ['triple']],
  sol: '(a) **CₙH₂ₙ**; (b) **saturated**; (c) **triple**.',
  d: 1, c: 'recall', t: [3],
}));

// ---------------------------------------------------------------- t04 structural isomerism
add('chain-mcq', mcq({
  stem: 'Butane, CH₃CH₂CH₂CH₃, and 2-methylpropane, CH₃CH(CH₃)CH₃, both have the molecular formula C₄H₁₀. They are:',
  right: 'chain isomers',
  wrong: ['position isomers', 'homologues', 'the same compound'],
  sol: 'Same formula, different carbon skeletons (straight and branched) — option (@K).',
  d: 1, c: 'understanding', t: [4],
}));
add('position-mcq', mcq({
  stem: 'Propan-1-ol, CH₃CH₂CH₂OH, and propan-2-ol, CH₃CH(OH)CH₃, are:',
  right: 'position isomers',
  wrong: ['chain isomers', 'homologues', 'the same compound'],
  sol: 'Same three-carbon chain and formula C₃H₈O; only the position of –OH differs — option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('same-mcq', mcq({
  stem: 'Which formula represents the same compound as CH₃–CH(CH₃)–CH₂–CH₃?',
  right: 'CH₃–CH₂–CH(CH₃)–CH₃',
  wrong: ['CH₃–CH₂–CH₂–CH₂–CH₃', 'CH₃–C(CH₃)₂–CH₃', 'CH₃–CH(CH₃)–CH(CH₃)–CH₃'],
  sol: 'Read from the other end, CH₃–CH₂–CH(CH₃)–CH₃ is again a four-carbon chain with a methyl group on C2: both are 2-methylbutane — option (@K).',
  d: 3, c: 'analysis', t: [4],
}));
add('isomercount-mcq', mcq({
  stem: 'How many chain isomers have the molecular formula C₅H₁₂?',
  right: 'Three',
  wrong: ['Two', 'Four', 'Five'],
  sol: 'Pentane, 2-methylbutane and 2,2-dimethylpropane — option (@K).',
  d: 2, c: 'recall', t: [4],
}));
add('isomer-ar', ar({
  a: 'But-1-ene and but-2-ene are position isomers.',
  r: 'They have the same molecular formula and the same carbon chain, but the double bond is in a different position.',
  key: 'c',
  sol: 'Both are true, and R is the definition of position isomerism applied to A — option (c).',
  d: 2, c: 'understanding', t: [4],
}));
add('mass-ar', ar({
  a: 'Butane and 2-methylpropane have the same molecular mass.',
  r: 'Butane and 2-methylpropane are position isomers.',
  key: 'a',
  sol: 'A is true (both C₄H₁₀, 58). R is false: they differ in the carbon skeleton, so they are chain isomers — option (a).',
  d: 3, c: 'analysis', t: [4],
}));
add('propene-tf', tf({
  stem: 'Propene, C₃H₆, has a straight-chain position isomer in which the double bond lies between carbon atoms 2 and 3.',
  key: 'f',
  sol: 'False: CH₃–CH=CH₂ numbered from the other end is CH₂=CH–CH₃, the same molecule, so propene has no position isomer.',
  d: 3, c: 'analysis', t: [4],
}));
add('butene-short1', short({
  marks: 1,
  stem: 'Name the position isomer of but-1-ene and write its condensed formula.',
  model: 'But-2-ene, CH₃–CH=CH–CH₃.',
  sol: 'But-2-ene.',
  scheme: [['But-2-ene with formula', 1]],
  d: 1, c: 'application', t: [4],
}));
add('isomerdef-short1', short({
  marks: 1,
  stem: 'What is meant by structural isomerism?',
  model: 'Structural isomerism: two or more compounds have the same molecular formula but different structural formulae (different arrangements of atoms).',
  sol: 'Definition.',
  scheme: [['Same molecular formula, different structures', 1]],
  d: 1, c: 'recall', t: [4],
}));
add('butane-short2', short({
  marks: 2,
  stem: 'Draw the structural formulae of the two chain isomers of C₄H₁₀ and give the IUPAC name of each.',
  model: 'Butane: CH₃–CH₂–CH₂–CH₃ (straight chain). 2-methylpropane: CH₃–CH(CH₃)–CH₃ (a three-carbon chain with a methyl group on C2).',
  sol: 'Two structures with names.',
  scheme: [['Butane', 1], ['2-methylpropane', 1]],
  d: 2, c: 'application', t: [4],
}));
add('pentane-short3', short({
  marks: 3,
  stem: 'Draw the three chain isomers of C₅H₁₂ and name each by the IUPAC system. Which of them has the lowest boiling point?',
  model: 'Pentane: CH₃–CH₂–CH₂–CH₂–CH₃. 2-methylbutane: CH₃–CH(CH₃)–CH₂–CH₃. 2,2-dimethylpropane: CH₃–C(CH₃)₂–CH₃. The most branched, 2,2-dimethylpropane, has the lowest boiling point.',
  sol: 'Three structures and names; most branched boils lowest.',
  scheme: [['Three structures', 1], ['Three names', 1], ['2,2-dimethylpropane', 1]],
  d: 3, c: 'application', t: [4],
}));
add('wrongname-short2', short({
  marks: 2,
  stem: 'A student named a compound "3-methylbutane". (a) Draw the structure that this name describes. (b) Give the correct IUPAC name and state the rule the student broke.',
  model: '(a) A four-carbon chain with a methyl group on C3: CH₃–CH₂–CH(CH₃)–CH₃. (b) Numbering from the other end puts the methyl group on C2, so the correct name is 2-methylbutane. The chain must be numbered from the end that gives the substituent the lowest number.',
  sol: 'Structure; 2-methylbutane; lowest-number rule.',
  scheme: [['(a) structure', 1], ['(b) name and rule', 1]],
  d: 4, c: 'evaluation', t: [4, 6],
}));

// ---------------------------------------------------------------- t05 homologous series
add('homolog-mcq', mcq({
  stem: 'In the alkene series, the member that comes just after propene, C₃H₆, has the molecular formula:',
  right: 'C₄H₈',
  wrong: ['C₄H₁₀', 'C₄H₆', 'C₃H₈'],
  sol: 'Add CH₂: C₃H₆ + CH₂ = C₄H₈ (but-1-ene), which fits CₙH₂ₙ — option (@K).',
  d: 1, c: 'application', t: [5],
}));
add('bp-mcq', mcq({
  stem: 'The boiling points of methane, ethane and propane are −162 °C, −89 °C and −42 °C. The boiling point of butane, the next straight-chain alkane, is most likely to be about:',
  right: '−1 °C',
  wrong: ['−200 °C', '−120 °C', '+98 °C'],
  sol: 'Boiling point rises steadily with molecular mass, by a smaller step each time (73 then 47 degrees), so the next value is a little below 0 °C — option (@K).',
  d: 3, c: 'analysis', t: [5],
}));
add('gradation-mcq', mcq({
  stem: 'Methanol, ethanol and propan-1-ol belong to one homologous series. Which of the following is nearly the same for all three?',
  right: 'Their chemical reactions, such as the reaction with sodium',
  wrong: ['Their boiling points', 'Their molecular masses', 'Their densities'],
  sol: 'Members share a functional group, so their chemical properties are similar; physical properties change gradually — option (@K).',
  d: 2, c: 'understanding', t: [5],
}));
add('homolog-tf', tf({
  stem: 'Methanal, HCHO, and ethanal, CH₃CHO, belong to the same homologous series.',
  key: 't',
  sol: 'True: both have the –CHO (aldehyde) group and differ by one CH₂ unit.',
  d: 1, c: 'application', t: [5],
}));
add('ch2-fill', fill({
  stem: 'Two successive members of any homologous series differ in formula by one ___ unit.',
  acc: [['CH₂', 'CH2', 'methylene']],
  sol: '**CH₂** (a difference of 14 u in molecular mass).',
  d: 1, c: 'recall', t: [5],
}));
add('alkene70-num', num({
  stem: 'An alkene has a molecular mass of 70. How many carbon atoms are there in one molecule of it? (C = 12, H = 1)',
  value: 5, tol: 0,
  sol: r`An alkene is CₙH₂ₙ, so its molecular mass is $12n + 2n = 14n$. Then $14n = 70$, so $n = \frac{70}{14} = 5$. The alkene has 5 carbon atoms (C₅H₁₀, for example pent-1-ene).`,
  scheme: [['14n = 70', 0.5], ['n = 5', 0.5]],
  d: 3, c: 'analysis', t: [5],
}), () => 70 / (12 + 2) === 5 || 'n');
add('isomass-num', num({
  stem: 'What is the molecular mass of 2,2-dimethylpropane? (C = 12, H = 1)',
  value: 72, tol: 0,
  sol: r`2,2-dimethylpropane is a chain isomer of pentane, C₅H₁₂. Molecular mass $= 5 \times 12 + 12 \times 1 = 72$.`,
  scheme: [['C₅H₁₂ and 72', 1]],
  d: 1, c: 'application', t: [4, 5],
}), () => 5 * 12 + 12 * 1 === 72 || 'M');
add('gradation-ar', ar({
  a: 'Pentane is a liquid at room temperature, while propane is a gas.',
  r: 'All the members of a homologous series have the same general formula.',
  key: 'd',
  sol: 'Both are true, but R does not explain A: pentane is a liquid because its larger molecular mass gives it a higher boiling point (gradation of physical properties) — option (d).',
  d: 2, c: 'understanding', t: [5],
}));
add('next-short1', short({
  marks: 1,
  stem: 'Write the molecular formula and the IUPAC name of the alkyne that comes just after propyne in its homologous series.',
  model: 'C₄H₆, but-1-yne.',
  sol: 'C₃H₄ + CH₂.',
  scheme: [['C₄H₆, but-1-yne', 1]],
  d: 1, c: 'application', t: [5],
}));
add('genformula-short1', short({
  marks: 1,
  stem: 'Write the general formula of the alkanes, and use it to write the molecular formula of the alkane with five carbon atoms.',
  model: 'CₙH₂ₙ₊₂; with n = 5, C₅H₁₂ (pentane).',
  sol: 'General formula; C₅H₁₂.',
  scheme: [['CₙH₂ₙ₊₂ and C₅H₁₂', 1]],
  d: 1, c: 'application', t: [5],
}));
add('homolog-short2', short({
  marks: 2,
  stem: 'Ethene, propene and but-1-ene are members of one homologous series. (a) Give two characteristics of a homologous series shown by these three compounds. (b) Write the general formula of this series.',
  model: '(a) Any two: they have the same functional group (C=C); successive members differ by CH₂ (14 u); they have similar chemical properties (for example, all add hydrogen); their boiling points rise from ethene to but-1-ene. (b) CₙH₂ₙ.',
  sol: 'Two characteristics; CₙH₂ₙ.',
  scheme: [['(a) two characteristics', 1], ['(b) CₙH₂ₙ', 1]],
  d: 2, c: 'understanding', t: [5],
}));

// ---------------------------------------------------------------- t06 nomenclature
add('name1-mcq', mcq({
  stem: 'The IUPAC name of CH₃–CH₂–CH₂–CHO is:',
  right: 'butanal',
  wrong: ['butan-1-ol', 'butanone', 'butanoic acid'],
  sol: 'Four carbons including the –CHO carbon, aldehyde ending -al — option (@K).',
  d: 2, c: 'application', t: [6],
}));
add('name2-mcq', mcq({
  stem: 'The IUPAC name of CH₃–CH(Cl)–CH₂–CH₃ is:',
  right: '2-chlorobutane',
  wrong: ['3-chlorobutane', '1-chlorobutane', '2-chloropropane'],
  sol: 'Four-carbon chain; numbering from the left puts Cl on C2, the lower number — option (@K).',
  d: 2, c: 'application', t: [6],
}));
add('name3-mcq', mcq({
  stem: 'The ester CH₃COOCH₃ is named:',
  right: 'methyl ethanoate',
  wrong: ['ethyl methanoate', 'methyl methanoate', 'ethyl ethanoate'],
  sol: 'The acid part CH₃COO– has two carbons (ethanoate); the group on the oxygen is methyl — option (@K).',
  d: 3, c: 'analysis', t: [6],
}));
add('trivial-mcq', mcq({
  stem: 'Formaldehyde, HCHO, a preservative for biological specimens, has the IUPAC name:',
  right: 'methanal',
  wrong: ['methanol', 'methanoic acid', 'ethanal'],
  sol: 'One carbon (meth-) with the aldehyde ending -al — option (@K).',
  d: 1, c: 'recall', t: [6],
}));
add('ether-mcq', mcq({
  stem: 'The IUPAC name of CH₃–O–CH₂–CH₃ is:',
  right: 'methoxyethane',
  wrong: ['ethoxymethane', 'propan-1-ol', 'propanone'],
  sol: 'An ether: the larger group (ethyl) gives the parent alkane, ethane; the smaller one is the prefix methoxy — option (@K).',
  d: 3, c: 'analysis', t: [6],
}));
add('name-ar', ar({
  a: 'The correct IUPAC name of CH₃–CH₂–CH=CH₂ is but-1-ene, not but-3-ene.',
  r: 'The chain is numbered from the end nearer the double bond, so that the double bond gets the lowest number.',
  key: 'c',
  sol: 'Both are true, and R explains A — option (c).',
  d: 2, c: 'application', t: [6],
}));
add('suffix-fill', fill({
  stem: 'In IUPAC names, the ending used for a ketone is ___.',
  acc: [['-one', 'one']],
  sol: '**-one**, as in propanone and butan-2-one.',
  d: 1, c: 'recall', t: [6],
}));
add('trivial-match', match({
  stem: 'Match each trivial name in Column A with the IUPAC name in Column B.',
  pairs: [
    ['Ethyl alcohol', 'Ethanol'],
    ['Acetaldehyde', 'Ethanal'],
    ['Acetic acid', 'Ethanoic acid'],
    ['Acetylene', 'Ethyne'],
    ['Methyl chloride', 'Chloromethane'],
  ],
  order: [2, 4, 0, 3, 1],
  sol: 'Ethyl alcohol → ethanol; acetaldehyde → ethanal; acetic acid → ethanoic acid; acetylene → ethyne; methyl chloride → chloromethane.',
  d: 1, c: 'recall', t: [6],
}));
add('class-match', match({
  stem: 'Match each compound in Column A with the class of compound in Column B.',
  pairs: [
    ['CH₃COOC₂H₅', 'Ester'],
    ['CH₃–O–CH₃', 'Ether'],
    ['CH₃CH₂CHO', 'Aldehyde'],
    ['CH₃COCH₂CH₃', 'Ketone'],
  ],
  order: [1, 3, 0, 2],
  sol: 'CH₃COOC₂H₅ (–COO–) → ester; CH₃–O–CH₃ (–O–) → ether; CH₃CH₂CHO (–CHO) → aldehyde; CH₃COCH₂CH₃ (C=O inside the chain) → ketone.',
  d: 2, c: 'application', t: [6],
}));
add('name-short1', short({
  marks: 1,
  stem: 'Give the IUPAC name of CH₃–CH₂–CO–CH₃.',
  model: 'Butan-2-one (butanone).',
  sol: 'Four carbons, C=O on C2.',
  scheme: [['Butan-2-one', 1]],
  d: 2, c: 'application', t: [6],
}));
add('struct-short1', short({
  marks: 1,
  stem: 'Draw the structural formula of propanoic acid.',
  model: 'CH₃–CH₂–COOH: a three-carbon chain in which C1 is the carboxyl carbon, bonded by a double bond to one O atom and by a single bond to an –OH group.',
  sol: 'Three carbons including –COOH.',
  scheme: [['Correct structure', 1]],
  d: 2, c: 'application', t: [6],
}));
add('trivial-short1', short({
  marks: 1,
  stem: 'Give the IUPAC name of the compound commonly called methyl alcohol.',
  model: 'Methanol (CH₃OH).',
  sol: 'Methanol.',
  scheme: [['Methanol', 1]],
  d: 1, c: 'recall', t: [6],
}));
add('name-short2', short({
  marks: 2,
  stem: 'Give the IUPAC names of (a) CH₃–CH(CH₃)–CH₂–CH₃ and (b) CH₃–CH₂–CH(OH)–CH₃.',
  model: '(a) 2-methylbutane. (b) Butan-2-ol.',
  sol: 'Lowest numbers to the branch and the –OH group.',
  scheme: [['(a)', 1], ['(b)', 1]],
  d: 2, c: 'application', t: [6],
}));
add('name-short3', short({
  marks: 3,
  stem: 'Write the condensed structural formulae of (a) 2-iodobutane, (b) pentan-2-one, (c) ethoxyethane.',
  model: '(a) CH₃–CHI–CH₂–CH₃. (b) CH₃–CO–CH₂–CH₂–CH₃. (c) CH₃–CH₂–O–CH₂–CH₃.',
  sol: 'Root, then group at the stated carbon, then hydrogens.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 2, c: 'application', t: [6],
}));
add('classes-short3', short({
  marks: 3,
  stem: 'For the compound CH₃–CH₂–CHO: (a) name its functional group; (b) give its IUPAC name; (c) write the condensed formula and IUPAC name of the next member of its homologous series.',
  model: '(a) The aldehyde group, –CHO. (b) Propanal. (c) CH₃–CH₂–CH₂–CHO, butanal.',
  sol: 'Aldehyde; propanal; add CH₂.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 2, c: 'application', t: [5, 6],
}));

// ---------------------------------------------------------------- 10-mark structured questions
add('carbon-long', long({
  stem: '(a) Explain the terms tetravalency and catenation. [2]\n\n(b) Draw the structural formula of benzene and state its molecular formula. [2]\n\n(c) Classify each chain as straight, branched or cyclic: (i) CH₃–CH₂–CH₂–CH₃, (ii) CH₃–C(CH₃)₂–CH₃, (iii) C₆H₆ (benzene). [3]\n\n(d) Draw the structural formulae, showing every bond, of (i) ethane, (ii) ethene and (iii) ethyne, and state the number of electron pairs shared between the two carbon atoms in each. [3]',
  model: '(a) Tetravalency: carbon (2, 4) shares its four valence electrons and so forms four covalent bonds. Catenation: carbon atoms link with one another by covalent bonds to form chains, branches and rings.\n\n(b) A hexagonal ring of six carbon atoms with alternate single and double bonds and one hydrogen on each carbon. Molecular formula C₆H₆.\n\n(c) (i) Straight. (ii) Branched (the central carbon is joined to four carbons). (iii) Cyclic.\n\n(d) (i) Ethane H₃C–CH₃ with three H on each carbon: one pair. (ii) Ethene H₂C=CH₂ with two H on each carbon: two pairs. (iii) Ethyne H–C≡C–H: three pairs.',
  sol: 'Definitions; benzene; classification; three structures.',
  scheme: [['(a) tetravalency', 1], ['(a) catenation', 1], ['(b) structure', 1], ['(b) C₆H₆', 1], ['(c)(i)', 1], ['(c)(ii)', 1], ['(c)(iii)', 1], ['(d)(i)', 1], ['(d)(ii)', 1], ['(d)(iii)', 1]],
  d: 3, c: 'application', t: [1, 2, 3],
}));
add('isomer-long', long({
  stem: '(a) Define structural isomerism and name the two kinds of structural isomerism you have studied. [2]\n\n(b) Draw the structural formulae of the two chain isomers of butane and name them. [2]\n\n(c) Draw and name the two straight-chain position isomers of C₄H₆. State the class of compound to which they belong. [3]\n\n(d) Give a reason for each: (i) CH₃–CH(CH₃)–CH₂–CH₃ and CH₃–CH₂–CH(CH₃)–CH₃ are not isomers of each other; (ii) propene has no position isomer; (iii) 2-methylpropane boils at a lower temperature than butane. [3]',
  model: '(a) Compounds with the same molecular formula but different structural formulae are structural isomers. Kinds: chain isomerism and position isomerism.\n\n(b) Butane CH₃–CH₂–CH₂–CH₃; 2-methylpropane CH₃–CH(CH₃)–CH₃.\n\n(c) But-1-yne CH≡C–CH₂–CH₃ and but-2-yne CH₃–C≡C–CH₃. They are alkynes.\n\n(d) (i) Both are a four-carbon chain with a methyl group on C2, numbered from opposite ends: they are the same compound, 2-methylbutane. (ii) In a three-carbon chain a double bond at either end gives the same molecule, CH₂=CH–CH₃. (iii) The branched molecule is more compact, so the attraction between its molecules is weaker and less energy is needed to boil it.',
  sol: 'Definition and kinds; two isomers; two alkynes; three reasons.',
  scheme: [['(a)', 2], ['(b) butane', 1], ['(b) 2-methylpropane', 1], ['(c) but-1-yne', 1], ['(c) but-2-yne', 1], ['(c) alkynes', 1], ['(d)(i)', 1], ['(d)(ii)', 1], ['(d)(iii)', 1]],
  d: 4, c: 'analysis', t: [4],
}));
add('series-long', long({
  stem: '(a) Define a homologous series and give two of its characteristics. [3]\n\n(b) Write the molecular formula and IUPAC name of (i) the alkane with three carbon atoms, (ii) the straight-chain alkene with four carbon atoms and the double bond at C1, (iii) the straight-chain alkyne with five carbon atoms and the triple bond at C1. [3]\n\n(c) The boiling points of the first four straight-chain alkanes are −162 °C, −89 °C, −42 °C and −1 °C. (i) Describe and explain the trend. (ii) Pentane boils at 36 °C. State its physical state at 25 °C. (iii) Calculate the molecular mass of pentane. (C = 12, H = 1) [4]',
  model: r`(a) A series of organic compounds with the same functional group and general formula, in which successive members differ by a CH₂ group. Characteristics (any two): same general formula; differ by 14 u; similar chemical properties; gradation in physical properties; similar methods of preparation.

(b) (i) C₃H₈, propane. (ii) C₄H₈, but-1-ene. (iii) C₅H₈, pent-1-yne.

(c) (i) The boiling point rises from methane to butane as the molecular mass (chain length) increases, because larger molecules attract one another more strongly. (ii) Liquid (25 °C is below its boiling point). (iii) Pentane is C₅H₁₂: $5 \times 12 + 12 \times 1 = 72$.`,
  sol: 'Definition and characteristics; three formulae and names; trend, state and mass.',
  scheme: [['(a) definition', 1], ['(a) two characteristics', 2], ['(b)(i)', 1], ['(b)(ii)', 1], ['(b)(iii)', 1], ['(c)(i) trend and reason', 2], ['(c)(ii)', 1], ['(c)(iii)', 1]],
  d: 3, c: 'application', t: [3, 5],
}));
add('name-long', long({
  stem: '(a) Name the functional group present in (i) CH₃CHO and (ii) CH₃COOH. [2]\n\n(b) Give the IUPAC names of (i) CH₃–CH₂–CH₂–OH and (ii) CH₃–CO–CH₃. [2]\n\n(c) Draw the structural formulae of (i) but-1-yne, (ii) propan-2-ol and (iii) 1-chloropropane. [3]\n\n(d) Give the IUPAC names of (i) CH₃COOC₂H₅, (ii) CH₃–O–CH₃ and (iii) HCOOH. [3]',
  model: '(a) (i) Aldehyde group, –CHO. (ii) Carboxyl (carboxylic acid) group, –COOH.\n\n(b) (i) Propan-1-ol. (ii) Propanone.\n\n(c) (i) CH≡C–CH₂–CH₃. (ii) CH₃–CH(OH)–CH₃. (iii) CH₃–CH₂–CH₂–Cl.\n\n(d) (i) Ethyl ethanoate. (ii) Methoxymethane. (iii) Methanoic acid.',
  sol: 'Groups; names; structures; names.',
  scheme: [['(a)(i)', 1], ['(a)(ii)', 1], ['(b)(i)', 1], ['(b)(ii)', 1], ['(c)(i)', 1], ['(c)(ii)', 1], ['(c)(iii)', 1], ['(d)(i)', 1], ['(d)(ii)', 1], ['(d)(iii)', 1]],
  d: 3, c: 'application', t: [6],
}));
add('mixed-long', long({
  stem: '(a) P is a straight-chain alkene with five carbon atoms. Write its molecular formula, and draw and name two position isomers that fit this description. [3]\n\n(b) Q is the most highly branched chain isomer of C₅H₁₂. Draw Q, give its IUPAC name and state how its boiling point compares with that of pentane. [3]\n\n(c) R is a straight-chain alkyne with the formula C₄H₆. (i) Draw and name its two position isomers. (ii) How many pairs of electrons are shared in the triple bond? (iii) Calculate the molecular mass of R. (C = 12, H = 1) [4]',
  model: r`(a) C₅H₁₀. Pent-1-ene CH₂=CH–CH₂–CH₂–CH₃ and pent-2-ene CH₃–CH=CH–CH₂–CH₃.

(b) CH₃–C(CH₃)₂–CH₃, 2,2-dimethylpropane. Its boiling point is lower than that of pentane (it is the most branched).

(c) (i) But-1-yne CH≡C–CH₂–CH₃ and but-2-yne CH₃–C≡C–CH₃. (ii) Three pairs. (iii) $4 \times 12 + 6 \times 1 = 54$.`,
  sol: 'Formula and two isomers; neo-structure and boiling point; alkynes, pairs and mass.',
  scheme: [['(a) C₅H₁₀', 1], ['(a) two isomers named', 2], ['(b) structure', 1], ['(b) name', 1], ['(b) lower boiling point', 1], ['(c)(i)', 2], ['(c)(ii)', 1], ['(c)(iii)', 1]],
  d: 4, c: 'analysis', t: [3, 4, 6],
}));
