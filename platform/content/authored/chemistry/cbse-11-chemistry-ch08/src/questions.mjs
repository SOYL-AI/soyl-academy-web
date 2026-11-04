// ch08 Organic Chemistry: Some Basic Principles and Techniques — question bank. MCQ keys are placed by the builder (balanced);
// AR keys planned: a b c d a c. Every numerical is computed here, interpolated into stem and solution, and re-solved by the check passed to add().
import { mk, add, r, dec, sci, near } from './lib.mjs';

const { mcq, ar, tf, fill, match, num, short, long, part } = mk;
const j = (x, n = 3) => dec(x, n);
const S = (x, n = 3) => sci(x, n);

// ---------------------------------------------------------------- numbers
const n1 = { m: 0.15, co2: 0.22 };
n1.C = ((12 / 44) * n1.co2 / n1.m) * 100;
const n2 = { m: 0.28, h2o: 0.36 };
n2.H = ((2 / 18) * n2.h2o / n2.m) * 100;
const n3 = { m: 0.3, V: 40.0 };
n3.N = ((28 * n3.V) / (22400 * n3.m)) * 100;
const n4 = { m: 0.35, V: 20.0, M: 0.2 };
n4.nAcid = (n4.M * n4.V) / 1000;
n4.nN = 2 * n4.nAcid;
n4.N = ((n4.nN * 14) / n4.m) * 100;
const n5 = { m: 0.3, agbr: 0.376 };
n5.Br = ((80 / 188) * n5.agbr / n5.m) * 100;
const n6 = { m: 0.2, ba: 0.466 };
n6.S = ((32 / 233) * n6.ba / n6.m) * 100;
const n7 = { Rf: 0.35, front: 12.0 };
n7.d = n7.Rf * n7.front;
const n8 = { C: 54.5, H: 9.1, O: 36.4, M: 88 };
n8.nC = n8.C / 12;
n8.nH = n8.H / 1;
n8.nO = n8.O / 16;
n8.rC = n8.nC / n8.nO;
n8.rH = n8.nH / n8.nO;
n8.emp = 2 * 12 + 4 * 1 + 16; // C2H4O
n8.k = n8.M / n8.emp;
n8.Hatoms = 4 * n8.k;
const lc = { m: 0.46, co2: 0.88, h2o: 0.54 };
lc.mC = (12 / 44) * lc.co2;
lc.mH = (2 / 18) * lc.h2o;
lc.mO = lc.m - lc.mC - lc.mH;
lc.C = (lc.mC / lc.m) * 100;
lc.H = (lc.mH / lc.m) * 100;
lc.O = (lc.mO / lc.m) * 100;
lc.rC = lc.mC / 12;
lc.rH = lc.mH / 1;
lc.rO = lc.mO / 16;
const tl = { front: 10.0, a: 3.5, b: 6.5, q: 4.8 };
tl.Ra = tl.a / tl.front;
tl.Rb = tl.b / tl.front;
tl.Rq = tl.q / tl.front;

