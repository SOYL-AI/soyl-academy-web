// ch08 Aldehydes, Ketones and Carboxylic Acids — question bank. MCQ keys are placed by the builder (balanced);
// AR keys planned: a b c d a c. Every numerical is re-solved by the check function passed to add().
import { mk, add, r } from './lib.mjs';

const { mcq, ar, tf, fill, match, num, short, long, part } = mk;
const near = (a, b, rel = 0.005) => Math.abs(a - b) <= Math.max(1e-9, Math.abs(b) * rel);

// ---------------------------------------------------------------- t01 naming and structure
add('name-mcq', mcq({
  stem: r`The IUPAC name of $\ce{CH3CH(CH3)CH2COCH3}$ is:`,
  right: '4-methylpentan-2-one',
  wrong: ['2-methylpentan-4-one', '4-methylpentanal', '2-methylbutyl methyl ketone'],
  sol: 'Five-carbon chain; number from the end nearer C=O: carbonyl at C2, methyl at C4 — option (@K). (@1) gives the carbonyl the higher locant.',
  d: 2, c: 'application', t: [1],
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
  stem: 'Which sequence converts propanenitrile into propanal?',
  right: 'SnCl₂ + HCl, then hydrolysis with water',
  wrong: ['LiAlH₄, then water', 'H₃O⁺, heat', 'Zn–Hg + conc. HCl'],
  sol: 'Stephen reaction: SnCl₂/HCl reduces the nitrile to an imine, which hydrolyses to the aldehyde — option (@K). LiAlH₄ (@1) gives the amine; H₃O⁺ (@2) gives propanoic acid.',
  d: 2, c: 'application', t: [2],
}));
add('fc-acyl-mcq', mcq({
  stem: 'Which reagents convert benzene into acetophenone?',
  right: 'Ethanoyl chloride and anhydrous AlCl₃',
  wrong: ['Ethanal and dilute NaOH', 'Chloroethane and AlCl₃', 'Ethanoic acid and sodium'],
  sol: r`Friedel–Crafts acylation: $\ce{C6H6 + CH3COCl ->[AlCl3] C6H5COCH3 + HCl}$ — option (@K). Chloroethane (@2) gives ethylbenzene (alkylation).`,
  d: 2, c: 'understanding', t: [2],
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
  d: 2, c: 'application', t: [2],
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
  d: 3, c: 'application', t: [3],
}));
add('cyanohydrin-mcq', mcq({
  stem: 'Ethanal reacts with HCN in the presence of a trace of base. The product is:',
  right: '2-hydroxypropanenitrile',
  wrong: ['propanenitrile', 'ethanenitrile', '2-hydroxypropanoic acid'],
  sol: r`$\ce{CH3CHO + HCN -> CH3CH(OH)CN}$: the cyanohydrin, named 2-hydroxypropanenitrile — option (@K). Hydrolysis would later give 2-hydroxypropanoic acid (@3).`,
  d: 2, c: 'understanding', t: [3],
}));
add('clemmensen-mcq', mcq({
  stem: 'Acetophenone is heated with zinc amalgam and concentrated HCl. The product is:',
  right: 'ethylbenzene',
  wrong: ['1-phenylethanol', 'benzoic acid', 'styrene'],
  sol: 'Clemmensen reduction replaces C=O by CH₂ — option (@K). NaBH₄ would give 1-phenylethanol (@1).',
  d: 2, c: 'understanding', t: [3],
}));
add('iodoform-mcq', mcq({
  stem: 'Which compound does NOT give a yellow precipitate with iodine and sodium hydroxide?',
  right: 'Pentan-3-one',
  wrong: ['Pentan-2-one', 'Ethanal', 'Propan-2-ol'],
  sol: 'The iodoform test needs CH₃CO– or CH₃CH(OH)–. Pentan-3-one, CH₃CH₂COCH₂CH₃, has neither — option (@K). Propan-2-ol (@3) is oxidised to propanone and gives the test.',
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
  stem: 'Give a chemical test to distinguish (a) ethanal from propanone and (b) propanal from benzaldehyde.',
  model: '(a) Warm with Tollens’ reagent: ethanal gives a silver mirror, propanone does not (or the iodoform test is positive for both, so it is not suitable). (b) Warm with Fehling’s solution: propanal gives a red-brown precipitate of Cu₂O; benzaldehyde does not.',
  sol: 'Tollens’ for aldehyde vs ketone; Fehling’s for aliphatic vs aromatic aldehyde.',
  scheme: [['(a) reagent and results', 1], ['(b) reagent and results', 1]],
  d: 2, c: 'application', t: [3],
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
  stem: 'Explain aldol condensation using ethanal. Why does benzaldehyde not undergo self-aldol condensation?',
  model: r`In dilute NaOH, hydroxide removes an α-hydrogen from ethanal, giving a resonance-stabilised carbanion (enolate). This attacks the carbonyl carbon of a second ethanal molecule, and protonation gives the aldol, 3-hydroxybutanal: $\ce{2CH3CHO -> CH3CH(OH)CH2CHO}$. On heating it loses water to give but-2-enal. Benzaldehyde has no α-hydrogen, so it cannot form the enolate and cannot undergo self-aldol condensation.`,
  sol: 'Enolate formation, addition, dehydration; no α-H in benzaldehyde.',
  scheme: [['Enolate from α-H', 1], ['Addition to second molecule giving aldol; dehydration', 1], ['Benzaldehyde lacks α-H', 1]],
  d: 3, c: 'understanding', t: [3],
}));

