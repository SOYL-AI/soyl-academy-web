// ISC 12 Chemistry ch19 Amines — question bank (ISC style). Stems name their own compounds and data.
// MCQ keys are placed by the builder; AR keys planned: a b c d a. Numericals re-solved.
import { mk, add, r } from './lib.mjs';

const { mcq, ar, tf, fill, match, num, short, long } = mk;
const near = (a, b, rel = 0.005) => Math.abs(a - b) <= Math.max(1e-9, Math.abs(b) * rel);

// ---------------------------------------------------------------- t01 classification, structure, names
add('class-mcq', mcq({
  stem: 'Butan-2-amine, CH₃CH₂CH(NH₂)CH₃, is classified as a:',
  right: 'primary amine',
  wrong: ['secondary amine', 'tertiary amine', 'quaternary ammonium salt'],
  sol: 'Only one carbon group is attached to nitrogen — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('name-mcq', mcq({
  stem: 'The IUPAC name of triethylamine, (C₂H₅)₃N, is:',
  right: 'N,N-diethylethanamine',
  wrong: ['triethanamine', 'N-ethyldiethanamine', 'hexan-3-amine'],
  sol: 'Parent ethanamine with two N-ethyl groups — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('formula-mcq', mcq({
  stem: 'The general formula of saturated open-chain aliphatic amines is:',
  right: 'CₙH₂ₙ₊₃N',
  wrong: ['CₙH₂ₙ₊₁N', 'CₙH₂ₙN', 'CₙH₂ₙ₊₂N'],
  sol: 'CₙH₂ₙ₊₁NH₂ = CₙH₂ₙ₊₃N — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('shape-mcq', mcq({
  stem: 'In methanamine, the nitrogen atom is:',
  right: 'sp³ hybridised with a lone pair, giving a pyramidal arrangement',
  wrong: ['sp² hybridised and planar', 'sp hybridised and linear', 'sp³ hybridised with no lone pair'],
  sol: 'Option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('quat-tf', tf({
  stem: 'Tetramethylammonium iodide, (CH₃)₄N⁺I⁻, is a tertiary amine.',
  key: 'f',
  sol: 'False. It is a quaternary ammonium salt.',
  d: 1, c: 'understanding', t: [1],
}));
add('isomer-fill', fill({
  stem: 'The number of structural isomers of C₃H₉N that are amines is ___.',
  acc: [['4', 'four']],
  sol: '**4**: propan-1-amine, propan-2-amine, N-methylethanamine and N,N-dimethylmethanamine.',
  d: 3, c: 'application', t: [1],
}));
add('class-match', match({
  stem: 'Match each compound with its class.',
  pairs: [
    ['Propan-2-amine', 'Primary amine'],
    ['N-Methylpropan-1-amine', 'Secondary amine'],
    ['N,N-Dimethylethanamine', 'Tertiary amine'],
    ['(C₂H₅)₄N⁺Br⁻', 'Quaternary ammonium salt'],
  ],
  order: [1, 3, 0, 2],
  sol: 'Propan-2-amine 1°; N-methylpropan-1-amine 2°; N,N-dimethylethanamine 3°; (C₂H₅)₄N⁺Br⁻ quaternary.',
  d: 2, c: 'application', t: [1],
}));
add('name-short', short({
  marks: 2,
  stem: 'Give the IUPAC names and classes of (a) (CH₃)₂CHNHCH₂CH₃ and (b) H₂N(CH₂)₆NH₂.',
  model: '(a) N-Ethylpropan-2-amine — secondary. (b) Hexane-1,6-diamine — a primary diamine.',
  sol: 'Two names and classes.',
  scheme: [['(a)', 1], ['(b)', 1]],
  d: 2, c: 'application', t: [1],
}));
add('isomer-short3', short({
  marks: 3,
  stem: 'Write the structures and IUPAC names of the four amines with formula C₃H₉N, and classify each.',
  model: 'CH₃CH₂CH₂NH₂, propan-1-amine (1°); CH₃CH(NH₂)CH₃, propan-2-amine (1°); CH₃CH₂NHCH₃, N-methylethanamine (2°); (CH₃)₃N, N,N-dimethylmethanamine (3°).',
  sol: 'Four amines.',
  scheme: [['Structures', 1], ['Names', 1], ['Classes', 1]],
  d: 2, c: 'application', t: [1],
}));

