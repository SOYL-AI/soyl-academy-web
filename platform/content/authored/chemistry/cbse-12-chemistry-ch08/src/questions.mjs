// ch08 Aldehydes, Ketones and Carboxylic Acids — question bank. MCQ keys are placed by the builder (balanced);
// AR keys planned: a b c d a c. Every numerical is re-solved by the check function passed to add().
import { mk, add, r } from './lib.mjs';

const { mcq, ar, tf, fill, match, num, short, long, part } = mk;
const near = (a, b, rel = 0.005) => Math.abs(a - b) <= Math.max(1e-9, Math.abs(b) * rel);

// ---------------------------------------------------------------- t01 naming and structure
add('name-mcq', mcq({
  stem: r`An unbranched ketone of formula $\ce{C6H12O}$ gives a yellow precipitate when warmed with iodine and sodium hydroxide. Its IUPAC name is:`,
  right: 'hexan-2-one',
  wrong: ['hexan-3-one', 'hexanal', '4-methylpentan-2-one'],
  sol: 'A yellow precipitate (iodoform test) needs a CH₃CO– group, so the carbonyl is at C2 of an unbranched six-carbon chain: hexan-2-one — option (@K). (@1) has no CH₃CO– group; (@2) is an aldehyde, not a ketone; (@3) gives the test but is branched.',
  d: 3, c: 'application', t: [1],
}));
add('structure-mcq', mcq({
  stem: 'Which statement about the carbonyl group is correct?',
  right: 'The carbonyl carbon is sp² hybridised and the C=O bond is polar, with carbon partially positive.',
  wrong: ['The carbonyl carbon is sp³ hybridised and tetrahedral.', 'The C=O bond is non-polar because both atoms share electrons equally.', 'Oxygen carries a partial positive charge.'],
  sol: 'The carbonyl carbon forms three σ bonds in a plane (sp²) and a π bond; oxygen is more electronegative, so C is δ+ — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('name-fill', fill({
  stem: 'The IUPAC name of acetophenone, C₆H₅COCH₃, is 1-phenylethan-1-___.',
  acc: [['one']],
  sol: 'It is a ketone: 1-phenylethan-1-**one**.',
  d: 1, c: 'recall', t: [1],
}));

add('name-match', match({
  stem: 'Match each aldehyde or ketone with its IUPAC name.',
  pairs: [
    ['CH₃CH(CH₃)CHO', '2-Methylpropanal'],
    ['CH₃COCH₂CH₃', 'Butan-2-one'],
    ['C₆H₅COCH₃', '1-Phenylethan-1-one'],
    ['CH₃CH=CHCHO', 'But-2-enal'],
  ],
  order: [2, 0, 3, 1],
  sol: 'Aldehydes end in -al with the CHO carbon as C1; ketones end in -one with a locant; unsaturated aldehydes are -enals.',
  d: 2, c: 'understanding', t: [1],
}));
add('polarity-tf', tf({
  stem: 'Because the C=O bond is polar, aldehydes and ketones have higher boiling points than hydrocarbons of similar molar mass but lower boiling points than alcohols of similar mass.',
  key: 't',
  sol: 'True. Dipole–dipole attractions raise their boiling points above those of alkanes, but they cannot hydrogen-bond to each other as alcohols do.',
  d: 2, c: 'understanding', t: [1],
}));

