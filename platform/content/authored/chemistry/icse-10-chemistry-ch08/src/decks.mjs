// ICSE 10 Chemistry ch08 Metallurgy — two decks: Part 1 (t01–t04) minerals and ores, concentration, roasting and
// calcination, reduction and the activity series; Part 2 (t05–t07) Baeyer's process, the Hall–Héroult process, alloys.
import { sl, deck, table, flow, svgV, chem } from './lib.mjs';
import { HALL_CELL, FROTH } from './svgs.mjs';

const V = {
  froth: svgV(FROTH, 'A froth flotation tank: powdered sulphide ore, water and pine oil are stirred while air is blown in; ore particles rise in the froth and gangue sinks'),
  hall: svgV(HALL_CELL, 'The Hall–Héroult cell: carbon anodes dipping into alumina dissolved in fused cryolite, a carbon-lined steel tank as cathode, molten aluminium collecting at the bottom'),
};

export const deck1 = deck({
  part: 1,
  title: 'Metallurgy — Part 1: From ore to metal',
  goals: [
    'Distinguish between a mineral and an ore and name the ores of iron, aluminium and zinc',
    'Choose a concentration method for a given ore and justify it',
    'Distinguish roasting from calcination with an equation for each',
    'Write equations for reducing metal oxides and link the method to the activity series',
  ],
  slides: [
    sl('title', 'From rock to metal', {
      b: 'Part 1 — Most metals are found in the earth as compounds mixed with rock. **Metallurgy** is the set of steps that turns such a rock into a pure metal.',
      v: flow('LR', [['a', 'Ore mined'], ['b', 'Concentration (remove gangue)'], ['c', 'Roasting or calcination (to oxide)'], ['d', 'Reduction (to metal)']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Flow of the main steps of metallurgy from ore to metal'),
      n: 'Namaste! Very few metals lie in the ground as shiny lumps. Most are locked up as oxides, sulphides or carbonates mixed with sand and rock. Metallurgy is the chain of steps that gets the metal out: first we remove the unwanted rock, then we change the ore into an oxide, and finally we take the oxygen away to leave the metal.',
    }),
    sl('concept', 'Minerals and ores', {
      b: 'A **mineral** is a naturally occurring compound of a metal in the earth’s crust. An **ore** is a mineral from which the metal can be extracted **conveniently and profitably**. So **every ore is a mineral, but every mineral is not an ore**. The earthy impurities (sand, clay, rock) in an ore are called **gangue** or **matrix**.',
      v: table(['Term', 'Meaning', 'Aluminium example'], [['Mineral', 'Natural compound of a metal', 'Clay and bauxite'], ['Ore', 'Mineral that gives the metal at a profit', 'Bauxite only'], ['Gangue', 'Unwanted rock mixed with the ore', 'Sand, silica, iron(III) oxide']], 'Table comparing a mineral, an ore and gangue with aluminium examples'),
      n: 'A mineral is any natural compound of a metal found in the earth. An ore is a special mineral: one from which the metal can be extracted easily and at a profit. Clay contains aluminium, but getting the metal out of it costs too much, so clay is only a mineral. Bauxite is both a mineral and an ore. The rock mixed with an ore is called gangue.',
    }),
    sl('concept', 'Ores of iron, aluminium and zinc', {
      b: 'Learn the name **and** the formula of each ore. Notice the type of compound — it decides how the ore is treated later.',
      v: table(['Metal', 'Ore', 'Formula', 'Type'], [['Iron', 'Haematite', 'Fe₂O₃', 'Oxide'], ['Iron', 'Magnetite', 'Fe₃O₄', 'Oxide (magnetic)'], ['Aluminium', 'Bauxite', 'Al₂O₃·2H₂O', 'Hydrated oxide'], ['Aluminium', 'Cryolite', 'Na₃AlF₆', 'Fluoride'], ['Zinc', 'Zinc blende', 'ZnS', 'Sulphide'], ['Zinc', 'Calamine', 'ZnCO₃', 'Carbonate']], 'Table of the ores of iron, aluminium and zinc with formulae and type of compound'),
      n: 'Iron comes mainly from haematite and magnetite, which are both oxides; magnetite is attracted by a magnet. Aluminium comes from bauxite, a hydrated oxide, and cryolite is a fluoride of aluminium and sodium. Zinc comes from zinc blende, which is a sulphide, and calamine, which is a carbonate. The type of compound tells us which steps the ore will need.',
    }),
    sl('check', 'Quick check: ore or mineral?', {
      b: 'Decide what makes a mineral an ore.',
      n: 'Quick check. Think about cost and convenience, not just whether the metal is present.',
      chk: 'ore-mcq',
    }),
    sl('concept', 'Concentration (dressing) of the ore', {
      b: '**Concentration** removes the gangue. The method depends on a **difference in property** between the ore and the gangue.\n\n- **Hydraulic washing** (gravity separation): heavy ore particles stay, light gangue is washed away — e.g. haematite.\n- **Magnetic separation**: one part is magnetic — e.g. magnetite.\n- **Froth flotation**: sulphide ores — e.g. zinc blende, galena.\n- **Chemical method**: bauxite is purified by Baeyer’s process (Part 2).',
      v: table(['Method', 'Property used', 'Example'], [['Hydraulic washing', 'Ore much heavier than gangue', 'Haematite'], ['Magnetic separation', 'Ore (or gangue) is magnetic', 'Magnetite'], ['Froth flotation', 'Ore wetted by oil, gangue by water', 'Zinc blende, galena'], ['Chemical (leaching)', 'Ore dissolves in a reagent, gangue does not', 'Bauxite']], 'Table of four concentration methods with the property used and an example ore'),
      n: 'To remove the gangue we use a property in which the ore and the rock differ. If the ore is much heavier, a stream of water washes the light rock away. If the ore is magnetic, a magnet pulls it out. Sulphide ores are concentrated by froth flotation, and bauxite is purified by a chemical method that dissolves only the alumina.',
    }),
    sl('diagram', 'Froth flotation', {
      b: 'Powdered sulphide ore is mixed with water and a little **pine oil** and air is blown through. Ore particles are **wetted by oil**, cling to air bubbles and rise into the **froth**, which is skimmed off. Gangue particles are **wetted by water** and **sink**.',
      v: V.froth,
      n: 'In froth flotation, the powdered sulphide ore is stirred with water and a little pine oil while air is bubbled through. The oil coats the ore particles, so they stick to the air bubbles and float up in the froth, which is skimmed off. The sandy gangue is wetted by water and sinks to the bottom of the tank.',
    }),
    sl('check', 'Quick check: concentration', {
      b: 'Choose a concentration method for an ore.',
      n: 'Quick check. Ask which property differs between the ore and the gangue.',
      chk: 'magnet-mcq',
    }),
    sl('concept', 'Roasting and calcination', {
      b: 'Metals are easiest to extract from **oxides**, so the concentrated ore is first changed into an oxide.\n\n**Roasting:** heating strongly in **excess air**, below the melting point — for **sulphide** ores; sulphur dioxide is given off.\n\n**Calcination:** heating strongly in a **limited supply of air or none** — for **carbonate** and **hydrated** ores; carbon dioxide or water vapour is given off.',
      v: table(['Feature', 'Roasting', 'Calcination'], [['Air', 'Excess', 'Limited or none'], ['Ores', 'Sulphides (ZnS, PbS)', 'Carbonates (ZnCO₃), hydrated oxides (Al₂O₃·2H₂O)'], ['Gas given off', 'SO₂', 'CO₂ or H₂O'], ['Example', '2ZnS + 3O₂ → 2ZnO + 2SO₂', 'ZnCO₃ → ZnO + CO₂']], 'Table comparing roasting and calcination by air supply, type of ore, gas given off and an example'),
      n: 'Metals are easiest to obtain from their oxides, so the ore is first turned into an oxide. A sulphide ore is roasted: it is heated strongly in plenty of air, and sulphur dioxide is given off. A carbonate or hydrated ore is calcined: it is heated with little or no air, and carbon dioxide or water vapour is driven off.',
    }),
    sl('example', 'Worked example: roasting or calcination?', {
      b: '**Problem.** Name the process and write the equation for converting (a) galena, PbS, and (b) calamine, ZnCO₃, into oxides.\n\n**(a)** Galena is a **sulphide** → **roasting** in excess air: 2PbS + 3O₂ → 2PbO + 2SO₂.\n\n**(b)** Calamine is a **carbonate** → **calcination**: ZnCO₃ → ZnO + CO₂.',
      v: chem('2PbS + 3O2 -> 2PbO + 2SO2', 'Equation for roasting galena: two lead sulphide plus three oxygen gives two lead oxide plus two sulphur dioxide', 'Roasting of galena'),
      n: 'First look at the type of ore. Galena is lead sulphide, so it is roasted in excess air; oxygen converts it to lead oxide and sulphur dioxide. Calamine is zinc carbonate, so it is calcined; heat alone splits it into zinc oxide and carbon dioxide. The type of ore decides the process every time.',
    }),
    sl('concept', 'The activity series decides the method of reduction', {
      b: 'The more reactive a metal, the **more strongly it holds oxygen**, and the harder its oxide is to reduce.\n\n- **K, Na, Ca, Mg, Al:** electrolysis of the **fused** compound (electrolytic reduction).\n- **Zn, Fe, Pb, Cu:** reduction of the oxide by **carbon, carbon monoxide or hydrogen**.\n- **Hg, Ag:** heating the oxide **alone** (2HgO → 2Hg + O₂).',
      v: table(['Metals', 'Position', 'Method of extraction'], [['K, Na, Ca, Mg, Al', 'Top', 'Electrolysis of fused compounds'], ['Zn, Fe, Pb, Cu', 'Middle', 'Reduction by C, CO or H₂'], ['Hg, Ag', 'Bottom', 'Heating the oxide alone']], 'Table linking the position of metals in the activity series to the method of extraction'),
      n: 'The activity series tells us how to get each metal. Very reactive metals such as potassium, sodium, calcium, magnesium and aluminium hold oxygen so tightly that no chemical can take it away, so we use electrolysis of their molten compounds. Metals in the middle are reduced by carbon, carbon monoxide or hydrogen. Mercury and silver oxides give up oxygen on heating alone.',
    }),
    sl('concept', 'Reducing the oxide', {
      b: 'A **reducing agent** removes oxygen from the metal oxide.\n\n- **Hydrogen:** CuO + H₂ → Cu + H₂O (black → reddish-brown).\n- **Carbon (coke):** ZnO + C → Zn + CO; PbO + C → Pb + CO.\n- **Carbon monoxide:** Fe₂O₃ + 3CO → 2Fe + 3CO₂; PbO + CO → Pb + CO₂.\n\nAl₂O₃ and MgO are **not** reduced by carbon: aluminium and magnesium have a greater affinity for oxygen than carbon has.',
      v: table(['Oxide', 'Reducing agent', 'Equation'], [['Copper(II) oxide', 'Hydrogen', 'CuO + H₂ → Cu + H₂O'], ['Zinc oxide', 'Coke', 'ZnO + C → Zn + CO'], ['Lead(II) oxide', 'Coke', 'PbO + C → Pb + CO'], ['Iron(III) oxide', 'Carbon monoxide', 'Fe₂O₃ + 3CO → 2Fe + 3CO₂']], 'Table of four metal oxides with their reducing agents and balanced equations'),
      n: 'A reducing agent pulls oxygen away from the metal. Hydrogen passed over hot black copper oxide leaves reddish brown copper and droplets of water. Coke reduces zinc oxide and lead oxide, and carbon monoxide reduces iron oxide. Aluminium oxide and magnesium oxide are not reduced by carbon, because these metals hold oxygen more strongly than carbon does.',
    }),
    sl('check', 'Quick check: method of extraction', {
      b: 'Link a metal to the way it is extracted.',
      n: 'Quick check. The higher a metal is in the activity series, the stronger the method needed.',
      chk: 'electro-mcq',
    }),
    sl('example', 'Worked example: choosing the method', {
      b: '**Problem.** How would you obtain (a) lead from lead(II) oxide, (b) sodium from sodium chloride, (c) mercury from mercury(II) oxide? Give a reason each time.\n\n**(a)** Heat with **coke**: PbO + C → Pb + CO — lead is in the middle of the series.\n\n**(b)** **Electrolysis of fused NaCl** — sodium is too reactive for any chemical reducing agent.\n\n**(c)** **Heat alone**: 2HgO → 2Hg + O₂ — mercury is at the bottom of the series.',
      v: flow('TB', [['a', 'Where is the metal in the activity series?'], ['b', 'Top: electrolysis of the fused compound'], ['c', 'Middle: heat oxide with C, CO or H₂'], ['d', 'Bottom: heat the oxide alone']], [['a', 'b', 'K to Al'], ['a', 'c', 'Zn to Cu'], ['a', 'd', 'Hg, Ag']], 'Decision flow for choosing the method of extraction from the position of the metal in the activity series'),
      n: 'Always begin with the position of the metal in the activity series. Lead is in the middle, so heating its oxide with coke is enough. Sodium is near the top, so only electrolysis of molten sodium chloride will work. Mercury is near the bottom, so its oxide simply breaks down on heating, giving mercury and oxygen.',
    }),
    sl('summary', 'Summary: Part 1', {
      ul: [
        'Every ore is a mineral; a mineral is an ore only if the metal can be extracted profitably.',
        'Concentration removes gangue: hydraulic washing, magnetic separation, froth flotation or a chemical method.',
        'Roasting (excess air) for sulphides; calcination (little or no air) for carbonates and hydrated ores.',
        'Reactive metals: electrolysis of fused compounds; middle metals: C, CO or H₂; least reactive: heat alone.',
      ],
      v: table(['Step', 'Purpose', 'Example'], [['Concentration', 'Remove gangue', 'Froth flotation of ZnS'], ['Roasting', 'Sulphide → oxide', '2ZnS + 3O₂ → 2ZnO + 2SO₂'], ['Calcination', 'Carbonate → oxide', 'ZnCO₃ → ZnO + CO₂'], ['Reduction', 'Oxide → metal', 'ZnO + C → Zn + CO']], 'Summary table of the steps of metallurgy with their purpose and an example for zinc'),
      n: 'Let us sum up Part 1. Every ore is a mineral, but only some minerals are ores. The gangue is removed by a method that uses a difference in property. Sulphide ores are roasted and carbonate ores are calcined, giving oxides. The oxide is then reduced by carbon, carbon monoxide or hydrogen, unless the metal is very reactive and needs electrolysis.',
    }),
    sl('exam-tips', 'Exam tips: Part 1', {
      ul: [
        'Always write the formula with the name of an ore: zinc blende ZnS, calamine ZnCO₃.',
        'Say “excess air” for roasting and “limited air or absence of air” for calcination.',
        'For “give a reason”, link the method to the position of the metal in the activity series.',
        'State the observation too: black CuO turns reddish-brown when reduced by hydrogen.',
      ],
      v: table(['Slip', 'Fix'], [['Calamine is ZnS', 'Calamine is ZnCO₃; zinc blende is ZnS'], ['Calcination in excess air', 'Calcination in limited air or none'], ['Al₂O₃ reduced by coke', 'Al is extracted by electrolysis']], 'Table of three common slips in Part 1 and their fixes'),
      n: 'Some tips. Always pair the name of an ore with its formula. Remember that roasting needs plenty of air while calcination needs little or none. When asked for a reason, talk about the position of the metal in the activity series. And in observation questions, mention colour changes, such as black copper oxide turning reddish brown.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Metallurgy — Part 2: Aluminium and alloys',
  goals: [
    'Write the equations of Baeyer’s process for purifying bauxite',
    'Describe the Hall–Héroult cell and state the purpose of cryolite, fluorspar and coke',
    'Write the electrode reactions and explain why the anodes are replaced',
    'State the composition and a use of six alloys and explain why alloys are preferred',
  ],
  slides: [
    sl('title', 'Aluminium: from bauxite to metal', {
      b: 'Part 2 — Aluminium is the most abundant metal in the earth’s crust, yet it was once dearer than gold. Two processes made it cheap: **Baeyer’s process** to purify bauxite and the **Hall–Héroult process** to electrolyse alumina.',
      v: flow('LR', [['a', 'Bauxite (impure)'], ['b', 'Baeyer’s process'], ['c', 'Pure alumina'], ['d', 'Hall–Héroult electrolysis'], ['e', 'Aluminium']], [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'e']], 'Flow from impure bauxite through Baeyer’s process to pure alumina and through Hall–Héroult electrolysis to aluminium'),
      n: 'Aluminium is the most common metal in the earth’s crust, but it was once more costly than gold, because it was so hard to extract. Two inventions changed that. Baeyer’s process turns impure bauxite into pure alumina, and the Hall–Héroult process passes electricity through molten alumina to give the metal.',
    }),
    sl('concept', 'Why aluminium needs electrolysis', {
      b: 'Aluminium is **high in the activity series**: it holds oxygen more strongly than carbon, so coke cannot reduce alumina. Alumina must therefore be reduced by **electrolysis**. Because impurities in the ore would also be reduced and spoil the metal, the bauxite is **purified first**.',
      v: table(['Property of alumina', 'Consequence'], [['Very stable oxide', 'Not reduced by carbon; electrolysis needed'], ['Melting point about 2050 °C', 'Solvent (cryolite) needed to work at about 950 °C'], ['Bauxite contains Fe₂O₃ and other impurities', 'Purified by Baeyer’s process before electrolysis']], 'Table of properties of alumina and their consequences for the extraction of aluminium'),
      n: 'Aluminium sits high in the activity series and grips oxygen more strongly than carbon does, so heating alumina with coke does not work. Instead the oxide is decomposed by electricity. Because any impurities would be reduced along with it and spoil the aluminium, the bauxite is first purified, and because alumina melts at a very high temperature, a solvent is used.',
    }),
    sl('concept', 'Baeyer’s process: step 1, digestion', {
      b: 'Finely ground bauxite is heated with **concentrated sodium hydroxide** solution under pressure (about 150–200 °C). **Alumina dissolves** as soluble **sodium aluminate**; the main impurity, **iron(III) oxide, does not dissolve** and is **filtered off**.',
      v: chem('Al2O3.2H2O + 2NaOH -> 2NaAlO2 + 3H2O', 'Equation for digestion of bauxite: hydrated alumina plus two sodium hydroxide gives two sodium aluminate plus three water', 'Digestion of bauxite with sodium hydroxide'),
      n: 'In the first step, finely ground bauxite is heated under pressure with concentrated sodium hydroxide solution. Alumina is amphoteric, so it reacts with the alkali and dissolves as sodium aluminate. Iron oxide, the main impurity, is basic and does not dissolve, so it is removed by filtering the hot solution.',
    }),
    sl('concept', 'Baeyer’s process: steps 2 and 3', {
      b: '**Step 2 — precipitation.** The sodium aluminate solution is **diluted** with water and **seeded** with a little freshly made aluminium hydroxide, then stirred. Aluminium hydroxide precipitates.\n\n**Step 3 — ignition.** The aluminium hydroxide is filtered, washed, dried and heated to about **1000 °C**, giving **pure alumina**.',
      v: table(['Step', 'Equation', 'Result'], [['Precipitation (diluted, seeded)', 'NaAlO₂ + 2H₂O → NaOH + Al(OH)₃', 'White precipitate of Al(OH)₃'], ['Ignition at about 1000 °C', '2Al(OH)₃ → Al₂O₃ + 3H₂O', 'Pure alumina']], 'Table of the precipitation and ignition steps of Baeyer’s process with equations'),
      n: 'Next, the clear sodium aluminate solution is diluted with water and stirred with a few crystals of fresh aluminium hydroxide. These act as seeds, and white aluminium hydroxide settles out. Finally the precipitate is washed, dried and heated to about one thousand degrees Celsius, which drives out water and leaves pure alumina.',
    }),
    sl('check', 'Quick check: Baeyer’s process', {
      b: 'Decide what happens to the impurity in bauxite.',
      n: 'Quick check. Alumina is amphoteric, but iron oxide is basic.',
      chk: 'redmud-mcq',
    }),
    sl('example', 'Worked example: alumina from aluminium hydroxide', {
      b: '**Problem.** How much alumina is formed when 780 kg of aluminium hydroxide is ignited? (Al = 27, O = 16, H = 1)\n\n**Step 1.** 2Al(OH)₃ → Al₂O₃ + 3H₂O.\n\n**Step 2.** Molar masses: Al(OH)₃ = 27 + 3 × 17 = 78; Al₂O₃ = 2 × 27 + 3 × 16 = 102.\n\n**Step 3.** 156 kg of hydroxide gives 102 kg of alumina, so 780 kg gives 102 × 780 ÷ 156 = **510 kg**.',
      v: table(['Quantity', 'From the equation', 'In the problem'], [['Al(OH)₃', '2 × 78 = 156 kg', '780 kg'], ['Al₂O₃', '102 kg', '510 kg']], 'Table showing that 156 kilograms of aluminium hydroxide gives 102 kilograms of alumina, so 780 kilograms gives 510 kilograms'),
      n: 'Write the balanced equation first: two units of aluminium hydroxide give one unit of alumina. The molar mass of the hydroxide is seventy eight and of alumina is one hundred and two. So one hundred and fifty six kilograms of hydroxide gives one hundred and two kilograms of alumina, and five times as much hydroxide gives five hundred and ten kilograms.',
    }),
    sl('diagram', 'The Hall–Héroult cell', {
      b: '- **Electrolyte:** pure alumina dissolved in **fused cryolite** (Na₃AlF₆) with a little **fluorspar** (CaF₂), at about **950 °C**.\n- **Cathode:** the **carbon lining** of a steel tank.\n- **Anodes:** thick **carbon rods** dipping into the electrolyte.\n- **Molten aluminium** sinks to the bottom and is tapped off.',
      v: V.hall,
      n: 'Here is the cell. A steel tank lined with carbon acts as the cathode. Thick carbon rods dip into the melt from above and act as the anodes. The electrolyte is pure alumina dissolved in molten cryolite with a little fluorspar, at about nine hundred and fifty degrees Celsius. Molten aluminium collects at the bottom and is drawn off.',
    }),
    sl('concept', 'Cryolite, fluorspar and coke', {
      b: '**Cryolite** lowers the fusion temperature from about 2050 °C to about 950 °C (saving energy) and **increases the conductivity** of the melt. **Fluorspar** **increases fluidity** (and helps lower the fusion temperature). A layer of **powdered coke** on top **reduces heat loss** and **stops the anodes burning** in air.',
      v: table(['Substance added', 'Purpose'], [['Cryolite, Na₃AlF₆', 'Solvent: lowers fusion temperature, raises conductivity'], ['Fluorspar, CaF₂', 'Increases fluidity of the electrolyte'], ['Powdered coke (on top)', 'Reduces heat loss; protects anodes from air']], 'Table of cryolite, fluorspar and powdered coke and the purpose of each in the cell'),
      n: 'Each addition has a job. Cryolite dissolves the alumina, so the melt works at about nine hundred and fifty degrees instead of over two thousand, and it also conducts electricity better. Fluorspar makes the melt flow more easily. A layer of powdered coke on top keeps the heat in and stops the hot anodes from burning in the air.',
    }),
    sl('check', 'Quick check: the electrolytic cell', {
      b: 'Explain a feature of the Hall–Héroult cell.',
      n: 'Quick check. Think about what is produced at each electrode and what it can react with.',
      chk: 'anode-mcq',
    }),
    sl('concept', 'Electrode reactions', {
      b: 'In the melt, alumina gives **Al³⁺** and **O²⁻** ions.\n\n- **Cathode (reduction):** Al³⁺ + 3e⁻ → Al\n- **Anode (oxidation):** 2O²⁻ → O₂ + 4e⁻\n- **Anodes burn:** C + O₂ → CO₂ and 2C + O₂ → 2CO, so they are **replaced periodically**.\n\nFresh alumina is added from time to time, so the process runs **continuously**.',
      v: chem('2Al2O3 -> 4Al + 3O2', 'Overall equation for the electrolysis of alumina: two alumina give four aluminium and three oxygen', 'Overall change in the cell'),
      n: 'In the melt, alumina provides aluminium ions and oxide ions. At the cathode, each aluminium ion gains three electrons and becomes aluminium metal. At the anode, oxide ions lose electrons and form oxygen. The hot oxygen attacks the carbon anodes, turning them into carbon monoxide and carbon dioxide, so the anodes wear away and must be replaced.',
    }),
    sl('example', 'Worked example: aluminium from alumina', {
      b: '**Problem.** What mass of aluminium is obtained from 51 tonnes of pure alumina, and what mass of oxygen is released at the anodes? (Al = 27, O = 16)\n\n**Step 1.** Al₂O₃ = 2 × 27 + 3 × 16 = 102; it contains 54 parts aluminium and 48 parts oxygen.\n\n**Step 2.** Aluminium = 54 × 51 ÷ 102 = **27 tonnes**.\n\n**Step 3.** Oxygen = 48 × 51 ÷ 102 = **24 tonnes** — all of it attacks the anodes.',
      v: table(['Part of Al₂O₃', 'Share of 102', 'From 51 tonnes'], [['Aluminium', '54', '27 tonnes'], ['Oxygen', '48', '24 tonnes']], 'Table splitting 51 tonnes of alumina into 27 tonnes of aluminium and 24 tonnes of oxygen'),
      n: 'The molar mass of alumina is one hundred and two, made up of fifty four parts aluminium and forty eight parts oxygen. Fifty one tonnes is exactly half of one hundred and two, so it gives half of fifty four, which is twenty seven tonnes of aluminium, and twenty four tonnes of oxygen. That oxygen is what burns away the carbon anodes.',
    }),
    sl('concept', 'Alloys and amalgams', {
      b: 'An **alloy** is a homogeneous mixture of two or more metals (or a metal and a non-metal). An **amalgam** is an alloy of **mercury** with another metal.',
      v: table(['Alloy', 'Main constituents', 'One use'], [['Stainless steel', 'Fe, Cr, Ni, a little C', 'Cutlery, surgical instruments'], ['Magnalium', 'Al, Mg', 'Light instruments, balance beams'], ['Duralumin', 'Al, Cu, Mg, Mn', 'Aircraft bodies, pressure cookers'], ['Brass', 'Cu, Zn', 'Utensils, door fittings'], ['Bronze', 'Cu, Sn', 'Statues, medals, bells'], ['Solder', 'Pb, Sn', 'Joining electrical wires']], 'Table of six alloys with their main constituents and one use of each'),
      n: 'An alloy is a uniform mixture of metals, or of a metal with a non-metal such as carbon. Stainless steel is iron with chromium, nickel and a little carbon. Magnalium and duralumin are light aluminium alloys. Brass is copper with zinc, bronze is copper with tin, and solder is lead with tin. When mercury is one of the metals, the alloy is called an amalgam.',
    }),
    sl('check', 'Quick check: alloys', {
      b: 'Identify an alloy from its constituents.',
      n: 'Quick check. Recall which aluminium alloy also contains copper and manganese.',
      chk: 'alloy-mcq',
    }),
    sl('concept', 'Why alloys?', {
      b: 'Alloying changes the properties of a metal to suit a job:\n\n- **harder and stronger** (duralumin vs aluminium);\n- **resists corrosion** (stainless steel vs iron);\n- **lower melting point** (solder);\n- **better appearance or colour** (brass, bronze).',
      v: table(['Change', 'Example', 'Why it helps'], [['Harder, stronger', 'Duralumin', 'Light yet strong aircraft parts'], ['Resists corrosion', 'Stainless steel', 'No rust on knives and sinks'], ['Lower melting point', 'Solder', 'Melts easily to join wires'], ['Attractive colour', 'Brass', 'Decorative fittings']], 'Table of four ways alloying improves a metal with an example of each'),
      n: 'Why mix metals at all? Pure metals are often too soft, they may corrode, or they may melt at an awkward temperature. Duralumin is much stronger than pure aluminium yet still light. Stainless steel does not rust like iron. Solder melts at a low temperature, which makes it ideal for joining wires, and brass has a pleasing golden colour.',
    }),
    sl('summary', 'Summary: Part 2', {
      ul: [
        'Baeyer’s process: bauxite + NaOH → sodium aluminate; Fe₂O₃ filtered off; dilute and seed → Al(OH)₃; ignite → pure Al₂O₃.',
        'Hall–Héroult: alumina in fused cryolite with fluorspar at about 950 °C; carbon cathode lining, carbon anodes.',
        'Cathode: Al³⁺ + 3e⁻ → Al; anode: oxygen, which burns the anodes away.',
        'Alloys are harder, resist corrosion or melt lower; an amalgam contains mercury.',
      ],
      v: table(['Process or alloy', 'Key fact'], [['Baeyer’s process', 'Purifies bauxite to alumina'], ['Hall–Héroult process', 'Electrolysis of alumina in cryolite'], ['Duralumin', 'Al, Cu, Mg, Mn'], ['Solder', 'Pb, Sn']], 'Summary table of the key facts of Part 2'),
      n: 'Let us sum up Part 2. Baeyer’s process dissolves alumina from bauxite in sodium hydroxide, filters off the iron oxide, and turns the solution back into pure alumina. The Hall–Héroult cell electrolyses that alumina dissolved in molten cryolite, giving aluminium at the cathode and oxygen at the anodes, which burn away. Alloys improve metals for particular uses.',
    }),
    sl('exam-tips', 'Exam tips: Part 2', {
      ul: [
        'Write the bauxite formula with its water: Al₂O₃·2H₂O.',
        'Give two roles of cryolite: lowers fusion temperature and increases conductivity.',
        'Anodes are replaced because oxygen burns them — not because aluminium coats them.',
        'Bronze is copper and tin; brass is copper and zinc — do not swap them.',
      ],
      v: table(['Slip', 'Fix'], [['Cryolite is the anode', 'Cryolite is the solvent; anodes are carbon'], ['Aluminium forms at the anode', 'Aluminium forms at the cathode'], ['Bronze is Cu and Zn', 'Bronze is Cu and Sn']], 'Table of three common slips in Part 2 and their fixes'),
      n: 'Final tips. Write the formula of bauxite with its two water molecules. Learn two separate reasons for adding cryolite. Remember that the anodes wear away because oxygen burns them, and that aluminium collects at the cathode. And keep bronze and brass apart: bronze has tin, brass has zinc.',
    }),
  ],
});