// ---------------------------------------------------------------- t04 carboxylic acids: preparation
add('benzoic-mcq', mcq({
  stem: 'Which compound gives benzoic acid on heating with alkaline KMnO₄ followed by acidification?',
  right: 'Ethylbenzene',
  wrong: ['Cyclohexane', 'Phenol', 'tert-Butylbenzene'],
  sol: 'Any alkyl side chain with a benzylic hydrogen is oxidised to –COOH — option (@K). tert-Butylbenzene (@3) has no benzylic hydrogen and resists oxidation.',
  d: 3, c: 'application', t: [4],
}));
add('grignard-acid-mcq', mcq({
  stem: 'Ethylmagnesium bromide is poured onto dry ice and the mixture is acidified. The product is:',
  right: 'propanoic acid',
  wrong: ['ethanoic acid', 'ethanol', 'propanal'],
  sol: 'RMgX + CO₂ gives RCOOMgX; acid gives RCOOH with one extra carbon: CH₃CH₂COOH — option (@K).',
  d: 2, c: 'application', t: [4],
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
  d: 2, c: 'application', t: [5],
}));
add('nahco3-mcq', mcq({
  stem: 'A solution of an organic compound gives brisk effervescence with aqueous sodium hydrogencarbonate. The compound is most likely:',
  right: 'benzoic acid',
  wrong: ['phenol', 'ethanol', 'benzaldehyde'],
  sol: r`Carboxylic acids are stronger than carbonic acid: $\ce{C6H5COOH + NaHCO3 -> C6H5COONa + H2O + CO2}$ — option (@K). Phenol (@1) is too weak.`,
  d: 1, c: 'application', t: [5],
}));
add('hvz-mcq', mcq({
  stem: 'Propanoic acid is treated with bromine in the presence of red phosphorus. The product is:',
  right: '2-bromopropanoic acid',
  wrong: ['3-bromopropanoic acid', 'bromoethane', 'propanoyl bromide only'],
  sol: 'Hell–Volhard–Zelinsky reaction substitutes an α-hydrogen: CH₃CHBrCOOH — option (@K).',
  d: 2, c: 'understanding', t: [5],
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
  stem: 'What is decarboxylation? Write the equation for sodium ethanoate with soda lime.',
  model: r`Decarboxylation is the removal of CO₂ from a carboxylic acid or its salt, giving a hydrocarbon with one carbon fewer. $\ce{CH3COONa + NaOH ->[CaO][\Delta] CH4 + Na2CO3}$.`,
  sol: 'Definition and equation.',
  scheme: [['Definition', 1], ['Equation', 1]],
  d: 1, c: 'recall', t: [5],
}));
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
  stem: 'Give reagents for: (a) ethanoic acid → ethanoyl chloride; (b) ethanoic acid → ethanol; (c) ethanoic acid → chloroethanoic acid.',
  model: '(a) SOCl₂ (or PCl₅).\n\n(b) LiAlH₄ in dry ether, then H₃O⁺.\n\n(c) Cl₂ with red phosphorus (HVZ reaction).',
  sol: 'Acid chloride; reduction; HVZ.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 2, c: 'application', t: [5],
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
  stem: '(a) Explain why aldehydes are more reactive than ketones towards nucleophilic addition.\n\n(b) Describe the mechanism of nucleophilic addition of HCN to a carbonyl compound.\n\n(c) Describe Tollens’ and Fehling’s tests, and state which of ethanal, benzaldehyde and propanone respond to each.',
  model: 'Aldehydes have one hydrogen on the carbonyl carbon, so there is less crowding around it and less electron release; in ketones two alkyl groups hinder the nucleophile and, by their +I effect, reduce the positive charge on carbon. In the addition of HCN, a base generates CN⁻, which attacks the carbonyl carbon; the π electrons move to oxygen, giving a tetrahedral alkoxide intermediate, which takes a proton from HCN or water to give the cyanohydrin, regenerating CN⁻. Tollens’ reagent (ammoniacal silver nitrate) is reduced by aldehydes to metallic silver, forming a silver mirror; ethanal and benzaldehyde respond, propanone does not. Fehling’s solution (alkaline copper(II) tartrate) is reduced by aliphatic aldehydes to a red-brown precipitate of Cu₂O; only ethanal responds.',
  sol: 'Steric and electronic effects; two-step mechanism; two tests with results.',
  scheme: [['(a) Steric and +I effects', 1], ['(b) Attack by CN⁻ and tetrahedral intermediate', 1], ['(b) Protonation to cyanohydrin', 0.5], ['(c) Tollens’ test and results', 1.5], ['(c) Fehling’s test and results', 1]],
  d: 3, c: 'understanding', t: [3],
}));
add('acid-long', long({
  stem: '(a) Explain why carboxylic acids are acidic, and how electron-withdrawing and electron-releasing groups affect their acidity, with examples.\n\n(b) Write the reactions of ethanoic acid with (i) sodium hydrogencarbonate, (ii) PCl₅, (iii) chlorine and red phosphorus, and of sodium ethanoate with soda lime.',
  model: 'The O–H bond of the carboxyl group ionises because the carboxylate ion is stabilised by resonance, with the negative charge spread equally over two oxygen atoms. Electron-withdrawing groups such as Cl, F or NO₂ disperse the charge further and increase acidity: chloroethanoic acid (pKa 2.86) is stronger than ethanoic acid (4.76), and trichloroethanoic acid (0.65) stronger still. Electron-releasing alkyl groups concentrate the charge and decrease acidity, so propanoic acid (4.88) is weaker than ethanoic acid, and methanoic acid (3.75) is stronger. Reactions: CH₃COOH + NaHCO₃ → CH₃COONa + H₂O + CO₂; CH₃COOH + PCl₅ → CH₃COCl + POCl₃ + HCl; CH₃COOH + Cl₂ (red P) → ClCH₂COOH + HCl; CH₃COONa + NaOH (CaO, heat) → CH₄ + Na₂CO₃.',
  sol: 'Carboxylate resonance; −I/+I with pKa examples; four equations.',
  scheme: [['(a) Resonance stabilisation', 1], ['(a) −I and +I effects with examples', 1.5], ['(b) Four reactions', 2.5]],
  d: 3, c: 'understanding', t: [5],
}));
add('prep-long', long({
  stem: '(a) Describe the Rosenmund reduction, the Stephen reaction and the Etard reaction, with equations or reagents.\n\n(b) How are carboxylic acids prepared from Grignard reagents and from nitriles? Explain why both methods are useful for increasing chain length.',
  model: 'In the Rosenmund reduction, an acid chloride is hydrogenated over palladium poisoned with barium sulfate, which stops the reduction at the aldehyde: C₆H₅COCl + H₂ → C₆H₅CHO + HCl. In the Stephen reaction, a nitrile is reduced by tin(II) chloride and hydrochloric acid to an imine, which is hydrolysed to an aldehyde. In the Etard reaction, toluene is oxidised by chromyl chloride to a chromium complex, which is hydrolysed to benzaldehyde. A Grignard reagent RMgX adds to carbon dioxide (dry ice) to give RCOOMgX, which is acidified to RCOOH. An alkyl halide RX with KCN gives the nitrile RCN, which acid hydrolysis converts into RCOOH. In both cases the carboxylic acid has one carbon more than the alkyl halide, so these methods step up the carbon chain.',
  sol: 'Three named reactions; two acid preparations adding a carbon.',
  scheme: [['(a) Rosenmund', 1], ['(a) Stephen', 1], ['(a) Etard', 1], ['(b) Grignard and nitrile routes', 1.5], ['(b) Chain lengthening explained', 0.5]],
  d: 2, c: 'understanding', t: [2, 4],
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
