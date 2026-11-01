// ICSE 10 Chemistry ch15 Alcohols and Carboxylic Acids — question bank (ICSE 2027 specimen style: objective items,
// 1-mark equations/observations/names, bracket completions, matches and 10-mark structured questions). Stems name
// their own compounds and data. MCQ keys are placed by the builder; AR keys planned: a c b d a.
import { mk, add, r } from './lib.mjs';

const { mcq, ar, tf, fill, match, num, short, long } = mk;

// ---------------------------------------------------------------- t01 ethanol: preparation and physical properties
add('hydrolysis-mcq', mcq({
  stem: 'The alkyl halide C₂H₅Br is hydrolysed by heating it with water in which sodium hydroxide is dissolved. Which organic compound forms?',
  right: 'ethanol',
  wrong: ['ethene', 'ethane', 'ethanoic acid'],
  sol: 'In water, OH⁻ replaces Br (hydrolysis): C₂H₅Br + NaOH → C₂H₅OH + NaBr — option (@K).',
  d: 1, c: 'application', t: [1],
}));
add('mix-mcq', mcq({
  stem: 'A student adds 10 cm³ of ethanol to 10 cm³ of water in a test tube and shakes it. What does she observe?',
  right: 'A single clear liquid, because ethanol is miscible with water',
  wrong: ['Two layers, with ethanol at the bottom', 'Two layers, with ethanol on top', 'A white precipitate'],
  sol: 'Ethanol mixes with water in all proportions, so no layers form — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('bp-mcq', mcq({
  stem: 'Which temperature is closest to the boiling point of ethanol at normal pressure?',
  right: '78 °C',
  wrong: ['100 °C', '118 °C', '35 °C'],
  sol: 'Ethanol boils at 78 °C (water at 100 °C, ethanoic acid at 118 °C) — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('hydrolysis-ar', ar({
  a: 'Bromoethane gives ethanol when boiled with aqueous potassium hydroxide.',
  r: 'In aqueous solution, the hydroxide ion takes the place of the bromine atom in bromoethane.',
  key: 'a',
  sol: 'Both are true, and R explains how the –OH group of ethanol comes to replace Br — option (a).',
  d: 2, c: 'understanding', t: [1],
}));
add('neutral-tf', tf({
  stem: 'Ethanol turns blue litmus red because its molecule contains a hydroxyl group.',
  key: 'f',
  sol: 'False: ethanol does not ionise to give H⁺ ions in water, so it is neutral to litmus.',
  d: 2, c: 'understanding', t: [1],
}));
add('density-fill', fill({
  stem: 'Ethanol, with a density of 0.79 g cm⁻³, is ___ (lighter / heavier) than water.',
  acc: [['lighter']],
  sol: '**Lighter** (water has a density of 1.00 g cm⁻³).',
  d: 1, c: 'recall', t: [1],
}));
add('hydrolysis-short1', short({
  marks: 1,
  stem: 'Write a balanced equation for the preparation of ethanol from bromoethane, stating the condition.',
  model: r`$\ce{C2H5Br + NaOH ->[{aqueous, boil}] C2H5OH + NaBr}$ (boiled with aqueous sodium hydroxide).`,
  sol: 'Hydrolysis.',
  scheme: [['Balanced equation with aqueous alkali', 1]],
  d: 1, c: 'recall', t: [1],
}));
add('phys-short2', short({
  marks: 2,
  stem: '(a) State two physical properties of ethanol other than its colour. (b) Give a reason why ethanol dissolves in water in all proportions.',
  model: '(a) Any two: it is a volatile liquid with a pleasant smell; it boils at 78 °C; it is lighter than water (0.79 g cm⁻³); it is neutral to litmus. (b) The –OH group of ethanol forms hydrogen bonds with water molecules.',
  sol: 'Two properties; hydrogen bonding.',
  scheme: [['(a)', 1], ['(b)', 1]],
  d: 2, c: 'understanding', t: [1],
}));

