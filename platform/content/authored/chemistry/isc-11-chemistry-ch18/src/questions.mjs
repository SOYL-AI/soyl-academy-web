// ch18 Isomerism — question bank (ISC style). AR keys planned: a b c d c b. MCQ keys are placed by the builder.
// Numbers printed in stems are the exact values used in the computations (strings carry the significant figures).
import { mk, add, r, near, dec } from './lib.mjs';
import { alcohols, ethers, alkenes, hasGeometric } from './isokit.mjs';

const { mcq, ar, tf, fill, match, num, short, long } = mk;
const SUCROSE = 66.5; // specific rotations (given), degrees dm⁻¹ (g mL⁻¹)⁻¹, D line, about 293 K
const FRUCTOSE = -92.4;

// ---------------------------------------------------------------- t01 structural isomerism
add('type-mcq', mcq({
  stem: 'A student working with a C₄H₈ fraction collected from a cracking unit compares but-1-ene with but-2-ene. The type of isomerism between them is:',
  right: 'position isomerism',
  wrong: ['chain isomerism', 'functional isomerism', 'metamerism'],
  sol: 'The carbon skeleton and the functional group (C=C) are the same; only the position of the double bond changes — position isomerism, option (@K).',
  d: 1, c: 'understanding', t: [1],
}));
add('tauto-mcq', mcq({
  stem: 'In a pharmacy course on drug stability, students are asked which of these carbonyl compounds can exist in both a keto and an enol form. The answer is:',
  right: 'butanone, CH₃COCH₂CH₃',
  wrong: ['methanal, HCHO', 'benzaldehyde, C₆H₅CHO', '2,2-dimethylpropanal, (CH₃)₃CCHO'],
  sol: 'Keto–enol tautomerism needs an α-hydrogen on the carbon next to C=O. Butanone has them; methanal, benzaldehyde and 2,2-dimethylpropanal have none (@1, @2, @3) — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('chainiso-mcq', mcq({
  stem: 'A gas chromatograph in a petrochemical plant resolves several C₅ compounds. Which pair of compounds are chain isomers?',
  right: 'pentane and 2-methylbutane',
  wrong: ['ethanol and methoxymethane', 'butan-1-ol and butan-2-ol', 'propanal and propanone'],
  sol: 'Pentane and 2-methylbutane (C₅H₁₂) differ only in the carbon skeleton — option (@K). The other pairs differ in the functional group (@1, @3) or in the position of the group (@2).',
  d: 1, c: 'understanding', t: [1],
}));
add('metamer-mcq', mcq({
  stem: 'A solvent store in a university holds diethyl ether, C₂H₅OC₂H₅, and methyl propyl ether, CH₃OC₃H₇. These two compounds are:',
  right: 'metamers',
  wrong: ['position isomers', 'functional isomers', 'tautomers'],
  sol: 'Both are ethers (same functional group, –O–) with different alkyl groups on the two sides of oxygen: metamers — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('c4h10o-mcq', mcq({
  stem: 'The molecular formula C₄H₁₀O is used in a quiz on isomer hunting, for alcohols and ethers only and ignoring stereoisomers. The number of structural isomers is:',
  right: '7',
  wrong: ['4', '6', '8'],
  sol: 'There are 4 alcohols (butan-1-ol, butan-2-ol, 2-methylpropan-1-ol, 2-methylpropan-2-ol) and 3 ethers (1-methoxypropane, ethoxyethane, 2-methoxypropane): 7 in all — option (@K).',
  d: 2, c: 'application', t: [1],
}), () => alcohols(4).length + ethers(4).length === 7 || 'c4h10o');
add('c5h12o-mcq', mcq({
  stem: 'A fusel-oil sample from a distillery contains alcohols of formula C₅H₁₂O. The number of structural isomers that are alcohols (ignoring stereoisomers) is:',
  right: '8',
  wrong: ['4', '6', '11'],
  sol: 'The alcohols are pentan-1-ol, pentan-2-ol, pentan-3-ol, 2-methylbutan-1-ol, 3-methylbutan-1-ol, 2-methylbutan-2-ol, 3-methylbutan-2-ol and 2,2-dimethylpropan-1-ol: 8 — option (@K). (11 counts the mirror-image forms as well.)',
  d: 3, c: 'application', t: [1],
}), () => alcohols(5).length === 8 || 'c5h12o');
add('funciso-mcq', mcq({
  stem: 'A flavour chemist lists compounds that share the molecular formula of propanoic acid, C₃H₆O₂, but belong to another class. A functional isomer of propanoic acid is:',
  right: 'methyl ethanoate',
  wrong: ['butanoic acid', 'propan-1-ol', 'ethanoic acid'],
  sol: 'Methyl ethanoate, CH₃COOCH₃, has the formula C₃H₆O₂ and contains the ester group instead of –COOH — option (@K). The others have other formulas (@1, @2, @3).',
  d: 2, c: 'application', t: [1],
}));
add('enol-mcq', mcq({
  stem: 'During a spectroscopy lab, a student wants the enol tautomer of propanone, CH₃COCH₃. Its structure is:',
  right: 'CH₂=C(OH)CH₃',
  wrong: ['CH₂=CHCH₂OH', 'CH₃CH₂CHO', 'CH₃CH(OH)CH₃'],
  sol: 'The enol form arises by moving a hydrogen from carbon to oxygen, giving a C=C and an –OH on the same carbon: CH₂=C(OH)CH₃ — option (@K). CH₂=CHCH₂OH (@1) is an isomer, but not a tautomer.',
  d: 2, c: 'understanding', t: [1],
}));
add('func-ar', ar({
  a: 'Ethanol and methoxymethane are functional isomers.',
  r: 'Natural gas consists mainly of methane.',
  key: 'b',
  sol: 'Both statements are true: C₂H₆O is an alcohol (–OH) in ethanol and an ether (–O–) in methoxymethane, and methane is the main constituent of natural gas. R has no bearing on A — option (b).',
  d: 2, c: 'understanding', t: [1],
}));
add('tauto-ar', ar({
  a: 'Propanone and prop-1-en-2-ol are tautomers.',
  r: 'Polythene is made by polymerising ethene.',
  key: 'b',
  sol: 'Both are true: the two forms are in equilibrium through a hydrogen shift, and polythene comes from ethene. The reason is unrelated to the assertion — option (b).',
  d: 2, c: 'understanding', t: [1],
}));
add('chain-tf', tf({
  stem: 'Butan-1-ol and butan-2-ol, both found in a fusel-oil sample, are chain isomers.',
  key: 'f',
  sol: 'False. They have the same carbon skeleton, with –OH on different carbons, so they are position isomers.',
  d: 1, c: 'understanding', t: [1],
}));
add('tauto-fill', fill({
  stem: 'Two isomers that are in rapid equilibrium through the shift of a hydrogen atom, such as the keto and enol forms of propanone, show ___.',
  acc: [['tautomerism', 'tautomeric isomerism']],
  sol: '**Tautomerism** (the isomers are tautomers).',
  d: 1, c: 'recall', t: [1],
}));
add('types-match', match({
  stem: 'Match each kind of structural isomerism with a pair of compounds that shows it.',
  pairs: [
    ['Chain isomerism', 'Pentane and 2-methylbutane'],
    ['Position isomerism', 'Pent-1-ene and pent-2-ene'],
    ['Functional isomerism', 'Propan-1-ol and methoxyethane'],
    ['Metamerism', 'Diethyl ether and methyl propyl ether'],
  ],
  order: [2, 0, 3, 1],
  sol: 'The skeleton differs in the first pair (chain). The double bond moves in the second (position). An alcohol and an ether share C₃H₈O (functional). Two ethers have different alkyl groups round oxygen (metamerism).',
  d: 2, c: 'understanding', t: [1],
}));
add('chain-short', short({
  marks: 2,
  stem: 'A hydrocarbon dealer is asked to list the chain isomers of C₅H₁₂. Write their IUPAC names and name the type of isomerism.',
  model: 'Pentane, 2-methylbutane and 2,2-dimethylpropane. They differ in the carbon skeleton (straight, one branch, two branches on one carbon), so the isomerism is chain isomerism.',
  sol: 'Three names; chain isomerism.',
  scheme: [['Three names (0.5 each)', 1.5], ['Chain isomerism', 0.5]],
  d: 1, c: 'recall', t: [1],
}));
add('position-short', short({
  marks: 2,
  stem: 'Propan-1-ol, propan-2-ol and methoxyethane are all found on the shelf of a stockroom and all have the formula C₃H₈O. Name the type of isomerism between the two alcohols, and between an alcohol and the ether.',
  model: 'Propan-1-ol and propan-2-ol have the same skeleton and group but –OH on different carbons: position isomerism. An alcohol (–OH) and the ether methoxyethane (–O–) have different functional groups: functional isomerism.',
  sol: 'Position; functional.',
  scheme: [['Position isomerism with reason', 1], ['Functional isomerism with reason', 1]],
  d: 1, c: 'understanding', t: [1],
}));
add('tauto-short', short({
  marks: 2,
  stem: 'Define tautomerism, and write the keto and enol forms of propanone.',
  model: 'Tautomerism is the existence of two isomers, the tautomers, in rapid dynamic equilibrium, usually through the shift of a hydrogen atom. Propanone: keto form CH₃COCH₃; enol form CH₂=C(OH)CH₃.',
  sol: 'Definition; two forms.',
  scheme: [['Definition (dynamic equilibrium, hydrogen shift)', 1], ['Keto and enol structures', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('c4h10o-short', short({
  marks: 3,
  stem: 'A quiz asks for any three isomers of C₄H₁₀O with different structures, and the type of isomerism between a chosen pair. Write the names of three isomers (not all of one family) and name the type of isomerism for two pairs among them.',
  model: 'For example butan-1-ol, butan-2-ol and ethoxyethane. Butan-1-ol and butan-2-ol: position isomerism (–OH on different carbons of the same chain). Butan-1-ol and ethoxyethane: functional isomerism (alcohol and ether). (Other correct choices from the seven isomers are accepted.)',
  sol: 'Three isomers; two types.',
  scheme: [['Three correct isomers from at least two families', 1], ['Position isomerism for the alcohol pair', 1], ['Functional isomerism for the alcohol–ether pair', 1]],
  d: 2, c: 'application', t: [1],
}));
add('keto-short', short({
  marks: 3,
  stem: 'Explain keto–enol tautomerism using ethanal, giving the structures, and say why benzaldehyde, C₆H₅CHO, cannot show it.',
  model: 'In ethanal, CH₃CHO, a hydrogen on the carbon next to C=O (the α-hydrogen) can shift to the oxygen, giving the enol CH₂=CHOH; the two forms are in dynamic equilibrium and the keto form predominates. Benzaldehyde has no α-hydrogen: the carbon next to the carbonyl is a ring carbon with no hydrogen to shift, so it cannot form an enol.',
  sol: 'Equilibrium; structures; no α-H.',
  scheme: [['Keto and enol structures of ethanal', 1], ['α-Hydrogen shift, dynamic equilibrium', 1], ['Benzaldehyde has no α-hydrogen', 1]],
  d: 2, c: 'application', t: [1],
}));
add('isom-long', long({
  stem: '(a) Define isomerism. [1]\n\n(b) The formula C₄H₁₀O belongs to a student’s test question. Write the structural formulae and IUPAC names of four isomers, including two alcohols that differ in the position of –OH and one ether. [2]\n\n(c) Name the type of isomerism between (i) the two alcohols and (ii) an alcohol and the ether, and give one pair of metamers of formula C₄H₁₀O. [2]',
  model: '(a) Isomerism is the existence of compounds with the same molecular formula but different structures (and therefore different properties). (b) Butan-1-ol CH₃CH₂CH₂CH₂OH; butan-2-ol CH₃CH(OH)CH₂CH₃; 2-methylpropan-1-ol (CH₃)₂CHCH₂OH; ethoxyethane CH₃CH₂OCH₂CH₃ (or 1-methoxypropane or 2-methoxypropane). (c) (i) position isomerism; (ii) functional isomerism; metamers: ethoxyethane and 1-methoxypropane.',
  sol: 'Definition; four isomers; types.',
  scheme: [['(a) definition', 1], ['(b) four correct structures with names (0.5 each)', 2], ['(c) position and functional isomerism', 1], ['(c) a correct pair of metamers', 1]],
  d: 2, c: 'application', t: [1],
}));

// ---------------------------------------------------------------- t02 geometrical isomerism
add('geomcond-mcq', mcq({
  stem: 'An alkene in a pheromone research lab shows cis and trans forms. The structural requirement for this is that:',
  right: 'each doubly bonded carbon is attached to two different atoms or groups',
  wrong: ['the molecule contains a chiral carbon atom', 'each doubly bonded carbon carries at least one hydrogen atom', 'the molecule contains a triple bond'],
  sol: 'Rotation about C=C is restricted, and two different groups on each doubly bonded carbon give two arrangements: cis and trans — option (@K). A chiral carbon causes optical isomerism (@1).',
  d: 1, c: 'understanding', t: [2],
}));
add('geomshow-mcq', mcq({
  stem: 'A refinery’s C₅H₁₀ stream contains several acyclic alkenes. Which of these shows geometrical (cis–trans) isomerism?',
  right: 'pent-2-ene',
  wrong: ['pent-1-ene', '2-methylbut-1-ene', '3-methylbut-1-ene'],
  sol: 'In pent-2-ene each doubly bonded carbon has two different groups (H, CH₃ on C-2; H, C₂H₅ on C-3) — option (@K). The others have a carbon with two identical atoms or groups (@1, @2, @3).',
  d: 2, c: 'application', t: [2],
}), () => alkenes(5).filter(hasGeometric).length === 1 || 'geom5');
add('dce-mcq', mcq({
  stem: 'Two bottles in a dry-cleaning chemist’s store hold cis- and trans-1,2-dichloroethene. The cis isomer has the higher boiling point because:',
  right: 'its C–Cl bond dipoles add up, giving a polar molecule',
  wrong: ['it has a larger molar mass than the trans isomer', 'it forms hydrogen bonds', 'its C–Cl bond dipoles cancel'],
  sol: 'In the cis form both C–Cl dipoles point to the same side and add, so the molecule is polar (about 1.9 D); in the trans form they cancel (0 D) — option (@K). The molar masses are equal (@1).',
  d: 2, c: 'analysis', t: [2],
}));
add('synanti-mcq', mcq({
  stem: 'A student sketches the oxime CH₃CH=NOH with the C=N bond horizontal, the hydrogen on carbon pointing down and the OH on nitrogen also pointing down. This isomer is called:',
  right: 'the syn form, because H and OH lie on the same side of C=N',
  wrong: ['the anti form, because H and OH lie on the same side of C=N', 'the syn form, because the CH₃ and OH groups lie on opposite sides', 'the cis form, because it is an alkene'],
  sol: 'H and OH are on the same side of the C=N bond, which defines the syn form of an aldoxime — option (@K). The cis–trans labels belong to alkenes (@3).',
  d: 2, c: 'application', t: [2],
}));
add('hexadiene-mcq', mcq({
  stem: 'A polymer chemist studies hexa-2,4-diene, CH₃CH=CHCH=CHCH₃, which has two double bonds, each able to be cis or trans. Because the molecule is symmetrical, the number of geometrical isomers is:',
  right: '3',
  wrong: ['2', '4', '1'],
  sol: 'The combinations are cis–cis, trans–trans and cis–trans; trans–cis is the same as cis–trans because the molecule is symmetrical. So 3, not 4 — option (@K).',
  d: 4, c: 'analysis', t: [2],
}));
add('geom-ar', ar({
  a: 'But-1-ene does not show geometrical isomerism.',
  r: 'One of the doubly bonded carbons in but-1-ene carries two identical hydrogen atoms.',
  key: 'a',
  sol: 'Both are true, and R explains A: C-1 has two H atoms, so interchanging groups on it gives the same compound — option (a).',
  d: 2, c: 'understanding', t: [2],
}));
add('cis-tf', tf({
  stem: 'Cis–trans isomerism in alkenes is possible because rotation about the carbon–carbon double bond is restricted.',
  key: 't',
  sol: 'True. The π bond stops free rotation, so groups are held on the same or opposite sides.',
  d: 1, c: 'understanding', t: [2],
}));
add('cistrans-short', short({
  marks: 2,
  stem: 'cis-1,2-Dichloroethene has a dipole moment of about 1.9 D, whereas the trans isomer has a dipole moment of zero. Which has the higher boiling point? Explain.',
  model: 'The cis isomer has the higher boiling point. In the cis form the two C–Cl bond dipoles act in the same direction and give a polar molecule with stronger dipole–dipole attraction; in the trans form they cancel, so the molecule is non-polar.',
  sol: 'cis higher; dipoles add.',
  scheme: [['cis has the higher boiling point', 1], ['Dipoles add in cis and cancel in trans', 1]],
  d: 2, c: 'application', t: [2],
}));
add('geomcond-short', short({
  marks: 2,
  stem: 'State the two conditions for geometrical isomerism in an alkene, and explain why propene does not show it.',
  model: 'Conditions: (1) rotation about the double bond is restricted; (2) each doubly bonded carbon is attached to two different atoms or groups. In propene, CH₃CH=CH₂, the terminal carbon carries two identical hydrogen atoms, so the second condition fails.',
  sol: 'Two conditions; propene fails the second.',
  scheme: [['Restricted rotation and two different groups on each carbon', 1], ['Propene: two identical H on the terminal carbon', 1]],
  d: 2, c: 'application', t: [2],
}));
add('synanti-short', short({
  marks: 2,
  stem: 'Write the structures of the syn and anti forms of propanal oxime, CH₃CH₂CH=NOH, and say how the two differ.',
  model: 'Both have the connectivity CH₃CH₂–CH=N–OH. In the syn form the hydrogen on carbon and the OH group on nitrogen lie on the same side of the C=N bond; in the anti form they lie on opposite sides. (Structures drawn with the C=N bond horizontal.)',
  sol: 'Syn and anti defined with structures.',
  scheme: [['Structure of the syn form (H and OH same side)', 1], ['Structure of the anti form (H and OH opposite sides)', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('geom-short', short({
  marks: 3,
  stem: 'At 298 K, but-2-ene exists as two isomers with melting points of about 134 K and 168 K and boiling points of about 277 K and 274 K. Draw the two isomers, say which melting point belongs to the trans isomer, and give one reason.',
  model: 'cis-but-2-ene has the two CH₃ groups on the same side of C=C; trans-but-2-ene has them on opposite sides. The melting point of 168 K belongs to the trans isomer: it is more symmetrical, packs better in the crystal, and therefore needs more energy to melt. (The cis isomer is slightly polar and has the higher boiling point, 277 K.)',
  sol: 'Structures; trans = 168 K; symmetry and packing.',
  scheme: [['cis and trans structures', 1], ['Trans has the higher melting point (168 K)', 1], ['Reason: symmetry and better packing', 1]],
  d: 3, c: 'analysis', t: [2],
}));
add('hexadiene-short', short({
  marks: 3,
  stem: 'Hexa-2,4-diene, CH₃CH=CHCH=CHCH₃, has two double bonds, each of which can be cis or trans. Draw the geometrical isomers (cis–cis, trans–trans and cis–trans) in words or structures, and say why there are three and not four.',
  model: 'Each double bond (C-2=C-3 and C-4=C-5) has two different groups on each carbon, so each can be cis or trans. Combinations: cis,cis; trans,trans; cis,trans. A fourth combination, trans,cis, is the same as cis,trans because the molecule is symmetrical (the two ends are identical CH₃CH= groups), so there are three isomers.',
  sol: 'Three isomers; symmetry.',
  scheme: [['Each double bond can be cis or trans', 1], ['Three isomers listed', 1], ['trans,cis = cis,trans by symmetry', 1]],
  d: 3, c: 'analysis', t: [2],
}));
add('oxime-short', short({
  marks: 3,
  stem: 'Ethanal reacts with hydroxylamine to give an oxime, CH₃CH=NOH. Explain why this oxime shows geometrical isomerism, name the two forms and describe how they differ.',
  model: 'Rotation about the C=N double bond is restricted, and each end carries two different groups (H and CH₃ on carbon; OH and a lone pair on nitrogen), so two arrangements exist. In the syn form the H on carbon and the OH on nitrogen lie on the same side of C=N; in the anti form they lie on opposite sides.',
  sol: 'Restricted rotation about C=N; syn and anti.',
  scheme: [['Restricted rotation about C=N with different groups at each end', 1], ['Syn form: H and OH same side', 1], ['Anti form: H and OH opposite sides', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('geom-long', long({
  stem: '(a) State the conditions necessary for geometrical isomerism in an alkene. [2]\n\n(b) Which of pent-2-ene, but-1-ene, 2-methylbut-2-ene and 1,2-dibromoethene show cis–trans isomerism? Give the reason for each. [2]\n\n(c) What are syn and anti isomers? [1]',
  model: '(a) Rotation about the C=C bond must be restricted, and each doubly bonded carbon must carry two different atoms or groups. (b) Pent-2-ene: yes (H and CH₃ on one carbon, H and C₂H₅ on the other). But-1-ene: no (two H on C-1). 2-Methylbut-2-ene: no (two CH₃ on C-2). 1,2-Dibromoethene: yes (H and Br on each carbon). (c) Syn and anti are the geometrical isomers of oximes about the C=N bond: in the syn form the H on carbon and the OH on nitrogen are on the same side, in the anti form on opposite sides.',
  sol: 'Conditions; which show; syn-anti.',
  scheme: [['(a) restricted rotation', 1], ['(a) two different groups on each carbon', 1], ['(b) pent-2-ene and 1,2-dibromoethene with reasons', 1], ['(b) but-1-ene and 2-methylbut-2-ene with reasons', 1], ['(c) syn and anti defined', 1]],
  d: 3, c: 'application', t: [2],
}));
add('tauto-geom-long', long({
  stem: '(a) What is tautomerism? Write the keto and enol forms of propanone, and state which predominates. [2]\n\n(b) Draw the cis and trans isomers of but-2-ene. [1]\n\n(c) Explain with one reason why 2-methylpropene cannot show cis–trans isomerism, and give the number of alkenes of formula C₄H₈ that show it. [2]',
  model: '(a) Tautomerism is the existence of two isomers in rapid dynamic equilibrium through the shift of a hydrogen atom. Keto form CH₃COCH₃; enol form CH₂=C(OH)CH₃. The keto form predominates. (b) cis-but-2-ene: both CH₃ groups on the same side of C=C; trans-but-2-ene: CH₃ groups on opposite sides. (c) In 2-methylpropene, (CH₃)₂C=CH₂, each doubly bonded carbon has two identical groups (two CH₃ on one, two H on the other). Of the three C₄H₈ alkenes (but-1-ene, but-2-ene, 2-methylpropene) only but-2-ene shows cis–trans isomerism, that is one.',
  sol: 'Tautomerism; cis-trans; 2-methylpropene.',
  scheme: [['(a) definition', 0.5], ['(a) keto and enol forms; keto predominates', 1.5], ['(b) cis and trans structures', 1], ['(c) two identical groups on each carbon', 1], ['(c) only but-2-ene: one', 1]].map(([a, b]) => [a, b]).slice(0, 5),
  d: 3, c: 'application', t: [1, 2],
}));

// ---------------------------------------------------------------- t03 optical isomerism: polarimeter, specific rotation, chirality
add('spec-mcq', mcq({
  stem: `A solution of 0.050 g mL⁻¹ of an optically active drug in a 20.0 cm polarimeter tube rotates the plane of polarised light by +3.3°. Its specific rotation is:`,
  right: '+33°',
  wrong: ['+3.3°', '+0.33°', '+66°'],
  sol: r`$l = 20.0\ \text{cm} = 2.00\ \text{dm}$, so $[\alpha] = 3.3 \div (2.00 \times 0.050) = +33^\circ$ — option (@K). Using the length in cm gives (@1); using 5.0 for the concentration gives (@2); leaving out $l$ gives (@3).`,
  d: 2, c: 'application', t: [3],
}));
add('chiral-mcq', mcq({
  stem: 'A chemist in a perfumery examines 3-chlorobutan-2-ol, CH₃CH(OH)CH(Cl)CH₃. The number of chiral carbon atoms in its molecule is:',
  right: '2',
  wrong: ['0', '1', '3'],
  sol: 'C-2 carries H, OH, CH₃ and CH(Cl)CH₃; C-3 carries H, Cl, CH₃ and CH(OH)CH₃; each has four different groups. The two methyl carbons are not chiral — option (@K).',
  d: 2, c: 'application', t: [3],
}));
{
  const alpha = -8.4;
  const l = 2.0;
  const c = 0.1;
  const spec = alpha / (l * c); // -42.0
  add('rotation-mcq', mcq({
    stem: 'A compound tested in a food laboratory, at 0.100 g mL⁻¹ in a 2.00 dm polarimeter tube, turns the plane of polarised light anticlockwise by 8.40°. Which statement is correct?',
    right: 'It is laevorotatory, with a specific rotation of −42.0°',
    wrong: ['It is dextrorotatory, with a specific rotation of +42.0°', 'It is laevorotatory, with a specific rotation of −4.20°', 'It is dextrorotatory, with a specific rotation of +4.20°'],
    sol: r`Anticlockwise rotation means laevorotatory (l or −). $[\alpha] = -8.40 \div (2.00 \times 0.100) = -42.0^\circ$ — option (@K). A wrong sign gives (@1) and (@3); a concentration of 1.00 instead of 0.100 gives (@2) and (@3).`,
    d: 2, c: 'application', t: [3],
  }), () => near(spec, -42.0, 0.001) || 'rotation');
}
{
  const spec = 24.0;
  const lcm = 15.0;
  const c = 0.2;
  const alpha = spec * (lcm / 10) * c; // 7.20
  add('tube-mcq', mcq({
    stem: 'A compound in a sugar-mill laboratory has [α] = +24.0° (given). A 15.0 cm polarimeter tube is filled with its solution of concentration 0.200 g mL⁻¹. The observed rotation is:',
    right: '+7.20°',
    wrong: ['+72.0°', '+4.80°', '+36.0°'],
    sol: r`$l = 15.0\ \text{cm} = 1.50\ \text{dm}$, so $\alpha = [\alpha] \times l \times c = 24.0 \times 1.50 \times 0.200 = +7.20^\circ$ — option (@K). Using 15.0 for $l$ gives (@1); leaving out $l$ gives (@2); leaving out $c$ gives (@3).`,
    d: 2, c: 'application', t: [3],
  }), () => near(alpha, 7.2, 0.001) || 'tube');
}
add('chiralC-mcq', mcq({
  stem: 'Among the alcohols stocked by a perfumery, which one is optically active?',
  right: 'CH₃CH₂CH(OH)CH₃',
  wrong: ['CH₃CH(OH)CH₃', 'CH₃CH₂CH₂OH', 'HOCH₂CH₂OH'],
  sol: 'Only butan-2-ol has a carbon (C-2) bonded to four different groups: H, OH, CH₃ and C₂H₅ — option (@K). The others have no such carbon (@1, @2, @3).',
  d: 2, c: 'application', t: [3],
}));
add('nicol-mcq', mcq({
  stem: 'In a Nicol prism, made of calcite cemented with Canada balsam, the ordinary ray is removed from the emerging beam because it:',
  right: 'undergoes total internal reflection at the balsam layer and is absorbed at the blackened face',
  wrong: ['is absorbed by the Canada balsam', 'is transmitted but weaker than the extraordinary ray', 'is converted into the extraordinary ray'],
  sol: 'The o-ray meets the balsam layer at an angle beyond the critical angle, is totally reflected and is absorbed by the blackened face; only the e-ray emerges — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('chiral-ar', ar({
  a: 'Propan-2-ol is optically inactive.',
  r: 'The middle carbon of propan-2-ol is bonded to four different groups.',
  key: 'c',
  sol: 'A is true, but R is false: the middle carbon carries H, OH and two identical CH₃ groups, so it is not chiral — option (c).',
  d: 2, c: 'application', t: [3],
}));
add('polar-fill', fill({
  stem: 'The instrument used to measure the angle through which a solution rotates plane-polarised light is called a ___.',
  acc: [['polarimeter']],
  sol: 'A **polarimeter**.',
  d: 1, c: 'recall', t: [3],
}));
{
  const alpha = -4.2;
  const l = 1.5;
  const c = 0.05;
  const spec = alpha / (l * c);
  add('spec-num', num({
    stem: 'A polarimeter reading of −4.20° is obtained for a solution containing 0.0500 g mL⁻¹ of a compound in a tube 1.50 dm long. Find the specific rotation, in degrees (dm⁻¹ g⁻¹ mL).',
    value: -56.0, tol: 0.1, unit: '°',
    sol: r`$[\alpha] = \dfrac{\alpha}{l \times c} = \dfrac{-4.20}{1.50 \times 0.0500} = -56.0^\circ$.`,
    scheme: [['Formula with l in dm and c in g mL⁻¹', 0.5], ['−56.0°', 0.5]],
    d: 1, c: 'understanding', t: [3],
  }), () => near(spec, -56.0, 0.001) || 'spec');
}
{
  const mass = 8.4;
  const vol = 60.0;
  const l = 2.0;
  const cc = mass / vol; // 0.140
  const a = SUCROSE * l * cc; // 18.62
  add('alpha-num', num({
    stem: `A pharmacist in Kochi dissolves 8.40 g of sucrose in water to make 60.0 mL of solution and fills a 2.00 dm polarimeter tube with it. With [α] = +${SUCROSE}° (given), what is the observed rotation, in degrees?`,
    value: 18.6, tol: 0.1, unit: '°',
    sol: r`$c = 8.40 \div 60.0 = 0.140\ \text{g mL}^{-1}$. $\alpha = [\alpha] \times l \times c = 66.5 \times 2.00 \times 0.140 = 18.62^\circ \approx +18.6^\circ$.`,
    scheme: [['c = 0.140 g mL⁻¹', 0.5], ['α = +18.6°', 0.5]],
    d: 2, c: 'application', t: [3],
  }), () => near(a, 18.62, 0.001) || 'alpha');
}
{
  const alpha = -3.23;
  const l = 1.0;
  const cc = alpha / (FRUCTOSE * l); // 0.03496
  add('conc-num', num({
    stem: `A fructose solution in a 1.00 dm tube gives an observed rotation of −3.23°. Taking [α] = ${FRUCTOSE}° (given), find the concentration, in g mL⁻¹.`,
    value: 0.035, tol: 0.0003, unit: 'g mL⁻¹',
    sol: r`$c = \dfrac{\alpha}{[\alpha] \times l} = \dfrac{-3.23}{(-92.4) \times 1.00} = 0.03496\ \text{g mL}^{-1} \approx 0.0350\ \text{g mL}^{-1}$.`,
    scheme: [['c = α / ([α] l)', 0.5], ['0.0350 g mL⁻¹', 0.5]],
    d: 2, c: 'understanding', t: [3],
  }), () => near(cc, 0.03496, 0.001) || 'conc');
}
add('polarised-short', short({
  marks: 2,
  stem: 'What is plane-polarised light? How does a Nicol prism produce it from ordinary light?',
  model: 'Plane-polarised light has vibrations in one plane only, whereas ordinary light vibrates in all planes at right angles to its path. A Nicol prism (calcite cut diagonally and cemented with Canada balsam) splits unpolarised light into an ordinary ray, which is totally reflected at the balsam layer and absorbed, and an extraordinary ray, which emerges as plane-polarised light.',
  sol: 'Definition; Nicol action.',
  scheme: [['Plane-polarised light defined', 1], ['o-ray removed, e-ray emerges', 1]],
  d: 1, c: 'understanding', t: [3],
}));
add('spec-short', short({
  marks: 2,
  stem: 'Define specific rotation. Write the formula, naming each symbol and the units of l and c.',
  model: 'Specific rotation is the angle through which the plane of polarised light is turned by a solution of concentration 1 g mL⁻¹ in a tube 1 dm long, at a stated temperature and wavelength. [α] = α / (l × c), where α is the observed rotation in degrees, l the tube length in dm and c the concentration in g mL⁻¹.',
  sol: 'Definition; formula with units.',
  scheme: [['Definition', 1], ['[α] = α/(l c) with units', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('polarimeter-short', short({
  marks: 3,
  stem: 'Describe the parts of a polarimeter and explain how it is used to measure the angle of rotation of an optically active solution.',
  model: 'Parts: a monochromatic source (sodium lamp), a polariser (Nicol prism) giving plane-polarised light, a tube of fixed length holding the solution, an analyser (a second Nicol prism that can be rotated) and a circular scale. With the tube empty or with solvent, the analyser is set for the reference brightness. With the optically active solution in the tube, the plane of polarisation is turned, and the analyser must be rotated through an angle α to restore the setting. The scale reading gives α; the sign shows whether the substance is d or l.',
  sol: 'Parts; method.',
  scheme: [['Source, polariser, tube', 1], ['Analyser and scale', 1], ['Rotating the analyser to restore the setting gives α', 1]],
  d: 2, c: 'understanding', t: [3],
}));
{
  const mass = 4.5;
  const vol = 30.0;
  const l = 1.0;
  const alpha = -9.6;
  const cc = mass / vol;
  const spec = alpha / (l * cc);
  add('speccalc-short', short({
    marks: 3,
    stem: 'A student in a college laboratory dissolves 4.50 g of an optically active compound to make 30.0 mL of solution. In a 10.0 cm polarimeter tube it rotates the plane of polarised light by −9.60°. Calculate the specific rotation and state whether the compound is dextro- or laevorotatory.',
    model: r`$l = 10.0\ \text{cm} = 1.00\ \text{dm}$ and $c = 4.50 \div 30.0 = 0.150\ \text{g mL}^{-1}$. $[\alpha] = \alpha / (l \times c) = -9.60 \div (1.00 \times 0.150) = -64.0^\circ$. The negative sign shows that the compound is laevorotatory.`,
    sol: 'c = 0.150; [α] = −64.0°; laevorotatory.',
    scheme: [['l = 1.00 dm and c = 0.150 g mL⁻¹', 1], ['[α] = −64.0°', 1], ['Laevorotatory (negative sign)', 1]],
    d: 3, c: 'application', t: [3],
  }), () => near(spec, -64.0, 0.001) || 'speccalc');
}
add('chiral-short', short({
  marks: 3,
  stem: 'A student lists three compounds from a lab notebook: (i) lactic acid, CH₃CH(OH)COOH, (ii) 2-methylbutan-1-ol, CH₃CH₂CH(CH₃)CH₂OH and (iii) 3-methylpentane, CH₃CH₂CH(CH₃)CH₂CH₃. Identify the chiral carbon, if any, in each, and state which are optically active.',
  model: '(i) Lactic acid: C-2 is bonded to H, OH, CH₃ and COOH, so it is chiral; the compound is optically active. (ii) 2-Methylbutan-1-ol: C-2 is bonded to H, CH₃, C₂H₅ and CH₂OH, all different, so it is chiral; optically active. (iii) 3-Methylpentane: C-3 has H, CH₃ and two identical ethyl groups, so there is no chiral carbon; it is optically inactive.',
  sol: 'Two chiral; one achiral.',
  scheme: [['(i) lactic acid: C-2 chiral, active', 1], ['(ii) 2-methylbutan-1-ol: C-2 chiral, active', 1], ['(iii) 3-methylpentane: no chiral carbon, inactive', 1]],
  d: 3, c: 'analysis', t: [3],
}));
add('polar-long', long({
  stem: '(a) What is plane-polarised light? How is it obtained using a Nicol prism? [2]\n\n(b) Name the instrument used to measure the angle of rotation and name its four essential parts. [1]\n\n(c) A solution of sucrose, [α] = +66.5° (given), rotates the plane of polarised light by +13.3° in a 2.00 dm tube. Find the concentration in g mL⁻¹ and the mass of sucrose in 250 mL of the solution. [2]',
  model: r`(a) Plane-polarised light vibrates in one plane only. A Nicol prism (calcite with Canada balsam) eliminates the ordinary ray by total reflection and passes the extraordinary ray, which is plane-polarised. (b) The polarimeter: light source, polariser, sample tube, analyser (with a circular scale). (c) $c = \alpha / ([\alpha] \times l) = 13.3 \div (66.5 \times 2.00) = 0.100\ \text{g mL}^{-1}$. Mass in 250 mL $= 0.100 \times 250 = 25.0\ \text{g}$.`,
  sol: 'Definition and Nicol prism; polarimeter; calculation.',
  scheme: [['(a) plane-polarised light', 1], ['(a) Nicol prism action', 1], ['(b) polarimeter and four parts', 1], ['(c) c = 0.100 g mL⁻¹', 1], ['(c) 25.0 g', 1]],
  d: 3, c: 'application', t: [3],
}), () => near(13.3 / (66.5 * 2.0), 0.1, 0.001) && near(0.1 * 250, 25.0, 0.001) || 'polarlong');

// ---------------------------------------------------------------- t04 d and l, racemic, meso; lactic and tartaric acid
add('meso-mcq', mcq({
  stem: 'meso-Tartaric acid has two chiral carbon atoms, yet a polarimeter shows no rotation for its solution. The reason is that:',
  right: 'an internal plane of symmetry makes the rotation by one half cancel that by the other half',
  wrong: ['it is a mixture of equal amounts of the d and l forms', 'its chiral carbons rotate the plane equally in the same direction', 'it has no chiral carbon atoms'],
  sol: 'The meso form has a plane of symmetry within the molecule: internal compensation — option (@K). It is a single compound, not a mixture (@1).',
  d: 2, c: 'understanding', t: [4],
}));
add('racemic-mcq', mcq({
  stem: 'A mixture prepared in a laboratory contains 0.10 mol of the d form and 0.10 mol of the l form of lactic acid. The mixture does not rotate plane-polarised light because:',
  right: 'rotations caused by the d and l molecules cancel (external compensation)',
  wrong: ['each molecule has an internal plane of symmetry', 'lactic acid has no chiral carbon', 'the d and l forms have different molar masses'],
  sol: 'An equimolar mixture of the two enantiomers is a racemic mixture; the rotation by the d form is cancelled by the l form: external compensation — option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('nstereo-mcq', mcq({
  stem: 'A food chemist studies pentane-2,3-diol, CH₃CH(OH)CH(OH)CH₂CH₃, a flavour compound. The total number of its stereoisomers is:',
  right: '4',
  wrong: ['2', '3', '8'],
  sol: 'C-2 and C-3 are both chiral and the two ends of the chain (CH₃ and C₂H₅) differ, so there is no meso form: 2² = 4 — option (@K).',
  d: 3, c: 'application', t: [4],
}));
add('tartaric-mcq', mcq({
  stem: 'Tartaric acid, found in grape juice, exists in three stereoisomeric forms: d, l and meso. How many of these forms are optically active?',
  right: '2',
  wrong: ['1', '3', '0'],
  sol: 'The d and l forms are optically active; the meso form is inactive by internal compensation — option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('count-stereo-mcq', mcq({
  stem: 'A particular molecule has three different chiral carbon atoms and no symmetry. The number of its stereoisomers is:',
  right: '8',
  wrong: ['3', '6', '9'],
  sol: 'The number of stereoisomers for n different chiral carbons is 2ⁿ = 2³ = 8 — option (@K).',
  d: 1, c: 'understanding', t: [4],
}));
add('meso-ar', ar({
  a: 'meso-Tartaric acid rotates the plane of polarised light.',
  r: 'meso-Tartaric acid has no chiral carbon atoms.',
  key: 'd',
  sol: 'A is false: the meso form is optically inactive. R is false: it has two chiral carbons, whose effects cancel inside the molecule — option (d).',
  d: 4, c: 'analysis', t: [4],
}));
add('racemic-ar', ar({
  a: 'A racemic mixture does not rotate the plane of polarised light.',
  r: 'The d and l forms in a racemic mixture rotate the plane in the same direction.',
  key: 'c',
  sol: 'A is true (external compensation), but R is false: the two forms rotate in opposite directions by equal amounts — option (c).',
  d: 2, c: 'understanding', t: [4],
}));
add('chiral-tf', tf({
  stem: 'A compound that contains two chiral carbon atoms must always be optically active.',
  key: 'f',
  sol: 'False. A meso compound, such as meso-tartaric acid, has chiral carbons but an internal plane of symmetry, so it is optically inactive.',
  d: 2, c: 'understanding', t: [4],
}));
add('meso-fill', fill({
  stem: 'A compound with chiral carbon atoms that is optically inactive because of an internal plane of symmetry is called a ___ compound.',
  acc: [['meso']],
  sol: 'A **meso** compound.',
  d: 1, c: 'recall', t: [4],
}));
add('terms-match', match({
  stem: 'Match each term in optical isomerism with its description.',
  pairs: [
    ['Dextrorotatory', 'Rotates the plane clockwise'],
    ['Laevorotatory', 'Rotates the plane anticlockwise'],
    ['Racemic mixture', 'Equimolar mixture of d and l forms'],
    ['Meso compound', 'Chiral carbons with an internal plane of symmetry'],
  ],
  order: [1, 3, 0, 2],
  sol: 'd (+): clockwise; l (−): anticlockwise; racemic: equal amounts of d and l; meso: chiral carbons with an internal mirror plane.',
  d: 1, c: 'recall', t: [3, 4],
}));
add('count-num', num({
  stem: 'A drug candidate in a research notebook, 2-bromo-3-chloro-4-iodohexane, has three different chiral carbon atoms (C-2, C-3 and C-4) and no symmetry. How many stereoisomers does it have?',
  value: 8, tol: 0, unit: null,
  sol: '2ⁿ = 2³ = 8 stereoisomers (four pairs of enantiomers).',
  scheme: [['2ⁿ with n = 3', 0.5], ['8', 0.5]],
  d: 1, c: 'understanding', t: [4],
}), () => 2 ** 3 === 8 || 'count');
add('meso-short', short({
  marks: 2,
  stem: 'What is a meso compound? Why is meso-tartaric acid optically inactive although it has two chiral carbon atoms?',
  model: 'A meso compound has two or more chiral carbons but also an internal plane of symmetry, so the molecule is superimposable on its mirror image. In meso-tartaric acid, the two halves are mirror images of each other, so the rotation produced by one chiral carbon is exactly cancelled by the other (internal compensation).',
  sol: 'Definition; internal compensation.',
  scheme: [['Meso: chiral carbons plus internal plane of symmetry', 1], ['One half cancels the other: internal compensation', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('compens-short', short({
  marks: 3,
  stem: 'A teacher asks the class to compare a racemic mixture of lactic acid with meso-tartaric acid. Distinguish external compensation from internal compensation, with an example of each, and say which of the two substances can be separated into optically active forms.',
  model: 'External compensation: in a racemic mixture (equal amounts of d- and l-lactic acid) the rotation by the d molecules is cancelled by the separate l molecules. Internal compensation: in meso-tartaric acid the rotation by one half of the molecule is cancelled by the other half within the same molecule. A racemic mixture can be separated (resolved) into the d and l forms; a meso compound cannot, as it is a single compound.',
  sol: 'External vs internal; resolvable only racemic.',
  scheme: [['External compensation with racemic example', 1], ['Internal compensation with meso example', 1], ['Only the racemic mixture can be resolved', 1]],
  d: 3, c: 'analysis', t: [4],
}));
add('tartaric-short', short({
  marks: 3,
  stem: 'Tartaric acid, HOOC–CH(OH)–CH(OH)–COOH, has two chiral carbon atoms but only three stereoisomers instead of four. Name the three, say which two are enantiomers, and explain why the number is three.',
  model: 'The three stereoisomers are d-(+)-tartaric acid, l-(−)-tartaric acid and meso-tartaric acid. The d and l forms are enantiomers (non-superimposable mirror images). The fourth possibility, drawn with the OH groups the other way round, turns out to be the same as the meso form, because the molecule is symmetrical (the two ends are identical) and has an internal plane of symmetry. So there are 3 and not 2² = 4.',
  sol: 'd, l and meso; symmetry.',
  scheme: [['Three forms named', 1], ['d and l are enantiomers', 1], ['Symmetry makes two of the four possibilities identical (meso)', 1]],
  d: 3, c: 'analysis', t: [4],
}));
add('lactic-tartaric-long', long({
  stem: '(a) Lactic acid, CH₃CH(OH)COOH, is optically active. Locate its chiral carbon, name the four groups on it, and state the number of stereoisomers and their names. [2]\n\n(b) Tartaric acid has two chiral carbons. Name its stereoisomers, say which pair are enantiomers and which one is inactive, and explain why it is inactive. [3]',
  model: '(a) C-2 is the chiral carbon, bonded to H, OH, CH₃ and COOH. There are two stereoisomers, the d-(+) and l-(−) forms (enantiomers); an equimolar mixture is the racemic (±) form. (b) The stereoisomers are d-(+)-tartaric acid, l-(−)-tartaric acid and meso-tartaric acid. The d and l forms are enantiomers and optically active; the meso form is inactive. It has an internal plane of symmetry, so the rotation by one chiral carbon is cancelled by the other (internal compensation).',
  sol: 'Lactic acid; tartaric acid.',
  scheme: [['(a) chiral carbon C-2 and its four groups', 1], ['(a) two stereoisomers, d and l', 1], ['(b) three forms named; d and l enantiomers', 1], ['(b) meso is inactive', 1], ['(b) internal plane of symmetry: internal compensation', 1]],
  d: 3, c: 'application', t: [4],
}));
add('compens-long', long({
  stem: '(a) Explain the terms racemic mixture and meso form. [2]\n\n(b) Compare external and internal compensation. [1]\n\n(c) Find the number of stereoisomers of (i) CH₃CHBrCHBrCH₂CH₃ and (ii) CH₃CHClCHClCH₃, and explain why they differ. [2]',
  model: '(a) A racemic mixture is an equimolar mixture of the d and l forms; it is optically inactive and can be resolved. A meso form is a single compound with chiral carbons and an internal plane of symmetry; it is inactive and cannot be resolved. (b) External compensation: cancellation of rotations between separate d and l molecules (racemic mixture). Internal compensation: cancellation of rotations between the two halves of one molecule (meso). (c) (i) 2,3-Dibromopentane has two different chiral carbons and unlike ends (CH₃ and C₂H₅): 2² = 4 stereoisomers. (ii) 2,3-Dichlorobutane has identical ends and is symmetrical: d, l and meso = 3 stereoisomers. The meso form of (ii) makes two of the four possible arrangements identical.',
  sol: 'Terms; comparison; counts.',
  scheme: [['(a) racemic mixture', 1], ['(a) meso form', 1], ['(b) external vs internal compensation', 1], ['(c) 4 and 3', 1], ['(c) symmetry explains the difference', 1]],
  d: 3, c: 'analysis', t: [4],
}));
