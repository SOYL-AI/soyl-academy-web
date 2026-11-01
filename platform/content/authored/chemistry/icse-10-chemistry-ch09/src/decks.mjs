// ICSE 10 Chemistry ch09 Study of Compounds: Hydrogen Chloride — two decks: Part 1 (t01–t03) laboratory preparation,
// drying and collection, density, solubility and the fountain experiment, hydrochloric acid and back suction;
// Part 2 (t04–t05) reactions with ammonia, metals, oxides, hydroxides, carbonates, sulphides and sulphites; aqua regia;
// precipitation with silver nitrate and lead nitrate; tests.
import { sl, deck, table, flow, svgV, chem } from './lib.mjs';
import { HCL_PREP, FOUNTAIN, FUNNEL } from './svgs.mjs';

const V = {
  prep: svgV(HCL_PREP, 'Apparatus for preparing hydrogen chloride: flask of sodium chloride and concentrated sulphuric acid with a thistle funnel, wash bottle of concentrated sulphuric acid, gas jar filled by upward displacement of air'),
  fountain: svgV(FOUNTAIN, 'Fountain experiment: an inverted flask of dry hydrogen chloride with a jet tube dipping into water coloured with blue litmus, which rises as a red fountain'),
  funnel: svgV(FUNNEL, 'Inverted funnel arrangement: hydrogen chloride led into a funnel whose rim just dips below the water in a beaker'),
};

