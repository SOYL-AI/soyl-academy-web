// ICSE 10 Chemistry ch10 Study of Compounds: Ammonia — two decks: Part 1 (t01–t04) laboratory preparation, drying and
// collection, nitrides and ammonium salts, Haber's process, density, solubility and the fountain experiment; Part 2
// (t04–t07) burning and catalytic oxidation, reducing reactions, chlorine, aqueous ammonia with acids and salt
// solutions, uses, ozone-safe refrigerants and tests.
import { sl, deck, table, flow, svgV, chem } from './lib.mjs';
import { NH3_PREP, FOUNTAIN_NH3 } from './svgs.mjs';

const V = {
  prep: svgV(NH3_PREP, 'Apparatus for preparing ammonia: a slanting flask of ammonium chloride and slaked lime, a drying tower of quicklime and an inverted gas jar filled by downward displacement of air'),
  fountain: svgV(FOUNTAIN_NH3, 'Fountain experiment with ammonia: an inverted flask of dry ammonia with a jet tube dipping into water coloured with red litmus, which rises as a blue fountain'),
};

export const deck1 = deck({
  part: 1,
  title: 'Ammonia — Part 1: Preparation, manufacture and physical properties',
  goals: [
    'Write the equation and describe the apparatus for preparing ammonia in the laboratory',
    'Explain why ammonia is dried over quicklime and collected by downward displacement of air',
    'Write equations for ammonia from nitrides and from ammonium salts',
    'State the conditions of Haber’s process and describe the fountain experiment',
  ],
  slides: [
    sl('title', 'The gas with a sharp smell', {
      b: 'Part 1 — Ammonia is the gas you smell near a cattle shed or a bottle of household cleaner. It is the only common **alkaline gas**, and it is made in huge amounts for **fertilisers**.',
      v: table(['Property', 'Ammonia'], [['Colour and smell', 'Colourless; sharp, pungent'], ['Density', 'Lighter than air (vapour density 8.5)'], ['Solubility in water', 'Extremely soluble'], ['Nature', 'Basic: turns moist red litmus blue'], ['Liquefies', 'Easily, under pressure']], 'Table of the physical properties of ammonia'),
      n: 'Namaste! Ammonia is the gas with the sharp smell you notice near a cattle shed or a bottle of household cleaner. It is the only common gas that is alkaline, and factories make millions of tonnes of it every year, mostly for fertilisers. In this part we prepare it, manufacture it, and study how light and how soluble it is.',
    }),
    sl('concept', 'Laboratory preparation', {
      b: 'A mixture of **ammonium chloride** and **slaked lime** (calcium hydroxide) is heated. The stronger base, calcium hydroxide, drives out the weaker base, ammonia.',
      v: chem('2NH4Cl + Ca(OH)2 -> CaCl2 + 2H2O + 2NH3', 'Equation: two ammonium chloride plus calcium hydroxide gives calcium chloride, two water and two ammonia', 'Laboratory preparation of ammonia'),
      n: 'In the laboratory, ammonium chloride is mixed with slaked lime, which is calcium hydroxide, and the mixture is heated. Calcium hydroxide is a stronger base than ammonia, so it pushes ammonia out of its salt. The products are calcium chloride, water and ammonia gas.',
    }),
    sl('diagram', 'The apparatus', {
      b: '- **Flask:** clamped **slanting**, mouth slightly lower, so that the **water formed** does not run back onto the hot glass and crack it.\n- **Drying tower:** packed with **quicklime** (CaO).\n- **Gas jar:** held **upside down**; ammonia rises and pushes the air down and out — **downward displacement of air**.',
      v: V.prep,
      n: 'Here is the apparatus. The flask is clamped in a slanting position with its mouth a little lower than its base, so the water formed runs towards the mouth and not back onto the hot glass. The gas passes up through a tower of quicklime to dry it, and it is collected in an upside down gas jar, pushing the heavier air down and out.',
    }),
    sl('check', 'Quick check: drying ammonia', {
      b: 'Choose the drying agent for ammonia.',
      n: 'Quick check. Ammonia is basic, so the drying agent must not be acidic and must not combine with it.',
      chk: 'dryagent-mcq',
    }),
    sl('concept', 'Drying and collecting', {
      b: '**Drying:** quicklime absorbs water and does **not** react with the basic gas. **Concentrated sulphuric acid** and **phosphorus pentoxide** are acidic and react; **anhydrous calcium chloride** forms CaCl₂·8NH₃.\n\n**Collection:** **downward displacement of air** — ammonia is **lighter than air** and **too soluble** to collect over water.\n\n**Jar full?** Moist red litmus turns **blue** at the mouth; a rod dipped in concentrated HCl gives **dense white fumes**.',
      v: table(['Drying agent', 'Used?', 'Reason'], [['Quicklime, CaO', 'Yes', 'Basic; does not react'], ['Conc. H₂SO₄', 'No', '2NH₃ + H₂SO₄ → (NH₄)₂SO₄'], ['Phosphorus pentoxide', 'No', 'Acidic oxide; reacts'], ['Anhydrous CaCl₂', 'No', 'Forms CaCl₂·8NH₃']], 'Table of possible drying agents for ammonia and why only quicklime is used'),
      n: 'Quicklime is used to dry ammonia, because it soaks up water and does not react with a basic gas. Concentrated sulphuric acid and phosphorus pentoxide are acidic, so they react with ammonia, and calcium chloride combines with it too. Ammonia is lighter than air and very soluble, so it is collected in an inverted jar. Moist red litmus turning blue shows the jar is full.',
    }),
    sl('concept', 'Other sources: nitrides and ammonium salts', {
      b: '**Metal nitrides** react with **warm water** to give ammonia and the metal hydroxide. **Any ammonium salt** gives ammonia when **warmed with an alkali** — this is also a **test for ammonium ions**.',
      v: table(['Reactants', 'Equation'], [['Magnesium nitride + water', 'Mg₃N₂ + 6H₂O → 3Mg(OH)₂ + 2NH₃'], ['Aluminium nitride + water', 'AlN + 3H₂O → Al(OH)₃ + NH₃'], ['Ammonium sulphate + NaOH', '(NH₄)₂SO₄ + 2NaOH → Na₂SO₄ + 2H₂O + 2NH₃'], ['Ammonium nitrate + KOH', 'NH₄NO₃ + KOH → KNO₃ + H₂O + NH₃']], 'Table of reactions that give ammonia from nitrides and from ammonium salts'),
      n: 'Ammonia can also be made in other ways. Metal nitrides, such as magnesium nitride and aluminium nitride, react with warm water to give ammonia and the metal hydroxide. And every ammonium salt gives off ammonia when it is warmed with an alkali such as sodium hydroxide. That is why the smell of ammonia on warming with an alkali is a test for ammonium salts.',
    }),
    sl('example', 'Worked example: ammonia from ammonium chloride', {
      b: '**Problem.** What volume of ammonia at STP is obtained by heating 21.4 g of ammonium chloride with excess slaked lime? (N = 14, H = 1, Cl = 35.5)\n\n**Step 1.** 2NH₄Cl + Ca(OH)₂ → CaCl₂ + 2H₂O + 2NH₃: 1 mole NH₄Cl gives 1 mole NH₃.\n\n**Step 2.** NH₄Cl = 14 + 4 + 35.5 = 53.5; moles = 21.4 ÷ 53.5 = 0.4.\n\n**Step 3.** Volume = 0.4 × 22.4 = **8.96 L**.',
      v: table(['Quantity', 'Value'], [['Molar mass of NH₄Cl', '53.5'], ['Moles of NH₄Cl', '0.4'], ['Moles of NH₃', '0.4'], ['Volume of NH₃ at STP', '8.96 L']], 'Table of the steps from 21.4 grams of ammonium chloride to 8.96 litres of ammonia'),
      n: 'From the equation, two units of ammonium chloride give two units of ammonia, so the ratio is one to one. The molar mass of ammonium chloride is fifty three point five, so twenty one point four grams is zero point four mole. Zero point four mole of a gas at standard conditions occupies zero point four times twenty two point four, which is eight point nine six litres.',
    }),
    sl('concept', 'Manufacture: Haber’s process', {
      b: '**Nitrogen** (from liquid air) and **hydrogen** are mixed in the ratio **1 : 3** by volume and passed over **finely divided iron** (promoter: **molybdenum**) at **450–500 °C** and **200–900 atm**. The reaction is **reversible** and **exothermic**.',
      v: chem('N2 + 3H2 <=> 2NH3', 'Equation: nitrogen plus three hydrogen reversibly gives two ammonia', 'Haber’s process: iron catalyst, molybdenum promoter, 450–500 °C, 200–900 atm'),
      n: 'Ammonia is made in industry by Haber’s process. Nitrogen from the air and hydrogen are mixed in the ratio one to three by volume. The mixture is compressed to between two hundred and nine hundred atmospheres and passed over finely divided iron, with molybdenum as a promoter, at four hundred and fifty to five hundred degrees Celsius. The reaction is reversible and gives out heat.',
    }),
    sl('diagram', 'Inside the Haber plant', {
      b: 'Only part of the gas mixture turns into ammonia in one pass. The gases leaving the converter are **cooled**: ammonia **liquefies** easily and is drawn off. The **unreacted nitrogen and hydrogen are recycled** over the catalyst.',
      v: flow('LR', [['a', 'N₂ + H₂ (1 : 3)'], ['b', 'Compressor: 200–900 atm'], ['c', 'Converter: Fe + Mo, 450–500 °C'], ['d', 'Cooler'], ['e', 'Liquid ammonia']], [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'e', 'ammonia liquefies'], ['d', 'b', 'unreacted gases recycled']], 'Flow of Haber’s process from the gas mixture through the compressor, converter and cooler to liquid ammonia, with unreacted gases recycled'),
      n: 'Only part of the nitrogen and hydrogen reacts on each trip through the converter. So the hot gas mixture is cooled. Ammonia turns into a liquid much more easily than nitrogen or hydrogen, so it condenses and is drawn off. The unreacted nitrogen and hydrogen are sent back through the compressor and over the catalyst again, so nothing is wasted.',
    }),
    sl('check', 'Quick check: Haber’s process', {
      b: 'Recall the catalyst used in Haber’s process.',
      n: 'Quick check. Remember the catalyst and the substance that improves it.',
      chk: 'catalyst-mcq',
    }),
    sl('example', 'Worked example: volumes in Haber’s process', {
      b: '**Problem.** 30 L of nitrogen reacts completely in Haber’s process. What volume of hydrogen does it need, and what volume of ammonia forms? (All volumes at the same temperature and pressure.)\n\n**Step 1.** N₂ + 3H₂ ⇌ 2NH₃: volumes react in the ratio 1 : 3 : 2 (Gay-Lussac’s law).\n\n**Step 2.** Hydrogen = 3 × 30 = **90 L**.\n\n**Step 3.** Ammonia = 2 × 30 = **60 L**.',
      v: table(['Gas', 'Volume ratio', 'Volume'], [['Nitrogen', '1', '30 L'], ['Hydrogen', '3', '90 L'], ['Ammonia', '2', '60 L']], 'Table of the volumes of nitrogen, hydrogen and ammonia in the ratio one to three to two'),
      n: 'Gases react in simple whole number ratios by volume, which is Gay-Lussac’s law. From the equation, one volume of nitrogen needs three volumes of hydrogen and gives two volumes of ammonia. So thirty litres of nitrogen needs ninety litres of hydrogen and gives sixty litres of ammonia.',
    }),
    sl('diagram', 'Density, solubility and the fountain', {
      b: 'Ammonia (M = 17) has a **vapour density of 8.5**: it is **lighter than air**. It is the **most soluble** common gas. In the **fountain experiment**, a flask of dry ammonia over water with **red litmus** gives a **blue fountain** (with phenolphthalein, a **pink** one): the gas is **very soluble** and its solution is **alkaline**.',
      v: V.fountain,
      n: 'Ammonia has a vapour density of eight point five, so it is lighter than air, and it dissolves in water more than almost any other gas. In the fountain experiment, a flask of dry ammonia is turned upside down over water coloured with red litmus. The gas dissolves, the pressure falls, the water shoots up as a fountain, and the red litmus turns blue.',
    }),
    sl('check', 'Quick check: the fountain', {
      b: 'Predict the colour of the fountain.',
      n: 'Quick check. A solution of ammonia is an alkali; think about what an alkali does to litmus.',
      chk: 'fountain-mcq',
    }),
    sl('summary', 'Summary: Part 1', {
      ul: [
        '2NH₄Cl + Ca(OH)₂ → CaCl₂ + 2H₂O + 2NH₃; flask slanting; dried over quicklime.',
        'Collected by downward displacement of air (lighter than air, very soluble).',
        'Nitrides + warm water and ammonium salts + alkali also give ammonia.',
        'Haber: N₂ + 3H₂ ⇌ 2NH₃; Fe with Mo promoter, 450–500 °C, 200–900 atm; NH₃ liquefied, gases recycled.',
        'Fountain experiment: very soluble, alkaline (red litmus turns blue).',
      ],
      v: table(['Feature', 'Ammonia', 'Hydrogen chloride'], [['Drying agent', 'Quicklime', 'Conc. H₂SO₄'], ['Collection', 'Downward displacement', 'Upward displacement'], ['Fountain colour', 'Red litmus turns blue', 'Blue litmus turns red']], 'Summary table comparing the drying, collection and fountain colour of ammonia and hydrogen chloride'),
      n: 'Let us sum up Part 1. Ammonia is made by heating ammonium chloride with slaked lime, dried over quicklime and collected in an inverted jar. Nitrides and ammonium salts also give ammonia. In industry it is made by Haber’s process over an iron catalyst. The fountain experiment shows that it is very soluble and that its solution is alkaline.',
    }),
    sl('exam-tips', 'Exam tips: Part 1', {
      ul: [
        'Give the reason for the slanting flask: water formed must not crack the hot glass.',
        'Name quicklime as the drying agent and say why the others fail.',
        'Learn Haber’s conditions exactly: 450–500 °C, 200–900 atm, iron with molybdenum, 1 : 3.',
        'Ammonia: downward displacement; hydrogen chloride: upward displacement.',
      ],
      v: table(['Slip', 'Fix'], [['Dried with conc. H₂SO₄', 'Dried with quicklime'], ['Catalyst is platinum', 'Haber: iron (platinum is for catalytic oxidation)'], ['Fountain turns red', 'Red litmus turns blue (alkaline)']], 'Table of three common slips in Part 1 and their fixes'),
      n: 'Some tips. Be ready to explain why the flask is clamped at a slant. Name quicklime as the drying agent and say why sulphuric acid and calcium chloride cannot be used. Learn the conditions of Haber’s process exactly. And do not mix up the catalysts: iron is for Haber’s process, while platinum is used for oxidising ammonia.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Ammonia — Part 2: Chemical properties, uses and tests',
  goals: [
    'Compare the burning of ammonia with its catalytic oxidation, with equations and conditions',
    'Write equations and observations for ammonia reducing hot metal oxides and reacting with chlorine',
    'Predict the precipitates formed by aqueous ammonia with salt solutions',
    'State the uses of ammonia, explain the move to ozone-safe refrigerants and describe tests for ammonia',
  ],
  slides: [
    sl('title', 'Ammonia reacts', {
      b: 'Part 2 — Ammonia **burns** in oxygen, is **oxidised** over platinum, **reduces** hot metal oxides, reacts with **chlorine**, and in water forms an **alkali** that precipitates metal hydroxides.',
      v: table(['Reaction', 'Main products'], [['Burning in oxygen', 'Nitrogen + water'], ['Catalytic oxidation (Pt, 800 °C)', 'Nitric oxide + water'], ['With hot CuO', 'Copper + water + nitrogen'], ['With chlorine', 'NH₄Cl + N₂ or NCl₃ + HCl'], ['Aqueous, with salt solutions', 'Metal hydroxide precipitates']], 'Table of the reactions of ammonia studied in Part 2 and their main products'),
      n: 'In this part we look at what ammonia does. It burns in oxygen, and over hot platinum it is oxidised to nitric oxide. It removes oxygen from hot metal oxides, it reacts in two different ways with chlorine, and its solution in water is an alkali that forms coloured precipitates with many metal salts.',
    }),
    sl('concept', 'Burning in oxygen', {
      b: 'Ammonia does **not burn in air** and does **not support combustion**. But a jet of ammonia burns in **oxygen** with a **greenish-yellow flame**, forming **nitrogen** and water vapour.',
      v: chem('4NH3 + 3O2 -> 2N2 + 6H2O', 'Equation: four ammonia plus three oxygen gives two nitrogen plus six water', 'Burning of ammonia in oxygen'),
      n: 'Ammonia does not burn in air, and a burning splint is put out in it. But if a jet of ammonia is lit inside a jar of oxygen, it burns with a greenish yellow flame. The hydrogen of ammonia joins with oxygen to form water vapour, and the nitrogen is set free as nitrogen gas.',
    }),
    sl('concept', 'Catalytic oxidation over platinum', {
      b: 'Over a **platinum** catalyst at about **800 °C**, ammonia is oxidised to **nitric oxide** instead of nitrogen. The reaction is **exothermic**, so the platinum stays red-hot. In air, nitric oxide forms **reddish-brown nitrogen dioxide**: 2NO + O₂ → 2NO₂. This is the first step of **Ostwald’s process** for nitric acid.',
      v: chem('4NH3 + 5O2 -> 4NO + 6H2O', 'Equation: four ammonia plus five oxygen gives four nitric oxide plus six water', 'Catalytic oxidation: platinum, about 800 °C'),
      n: 'With a platinum catalyst at about eight hundred degrees Celsius, ammonia reacts with oxygen in a different way and forms nitric oxide and water. The reaction gives out so much heat that the platinum keeps glowing red hot. Nitric oxide then combines with more oxygen to give reddish brown nitrogen dioxide. This is how nitric acid is made in industry.',
    }),
    sl('check', 'Quick check: the glowing coil', {
      b: 'Explain the platinum coil experiment.',
      n: 'Quick check. Think about the heat given out and the colour of the gas that forms in air.',
      chk: 'pt-mcq',
    }),
    sl('concept', 'Ammonia as a reducing agent', {
      b: 'Dry ammonia passed over **heated metal oxides** removes their oxygen, leaving the metal, water and **nitrogen**. With copper(II) oxide the **black** solid turns **reddish-brown**.',
      v: table(['Oxide', 'Equation', 'Colour change'], [['Copper(II) oxide', '3CuO + 2NH₃ → 3Cu + 3H₂O + N₂', 'Black → reddish-brown'], ['Lead(II) oxide', '3PbO + 2NH₃ → 3Pb + 3H₂O + N₂', 'Yellow → grey'], ['Lead(IV) oxide', '3PbO₂ + 4NH₃ → 3Pb + 6H₂O + 2N₂', 'Dark brown → grey']], 'Table of the reduction of copper and lead oxides by ammonia with equations and colour changes'),
      n: 'Ammonia is a reducing agent. When dry ammonia is passed over heated copper oxide, the black solid turns reddish brown as copper is formed, droplets of water collect, and nitrogen gas passes out of the tube. Heated lead oxides are reduced in the same way, leaving grey lead metal.',
    }),
    sl('example', 'Worked example: copper from copper oxide', {
      b: '**Problem.** Dry ammonia is passed over 15.9 g of heated copper(II) oxide until no further change occurs. What mass of copper remains? (Cu = 63.5, O = 16)\n\n**Step 1.** 3CuO + 2NH₃ → 3Cu + 3H₂O + N₂: 1 mole CuO gives 1 mole Cu.\n\n**Step 2.** CuO = 63.5 + 16 = 79.5; moles = 15.9 ÷ 79.5 = 0.2.\n\n**Step 3.** Copper = 0.2 × 63.5 = **12.7 g**.',
      v: table(['Quantity', 'Value'], [['Molar mass of CuO', '79.5'], ['Moles of CuO', '0.2'], ['Moles of Cu', '0.2'], ['Mass of Cu', '12.7 g']], 'Table of the steps from 15.9 grams of copper oxide to 12.7 grams of copper'),
      n: 'Each unit of copper oxide gives one unit of copper, so the mole ratio is one to one. The molar mass of copper oxide is seventy nine point five, so fifteen point nine grams is zero point two mole. Zero point two mole of copper, at sixty three point five grams per mole, has a mass of twelve point seven grams.',
    }),
    sl('concept', 'With chlorine and with hydrogen chloride', {
      b: '**Excess ammonia + chlorine:** dense white fumes of **ammonium chloride**, and nitrogen.\n\n**Ammonia + excess chlorine:** **nitrogen trichloride**, a yellow, **highly explosive** liquid, and hydrogen chloride.\n\n**With hydrogen chloride:** dense white fumes of ammonium chloride.',
      v: table(['Reactants', 'Equation', 'Observation'], [['Excess NH₃ + Cl₂', '8NH₃ + 3Cl₂ → 6NH₄Cl + N₂', 'Dense white fumes'], ['NH₃ + excess Cl₂', 'NH₃ + 3Cl₂ → NCl₃ + 3HCl', 'Yellow explosive liquid'], ['NH₃ + HCl', 'NH₃ + HCl → NH₄Cl', 'Dense white fumes']], 'Table of the reactions of ammonia with chlorine in excess of each and with hydrogen chloride'),
      n: 'With chlorine, the products depend on which gas is in excess. If ammonia is in excess, it mops up the hydrogen chloride formed, so we see dense white fumes of ammonium chloride, and nitrogen is set free. If chlorine is in excess, it replaces all three hydrogen atoms, forming nitrogen trichloride, a yellow liquid that explodes very easily.',
    }),
    sl('check', 'Quick check: ammonia and chlorine', {
      b: 'Identify the product when chlorine is in excess.',
      n: 'Quick check. When chlorine is in excess, every hydrogen atom of ammonia is replaced.',
      chk: 'excesscl-mcq',
    }),
    sl('concept', 'Aqueous ammonia: a weak alkali', {
      b: 'Ammonia dissolves in water to form **ammonium hydroxide**, a **weak alkali**: NH₃ + H₂O ⇌ NH₄OH. It **neutralises acids** to form ammonium salts and water.',
      v: table(['Acid', 'Equation'], [['Dilute sulphuric acid', '2NH₄OH + H₂SO₄ → (NH₄)₂SO₄ + 2H₂O'], ['Dilute nitric acid', 'NH₄OH + HNO₃ → NH₄NO₃ + H₂O'], ['Dilute hydrochloric acid', 'NH₄OH + HCl → NH₄Cl + H₂O']], 'Table of the neutralisation of three acids by ammonium hydroxide'),
      n: 'A solution of ammonia in water is called ammonium hydroxide. It is a weak alkali, because only a small part of it forms ions. Like any alkali, it neutralises acids: with sulphuric acid it gives ammonium sulphate, with nitric acid ammonium nitrate, and with hydrochloric acid ammonium chloride, each time with water.',
    }),
    sl('concept', 'Aqueous ammonia with salt solutions', {
      b: 'Ammonium hydroxide precipitates **metal hydroxides** from salt solutions. Watch the **colour** and whether the precipitate **dissolves in excess**.',
      v: table(['Salt solution', 'Precipitate', 'In excess NH₄OH'], [['Iron(III) chloride', 'Reddish-brown Fe(OH)₃', 'Insoluble'], ['Iron(II) sulphate', 'Dirty green Fe(OH)₂', 'Insoluble'], ['Lead nitrate', 'Chalky white Pb(OH)₂', 'Insoluble'], ['Zinc nitrate', 'White gelatinous Zn(OH)₂', 'Dissolves: colourless solution'], ['Copper sulphate', 'Pale blue Cu(OH)₂', 'Dissolves: deep blue solution']], 'Table of the precipitates formed by ammonium hydroxide with five salt solutions and their behaviour in excess'),
      n: 'Ammonium hydroxide gives coloured precipitates of metal hydroxides. Iron three chloride gives a reddish brown precipitate and iron two sulphate a dirty green one. Lead nitrate gives a chalky white precipitate that stays. Zinc nitrate gives a white precipitate that dissolves in excess, and copper sulphate gives a pale blue precipitate that dissolves to a deep blue solution.',
    }),
    sl('check', 'Quick check: precipitates', {
      b: 'Match a precipitate colour to a salt.',
      n: 'Quick check. Recall which iron compound gives the reddish brown hydroxide.',
      chk: 'fecl3-mcq',
    }),
    sl('example', 'Worked example: identifying a cation', {
      b: '**Problem.** Ammonium hydroxide is added drop by drop, then in excess, to a colourless solution. A white precipitate forms and then dissolves. Which cation is present: zinc or lead?\n\n**Answer.** Both zinc and lead give **white** precipitates, but only **zinc hydroxide dissolves** in excess ammonium hydroxide. The cation is **zinc**: Zn(NO₃)₂ + 2NH₄OH → Zn(OH)₂ + 2NH₄NO₃, and the precipitate then dissolves to a colourless solution.',
      v: flow('TB', [['a', 'Add NH₄OH, then excess'], ['b', 'Coloured precipitate'], ['c', 'White precipitate'], ['d', 'Reddish-brown: Fe³⁺; dirty green: Fe²⁺; pale blue then deep blue: Cu²⁺'], ['e', 'Dissolves in excess: Zn²⁺'], ['f', 'Stays: Pb²⁺']], [['a', 'b'], ['a', 'c'], ['b', 'd'], ['c', 'e'], ['c', 'f']], 'Decision flow for identifying iron, copper, zinc and lead ions with ammonium hydroxide'),
      n: 'Start with the colour. A coloured precipitate points to iron or copper. A white precipitate could be zinc or lead, so add excess ammonium hydroxide. Zinc hydroxide dissolves to give a colourless solution, but lead hydroxide does not. Here the precipitate dissolved, so the cation is zinc.',
    }),
    sl('concept', 'Uses of ammonia and ozone-safe refrigerants', {
      b: '- **Fertilisers:** urea, ammonium sulphate, ammonium nitrate, ammonium phosphate.\n- **Nitric acid** (Ostwald’s process) and **explosives** (e.g. ammonium nitrate).\n- **Refrigerant:** liquid ammonia absorbs much heat as it evaporates (ice plants, cold stores).\n- **Cleansing agent:** dilute ammonia solution removes grease.\n\n**CFCs** (chlorofluorocarbons) release chlorine that **destroys the ozone layer**; they are being replaced by **non-ozone-depleting** refrigerants such as HFCs, hydrocarbons and ammonia itself.',
      v: table(['Use', 'Property or product'], [['Fertilisers', 'Supplies nitrogen to crops'], ['Nitric acid', 'Catalytic oxidation of ammonia'], ['Refrigerant', 'High latent heat of vaporisation'], ['Cleaning', 'Alkaline; removes grease'], ['Replacing CFCs', 'Does not deplete ozone']], 'Table of the uses of ammonia with the property or product involved'),
      n: 'Most ammonia becomes fertilisers such as urea and ammonium sulphate. It is also oxidised to make nitric acid, which leads to explosives. Liquid ammonia is a refrigerant, because it absorbs a lot of heat when it evaporates. Older refrigerants called chlorofluorocarbons release chlorine that destroys the ozone layer, so they are being replaced by ozone safe refrigerants, including ammonia.',
    }),
    sl('concept', 'Tests for ammonia', {
      b: 'Ammonia is identified by its **smell** and by these tests.',
      v: table(['Test', 'Result'], [['Smell (waft carefully)', 'Sharp, pungent'], ['Moist red litmus', 'Turns blue'], ['Rod dipped in conc. HCl', 'Dense white fumes of NH₄Cl'], ['Copper sulphate solution', 'Pale blue precipitate, then deep blue solution']], 'Table of four tests for ammonia and their results'),
      n: 'To identify ammonia, first notice its sharp smell, wafting it gently towards your nose. Moist red litmus paper turns blue, because ammonia is the only common alkaline gas. A glass rod dipped in concentrated hydrochloric acid gives dense white fumes. And with copper sulphate solution it gives a pale blue precipitate that dissolves to a deep blue solution.',
    }),
    sl('summary', 'Summary: Part 2', {
      ul: [
        'Burning in oxygen: 4NH₃ + 3O₂ → 2N₂ + 6H₂O (greenish-yellow flame).',
        'Catalytic oxidation: 4NH₃ + 5O₂ → 4NO + 6H₂O (Pt, about 800 °C).',
        'Reducing agent: 3CuO + 2NH₃ → 3Cu + 3H₂O + N₂.',
        'Excess NH₃ + Cl₂ → NH₄Cl + N₂; excess Cl₂ → NCl₃ + HCl.',
        'NH₄OH: Fe(OH)₃ reddish-brown, Fe(OH)₂ dirty green, Pb(OH)₂ white; Zn(OH)₂ and Cu(OH)₂ dissolve in excess.',
      ],
      v: table(['Ion', 'With NH₄OH (excess)'], [['Fe³⁺', 'Reddish-brown, stays'], ['Fe²⁺', 'Dirty green, stays'], ['Pb²⁺', 'White, stays'], ['Zn²⁺', 'White, dissolves'], ['Cu²⁺', 'Pale blue, dissolves to deep blue']], 'Summary table of the behaviour of five metal ions with ammonium hydroxide'),
      n: 'Let us sum up Part 2. Ammonia burns in oxygen to give nitrogen, but over platinum it gives nitric oxide. It reduces hot copper oxide to copper. With chlorine, the products depend on which gas is in excess. Its solution is a weak alkali that neutralises acids and precipitates metal hydroxides, which we use to identify metal ions.',
    }),
    sl('exam-tips', 'Exam tips: Part 2', {
      ul: [
        'Burning gives N₂; catalytic oxidation gives NO — state the catalyst and temperature.',
        'With chlorine, always say which gas is in excess.',
        'For precipitates, give the colour and what happens in excess.',
        'Two tests for ammonia: moist red litmus turns blue; white fumes with a rod dipped in conc. HCl.',
      ],
      v: table(['Slip', 'Fix'], [['Burning gives NO', 'Burning gives N₂; only catalytic oxidation gives NO'], ['Lead hydroxide dissolves in excess', 'Only zinc and copper hydroxides dissolve'], ['Ammonia is an oxidising agent with CuO', 'It is a reducing agent']], 'Table of three common slips in Part 2 and their fixes'),
      n: 'Final tips. Keep the two oxidations apart: burning in oxygen gives nitrogen, while the platinum catalyst gives nitric oxide. In chlorine questions, check which gas is in excess. For precipitates, always state the colour and what happens when more ammonium hydroxide is added. And learn two tests for ammonia.',
    }),
  ],
});
