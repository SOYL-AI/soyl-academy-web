// ch12 General Principles and Processes of Isolation of Elements (formative assessment only) — two decks:
// Part 1 occurrence, concentration and conversion to oxide; Part 2 reduction (thermodynamics, electrochemistry),
// refining and uses. Single syllabus topic t01.
import { sl, deck, table, flow, plot, svgV, r } from './lib.mjs';
import { FROTH, ZONE } from './svgs.mjs';

// Approximate Ellingham lines, ΔG° (kJ per mol O2) = a + bT; illustrative.
const Ts = [300, 600, 900, 1200, 1500, 1800, 2000];
const line = (a, b) => Ts.map((T) => [T, Math.round(a + b * T)]);
const zn = Ts.map((T) => [T, Math.round(T <= 1180 ? -700 + 0.2 * T : -464 + 0.39 * (T - 1180))]);
export const ellingham = plot(
  {
    x: { min: 300, max: 2000, label: 'Temperature (K)' },
    y: { min: -1100, max: 0, label: 'ΔG° (kJ per mol O₂)' },
    series: [
      { label: '2C + O₂ → 2CO', kind: 'line', points: line(-223, -0.175) },
      { label: 'C + O₂ → CO₂', kind: 'line', points: line(-394, -0.001) },
      { label: '2CO + O₂ → 2CO₂', kind: 'line', points: line(-564, 0.173) },
      { label: '2Fe + O₂ → 2FeO', kind: 'line', points: line(-527, 0.13) },
      { label: '2Zn + O₂ → 2ZnO', kind: 'line', points: zn },
      { label: '4/3 Al + O₂ → 2/3 Al₂O₃', kind: 'line', points: line(-1120, 0.21) },
    ],
  },
  'Ellingham diagram: the lines for formation of FeO, ZnO, Al2O3 and for burning CO to CO2 slope upwards with temperature; the line for carbon to carbon monoxide slopes downwards and crosses the FeO line near one thousand kelvin and the ZnO line at a higher temperature, but stays above the Al2O3 line throughout',
  'Approximate, illustrative lines. A metal oxide can be reduced by an element whose line lies below it at that temperature.',
);

export const V = {
  froth: svgV(FROTH, 'Froth flotation: air blown through a stirred tank of ore, water, pine oil and collector; ore particles ride on bubbles into the froth, gangue sinks'),
  zone: svgV(ZONE, 'Zone refining: a heater moves along a metal rod, carrying a molten zone and the impurities towards one end'),
};

