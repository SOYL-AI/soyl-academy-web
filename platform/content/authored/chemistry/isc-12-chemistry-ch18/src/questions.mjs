// ISC 12 Chemistry ch18 Carboxylic Acids — question bank (ISC style). Stems name their own compounds and data.
// MCQ keys are placed by the builder; AR keys planned: a b c d a. Numericals re-solved.
import { mk, add, r } from './lib.mjs';

const { mcq, ar, tf, fill, match, num, short, long } = mk;
const near = (a, b, rel = 0.005) => Math.abs(a - b) <= Math.max(1e-9, Math.abs(b) * rel);

// ---------------------------------------------------------------- t01 classification, names, physical properties
add('name-mcq', mcq({
  stem: 'Adipic acid, HOOC(CH₂)₄COOH, used to make nylon-6,6, has the IUPAC name:',
  right: 'hexanedioic acid',
  wrong: ['butanedioic acid', 'hexanoic acid', 'pentanedioic acid'],
  sol: 'Six carbons including both COOH carbons — option (@K).',
  d: 1, c: 'application', t: [1],
}));
add('isobut-mcq', mcq({
  stem: 'The IUPAC name of isobutyric acid, (CH₃)₂CHCOOH, is:',
  right: '2-methylpropanoic acid',
  wrong: ['2-methylbutanoic acid', 'butanoic acid', '1-methylpropanoic acid'],
  sol: 'COOH carbon is C-1; methyl on C-2 — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('dimer-mcq', mcq({
  stem: 'Ethanoic acid (M = 60) boils at 391 K, higher than propan-1-ol (M = 60, b.p. 370 K). The main reason is that ethanoic acid:',
  right: 'forms hydrogen-bonded dimers that persist even in the vapour',
  wrong: ['has more hydrogen atoms', 'is non-polar', 'cannot form hydrogen bonds'],
  sol: 'Two hydrogen bonds per pair of molecules — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('oxalic-mcq', mcq({
  stem: 'Oxalic acid, found in spinach and used to remove rust stains, is:',
  right: 'ethanedioic acid, HOOC–COOH',
  wrong: ['methanoic acid', 'propanedioic acid', 'ethanoic acid'],
  sol: 'Option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('sol-tf', tf({
  stem: 'Hexanoic acid is much less soluble in water than ethanoic acid.',
  key: 't',
  sol: 'True. The longer hydrocarbon chain is hydrophobic.',
  d: 1, c: 'understanding', t: [1],
}));
add('dioic-fill', fill({
  stem: 'Succinic acid, HOOC–CH₂–CH₂–COOH, has the IUPAC name butane___ acid.',
  acc: [['dioic']],
  sol: 'Butane**dioic** acid.',
  d: 1, c: 'application', t: [1],
}));
add('name-match', match({
  stem: 'Match each common name of a carboxylic acid with its IUPAC name.',
  pairs: [
    ['Formic acid', 'Methanoic acid'],
    ['Butyric acid', 'Butanoic acid'],
    ['Malonic acid', 'Propanedioic acid'],
    ['Phthalic acid', 'Benzene-1,2-dicarboxylic acid'],
  ],
  order: [2, 0, 3, 1],
  sol: 'Formic = methanoic; butyric = butanoic; malonic = propanedioic; phthalic = benzene-1,2-dicarboxylic acid.',
  d: 1, c: 'recall', t: [1],
}));
add('bp-short', short({
  marks: 2,
  stem: 'Draw (describe) the hydrogen-bonded dimer of ethanoic acid and use it to explain why ethanoic acid boils higher than propan-1-ol.',
  model: 'Two CH₃COOH molecules are joined by two O–H···O=C hydrogen bonds into an eight-membered ring (dimer), effectively doubling the molar mass. The dimer persists even in the vapour, so more energy is needed to boil the acid than propan-1-ol, whose molecules form single, chain-like hydrogen bonds.',
  sol: 'Cyclic dimer with two H-bonds.',
  scheme: [['Dimer description', 1], ['Explanation', 1]],
  d: 2, c: 'understanding', t: [1],
}));

