// ISC 12 Chemistry ch16 Aldehydes and Ketones — question bank (ISC style). Stems name their own compounds and data.
// MCQ keys are placed by the builder; AR keys planned: a b c d a. Numericals re-solved.
import { mk, add, r } from './lib.mjs';

const { mcq, ar, tf, fill, match, num, short, long } = mk;
const near = (a, b, rel = 0.005) => Math.abs(a - b) <= Math.max(1e-9, Math.abs(b) * rel);

// ---------------------------------------------------------------- t01 nomenclature, structure, physical properties
add('name-mcq', mcq({
  stem: 'The IUPAC name of isovaleraldehyde, (CH₃)₂CHCH₂CHO, is:',
  right: '3-methylbutanal',
  wrong: ['2-methylbutanal', '3-methylbutan-1-one', '2-methylbutan-4-al'],
  sol: 'The CHO carbon is C-1; methyl on C-3 — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('pentanone-mcq', mcq({
  stem: 'Diethyl ketone, CH₃CH₂COCH₂CH₃, has the IUPAC name:',
  right: 'pentan-3-one',
  wrong: ['pentan-2-one', 'diethylmethanone', '3-pentanal'],
  sol: 'Five-carbon chain, C=O at C-3 — option (@K).',
  d: 1, c: 'application', t: [1],
}));
add('hybrid-mcq', mcq({
  stem: 'In propanal, the hybridisation of the carbonyl carbon and the approximate bond angle around it are:',
  right: 'sp², about 120°',
  wrong: ['sp³, about 109°', 'sp, 180°', 'sp², about 90°'],
  sol: 'Trigonal planar carbonyl carbon — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('bpcarb-mcq', mcq({
  stem: 'Propanone (b.p. 329 K) boils higher than butane (b.p. 273 K) but lower than propan-1-ol (b.p. 370 K). The best explanation is that propanone molecules:',
  right: 'attract each other by dipole–dipole forces but cannot hydrogen-bond with one another',
  wrong: ['hydrogen-bond strongly with one another', 'are non-polar', 'have a much larger molar mass than propan-1-ol'],
  sol: 'Polar C=O, but no O–H — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('carbonyl-tf', tf({
  stem: 'Lower aldehydes and ketones dissolve in water because water molecules form hydrogen bonds with the carbonyl oxygen.',
  key: 't',
  sol: 'True. The carbonyl oxygen accepts hydrogen bonds from water.',
  d: 1, c: 'understanding', t: [1],
}));
add('dial-fill', fill({
  stem: 'The IUPAC name of OHC–CH₂–CH₂–CHO is butane___.',
  acc: [['dial']],
  sol: 'Butane**dial**.',
  d: 2, c: 'application', t: [1],
}));
add('name-match', match({
  stem: 'Match each carbonyl compound with its IUPAC name.',
  pairs: [
    ['Propionaldehyde', 'Propanal'],
    ['Ethyl methyl ketone', 'Butan-2-one'],
    ['Crotonaldehyde', 'But-2-enal'],
    ['Isobutyraldehyde', '2-Methylpropanal'],
  ],
  order: [1, 3, 0, 2],
  sol: 'Propionaldehyde = propanal; ethyl methyl ketone = butan-2-one; crotonaldehyde = but-2-enal; isobutyraldehyde = 2-methylpropanal.',
  d: 1, c: 'recall', t: [1],
}));
add('name-short', short({
  marks: 2,
  stem: 'Give the IUPAC names of (a) CH₃COCH(CH₃)₂ and (b) CH₃CH₂CH(CH₃)CH₂CHO.',
  model: '(a) 3-Methylbutan-2-one. (b) 3-Methylpentanal.',
  sol: 'Two names.',
  scheme: [['(a)', 1], ['(b)', 1]],
  d: 2, c: 'application', t: [1],
}));
add('bp-short', short({
  marks: 2,
  stem: 'Arrange butane, propanal and propan-1-ol (similar molar masses) in order of increasing boiling point, and explain.',
  model: 'Butane < propanal < propan-1-ol. Butane has only weak dispersion forces; propanal has a polar C=O group and dipole–dipole attractions; propan-1-ol forms intermolecular hydrogen bonds, which are strongest.',
  sol: 'Dispersion < dipole–dipole < H-bonding.',
  scheme: [['Order', 1], ['Reasons', 1]],
  d: 2, c: 'understanding', t: [1],
}));

