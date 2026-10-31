// ISC 12 Chemistry ch14 Alcohols — question bank (ISC style). Stems name their own compounds and data.
// MCQ keys are placed by the builder; AR keys planned: a d b c a. Numericals re-solved.
import { mk, add, r } from './lib.mjs';

const { mcq, ar, tf, fill, match, num, short, long } = mk;
const near = (a, b, rel = 0.005) => Math.abs(a - b) <= Math.max(1e-9, Math.abs(b) * rel);

// ---------------------------------------------------------------- t01 classification, names, physical properties
add('classify-mcq', mcq({
  stem: 'Pentan-3-ol, CH₃CH₂CH(OH)CH₂CH₃, is classified as a:',
  right: 'secondary alcohol',
  wrong: ['primary alcohol', 'tertiary alcohol', 'dihydric alcohol'],
  sol: 'The C–OH carbon carries two ethyl groups — option (@K).',
  d: 1, c: 'application', t: [1],
}));
add('name-mcq', mcq({
  stem: 'The IUPAC name of isoamyl alcohol, (CH₃)₂CHCH₂CH₂OH, is:',
  right: '3-methylbutan-1-ol',
  wrong: ['2-methylbutan-4-ol', '3-methylbutan-4-ol', '1-hydroxy-3-methylbutane'],
  sol: 'Number from the –OH end to give it locant 1 — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('diol-mcq', mcq({
  stem: 'Propane-1,2-diol, HOCH₂CH(OH)CH₃, used in food colourings, contains:',
  right: 'one primary and one secondary –OH group',
  wrong: ['two primary –OH groups', 'one secondary and one tertiary –OH group', 'two secondary –OH groups'],
  sol: 'C-1 (CH₂OH) is primary; C-2 (CHOH) is secondary — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('formula-mcq', mcq({
  stem: 'The general formula of the saturated, open-chain monohydric alcohols is:',
  right: 'CₙH₂ₙ₊₂O',
  wrong: ['CₙH₂ₙO', 'CₙH₂ₙ₊₁O', 'CₙH₂ₙO₂'],
  sol: 'CₙH₂ₙ₊₁OH = CₙH₂ₙ₊₂O — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('bp-mcq', mcq({
  stem: 'Propan-1-ol, methoxyethane and butane have similar molar masses (58–60). Which has the highest boiling point, and why?',
  right: 'Propan-1-ol, because its molecules form hydrogen bonds with one another',
  wrong: ['Methoxyethane, because it is the most polar', 'Butane, because it has the most hydrogen atoms', 'All boil at about the same temperature'],
  sol: 'Only the alcohol has an O–H group for intermolecular hydrogen bonding — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('sol-mcq', mcq({
  stem: 'Ethanol mixes with water in all proportions, but butan-1-ol is only partly soluble. The reason is that in butan-1-ol:',
  right: 'the larger hydrocarbon part cannot hydrogen-bond with water',
  wrong: ['the –OH group cannot form hydrogen bonds', 'the molecule is ionic', 'the oxygen has no lone pairs'],
  sol: 'The non-polar alkyl chain disrupts water’s hydrogen bonding — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('isomer-tf', tf({
  stem: 'Butan-1-ol and 2-methylpropan-2-ol are functional group isomers.',
  key: 'f',
  sol: 'False. Both are alcohols; they are chain/position isomers. A functional isomer would be an ether such as ethoxyethane.',
  d: 2, c: 'understanding', t: [1],
}));
add('butanol-fill', fill({
  stem: 'The number of structural isomers of C₄H₉OH that are alcohols is ___.',
  acc: [['4', 'four']],
  sol: '**4**: butan-1-ol, butan-2-ol, 2-methylpropan-1-ol and 2-methylpropan-2-ol.',
  d: 2, c: 'application', t: [1],
}));
add('class-match', match({
  stem: 'Match each alcohol with its class.',
  pairs: [
    ['Butan-1-ol', 'Primary'],
    ['Butan-2-ol', 'Secondary'],
    ['2-Methylpropan-2-ol', 'Tertiary'],
    ['Ethane-1,2-diol', 'Dihydric'],
  ],
  order: [2, 0, 3, 1],
  sol: 'Butan-1-ol 1°; butan-2-ol 2°; 2-methylpropan-2-ol 3°; ethane-1,2-diol dihydric.',
  d: 1, c: 'recall', t: [1],
}));
add('name-short', short({
  marks: 2,
  stem: 'Write the structures of (a) 2,2-dimethylpropan-1-ol and (b) 2-methylbutan-2-ol, and classify each alcohol.',
  model: '(a) (CH₃)₃CCH₂OH — primary (the C–OH carbon has one C neighbour). (b) CH₃CH₂C(OH)(CH₃)₂ — tertiary.',
  sol: '1°; 3°.',
  scheme: [['(a)', 1], ['(b)', 1]],
  d: 2, c: 'application', t: [1],
}));
add('bp-short', short({
  marks: 2,
  stem: 'Butan-1-ol boils at 391 K but its isomer 2-methylpropan-2-ol boils at 356 K. Explain.',
  model: 'Both form hydrogen bonds, but 2-methylpropan-2-ol is highly branched and nearly spherical; its smaller surface area gives weaker van der Waals forces and the bulky groups around –OH hinder hydrogen bonding. The unbranched butan-1-ol has stronger intermolecular attractions and boils higher.',
  sol: 'Branching reduces surface area and hinders H-bonding.',
  scheme: [['Both H-bond', 1], ['Branching effect', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('isomer-short3', short({
  marks: 3,
  stem: 'Write the structures and IUPAC names of the four alcohols with formula C₄H₁₀O, and classify each as primary, secondary or tertiary.',
  model: 'CH₃CH₂CH₂CH₂OH, butan-1-ol (1°); CH₃CH₂CH(OH)CH₃, butan-2-ol (2°); (CH₃)₂CHCH₂OH, 2-methylpropan-1-ol (1°); (CH₃)₃COH, 2-methylpropan-2-ol (3°).',
  sol: 'Four alcohols: 1°, 2°, 1°, 3°.',
  scheme: [['Structures', 1], ['Names', 1], ['Classes', 1]],
  d: 2, c: 'application', t: [1],
}));

// ---------------------------------------------------------------- t02 preparation
add('prep-mcq', mcq({
  stem: 'But-1-ene is absorbed in cold concentrated sulphuric acid and the product is boiled with water. The alcohol formed is:',
  right: 'butan-2-ol',
  wrong: ['butan-1-ol', '2-methylpropan-2-ol', 'butane-1,2-diol'],
  sol: 'Indirect hydration follows Markovnikov’s rule — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('hydroboration-mcq', mcq({
  stem: '2-Methylpropene is treated with diborane and then with alkaline hydrogen peroxide. The alcohol formed is:',
  right: '2-methylpropan-1-ol',
  wrong: ['2-methylpropan-2-ol', 'butan-1-ol', 'butan-2-ol'],
  sol: 'Hydroboration–oxidation is anti-Markovnikov: –OH on the CH₂ end — option (@K).',
  d: 3, c: 'application', t: [2],
}));
add('propanal-mcq', mcq({
  stem: 'Propanal is reduced with hydrogen over nickel. The product is:',
  right: 'propan-1-ol',
  wrong: ['propan-2-ol', 'propanoic acid', 'propane'],
  sol: 'Aldehydes are reduced to primary alcohols — option (@K).',
  d: 1, c: 'application', t: [2],
}));
add('amine-mcq', mcq({
  stem: 'Ethanamine is treated with sodium nitrite and dilute hydrochloric acid in the cold. The organic product and the gas evolved are:',
  right: 'ethanol and nitrogen',
  wrong: ['ethanal and ammonia', 'nitroethane and hydrogen', 'ethanol and nitrogen dioxide'],
  sol: 'C₂H₅NH₂ + HNO₂ → C₂H₅OH + N₂ + H₂O — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('grignard-mcq', mcq({
  stem: 'Methylmagnesium iodide is added to propanone and the product is hydrolysed with dilute acid. The alcohol formed is:',
  right: '2-methylpropan-2-ol',
  wrong: ['propan-2-ol', 'butan-2-ol', '2-methylpropan-1-ol'],
  sol: 'Ketone + RMgX → tertiary alcohol — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('hydrolysis-mcq', mcq({
  stem: '1-Bromobutane is warmed with moist silver oxide. The organic product is:',
  right: 'butan-1-ol',
  wrong: ['but-1-ene', 'dibutyl ether', 'butanal'],
  sol: 'Moist Ag₂O acts as a source of OH⁻ — option (@K).',
  d: 1, c: 'application', t: [2],
}));
add('markov-ar', ar({
  a: 'Acid-catalysed hydration of propene gives mainly propan-1-ol.',
  r: 'The reaction proceeds through the more stable secondary carbocation.',
  key: 'd',
  sol: 'A is false: the secondary carbocation leads to propan-2-ol. R is true — option (d).',
  d: 2, c: 'understanding', t: [2],
}));
add('hcho-tf', tf({
  stem: 'Methanal and a Grignard reagent give a secondary alcohol after hydrolysis.',
  key: 'f',
  sol: 'False. Methanal gives a primary alcohol, RCH₂OH.',
  d: 1, c: 'recall', t: [2],
}));
add('grig-num', num({
  marks: 2,
  stem: r`$4.4\ \text{g}$ of ethanal ($M = 44$) reacts with excess methylmagnesium iodide, and the product is hydrolysed. What mass of propan-2-ol ($M = 60$) forms, assuming complete conversion?`,
  value: 6.0, tol: 0.02, unit: 'g',
  sol: r`$n = 4.4 \div 44 = 0.10\ \text{mol}$; mass $= 0.10 \times 60 = 6.0\ \text{g}$.`,
  scheme: [['0.10 mol', 1], ['6.0 g', 1]],
  d: 2, c: 'application', t: [2],
}), () => near((4.4 / 44) * 60, 6.0) || 'mass');
add('hydro-short', short({
  marks: 2,
  stem: 'But-1-ene is converted to an alcohol (a) by absorption in cold conc. H₂SO₄ followed by boiling with water and (b) by hydroboration–oxidation. Name each product and explain the difference.',
  model: '(a) Butan-2-ol: Markovnikov addition — H⁺ adds to C-1, giving the more stable secondary carbocation (alkyl hydrogen sulphate) at C-2. (b) Butan-1-ol: in hydroboration boron adds to the less substituted C-1 and is replaced by –OH (anti-Markovnikov).',
  sol: 'Butan-2-ol vs butan-1-ol.',
  scheme: [['(a) with reason', 1], ['(b) with reason', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('grig-short', short({
  marks: 2,
  stem: 'Show two different combinations of a Grignard reagent and an aldehyde that give butan-2-ol after hydrolysis.',
  model: 'CH₃CH₂MgBr + CH₃CHO (ethanal) → CH₃CH₂CH(OH)CH₃. CH₃MgI + CH₃CH₂CHO (propanal) → CH₃CH(OH)CH₂CH₃. Each adduct is hydrolysed with dilute acid.',
  sol: 'EtMgBr + ethanal; MeMgI + propanal.',
  scheme: [['First combination', 1], ['Second combination', 1]],
  d: 3, c: 'analysis', t: [2],
}));
add('prep-short3', short({
  marks: 3,
  stem: 'Write equations, with conditions, for preparing ethanol from (a) ethene by indirect hydration, (b) bromoethane and (c) ethanamine.',
  model: r`(a) $\ce{CH2=CH2 + H2SO4 -> CH3CH2OSO3H}$; $\ce{CH3CH2OSO3H + H2O ->[\Delta] CH3CH2OH + H2SO4}$. (b) $\ce{CH3CH2Br + KOH(aq) ->[\Delta] CH3CH2OH + KBr}$. (c) $\ce{CH3CH2NH2 + HNO2 -> CH3CH2OH + N2 + H2O}$ (NaNO₂ + HCl, cold).`,
  sol: 'Three routes.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 2, c: 'application', t: [2],
}));
add('reduce-short3', short({
  marks: 3,
  stem: 'Name the alcohol(s) formed when (a) butanal is reduced with H₂/Ni, (b) butanone is reduced with LiAlH₄ and (c) ethyl ethanoate is reduced with LiAlH₄.',
  model: '(a) Butan-1-ol (aldehyde → 1° alcohol). (b) Butan-2-ol (ketone → 2° alcohol). (c) Ethanol only: both the acyl part (→ CH₃CH₂OH) and the ethoxy part give ethanol, 2 mol per mole of ester.',
  sol: 'Butan-1-ol; butan-2-ol; ethanol.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 3, c: 'application', t: [2],
}));

// ---------------------------------------------------------------- t03 manufacture
add('bosch-mcq', mcq({
  stem: 'In the manufacture of methanol from water gas enriched with hydrogen, the catalyst used is:',
  right: 'ZnO–Cr₂O₃',
  wrong: ['Finely divided iron', 'Platinum gauze', 'V₂O₅'],
  sol: 'CO + 2H₂ → CH₃OH over ZnO–Cr₂O₃ at 573–673 K and 200–300 atm — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('invertase-mcq', mcq({
  stem: 'In the fermentation of molasses, the yeast enzyme invertase converts:',
  right: 'sucrose into glucose and fructose',
  wrong: ['glucose into ethanol and carbon dioxide', 'starch into maltose', 'ethanol into ethanoic acid'],
  sol: 'Invertase hydrolyses sucrose; zymase then gives ethanol — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('ferm-num', num({
  marks: 2,
  stem: r`What mass of ethanol ($M = 46$) can be obtained from $34.2\ \text{g}$ of sucrose ($M = 342$) if hydrolysis and fermentation are complete? ($\ce{C12H22O11 + H2O -> 2C6H12O6}$; $\ce{C6H12O6 -> 2C2H5OH + 2CO2}$)`,
  value: 18.4, tol: 0.05, unit: 'g',
  sol: r`$n(\text{sucrose}) = 34.2 \div 342 = 0.100\ \text{mol}$ → 0.200 mol hexose → 0.400 mol ethanol; mass $= 0.400 \times 46 = 18.4\ \text{g}$.`,
  scheme: [['1 : 4 ratio', 1], ['18.4 g', 1]],
  d: 3, c: 'application', t: [3],
}), () => near(0.1 * 4 * 46, 18.4) || 'mass');
add('co-num', num({
  marks: 2,
  stem: r`In the Bosch process, $\ce{CO + 2H2 -> CH3OH}$. What volume of hydrogen at STP is needed to make $16\ \text{g}$ of methanol ($M = 32$)? (Molar volume $22.4\ \text{L}$)`,
  value: 22.4, tol: 0.1, unit: 'L',
  sol: r`$n(\ce{CH3OH}) = 16 \div 32 = 0.50\ \text{mol}$; $n(\ce{H2}) = 1.0\ \text{mol}$; $V = 1.0 \times 22.4 = 22.4\ \text{L}$.`,
  scheme: [['1.0 mol H₂', 1], ['22.4 L', 1]],
  d: 2, c: 'application', t: [3],
}), () => near(0.5 * 2 * 22.4, 22.4) || 'v');
add('bosch-short', short({
  marks: 2,
  stem: 'Outline, with equations, the manufacture of methanol starting from coke and steam.',
  model: r`Steam is passed over red-hot coke (about 1273 K) to give water gas: $\ce{C + H2O -> CO + H2}$. Extra hydrogen is added and the mixture is passed over ZnO–Cr₂O₃ at 573–673 K and 200–300 atm: $\ce{CO + 2H2 -> CH3OH}$.`,
  sol: 'Water gas; catalytic conversion.',
  scheme: [['Water gas equation', 1], ['Methanol step with conditions', 1]],
  d: 2, c: 'recall', t: [3],
}));

// ---------------------------------------------------------------- t04 acidity and reactions
add('acid-mcq', mcq({
  stem: 'Sodium ethoxide dissolved in water gives ethanol and sodium hydroxide. This shows that:',
  right: 'ethanol is a weaker acid than water',
  wrong: ['ethanol is a stronger acid than water', 'ethoxide is a weaker base than hydroxide', 'ethanol is neutral'],
  sol: 'The stronger base (ethoxide) takes a proton from the stronger acid (water) — option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('order-mcq', mcq({
  stem: 'Which order of acid strength is correct for these alcohols?',
  right: 'CH₃OH > CH₃CH₂OH > (CH₃)₂CHOH > (CH₃)₃COH',
  wrong: ['(CH₃)₃COH > (CH₃)₂CHOH > CH₃CH₂OH > CH₃OH', 'CH₃CH₂OH > CH₃OH > (CH₃)₃COH > (CH₃)₂CHOH', 'All are equally acidic'],
  sol: 'More alkyl groups (+I) destabilise the alkoxide more — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('pcl5-mcq', mcq({
  stem: 'A neutral organic liquid gives white fumes when a little phosphorus pentachloride is added. This indicates the presence of:',
  right: 'an –OH group (HCl fumes are released)',
  wrong: ['a C=C double bond', 'a ketone group', 'an ester group'],
  sol: 'ROH + PCl₅ → RCl + POCl₃ + HCl — option (@K).',
  d: 1, c: 'application', t: [4],
}));
add('hx-mcq', mcq({
  stem: 'The order of reactivity of the hydrogen halides with a given alcohol is:',
  right: 'HI > HBr > HCl',
  wrong: ['HCl > HBr > HI', 'HBr > HI > HCl', 'all react equally'],
  sol: 'Acid strength and nucleophilicity of X⁻ increase from Cl to I — option (@K).',
  d: 1, c: 'recall', t: [4],
}));
add('ester-mcq', mcq({
  stem: 'Methanol labelled with oxygen-18 is heated with ethanoic acid and a little conc. H₂SO₄. The ¹⁸O is found:',
  right: 'in the ester, methyl ethanoate',
  wrong: ['in the water formed', 'shared equally between ester and water', 'in the unreacted ethanoic acid'],
  sol: 'The alcohol oxygen attacks the carbonyl carbon and stays in the ester; the acid loses –OH — option (@K).',
  d: 3, c: 'analysis', t: [4],
}));
add('anhydride-mcq', mcq({
  stem: 'Ethanol is warmed with ethanoic anhydride. The products are:',
  right: 'ethyl ethanoate and ethanoic acid',
  wrong: ['ethyl ethanoate and water', 'ethoxyethane and ethanoic acid', 'ethanal and ethanoic acid'],
  sol: '(CH₃CO)₂O + C₂H₅OH → CH₃COOC₂H₅ + CH₃COOH — option (@K).',
  d: 1, c: 'application', t: [4],
}));
add('acid-ar', ar({
  a: 'Ethanol is a weaker acid than water.',
  r: 'The ethyl group has a +I effect that increases electron density on oxygen and destabilises the ethoxide ion.',
  key: 'a',
  sol: 'Both are true, and R explains A — option (a).',
  d: 2, c: 'understanding', t: [4],
}));
add('ester-ar', ar({
  a: 'Acid-catalysed esterification of ethanol with ethanoic acid is reversible.',
  r: 'Concentrated sulphuric acid is a dehydrating agent.',
  key: 'b',
  sol: 'Both are true, but R does not explain why the reaction is reversible (ester hydrolysis is the reverse reaction); it explains why H₂SO₄ improves the yield — option (b).',
  d: 3, c: 'analysis', t: [4],
}));
add('pyridine-tf', tf({
  stem: 'In the acylation of ethanol with ethanoyl chloride, pyridine is added to remove the hydrogen chloride formed.',
  key: 't',
  sol: 'True. Pyridine, a base, neutralises HCl and shifts the equilibrium forward.',
  d: 1, c: 'recall', t: [4],
}));
add('alkoxide-fill', fill({
  stem: 'Ethanol reacts with sodium metal to give hydrogen and sodium ___.',
  acc: [['ethoxide']],
  sol: 'Sodium **ethoxide**, C₂H₅ONa.',
  d: 1, c: 'recall', t: [4],
}));
add('h2-num', num({
  marks: 2,
  stem: r`Sodium is added to $6.0\ \text{g}$ of propan-1-ol ($M = 60$) until no more gas is evolved. Calculate the volume of hydrogen released at STP. (Molar volume $22.4\ \text{L}$)`,
  value: 1.12, tol: 0.01, unit: 'L',
  sol: r`$\ce{2C3H7OH + 2Na -> 2C3H7ONa + H2}$: $n(\ce{H2}) = 0.10 \div 2 = 0.050\ \text{mol}$; $V = 0.050 \times 22.4 = 1.12\ \text{L}$.`,
  scheme: [['0.050 mol H₂', 1], ['1.12 L', 1]],
  d: 2, c: 'application', t: [4],
}), () => near(0.05 * 22.4, 1.12) || 'v');
add('ester-num', num({
  marks: 2,
  stem: r`$0.50\ \text{mol}$ of ethanol is refluxed with excess ethanoic acid and a little conc. H₂SO₄. At equilibrium 67% of the ethanol has been esterified. What mass of ethyl ethanoate ($M = 88$) is present?`,
  value: 29.48, tol: 0.1, unit: 'g',
  sol: r`$n(\text{ester}) = 0.50 \times 0.67 = 0.335\ \text{mol}$; mass $= 0.335 \times 88 = 29.48\ \text{g}$.`,
  scheme: [['0.335 mol', 1], ['29.48 g', 1]],
  d: 3, c: 'application', t: [4],
}), () => near(0.335 * 88, 29.48) || 'mass');
add('acid-short', short({
  marks: 2,
  stem: 'Arrange water, methanol, ethanol and 2-methylpropan-2-ol in order of increasing acid strength, and explain the order.',
  model: '2-Methylpropan-2-ol < ethanol < methanol ≈ water (water slightly stronger than ethanol; methanol about equal to water). Alkyl groups release electrons (+I), increasing negative charge on the alkoxide oxygen and destabilising the ion; the more alkyl groups, the weaker the acid. Bulky groups also hinder solvation of the alkoxide.',
  sol: '3° < 2°… < CH₃OH ≈ H₂O; +I effect.',
  scheme: [['Correct order', 1], ['+I/solvation explanation', 1]],
  d: 3, c: 'analysis', t: [4],
}));
add('ester-short3', short({
  marks: 3,
  stem: 'Give the mechanism of the acid-catalysed esterification of ethanoic acid with ethanol.',
  model: '(1) H⁺ protonates the carbonyl oxygen of CH₃COOH, making the carbonyl carbon more electrophilic. (2) The lone pair on the ethanol oxygen attacks this carbon, giving a tetrahedral intermediate. (3) A proton is transferred to one of the –OH groups. (4) Water leaves, regenerating C=O (protonated). (5) Loss of H⁺ gives ethyl ethanoate and regenerates the catalyst.',
  sol: 'Protonation; attack; proton transfer; loss of water; loss of H⁺.',
  scheme: [['Protonation and attack', 1], ['Proton transfer and loss of water', 1], ['Loss of H⁺, product', 1]],
  d: 3, c: 'understanding', t: [4],
}));
add('acyl-short3', short({
  marks: 3,
  stem: 'Write equations for the reaction of ethanol with (a) ethanoyl chloride, (b) ethanoic anhydride and (c) phosphorus pentachloride, naming the organic products.',
  model: r`(a) $\ce{CH3COCl + C2H5OH -> CH3COOC2H5 + HCl}$: ethyl ethanoate. (b) $\ce{(CH3CO)2O + C2H5OH -> CH3COOC2H5 + CH3COOH}$: ethyl ethanoate and ethanoic acid. (c) $\ce{C2H5OH + PCl5 -> C2H5Cl + POCl3 + HCl}$: chloroethane.`,
  sol: 'Three equations.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 2, c: 'application', t: [4],
}));

// ---------------------------------------------------------------- t05 oxidation and dehydration
add('oxid-mcq', mcq({
  stem: 'Butan-2-ol is warmed with acidified potassium dichromate. The organic product is:',
  right: 'butanone',
  wrong: ['butanal', 'butanoic acid', 'but-1-ene'],
  sol: 'Secondary alcohols are oxidised to ketones — option (@K).',
  d: 1, c: 'application', t: [5],
}));
add('pcc-mcq', mcq({
  stem: 'Which reagent oxidises propan-1-ol to propanal without further oxidation to propanoic acid?',
  right: 'Pyridinium chlorochromate (PCC)',
  wrong: ['Hot acidified KMnO₄', 'Excess acidified K₂Cr₂O₇ under reflux', 'Concentrated HNO₃'],
  sol: 'PCC is a mild oxidant that stops at the aldehyde — option (@K).',
  d: 2, c: 'recall', t: [5],
}));
add('dehyd-mcq', mcq({
  stem: 'At 443 K, excess concentrated sulphuric acid converts ethanol mainly into:',
  right: 'ethene',
  wrong: ['ethoxyethane', 'ethanal', 'ethyl hydrogen sulphate only'],
  sol: 'Intramolecular dehydration at the higher temperature — option (@K).',
  d: 1, c: 'recall', t: [5],
}));
add('mech-mcq', mcq({
  stem: 'The first step in the acid-catalysed dehydration of ethanol is:',
  right: 'protonation of the –OH group to form CH₃CH₂OH₂⁺',
  wrong: ['loss of OH⁻ to form a carbocation', 'loss of H⁺ from the methyl group', 'formation of a free radical'],
  sol: 'Protonation turns –OH into a good leaving group (water) — option (@K).',
  d: 2, c: 'understanding', t: [5],
}));
add('ease-mcq', mcq({
  stem: 'Which of these alcohols is dehydrated most easily by acid: butan-1-ol, butan-2-ol, 2-methylpropan-1-ol or 2-methylpropan-2-ol?',
  right: '2-Methylpropan-2-ol',
  wrong: ['Butan-1-ol', 'Butan-2-ol', '2-Methylpropan-1-ol'],
  sol: 'It forms the most stable (tertiary) carbocation — option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('oxid-ar', ar({
  a: '2-Methylpropan-2-ol is not oxidised by acidified potassium dichromate under mild conditions.',
  r: '2-Methylpropan-2-ol is a primary alcohol.',
  key: 'c',
  sol: 'A is true (no H on the carbinol carbon). R is false: it is a tertiary alcohol — option (c).',
  d: 2, c: 'understanding', t: [5],
}));
add('cu-tf', tf({
  stem: 'When vapours of 2-methylpropan-2-ol are passed over copper at 573 K, a ketone is formed.',
  key: 'f',
  sol: 'False. Tertiary alcohols cannot be dehydrogenated; they are dehydrated to 2-methylpropene.',
  d: 2, c: 'application', t: [5],
}));
add('temp-fill', fill({
  stem: 'Ethanol heated with concentrated sulphuric acid at ___ K, with ethanol in excess, gives mainly ethoxyethane.',
  acc: [['413']],
  sol: '**413** K.',
  d: 1, c: 'recall', t: [5],
}));
add('oxid-num', num({
  marks: 2,
  stem: r`Acidified dichromate oxidises ethanol to ethanoic acid: $\ce{3C2H5OH + 2Cr2O7^2- + 16H+ -> 3CH3COOH + 4Cr^3+ + 11H2O}$. What volume of $0.10\ \text{M}$ K₂Cr₂O₇ is needed to oxidise $0.46\ \text{g}$ of ethanol ($M = 46$)? Give the answer in mL.`,
  value: 66.7, tol: 0.3, unit: 'mL',
  sol: r`$n(\text{ethanol}) = 0.46 \div 46 = 0.010\ \text{mol}$; $n(\ce{Cr2O7^2-}) = 0.010 \times 2 \div 3 \approx 6.67 \times 10^{-3}\ \text{mol}$; $V = 0.010 \times 2 \div 3 \div 0.10 \times 1000 \approx 66.7\ \text{mL}$.`,
  scheme: [['2 : 3 ratio', 1], ['≈ 66.7 mL', 1]],
  d: 4, c: 'application', t: [5],
}), () => near(((0.01 * 2) / 3 / 0.1) * 1000, 66.7, 0.002) || 'v');
add('oxid-short', short({
  marks: 2,
  stem: 'Name the organic product when propan-1-ol is oxidised with (a) pyridinium chlorochromate and (b) excess acidified potassium permanganate.',
  model: '(a) Propanal, CH₃CH₂CHO (PCC stops at the aldehyde). (b) Propanoic acid, CH₃CH₂COOH (strong oxidant oxidises the aldehyde further).',
  sol: 'Propanal; propanoic acid.',
  scheme: [['(a)', 1], ['(b)', 1]],
  d: 2, c: 'application', t: [5],
}));
add('dehyd-short', short({
  marks: 2,
  stem: 'Explain why ethanol heated with conc. H₂SO₄ gives ethene at 443 K but ethoxyethane at 413 K when ethanol is in excess.',
  model: 'At 413 K with excess ethanol, a second ethanol molecule attacks the protonated alcohol (substitution, SN2), giving the ether: intermolecular dehydration. At the higher temperature, 443 K, elimination is favoured: the protonated alcohol loses water and H⁺ to form ethene (intramolecular dehydration).',
  sol: 'Substitution at lower T with excess alcohol; elimination at higher T.',
  scheme: [['413 K: ether by substitution', 1], ['443 K: elimination to ethene', 1]],
  d: 2, c: 'understanding', t: [5],
}));
add('dehyd-short3', short({
  marks: 3,
  stem: 'Give the three steps of the mechanism of the acid-catalysed dehydration of ethanol to ethene.',
  model: r`(1) Protonation: $\ce{CH3CH2OH + H+ -> CH3CH2OH2+}$ (fast). (2) Loss of water to give the ethyl carbocation: $\ce{CH3CH2OH2+ -> CH3CH2+ + H2O}$ (slow). (3) Loss of H⁺ from the adjacent carbon: $\ce{CH3CH2+ -> CH2=CH2 + H+}$; the catalyst is regenerated.`,
  sol: 'Protonation; loss of water; loss of H⁺.',
  scheme: [['Step 1', 1], ['Step 2', 1], ['Step 3', 1]],
  d: 3, c: 'understanding', t: [5],
}));

// ---------------------------------------------------------------- t06 conversions, Lucas test, uses
add('lucas-mcq', mcq({
  stem: 'Three test tubes contain pentan-1-ol, pentan-2-ol and 2-methylbutan-2-ol. On adding ZnCl₂ dissolved in conc. HCl at 298 K, which tube becomes cloudy first?',
  right: 'The tube with 2-methylbutan-2-ol',
  wrong: ['The tube with pentan-1-ol', 'The tube with pentan-2-ol', 'All three at the same time'],
  sol: 'Tertiary alcohols react at once via the stable tertiary carbocation — option (@K).',
  d: 2, c: 'application', t: [6],
}));
add('ascent-mcq', mcq({
  stem: 'Which sequence converts methanol into ethanol?',
  right: 'SOCl₂; Mg in dry ether; methanal, then dilute acid',
  wrong: ['K₂Cr₂O₇/H⁺; NH₃, heat; Br₂/KOH', 'conc. H₂SO₄ at 443 K; H₂O', 'PCl₅; aqueous KOH'],
  sol: 'CH₃OH → CH₃Cl → CH₃MgCl → + HCHO → CH₃CH₂OH — option (@K).',
  d: 2, c: 'application', t: [6],
}));
add('descent-mcq', mcq({
  stem: 'When ethanol is converted into methanol through ethanoic acid, ethanamide and methanamine, the step in which one carbon atom is lost is:',
  right: 'the reaction of ethanamide with bromine and KOH (Hofmann bromamide reaction)',
  wrong: ['the oxidation of ethanol to ethanoic acid', 'the conversion of ethanoic acid into ethanamide', 'the reaction of methanamine with nitrous acid'],
  sol: 'RCONH₂ + Br₂ + 4KOH → RNH₂ + K₂CO₃ + 2KBr + 2H₂O — option (@K).',
  d: 3, c: 'analysis', t: [6],
}));
add('fuel-mcq', mcq({
  stem: 'Which alcohol is blended with petrol in India to reduce oil imports?',
  right: 'Ethanol',
  wrong: ['Methanol', 'Glycerol', 'Ethane-1,2-diol'],
  sol: 'Ethanol from molasses and grain — option (@K).',
  d: 1, c: 'recall', t: [6],
}));
add('lucas-ar', ar({
  a: 'Tertiary alcohols give immediate turbidity with Lucas reagent at room temperature.',
  r: 'Tertiary carbocations are the most stable, so the insoluble chloroalkane forms fastest.',
  key: 'a',
  sol: 'Both are true, and R explains A — option (a).',
  d: 2, c: 'understanding', t: [6],
}));
add('lucas-tf', tf({
  stem: 'Primary alcohols give turbidity with Lucas reagent within about five minutes at room temperature.',
  key: 'f',
  sol: 'False. Primary alcohols give no turbidity at room temperature; secondary alcohols take about five minutes.',
  d: 1, c: 'recall', t: [6],
}));
add('lucas-short', short({
  marks: 2,
  stem: 'Describe the Lucas test and state the observations for pentan-1-ol, pentan-2-ol and 2-methylbutan-2-ol.',
  model: 'The alcohol is shaken with Lucas reagent (anhydrous ZnCl₂ in conc. HCl) at room temperature; a chloroalkane forms, which is insoluble and makes the solution cloudy. 2-Methylbutan-2-ol (3°): cloudy at once. Pentan-2-ol (2°): cloudy in about 5 minutes. Pentan-1-ol (1°): no cloudiness at room temperature.',
  sol: 'Reagent; 3° at once, 2° 5 min, 1° none.',
  scheme: [['Test described', 1], ['Three observations', 1]],
  d: 2, c: 'application', t: [6],
}));
add('ascent-short3', short({
  marks: 3,
  stem: 'Show how propan-1-ol can be converted into butan-1-ol, giving the reagent for each step.',
  model: r`$\ce{CH3CH2CH2OH ->[SOCl2] CH3CH2CH2Cl ->[Mg][dry ether] CH3CH2CH2MgCl}$; then add methanal (HCHO) and hydrolyse with dilute acid: → $\ce{CH3CH2CH2CH2OH}$.`,
  sol: 'Chloride; Grignard; HCHO; hydrolysis.',
  scheme: [['Chloroalkane', 1], ['Grignard reagent', 1], ['HCHO and hydrolysis', 1]],
  d: 3, c: 'application', t: [6],
}));
add('descent-short3', short({
  marks: 3,
  stem: 'Show how ethanol can be converted into methanol, giving reagents and the name of each intermediate.',
  model: r`Oxidise with acidified K₂Cr₂O₇: ethanoic acid. Heat with NH₃ (via ammonium ethanoate): ethanamide, $\ce{CH3CONH2}$. Br₂ + KOH (Hofmann bromamide): methanamine, $\ce{CH3NH2}$. NaNO₂ + HCl (HNO₂): methanol.`,
  sol: 'Acid → amide → amine → alcohol.',
  scheme: [['Oxidation and amide', 1], ['Hofmann step', 1], ['HNO₂ step', 1]],
  d: 3, c: 'application', t: [6],
}));

// ---------------------------------------------------------------- long answers
add('prep-long', long({
  stem: '(a) Show how propene can be converted into (i) propan-2-ol and (ii) propan-1-ol, naming the rule each method follows. [2]\n\n(b) Choose a Grignard reagent and a carbonyl compound to prepare 3-methylpentan-3-ol, and write the equations. [1½]\n\n(c) Outline the manufacture of methanol, with equations. [1½]',
  model: r`(a) (i) $\ce{CH3CH=CH2 + H2O ->[H+] CH3CH(OH)CH3}$ (or via H₂SO₄, then water) — Markovnikov. (ii) $\ce{CH3CH=CH2 ->[(i) B2H6][(ii) H2O2/OH-] CH3CH2CH2OH}$ — anti-Markovnikov.

(b) Ethylmagnesium bromide with butanone: $\ce{CH3CH2MgBr + CH3COCH2CH3 -> (CH3CH2)2C(CH3)OMgBr}$; hydrolysis with dilute acid gives $\ce{(CH3CH2)2C(OH)CH3}$, 3-methylpentan-3-ol.

(c) $\ce{C + H2O -> CO + H2}$ (water gas); $\ce{CO + 2H2 ->[ZnO-Cr2O3][573-673 K, 200-300 atm] CH3OH}$.`,
  sol: 'Hydration vs hydroboration; EtMgBr + butanone; Bosch.',
  scheme: [['(a)(i)', 1], ['(a)(ii)', 1], ['(b)', 1.5], ['(c)', 1.5]],
  d: 3, c: 'application', t: [2, 3],
}));
add('react-long', long({
  stem: '(a) Explain why alcohols are weaker acids than water, and write the equation for the reaction of propan-1-ol with sodium. [1½]\n\n(b) Give the mechanism of the acid-catalysed reaction between ethanoic acid and ethanol. [2]\n\n(c) Compare the reactions of ethanol with PCl₅ and with SOCl₂, and state which is preferred for preparing chloroethane and why. [1½]',
  model: r`(a) The alkyl group releases electrons (+I), destabilising the alkoxide ion, so the alcohol loses H⁺ less readily than water. $\ce{2CH3CH2CH2OH + 2Na -> 2CH3CH2CH2ONa + H2}$.

(b) Protonation of the acid C=O; attack by the ethanol oxygen on the carbonyl carbon; proton transfer; loss of water; loss of H⁺ to give ethyl ethanoate.

(c) $\ce{C2H5OH + PCl5 -> C2H5Cl + POCl3 + HCl}$; $\ce{C2H5OH + SOCl2 -> C2H5Cl + SO2 + HCl}$. SOCl₂ is preferred: its by-products are gases and escape, leaving pure chloroethane, whereas POCl₃ (liquid) must be separated.`,
  sol: '+I effect; ester mechanism; SOCl₂ preferred.',
  scheme: [['(a)', 1.5], ['(b) Mechanism', 2], ['(c)', 1.5]],
  d: 3, c: 'understanding', t: [4],
}));
add('oxdeh-long', long({
  stem: '(a) Three isomeric alcohols P, Q and R have the formula C₄H₁₀O. With acidified dichromate, P gives an aldehyde and then an acid, Q gives a ketone and R is not oxidised. Suggest structures for P, Q and R and name the oxidation products of P and Q. [2]\n\n(b) Give the mechanism of the acid-catalysed dehydration of ethanol to ethene. [2]\n\n(c) What is formed when ethanol is heated with conc. H₂SO₄ at 413 K? [1]',
  model: r`(a) P: butan-1-ol, CH₃CH₂CH₂CH₂OH (or 2-methylpropan-1-ol) → butanal → butanoic acid. Q: butan-2-ol, CH₃CH₂CH(OH)CH₃ → butanone. R: 2-methylpropan-2-ol, (CH₃)₃COH (tertiary, no H on the carbinol carbon).

(b) $\ce{CH3CH2OH + H+ -> CH3CH2OH2+}$; $\ce{CH3CH2OH2+ -> CH3CH2+ + H2O}$ (slow); $\ce{CH3CH2+ -> CH2=CH2 + H+}$.

(c) Ethoxyethane (diethyl ether), $\ce{C2H5OC2H5}$, with ethanol in excess.`,
  sol: 'P 1°, Q 2°, R 3°; three-step mechanism; ether.',
  scheme: [['(a) P, Q, R', 1.5], ['(a) Products', 0.5], ['(b)', 2], ['(c)', 1]],
  d: 4, c: 'analysis', t: [5],
}));
add('conv-long', long({
  stem: '(a) Show how methanol can be converted into ethanol. [2]\n\n(b) Show how propan-1-ol can be converted into ethanol. [2]\n\n(c) How would you distinguish propan-2-ol from 2-methylpropan-2-ol by the Lucas test? [1]',
  model: r`(a) $\ce{CH3OH ->[SOCl2] CH3Cl ->[Mg][dry ether] CH3MgCl}$; + HCHO, then dilute acid → $\ce{CH3CH2OH}$.

(b) $\ce{CH3CH2CH2OH ->[K2Cr2O7/H+] CH3CH2COOH ->[NH3][\Delta] CH3CH2CONH2 ->[Br2/KOH] CH3CH2NH2 ->[HNO2] CH3CH2OH}$.

(c) With Lucas reagent at room temperature, 2-methylpropan-2-ol (3°) turns cloudy at once; propan-2-ol (2°) takes about 5 minutes.`,
  sol: 'Ascent via Grignard; descent via Hofmann; Lucas.',
  scheme: [['(a)', 2], ['(b)', 2], ['(c)', 1]],
  d: 3, c: 'application', t: [6],
}));
add('uses-long', long({
  stem: '(a) Write equations for the production of ethanol from sucrose by fermentation, naming the enzymes. [2]\n\n(b) Give two uses of methanol and explain why it must never be drunk. [1½]\n\n(c) Give a chemical test to distinguish ethanol from methanol. [1½]',
  model: r`(a) $\ce{C12H22O11 + H2O ->[invertase] C6H12O6 + C6H12O6}$ (glucose + fructose); $\ce{C6H12O6 ->[zymase] 2C2H5OH + 2CO2}$.

(b) Uses: solvent for paints and varnishes; manufacture of methanal; fuel. It is very poisonous: it is oxidised in the body to methanal and methanoic acid, causing blindness and death.

(c) Iodoform test: warm with I₂ and NaOH; ethanol gives a yellow precipitate of CHI₃, methanol does not.`,
  sol: 'Invertase, zymase; uses and toxicity; iodoform test.',
  scheme: [['(a)', 2], ['(b)', 1.5], ['(c)', 1.5]],
  d: 2, c: 'understanding', t: [3, 6],
}));