// ---------------------------------------------------------------- t02 preparation
add('prep-mcq', mcq({
  stem: 'Propylbenzene is heated with alkaline KMnO₄ and the mixture is then acidified. The acid obtained is:',
  right: 'benzoic acid',
  wrong: ['3-phenylpropanoic acid', 'propanoic acid', 'phenylethanoic acid'],
  sol: 'The whole side chain is oxidised to –COOH — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('grig-mcq', mcq({
  stem: 'Isopropylmagnesium bromide, (CH₃)₂CHMgBr, is added to solid CO₂ and the product is acidified. The acid formed is:',
  right: '2-methylpropanoic acid',
  wrong: ['butanoic acid', 'propanoic acid', '2-methylbutanoic acid'],
  sol: 'RMgX + CO₂ → RCOOH (one carbon more) — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('nitrile-mcq', mcq({
  stem: 'Which compound gives pentanoic acid on hydrolysis with hot dilute acid?',
  right: 'Pentanenitrile, CH₃(CH₂)₃CN',
  wrong: ['Butanenitrile, CH₃(CH₂)₂CN', '1-Bromopentane', 'Pentan-2-one'],
  sol: 'The CN carbon becomes the COOH carbon — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('oxid-mcq', mcq({
  stem: 'Butan-1-ol is refluxed with excess acidified potassium dichromate. The main organic product is:',
  right: 'butanoic acid',
  wrong: ['butanal', 'butanone', 'but-1-ene'],
  sol: 'Primary alcohol → aldehyde → acid under reflux — option (@K).',
  d: 1, c: 'application', t: [2],
}));
add('carbon-ar', ar({
  a: 'Bromoethane can be converted into propanoic acid by way of a Grignard reagent.',
  r: 'Ethylmagnesium bromide adds to carbon dioxide, introducing one extra carbon atom.',
  key: 'a',
  sol: 'Both are true, and R explains A — option (a).',
  d: 2, c: 'understanding', t: [2],
}));
add('xylene-tf', tf({
  stem: 'Oxidation of 1,4-dimethylbenzene (p-xylene) with KMnO₄ gives benzene-1,4-dicarboxylic acid.',
  key: 't',
  sol: 'True. Both methyl groups are oxidised: terephthalic acid.',
  d: 2, c: 'application', t: [2],
}));
add('grig-num', num({
  marks: 2,
  stem: r`$0.25\ \text{mol}$ of phenylmagnesium bromide reacts completely with excess dry ice, and the product is acidified. What mass of benzoic acid ($M = 122$) is formed?`,
  value: 30.5, tol: 0.1, unit: 'g',
  sol: r`1 : 1 ratio: mass $= 0.25 \times 122 = 30.5\ \text{g}$.`,
  scheme: [['1 : 1', 1], ['30.5 g', 1]],
  d: 2, c: 'application', t: [2],
}), () => near(0.25 * 122, 30.5) || 'mass');
add('prep-short', short({
  marks: 2,
  stem: 'Write equations for preparing benzoic acid from (a) benzonitrile and (b) phenylmagnesium bromide.',
  model: r`(a) $\ce{C6H5CN + 2H2O + HCl -> C6H5COOH + NH4Cl}$. (b) $\ce{C6H5MgBr + CO2 -> C6H5COOMgBr}$; then $\ce{C6H5COOMgBr + H2O ->[H+] C6H5COOH + Mg(OH)Br}$.`,
  sol: 'Hydrolysis; Grignard + CO₂.',
  scheme: [['(a)', 1], ['(b)', 1]],
  d: 2, c: 'application', t: [2],
}));
add('prep-short3', short({
  marks: 3,
  stem: 'Show how butanoic acid can be obtained from (a) butan-1-ol, (b) 1-bromopropane via a nitrile and (c) 1-bromopropane via a Grignard reagent.',
  model: '(a) K₂Cr₂O₇/H₂SO₄, reflux (oxidation). (b) KCN in ethanol → butanenitrile; then hot dilute acid (hydrolysis). (c) Mg in dry ether → propylmagnesium bromide; dry ice, then dilute acid.',
  sol: 'Oxidation; nitrile route; Grignard route.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 2, c: 'application', t: [2],
}));
add('methylbenz-short3', short({
  marks: 3,
  stem: '(a) Why is KMnO₄ unsuitable for converting 4-bromotoluene into 4-methylbenzoic acid? (b) Suggest a suitable route. (c) What would KMnO₄ give?',
  model: '(a) KMnO₄ oxidises the methyl side chain to –COOH. (b) Mg in dry ether to form the Grignard reagent at the C–Br position, then CO₂ and dilute acid: 4-methylbenzoic acid. (c) 4-Bromobenzoic acid.',
  sol: 'Side chain oxidised; Grignard route; 4-bromobenzoic acid.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 3, c: 'analysis', t: [2],
}));