// ---------------------------------------------------------------- t02 preparation
add('prep-mcq', mcq({
  stem: 'Propanoyl chloride is reduced with hydrogen over palladium poisoned with barium sulphate. The product is:',
  right: 'propanal',
  wrong: ['propan-1-ol', 'propanone', 'propane'],
  sol: 'Rosenmund reduction stops at the aldehyde — option (@K).',
  d: 1, c: 'application', t: [2],
}));
add('ozone-mcq', mcq({
  stem: '2-Methylbut-2-ene, (CH₃)₂C=CHCH₃, is treated with ozone and then zinc and water. The products are:',
  right: 'propanone and ethanal',
  wrong: ['butanone and methanal', 'two molecules of propanal', 'propanoic acid and ethanoic acid'],
  sol: 'Cleaving the C=C gives (CH₃)₂C=O and O=CHCH₃ — option (@K).',
  d: 3, c: 'application', t: [2],
}));
add('cd-mcq', mcq({
  stem: 'Ethanoyl chloride reacts with dimethylcadmium. The product is:',
  right: 'propanone',
  wrong: ['ethanal', 'butanone', 'ethane'],
  sol: '2CH₃COCl + (CH₃)₂Cd → 2CH₃COCH₃ + CdCl₂ — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('ca-mcq', mcq({
  stem: 'A mixture of calcium ethanoate and calcium methanoate is heated strongly. The main carbonyl product is:',
  right: 'ethanal',
  wrong: ['propanone', 'methanal only', 'ethanoic acid'],
  sol: '(CH₃COO)₂Ca + (HCOO)₂Ca → 2CH₃CHO + 2CaCO₃ — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('nitrile-mcq', mcq({
  stem: 'Benzonitrile, C₆H₅CN, is treated with methylmagnesium iodide and the product is hydrolysed with dilute acid. The compound formed is:',
  right: 'acetophenone, C₆H₅COCH₃',
  wrong: ['benzaldehyde', 'toluene', '1-phenylethanol'],
  sol: 'RCN + R′MgX → imine salt → ketone — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('dibal-mcq', mcq({
  stem: 'Ethyl ethanoate is treated with diisobutylaluminium hydride (DIBAL-H) at low temperature and then water. The carbonyl product is:',
  right: 'ethanal',
  wrong: ['ethanol', 'ethanoic acid', 'propanone'],
  sol: 'DIBAL-H reduces esters to aldehydes — option (@K).',
  d: 2, c: 'recall', t: [2],
}));
add('rosen-ar', ar({
  a: 'In the Rosenmund reduction the palladium catalyst is poisoned with barium sulphate.',
  r: 'A poisoned catalyst stops the reduction at the aldehyde stage, so the aldehyde is not reduced to an alcohol.',
  key: 'a',
  sol: 'Both are true, and R explains A — option (a).',
  d: 2, c: 'understanding', t: [2],
}));
add('hydration-tf', tf({
  stem: 'Hydration of propyne with dilute H₂SO₄ and HgSO₄ gives propanal.',
  key: 'f',
  sol: 'False. Markovnikov hydration gives propanone; only ethyne gives an aldehyde.',
  d: 2, c: 'application', t: [2],
}));
add('ca-num', num({
  marks: 2,
  stem: r`$15.8\ \text{g}$ of calcium ethanoate ($M = 158$) is heated: $\ce{(CH3COO)2Ca -> CH3COCH3 + CaCO3}$. What mass of propanone ($M = 58$) can be obtained at most?`,
  value: 5.8, tol: 0.02, unit: 'g',
  sol: r`$n = 15.8 \div 158 = 0.100\ \text{mol}$; mass $= 0.100 \times 58 = 5.8\ \text{g}$.`,
  scheme: [['0.100 mol', 1], ['5.8 g', 1]],
  d: 2, c: 'application', t: [2],
}), () => near(0.1 * 58, 5.8) || 'mass');
add('prep-short', short({
  marks: 2,
  stem: 'Write equations for preparing (a) ethanal from ethyne and (b) butanone from ethanoyl chloride using a dialkylcadmium.',
  model: r`(a) $\ce{HC#CH + H2O ->[HgSO4][dil. H2SO4] CH3CHO}$. (b) $\ce{2CH3COCl + (CH3CH2)2Cd -> 2CH3COCH2CH3 + CdCl2}$.`,
  sol: 'Two equations.',
  scheme: [['(a)', 1], ['(b)', 1]],
  d: 2, c: 'application', t: [2],
}));
add('stephen-short', short({
  marks: 2,
  stem: 'Describe the Stephen reaction, using propanenitrile as the example and naming the product.',
  model: 'Propanenitrile is reduced with tin(II) chloride and hydrochloric acid to the imine (as its hydrochloride), CH₃CH₂CH=NH·HCl; hydrolysis with water then gives propanal, CH₃CH₂CHO, and ammonium chloride.',
  sol: 'SnCl₂/HCl, then H₂O → propanal.',
  scheme: [['Reagents and imine', 1], ['Hydrolysis to propanal', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('prep-short3', short({
  marks: 3,
  stem: 'Suggest a reagent or method for each conversion and name the product: (a) butan-2-ol → a ketone; (b) calcium propanoate → a ketone; (c) ethanenitrile → a ketone using a Grignard reagent.',
  model: '(a) Acidified K₂Cr₂O₇ (or Cu at 573 K): butanone. (b) Heat (dry distillation): pentan-3-one, (CH₃CH₂COO)₂Ca → CH₃CH₂COCH₂CH₃ + CaCO₃. (c) CH₃CH₂MgBr, then H₃O⁺: butanone (or C₆H₅MgBr → acetophenone).',
  sol: 'Butanone; pentan-3-one; butanone.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 2, c: 'application', t: [2],
}));
add('ozone-short3', short({
  marks: 3,
  stem: 'An alkene C₅H₁₀ on ozonolysis gives propanone and ethanal. (a) Identify the alkene. (b) Name the two products by IUPAC rules. (c) What would but-1-ene give on ozonolysis?',
  model: '(a) 2-Methylbut-2-ene, (CH₃)₂C=CHCH₃. (b) Propanone (propan-2-one) and ethanal. (c) Propanal and methanal.',
  sol: '2-Methylbut-2-ene; propanal + methanal.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 3, c: 'analysis', t: [2],
}));

// ---------------------------------------------------------------- t03 nucleophilic addition
add('add-mcq', mcq({
  stem: 'Arrange methanal, ethanal and butanone in order of decreasing reactivity towards hydrogen cyanide.',
  right: 'methanal > ethanal > butanone',
  wrong: ['butanone > ethanal > methanal', 'ethanal > methanal > butanone', 'all react at the same rate'],
  sol: 'More alkyl groups: less δ+ on carbon and more steric hindrance — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('cn-mcq', mcq({
  stem: 'A trace of base speeds up the addition of HCN to propanone because:',
  right: 'it converts HCN into CN⁻, the actual nucleophile',
  wrong: ['it protonates the carbonyl oxygen', 'it removes the cyanohydrin as it forms', 'it reduces the carbonyl group'],
  sol: 'HCN + OH⁻ → CN⁻ + H₂O; CN⁻ attacks the carbonyl carbon — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('bisulphite-mcq', mcq({
  stem: 'Ethanal is shaken with saturated sodium hydrogensulphite solution. A crystalline solid separates. This reaction is used to:',
  right: 'separate and purify aldehydes from mixtures',
  wrong: ['convert aldehydes into ketones', 'test for alcohols', 'make carboxylic acids'],
  sol: 'The bisulphite adduct is filtered and decomposed by acid or alkali to recover the aldehyde — option (@K).',
  d: 2, c: 'recall', t: [3],
}));
add('oxime-mcq', mcq({
  stem: 'Propanal reacts with hydroxylamine, NH₂OH. The product is:',
  right: 'propanal oxime, CH₃CH₂CH=NOH',
  wrong: ['propanamide', 'propan-1-amine', 'propanal cyanohydrin'],
  sol: 'Addition then loss of water gives C=N–OH — option (@K).',
  d: 1, c: 'application', t: [3],
}));
add('grig-mcq', mcq({
  stem: 'Ethylmagnesium bromide is added to ethanal and the product is hydrolysed. The alcohol obtained is:',
  right: 'butan-2-ol',
  wrong: ['butan-1-ol', '2-methylpropan-2-ol', 'propan-2-ol'],
  sol: 'RMgX + R′CHO → secondary alcohol, CH₃CH(OH)CH₂CH₃ — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('react-ar', ar({
  a: 'Propanone is less reactive than propanal towards nucleophilic addition.',
  r: 'Propanone has two electron-releasing methyl groups, whereas propanal has a carbonyl hydrogen.',
  key: 'a',
  sol: 'Both are true; the two alkyl groups reduce δ+ on carbon and hinder attack — option (a).',
  d: 2, c: 'understanding', t: [3],
}));
add('cyano-tf', tf({
  stem: 'Hydrolysis of ethanal cyanohydrin gives 2-hydroxypropanoic acid (lactic acid).',
  key: 't',
  sol: 'True. CH₃CH(OH)CN → CH₃CH(OH)COOH.',
  d: 2, c: 'application', t: [3],
}));
add('semi-fill', fill({
  stem: 'The derivative formed when propanone reacts with semicarbazide, NH₂NHCONH₂, is called propanone ___.',
  acc: [['semicarbazone']],
  sol: 'Propanone **semicarbazone**.',
  d: 1, c: 'recall', t: [3],
}));
add('hcn-short', short({
  marks: 2,
  stem: 'Explain why aldehydes are generally more reactive than ketones towards nucleophilic addition, using ethanal and propanone as examples.',
  model: 'Electronic: propanone has two methyl groups (+I) that reduce the positive charge on the carbonyl carbon; ethanal has only one. Steric: two alkyl groups crowd the carbonyl carbon in propanone more than one methyl and a hydrogen in ethanal, hindering the approach of the nucleophile.',
  sol: '+I effect and steric hindrance.',
  scheme: [['Electronic reason', 1], ['Steric reason', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('derivative-short', short({
  marks: 2,
  stem: 'Write the products of ethanal with (a) phenylhydrazine and (b) 2,4-dinitrophenylhydrazine, and state why such derivatives are useful.',
  model: '(a) Ethanal phenylhydrazone, CH₃CH=NNHC₆H₅ (+ H₂O). (b) Ethanal 2,4-dinitrophenylhydrazone, an orange/yellow solid (+ H₂O). These are crystalline solids with sharp, characteristic melting points, used to identify the parent carbonyl compound; the 2,4-DNP precipitate also tests for C=O.',
  sol: 'Phenylhydrazone; 2,4-DNP derivative; identification.',
  scheme: [['Two products', 1], ['Use', 1]],
  d: 2, c: 'application', t: [3],
}));
add('hcn-short3', short({
  marks: 3,
  stem: 'Give the mechanism of the base-catalysed addition of hydrogen cyanide to propanal.',
  model: r`(1) $\ce{HCN + OH- -> CN- + H2O}$ (CN⁻ generated). (2) CN⁻ attacks the carbonyl carbon of propanal (slow), the π electrons move to oxygen, giving the tetrahedral alkoxide $\ce{CH3CH2CH(O-)CN}$. (3) The alkoxide takes H⁺ from HCN (or water), giving the cyanohydrin $\ce{CH3CH2CH(OH)CN}$ and regenerating CN⁻.`,
  sol: 'CN⁻; attack; protonation.',
  scheme: [['CN⁻ formation', 1], ['Nucleophilic attack', 1], ['Protonation; product', 1]],
  d: 3, c: 'understanding', t: [3],
}));
add('add-short3', short({
  marks: 3,
  stem: 'Give the product of propanone with (a) sodium hydrogensulphite, (b) hydrazine and (c) phenylmagnesium bromide followed by hydrolysis.',
  model: '(a) (CH₃)₂C(OH)SO₃Na, the bisulphite adduct. (b) (CH₃)₂C=NNH₂, propanone hydrazone (+ H₂O). (c) 2-Phenylpropan-2-ol, (CH₃)₂C(OH)C₆H₅.',
  sol: 'Adduct; hydrazone; 3° alcohol.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 2, c: 'application', t: [3],
}));

// ---------------------------------------------------------------- t04 oxidation, iodoform, reduction
add('red-mcq', mcq({
  stem: 'Butanone is heated with hydrazine and then with KOH in ethylene glycol. The organic product is:',
  right: 'butane',
  wrong: ['butan-2-ol', 'butanoic acid', 'but-2-ene'],
  sol: 'Wolff–Kishner reduction: C=O → CH₂ — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('iodo-mcq', mcq({
  stem: 'Which of these gives a yellow precipitate with iodine and NaOH: pentan-3-one, pentan-2-one, propanal or methanal?',
  right: 'Pentan-2-one',
  wrong: ['Pentan-3-one', 'Propanal', 'Methanal'],
  sol: 'Only pentan-2-one has a CH₃CO– group — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('clem-mcq', mcq({
  stem: 'The Clemmensen reduction is unsuitable for a carbonyl compound that also contains an acid-sensitive group because it uses:',
  right: 'zinc amalgam and concentrated hydrochloric acid',
  wrong: ['hydrazine and potassium hydroxide', 'sodium borohydride in water', 'hydrogen over nickel'],
  sol: 'Clemmensen is strongly acidic; Wolff–Kishner (basic) is used instead — option (@K).',
  d: 3, c: 'understanding', t: [4],
}));
add('nabh4-mcq', mcq({
  stem: 'Pentan-3-one is reduced with sodium borohydride. The product is:',
  right: 'pentan-3-ol',
  wrong: ['pentane', 'pentan-1-ol', 'pentanoic acid'],
  sol: 'Ketone → secondary alcohol — option (@K).',
  d: 1, c: 'application', t: [4],
}));
add('oxid-ar', ar({
  a: 'Aldehydes are oxidised by Tollens’ reagent but ketones are not.',
  r: 'Ketones contain no carbonyl group.',
  key: 'c',
  sol: 'A is true (aldehydes have an oxidisable C–H on the carbonyl carbon). R is false — option (c).',
  d: 1, c: 'understanding', t: [4],
}));
add('rp-tf', tf({
  stem: 'Heating propanone with hydrogen iodide and red phosphorus gives propane.',
  key: 't',
  sol: 'True. CH₃COCH₃ + 4HI → CH₃CH₂CH₃ + H₂O + 2I₂.',
  d: 2, c: 'recall', t: [4],
}));
add('iodo-num', num({
  marks: 2,
  stem: r`$1.44\ \text{g}$ of butanone ($M = 72$) reacts completely with iodine and NaOH: $\ce{CH3COCH2CH3 + 3I2 + 4NaOH -> CHI3 + CH3CH2COONa + 3NaI + 3H2O}$. What mass of iodoform ($M = 394$) forms?`,
  value: 7.88, tol: 0.03, unit: 'g',
  sol: r`$n = 1.44 \div 72 = 0.0200\ \text{mol}$; mass $= 0.0200 \times 394 = 7.88\ \text{g}$.`,
  scheme: [['0.0200 mol', 1], ['7.88 g', 1]],
  d: 2, c: 'application', t: [4],
}), () => near(0.02 * 394, 7.88) || 'mass');
add('red-short', short({
  marks: 2,
  stem: 'Compare the Clemmensen and Wolff–Kishner reductions: give the reagents for each and the product from propanone.',
  model: 'Clemmensen: zinc amalgam and concentrated HCl (acidic). Wolff–Kishner: hydrazine, then KOH (or C₂H₅ONa) in ethylene glycol on heating (basic). Both convert propanone to propane, CH₃CH₂CH₃.',
  sol: 'Acidic vs basic; propane.',
  scheme: [['Reagents', 1], ['Product', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('red-short3', short({
  marks: 3,
  stem: 'Name the product when butanal is treated with (a) LiAlH₄, (b) Zn–Hg and conc. HCl and (c) Tollens’ reagent.',
  model: '(a) Butan-1-ol. (b) Butane (Clemmensen). (c) Butanoate ion (butanoic acid on acidification), with a silver mirror.',
  sol: 'Butan-1-ol; butane; butanoate.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 2, c: 'application', t: [4],
}));

// ---------------------------------------------------------------- t05 aldol, cross aldol, Cannizzaro
add('aldol-mcq', mcq({
  stem: '2,2-Dimethylpropanal, (CH₃)₃CCHO, is warmed with concentrated NaOH. It undergoes:',
  right: 'the Cannizzaro reaction, because it has no α-hydrogen',
  wrong: ['aldol condensation', 'the iodoform reaction', 'no reaction at all'],
  sol: 'No α-H, concentrated alkali → disproportionation — option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('alphah-mcq', mcq({
  stem: 'The α-hydrogens of propanal are acidic because:',
  right: 'the enolate ion formed is stabilised by resonance with the carbonyl oxygen',
  wrong: ['the C–H bond is very long', 'they are bonded to the carbonyl oxygen', 'propanal is a strong acid'],
  sol: 'Negative charge delocalised onto O — option (@K).',
  d: 2, c: 'understanding', t: [5],
}));
add('cross-mcq', mcq({
  stem: 'Methanal and ethanal are treated together with dilute NaOH. The main cross-aldol product is:',
  right: '3-hydroxypropanal',
  wrong: ['3-hydroxybutanal', 'methanol and sodium ethanoate', 'propanal'],
  sol: 'Ethanal enolate attacks methanal (no α-H) — option (@K).',
  d: 3, c: 'application', t: [5],
}));
add('aldolprod-mcq', mcq({
  stem: 'Butanal undergoes aldol condensation with dilute NaOH, and the aldol is heated. The final product is:',
  right: '2-ethylhex-2-enal',
  wrong: ['oct-2-enal', '3-hydroxyoctanal', '2-ethylhexanoic acid'],
  sol: 'Aldol: 2-ethyl-3-hydroxyhexanal → dehydration → 2-ethylhex-2-enal — option (@K).',
  d: 4, c: 'analysis', t: [5],
}));
add('cann-ar', ar({
  a: 'Benzaldehyde undergoes the Cannizzaro reaction with concentrated NaOH.',
  r: 'Benzaldehyde has two α-hydrogens.',
  key: 'c',
  sol: 'A is true. R is false: benzaldehyde has no α-hydrogen, which is why it gives Cannizzaro — option (c).',
  d: 2, c: 'understanding', t: [5],
}));
add('aldolmech-ar', ar({
  a: 'In aldol condensation the enolate ion acts as a nucleophile.',
  r: 'The enolate ion attacks the carbonyl carbon of a second carbonyl molecule.',
  key: 'a',
  sol: 'Both true; R explains A — option (a).',
  d: 2, c: 'understanding', t: [5],
}));
add('cann-tf', tf({
  stem: 'In the crossed Cannizzaro reaction of benzaldehyde with methanal, benzaldehyde is oxidised and methanal is reduced.',
  key: 'f',
  sol: 'False. Methanal is oxidised to methanoate; benzaldehyde is reduced to phenylmethanol.',
  d: 3, c: 'understanding', t: [5],
}));
add('cann-num', num({
  marks: 2,
  stem: r`$0.20\ \text{mol}$ of methanal undergoes complete Cannizzaro reaction with concentrated NaOH: $\ce{2HCHO + NaOH -> HCOONa + CH3OH}$. What mass of methanol ($M = 32$) forms?`,
  value: 3.2, tol: 0.01, unit: 'g',
  sol: r`$n(\ce{CH3OH}) = 0.20 \div 2 = 0.10\ \text{mol}$; mass $= 0.10 \times 32 = 3.2\ \text{g}$.`,
  scheme: [['2 : 1 ratio', 1], ['3.2 g', 1]],
  d: 2, c: 'application', t: [5],
}), () => near(0.1 * 32, 3.2) || 'mass');
add('aldol-short', short({
  marks: 2,
  stem: 'Write the aldol and the dehydration product formed from propanal with dilute NaOH.',
  model: r`$\ce{2CH3CH2CHO ->[dil. NaOH] CH3CH2CH(OH)CH(CH3)CHO}$ (3-hydroxy-2-methylpentanal); on heating it loses water: $\ce{CH3CH2CH=C(CH3)CHO}$, 2-methylpent-2-enal.`,
  sol: 'Aldol; enal.',
  scheme: [['Aldol', 1], ['Dehydration product', 1]],
  d: 3, c: 'application', t: [5],
}));
add('cann-short', short({
  marks: 2,
  stem: 'Write the equation for the crossed Cannizzaro reaction of benzaldehyde with methanal in concentrated NaOH, and explain which aldehyde is oxidised.',
  model: r`$\ce{C6H5CHO + HCHO + NaOH -> C6H5CH2OH + HCOONa}$. Methanal is oxidised (to methanoate) because its carbonyl carbon is the most reactive towards OH⁻, so it forms the intermediate that transfers hydride; benzaldehyde accepts the hydride and is reduced.`,
  sol: 'Equation; methanal oxidised.',
  scheme: [['Equation', 1], ['Explanation', 1]],
  d: 3, c: 'analysis', t: [5],
}));
add('aldol-short3', short({
  marks: 3,
  stem: 'Give the mechanism of the aldol reaction of ethanal with dilute NaOH.',
  model: r`(1) $\ce{OH-}$ removes an α-H: $\ce{CH3CHO + OH- -> CH2CHO- + H2O}$; the enolate is resonance-stabilised. (2) The enolate carbon attacks the carbonyl carbon of a second ethanal molecule, giving the alkoxide $\ce{CH3CH(O-)CH2CHO}$. (3) The alkoxide takes H⁺ from water: $\ce{CH3CH(OH)CH2CHO}$ (3-hydroxybutanal) and OH⁻ is regenerated.`,
  sol: 'Enolate; attack; protonation.',
  scheme: [['Enolate formation', 1], ['Nucleophilic attack', 1], ['Protonation; aldol', 1]],
  d: 3, c: 'understanding', t: [5],
}));
add('base-short3', short({
  marks: 3,
  stem: 'State, with reasons, whether each compound undergoes aldol condensation or the Cannizzaro reaction with alkali: (a) propanone, (b) methanal, (c) 2-methylpropanal.',
  model: '(a) Aldol (dilute alkali): it has α-hydrogens (six). (b) Cannizzaro (concentrated alkali): no α-hydrogen. (c) Aldol: it has one α-hydrogen on C-2.',
  sol: 'Aldol; Cannizzaro; aldol.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 3, c: 'analysis', t: [5],
}));

// ---------------------------------------------------------------- t06 tests and uses
add('tollens-mcq', mcq({
  stem: 'Which of these does NOT reduce Fehling’s solution: methanal, ethanal, propanal or propanone?',
  right: 'Propanone',
  wrong: ['Methanal', 'Ethanal', 'Propanal'],
  sol: 'Ketones are not oxidised by Fehling’s solution — option (@K).',
  d: 1, c: 'application', t: [6],
}));
add('hcho-mcq', mcq({
  stem: 'Which test distinguishes ethanal from methanal?',
  right: 'Iodoform test (warm with I₂ and NaOH)',
  wrong: ['Tollens’ reagent', 'Fehling’s solution', '2,4-DNP'],
  sol: 'Only ethanal has CH₃CO–; both reduce Tollens’ and Fehling’s, both give 2,4-DNP — option (@K).',
  d: 2, c: 'application', t: [6],
}));
add('urotropine-mcq', mcq({
  stem: 'Methanal reacts with ammonia to give urotropine (hexamine), used as a urinary antiseptic. Its formula is:',
  right: '(CH₂)₆N₄',
  wrong: ['CH₂=NH', 'HCONH₂', '(CH₃)₃N'],
  sol: '6HCHO + 4NH₃ → (CH₂)₆N₄ + 6H₂O — option (@K).',
  d: 2, c: 'recall', t: [6],
}));
add('formalin-fill', fill({
  stem: 'A 40% aqueous solution of methanal, used to preserve biological specimens, is called ___.',
  acc: [['formalin']],
  sol: '**Formalin**.',
  d: 1, c: 'recall', t: [6],
}));
add('fehling-num', num({
  marks: 2,
  stem: r`$0.58\ \text{g}$ of propanal ($M = 58$) is oxidised completely by Fehling’s solution: $\ce{RCHO + 2Cu^2+ + 5OH- -> RCOO- + Cu2O + 3H2O}$. What mass of copper(I) oxide ($M = 143$) precipitates?`,
  value: 1.43, tol: 0.01, unit: 'g',
  sol: r`$n = 0.58 \div 58 = 0.010\ \text{mol}$; 1 : 1, so mass $= 0.010 \times 143 = 1.43\ \text{g}$.`,
  scheme: [['0.010 mol', 1], ['1.43 g', 1]],
  d: 2, c: 'application', t: [6],
}), () => near(0.01 * 143, 1.43) || 'mass');
add('test-short', short({
  marks: 2,
  stem: 'Give one chemical test, with observations, to distinguish (a) propanal from propanone and (b) pentan-2-one from pentan-3-one.',
  model: '(a) Tollens’ reagent: propanal gives a silver mirror; propanone does not (or Fehling’s: red-brown precipitate with propanal only). (b) Iodoform test (I₂/NaOH, warm): pentan-2-one gives a yellow precipitate of CHI₃; pentan-3-one does not.',
  sol: 'Tollens’; iodoform.',
  scheme: [['(a)', 1], ['(b)', 1]],
  d: 2, c: 'application', t: [6],
}));
add('test-short3', short({
  marks: 3,
  stem: 'A compound X, C₄H₈O, gives an orange precipitate with 2,4-DNP and a yellow precipitate with iodine and NaOH, but does not reduce Tollens’ reagent. (a) Identify X. (b) Write the equation for its iodoform reaction. (c) What would X give with NaBH₄?',
  model: r`(a) X is a methyl ketone (C=O present; not an aldehyde; CH₃CO–): butanone, CH₃COCH₂CH₃. (b) $\ce{CH3COCH2CH3 + 3I2 + 4NaOH -> CHI3 + CH3CH2COONa + 3NaI + 3H2O}$. (c) Butan-2-ol.`,
  sol: 'Butanone; iodoform equation; butan-2-ol.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 4, c: 'analysis', t: [4, 6],
}));

// ---------------------------------------------------------------- long answers
add('prep-long', long({
  stem: '(a) Write equations for preparing (i) propanal by the Rosenmund reduction and (ii) propanone from calcium ethanoate. [2]\n\n(b) How is butanone obtained from ethanenitrile using a Grignard reagent? [1½]\n\n(c) Explain why propanone boils higher than butane but lower than propan-1-ol. [1½]',
  model: r`(a) (i) $\ce{CH3CH2COCl + H2 ->[Pd/BaSO4] CH3CH2CHO + HCl}$. (ii) $\ce{(CH3COO)2Ca ->[\Delta] CH3COCH3 + CaCO3}$.

(b) Ethylmagnesium bromide adds to the nitrile carbon to give an imine salt, CH₃C(=NMgBr)CH₂CH₃, which dilute acid hydrolyses to butanone, CH₃COCH₂CH₃.

(c) Propanone is polar (dipole–dipole forces), so it boils above non-polar butane, but it has no O–H and cannot hydrogen-bond with itself, unlike propan-1-ol.`,
  sol: 'Rosenmund; calcium salt; Grignard + nitrile; b.p.',
  scheme: [['(a)(i)', 1], ['(a)(ii)', 1], ['(b)', 1.5], ['(c)', 1.5]],
  d: 3, c: 'application', t: [1, 2],
}));
add('add-long', long({
  stem: '(a) Give the mechanism of the addition of HCN to ethanal, including the role of the base. [2]\n\n(b) Why is methanal more reactive than propanone towards nucleophiles? [1]\n\n(c) Give the products of propanone with (i) NaHSO₃, (ii) hydroxylamine and (iii) CH₃MgI followed by hydrolysis. [2]',
  model: r`(a) $\ce{HCN + OH- -> CN- + H2O}$; CN⁻ attacks the carbonyl carbon (slow) giving $\ce{CH3CH(O-)CN}$; protonation by HCN gives the cyanohydrin $\ce{CH3CH(OH)CN}$ and regenerates CN⁻. The base generates the nucleophile.

(b) Methanal has no alkyl groups: its carbonyl carbon is more positive and less hindered.

(c) (i) $\ce{(CH3)2C(OH)SO3Na}$. (ii) Propanone oxime, $\ce{(CH3)2C=NOH}$. (iii) 2-Methylpropan-2-ol.`,
  sol: 'HCN mechanism; reactivity; three products.',
  scheme: [['(a)', 2], ['(b)', 1], ['(c)', 2]],
  d: 3, c: 'understanding', t: [3],
}));
add('base-long', long({
  stem: '(a) What are α-hydrogens, and why are they acidic? [1]\n\n(b) Give the mechanism of the aldol condensation of ethanal and name the product formed on heating. [2½]\n\n(c) Write the equation for the Cannizzaro reaction of methanal and explain why ethanal does not undergo this reaction. [1½]',
  model: r`(a) Hydrogens on the carbon next to C=O; removing one gives an enolate stabilised by resonance (charge on O).

(b) $\ce{OH-}$ removes an α-H to give the enolate $\ce{CH2CHO-}$; this attacks the C=O of another ethanal; the alkoxide is protonated by water to give 3-hydroxybutanal (aldol). On heating it loses water to give but-2-enal, $\ce{CH3CH=CHCHO}$.

(c) $\ce{2HCHO + NaOH -> HCOONa + CH3OH}$. Ethanal has α-hydrogens, so with alkali it forms an enolate and undergoes aldol condensation instead.`,
  sol: 'α-H; aldol mechanism; Cannizzaro.',
  scheme: [['(a)', 1], ['(b) Mechanism', 2], ['(b) But-2-enal', 0.5], ['(c)', 1.5]],
  d: 3, c: 'understanding', t: [5],
}));
add('redox-long', long({
  stem: '(a) Write equations for the oxidation of ethanal by Tollens’ reagent and by Fehling’s solution, and state the observations. [2]\n\n(b) Give the reagents and conditions for reducing butanone to (i) butan-2-ol and (ii) butane by two different methods. [2]\n\n(c) Which of propanal, butanone and pentan-3-one give the iodoform test? [1]',
  model: r`(a) $\ce{CH3CHO + 2[Ag(NH3)2]+ + 3OH- -> CH3COO- + 2Ag + 2H2O + 4NH3}$: silver mirror. $\ce{CH3CHO + 2Cu^2+ + 5OH- -> CH3COO- + Cu2O + 3H2O}$: red-brown precipitate.

(b) (i) NaBH₄ (or LiAlH₄, or H₂/Ni). (ii) Clemmensen: Zn–Hg, conc. HCl; Wolff–Kishner: NH₂NH₂, then KOH in ethylene glycol, heat (or red P + HI).

(c) Only butanone (CH₃CO–).`,
  sol: 'Tollens’ and Fehling’s; reductions; butanone.',
  scheme: [['(a)', 2], ['(b)(i)', 0.5], ['(b)(ii)', 1.5], ['(c)', 1]],
  d: 3, c: 'application', t: [4, 6],
}));
add('ident-long', long({
  stem: 'Three compounds A, B and C have the formula C₃H₆O. A gives a silver mirror with Tollens’ reagent; B gives a yellow precipitate with I₂/NaOH but no silver mirror; C decolourises bromine water and reacts with sodium, liberating hydrogen.\n\n(a) Identify A, B and C. [3]\n\n(b) Write the equation for the reaction of B with HCN. [1]\n\n(c) What does A give with dilute NaOH? [1]',
  model: '(a) A: propanal, CH₃CH₂CHO (aldehyde). B: propanone, CH₃COCH₃ (methyl ketone). C: prop-2-en-1-ol, CH₂=CHCH₂OH (C=C and –OH).\n\n(b) CH₃COCH₃ + HCN → (CH₃)₂C(OH)CN.\n\n(c) Aldol condensation: 3-hydroxy-2-methylpentanal (and 2-methylpent-2-enal on heating).',
  sol: 'Propanal; propanone; prop-2-en-1-ol.',
  scheme: [['A', 1], ['B', 1], ['C', 1], ['(b)', 1], ['(c)', 1]],
  d: 4, c: 'analysis', t: [3, 5, 6],
}));
