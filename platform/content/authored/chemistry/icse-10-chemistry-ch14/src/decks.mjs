// ICSE 10 Chemistry ch14 Hydrocarbons: Alkanes, Alkenes and Alkynes — two decks: Part 1 (t01, t02, t06) alkanes,
// methane as a greenhouse gas, preparation of methane and ethane, combustion and substitution, uses; Part 2 (t03–t06)
// preparation of ethene and ethyne, addition of hydrogen and halogens, the bromine test, uses.
import { sl, deck, table, flow, chem, svgV, r } from './lib.mjs';
import { ALKANES, METHANE_PREP, CHLORINATION, UNSAT, ETHYNE_PREP, ADDITION, BROMINE_TEST } from './svgs.mjs';

const V = {
  alkanes: svgV(ALKANES, 'Displayed formulae of methane and ethane, both with only single bonds'),
  methanePrep: svgV(METHANE_PREP, 'Apparatus for preparing methane by heating sodium ethanoate with soda lime and collecting the gas over water'),
  chlorination: svgV(CHLORINATION, 'Methane changing step by step into chloromethane, dichloromethane, trichloromethane and tetrachloromethane'),
  unsat: svgV(UNSAT, 'Displayed formulae of ethene with a double bond and ethyne with a triple bond'),
  ethynePrep: svgV(ETHYNE_PREP, 'Apparatus for preparing ethyne by dripping water onto calcium carbide and collecting the gas over water'),
  addition: svgV(ADDITION, 'Ethene adding one molecule of bromine and ethyne adding two molecules of bromine'),
  test: svgV(BROMINE_TEST, 'Bromine water staying orange-brown with ethane but turning colourless with ethene'),
};