// ---------------------------------------------------------------- t02 chemical properties of ethanol
add('sodium-mcq', mcq({
  stem: 'A small piece of sodium is dropped into dry ethanol in a test tube. The gas given off and the other product are:',
  right: 'hydrogen and sodium ethoxide',
  wrong: ['oxygen and sodium hydroxide', 'hydrogen and sodium hydroxide', 'carbon dioxide and sodium ethanoate'],
  sol: '2C₂H₅OH + 2Na → 2C₂H₅ONa + H₂ — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('flame-mcq', mcq({
  stem: 'A spirit lamp burns ethanol in plenty of air. The flame and the products are:',
  right: 'a blue, non-sooty flame, giving carbon dioxide and water',
  wrong: ['a yellow, sooty flame, giving carbon and water', 'a green flame, giving carbon monoxide only', 'no flame, because ethanol does not burn'],
  sol: 'C₂H₅OH + 3O₂ → 2CO₂ + 3H₂O with a clean blue flame — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('dehydr-mcq', mcq({
  stem: 'Which reagent and condition convert ethanol into ethene?',
  right: 'Excess concentrated sulphuric acid at about 170 °C',
  wrong: ['Aqueous sodium hydroxide at room temperature', 'Sodium metal at room temperature', 'Ethanoic acid with a few drops of concentrated sulphuric acid, warmed'],
  sol: 'Excess conc. H₂SO₄ removes water at about 170 °C; the last option gives an ester instead — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('ester-mcq', mcq({
  stem: 'Ethanol is warmed with ethanoic acid and a few drops of concentrated sulphuric acid, and the mixture is poured into water. The product noticed has:',
  right: 'a fruity smell, and is ethyl ethanoate',
  wrong: ['a pungent smell, and is ethene', 'a fruity smell, and is methyl methanoate', 'a vinegar smell, and is sodium ethanoate'],
  sol: 'Esterification gives the ester ethyl ethanoate, CH₃COOC₂H₅, with a sweet fruity smell — option (@K).',
  d: 2, c: 'application', t: [2, 5],
}));
add('sodium-ar', ar({
  a: 'Ethanol reacts with sodium to give off hydrogen.',
  r: 'Ethanol is a strong acid that turns blue litmus red.',
  key: 'c',
  sol: 'A is true (sodium replaces the H of –OH). R is false: ethanol is neutral to litmus — option (c).',
  d: 2, c: 'understanding', t: [1, 2],
}));
add('reversible-tf', tf({
  stem: 'The reaction between ethanol and ethanoic acid to form ethyl ethanoate is reversible.',
  key: 't',
  sol: 'True: CH₃COOH + C₂H₅OH ⇌ CH₃COOC₂H₅ + H₂O; conc. H₂SO₄ removes water and helps more ester form.',
  d: 2, c: 'recall', t: [2],
}));
add('sodium-short1', short({
  marks: 1,
  stem: 'Write a balanced equation for the reaction of ethanol with sodium.',
  model: r`$\ce{2C2H5OH + 2Na -> 2C2H5ONa + H2}$`,
  sol: 'Sodium ethoxide and hydrogen.',
  scheme: [['Balanced equation', 1]],
  d: 1, c: 'application', t: [2],
}));
add('fuel-short1', short({
  marks: 1,
  stem: 'Ethanol is blended with petrol as a vehicle fuel. Write the balanced equation for ethanol burning in excess air.',
  model: r`$\ce{C2H5OH + 3O2 -> 2CO2 + 3H2O}$`,
  sol: 'Complete combustion.',
  scheme: [['Balanced equation', 1]],
  d: 1, c: 'application', t: [2],
}));
add('esterify-short1', short({
  marks: 1,
  stem: 'Write a balanced equation for the reaction of ethanol with ethanoic acid, and name the catalyst.',
  model: r`$\ce{C2H5OH + CH3COOH <=>[{conc. H2SO4}] CH3COOC2H5 + H2O}$; catalyst: concentrated sulphuric acid.`,
  sol: 'Esterification.',
  scheme: [['Equation and catalyst', 1]],
  d: 1, c: 'application', t: [2],
}));
add('pea-short1', short({
  marks: 1,
  stem: 'A pea-sized piece of sodium is placed in 5 cm³ of dry ethanol. State what you would see.',
  model: 'Brisk effervescence (bubbles of hydrogen) as the sodium slowly dissolves; the gas burns with a pop.',
  sol: 'Effervescence.',
  scheme: [['Effervescence of a gas', 1]],
  d: 1, c: 'application', t: [2],
}));
add('convert-short2', short({
  marks: 2,
  stem: 'Write balanced equations, with conditions, for the conversion of ethanol into (a) ethene and (b) ethyl ethanoate.',
  model: r`(a) $\ce{C2H5OH ->[{conc. H2SO4, 170 °C}] C2H4 + H2O}$ (b) $\ce{C2H5OH + CH3COOH <=>[{conc. H2SO4}] CH3COOC2H5 + H2O}$ (warm with a few drops of concentrated sulphuric acid).`,
  sol: 'Dehydration; esterification.',
  scheme: [['(a)', 1], ['(b)', 1]],
  d: 2, c: 'application', t: [2],
}));
add('h2vol-num', num({
  stem: '4.6 g of ethanol reacts completely with excess sodium. Calculate the volume of hydrogen produced at STP. (C = 12, H = 1, O = 16; 1 mole of a gas occupies 22.4 litres at STP)',
  value: 1.12, tol: 0.01, unit: 'L',
  sol: r`$\ce{2C2H5OH + 2Na -> 2C2H5ONa + H2}$. Molar mass of ethanol $= 2 \times 12 + 6 \times 1 + 16 = 46$ g, so moles $= \frac{4.6}{46} = 0.1$. Moles of hydrogen $= \frac{0.1}{2} = 0.05$. Volume $= 0.05 \times 22.4 = 1.12$ litres.`,
  scheme: [['0.1 mol ethanol, 0.05 mol H₂', 0.5], ['1.12 L', 0.5]],
  d: 3, c: 'analysis', t: [2],
}), () => Math.abs((4.6 / 46 / 2) * 22.4 - 1.12) < 1e-9 || 'volume');
add('o2vol-num', num({
  stem: 'Calculate the volume of oxygen at STP needed to burn 4.6 g of ethanol completely. (C = 12, H = 1, O = 16; 1 mole of a gas occupies 22.4 litres at STP)',
  value: 6.72, tol: 0.02, unit: 'L',
  sol: r`$\ce{C2H5OH + 3O2 -> 2CO2 + 3H2O}$. Moles of ethanol $= \frac{4.6}{46} = 0.1$; moles of oxygen $= 0.1 \times 3 = 0.3$. Volume $= 0.3 \times 22.4 = 6.72$ litres.`,
  scheme: [['0.3 mol O₂', 0.5], ['6.72 L', 0.5]],
  d: 3, c: 'application', t: [2],
}), () => Math.abs((4.6 / 46) * 3 * 22.4 - 6.72) < 1e-9 || 'volume');
add('identify-short3', short({
  marks: 3,
  stem: 'A neutral organic liquid X, C₂H₆O, boils at 78 °C, mixes completely with water and gives a gas with sodium. (a) Identify X and draw its structural formula. (b) Write the balanced equation for its reaction with sodium. (c) Name the organic product formed when X is heated with excess concentrated sulphuric acid at about 170 °C.',
  model: r`(a) Ethanol, CH₃–CH₂–OH (two carbons; three H on C1, two H and –OH on C2). (b) $\ce{2C2H5OH + 2Na -> 2C2H5ONa + H2}$ (c) Ethene, C₂H₄.`,
  sol: 'Ethanol; sodium equation; ethene.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 3, c: 'analysis', t: [1, 2],
}));

