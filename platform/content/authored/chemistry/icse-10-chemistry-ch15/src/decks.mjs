// ICSE 10 Chemistry ch15 Alcohols and Carboxylic Acids — two decks: Part 1 (t01–t03) ethanol: preparation by hydrolysis,
// physical properties, combustion, sodium, esterification, dehydration, denatured and spurious alcohol, uses; Part 2
// (t04–t05) ethanoic acid: structure, physical properties, glacial acetic acid, litmus, alkalis, esterification, uses.
import { sl, deck, table, chem, svgV, r } from './lib.mjs';
import { ETHANOL, ACID, ESTER_SCHEME, ESTER_TEST, GLACIAL } from './svgs.mjs';

const V = {
  ethanol: svgV(ETHANOL, 'Displayed formula of ethanol with the hydroxyl group marked'),
  acid: svgV(ACID, 'Displayed formula of ethanoic acid with the carboxyl group marked'),
  scheme: svgV(ESTER_SCHEME, 'Ethanoic acid and ethanol losing a molecule of water to form ethyl ethanoate'),
  test: svgV(ESTER_TEST, 'Warming ethanol, ethanoic acid and concentrated sulphuric acid in a water bath, then pouring into water to smell the ester'),
  glacial: svgV(GLACIAL, 'Pure ethanoic acid as a liquid above seventeen degrees Celsius and as ice-like crystals below it'),
};