// ---------------------------------------------------------------- t02 preparation
add('rosenmund-mcq', mcq({
  stem: 'Benzoyl chloride is converted into benzaldehyde by hydrogen over palladium poisoned with barium sulfate. The poisoned catalyst is used because:',
  right: 'it stops the reduction at the aldehyde stage',
  wrong: ['it speeds up the reduction to benzyl alcohol', 'it removes the chlorine as BaCl₂', 'it prevents hydrogen from reacting with the ring'],
  sol: 'A fully active Pd catalyst would reduce the aldehyde further to the alcohol; BaSO₄ lowers its activity (Rosenmund reduction) — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('etard-mcq', mcq({
  stem: 'Toluene is treated with chromyl chloride in CS₂ and the complex is hydrolysed. The product is:',
  right: 'benzaldehyde',
  wrong: ['benzoic acid', 'benzyl alcohol', 'acetophenone'],
  sol: 'The Etard reaction oxidises the methyl group only as far as –CHO — option (@K). Strong oxidants such as KMnO₄ would give benzoic acid (@1).',
  d: 1, c: 'recall', t: [2],
}));
add('stephen-mcq', mcq({
  stem: 'Which reagent sequence converts bromoethane into propanal?',
  right: 'KCN; then SnCl₂ + HCl, followed by water',
  wrong: ['KCN; then H₃O⁺ and heat', 'Mg in dry ether; then CO₂; then H₃O⁺', 'Aqueous NaOH; then Cu at 573 K'],
  sol: 'Propanal has one more carbon than bromoethane, so first add a carbon as –CN (KCN gives propanenitrile), then stop the reduction at the aldehyde with the Stephen reaction (SnCl₂/HCl, then hydrolysis) — option (@K). (@1) carries on to propanoic acid; (@2) also gives propanoic acid, by the Grignard route; (@3) gives ethanal, which has only two carbons.',
  d: 3, c: 'application', t: [2],
}));
add('fc-acyl-mcq', mcq({
  stem: 'Propylbenzene is to be made from benzene, free from its isomer isopropylbenzene. Which route is suitable?',
  right: 'Propanoyl chloride with anhydrous AlCl₃, then Zn–Hg and conc. HCl',
  wrong: ['1-Chloropropane with anhydrous AlCl₃', 'Propanoyl chloride with anhydrous AlCl₃, then NaBH₄', 'Propanal with dilute NaOH, then Zn–Hg and conc. HCl'],
  sol: r`Acylation attaches the propanoyl group to the ring without rearrangement, giving $\ce{C6H5COCH2CH3}$, and Clemmensen reduction then turns C=O into CH₂, giving $\ce{C6H5CH2CH2CH3}$ — option (@K). (@1) can rearrange the propyl cation to the isopropyl cation and give isopropylbenzene; (@2) stops at the alcohol 1-phenylpropan-1-ol; (@3) is not a way of attaching propanal to a benzene ring.`,
  d: 3, c: 'application', t: [2],
}));
add('alkyne-tf', tf({
  stem: 'Hydration of ethyne with dilute H₂SO₄ and HgSO₄ gives ethanal, while propyne gives propanone.',
  key: 't',
  sol: 'True. The enol formed tautomerises; only ethyne gives an aldehyde, other alkynes give ketones (Markovnikov addition).',
  d: 2, c: 'understanding', t: [2],
}));
add('prep-match', match({
  stem: 'Match each named reaction with what it converts.',
  pairs: [
    ['Rosenmund', 'Acid chloride → aldehyde'],
    ['Stephen', 'Nitrile → aldehyde'],
    ['Etard', 'Toluene → benzaldehyde'],
    ['Gatterman–Koch', 'Benzene → benzaldehyde'],
  ],
  order: [1, 3, 0, 2],
  sol: 'Rosenmund: RCOCl/H₂, Pd–BaSO₄; Stephen: RCN/SnCl₂–HCl; Etard: CrO₂Cl₂; Gatterman–Koch: CO + HCl, AlCl₃/CuCl.',
  d: 1, c: 'recall', t: [2],
}));
add('rosenmund-short', short({
  marks: 2, wl: null,
  stem: 'Write equations for (a) the Rosenmund reduction of benzoyl chloride and (b) Friedel–Crafts acylation of benzene with ethanoyl chloride.',
  model: r`(a) $\ce{C6H5COCl + H2 ->[Pd/BaSO4] C6H5CHO + HCl}$

(b) $\ce{C6H6 + CH3COCl ->[AlCl3] C6H5COCH3 + HCl}$`,
  sol: 'Two named reactions with conditions.',
  scheme: [['(a) with Pd/BaSO₄', 1], ['(b) with anhydrous AlCl₃', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('prep-short3', short({
  marks: 3, wl: null,
  stem: 'How would you prepare (a) ethanal from ethyne, (b) benzaldehyde from toluene, (c) propanone from propan-2-ol? Give reagents and conditions.',
  model: '(a) Pass ethyne into dilute H₂SO₄ containing HgSO₄ (about 333 K): the enol formed rearranges to ethanal.\n\n(b) Etard reaction: chromyl chloride (CrO₂Cl₂) in CS₂, then hydrolysis with water.\n\n(c) Oxidise with acidified K₂Cr₂O₇ (or pass the vapour over Cu at 573 K).',
  sol: 'Alkyne hydration; Etard; oxidation of a secondary alcohol.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 2, c: 'recall', t: [2],
}));

// ---------------------------------------------------------------- t03 reactions of aldehydes and ketones
add('reactivity-mcq', mcq({
  stem: 'Arrange in increasing reactivity towards HCN: propanone, ethanal, methanal, butan-2-one.',
  right: 'butan-2-one < propanone < ethanal < methanal',
  wrong: ['methanal < ethanal < propanone < butan-2-one', 'propanone < butan-2-one < methanal < ethanal', 'ethanal < methanal < butan-2-one < propanone'],
  sol: 'More and larger alkyl groups increase steric hindrance and electron release (+I) to the carbonyl carbon, reducing reactivity; methanal, with two H, is most reactive — option (@K).',
  d: 3, c: 'application', t: [3],
}));
add('tollens-mcq', mcq({
  stem: 'Which compound gives a silver mirror with Tollens’ reagent?',
  right: 'Benzaldehyde',
  wrong: ['Propanone', 'Acetophenone', 'Diethyl ether'],
  sol: 'Aldehydes, aromatic ones included, reduce Tollens’ reagent to silver; ketones and ethers do not — option (@K).',
  d: 1, c: 'understanding', t: [3],
}));
add('cannizzaro-mcq', mcq({
  stem: 'Which aldehyde undergoes the Cannizzaro reaction with concentrated NaOH?',
  right: '2,2-Dimethylpropanal',
  wrong: ['Ethanal', 'Propanal', 'Butanal'],
  sol: '(CH₃)₃CCHO has no α-hydrogen, so it cannot form an enolate for aldol and undergoes Cannizzaro instead — option (@K). The others have α-H and give aldol reactions.',
  d: 3, c: 'understanding', t: [3],
}));
add('cyanohydrin-mcq', mcq({
  stem: 'Cyclohexanone is treated with HCN and a trace of base. The product is then heated with dilute HCl until hydrolysis is complete. The final organic product is:',
  right: '1-hydroxycyclohexane-1-carboxylic acid',
  wrong: ['1-hydroxycyclohexane-1-carbonitrile', 'cyclohexanecarboxylic acid', '2-hydroxycyclohexane-1-carboxylic acid'],
  sol: r`$\ce{C6H10O + HCN -> C6H10(OH)CN}$ gives the cyanohydrin; acid hydrolysis then converts –CN into –COOH while the –OH stays on the same carbon: 1-hydroxycyclohexane-1-carboxylic acid — option (@K). (@1) is only the intermediate from step one; (@2) would need the –OH to be lost; (@3) puts the –OH on the wrong carbon.`,
  d: 3, c: 'application', t: [3],
}));
add('clemmensen-mcq', mcq({
  stem: 'Propanone is treated with ethylmagnesium bromide in dry ether and the mixture is hydrolysed with dilute acid. The product is then warmed with acidified potassium dichromate. The final organic product is:',
  right: '2-methylbutan-2-ol, which is not oxidised',
  wrong: ['pentan-2-one', 'butan-2-one', '2-methylbutanoic acid'],
  sol: r`The Grignard reagent adds to the C=O of a ketone and hydrolysis gives a tertiary alcohol, $\ce{(CH3)2C(OH)CH2CH3}$ (2-methylbutan-2-ol). Its carbinol carbon carries no hydrogen, so the oxidant leaves it unchanged — option (@K). (@1) and (@2) assume an oxidisable secondary alcohol; (@3) assumes a primary alcohol.`,
  d: 3, c: 'application', t: [3],
}));
add('iodoform-mcq', mcq({
  stem: 'How many of these seven compounds give a yellow precipitate when warmed with iodine and sodium hydroxide: ethanol, propan-1-ol, propan-2-ol, butan-2-one, pentan-3-one, acetophenone, benzaldehyde?',
  right: 'Four',
  wrong: ['Two', 'Three', 'Five'],
  sol: 'The iodoform test needs CH₃CO– or CH₃CH(OH)–. Ethanol, propan-2-ol, butan-2-one and acetophenone have one of these: four — option (@K). Propan-1-ol, pentan-3-one and benzaldehyde have neither. (@1) counts only the two ketones; (@2) misses ethanol, the only primary alcohol that responds; (@3) wrongly adds pentan-3-one.',
  d: 3, c: 'application', t: [3],
}));
add('aldol-mcq', mcq({
  stem: 'Ethanal is warmed with dilute NaOH and the product is then heated. The final product is:',
  right: 'but-2-enal',
  wrong: ['3-hydroxybutanal', 'ethanol and sodium ethanoate', 'butanal'],
  sol: 'Aldol condensation gives 3-hydroxybutanal (@1), which loses water on heating to give CH₃CH=CHCHO, but-2-enal — option (@K).',
  d: 3, c: 'application', t: [3],
}));
add('dnp-mcq', mcq({
  stem: 'An orange precipitate forms when a liquid is added to 2,4-dinitrophenylhydrazine (Brady’s reagent). This shows that the liquid contains:',
  right: 'an aldehyde or ketone carbonyl group',
  wrong: ['a carboxylic acid group', 'an alcohol –OH group', 'a carbon–carbon double bond'],
  sol: 'Aldehydes and ketones condense with 2,4-DNP to give coloured 2,4-dinitrophenylhydrazones — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('fehling-ar', ar({
  a: 'Benzaldehyde does not give Fehling’s test.',
  r: 'Benzaldehyde is an aldehyde and gives a silver mirror with Tollens’ reagent.',
  key: 'b',
  sol: 'Both are true. But R does not explain A: Fehling’s solution is a weaker oxidant than Tollens’ reagent and does not oxidise aromatic aldehydes — option (b).',
  d: 3, c: 'understanding', t: [3],
}));
add('aldehyde-ar', ar({
  a: 'Aldehydes are more reactive than ketones towards nucleophilic addition.',
  r: 'Ketones have two alkyl groups that hinder attack and release electrons to the carbonyl carbon.',
  key: 'a',
  sol: 'Both are true, and the steric and +I effects of two alkyl groups explain the lower reactivity of ketones — option (a).',
  d: 2, c: 'understanding', t: [3],
}));
add('cannizzaro-ar', ar({
  a: 'Methanal undergoes aldol condensation with dilute NaOH.',
  r: 'Methanal has no α-hydrogen atom.',
  key: 'd',
  sol: 'A is false: with no α-hydrogen, methanal cannot form the enolate needed for aldol; with concentrated alkali it gives the Cannizzaro reaction. R is true — option (d).',
  d: 2, c: 'understanding', t: [3],
}));
add('ketone-oxid-ar', ar({
  a: 'Ketones are not oxidised by Tollens’ reagent.',
  r: 'Ketones are oxidised only by strong oxidising agents, with cleavage of a carbon–carbon bond.',
  key: 'a',
  sol: 'Both are true; because ketones need C–C bond cleavage to be oxidised, a mild oxidant like Tollens’ reagent cannot do it — option (a).',
  d: 3, c: 'understanding', t: [3],
}));
add('tollens-num', num({
  marks: 2,
  stem: r`What mass of silver, in grams, is deposited when $0.44\ \text{g}$ of ethanal ($M = 44$) reacts completely with Tollens’ reagent? (Ag = 108; 2 mol Ag per mol aldehyde)`,
  value: 2.16, tol: 0.01, unit: 'g',
  sol: r`Moles of ethanal $= \dfrac{0.44}{44} = 0.01$; silver $= 2 \times 0.01 = 0.02$ mol; mass $= 0.02 \times 108 = 2.16$, so $2.16\ \text{g}$.`,
  scheme: [['0.02 mol Ag', 1], ['2.16 g', 1]],
  d: 2, c: 'application', t: [3],
}), () => near((0.44 / 44) * 2 * 108, 2.16) || 'Ag');
add('iodoform-num', num({
  stem: r`What mass of iodoform ($\ce{CHI3}$, $M = 394$), in grams, forms from $0.58\ \text{g}$ of propanone ($M = 58$)?`,
  value: 3.94, tol: 0.02, unit: 'g',
  sol: r`$\ce{CH3COCH3 + 3I2 + 4NaOH -> CHI3 + CH3COONa + 3NaI + 3H2O}$: 1 : 1. Moles $= \dfrac{0.58}{58} = 0.01$; mass $= 0.01 \times 394 = 3.94$, so $3.94\ \text{g}$.`,
  scheme: [['1 : 1 ratio and 3.94 g', 1]],
  d: 2, c: 'application', t: [3],
}), () => near((0.58 / 58) * 394, 3.94) || 'CHI3');
add('test-short', short({
  marks: 2,
  stem: 'Three unlabelled bottles contain pentan-2-one, pentan-3-one and pentanal. Using as few tests as possible, describe how you would identify each liquid, stating the observations.',
  model: 'Add iodine and NaOH to a sample of each: only pentan-2-one, which has a CH₃CO– group, gives a yellow precipitate of iodoform. Warm the other two with Tollens’ reagent: pentanal, an aldehyde, gives a silver mirror; pentan-3-one, a ketone, gives none.',
  sol: 'Iodoform test isolates the methyl ketone; Tollens’ test then separates the aldehyde from the other ketone.',
  scheme: [['Iodoform test picks out pentan-2-one (yellow precipitate)', 1], ['Tollens’ (or Fehling’s) test separates pentanal from pentan-3-one', 1]],
  d: 3, c: 'application', t: [3],
}));
add('cannizzaro-short', short({
  marks: 2,
  stem: 'What is the Cannizzaro reaction? Write the equation for methanal.',
  model: r`Aldehydes without an α-hydrogen, heated with concentrated alkali, undergo disproportionation: one molecule is oxidised to the carboxylate salt and another reduced to the alcohol. $\ce{2HCHO + NaOH -> HCOONa + CH3OH}$.`,
  sol: 'Definition and equation.',
  scheme: [['Definition (no α-H, conc. alkali, disproportionation)', 1], ['Balanced equation', 1]],
  d: 2, c: 'recall', t: [3],
}));
add('aldol-short3', short({
  marks: 3,
  stem: 'Propanal is added slowly to a warm mixture of benzaldehyde and dilute NaOH, and the product is then heated. Give the structure and IUPAC name of the main final product, and explain why benzaldehyde cannot condense with itself and why slow addition of propanal keeps its self-condensation small.',
  model: r`Only propanal has α-hydrogens, so it alone gives the enolate $\ce{CH3CH^-CHO}$, which attacks the carbonyl carbon of benzaldehyde. Protonation gives $\ce{C6H5CH(OH)CH(CH3)CHO}$, which loses water on heating to give $\ce{C6H5CH=C(CH3)CHO}$, 2-methyl-3-phenylprop-2-enal. Benzaldehyde has no α-hydrogen, so it forms no enolate and cannot condense with itself. Adding propanal slowly keeps its concentration low, so each enolate meets plentiful benzaldehyde rather than another propanal.`,
  sol: 'Crossed aldol (Claisen–Schmidt): enolate only from propanal; dehydration gives the conjugated product.',
  scheme: [['Enolate only from propanal; benzaldehyde has no α-H', 1], ['Product C₆H₅CH=C(CH₃)CHO named 2-methyl-3-phenylprop-2-enal', 1], ['Slow addition keeps propanal concentration low, so the enolate reacts with benzaldehyde', 1]],
  wl: [60, 110],
  d: 3, c: 'application', t: [3],
}));

// ---------------------------------------------------------------- t04 carboxylic acids: preparation
add('benzoic-mcq', mcq({
  stem: 'Which compound gives benzene-1,4-dicarboxylic acid on heating with alkaline KMnO₄ followed by acidification?',
  right: '1-Ethyl-4-methylbenzene',
  wrong: ['1-tert-Butyl-4-methylbenzene', '1-Ethyl-3-methylbenzene', '1,4-Di-tert-butylbenzene'],
  sol: 'Every alkyl side chain that has a benzylic hydrogen is oxidised to –COOH, whatever its length, so the para ethyl and methyl groups both become –COOH — option (@K). (@1) keeps its tert-butyl group (no benzylic H) and gives 4-tert-butylbenzoic acid; (@2) has the groups meta, giving the 1,3-diacid; (@3) is not oxidised at all.',
  d: 3, c: 'application', t: [4],
}));
add('grignard-acid-mcq', mcq({
  stem: '2-Bromopropane is converted into its Grignard reagent, which is poured onto dry ice and acidified. The acid formed is converted into its acid chloride with thionyl chloride, and this is hydrogenated over palladium poisoned with BaSO₄. The final product is:',
  right: '2-methylpropanal',
  wrong: ['butanal', 'propanal', '2-methylpropan-1-ol'],
  sol: r`$\ce{(CH3)2CHMgBr}$ adds CO₂ to give 2-methylpropanoic acid, one carbon more than the halide; SOCl₂ gives $\ce{(CH3)2CHCOCl}$; Rosenmund reduction stops at $\ce{(CH3)2CHCHO}$ — option (@K). (@1) would need a straight chain; (@2) forgets the carbon added by CO₂; (@3) is over-reduction, which the poisoned catalyst prevents.`,
  d: 3, c: 'application', t: [4],
}));
add('nitrile-tf', tf({
  stem: 'Hydrolysis of ethanenitrile with dilute acid gives ethanoic acid.',
  key: 't',
  sol: r`True. $\ce{CH3CN + 2H2O + HCl -> CH3COOH + NH4Cl}$.`,
  d: 1, c: 'recall', t: [4],
}));
add('acid-prep-short3', short({
  marks: 3, wl: null,
  stem: 'Show how propanoic acid can be prepared from (a) propan-1-ol, (b) bromoethane by two different routes.',
  model: '(a) Oxidise with alkaline KMnO₄ (or acidified K₂Cr₂O₇), then acidify.\n\n(b) Route 1: KCN gives propanenitrile, which is hydrolysed by H₃O⁺. Route 2: Mg in dry ether gives ethylmagnesium bromide, which reacts with CO₂ (dry ice); acidification gives propanoic acid.',
  sol: 'Oxidation; nitrile and Grignard routes (each adds a carbon).',
  scheme: [['(a)', 1], ['(b) nitrile route', 1], ['(b) Grignard route', 1]],
  d: 3, c: 'application', t: [4],
}));

// ---------------------------------------------------------------- t05 acidity, reactions, uses
add('acid-strength-mcq', mcq({
  stem: 'Which is the strongest acid?',
  right: 'Trichloroethanoic acid',
  wrong: ['Chloroethanoic acid', 'Ethanoic acid', 'Propanoic acid'],
  sol: 'Three −I chlorine atoms stabilise the carboxylate most (pKa 0.65) — option (@K).',
  d: 1, c: 'understanding', t: [5],
}));
add('acid-order-mcq', mcq({
  stem: 'Which order of acid strength is correct?',
  right: 'HCOOH > CH₃COOH > CH₃CH₂COOH',
  wrong: ['CH₃CH₂COOH > CH₃COOH > HCOOH', 'CH₃COOH > HCOOH > CH₃CH₂COOH', 'All three are equally acidic'],
  sol: 'Alkyl groups release electrons (+I) and destabilise the carboxylate: HCOOH (3.75) > CH₃COOH (4.76) > CH₃CH₂COOH (4.88) — option (@K).',
  d: 2, c: 'understanding', t: [5],
}));
add('sodalime-mcq', mcq({
  stem: 'Sodium propanoate is heated with soda lime. The gas evolved is:',
  right: 'ethane',
  wrong: ['propane', 'methane', 'carbon dioxide'],
  sol: r`Decarboxylation removes one carbon: $\ce{CH3CH2COONa + NaOH -> CH3CH3 + Na2CO3}$ — option (@K).`,
  d: 2, c: 'understanding', t: [5],
}));
add('nahco3-mcq', mcq({
  stem: 'A solution of an organic compound gives brisk effervescence with aqueous sodium hydrogencarbonate. The compound is most likely:',
  right: 'benzoic acid',
  wrong: ['phenol', 'ethanol', 'benzaldehyde'],
  sol: r`Carboxylic acids are stronger than carbonic acid: $\ce{C6H5COOH + NaHCO3 -> C6H5COONa + H2O + CO2}$ — option (@K). Phenol (@1) is too weak.`,
  d: 1, c: 'recall', t: [5],
}));
add('hvz-mcq', mcq({
  stem: 'Propanoic acid is treated with bromine and red phosphorus. The product is warmed with excess aqueous NaOH and the solution is then acidified. The final organic product is:',
  right: '2-hydroxypropanoic acid',
  wrong: ['propenoic acid', '3-hydroxypropanoic acid', '2-bromopropanoic acid'],
  sol: r`The Hell–Volhard–Zelinsky reaction gives $\ce{CH3CHBrCOOH}$. Warm aqueous alkali replaces Br by OH (substitution) and neutralises the –COOH; acidifying then frees 2-hydroxypropanoic acid — option (@K). (@1) needs alcoholic KOH, which eliminates HBr; (@2) puts the –OH on the wrong carbon, since Br is on C2; (@3) is only the intermediate.`,
  d: 3, c: 'application', t: [5],
}));
add('ester-mcq', mcq({
  stem: 'Ethanoic acid is warmed with ethanol and a few drops of concentrated H₂SO₄. A fruity smell develops because:',
  right: 'ethyl ethanoate, an ester, forms',
  wrong: ['ethanal forms by oxidation', 'diethyl ether forms', 'ethene is given off'],
  sol: r`Esterification: $\ce{CH3COOH + C2H5OH <=>[H+] CH3COOC2H5 + H2O}$ — option (@K).`,
  d: 1, c: 'understanding', t: [5],
}));
add('meta-mcq', mcq({
  stem: 'Benzoic acid is nitrated with concentrated nitric and sulfuric acids. The main product is:',
  right: '3-nitrobenzoic acid',
  wrong: ['2-nitrobenzoic acid', '4-nitrobenzoic acid', 'nitrobenzene'],
  sol: 'The –COOH group withdraws electrons and directs incoming electrophiles to the meta position — option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('acid-ar', ar({
  a: 'Chloroethanoic acid is a stronger acid than ethanoic acid.',
  r: 'The chlorine atom releases electrons by its +I effect.',
  key: 'c',
  sol: 'A is true. R is false: chlorine withdraws electrons (−I), which stabilises the carboxylate ion — option (c).',
  d: 2, c: 'understanding', t: [5],
}));
add('bp-ar', ar({
  a: 'Ethanoic acid has a higher boiling point than propan-1-ol.',
  r: 'Carboxylic acids exist as hydrogen-bonded dimers.',
  key: 'a',
  sol: 'Both are true; dimerisation through two hydrogen bonds effectively doubles the molecular size, raising the boiling point — option (a).',
  d: 2, c: 'understanding', t: [5],
}));
add('acyl-fill', fill({
  stem: 'Carboxylic acids react with thionyl chloride to give acid ___, with SO₂ and HCl as gaseous by-products.',
  acc: [['chlorides', 'chloride']],
  sol: r`$\ce{RCOOH + SOCl2 -> RCOCl + SO2 + HCl}$: acid **chlorides**.`,
  d: 1, c: 'recall', t: [5],
}));
add('uses-match', match({
  stem: 'Match each compound with its use.',
  pairs: [
    ['Hexanedioic acid', 'Manufacture of nylon-6,6'],
    ['Sodium benzoate', 'Food preservative'],
    ['Methanoic acid', 'Rubber and leather industries'],
    ['Ethanoic acid (dilute)', 'Vinegar'],
  ],
  order: [3, 1, 2, 0],
  sol: 'Adipic acid makes nylon-6,6; sodium benzoate preserves food; formic acid is used in rubber and leather processing; vinegar is dilute acetic acid.',
  d: 1, c: 'recall', t: [5],
}));
add('co2-num', num({
  stem: r`What volume of $\ce{CO2}$, in litres at STP (22.4 L mol⁻¹), is released when $6.0\ \text{g}$ of ethanoic acid ($M = 60$) reacts completely with excess $\ce{NaHCO3}$?`,
  value: 2.24, tol: 0.01, unit: 'L',
  sol: r`1 : 1 ratio. Moles $= \dfrac{6.0}{60} = 0.1$; volume $= 0.1 \times 22.4 = 2.24$, so $2.24\ \text{L}$.`,
  scheme: [['0.1 mol and 2.24 L', 1]],
  d: 2, c: 'application', t: [5],
}), () => near((6 / 60) * 22.4, 2.24) || 'CO2');
add('ka-num', num({
  marks: 2,
  stem: r`The pKa of ethanoic acid is 4.76. Calculate its $K_\text{a}$ in units of $10^{-5}$.`,
  value: 1.74, tol: 0.02, unit: '× 10⁻⁵',
  sol: r`$K_\text{a} = 10^{-4.76} = 0.0000174$; in units of $10^{-5}$: $0.0000174 \times 100000 = 1.74$.`,
  scheme: [['Ka = 10^(−pKa)', 1], ['1.74 × 10⁻⁵', 1]],
  d: 2, c: 'understanding', t: [5],
}), () => near(Math.pow(10, -4.76) * 1e5, 1.74, 0.003) || 'Ka');
add('acidity-short', short({
  marks: 2,
  stem: 'Explain why carboxylic acids are stronger acids than phenols although both have resonance-stabilised anions.',
  model: 'In the carboxylate ion the negative charge is shared equally between two electronegative oxygen atoms in two equivalent resonance structures. In phenoxide, the charge is spread onto less electronegative ring carbons, and the structures are not equivalent. So carboxylate is more stable, and carboxylic acids are stronger.',
  sol: 'Equivalent structures with charge on two O vs charge on carbons.',
  scheme: [['Carboxylate: charge on two O, equivalent structures', 1], ['Phenoxide: charge on C, non-equivalent; less stable', 1]],
  d: 3, c: 'understanding', t: [5],
}));
add('decarb-short', short({
  marks: 2, wl: null,
  stem: r`A sodium salt of a monocarboxylic acid, $9.6\ \text{g}$, is heated with excess soda lime and gives $2.24\ \text{L}$ of a hydrocarbon gas at STP (22.4 L mol⁻¹). (a) Find the molar mass of the salt. (b) Identify the salt and the gas and write the equation.`,
  model: r`Moles of gas $= \dfrac{2.24}{22.4} = 0.100$. With excess soda lime the reaction is 1 : 1, so the salt is $0.100$ mol and $M = \dfrac{9.6}{0.100} = 96\ \text{g mol}^{-1}$. For RCOONa, $M(\text{R}) = 96 - 67 = 29$, which is $\ce{C2H5}$. The salt is sodium propanoate and the gas is ethane: $\ce{CH3CH2COONa + NaOH ->[CaO][\Delta] CH3CH3 + Na2CO3}$.`,
  sol: 'Moles of gas = moles of salt; M = 96; R = C₂H₅.',
  scheme: [['0.100 mol gives M = 96', 1], ['Sodium propanoate and ethane with balanced equation', 1]],
  d: 3, c: 'application', t: [5],
}), () => near(9.6 / (2.24 / 22.4), 96) && near(96 - 67, 29) || 'decarb');
add('bp-short', short({
  marks: 2,
  stem: 'Propanoic acid (M = 74) boils at 414 K, while butan-1-ol (M = 74) boils at 391 K. Explain.',
  model: 'Both form hydrogen bonds, but each pair of propanoic acid molecules is held by two hydrogen bonds in a dimer, which behaves like a much larger molecule. The alcohol forms single hydrogen bonds between molecules. More extensive hydrogen bonding in the acid gives it the higher boiling point.',
  sol: 'Dimers with two hydrogen bonds.',
  scheme: [['Acid forms dimers via two hydrogen bonds', 1], ['Stronger intermolecular attraction than in the alcohol', 1]],
  d: 3, c: 'application', t: [5],
}));
add('acidity-short3', short({
  marks: 3,
  stem: 'Arrange in increasing acidity and explain: CH₃COOH, FCH₂COOH, ClCH₂COOH, CH₃CH₂COOH, Cl₂CHCOOH.',
  model: 'CH₃CH₂COOH < CH₃COOH < ClCH₂COOH < FCH₂COOH < Cl₂CHCOOH. Alkyl groups release electrons (+I) and destabilise the carboxylate, so propanoic acid is weakest. Halogens withdraw electrons (−I) and stabilise it; fluorine is more electronegative than chlorine, so fluoroethanoic acid is stronger than chloroethanoic acid. Two chlorine atoms withdraw more strongly than one fluorine, so dichloroethanoic acid is strongest.',
  sol: 'Order from +I to −I effects, number and strength of groups.',
  scheme: [['Correct order', 1], ['+I of alkyl groups', 1], ['−I of halogens (F > Cl; two Cl > one)', 1]],
  d: 3, c: 'analysis', t: [5],
}));
add('conversions-short3', short({
  marks: 3, wl: null,
  stem: 'Give reagent sequences, naming the intermediate, for: (a) ethanoic acid → ethanal, and say why LiAlH₄ cannot be used directly; (b) ethanal → propanone; (c) ethanoic acid → hydroxyethanoic acid.',
  model: '(a) SOCl₂ gives ethanoyl chloride; H₂ over Pd–BaSO₄ (Rosenmund) then stops at ethanal. LiAlH₄ would carry the reduction through to ethanol, so the aldehyde could not be isolated.\n\n(b) CH₃MgBr in dry ether, then H₃O⁺, gives propan-2-ol; oxidise it with acidified K₂Cr₂O₇ (or Cu at 573 K) to propanone.\n\n(c) Cl₂ with red phosphorus (HVZ) gives chloroethanoic acid; warm with aqueous KOH, then acidify, to give HOCH₂COOH.',
  sol: 'Acid chloride then Rosenmund; Grignard then oxidation; HVZ then hydrolysis.',
  scheme: [['(a) two steps and the reason', 1], ['(b) Grignard addition then oxidation', 1], ['(c) HVZ then hydrolysis', 1]],
  d: 3, c: 'application', t: [5],
}));

// ---------------------------------------------------------------- more practice
add('identify-mcq', mcq({
  stem: 'Compound A (C₄H₈O) gives a silver mirror with Tollens’ reagent but does not give the iodoform test. A could be:',
  right: 'butanal or 2-methylpropanal',
  wrong: ['butan-2-one', 'but-3-en-2-ol', 'ethoxyethene'],
  sol: 'A positive Tollens’ test shows an aldehyde; C₄H₈O aldehydes are butanal and 2-methylpropanal, neither of which has CH₃CO– — option (@K). Butan-2-one (@1) is a ketone and gives iodoform.',
  d: 4, c: 'analysis', t: [3],
}));
add('pka-compare-mcq', mcq({
  stem: 'Which of these acids is the strongest?',
  right: '4-Nitrobenzoic acid',
  wrong: ['Benzoic acid', '4-Methylbenzoic acid', '4-Methoxybenzoic acid'],
  sol: 'The para nitro group withdraws electrons (−R, −I) and stabilises the benzoate ion; methyl and methoxy groups release electrons and weaken the acid — option (@K).',
  d: 3, c: 'application', t: [5],
}));
add('crossed-aldol-mcq', mcq({
  stem: 'Benzaldehyde and ethanal are warmed with dilute NaOH and the product is heated. The main product, which smells of cinnamon, is:',
  right: '3-phenylprop-2-enal',
  wrong: ['benzyl alcohol and sodium benzoate', '3-hydroxybutanal', 'benzoic acid'],
  sol: 'Ethanal forms the enolate (benzaldehyde has no α-H), which adds to benzaldehyde; dehydration gives C₆H₅CH=CHCHO (cinnamaldehyde), a crossed aldol (Claisen–Schmidt) product — option (@K).',
  d: 4, c: 'application', t: [3],
}));
add('soda-num', num({
  stem: r`What mass of methane, in grams, is obtained by heating $8.2\ \text{g}$ of sodium ethanoate ($M = 82$) with excess soda lime? ($\ce{CH4}$, $M = 16$)`,
  value: 1.6, tol: 0.02, unit: 'g',
  sol: r`$\ce{CH3COONa + NaOH -> CH4 + Na2CO3}$ is 1 : 1. Moles $= \dfrac{8.2}{82} = 0.1$; mass $= 0.1 \times 16 = 1.6$, so $1.6\ \text{g}$.`,
  scheme: [['1 : 1 ratio and 1.6 g', 1]],
  d: 2, c: 'application', t: [5],
}), () => near((8.2 / 82) * 16, 1.6) || 'CH4');

// ---------------------------------------------------------------- long answers
add('carbonyl-long', long({
  stem: r`(a) Arrange in increasing reactivity towards HCN, giving reasons: ethanal, propanal, pentan-3-one, 2,2,4,4-tetramethylpentan-3-one.

(b) Compound P, $\ce{C5H10O}$, has an unbranched carbon chain. It gives an orange precipitate with 2,4-DNP, no silver mirror with Tollens’ reagent and a yellow precipitate with iodine and NaOH. Deduce the structure and name of P.

(c) A $1.44\ \text{g}$ sample of an unbranched aliphatic aldehyde gives $4.32\ \text{g}$ of silver with excess Tollens’ reagent (2 mol Ag per mole of aldehyde; Ag = 108). Find its molar mass and identify it.`,
  model: r`(a) 2,2,4,4-Tetramethylpentan-3-one < pentan-3-one < propanal < ethanal. A carbonyl carbon is attacked more easily when it is less crowded and less shielded by electron-releasing alkyl groups (+I). Ethanal has one methyl group and propanal a slightly larger, more electron-releasing ethyl group. The two ketones carry two alkyl groups each, and the two tert-butyl groups of the last ketone block the approach of CN⁻ almost completely.

(b) The 2,4-DNP result shows a carbonyl compound; no mirror shows a ketone; the iodoform result shows CH₃CO–. With an unbranched chain of five carbons, P is $\ce{CH3COCH2CH2CH3}$, pentan-2-one (pentan-3-one has no CH₃CO– group).

(c) Moles of Ag $= \dfrac{4.32}{108} = 0.040$, so moles of aldehyde $= 0.020$ and $M = \dfrac{1.44}{0.020} = 72\ \text{g mol}^{-1}$. A saturated aldehyde has the formula $\text{C}_n\text{H}_{2n}\text{O}$ with $M = 14n + 16 = 72$, so $n = 4$: the unbranched aldehyde is butanal, $\ce{CH3CH2CH2CHO}$.`,
  sol: 'Reactivity ranking from steric and +I effects; structure deduced from three tests; molar mass from silver yield.',
  scheme: [['(a) Correct order', 1], ['(a) Reasons: crowding and +I effect', 1], ['(b) Deduction from the three results; pentan-2-one', 1.5], ['(c) 0.040 mol Ag, 0.020 mol aldehyde, M = 72', 1], ['(c) Butanal', 0.5]],
  d: 4, c: 'application', t: [3],
}), () => (near(4.32 / 108, 0.04) && near(1.44 / (4.32 / 108 / 2), 72) && near(14 * 4 + 16, 72)) || 'carbonyl-long');
add('acid-long', long({
  stem: r`(a) The pKa values of four acids are: butanoic acid 4.82, 4-chlorobutanoic acid 4.52, 3-chlorobutanoic acid 4.06 and 2-chlorobutanoic acid 2.86. Explain the trend, and predict, with a reason, whether 2,2-dichlorobutanoic acid has a pKa above or below 2.86.

(b) A monocarboxylic acid X, $0.74\ \text{g}$, needs $10.0\ \text{mL}$ of $1.00\ \text{M}$ NaOH for complete neutralisation. Find the molar mass of X and identify it.

(c) Write the equation for X with sodium hydrogencarbonate and find the volume of CO₂ released at STP (22.4 L mol⁻¹) from $0.74\ \text{g}$ of X.`,
  model: r`(a) The chlorine atom withdraws electrons (−I effect) and stabilises the carboxylate ion, but the effect weakens as the number of bonds between Cl and the carboxyl group increases. So the acid is strongest when Cl is on C2 and weakens as Cl moves to C3 and C4, approaching butanoic acid, whose ethyl group releases electrons (+I) and gives the weakest acid. A second chlorine on C2 withdraws still more charge, so 2,2-dichlorobutanoic acid has a pKa below 2.86.

(b) Moles of NaOH $= 1.00 \times 0.0100 = 0.0100$, which equals the moles of the monocarboxylic acid, so $M = \dfrac{0.74}{0.0100} = 74\ \text{g mol}^{-1}$. For a saturated monocarboxylic acid, $\text{C}_n\text{H}_{2n}\text{O}_2$ with $M = 14n + 32 = 74$ gives $n = 3$: X is propanoic acid, $\ce{CH3CH2COOH}$.

(c) $\ce{CH3CH2COOH + NaHCO3 -> CH3CH2COONa + H2O + CO2}$. The ratio is 1 : 1, so $0.0100$ mol of CO₂ forms, and $V = 0.0100 \times 22.4 = 0.224\ \text{L}$ (224 mL).`,
  sol: 'Distance and number of −I groups; neutralisation gives M = 74; propanoic acid; 1 : 1 with NaHCO₃.',
  scheme: [['(a) −I effect falls with distance; alkyl +I in butanoic acid', 1], ['(a) Two Cl on C2 give pKa below 2.86', 0.5], ['(b) 0.0100 mol and M = 74', 1], ['(b) 14n + 32 = 74 gives propanoic acid', 1.5], ['(c) Balanced equation and 0.224 L', 1]],
  d: 4, c: 'application', t: [5],
}), () => (near(1.0 * 0.01, 0.01) && near(0.74 / 0.01, 74) && near(14 * 3 + 32, 74) && near(0.01 * 22.4, 0.224)) || 'acid-long');
add('prep-long', long({
  stem: '(a) Give reagent sequences, naming the intermediates, for (i) toluene → 1-phenylethanol and (ii) toluene → 3-nitrobenzoic acid. Explain why the steps in (ii) must be done in that order.\n\n(b) Show how benzene can be converted into benzoic acid in two steps without using an oxidising agent such as KMnO₄, and name the by-product that is lost.',
  model: r`(a)(i) Etard reaction: $\ce{CrO2Cl2}$ in CS₂, then hydrolysis with water, converts toluene into benzaldehyde. Benzaldehyde is then treated with $\ce{CH3MgBr}$ in dry ether, followed by hydrolysis with dilute acid: the Grignard reagent adds to C=O, giving $\ce{C6H5CH(OH)CH3}$, 1-phenylethanol.

(ii) First oxidise toluene with alkaline KMnO₄ (then acidify) to benzoic acid, and then nitrate with conc. HNO₃ and conc. H₂SO₄. The –COOH group is meta-directing and gives 3-nitrobenzoic acid. If toluene were nitrated first, the methyl group, which is ortho/para-directing, would give 2- and 4-nitrotoluene, and oxidation would then give the 2- and 4-nitrobenzoic acids.

(b) Friedel–Crafts acylation with $\ce{CH3COCl}$ and anhydrous AlCl₃ gives acetophenone. Warming it with iodine and NaOH (haloform reaction) gives sodium benzoate, and acidification gives benzoic acid. The by-product lost is iodoform, $\ce{CHI3}$.`,
  sol: 'Etard then Grignard; oxidation before nitration because of directing effects; acylation then haloform.',
  scheme: [['(a)(i) Etard giving benzaldehyde', 1], ['(a)(i) CH₃MgBr then hydrolysis giving 1-phenylethanol', 1], ['(a)(ii) oxidation then nitration', 1], ['(a)(ii) order explained by directing effects', 1], ['(b) acylation, then I₂/NaOH and acidification; CHI₃ lost', 1]],
  d: 3, c: 'application', t: [2, 4],
}));
add('mechanism-long', long({
  stem: '(a) What are α-hydrogens, and why are they acidic?\n\n(b) Explain aldol condensation with propanal, giving the aldol and the final unsaturated product.\n\n(c) Explain the Cannizzaro reaction of benzaldehyde, and why benzaldehyde cannot undergo aldol condensation.',
  model: 'α-Hydrogens are on the carbon next to the carbonyl group. They are acidic because the carbanion formed on removing one (the enolate) is stabilised by resonance, with the negative charge shared by carbon and the carbonyl oxygen. With dilute NaOH, propanal forms an enolate, which adds to the carbonyl carbon of another propanal molecule; protonation gives 3-hydroxy-2-methylpentanal (the aldol). On heating, it loses water to give 2-methylpent-2-enal. Benzaldehyde has no α-hydrogen, so it cannot form an enolate and cannot give aldol. With concentrated NaOH, one molecule transfers a hydride to another: one is oxidised to sodium benzoate and the other reduced to phenylmethanol (Cannizzaro reaction).',
  sol: 'Enolate resonance; aldol product structure; disproportionation.',
  scheme: [['(a) Definition and resonance-stabilised enolate', 1], ['(b) Aldol of propanal named', 1.5], ['(b) Dehydration product', 0.5], ['(c) Cannizzaro products and reason', 2]],
  d: 4, c: 'analysis', t: [3],
}));
add('synthesis-long', long({
  wl: null,
  stem: 'Give reagents and conditions for the following conversions: (a) benzene → acetophenone; (b) acetophenone → ethylbenzene; (c) toluene → benzoic acid; (d) ethanoic acid → methane; (e) propanone → propan-2-ol.',
  model: '(a) Ethanoyl chloride, anhydrous AlCl₃ (Friedel–Crafts acylation).\n\n(b) Zn–Hg and conc. HCl (Clemmensen), or NH₂NH₂ then KOH/ethylene glycol, heat (Wolff–Kishner).\n\n(c) Alkaline KMnO₄, heat, then dilute H₂SO₄.\n\n(d) Neutralise with NaOH to sodium ethanoate, then heat with soda lime (NaOH + CaO).\n\n(e) NaBH₄ (or LiAlH₄, or H₂/Ni).',
  sol: 'One correct route per conversion.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1], ['(d)', 1], ['(e)', 1]],
  d: 3, c: 'application', t: [2, 3, 4, 5],
}));

// ---------------------------------------------------------------- case-based
add('unknown-case', mk.case({
  passage: 'A student tests three liquids, X, Y and Z, each with three carbon atoms in the molecule:\n\n| Test | X | Y | Z |\n|---|---|---|---|\n| 2,4-DNP | Orange ppt | Orange ppt | No change |\n| Tollens’ reagent | Silver mirror | No change | No change |\n| NaHCO₃ solution | No change | No change | Effervescence |\n| I₂ + NaOH | No change | Yellow ppt | No change |',
  d: 3, c: 'analysis',
  children: [
    part('a', mcq({
      stem: 'Which liquid is propanone?',
      right: 'Y',
      wrong: ['X', 'Z', 'None of them'],
      sol: 'Y is a carbonyl compound (2,4-DNP) that is not an aldehyde (Tollens’ negative) and has CH₃CO– (iodoform positive) — option (@K).',
      d: 2, c: 'application', t: [3],
    })),
    part('b', short({
      marks: 1,
      stem: 'Identify X and Z.',
      model: 'X is propanal (an aldehyde without CH₃CO–); Z is propanoic acid (releases CO₂ from NaHCO₃).',
      sol: 'Aldehyde test and acid test.',
      scheme: [['X propanal and Z propanoic acid', 1]],
      d: 2, c: 'application', t: [3, 5],
    })),
    part('c', short({
      marks: 2,
      stem: 'Explain why X gives a silver mirror but Y does not.',
      model: 'X, an aldehyde, has a hydrogen on the carbonyl carbon and is easily oxidised to a carboxylate by the mild oxidant Tollens’ reagent, which is reduced to silver. Y, a ketone, can only be oxidised by breaking a C–C bond, which Tollens’ reagent cannot do.',
      sol: 'Aldehyde H easily oxidised; ketone needs C–C cleavage.',
      scheme: [['Aldehyde oxidised, Ag⁺ reduced to Ag', 1], ['Ketone not oxidised by mild oxidant', 1]],
      d: 3, c: 'analysis', t: [3],
    }), [
      short({
        marks: 2,
        stem: 'Why does Z, but not X, react with NaHCO₃? Write the equation.',
        model: r`Z, propanoic acid, is a stronger acid than carbonic acid because its carboxylate ion is resonance-stabilised, so it releases CO₂: $\ce{CH3CH2COOH + NaHCO3 -> CH3CH2COONa + H2O + CO2}$. Propanal is not acidic.`,
        sol: 'Carboxylic acid stronger than H₂CO₃.',
        scheme: [['Reason (acid strength, resonance)', 1], ['Equation', 1]],
        d: 3, c: 'application', t: [5],
      }),
    ]),
  ],
}));
add('vinegar-case', mk.case({
  passage: r`A food-safety officer checks a sample of vinegar, which should contain about 4–5 g of ethanoic acid per 100 mL. She titrates $10.0\ \text{mL}$ of the vinegar with $0.50\ \text{M}$ NaOH using phenolphthalein; the end point is at $16.0\ \text{mL}$. ($\ce{CH3COOH + NaOH -> CH3COONa + H2O}$; $M(\ce{CH3COOH}) = 60$)`,
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'Ethanoic acid in vinegar is described as a weak acid because:',
      right: 'only a small fraction of its molecules ionise in water',
      wrong: ['its solution is very dilute', 'it does not react with NaOH', 'it has a high pKa of about 10'],
      sol: 'pKa 4.76: it is only partly ionised; dilution (@1) is about concentration, not strength — option (@K).',
      d: 2, c: 'understanding', t: [5],
    })),
    part('b', num({
      stem: r`Calculate the concentration of ethanoic acid in the vinegar in $\text{mol L}^{-1}$.`,
      value: 0.8, tol: 0.005, unit: 'mol L⁻¹',
      sol: r`Moles of NaOH $= 0.50 \times 0.0160 = 0.008$ = moles of acid; concentration $= \dfrac{0.008}{0.0100} = 0.8$, so $0.80\ \text{mol L}^{-1}$.`,
      scheme: [['0.008 mol; 0.80 mol/L', 1]],
      d: 2, c: 'application', t: [5],
    })),
    part('c', short({
      marks: 2, wl: null,
      stem: 'Does the vinegar meet the 4–5 g per 100 mL standard? Show your working.',
      model: r`Mass per litre $= 0.80 \times 60 = 48$ g, i.e. $4.8$ g per 100 mL, so it meets the standard.`,
      sol: 'Convert mol/L to g per 100 mL.',
      scheme: [['48 g/L = 4.8 g per 100 mL', 1], ['Conclusion: within 4–5 g', 1]],
      d: 3, c: 'evaluation', t: [5],
    }), [
      short({
        marks: 2,
        stem: 'When baking soda is sprinkled into vinegar, it fizzes. Explain with an equation.',
        wl: null,
        model: r`Ethanoic acid is a stronger acid than carbonic acid, so it decomposes sodium hydrogencarbonate, releasing carbon dioxide gas: $\ce{CH3COOH + NaHCO3 -> CH3COONa + H2O + CO2}$.`,
        sol: 'Acid + hydrogencarbonate gives CO₂.',
        scheme: [['Reason', 1], ['Equation', 1]],
        d: 2, c: 'understanding', t: [5],
      }),
    ]),
  ],
}), () => (near((0.5 * 0.016) / 0.01, 0.8) && near(0.8 * 60, 48)) || 'vinegar');
add('almond-case', mk.case({
  passage: 'Benzaldehyde gives the flavour of bitter almonds. A bottle left half-open in a laboratory for some weeks develops white crystals around the neck. The crystals dissolve in sodium hydrogencarbonate solution with effervescence. A student also notices that benzaldehyde reduces Tollens’ reagent but not Fehling’s solution.',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'What are the white crystals most likely to be?',
      right: 'Benzoic acid, formed by air oxidation of benzaldehyde',
      wrong: ['Benzyl alcohol, formed by reduction', 'Acetophenone, formed by methylation', 'Phenol, formed by loss of CO'],
      sol: 'Aldehydes are oxidised by air; the product is an acid that liberates CO₂ from NaHCO₃ — option (@K).',
      d: 2, c: 'application', t: [3, 5],
    })),
    part('b', short({
      marks: 1,
      stem: 'Name the products when benzaldehyde is heated with concentrated NaOH.',
      model: 'Sodium benzoate and phenylmethanol (Cannizzaro reaction).',
      sol: 'No α-H: Cannizzaro.',
      scheme: [['Sodium benzoate and phenylmethanol', 1]],
      d: 2, c: 'understanding', t: [3],
    })),
    part('c', short({
      marks: 2,
      stem: 'Suggest how the student could separate benzoic acid from benzaldehyde in the old bottle.',
      model: 'Shake the mixture with aqueous NaHCO₃: benzoic acid dissolves as sodium benzoate, while benzaldehyde stays as a separate organic layer. Separate the layers and acidify the aqueous layer to precipitate pure benzoic acid.',
      sol: 'Acid–base extraction.',
      scheme: [['NaHCO₃ converts the acid to a soluble salt; aldehyde stays organic', 1], ['Acidify to recover benzoic acid', 1]],
      d: 4, c: 'application', t: [5],
    }), [
      short({
        marks: 2,
        stem: 'Explain why benzaldehyde reduces Tollens’ reagent but not Fehling’s solution.',
        model: 'Tollens’ reagent is a stronger oxidising agent and oxidises all aldehydes, including aromatic ones, giving a silver mirror. Fehling’s solution is a weaker oxidant that oxidises only aliphatic aldehydes, so benzaldehyde gives no red precipitate.',
        sol: 'Relative oxidising strength.',
        scheme: [['Tollens’ oxidises all aldehydes', 1], ['Fehling’s only aliphatic aldehydes', 1]],
        d: 2, c: 'understanding', t: [3],
      }),
    ]),
  ],
}));
add('fragrance-case', mk.case({
  passage: r`A perfume company makes ethyl ethanoate, which smells of pear drops, by heating $6.0\ \text{g}$ of ethanoic acid with excess ethanol and a little concentrated sulfuric acid under reflux. After purification, $5.28\ \text{g}$ of ester is obtained. ($\ce{CH3COOH + C2H5OH <=> CH3COOC2H5 + H2O}$; $M$: acid 60, ester 88)`,
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'What is the role of the concentrated sulfuric acid?',
      right: 'It acts as a catalyst and removes water, shifting the equilibrium towards the ester.',
      wrong: ['It oxidises ethanol to ethanoic acid.', 'It reacts with the ester to give a salt.', 'It neutralises the ethanoic acid.'],
      sol: 'H⁺ catalyses esterification; as a dehydrating agent it also absorbs water, favouring the ester — option (@K).',
      d: 2, c: 'understanding', t: [5],
    })),
    part('b', num({
      stem: 'Calculate the percentage yield of ethyl ethanoate.',
      value: 60, tol: 0.5, unit: '%',
      sol: r`Moles of acid $= \dfrac{6.0}{60} = 0.1$; theoretical ester $= 0.1 \times 88 = 8.8$ g; yield $= \dfrac{5.28}{8.8} \times 100 = 60$, so $60\%$.`,
      scheme: [['Theoretical 8.8 g and 60%', 1]],
      d: 3, c: 'application', t: [5],
    })),
    part('c', short({
      marks: 2,
      stem: 'Suggest two reasons why the yield is well below 100%.',
      model: 'Esterification is reversible, so an equilibrium mixture containing unreacted acid and alcohol forms. Some ester is also lost during purification (washing and distillation), and some may be hydrolysed back.',
      sol: 'Equilibrium; losses.',
      scheme: [['Reversible reaction (equilibrium)', 1], ['Losses in purification', 1]],
      d: 3, c: 'evaluation', t: [5],
    }), [
      short({
        marks: 2,
        stem: 'Suggest one way to increase the yield, explaining it with Le Chatelier’s principle.',
        model: 'Use a large excess of ethanol (or remove water or the ester as it forms). Increasing a reactant or removing a product shifts the equilibrium to the right, producing more ester.',
        sol: 'Excess reactant or product removal.',
        scheme: [['A valid method', 1], ['Le Chatelier explanation', 1]],
        d: 3, c: 'application', t: [5],
      }),
    ]),
  ],
}), () => near((5.28 / ((6 / 60) * 88)) * 100, 60) || 'yield');