// ================================================================ t01 tetravalence, hybridisation, representations
add('hyb-mcq', mcq({
  stem: r`In propene, $\ce{CH3-CH=CH2}$, the hybridisation of the three carbon atoms, from left to right, is:`,
  right: 'sp³, sp², sp²',
  wrong: ['sp³, sp³, sp²', 'sp², sp², sp²', 'sp³, sp², sp'],
  sol: 'The methyl carbon has four single bonds (sp³). Each carbon of the C=C double bond has three σ bonds and one π bond (sp²) — option (@K).',
  d: 1, c: 'application', t: [1],
}));
add('sigma-pi-mcq', mcq({
  stem: r`The numbers of σ and π bonds in propyne, $\ce{CH3-C#CH}$, are:`,
  right: '6 σ and 2 π',
  wrong: ['7 σ and 1 π', '5 σ and 3 π', '6 σ and 3 π'],
  sol: 'Four C–H bonds and one C–C single bond give 5 σ; the triple bond adds 1 σ and 2 π. Total: 6 σ and 2 π — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('ethyne-ar', ar({
  a: 'Ethyne is a linear molecule.',
  r: 'Each carbon atom in ethyne is sp hybridised, with a bond angle of 180°.',
  key: 'a',
  sol: 'Both are true. Two sp orbitals on each carbon lie 180° apart, which makes the H–C≡C–H skeleton linear; R explains A — option (a).',
  d: 1, c: 'understanding', t: [1],
}));
add('benzene-tf', tf({
  stem: 'All six carbon atoms in benzene are sp² hybridised.',
  key: 't',
  sol: 'True. Each carbon has three σ bonds (two C–C and one C–H) and one p electron that forms the delocalised π system.',
  d: 1, c: 'recall', t: [1],
}));
add('nitrile-fill', fill({
  stem: 'The carbon atom of the nitrile group, –C≡N, is ___ hybridised.',
  acc: [['sp']],
  sol: 'The carbon forms one σ bond to the R group and one σ bond to nitrogen, with two π bonds: two σ bonds means **sp** hybridisation.',
  d: 1, c: 'recall', t: [1],
}));
add('tetra-short', short({
  marks: 2,
  stem: 'Write the electronic configuration of carbon and explain how it forms four equivalent bonds in methane.',
  model: 'Carbon is 1s² 2s² 2p². One 2s electron is promoted to the 2p orbital, and the 2s and three 2p orbitals mix to give four equivalent sp³ hybrid orbitals pointing to the corners of a tetrahedron. Each overlaps with an s orbital of hydrogen to give four identical σ bonds at 109.5°.',
  sol: '1s² 2s² 2p²; promotion; four sp³ orbitals.',
  scheme: [['Configuration and promotion', 1], ['Four sp³ orbitals, tetrahedral, equal bonds', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('bondline-short', short({
  marks: 2,
  stem: r`Name the compound $\ce{CH3CH2CH(CH3)CH2OH}$ and give its molecular formula.`,
  model: r`The longest chain containing the OH group has four carbons, numbered from the carbon bearing OH, with a methyl on carbon 2: the name is 2-methylbutan-1-ol. It has five carbons, eleven hydrogens on carbon and one on oxygen, so the molecular formula is $\ce{C5H12O}$.`,
  sol: '2-methylbutan-1-ol, C₅H₁₂O.',
  scheme: [['Correct IUPAC name', 1], ['Molecular formula', 1]],
  d: 2, c: 'application', t: [1, 2],
}));

// ================================================================ t02 classification and nomenclature
add('name-mcq', mcq({
  stem: r`The IUPAC name of $\ce{CH3CH2CH(CH3)CH(CH3)2}$ is:`,
  right: '2,3-dimethylpentane',
  wrong: ['3,4-dimethylpentane', '2-ethyl-3-methylbutane', '2,3-dimethylhexane'],
  sol: 'The longest chain has five carbons (pentane). Numbering from the end that gives the methyl groups the lowest locants places them on carbons 2 and 3 — option (@K). (@1) uses the higher set of locants and (@2) does not choose the longest chain.',
  d: 2, c: 'application', t: [2],
}));
add('fg-mcq', mcq({
  stem: r`The compound $\ce{CH3COCH2COOH}$ contains the functional groups:`,
  right: 'ketone and carboxylic acid',
  wrong: ['aldehyde and carboxylic acid', 'ester and ketone', 'ketone and alcohol'],
  sol: 'The –CO– inside the chain is a ketone group, and –COOH is a carboxylic acid group; there is no –CHO, –OH on carbon or –COOR — option (@K).',
  d: 1, c: 'understanding', t: [2],
}));
add('prio-mcq', mcq({
  stem: r`The IUPAC name of $\ce{CH3CH(OH)CH2CH=CH2}$ is:`,
  right: 'pent-4-en-2-ol',
  wrong: ['pent-1-en-4-ol', 'pent-2-en-4-ol', '4-hydroxypent-1-ene'],
  sol: 'The alcohol outranks the alkene, so the name ends in -ol and the OH gets the lowest locant (2, not 4): pent-4-en-2-ol — option (@K). Names (@1) and (@2) number for the double bond first; (@3) names the OH as a prefix.',
  d: 3, c: 'application', t: [2],
}));
add('rings-mcq', mcq({
  stem: 'Which statement about classification is correct?',
  right: 'Pyridine is a heterocyclic aromatic compound because its ring contains nitrogen and has delocalised π electrons',
  wrong: ['Cyclohexane is aromatic because it is a ring', 'Propane is alicyclic because it has no double bond', 'Furan is an acyclic compound because oxygen is in the ring'],
  sol: 'Pyridine has a six-membered ring with one nitrogen atom (heterocyclic) and a delocalised π system (aromatic) — option (@K). Cyclohexane is alicyclic, propane is acyclic and furan is heterocyclic.',
  d: 2, c: 'understanding', t: [2],
}));
add('name-short3', short({
  marks: 3,
  stem: r`Write the IUPAC names of: (i) $\ce{CH3CH(NO2)CH2CH3}$; (ii) $\ce{OHCCH2CH2COOH}$; (iii) $\ce{CH3CH=CHCH2CH3}$.`,
  model: r`(i) 2-nitrobutane: the nitro group is only a prefix on a four-carbon chain. (ii) 4-oxobutanoic acid: the acid is the principal group and takes carbon 1, so the aldehyde is named by the prefix oxo on carbon 4. (iii) Pent-2-ene: the five-carbon chain is numbered from the end nearer the double bond.`,
  sol: '2-nitrobutane; 4-oxobutanoic acid; pent-2-ene.',
  scheme: [['(i) 2-nitrobutane', 1], ['(ii) 4-oxobutanoic acid with priority', 1], ['(iii) pent-2-ene', 1]],
  d: 3, c: 'application', t: [2],
}));
add('nomen-long', long({
  stem: r`(a) State three rules used in numbering a carbon chain in the IUPAC system.` + '\n\n' + r`(b) Write the IUPAC names of $\ce{CH3CH(CH3)CH2CH(OH)CH3}$ and $\ce{H2NCH2CH2COOH}$, giving the reason for the numbering in each.`,
  model: r`(a) Number the longest chain that contains the principal functional group so that the principal group gets the lowest locant, then multiple bonds, then substituents; list prefixes alphabetically. (b) The first compound is 4-methylpentan-2-ol: the alcohol is the principal group and receives locant 2 (not 4), and the methyl is on carbon 4. The second is 3-aminopropanoic acid: the carboxylic acid outranks the amine, so its carbon is C1 and the amino group is named by the prefix amino on carbon 3.`,
  sol: 'Rules; 4-methylpentan-2-ol; 3-aminopropanoic acid.',
  scheme: [['(a) Three rules', 2], ['(b) 4-methylpentan-2-ol with reason', 1.5], ['(b) 3-aminopropanoic acid with reason', 1.5]],
  d: 3, c: 'application', t: [2],
}));
add('fg-match', match({
  stem: 'Match each functional group with the class of compound.',
  pairs: [
    ['–CHO', 'Aldehyde'],
    ['>C=O between two carbons', 'Ketone'],
    ['–COOR', 'Ester'],
    ['–CONH₂', 'Amide'],
  ],
  order: [0, 1, 2, 3],
  sol: '–CHO is the aldehyde group, a C=O inside a chain is a ketone, –COOR is an ester and –CONH₂ is an amide.',
  d: 1, c: 'recall', t: [2],
}));

// ================================================================ t03 isomerism
add('isomer-mcq', mcq({
  stem: 'Butanal and butan-2-one both have the molecular formula C₄H₈O. They are:',
  right: 'functional group isomers',
  wrong: ['chain isomers', 'position isomers', 'metamers'],
  sol: 'Butanal contains an aldehyde group and butan-2-one a ketone group, with the same formula: functional group isomers — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('meta-mcq', mcq({
  stem: 'Which pair of compounds are metamers?',
  right: 'methoxypropane and ethoxyethane',
  wrong: ['butane and 2-methylpropane', 'propan-1-ol and propan-2-ol', 'ethanol and methoxymethane'],
  sol: 'Both ethers are C₄H₁₀O and differ in the alkyl groups on either side of the oxygen (CH₃ and C₃H₇ against two C₂H₅): metamers — option (@K). (@1) is a chain pair, (@2) a position pair and (@3) a functional group pair.',
  d: 2, c: 'understanding', t: [3],
}));
add('geom-mcq', mcq({
  stem: 'Which of the following can show geometrical (cis-trans) isomerism?',
  right: 'But-2-ene',
  wrong: ['But-1-ene', '2-methylpropene', 'Propene'],
  sol: 'Each carbon of the C=C bond in but-2-ene has two different groups (H and CH₃), so cis and trans forms exist. In the others, one doubly bonded carbon has two identical groups (two H or two CH₃) — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('chiral-mcq', mcq({
  stem: 'Which of the following contains a chiral carbon atom?',
  right: r`$\ce{CH3CH(OH)CH2CH3}$`,
  wrong: [r`$\ce{CH3CH(OH)CH3}$`, r`$\ce{CH3CH2CH2CH2OH}$`, r`$\ce{(CH3)3COH}$`],
  sol: 'In butan-2-ol, carbon 2 carries four different groups: H, OH, CH₃ and C₂H₅. In the other three, no carbon has four different groups — option (@K).',
  d: 3, c: 'application', t: [3],
}));
add('c4-tf', tf({
  stem: r`The molecular formula $\ce{C4H10}$ has exactly two chain isomers.`,
  key: 't',
  sol: 'True: butane (straight chain) and 2-methylpropane (one methyl branch). No other arrangement of four carbons in an alkane is possible.',
  d: 2, c: 'understanding', t: [3],
}));
add('isomer-short3', short({
  marks: 3,
  stem: r`Write the structural formulas (condensed) and names of the two isomers of $\ce{C4H10}$ and name the type of isomerism. Which has the lower boiling point, and why?`,
  model: r`The two isomers are butane, $\ce{CH3CH2CH2CH3}$, and 2-methylpropane, $\ce{CH3CH(CH3)CH3}$. They are chain isomers because they differ in the carbon skeleton: one is a straight chain and the other has a methyl branch. 2-methylpropane has the lower boiling point because its branched, more compact molecule has a smaller surface area, so weaker van der Waals forces act between the molecules.`,
  sol: 'Butane and 2-methylpropane; chain; branching lowers boiling point.',
  scheme: [['Both structures and names', 1], ['Chain isomerism', 1], ['Lower boiling point with reason', 1]],
  d: 3, c: 'application', t: [3],
}));
add('isomer-long', long({
  stem: r`Explain the four kinds of structural isomerism, with one example of each. Name the two kinds of stereoisomerism.`,
  model: r`Chain isomers differ in the carbon skeleton, as in butane and 2-methylpropane. Position isomers have the same skeleton but a group or multiple bond at a different place, as in propan-1-ol and propan-2-ol. Functional group isomers contain different groups, as in ethanol and methoxymethane. Metamers have different alkyl groups on either side of the same functional atom, as in methoxypropane and ethoxyethane. Stereoisomerism is of two kinds: geometrical (cis-trans) and optical.`,
  sol: 'Four types with examples; geometrical and optical.',
  scheme: [['Chain and position with examples', 1.5], ['Functional group and metamerism with examples', 2], ['Two kinds of stereoisomerism', 1.5]],
  d: 2, c: 'understanding', t: [3],
}));

// ================================================================ t04 fission, intermediates, electronic effects
add('homo-mcq', mcq({
  stem: r`Homolytic fission of the C–C bond in ethane, $\ce{CH3-CH3}$, gives:`,
  right: 'two methyl free radicals',
  wrong: ['a methyl cation and a methyl anion', 'a methyl cation and a methyl free radical', 'two methyl carbanions'],
  sol: 'In homolytic fission the shared pair splits evenly, one electron to each carbon, so two methyl free radicals form — option (@K).',
  d: 1, c: 'understanding', t: [4],
}));
add('cation-mcq', mcq({
  stem: r`The correct order of decreasing stability of the carbocations $\ce{CH3+}$, $\ce{CH3CH2+}$ and $(\ce{CH3})_2\ce{CH+}$ is:`,
  right: r`$(\ce{CH3})_2\ce{CH+} > \ce{CH3CH2+} > \ce{CH3+}$`,
  wrong: [r`$\ce{CH3+} > \ce{CH3CH2+} > (\ce{CH3})_2\ce{CH+}$`, r`$\ce{CH3CH2+} > (\ce{CH3})_2\ce{CH+} > \ce{CH3+}$`, r`$\ce{CH3+} > (\ce{CH3})_2\ce{CH+} > \ce{CH3CH2+}$`],
  sol: 'Stability rises with the number of alkyl groups on the positive carbon (+I effect and hyperconjugation): secondary > primary > methyl — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('ind-acid-mcq', mcq({
  stem: 'Which of the following is the strongest acid?',
  right: r`$\ce{Cl3CCOOH}$`,
  wrong: [r`$\ce{CH3COOH}$`, r`$\ce{ClCH2COOH}$`, r`$\ce{Cl2CHCOOH}$`],
  sol: 'Each chlorine pulls electrons through the σ bonds (−I effect), stabilising the carboxylate ion. Three chlorines give the strongest effect, so Cl₃CCOOH is the strongest acid — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('nuc-mcq', mcq({
  stem: 'Which of the following species is an electrophile?',
  right: r`$\ce{BF3}$`,
  wrong: [r`$\ce{NH3}$`, r`$\ce{OH-}$`, r`$\ce{H2O}$`],
  sol: 'Boron in BF₃ has an incomplete octet (six electrons) and accepts an electron pair, so BF₃ is an electrophile. The other three have lone pairs and are nucleophiles — option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('hyperc-mcq', mcq({
  stem: r`The number of hyperconjugative structures (α C–H bonds) in the isopropyl cation, $(\ce{CH3})_2\ce{CH+}$, is:`,
  right: '6',
  wrong: ['3', '9', '2'],
  sol: 'The positive carbon is attached to two methyl groups, each with three α C–H bonds: 2 × 3 = 6 — option (@K). (@1) is the value for the ethyl cation and (@2) for tert-butyl.',
  d: 2, c: 'application', t: [4],
}), () => 2 * 3 === 6 || 'alpha H');
add('effect-mcq', mcq({
  stem: 'Which group shows both a −I effect and a −R effect when attached to a benzene ring?',
  right: '–NO₂',
  wrong: ['–OH', '–CH₃', '–Cl'],
  sol: 'The nitro group pulls electrons through the σ bond (−I) and, through its N=O π bond, out of the ring (−R) — option (@K). –OH and –Cl show −I but +R; –CH₃ shows +I.',
  d: 2, c: 'understanding', t: [4],
}));
add('carbanion-mcq', mcq({
  stem: r`Which carbanion is the most stable?`,
  right: r`$\ce{CH3-}$`,
  wrong: [r`$\ce{CH3CH2-}$`, r`$(\ce{CH3})_2\ce{CH-}$`, r`$(\ce{CH3})_3\ce{C-}$`],
  sol: 'Alkyl groups donate electrons and increase the negative charge, destabilising a carbanion. The methyl carbanion has no alkyl groups and is the most stable — option (@K).',
  d: 3, c: 'application', t: [4],
}));
add('fission-ar', ar({
  a: 'Heterolytic fission of tert-butyl bromide takes place readily in a polar solvent.',
  r: 'Free radicals produced by homolytic fission are electrically neutral.',
  key: 'b',
  sol: 'A is true: a polar solvent stabilises the ions formed. R is also true, but it describes radicals from homolytic fission and does not explain the solvent effect on heterolytic fission — option (b).',
  d: 3, c: 'analysis', t: [4],
}));
add('acid-ar', ar({
  a: 'Trichloroethanoic acid is a stronger acid than ethanoic acid.',
  r: 'The chlorine atoms show a +I effect that stabilises the carboxylate ion.',
  key: 'c',
  sol: 'A is true. R is false: chlorine is electronegative and shows a −I effect, which stabilises the carboxylate ion by withdrawing electrons — option (c).',
  d: 3, c: 'analysis', t: [4],
}));
add('stereo-ar', ar({
  a: 'But-1-ene shows cis-trans isomerism.',
  r: 'Cis-trans isomerism requires two different groups on each carbon of the double bond.',
  key: 'd',
  sol: 'A is false: in but-1-ene one doubly bonded carbon carries two hydrogens, so there are no cis and trans forms. R is a true statement of the condition — option (d).',
  d: 2, c: 'understanding', t: [3],
}));
add('homolytic-fill', fill({
  stem: 'Homolytic fission of a covalent bond gives ___.',
  acc: [['free radicals', 'free radical', 'radicals']],
  sol: 'Each atom takes one of the shared electrons, giving **free radicals**.',
  d: 1, c: 'recall', t: [4],
}));
add('carbanion-tf', tf({
  stem: 'A carbanion becomes more stable as more alkyl groups are attached to the negatively charged carbon.',
  key: 'f',
  sol: 'False. Alkyl groups are electron-donating (+I) and intensify the negative charge, so the order is methyl > primary > secondary > tertiary, the reverse of that for carbocations.',
  d: 2, c: 'understanding', t: [4],
}));
add('homolytic-short', short({
  marks: 2,
  stem: 'Distinguish homolytic from heterolytic fission, giving the type of arrow used for each.',
  model: 'In homolytic fission the shared pair splits evenly, one electron to each atom, forming free radicals, and half-headed fish-hook arrows are used. In heterolytic fission both electrons go to the more electronegative atom, forming a cation and an anion, and a full-headed arrow is used.',
  sol: 'Radicals with fish-hook arrows; ions with full arrows.',
  scheme: [['Homolytic: radicals, half-headed arrow', 1], ['Heterolytic: ions, full-headed arrow', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('inductive-short', short({
  marks: 2,
  stem: 'Chloroethanoic acid has a pKa of about 2.9, whereas ethanoic acid has a pKa of about 4.8. Explain this difference.',
  model: 'Chlorine is more electronegative than carbon and pulls electrons along the σ bonds (−I effect). This disperses the negative charge of the chloroethanoate ion and stabilises it more than the ethanoate ion, so the acid loses its proton more easily and is stronger, with the lower pKa.',
  sol: '−I effect of Cl stabilises the anion.',
  scheme: [['−I effect of chlorine', 1], ['Stabilised anion, so stronger acid', 1]],
  d: 3, c: 'analysis', t: [4],
}));
add('ef-short', short({
  marks: 2,
  stem: 'Define electrophile and nucleophile, giving two examples of each.',
  model: r`An electrophile is an electron-deficient species that accepts an electron pair, for example $\ce{H+}$ and $\ce{BF3}$. A nucleophile is an electron-rich species that donates an electron pair to a positive centre, for example $\ce{OH-}$ and $\ce{NH3}$.`,
  sol: 'Accepts versus donates a pair; two examples each.',
  scheme: [['Electrophile defined with two examples', 1], ['Nucleophile defined with two examples', 1]],
  d: 1, c: 'recall', t: [4],
}));
add('resonance-short3', short({
  marks: 3,
  stem: 'All six carbon–carbon bonds in benzene are 139 pm long, although the Kekulé structure shows three single and three double bonds. Explain this, and say what the resonance energy implies.',
  model: 'Benzene is not described by either Kekulé structure alone. The real molecule is a resonance hybrid of the two, in which the six π electrons are delocalised over the ring, so every carbon–carbon bond is equal in length, between a single bond (154 pm) and a double bond (134 pm). The hybrid is more stable than either contributing structure, and the resonance energy measures this extra stability.',
  sol: 'Hybrid of two structures; delocalised π electrons; extra stability.',
  scheme: [['Hybrid of two Kekulé structures', 1], ['Delocalisation gives equal bonds (139 pm)', 1], ['Hybrid more stable: resonance energy', 1]],
  d: 3, c: 'understanding', t: [4],
}));
add('hyper-short3', short({
  marks: 3,
  stem: r`Use hyperconjugation to explain why the isopropyl cation $(\ce{CH3})_2\ce{CH+}$ is more stable than the ethyl cation $\ce{CH3CH2+}$.`,
  model: r`In hyperconjugation the electrons of an α C–H σ bond are delocalised into the empty p orbital of the positive carbon, which spreads the charge. The ethyl cation has one methyl group with three α C–H bonds, so it has three hyperconjugative structures. The isopropyl cation has two methyl groups and six α C–H bonds, so it has six structures, a greater delocalisation, and is more stable.`,
  sol: 'Three versus six α C–H bonds.',
  scheme: [['Hyperconjugation defined', 1], ['Three versus six hyperconjugative structures', 1], ['More delocalisation: more stable', 1]],
  d: 3, c: 'analysis', t: [4],
}));
add('effects-long', long({
  stem: r`Explain the inductive effect, the resonance effect and hyperconjugation, with one example of each, and state which of them is temporary.`,
  model: r`The inductive effect is the permanent shift of σ electrons caused by an electronegative group; in 1-chlorobutane the C–Cl bond is polarised and the effect fades along the chain. The resonance effect is the delocalisation of π electrons or lone pairs, as in benzene or the ethanoate ion, where all C–O bonds become equal. Hyperconjugation is the delocalisation of σ(C–H) electrons into an adjacent p orbital or π bond, which makes a tertiary carbocation more stable than a primary one. All three are permanent; the temporary effect is the electromeric effect.`,
  sol: 'Three effects with examples; electromeric is temporary.',
  scheme: [['Inductive effect with example', 1.5], ['Resonance effect with example', 1.5], ['Hyperconjugation with example', 1.5], ['Electromeric effect is temporary', 0.5]],
  d: 3, c: 'understanding', t: [4],
}));
add('cation-case', mk.case({
  passage: r`In a reaction that goes through a carbocation, the rate of ionisation of alkyl bromides in a polar solvent follows the order 3° > 2° > 1°. Four cations are considered: $\ce{CH3+}$, $\ce{CH3CH2+}$, $(\ce{CH3})_2\ce{CH+}$ and $(\ce{CH3})_3\ce{C+}$.`,
  d: 3, c: 'analysis',
  children: [
    part('a', mcq({
      stem: 'Which statement about the shape of a carbocation is correct?',
      right: 'The positive carbon is sp² hybridised and the cation is planar',
      wrong: ['The positive carbon is sp³ hybridised and the cation is pyramidal', 'The positive carbon is sp hybridised and the cation is linear', 'The positive carbon has a lone pair and is tetrahedral'],
      sol: 'A carbocation has three σ bonds and an empty p orbital: sp² hybridisation and a trigonal planar shape — option (@K).',
      d: 2, c: 'understanding', t: [4],
    })),
    part('b', short({
      marks: 1, wl: null,
      stem: r`How many α C–H bonds are in $(\ce{CH3})_3\ce{C+}$?`,
      model: r`Three methyl groups with three C–H bonds each: $3 \times 3 = 9$.`,
      sol: 'Three methyl groups: nine.',
      scheme: [['9', 1]],
      d: 1, c: 'application', t: [4],
    }), []),
    part('c', short({
      marks: 2, wl: null,
      stem: 'Explain why the tertiary alkyl bromide ionises faster than the primary one.',
      model: 'Ionisation gives a carbocation, and the tertiary cation is the most stable because three alkyl groups donate electrons (+I) and give nine α C–H bonds for hyperconjugation. A more stable intermediate forms faster, so the tertiary bromide ionises faster.',
      sol: 'More stable tertiary cation: +I and hyperconjugation.',
      scheme: [['Tertiary cation more stable', 1], ['+I effect and hyperconjugation', 1]],
      d: 3, c: 'analysis', t: [4],
    }), [
      short({
        marks: 2, wl: null,
        stem: 'Arrange the four cations in increasing order of stability and give the reason in one line.',
        model: r`$\ce{CH3+} < \ce{CH3CH2+} < (\ce{CH3})_2\ce{CH+} < (\ce{CH3})_3\ce{C+}$, because stability increases with the number of electron-donating alkyl groups.`,
        sol: 'Methyl < primary < secondary < tertiary.',
        scheme: [['Correct order', 1], ['Reason: alkyl groups', 1]],
        d: 2, c: 'application', t: [4],
      }),
    ]),
  ],
}));

// ================================================================ t05 reactions, purification, analysis
add('types-match', match({
  stem: 'Match each organic reaction (of methane, ethene, bromoethane and ammonium cyanate) with its reaction type.',
  pairs: [
    [r`$\ce{CH4 + Cl2 -> CH3Cl + HCl}$ (light)`, 'Free radical substitution'],
    [r`$\ce{C2H4 + HBr -> C2H5Br}$`, 'Electrophilic addition'],
    [r`$\ce{C2H5Br + KOH -> C2H4 + KBr + H2O}$`, 'Elimination'],
    [r`$\ce{NH4CNO -> (NH2)2CO}$`, 'Rearrangement'],
  ],
  order: [0, 1, 2, 3],
  sol: 'Methane and chlorine under light: radical substitution. Ethene and HBr: electrophilic addition. Loss of HBr from bromoethane: elimination. Ammonium cyanate to urea: rearrangement.',
  d: 2, c: 'understanding', t: [5],
}));
add('method-match', match({
  stem: 'Match each purification problem with the best method.',
  pairs: [
    ['Naphthalene mixed with sand', 'Sublimation'],
    ['Acetone and methanol', 'Fractional distillation'],
    ['Aniline from tarry impurities', 'Steam distillation'],
    ['Glycerol that decomposes at its boiling point', 'Distillation under reduced pressure'],
  ],
  order: [0, 1, 2, 3],
  sol: 'Naphthalene sublimes and sand does not. Acetone (329 K) and methanol (338 K) differ little in boiling point. Aniline is steam volatile and water immiscible. Glycerol is boiled at a lower pressure to avoid decomposition.',
  d: 2, c: 'application', t: [5],
}));
add('steam-mcq', mcq({
  stem: 'Which of the following is best purified by steam distillation?',
  right: 'Aniline, which is steam volatile and immiscible with water',
  wrong: ['A mixture of acetone and methanol', 'Glycerol, which decomposes at its boiling point', 'Sugar mixed with common salt'],
  sol: 'Steam distillation suits a substance that is volatile in steam and immiscible with water, like aniline. Acetone and methanol need fractional distillation, glycerol needs reduced pressure, and sugar and salt are separated by crystallisation — option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('kj-mcq', mcq({
  stem: 'The Kjeldahl method is NOT suitable for estimating the nitrogen in:',
  right: 'nitrobenzene',
  wrong: ['aniline', 'urea', 'methylamine'],
  sol: 'In the Kjeldahl digestion, nitrogen of nitro and azo groups and of ring nitrogen is not converted completely to ammonium sulfate. Amines and amides such as aniline, urea and methylamine are converted — option (@K).',
  d: 3, c: 'understanding', t: [5],
}));
add('liebig-mcq', mcq({
  stem: 'In the Liebig method, the carbon dioxide produced on combustion is absorbed in:',
  right: 'concentrated potassium hydroxide solution',
  wrong: ['anhydrous calcium chloride', 'concentrated sulfuric acid', 'copper(II) oxide'],
  sol: 'KOH solution absorbs CO₂, forming potassium carbonate. Anhydrous CaCl₂ absorbs the water. CuO is the oxidising agent used to burn the sample — option (@K).',
  d: 1, c: 'recall', t: [5],
}));
add('fract-mcq', mcq({
  stem: 'A mixture of acetone (boiling point 329 K) and methanol (boiling point 338 K) is best separated by:',
  right: 'fractional distillation',
  wrong: ['simple distillation', 'steam distillation', 'crystallisation'],
  sol: 'The boiling points differ by only about 9 K, so a fractionating column is needed to repeat vaporisation and condensation — option (@K). Simple distillation works when the boiling points differ considerably.',
  d: 2, c: 'application', t: [5],
}));
add('rf-mcq', mcq({
  stem: 'Which of the following cannot be the Rf value of a compound in thin layer chromatography?',
  right: '1.20',
  wrong: ['0.25', '0.80', '0.05'],
  sol: 'Rf is the distance moved by the spot divided by the distance moved by the solvent. A spot cannot travel farther than the solvent front, so Rf is always less than 1 — option (@K).',
  d: 1, c: 'understanding', t: [5],
}));
add('lass-mcq', mcq({
  stem: 'A student boils a sodium fusion extract with iron(II) sulfate, then acidifies with concentrated sulfuric acid and gets a Prussian blue colour. The element detected is:',
  right: 'nitrogen',
  wrong: ['sulfur', 'chlorine', 'phosphorus'],
  sol: 'Cyanide ions from the fusion form hexacyanoferrate(II), which gives Prussian blue with iron(III) ions. This is the test for nitrogen — option (@K). Sulfur is tested with lead ethanoate and halogens with silver nitrate.',
  d: 1, c: 'recall', t: [5],
}));
add('carius-ar', ar({
  a: 'The sodium fusion extract is boiled with dilute nitric acid before silver nitrate is added in the test for halogens.',
  r: 'Boiling with nitric acid decomposes sodium cyanide and sodium sulfide, which would also give precipitates with silver nitrate.',
  key: 'a',
  sol: 'Both are true. Cyanide and sulfide ions are destroyed as HCN and H₂S by nitric acid, so that only halide ions precipitate with Ag⁺. R explains A — option (a).',
  d: 2, c: 'understanding', t: [5],
}));
add('dist-ar', ar({
  a: 'Aniline can be purified by steam distillation.',
  r: 'Aniline is completely miscible with water.',
  key: 'c',
  sol: 'A is true. R is false: aniline is immiscible with water, and it is this immiscibility, with steam volatility, that makes steam distillation suitable — option (c).',
  d: 3, c: 'analysis', t: [5],
}));
add('fract-tf', tf({
  stem: 'Fractional distillation is used to separate liquids whose boiling points differ greatly.',
  key: 'f',
  sol: 'False. Fractional distillation is used when the boiling points are close; liquids with a large difference can be separated by simple distillation.',
  d: 1, c: 'understanding', t: [5],
}));
add('rf-fill', fill({
  stem: 'The Rf value of a component is always less than ___.',
  acc: [['1', 'one']],
  sol: 'The spot cannot move farther than the solvent front, so Rf is always less than **1**.',
  d: 1, c: 'recall', t: [5],
}));
add('subl-short', short({
  marks: 2,
  stem: 'A sample of naphthalene is contaminated with sand. Name the method of purification, state the principle and describe the procedure in brief.',
  model: 'Sublimation is used, because naphthalene changes directly from solid to vapour on heating while sand does not. The mixture is gently heated in a china dish covered with an inverted funnel. Naphthalene vapour condenses as pure crystals on the cool funnel, and the sand remains behind.',
  sol: 'Sublimation: solid to vapour directly; pure crystals on a cool funnel.',
  scheme: [['Sublimation and its principle', 1], ['Procedure and result', 1]],
  d: 2, c: 'application', t: [5],
}));
add('rf-short', short({
  marks: 2,
  stem: 'Define the Rf value. Why is it always less than one, and what is its unit?',
  model: 'Rf is the distance moved by a component divided by the distance moved by the solvent front, both from the start line. The component is held back by the stationary phase, so it cannot outrun the solvent, and Rf is below one. It is a ratio of two distances, so it has no unit.',
  sol: 'Distance of spot over distance of solvent; below 1; no unit.',
  scheme: [['Definition', 1], ['Less than one, no unit', 1]],
  d: 2, c: 'understanding', t: [5],
}));
add('lass-short3', short({
  marks: 3,
  stem: r`Describe the Lassaigne test for nitrogen in an organic compound. Write the equation for the formation of the nitrogen-containing salt and state the observation.`,
  model: r`The compound is fused with sodium metal, plunged into water, boiled and filtered to give the extract. The nitrogen is converted to sodium cyanide: $\ce{Na + C + N -> NaCN}$. The extract is boiled with iron(II) sulfate, cooled and acidified with concentrated sulfuric acid. A Prussian blue colour shows that nitrogen is present.`,
  sol: 'Fusion with Na; NaCN; FeSO₄ and acid: Prussian blue.',
  scheme: [['Sodium fusion and extract', 1], ['Equation for NaCN', 1], ['Reagents and Prussian blue', 1]],
  d: 2, c: 'understanding', t: [5],
}));
add('purif-long', long({
  stem: r`Describe (a) fractional distillation, (b) steam distillation and (c) differential extraction, giving the principle and one use of each.`,
  model: r`(a) Fractional distillation separates liquids with close boiling points, such as acetone and methanol; a fractionating column provides repeated vaporisation and condensation, so the more volatile liquid collects first. (b) Steam distillation purifies a substance that is volatile in steam and immiscible with water, such as aniline; it distils below its own boiling point with the steam. (c) Differential extraction uses two immiscible solvents: an organic compound in water is shaken with ether, in which it is more soluble, and the ether layer is separated and evaporated.`,
  sol: 'Principle and use of three methods.',
  scheme: [['(a) Fractional distillation with principle and use', 1.5], ['(b) Steam distillation with principle and use', 1.5], ['(c) Differential extraction with principle and use', 2]],
  d: 3, c: 'understanding', t: [5],
}));
add('quant-long', long({
  stem: r`Describe the principle of the Dumas method and of the Kjeldahl method for estimating nitrogen. Write the formula for the percentage of nitrogen in each, and give one limitation of the Kjeldahl method.`,
  model: r`In the Dumas method, the compound is heated with copper oxide in a stream of carbon dioxide; the nitrogen is liberated as N₂ and collected over potassium hydroxide solution, and its volume at STP is measured, so $\%\text{N} = \dfrac{28 \times V}{22400 \times m} \times 100$ with V in mL. In the Kjeldahl method, the compound is digested with concentrated sulfuric acid to give ammonium sulfate; sodium hydroxide releases ammonia, which is absorbed in standard acid and the unused acid is titrated, so $\%\text{N} = \dfrac{1.4NV}{m}$. Kjeldahl does not work for nitro, azo and ring nitrogen.`,
  sol: 'Dumas: N₂ volume; Kjeldahl: ammonia titration; formula and limitation.',
  scheme: [['Dumas principle and formula', 2], ['Kjeldahl principle and formula', 2], ['Limitation of Kjeldahl', 1]],
  d: 3, c: 'understanding', t: [5],
}));

// ---------------------------------------------------------------- numericals
add('liebig-c-num', num({
  stem: r`In a combustion analysis, $${j(n1.m)}\ \text{g}$ of an organic compound gave $${j(n1.co2, 4)}\ \text{g}$ of carbon dioxide (C = 12, O = 16). Calculate the percentage of carbon.`,
  value: Number(j(n1.C, 3)), tol: 0.1, unit: '%',
  sol: r`$\%\text{C} = \dfrac{12}{44} \times \dfrac{${j(n1.co2, 4)}}{${j(n1.m)}} \times 100 = ${j(n1.C, 3)}$, i.e. ${j(n1.C, 3)}% of carbon.`,
  scheme: [['12/44 of the CO₂ mass is carbon', 1], ['40.0%', 1]],
  marks: 2, d: 2, c: 'application', t: [5],
}), () => near((12 / 44) * 0.22 / 0.15 * 100, 40.0, 0.002) || 'C');
add('liebig-h-num', num({
  stem: r`A hydrocarbon sample of mass $${j(n2.m)}\ \text{g}$ gave $${j(n2.h2o, 3)}\ \text{g}$ of water on complete combustion (H = 1, O = 16). Calculate the percentage of hydrogen.`,
  value: Number(j(n2.H, 3)), tol: 0.05, unit: '%',
  sol: r`$\%\text{H} = \dfrac{2}{18} \times \dfrac{${j(n2.h2o, 3)}}{${j(n2.m)}} \times 100 = ${j(n2.H, 4)}$, so ${j(n2.H, 3)}% of hydrogen.`,
  scheme: [['2/18 of the water mass is hydrogen', 1], ['14.3%', 1]],
  marks: 2, d: 2, c: 'application', t: [5],
}), () => near((2 / 18) * 0.36 / 0.28 * 100, 14.29, 0.002) || 'H');
add('dumas-num', num({
  stem: r`In the Dumas method, $${j(n3.m)}\ \text{g}$ of an organic compound gave $${j(n3.V, 3)}\ \text{mL}$ of nitrogen at STP (given; 22 400 mL of gas at STP has a mass of 28 g for $\ce{N2}$). Calculate the percentage of nitrogen.`,
  value: Number(j(n3.N, 3)), tol: 0.05, unit: '%',
  sol: r`Mass of nitrogen $= \dfrac{28 \times ${j(n3.V, 3)}}{22400} = ${j((28 * n3.V) / 22400, 3)}\ \text{g}$. $\%\text{N} = \dfrac{${j((28 * n3.V) / 22400, 3)}}{${j(n3.m)}} \times 100 = ${j(n3.N, 4)}$, so ${j(n3.N, 3)}% of nitrogen.`,
  scheme: [['Mass of N₂ from the STP volume', 1], ['Percentage 16.7%', 1]],
  marks: 2, d: 3, c: 'application', t: [5],
}), () => near((28 * 40.0) / (22400 * 0.3) * 100, 16.67, 0.002) || 'N');
add('kjeldahl-num', num({
  stem: r`In a Kjeldahl estimation, the ammonia from $${j(n4.m)}\ \text{g}$ of a compound neutralised $${j(n4.V, 3)}\ \text{mL}$ of $${j(n4.M, 3)}\ \text{mol L}^{-1}$ $\ce{H2SO4}$ (N = 14). Calculate the percentage of nitrogen.`,
  value: Number(j(n4.N, 3)), tol: 0.1, unit: '%',
  sol: r`$n(\text{H}_2\text{SO}_4) = ${j(n4.M, 3)} \times ${j(n4.V, 3)}/1000 = ${S(n4.nAcid, 3)}\ \text{mol}$. Each H₂SO₄ neutralises 2 NH₃, so $n(\text{N}) = ${S(n4.nN, 3)}\ \text{mol}$ and $\%\text{N} = \dfrac{${S(n4.nN, 3)} \times 14}{${j(n4.m)}} \times 100 = ${j(n4.N, 3)}$.`,
  scheme: [['Moles of acid and 2 : 1 ratio', 1], ['Mass of N', 1], ['32.0%', 1]],
  marks: 3, d: 3, c: 'application', t: [5],
}), () => near(((2 * 0.2 * 20.0 / 1000) * 14) / 0.35 * 100, 32.0, 0.002) || 'N');
add('carius-num', num({
  stem: r`$${j(n5.m)}\ \text{g}$ of an organic bromine compound, heated with fuming nitric acid and silver nitrate (Carius method), gave $${j(n5.agbr, 3)}\ \text{g}$ of silver bromide (Br = 80, Ag = 108). Calculate the percentage of bromine.`,
  value: Number(j(n5.Br, 3)), tol: 0.1, unit: '%',
  sol: r`Molar mass of AgBr $= 108 + 80 = 188$. $\%\text{Br} = \dfrac{80}{188} \times \dfrac{${j(n5.agbr, 3)}}{${j(n5.m)}} \times 100 = ${j(n5.Br, 4)}$, so ${j(n5.Br, 3)}% of bromine.`,
  scheme: [['AgBr = 188 and 80/188 factor', 1], ['53.3%', 1]],
  marks: 2, d: 3, c: 'application', t: [5],
}), () => near((80 / 188) * 0.376 / 0.3 * 100, 53.33, 0.002) || 'Br');
add('sulfur-num', num({
  stem: r`$${j(n6.m)}\ \text{g}$ of an organic sulfur compound gave $${j(n6.ba, 3)}\ \text{g}$ of barium sulfate (Ba = 137, S = 32, O = 16). Calculate the percentage of sulfur.`,
  value: Number(j(n6.S, 3)), tol: 0.1, unit: '%',
  sol: r`Molar mass of $\text{BaSO}_4 = 137 + 32 + 64 = 233$. $\%\text{S} = \dfrac{32}{233} \times \dfrac{${j(n6.ba, 3)}}{${j(n6.m)}} \times 100 = ${j(n6.S, 4)}$, so ${j(n6.S, 3)}% of sulfur.`,
  scheme: [['BaSO₄ = 233 and 32/233 factor', 1], ['32.0%', 1]],
  marks: 2, d: 3, c: 'application', t: [5],
}), () => near((32 / 233) * 0.466 / 0.2 * 100, 32.0, 0.002) || 'S');
add('rf-num', num({
  stem: r`A compound has $R_f = ${j(n7.Rf)}$ in a solvent system. In an experiment the solvent front moved $${j(n7.front, 3)}\ \text{cm}$ from the start line. How far, in cm, did the compound's spot move?`,
  value: Number(j(n7.d, 3)), tol: 0.05, unit: 'cm',
  sol: r`$R_f = \dfrac{d_\text{spot}}{d_\text{solvent}}$, so $d_\text{spot} = ${j(n7.Rf)} \times ${j(n7.front, 3)} = ${j(n7.d, 3)}\ \text{cm}$.`,
  scheme: [['Rearranging Rf', 1], ['4.2 cm', 1]],
  marks: 2, d: 2, c: 'application', t: [5],
}), () => near(0.35 * 12.0, 4.2, 1e-9) || 'd');
add('empirical-num', num({
  stem: r`A compound contains ${j(n8.C, 3)}% C, ${j(n8.H, 2)}% H and ${j(n8.O, 3)}% O (given) and has a molar mass of ${n8.M} g mol⁻¹. Find the number of hydrogen atoms in a molecule of the compound.`,
  value: n8.Hatoms, tol: 0, unit: null,
  sol: r`Moles per 100 g: C $= ${j(n8.C, 3)}/12 \approx ${j(n8.nC, 3)}$; H $= ${j(n8.H, 2)}/1 = ${j(n8.nH, 2)}$; O $= ${j(n8.O, 3)}/16 \approx ${j(n8.nO, 3)}$. Dividing by the smallest value, ${j(n8.nO, 3)}, gives the ratio C : H : O = 2 : 4 : 1, so the empirical formula is $\ce{C2H4O}$ with mass ${n8.emp}. Then $n = ${n8.M}/${n8.emp} = ${n8.k}$, so the molecular formula is $\ce{C4H8O2}$ and the number of hydrogen atoms is $4 \times ${n8.k} = ${n8.Hatoms}$.`,
  scheme: [['Mole ratio 2 : 4 : 1', 1], ['Empirical mass 44 and n = 2', 1], ['C₄H₈O₂, so 8 hydrogens', 1]],
  marks: 3, d: 4, c: 'application', t: [5],
}), () => near(n8.rC, 2, 0.01) && near(n8.rH, 4, 0.01) && n8.Hatoms === 8 || 'formula');

// ---------------------------------------------------------------- case-based
add('liebig-case', mk.case({
  passage: r`A compound that contains carbon, hydrogen and oxygen is analysed by the Liebig method. A sample of mass $${j(lc.m, 3)}\ \text{g}$ gave $${j(lc.co2, 3)}\ \text{g}$ of carbon dioxide and $${j(lc.h2o, 3)}\ \text{g}$ of water.

| Quantity | Value |
|---|---|
| Mass of sample | ${j(lc.m, 3)} g |
| Mass of CO₂ formed | ${j(lc.co2, 3)} g |
| Mass of H₂O formed | ${j(lc.h2o, 3)} g |

(C = 12, H = 1, O = 16.)`,
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'In the Liebig apparatus, the water formed is absorbed in:',
      right: 'anhydrous calcium chloride in a U-tube',
      wrong: ['potassium hydroxide solution', 'copper(II) oxide', 'concentrated sulfuric acid in the combustion tube'],
      sol: 'Anhydrous CaCl₂ absorbs the water vapour, and the increase in its mass is the mass of water. KOH absorbs the carbon dioxide and CuO is the oxidising agent — option (@K).',
      d: 1, c: 'recall', t: [5],
    })),
    part('b', short({
      marks: 1, wl: null,
      stem: 'Calculate the mass of carbon in the sample.',
      model: r`$\dfrac{12}{44} \times ${j(lc.co2, 3)} = ${j(lc.mC, 3)}\ \text{g}$.`,
      sol: r`$12/44 \times 0.88 = 0.24\ \text{g}$.`,
      scheme: [['0.240 g', 1]],
      d: 2, c: 'application', t: [5],
    }), []),
    part('c', short({
      marks: 2, wl: null,
      stem: 'Find the empirical formula of the compound.',
      model: r`$m(\text{H}) = \dfrac{2}{18} \times ${j(lc.h2o, 3)} = ${j(lc.mH, 3)}\ \text{g}$ and $m(\text{O}) = ${j(lc.m, 3)} - ${j(lc.mC, 3)} - ${j(lc.mH, 3)} = ${j(lc.mO, 3)}\ \text{g}$. Moles: C $= ${j(lc.rC, 3)}$, H $= ${j(lc.rH, 3)}$, O $= ${j(lc.rO, 3)}$ in the ratio 2 : 6 : 1, so the empirical formula is $\ce{C2H6O}$.`,
      sol: r`C : H : O = 0.020 : 0.060 : 0.010 = 2 : 6 : 1, so $\ce{C2H6O}$.`,
      scheme: [['Masses of H and O', 1], ['Ratio 2 : 6 : 1 and C₂H₆O', 1]],
      d: 3, c: 'application', t: [5],
    }), [
      short({
        marks: 2, wl: null,
        stem: 'Calculate the percentage of oxygen in the compound.',
        model: r`$m(\text{O}) = ${j(lc.mO, 3)}\ \text{g}$, so $\%\text{O} = \dfrac{${j(lc.mO, 3)}}{${j(lc.m, 3)}} \times 100 = ${j(lc.O, 3)}$%.`,
        sol: r`$0.160/0.460 \times 100 = ${j(lc.O, 3)}$%.`,
        scheme: [['Oxygen by difference, 0.160 g', 1], ['34.8%', 1]],
        d: 3, c: 'application', t: [5],
      }),
    ]),
  ],
}), () => near(lc.mC, 0.24, 1e-9) && near(lc.rC / lc.rO, 2, 1e-9) && near(lc.rH / lc.rO, 6, 1e-9) || 'case');
add('tlc-case', mk.case({
  passage: r`A mixture of two compounds is analysed by thin layer chromatography. The solvent front moved $${j(tl.front, 3)}\ \text{cm}$ from the start line. The distance moved by each spot is given.

| Lane | Distance moved by spot (cm) |
|---|---|
| Mixture, lower spot | ${j(tl.a, 2)} |
| Mixture, upper spot | ${j(tl.b, 2)} |
| Reference P | ${j(tl.a, 2)} |
| Reference Q | ${j(tl.q, 2)} |
| Reference R | ${j(tl.b, 2)} |`,
  d: 3, c: 'analysis',
  children: [
    part('a', mcq({
      stem: 'Which reference compounds are present in the mixture?',
      right: 'P and R',
      wrong: ['P and Q', 'Q and R', 'P, Q and R'],
      sol: 'The two spots in the mixture lane travel the same distances as references P (3.5 cm) and R (6.5 cm). Q (4.8 cm) matches neither spot — option (@K).',
      d: 2, c: 'analysis', t: [5],
    })),
    part('b', short({
      marks: 1, wl: null,
      stem: 'Calculate the Rf value of the upper spot in the mixture.',
      model: r`$R_f = ${j(tl.b, 2)}/${j(tl.front, 3)} = ${j(tl.Rb, 2)}$.`,
      sol: r`$6.5/10.0 = ${j(tl.Rb, 2)}$.`,
      scheme: [['0.65', 1]],
      d: 2, c: 'application', t: [5],
    }), []),
    part('c', short({
      marks: 2, wl: null,
      stem: 'Calculate the Rf value of reference Q and state why Q is not present in the mixture.',
      model: r`$R_f(\text{Q}) = ${j(tl.q, 2)}/${j(tl.front, 3)} = ${j(tl.Rq, 2)}$. No spot of the mixture has this Rf (the mixture's spots are at ${j(tl.Ra, 2)} and ${j(tl.Rb, 2)}), so Q is absent.`,
      sol: r`$4.8/10.0 = ${j(tl.Rq, 2)}$; no matching spot.`,
      scheme: [['Rf of Q = 0.48', 1], ['No matching spot, so absent', 1]],
      d: 3, c: 'analysis', t: [5],
    }), [
      short({
        marks: 2, wl: null,
        stem: 'Which of P and R is more strongly adsorbed on the plate? Give a reason.',
        model: r`P is more strongly adsorbed: its spot moved less (Rf ${j(tl.Ra, 2)} against ${j(tl.Rb, 2)}), so it is held back more strongly by the stationary phase than R, which is carried further by the solvent.`,
        sol: 'P: the lower Rf means stronger adsorption.',
        scheme: [['P is more strongly adsorbed', 1], ['Reason from the lower Rf', 1]],
        d: 3, c: 'evaluation', t: [5],
      }),
    ]),
  ],
}), () => near(tl.Rb, 0.65, 1e-9) && near(tl.Rq, 0.48, 1e-9) || 'Rf');
add('lass-case', mk.case({
  passage: r`A sodium fusion extract of an organic compound is tested as follows.

| Test | Observation |
|---|---|
| Boil with FeSO₄, cool, acidify with conc. H₂SO₄ | Prussian blue colour |
| Lead ethanoate in ethanoic acid | No black precipitate |
| Boil with HNO₃, add AgNO₃ | Pale yellow precipitate, sparingly soluble in NH₃ |`,
  d: 3, c: 'analysis',
  children: [
    part('a', mcq({
      stem: 'The elements shown to be present are:',
      right: 'nitrogen and bromine',
      wrong: ['nitrogen and chlorine', 'sulfur and bromine', 'nitrogen and sulfur'],
      sol: 'Prussian blue shows nitrogen; no black PbS means sulfur is absent; a pale yellow silver halide sparingly soluble in ammonia is AgBr, so bromine is present — option (@K).',
      d: 2, c: 'analysis', t: [5],
    })),
    part('b', short({
      marks: 1, wl: null,
      stem: 'Which test shows that sulfur is absent?',
      model: 'The test with lead ethanoate, because no black precipitate of lead sulfide formed.',
      sol: 'Lead ethanoate test.',
      scheme: [['Lead ethanoate test', 1]],
      d: 1, c: 'understanding', t: [5],
    }), []),
    part('c', short({
      marks: 2, wl: null,
      stem: r`Write the ionic equation for the precipitate formed in the third test, and explain why the extract is boiled with nitric acid first.`,
      model: r`$\ce{Ag+ + Br- -> AgBr}$. Boiling with nitric acid decomposes any cyanide and sulfide ions as HCN and H₂S, which would otherwise also give precipitates with silver nitrate.`,
      sol: r`$\ce{Ag+ + Br- -> AgBr}$; HNO₃ removes CN⁻ and S²⁻.`,
      scheme: [['Ionic equation', 1], ['Role of nitric acid', 1]],
      d: 3, c: 'application', t: [5],
    }), [
      short({
        marks: 2, wl: null,
        stem: r`Write the equations for the conversion of bromine and nitrogen of the compound to sodium salts in the fusion.`,
        model: r`$\ce{Na + Br -> NaBr}$ and $\ce{Na + C + N -> NaCN}$: the compound is fused with sodium and the ionic salts are extracted into water.`,
        sol: r`$\ce{Na + Br -> NaBr}$; $\ce{Na + C + N -> NaCN}$.`,
        scheme: [['NaBr equation', 1], ['NaCN equation', 1]],
        d: 2, c: 'application', t: [5],
      }),
    ]),
  ],
}));
