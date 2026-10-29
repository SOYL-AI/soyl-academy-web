// ch07 Alcohols, Phenols and Ethers — question bank. MCQ keys are placed by the builder (balanced); AR keys planned: a b c d a c.
// Every numerical is re-solved by the check function passed to add().
import { mk, add, r } from './lib.mjs';

const { mcq, ar, tf, fill, match, num, short, long, part } = mk;
const near = (a, b, rel = 0.005) => Math.abs(a - b) <= Math.max(1e-9, Math.abs(b) * rel);

// ---------------------------------------------------------------- t01 classification, naming, structure
add('classify-mcq', mcq({
  stem: r`$\ce{C6H5CH(OH)CH3}$ is best described as a:`,
  right: 'secondary benzylic alcohol',
  wrong: ['primary benzylic alcohol', 'phenol', 'tertiary alcohol'],
  sol: 'The –OH carbon is joined to two carbons (the ring carbon and CH₃), so it is secondary, and it is next to the benzene ring, so benzylic — option (@K). It is not a phenol (@2), because –OH is not on a ring carbon.',
  d: 2, c: 'understanding', t: [1],
}));
add('name-mcq', mcq({
  stem: r`The IUPAC name of $\ce{CH3CH(CH3)CH2CH(OH)CH3}$ is:`,
  right: '4-methylpentan-2-ol',
  wrong: ['2-methylpentan-4-ol', '4-methylhexan-2-ol', '1,3-dimethylbutan-1-ol'],
  sol: 'Longest chain with the –OH carbon: five carbons. Number from the end giving –OH the lower locant: OH at C2, methyl at C4 — option (@K). (@1) gives –OH the higher number.',
  d: 2, c: 'application', t: [1],
}));
add('name2-mcq', mcq({
  stem: r`The IUPAC name of $\ce{C6H5OCH2CH3}$ is:`,
  right: 'ethoxybenzene',
  wrong: ['phenoxyethane', 'ethyl phenyl ketone', 'methoxytoluene'],
  sol: 'Ethers are named as alkoxy derivatives of the larger parent: the benzene ring with an ethoxy group — option (@K).',
  d: 1, c: 'understanding', t: [1],
}));
add('structure-mcq', mcq({
  stem: 'The C–O bond in phenol (136 pm) is shorter than the C–O bond in methanol (142 pm) because:',
  right: 'the oxygen lone pair is partly delocalised into the ring and the ring carbon is sp² hybridised',
  wrong: ['phenol forms stronger hydrogen bonds than methanol', 'oxygen in phenol is sp hybridised', 'phenol has a lower molar mass than methanol'],
  sol: 'Resonance gives the C–O bond partial double-bond character, and an sp² carbon forms a shorter bond than an sp³ carbon — option (@K).',
  d: 3, c: 'understanding', t: [1],
}));
add('classify-tf', tf({
  stem: 'Prop-2-en-1-ol, CH₂=CHCH₂OH, is a vinylic alcohol.',
  key: 'f',
  sol: 'False. The –OH is on an sp³ carbon next to the C=C, so it is an allylic alcohol. A vinylic –OH would be on a carbon of the double bond itself.',
  d: 2, c: 'understanding', t: [1],
}));
add('name-fill', fill({
  stem: 'The IUPAC name of glycerol, HOCH₂CH(OH)CH₂OH, is propane-1,2,3-___.',
  acc: [['triol']],
  sol: 'Three –OH groups: propane-1,2,3-**triol**.',
  d: 1, c: 'recall', t: [1],
}));
add('name-match', match({
  stem: 'Match each common name with its IUPAC name.',
  pairs: [
    ['Anisole', 'Methoxybenzene'],
    ['o-Cresol', '2-Methylphenol'],
    ['Catechol', 'Benzene-1,2-diol'],
    ['tert-Butyl alcohol', '2-Methylpropan-2-ol'],
  ],
  order: [2, 3, 0, 1],
  sol: 'Anisole = methoxybenzene; o-cresol = 2-methylphenol; catechol = benzene-1,2-diol; tert-butyl alcohol = 2-methylpropan-2-ol.',
  d: 1, c: 'recall', t: [1],
}));
add('name-short', short({
  marks: 2,
  stem: 'Write the structures of (a) 3-methylbutan-2-ol and (b) 2-methoxy-2-methylpropane, and classify each compound.',
  model: r`(a) $\ce{CH3CH(OH)CH(CH3)CH3}$: the –OH carbon is bonded to two carbons, so it is a **secondary alcohol**. (b) $\ce{(CH3)3COCH3}$: oxygen joins a methyl and a tert-butyl group, so it is an **unsymmetrical ether**.`,
  sol: 'Draw the parent chain, add substituents, classify.',
  scheme: [['(a) structure and secondary alcohol', 1], ['(b) structure and unsymmetrical ether', 1]],
  d: 2, c: 'application', t: [1],
}));