// ---------------------------------------------------------------- t02 preparation
add('prep-mcq', mcq({
  stem: 'Butanamide is warmed with bromine and aqueous KOH. The amine formed is:',
  right: 'propan-1-amine',
  wrong: ['butan-1-amine', 'pentan-1-amine', 'butanenitrile'],
  sol: 'Hofmann degradation removes one carbon — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('nitrile-mcq', mcq({
  stem: 'Propanenitrile is reduced with sodium and ethanol (Mendius reduction). The product is:',
  right: 'propan-1-amine',
  wrong: ['ethanamine', 'propanal', 'propanamide'],
  sol: 'RCN → RCH₂NH₂ — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('gabriel-mcq', mcq({
  stem: 'Potassium phthalimide is heated with 1-bromobutane and the product is hydrolysed. The amine obtained is:',
  right: 'butan-1-amine only',
  wrong: ['a mixture of 1°, 2° and 3° butylamines', 'dibutylamine', 'aniline'],
  sol: 'Gabriel synthesis gives a pure primary amine — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('alumina-mcq', mcq({
  stem: 'Ethanol vapour and ammonia are passed over heated alumina at about 633 K. The products include:',
  right: 'ethanamine, together with diethylamine and triethylamine',
  wrong: ['only ethanamine', 'ethanenitrile', 'ethanamide'],
  sol: 'The amine formed can react further — a mixture results — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('snhcl-mcq', mcq({
  stem: 'Nitrobenzene is reduced with tin and concentrated hydrochloric acid. Before aniline can be steam distilled, the mixture must be:',
  right: 'made alkaline with NaOH to liberate aniline from anilinium chloride',
  wrong: ['acidified further with HCl', 'cooled to 273 K', 'treated with nitrous acid'],
  sol: 'C₆H₅NH₃Cl + NaOH → C₆H₅NH₂ + NaCl + H₂O — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('gabriel-ar', ar({
  a: 'Aniline cannot be prepared by the Gabriel phthalimide synthesis.',
  r: 'Aryl halides do not undergo SN2 substitution with the phthalimide anion.',
  key: 'a',
  sol: 'Both are true, and R explains A — option (a).',
  d: 2, c: 'understanding', t: [2],
}));
add('hofmann-tf', tf({
  stem: 'In the Hofmann bromamide degradation, the amine formed has one carbon atom fewer than the amide.',
  key: 't',
  sol: 'True. The carbonyl carbon is lost as carbonate.',
  d: 1, c: 'recall', t: [2],
}));
add('hofmann-num', num({
  marks: 2,
  stem: r`$7.3\ \text{g}$ of propanamide ($M = 73$) undergoes complete Hofmann degradation. What mass of ethanamine ($M = 45$) is formed?`,
  value: 4.5, tol: 0.02, unit: 'g',
  sol: r`$n = 7.3 \div 73 = 0.100\ \text{mol}$; 1 : 1; mass $= 0.100 \times 45 = 4.5\ \text{g}$.`,
  scheme: [['0.100 mol', 1], ['4.5 g', 1]],
  d: 2, c: 'application', t: [2],
}), () => near(0.1 * 45, 4.5) || 'mass');
add('hofmann-short', short({
  marks: 2,
  stem: 'Write the equation for the Hofmann bromamide degradation of propanamide and name the amine formed.',
  model: r`$\ce{CH3CH2CONH2 + Br2 + 4KOH -> CH3CH2NH2 + K2CO3 + 2KBr + 2H2O}$: ethanamine.`,
  sol: 'Equation; ethanamine.',
  scheme: [['Balanced equation', 1], ['Ethanamine', 1]],
  d: 2, c: 'application', t: [2],
}));
add('gabriel-short', short({
  marks: 2,
  stem: 'Outline the Gabriel phthalimide synthesis of propan-1-amine and state why it gives no secondary or tertiary amine.',
  model: 'Phthalimide + KOH → potassium phthalimide; + 1-bromopropane (SN2) → N-propylphthalimide; hydrolysis (aqueous NaOH or hydrazine) → propan-1-amine + phthalate. Only one alkyl group can attach to the phthalimide nitrogen (it has only one N–H), so no further alkylation occurs.',
  sol: 'Three steps; one N–H.',
  scheme: [['Steps', 1], ['Reason', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('prep-short3', short({
  marks: 3,
  stem: 'Suggest a method, with reagents, to prepare (a) butan-1-amine from 1-bromopropane, (b) propan-1-amine from butanamide and (c) 4-methylaniline from 4-nitrotoluene.',
  model: '(a) KCN in ethanol → butanenitrile; then LiAlH₄ (or H₂/Ni, or Na/ethanol). (b) Br₂ + KOH (Hofmann degradation). (c) Sn (or Fe) + conc. HCl, then NaOH (or H₂/Ni).',
  sol: 'Nitrile reduction; Hofmann; nitro reduction.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 3, c: 'application', t: [2],
}));

// ---------------------------------------------------------------- t03 physical properties
add('bp-mcq', mcq({
  stem: 'Propan-1-amine (b.p. 321 K) boils lower than propan-1-ol (b.p. 370 K). The main reason is that:',
  right: 'N–H···N hydrogen bonds are weaker than O–H···O hydrogen bonds',
  wrong: ['amines cannot form hydrogen bonds', 'propan-1-amine has a much smaller molar mass', 'amines are non-polar'],
  sol: 'N is less electronegative than O — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('isobp-mcq', mcq({
  stem: 'Among the isomers butan-1-amine, N-methylpropan-1-amine and N,N-dimethylethanamine, which has the lowest boiling point?',
  right: 'N,N-Dimethylethanamine',
  wrong: ['Butan-1-amine', 'N-Methylpropan-1-amine', 'All boil at the same temperature'],
  sol: 'The tertiary amine has no N–H for intermolecular hydrogen bonding — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('sol-tf', tf({
  stem: 'Lower aliphatic amines are soluble in water because they form hydrogen bonds with water molecules.',
  key: 't',
  sol: 'True.',
  d: 1, c: 'understanding', t: [3],
}));
add('bp-short', short({
  marks: 2,
  stem: 'Arrange the isomers butan-1-amine, N-ethylethanamine and N,N-dimethylethanamine in order of increasing boiling point and explain.',
  model: 'N,N-Dimethylethanamine (3°) < N-ethylethanamine (2°) < butan-1-amine (1°). The 1° amine has two N–H bonds and forms the most hydrogen bonds; the 2° has one; the 3° has none and has only dipole/dispersion forces.',
  sol: '3° < 2° < 1°; number of N–H.',
  scheme: [['Order', 1], ['Reason', 1]],
  d: 2, c: 'understanding', t: [3],
}));

// ---------------------------------------------------------------- t04 basicity
add('base-mcq', mcq({
  stem: 'In aqueous solution, which of the ethylamines is the strongest base?',
  right: 'Diethylamine, (C₂H₅)₂NH',
  wrong: ['Ethanamine, C₂H₅NH₂', 'Triethylamine, (C₂H₅)₃N', 'Ammonia'],
  sol: 'pKb: (C₂H₅)₂NH 3.00 < (C₂H₅)₃N 3.25 < C₂H₅NH₂ 3.29 — option (@K).',
  d: 3, c: 'application', t: [4],
}));
add('gas-mcq', mcq({
  stem: 'In the gas phase, where solvation is absent, the order of basicity of the methylamines is:',
  right: '(CH₃)₃N > (CH₃)₂NH > CH₃NH₂ > NH₃',
  wrong: ['(CH₃)₂NH > CH₃NH₂ > (CH₃)₃N > NH₃', 'NH₃ > CH₃NH₂ > (CH₃)₂NH > (CH₃)₃N', 'CH₃NH₂ > (CH₃)₂NH > (CH₃)₃N > NH₃'],
  sol: 'Only the +I effect operates — option (@K).',
  d: 3, c: 'understanding', t: [4],
}));
add('anil-mcq', mcq({
  stem: 'Aniline (pKb 9.38) is a much weaker base than ammonia (pKb 4.75) because:',
  right: 'the nitrogen lone pair is delocalised into the benzene ring',
  wrong: ['aniline has no lone pair on nitrogen', 'the phenyl group releases electrons', 'aniline is insoluble in acids'],
  sol: 'Option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('subst-mcq', mcq({
  stem: 'Which substituted aniline is the strongest base: 4-nitroaniline, 4-chloroaniline, aniline or 4-methoxyaniline?',
  right: '4-Methoxyaniline',
  wrong: ['4-Nitroaniline', '4-Chloroaniline', 'Aniline'],
  sol: '–OCH₃ releases electrons by +R at para, increasing electron density on N — option (@K).',
  d: 3, c: 'application', t: [4],
}));
add('benzyl-mcq', mcq({
  stem: 'N-Methylaniline, C₆H₅NHCH₃, and N-methylbenzylamine, C₆H₅CH₂NHCH₃, are both secondary amines. Which is the stronger base, and why?',
  right: 'N-Methylbenzylamine, because its nitrogen lone pair is not delocalised into the ring',
  wrong: ['N-Methylaniline, because it has a phenyl group on nitrogen', 'Both are equally basic', 'N-Methylaniline, because the ring releases electrons to nitrogen'],
  sol: 'The CH₂ group insulates N from the ring — option (@K).',
  d: 3, c: 'analysis', t: [4],
}));
add('base-ar', ar({
  a: 'In water, trimethylamine is a weaker base than dimethylamine.',
  r: 'The trimethylammonium ion has only one N–H to hydrogen-bond with water, and bulky methyl groups hinder its solvation.',
  key: 'a',
  sol: 'Both are true, and R explains A — option (a).',
  d: 3, c: 'analysis', t: [4],
}));
add('anil-ar', ar({
  a: 'Aniline dissolves in dilute hydrochloric acid.',
  r: 'Aniline is a stronger base than ammonia.',
  key: 'c',
  sol: 'A is true (anilinium chloride forms). R is false: aniline is weaker than ammonia — option (c).',
  d: 2, c: 'understanding', t: [4],
}));
add('kb-num', num({
  marks: 2,
  stem: r`The pKb values of ammonia and aniline are 4.75 and 9.38. By what factor is $K_b$ of ammonia larger than that of aniline? Give your answer to three significant figures.`,
  value: 42700, tol: 150, unit: null,
  sol: r`Ratio $= 10^{(9.38 - 4.75)} = 10^{4.63} \approx 42700$.`,
  scheme: [['ΔpKb = 4.63', 1], ['≈ 4.27 × 10⁴', 1]],
  d: 3, c: 'application', t: [4],
}), () => near(Math.pow(10, 4.63), 42700, 0.003) || 'ratio');
add('base-short', short({
  marks: 2,
  stem: 'Explain why ethanamine is a stronger base than ammonia, but aniline is a weaker base than ammonia.',
  model: 'Ethanamine: the ethyl group releases electrons (+I), increasing electron density on nitrogen and stabilising the conjugate acid. Aniline: the nitrogen lone pair is delocalised into the benzene ring (resonance), making it less available for protonation; protonation would destroy this resonance stabilisation.',
  sol: '+I vs delocalisation.',
  scheme: [['Ethanamine +I', 1], ['Aniline resonance', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('rank-short3', short({
  marks: 3,
  stem: 'Arrange in increasing basic strength in water and explain: ammonia, methanamine, N-methylmethanamine, N,N-dimethylmethanamine.',
  model: 'NH₃ < (CH₃)₃N < CH₃NH₂ < (CH₃)₂NH. Methyl groups increase electron density on N (+I). In water, the protonated amine is stabilised by hydrogen bonding with water: more N–H bonds give better solvation, and bulky groups hinder it. The tertiary amine’s cation is least solvated, so despite three methyl groups it is weaker than the 1° and 2° amines; the 2° amine has the best balance.',
  sol: 'Order; +I, solvation, steric.',
  scheme: [['Order', 1], ['+I effect', 1], ['Solvation and steric effects', 1]],
  d: 4, c: 'analysis', t: [4],
}));
add('subst-short3', short({
  marks: 3,
  stem: 'Arrange 4-nitroaniline, aniline and 4-methylaniline in increasing basic strength, and explain the effect of each substituent.',
  model: '4-Nitroaniline < aniline < 4-methylaniline. –NO₂ withdraws electrons (−I, −R) and extends delocalisation of the N lone pair, lowering basicity. –CH₃ releases electrons (+I, hyperconjugation), increasing electron density on N.',
  sol: 'Order; −R of NO₂; +I of CH₃.',
  scheme: [['Order', 1], ['NO₂ effect', 1], ['CH₃ effect', 1]],
  d: 3, c: 'application', t: [4],
}));

// ---------------------------------------------------------------- t05 alkylation, acylation, HNO₂, carbylamine, Hinsberg
add('acyl-mcq', mcq({
  stem: 'Which amine is NOT converted into an amide by ethanoyl chloride?',
  right: 'N,N-Diethylethanamine',
  wrong: ['Ethanamine', 'N-Ethylethanamine', 'Aniline'],
  sol: 'A tertiary amine has no N–H — option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('alkyl-mcq', mcq({
  stem: 'Methanamine is treated with excess iodomethane. The final product is:',
  right: 'tetramethylammonium iodide',
  wrong: ['N-methylmethanamine only', 'methanol', 'iodoform'],
  sol: 'Successive SN2 alkylations lead to the quaternary salt — option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('test-mcq', mcq({
  stem: 'An amine C₄H₁₁N reacts with benzenesulphonyl chloride to give a product that dissolves in aqueous KOH. The amine could be:',
  right: 'butan-1-amine',
  wrong: ['N-ethylethanamine', 'N,N-dimethylethanamine', 'N-methylpropan-1-amine'],
  sol: 'Only a 1° amine gives a KOH-soluble sulphonamide — option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('hno2-mcq', mcq({
  stem: 'N-Methylpropan-1-amine is treated with NaNO₂ and dilute HCl in the cold. The observation is:',
  right: 'a yellow oily N-nitrosamine separates',
  wrong: ['nitrogen gas is evolved', 'an orange dye forms', 'no change occurs'],
  sol: 'Secondary amines give N-nitrosamines — option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('carbyl-mcq', mcq({
  stem: 'Which compound gives the carbylamine test?',
  right: '2-Methylpropan-2-amine, (CH₃)₃CNH₂',
  wrong: ['N-Methylethanamine', 'N,N-Dimethylmethanamine', 'Tetramethylammonium chloride'],
  sol: 'Any primary amine, even with a tertiary alkyl group — option (@K).',
  d: 3, c: 'application', t: [5],
}));
add('mech-ar', ar({
  a: 'In the reaction of ethanamine with ethanoyl chloride, the nitrogen lone pair attacks the carbonyl carbon.',
  r: 'The carbonyl carbon of an acid chloride carries a partial positive charge.',
  key: 'a',
  sol: 'Both are true; R explains why the lone pair attacks there — option (a).',
  d: 2, c: 'understanding', t: [5],
}));
add('hins-ar', ar({
  a: 'The Hinsberg product of a secondary amine is insoluble in aqueous KOH.',
  r: 'Secondary amines do not react with benzenesulphonyl chloride.',
  key: 'c',
  sol: 'A is true. R is false: they react, but the product has no acidic N–H — option (c).',
  d: 3, c: 'analysis', t: [5],
}));
add('carbyl-tf', tf({
  stem: 'Aniline gives a foul-smelling isocyanide when warmed with chloroform and alcoholic KOH.',
  key: 't',
  sol: 'True. Aniline is a primary amine.',
  d: 1, c: 'recall', t: [5],
}));
add('hinsberg-fill', fill({
  stem: 'Hinsberg’s reagent, used to distinguish 1°, 2° and 3° amines, is benzene___ chloride.',
  acc: [['sulphonyl', 'sulfonyl']],
  sol: 'Benzene**sulphonyl** chloride, C₆H₅SO₂Cl.',
  d: 1, c: 'recall', t: [5],
}));
add('n2-num', num({
  marks: 2,
  stem: r`$0.59\ \text{g}$ of propan-1-amine ($M = 59$) reacts completely with nitrous acid: $\ce{CH3CH2CH2NH2 + HNO2 -> CH3CH2CH2OH + N2 + H2O}$. What volume of nitrogen is evolved at STP, in mL? (Molar volume $22400\ \text{mL}$)`,
  value: 224, tol: 1, unit: 'mL',
  sol: r`$n = 0.59 \div 59 = 0.010\ \text{mol}$; $V = 0.010 \times 22400 = 224\ \text{mL}$.`,
  scheme: [['0.010 mol', 1], ['224 mL', 1]],
  d: 2, c: 'application', t: [5],
}), () => near(0.01 * 22400, 224) || 'v');
add('acyl-short', short({
  marks: 2,
  stem: 'Outline the mechanism of the reaction of ethanamine with ethanoyl chloride, naming the product.',
  model: 'The lone pair on N of CH₃CH₂NH₂ attacks the δ+ carbonyl carbon of CH₃COCl, forming a tetrahedral intermediate; the C=O re-forms as Cl⁻ is expelled; loss of H⁺ from nitrogen (taken up by base) gives N-ethylethanamide, CH₃CONHCH₂CH₃.',
  sol: 'Addition–elimination; N-ethylethanamide.',
  scheme: [['Mechanism steps', 1], ['Product', 1]],
  d: 3, c: 'understanding', t: [5],
}));
add('carbyl-short', short({
  marks: 2,
  stem: 'Write the equation for the carbylamine reaction of ethanamine and state which classes of amine give this test.',
  model: r`$\ce{CH3CH2NH2 + CHCl3 + 3KOH -> CH3CH2NC + 3KCl + 3H2O}$ (foul-smelling ethyl isocyanide). Only primary amines (aliphatic and aromatic) give it.`,
  sol: 'Equation; 1° only.',
  scheme: [['Equation', 1], ['1° amines only', 1]],
  d: 2, c: 'application', t: [5],
}));
add('test-short3', short({
  marks: 3,
  stem: 'Describe how Hinsberg’s test distinguishes propan-1-amine, N-methylethanamine and N,N-dimethylmethanamine.',
  model: 'Shake each with benzenesulphonyl chloride and aqueous KOH. Propan-1-amine (1°) gives C₆H₅SO₂NHCH₂CH₂CH₃, whose N–H is acidic, so it dissolves in KOH (precipitates on acidifying). N-Methylethanamine (2°) gives C₆H₅SO₂N(CH₃)C₂H₅, with no N–H: insoluble in KOH. N,N-Dimethylmethanamine (3°) does not react.',
  sol: 'Soluble; insoluble; no reaction.',
  scheme: [['1°', 1], ['2°', 1], ['3°', 1]],
  d: 3, c: 'application', t: [5],
}));
add('hno2-short3', short({
  marks: 3,
  stem: 'Describe and explain the reactions of nitrous acid (NaNO₂ + HCl) with (a) ethanamine, (b) N-ethylethanamine and (c) aniline at 273–278 K.',
  model: r`(a) Effervescence of N₂: $\ce{C2H5NH2 + HNO2 -> C2H5OH + N2 + H2O}$ (the aliphatic diazonium ion is unstable). (b) Yellow oily N-nitrosamine: $\ce{(C2H5)2NH + HNO2 -> (C2H5)2NN=O + H2O}$. (c) Benzenediazonium chloride, stable in the cold: $\ce{C6H5NH2 + NaNO2 + 2HCl -> C6H5N2Cl + NaCl + 2H2O}$.`,
  sol: 'N₂; nitrosamine; diazonium salt.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 3, c: 'understanding', t: [5, 6],
}));

// ---------------------------------------------------------------- t06 aniline
add('aniline-mcq', mcq({
  stem: 'Aniline reacts with bromine water at room temperature. The product is:',
  right: '2,4,6-tribromoaniline, a white precipitate',
  wrong: ['4-bromoaniline only', '3-bromoaniline', 'bromobenzene'],
  sol: '–NH₂ strongly activates all o/p positions — option (@K).',
  d: 1, c: 'application', t: [6],
}));
add('protect-mcq', mcq({
  stem: 'Aniline is converted into acetanilide before nitration mainly because the acetyl group:',
  right: 'protects the ring from oxidation and reduces activation so that mainly the para product forms',
  wrong: ['makes the ring more reactive', 'converts –NH₂ into a meta director', 'increases the basicity of nitrogen'],
  sol: 'Option (@K).',
  d: 2, c: 'understanding', t: [6],
}));
add('meta-mcq', mcq({
  stem: 'Direct nitration of aniline with concentrated HNO₃/H₂SO₄ gives a large amount of 3-nitroaniline because:',
  right: 'in strong acid aniline is protonated to the anilinium ion, a meta director',
  wrong: ['–NH₂ is a meta director', 'the para position is blocked', 'nitric acid reduces aniline'],
  sol: 'C₆H₅NH₃⁺ is deactivating and meta directing — option (@K).',
  d: 3, c: 'analysis', t: [6],
}));
add('sulph-mcq', mcq({
  stem: 'Aniline is heated with concentrated sulphuric acid at about 453–473 K. The product, which exists as a zwitter ion, is:',
  right: 'sulphanilic acid (4-aminobenzenesulphonic acid)',
  wrong: ['3-aminobenzenesulphonic acid', 'anilinium hydrogensulphate only', 'benzenesulphonic acid'],
  sol: 'Option (@K).',
  d: 2, c: 'recall', t: [6],
}));
add('dye-mcq', mcq({
  stem: 'Which test distinguishes aniline from ethanamine?',
  right: 'Diazotise in the cold and add alkaline 2-naphthol: an orange-red dye forms with aniline only',
  wrong: ['Carbylamine test', 'Reaction with dilute HCl', 'Reaction with ethanoyl chloride'],
  sol: 'Aliphatic diazonium ions decompose, giving no dye — option (@K).',
  d: 2, c: 'application', t: [6],
}));
add('fc-tf', tf({
  stem: 'Aniline readily undergoes Friedel–Crafts alkylation with CH₃Cl and AlCl₃.',
  key: 'f',
  sol: 'False. The –NH₂ group forms a complex with the Lewis acid AlCl₃, deactivating the ring.',
  d: 2, c: 'understanding', t: [6],
}));
add('benzanil-fill', fill({
  stem: 'Benzoylation of aniline with benzoyl chloride in aqueous NaOH (Schotten–Baumann reaction) gives ___ (N-phenylbenzamide).',
  acc: [['benzanilide']],
  sol: '**Benzanilide**.',
  d: 1, c: 'recall', t: [6],
}));
add('nitroben-ar', ar({
  a: 'After reduction of nitrobenzene with tin and HCl, the mixture is made alkaline before aniline is distilled.',
  r: 'Aniline is present as anilinium chloride, which is not volatile.',
  key: 'a',
  sol: 'Both true; R explains A — option (a).',
  d: 2, c: 'understanding', t: [6],
}));
add('acet-ar', ar({
  a: 'Bromine water converts acetanilide into 2,4,6-tribromoacetanilide.',
  r: 'The acetamido group is a weaker activator than the amino group.',
  key: 'd',
  sol: 'A is false: acetanilide gives mainly 4-bromoacetanilide. R is true — option (d).',
  d: 3, c: 'analysis', t: [6],
}));
add('aniline-num', num({
  marks: 2,
  stem: r`$24.6\ \text{g}$ of nitrobenzene ($M = 123$) is reduced to aniline ($M = 93$) with a 75% yield. What mass of aniline is obtained?`,
  value: 13.95, tol: 0.05, unit: 'g',
  sol: r`$n = 24.6 \div 123 = 0.200\ \text{mol}$; mass $= 0.200 \times 93 \times 0.75 = 13.95\ \text{g}$.`,
  scheme: [['0.200 mol', 1], ['13.95 g', 1]],
  d: 3, c: 'application', t: [6],
}), () => near(0.2 * 93 * 0.75, 13.95) || 'mass');
add('acet-num', num({
  marks: 2,
  stem: r`$9.3\ \text{g}$ of aniline ($M = 93$) is acetylated completely with ethanoic anhydride. What mass of acetanilide ($M = 135$) is formed?`,
  value: 13.5, tol: 0.05, unit: 'g',
  sol: r`$n = 9.3 \div 93 = 0.100\ \text{mol}$; mass $= 0.100 \times 135 = 13.5\ \text{g}$.`,
  scheme: [['0.100 mol', 1], ['13.5 g', 1]],
  d: 2, c: 'application', t: [6],
}), () => near(0.1 * 135, 13.5) || 'mass');
add('prepanil-short', short({
  marks: 2,
  stem: 'Write equations for the preparation of aniline from nitrobenzene with tin and hydrochloric acid, and its liberation from the salt.',
  model: r`$\ce{C6H5NO2 + 3Sn + 7HCl -> C6H5NH3Cl + 3SnCl2 + 2H2O}$; $\ce{C6H5NH3Cl + NaOH -> C6H5NH2 + NaCl + H2O}$ (then steam distil).`,
  sol: 'Reduction; liberation.',
  scheme: [['Reduction equation', 1], ['Liberation', 1]],
  d: 2, c: 'application', t: [6],
}));
add('bromo-short', short({
  marks: 2,
  stem: 'How would you convert aniline into 4-bromoaniline? Why is bromine water not used directly?',
  model: 'Acetylate with (CH₃CO)₂O → acetanilide; brominate with Br₂ in ethanoic acid → 4-bromoacetanilide; hydrolyse (acid or alkali) → 4-bromoaniline. Bromine water would give 2,4,6-tribromoaniline because –NH₂ strongly activates all o/p positions.',
  sol: 'Protect, brominate, deprotect.',
  scheme: [['Sequence', 1], ['Reason', 1]],
  d: 3, c: 'application', t: [6],
}));
add('nitro-short3', short({
  marks: 3,
  stem: 'Show how 4-nitroaniline is prepared from aniline, and give two reasons why direct nitration is avoided.',
  model: 'Aniline + (CH₃CO)₂O → acetanilide; conc. HNO₃/H₂SO₄ (cold) → 4-nitroacetanilide (mainly para); hydrolysis (H⁺ or OH⁻, heat) → 4-nitroaniline. Reasons: (i) HNO₃ oxidises the strongly activated aniline ring (tarry products); (ii) in strong acid aniline becomes the anilinium ion, a meta director, giving much 3-nitroaniline.',
  sol: 'Protect, nitrate, hydrolyse; oxidation and anilinium.',
  scheme: [['Sequence', 1], ['Reason 1', 1], ['Reason 2', 1]],
  d: 3, c: 'analysis', t: [6],
}));
add('anilrx-short3', short({
  marks: 3,
  stem: 'Give the product of aniline with (a) dilute HCl, (b) benzoyl chloride in NaOH and (c) excess iodomethane.',
  model: '(a) Anilinium chloride, C₆H₅NH₃⁺Cl⁻. (b) Benzanilide, C₆H₅NHCOC₆H₅. (c) N,N,N-Trimethylanilinium iodide, C₆H₅N(CH₃)₃⁺I⁻ (via N-methyl- and N,N-dimethylaniline).',
  sol: 'Salt; benzanilide; quaternary salt.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 2, c: 'application', t: [6],
}));

// ---------------------------------------------------------------- long answers
add('prep-long', long({
  stem: '(a) Write equations for preparing (i) ethanamine from propanamide and (ii) propan-1-amine from propanenitrile. [2]\n\n(b) Describe the Gabriel phthalimide synthesis of butan-1-amine and explain why it is useful. [2]\n\n(c) Explain why amines boil lower than alcohols of similar molar mass. [1]',
  model: r`(a) (i) $\ce{CH3CH2CONH2 + Br2 + 4KOH -> CH3CH2NH2 + K2CO3 + 2KBr + 2H2O}$. (ii) $\ce{CH3CH2CN + 2H2 ->[Ni] CH3CH2CH2NH2}$.

(b) Phthalimide + KOH → potassium phthalimide; + 1-bromobutane (SN2) → N-butylphthalimide; hydrolysis → butan-1-amine + phthalate. Gives a pure primary amine, free of 2° and 3° amines.

(c) N–H···N hydrogen bonds are weaker than O–H···O because N is less electronegative than O.`,
  sol: 'Hofmann; nitrile reduction; Gabriel; H-bond strength.',
  scheme: [['(a)(i)', 1], ['(a)(ii)', 1], ['(b)', 2], ['(c)', 1]],
  d: 2, c: 'application', t: [2, 3],
}));
add('basic-long', long({
  stem: '(a) Explain why the order of basic strength of the methylamines in water differs from that in the gas phase. [2½]\n\n(b) Explain why aniline is a weaker base than ammonia, and how a 4-nitro and a 4-methyl group affect its basicity. [2½]',
  model: '(a) Gas phase: only the +I effect operates, so (CH₃)₃N > (CH₃)₂NH > CH₃NH₂ > NH₃. In water, the protonated amines are also stabilised by hydrogen bonding with water — more N–H bonds give better solvation, and bulky methyl groups hinder it. The tertiary ammonium ion is poorly solvated, so in water (CH₃)₂NH > CH₃NH₂ > (CH₃)₃N > NH₃.\n\n(b) The lone pair of aniline is delocalised into the ring and is less available for protonation; protonation also destroys this resonance stabilisation. 4-NO₂ withdraws electrons (−R, −I), further reducing basicity; 4-CH₃ releases electrons (+I, hyperconjugation), slightly increasing it.',
  sol: 'Inductive vs solvation; resonance; substituents.',
  scheme: [['(a) Gas phase', 1], ['(a) Water: solvation and steric', 1.5], ['(b) Aniline', 1.5], ['(b) Substituents', 1]],
  d: 4, c: 'analysis', t: [4],
}));
add('tests-long', long({
  stem: '(a) Describe Hinsberg’s test and explain how it distinguishes 1°, 2° and 3° amines. [2]\n\n(b) What happens when (i) a primary aliphatic amine, (ii) a secondary amine and (iii) aniline (at 273 K) react with nitrous acid? [2]\n\n(c) Which amines give the carbylamine reaction? Write the equation for aniline. [1]',
  model: r`(a) Shake with C₆H₅SO₂Cl and aqueous KOH: 1° amines give N-alkylsulphonamides with an acidic N–H, soluble in KOH; 2° amines give N,N-dialkylsulphonamides, insoluble in KOH; 3° amines do not react.

(b) (i) Alcohol + N₂ gas (effervescence). (ii) Yellow oily N-nitrosamine. (iii) Benzenediazonium chloride.

(c) Only primary amines: $\ce{C6H5NH2 + CHCl3 + 3KOH -> C6H5NC + 3KCl + 3H2O}$.`,
  sol: 'Hinsberg; HNO₂ reactions; carbylamine.',
  scheme: [['(a)', 2], ['(b)', 2], ['(c)', 1]],
  d: 3, c: 'application', t: [5],
}));
add('aniline-long', long({
  stem: '(a) How is aniline prepared from nitrobenzene in the laboratory? [1]\n\n(b) Write equations for the reaction of aniline with (i) bromine water, (ii) ethanoic anhydride and (iii) NaNO₂/HCl at 273–278 K. [3]\n\n(c) Why is aniline acetylated before nitration? [1]',
  model: r`(a) Reduce with Sn (or Fe) and conc. HCl; add NaOH to liberate aniline from anilinium chloride; steam distil.

(b) (i) $\ce{C6H5NH2 + 3Br2 -> C6H2Br3NH2 + 3HBr}$. (ii) $\ce{C6H5NH2 + (CH3CO)2O -> C6H5NHCOCH3 + CH3COOH}$. (iii) $\ce{C6H5NH2 + NaNO2 + 2HCl -> C6H5N2Cl + NaCl + 2H2O}$.

(c) To protect the ring from oxidation by HNO₃ and to moderate activation (and prevent anilinium formation), so that mainly the para mononitro product forms.`,
  sol: 'Reduction; three equations; protection.',
  scheme: [['(a)', 1], ['(b) Three equations', 3], ['(c)', 1]],
  d: 3, c: 'application', t: [6],
}));
add('ident-long', long({
  stem: 'An aromatic amine A, C₇H₉N, does not give the carbylamine test, reacts with benzenesulphonyl chloride to give a product insoluble in KOH, and gives a yellow oil with nitrous acid. Its isomer B gives the carbylamine test and, after diazotisation in the cold and coupling with 2-naphthol, an orange-red dye; B is the para isomer with a methyl group on the ring.\n\n(a) Identify A and B. [2]\n\n(b) Write the equation for the reaction of A with nitrous acid. [1]\n\n(c) Arrange A, B and aniline in order of basic strength, with a reason. [2]',
  model: r`(a) A: N-methylaniline, C₆H₅NHCH₃ (secondary aryl amine). B: 4-methylaniline (p-toluidine), CH₃C₆H₄NH₂.

(b) $\ce{C6H5NHCH3 + HNO2 -> C6H5N(CH3)N=O + H2O}$ (N-nitroso-N-methylaniline, yellow oil).

(c) Aniline < N-methylaniline < 4-methylaniline (conjugate-acid pKa about 4.6, 4.85 and 5.1). In each the lone pair is partly delocalised into the ring; a methyl group releases electrons (+I, hyperconjugation) and raises basicity, but on nitrogen its effect is partly offset by poorer solvation of the protonated secondary amine.`,
  sol: 'N-methylaniline; p-toluidine; basicity.',
  scheme: [['A', 1], ['B', 1], ['(b)', 1], ['(c)', 2]],
  d: 4, c: 'analysis', t: [4, 5, 6],
}));