// ---------------------------------------------------------------- t03 acidity
add('acid-mcq', mcq({
  stem: 'Which is the strongest acid: CH₃COOH, ClCH₂COOH, Cl₂CHCOOH or Cl₃CCOOH?',
  right: 'Cl₃CCOOH',
  wrong: ['CH₃COOH', 'ClCH₂COOH', 'Cl₂CHCOOH'],
  sol: 'Three −I chlorines stabilise the carboxylate most (pKa 0.65) — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('distance-mcq', mcq({
  stem: 'Which chlorobutanoic acid is the strongest acid?',
  right: '2-Chlorobutanoic acid',
  wrong: ['3-Chlorobutanoic acid', '4-Chlorobutanoic acid', 'All are equally strong'],
  sol: 'The −I effect is greatest when Cl is nearest to –COOH — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('benz-mcq', mcq({
  stem: 'Which substituted benzoic acid is the weakest acid?',
  right: '4-Methoxybenzoic acid',
  wrong: ['4-Nitrobenzoic acid', '4-Chlorobenzoic acid', 'Benzoic acid'],
  sol: '–OCH₃ at para releases electrons by +R, destabilising the anion (pKa 4.47) — option (@K).',
  d: 3, c: 'application', t: [3],
}));
add('formic-mcq', mcq({
  stem: 'Methanoic acid (pKa 3.75) is stronger than ethanoic acid (pKa 4.76) because:',
  right: 'the methyl group in ethanoic acid releases electrons (+I) and destabilises the ethanoate ion',
  wrong: ['methanoic acid has two oxygen atoms', 'ethanoic acid forms dimers', 'methanoate is not resonance-stabilised'],
  sol: 'Option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('carbox-mcq', mcq({
  stem: 'In the ethanoate ion, the two carbon–oxygen bonds are:',
  right: 'equal in length (about 127 pm), intermediate between C=O and C–O',
  wrong: ['one 121 pm and one 136 pm', 'both 143 pm', 'both 121 pm'],
  sol: 'Two equivalent resonance structures — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('acid-ar', ar({
  a: 'Fluoroethanoic acid is a stronger acid than chloroethanoic acid.',
  r: 'Fluorine is more electronegative than chlorine and has a stronger −I effect.',
  key: 'a',
  sol: 'Both true; R explains A — option (a).',
  d: 2, c: 'understanding', t: [3],
}));
add('phenol-ar', ar({
  a: 'Benzoic acid releases CO₂ from aqueous NaHCO₃, but phenol does not.',
  r: 'Benzoic acid contains a benzene ring.',
  key: 'b',
  sol: 'Both are true, but A is due to the greater stability of the carboxylate (charge on two O atoms), not to the ring, which phenol also has — option (b).',
  d: 3, c: 'analysis', t: [3],
}));
add('ortho-tf', tf({
  stem: '2-Methylbenzoic acid is a stronger acid than benzoic acid, although methyl is an electron-releasing group.',
  key: 't',
  sol: 'True: the ortho effect (pKa 3.91 vs 4.19).',
  d: 3, c: 'understanding', t: [3],
}));
add('ka-num', num({
  marks: 2,
  stem: r`The pKa of chloroethanoic acid is 2.86 and that of ethanoic acid is 4.76. By what factor is the $K_\text{a}$ of chloroethanoic acid larger? Give your answer to the nearest whole number.`,
  value: 79, tol: 1, unit: null,
  sol: r`Ratio $= 10^{(4.76 - 2.86)} = 10^{1.90}$; factor $= 10^{1.90} \approx 79$.`,
  scheme: [['ΔpKa = 1.90', 1], ['≈ 79', 1]],
  d: 3, c: 'application', t: [3],
}), () => near(Math.pow(10, 1.9), 79, 0.01) || 'ratio');
add('acid-short', short({
  marks: 2,
  stem: 'Using resonance, explain why ethanoic acid (pKa 4.76) is a much stronger acid than ethanol (pKa about 16).',
  model: 'In the ethanoate ion the negative charge is delocalised equally over two oxygen atoms (two equivalent resonance structures), stabilising the ion. In the ethoxide ion the charge is localised on one oxygen and is further destabilised by the +I effect of the ethyl group. The more stable the anion, the stronger the acid.',
  sol: 'Carboxylate delocalisation vs localised alkoxide.',
  scheme: [['Carboxylate resonance', 1], ['Ethoxide localised/+I', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('benz-short', short({
  marks: 2,
  stem: 'Arrange benzoic acid, 4-nitrobenzoic acid and 4-methylbenzoic acid in increasing acid strength and explain.',
  model: '4-Methylbenzoic < benzoic < 4-nitrobenzoic. –CH₃ releases electrons (+I, hyperconjugation), destabilising the carboxylate; –NO₂ withdraws electrons (−I, −R), stabilising it.',
  sol: 'Order; electronic effects.',
  scheme: [['Order', 1], ['Explanation', 1]],
  d: 2, c: 'application', t: [3],
}));
add('rank-short3', short({
  marks: 3,
  stem: 'Arrange the following in order of increasing acid strength and explain: CH₃CH₂COOH, CH₃CHClCOOH, ClCH₂CH₂COOH, CH₃CCl₂COOH.',
  model: 'CH₃CH₂COOH < ClCH₂CH₂COOH < CH₃CHClCOOH < CH₃CCl₂COOH. Chlorine’s −I effect stabilises the carboxylate; it is weaker when Cl is on the β-carbon (farther) than on the α-carbon, and two α-chlorines have a greater effect than one. Propanoic acid has no electron-withdrawing group.',
  sol: 'Order with number and distance reasoning.',
  scheme: [['Order', 1], ['Distance effect', 1], ['Number of Cl', 1]],
  d: 4, c: 'analysis', t: [3],
}));
add('effects-short3', short({
  marks: 3,
  stem: 'Explain the effect on the acid strength of benzoic acid of (a) a nitro group at the para position, (b) a methoxy group at the para position and (c) a methyl group at the ortho position.',
  model: '(a) Increases acidity: –NO₂ withdraws electrons by −I and −R, stabilising the carboxylate. (b) Decreases acidity: –OCH₃ releases electrons by +R (outweighing −I) at the para position. (c) Increases acidity (ortho effect): the ortho group forces –COOH out of the ring plane, reducing the ring’s electron donation to it, so the acid is stronger.',
  sol: '−I/−R; +R; ortho effect.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 3, c: 'understanding', t: [3],
}));

// ---------------------------------------------------------------- t04 acid reactions and derivatives
add('deriv-mcq', mcq({
  stem: 'Propanoic acid is treated with thionyl chloride. The organic product is:',
  right: 'propanoyl chloride, CH₃CH₂COCl',
  wrong: ['1-chloropropane', '2-chloropropanoic acid', 'propanoic anhydride'],
  sol: 'SOCl₂ replaces –OH by –Cl — option (@K).',
  d: 1, c: 'application', t: [4],
}));
add('nahco3-mcq', mcq({
  stem: 'Which of these releases carbon dioxide from aqueous sodium hydrogencarbonate: phenol, ethanol, benzoic acid or ethanal?',
  right: 'Benzoic acid',
  wrong: ['Phenol', 'Ethanol', 'Ethanal'],
  sol: 'Only the carboxylic acid is stronger than carbonic acid — option (@K).',
  d: 1, c: 'application', t: [4],
}));
add('anhyd-mcq', mcq({
  stem: 'Ethanoic acid is heated with phosphorus pentoxide. The product is:',
  right: 'ethanoic anhydride',
  wrong: ['ethanoyl chloride', 'ethanamide', 'ethyl ethanoate'],
  sol: 'P₂O₅ removes water from two acid molecules — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('amide-mcq', mcq({
  stem: 'Ammonium propanoate is heated strongly. The organic product is:',
  right: 'propanamide',
  wrong: ['propanenitrile', 'propan-1-amine', 'propanoic anhydride'],
  sol: 'CH₃CH₂COONH₄ → CH₃CH₂CONH₂ + H₂O — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('pcl3-mcq', mcq({
  stem: 'Three moles of ethanoic acid react with one mole of PCl₃. The inorganic by-product is:',
  right: 'phosphorous acid, H₃PO₃',
  wrong: ['POCl₃', 'HCl only', 'P₂O₅'],
  sol: '3CH₃COOH + PCl₃ → 3CH₃COCl + H₃PO₃ — option (@K).',
  d: 2, c: 'recall', t: [4],
}));
add('ester-ar', ar({
  a: 'Esterification of ethanoic acid with ethanol is carried out with concentrated H₂SO₄.',
  r: 'Concentrated H₂SO₄ oxidises ethanol to ethanoic acid.',
  key: 'c',
  sol: 'A is true. R is false: H₂SO₄ acts as catalyst and dehydrating agent — option (c).',
  d: 2, c: 'understanding', t: [4],
}));
add('na-tf', tf({
  stem: 'Carboxylic acids and alcohols both liberate hydrogen with sodium metal.',
  key: 't',
  sol: 'True. Both have an O–H group; only acids also react with NaHCO₃.',
  d: 1, c: 'recall', t: [4],
}));
add('co2-num', num({
  marks: 2,
  stem: r`$12.2\ \text{g}$ of benzoic acid ($M = 122$) reacts completely with excess sodium hydrogencarbonate solution. What volume of CO₂ is released at STP? (Molar volume $22.4\ \text{L}$)`,
  value: 2.24, tol: 0.01, unit: 'L',
  sol: r`$n = 12.2 \div 122 = 0.100\ \text{mol}$; $V = 0.100 \times 22.4 = 2.24\ \text{L}$.`,
  scheme: [['0.100 mol', 1], ['2.24 L', 1]],
  d: 2, c: 'application', t: [4],
}), () => near(0.1 * 22.4, 2.24) || 'v');
add('deriv-short', short({
  marks: 2,
  stem: 'Write equations for the conversion of ethanoic acid into (a) ethanoyl chloride using PCl₅ and (b) ethanamide.',
  model: r`(a) $\ce{CH3COOH + PCl5 -> CH3COCl + POCl3 + HCl}$. (b) $\ce{CH3COOH + NH3 -> CH3COONH4}$; $\ce{CH3COONH4 ->[\Delta] CH3CONH2 + H2O}$.`,
  sol: 'Acid chloride; amide.',
  scheme: [['(a)', 1], ['(b)', 1]],
  d: 2, c: 'application', t: [4],
}));
add('acidrx-short3', short({
  marks: 3,
  stem: 'Write equations for the reaction of propanoic acid with (a) magnesium, (b) sodium carbonate and (c) sodium hydroxide.',
  model: r`(a) $\ce{2CH3CH2COOH + Mg -> (CH3CH2COO)2Mg + H2}$. (b) $\ce{2CH3CH2COOH + Na2CO3 -> 2CH3CH2COONa + H2O + CO2}$. (c) $\ce{CH3CH2COOH + NaOH -> CH3CH2COONa + H2O}$.`,
  sol: 'Three equations.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 2, c: 'application', t: [4],
}));
add('deriv-short3', short({
  marks: 3,
  stem: 'Give the product of benzoic acid with (a) phosphorus pentachloride, (b) methanol and a little conc. H₂SO₄ and (c) ammonia followed by strong heating.',
  model: '(a) Benzoyl chloride, C₆H₅COCl (+ POCl₃ + HCl). (b) Methyl benzoate, C₆H₅COOCH₃. (c) Benzamide, C₆H₅CONH₂.',
  sol: 'Benzoyl chloride; methyl benzoate; benzamide.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 2, c: 'application', t: [4],
}));

// ---------------------------------------------------------------- t05 decarboxylation, Kolbe, HVZ, ring substitution
add('decarb-mcq', mcq({
  stem: 'Sodium butanoate is heated with soda lime. The gas evolved is:',
  right: 'propane',
  wrong: ['butane', 'hexane', 'ethane'],
  sol: 'Loss of CO₂ gives an alkane with one carbon fewer — option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('kolbe-mcq', mcq({
  stem: 'An aqueous solution of potassium propanoate is electrolysed (Kolbe electrolysis). The hydrocarbon formed at the anode is:',
  right: 'butane',
  wrong: ['ethane', 'propane', 'hexane'],
  sol: 'Two ethyl radicals couple after loss of CO₂ — option (@K).',
  d: 3, c: 'application', t: [5],
}));
add('hvz-mcq', mcq({
  stem: 'Butanoic acid is treated with bromine and a little red phosphorus. The product is:',
  right: '2-bromobutanoic acid',
  wrong: ['4-bromobutanoic acid', 'butanoyl bromide only', '1-bromopropane'],
  sol: 'HVZ: α-substitution — option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('ring-mcq', mcq({
  stem: 'Benzoic acid is brominated with Br₂ and FeBr₃. The major product is:',
  right: '3-bromobenzoic acid',
  wrong: ['4-bromobenzoic acid', '2-bromobenzoic acid', 'bromobenzene'],
  sol: '–COOH is meta directing — option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('fc-mcq', mcq({
  stem: 'Benzoic acid does not undergo Friedel–Crafts alkylation because:',
  right: 'the ring is deactivated and the –COOH group complexes with AlCl₃',
  wrong: ['benzoic acid has no hydrogen on the ring', 'it is too volatile', '–COOH is ortho/para directing'],
  sol: 'Option (@K).',
  d: 3, c: 'understanding', t: [5],
}));
add('hvz-ar', ar({
  a: 'Benzoic acid does not undergo the Hell–Volhard–Zelinsky reaction.',
  r: 'Benzoic acid has no α-hydrogen.',
  key: 'a',
  sol: 'Both true; R explains A — option (a).',
  d: 2, c: 'understanding', t: [5],
}));
add('kolbe-ar', ar({
  a: 'Kolbe electrolysis of sodium ethanoate gives methane.',
  r: 'In Kolbe electrolysis, carboxylate ions lose CO₂ at the anode.',
  key: 'd',
  sol: 'A is false: the methyl radicals couple to give ethane. R is true — option (d).',
  d: 3, c: 'analysis', t: [5],
}));
add('sodalime-fill', fill({
  stem: 'Soda lime, used for decarboxylating sodium salts of acids, is a mixture of sodium hydroxide and ___.',
  acc: [['calcium oxide', 'CaO', 'quicklime']],
  sol: '**Calcium oxide** (CaO).',
  d: 1, c: 'recall', t: [5],
}));
add('decarb-num', num({
  marks: 2,
  stem: r`$9.6\ \text{g}$ of sodium propanoate ($M = 96$) is heated with excess soda lime. What volume of ethane is produced at STP? (Molar volume $22.4\ \text{L}$)`,
  value: 2.24, tol: 0.01, unit: 'L',
  sol: r`$\ce{CH3CH2COONa + NaOH -> CH3CH3 + Na2CO3}$: $n = 9.6 \div 96 = 0.100\ \text{mol}$; $V = 0.100 \times 22.4 = 2.24\ \text{L}$.`,
  scheme: [['0.100 mol', 1], ['2.24 L', 1]],
  d: 2, c: 'application', t: [5],
}), () => near((9.6 / 96) * 22.4, 2.24) || 'v');
add('kolbe-num', num({
  marks: 2,
  stem: r`In the Kolbe electrolysis of sodium ethanoate, $\ce{2CH3COONa + 2H2O -> CH3CH3 + 2CO2 + 2NaOH + H2}$. What mass of ethane ($M = 30$) can be formed from $16.4\ \text{g}$ of sodium ethanoate ($M = 82$)?`,
  value: 3.0, tol: 0.02, unit: 'g',
  sol: r`$n(\text{salt}) = 16.4 \div 82 = 0.200\ \text{mol}$; $n(\text{ethane}) = 0.100\ \text{mol}$; mass $= 0.100 \times 30 = 3.0\ \text{g}$.`,
  scheme: [['2 : 1 ratio', 1], ['3.0 g', 1]],
  d: 3, c: 'application', t: [5],
}), () => near(0.1 * 30, 3.0) || 'mass');
add('hvz-short', short({
  marks: 2,
  stem: 'What is the Hell–Volhard–Zelinsky reaction? Write the equation for propanoic acid with bromine.',
  model: r`Carboxylic acids with α-hydrogen react with Cl₂ or Br₂ in the presence of a little red phosphorus to give α-halo acids. $\ce{CH3CH2COOH + Br2 ->[red P] CH3CHBrCOOH + HBr}$ (2-bromopropanoic acid).`,
  sol: 'Definition; equation.',
  scheme: [['Definition', 1], ['Equation', 1]],
  d: 2, c: 'application', t: [5],
}));
add('kolbe-short', short({
  marks: 2,
  stem: 'Explain what happens at the anode during Kolbe electrolysis of aqueous sodium propanoate, and name the hydrocarbon formed.',
  model: 'Propanoate ions lose an electron at the anode to give carboxyl radicals CH₃CH₂COO•, which lose CO₂ to give ethyl radicals; two ethyl radicals combine to form butane, CH₃CH₂CH₂CH₃. (H₂ and NaOH form at the cathode.)',
  sol: 'Oxidation, loss of CO₂, coupling: butane.',
  scheme: [['Anode steps', 1], ['Butane', 1]],
  d: 3, c: 'understanding', t: [5],
}));
add('decarb-short3', short({
  marks: 3,
  stem: 'Name the product when (a) sodium benzoate is heated with soda lime, (b) ethanoic acid is treated with excess chlorine and red phosphorus and (c) benzoic acid is nitrated.',
  model: '(a) Benzene. (b) Trichloroethanoic acid, CCl₃COOH (HVZ, repeated). (c) 3-Nitrobenzoic acid.',
  sol: 'Benzene; CCl₃COOH; 3-nitrobenzoic acid.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 2, c: 'application', t: [5],
}));

// ---------------------------------------------------------------- t06 tests and uses
add('test-mcq', mcq({
  stem: 'Which of methanoic, ethanoic and benzoic acid gives a silver mirror with Tollens’ reagent?',
  right: 'Methanoic acid only',
  wrong: ['Ethanoic acid only', 'Benzoic acid only', 'All three'],
  sol: 'H–COOH contains an aldehyde-like H — option (@K).',
  d: 1, c: 'application', t: [6],
}));
add('fecl3-mcq', mcq({
  stem: 'A neutral solution of a sodium salt gives a buff (pale brown) precipitate with neutral iron(III) chloride. The salt is most likely:',
  right: 'sodium benzoate',
  wrong: ['sodium ethanoate', 'sodium methanoate', 'sodium chloride'],
  sol: 'Benzoate gives buff iron(III) benzoate; ethanoate gives a deep red colour — option (@K).',
  d: 2, c: 'application', t: [6],
}));
add('hgcl2-mcq', mcq({
  stem: 'Methanoic acid is warmed with mercury(II) chloride solution. The observation is:',
  right: 'a white precipitate of Hg₂Cl₂ that may turn grey (Hg)',
  wrong: ['a yellow precipitate of HgO', 'a deep red colour', 'no change'],
  sol: 'Methanoic acid reduces HgCl₂ — option (@K).',
  d: 2, c: 'recall', t: [6],
}));
add('rubber-mcq', mcq({
  stem: 'Which acid is used to coagulate natural rubber latex?',
  right: 'Methanoic acid',
  wrong: ['Benzoic acid', 'Hexanedioic acid', 'Ethanedioic acid'],
  sol: 'Option (@K).',
  d: 1, c: 'recall', t: [6],
}));
add('preserv-fill', fill({
  stem: 'The sodium salt of benzoic acid, used as a food preservative, is sodium ___.',
  acc: [['benzoate']],
  sol: 'Sodium **benzoate**.',
  d: 1, c: 'recall', t: [6],
}));
add('acetic-tf', tf({
  stem: 'A neutral solution of sodium ethanoate gives a deep red colour with neutral iron(III) chloride.',
  key: 't',
  sol: 'True; on boiling a brown-red precipitate forms.',
  d: 1, c: 'recall', t: [6],
}));
add('tollens-num', num({
  marks: 2,
  stem: r`$0.46\ \text{g}$ of methanoic acid ($M = 46$) reduces excess Tollens’ reagent: $\ce{HCOOH + 2[Ag(NH3)2]+ + 2OH- -> 2Ag + CO2 + 2H2O + 4NH3}$. What mass of silver ($M = 108$) is deposited?`,
  value: 2.16, tol: 0.01, unit: 'g',
  sol: r`$n = 0.46 \div 46 = 0.010\ \text{mol}$; $n(\text{Ag}) = 0.020\ \text{mol}$; mass $= 0.020 \times 108 = 2.16\ \text{g}$.`,
  scheme: [['1 : 2', 1], ['2.16 g', 1]],
  d: 3, c: 'application', t: [6],
}), () => near(0.02 * 108, 2.16) || 'mass');
add('test-short', short({
  marks: 2,
  stem: 'Give one chemical test, with observations, to distinguish (a) methanoic acid from ethanoic acid and (b) ethanoic acid from benzoic acid.',
  model: '(a) Tollens’ reagent (or Fehling’s): methanoic acid gives a silver mirror (or red precipitate); ethanoic acid does not. (b) Neutralise and add neutral FeCl₃: ethanoate gives a deep red colour; benzoate gives a buff precipitate.',
  sol: 'Tollens’; neutral FeCl₃.',
  scheme: [['(a)', 1], ['(b)', 1]],
  d: 2, c: 'application', t: [6],
}));
add('uses-short3', short({
  marks: 3,
  stem: 'Give one important use each of (a) methanoic acid, (b) ethanoic acid and (c) benzoic acid or its sodium salt.',
  model: '(a) Coagulating rubber latex (or dyeing, tanning, preserving fruit). (b) Vinegar; making cellulose acetate, acetic anhydride or esters; solvent. (c) Sodium benzoate as a food preservative (or medicines, dyes).',
  sol: 'Three uses.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 1, c: 'recall', t: [6],
}));
add('formic-short3', short({
  marks: 3,
  stem: 'Methanoic acid shows some reactions of aldehydes. (a) Explain why, using its structure. (b) Write the equation for its reaction with HgCl₂. (c) Name one other reagent it reduces.',
  model: r`(a) H–COOH: the carboxyl carbon carries a hydrogen, as in an aldehyde (H–C=O), so it is easily oxidised to CO₂. (b) $\ce{HCOOH + 2HgCl2 -> Hg2Cl2 + CO2 + 2HCl}$. (c) Tollens’ reagent (silver mirror) or Fehling’s solution (red Cu₂O).`,
  sol: 'Aldehyde-like H; HgCl₂ equation; Tollens’.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 3, c: 'understanding', t: [6],
}));

// ---------------------------------------------------------------- long answers
add('prep-long', long({
  stem: '(a) Write equations to prepare propanoic acid from (i) propan-1-ol, (ii) propanenitrile and (iii) ethylmagnesium bromide. [3]\n\n(b) Explain, using hydrogen-bonded dimers, why propanoic acid boils higher than butan-1-ol of similar mass. [2]',
  model: r`(a) (i) $\ce{CH3CH2CH2OH ->[K2Cr2O7/H2SO4][reflux] CH3CH2COOH}$ (skeletal; oxidation). (ii) $\ce{CH3CH2CN + 2H2O + HCl -> CH3CH2COOH + NH4Cl}$. (iii) $\ce{CH3CH2MgBr + CO2 -> CH3CH2COOMgBr}$, then dilute acid gives $\ce{CH3CH2COOH}$.

(b) Two propanoic acid molecules are held together by two hydrogen bonds in a cyclic dimer, which behaves as a larger molecule and persists in the vapour; butan-1-ol forms only single chain hydrogen bonds, so less energy is needed to boil it.`,
  sol: 'Three preparations; dimers.',
  scheme: [['(a)(i)', 1], ['(a)(ii)', 1], ['(a)(iii)', 1], ['(b)', 2]],
  d: 2, c: 'application', t: [1, 2],
}));
add('acid-long', long({
  stem: '(a) Explain why carboxylic acids are stronger acids than phenols. [1½]\n\n(b) Arrange in increasing acid strength and explain: CH₃COOH, ClCH₂COOH, FCH₂COOH, Cl₂CHCOOH. [2]\n\n(c) Explain why 4-nitrobenzoic acid is stronger, and 4-methylbenzoic acid weaker, than benzoic acid. [1½]',
  model: '(a) In the carboxylate ion the negative charge is shared equally by two electronegative oxygen atoms (equivalent resonance structures); in the phenoxide ion it is delocalised onto less electronegative ring carbons, and the structures are not equivalent. So the carboxylate is more stable.\n\n(b) CH₃COOH < ClCH₂COOH < FCH₂COOH < Cl₂CHCOOH. −I groups stabilise the carboxylate; F is more electronegative than Cl; two Cl atoms exert a greater −I effect than one.\n\n(c) –NO₂ withdraws electrons (−I, −R), stabilising the anion; –CH₃ releases electrons (+I, hyperconjugation), destabilising it.',
  sol: 'Carboxylate vs phenoxide; −I order; benzoic substituents.',
  scheme: [['(a)', 1.5], ['(b) Order', 1], ['(b) Reasons', 1], ['(c)', 1.5]],
  d: 3, c: 'analysis', t: [3],
}));
add('react-long', long({
  stem: '(a) Write equations for the formation of (i) ethanoyl chloride with SOCl₂, (ii) ethanoic anhydride and (iii) ethanamide from ethanoic acid. [3]\n\n(b) Write equations for (i) decarboxylation of sodium ethanoate with soda lime and (ii) Kolbe electrolysis of sodium ethanoate. [2]',
  model: r`(a) (i) $\ce{CH3COOH + SOCl2 -> CH3COCl + SO2 + HCl}$. (ii) $\ce{2CH3COOH ->[P2O5][\Delta] (CH3CO)2O + H2O}$. (iii) $\ce{CH3COOH + NH3 -> CH3COONH4}$; $\ce{CH3COONH4 ->[\Delta] CH3CONH2 + H2O}$.

(b) (i) $\ce{CH3COONa + NaOH ->[CaO][\Delta] CH4 + Na2CO3}$. (ii) $\ce{2CH3COONa + 2H2O -> CH3CH3 + 2CO2 + 2NaOH + H2}$.`,
  sol: 'Three derivatives; two decarboxylations.',
  scheme: [['(a)(i)', 1], ['(a)(ii)', 1], ['(a)(iii)', 1], ['(b)(i)', 1], ['(b)(ii)', 1]],
  d: 3, c: 'application', t: [4, 5],
}));
add('hvz-long', long({
  stem: '(a) Describe the HVZ reaction with an equation for propanoic acid. [1½]\n\n(b) Explain why the –COOH group is meta directing, and give the product of nitrating benzoic acid. [2]\n\n(c) How would you distinguish methanoic, ethanoic and benzoic acids by chemical tests? [1½]',
  model: r`(a) Acids with α-H react with Cl₂/Br₂ and a little red P, replacing α-H by halogen: $\ce{CH3CH2COOH + Br2 ->[red P] CH3CHBrCOOH + HBr}$.

(b) –COOH withdraws electrons (−I, −R); for ortho/para attack one resonance form of the σ-complex puts + on the carbon bearing –COOH (destabilised), so meta attack is favoured. Product: 3-nitrobenzoic acid.

(c) Methanoic acid gives a silver mirror with Tollens’ reagent (others do not). Neutral FeCl₃ with the neutralised acids: ethanoate deep red colour; benzoate buff precipitate.`,
  sol: 'HVZ; meta direction; tests.',
  scheme: [['(a)', 1.5], ['(b)', 2], ['(c)', 1.5]],
  d: 3, c: 'understanding', t: [5, 6],
}));
add('ident-long', long({
  stem: 'Compound A, C₂H₄O₂, dissolves in NaHCO₃ with effervescence and gives a deep red colour with neutral FeCl₃ after neutralisation. A reacts with Cl₂/red P to give B, and with ethanol/H₂SO₄ to give a fruity-smelling C. The sodium salt of A, heated with soda lime, gives a gas D.\n\n(a) Identify A, B, C and D. [4]\n\n(b) Write the equation for the formation of C. [1]',
  model: r`(a) A: ethanoic acid, CH₃COOH. B: chloroethanoic acid, ClCH₂COOH. C: ethyl ethanoate, CH₃COOC₂H₅. D: methane, CH₄.

(b) $\ce{CH3COOH + C2H5OH <=>[H+] CH3COOC2H5 + H2O}$.`,
  sol: 'Ethanoic acid; chloroethanoic acid; ethyl ethanoate; methane.',
  scheme: [['A', 1], ['B', 1], ['C', 1], ['D', 1], ['(b)', 1]],
  d: 4, c: 'analysis', t: [4, 5, 6],
}));