// ---------------------------------------------------------------- t02 preparation
add('grignard-mcq', mcq({
  stem: 'Which pair of reagents, followed by dilute acid, gives 2-methylbutan-2-ol?',
  right: r`$\ce{CH3CH2MgBr}$ and propanone`,
  wrong: [r`$\ce{CH3MgBr}$ and propanal`, r`$\ce{CH3CH2MgBr}$ and methanal`, r`$\ce{CH3MgBr}$ and ethanal`],
  sol: 'A tertiary alcohol needs a ketone. Ethyl from the Grignard reagent + (CH₃)₂C=O gives (CH₃)₂C(OH)CH₂CH₃ — option (@K). (@1) gives butan-2-ol (2°); (@2) gives propan-1-ol (1°).',
  d: 3, c: 'application', t: [2],
}));
add('hydroboration-mcq', mcq({
  stem: 'Propene is treated with diborane and the product is then oxidised with alkaline hydrogen peroxide. The alcohol formed is:',
  right: 'propan-1-ol',
  wrong: ['propan-2-ol', 'propane-1,2-diol', 'propanal'],
  sol: 'Hydroboration–oxidation adds water anti-Markovnikov: –OH goes to the terminal carbon — option (@K). Acid-catalysed hydration would give propan-2-ol (@1).',
  d: 2, c: 'understanding', t: [2],
}));
add('reduction-mcq', mcq({
  stem: 'Reduction of butan-2-one with sodium borohydride gives:',
  right: 'butan-2-ol, a secondary alcohol',
  wrong: ['butan-1-ol, a primary alcohol', '2-methylpropan-2-ol, a tertiary alcohol', 'butanoic acid'],
  sol: 'Reduction of a ketone gives a secondary alcohol with the same carbon skeleton: CH₃CH(OH)CH₂CH₃ — option (@K).',
  d: 1, c: 'understanding', t: [2],
}));
add('cumene-mcq', mcq({
  stem: 'In the cumene process, cumene hydroperoxide is treated with dilute acid. The products are:',
  right: 'phenol and propanone',
  wrong: ['phenol and propanal', 'benzoic acid and ethanol', 'benzene and propan-2-ol'],
  sol: r`$\ce{C6H5C(CH3)2OOH ->[H+] C6H5OH + CH3COCH3}$ — option (@K).`,
  d: 1, c: 'recall', t: [2],
}));
add('diazo-mcq', mcq({
  stem: 'Benzenediazonium chloride solution is warmed. What happens?',
  right: 'Nitrogen gas is evolved and phenol is formed.',
  wrong: ['Chlorobenzene is formed without any gas.', 'Aniline is regenerated.', 'Benzene is formed and chlorine is evolved.'],
  sol: r`$\ce{C6H5N2Cl + H2O -> C6H5OH + N2 + HCl}$ — option (@K). Chlorobenzene (@1) needs CuCl (Sandmeyer).`,
  d: 2, c: 'understanding', t: [2],
}));
add('cumene-ar', ar({
  a: 'The cumene process is economically attractive for making phenol.',
  r: 'It produces propanone, another useful chemical, along with phenol.',
  key: 'a',
  sol: 'Both are true, and the valuable by-product propanone is the main reason the process is economical — option (a).',
  d: 2, c: 'understanding', t: [2],
}));
add('prep-short3', short({
  marks: 3, wl: null,
  stem: 'How would you obtain phenol from (a) chlorobenzene, (b) aniline and (c) cumene? Give reagents and conditions.',
  model: r`(a) Heat with NaOH at 623 K and 300 atm to give sodium phenoxide, then acidify: $\ce{C6H5Cl + 2NaOH -> C6H5ONa + NaCl + H2O}$.

(b) Diazotise with $\ce{NaNO2}$/HCl at 273–278 K, then warm with water: $\ce{C6H5N2Cl + H2O -> C6H5OH + N2 + HCl}$.

(c) Oxidise with air to cumene hydroperoxide, then treat with dilute acid: phenol + propanone.`,
  sol: 'Dow process; diazonium hydrolysis; cumene process.',
  scheme: [['(a) correct', 1], ['(b) correct with temperature', 1], ['(c) correct with both products', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('grignard-short3', short({
  marks: 3, wl: null,
  stem: 'Using a Grignard reagent and a suitable carbonyl compound each time, show how to make (a) propan-1-ol, (b) propan-2-ol, (c) 2-methylpropan-2-ol.',
  model: r`(a) $\ce{CH3CH2MgBr}$ + HCHO, then $\ce{H3O+}$ → $\ce{CH3CH2CH2OH}$.

(b) $\ce{CH3MgBr}$ + $\ce{CH3CHO}$, then $\ce{H3O+}$ → $\ce{CH3CH(OH)CH3}$.

(c) $\ce{CH3MgBr}$ + $\ce{CH3COCH3}$, then $\ce{H3O+}$ → $\ce{(CH3)3COH}$.`,
  sol: 'Methanal → 1°, aldehyde → 2°, ketone → 3°.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 3, c: 'application', t: [2],
}));

// ---------------------------------------------------------------- t03 properties and reactions
add('bp-mcq', mcq({
  stem: 'Ethanol (M = 46) boils at 351 K, while methoxymethane (M = 46) boils at 248 K. The main reason is that:',
  right: 'ethanol molecules form hydrogen bonds with one another; methoxymethane molecules cannot',
  wrong: ['ethanol has a larger molar mass', 'methoxymethane is more polar than ethanol', 'ethanol is ionic'],
  sol: 'Both have the same molar mass; only ethanol has an O–H group for intermolecular hydrogen bonding — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('phenol-naoh-mcq', mcq({
  stem: 'A colourless compound dissolves in aqueous NaOH but not in aqueous NaHCO₃, and gives a violet colour with neutral FeCl₃. It is most likely:',
  right: 'phenol',
  wrong: ['ethanol', 'benzoic acid', 'methoxybenzene'],
  sol: 'Phenol is acidic enough to react with NaOH but too weak to release CO₂ from NaHCO₃ (benzoic acid would, @2), and phenols give a violet colour with FeCl₃ — option (@K).',
  d: 3, c: 'application', t: [3],
}));
add('bromine-water-mcq', mcq({
  stem: 'Phenol is shaken with excess bromine water at room temperature. The product is:',
  right: '2,4,6-tribromophenol, a white precipitate',
  wrong: ['4-bromophenol only', 'bromobenzene', '3-bromophenol'],
  sol: r`The –OH group strongly activates the ortho and para positions: $\ce{C6H5OH + 3Br2 -> C6H2Br3OH + 3HBr}$ — option (@K). Monobromination (@1) needs Br₂ in CS₂ at low temperature.`,
  d: 2, c: 'understanding', t: [3],
}));
add('acidity-mcq', mcq({
  stem: 'Which is the strongest acid?',
  right: '4-Nitrophenol',
  wrong: ['Phenol', '4-Methylphenol', 'Ethanol'],
  sol: 'The para nitro group withdraws electrons (−R, −I) and stabilises the phenoxide ion (pKa 7.1) — option (@K). Methyl (+I) weakens phenol; ethanol is far weaker.',
  d: 2, c: 'application', t: [3],
}));
add('lucas-mcq', mcq({
  stem: 'Three alcohols, P, Q and R, are mixed with Lucas reagent at room temperature. P turns cloudy at once, Q after about five minutes, and R stays clear. P, Q and R could be:',
  right: '2-methylpropan-2-ol, butan-2-ol, butan-1-ol',
  wrong: ['butan-1-ol, butan-2-ol, 2-methylpropan-2-ol', 'butan-2-ol, 2-methylpropan-2-ol, butan-1-ol', 'butan-1-ol, 2-methylpropan-2-ol, butan-2-ol'],
  sol: 'Rate with Lucas reagent: 3° (instant) > 2° (minutes) > 1° (no turbidity at room temperature) — option (@K).',
  d: 3, c: 'application', t: [3],
}));
add('oxidation-mcq', mcq({
  stem: 'Vapours of three alcohols are passed over heated copper at 573 K. Which alcohol gives an alkene rather than a carbonyl compound?',
  right: '2-Methylpropan-2-ol',
  wrong: ['Ethanol', 'Propan-2-ol', 'Butan-1-ol'],
  sol: '1° and 2° alcohols are dehydrogenated to aldehydes and ketones; a 3° alcohol has no H on the carbinol carbon and is dehydrated to 2-methylpropene instead — option (@K).',
  d: 3, c: 'application', t: [3],
}));
add('dehydration-mcq', mcq({
  stem: 'Ethanol is heated with concentrated sulfuric acid at 413 K, with ethanol in excess. The main organic product is:',
  right: 'ethoxyethane',
  wrong: ['ethene', 'ethanal', 'ethanoic acid'],
  sol: 'At 413 K intermolecular dehydration gives the ether: 2C₂H₅OH → C₂H₅OC₂H₅ + H₂O — option (@K). At 443 K, ethene (@1) is the main product.',
  d: 2, c: 'understanding', t: [3],
}));
add('kolbe-mcq', mcq({
  stem: 'Sodium phenoxide is heated with carbon dioxide under pressure and the product is acidified. The compound obtained is used to make:',
  right: 'aspirin (it is salicylic acid)',
  wrong: ['soap (it is stearic acid)', 'nylon (it is adipic acid)', 'paracetamol (it is 4-aminophenol)'],
  sol: 'Kolbe’s reaction gives salicylic acid (2-hydroxybenzoic acid), which is acetylated to aspirin — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('reimer-mcq', mcq({
  stem: 'Phenol is warmed with chloroform and aqueous sodium hydroxide, and the mixture is then acidified. The main product is:',
  right: '2-hydroxybenzaldehyde (salicylaldehyde)',
  wrong: ['2-hydroxybenzoic acid', '4-chlorophenol', 'chlorobenzene'],
  sol: 'Reimer–Tiemann reaction: a –CHO group is introduced mainly at the ortho position — option (@K). Salicylic acid (@1) comes from Kolbe’s reaction.',
  d: 2, c: 'recall', t: [3],
}));
add('nitro-steam-mcq', mcq({
  stem: 'A mixture of 2-nitrophenol and 4-nitrophenol is separated by steam distillation. Which distils over, and why?',
  right: '2-Nitrophenol, because intramolecular hydrogen bonding makes it more volatile',
  wrong: ['4-Nitrophenol, because it is more symmetrical', '2-Nitrophenol, because it is more acidic', 'Both distil together, as they are isomers'],
  sol: 'In the ortho isomer the –OH hydrogen-bonds to the neighbouring –NO₂ within the molecule; the para isomer forms intermolecular H-bonds and is far less volatile — option (@K).',
  d: 3, c: 'analysis', t: [3],
}));
add('acidity-ar', ar({
  a: 'Phenol is a stronger acid than ethanol.',
  r: 'The phenoxide ion is stabilised by delocalisation of its negative charge over the benzene ring.',
  key: 'a',
  sol: 'Both are true, and the resonance stabilisation of phenoxide (absent in ethoxide) explains the greater acidity — option (a).',
  d: 2, c: 'understanding', t: [3],
}));
add('oxidation-ar', ar({
  a: 'Tertiary alcohols are not easily oxidised by acidified potassium dichromate.',
  r: 'Tertiary alcohols react fastest with Lucas reagent.',
  key: 'b',
  sol: 'Both are true. Resistance to oxidation is due to the absence of a hydrogen on the carbinol carbon, not to their reactivity with Lucas reagent (which reflects carbocation stability) — option (b).',
  d: 3, c: 'understanding', t: [3],
}));
add('bp-ar', ar({
  a: 'Propan-1-ol has a higher boiling point than butane, although their molar masses are similar.',
  r: 'Propan-1-ol is a non-polar molecule.',
  key: 'c',
  sol: 'A is true (hydrogen bonding in the alcohol). R is false: the O–H group makes propan-1-ol polar — option (c).',
  d: 1, c: 'understanding', t: [3],
}));
add('nahco3-ar', ar({
  a: 'Phenol liberates carbon dioxide from sodium hydrogencarbonate solution.',
  r: 'Phenol is acidic enough to react with sodium hydroxide.',
  key: 'd',
  sol: 'A is false: phenol (pKa 10) is weaker than carbonic acid, so it does not liberate CO₂. R is true — option (d).',
  d: 2, c: 'understanding', t: [3],
}));
add('acid-num', num({
  marks: 2,
  stem: r`The pKa values of ethanol and phenol are 15.9 and 10.0. How many times larger is the acid dissociation constant of phenol? (Give the answer to 2 significant figures, in units of $10^{5}$.)`,
  value: 7.9, tol: 0.1, unit: '× 10⁵',
  sol: r`$\dfrac{K_\text{a}(\text{phenol})}{K_\text{a}(\text{ethanol})} = 10^{15.9 - 10.0} = 10^{5.9}$, and $10^{5.9} = 794328$. In units of $10^{5}$: $794328 \div 100000 = 7.94$, so the answer is about 7.9.`,
  scheme: [['Ratio = 10^(ΔpKa) = 10^5.9', 1], ['≈ 7.9 × 10⁵', 1]],
  d: 3, c: 'application', t: [3],
}), () => near(Math.pow(10, 5.9) / 1e5, 7.94, 0.002) || 'ratio');
add('h2-num', num({
  stem: r`What volume of hydrogen, in litres at STP (22.4 L mol⁻¹), is released when $4.6\ \text{g}$ of ethanol reacts completely with sodium? ($M = 46\ \text{g mol}^{-1}$)`,
  value: 1.12, tol: 0.01, unit: 'L',
  sol: r`$\ce{2C2H5OH + 2Na -> 2C2H5ONa + H2}$. Moles of ethanol $= \dfrac{4.6}{46} = 0.1$, so $0.05$ mol $\ce{H2}$; volume $= 0.05 \times 22.4 = 1.12$, so $1.12\ \text{L}$.`,
  scheme: [['2 : 1 ratio and 1.12 L', 1]],
  d: 2, c: 'application', t: [3],
}), () => near((4.6 / 46 / 2) * 22.4, 1.12) || 'H2');
add('br2-num', num({
  marks: 2,
  stem: r`What mass of bromine, in grams, is needed to convert $0.94\ \text{g}$ of phenol completely into 2,4,6-tribromophenol? (Phenol $M = 94$; $\ce{Br2}$ $M = 160\ \text{g mol}^{-1}$)`,
  value: 4.8, tol: 0.05, unit: 'g',
  sol: r`$\ce{C6H5OH + 3Br2 -> C6H2Br3OH + 3HBr}$. Moles of phenol $= \dfrac{0.94}{94} = 0.01$; bromine $= 3 \times 0.01 = 0.03$ mol; mass $= 0.03 \times 160 = 4.8$, so $4.8\ \text{g}$.`,
  scheme: [['1 : 3 ratio, 0.03 mol Br₂', 1], ['4.8 g', 1]],
  d: 2, c: 'application', t: [3],
}), () => near((0.94 / 94) * 3 * 160, 4.8) || 'Br2');
add('acidity-short', short({
  marks: 2,
  stem: 'Explain why ethanol is a weaker acid than water.',
  model: 'In the ethoxide ion, the ethyl group releases electrons (+I effect) towards the negatively charged oxygen, intensifying the charge and destabilising the ion. Hydroxide has no such group. A less stable conjugate base means a weaker acid, so ethanol is weaker than water.',
  sol: 'Compare the stability of ethoxide and hydroxide.',
  scheme: [['+I effect of ethyl intensifies charge on O⁻', 1], ['Less stable conjugate base, weaker acid', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('test-short', short({
  marks: 2,
  stem: 'Give one chemical test each to distinguish (a) phenol from ethanol and (b) propan-2-ol from 2-methylpropan-2-ol.',
  model: '(a) Add neutral FeCl₃ solution: phenol gives a violet colour, ethanol does not (or bromine water: white precipitate with phenol). (b) Add Lucas reagent at room temperature: 2-methylpropan-2-ol turns cloudy at once, propan-2-ol only after about five minutes.',
  sol: 'Reagent and observation for each.',
  scheme: [['(a) test and observations', 1], ['(b) test and observations', 1]],
  d: 2, c: 'application', t: [3],
}));
add('dehydration-short', short({
  marks: 2,
  stem: 'Explain why 2-methylpropan-2-ol is dehydrated by acid much more easily than ethanol.',
  model: 'Acid dehydration goes through a carbocation formed after the protonated –OH group leaves as water. 2-Methylpropan-2-ol forms a tertiary carbocation, stabilised by three alkyl groups, so it forms easily under mild conditions. Ethanol would need a very unstable primary carbocation, so it needs hot concentrated acid.',
  sol: 'Carbocation stability: 3° > 1°.',
  scheme: [['Carbocation intermediate', 1], ['Tertiary more stable than primary', 1]],
  d: 3, c: 'application', t: [3],
}));
add('acidity-short3', short({
  marks: 3,
  stem: 'Arrange in increasing order of acid strength and explain: phenol, 4-nitrophenol, 4-methylphenol, ethanol.',
  model: 'Ethanol < 4-methylphenol < phenol < 4-nitrophenol. Ethoxide has no resonance and is destabilised by the +I ethyl group, so ethanol is weakest. All phenoxides are resonance-stabilised. In 4-methylphenol the methyl group (+I) pushes electrons into the ring and slightly destabilises the anion. In 4-nitrophenol the nitro group (−R, −I) withdraws charge from the ring and oxygen, stabilising the anion most, so it is the strongest acid.',
  sol: 'Order, then the effect on the conjugate base.',
  scheme: [['Correct order', 1], ['Resonance in phenoxide vs ethoxide', 1], ['+I of CH₃ and −R/−I of NO₂', 1]],
  d: 3, c: 'analysis', t: [3],
}));
add('phenol-reactions-short3', short({
  marks: 3, wl: null,
  stem: 'Write the main organic product of each reaction of phenol: (a) with bromine in CS₂ at 273 K; (b) with concentrated nitric acid; (c) with zinc dust on heating.',
  model: '(a) 4-Bromophenol (major) with some 2-bromophenol — the non-polar solvent limits the reaction to monobromination.\n\n(b) 2,4,6-Trinitrophenol (picric acid).\n\n(c) Benzene.',
  sol: 'Solvent controls the extent of bromination; conc. nitric acid trinitrates; zinc removes oxygen.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 2, c: 'understanding', t: [3],
}));

// ---------------------------------------------------------------- t04 commercial alcohols
add('methanol-mcq', mcq({
  stem: 'Methanol is manufactured industrially from:',
  right: 'carbon monoxide and hydrogen over a ZnO–Cr₂O₃ catalyst',
  wrong: ['fermentation of molasses with yeast', 'hydration of ethene', 'oxidation of methane with KMnO₄'],
  sol: r`$\ce{CO + 2H2 ->[ZnO/Cr2O3] CH3OH}$ at high temperature and pressure — option (@K). Fermentation (@1) gives ethanol.`,
  d: 1, c: 'recall', t: [4],
}));
add('denature-tf', tf({
  stem: 'Denatured alcohol is ethanol to which methanol and a colouring substance have been added to make it unfit to drink.',
  key: 't',
  sol: 'True. Denaturing allows untaxed industrial use of ethanol without it being drunk.',
  d: 1, c: 'recall', t: [4],
}));
add('ferment-num', num({
  marks: 2,
  stem: r`What mass of ethanol, in grams, can be obtained by complete fermentation of $90\ \text{g}$ of glucose? ($\ce{C6H12O6 -> 2C2H5OH + 2CO2}$; glucose $M = 180$, ethanol $M = 46\ \text{g mol}^{-1}$)`,
  value: 46, tol: 0.2, unit: 'g',
  sol: r`Moles of glucose $= \dfrac{90}{180} = 0.5$; ethanol $= 2 \times 0.5 = 1$ mol; mass $= 1 \times 46 = 46$, so $46\ \text{g}$.`,
  scheme: [['0.5 mol glucose gives 1 mol ethanol', 1], ['46 g', 1]],
  d: 2, c: 'application', t: [4],
}), () => near((90 / 180) * 2 * 46, 46) || 'ethanol');
add('uses-short', short({
  marks: 2,
  stem: 'Give one important use and one hazard of methanol, and one important use of ethanol.',
  model: 'Methanol is used as a solvent for paints and varnishes and to make methanal; it is highly poisonous, and even small amounts can cause blindness. Ethanol is used as a solvent and in hand sanitisers, and is blended with petrol as a fuel.',
  sol: 'Use and hazard of methanol; use of ethanol.',
  scheme: [['Methanol use and hazard', 1], ['Ethanol use', 1]],
  d: 1, c: 'recall', t: [4],
}));

// ---------------------------------------------------------------- t05 ethers
add('williamson-mcq', mcq({
  stem: 'Which pair of reactants is best for preparing tert-butyl methyl ether by Williamson synthesis?',
  right: 'Sodium tert-butoxide and bromomethane',
  wrong: ['Sodium methoxide and 2-bromo-2-methylpropane', 'tert-Butyl alcohol and methanol with conc. H₂SO₄', 'Methanol and 2-methylpropene with water'],
  sol: 'The alkyl halide must be primary (or methyl) for SN2; with a tertiary halide (@1) the methoxide acts as a base and gives 2-methylpropene — option (@K).',
  d: 3, c: 'application', t: [5],
}));
add('hi-mcq', mcq({
  stem: 'Anisole is heated with hydrogen iodide. The products are:',
  right: 'phenol and iodomethane',
  wrong: ['iodobenzene and methanol', 'iodobenzene and iodomethane', 'benzene and methanol'],
  sol: 'The O–CH₃ bond is broken (SN2 at methyl); the aryl C–O bond has partial double-bond character and does not break — option (@K).',
  d: 2, c: 'understanding', t: [5],
}));
add('hi2-mcq', mcq({
  stem: '2-Methoxy-2-methylpropane is treated with one equivalent of HI. The products are:',
  right: '2-iodo-2-methylpropane and methanol',
  wrong: ['iodomethane and 2-methylpropan-2-ol', 'iodomethane and 2-iodo-2-methylpropane', '2-methylpropene and iodomethane only'],
  sol: 'The protonated ether ionises to a stable tertiary carbocation (SN1), which captures iodide: (CH₃)₃CI + CH₃OH — option (@K). (@1) would be expected for SN2 at methyl, but the tertiary carbocation route is faster.',
  d: 4, c: 'analysis', t: [5],
}));
add('anisole-mcq', mcq({
  stem: 'Anisole reacts with bromine in ethanoic acid. The major product is:',
  right: '4-bromoanisole',
  wrong: ['3-bromoanisole', 'bromobenzene', 'phenol'],
  sol: r`–OCH₃ activates the ring and directs o/p; para is major: $\ce{C6H5OCH3 + Br2 -> BrC6H4OCH3 + HBr}$ — option (@K).`,
  d: 2, c: 'understanding', t: [5],
}));
add('williamson-ar', ar({
  a: 'Bromobenzene and sodium methoxide do not give anisole by Williamson synthesis.',
  r: 'Aryl halides do not readily undergo nucleophilic substitution.',
  key: 'a',
  sol: 'Both are true; because the C–Br bond of an aryl halide has partial double-bond character, SN2 attack does not occur, so R explains A. Anisole is made from sodium phenoxide and iodomethane — option (a).',
  d: 3, c: 'application', t: [5],
}));
add('ether-sol-ar', ar({
  a: 'Methoxymethane is more soluble in water than propane.',
  r: 'Methoxymethane molecules form strong hydrogen bonds with one another.',
  key: 'c',
  sol: 'A is true: the ether oxygen can accept hydrogen bonds from water. R is false: ether molecules have no O–H and cannot hydrogen-bond with one another — option (c).',
  d: 3, c: 'understanding', t: [5],
}));
add('ether-short', short({
  marks: 2,
  stem: 'Ethers have boiling points close to those of alkanes of similar mass, but are about as soluble in water as alcohols of similar size. Explain.',
  model: 'Ether molecules have no O–H hydrogen, so they cannot hydrogen-bond with one another, and their boiling points are like those of alkanes. However, the ether oxygen has lone pairs that can accept hydrogen bonds from water molecules, so small ethers dissolve in water about as well as alcohols of similar size.',
  sol: 'No intermolecular H-bonding; H-bond acceptor with water.',
  scheme: [['No H-bonding between ether molecules', 1], ['Ether O accepts H-bonds from water', 1]],
  d: 3, c: 'application', t: [5],
}));

// ---------------------------------------------------------------- more practice
add('glycol-mcq', mcq({
  stem: 'Ethane-1,2-diol, used in antifreeze, is classified as a:',
  right: 'dihydric alcohol with two primary –OH groups',
  wrong: ['monohydric secondary alcohol', 'dihydric phenol', 'symmetrical ether'],
  sol: 'HOCH₂CH₂OH has two –OH groups, each on a carbon bonded to one other carbon — option (@K).',
  d: 1, c: 'understanding', t: [1],
}));
add('methanol-tf', tf({
  stem: 'Small amounts of methanol are harmless to drink because the body converts it into ethanol.',
  key: 'f',
  sol: 'False. Methanol is highly poisonous; the body converts it into toxic products, and even small amounts can cause blindness or death.',
  d: 1, c: 'recall', t: [4],
}));
add('ether-hi-mcq', mcq({
  stem: 'Ethoxyethane is heated with excess concentrated hydriodic acid. The final organic product is:',
  right: 'iodoethane only',
  wrong: ['ethanol and iodoethane', 'ethene', 'ethanoic acid'],
  sol: 'HI first gives iodoethane + ethanol; with excess HI the ethanol is also converted to iodoethane, so two molecules of iodoethane form — option (@K).',
  d: 3, c: 'application', t: [5],
}));
add('phenol-ox-mcq', mcq({
  stem: 'Phenol is oxidised with sodium dichromate and sulfuric acid. The product is:',
  right: 'benzoquinone',
  wrong: ['benzoic acid', 'cyclohexanol', 'salicylic acid'],
  sol: 'Oxidation of phenol with chromic acid gives the conjugated diketone benzoquinone — option (@K).',
  d: 2, c: 'recall', t: [3],
}));
add('williamson-num', num({
  marks: 2,
  stem: r`$0.050\ \text{mol}$ of sodium phenoxide reacts completely with excess iodomethane. What mass of anisole ($\ce{C6H5OCH3}$, $M = 108\ \text{g mol}^{-1}$), in grams, forms?`,
  value: 5.4, tol: 0.05, unit: 'g',
  sol: r`$\ce{C6H5ONa + CH3I -> C6H5OCH3 + NaI}$ is 1 : 1, so $0.050$ mol anisole; mass $= 0.050 \times 108 = 5.4$, so $5.4\ \text{g}$.`,
  scheme: [['1 : 1 Williamson ratio', 1], ['5.4 g', 1]],
  d: 2, c: 'application', t: [5],
}), () => near(0.05 * 108, 5.4) || 'anisole');

// ---------------------------------------------------------------- long answers
add('alcohol-long', long({
  stem: '(a) Explain, with equations, how primary, secondary and tertiary alcohols behave on oxidation.\n\n(b) Explain the Lucas test and how it distinguishes the three classes of alcohol.\n\n(c) Explain why acid-catalysed dehydration is easiest for tertiary alcohols.',
  model: 'A primary alcohol is oxidised first to an aldehyde and then, with acidified KMnO₄ or K₂Cr₂O₇, to a carboxylic acid; PCC or hot copper stops at the aldehyde (e.g. CH₃CH₂OH → CH₃CHO → CH₃COOH). A secondary alcohol gives a ketone (propan-2-ol → propanone). A tertiary alcohol has no hydrogen on the carbinol carbon and resists oxidation; over hot copper it dehydrates to an alkene. Lucas reagent (conc. HCl + anhydrous ZnCl₂) converts the alcohol to an insoluble chloroalkane, seen as turbidity: tertiary alcohols react at once, secondary in about five minutes, primary not at room temperature, because the rate depends on carbocation stability. Dehydration also proceeds through a carbocation, formed when protonated –OH leaves as water; tertiary carbocations are most stable, so tertiary alcohols dehydrate most easily.',
  sol: 'Oxidation products by class; Lucas observations; carbocation stability.',
  scheme: [['(a) 1°, 2°, 3° oxidation with examples', 2], ['(b) Lucas reagent and observations', 1.5], ['(c) Carbocation argument', 1.5]],
  d: 3, c: 'understanding', t: [3],
}));
add('phenol-long', long({
  stem: '(a) Explain why phenol is acidic and why it is more acidic than ethanol but less acidic than carboxylic acids.\n\n(b) Explain the effect of a nitro group at the para position on the acidity of phenol.\n\n(c) Write the Kolbe and Reimer–Tiemann reactions, naming the products.',
  model: 'Phenol loses H⁺ to give phenoxide, whose negative charge is delocalised over the ortho and para carbons; this resonance stabilisation makes phenol acidic (pKa 10). In ethoxide the charge stays on oxygen and is intensified by the +I ethyl group, so ethanol (pKa 15.9) is far weaker. In a carboxylate ion the charge is shared equally by two oxygen atoms, a better stabilisation, so carboxylic acids are stronger. A para nitro group withdraws electrons (−R, −I) and spreads the charge further, so 4-nitrophenol (pKa 7.1) is more acidic. Kolbe: sodium phenoxide + CO₂ at about 400 K and 4–7 atm, then acid, gives salicylic acid. Reimer–Tiemann: phenol + CHCl₃ + aqueous NaOH, then acid, gives salicylaldehyde.',
  sol: 'Conjugate-base stability; effect of p-NO₂; two named reactions.',
  scheme: [['(a) Resonance in phenoxide', 1], ['(a) Comparison with ethanol and carboxylic acids', 1], ['(b) Effect of p-NO₂', 1], ['(c) Kolbe and Reimer–Tiemann with products', 2]],
  d: 3, c: 'understanding', t: [3],
}));
add('ether-long', long({
  stem: '(a) Describe the Williamson synthesis, and explain why it fails with tertiary alkyl halides. Suggest how to make tert-butyl methyl ether.\n\n(b) Write the products of the reaction of HI with methoxyethane and with anisole, and explain the difference.\n\n(c) Explain why the methoxy group in anisole makes the ring more reactive and directs to ortho and para positions.',
  model: 'In the Williamson synthesis, an alkoxide or phenoxide ion attacks a primary alkyl halide by SN2, giving an ether: C₂H₅ONa + CH₃I → C₂H₅OCH₃ + NaI. With a tertiary halide, the strongly basic alkoxide removes a β-hydrogen instead and an alkene forms. So tert-butyl methyl ether is made from sodium tert-butoxide and bromomethane. With HI, methoxyethane gives iodomethane and ethanol, because iodide attacks the less hindered methyl carbon (SN2). Anisole gives phenol and iodomethane: the aryl C–O bond has partial double-bond character, and phenyl cannot undergo SN2, so only the methyl–O bond breaks. In anisole, a lone pair on oxygen is delocalised into the ring (+R effect), increasing electron density, especially at the ortho and para positions, so electrophiles attack there faster than in benzene.',
  sol: 'SN2 with primary halides; site of iodide attack; +R effect of –OCH₃.',
  scheme: [['(a) Williamson and failure with 3° halides', 1.5], ['(a) Correct reagents for tert-butyl methyl ether', 0.5], ['(b) Both sets of products with reasons', 1.5], ['(c) +R effect, o/p activation', 1.5]],
  d: 3, c: 'application', t: [5],
}));
add('prep-long', long({
  stem: '(a) Describe the preparation of phenol by the cumene process, with equations, and state its advantage.\n\n(b) Compare acid-catalysed hydration and hydroboration–oxidation of propene.\n\n(c) Explain why alcohols have higher boiling points than ethers of similar molar mass, and why lower alcohols are miscible with water.',
  model: 'Benzene and propene give cumene (isopropylbenzene). Air oxidises cumene to cumene hydroperoxide, C₆H₅C(CH₃)₂OOH, which dilute acid splits into phenol and propanone. Its advantage is that propanone, a useful solvent, is produced at the same time. Acid-catalysed hydration of propene proceeds through the more stable secondary carbocation, so –OH adds to the middle carbon (Markovnikov) to give propan-2-ol; hydroboration with B₂H₆ followed by alkaline H₂O₂ places –OH on the terminal carbon (anti-Markovnikov), giving propan-1-ol. Alcohol molecules are linked by hydrogen bonds between O–H groups, which must be broken on boiling; ethers cannot hydrogen-bond to one another, so they boil lower. Lower alcohols are miscible with water because their O–H groups form hydrogen bonds with water molecules and the hydrocarbon part is small.',
  sol: 'Cumene steps and by-product; Markovnikov vs anti-Markovnikov; hydrogen bonding.',
  scheme: [['(a) Steps with equations', 1.5], ['(a) Advantage', 0.5], ['(b) Two methods with products', 1.5], ['(c) Hydrogen bonding explanations', 1.5]],
  d: 3, c: 'understanding', t: [2, 3],
}));
add('synthesis-long', long({
  wl: null,
  stem: 'Show how you would carry out the following conversions, giving reagents and conditions: (a) propene to propan-1-ol; (b) ethanal to propan-2-ol; (c) phenol to 2,4,6-tribromophenol; (d) aniline to phenol; (e) phenol to anisole.',
  model: r`(a) $\ce{B2H6}$, then $\ce{H2O2}$/$\ce{OH-}$ (hydroboration–oxidation).

(b) $\ce{CH3MgBr}$ in dry ether, then $\ce{H3O+}$: $\ce{CH3CHO}$ → $\ce{CH3CH(OH)CH3}$.

(c) Bromine water at room temperature: $\ce{C6H5OH + 3Br2 -> C6H2Br3OH + 3HBr}$.

(d) $\ce{NaNO2}$ + HCl at 273–278 K, then warm with water.

(e) NaOH to give sodium phenoxide, then $\ce{CH3I}$ (Williamson): $\ce{C6H5ONa + CH3I -> C6H5OCH3 + NaI}$.`,
  sol: 'One correct route per conversion.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1], ['(d)', 1], ['(e)', 1]],
  d: 4, c: 'application', t: [2, 3, 5],
}));

// ---------------------------------------------------------------- case-based
add('unknown-case', mk.case({
  passage: 'A student is given three colourless liquids, X, Y and Z, each C₄H₁₀O or C₆H₆O. She records:\n\n| Test | X | Y | Z |\n|---|---|---|---|\n| Sodium metal | Bubbles of gas | Bubbles of gas | No reaction |\n| Bromine water | White precipitate | No change | No change |\n| Lucas reagent (room temperature) | — | Cloudy at once | No change |\n\nOne liquid is phenol, one is 2-methylpropan-2-ol and one is ethoxyethane.',
  d: 3, c: 'analysis',
  children: [
    part('a', mcq({
      stem: 'Which liquid is ethoxyethane?',
      right: 'Z, because it has no O–H group to react with sodium',
      wrong: ['X, because it gives a precipitate with bromine water', 'Y, because it reacts with Lucas reagent', 'It cannot be identified from these tests'],
      sol: 'Ethers have no acidic hydrogen, so no hydrogen is released with sodium — option (@K).',
      d: 2, c: 'application', t: [3, 5],
    })),
    part('b', short({
      marks: 1,
      stem: 'Identify X and give the formula of the precipitate.',
      model: 'X is phenol; the precipitate is 2,4,6-tribromophenol, C₆H₂Br₃OH.',
      sol: 'Activated ring + bromine water.',
      scheme: [['Phenol and tribromophenol', 1]],
      d: 2, c: 'application', t: [3],
    })),
    part('c', short({
      marks: 2,
      stem: 'Explain why Y turns Lucas reagent cloudy at once.',
      model: 'Y is 2-methylpropan-2-ol, a tertiary alcohol. With conc. HCl/ZnCl₂ it readily forms a stable tertiary carbocation, which takes up chloride to give 2-chloro-2-methylpropane. This chloroalkane is insoluble in the reagent, so the mixture turns cloudy immediately.',
      sol: 'Tertiary carbocation forms quickly; insoluble chloride.',
      scheme: [['Y is tertiary; stable carbocation', 1], ['Insoluble chloroalkane causes turbidity', 1]],
      d: 3, c: 'analysis', t: [3],
    }), [
      short({
        marks: 2,
        stem: 'Suggest one further test to confirm the identity of X, and one reason why X dissolves in NaOH solution but Y does not.',
        model: 'Neutral FeCl₃ gives a violet colour with X (phenol). Phenol is acidic enough (pKa 10) to react with NaOH, forming water-soluble sodium phenoxide, because phenoxide is stabilised by resonance; the tertiary alcohol is far too weak an acid to react.',
        sol: 'FeCl₃ test; acidity difference.',
        scheme: [['FeCl₃ violet colour', 1], ['Phenol acidic (resonance-stabilised phenoxide); alcohol not', 1]],
        d: 3, c: 'application', t: [3],
      }),
    ]),
  ],
}));
add('aspirin-case', mk.case({
  passage: r`Salicylic acid, the starting material for aspirin, is made industrially by Kolbe’s reaction. Dry sodium phenoxide is heated with carbon dioxide at about 400 K under 4–7 atm, and the sodium salicylate formed is acidified. A plant chemist calculates the expected yield. (C = 12, H = 1, O = 16, Na = 23)`,
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'Why is sodium phenoxide used rather than phenol itself?',
      right: 'The phenoxide ion is much more strongly activated towards attack by the weak electrophile CO₂.',
      wrong: ['Phenol is a gas at 400 K.', 'Phenol is more acidic than sodium phenoxide.', 'Sodium phenoxide does not contain a benzene ring.'],
      sol: 'The negatively charged O⁻ releases electrons into the ring even more strongly than –OH, enabling attack by CO₂ — option (@K).',
      d: 3, c: 'understanding', t: [3],
    })),
    part('b', num({
      stem: r`What mass of salicylic acid ($\ce{C7H6O3}$, $M = 138$) can be obtained from $11.6\ \text{g}$ of sodium phenoxide ($\ce{C6H5ONa}$, $M = 116\ \text{g mol}^{-1}$), assuming 100% yield?`,
      value: 13.8, tol: 0.1, unit: 'g',
      sol: r`Moles $= \dfrac{11.6}{116} = 0.1$; 1 : 1 ratio, so mass $= 0.1 \times 138 = 13.8$, so $13.8\ \text{g}$.`,
      scheme: [['0.1 mol and 13.8 g', 1]],
      d: 2, c: 'application', t: [3],
    })),
    part('c', short({
      marks: 2,
      stem: 'Write the structure of the product and explain why the new group enters mainly at the ortho position.',
      model: 'The product is 2-hydroxybenzoic acid, with –OH and –COOH on adjacent ring carbons. The phenoxide oxygen activates the ortho and para positions; the ortho product is favoured because the sodium ion holds CO₂ close to the oxygen, directing attack to the neighbouring carbon.',
      sol: 'o/p activation; sodium–CO₂ complexation favours ortho.',
      scheme: [['Correct structure (2-hydroxybenzoic acid)', 1], ['Ortho attack explained', 1]],
      d: 4, c: 'analysis', t: [3],
    }), [
      short({
        marks: 2, wl: null,
        stem: 'The plant obtains 11.0 g of salicylic acid from 11.6 g of sodium phenoxide. Calculate the percentage yield.',
        model: r`Theoretical yield $= 13.8$ g. Percentage yield $= \dfrac{11.0}{13.8} \times 100 \approx 79.7\%$.`,
        sol: 'Actual ÷ theoretical × 100.',
        scheme: [['Uses 13.8 g as theoretical yield', 1], ['≈ 79.7%', 1]],
        d: 3, c: 'application', t: [3],
      }),
    ]),
  ],
}), () => (near((11.6 / 116) * 138, 13.8) && near((11 / 13.8) * 100, 79.7, 0.002)) || 'yield');
add('sanitiser-case', mk.case({
  passage: 'During a flu season, a school laboratory prepares hand sanitiser containing 70% ethanol by volume in water, with a little glycerol to protect the skin. A student asks why the teacher refuses to use methanol, which is cheaper, and why the alcohol and water mix completely.',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'Why do ethanol and water mix in all proportions?',
      right: 'Ethanol molecules form hydrogen bonds with water molecules.',
      wrong: ['Ethanol is an ionic compound.', 'Ethanol and water have the same boiling point.', 'Ethanol reacts with water to form ethanoic acid.'],
      sol: 'The –OH of ethanol both donates and accepts hydrogen bonds with water, and the ethyl group is small — option (@K).',
      d: 1, c: 'understanding', t: [3],
    })),
    part('b', num({
      stem: 'What volume of ethanol, in mL, is needed to prepare 500 mL of the 70% (v/v) sanitiser (ignore the small volume of glycerol and any volume change on mixing)?',
      value: 350, tol: 1, unit: 'mL',
      sol: r`$0.70 \times 500 = 350$, so $350\ \text{mL}$ of ethanol.`,
      scheme: [['350 mL', 1]],
      d: 1, c: 'application', t: [4],
    })),
    part('c', short({
      marks: 2,
      stem: 'Explain why methanol must never be used in hand sanitiser.',
      model: 'Methanol is highly poisonous. It can be absorbed through the skin or swallowed accidentally, and even small amounts can cause blindness or death, because the body converts it into toxic products. Ethanol is far less toxic in these amounts.',
      sol: 'Toxicity of methanol.',
      scheme: [['Methanol is toxic', 1], ['Blindness or death even in small amounts', 1]],
      d: 2, c: 'evaluation', t: [4],
    }), [
      short({
        marks: 2,
        stem: 'Glycerol is propane-1,2,3-triol. Explain why it is much less volatile than ethanol and why it keeps skin moist.',
        model: 'Glycerol has three –OH groups per molecule, so it forms many hydrogen bonds with neighbouring molecules and has a very high boiling point; it hardly evaporates. Its –OH groups also hydrogen-bond strongly to water, holding moisture on the skin.',
        sol: 'Three –OH groups → extensive hydrogen bonding.',
        scheme: [['Many hydrogen bonds, low volatility', 1], ['Holds water by hydrogen bonding', 1]],
        d: 3, c: 'application', t: [1, 3],
      }),
    ]),
  ],
}), () => near(0.7 * 500, 350) || 'volume');
add('biofuel-case', mk.case({
  passage: r`India blends ethanol made from sugarcane molasses into petrol. In a distillery, invertase in yeast converts sucrose into glucose and fructose, and zymase converts these sugars into ethanol and carbon dioxide: $\ce{C6H12O6 -> 2C2H5OH + 2CO2}$. Fermentation stops when the ethanol content reaches about 14%, because higher concentrations kill the yeast. (C = 12, H = 1, O = 16)`,
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'Which enzyme converts glucose into ethanol and carbon dioxide?',
      right: 'Zymase',
      wrong: ['Invertase', 'Diastase', 'Maltase'],
      sol: 'Invertase hydrolyses sucrose; zymase ferments glucose and fructose to ethanol and CO₂ — option (@K).',
      d: 1, c: 'recall', t: [4],
    })),
    part('b', num({
      stem: 'What mass of carbon dioxide, in kilograms, is released when 180 kg of glucose is completely fermented?',
      value: 88, tol: 0.5, unit: 'kg',
      sol: r`180 kg glucose $= 1000$ mol; CO₂ $= 2 \times 1000 = 2000$ mol; mass $= 2000 \times 44 = 88000$ g, that is $88000 \div 1000 = 88$ kg.`,
      scheme: [['2 mol CO₂ per mol glucose; 88 kg', 1]],
      d: 2, c: 'application', t: [4],
    })),
    part('c', short({
      marks: 2,
      stem: 'Why can fermentation alone not give pure ethanol, and how is a higher concentration obtained?',
      model: 'Fermentation stops at about 14% ethanol because higher concentrations kill the yeast. The ethanol is concentrated by fractional distillation, which gives about 95% ethanol (an azeotrope with water); further drying is needed for fuel-grade ethanol.',
      sol: 'Yeast tolerance; distillation (azeotrope).',
      scheme: [['Yeast killed above about 14%', 1], ['Fractional distillation to about 95%', 1]],
      d: 3, c: 'application', t: [4],
    }), [
      short({
        marks: 2,
        stem: 'A newspaper says ethanol from molasses is "carbon-free". Evaluate this claim.',
        model: 'The claim is not accurate. Burning ethanol and fermentation both release CO₂. However, the carbon came from CO₂ recently absorbed by the sugarcane during photosynthesis, so the net addition is smaller than from fossil petrol, apart from emissions from farming and processing. "Lower-carbon" is fairer than "carbon-free".',
        sol: 'CO₂ is released but was recently absorbed by the crop.',
        scheme: [['CO₂ is released in fermentation and burning', 1], ['But recently fixed by sugarcane, so net emission is lower, not zero', 1]],
        d: 4, c: 'evaluation', t: [4],
      }),
    ]),
  ],
}), () => near((180000 / 180) * 2 * 44 / 1000, 88) || 'CO2');