export const deck1 = deck({
  part: 1,
  title: 'Hydrocarbons — Part 1: Alkanes (methane and ethane)',
  goals: [
    'Write the general formula of alkanes and explain why methane is a greenhouse gas of concern',
    'Write equations with conditions for preparing methane and ethane by each listed method',
    'Write equations for complete and incomplete combustion of methane and ethane',
    'Write the stepwise substitution products of methane with chlorine in diffused sunlight',
  ],
  slides: [
    sl('title', 'The fuels in the pipeline', {
      b: 'Part 1 — Natural gas, biogas and CNG are mostly **methane**; LPG is mainly propane and butane. These are **alkanes**, the simplest family of hydrocarbons. We learn how methane and ethane are made in the laboratory and how they react.',
      v: table(['Fuel', 'Main alkanes', 'Where it is used'], [['Natural gas, CNG', 'Methane (with some ethane)', 'Buses, autorickshaws, piped gas'], ['Biogas', 'Methane (with CO₂)', 'Village cooking, from cow dung'], ['LPG', 'Propane and butane', 'Kitchen cylinders']], 'Table of three everyday fuels, the alkanes in them and where they are used'),
      n: 'Namaste! The gas that runs many city buses, the biogas made from cow dung and the gas piped into kitchens are all mostly methane. The gas in a cooking cylinder is a mixture of propane and butane. All of these are alkanes. In this part we study the first two alkanes, methane and ethane: how to make them and how they react.',
    }),
    sl('concept', 'Alkanes: the saturated family', {
      b: '**Alkanes** are saturated hydrocarbons: every carbon–carbon bond is a **single** bond. General formula **CₙH₂ₙ₊₂**: methane CH₄ (n = 1), ethane C₂H₆ (n = 2), propane C₃H₈ (n = 3). With no double or triple bond to open up, alkanes are **fairly unreactive**: they burn, and they undergo **substitution** with chlorine, but they do not add other molecules.',
      v: V.alkanes,
      n: 'Alkanes contain only single bonds between their carbon atoms, so we call them saturated. Each member has two more hydrogen atoms than twice its number of carbon atoms. Because there is no double or triple bond, alkanes are rather unreactive. Their two important reactions are burning in air and swapping hydrogen atoms for chlorine atoms.',
    }),
    sl('concept', 'Methane: a greenhouse gas of concern', {
      b: 'Methane is released by **paddy fields**, **cattle** (digestion), **landfills** and rotting waste, **coal mines** and leaks from **natural-gas** pipelines. Like carbon dioxide, it **absorbs infrared radiation** given off by the Earth and so **traps heat**. Molecule for molecule it traps **far more heat** than carbon dioxide (roughly 25–30 times over a century), so even small amounts add to **global warming**.',
      v: table(['Source of methane', 'Why methane forms'], [['Flooded paddy fields', 'Bacteria break down plant matter without air'], ['Cattle', 'Digestion of grass in the stomach'], ['Landfills and sewage', 'Rotting of waste without air'], ['Gas wells and pipelines', 'Leaks of natural gas']], 'Table of four sources of methane in the atmosphere and why methane forms there'),
      n: 'Methane escapes into the air from flooded rice fields, from the stomachs of cattle, from rotting rubbish and from leaking gas pipes. Like carbon dioxide, it soaks up heat given off by the Earth and keeps the atmosphere warm. In fact each molecule of methane traps much more heat than a molecule of carbon dioxide, which is why it is a greenhouse gas of real concern.',
    }),
    sl('check', 'Quick check: greenhouse gases', {
      b: 'Explain why methane in the air is a concern.',
      n: 'Quick check. Think about what greenhouse gases do to the heat given off by the Earth, and compare methane with carbon dioxide molecule for molecule. Remember that methane comes from rice fields, cattle and rubbish dumps, and choose your answer.',
      chk: 'greenhouse-mcq',
    }),
    sl('concept', 'Methane from sodium ethanoate', {
      b: 'Heating the sodium salt of a carboxylic acid with **soda lime** (sodium hydroxide + calcium oxide) removes CO₂ from it as sodium carbonate — **decarboxylation** — and gives an alkane with **one carbon fewer**. Sodium ethanoate (sodium acetate) gives methane. **Calcium oxide** keeps the sodium hydroxide dry and stops it from attacking the glass; it does not take part in the reaction.',
      v: chem('CH3COONa + NaOH ->[CaO][heat] CH4 + Na2CO3', 'Sodium ethanoate plus sodium hydroxide, heated with calcium oxide, gives methane and sodium carbonate', 'Decarboxylation: the alkane has one carbon atom fewer than the salt.'),
      n: 'To make methane, sodium ethanoate is heated with soda lime, a mixture of sodium hydroxide and calcium oxide. The sodium hydroxide takes away carbon dioxide from the salt as sodium carbonate, leaving methane. This is called decarboxylation, and the alkane always has one carbon atom fewer than the salt. The calcium oxide simply keeps the sodium hydroxide dry and protects the glass.',
    }),
    sl('diagram', 'Laboratory preparation of methane', {
      b: 'A dry mixture of sodium ethanoate and soda lime (about 1 : 3) is heated in a **hard glass test tube**, clamped with its mouth slightly lower than its base so that any moisture does not run back onto the hot glass. Methane is **collected over water** (downward displacement of water) because it is **nearly insoluble in water**. It is a colourless, odourless gas, lighter than air.',
      v: V.methanePrep,
      n: 'In the laboratory, a dry mixture of sodium ethanoate and soda lime is heated strongly in a hard glass test tube. The tube is tilted slightly downward so that moisture cannot run back and crack the hot glass. Methane hardly dissolves in water, so it is collected by letting it push water out of an upside down gas jar standing in a trough.',
    }),
    sl('concept', 'Ethane from sodium propanoate; alkanes from alkyl halides', {
      b: '**Ethane** is made the same way from **sodium propanoate**. Alkanes also form when an alkyl halide is **reduced** by **nascent hydrogen**, [H], produced from a **zinc–copper couple** and ethanol: iodomethane gives methane and bromoethane gives ethane.',
      v: table(['Starting compound', 'Reagent and condition', 'Product', 'Equation'], [['Sodium ethanoate', 'Soda lime, heat', 'Methane', 'CH₃COONa + NaOH → CH₄ + Na₂CO₃'], ['Sodium propanoate', 'Soda lime, heat', 'Ethane', 'C₂H₅COONa + NaOH → C₂H₆ + Na₂CO₃'], ['Iodomethane', 'Zn–Cu couple + ethanol', 'Methane', 'CH₃I + 2[H] → CH₄ + HI'], ['Bromoethane', 'Zn–Cu couple + ethanol', 'Ethane', 'C₂H₅Br + 2[H] → C₂H₆ + HBr']], 'Table of four methods of preparing methane and ethane with reagents, products and equations'),
      n: 'Ethane is made in the same way as methane, by heating sodium propanoate with soda lime. There is a second route too. An alkyl halide is reduced by freshly made, or nascent, hydrogen from a zinc and copper couple in ethanol. The halogen atom is replaced by hydrogen, so iodomethane gives methane and bromoethane gives ethane.',
    }),
    sl('example', 'Worked example: mass of ethane from its salt', {
      b: r`**Problem.** 9.6 g of sodium propanoate, C₂H₅COONa, is heated with excess soda lime. Find the mass of ethane formed. (C = 12, H = 1, O = 16, Na = 23)

**Step 1.** Molar mass of C₂H₅COONa: $3 \times 12 + 5 \times 1 + 2 \times 16 + 23 = 96$ g.

**Step 2.** Moles of salt: $\frac{9.6}{96} = 0.1$ mol.

**Step 3.** One mole of salt gives one mole of ethane (C₂H₆, 30 g), so mass of ethane $= 0.1 \times 30 = 3$ g.`,
      v: chem('C2H5COONa + NaOH ->[CaO][heat] C2H6 + Na2CO3', 'Sodium propanoate plus sodium hydroxide, heated with calcium oxide, gives ethane and sodium carbonate', '1 mol of salt gives 1 mol of ethane.'),
      n: 'First find the molar mass of sodium propanoate: three carbons, five hydrogens, two oxygens and one sodium make ninety six grams. So nine point six grams is one tenth of a mole. The equation shows that each mole of the salt gives one mole of ethane, which weighs thirty grams. One tenth of that is three grams of ethane.',
    }),
    sl('check', 'Quick check: preparing alkanes', {
      b: 'Predict the alkane formed from a sodium salt.',
      n: 'Quick check. When a sodium salt of a carboxylic acid is heated with soda lime, carbon dioxide is removed. Count the carbon atoms in the salt, take one away, and name the alkane that is left.',
      chk: 'salt-mcq',
    }),
    sl('concept', 'Combustion: complete and incomplete', {
      b: 'In **plenty of air**, alkanes burn with a **blue, non-sooty flame** to give carbon dioxide and water, releasing much heat — so they are good **fuels**. In a **limited supply of air**, combustion is **incomplete**: poisonous **carbon monoxide** (and soot) form.\n\n- CH₄ + 2O₂ → CO₂ + 2H₂O\n- 2CH₄ + 3O₂ → 2CO + 4H₂O (limited air)\n- 2C₂H₆ + 5O₂ → 4CO + 6H₂O (limited air)',
      v: chem('2C2H6 + 7O2 -> 4CO2 + 6H2O', 'Two ethane plus seven oxygen gives four carbon dioxide plus six water', 'Complete combustion of ethane in excess air.'),
      n: 'With plenty of air, methane and ethane burn with a clean blue flame, forming carbon dioxide and water and giving out a lot of heat. That is why they are used as fuels. If the air supply is poor, burning is incomplete, and carbon monoxide and soot are formed. Carbon monoxide is poisonous, so gas heaters must never be used in a closed room.',
    }),
    sl('example', 'Worked example: volumes of gases in combustion', {
      b: r`**Problem.** 50 cm³ of methane is burnt completely in oxygen. Find the volume of oxygen used and of carbon dioxide formed, all volumes at the same temperature and pressure.

**Step 1.** Equation: CH₄ + 2O₂ → CO₂ + 2H₂O. By Gay-Lussac's law, gas volumes are in the ratio of the coefficients: 1 : 2 : 1.

**Step 2.** Oxygen: $50 \times 2 = 100$ cm³.

**Step 3.** Carbon dioxide: $50 \times 1 = 50$ cm³. (Water condenses to a liquid at room temperature.)`,
      v: table(['Gas', 'Coefficient', 'Volume / cm³'], [['Methane', '1', '50'], ['Oxygen', '2', '100'], ['Carbon dioxide', '1', '50']], 'Table of the volumes of methane, oxygen and carbon dioxide in the combustion of fifty cubic centimetres of methane'),
      n: 'Write the balanced equation first: one methane and two oxygen give one carbon dioxide and two water. For gases at the same temperature and pressure, volumes react in the same simple ratio as the coefficients. So fifty cubic centimetres of methane needs twice that, one hundred, of oxygen, and forms fifty of carbon dioxide.',
    }),
    sl('concept', 'Substitution with chlorine', {
      b: 'In **diffused sunlight**, chlorine **replaces** the hydrogen atoms of methane **one at a time** — a **substitution** reaction typical of saturated compounds. Each step gives off HCl:\n\n- CH₄ + Cl₂ → CH₃Cl + HCl (chloromethane)\n- CH₃Cl + Cl₂ → CH₂Cl₂ + HCl (dichloromethane)\n- CH₂Cl₂ + Cl₂ → CHCl₃ + HCl (trichloromethane, chloroform)\n- CHCl₃ + Cl₂ → CCl₄ + HCl (tetrachloromethane, carbon tetrachloride)\n\nIn the dark there is no reaction; in **direct** sunlight the mixture explodes. Ethane reacts in the same way: C₂H₆ + Cl₂ → C₂H₅Cl + HCl.',
      v: V.chlorination,
      n: 'Methane and chlorine do nothing in the dark. In diffused sunlight, chlorine atoms replace the hydrogen atoms of methane one at a time, giving off hydrogen chloride at each step. The products are chloromethane, dichloromethane, trichloromethane, which is chloroform, and finally carbon tetrachloride. Ethane reacts in the same way to give chloroethane first. In bright direct sunlight the mixture can explode.',
    }),
    sl('check', 'Quick check: substitution', {
      b: 'Predict the product of the next substitution step.',
      n: 'Quick check. In each step of the reaction, one more hydrogen atom of methane is replaced by a chlorine atom. Count the chlorine atoms in the compound you are given and add one more, and remember that hydrogen chloride is given off each time.',
      chk: 'subst-mcq',
    }),
    sl('concept', 'Uses of methane and ethane', {
      b: 'Methane and ethane burn cleanly and give a lot of heat, so their main use is as **fuels**. They are also **raw materials** for the chemical industry.',
      v: table(['Alkane', 'Uses'], [['Methane', 'Fuel (natural gas, CNG, biogas); making hydrogen, carbon black for tyres and inks, and chloromethanes'], ['Ethane', 'Fuel; heated (cracked) to make ethene for plastics; making chloroethane']], 'Table of the uses of methane and ethane'),
      n: 'Because they burn cleanly and release a lot of heat, methane and ethane are mostly used as fuels, in natural gas, compressed natural gas and biogas. Methane is also used to make hydrogen and carbon black, the black filler in tyres and printing ink. Ethane is heated in industry to make ethene, the starting material for many plastics.',
    }),
    sl('summary', 'Summary: Part 1', {
      ul: [
        'Alkanes: saturated, CₙH₂ₙ₊₂; methane and ethane are the first two.',
        'Methane traps heat strongly: a greenhouse gas from paddy fields, cattle, landfills and gas leaks.',
        'Sodium ethanoate or sodium propanoate + soda lime → methane or ethane (one carbon fewer).',
        'Iodomethane or bromoethane + nascent hydrogen (Zn–Cu couple, ethanol) → methane or ethane.',
        'Complete combustion gives CO₂ and H₂O; limited air gives CO. Chlorine substitutes H atoms one at a time in diffused sunlight.',
      ],
      v: table(['Reaction', 'Type', 'Condition'], [['Salt + soda lime', 'Decarboxylation', 'Heat'], ['Alkyl halide + [H]', 'Reduction', 'Zn–Cu couple, ethanol'], ['Alkane + Cl₂', 'Substitution', 'Diffused sunlight']], 'Summary table of three reactions with their type and condition'),
      n: 'Let us sum up Part 1. Alkanes are saturated hydrocarbons, and methane is a powerful greenhouse gas. Methane and ethane are made by heating sodium salts with soda lime, or by reducing alkyl halides with nascent hydrogen. They burn completely to carbon dioxide and water, or incompletely to carbon monoxide. With chlorine in diffused sunlight they undergo substitution.',
    }),
    sl('exam-tips', 'Exam tips: Part 1', {
      ul: [
        'Always write the condition over the arrow: soda lime and heat; Zn–Cu couple; diffused sunlight.',
        'Decarboxylation: the alkane has one carbon fewer than the sodium salt.',
        'Balance ethane combustion carefully: 2C₂H₆ + 7O₂ → 4CO₂ + 6H₂O.',
        'Say "diffused sunlight" for chlorination; dark gives no reaction, direct sunlight an explosion.',
      ],
      v: table(['Slip', 'Fix'], [['Sodium ethanoate gives ethane', 'It gives methane (one carbon fewer)'], ['C₂H₆ + 3O₂ → 2CO₂ + 3H₂O', 'Not balanced: 2C₂H₆ + 7O₂ → 4CO₂ + 6H₂O'], ['Methane collected by upward displacement of air', 'Collected over water: it is nearly insoluble']], 'Table of three common slips in Part 1 and their fixes'),
      n: 'Some tips. Always write the reagents and conditions on the arrow. Remember that the alkane formed from a sodium salt has one carbon atom fewer than the salt. Check the balancing of ethane combustion, which needs two ethane and seven oxygen. And for chlorination, say diffused sunlight, because there is no reaction in the dark and an explosion in bright sunlight.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Hydrocarbons — Part 2: Alkenes and alkynes (ethene and ethyne)',
  goals: [
    'Write equations with conditions for preparing ethene from bromoethane and from ethanol',
    'Write equations with conditions for preparing ethyne from calcium carbide and from 1,2-dibromoethane',
    'Write the addition products of ethene and ethyne with hydrogen and each halogen',
    'Use bromine solution to distinguish saturated from unsaturated hydrocarbons, and give uses of each hydrocarbon',
  ],
  slides: [
    sl('title', 'Bonds that can open up', {
      b: 'Part 2 — **Ethene** (C₂H₄, the first alkene) has a C=C double bond; **ethyne** (C₂H₂, the first alkyne, also called acetylene) has a C≡C triple bond. These **unsaturated** hydrocarbons are made by **removing** small molecules from saturated compounds, and they react by **adding** molecules across the multiple bond.',
      v: V.unsat,
      n: 'Ethene has a double bond between its two carbon atoms, and ethyne has a triple bond. They are unsaturated. In the laboratory they are made by removing small molecules such as water or hydrogen bromide from saturated compounds. And their typical reactions do the reverse: other molecules add across the double or triple bond.',
    }),
    sl('concept', 'Ethene from bromoethane: dehydrohalogenation', {
      b: 'Boiling **bromoethane** with a concentrated solution of **potassium hydroxide in ethanol** (alcoholic KOH) removes **one H atom and one Br atom** from neighbouring carbon atoms as HBr. This is **dehydrohalogenation** (here dehydrobromination). Note: **aqueous** KOH gives ethanol instead, not ethene.',
      v: chem('C2H5Br + KOH ->[{alcohol, heat}] C2H4 + KBr + H2O', 'Bromoethane plus potassium hydroxide in alcohol, heated, gives ethene, potassium bromide and water', 'Alcoholic KOH removes H and Br from neighbouring carbons.'),
      n: 'Ethene can be made from bromoethane by boiling it with potassium hydroxide dissolved in alcohol. A hydrogen atom from one carbon and the bromine atom from the next carbon are removed together, and a double bond forms between the two carbons. The reaction is called dehydrohalogenation. Be careful: with potassium hydroxide dissolved in water, bromoethane gives ethanol instead.',
    }),
    sl('concept', 'Ethene from ethanol: dehydration', {
      b: 'Ethanol is heated with **excess concentrated sulphuric acid** at about **170 °C**. The acid is a **dehydrating agent**: it removes a molecule of water from each ethanol molecule. The gas is passed through **sodium hydroxide solution** to remove the impurities sulphur dioxide and carbon dioxide, and is collected **over water**.\n\nC₂H₅OH → C₂H₄ + H₂O (conc. H₂SO₄, 170 °C)',
      v: flow('LR', [['a', 'Ethanol + excess conc. H₂SO₄'], ['b', 'Heat to about 170 °C'], ['c', 'Wash gas in NaOH solution (removes SO₂, CO₂)'], ['d', 'Collect ethene over water']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Flow of the preparation of ethene from ethanol: heat with concentrated sulphuric acid, wash the gas in sodium hydroxide, collect over water'),
      n: 'Ethene can also be made by heating ethanol with excess concentrated sulphuric acid to about one hundred and seventy degrees Celsius. The acid pulls a molecule of water out of each ethanol molecule. Some of the acid is reduced to sulphur dioxide, so the gas is washed in sodium hydroxide solution to remove acidic gases, and then collected over water.',
    }),
    sl('check', 'Quick check: preparing ethene', {
      b: 'Choose the reagent that converts a given compound into ethene.',
      n: 'Quick check. Ethene can be made by removing hydrogen bromide from bromoethane or water from ethanol. Decide which reagent removes which small molecule, and remember that the solvent matters: potassium hydroxide in alcohol behaves differently from potassium hydroxide in water.',
      chk: 'dehydro-mcq',
    }),
    sl('diagram', 'Ethyne from calcium carbide', {
      b: 'Water is dropped slowly from a dropping funnel onto lumps of **calcium carbide**. Ethyne is given off at once and **collected over water**; the residue is calcium hydroxide. Water is added **drop by drop** because the reaction is fast and gives out much heat.\n\nCaC₂ + 2H₂O → C₂H₂ + Ca(OH)₂\n\nPure ethyne is almost odourless; gas from commercial carbide smells of **garlic** because of impurities such as phosphine.',
      v: V.ethynePrep,
      n: 'In the laboratory, water is dripped onto lumps of calcium carbide in a flask. Ethyne bubbles off straight away and is collected over water, and calcium hydroxide is left behind. The water is added slowly because the reaction is rapid and very hot. Gas made from impure carbide smells of garlic, but this smell comes from impurities, not from ethyne itself.',
    }),
    sl('concept', 'Ethyne from 1,2-dibromoethane', {
      b: '**1,2-dibromoethane** (CH₂Br–CH₂Br) has a bromine atom on each carbon. Boiling it with **alcoholic potassium hydroxide** removes **two** molecules of HBr, one after the other, and leaves a **triple bond**: CH₂Br–CH₂Br → CH≡CH. This is a double dehydrohalogenation.',
      v: chem('C2H4Br2 + 2KOH ->[{alcohol, heat}] C2H2 + 2KBr + 2H2O', 'One two dibromoethane plus two potassium hydroxide in alcohol gives ethyne, two potassium bromide and two water', 'Two molecules of HBr are removed from each molecule.'),
      n: 'One two dibromoethane has a bromine atom on each of its two carbon atoms. Boiling it with alcoholic potassium hydroxide removes hydrogen bromide twice. After the first removal a double bond forms; after the second, a triple bond. So the final product is ethyne, along with potassium bromide and water.',
    }),
    sl('example', 'Worked example: reagents and conditions', {
      b: '**Problem.** Name the reagent and condition, and write the equation, for (a) ethanol → ethene; (b) bromoethane → ethene; (c) 1,2-dibromoethane → ethyne.\n\n**(a)** Excess conc. H₂SO₄, about 170 °C: C₂H₅OH → C₂H₄ + H₂O.\n\n**(b)** Alcoholic KOH, boil: C₂H₅Br + KOH → C₂H₄ + KBr + H₂O.\n\n**(c)** Alcoholic KOH, boil: C₂H₄Br₂ + 2KOH → C₂H₂ + 2KBr + 2H₂O.\n\n**Check.** Count atoms of each element on both sides of every equation.',
      v: table(['Change', 'Small molecule removed', 'Reagent'], [['Ethanol → ethene', 'H₂O', 'Conc. H₂SO₄, 170 °C'], ['Bromoethane → ethene', 'HBr', 'Alcoholic KOH'], ['1,2-dibromoethane → ethyne', '2HBr', 'Alcoholic KOH']], 'Table of three preparations with the small molecule removed and the reagent used'),
      n: 'Ask what must be removed. To turn ethanol into ethene, water is removed, so we need a dehydrating agent, concentrated sulphuric acid. To turn bromoethane into ethene, hydrogen bromide is removed by alcoholic potassium hydroxide. One two dibromoethane loses hydrogen bromide twice to give ethyne, so two units of potassium hydroxide are needed.',
    }),
    sl('check', 'Quick check: preparing ethyne', {
      b: 'Identify the products of a reaction that gives ethyne.',
      n: 'Quick check. Calcium carbide reacts with water to give ethyne. Think about what is left of the calcium, and remember that a metal oxide that meets water usually ends up as a hydroxide. Then match both products to the options.',
      chk: 'carbide-mcq',
    }),
    sl('concept', 'Addition of hydrogen', {
      b: 'Unsaturated hydrocarbons undergo **addition** reactions: atoms add across the multiple bond, which becomes a single bond. With **hydrogen**, in the presence of finely divided **nickel** at about 300 °C (hydrogenation):\n\n- C₂H₄ + H₂ → C₂H₆ (ethene → ethane)\n- C₂H₂ + H₂ → C₂H₄, then C₂H₄ + H₂ → C₂H₆\n\nOverall, ethyne adds **two** molecules of hydrogen.',
      v: chem('C2H2 + 2H2 ->[{Ni, about 300 °C}] C2H6', 'Ethyne plus two hydrogen over nickel at about three hundred degrees gives ethane', 'Ethyne adds hydrogen in two steps, through ethene.'),
      n: 'Because ethene and ethyne have spare bonds, other molecules can add across them. With hydrogen, over a nickel catalyst at about three hundred degrees Celsius, ethene becomes ethane. Ethyne first becomes ethene and then ethane, so overall it adds two molecules of hydrogen. Adding hydrogen in this way is called hydrogenation.',
    }),
    sl('concept', 'Addition of halogens', {
      b: 'Chlorine, bromine and iodine add across C=C and C≡C at room temperature, with **no sunlight needed**.\n\n- C₂H₄ + Cl₂ → C₂H₄Cl₂ (1,2-dichloroethane)\n- C₂H₄ + Br₂ → C₂H₄Br₂ (1,2-dibromoethane)\n- C₂H₄ + I₂ → C₂H₄I₂ (1,2-diiodoethane)\n- C₂H₂ + 2Br₂ → C₂H₂Br₄ (1,1,2,2-tetrabromoethane); with chlorine, 1,1,2,2-tetrachloroethane\n\nEthene adds **one** molecule of halogen; ethyne adds **two**.',
      v: V.addition,
      n: 'Halogens add across the double bond of ethene easily, without any sunlight. Chlorine gives one two dichloroethane, bromine gives one two dibromoethane, and iodine gives one two diiodoethane, with one halogen atom on each carbon. Ethyne adds two molecules of halogen, so with bromine it ends up with two bromine atoms on each carbon.',
    }),
    sl('example', 'Worked example: how much bromine?', {
      b: r`**Problem.** What mass of bromine adds completely to (a) 1.4 g of ethene, (b) 1.3 g of ethyne? (C = 12, H = 1, Br = 80)

**(a)** C₂H₄ = 28 g mol⁻¹: $\frac{1.4}{28} = 0.05$ mol. One Br₂ per C₂H₄: $0.05 \times 160 = 8$ g of bromine.

**(b)** C₂H₂ = 26 g mol⁻¹: $\frac{1.3}{26} = 0.05$ mol. Two Br₂ per C₂H₂: $0.05 \times 2 \times 160 = 16$ g of bromine.`,
      v: table(['Hydrocarbon', 'Moles', 'Br₂ needed per mole', 'Mass of Br₂ / g'], [['Ethene, 1.4 g', '0.05', '1', '8'], ['Ethyne, 1.3 g', '0.05', '2', '16']], 'Table comparing the bromine needed by equal numbers of moles of ethene and ethyne'),
      n: 'Change each mass into moles. One point four grams of ethene is five hundredths of a mole, and so is one point three grams of ethyne. Each mole of ethene adds one mole of bromine, which weighs one hundred and sixty grams, so eight grams are needed. Ethyne adds two moles of bromine per mole, so it needs twice as much: sixteen grams.',
    }),
    sl('concept', 'Test for unsaturation', {
      b: 'Bubble the gas into **bromine water** (or bromine dissolved in tetrachloromethane), which is **orange-brown**.\n\n- **Ethene or ethyne**: the colour disappears at once — bromine **adds** across the multiple bond to give colourless products.\n- **Ethane or methane**: the colour **stays** (in the dark there is no substitution, and alkanes cannot add bromine).\n\nThis distinguishes **saturated** from **unsaturated** hydrocarbons.',
      v: V.test,
      n: 'To test for a double or triple bond, bubble the gas through orange brown bromine water. Ethene and ethyne take up the bromine at once by addition, and the solution turns colourless. Ethane and methane cannot add bromine, so the colour stays. This simple test tells a saturated hydrocarbon from an unsaturated one.',
    }),
    sl('check', 'Quick check: the bromine test', {
      b: 'Predict which hydrocarbons decolourise bromine water.',
      n: 'Quick check. Only hydrocarbons with a double or triple bond can add bromine and remove its colour. Decide which of the gases in the question are saturated and which are unsaturated before you choose. Remember that a triple bond counts as unsaturated too.',
      chk: 'br2-mcq',
    }),
    sl('concept', 'Uses of ethene and ethyne', {
      b: 'Ethene and ethyne are important raw materials, and ethyne gives one of the hottest flames known.',
      v: table(['Hydrocarbon', 'Uses'], [['Ethene', 'Making polythene; making ethanol and other chemicals; ripening fruit (a natural plant hormone)'], ['Ethyne', 'Oxy-acetylene flame (about 3000 °C) for welding and cutting metals; making plastics such as PVC; lighting in old carbide lamps']], 'Table of the uses of ethene and ethyne'),
      n: 'Ethene is the starting material for polythene and for making ethanol, and in small amounts it helps fruits to ripen, since plants produce it naturally. Ethyne burnt in pure oxygen gives the oxy acetylene flame, hot enough to weld and cut steel. It was also once burnt in carbide lamps used by miners.',
    }),
    sl('summary', 'Summary: Part 2', {
      ul: [
        'Ethene: bromoethane + alcoholic KOH (dehydrohalogenation); ethanol + conc. H₂SO₄ at 170 °C (dehydration).',
        'Ethyne: calcium carbide + water; 1,2-dibromoethane + alcoholic KOH (two HBr removed).',
        'Addition: H₂ over Ni at about 300 °C; Cl₂, Br₂, I₂ at room temperature. Ethene adds one molecule, ethyne two.',
        'Bromine water is decolourised by ethene and ethyne but not by alkanes.',
        'Uses: methane and ethane as fuels; ethene for polythene and ripening; ethyne for welding.',
      ],
      v: table(['Compound', 'Made from', 'Typical reaction'], [['Ethene', 'Ethanol or bromoethane', 'Adds 1 H₂ or 1 X₂'], ['Ethyne', 'Calcium carbide or 1,2-dibromoethane', 'Adds 2 H₂ or 2 X₂']], 'Summary table of ethene and ethyne: how each is made and its typical reaction'),
      n: 'Let us sum up Part 2. Ethene is made by removing hydrogen bromide from bromoethane or water from ethanol. Ethyne is made from calcium carbide and water, or by removing hydrogen bromide twice from one two dibromoethane. Both add hydrogen and halogens; ethene adds one molecule and ethyne two. Both decolourise bromine water, which alkanes do not.',
    }),
    sl('exam-tips', 'Exam tips: Part 2', {
      ul: [
        'Write "alcoholic KOH" — aqueous KOH with bromoethane gives ethanol, not ethene.',
        'For dehydration of ethanol, give both the reagent (conc. H₂SO₄) and the temperature (about 170 °C).',
        'Name addition products with numbers: 1,2-dibromoethane, 1,1,2,2-tetrabromoethane.',
        'State the observation in the bromine test: orange-brown to colourless.',
      ],
      v: table(['Slip', 'Fix'], [['Ethyne + Br₂ → C₂H₂Br₂ as the final product', 'With excess bromine: C₂H₂ + 2Br₂ → C₂H₂Br₄'], ['Ethene + Br₂ needs sunlight', 'Addition needs no sunlight'], ['"Bromine water turns colourless with ethane"', 'Only unsaturated compounds decolourise it']], 'Table of three common slips in Part 2 and their fixes'),
      n: 'Final tips. Always write alcoholic potassium hydroxide, because the aqueous solution gives ethanol instead. For the dehydration of ethanol, mention both concentrated sulphuric acid and the temperature. Name the addition products in full with their position numbers. And in the bromine test, describe the colour change from orange brown to colourless.',
    }),
  ],
});
