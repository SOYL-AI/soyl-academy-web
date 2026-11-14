// ch20 question bank, part 1: t01 types of reaction, t02 fission and reactive intermediates, t03 electrophiles and nucleophiles.
import { mk, add, r } from './lib.mjs';

const { mcq, ar, tf, fill, match, short, long } = mk;

// ---------------------------------------------------------------- t01 types of reaction
add('kcn-mcq', mcq({
  stem: r`A process chemist converts bromoethane into propanenitrile by warming it with ethanolic potassium cyanide: $\ce{C2H5Br + KCN -> C2H5CN + KBr}$. The reaction is best classified as:`,
  right: 'nucleophilic substitution',
  wrong: ['electrophilic addition', 'elimination', 'free-radical substitution'],
  sol: 'The cyanide ion (a nucleophile) replaces bromine on a saturated carbon, so one group is substituted by another: nucleophilic substitution — option (@K). Nothing is added across a double bond (@1) and no small molecule is lost to form a double bond (@2); no radicals are involved (@3).',
  d: 1, c: 'understanding', t: [1],
}));
add('hbr-mcq', mcq({
  stem: r`In a demonstration at a college, propene is passed into a solution of hydrogen bromide in ethanoic acid and 2-bromopropane forms: $\ce{CH3CH=CH2 + HBr -> CH3CHBrCH3}$. The reaction type is:`,
  right: 'electrophilic addition',
  wrong: ['nucleophilic substitution', 'elimination', 'free-radical substitution'],
  sol: 'The π bond of the alkene attacks the electrophile H⁺ and both H and Br add across the double bond, so it is an electrophilic addition — option (@K).',
  d: 1, c: 'understanding', t: [1],
}));
add('dehydr-mcq', mcq({
  stem: r`A school laboratory prepares ethene by heating ethanol with concentrated sulphuric acid at 443 K: $\ce{CH3CH2OH -> CH2=CH2 + H2O}$. The reaction is a(n):`,
  right: 'elimination',
  wrong: ['nucleophilic substitution', 'electrophilic addition', 'free-radical substitution'],
  sol: 'A small molecule (water) is removed from adjacent carbons and a C=C bond forms: elimination (dehydration) — option (@K).',
  d: 1, c: 'understanding', t: [1],
}));
add('sunlight-mcq', mcq({
  stem: r`A mixture of methane and chlorine kept in diffused sunlight slowly gives chloromethane and hydrogen chloride, $\ce{CH4 + Cl2 -> CH3Cl + HCl}$. The reaction is a:`,
  right: 'free-radical substitution',
  wrong: ['nucleophilic substitution', 'electrophilic addition', 'elimination'],
  sol: 'Light splits Cl₂ homolytically into chlorine atoms, which carry out a chain in which H is replaced by Cl: free-radical substitution — option (@K).',
  d: 1, c: 'understanding', t: [1],
}));
add('hcn-mcq', mcq({
  stem: r`In a pharmaceutical synthesis, ethanal reacts with hydrogen cyanide to give a cyanohydrin, $\ce{CH3CHO + HCN -> CH3CH(OH)CN}$. The reaction is best described as:`,
  right: 'nucleophilic addition',
  wrong: ['electrophilic addition', 'nucleophilic substitution', 'elimination'],
  sol: 'The cyanide ion attacks the electron-poor carbonyl carbon and H⁺ adds to oxygen, so the C=O π bond is lost and two groups are added: nucleophilic addition — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('addsub-tf', tf({
  stem: 'In the addition of bromine to ethene in a teaching demonstration, one π bond is broken and two new σ bonds are formed.',
  key: 't',
  sol: 'True. The C=C π bond breaks and each carbon forms a new C–Br σ bond, giving 1,2-dibromoethane.',
  d: 1, c: 'understanding', t: [1],
}));
add('types-match', match({
  stem: 'Match each reaction with its type.',
  pairs: [
    ['Propane with chlorine in ultraviolet light', 'Free-radical substitution'],
    ['But-2-ene with hydrogen chloride', 'Electrophilic addition'],
    ['Bromomethane with aqueous sodium hydroxide', 'Nucleophilic substitution'],
    ['2-Bromopropane with alcoholic potassium hydroxide', 'Elimination'],
  ],
  order: [2, 0, 3, 1],
  sol: 'Chlorine atoms from UV light replace hydrogen (free-radical substitution). The alkene is attacked by H⁺ (electrophilic addition). Hydroxide replaces bromine (nucleophilic substitution). Alcoholic KOH removes HBr (elimination).',
  d: 2, c: 'application', t: [1],
}));
add('rxntype-short', short({
  marks: 2,
  stem: r`Classify each reaction as substitution, addition or elimination: (i) $\ce{C2H5OH + HCl -> C2H5Cl + H2O}$; (ii) $\ce{C2H4 + H2 -> C2H6}$; (iii) $\ce{C2H5Br + KOH -> C2H4 + KBr + H2O}$ (alcoholic); (iv) $\ce{CH4 + Cl2 -> CH3Cl + HCl}$.`,
  model: r`(i) substitution: –OH is replaced by –Cl; (ii) addition: the π bond of ethene takes up H₂; (iii) elimination: HBr is removed from adjacent carbons to form a C=C; (iv) substitution: H is replaced by Cl.`,
  sol: 'Four classifications with reasons.',
  scheme: [['(i) and (iv) substitution with the group replaced', 1], ['(ii) addition; (iii) elimination with reasons', 1]],
  d: 2, c: 'application', t: [1],
}));