export const deck1 = deck({
  part: 1,
  title: 'Isolation of Elements — Part 1: Ores, concentration and conversion to oxide',
  goals: [
    'Distinguish minerals, ores, gangue and flux',
    'Choose a method of concentration (hydraulic washing, magnetic separation, froth flotation, leaching) for a given ore',
    'Explain calcination and roasting with equations',
    'Outline the overall steps in extracting a metal',
  ],
  slides: [
    sl('title', 'Isolation of Elements', {
      b: 'Part 1 — from rock to metal oxide. (Formative assessment only; not in the board exam.)',
      v: flow('LR', [['a', 'Ore'], ['b', 'Concentration'], ['c', 'Conversion to oxide'], ['d', 'Reduction to metal'], ['e', 'Refining']], [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'e']], 'Flow of the main steps in extracting a metal from its ore'),
      n: 'Namaste! Most metals are found in the earth not as shiny metal but combined in rocks with oxygen, sulfur or other elements. Getting the metal out is called metallurgy. In this chapter we follow the journey from ore to pure metal: concentrating the ore, turning it into an oxide, reducing it, and refining the metal. This chapter is assessed in school, not in the board exam.',
    }),
    sl('concept', 'Minerals, ores and gangue', {
      b: 'A **mineral** is a naturally occurring compound of a metal. An **ore** is a mineral from which the metal can be extracted **profitably**. The earthy impurities in an ore are the **gangue**. All ores are minerals, but not all minerals are ores.',
      v: table(['Metal', 'Important ores', 'Formula'], [['Aluminium', 'Bauxite', 'AlOₓ(OH)₃₋₂ₓ (0 < x < 1)'], ['Aluminium', 'Kaolinite (a clay)', 'Al₂(OH)₄Si₂O₅'], ['Iron', 'Haematite; magnetite; siderite', 'Fe₂O₃; Fe₃O₄; FeCO₃'], ['Copper', 'Copper pyrites; malachite; cuprite', 'CuFeS₂; CuCO₃·Cu(OH)₂; Cu₂O'], ['Zinc', 'Zinc blende; calamine; zincite', 'ZnS; ZnCO₃; ZnO']], 'Table of important ores of aluminium, iron, copper and zinc with formulas'),
      n: 'A mineral is any natural compound of a metal found in the earth. If the metal can be extracted from it cheaply and conveniently, the mineral is called an ore. Clay contains aluminium, but aluminium is extracted from bauxite, so bauxite is the ore. The unwanted sand and rock mixed with an ore is called gangue, and the first job is to get rid of it.',
    }),
    sl('concept', 'Concentration: hydraulic washing and magnetic separation', {
      b: 'Removing gangue is **concentration** (dressing or benefaction). **Hydraulic washing** uses the difference in **density**: a stream of water washes away lighter gangue, leaving heavy ore particles (used for tin and lead ores). **Magnetic separation** uses **magnetic** properties: a magnetic ore (magnetite, Fe₃O₄; chromite) is attracted to a magnetic roller and falls separately from non-magnetic gangue.',
      v: table(['Method', 'Property used', 'Example'], [['Hydraulic washing', 'Ore denser than gangue', 'Tin stone (SnO₂)'], ['Magnetic separation', 'Ore or gangue is magnetic', 'Magnetite; wolframite from tin stone'], ['Froth flotation', 'Ore wetted by oil, gangue by water', 'Sulphide ores (ZnS, CuFeS₂, PbS)'], ['Leaching', 'Ore dissolves in a reagent, gangue does not', 'Bauxite in NaOH; gold in NaCN']], 'Table of concentration methods, the property each uses and examples'),
      n: 'Concentration removes as much gangue as possible. The method depends on how the ore and the gangue differ. If the ore is much heavier, a stream of water carries away the light gangue: this is hydraulic washing. If one of them is magnetic, a magnetic roller pulls it aside. Sulphide ores are concentrated by froth flotation, and some ores are dissolved out chemically by leaching.',
    }),
    sl('diagram', 'Froth flotation', {
      b: 'For **sulphide ores**. Powdered ore is mixed with water, a **frother** (pine oil) and a **collector** (xanthates, fatty acids) that makes ore particles water-repellent; air is blown in. Ore particles, wetted by oil, cling to bubbles and rise in the **froth**; gangue, wetted by water, sinks. **Depressants** separate two sulphides: NaCN stops ZnS entering the froth, so PbS floats alone.',
      v: V.froth,
      n: 'Froth flotation exploits a surprising fact: sulphide ore particles are wetted by oil, while sand is wetted by water. Powdered ore is stirred with water, pine oil and a collector, and air is blown through. The oily ore particles stick to the air bubbles and rise into a froth, which is skimmed off, while the gangue sinks. Adding a depressant such as sodium cyanide can keep one sulphide down while another floats.',
    }),
    sl('concept', 'Leaching', {
      b: 'In **leaching**, the ore is dissolved in a suitable reagent, leaving gangue behind. **Bauxite (Bayer process):** hot concentrated NaOH dissolves Al₂O₃ as sodium aluminate; silica dissolves as silicate but iron oxide does not. The solution is neutralised with CO₂ to precipitate hydrated alumina, which is heated to pure Al₂O₃. **Gold and silver:** leached with dilute NaCN in air; the metal is recovered by displacement with zinc.',
      m: [r`\ce{Al2O3(s) + 2NaOH(aq) + 3H2O(l) -> 2Na[Al(OH)4](aq)}`, r`\ce{2Na[Al(OH)4](aq) + 2CO2(g) -> Al2O3.3H2O(s) + 2NaHCO3(aq)}`, r`\ce{4Au + 8CN- + 2H2O + O2 -> 4[Au(CN)2]- + 4OH-}`, r`\ce{2[Au(CN)2]- + Zn -> Zn(CN)4^2- + 2Au}`],
      v: flow('LR', [['a', 'Bauxite'], ['b', 'Na[Al(OH)₄] solution'], ['c', 'Al₂O₃·xH₂O'], ['d', 'Pure Al₂O₃']], [['a', 'b', 'hot conc. NaOH'], ['b', 'c', 'CO₂ (seeded)'], ['c', 'd', 'heat at 1470 K']], 'Flow of the Bayer process from bauxite to pure alumina'),
      n: 'Leaching uses chemistry to pull the metal out of the ore. Bauxite is digested with hot concentrated sodium hydroxide, which dissolves aluminium oxide but leaves iron oxide behind. Carbon dioxide then precipitates hydrated alumina, which is heated to give pure aluminium oxide. Gold is leached from crushed rock with dilute cyanide solution and air, and then displaced from solution by zinc.',
    }),
    sl('example', 'Worked example: choosing a concentration method', {
      b: r`**Problem.** Suggest a concentration method for: (a) galena, PbS, mixed with sand; (b) magnetite mixed with silica; (c) bauxite containing iron oxide and silica; (d) a low-grade ore with tiny grains of native gold.

**(a)** Froth flotation (sulphide ore).

**(b)** Magnetic separation (Fe₃O₄ is magnetic).

**(c)** Leaching with NaOH (Bayer process).

**(d)** Leaching with dilute NaCN in air, then displacement with zinc.`,
      v: table(['Ore', 'Key property', 'Method'], [['Galena + sand', 'Sulphide wetted by oil', 'Froth flotation'], ['Magnetite + silica', 'Ore magnetic', 'Magnetic separation'], ['Bauxite', 'Amphoteric Al₂O₃ dissolves in NaOH', 'Leaching'], ['Low-grade gold', 'Au forms [Au(CN)₂]⁻', 'Cyanide leaching']], 'Table matching four ores to their key property and concentration method'),
      n: 'Match the method to the property. Galena is a sulphide, so froth flotation works. Magnetite is magnetic, so a magnetic roller separates it from silica. Aluminium oxide is amphoteric and dissolves in hot alkali, while iron oxide does not, so bauxite is leached. And gold, present in tiny amounts, is best dissolved out with cyanide.',
    }),
    sl('check', 'Quick check: concentration', {
      b: 'Pick the right concentration method or reagent for an ore.',
      n: 'Quick check. Ask what property makes the ore different from its gangue.',
      chk: 'froth-mcq',
    }),
    sl('concept', 'Conversion to oxide: calcination and roasting', {
      b: 'Oxides are easier to reduce than carbonates or sulphides. **Calcination:** heating in limited air or absence of air to drive off CO₂, H₂O or volatile matter (carbonates, hydrated oxides). **Roasting:** heating in a regular supply of **air** below the melting point, converting sulphides to oxides; SO₂ formed is used to make sulfuric acid.',
      m: [r`\ce{ZnCO3 ->[\Delta] ZnO + CO2}`, r`\ce{CaCO3.MgCO3 ->[\Delta] CaO + MgO + 2CO2}`, r`\ce{2ZnS + 3O2 ->[\Delta] 2ZnO + 2SO2}`, r`\ce{2Cu2S + 3O2 ->[\Delta] 2Cu2O + 2SO2}`],
      v: table(['Process', 'Air?', 'Used for', 'Gas given off'], [['Calcination', 'Little or none', 'Carbonates, hydrated oxides', 'CO₂, H₂O'], ['Roasting', 'Yes, plenty', 'Sulphides', 'SO₂']], 'Table comparing calcination and roasting'),
      n: 'Before reduction, ores are usually turned into oxides, because oxides are easier to reduce. Carbonates and hydrated ores are calcined: heated strongly with little or no air, so carbon dioxide or water is driven off. Sulphide ores are roasted: heated in plenty of air, so the sulfur burns off as sulfur dioxide. That sulfur dioxide is valuable, and is often captured to make sulfuric acid.',
    }),
    sl('example', 'Worked example: sulfur dioxide from roasting', {
      b: r`**Problem.** A smelter roasts $194\ \text{kg}$ of zinc blende, ZnS ($M = 97$). What mass of $\ce{SO2}$ ($M = 64$) is formed, and what mass of ZnO ($M = 81$)?

**Step 1.** $\ce{2ZnS + 3O2 -> 2ZnO + 2SO2}$: 1 mol ZnS gives 1 mol each of ZnO and SO₂.

**Step 2.** Moles of ZnS $= 194 \div 97 = 2\ \text{kmol}$.

**Step 3.** $\ce{SO2}$: $2 \times 64 = 128\ \text{kg}$; ZnO: $2 \times 81 = 162\ \text{kg}$.`,
      v: table(['Substance', 'Amount', 'Mass'], [['ZnS', '2 kmol', '194 kg'], ['ZnO', '2 kmol', '162 kg'], ['SO₂', '2 kmol', '128 kg']], 'Table of amounts and masses of zinc sulfide, zinc oxide and sulfur dioxide'),
      n: 'Roasting zinc blende gives one mole of zinc oxide and one mole of sulfur dioxide for every mole of zinc sulfide. One hundred and ninety four kilograms is two kilomoles. So two kilomoles of sulfur dioxide form, a hundred and twenty eight kilograms, which is why smelters capture it rather than releasing it into the air.',
    }),
    sl('check', 'Quick check: calcination or roasting', {
      b: 'Decide whether an ore should be calcined or roasted.',
      n: 'Quick check. Carbonates lose carbon dioxide; sulphides need oxygen to burn off sulfur.',
      chk: 'roast-mcq',
    }),
    sl('concept', 'Flux and slag', {
      b: 'Gangue left after concentration is removed during reduction by adding a **flux**, which combines with it to form a fusible **slag** that floats on the molten metal. An acidic gangue (SiO₂) needs a basic flux (CaO); a basic gangue (FeO) needs an acidic flux (SiO₂).',
      m: [r`\ce{CaO + SiO2 -> CaSiO3}`, r`\ce{FeO + SiO2 -> FeSiO3}`],
      v: table(['Gangue', 'Nature', 'Flux', 'Slag'], [['SiO₂', 'Acidic', 'CaO (from limestone)', 'CaSiO₃'], ['FeO', 'Basic', 'SiO₂', 'FeSiO₃']], 'Table of gangue, flux and slag pairs'),
      n: 'Some gangue always survives concentration. During smelting, a flux is added to combine with it and form slag, a molten glassy material that floats on the liquid metal and can be run off. Silica, an acidic gangue, is removed with lime, a basic flux. Iron oxide in copper ores, a basic gangue, is removed with silica, an acidic flux.',
    }),
    sl('check', 'Quick check: flux', {
      b: 'Choose the flux for a given gangue.',
      n: 'Quick check. Pair an acidic gangue with a basic flux, and a basic gangue with an acidic flux.',
      chk: 'flux-mcq',
    }),
    sl('summary', 'Summary: Part 1', {
      ul: [
        'Ore: a mineral from which a metal is extracted profitably; gangue: earthy impurities.',
        'Concentration: hydraulic washing, magnetic separation, froth flotation, leaching.',
        'Froth flotation: collectors, frothers, depressants; for sulphides.',
        'Leaching: Bayer process for bauxite; cyanide process for Au and Ag.',
        'Calcination (carbonates, no air) and roasting (sulphides, in air) give oxides.',
        'Flux + gangue → slag.',
      ],
      v: table(['Ore type', 'Concentration', 'To oxide by'], [['Sulphide', 'Froth flotation', 'Roasting'], ['Carbonate', 'Washing or magnetic', 'Calcination'], ['Oxide (bauxite)', 'Leaching', 'Already oxide']], 'Summary table of ore types, concentration and conversion to oxide'),
      n: 'Let us sum up Part 1. Ores are minerals worth mining, mixed with gangue. Concentration removes gangue using density, magnetism, wetting by oil or chemical solubility. Carbonates are calcined and sulphides are roasted to give oxides, and any remaining gangue is removed as slag with a flux. Next we see how the oxide is reduced to metal.',
    }),
    sl('exam-tips', 'Exam tips: Part 1', {
      ul: [
        'State the property that each concentration method uses.',
        'Write balanced equations for roasting and for the Bayer process.',
        'Calcination: little or no air; roasting: excess air.',
        'Name collector, frother and depressant in froth flotation.',
      ],
      v: table(['Slip', 'Fix'], [['All minerals are ores', 'Only profitable ones'], ['Sulphides are calcined', 'Sulphides are roasted'], ['Pine oil is the collector', 'Pine oil is the frother']], 'Table of three common slips in Part 1 and their fixes'),
      n: 'A few tips. When asked about a concentration method, name the property it uses. Learn the roasting and Bayer equations and keep them balanced. Do not confuse calcination, done without air, with roasting, done in air. And in froth flotation, pine oil is the frother, while xanthates are collectors.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Isolation of Elements — Part 2: Reduction, refining and uses',
  goals: [
    'Use ΔG = ΔH − TΔS and Ellingham diagrams to explain the choice of reducing agent and temperature',
    'Describe the extraction of iron, copper, zinc and aluminium',
    'Apply ΔG = −nFE to electrolytic extraction',
    'Describe refining methods: distillation, liquation, electrolysis, zone refining, vapour phase refining and chromatography',
  ],
  slides: [
    sl('title', 'Reduction and refining', {
      b: 'Part 2 — turning an oxide into a metal, and making it pure.',
      v: table(['Metal', 'Reduced by', 'Refined by'], [['Iron', 'Coke and CO (blast furnace)', '—'], ['Copper', 'Self-reduction of Cu₂O by Cu₂S', 'Electrolysis'], ['Zinc', 'Coke', 'Distillation'], ['Aluminium', 'Electrolysis', '—'], ['Silicon, germanium', '—', 'Zone refining']], 'Table of metals with their reducing agents and refining methods'),
      n: 'Once we have a concentrated oxide, we must remove the oxygen. Chemists choose the reducing agent and the temperature using thermodynamics. Carbon works for iron and zinc, copper can reduce itself, and very reactive metals like aluminium need electrolysis. Finally, metals are refined to the purity that industry and electronics demand.',
    }),
    sl('concept', 'Thermodynamics of reduction', {
      b: r`For reduction to occur, $\Delta G$ must be **negative**. When a metal oxide is heated with a reducing agent, the overall $\Delta G$ is the sum of $\Delta G$ for the two half-processes. Reduction is feasible if the reducing agent forms **its** oxide with a **more negative** $\Delta G$ than the metal does. Raising $T$ helps when the reaction has a positive $\Delta S$.`,
      m: [r`\Delta G = \Delta H - T\Delta S`, r`\mathrm{MO} + \mathrm{C} \rightarrow \mathrm{M} + \mathrm{CO}`],
      v: table(['Coupled reactions (per mol O₂)', 'Requirement'], [['2M + O₂ → 2MO (ΔG₁)', '—'], ['2C + O₂ → 2CO (ΔG₂)', '—'], ['2MO + 2C → 2M + 2CO', 'ΔG₂ − ΔG₁ < 0, i.e. ΔG₂ more negative than ΔG₁']], 'Table showing how coupling two oxide-formation reactions gives the condition for reduction'),
      n: 'Whether carbon can strip oxygen from a metal oxide is a question of Gibbs energy. Imagine two reactions: the metal combining with oxygen, and carbon combining with oxygen. If carbon’s reaction gives the more negative Gibbs energy at a certain temperature, then carbon wins the oxygen and the metal is freed. Temperature matters, because the entropy change of each reaction is different.',
    }),
    sl('diagram', 'The Ellingham diagram', {
      b: 'An **Ellingham diagram** plots $\\Delta G^\\circ$ for forming oxides (per mole of O₂) against $T$. Most metal oxide lines **slope upwards** (gas is used up, $\\Delta S < 0$). The line for $\\ce{2C + O2 -> 2CO}$ **slopes downwards** ($\\Delta S > 0$). A metal oxide can be reduced by any element whose line lies **below** it at that temperature, so carbon can reduce FeO above about 1000 K and ZnO at a higher temperature, but not Al₂O₃.',
      v: ellingham,
      n: 'An Ellingham diagram plots the Gibbs energy of forming oxides against temperature. Most lines slope upwards, because oxygen gas is used up and entropy falls. The carbon to carbon monoxide line slopes downwards, because one mole of gas becomes two. Wherever the carbon line lies below a metal’s line, carbon can reduce that oxide. So carbon reduces iron oxide above about a thousand kelvin, but its line never drops below aluminium’s.',
    }),
    sl('example', 'Worked example: reading an Ellingham diagram', {
      b: r`**Problem.** Using the diagram: (a) Above roughly what temperature can coke reduce FeO? (b) Why is CO a better reducing agent than C for FeO at 700 K? (c) Can carbon reduce Al₂O₃ below 2000 K?

**(a)** Above about 1000 K, where the $\ce{2C + O2 -> 2CO}$ line falls below the FeO line.

**(b)** At 700 K the $\ce{2CO + O2 -> 2CO2}$ line lies below the FeO line, so $\Delta G$ for $\ce{FeO + CO -> Fe + CO2}$ is negative, while the C → CO line is still above FeO.

**(c)** No — the Al₂O₃ line lies far below the carbon lines throughout.`,
      v: table(['Question', 'Lines compared', 'Answer'], [['(a)', 'C → CO vs FeO', 'Above about 1000 K'], ['(b)', 'CO → CO₂ vs FeO at 700 K', 'CO line lower: feasible'], ['(c)', 'C → CO vs Al₂O₃', 'Never below: not feasible']], 'Table summarising the lines compared and answers for the Ellingham worked example'),
      n: 'To read the diagram, find the two lines and see which is lower at the temperature asked. The carbon line crosses below iron oxide at about a thousand kelvin, so coke works only above that. At lower temperatures, carbon monoxide’s line is lower than iron oxide’s, so carbon monoxide does the reducing in the cooler upper part of a blast furnace. Aluminium oxide stays far below, so carbon cannot reduce it.',
    }),
    sl('check', 'Quick check: Ellingham diagram', {
      b: 'Use relative positions of lines to decide whether a reduction is feasible.',
      n: 'Quick check. The reducing agent’s line must lie below the metal oxide’s line at that temperature.',
      chk: 'ellingham-mcq',
    }),
    sl('concept', 'Extraction of iron', {
      b: 'In the **blast furnace**, haematite, coke and limestone are fed in at the top and hot air blown in at the bottom. At the bottom (about 2200 K), coke burns to CO₂, which is reduced by more coke to CO. In the upper zone (500–800 K), CO reduces Fe₂O₃ to FeO; lower down (900–1500 K), C and CO reduce FeO to Fe. Limestone gives CaO, which removes silica as slag.',
      m: [r`\ce{3Fe2O3 + CO -> 2Fe3O4 + CO2}`, r`\ce{Fe3O4 + 4CO -> 3Fe + 4CO2}`, r`\ce{FeO + C -> Fe + CO}`, r`\ce{CaCO3 -> CaO + CO2}`, r`\ce{CaO + SiO2 -> CaSiO3}`],
      v: table(['Product', 'Carbon content', 'Notes'], [['Pig iron', 'About 4%', 'From the blast furnace; brittle'], ['Cast iron', 'About 3%', 'Pig iron remelted with scrap; hard, brittle'], ['Wrought iron', 'Very low', 'Purest commercial iron; malleable'], ['Steel', 'Controlled, small', 'Made from pig iron; alloyed for special uses']], 'Table of pig iron, cast iron, wrought iron and steel with carbon content'),
      n: 'Iron is made in a blast furnace. Coke burns at the bottom in hot air, and the carbon dioxide formed is reduced by more coke to carbon monoxide. Rising through the furnace, carbon monoxide reduces the iron oxides step by step, and lower down carbon also reduces them. Limestone decomposes to lime, which carries away the sand as slag. The molten iron collected at the bottom, pig iron, contains about four percent carbon.',
    }),
    sl('concept', 'Extraction of copper and zinc', {
      b: '**Copper:** the roasted sulphide ore is heated with silica, which removes iron as slag (FeSiO₃), leaving **copper matte** (Cu₂S with some FeS). In a converter, Cu₂S is partly oxidised to Cu₂O, which reacts with the remaining Cu₂S (**self-reduction**) to give **blister copper**. **Zinc:** ZnO is reduced with coke at about 1673 K; zinc distils off and is condensed.',
      m: [r`\ce{2Cu2S + 3O2 -> 2Cu2O + 2SO2}`, r`\ce{2Cu2O + Cu2S -> 6Cu + SO2}`, r`\ce{ZnO + C ->[1673 K] Zn + CO}`],
      v: flow('LR', [['a', 'Copper pyrites'], ['b', 'Roasted ore'], ['c', 'Copper matte (Cu₂S)'], ['d', 'Blister copper'], ['e', 'Pure copper']], [['a', 'b', 'roast'], ['b', 'c', 'smelt with SiO₂'], ['c', 'd', 'converter: self-reduction'], ['d', 'e', 'electrolytic refining']], 'Flow of copper extraction from copper pyrites to pure copper'),
      n: 'Copper is extracted from its sulphide ore. After roasting, the ore is smelted with silica, which removes iron as slag and leaves copper matte. In a converter, air blown through the matte turns some copper sulfide into copper oxide, which then reacts with the rest of the sulfide to give copper metal. Escaping sulfur dioxide makes bubbles in the solid, giving blister copper. Zinc oxide is reduced by coke at high temperature, and zinc vapour is condensed.',
    }),
    sl('concept', 'Electrochemical principles; extraction of aluminium', {
      b: r`For electrolytic reduction, $\Delta G = -nFE$: a reaction with positive $\Delta G$ can be driven by applying a voltage larger than $E$. Reactive metals (Na, Mg, Al) are extracted by electrolysis of their molten compounds. **Hall–Héroult process:** pure Al₂O₃ dissolved in molten **cryolite** (Na₃AlF₆), with some CaF₂, at about 1250 K (lowers the melting point and improves conductivity); steel cathode lined with carbon; graphite anodes, which burn away as O₂ forms CO and CO₂.`,
      m: [r`\Delta G^\circ = -nFE^\circ`, r`\ce{Al^{3+} + 3e- -> Al}`, r`\ce{2Al2O3 + 3C -> 4Al + 3CO2}`],
      v: table(['Part of cell', 'Material or reaction'], [['Electrolyte', 'Al₂O₃ in molten cryolite + CaF₂'], ['Cathode', 'Carbon-lined steel: Al³⁺ + 3e⁻ → Al'], ['Anode', 'Graphite: oxide ions give O₂, which burns the anode to CO and CO₂'], ['Overall', '2Al₂O₃ + 3C → 4Al + 3CO₂']], 'Table of the parts and reactions of the Hall–Héroult cell'),
      n: 'Aluminium oxide is too stable to be reduced by carbon, so electricity does the job. A voltage larger than the cell potential drives the non-spontaneous reaction. Pure alumina is dissolved in molten cryolite, which lowers the melting point and makes the melt conduct better. Aluminium collects at the carbon-lined cathode, while oxygen at the graphite anodes burns them away as carbon monoxide and carbon dioxide, so the anodes must be replaced.',
    }),
    sl('example', 'Worked example: aluminium by electrolysis', {
      b: r`**Problem.** A cell carries a current of $100\ \text{A}$ for $1$ hour. What mass of aluminium ($M = 27$) is deposited? ($F = 96500\ \text{C mol}^{-1}$)

**Step 1.** Charge $Q = It = 100 \times 3600 = 360000\ \text{C}$.

**Step 2.** Moles of electrons $= 360000 \div 96500 = 3.73$.

**Step 3.** $\ce{Al^{3+} + 3e- -> Al}$: moles of Al $= 3.73 \div 3 = 1.243$; mass $= 1.243 \times 27 = 33.6\ \text{g}$.`,
      v: table(['Quantity', 'Value'], [['Charge', '360 000 C'], ['Moles of electrons', '3.73'], ['Moles of Al', '1.243'], ['Mass of Al', '33.6 g']], 'Table of charge, moles of electrons, moles and mass of aluminium'),
      n: 'Electrolysis calculations always go through the charge. A hundred amperes for one hour is three hundred and sixty thousand coulombs. Dividing by the Faraday constant gives the moles of electrons. Each aluminium ion needs three electrons, so we divide by three, and multiplying by the molar mass gives about thirty three and a half grams. That is why aluminium smelters use enormous currents.',
    }),
    sl('concept', 'Oxidation as an extraction method', {
      b: 'Some non-metals are extracted by **oxidation**. Chlorine is made by electrolysis of brine; the overall $\Delta G$ is large and positive, and is supplied by an external voltage.',
      m: [r`\ce{2Cl- + 2H2O -> 2OH- + H2 + Cl2}`],
      v: table(['Electrode', 'Product'], [['Anode', 'Cl₂ (oxidation of Cl⁻)'], ['Cathode', 'H₂ (reduction of water)'], ['Solution', 'NaOH']], 'Table of electrode products in the electrolysis of brine'),
      n: 'Not every element is obtained by reduction. Chlorine occurs as chloride ions, so it must be oxidised. Electrolysis of brine does this: chloride ions lose electrons at the anode to form chlorine gas, while water is reduced at the cathode to hydrogen, leaving sodium hydroxide in solution. The reaction is not spontaneous, so electrical energy must be supplied.',
    }),
    sl('concept', 'Refining: distillation, liquation and electrolysis', {
      b: '**Distillation:** low-boiling metals (Zn, Hg) are evaporated and condensed. **Liquation:** low-melting metals (Sn) melt and flow down a slope, away from infusible impurities. **Electrolytic refining:** impure metal as **anode**, a thin strip of pure metal as **cathode**, a solution of a salt of the metal as electrolyte. Pure metal deposits on the cathode; less reactive impurities fall as **anode mud** (Ag, Au, Pt from copper refining).',
      m: [r`\ce{Cu -> Cu^{2+} + 2e-} \quad (\text{anode})`, r`\ce{Cu^{2+} + 2e- -> Cu} \quad (\text{cathode})`],
      v: table(['Method', 'Principle', 'Example'], [['Distillation', 'Low boiling point', 'Zinc, mercury'], ['Liquation', 'Low melting point', 'Tin'], ['Electrolytic refining', 'Metal dissolves at anode, deposits at cathode', 'Copper, zinc']], 'Table of three refining methods, their principles and examples'),
      n: 'Crude metals contain impurities. Zinc and mercury, which boil at fairly low temperatures, are purified by distillation. Tin, with a low melting point, is purified by liquation: it melts and runs away from solid impurities. Copper is purified by electrolysis. The impure copper anode dissolves, and pure copper deposits on the cathode, while gold and silver impurities fall to the bottom as anode mud.',
    }),
    sl('diagram', 'Zone refining and vapour phase refining', {
      b: '**Zone refining:** impurities are more soluble in the melt than in the solid. A moving heater sweeps a molten zone along a rod; pure metal crystallises behind it and impurities collect at one end. Used for **semiconductor-grade Si, Ge, Ga**. **Vapour phase refining:** the metal forms a volatile compound that is decomposed elsewhere. **Mond process:** $\\ce{Ni + 4CO ->[330 K] Ni(CO)4}$, then $\\ce{Ni(CO)4 ->[450 K] Ni + 4CO}$. **van Arkel method:** $\\ce{Zr + 2I2 -> ZrI4}$, then $\\ce{ZrI4}$ decomposed on a hot tungsten filament.',
      v: V.zone,
      n: 'For very pure metals, two clever methods are used. In zone refining, a ring heater moves slowly along a rod, melting a narrow zone. Impurities prefer to stay in the liquid, so they travel with the molten zone to the end of the rod, which is then cut off. This is how silicon for computer chips is made. In vapour phase refining, nickel forms a volatile carbonyl that is decomposed elsewhere to give very pure nickel.',
    }),
    sl('concept', 'Chromatography and uses of metals', {
      b: '**Chromatography** separates elements present in small amounts by their different adsorption on an adsorbent (column chromatography). **Uses:** aluminium foil, wires and alloys; copper wires, coins, brass and bronze; zinc for galvanising and batteries; iron as cast iron, steel and alloys.',
      v: table(['Metal', 'Major uses'], [['Aluminium', 'Foil, electrical cables, aircraft alloys, paints (powder)'], ['Copper', 'Wires, water pipes, brass (with Zn), bronze (with Sn), coins'], ['Zinc', 'Galvanising iron, dry cells, brass, zinc dust as reducing agent'], ['Iron', 'Cast iron (stoves, pipes), steel (construction), nickel and chromium steels']], 'Table of major uses of aluminium, copper, zinc and iron'),
      n: 'When an element is present only in tiny amounts, chromatography can separate it by differences in adsorption. And all this effort is worth it: aluminium goes into foil, cables and aircraft; copper into wires, pipes, brass and bronze; zinc protects iron from rusting by galvanising; and iron, as steel, is the backbone of buildings, bridges and machines.',
    }),
    sl('check', 'Quick check: refining', {
      b: 'Match a metal to its refining method.',
      n: 'Quick check. Think about boiling point, melting point, volatile compounds and semiconductor purity.',
      chk: 'refining-mcq',
    }),
    sl('check', 'Quick check: electrolytic extraction', {
      b: 'Explain a feature of the Hall–Héroult process or use ΔG = −nFE.',
      n: 'Quick check. Recall why cryolite is used and why the anodes need replacing.',
      chk: 'cryolite-mcq',
    }),
    sl('summary', 'Summary: Part 2', {
      ul: [
        'Reduction feasible when ΔG < 0; Ellingham diagram: lower line reduces the oxide above it.',
        'Iron: blast furnace (CO and C reduce iron oxides; CaO removes silica as slag).',
        'Copper: matte, then self-reduction of Cu₂O by Cu₂S; zinc: ZnO + C at about 1673 K.',
        'Aluminium: Hall–Héroult electrolysis of Al₂O₃ in cryolite; ΔG = −nFE.',
        'Chlorine by oxidation (electrolysis of brine).',
        'Refining: distillation, liquation, electrolytic, zone (Si, Ge), vapour phase (Mond, van Arkel), chromatography.',
      ],
      v: table(['Need', 'Method'], [['Cheap reduction of Fe₂O₃', 'Coke and CO'], ['Very reactive metal', 'Electrolysis of molten compound'], ['Ultra-pure semiconductor', 'Zone refining']], 'Summary table matching needs to methods'),
      n: 'Let us sum up Part 2. Thermodynamics, shown in Ellingham diagrams, tells us which reducing agent works and at what temperature. Iron is made in a blast furnace, copper by self-reduction, zinc by coke, and aluminium by electrolysis in molten cryolite. Metals are then refined by distillation, liquation, electrolysis, zone refining or vapour phase methods, depending on their properties and the purity needed.',
    }),
    sl('exam-tips', 'Exam tips: Part 2', {
      ul: [
        'In Ellingham questions, compare lines at the stated temperature.',
        'Give the roles of cryolite (lower melting point, better conductivity).',
        'In electrolytic refining, impure metal is the anode.',
        'Use Q = It and moles of electrons in electrolysis calculations.',
      ],
      v: table(['Slip', 'Fix'], [['Impure copper is the cathode', 'It is the anode'], ['Carbon reduces Al₂O₃ in industry', 'Al is made by electrolysis'], ['Cryolite is the ore of Al', 'Bauxite is; cryolite is the solvent']], 'Table of three common slips in Part 2 and their fixes'),
      n: 'Final tips. For Ellingham questions, always compare the two lines at the temperature given. Remember the two roles of cryolite. In electrolytic refining, the impure metal is the anode and pure metal grows on the cathode. And in electrolysis problems, work through the charge and the moles of electrons step by step.',
    }),
  ],
});