export const deck1 = deck({
  part: 1,
  title: 'Hydrogen Chloride — Part 1: Preparation and physical properties',
  goals: [
    'Write the equation and describe the apparatus for preparing hydrogen chloride in the laboratory',
    'Explain the choice of drying agent and method of collection',
    'Describe experiments that show hydrogen chloride is heavier than air and very soluble in water',
    'Explain how the inverted funnel prevents back suction when making hydrochloric acid',
  ],
  slides: [
    sl('title', 'A gas that fumes in moist air', {
      b: 'Part 1 — Hydrogen chloride is a colourless gas with a sharp, choking smell. Open a jar of it in damp air and it forms **misty white fumes**: tiny droplets of hydrochloric acid.',
      v: table(['Property', 'Hydrogen chloride'], [['Colour and smell', 'Colourless; pungent, choking'], ['Density', 'Heavier than air (vapour density 18.25)'], ['Solubility in water', 'Extremely soluble'], ['In moist air', 'Fumes'], ['Effect on moist litmus', 'Blue turns red']], 'Table of the physical properties of hydrogen chloride'),
      n: 'Namaste! Hydrogen chloride is a colourless gas with a sharp, choking smell. When a jar of it is opened in damp air, it forms misty white fumes, because the gas dissolves in the water vapour to make tiny droplets of hydrochloric acid. In this part we make the gas, dry it, collect it, and look at how heavy and how soluble it is.',
    }),
    sl('concept', 'The reaction', {
      b: 'Sodium chloride (rock salt) is heated gently with **concentrated sulphuric acid**, keeping the temperature **below 200 °C**. The acid gives its hydrogen to the chloride, forming **sodium hydrogensulphate** and hydrogen chloride.\n\nAbove 200 °C the reaction goes further to sodium sulphate, which is **avoided** (see the worked example).',
      v: chem('NaCl + H2SO4 -> NaHSO4 + HCl', 'Equation: sodium chloride plus sulphuric acid gives sodium hydrogensulphate plus hydrogen chloride', 'Laboratory preparation, below 200 °C'),
      n: 'In the laboratory, sodium chloride is warmed with concentrated sulphuric acid. The temperature is kept below two hundred degrees Celsius. The products are sodium hydrogensulphate, which stays in the flask, and hydrogen chloride gas, which comes off. At higher temperatures a different salt forms, and we will see why that is a problem.',
    }),
    sl('diagram', 'The apparatus', {
      b: '- **Flask:** sodium chloride + concentrated sulphuric acid added through a **thistle funnel**; gentle heat.\n- **Wash bottle:** concentrated sulphuric acid **dries** the gas.\n- **Gas jar:** kept **upright**; the gas enters at the bottom and pushes the air out — **upward displacement of air**.',
      v: V.prep,
      n: 'Here is the apparatus. Concentrated sulphuric acid is added through a thistle funnel onto sodium chloride in a round bottomed flask, which is heated gently. The gas bubbles through a wash bottle of concentrated sulphuric acid to dry it. Then it is led to the bottom of an upright gas jar, where it pushes the lighter air out at the top.',
    }),
    sl('check', 'Quick check: drying the gas', {
      b: 'Choose the drying agent for hydrogen chloride.',
      n: 'Quick check. The drying agent must absorb water but must not react with an acidic gas.',
      chk: 'dry-mcq',
    }),
    sl('concept', 'Drying and collecting', {
      b: '**Drying:** concentrated sulphuric acid absorbs water and does **not** react with hydrogen chloride. Quicklime and caustic soda are **bases** and would react with the gas.\n\n**Collection:** by **upward displacement of air**, because the gas is **heavier than air**; never over water, because it is **extremely soluble**.\n\n**Jar full?** A rod dipped in ammonia solution at the mouth gives **dense white fumes**; moist blue litmus turns **red**.',
      v: table(['Choice', 'Used?', 'Reason'], [['Conc. sulphuric acid', 'Yes', 'Absorbs water; no reaction with HCl'], ['Quicklime, CaO', 'No', 'Basic: CaO + 2HCl → CaCl₂ + H₂O'], ['Collection over water', 'No', 'Gas is extremely soluble'], ['Upward displacement of air', 'Yes', 'Gas is heavier than air']], 'Table of choices for drying and collecting hydrogen chloride with reasons'),
      n: 'Concentrated sulphuric acid soaks up water but leaves hydrogen chloride alone, so it is the drying agent. Quicklime and caustic soda are bases, so they would react with the acidic gas. Hydrogen chloride is heavier than air, so it is collected in an upright jar, and it is far too soluble to collect over water. A rod dipped in ammonia solution shows when the jar is full.',
    }),
    sl('example', 'Worked example: why stay below two hundred degrees?', {
      b: '**Problem.** A student heats the flask strongly, well above 200 °C. What changes, and why is this avoided?\n\n**Step 1.** The reaction goes further: 2NaCl + H₂SO₄ → Na₂SO₄ + 2HCl.\n\n**Step 2.** Sodium sulphate forms a **hard crust** that sticks to the flask and is difficult to remove.\n\n**Step 3.** The high temperature **wastes fuel** and may **crack the glass** flask.',
      v: table(['Temperature', 'Salt left in flask', 'Problem'], [['Below 200 °C', 'NaHSO₄ (sodium hydrogensulphate)', 'None: easy to remove'], ['Well above 200 °C', 'Na₂SO₄ (sodium sulphate)', 'Hard crust; fuel wasted; glass may crack']], 'Table comparing the products and problems below and above 200 degrees Celsius'),
      n: 'If the flask is heated strongly, both hydrogen atoms of sulphuric acid are used and sodium sulphate is formed. This salt forms a hard crust that sticks to the flask and is very hard to clean out. The extra heat also wastes fuel and may crack the glass. So the mixture is warmed gently, below two hundred degrees Celsius.',
    }),
    sl('concept', 'Heavier than air', {
      b: 'Relative molecular mass of HCl = 1 + 35.5 = 36.5, so its **vapour density is 18.25**. Air has an average vapour density of about **14.4**, so hydrogen chloride is **heavier than air**.\n\n**Simple test:** tilt an open jar of the gas over an open jar of air as if pouring water. A rod dipped in ammonia solution then gives white fumes in the **lower** jar.',
      v: table(['Gas', 'Relative molecular mass', 'Vapour density', 'Compared with air'], [['Air (average)', 'about 28.8', 'about 14.4', '—'], ['Hydrogen chloride', '36.5', '18.25', 'Heavier'], ['Ammonia', '17', '8.5', 'Lighter']], 'Table of vapour densities of air, hydrogen chloride and ammonia'),
      n: 'The vapour density of a gas is half its relative molecular mass. For hydrogen chloride that is eighteen point two five, while air averages about fourteen point four. So hydrogen chloride is heavier than air. You can even pour it: tilt a jar of the gas over an empty jar, then a rod dipped in ammonia shows white fumes in the lower jar.',
    }),
    sl('diagram', 'The fountain experiment', {
      b: 'A dry flask of **dry hydrogen chloride** is clamped upside down with a jet tube dipping into water coloured with **blue litmus**. A few drops of water dissolve a large volume of gas, the **pressure inside falls**, and the outside air pressure pushes the water up as a **fountain**. The fountain turns **red**.\n\nThis shows the gas is **extremely soluble** and its solution is **acidic**.',
      v: V.fountain,
      n: 'In the fountain experiment, a dry flask full of dry hydrogen chloride is turned upside down, with a jet tube dipping into water coloured blue with litmus. As soon as a little water enters, it dissolves a huge amount of gas, so the pressure inside drops. The air pressing on the water outside pushes it up the tube in a fountain, and the blue colour turns red.',
    }),
    sl('check', 'Quick check: the fountain', {
      b: 'Interpret the fountain experiment.',
      n: 'Quick check. Ask what the fountain shows, and what the change of colour shows.',
      chk: 'fountain-mcq',
    }),
    sl('example', 'Worked example: how much gas from rock salt?', {
      b: '**Problem.** What mass of hydrogen chloride can be made from 23.4 g of sodium chloride? (Na = 23, Cl = 35.5, H = 1)\n\n**Step 1.** NaCl + H₂SO₄ → NaHSO₄ + HCl: one mole of NaCl gives one mole of HCl.\n\n**Step 2.** NaCl = 58.5; moles = 23.4 ÷ 58.5 = 0.4.\n\n**Step 3.** HCl = 36.5; mass = 0.4 × 36.5 = **14.6 g**.',
      v: table(['Substance', 'Molar mass', 'Moles', 'Mass'], [['NaCl', '58.5', '0.4', '23.4 g'], ['HCl', '36.5', '0.4', '14.6 g']], 'Table showing that 0.4 mole of sodium chloride gives 0.4 mole, or 14.6 grams, of hydrogen chloride'),
      n: 'From the equation, one mole of sodium chloride gives one mole of hydrogen chloride. The molar mass of sodium chloride is fifty eight point five, so twenty three point four grams is zero point four mole. Zero point four mole of hydrogen chloride, at thirty six point five grams per mole, has a mass of fourteen point six grams.',
    }),
    sl('diagram', 'Making hydrochloric acid: the inverted funnel', {
      b: 'If the delivery tube dipped straight into water, the gas would dissolve so fast that water could be **sucked back** into the hot flask (**back suction**), cracking it.\n\nInstead the gas enters an **inverted funnel** whose **rim just dips** below the water. If water rises into the funnel, the level in the beaker falls below the rim, **air enters**, and the water falls back. The funnel also gives a **large surface** for absorption.',
      v: V.funnel,
      n: 'To make hydrochloric acid we dissolve the gas in water, but the gas dissolves so quickly that water could be sucked back into the hot flask. So the gas is led into an upside down funnel whose rim just touches the water. If water rushes up into the funnel, the level outside drops below the rim, air gets in, and the water simply falls back.',
    }),
    sl('check', 'Quick check: back suction', {
      b: 'Explain the inverted funnel arrangement.',
      n: 'Quick check. Think about what happens when the rim of the funnel is no longer under water.',
      chk: 'funnel-mcq',
    }),
    sl('summary', 'Summary: Part 1', {
      ul: [
        'NaCl + H₂SO₄ → NaHSO₄ + HCl, heated below 200 °C.',
        'Dried by concentrated sulphuric acid; collected by upward displacement of air.',
        'Heavier than air (vapour density 18.25) and extremely soluble in water.',
        'The fountain experiment shows high solubility and acidity (blue litmus turns red).',
        'An inverted funnel prevents back suction when making hydrochloric acid.',
      ],
      v: table(['Step', 'Key point'], [['Preparation', 'NaCl and conc. H₂SO₄, below 200 °C'], ['Drying', 'Conc. H₂SO₄'], ['Collection', 'Upward displacement of air'], ['Dissolving', 'Inverted funnel']], 'Summary table of preparation, drying, collection and dissolving of hydrogen chloride'),
      n: 'Let us sum up Part 1. Hydrogen chloride is made by warming sodium chloride with concentrated sulphuric acid below two hundred degrees Celsius. It is dried by concentrated sulphuric acid and collected by upward displacement of air. It is heavier than air and extremely soluble, as the fountain experiment shows, and it is dissolved in water through an inverted funnel.',
    }),
    sl('exam-tips', 'Exam tips: Part 1', {
      ul: [
        'Write the condition “below 200 °C” with the preparation equation.',
        'For drying, say why the others fail: quicklime is basic and reacts.',
        'Use “upward displacement of air” — not “downward”, which is for ammonia.',
        'Explain the fountain with pressure: gas dissolves → pressure falls → air pushes water up.',
      ],
      v: table(['Slip', 'Fix'], [['Dried with quicklime', 'Dried with conc. sulphuric acid'], ['Collected over water', 'Upward displacement of air'], ['Fountain turns blue', 'Blue litmus turns red (acidic)']], 'Table of three common slips in Part 1 and their fixes'),
      n: 'Some tips. Always add the temperature condition to the preparation equation. When you name the drying agent, be ready to say why quicklime cannot be used. Remember that hydrogen chloride is collected by upward displacement of air. And explain the fountain experiment using pressure: the gas dissolves, the pressure falls, and the air outside pushes the water in.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Hydrogen Chloride — Part 2: Chemical properties and tests',
  goals: [
    'Write balanced equations for hydrochloric acid with metals, oxides, hydroxides, carbonates, hydrogencarbonates, sulphides and sulphites',
    'Describe the dense white fumes formed with ammonia',
    'State the composition and use of aqua regia',
    'Use silver nitrate and lead nitrate to identify hydrochloric acid and chlorides',
  ],
  slides: [
    sl('title', 'Hydrochloric acid at work', {
      b: 'Part 2 — In water, hydrogen chloride ionises completely, so hydrochloric acid is a **strong acid**. It shows all the typical reactions of acids, plus some special ones of its own.',
      v: table(['Reacts with', 'Main products'], [['Ammonia', 'Ammonium chloride (white fumes)'], ['Active metals', 'Metal chloride + hydrogen'], ['Oxides and hydroxides', 'Metal chloride + water'], ['Carbonates, hydrogencarbonates', 'Chloride + water + carbon dioxide'], ['Sulphides', 'Chloride + hydrogen sulphide'], ['Sulphites', 'Chloride + water + sulphur dioxide']], 'Table of the classes of substance that react with hydrochloric acid and the main products'),
      n: 'When hydrogen chloride dissolves in water it ionises completely, so hydrochloric acid is a strong acid. It reacts with metals, bases, carbonates, sulphides and sulphites like any acid, and it also has special reactions, such as the white fumes it forms with ammonia and the white precipitates it gives with silver nitrate and lead nitrate.',
    }),
    sl('concept', 'With ammonia: dense white fumes', {
      b: 'Hydrogen chloride and ammonia gas combine directly to form tiny solid particles of **ammonium chloride**, seen as **dense white fumes**. This is used to **identify** either gas, and to check whether a jar of either gas is full.',
      v: chem('NH3 + HCl -> NH4Cl', 'Equation: ammonia plus hydrogen chloride gives ammonium chloride', 'Dense white fumes of ammonium chloride'),
      n: 'When hydrogen chloride meets ammonia gas, the two combine at once to form ammonium chloride. This is a white solid, and it forms as a cloud of tiny particles, so we see dense white fumes. Because this reaction is so striking, a rod dipped in ammonia solution is used to test for hydrogen chloride, and a rod dipped in the acid is used to test for ammonia.',
    }),
    sl('concept', 'With active metals', {
      b: 'Metals **above hydrogen** in the activity series displace hydrogen: metal + hydrochloric acid → metal chloride + hydrogen. Iron gives **iron(II) chloride**. Metals **below hydrogen** (copper, silver, gold) do **not** react.',
      v: table(['Metal', 'Equation', 'Observation'], [['Zinc', 'Zn + 2HCl → ZnCl₂ + H₂', 'Effervescence; gas burns with a pop'], ['Magnesium', 'Mg + 2HCl → MgCl₂ + H₂', 'Vigorous effervescence'], ['Iron', 'Fe + 2HCl → FeCl₂ + H₂', 'Pale green solution'], ['Copper', 'No reaction', 'No change']], 'Table of the reactions of zinc, magnesium, iron and copper with dilute hydrochloric acid'),
      n: 'Metals that are above hydrogen in the activity series push hydrogen out of the acid. Zinc and magnesium fizz and give hydrogen, which burns with a pop. Iron gives a pale green solution of iron two chloride. Copper, silver and gold are below hydrogen, so they do not react with dilute hydrochloric acid at all.',
    }),
    sl('check', 'Quick check: acid and metal', {
      b: 'Predict the products of a metal with dilute hydrochloric acid.',
      n: 'Quick check. An active metal gives its chloride and one particular gas.',
      chk: 'zinc-mcq',
    }),
    sl('concept', 'With oxides and hydroxides', {
      b: 'Metal oxides and hydroxides are **bases**: they **neutralise** hydrochloric acid to give a **salt and water** only.',
      v: table(['Base', 'Equation', 'Observation'], [['Copper(II) oxide', 'CuO + 2HCl → CuCl₂ + H₂O', 'Black solid dissolves; blue-green solution'], ['Sodium hydroxide', 'NaOH + HCl → NaCl + H₂O', 'No visible change; heat given out'], ['Calcium hydroxide', 'Ca(OH)₂ + 2HCl → CaCl₂ + 2H₂O', 'Solid dissolves']], 'Table of the reactions of hydrochloric acid with copper oxide, sodium hydroxide and calcium hydroxide'),
      n: 'Metal oxides and hydroxides are bases, so they neutralise the acid, giving a salt and water. Warm black copper oxide dissolves to give a blue green solution of copper chloride. Sodium hydroxide gives common salt and water, with heat given out. Calcium hydroxide gives calcium chloride and water.',
    }),
    sl('concept', 'With carbonates and hydrogencarbonates', {
      b: 'Carbonates and hydrogencarbonates give a chloride, water and **carbon dioxide**, seen as **brisk effervescence**. The gas turns **lime water milky**.',
      v: table(['Substance', 'Equation'], [['Calcium carbonate (marble)', 'CaCO₃ + 2HCl → CaCl₂ + H₂O + CO₂'], ['Sodium carbonate', 'Na₂CO₃ + 2HCl → 2NaCl + H₂O + CO₂'], ['Sodium hydrogencarbonate', 'NaHCO₃ + HCl → NaCl + H₂O + CO₂']], 'Table of equations for hydrochloric acid with calcium carbonate, sodium carbonate and sodium hydrogencarbonate'),
      n: 'Carbonates and hydrogencarbonates fizz with hydrochloric acid, giving a chloride, water and carbon dioxide. Marble chips, washing soda and baking soda all behave this way. The gas is colourless and odourless, and it turns lime water milky. Notice that a carbonate needs two molecules of acid, while a hydrogencarbonate needs only one.',
    }),
    sl('example', 'Worked example: gas from marble', {
      b: '**Problem.** What volume of carbon dioxide at STP is given off when 25 g of marble (calcium carbonate) reacts completely with dilute hydrochloric acid? (Ca = 40, C = 12, O = 16; molar volume 22.4 L)\n\n**Step 1.** CaCO₃ + 2HCl → CaCl₂ + H₂O + CO₂: 1 mole CaCO₃ gives 1 mole CO₂.\n\n**Step 2.** CaCO₃ = 40 + 12 + 48 = 100; moles = 25 ÷ 100 = 0.25.\n\n**Step 3.** Volume = 0.25 × 22.4 = **5.6 L**.',
      v: table(['Quantity', 'Value'], [['Molar mass of CaCO₃', '100'], ['Moles of CaCO₃', '0.25'], ['Moles of CO₂', '0.25'], ['Volume of CO₂ at STP', '5.6 L']], 'Table of the steps from 25 grams of calcium carbonate to 5.6 litres of carbon dioxide'),
      n: 'Write the balanced equation first: one mole of calcium carbonate gives one mole of carbon dioxide. The molar mass of calcium carbonate is one hundred, so twenty five grams is a quarter of a mole. A quarter of a mole of gas at standard temperature and pressure occupies a quarter of twenty two point four litres, which is five point six litres.',
    }),
    sl('concept', 'With sulphides and sulphites', {
      b: '**Sulphides** give **hydrogen sulphide**, which smells of rotten eggs and turns lead acetate paper black. **Sulphites** give **sulphur dioxide**, which has a choking smell and turns orange acidified potassium dichromate **green**.',
      v: table(['Substance', 'Equation', 'Gas and its test'], [['Iron(II) sulphide', 'FeS + 2HCl → FeCl₂ + H₂S', 'Rotten-egg smell; lead acetate paper turns black'], ['Sodium sulphide', 'Na₂S + 2HCl → 2NaCl + H₂S', 'As above'], ['Sodium sulphite', 'Na₂SO₃ + 2HCl → 2NaCl + H₂O + SO₂', 'Choking smell; dichromate orange to green']], 'Table of the reactions of hydrochloric acid with sulphides and sulphites and the tests for the gases'),
      n: 'Sulphides react with the acid to give hydrogen sulphide, a gas that smells of rotten eggs and turns lead acetate paper black. Sulphites give sulphur dioxide, which has a choking smell and turns orange acidified potassium dichromate paper green. These two smells and tests help us identify unknown salts.',
    }),
    sl('example', 'Worked example: which salt gave the gas?', {
      b: '**Problem.** Dilute hydrochloric acid is added to an unknown white salt. A gas with a choking smell is given off; it turns acidified potassium dichromate paper green but does not blacken lead acetate paper. Identify the gas and suggest the salt.\n\n**Answer.** The gas is **sulphur dioxide** (choking smell, dichromate turns green). Lead acetate is not blackened, so it is **not** hydrogen sulphide. The salt is a **sulphite**, e.g. sodium sulphite: Na₂SO₃ + 2HCl → 2NaCl + H₂O + SO₂.',
      v: flow('TB', [['a', 'Gas from salt + dilute HCl'], ['b', 'Burns with a pop: hydrogen (metal)'], ['c', 'Lime water milky, no smell: CO₂ (carbonate)'], ['d', 'Rotten eggs, lead acetate black: H₂S (sulphide)'], ['e', 'Choking, dichromate green: SO₂ (sulphite)']], [['a', 'b'], ['a', 'c'], ['a', 'd'], ['a', 'e']], 'Decision flow linking the gas given off with dilute hydrochloric acid to the type of substance'),
      n: 'Use the properties of the gas. A choking smell points to sulphur dioxide or hydrogen sulphide. Acidified dichromate turning green fits sulphur dioxide, and the lead acetate paper staying unchanged rules out hydrogen sulphide. So the gas is sulphur dioxide, and the white salt must be a sulphite, such as sodium sulphite.',
    }),
    sl('concept', 'Precipitates with silver nitrate and lead nitrate', {
      b: '**Silver nitrate:** a **curdy white precipitate** of silver chloride, **insoluble in dilute nitric acid** but soluble in excess ammonium hydroxide.\n\n**Lead nitrate:** a **white precipitate** of lead chloride, which **dissolves on heating** and reappears on cooling.',
      v: table(['Reagent', 'Equation', 'Precipitate'], [['Silver nitrate', 'AgNO₃ + HCl → AgCl + HNO₃', 'Curdy white; insoluble in dil. HNO₃'], ['Lead nitrate', 'Pb(NO₃)₂ + 2HCl → PbCl₂ + 2HNO₃', 'White; soluble in hot water']], 'Table of the precipitation reactions of hydrochloric acid with silver nitrate and lead nitrate'),
      n: 'Hydrochloric acid gives two important white precipitates. With silver nitrate solution it forms curdy white silver chloride, which does not dissolve in dilute nitric acid but does dissolve in excess ammonium hydroxide. With lead nitrate it forms white lead chloride, which dissolves when the mixture is heated and comes back on cooling.',
    }),
    sl('check', 'Quick check: precipitates', {
      b: 'Recognise the silver chloride precipitate.',
      n: 'Quick check. Recall the colour of silver chloride and how it behaves in nitric acid.',
      chk: 'ppt-mcq',
    }),
    sl('concept', 'Aqua regia', {
      b: '**Aqua regia** (“royal water”) is a mixture of **three volumes of concentrated hydrochloric acid** and **one volume of concentrated nitric acid**. Nitric acid oxidises hydrochloric acid to **nascent chlorine**, which converts **gold and platinum** into soluble chlorides. It is used to dissolve these noble metals.',
      v: chem('HNO3 + 3HCl -> NOCl + 2H2O + 2Cl', 'Equation: nitric acid plus three hydrogen chloride gives nitrosyl chloride, two water and two nascent chlorine', 'Formation of nascent chlorine in aqua regia'),
      n: 'Aqua regia means royal water, because it dissolves gold, the king of metals. It is made by mixing three volumes of concentrated hydrochloric acid with one volume of concentrated nitric acid. The nitric acid oxidises the hydrochloric acid to give very reactive nascent chlorine, which turns gold and platinum into soluble chlorides.',
    }),
    sl('check', 'Quick check: aqua regia', {
      b: 'Recall how aqua regia is made.',
      n: 'Quick check. Which acid is present in the larger amount?',
      chk: 'aqua-mcq',
    }),
    sl('concept', 'Tests for hydrogen chloride and hydrochloric acid', {
      b: 'Hydrogen chloride gas and its solution are identified by these tests.',
      v: table(['Test', 'Result', 'For'], [['Moist blue litmus', 'Turns red', 'HCl gas'], ['Rod dipped in ammonia solution', 'Dense white fumes', 'HCl gas'], ['Silver nitrate solution (+ dil. HNO₃)', 'Curdy white precipitate', 'Hydrochloric acid (chloride ion)'], ['Lead nitrate solution', 'White precipitate, dissolves on heating', 'Hydrochloric acid (chloride ion)']], 'Table of the tests for hydrogen chloride gas and hydrochloric acid with their results'),
      n: 'To identify hydrogen chloride gas, hold moist blue litmus in it, which turns red, or a rod dipped in ammonia solution, which gives dense white fumes. To identify hydrochloric acid, add silver nitrate solution, which gives a curdy white precipitate that does not dissolve in dilute nitric acid. Lead nitrate gives a white precipitate that dissolves on heating.',
    }),
    sl('summary', 'Summary: Part 2', {
      ul: [
        'NH₃ + HCl → NH₄Cl: dense white fumes.',
        'Active metals give hydrogen; oxides and hydroxides give salt and water; carbonates give CO₂.',
        'Sulphides give H₂S; sulphites give SO₂.',
        'Silver nitrate: curdy white AgCl, insoluble in dil. HNO₃; lead nitrate: PbCl₂, soluble in hot water.',
        'Aqua regia: 3 volumes conc. HCl + 1 volume conc. HNO₃; dissolves gold.',
      ],
      v: table(['Reagent', 'Product with HCl'], [['Ammonia', 'NH₄Cl fumes'], ['Zinc', 'H₂'], ['Marble', 'CO₂'], ['Sodium sulphite', 'SO₂'], ['Silver nitrate', 'AgCl precipitate']], 'Summary table of reagents and their products with hydrochloric acid'),
      n: 'Let us sum up Part 2. Hydrogen chloride forms white fumes with ammonia. As an acid, it gives hydrogen with active metals, salt and water with bases, and carbon dioxide with carbonates. Sulphides give hydrogen sulphide and sulphites give sulphur dioxide. Silver nitrate and lead nitrate give white precipitates, and aqua regia dissolves gold.',
    }),
    sl('exam-tips', 'Exam tips: Part 2', {
      ul: [
        'Iron with dilute HCl gives iron(II) chloride, FeCl₂, not FeCl₃.',
        'State observations: effervescence, smell, colour of solution or precipitate.',
        'For silver chloride, add that it is insoluble in dilute nitric acid.',
        'Aqua regia is 3 : 1 hydrochloric acid to nitric acid — not the other way round.',
      ],
      v: table(['Slip', 'Fix'], [['Fe + HCl gives FeCl₃', 'It gives FeCl₂'], ['Copper gives hydrogen', 'No reaction: copper is below hydrogen'], ['Lead chloride insoluble when hot', 'It dissolves in hot water']], 'Table of three common slips in Part 2 and their fixes'),
      n: 'Final tips. Iron reacts with dilute hydrochloric acid to give iron two chloride. In observation questions, describe what you see or smell: fizzing, colours, precipitates. When you describe silver chloride, add that it does not dissolve in dilute nitric acid. And remember that aqua regia has three parts of hydrochloric acid to one part of nitric acid.',
    }),
  ],
});