// ---------------------------------------------------------------- t03 denatured, methylated and spurious alcohol; uses
add('denature-mcq', mcq({
  stem: 'Ethanol supplied to factories is usually denatured before sale. The main reason is:',
  right: 'to stop its misuse as a drink, because industrial ethanol is sold without the tax charged on liquor',
  wrong: ['to make it burn with a hotter flame', 'to raise its boiling point', 'to make it a better solvent'],
  sol: 'Denaturing makes cheap industrial ethanol unfit to drink — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('methanol-mcq', mcq({
  stem: 'Illicit (spurious) liquor sometimes causes blindness and death because it is contaminated with:',
  right: 'methanol',
  wrong: ['ethanoic acid', 'water', 'sugar'],
  sol: 'Methanol is oxidised in the body to methanal and methanoic acid, which damage the optic nerve — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('thermo-mcq', mcq({
  stem: 'Thermometers used in places where the temperature falls to −50 °C contain coloured ethanol rather than water because ethanol:',
  right: 'freezes only at about −114 °C',
  wrong: ['boils at a higher temperature than water', 'is denser than water', 'does not expand on heating'],
  sol: 'Water would freeze at 0 °C; ethanol stays liquid far below −50 °C — option (@K).',
  d: 3, c: 'analysis', t: [3],
}));
add('denature-ar', ar({
  a: 'Denatured alcohol must not be drunk.',
  r: 'Ethanol is a good solvent for many organic compounds.',
  key: 'b',
  sol: 'Both are true, but R does not explain A: denatured alcohol is unfit to drink because poisons such as methanol and pyridine have been added — option (b).',
  d: 2, c: 'understanding', t: [3],
}));
add('methylated-tf', tf({
  stem: 'Methylated spirit is ethanol to which methanol has been added.',
  key: 't',
  sol: 'True: it is ethanol denatured mainly with methanol (often with a dye), so it is poisonous.',
  d: 1, c: 'recall', t: [3],
}));
add('denature-fill', fill({
  stem: 'Industrial ethanol to which methanol, pyridine and a colouring agent have been added, so that it is unfit to drink, is called ___ alcohol.',
  acc: [['denatured', 'methylated']],
  sol: '**Denatured** alcohol (methylated spirit when methanol is the main additive).',
  d: 1, c: 'recall', t: [3],
}));
add('methanol-short1', short({
  marks: 1,
  stem: 'Name the poisonous alcohol that is often present in spurious liquor.',
  model: 'Methanol (methyl alcohol), CH₃OH.',
  sol: 'Methanol.',
  scheme: [['Methanol', 1]],
  d: 1, c: 'recall', t: [3],
}));
add('uses-short1', short({
  marks: 1,
  stem: 'Give two uses of ethanol.',
  model: 'Any two: solvent for medicines, perfumes and varnishes; fuel (blended with petrol); antiseptic or hand sanitiser; thermometer liquid; making ethanoic acid or esters.',
  sol: 'Two uses.',
  scheme: [['Two correct uses', 1]],
  d: 1, c: 'recall', t: [3],
}));
add('spurious-short2', short({
  marks: 2,
  stem: '(a) What is spurious alcohol? (b) Why is drinking it dangerous?',
  model: '(a) Liquor made or sold illegally, often mixed with cheap methanol. (b) Methanol is changed in the body into methanal and methanoic acid, which damage the optic nerve and other organs, causing blindness and even death.',
  sol: 'Definition; methanol poisoning.',
  scheme: [['(a)', 1], ['(b)', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('use-match', match({
  stem: 'Match each property of ethanol in Column A with a use that depends on it in Column B.',
  pairs: [
    ['Very low freezing point', 'Liquid in thermometers for very cold places'],
    ['Dissolves many organic substances', 'Making tinctures and cough syrups'],
    ['Burns with a clean, hot flame', 'Fuel blended with petrol'],
    ['Kills microbes', 'Hand sanitiser'],
  ],
  order: [1, 3, 0, 2],
  sol: 'Low freezing point → thermometers; good solvent → tinctures and syrups; clean flame → fuel; kills microbes → sanitiser.',
  d: 2, c: 'application', t: [3],
}));

// ---------------------------------------------------------------- t04 ethanoic acid: structure, physical properties, glacial
add('structure-mcq', mcq({
  stem: 'In the structural formula of ethanoic acid, CH₃COOH, how many oxygen atoms are bonded to the carboxyl carbon, and by what kind of bonds?',
  right: 'Two: one by a double bond and one by a single bond',
  wrong: ['One, by a double bond', 'Two, both by double bonds', 'Three, all by single bonds'],
  sol: 'The carboxyl group is –C(=O)–OH: one C=O and one C–OH — option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('glacial-mcq', mcq({
  stem: 'A bottle of pure ethanoic acid left in an unheated laboratory on a winter morning at 10 °C is found to contain ice-like crystals. This is because:',
  right: 'pure ethanoic acid freezes at about 17 °C',
  wrong: ['water vapour from the air has frozen inside the bottle', 'the acid has reacted with the glass', 'pure ethanoic acid boils at about 17 °C'],
  sol: 'The melting point of pure (glacial) ethanoic acid is about 17 °C, above 10 °C — option (@K).',
  d: 3, c: 'analysis', t: [4],
}));
add('vinegar-mcq', mcq({
  stem: 'Table vinegar is best described as:',
  right: 'a dilute solution (about 5–8 per cent) of ethanoic acid in water',
  wrong: ['pure ethanoic acid', 'a dilute solution of ethanol in water', 'a solution of ethyl ethanoate in water'],
  sol: 'Option (@K).',
  d: 1, c: 'recall', t: [4],
}));
add('glacial-ar', ar({
  a: 'Pure ethanoic acid is called glacial acetic acid.',
  r: 'Pure ethanoic acid freezes at about 17 °C into colourless crystals that look like ice.',
  key: 'a',
  sol: 'Both are true, and R explains the name in A — option (a).',
  d: 2, c: 'understanding', t: [4],
}));
add('bpacid-tf', tf({
  stem: 'Ethanoic acid has a lower boiling point than ethanol.',
  key: 'f',
  sol: 'False: ethanoic acid boils at 118 °C and ethanol at 78 °C.',
  d: 2, c: 'recall', t: [4],
}));
add('glacial-short1', short({
  marks: 1,
  stem: 'Explain why pure ethanoic acid is called glacial acetic acid.',
  model: 'Pure (water-free) ethanoic acid freezes at about 17 °C; in cold weather it forms colourless, ice-like crystals, like a glacier.',
  sol: 'Freezes at about 17 °C.',
  scheme: [['Freezes at about 17 °C into ice-like solid', 1]],
  d: 1, c: 'understanding', t: [4],
}));
add('struct-short1', short({
  marks: 1,
  stem: 'Draw the structural formula of ethanoic acid, showing all bonds.',
  model: 'CH₃–COOH drawn in full: a carbon with three H atoms joined to a second carbon, which is joined to one O by a double bond and to an O–H group by a single bond.',
  sol: 'Displayed formula.',
  scheme: [['All bonds correct', 1]],
  d: 1, c: 'application', t: [4],
}));
add('compare-short2', short({
  marks: 2,
  stem: 'Give two differences in physical properties between ethanol and ethanoic acid.',
  model: 'Any two: ethanol has a pleasant smell, ethanoic acid a pungent vinegar smell; ethanol boils at 78 °C, ethanoic acid at 118 °C; ethanol freezes at about −114 °C, pure ethanoic acid at about 17 °C; ethanol is lighter than water, ethanoic acid slightly heavier.',
  sol: 'Two differences.',
  scheme: [['First difference', 1], ['Second difference', 1]],
  d: 2, c: 'analysis', t: [1, 4],
}));

// ---------------------------------------------------------------- t05 chemical properties and uses of ethanoic acid
add('litmus-mcq', mcq({
  stem: 'Moist blue litmus paper is dipped separately into ethanoic acid and into ethanol. The result is:',
  right: 'only ethanoic acid turns it red',
  wrong: ['both turn it red', 'only ethanol turns it red', 'neither changes its colour'],
  sol: 'Ethanoic acid gives H⁺ ions in water; ethanol is neutral — option (@K).',
  d: 1, c: 'application', t: [5],
}));
add('weak-mcq', mcq({
  stem: 'Dilute hydrochloric acid and dilute ethanoic acid of the same concentration are tested with universal indicator. Ethanoic acid shows a higher pH because it:',
  right: 'ionises only partly in water, giving fewer hydrogen ions',
  wrong: ['contains no hydrogen atoms', 'is a base', 'ionises completely in water'],
  sol: 'Ethanoic acid is a weak acid: CH₃COOH ⇌ CH₃COO⁻ + H⁺ lies mainly to the left — option (@K).',
  d: 3, c: 'analysis', t: [5],
}));
add('naoh-mcq', mcq({
  stem: 'Ethanoic acid is added to sodium hydroxide solution until the solution is just neutral. The products are:',
  right: 'sodium ethanoate and water',
  wrong: ['sodium ethoxide and hydrogen', 'ethyl ethanoate and water', 'sodium ethanoate and hydrogen'],
  sol: 'Neutralisation: CH₃COOH + NaOH → CH₃COONa + H₂O — option (@K).',
  d: 1, c: 'application', t: [5],
}));
add('esterif-mcq', mcq({
  stem: 'Which pair of substances, warmed with a few drops of concentrated sulphuric acid, gives ethyl ethanoate?',
  right: 'Ethanoic acid and ethanol',
  wrong: ['Ethanoic acid and methanol', 'Methanoic acid and ethanol', 'Ethanol and ethene'],
  sol: '"Ethyl" comes from ethanol and "ethanoate" from ethanoic acid — option (@K). Ethanoic acid with methanol gives methyl ethanoate; methanoic acid with ethanol gives ethyl methanoate.',
  d: 2, c: 'analysis', t: [5],
}));
add('catalyst-mcq', mcq({
  stem: 'Why are a few drops of concentrated sulphuric acid added to the mixture of ethanoic acid and ethanol when an ester is made?',
  right: 'They speed up the reaction and take up the water formed',
  wrong: ['They neutralise the ethanoic acid', 'They supply the oxygen atoms of the ester', 'They turn the ethanol into ethanoic acid'],
  sol: 'Conc. H₂SO₄ is a catalyst and a dehydrating agent — option (@K).',
  d: 2, c: 'understanding', t: [5],
}));
add('latex-mcq', mcq({
  stem: 'In the rubber industry, ethanoic acid is added to latex from rubber trees in order to:',
  right: 'coagulate the latex so that rubber can be separated',
  wrong: ['vulcanise the rubber', 'dissolve the rubber', 'colour the rubber'],
  sol: 'Acid makes the rubber particles in latex clump together — option (@K).',
  d: 2, c: 'recall', t: [5],
}));
add('methylester-mcq', mcq({
  stem: 'Which ester is obtained from methanol, CH₃OH, and ethanoic acid, CH₃COOH?',
  right: 'methyl ethanoate, CH₃COOCH₃',
  wrong: ['ethyl methanoate, HCOOC₂H₅', 'ethyl ethanoate, CH₃COOC₂H₅', 'methyl methanoate, HCOOCH₃'],
  sol: 'Alcohol part methyl, acid part ethanoate — option (@K).',
  d: 3, c: 'analysis', t: [5],
}));
add('ester-ar', ar({
  a: 'Ethyl ethanoate is formed when ethanol is warmed with sodium hydroxide solution.',
  r: 'Ethyl ethanoate is formed when ethanol is warmed with ethanoic acid and a few drops of concentrated sulphuric acid.',
  key: 'd',
  sol: 'A is false: ethanol does not react with sodium hydroxide to give an ester. R is true (esterification) — option (d).',
  d: 2, c: 'analysis', t: [5],
}));
add('acid-fill', fill({
  stem: 'Complete each sentence by choosing the correct word from the bracket.\n\n(a) Ethanoic acid turns blue litmus ___ (red / colourless).\n\n(b) The reaction of ethanoic acid with ethanol is called ___ (esterification / neutralisation).\n\n(c) The ester formed has a ___ (fruity / pungent) smell.',
  acc: [['red'], ['esterification'], ['fruity']],
  sol: '(a) **red**; (b) **esterification**; (c) **fruity**.',
  d: 1, c: 'recall', t: [5],
}));
add('naoh-short1', short({
  marks: 1,
  stem: 'Write a balanced equation for the reaction of ethanoic acid with sodium hydroxide, and name the salt formed.',
  model: r`$\ce{CH3COOH + NaOH -> CH3COONa + H2O}$; sodium ethanoate (sodium acetate).`,
  sol: 'Neutralisation.',
  scheme: [['Equation and name', 1]],
  d: 1, c: 'application', t: [5],
}));
add('smell-short1', short({
  marks: 1,
  stem: 'How can you tell, without any chemical test, that ethyl ethanoate has formed in a test tube of warmed ethanoic acid, ethanol and concentrated sulphuric acid?',
  model: 'On pouring the mixture into water, a sweet, fruity smell is noticed (an oily layer floats on the water).',
  sol: 'Fruity smell.',
  scheme: [['Fruity smell', 1]],
  d: 1, c: 'application', t: [5],
}));
add('aciduses-short1', short({
  marks: 1,
  stem: 'Give two uses of ethanoic acid.',
  model: 'Any two: as vinegar for flavouring and preserving food; making esters for perfumes and flavours; coagulating rubber latex; making cellulose acetate; as a laboratory reagent.',
  sol: 'Two uses.',
  scheme: [['Two correct uses', 1]],
  d: 1, c: 'recall', t: [5],
}));
add('distinguish-short2', short({
  marks: 2,
  stem: 'You are given two unlabelled colourless liquids: one is ethanol and the other is ethanoic acid. Describe one chemical test, with the observation for each liquid, to tell which is which.',
  model: 'Add a few drops of each to moist blue litmus paper: ethanoic acid turns it red, ethanol leaves it blue. (Or add sodium hydrogencarbonate: ethanoic acid gives brisk effervescence of carbon dioxide, ethanol gives no change.)',
  sol: 'Test; two observations.',
  scheme: [['Test named', 1], ['Both observations', 1]],
  d: 2, c: 'analysis', t: [1, 5],
}));
add('acid-short3', short({
  marks: 3,
  stem: '(a) Draw the structural formula of ethanoic acid and name its functional group. (b) Write the balanced equation for its reaction with potassium hydroxide. (c) Name the type of reaction in (b).',
  model: r`(a) CH₃–C(=O)–O–H (a methyl group joined to –COOH); the carboxyl group. (b) $\ce{CH3COOH + KOH -> CH3COOK + H2O}$ (c) Neutralisation.`,
  sol: 'Structure; equation; neutralisation.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 2, c: 'application', t: [4, 5],
}));
add('esterlab-short3', short({
  marks: 3,
  stem: 'Ethyl ethanoate is prepared in a test tube in the school laboratory. (a) Name the two reactants and the catalyst. (b) Write the balanced equation. (c) Why is the warm mixture poured into a beaker of water before it is smelt?',
  model: r`(a) Ethanoic acid and ethanol; a few drops of concentrated sulphuric acid. (b) $\ce{CH3COOH + C2H5OH <=>[{conc. H2SO4}] CH3COOC2H5 + H2O}$ (c) The excess acid and alcohol dissolve in the water while the ester forms an oily layer on top, so the fruity smell of the ester is not masked by the sharp smell of the acid.`,
  sol: 'Reactants; equation; masking smell removed.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 3, c: 'application', t: [5],
}));
add('naoh-num', num({
  stem: 'What mass of sodium hydroxide is needed to neutralise exactly 6.0 g of ethanoic acid? (C = 12, H = 1, O = 16, Na = 23)',
  value: 4, tol: 0.05, unit: 'g',
  sol: r`$\ce{CH3COOH + NaOH -> CH3COONa + H2O}$: 1 mol acid needs 1 mol NaOH. Moles of acid $= \frac{6.0}{60} = 0.1$. Molar mass of NaOH $= 23 + 16 + 1 = 40$ g. Mass of NaOH $= 0.1 \times 40 = 4$ g.`,
  scheme: [['0.1 mol', 0.5], ['4.0 g', 0.5]],
  d: 2, c: 'application', t: [5],
}), () => Math.abs((6.0 / 60) * 40 - 4) < 1e-9 || 'mass');
add('estermass-num', num({
  stem: '3.0 g of ethanoic acid reacts completely with excess ethanol. Calculate the mass of ethyl ethanoate, CH₃COOC₂H₅, formed. (C = 12, H = 1, O = 16)',
  value: 4.4, tol: 0.05, unit: 'g',
  sol: r`$\ce{CH3COOH + C2H5OH -> CH3COOC2H5 + H2O}$: 1 mol acid gives 1 mol ester. Moles of acid $= \frac{3.0}{60} = 0.05$. Molar mass of the ester $= 4 \times 12 + 8 \times 1 + 2 \times 16 = 88$ g. Mass of ester $= 0.05 \times 88 = 4.4$ g.`,
  scheme: [['0.05 mol and 88', 0.5], ['4.4 g', 0.5]],
  d: 3, c: 'analysis', t: [5],
}), () => Math.abs((3.0 / 60) * 88 - 4.4) < 1e-9 || 'mass');
add('reaction-match', match({
  stem: 'Match each reaction in Column A with its organic product in Column B.',
  pairs: [
    ['Ethanol + sodium', 'Sodium ethoxide'],
    ['Ethanol + excess concentrated sulphuric acid at 170 °C', 'Ethene'],
    ['Ethanoic acid + sodium hydroxide', 'Sodium ethanoate'],
    ['Ethanoic acid + ethanol (conc. H₂SO₄, warm)', 'Ethyl ethanoate'],
    ['Bromoethane + aqueous sodium hydroxide', 'Ethanol'],
  ],
  order: [4, 1, 3, 0, 2],
  sol: 'Ethanol + Na → sodium ethoxide; ethanol + conc. H₂SO₄ at 170 °C → ethene; ethanoic acid + NaOH → sodium ethanoate; ethanoic acid + ethanol → ethyl ethanoate; bromoethane + aqueous NaOH → ethanol.',
  d: 2, c: 'application', t: [1, 2, 5],
}));

// ---------------------------------------------------------------- 10-mark structured questions
add('ethanol-long', long({
  stem: '(a) Write the balanced equation for the preparation of ethanol from bromoethane, state the condition and name the type of reaction. [2]\n\n(b) State two physical properties of ethanol. [2]\n\n(c) Write balanced equations for the reaction of ethanol with (i) oxygen and (ii) sodium. (iii) State one observation for (ii). [3]\n\n(d) Ethanol is heated with excess concentrated sulphuric acid at about 170 °C. (i) Name the organic product. (ii) Write the balanced equation. (iii) State the role of the sulphuric acid. [3]',
  model: r`(a) $\ce{C2H5Br + NaOH ->[{aqueous, boil}] C2H5OH + NaBr}$; boiled with aqueous alkali; hydrolysis (substitution).

(b) Any two: colourless volatile liquid with a pleasant smell; boils at 78 °C; lighter than water; miscible with water; neutral to litmus.

(c) (i) $\ce{C2H5OH + 3O2 -> 2CO2 + 3H2O}$ (ii) $\ce{2C2H5OH + 2Na -> 2C2H5ONa + H2}$ (iii) Brisk effervescence; the gas burns with a pop.

(d) (i) Ethene. (ii) $\ce{C2H5OH ->[{conc. H2SO4, 170 °C}] C2H4 + H2O}$ (iii) Dehydrating agent.`,
  sol: 'Hydrolysis; properties; combustion and sodium; dehydration.',
  scheme: [['(a) equation and condition', 1], ['(a) type', 1], ['(b)', 2], ['(c)(i)', 1], ['(c)(ii)', 1], ['(c)(iii)', 1], ['(d)(i)', 1], ['(d)(ii)', 1], ['(d)(iii)', 1]],
  d: 3, c: 'application', t: [1, 2],
}));
add('society-long', long({
  stem: '(a) What is denatured alcohol? Why is industrial ethanol denatured? Name one substance used to denature it. [3]\n\n(b) What is spurious alcohol? Explain why drinking it can cause blindness. [3]\n\n(c) (i) Give two uses of ethanol and the property on which each depends. (ii) Calculate the volume of carbon dioxide at STP formed when 2.3 g of ethanol burns completely. (C = 12, H = 1, O = 16; 1 mole of a gas occupies 22.4 litres at STP) [4]',
  model: r`(a) Ethanol made unfit for drinking by adding poisonous or nauseating substances. Industrial ethanol is sold without liquor tax, so it is denatured to prevent people drinking it. Substance: methanol (or pyridine, or a dye such as copper sulphate).

(b) Illicit liquor, often contaminated with methanol. In the body, methanol is changed into methanal and methanoic acid, which damage the optic nerve, causing blindness and even death.

(c) (i) Any two: solvent for medicines and perfumes (dissolves organic substances); fuel (burns with a clean, hot flame); sanitiser (kills germs); thermometers in cold places (very low freezing point). (ii) $\ce{C2H5OH + 3O2 -> 2CO2 + 3H2O}$. Moles of ethanol $= \frac{2.3}{46} = 0.05$; moles of CO₂ $= 0.05 \times 2 = 0.1$; volume $= 0.1 \times 22.4 = 2.24$ litres.`,
  sol: 'Denatured; spurious; uses and CO₂ volume.',
  scheme: [['(a) definition', 1], ['(a) reason', 1], ['(a) substance', 1], ['(b) definition', 1], ['(b) reason', 2], ['(c)(i)', 2], ['(c)(ii)', 2]],
  d: 3, c: 'application', t: [2, 3],
}));
add('acid-long', long({
  stem: '(a) Draw the structural formula of ethanoic acid and name its functional group. [2]\n\n(b) What is glacial acetic acid? Why is it so called? [2]\n\n(c) (i) State the effect of ethanoic acid on blue litmus. (ii) Write the balanced equation for its reaction with sodium hydroxide. (iii) Name the salt formed. [3]\n\n(d) Give three uses of ethanoic acid. [3]',
  model: r`(a) CH₃–C(=O)–O–H, drawn with all bonds; the carboxyl group, –COOH.

(b) Pure, water-free ethanoic acid. It freezes at about 17 °C into colourless, ice-like crystals, which look like a glacier.

(c) (i) It turns blue litmus red. (ii) $\ce{CH3COOH + NaOH -> CH3COONa + H2O}$ (iii) Sodium ethanoate (sodium acetate).

(d) Any three: vinegar for flavouring and preserving food; making esters for perfumes and flavourings; coagulating rubber latex; making cellulose acetate for films and fibres; laboratory reagent.`,
  sol: 'Structure; glacial; litmus and neutralisation; uses.',
  scheme: [['(a) structure', 1], ['(a) group', 1], ['(b) meaning', 1], ['(b) reason', 1], ['(c)(i)', 1], ['(c)(ii)', 1], ['(c)(iii)', 1], ['(d)', 3]],
  d: 2, c: 'understanding', t: [4, 5],
}));
add('ester-long', long({
  stem: '(a) Name the reactants and the catalyst used to prepare ethyl ethanoate, and write the balanced equation. [3]\n\n(b) (i) State the observation that shows that an ester has formed. (ii) Is the reaction reversible? (iii) Name the type of reaction. [3]\n\n(c) (i) Name the ester formed from ethanoic acid and methanol, and write its formula. (ii) Calculate the mass of ethyl ethanoate formed when 1.2 g of ethanoic acid reacts completely with excess ethanol. (C = 12, H = 1, O = 16) [4]',
  model: r`(a) Ethanoic acid and ethanol; a few drops of concentrated sulphuric acid. $\ce{CH3COOH + C2H5OH <=>[{conc. H2SO4}] CH3COOC2H5 + H2O}$

(b) (i) A sweet, fruity smell (an oily layer forms when the mixture is poured into water). (ii) Yes. (iii) Esterification.

(c) (i) Methyl ethanoate, CH₃COOCH₃. (ii) Moles of acid $= \frac{1.2}{60} = 0.02$; 1 mol acid gives 1 mol ester (88 g); mass $= 0.02 \times 88 = 1.76$ g.`,
  sol: 'Reactants and equation; observation; methyl ethanoate and mass.',
  scheme: [['(a) reactants', 1], ['(a) catalyst', 1], ['(a) equation', 1], ['(b)(i)', 1], ['(b)(ii)', 1], ['(b)(iii)', 1], ['(c)(i)', 2], ['(c)(ii)', 2]],
  d: 3, c: 'application', t: [2, 5],
}));
add('pq-long', long({
  stem: 'Two organic liquids P and Q each contain two carbon atoms. P is neutral to litmus and boils at 78 °C. Q turns blue litmus red, smells of vinegar and freezes at about 17 °C.\n\n(a) Identify P and Q and draw their structural formulae. [3]\n\n(b) P and Q are warmed together with a few drops of concentrated sulphuric acid. (i) Name the product R. (ii) Write the balanced equation. (iii) State how R can be recognised. [3]\n\n(c) (i) Write balanced equations for the reaction of P with sodium and of Q with sodium hydroxide. (ii) Calculate the mass of sodium needed to react completely with 9.2 g of P. (C = 12, H = 1, O = 16, Na = 23) [4]',
  model: r`(a) P is ethanol, CH₃–CH₂–OH; Q is ethanoic acid, CH₃–C(=O)–O–H.

(b) (i) Ethyl ethanoate. (ii) $\ce{C2H5OH + CH3COOH <=>[{conc. H2SO4}] CH3COOC2H5 + H2O}$ (iii) By its sweet, fruity smell.

(c) (i) $\ce{2C2H5OH + 2Na -> 2C2H5ONa + H2}$ and $\ce{CH3COOH + NaOH -> CH3COONa + H2O}$ (ii) Moles of ethanol $= \frac{9.2}{46} = 0.2$; ethanol and sodium react 1 : 1, so mass of sodium $= 0.2 \times 23 = 4.6$ g.`,
  sol: 'Identification; ester; equations and mass.',
  scheme: [['(a) P', 1.5], ['(a) Q', 1.5], ['(b)(i)', 1], ['(b)(ii)', 1], ['(b)(iii)', 1], ['(c)(i)', 2], ['(c)(ii)', 2]],
  d: 4, c: 'analysis', t: [1, 2, 4, 5],
}));