// ---------------------------------------------------------------- t02 fission, free radicals, carbocations, carbanions
add('fission-mcq', mcq({
  stem: 'A research group studies how a C–Cl bond breaks under different conditions. Heterolytic fission is favoured by:',
  right: 'a polar solvent and a bond between atoms of quite different electronegativity',
  wrong: ['ultraviolet light in a non-polar solvent', 'a peroxide at high temperature in the gas phase', 'a bond between two identical atoms'],
  sol: 'A polar bond in a polar solvent breaks unevenly, giving ions — option (@K). UV light, peroxides, gas-phase heat (@1, @2) and bonds between identical atoms (@3) favour homolytic fission.',
  d: 2, c: 'understanding', t: [2],
}));
add('cationshape-mcq', mcq({
  stem: 'A computational chemist models the tert-butyl cation, (CH₃)₃C⁺. The positively charged carbon is:',
  right: 'sp² hybridised, in a planar arrangement, with an empty p orbital',
  wrong: ['sp³ hybridised, tetrahedral, with a lone pair', 'sp hybridised and linear', 'sp³ hybridised, tetrahedral, with one unpaired electron'],
  sol: 'The carbon has three σ bonds and only six electrons: sp² hybridised, trigonal planar, with an empty p orbital perpendicular to the plane — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('stabcat-mcq', mcq({
  stem: 'A student of a reaction-mechanism course lists four cations seen as intermediates: CH₃⁺, CH₃CH₂⁺, (CH₃)₂CH⁺ and (CH₃)₃C⁺. Their order of decreasing stability is:',
  right: '(CH₃)₃C⁺ > (CH₃)₂CH⁺ > CH₃CH₂⁺ > CH₃⁺',
  wrong: ['CH₃⁺ > CH₃CH₂⁺ > (CH₃)₂CH⁺ > (CH₃)₃C⁺', '(CH₃)₂CH⁺ > (CH₃)₃C⁺ > CH₃CH₂⁺ > CH₃⁺', '(CH₃)₃C⁺ > CH₃CH₂⁺ > (CH₃)₂CH⁺ > CH₃⁺'],
  sol: 'Each alkyl group stabilises the positive carbon by its +I effect and by hyperconjugation (9, 6, 3 and 0 α C–H bonds), so tertiary > secondary > primary > methyl — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('carbanion-mcq', mcq({
  stem: 'While comparing the strengths of organometallic bases, a student examines four carbanions. The most stable of them is:',
  right: 'CH₃⁻',
  wrong: ['CH₃CH₂⁻', '(CH₃)₂CH⁻', '(CH₃)₃C⁻'],
  sol: 'Alkyl groups push electrons towards the carbon that already carries a negative charge, which destabilises the carbanion; the methyl carbanion has no such groups, so it is the most stable — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('radical-mcq', mcq({
  stem: 'The methyl radical has seven electrons around its carbon atom. It is best described as:',
  right: 'neutral and paramagnetic, with one unpaired electron',
  wrong: ['positively charged and diamagnetic', 'negatively charged with a lone pair', 'neutral and diamagnetic with an empty p orbital'],
  sol: 'The carbon has three C–H bonding pairs (six electrons) and one unpaired electron: no net charge and paramagnetic — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('allyl-mcq', mcq({
  stem: 'A chemist compares four carbocations that are all “primary or smaller”: CH₃⁺, CH₃CH₂⁺, CH₂=CH⁺ and CH₂=CH–CH₂⁺. The most stable is:',
  right: 'CH₂=CH–CH₂⁺ (allyl), whose charge is spread over two carbons by resonance',
  wrong: ['CH₃⁺, because it has the least crowding', 'CH₃CH₂⁺, because it has an alkyl group', 'CH₂=CH⁺, because the carbon is sp hybridised'],
  sol: 'The allyl cation is stabilised by resonance (CH₂=CH–CH₂⁺ ↔ ⁺CH₂–CH=CH₂), which is stronger than the +I and hyperconjugation effect of one methyl group in the ethyl cation — option (@K).',
  d: 4, c: 'analysis', t: [2],
}));
add('carbocation-ar', ar({
  a: 'The tert-butyl cation is more stable than the isopropyl cation.',
  r: 'The tert-butyl cation has nine α C–H bonds that can take part in hyperconjugation, compared with six in the isopropyl cation.',
  key: 'a',
  sol: 'Both statements are true. Each additional α C–H bond gives another hyperconjugative structure and spreads the positive charge, and R explains why the tertiary cation is more stable — option (a).',
  d: 3, c: 'analysis', t: [2],
}));
add('homolytic-ar', ar({
  a: 'Chlorine molecules split into chlorine atoms in sunlight by homolytic fission.',
  r: 'Water boils at 373 K at one atmosphere pressure.',
  key: 'b',
  sol: 'Both statements are true: light supplies the energy to split Cl–Cl so that each atom takes one electron, and water does boil at 373 K at 1 atm. The reason has no connection with the assertion — option (b).',
  d: 1, c: 'understanding', t: [2],
}));
add('carbanion-ar', ar({
  a: 'The methyl carbanion is more stable than the tert-butyl carbanion.',
  r: 'Alkyl groups have an electron-withdrawing inductive effect on the carbon atom to which they are bonded.',
  key: 'c',
  sol: 'A is true, because alkyl groups would increase the negative charge on the carbon of a carbanion. R is false: alkyl groups release electrons (+I effect), and that is why the tertiary carbanion is the least stable — option (c).',
  d: 3, c: 'analysis', t: [2],
}));
add('homo-fill', fill({
  stem: 'The breaking of a covalent bond so that each of the two atoms keeps one electron of the shared pair is called ___ fission.',
  acc: [['homolytic', 'homolysis']],
  sol: '**Homolytic** fission; it produces free radicals.',
  d: 1, c: 'recall', t: [2],
}));
add('cation-tf', tf({
  stem: 'The carbon atom that carries the positive charge in a simple alkyl carbocation is sp² hybridised and the cation is planar.',
  key: 't',
  sol: 'True. The three σ bonds lie in one plane and the empty p orbital is perpendicular to it.',
  d: 1, c: 'recall', t: [2],
}));
add('fission-short', short({
  marks: 2,
  stem: 'Distinguish homolytic fission from heterolytic fission of a C–Cl bond in terms of what happens to the shared electron pair, the type of arrow used and the species formed.',
  model: 'Homolytic fission: the shared pair is divided equally, one electron to each atom, shown by two half-headed (fish-hook) arrows, and gives two free radicals (C· and Cl·). Heterolytic fission: both electrons go to the more electronegative atom (Cl), shown by one full-headed curved arrow, and gives a carbocation (C⁺) and a chloride ion (Cl⁻).',
  sol: 'Electron pair; arrow; species.',
  scheme: [['Homolytic: equal division, half-headed arrows, radicals', 1], ['Heterolytic: unequal, full-headed arrow, carbocation and anion', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('carbocation-short', short({
  marks: 2,
  stem: 'Describe the shape, the hybridisation and the number of valence electrons around the charged carbon of a methyl carbocation, CH₃⁺, and of a methyl carbanion, CH₃⁻.',
  model: 'CH₃⁺: three bonding pairs and no lone pair (six electrons); sp² hybridised and trigonal planar, with an empty p orbital. CH₃⁻: three bonding pairs and one lone pair (eight electrons); sp³ hybridised and pyramidal.',
  sol: 'Two ions with shape, hybridisation and electron count.',
  scheme: [['CH₃⁺: six electrons, sp², planar', 1], ['CH₃⁻: eight electrons, sp³, pyramidal', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('stability-short3', short({
  marks: 3,
  stem: 'Arrange the free radicals CH₃·, CH₃CH₂·, (CH₃)₂CH· and (CH₃)₃C· in order of decreasing stability. Explain the order using hyperconjugation and the inductive effect, and say whether the same order holds for carbocations.',
  model: 'Order of stability: (CH₃)₃C· > (CH₃)₂CH· > CH₃CH₂· > CH₃·. Each alkyl group on the carbon with the odd electron releases electrons (+I effect) and also interacts through the σ C–H bonds on its carbon (hyperconjugation: 9, 6, 3 and 0 α C–H bonds), spreading out the odd electron. The same order, tertiary > secondary > primary > methyl, holds for carbocations, for the same reasons.',
  sol: 'Order; +I and hyperconjugation; same for cations.',
  scheme: [['Correct order', 1], ['+I effect and hyperconjugation with the α C–H counts', 1], ['Same order for carbocations', 1]],
  d: 2, c: 'application', t: [2],
}));
add('carbanion-short3', short({
  marks: 3,
  stem: 'A student predicts the relative stability of the carbanions CH₃⁻, (CH₃)₂CH⁻ and (CH₃)₃C⁻. Give the order, explain it and describe the shape of the carbon bearing the negative charge.',
  model: 'Order of stability: CH₃⁻ > (CH₃)₂CH⁻ > (CH₃)₃C⁻. Alkyl groups are electron-releasing (+I) and push electrons towards the carbon that is already negatively charged, which increases the electron density and destabilises the ion; the more alkyl groups, the less stable the carbanion. The charged carbon has three bonding pairs and one lone pair, so it is sp³ hybridised and pyramidal.',
  sol: 'Order; +I effect; sp³ pyramidal.',
  scheme: [['Correct order', 1], ['Explanation using the +I effect of alkyl groups', 1], ['sp³ and pyramidal shape', 1]],
  d: 3, c: 'analysis', t: [2],
}));
add('fission-long', long({
  stem: '(a) Write, using the correct arrows, the heterolytic fission of the C–Br bond in (CH₃)₃C–Br and the homolytic fission of Cl–Cl, naming the species formed in each. [2]\n\n(b) Name the intermediate formed in each of these types of fission of a carbon-containing bond and give its shape: carbocation, free radical and carbanion. [2]\n\n(c) Which of (CH₃)₃C⁺ and CH₃⁺ is more stable? Give one reason. [1]',
  model: '(a) (CH₃)₃C–Br: a full-headed curved arrow from the bond to Br gives (CH₃)₃C⁺ (a carbocation) and Br⁻ (a bromide ion). Cl–Cl: two half-headed arrows, one electron to each atom, give two chlorine atoms (free radicals). (b) Carbocation: planar (sp²); free radical: planar or nearly planar (sp², one unpaired electron); carbanion: pyramidal (sp³). (c) (CH₃)₃C⁺ is more stable: three methyl groups release electrons (+I) and give nine α C–H bonds for hyperconjugation.',
  sol: 'Arrows and species; intermediates and shapes; stability.',
  scheme: [['(a) full-headed arrow and ions', 1], ['(a) half-headed arrows and radicals', 1], ['(b) three intermediates named', 1], ['(b) correct shapes', 1], ['(c) (CH₃)₃C⁺ with a reason', 1]],
  d: 3, c: 'application', t: [2],
}));

// ---------------------------------------------------------------- t03 electrophiles and nucleophiles
add('nuc-mcq', mcq({
  stem: 'In an organic synthesis lab, which of these species can act as a nucleophile although it carries no charge?',
  right: 'NH₃',
  wrong: ['NO₂⁺', 'BF₃', 'AlCl₃'],
  sol: 'Ammonia has a lone pair on nitrogen that it can donate to form a bond, so it is a neutral nucleophile — option (@K). NO₂⁺, BF₃ and AlCl₃ lack electrons and are electrophiles (@1, @2, @3).',
  d: 1, c: 'understanding', t: [3],
}));
add('elec-mcq', mcq({
  stem: 'A chemist picks a Lewis acid catalyst that is electron-deficient and carries no charge. Which species behaves as a neutral electrophile?',
  right: 'BF₃',
  wrong: ['OH⁻', 'NH₃', 'CN⁻'],
  sol: 'Boron in BF₃ has only six electrons and accepts a lone pair, so BF₃ is a neutral electrophile — option (@K). OH⁻ and CN⁻ are charged nucleophiles (@1, @3) and NH₃ is a neutral nucleophile (@2).',
  d: 1, c: 'understanding', t: [3],
}));
add('classify-mcq', mcq({
  stem: 'A student sorts the species NO₂⁺, BF₃, OH⁻, NH₃ and H₂O for a mechanism test. The electrophiles among them are:',
  right: 'NO₂⁺ and BF₃',
  wrong: ['OH⁻ and NH₃', 'NH₃ and H₂O', 'NO₂⁺ and H₂O'],
  sol: 'NO₂⁺ (positive, electron-poor) and BF₃ (electron-deficient boron) accept electron pairs, so they are electrophiles — option (@K). OH⁻, NH₃ and H₂O have lone pairs and are nucleophiles (@1, @2).',
  d: 2, c: 'understanding', t: [3],
}));
add('nuc-fill', fill({
  stem: 'A species that donates a pair of electrons to an electron-poor carbon to form a new bond is called a ___.',
  acc: [['nucleophile', 'nucleophilic reagent']],
  sol: 'A **nucleophile**.',
  d: 1, c: 'recall', t: [3],
}));
add('nuc-tf', tf({
  stem: 'Every nucleophile must carry a negative charge.',
  key: 'f',
  sol: 'False. Neutral molecules with a lone pair, such as NH₃, H₂O and ROH, are nucleophiles too.',
  d: 1, c: 'understanding', t: [3],
}));
add('classify-short', short({
  marks: 2,
  stem: 'Classify NO₂⁺, BF₃, OH⁻, NH₃ and H₂O as electrophiles or nucleophiles, giving the reason for the neutral ones.',
  model: 'Electrophiles: NO₂⁺ (positively charged, electron-poor) and BF₃ (neutral, boron has an incomplete octet and accepts a lone pair). Nucleophiles: OH⁻ (negative, lone pairs), NH₃ and H₂O (neutral, each has a lone pair on N or O that it can donate).',
  sol: 'Two electrophiles; three nucleophiles with reasons.',
  scheme: [['NO₂⁺ and BF₃ as electrophiles with reason for BF₃', 1], ['OH⁻, NH₃ and H₂O as nucleophiles with reason for neutral ones', 1]],
  d: 2, c: 'application', t: [3],
}));
add('nuc-short3', short({
  marks: 3,
  stem: r`In each reaction, name the species that acts as the nucleophile and the one that acts as the electrophile: (i) $\ce{CH3Cl + OH- -> CH3OH + Cl-}$; (ii) $\ce{CH3CHO + HCN -> CH3CH(OH)CN}$ (cyanide attacks first); (iii) benzene with NO₂⁺ in the nitrating mixture.`,
  model: '(i) Nucleophile: OH⁻ (donates a lone pair); electrophile: the carbon of CH₃Cl, which is δ⁺ because of the electronegative chlorine. (ii) Nucleophile: CN⁻; electrophile: the carbonyl carbon of ethanal (δ⁺). (iii) Nucleophile: the π electron cloud of benzene; electrophile: NO₂⁺.',
  sol: 'Three nucleophile and electrophile pairs.',
  scheme: [['(i) OH⁻ and the carbon of CH₃Cl', 1], ['(ii) CN⁻ and the carbonyl carbon', 1], ['(iii) benzene and NO₂⁺', 1]],
  d: 3, c: 'application', t: [3],
}));
