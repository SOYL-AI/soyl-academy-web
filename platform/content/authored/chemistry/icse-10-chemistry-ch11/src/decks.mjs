// ICSE 10 Chemistry ch11 Study of Compounds: Nitric Acid — two decks: Part 1 (t01, t02) laboratory preparation in an
// all-glass apparatus, conditions and precautions, the yellow colour of the concentrated acid, and Ostwald's process
// (equations and conditions only); Part 2 (t03–t05) nitric acid as an oxidising agent with copper, carbon and sulphur,
// its acidic properties, and tests for nitric acid.
import { sl, deck, table, flow, svgV, chem } from './lib.mjs';
import { HNO3_RETORT, BROWN_RING } from './svgs.mjs';

const V = {
  retort: svgV(HNO3_RETORT, 'All-glass apparatus for preparing nitric acid: a stoppered glass retort of potassium nitrate and concentrated sulphuric acid heated gently, its neck leading into a receiver cooled by water'),
  ring: svgV(BROWN_RING, 'Brown ring test: concentrated sulphuric acid poured down the side of a tube holding the test solution and iron(II) sulphate forms a lower layer, with a brown ring at the junction'),
};

export const deck1 = deck({
  part: 1,
  title: 'Nitric Acid — Part 1: Laboratory preparation and Ostwald’s process',
  goals: [
    'Write the equation for preparing nitric acid from potassium or sodium nitrate',
    'Describe the all-glass apparatus and explain the precautions taken',
    'Explain why concentrated nitric acid often looks yellow',
    'Write the equations, with conditions, for Ostwald’s process',
  ],
  slides: [
    sl('title', 'Aqua fortis: strong water', {
      b: 'Part 1 — Nitric acid, HNO₃, was once called **aqua fortis** (strong water) because it attacks most metals. It is a **strong acid** and a **strong oxidising agent**, and it is made in huge amounts for **fertilisers** and **explosives**.',
      v: table(['Property', 'Nitric acid'], [['Formula', 'HNO₃ (monobasic)'], ['Pure acid', 'Colourless, fuming liquid'], ['Laboratory concentrated acid', 'Often pale yellow'], ['Main uses', 'Fertilisers such as ammonium nitrate, explosives, dyes']], 'Table of the formula, appearance and uses of nitric acid'),
      n: 'Namaste! Nitric acid was once called strong water, because it dissolves most metals. It is a strong acid, and also a powerful oxidising agent. Factories make it in enormous quantities, mainly to turn into fertilisers such as ammonium nitrate, and also for explosives and dyes. In this part we prepare it in the laboratory and see how it is made on a large scale.',
    }),
    sl('concept', 'Laboratory preparation', {
      b: '**Potassium nitrate** (or sodium nitrate) is heated gently with **concentrated sulphuric acid**. Sulphuric acid is **less volatile** (higher boiling) than nitric acid, so it drives the more volatile nitric acid out as vapour, which is then condensed.\n\nWith sodium nitrate: NaNO₃ + H₂SO₄ → NaHSO₄ + HNO₃.',
      v: chem('KNO3 + H2SO4 -> KHSO4 + HNO3', 'Equation: potassium nitrate plus sulphuric acid gives potassium hydrogen sulphate plus nitric acid', 'Below 200 °C'),
      n: 'In the laboratory, potassium nitrate is warmed with concentrated sulphuric acid. Sulphuric acid has a much higher boiling point than nitric acid, so the nitric acid formed escapes as a vapour and can be condensed. The other product is potassium hydrogen sulphate. Sodium nitrate works in exactly the same way, giving sodium hydrogen sulphate.',
    }),
    sl('diagram', 'An all-glass apparatus', {
      b: '- A **glass retort** with a **glass stopper** holds the mixture.\n- The retort neck leads into a **receiver** kept **cold** with running water.\n- **No cork or rubber**: nitric acid vapour **attacks** them.\n- Heat **gently**, keeping the temperature **below 200 °C**.',
      v: V.retort,
      n: 'The whole apparatus is made of glass. The mixture is heated in a glass retort closed with a glass stopper, and its long neck leads into a receiver flask cooled by cold water. Nitric acid vapour is so corrosive that it attacks cork and rubber, so neither is used anywhere. The vapour condenses in the cold receiver as a slightly yellow liquid.',
    }),
    sl('check', 'Quick check: the apparatus', {
      b: 'Explain a feature of the apparatus used to prepare nitric acid.',
      n: 'Quick check. Think about what hot nitric acid vapour does to cork and rubber stoppers.',
      chk: 'glass-chk-mcq',
    }),
    sl('concept', 'Why keep the temperature below 200 °C?', {
      b: 'At higher temperatures the acid salt reacts further, which would need much more heat:\n\nKNO₃ + KHSO₄ → K₂SO₄ + HNO₃ (needs a high temperature)\n\nWe avoid this because:',
      v: table(['Reason', 'Explanation'], [['Nitric acid decomposes', 'Strong heat breaks it down into nitrogen dioxide, water and oxygen'], ['Glass may crack', 'The retort could break at very high temperatures'], ['Hard residue', 'Potassium sulphate forms a hard crust that is difficult to remove'], ['Wasted fuel', 'More heat gives little extra acid']], 'Table of four reasons for keeping the temperature below two hundred degrees Celsius'),
      n: 'The mixture is heated gently, below two hundred degrees Celsius. At a higher temperature, the acid salt left behind would react with more nitrate, but that needs strong heating. Strong heat would decompose some of the nitric acid, could crack the glass retort, would leave a hard crust of potassium sulphate that is difficult to remove, and would waste fuel.',
    }),
    sl('example', 'Worked example: how much acid?', {
      b: '**Problem.** What mass of nitric acid can be obtained from 50.5 g of potassium nitrate, heated with excess concentrated sulphuric acid below 200 °C? (K = 39, N = 14, O = 16, H = 1)\n\n**Step 1.** KNO₃ + H₂SO₄ → KHSO₄ + HNO₃: 1 mole KNO₃ gives 1 mole HNO₃.\n\n**Step 2.** KNO₃ = 39 + 14 + 48 = 101; moles = 50.5 ÷ 101 = 0.5.\n\n**Step 3.** HNO₃ = 1 + 14 + 48 = 63; mass = 0.5 × 63 = **31.5 g**.',
      v: table(['Quantity', 'Value'], [['Molar mass of KNO₃', '101'], ['Moles of KNO₃', '0.5'], ['Moles of HNO₃', '0.5'], ['Mass of HNO₃ (molar mass 63)', '31.5 g']], 'Table of the steps from 50.5 grams of potassium nitrate to 31.5 grams of nitric acid'),
      n: 'The equation shows one unit of potassium nitrate giving one unit of nitric acid. The molar mass of potassium nitrate is one hundred and one, so fifty point five grams is half a mole. Half a mole of nitric acid, whose molar mass is sixty three, has a mass of thirty one point five grams.',
    }),
    sl('concept', 'Why the acid looks yellow', {
      b: 'Nitric acid **decomposes** slightly on heating or in **sunlight**. The **reddish-brown nitrogen dioxide** formed dissolves in the acid and makes it **yellow**. It is stored in **dark brown bottles**.\n\nThe yellow colour can be removed by **bubbling dry air** (or carbon dioxide) through the **warm** acid, which sweeps out the NO₂, or by **adding water**, which converts the dissolved NO₂ into nitric acid.',
      v: chem('4HNO3 -> 4NO2 + 2H2O + O2', 'Equation: four nitric acid gives four nitrogen dioxide plus two water plus oxygen', 'Decomposition by heat or light'),
      n: 'Pure nitric acid is colourless, but the acid in the laboratory often looks yellow. Heat and sunlight break a little of it down into nitrogen dioxide, water and oxygen. The reddish brown nitrogen dioxide dissolves in the acid and colours it yellow. That is why nitric acid is kept in brown bottles. Blowing dry air through the warm acid removes the colour.',
    }),
    sl('check', 'Quick check: the yellow colour', {
      b: 'Explain why a bottle of concentrated nitric acid turns yellow.',
      n: 'Quick check. Which coloured gas does nitric acid give off when light falls on it?',
      chk: 'yellow-chk-mcq',
    }),
    sl('concept', 'Ostwald’s process: step 1', {
      b: '**Dry ammonia** and **air** (about **1 : 10** by volume) are passed over a **platinum gauze** catalyst at about **800 °C**. Ammonia is oxidised to **nitric oxide**. The reaction is **exothermic**, so once started it keeps the gauze **red-hot** without outside heating.',
      v: chem('4NH3 + 5O2 -> 4NO + 6H2O', 'Equation: four ammonia plus five oxygen gives four nitric oxide plus six water', 'Platinum gauze, about 800 °C'),
      n: 'Industry makes nitric acid by Ostwald’s process. Dry ammonia mixed with about ten times its volume of air is passed over a platinum gauze heated to about eight hundred degrees Celsius. The ammonia is oxidised to nitric oxide and steam. The reaction gives out heat, so after it starts, the gauze stays red hot on its own.',
    }),
    sl('concept', 'Ostwald’s process: steps 2 and 3', {
      b: '**Step 2.** On cooling, nitric oxide combines with more oxygen to give **nitrogen dioxide**: 2NO + O₂ → 2NO₂.\n\n**Step 3.** Nitrogen dioxide is **absorbed in water** in the presence of **excess air** to give nitric acid: 4NO₂ + 2H₂O + O₂ → 4HNO₃.\n\nOverall, one molecule of NH₃ gives one molecule of HNO₃.',
      v: flow('LR', [['a', 'NH₃ + air (1 : 10)'], ['b', 'Pt gauze, about 800 °C'], ['c', 'Nitric oxide, NO'], ['d', '+ O₂ on cooling: NO₂'], ['e', '+ water and air: HNO₃']], [['a', 'b'], ['b', 'c', 'step 1'], ['c', 'd', 'step 2'], ['d', 'e', 'step 3']], 'Flow of the three steps of Ostwald’s process from ammonia and air to nitric acid'),
      n: 'The nitric oxide is cooled, and it combines with more oxygen from the air to form reddish brown nitrogen dioxide. This gas is then dissolved in water while extra air is supplied, which gives nitric acid. Follow the nitrogen atom: one ammonia molecule ends up as one nitric acid molecule.',
    }),
    sl('example', 'Worked example: acid from ammonia', {
      b: '**Problem.** In Ostwald’s process, what mass of nitric acid can be made from 6.8 g of ammonia, assuming complete conversion? (N = 14, H = 1, O = 16)\n\n**Step 1.** Follow the nitrogen: 4NH₃ → 4NO → 4NO₂ → 4HNO₃, so 1 mole NH₃ gives 1 mole HNO₃.\n\n**Step 2.** NH₃ = 17; moles = 6.8 ÷ 17 = 0.4.\n\n**Step 3.** Mass of HNO₃ = 0.4 × 63 = **25.2 g**.',
      v: table(['Quantity', 'Value'], [['Molar mass of NH₃', '17'], ['Moles of NH₃', '0.4'], ['Moles of HNO₃ (1 : 1)', '0.4'], ['Mass of HNO₃', '25.2 g']], 'Table of the steps from 6.8 grams of ammonia to 25.2 grams of nitric acid'),
      n: 'Look at the three equations together. Four ammonia molecules give four nitric oxide, then four nitrogen dioxide, then four nitric acid, so the ratio is one to one. Six point eight grams of ammonia is zero point four mole, since its molar mass is seventeen. Zero point four mole of nitric acid has a mass of twenty five point two grams.',
    }),
    sl('check', 'Quick check: Ostwald’s process', {
      b: 'Recall the catalyst and conditions of the first step.',
      n: 'Quick check. Which metal gauze is used to oxidise ammonia, and at roughly what temperature?',
      chk: 'pt-chk-mcq',
    }),
    sl('concept', 'Physical properties', {
      b: 'Pure nitric acid is a **colourless, fuming** liquid with a **choking smell**, **heavier than water**, and it **mixes with water in all proportions**. It is **corrosive**: it stains skin **yellow** and burns it, so it is handled with great care.',
      v: table(['Property', 'Description'], [['Colour', 'Colourless when pure; yellow when it holds dissolved NO₂'], ['Smell', 'Choking, pungent'], ['Density', 'Heavier than water'], ['Solubility', 'Mixes with water in all proportions'], ['Action on skin', 'Corrosive; leaves yellow stains']], 'Table of the physical properties of nitric acid'),
      n: 'Pure nitric acid is a colourless liquid that fumes in moist air and has a choking smell. It is heavier than water and mixes with it in any amount. It is very corrosive: a drop on the skin burns it and leaves a yellow stain, so it must always be handled with care.',
    }),
    sl('summary', 'Summary: Part 1', {
      ul: [
        'Laboratory: KNO₃ + H₂SO₄ → KHSO₄ + HNO₃, heated below 200 °C.',
        'All-glass apparatus with a cooled receiver; no cork or rubber.',
        'Yellow colour: dissolved NO₂ from decomposition; store in brown bottles.',
        'Ostwald: 4NH₃ + 5O₂ → 4NO + 6H₂O (Pt, about 800 °C); 2NO + O₂ → 2NO₂; 4NO₂ + 2H₂O + O₂ → 4HNO₃.',
      ],
      v: table(['Process', 'Raw materials', 'Key condition'], [['Laboratory', 'KNO₃ (or NaNO₃) and conc. H₂SO₄', 'Below 200 °C, all-glass'], ['Ostwald’s process', 'Ammonia, air, water', 'Platinum gauze, about 800 °C']], 'Summary table comparing the laboratory preparation and Ostwald’s process'),
      n: 'Let us sum up Part 1. In the laboratory, potassium nitrate is heated gently with concentrated sulphuric acid in an all glass apparatus, below two hundred degrees Celsius. The acid looks yellow because of dissolved nitrogen dioxide. In Ostwald’s process, ammonia is oxidised over hot platinum to nitric oxide, which becomes nitrogen dioxide and then nitric acid.',
    }),
    sl('exam-tips', 'Exam tips: Part 1', {
      ul: [
        'Write KHSO₄ (not K₂SO₄) as the product below 200 °C.',
        'Give two reasons for “all-glass”: the vapour attacks cork and rubber.',
        'Quote conditions with each Ostwald equation: platinum, about 800 °C, ammonia to air 1 : 10.',
        'Plant details are not needed: equations with conditions are enough.',
      ],
      v: table(['Slip', 'Fix'], [['KNO₃ + H₂SO₄ → K₂SO₄ + HNO₃', 'Below 200 °C the product is KHSO₄'], ['Catalyst: iron', 'Platinum (iron is for Haber’s process)'], ['NO₂ dissolved in water only', 'Water and oxygen (air) are both needed']], 'Table of three common slips in Part 1 and their fixes'),
      n: 'Some tips. Below two hundred degrees Celsius the product is potassium hydrogen sulphate, so do not write potassium sulphate. Explain the all glass apparatus by saying that the vapour attacks cork and rubber. In Ostwald’s process, the catalyst is platinum, not iron, and the last step needs both water and oxygen.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Nitric Acid — Part 2: Oxidising and acidic properties, and tests',
  goals: [
    'Explain why nitric acid is a strong oxidising agent',
    'Write equations for concentrated and dilute nitric acid with copper, and for the concentrated acid with carbon and sulphur',
    'Explain why only very dilute nitric acid gives hydrogen, and with which metals',
    'Write equations for nitric acid with bases, carbonates, hydrogen carbonates and sulphites, and describe tests for the acid',
  ],
  slides: [
    sl('title', 'Two personalities', {
      b: 'Part 2 — Nitric acid behaves both as an **acid** (it gives H⁺ ions) and as an **oxidising agent** (it gives oxygen). Which one wins depends on the **concentration** and on what it meets.',
      v: table(['Behaviour', 'Typical reaction', 'Usual products'], [['Oxidising agent', 'With copper, carbon, sulphur', 'A nitrate or oxide, water and NO₂ or NO'], ['Acid', 'With bases, carbonates, sulphites', 'A nitrate, water (and CO₂ or SO₂)'], ['Acid giving hydrogen', 'Only very dilute acid with Mg or Mn', 'A nitrate and hydrogen']], 'Table of the two kinds of behaviour of nitric acid with typical reactions and products'),
      n: 'Nitric acid has two personalities. As an acid, it gives hydrogen ions and reacts with bases and carbonates like any other acid. As an oxidising agent, it gives oxygen, which attacks metals and non metals, and nitrogen dioxide or nitric oxide comes off. The concentration of the acid decides which behaviour we see.',
    }),
    sl('concept', 'Why it oxidises', {
      b: 'Nitric acid **decomposes to give oxygen**, which oxidises the substance it meets:\n\n- **Concentrated acid:** 2HNO₃ → H₂O + 2NO₂ + [O], one atom of oxygen for every two molecules of acid\n- **Dilute acid:** 2HNO₃ → H₂O + 2NO + 3[O], three atoms of oxygen for every two molecules\n\nThe **reddish-brown NO₂** (from concentrated acid) or **colourless NO** (from dilute acid) is the sign of oxidation.',
      v: table(['Acid', 'Gas from the acid', 'Colour of the gas'], [['Concentrated HNO₃', 'Nitrogen dioxide, NO₂', 'Reddish brown'], ['Dilute HNO₃', 'Nitric oxide, NO', 'Colourless (turns reddish brown in air)']], 'Table of the gases given by concentrated and dilute nitric acid when they act as oxidising agents'),
      n: 'Nitric acid oxidises because it easily breaks down and releases oxygen. Concentrated acid releases oxygen and forms reddish brown nitrogen dioxide. Dilute acid releases more oxygen per molecule and forms colourless nitric oxide. So the colour of the gas tells us whether concentrated or dilute acid has reacted.',
    }),
    sl('concept', 'Copper and concentrated nitric acid', {
      b: 'Copper does **not** give hydrogen with dilute HCl or H₂SO₄, but nitric acid **oxidises** it. With **concentrated** acid: **reddish-brown fumes** of NO₂, and the solution turns **green**, becoming **blue** on dilution (copper nitrate).',
      v: chem('Cu + 4HNO3 -> Cu(NO3)2 + 2H2O + 2NO2', 'Equation: copper plus four nitric acid gives copper nitrate plus two water plus two nitrogen dioxide', 'Copper with concentrated nitric acid'),
      n: 'Copper sits below hydrogen in the activity series, so ordinary dilute acids do not attack it. Nitric acid is different, because it is an oxidising agent. With the concentrated acid, copper turnings dissolve quickly, thick reddish brown fumes of nitrogen dioxide pour out, and the solution turns green, then blue when water is added.',
    }),
    sl('check', 'Quick check: copper and concentrated acid', {
      b: 'Name the gas given off when copper meets concentrated nitric acid.',
      n: 'Quick check. Think about the colour of the fumes when concentrated nitric acid oxidises copper.',
      chk: 'cuconc-chk-mcq',
    }),
    sl('concept', 'Copper and dilute nitric acid', {
      b: 'With **moderately dilute** acid (about 1 : 1 with water) copper gives **nitric oxide**, which is **colourless** but turns **reddish brown** at the mouth of the tube as it meets air: 2NO + O₂ → 2NO₂.',
      v: table(['Acid', 'Balanced equation', 'Gas seen'], [['Concentrated', 'Cu + 4HNO₃ → Cu(NO₃)₂ + 2H₂O + 2NO₂', 'Reddish-brown NO₂'], ['Dilute', '3Cu + 8HNO₃ → 3Cu(NO₃)₂ + 4H₂O + 2NO', 'Colourless NO, brown at the mouth']], 'Table comparing the reactions of copper with concentrated and dilute nitric acid'),
      n: 'With dilute nitric acid, copper dissolves more slowly and the solution turns blue. The gas formed inside the tube is nitric oxide, which is colourless. As it reaches the open mouth of the tube, it meets the oxygen of the air and turns into reddish brown nitrogen dioxide. Learn both equations: four acid for every copper with the concentrated acid, eight acid for three copper with the dilute.',
    }),
    sl('example', 'Worked example: volume of nitrogen dioxide', {
      b: '**Problem.** 3.175 g of copper dissolves in excess concentrated nitric acid. Find the volume of nitrogen dioxide at STP. (Cu = 63.5; molar volume 22.4 L)\n\n**Step 1.** Cu + 4HNO₃ → Cu(NO₃)₂ + 2H₂O + 2NO₂: 1 mole Cu gives 2 moles NO₂.\n\n**Step 2.** Moles of Cu = 3.175 ÷ 63.5 = 0.05.\n\n**Step 3.** Moles of NO₂ = 2 × 0.05 = 0.1; volume = 0.1 × 22.4 = **2.24 L**.',
      v: table(['Quantity', 'Value'], [['Moles of Cu', '0.05'], ['Mole ratio Cu : NO₂', '1 : 2'], ['Moles of NO₂', '0.1'], ['Volume at STP', '2.24 L']], 'Table of the steps from 3.175 grams of copper to 2.24 litres of nitrogen dioxide'),
      n: 'One unit of copper gives two units of nitrogen dioxide with the concentrated acid. Three point one seven five grams of copper is zero point zero five mole, because the molar mass of copper is sixty three point five. Twice that is zero point one mole of gas, which occupies two point two four litres at standard conditions.',
    }),
    sl('concept', 'Carbon and sulphur', {
      b: '**Hot concentrated** nitric acid oxidises **non-metals** to their highest oxides or oxyacids, giving reddish-brown NO₂:',
      v: table(['Non-metal', 'Balanced equation', 'Non-metal becomes'], [['Carbon (charcoal)', 'C + 4HNO₃ → CO₂ + 2H₂O + 4NO₂', 'Carbon dioxide'], ['Sulphur', 'S + 6HNO₃ → H₂SO₄ + 2H₂O + 6NO₂', 'Sulphuric acid']], 'Table of the oxidation of carbon and sulphur by hot concentrated nitric acid'),
      n: 'Hot concentrated nitric acid also oxidises non metals. Powdered charcoal is oxidised to carbon dioxide, and sulphur is oxidised all the way to sulphuric acid. In both reactions, reddish brown nitrogen dioxide is given off and water is formed. Notice that carbon needs four molecules of acid and sulphur needs six.',
    }),
    sl('check', 'Quick check: oxidising a non-metal', {
      b: 'Predict the products when hot concentrated nitric acid oxidises carbon.',
      n: 'Quick check. What does carbon become when it is oxidised, and which gas comes from the acid?',
      chk: 'carbon-chk-mcq',
    }),
    sl('concept', 'Hydrogen only from very dilute acid', {
      b: 'Most metals do **not** give hydrogen with nitric acid, because the acid **oxidises the hydrogen to water**. Only **very dilute** (about 1%) nitric acid gives hydrogen, and only with **magnesium** and **manganese**, which react fast enough before the hydrogen is oxidised.\n\nMn + 2HNO₃ → Mn(NO₃)₂ + H₂',
      v: chem('Mg + 2HNO3 -> Mg(NO3)2 + H2', 'Equation: magnesium plus two nitric acid gives magnesium nitrate plus hydrogen', 'Very dilute nitric acid, about 1 per cent'),
      n: 'Here is a surprise. Metals such as zinc and iron give hydrogen with dilute hydrochloric acid, but not with nitric acid, because nitric acid oxidises any hydrogen to water. Only very dilute nitric acid, about one part in a hundred, gives hydrogen, and only with magnesium and manganese. These metals react so quickly that some hydrogen escapes before it can be oxidised.',
    }),
    sl('concept', 'Nitric acid as an acid', {
      b: 'Dilute nitric acid turns **blue litmus red** and reacts with bases and salts of weaker acids to form **nitrates**:',
      v: table(['Reacts with', 'Example equation', 'Gas'], [['Basic oxide', 'CuO + 2HNO₃ → Cu(NO₃)₂ + H₂O', 'None'], ['Hydroxide', 'Ca(OH)₂ + 2HNO₃ → Ca(NO₃)₂ + 2H₂O', 'None'], ['Carbonate', 'CaCO₃ + 2HNO₃ → Ca(NO₃)₂ + H₂O + CO₂', 'CO₂'], ['Hydrogen carbonate', 'KHCO₃ + HNO₃ → KNO₃ + H₂O + CO₂', 'CO₂'], ['Sulphite', 'Na₂SO₃ + 2HNO₃ → 2NaNO₃ + H₂O + SO₂', 'SO₂'], ['Hydrogen sulphite', 'NaHSO₃ + HNO₃ → NaNO₃ + H₂O + SO₂', 'SO₂']], 'Table of dilute nitric acid with a basic oxide, a hydroxide, a carbonate, a hydrogen carbonate, a sulphite and a hydrogen sulphite'),
      n: 'As an acid, dilute nitric acid turns blue litmus red. It neutralises basic oxides and hydroxides to give a nitrate and water. With carbonates and hydrogen carbonates it gives a nitrate, water and carbon dioxide. With sulphites and hydrogen sulphites it gives a nitrate, water and sulphur dioxide. Nitric acid has one replaceable hydrogen, so it is monobasic and forms only normal salts.',
    }),
    sl('example', 'Worked example: matching equations to observations', {
      b: '**Problem.** Dilute nitric acid is added to (a) black copper(II) oxide, (b) baking soda and (c) zinc oxide. State one observation for each and write the equations.\n\n**(a)** The black solid dissolves to a **blue** solution: CuO + 2HNO₃ → Cu(NO₃)₂ + H₂O.\n\n**(b)** **Brisk effervescence** of CO₂: NaHCO₃ + HNO₃ → NaNO₃ + H₂O + CO₂.\n\n**(c)** The white solid dissolves to a **colourless** solution: ZnO + 2HNO₃ → Zn(NO₃)₂ + H₂O.',
      v: table(['Substance', 'Observation', 'Salt formed'], [['Copper(II) oxide', 'Blue solution', 'Copper(II) nitrate'], ['Sodium hydrogencarbonate', 'Brisk effervescence', 'Sodium nitrate'], ['Zinc oxide', 'Colourless solution', 'Zinc nitrate']], 'Table of observations and salts when dilute nitric acid reacts with copper oxide, baking soda and zinc oxide'),
      n: 'Each reaction gives a nitrate. Black copper oxide dissolves to give a blue solution of copper nitrate. Baking soda fizzes as carbon dioxide escapes, leaving sodium nitrate. White zinc oxide dissolves to give a colourless solution of zinc nitrate. In every case water is also formed.',
    }),
    sl('diagram', 'Tests for nitric acid', {
      b: '**Test 1.** Warm the acid with **copper turnings**: **reddish-brown fumes** of NO₂ and a blue-green solution.\n\n**Test 2 (brown ring).** Add **freshly prepared iron(II) sulphate** solution, then pour **concentrated sulphuric acid** slowly down the side: a **brown ring** forms at the junction of the two layers.',
      v: V.ring,
      n: 'Two tests confirm nitric acid. First, warm it with copper turnings: reddish brown fumes of nitrogen dioxide and a blue green solution appear. Second, the brown ring test. Mix the liquid with freshly made iron two sulphate solution, then pour concentrated sulphuric acid slowly down the side of the tube. The heavy acid sinks, and a brown ring forms where the layers meet.',
    }),
    sl('check', 'Quick check: the brown ring test', {
      b: 'Recall what is added in the brown ring test and where the ring appears.',
      n: 'Quick check. Which freshly made solution is used in the brown ring test, and where does the ring form?',
      chk: 'ring-chk-mcq',
    }),
    sl('summary', 'Summary: Part 2', {
      ul: [
        'Oxidising agent: conc. acid gives NO₂; dilute acid gives NO.',
        'Cu + 4HNO₃ (conc.) → Cu(NO₃)₂ + 2H₂O + 2NO₂; 3Cu + 8HNO₃ (dil.) → 3Cu(NO₃)₂ + 4H₂O + 2NO.',
        'C + 4HNO₃ → CO₂ + 2H₂O + 4NO₂; S + 6HNO₃ → H₂SO₄ + 2H₂O + 6NO₂.',
        'Hydrogen only with very dilute acid and Mg or Mn.',
        'Tests: copper turnings give brown fumes; brown ring test.',
      ],
      v: table(['Reaction', 'Gas evolved'], [['Cu + conc. HNO₃', 'NO₂ (reddish brown)'], ['Cu + dil. HNO₃', 'NO (colourless)'], ['C or S + conc. HNO₃', 'NO₂'], ['Mg + very dil. HNO₃', 'H₂'], ['Carbonate + dil. HNO₃', 'CO₂']], 'Summary table of the gases given off in five reactions of nitric acid'),
      n: 'Let us sum up Part 2. As an oxidising agent, concentrated nitric acid gives nitrogen dioxide and dilute acid gives nitric oxide, whether it meets copper or, when hot and concentrated, carbon and sulphur. As an acid, it forms nitrates with bases, carbonates and sulphites. Only very dilute acid gives hydrogen, with magnesium or manganese. Copper turnings and the brown ring test identify it.',
    }),
    sl('exam-tips', 'Exam tips: Part 2', {
      ul: [
        'State the concentration (conc. or dil.) with every copper equation; the products differ.',
        'Nitric oxide is colourless; it only looks brown at the mouth of the tube.',
        'For hydrogen, write “very dilute (about 1%)” and name magnesium or manganese.',
        'In the brown ring test the iron(II) sulphate must be freshly prepared.',
      ],
      v: table(['Slip', 'Fix'], [['Cu + 2HNO₃ → Cu(NO₃)₂ + H₂', 'Copper never gives hydrogen with nitric acid'], ['Dilute acid gives NO₂', 'It gives NO, which browns in air'], ['S + HNO₃ gives SO₂', 'Hot conc. acid oxidises S to H₂SO₄']], 'Table of three common slips in Part 2 and their fixes'),
      n: 'Final tips. Always say whether the acid is concentrated or dilute, because the products change. Remember that nitric oxide is colourless and only turns brown when it meets air. Hydrogen comes only from very dilute acid with magnesium or manganese. And use freshly made iron two sulphate solution for the brown ring test.',
    }),
  ],
});