export const deck1 = deck({
  part: 1,
  title: 'Alcohols and Carboxylic Acids — Part 1: Ethanol',
  goals: [
    'Write the equation for preparing ethanol from bromoethane with aqueous alkali',
    'Describe the nature, solubility, density and boiling point of ethanol',
    'Write equations, with conditions, for the combustion of ethanol and its reactions with sodium, ethanoic acid and concentrated sulphuric acid',
    'Explain why ethanol is denatured and why spurious alcohol is dangerous, and list uses of ethanol',
  ],
  slides: [
    sl('title', 'The alcohol we all know', {
      b: 'Part 1 — **Ethanol** (ethyl alcohol), C₂H₅OH, is the best-known **alcohol**. It is the solvent in hand sanitisers and many medicines, a fuel blended with petrol, and a raw material for perfumes and vinegar. Alcohols contain the **hydroxyl group, –OH**, joined to a carbon chain.',
      v: table(['Where you meet ethanol', 'What it does there'], [['Hand sanitiser', 'Kills germs on the skin'], ['Petrol blended with ethanol (E20)', 'Burns as a cleaner fuel'], ['Cough syrups and tinctures', 'Dissolves the medicine'], ['Spirit-filled thermometers', 'Stays liquid far below 0 °C']], 'Table of four everyday uses of ethanol and its role in each'),
      n: 'Namaste! Ethanol is the alcohol in hand sanitisers, cough syrups and the fuel blended into petrol. It belongs to a family called alcohols, which all contain a hydroxyl group, an oxygen and a hydrogen atom, joined to a carbon chain. In this part we see how ethanol is made, what it looks like, how it reacts, and why some alcohol is deliberately made poisonous.',
    }),
    sl('concept', 'The structure of ethanol', {
      b: 'Ethanol, **CH₃–CH₂–OH**, is an ethyl group joined to a **hydroxyl group (–OH)**. The –OH group is the **functional group** of alcohols and decides their chemistry. Molecular formula C₂H₆O; molecular mass 46. It belongs to the homologous series CₙH₂ₙ₊₁OH (methanol, ethanol, propan-1-ol…).',
      v: V.ethanol,
      n: 'In ethanol, two carbon atoms are joined together. The first carbon carries three hydrogen atoms, and the second carries two hydrogen atoms and the hydroxyl group. That hydroxyl group is the functional group of every alcohol, and it is responsible for most of ethanol’s reactions. Methanol, ethanol and propanol form a homologous series.',
    }),
    sl('concept', 'Preparing ethanol: hydrolysis of bromoethane', {
      b: 'An alkyl halide is **hydrolysed** by boiling it with an **aqueous** solution of sodium hydroxide or potassium hydroxide. The hydroxide ion **replaces the halogen atom**, so bromoethane gives ethanol. (With **alcoholic** KOH, bromoethane gives ethene instead — compare Chapter 14.)',
      v: chem('C2H5Br + NaOH ->[{aqueous, boil}] C2H5OH + NaBr', 'Bromoethane plus aqueous sodium hydroxide, boiled, gives ethanol and sodium bromide', 'The OH group takes the place of the Br atom.'),
      n: 'Ethanol can be made by boiling bromoethane with sodium hydroxide dissolved in water. The hydroxide replaces the bromine atom, giving ethanol and sodium bromide. This is called hydrolysis of an alkyl halide. Remember the difference: in water the product is ethanol, but potassium hydroxide dissolved in alcohol gives ethene.',
    }),
    sl('check', 'Quick check: making ethanol', {
      b: 'Predict the product of an alkyl halide with an alkali.',
      n: 'Quick check. Look carefully at whether the alkali is dissolved in water or in alcohol. In water, the hydroxide group takes the place of the halogen atom. Decide what product that gives, then choose your answer.',
      chk: 'hydrolysis-mcq',
    }),
    sl('concept', 'Physical properties of ethanol', {
      b: '- A **colourless, volatile liquid** with a pleasant, characteristic smell and a burning taste.\n- **Boiling point 78 °C**; freezing point about −114 °C.\n- **Density 0.79 g cm⁻³**: lighter than water.\n- **Miscible with water** in all proportions (its –OH group forms hydrogen bonds with water); also a good **solvent** for many organic compounds.\n- **Neutral to litmus**: it does not ionise to give H⁺ ions in water.',
      v: table(['Property', 'Ethanol', 'Water'], [['Boiling point', '78 °C', '100 °C'], ['Freezing point', 'about −114 °C', '0 °C'], ['Density / g cm⁻³', '0.79', '1.00'], ['Effect on litmus', 'Neutral', 'Neutral']], 'Table comparing the boiling point, freezing point, density and litmus effect of ethanol and water'),
      n: 'Ethanol is a colourless liquid that evaporates easily and has a pleasant smell. It boils at seventy eight degrees Celsius and freezes only at about minus one hundred and fourteen degrees. It is lighter than water, yet it mixes with water completely in any amount. It does not change the colour of litmus, because it is neutral.',
    }),
    sl('example', 'Worked example: identifying a liquid from data', {
      b: '**Problem.** A colourless liquid L (formula C₂H₆O) boils at 78 °C, mixes with water in all proportions and has no effect on blue or red litmus. A piece of sodium dropped into it gives a gas that burns with a pop. Identify L and the gas.\n\n**Step 1.** C₂H₆O and neutral to litmus: not an acid.\n\n**Step 2.** Boiling point 78 °C and miscible with water: matches **ethanol**.\n\n**Step 3.** Sodium gives a gas that burns with a pop: **hydrogen**, confirming an –OH group.',
      v: table(['Clue', 'What it tells you'], [['C₂H₆O, neutral to litmus', 'An alcohol, not an acid'], ['Boils at 78 °C, mixes with water', 'Ethanol'], ['Gas with sodium burns with a pop', 'Hydrogen: –OH present']], 'Table matching each clue about liquid L to what it shows'),
      n: 'Work through the clues one at a time. The formula has two carbons, six hydrogens and one oxygen, and the liquid does not affect litmus, so it is not an acid. Its boiling point of seventy eight degrees and the way it mixes with water point to ethanol. The gas from sodium that burns with a pop is hydrogen, which confirms the hydroxyl group.',
    }),
    sl('concept', 'Combustion and the reaction with sodium', {
      b: '**Combustion:** ethanol burns in air with a **blue, non-sooty flame**, releasing much heat, so it is a useful fuel:\n\nC₂H₅OH + 3O₂ → 2CO₂ + 3H₂O\n\n**Sodium:** sodium reacts with ethanol, more gently than with water, giving **brisk effervescence** of **hydrogen** and leaving **sodium ethoxide**, C₂H₅ONa, which is a white solid when the excess ethanol is evaporated.',
      v: chem('2C2H5OH + 2Na -> 2C2H5ONa + H2', 'Two ethanol plus two sodium gives two sodium ethoxide plus hydrogen', 'Hydrogen is given off with effervescence.'),
      n: 'Ethanol burns with a clean blue flame, forming carbon dioxide and water and giving out plenty of heat, which is why it is blended into petrol. When a small piece of sodium is dropped into ethanol, it fizzes steadily, less violently than in water. Hydrogen gas is given off, and sodium ethoxide is left in the solution.',
    }),
    sl('example', 'Worked example: hydrogen from ethanol and sodium', {
      b: r`**Problem.** 2.3 g of ethanol reacts completely with sodium. Find the volume of hydrogen at STP. (C = 12, H = 1, O = 16; 1 mol of gas occupies 22.4 L at STP)

**Step 1.** Molar mass of C₂H₅OH: $2 \times 12 + 6 \times 1 + 16 = 46$ g.

**Step 2.** Moles of ethanol: $\frac{2.3}{46} = 0.05$ mol.

**Step 3.** 2 mol ethanol give 1 mol H₂, so moles of H₂ $= \frac{0.05}{2} = 0.025$.

**Step 4.** Volume $= 0.025 \times 22.4 = 0.56$ L at STP.`,
      v: table(['Quantity', 'Value'], [['Molar mass of ethanol', '46 g mol⁻¹'], ['Moles of ethanol', '0.05'], ['Moles of hydrogen (half)', '0.025'], ['Volume of hydrogen at STP', '0.56 L']], 'Table of the steps from mass of ethanol to volume of hydrogen'),
      n: 'Start with the molar mass of ethanol, which is forty six grams. Two point three grams is therefore five hundredths of a mole. The equation shows that two moles of ethanol give one mole of hydrogen, so we get half as much hydrogen. Multiplying by the molar volume gives just over half a litre of hydrogen at standard temperature and pressure.',
    }),
    sl('check', 'Quick check: ethanol and sodium', {
      b: 'Identify the products when sodium reacts with ethanol.',
      n: 'Quick check. Sodium takes the place of the hydrogen of the hydroxyl group. Think about which gas is set free and what the sodium compound left behind is called, then choose the pair that matches.',
      chk: 'sodium-mcq',
    }),
    sl('concept', 'Esterification', {
      b: 'Ethanol reacts with **ethanoic acid**, when warmed with a few drops of **concentrated sulphuric acid**, to form the ester **ethyl ethanoate** and water. The –OH of the acid and the H of the alcohol leave as water. The reaction is **reversible** and slow; the sulphuric acid acts as a **catalyst** and takes up the water formed. Esters have a pleasant, **fruity smell**.\n\nCH₃COOH + C₂H₅OH ⇌ CH₃COOC₂H₅ + H₂O',
      v: V.scheme,
      n: 'When ethanol is warmed with ethanoic acid and a few drops of concentrated sulphuric acid, the two molecules join together and a molecule of water is removed. The product, ethyl ethanoate, is an ester with a sweet fruity smell. This reaction is called esterification. It is slow and reversible, and the sulphuric acid speeds it up and takes up the water.',
    }),
    sl('concept', 'Dehydration to ethene', {
      b: 'Heated with **excess concentrated sulphuric acid** at about **170 °C**, ethanol **loses a molecule of water** and gives ethene. Concentrated sulphuric acid acts as a **dehydrating agent**. This is the laboratory method for ethene you met in Chapter 14.',
      v: chem('C2H5OH ->[{conc. H2SO4, 170 °C}] C2H4 + H2O', 'Ethanol heated with concentrated sulphuric acid at one hundred and seventy degrees gives ethene and water', 'Dehydration: a molecule of water is removed from each ethanol molecule.'),
      n: 'If ethanol is heated with excess concentrated sulphuric acid to about one hundred and seventy degrees Celsius, the acid pulls a molecule of water out of each ethanol molecule. The product is ethene, an unsaturated gas. This is called dehydration, and it is the usual laboratory method for making ethene.',
    }),
    sl('check', 'Quick check: reactions of ethanol', {
      b: 'Choose the reagent and condition that turn ethanol into ethene.',
      n: 'Quick check. To make ethene, a molecule of water must be removed from each ethanol molecule. Decide which reagent is a strong dehydrating agent, and remember that the temperature matters as well as the reagent.',
      chk: 'dehydr-mcq',
    }),
    sl('concept', 'Denatured, methylated and spurious alcohol', {
      b: '**Denatured alcohol:** ethanol made **unfit for drinking** by adding poisonous or nauseating substances such as **methanol**, pyridine and a blue dye (copper sulphate). Industrial ethanol is sold cheaply, without the tax on liquor; denaturing stops it being drunk. **Methylated spirit** is ethanol denatured mainly with methanol.\n\n**Spurious (illicit) alcohol** is liquor made or sold illegally, often mixed with **methanol**. Methanol is changed in the body into methanal and methanoic acid, which damage the **optic nerve** and can cause **blindness and death**.',
      v: table(['Term', 'Meaning', 'Danger or purpose'], [['Denatured alcohol', 'Ethanol + methanol, pyridine, dye', 'Prevents misuse of untaxed industrial ethanol'], ['Methylated spirit', 'Ethanol denatured mainly with methanol', 'Used as a fuel and solvent, not for drinking'], ['Spurious alcohol', 'Illicit liquor, often containing methanol', 'Blindness or death']], 'Table explaining denatured alcohol, methylated spirit and spurious alcohol'),
      n: 'Industrial ethanol is sold cheaply without liquor tax, so poisonous substances such as methanol and a blue dye are added to make it unfit to drink. This is denatured alcohol, and when methanol is the main additive it is called methylated spirit. Illegal liquor, called spurious alcohol, often contains methanol. In the body methanol damages the nerve of the eye and can cause blindness or even death.',
    }),
    sl('concept', 'Uses of ethanol', {
      b: 'Each use of ethanol depends on one of its properties.',
      v: table(['Use', 'Property used'], [['Solvent for medicines (tinctures, syrups), perfumes, varnishes', 'Dissolves many organic substances'], ['Fuel, alone or blended with petrol', 'Burns with a clean, hot flame'], ['Antiseptic and hand sanitiser', 'Kills germs'], ['Liquid in thermometers for cold places', 'Freezes only at about −114 °C'], ['Making ethanoic acid, esters and ethene', 'Reactive –OH group']], 'Table of five uses of ethanol with the property each depends on'),
      n: 'Ethanol has many uses, and each one depends on a property. It dissolves many substances, so it is used in medicines, perfumes and varnishes. It burns cleanly, so it is used as a fuel and blended into petrol. It kills germs, so it is in hand sanitisers. And because it freezes only at a very low temperature, it is used in thermometers for cold places.',
    }),
    sl('summary', 'Summary: Part 1', {
      ul: [
        'Ethanol, C₂H₅OH, has the hydroxyl group –OH; made by boiling bromoethane with aqueous alkali.',
        'Colourless, volatile, boils at 78 °C, lighter than water, miscible with water, neutral to litmus.',
        'Burns with a blue flame; sodium gives hydrogen and sodium ethoxide.',
        'With ethanoic acid (conc. H₂SO₄) gives the fruity ester ethyl ethanoate; with excess conc. H₂SO₄ at 170 °C gives ethene.',
        'Denatured or methylated spirit is unfit to drink; spurious alcohol containing methanol causes blindness or death.',
      ],
      v: table(['Reagent with ethanol', 'Product'], [['Oxygen (burning)', 'CO₂ + H₂O'], ['Sodium', 'Sodium ethoxide + H₂'], ['Ethanoic acid + conc. H₂SO₄', 'Ethyl ethanoate + H₂O'], ['Excess conc. H₂SO₄, 170 °C', 'Ethene + H₂O']], 'Summary table of four reactions of ethanol and their products'),
      n: 'Let us sum up Part 1. Ethanol contains the hydroxyl group and is made by boiling bromoethane with an aqueous alkali. It is a neutral liquid that boils at seventy eight degrees and mixes with water. It burns cleanly, gives hydrogen with sodium, forms a fruity ester with ethanoic acid and gives ethene when dehydrated. Denatured alcohol is not for drinking, and spurious alcohol can kill.',
    }),
    sl('exam-tips', 'Exam tips: Part 1', {
      ul: [
        'Bromoethane + aqueous alkali → ethanol; + alcoholic KOH → ethene. Name the solvent.',
        'Balance the sodium equation with 2 ethanol: 2C₂H₅OH + 2Na → 2C₂H₅ONa + H₂.',
        'Esterification needs a few drops of conc. H₂SO₄ and warming; dehydration needs excess acid at 170 °C.',
        'Ethanol is neutral to litmus: do not call it an acid because it reacts with sodium.',
      ],
      v: table(['Slip', 'Fix'], [['C₂H₅OH + Na → C₂H₅ONa + H₂', 'Not balanced: use 2C₂H₅OH + 2Na → 2C₂H₅ONa + H₂'], ['Ethanol turns blue litmus red', 'Ethanol is neutral'], ['Methylated spirit is pure methanol', 'It is ethanol denatured with methanol']], 'Table of three common slips in Part 1 and their fixes'),
      n: 'Some tips. Always state whether the alkali is in water or in alcohol, because the products are different. Balance the sodium equation with two molecules of ethanol. Learn the two different conditions with sulphuric acid: a few drops and warming for the ester, but excess acid at one hundred and seventy degrees for ethene. And remember that ethanol is neutral to litmus.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Alcohols and Carboxylic Acids — Part 2: Ethanoic (acetic) acid',
  goals: [
    'Draw the structure of acetic acid and identify the carboxyl group',
    'Describe the physical properties of acetic acid and explain what glacial acetic acid is',
    'Write equations for acetic acid with sodium hydroxide and with ethanol, and describe its effect on litmus',
    'Use the fruity smell of the ester as evidence of esterification and list uses of acetic acid',
  ],
  slides: [
    sl('title', 'The sour taste of vinegar', {
      b: 'Part 2 — **Vinegar** is a dilute solution (about 5–8 per cent) of **ethanoic acid**, also called **acetic acid**, CH₃COOH. It is the best-known **carboxylic acid**. Carboxylic acids contain the **carboxyl group, –COOH**.',
      v: table(['Carboxylic acid', 'Formula', 'Found in'], [['Methanoic acid (formic acid)', 'HCOOH', 'Ant and bee stings'], ['Ethanoic acid (acetic acid)', 'CH₃COOH', 'Vinegar'], ['Propanoic acid', 'CH₃CH₂COOH', 'Used to preserve bread']], 'Table of three carboxylic acids with formulae and where they are found'),
      n: 'The sharp, sour taste of vinegar comes from ethanoic acid, which is also called acetic acid. Vinegar is a dilute solution of it in water. Ethanoic acid is the best known member of the carboxylic acids, a family whose functional group is the carboxyl group. The sting of an ant contains methanoic acid, the first member of the same family.',
    }),
    sl('concept', 'Structure: the carboxyl group', {
      b: 'In ethanoic acid a **methyl group** is joined to a **carboxyl group, –COOH**. The carboxyl carbon is joined to one oxygen by a **double bond** (C=O) and to an **–OH group** by a single bond. Molecular formula C₂H₄O₂; molecular mass 60. The hydrogen of the –OH can be released as H⁺, which makes the compound an **acid**.',
      v: V.acid,
      n: 'In ethanoic acid, a methyl group is joined to a carboxyl group. The carbon of the carboxyl group is bonded to one oxygen by a double bond and to a hydroxyl group by a single bond. The hydrogen of that hydroxyl group can be released as a hydrogen ion in water, and that is what makes ethanoic acid an acid.',
    }),
    sl('concept', 'Physical properties of ethanoic acid', {
      b: '- A **colourless liquid** with a sharp, **pungent smell of vinegar** and a **sour taste**.\n- **Boiling point 118 °C**; **melting point about 17 °C** (16.6 °C).\n- **Miscible with water** in all proportions; density a little more than water (1.05 g cm⁻³).\n- Pure ethanoic acid is **corrosive** and blisters the skin.',
      v: table(['Property', 'Ethanol', 'Ethanoic acid'], [['Smell', 'Pleasant, spirit-like', 'Pungent, of vinegar'], ['Boiling point', '78 °C', '118 °C'], ['Melting point', 'about −114 °C', 'about 17 °C'], ['Effect on blue litmus', 'No change', 'Turns red']], 'Table comparing the smell, boiling point, melting point and effect on litmus of ethanol and ethanoic acid'),
      n: 'Ethanoic acid is a colourless liquid with the sharp smell of vinegar and a sour taste. It boils at one hundred and eighteen degrees Celsius, higher than ethanol, and it melts at about seventeen degrees, which is just below room temperature on a warm day. It mixes with water in any proportion, and the pure acid can burn the skin.',
    }),
    sl('check', 'Quick check: the carboxyl group', {
      b: 'Recall how the atoms of the carboxyl group are bonded.',
      n: 'Quick check. Picture the carboxyl carbon of ethanoic acid. Count how many oxygen atoms are attached to it, and decide whether each one is joined by a single bond or a double bond before you choose.',
      chk: 'structure-mcq',
    }),
    sl('diagram', 'Glacial acetic acid', {
      b: 'Pure, water-free ethanoic acid **freezes at about 17 °C**. In cold weather it turns into a colourless solid that looks like **ice** or a glacier, so pure ethanoic acid is called **glacial acetic acid**. A little water lowers the freezing point, so dilute solutions such as vinegar do not freeze this way.',
      v: V.glacial,
      n: 'Pure ethanoic acid, with no water in it, freezes at about seventeen degrees Celsius. On a cold winter morning a bottle of it can turn into colourless crystals that look just like ice. That is why the pure acid is called glacial acetic acid. Vinegar, which is mostly water, does not freeze at that temperature.',
    }),
    sl('example', 'Worked example: which liquid is which?', {
      b: '**Problem.** Three bottles A, B and C contain ethanol, ethanoic acid and water (not in that order). A smells of vinegar and turns blue litmus red. B boils at 78 °C and burns with a blue flame. C boils at 100 °C and does not burn. Identify each.\n\n**A** — turns blue litmus red and smells of vinegar: **ethanoic acid**.\n\n**B** — boils at 78 °C and is inflammable: **ethanol**.\n\n**C** — boils at 100 °C and does not burn: **water**.',
      v: table(['Bottle', 'Key evidence', 'Identity'], [['A', 'Acidic; vinegar smell', 'Ethanoic acid'], ['B', 'Boils at 78 °C; burns', 'Ethanol'], ['C', 'Boils at 100 °C; does not burn', 'Water']], 'Table identifying the three liquids from their key evidence'),
      n: 'Use one clear property for each bottle. Only an acid turns blue litmus red, and the smell of vinegar confirms that bottle A is ethanoic acid. Bottle B boils at seventy eight degrees and burns, which fits ethanol. Bottle C boils at one hundred degrees and does not burn, so it is water.',
    }),
    sl('concept', 'Ethanoic acid and litmus: a weak acid', {
      b: 'In water, ethanoic acid **ionises** to give hydrogen ions, so it **turns blue litmus red**: CH₃COOH ⇌ CH₃COO⁻ + H⁺. It ionises **only partly**, so it is a **weak acid**: a solution has fewer H⁺ ions, and a higher pH, than hydrochloric acid of the same concentration. That is why it is safe to eat in vinegar.',
      v: table(['Acid (same concentration)', 'Ionisation in water', 'Strength', 'Blue litmus'], [['Hydrochloric acid', 'Complete', 'Strong', 'Turns red'], ['Ethanoic acid', 'Partial', 'Weak', 'Turns red']], 'Table comparing hydrochloric acid and ethanoic acid: ionisation, strength and effect on litmus'),
      n: 'When ethanoic acid dissolves in water, some of its molecules split up to release hydrogen ions, so it turns blue litmus red. But only a small fraction of the molecules ionise, so ethanoic acid is a weak acid. A solution of it has a higher pH than hydrochloric acid of the same strength, which is why we can safely eat vinegar.',
    }),
    sl('check', 'Quick check: acid or not?', {
      b: 'Predict the effect of ethanol and ethanoic acid on litmus.',
      n: 'Quick check. Only a substance that gives hydrogen ions in water can turn blue litmus red. Decide which of the two compounds is an acid and which is neutral, then choose the option that matches.',
      chk: 'litmus-mcq',
    }),
    sl('concept', 'Reaction with alkalis', {
      b: 'Ethanoic acid **neutralises alkalis**, forming a **salt** (an ethanoate, also called an acetate) and **water**:\n\nCH₃COOH + KOH → CH₃COOK + H₂O\n\nThe sodium salt, **sodium ethanoate**, is the salt used to make methane with soda lime (Chapter 14).',
      v: chem('CH3COOH + NaOH -> CH3COONa + H2O', 'Ethanoic acid plus sodium hydroxide gives sodium ethanoate plus water', 'Neutralisation: a salt and water form.'),
      n: 'Like other acids, ethanoic acid reacts with alkalis to form a salt and water. With sodium hydroxide it gives sodium ethanoate, and with potassium hydroxide it gives potassium ethanoate. This is a neutralisation reaction. Sodium ethanoate is the same salt that is heated with soda lime to make methane.',
    }),
    sl('example', 'Worked example: how much alkali?', {
      b: r`**Problem.** What mass of potassium hydroxide exactly neutralises 3.0 g of ethanoic acid? (C = 12, H = 1, O = 16, K = 39)

**Step 1.** CH₃COOH + KOH → CH₃COOK + H₂O: 1 mol acid needs 1 mol KOH.

**Step 2.** Molar mass of CH₃COOH: $2 \times 12 + 4 \times 1 + 2 \times 16 = 60$ g, so moles $= \frac{3.0}{60} = 0.05$.

**Step 3.** Molar mass of KOH: $39 + 16 + 1 = 56$ g, so mass of KOH $= 0.05 \times 56 = 2.8$ g.`,
      v: table(['Step', 'Result'], [['Molar mass of ethanoic acid', '60 g mol⁻¹'], ['Moles of acid', '0.05'], ['Moles of KOH (1 : 1)', '0.05'], ['Mass of KOH', '2.8 g']], 'Table of the steps from the mass of ethanoic acid to the mass of potassium hydroxide'),
      n: 'The equation shows that one mole of ethanoic acid reacts with one mole of potassium hydroxide. Ethanoic acid has a molar mass of sixty grams, so three grams is five hundredths of a mole. The same number of moles of potassium hydroxide is needed, and its molar mass is fifty six grams, so the answer is two point eight grams.',
    }),
    sl('diagram', 'Esterification in the laboratory', {
      b: 'Warm about 1 cm³ each of **ethanoic acid** and **ethanol** with **a few drops of concentrated sulphuric acid** in a test tube standing in a **hot water bath** for a few minutes. Pour the mixture into a beaker of cold water or sodium carbonate solution. An oily layer floats on top and a **sweet, fruity smell** is noticed: evidence that an **ester** has formed.',
      v: V.test,
      n: 'To make an ester in the laboratory, warm a little ethanoic acid and ethanol with a few drops of concentrated sulphuric acid in a test tube placed in hot water. After a few minutes, pour the mixture into cold water or sodium carbonate solution. An oily layer floats on top, and you notice a sweet, fruity smell. That smell tells you that an ester has formed.',
    }),
    sl('concept', 'The esterification equation', {
      b: 'Ethanoic acid + ethanol ⇌ ethyl ethanoate + water. **Concentrated sulphuric acid** is a **catalyst** and a **dehydrating agent** (it removes the water and so pushes the reaction forward). The ester is named from the alcohol part (**ethyl**) and the acid part (**ethanoate**). With methanol, ethanoic acid gives **methyl ethanoate**, CH₃COOCH₃.',
      v: chem('CH3COOH + C2H5OH <=>[{conc. H2SO4}] CH3COOC2H5 + H2O', 'Ethanoic acid plus ethanol, with concentrated sulphuric acid, gives ethyl ethanoate plus water, reversibly', 'Esterification is slow and reversible.'),
      n: 'The equation shows ethanoic acid and ethanol forming ethyl ethanoate and water. The double arrow means the reaction can go both ways. Concentrated sulphuric acid speeds it up and soaks up the water, which helps more ester to form. The ester takes the first part of its name from the alcohol and the second part from the acid.',
    }),
    sl('check', 'Quick check: making an ester', {
      b: 'Choose the reactants that give a named ester.',
      n: 'Quick check. An ester name has two words. The first word comes from the alcohol and the second from the acid. Split the name of the ester into its two parts and match each part to its parent compound.',
      chk: 'esterif-mcq',
    }),
    sl('concept', 'Uses of ethanoic acid', {
      b: 'Ethanoic acid is used both in the kitchen and in industry.',
      v: table(['Use', 'Detail'], [['Vinegar', 'Flavouring food and preserving pickles'], ['Making esters', 'For perfumes and food flavourings'], ['Rubber industry', 'Coagulating latex to make rubber sheets'], ['Making plastics and fibres', 'Cellulose acetate for films and rayon'], ['Laboratory reagent and solvent', 'Making ethanoates, such as sodium ethanoate']], 'Table of five uses of ethanoic acid with details'),
      n: 'Ethanoic acid is used as vinegar to flavour food and to preserve pickles. In industry it is used to make esters for perfumes and flavourings, to make cellulose acetate for films and fibres, and to coagulate rubber latex into sheets. In the laboratory it is used to make salts such as sodium ethanoate.',
    }),
    sl('summary', 'Summary: Part 2', {
      ul: [
        'Ethanoic (acetic) acid, CH₃COOH, contains the carboxyl group –COOH.',
        'Colourless, vinegar smell, boils at 118 °C, melts at about 17 °C; pure acid freezes into glacial acetic acid.',
        'A weak acid: turns blue litmus red; partly ionised.',
        'With alkalis: salt + water (CH₃COOH + NaOH → CH₃COONa + H₂O).',
        'With ethanol and conc. H₂SO₄: ethyl ethanoate, with a fruity smell. Uses: vinegar, esters, rubber, plastics.',
      ],
      v: table(['Reagent with ethanoic acid', 'Product', 'Observation'], [['Blue litmus', '—', 'Turns red'], ['Sodium hydroxide', 'Sodium ethanoate + water', 'No visible change (heat given out)'], ['Ethanol + conc. H₂SO₄', 'Ethyl ethanoate + water', 'Fruity smell']], 'Summary table of three reactions of ethanoic acid with products and observations'),
      n: 'Let us sum up Part 2. Ethanoic acid contains the carboxyl group. It smells of vinegar, boils at one hundred and eighteen degrees and freezes at about seventeen degrees, which is why the pure acid is called glacial. It is a weak acid that turns blue litmus red, neutralises alkalis to give salts, and forms fruity esters with alcohols.',
    }),
    sl('exam-tips', 'Exam tips: Part 2', {
      ul: [
        'Draw the carboxyl group with both oxygens: one C=O and one C–O–H.',
        'Explain "glacial": the pure acid freezes at about 17 °C into ice-like crystals.',
        'For esterification, give the observation (fruity smell) and the catalyst (conc. H₂SO₄).',
        'Ethanoic acid is weak because it is only partly ionised, not because it is organic.',
      ],
      v: table(['Slip', 'Fix'], [['CH₃COOH + NaOH → CH₃COONa + H₂', 'Alkali gives water, not hydrogen: … + H₂O'], ['Ester from ethanoic acid + methanol is ethyl methanoate', 'It is methyl ethanoate'], ['Glacial acetic acid is very cold acid', 'It is pure (anhydrous) acid that freezes at 17 °C']], 'Table of three common slips in Part 2 and their fixes'),
      n: 'Final tips. Draw both oxygens of the carboxyl group, one with a double bond and one carrying a hydrogen. When asked about glacial acetic acid, say that the pure acid freezes at about seventeen degrees into ice-like crystals. In esterification questions give the catalyst and the fruity smell. And name esters with the alcohol part first.',
    }),
  ],
});
